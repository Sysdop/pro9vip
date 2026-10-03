<?php

namespace App\Services\System\TenantSchedules\Definitions;

use App\Services\System\TenantSchedules\DailyScheduleDefinition;
use Modules\Restaurant\Models\PrintOrder;

/**
 * Sin modelos observados: las ordenes de impresion se crean muy seguido y la
 * sincronizacion diaria (02:00) alcanza a registrar la empresa antes de las 04:00
 */
class PrunePrintOrdersDefinition extends DailyScheduleDefinition
{
    public function command(): string
    {
        return 'print-orders:prune';
    }

    public function module(): string
    {
        return 'restaurant';
    }

    protected function time(): string
    {
        return '04:00';
    }

    public function isNeeded(): bool
    {
        return $this->tableExists(PrintOrder::class)
            && PrintOrder::query()->where('status', 2)->exists();
    }
}
