<?php

namespace Tests\Unit\TenantSchedules;

use App\Models\System\TenantSchedule;
use Illuminate\Support\Carbon;

/**
 * Bloqueo por fila de tenant_schedules cuando corren varios dispatchers a la vez
 * (varios crons, `tenancy:run schedule:run`, servidores con la misma base central)
 */
class TenantScheduleLockTest extends TenantSchedulesTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Carbon::setTestNow('2026-09-25 16:04:30');
    }

    /**
     * El caso de las ejecuciones repetidas: dos procesos leen la misma fila vencida, el
     * primero la ejecuta, la reprograma y libera el bloqueo; el segundo llega despues con
     * su copia vieja y no debe volver a ejecutarla
     */
    public function test_stale_copy_of_a_processed_turn_is_not_taken_again(): void
    {
        $schedule = $this->schedule($this->website('tenancy_a'), 'suscription:send-reminders', '2026-09-25 16:04');

        $process_a = TenantSchedule::find($schedule->id);
        $process_b = TenantSchedule::find($schedule->id);

        $this->assertTrue($process_a->acquireLock(Carbon::now()));

        // lo que hace el dispatcher al terminar: reprograma y libera
        $process_a->update([
            'next_run_at' => Carbon::parse('2026-09-26 16:04'),
            'locked_until' => null,
        ]);

        $this->assertFalse($process_b->acquireLock(Carbon::now()));
    }

    /**
     * Al terminar, el dispatcher libera la fila con update(['locked_until' => null])
     * sobre el mismo modelo que tomo el bloqueo; debe quedar libre en la base
     */
    public function test_releasing_the_lock_through_the_model_is_saved(): void
    {
        $schedule = $this->schedule($this->website('tenancy_a'), 'suscription:send-reminders', '2026-09-25 16:04');

        $this->assertTrue($schedule->acquireLock(Carbon::now()));
        $this->assertNotNull(TenantSchedule::find($schedule->id)->locked_until);

        $schedule->update(['locked_until' => null]);

        $this->assertNull(TenantSchedule::find($schedule->id)->locked_until);
    }

    public function test_row_being_executed_is_not_taken_by_another_process(): void
    {
        $schedule = $this->schedule($this->website('tenancy_a'), 'suscription:send-reminders', '2026-09-25 16:04');

        $process_a = TenantSchedule::find($schedule->id);
        $process_b = TenantSchedule::find($schedule->id);

        $this->assertTrue($process_a->acquireLock(Carbon::now()));
        $this->assertFalse($process_b->acquireLock(Carbon::now()));
    }

    /**
     * Un proceso que murio a mitad de la ejecucion no deja la fila tomada para siempre
     */
    public function test_expired_lock_of_a_dead_process_can_be_taken(): void
    {
        $schedule = $this->schedule($this->website('tenancy_a'), 'suscription:send-reminders', '2026-09-25 16:04');

        $dead_process = TenantSchedule::find($schedule->id);
        $this->assertTrue($dead_process->acquireLock(Carbon::now()->subMinutes(20)));

        $this->assertTrue(TenantSchedule::find($schedule->id)->acquireLock(Carbon::now()));
    }

    public function test_inactive_row_is_not_taken(): void
    {
        $schedule = $this->schedule($this->website('tenancy_a'), 'suscription:send-reminders', '2026-09-25 16:04');

        $copy = TenantSchedule::find($schedule->id);
        $schedule->update(['is_active' => false]);

        $this->assertFalse($copy->acquireLock(Carbon::now()));
    }
}
