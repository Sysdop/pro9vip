<?php

namespace App\Models\System;

use Hyn\Tenancy\Models\Website;
use Hyn\Tenancy\Traits\UsesSystemConnection;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * Comando del sistema programado para una empresa.
 *
 * Ver App\Services\System\TenantSchedules\TenantScheduleRegistry.
 *
 * @property int $website_id
 * @property string $module
 * @property string $command
 * @property Carbon|null $next_run_at
 * @property Carbon|null $last_run_at
 * @property string|null $last_status
 * @property string|null $last_output
 * @property Carbon|null $locked_until
 * @property bool $is_active
 */
class TenantSchedule extends Model
{
    use UsesSystemConnection;

    const STATUS_SUCCESS = 'success';
    const STATUS_ERROR = 'error';

    protected $fillable = [
        'website_id',
        'module',
        'command',
        'next_run_at',
        'last_run_at',
        'last_status',
        'last_output',
        'locked_until',
        'is_active',
    ];

    protected $casts = [
        'next_run_at' => 'datetime',
        'last_run_at' => 'datetime',
        'locked_until' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function website()
    {
        return $this->belongsTo(Website::class);
    }

    /**
     * Filas activas cuya ejecucion ya vencio y que no estan tomadas por otra ejecucion
     */
    public function scopeDue(Builder $query, Carbon $now): Builder
    {
        return $query->where('is_active', true)
            ->whereNotNull('next_run_at')
            ->where('next_run_at', '<=', $now)
            ->where(function ($query) use ($now) {
                $query->whereNull('locked_until')
                    ->orWhere('locked_until', '<', $now);
            });
    }

    /**
     * Toma la fila de forma atomica; devuelve false si otra ejecucion ya la tiene.
     *
     * Solo se toma el mismo turno que se leyo: si otra ejecucion ya lo proceso y
     * reprogramo next_run_at, esta copia quedo desactualizada y no debe repetirlo
     */
    public function acquireLock(Carbon $now, int $minutes = 10): bool
    {
        if (!$this->next_run_at) return false;

        $affected = static::query()
            ->where('id', $this->id)
            ->where('is_active', true)
            ->where('next_run_at', $this->next_run_at)
            ->where(function ($query) use ($now) {
                $query->whereNull('locked_until')
                    ->orWhere('locked_until', '<', $now);
            })
            ->update(['locked_until' => $locked_until = $now->copy()->addMinutes($minutes)]);

        if ($affected !== 1) return false;

        // el modelo debe saber que esta bloqueado: si no, update(['locked_until' => null])
        // no ve cambios, Eloquent no lo guarda y la fila queda bloqueada hasta que venza
        $this->locked_until = $locked_until;
        $this->syncOriginalAttribute('locked_until');

        return true;
    }
}
