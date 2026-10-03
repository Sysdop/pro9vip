<?php

namespace App\Services\System\TenantSchedules\Definitions;

use App\Services\System\TenantSchedules\BaseScheduleDefinition;
use Illuminate\Support\Carbon;
use Modules\FullSuscription\Models\Tenant\SuscriptionPaymentReminder;

/**
 * Recordatorios de pago: se agenda a la hora de cada recordatorio en lugar de revisar cada minuto
 */
class SuscriptionSendRemindersDefinition extends BaseScheduleDefinition
{
    public function command(): string
    {
        return 'suscription:send-reminders';
    }

    public function module(): string
    {
        return 'suscription';
    }

    public function watchedModels(): array
    {
        return [SuscriptionPaymentReminder::class];
    }

    public function isNeeded(): bool
    {
        return $this->tableExists(SuscriptionPaymentReminder::class)
            && SuscriptionPaymentReminder::query()->whereNotNull('reminder_time')->exists();
    }

    public function nextRunAt(Carbon $after): ?Carbon
    {
        return SuscriptionPaymentReminder::query()
            ->whereNotNull('reminder_time')
            ->get()
            ->map(function (SuscriptionPaymentReminder $reminder) use ($after) {
                return $this->nextDailyOccurrence($reminder->reminder_time->format('H:i'), $after);
            })
            ->sort()
            ->first();
    }

    /**
     * El comando procesa los recordatorios de la hora y el dia programados, aunque la
     * ejecucion llegue tarde
     */
    public function options(Carbon $scheduled_at): array
    {
        return [
            '--time' => $scheduled_at->format('H:i'),
            '--date' => $scheduled_at->format('Y-m-d'),
        ];
    }
}
