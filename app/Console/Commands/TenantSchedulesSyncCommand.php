<?php

namespace App\Console\Commands;

use App\Services\System\TenantSchedules\TenantScheduleRegistry;
use Hyn\Tenancy\Environment;
use Hyn\Tenancy\Models\Website;
use Illuminate\Console\Command;
use Throwable;

/**
 * Reconstruye tenant_schedules revisando todas las empresas.
 *
 * Red de seguridad para lo que los listeners de modelos no alcanzan a ver (datos
 * modificados directo en la base, comandos sin modelos observados). Es el unico
 * recorrido completo de empresas y corre una vez al dia.
 */
class TenantSchedulesSyncCommand extends Command
{
    protected $signature = 'tenant-schedules:sync {--tenant=* : Id(s) de website a sincronizar}';

    protected $description = 'Recalcula la agenda de tenant_schedules de todas las empresas';

    public function handle(Environment $environment)
    {
        $query = Website::query();

        if ($ids = $this->option('tenant')) {
            $query->whereIn('id', $ids);
        }

        $query->chunk(50, function ($websites) use ($environment) {
            foreach ($websites as $website) {
                try {
                    $environment->tenant($website);
                    TenantScheduleRegistry::syncAll($website);
                    $this->line("[{$website->uuid}] sincronizado");
                } catch (Throwable $e) {
                    $this->error("[{$website->uuid}] {$e->getMessage()}");
                }
            }
        });
    }
}
