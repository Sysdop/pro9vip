<?php

namespace App\Services\System\TenantSchedules;

use App\Models\System\TenantSchedule;
use App\Services\System\TenantSchedules\Definitions\ExpireDiscountCampaignsDefinition;
use App\Services\System\TenantSchedules\Definitions\PrunePrintOrdersDefinition;
use App\Services\System\TenantSchedules\Definitions\SuscriptionCheckExpiredDefinition;
use App\Services\System\TenantSchedules\Definitions\SuscriptionCreateOrdersDefinition;
use App\Services\System\TenantSchedules\Definitions\SuscriptionSendRemindersDefinition;
use Hyn\Tenancy\Environment;
use Hyn\Tenancy\Models\Website;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Agenda de comandos del sistema por empresa (tabla tenant_schedules del central).
 *
 * - sync / syncAll: con la conexion del tenant activa, registra o desactiva la fila
 *   de cada comando segun la empresa tenga trabajo pendiente.
 * - registerModelListeners: recalcula la agenda cuando cambian los modelos observados.
 * - tenant-schedules:dispatch ejecuta las filas vencidas; tenant-schedules:sync
 *   reconstruye la agenda de todas las empresas como red de seguridad.
 */
class TenantScheduleRegistry
{
    /**
     * @var ScheduleDefinition[]|null
     */
    private static $definitions = null;

    /**
     * @return ScheduleDefinition[] indexadas por comando
     */
    public static function definitions(): array
    {
        // se consulta en cada listener y en cada fila del dispatcher; no cambia en el proceso
        if (static::$definitions !== null) {
            return static::$definitions;
        }

        $definitions = [
            new SuscriptionSendRemindersDefinition(),
            new ExpireDiscountCampaignsDefinition(),
            new SuscriptionCreateOrdersDefinition(),
            new SuscriptionCheckExpiredDefinition(),
            new PrunePrintOrdersDefinition(),
        ];

        $indexed = [];

        foreach ($definitions as $definition) {
            $indexed[$definition->command()] = $definition;
        }

        return static::$definitions = $indexed;
    }

    public static function find(string $command): ?ScheduleDefinition
    {
        return static::definitions()[$command] ?? null;
    }

    /**
     * Sincroniza todos los comandos de la empresa cuya conexion esta activa
     */
    public static function syncAll(Website $website): void
    {
        foreach (static::definitions() as $definition) {
            $definition->refresh();
            static::sync($definition, $website);
        }
    }

    /**
     * Sincroniza un comando para la empresa cuya conexion esta activa (desde listeners o
     * servicios del tenant). Sin empresa activa, por ejemplo en una migracion, no hace nada.
     */
    public static function syncCommandForCurrentTenant(string $command): void
    {
        $definition = static::find($command);

        if ($definition) {
            static::syncCurrentTenant($definition);
        }
    }

    /**
     * Registra o desactiva la fila del comando para la empresa cuya conexion esta activa
     *
     * @param Carbon|null $after desde cuando buscar la proxima ejecucion (por defecto ahora)
     */
    public static function sync(ScheduleDefinition $definition, Website $website, ?Carbon $after = null): void
    {
        $next_run_at = $definition->isNeeded()
            ? $definition->nextRunAt($after ?? Carbon::now())
            : null;

        if ($next_run_at) {
            TenantSchedule::updateOrCreate(
                [
                    'website_id' => $website->id,
                    'command' => $definition->command(),
                ],
                [
                    'module' => $definition->module(),
                    'next_run_at' => $next_run_at,
                    'is_active' => true,
                ]
            );

            return;
        }

        TenantSchedule::query()
            ->where('website_id', $website->id)
            ->where('command', $definition->command())
            ->update([
                'next_run_at' => null,
                'is_active' => false,
            ]);
    }

    /**
     * Recalcula la agenda al guardar o eliminar los modelos observados de cada comando.
     * Un error aqui nunca debe impedir que el usuario guarde su registro.
     */
    public static function registerModelListeners(): void
    {
        foreach (static::definitions() as $definition) {
            foreach ($definition->watchedModels() as $model_class) {
                $listener = function () use ($definition) {
                    static::syncCurrentTenant($definition);
                };

                $model_class::saved($listener);
                $model_class::deleted($listener);
            }
        }
    }

    private static function syncCurrentTenant(ScheduleDefinition $definition): void
    {
        try {
            $website = app(Environment::class)->tenant();

            if (!$website) {
                return;
            }

            static::sync($definition, $website);
        } catch (Throwable $e) {
            Log::error("tenant_schedules: no se pudo sincronizar {$definition->command()}: {$e->getMessage()}");
        }
    }
}
