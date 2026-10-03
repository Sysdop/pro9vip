<?php

use App\Services\System\TenantSchedules\TenantScheduleRegistry;
use Hyn\Tenancy\Models\Website;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Registra en tenant_schedules (central) los comandos que esta empresa ya necesita:
 * recordatorios de pago, campañas por vencer, suscripciones activas, ordenes de
 * impresion por depurar. Las empresas sin datos para un comando no quedan registradas.
 *
 * Requiere la migracion central 2026_09_18_100000_create_tenant_schedules_table.
 * Si se omite, tenant-schedules:sync hace el mismo registro.
 */
return new class extends Migration
{
    public function up()
    {
        if (!Schema::connection('system')->hasTable('tenant_schedules')) {
            return;
        }

        $website = Website::where('uuid', config('database.connections.tenant.uuid'))->first();

        if (!$website) {
            return;
        }

        TenantScheduleRegistry::syncAll($website);
    }

    public function down()
    {
        $website = Website::where('uuid', config('database.connections.tenant.uuid'))->first();

        if (!$website || !Schema::connection('system')->hasTable('tenant_schedules')) {
            return;
        }

        DB::connection('system')->table('tenant_schedules')
            ->where('website_id', $website->id)
            ->delete();
    }
};
