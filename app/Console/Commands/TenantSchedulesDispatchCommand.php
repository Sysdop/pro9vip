<?php

namespace App\Console\Commands;

use App\Models\System\TenantSchedule;
use App\Services\System\TenantSchedules\TenantScheduleRegistry;
use Hyn\Tenancy\Environment;
use Hyn\Tenancy\Models\Website;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;
use Symfony\Component\Console\Output\BufferedOutput;
use Throwable;

/**
 * Ejecuta los comandos vencidos de tenant_schedules, conectandose solo a las empresas que
 * tienen trabajo pendiente. Reemplaza a los `tenancy:run <comando>` que recorrian todas
 * las empresas en cada corrida.
 */
class TenantSchedulesDispatchCommand extends Command
{
    protected $signature = 'tenant-schedules:dispatch
        {--dry-run : Muestra que se ejecutaria, sin ejecutar ni modificar la agenda}
        {--at= : Fecha y hora a simular con --dry-run (ej. "2026-10-31 08:00"); por defecto ahora}';

    protected $description = 'Ejecuta los comandos programados en tenant_schedules solo en las empresas que corresponde';

    /**
     * Una ejecucion atrasada mas de este tiempo recalcula su siguiente turno desde ahora,
     * para no encadenar turnos viejos despues de una caida del servidor
     */
    const MAX_CATCH_UP_MINUTES = 60;

    public function handle(Environment $environment)
    {
        if ($this->option('dry-run')) {
            return $this->simulate($environment);
        }

        // agrupadas por empresa: cada empresa se conecta una sola vez aunque tenga varios comandos
        $schedules = TenantSchedule::due(Carbon::now())
            ->with('website')
            ->orderBy('website_id')
            ->orderBy('next_run_at')
            ->get();

        foreach ($schedules as $schedule) {

            // la hora se toma por fila: una corrida larga no debe dejar bloqueos ya vencidos
            $now = Carbon::now();

            if (!$schedule->acquireLock($now)) continue;

            $definition = TenantScheduleRegistry::find($schedule->command);

            if (!$schedule->website || !$definition) {
                $schedule->update([
                    'is_active' => false,
                    'next_run_at' => null,
                    'locked_until' => null,
                    'last_status' => TenantSchedule::STATUS_ERROR,
                    'last_output' => !$schedule->website ? 'Empresa no encontrada' : 'Comando sin definicion registrada',
                ]);
                continue;
            }

            $scheduled_at = $schedule->next_run_at->copy();
            $buffer = new BufferedOutput();

            try {
                $this->switchTenant($environment, $schedule->website);

                $exit_code = Artisan::call($schedule->command, $definition->options($scheduled_at), $buffer);

                // un comando puede terminar sin excepcion pero reportar fallas parciales
                $status = $exit_code === 0 ? TenantSchedule::STATUS_SUCCESS : TenantSchedule::STATUS_ERROR;
                $output = $buffer->fetch();
            } catch (Throwable $e) {
                $status = TenantSchedule::STATUS_ERROR;
                $output = $buffer->fetch().$e->getMessage();
            }

            try {
                // la agenda se recalcula despues de ejecutar: el comando pudo cambiar los datos
                $this->switchTenant($environment, $schedule->website);
                TenantScheduleRegistry::sync($definition, $schedule->website, $this->nextSearchFrom($scheduled_at, Carbon::now()));
            } catch (Throwable $e) {
                $status = TenantSchedule::STATUS_ERROR;
                $output .= "\nNo se pudo recalcular la agenda: {$e->getMessage()}";

                // evita reintentar cada minuto un comando cuya agenda no se puede calcular
                $schedule->update(['next_run_at' => Carbon::now()->addHour()]);
            }

            $schedule->update([
                'last_run_at' => $now,
                'last_status' => $status,
                'last_output' => Str::limit(trim($output), 60000),
                'locked_until' => null,
            ]);

            $this->line("[{$schedule->website->uuid}] {$schedule->command}: {$status}");
        }
    }

    /**
     * Cambiar de empresa reconecta la base del tenant; se omite si ya es la activa.
     * Se compara contra la empresa activa real, por si un comando cambio de empresa.
     */
    private function switchTenant(Environment $environment, Website $website): void
    {
        $current = $environment->tenant();

        if ($current && $current->id === $website->id) return;

        $environment->tenant($website);
    }

    /**
     * Lista lo que estaria vencido en la fecha simulada. Los comandos que soportan
     * simulacion (ver ScheduleDefinition::dryRunOptions) muestran ademas su detalle,
     * leyendo los datos de la empresa sin modificarlos.
     */
    private function simulate(Environment $environment): int
    {
        $at = $this->option('at') ? Carbon::parse($this->option('at')) : Carbon::now();

        $this->warn("[DRY-RUN] Simulando {$at->format('Y-m-d H:i')}. No se ejecuta ni se modifica nada.");

        // sin filtrar por bloqueo: se simula lo que tocaria, no el estado de otra ejecucion en curso
        $schedules = TenantSchedule::query()
            ->with('website.hostnames')
            ->where('is_active', true)
            ->whereNotNull('next_run_at')
            ->where('next_run_at', '<=', $at)
            ->orderBy('website_id')
            ->orderBy('next_run_at')
            ->get();

        if ($schedules->isEmpty()) {
            $this->info('Nada por ejecutar en ese momento.');
            return self::SUCCESS;
        }

        $this->table(
            ['Empresa', 'Dominio', 'Modulo', 'Comando', 'Programado'],
            $schedules->map(fn (TenantSchedule $schedule) => [
                optional($schedule->website)->uuid ?? "website #{$schedule->website_id} (no existe)",
                $this->domains($schedule->website),
                $schedule->module,
                $schedule->command,
                $schedule->next_run_at->format('Y-m-d H:i'),
            ])->all()
        );

        foreach ($schedules as $schedule) {
            $definition = TenantScheduleRegistry::find($schedule->command);
            // se simula a la fecha pedida: incluye lo que para entonces estaria atrasado
            $options = $definition ? $definition->dryRunOptions($at) : null;

            if (!$schedule->website || $options === null) continue;

            $this->line('');
            $this->line("<comment>{$schedule->website->uuid} · {$schedule->command}</comment>");

            $this->switchTenant($environment, $schedule->website);
            $this->call($schedule->command, $options);
        }

        return self::SUCCESS;
    }

    private function domains(?Website $website): string
    {
        if (!$website) return '-';

        return $website->hostnames->pluck('fqdn')->implode(', ') ?: '-';
    }

    /**
     * El siguiente turno se busca despues del turno ejecutado, asi un atraso no salta
     * otros horarios del mismo dia (ej. dos recordatorios a las 08:00 y 08:05)
     */
    private function nextSearchFrom(Carbon $scheduled_at, Carbon $now): Carbon
    {
        $from = $scheduled_at->copy()->startOfMinute()->addMinute();
        $limit = $now->copy()->subMinutes(self::MAX_CATCH_UP_MINUTES);

        return $from->lt($limit) ? $now->copy() : $from;
    }
}
