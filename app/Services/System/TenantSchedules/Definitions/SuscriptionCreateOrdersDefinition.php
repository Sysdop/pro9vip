<?php

namespace App\Services\System\TenantSchedules\Definitions;

use App\Services\System\TenantSchedules\BaseScheduleDefinition;
use Illuminate\Support\Carbon;
use Modules\FullSuscription\Models\Tenant\SuscriptionOrderSchedule;
use Modules\FullSuscription\Services\SuscriptionOrderScheduler;

/**
 * Se agenda el dia de la proxima orden pendiente de suscription_order_schedules.
 *
 * Sin modelos observados: SuscriptionOrderScheduler actualiza esta agenda al cambiar
 * suscripciones, ordenes o la configuracion de dias de anticipacion.
 */
class SuscriptionCreateOrdersDefinition extends BaseScheduleDefinition
{
    const TIME = '08:00';

    public function command(): string
    {
        return 'suscription:create-orders';
    }

    public function module(): string
    {
        return 'suscription';
    }

    public function refresh(): void
    {
        app(SuscriptionOrderScheduler::class)->syncAll(false);
    }

    public function dryRunOptions(Carbon $scheduled_at): ?array
    {
        return ['--dry-run' => true, '--date' => $scheduled_at->format('Y-m-d')];
    }

    public function isNeeded(): bool
    {
        return $this->tableExists(SuscriptionOrderSchedule::class)
            && SuscriptionOrderSchedule::query()
                ->where('status', SuscriptionOrderSchedule::STATUS_PENDING)
                ->exists();
    }

    public function nextRunAt(Carbon $after): ?Carbon
    {
        $run_date = SuscriptionOrderSchedule::query()
            ->where('status', SuscriptionOrderSchedule::STATUS_PENDING)
            ->min('run_date');

        // una fecha vencida (dia perdido) se ejecuta en el siguiente turno de las 08:00
        return $run_date ? $this->nextDailyOccurrenceFrom(self::TIME, $after, Carbon::parse($run_date)) : null;
    }
}
