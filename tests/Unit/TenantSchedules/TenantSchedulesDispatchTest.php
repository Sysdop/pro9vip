<?php

namespace Tests\Unit\TenantSchedules;

use App\Models\System\TenantSchedule;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

/**
 * Flujo completo de tenant-schedules:dispatch con los comandos y definiciones reales.
 *
 * $this->environment->switches cuenta las conexiones a empresas: es lo que se quiere
 * minimizar frente a tenancy:run, que se conectaba a todas en cada corrida.
 */
class TenantSchedulesDispatchTest extends TenantSchedulesTestCase
{
    public function test_only_connects_to_companies_with_due_commands_once_each(): void
    {
        Carbon::setTestNow('2026-09-25 16:04:30');

        $this->reminder('16:04');
        $campaign_id = $this->campaign('2026-09-25 16:00');

        $with_two_commands = $this->website('tenancy_a');
        $with_one_command = $this->website('tenancy_b');
        $without_due_work = $this->website('tenancy_c');
        $this->website('tenancy_d'); // sin filas en la agenda

        $reminders_a = $this->schedule($with_two_commands, 'suscription:send-reminders', '2026-09-25 16:04');
        $campaigns_a = $this->schedule($with_two_commands, 'ecommerce:expire-discount-campaigns', '2026-09-25 16:00');
        $reminders_b = $this->schedule($with_one_command, 'suscription:send-reminders', '2026-09-25 16:04');
        $future_c = $this->schedule($without_due_work, 'suscription:send-reminders', '2026-09-25 18:00');

        $this->assertSame(0, Artisan::call('tenant-schedules:dispatch'));

        // 3 comandos en 2 empresas = 2 conexiones; c y d no se tocan
        $this->assertSame([$with_two_commands->id, $with_one_command->id], $this->environment->switches);

        // los recordatorios pasan al dia siguiente a la misma hora
        $this->assertSame('2026-09-26 16:04', $reminders_a->fresh()->next_run_at->format('Y-m-d H:i'));
        $this->assertSame('2026-09-26 16:04', $reminders_b->fresh()->next_run_at->format('Y-m-d H:i'));
        $this->assertSame(TenantSchedule::STATUS_SUCCESS, $reminders_a->fresh()->last_status);
        $this->assertNull($reminders_a->fresh()->locked_until);

        // la campaña vencida se desactiva y la fila se apaga: ya no hay trabajo
        $this->assertFalse((bool) DB::connection('tenant')->table('discount_campaigns')->where('id', $campaign_id)->value('is_active'));
        $this->assertFalse($campaigns_a->fresh()->is_active);
        $this->assertNull($campaigns_a->fresh()->next_run_at);

        $this->assertSame('2026-09-25 18:00', $future_c->fresh()->next_run_at->format('Y-m-d H:i'));
        $this->assertNull($future_c->fresh()->last_run_at);
    }

    public function test_nothing_due_does_not_connect_to_any_company(): void
    {
        Carbon::setTestNow('2026-09-25 10:00:00');

        $this->reminder('16:04');
        $this->schedule($this->website('tenancy_a'), 'suscription:send-reminders', '2026-09-25 16:04');
        $this->schedule($this->website('tenancy_b'), 'suscription:send-reminders', '2026-09-25 16:04');

        $this->assertSame(0, Artisan::call('tenant-schedules:dispatch'));

        $this->assertSame([], $this->environment->switches);
    }

    /**
     * Otro dispatcher del mismo minuto (el caso de las 3 ejecuciones) no repite nada
     */
    public function test_second_dispatch_in_the_same_minute_does_not_repeat(): void
    {
        Carbon::setTestNow('2026-09-25 16:04:30');

        $this->reminder('16:04');
        $website = $this->website('tenancy_a');
        $this->schedule($website, 'suscription:send-reminders', '2026-09-25 16:04');

        Artisan::call('tenant-schedules:dispatch');
        Artisan::call('tenant-schedules:dispatch');
        Artisan::call('tenant-schedules:dispatch');

        $this->assertSame([$website->id], $this->environment->switches);
    }

    /**
     * Dos turnos a menos de 10 minutos: la fila se libera al terminar el primero, asi el
     * segundo corre a su hora y no cuando vence el bloqueo
     */
    public function test_close_turns_run_on_time(): void
    {
        Carbon::setTestNow('2026-09-25 16:04:30');

        $this->reminder('16:04');
        $this->reminder('16:10');
        $website = $this->website('tenancy_a');
        $schedule = $this->schedule($website, 'suscription:send-reminders', '2026-09-25 16:04');

        Artisan::call('tenant-schedules:dispatch');
        $this->assertNull($schedule->fresh()->locked_until);

        Carbon::setTestNow('2026-09-25 16:10:05');
        Artisan::call('tenant-schedules:dispatch');

        $this->assertSame('2026-09-25 16:10', $schedule->fresh()->last_run_at->format('Y-m-d H:i'));
        $this->assertSame('2026-09-26 16:04', $schedule->fresh()->next_run_at->format('Y-m-d H:i'));
    }

    /**
     * Un atraso corto no salta otro horario del mismo dia
     */
    public function test_short_delay_keeps_the_next_turn_of_the_same_day(): void
    {
        Carbon::setTestNow('2026-09-25 16:30:00');

        $this->reminder('16:04');
        $this->reminder('16:10');
        $schedule = $this->schedule($this->website('tenancy_a'), 'suscription:send-reminders', '2026-09-25 16:04');

        Artisan::call('tenant-schedules:dispatch');

        $this->assertSame('2026-09-25 16:10', $schedule->fresh()->next_run_at->format('Y-m-d H:i'));
    }

    /**
     * Despues de una caida larga no se encadenan turnos viejos: se sigue desde ahora
     */
    public function test_long_outage_continues_from_now(): void
    {
        Carbon::setTestNow('2026-09-25 18:30:00');

        $this->reminder('16:04');
        $this->reminder('16:10');
        $schedule = $this->schedule($this->website('tenancy_a'), 'suscription:send-reminders', '2026-09-25 16:04');

        Artisan::call('tenant-schedules:dispatch');

        $this->assertSame('2026-09-26 16:04', $schedule->fresh()->next_run_at->format('Y-m-d H:i'));
    }

    public function test_row_without_definition_is_disabled_without_connecting(): void
    {
        Carbon::setTestNow('2026-09-25 16:04:30');

        $schedule = $this->schedule($this->website('tenancy_a'), 'comando:inexistente', '2026-09-25 16:00');

        Artisan::call('tenant-schedules:dispatch');

        $schedule = $schedule->fresh();
        $this->assertFalse($schedule->is_active);
        $this->assertNull($schedule->next_run_at);
        $this->assertSame(TenantSchedule::STATUS_ERROR, $schedule->last_status);
        $this->assertSame([], $this->environment->switches);
    }

    public function test_dry_run_does_not_execute_or_change_the_schedule(): void
    {
        Carbon::setTestNow('2026-09-25 16:04:30');

        $campaign_id = $this->campaign('2026-09-25 16:00');
        $schedule = $this->schedule($this->website('tenancy_a', 'a.pro9.test'), 'ecommerce:expire-discount-campaigns', '2026-09-25 16:00');

        Artisan::call('tenant-schedules:dispatch', ['--dry-run' => true]);

        $this->assertStringContainsString('a.pro9.test', Artisan::output());
        $this->assertTrue((bool) DB::connection('tenant')->table('discount_campaigns')->where('id', $campaign_id)->value('is_active'));
        $this->assertSame('2026-09-25 16:00', $schedule->fresh()->next_run_at->format('Y-m-d H:i'));
        $this->assertNull($schedule->fresh()->last_run_at);
    }
}
