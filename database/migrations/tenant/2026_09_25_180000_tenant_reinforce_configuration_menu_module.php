<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Refuerzo: garantiza módulo configuration_menu en el tenant y lo asigna a admins.
 * Sin esta fila, activarlo desde el panel system no persiste (mapeo por value vacío).
 */
return new class extends Migration
{
    public function up()
    {
        $oldLevel = DB::connection('tenant')->table('module_levels')
            ->where('value', 'configuration_menu')
            ->first();

        if ($oldLevel) {
            DB::connection('tenant')->table('module_level_user')
                ->where('module_level_id', $oldLevel->id)
                ->delete();

            DB::connection('tenant')->table('module_levels')
                ->where('id', $oldLevel->id)
                ->delete();
        }

        $module = DB::connection('tenant')->table('modules')
            ->where('value', 'configuration_menu')
            ->first();

        if (!$module) {
            $moduleId = DB::connection('tenant')->table('modules')->insertGetId([
                'value' => 'configuration_menu',
                'description' => 'Configurar menú',
                'order_menu' => 27,
            ]);
        } else {
            $moduleId = $module->id;
            DB::connection('tenant')->table('modules')
                ->where('id', $moduleId)
                ->update([
                    'description' => 'Configurar menú',
                    'order_menu' => 27,
                ]);
        }

        $userIds = DB::connection('tenant')->table('users')
            ->where('type', 'admin')
            ->pluck('id');

        foreach ($userIds as $userId) {
            $exists = DB::connection('tenant')->table('module_user')
                ->where('user_id', $userId)
                ->where('module_id', $moduleId)
                ->exists();

            if (!$exists) {
                DB::connection('tenant')->table('module_user')->insert([
                    'user_id' => $userId,
                    'module_id' => $moduleId,
                ]);
            }
        }
    }

    public function down()
    {
        // No revertimos asignación: el menú puede estar en uso.
    }
};
