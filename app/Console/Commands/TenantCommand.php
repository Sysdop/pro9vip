<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Tenant\Task;
use Carbon\Carbon;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Hyn\Tenancy\Environment;
use Hyn\Tenancy\Models\Website;
use Symfony\Component\Console\Output\BufferedOutput;

class TenantCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tenant:run';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Execute the scheduled tasks of the tenants';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct() {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * Ejecuta las tareas programadas para este minuto. Las empresas se cargan en una sola
     * consulta y cada una se conecta una vez, aunque tenga varias tareas a la misma hora
     * (antes cada tarea pasaba por tenancy:run y reconectaba la empresa dos veces).
     *
     * @return mixed
     */
    public function handle(Environment $environment) {
        $task_tenant = DB::connection('system')->table('tenant_tasks')
            ->where('execution_time', Carbon::now()->format('H:i').':00')
            ->orderBy('uuid_tenant')
            ->orderBy('id')
            ->get();

        if ($task_tenant->isEmpty()) return;

        $websites = Website::whereIn('uuid', $task_tenant->pluck('uuid_tenant')->unique())
            ->get()
            ->keyBy('uuid');

        foreach ($task_tenant as $task) {
            try {
                $website = $websites->get($task->uuid_tenant);

                if (! $website) {
                    $output = "Tenant no encontrado: {$task->uuid_tenant}";
                } else {
                    $this->switchTenant($environment, $website);

                    $buffer = new BufferedOutput();
                    Artisan::call($task->class, [], $buffer);
                    $output = $buffer->fetch();

                    // la tarea pudo cambiar de empresa; el output se guarda en la tabla tasks de la suya
                    $this->switchTenant($environment, $website);
                    Task::where('uuid', $task->uuid)->update(['output' => $output]);
                }
            }
            catch (\Exception $e) {
                $output = $e->getMessage();
            }

            DB::connection('system')->table('tenant_tasks')
                ->where('id', $task->id)
                ->update([
                    'output'     => $output,
                    'updated_at' => Carbon::now(),
                ]);
        };
    }

    /**
     * Cambiar de empresa reconecta la base del tenant; se omite si ya es la activa
     */
    private function switchTenant(Environment $environment, Website $website): void
    {
        $current = $environment->tenant();

        if ($current && $current->id === $website->id) return;

        $environment->tenant($website);
    }
}
