<?php

namespace App\Services\System\TenantSchedules;

use Illuminate\Support\Carbon;

/**
 * Comando que corre una vez al dia a una hora fija, solo en las empresas que lo necesitan
 */
abstract class DailyScheduleDefinition extends BaseScheduleDefinition
{
    /**
     * Hora de ejecucion en formato HH:MM (America/Lima)
     */
    abstract protected function time(): string;

    public function nextRunAt(Carbon $after): ?Carbon
    {
        return $this->nextDailyOccurrence($this->time(), $after);
    }
}
