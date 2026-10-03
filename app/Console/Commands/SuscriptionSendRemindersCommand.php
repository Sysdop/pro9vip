<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Modules\FullSuscription\Models\Tenant\SuscriptionOrder;
use Modules\FullSuscription\Models\Tenant\SuscriptionPaymentReminder;

class SuscriptionSendRemindersCommand extends Command
{

    const MEDIUM_WS = 'whatsapp';
    const MEDIUM_EMAIL = 'email';

    const TYPE_BEFORE = 'before';
    const TYPE_SAME_DAY = 'same_day';
    const TYPE_AFTER = 'after';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'suscription:send-reminders
        {--time= : Hora programada (HH:MM) cuyos recordatorios se envian; por defecto la hora actual}
        {--date= : Dia programado (Y-m-d) desde el que se cuentan los dias del recordatorio; por defecto hoy}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Ejecuta toda los recordatorios de pago de afiliaciones programados para el día';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $reminders = SuscriptionPaymentReminder::all();

        // tenant-schedules:dispatch envia la hora y el dia programados, asi un atraso no
        // pierde el envio ni cuenta los dias desde otra fecha (ej. 23:50 ejecutado a las 00:05)
        $now = $this->option('time') ? Carbon::createFromFormat('H:i', $this->option('time')) : now();
        $today = $this->option('date') ? Carbon::parse($this->option('date'))->startOfDay() : Carbon::today();

        if ($reminders->count() > 0) {
            foreach ($reminders as $reminder) {
                $medium = $reminder->shipping_medium;
                $type = $reminder->reminder_type;
                $days = $reminder->reminder_days;
                $time = $reminder->reminder_time;

                if ($now->hour == $time->hour && $now->minute == $time->minute) {
                    $orders = SuscriptionOrder::whereIn('status', ['pending', 'rejected', 'expired']);

                    if ($type == self::TYPE_BEFORE) {
                        $orders->whereDate('date_of_due', $today->copy()->addDays($days));
                    } else if ($type == self::TYPE_SAME_DAY) {
                        $orders->whereDate('date_of_due', $today);
                    } else if ($type == self::TYPE_AFTER) {
                        $orders->whereDate('date_of_due', $today->copy()->subDays($days));
                    }
                    $orders = $orders->get();

                    foreach ($orders as $order) {
                        $order->notification([$medium]);
                    }
                }

            }
        }

        return Command::SUCCESS;
    }
}
