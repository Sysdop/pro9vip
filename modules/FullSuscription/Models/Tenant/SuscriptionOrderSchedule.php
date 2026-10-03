<?php

namespace Modules\FullSuscription\Models\Tenant;

use App\Models\Tenant\ModelTenant;

/**
 * Orden de suscripcion por crear en una fecha.
 *
 * suscription:create-orders procesa las filas pendientes con run_date <= hoy, asi
 * un dia sin ejecucion se recupera al siguiente. Ver SuscriptionOrderScheduler.
 *
 * @property int $suscription_id
 * @property \Illuminate\Support\Carbon $run_date
 * @property string $status
 * @property int|null $suscription_order_id
 * @property \Illuminate\Support\Carbon|null $processed_at
 * @property string|null $error
 */
class SuscriptionOrderSchedule extends ModelTenant
{
    const STATUS_PENDING = 'pending';
    const STATUS_DONE = 'done';
    const STATUS_SKIPPED = 'skipped';
    const STATUS_ERROR = 'error';

    protected $fillable = [
        'suscription_id',
        'run_date',
        'status',
        'suscription_order_id',
        'processed_at',
        'error',
    ];

    protected $casts = [
        'run_date' => 'date',
        'processed_at' => 'datetime',
    ];

    public function suscription()
    {
        return $this->belongsTo(UserRelSuscriptionPlan::class, 'suscription_id');
    }

    public function suscription_order()
    {
        return $this->belongsTo(SuscriptionOrder::class, 'suscription_order_id');
    }

    public function scopeDue($query, $date)
    {
        return $query->where('status', self::STATUS_PENDING)
            ->whereDate('run_date', '<=', $date);
    }
}
