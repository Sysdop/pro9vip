<?php

namespace App\Services\System\TenantSchedules;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

abstract class BaseScheduleDefinition implements ScheduleDefinition
{
    public function watchedModels(): array
    {
        return [];
    }

    public function options(Carbon $scheduled_at): array
    {
        return [];
    }

    public function refresh(): void
    {
    }

    public function dryRunOptions(Carbon $scheduled_at): ?array
    {
        return null;
    }

    /**
     * Tablas ya confirmadas por base del tenant, para no consultar information_schema
     * en cada sincronizacion. Solo se guardan las que existen: una tabla que falta puede
     * crearse con una migracion mientras un worker sigue vivo.
     *
     * @var array<string, bool>
     */
    private static $existing_tables = [];

    /**
     * Las tablas de algunos modulos pueden no existir en empresas antiguas
     */
    protected function tableExists(string $model_class): bool
    {
        $table = (new $model_class)->getTable();
        $key = DB::connection('tenant')->getDatabaseName().'.'.$table;

        if (isset(static::$existing_tables[$key])) return true;

        if (!Schema::connection('tenant')->hasTable($table)) return false;

        return static::$existing_tables[$key] = true;
    }

    /**
     * Siguiente ocurrencia de una hora del dia (HH:MM) desde $after, contando el mismo minuto
     */
    protected function nextDailyOccurrence(string $time, Carbon $after): Carbon
    {
        [$hour, $minute] = array_map('intval', explode(':', $time));

        $after = $after->copy()->startOfMinute();
        $candidate = $after->copy()->setTime($hour, $minute);

        return $candidate->lt($after) ? $candidate->addDay() : $candidate;
    }

    /**
     * Primera ocurrencia de una hora del dia (HH:MM) desde $after, sin adelantarse a $date
     */
    protected function nextDailyOccurrenceFrom(string $time, Carbon $after, Carbon $date): Carbon
    {
        $from = $date->copy()->startOfDay();

        return $this->nextDailyOccurrence($time, $from->gt($after) ? $from : $after);
    }
}
