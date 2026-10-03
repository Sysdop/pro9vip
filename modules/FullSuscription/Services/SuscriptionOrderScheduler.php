<?php

namespace Modules\FullSuscription\Services;

use App\Models\Tenant\Configuration;
use App\Services\System\TenantSchedules\TenantScheduleRegistry;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Modules\FullSuscription\Models\Tenant\SuscriptionOrder;
use Modules\FullSuscription\Models\Tenant\SuscriptionOrderSchedule;
use Modules\FullSuscription\Models\Tenant\UserRelSuscriptionPlan;
use Throwable;

/**
 * Mantiene suscription_order_schedules: una fila pendiente por suscripcion activa con el
 * dia en que se debe crear su proxima orden.
 *
 * La fecha se calcula igual que lo hacia suscription:create-orders:
 * orderCreationDate() menos before_day_creation_suscription_order de la configuracion.
 * Se recalcula al guardar suscripciones, ordenes o esa configuracion, y una vez al dia
 * desde tenant-schedules:sync.
 */
class SuscriptionOrderScheduler
{
    const ACTIVE_STATUSES = ['authorized', 'paused'];

    const STATUS_FINISHED = 'finished';

    /**
     * Atraso maximo que se recupera. Una fecha mas antigua no genera orden: evita crear
     * ordenes retroactivas de suscripciones que quedaron sin orden con la logica anterior
     * (isToday), que nunca recuperaba un dia perdido.
     */
    const MAX_CATCH_UP_DAYS = 7;

    const COMMAND = 'suscription:create-orders';

    /**
     * Mientras el comando crea ordenes, los listeners no recalculan: el comando lo hace
     * al final de cada orden y asi no se reprograma la fila que se esta procesando
     */
    private static $listeners_paused = false;

    private $before_days = null;

    public static function withoutListeners(callable $callback)
    {
        $previous = static::$listeners_paused;
        static::$listeners_paused = true;

        try {
            return $callback();
        } finally {
            static::$listeners_paused = $previous;
        }
    }

    public function isAvailable(): bool
    {
        return Schema::connection('tenant')->hasTable('suscription_order_schedules')
            && Schema::connection('tenant')->hasTable('user_rel_suscription_plans');
    }

    /**
     * Recalcula la agenda de todas las suscripciones activas y de las que tengan filas pendientes
     *
     * @param bool $sync_central tambien actualiza tenant_schedules del central
     */
    public function syncAll(bool $sync_central = true): void
    {
        if (!$this->isAvailable()) return;

        $pending_ids = SuscriptionOrderSchedule::query()
            ->where('status', SuscriptionOrderSchedule::STATUS_PENDING)
            ->pluck('suscription_id');

        UserRelSuscriptionPlan::query()
            ->with('suscription_plan')
            ->where(function ($query) use ($pending_ids) {
                $query->whereIn('subscription_status', self::ACTIVE_STATUSES)
                    ->orWhereIn('id', $pending_ids);
            })
            ->chunkById(100, function ($suscriptions) {
                foreach ($suscriptions as $suscription) {
                    try {
                        $this->syncSuscription($suscription);
                    } catch (Throwable $e) {
                        Log::error("suscription_order_schedules: suscripcion #{$suscription->id}: {$e->getMessage()}");
                    }
                }
            });

        if ($sync_central) {
            TenantScheduleRegistry::syncCommandForCurrentTenant(self::COMMAND);
        }
    }

    /**
     * Deja una sola fila pendiente con la fecha de la proxima orden, o ninguna si la
     * suscripcion ya no debe generar ordenes
     */
    public function syncSuscription(UserRelSuscriptionPlan $suscription): void
    {
        $reason = $this->reasonCannotCreateOrder($suscription);

        if ($reason !== null) {
            $this->skipPending($suscription, $reason);
            $this->markFinishedIfCompleted($suscription);
            return;
        }

        $run_date = $this->runDate($suscription);

        if ($run_date->lt(Carbon::today()->subDays(self::MAX_CATCH_UP_DAYS))) {
            $this->skipPending($suscription, 'Fecha de creacion fuera del periodo de recuperacion');
            Log::warning("suscription_order_schedules: suscripcion #{$suscription->id} con fecha de creacion {$run_date->format('Y-m-d')} fuera del periodo de recuperacion");
            return;
        }

        // una fila pendiente con otra fecha quedo desactualizada (cambio de configuracion,
        // orden creada a mano, etc.)
        $this->skipPending($suscription, 'Reprogramada', $run_date);

        $schedule = SuscriptionOrderSchedule::firstOrNew([
            'suscription_id' => $suscription->id,
            'run_date' => $run_date->format('Y-m-d'),
        ]);

        // una fecha ya procesada no se repite; una omitida o con error vuelve a intentarse
        if ($schedule->exists && $schedule->status === SuscriptionOrderSchedule::STATUS_DONE) return;

        if (!$schedule->exists || $schedule->status !== SuscriptionOrderSchedule::STATUS_PENDING) {
            $schedule->fill([
                'status' => SuscriptionOrderSchedule::STATUS_PENDING,
                'error' => null,
                'processed_at' => null,
            ])->save();
        }
    }

    /**
     * Dia en que se crea la proxima orden: su vencimiento menos los dias de anticipacion,
     * pero nunca antes del vencimiento de la orden anterior (inicio del periodo actual).
     *
     * Sin ese tope, una anticipacion mayor o igual al periodo (ej. 5 dias en un plan diario)
     * da fechas anteriores a la suscripcion y se crearian todas las ordenes de golpe.
     */
    public function runDate(UserRelSuscriptionPlan $suscription): Carbon
    {
        $run_date = $suscription->orderCreationDate()
            ->subDays($this->beforeDays())
            ->startOfDay();

        $period_start = Carbon::parse($suscription->getCurrentDateOfDue())->startOfDay();

        return $run_date->lt($period_start) ? $period_start : $run_date;
    }

    /**
     * Motivo por el que la suscripcion no debe generar ordenes, o null si puede.
     * Replica las condiciones de suscription:create-orders.
     */
    public function reasonCannotCreateOrder(UserRelSuscriptionPlan $suscription): ?string
    {
        if (!in_array($suscription->subscription_status, self::ACTIVE_STATUSES, true)) {
            return 'Suscripcion no activa';
        }

        $plan = $suscription->suscription_plan;

        if (!$plan) {
            return 'Plan de suscripcion no encontrado';
        }

        if ($plan->unlimited) {
            return null;
        }

        // sin cantidad de periodos el comando anterior nunca creaba ordenes
        if (empty($suscription->quantity_period)) {
            return 'Suscripcion sin cantidad de periodos';
        }

        if ($suscription->orders_created >= $suscription->quantity_period) {
            return 'Se alcanzo la cantidad de periodos';
        }

        return null;
    }

    public static function registerModelListeners(): void
    {
        $sync_suscription = function (?UserRelSuscriptionPlan $suscription) {
            if (static::$listeners_paused || !$suscription) return;

            static::safely(function () use ($suscription) {
                $scheduler = app(static::class);

                if (!$scheduler->isAvailable()) return;

                $scheduler->syncSuscription($suscription);
                TenantScheduleRegistry::syncCommandForCurrentTenant(self::COMMAND);
            });
        };

        UserRelSuscriptionPlan::saved($sync_suscription);
        UserRelSuscriptionPlan::deleted($sync_suscription);

        // la ultima orden define la fecha de la siguiente
        $sync_order = function (SuscriptionOrder $order) use ($sync_suscription) {
            if (static::$listeners_paused || !$order->suscription_id) return;

            $sync_suscription(UserRelSuscriptionPlan::find($order->suscription_id));
        };

        SuscriptionOrder::saved($sync_order);
        SuscriptionOrder::deleted($sync_order);

        // los dias de anticipacion mueven la fecha de todas las suscripciones
        Configuration::saved(function (Configuration $configuration) {
            if (static::$listeners_paused || !$configuration->wasChanged('before_day_creation_suscription_order')) return;

            static::safely(function () {
                app(static::class)->syncAll();
            });
        });
    }

    /**
     * Un error al recalcular la agenda nunca debe impedir que el usuario guarde
     */
    private static function safely(callable $callback): void
    {
        try {
            $callback();
        } catch (Throwable $e) {
            Log::error("suscription_order_schedules: no se pudo recalcular la agenda: {$e->getMessage()}");
        }
    }

    private function skipPending(UserRelSuscriptionPlan $suscription, string $reason, ?Carbon $except_date = null): void
    {
        $query = SuscriptionOrderSchedule::query()
            ->where('suscription_id', $suscription->id)
            ->where('status', SuscriptionOrderSchedule::STATUS_PENDING);

        if ($except_date) {
            $query->whereDate('run_date', '!=', $except_date->format('Y-m-d'));
        }

        $query->update([
            'status' => SuscriptionOrderSchedule::STATUS_SKIPPED,
            'error' => $reason,
            'processed_at' => Carbon::now(),
        ]);
    }

    /**
     * Una suscripcion limitada que ya genero todas sus ordenes queda finalizada.
     * saveQuietly: el cambio de estado no debe volver a disparar los listeners.
     */
    private function markFinishedIfCompleted(UserRelSuscriptionPlan $suscription): void
    {
        $plan = $suscription->suscription_plan;

        if (!$plan || $plan->unlimited || empty($suscription->quantity_period)) return;
        if ($suscription->orders_created < $suscription->quantity_period) return;
        if (!in_array($suscription->subscription_status, self::ACTIVE_STATUSES, true)) return;

        $suscription->subscription_status = self::STATUS_FINISHED;
        $suscription->saveQuietly();
    }

    private function beforeDays(): int
    {
        if ($this->before_days === null) {
            $configuration = Configuration::select('before_day_creation_suscription_order')->first();
            $this->before_days = (int) optional($configuration)->before_day_creation_suscription_order;
        }

        return $this->before_days;
    }
}
