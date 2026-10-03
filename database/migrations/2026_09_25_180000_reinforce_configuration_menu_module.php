<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Refuerzo: garantiza "Configurar menú" en system (panel clientes → Apps).
 * Si no existe, al editar un cliente no aparece o no persiste.
 */
return new class extends Migration
{
    public function up()
    {
        DB::connection('system')->table('module_levels')
            ->where('value', 'configuration_menu')
            ->delete();

        $exists = DB::connection('system')->table('modules')
            ->where('value', 'configuration_menu')
            ->exists();

        if (!$exists) {
            DB::connection('system')->table('modules')->insert([
                'value' => 'configuration_menu',
                'description' => 'Configurar menú',
                // > 13 → aparece en el árbol "Apps" del formulario de clientes
                'sort' => 27,
            ]);
        } else {
            DB::connection('system')->table('modules')
                ->where('value', 'configuration_menu')
                ->update([
                    'description' => 'Configurar menú',
                    'sort' => 27,
                ]);
        }
    }

    public function down()
    {
        // No eliminamos: puede estar en uso por clientes.
    }
};
