<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Modules\FullSuscription\Models\Tenant\SuscriptionOrderSchedule;
use Modules\FullSuscription\Services\SuscriptionOrderScheduler;
use Throwable;

class SuscriptionCreateOrdersCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'suscription:create-orders
        {--dry-run : Muestra las ordenes que se crearian, sin crearlas}
        {--date= : Fecha a simular con --dry-run (Y-m-d); por defecto hoy}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create Ordenes de las suscripciones de las suscripciones activas respecto a su frecuencia de cobro';

    /**
     * Rondas maximas por ejecucion. Al crear una orden atrasada se agenda la siguiente, que
     * puede seguir vencida (ej. plan diario con varios dias perdidos); se repite hasta que
     * no quede ninguna, con este tope como resguardo.
     */
    const MAX_ROUNDS = 15;

    /**
     * Execute the console command.
     * Crea las ordenes pendientes de suscription_order_schedules con run_date <= hoy.
     * La fecha de cada orden la calcula SuscriptionOrderScheduler (periodo del plan y
     * dias de anticipacion); aqui solo se ejecuta la agenda.
     * @return int
     */
    public function handle(SuscriptionOrderScheduler $scheduler)
    {
        if (!$scheduler->isAvailable()) {
            $this->info('Sin agenda de suscripciones en esta empresa');
            return Command::SUCCESS;
        }

        if ($this->option('dry-run')) {
            return $this->simulate($scheduler);
        }

        $today = Carbon::today();
        $created = 0;
        $failed = 0;

        for ($round = 0; $round < self::MAX_ROUNDS; $round++) {

            $schedules = SuscriptionOrderSchedule::due($today)
                ->with('suscription.suscription_plan')
                ->orderBy('run_date')
                ->get();

            if ($schedules->isEmpty()) break;

            foreach ($schedules as $schedule) {
                // Una suscripcion con datos invalidos no debe impedir que las demas generen su orden
                try {
                    if ($this->processSchedule($schedule, $scheduler)) $created++;
                } catch (Throwable $e) {
                    $failed++;
                    $schedule->update([
                        'status' => SuscriptionOrderSchedule::STATUS_ERROR,
                        'error' => $e->getMessage(),
                        'processed_at' => Carbon::now(),
                    ]);

                    $message = "Suscripcion #{$schedule->suscription_id} ({$schedule->run_date->format('Y-m-d')}): {$e->getMessage()}";
                    $this->error($message);
                    Log::error("suscription:create-orders {$message}");
                }
            }
        }

        $this->info("Ordenes creadas: {$created}");

        if ($failed > 0) {
            return Command::FAILURE;
        }

        return Command::SUCCESS;
    }

    /**
     * Crea la orden de la fecha agendada y agenda la siguiente
     */
    private function processSchedule(SuscriptionOrderSchedule $schedule, SuscriptionOrderScheduler $scheduler): bool
    {
        $suscription = $schedule->suscription;

        if (!$suscription) {
            $this->skip($schedule, 'Suscripcion no encontrada');
            return false;
        }

        return DB::connection('tenant')->transaction(function () use ($schedule, $suscription, $scheduler) {

            // la suscripcion pudo cambiar desde que se agendo (cancelada, periodos completos)
            $reason = $scheduler->reasonCannotCreateOrder($suscription);

            if ($reason !== null) {
                $this->skip($schedule, $reason);
                $scheduler->syncSuscription($suscription);
                return false;
            }

            return SuscriptionOrderScheduler::withoutListeners(function () use ($schedule, $suscription, $scheduler) {

                // una orden recuperada de un dia perdido se emite con la fecha en que debio crearse
                $order = $suscription->createOrder([
                    'date_of_issue' => $schedule->run_date->format('Y-m-d'),
                ]);

                $schedule->update([
                    'status' => SuscriptionOrderSchedule::STATUS_DONE,
                    'suscription_order_id' => $order->id,
                    'error' => null,
                    'processed_at' => Carbon::now(),
                ]);

                // agenda la siguiente orden, o finaliza la suscripcion si fue la ultima
                $scheduler->syncSuscription($suscription->fresh('suscription_plan'));

                return true;
            });
        });
    }

    /**
     * Lista las ordenes pendientes a la fecha simulada. Solo lee: no crea ordenes ni cambia la
     * agenda. Muestra la primera ronda; si una suscripcion tiene varias fechas atrasadas,
     * las siguientes aparecen recien cuando se crea la anterior.
     */
    private function simulate(SuscriptionOrderScheduler $scheduler): int
    {
        $date = $this->option('date') ? Carbon::parse($this->option('date'))->startOfDay() : Carbon::today();

        $schedules = SuscriptionOrderSchedule::due($date)
            ->with('suscription.suscription_plan')
            ->orderBy('run_date')
            ->get();

        if ($schedules->isEmpty()) {
            $this->info("Sin ordenes por crear al {$date->format('Y-m-d')}.");
            return Command::SUCCESS;
        }

        $this->table(
            ['Suscripcion', 'Cliente', 'Plan', 'Emision', 'Vencimiento', 'Monto', 'Resultado'],
            $schedules->map(function (SuscriptionOrderSchedule $schedule) use ($scheduler) {
                $suscription = $schedule->suscription;

                if (!$suscription) {
                    return [$schedule->suscription_id, '-', '-', $schedule->run_date->format('Y-m-d'), '-', '-', 'Se omite: suscripcion no encontrada'];
                }

                $reason = $scheduler->reasonCannotCreateOrder($suscription);

                try {
                    $date_of_due = $reason === null ? $suscription->orderCreationDate()->format('Y-m-d') : '-';
                } catch (Throwable $e) {
                    $date_of_due = '-';
                    $reason = "Error: {$e->getMessage()}";
                }

                return [
                    $suscription->id,
                    data_get($suscription->customer, 'name', '-'),
                    optional($suscription->suscription_plan)->name ?? '-',
                    $schedule->run_date->format('Y-m-d'),
                    $date_of_due,
                    $suscription->total,
                    $reason === null ? 'Se crea' : "Se omite: {$reason}",
                ];
            })->all()
        );

        return Command::SUCCESS;
    }

    private function skip(SuscriptionOrderSchedule $schedule, string $reason): void
    {
        $schedule->update([
            'status' => SuscriptionOrderSchedule::STATUS_SKIPPED,
            'error' => $reason,
            'processed_at' => Carbon::now(),
        ]);
    }

}
