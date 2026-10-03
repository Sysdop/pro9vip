<?php

namespace App\Services\System\TenantSchedules\Definitions;

use App\Services\System\TenantSchedules\BaseScheduleDefinition;
use Illuminate\Support\Carbon;
use Modules\FullSuscription\Models\Tenant\SuscriptionOrder;

/**
 * Se agenda el dia de vencimiento de la orden pendiente mas proxima.
 *
 * No necesita una agenda propia: date_of_due ya esta guardado en la orden y el comando
 * marca todas las vencidas, asi que un dia perdido se recupera en la siguiente ejecucion.
 */
class SuscriptionCheckExpiredDefinition extends BaseScheduleDefinition
{
    const TIME = '08:30';

    public function command(): string
    {
        return 'suscription:check-expired';
    }

    public function module(): string
    {
        return 'suscription';
    }

    public function watchedModels(): array
    {
        return [SuscriptionOrder::class];
    }

    public function isNeeded(): bool
    {
        return $this->tableExists(SuscriptionOrder::class)
            && $this->pendingOrders()->exists();
    }

    public function nextRunAt(Carbon $after): ?Carbon
    {
        $date_of_due = $this->pendingOrders()->min('date_of_due');

        return $date_of_due ? $this->nextDailyOccurrenceFrom(self::TIME, $after, Carbon::parse($date_of_due)) : null;
    }

    private function pendingOrders()
    {
        return SuscriptionOrder::query()->where('status', SuscriptionOrder::STATUS_PENDING);
    }
}
