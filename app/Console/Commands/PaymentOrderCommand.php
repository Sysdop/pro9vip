<?php

namespace App\Console\Commands;

use App\Http\Controllers\System\PaymentOrderController;
use App\Models\System\Client;
use App\Models\System\Configuration;
use App\Models\System\PaymentOrder;
use Carbon\Carbon;
use Hyn\Tenancy\Environment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class PaymentOrderCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'order:payments';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando para la creación de ordenes de pago rapidas';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * Programado cada hora. La configuracion se lee una sola vez y los clientes solo se
     * cargan cuando ya paso la hora configurada, asi las corridas fuera de hora no tocan
     * la tabla de clientes. Es idempotente: si ya existe una orden del mes para el
     * cliente no se vuelve a crear, por eso puede correr varias veces en el dia y
     * recuperar una corrida perdida.
     *
     * @return mixed
     */
    public function handle()
    {
        $config = Configuration::first();

        if (!$config || !$config->active_cron) return self::SUCCESS;

        $now = now();

        // vence ordenes del sistema en la primera corrida del dia
        if ($now->hour === 0) {
            $this->verifiedOrder();
        }

        $hour_notification = $now->copy()->setTimeFromTimeString($config->hour_generate_payment_order ?: '00:00');

        if ($now->lt($hour_notification)) {
            $this->line("Aun no es la hora configurada ({$hour_notification->format('H:i')}), no se generan ordenes.");
            return self::SUCCESS;
        }

        $clients = Client::where('locked_tenant', false)
            ->whereNotNull('ending_billing_cycle')
            ->get();

        if ($clients->isEmpty()) return self::SUCCESS;

        // ordenes del mes de todos los clientes en una consulta, en vez de una por cliente
        $orders_of_month = PaymentOrder::whereBetween('date_of_due', [$now->copy()->startOfMonth(), $now->copy()->endOfMonth()])
            ->whereIn('client_id', $clients->pluck('id'))
            ->get()
            ->groupBy('client_id');

        $created = 0;

        foreach ($clients as $client) {
            if ($orders_of_month->has($client->id)) continue;

            if ($this->createOrderPayment($client, $config, $now)) $created++;
        }

        $this->info("{$created} orden(es) de pago generada(s) de {$clients->count()} cliente(s).");

        return self::SUCCESS;
    }

    /**
     * Crea la orden si hoy es el dia de aviso del cliente (vencimiento menos day_before_due)
     */
    private function createOrderPayment(Client $client, Configuration $config, Carbon $now): bool
    {
        $notification_day = Carbon::parse($client->ending_billing_cycle)->subDays((int) $config->day_before_due);

        if (!$notification_day->isSameDay($now)) return false;

        $id = $client->createPayemtnOrder()->id; // Crear orden de pago

        if ($config->send_notification_cron) {
            app(PaymentOrderController::class)->notify($id);
        }

        return true;
    }

    private function verifiedOrder()
    {
        $range_start= now()->startOfMonth();
        $range_end= now()->endOfMonth();
        $order_payments = PaymentOrder::whereBetween('date_of_due', [$range_start, $range_end])
                        ->where('order_state_id', 1) 
                        ->get();


        foreach ($order_payments as $order_payment) {
            if (($order_payment->created_by  === 'Sistema') && (Carbon::now()->greaterThan(Carbon::parse($order_payment->date_of_due)) && $order_payment->order_state_id == 1)) {
                $client = $order_payment->client;
                $client->locked_tenant = true;
                $client->save();

                $tenancy = app(Environment::class);
                $tenancy->tenant($client->hostname->website);
                DB::connection('tenant')->table('configurations')->where('id', 1)->update(['locked_tenant' => $client->locked_tenant]);
                $order_payment->order_state_id = 3; // Vencida
                $order_payment->save();
            }
        }

    }
}
