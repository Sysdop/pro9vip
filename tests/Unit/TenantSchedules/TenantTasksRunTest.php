<?php

namespace Tests\Unit\TenantSchedules;

use Illuminate\Console\Command;
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

/**
 * tenant:run (tareas que programa el usuario en tenant_tasks)
 */
class TenantTasksRunTest extends TenantSchedulesTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        FakeTaskCommand::$ran_in = [];
        $this->app[Kernel::class]->registerCommand(new FakeTaskCommand());

        Carbon::setTestNow('2026-09-25 17:33:10');
    }

    public function test_connects_once_per_company_even_with_several_tasks_at_the_same_time(): void
    {
        $a = $this->website('tenancy_a');
        $b = $this->website('tenancy_b');
        $this->website('tenancy_c'); // sin tareas

        $a_first = $this->task('tenancy_a', '17:33:00', 'uuid-a1');
        $b_task = $this->task('tenancy_b', '17:33:00', 'uuid-b1');
        $a_second = $this->task('tenancy_a', '17:33:00', 'uuid-a2');
        $a_later = $this->task('tenancy_a', '17:35:00', 'uuid-a3');

        DB::connection('tenant')->table('tasks')->insert([
            ['uuid' => 'uuid-a1', 'class' => FakeTaskCommand::class, 'execution_time' => '17:33:00'],
            ['uuid' => 'uuid-a2', 'class' => FakeTaskCommand::class, 'execution_time' => '17:33:00'],
        ]);

        Artisan::call('tenant:run');

        // antes: 2 conexiones por tarea (tenancy:run + guardar el output) = 6
        $this->assertSame([$a->id, $b->id], $this->environment->switches);

        // cada tarea corre una vez y en su propia empresa
        $this->assertSame([$a->id, $a->id, $b->id], FakeTaskCommand::$ran_in);

        foreach ([$a_first, $a_second, $b_task] as $id) {
            $this->assertStringContainsString('tarea ejecutada', $this->systemOutput($id));
        }
        $this->assertNull($this->systemOutput($a_later));

        $this->assertStringContainsString(
            'tarea ejecutada',
            DB::connection('tenant')->table('tasks')->where('uuid', 'uuid-a1')->value('output')
        );
    }

    public function test_no_tasks_this_minute_does_not_connect(): void
    {
        $this->website('tenancy_a');
        $this->task('tenancy_a', '17:35:00', 'uuid-a1');

        Artisan::call('tenant:run');

        $this->assertSame([], $this->environment->switches);
        $this->assertSame([], FakeTaskCommand::$ran_in);
    }

    public function test_task_of_a_missing_company_records_the_error(): void
    {
        $id = $this->task('tenancy_borrada', '17:33:00', 'uuid-x');

        Artisan::call('tenant:run');

        $this->assertSame('Tenant no encontrado: tenancy_borrada', $this->systemOutput($id));
        $this->assertSame([], $this->environment->switches);
    }

    /**
     * Una tarea que falla no impide las demas de la misma empresa
     */
    public function test_failing_task_does_not_stop_the_rest(): void
    {
        $a = $this->website('tenancy_a');

        $failing = $this->task('tenancy_a', '17:33:00', 'uuid-a1', 'App\\Console\\Commands\\ClaseQueNoExiste');
        $ok = $this->task('tenancy_a', '17:33:00', 'uuid-a2');

        Artisan::call('tenant:run');

        $this->assertNotEmpty($this->systemOutput($failing));
        $this->assertStringContainsString('tarea ejecutada', $this->systemOutput($ok));
        $this->assertSame([$a->id], FakeTaskCommand::$ran_in);
    }

    private function task(string $uuid_tenant, string $time, string $uuid, string $class = FakeTaskCommand::class): int
    {
        return DB::connection('system')->table('tenant_tasks')->insertGetId([
            'uuid' => $uuid,
            'uuid_tenant' => $uuid_tenant,
            'class' => $class,
            'execution_time' => $time,
        ]);
    }

    private function systemOutput(int $id): ?string
    {
        return DB::connection('system')->table('tenant_tasks')->where('id', $id)->value('output');
    }
}

class FakeTaskCommand extends Command
{
    /**
     * @var int[] empresa activa en cada ejecucion
     */
    public static $ran_in = [];

    protected $signature = 'test:fake-task';

    public function handle()
    {
        static::$ran_in[] = app(\Hyn\Tenancy\Environment::class)->tenant()->id;
        $this->line('tarea ejecutada');

        return self::SUCCESS;
    }
}
