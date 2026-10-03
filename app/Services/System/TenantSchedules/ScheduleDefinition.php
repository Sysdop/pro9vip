<?php

namespace App\Services\System\TenantSchedules;

use Illuminate\Support\Carbon;

/**
 * Describe un comando del sistema que se agenda por empresa en tenant_schedules.
 *
 * Todos los metodos que consultan datos se ejecutan con la conexion del tenant activa.
 */
interface ScheduleDefinition
{
    /**
     * Comando artisan que se ejecuta dentro de la empresa
     */
    public function command(): string;

    /**
     * Modulo al que pertenece, para agrupar en tenant_schedules
     */
    public function module(): string;

    /**
     * Modelos del tenant que, al guardarse o eliminarse, recalculan la agenda de este comando.
     * Vacio si basta con la sincronizacion diaria (tenant-schedules:sync).
     *
     * @return string[]
     */
    public function watchedModels(): array;

    /**
     * Prepara los datos propios del comando antes de la sincronizacion diaria
     * (ej. regenerar una agenda interna del tenant). Se ejecuta con la conexion del tenant activa.
     */
    public function refresh(): void;

    /**
     * Si la empresa tiene trabajo pendiente para este comando
     */
    public function isNeeded(): bool;

    /**
     * Proxima ejecucion a partir de $after (inclusive, por minuto); null si no hay
     */
    public function nextRunAt(Carbon $after): ?Carbon;

    /**
     * Opciones que recibe el comando para la ejecucion programada en $scheduled_at
     */
    public function options(Carbon $scheduled_at): array;

    /**
     * Opciones para simular la ejecucion sin escribir datos (tenant-schedules:dispatch --dry-run);
     * null si el comando no soporta simulacion
     */
    public function dryRunOptions(Carbon $scheduled_at): ?array;
}
