<?php


    namespace App\Models\Tenant;

    use Carbon\Carbon;
    use Eloquent;
    use Hyn\Tenancy\Traits\UsesTenantConnection;
    use Illuminate\Database\Eloquent\Relations\BelongsTo;

    /**
     * Class ColumnsToReport
     *
     * @property int         $id
     * @property int         $user_id
     * @property string|null $report
     * @property string      $columns
     * @property Carbon|null $created_at
     * @property Carbon|null $updated_at
     * @property User        $user
     * @mixin  ModelTenant
     * @mixin  Eloquent
     * @package App\Models\Tenant
     */
    class ColumnsToReport extends ModelTenant
    {
        use UsesTenantConnection;

        // prefijo del reporte que guarda las columnas por defecto de la empresa,
        // se siembra al crear el tenant en la fila del usuario principal
        const TENANT_DEFAULT_PREFIX = 'tenant_default:';

        protected $perPage = 25;

        protected $casts = [
            'user_id' => 'int'
        ];

        protected $fillable = [
            'user_id',
            'report',
            'columns'
        ];

        /**
         * @return BelongsTo
         */
        public function user()
        {
            return $this->belongsTo(User::class);
        }


        public function getColumnsAttribute($value)
        {
            return (null === $value) ? null : (object)json_decode($value);
        }

        public function setColumnsAttribute($value)
        {
            $this->attributes['columns'] = (null === $value) ? null : json_encode($value);
        }
    }
