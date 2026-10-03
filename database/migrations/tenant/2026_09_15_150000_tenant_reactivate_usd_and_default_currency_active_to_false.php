<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Reactiva USD y deja las nuevas monedas inactivas por defecto.
 */
return new class extends Migration
{
    public function up()
    {
        if (!Schema::connection('tenant')->hasTable('cat_currency_types')) {
            return;
        }

        DB::connection('tenant')->statement(
            'ALTER TABLE cat_currency_types ALTER COLUMN active SET DEFAULT 0'
        );

        DB::connection('tenant')->table('cat_currency_types')
            ->where('id', 'USD')
            ->update(['active' => true]);
    }

    public function down()
    {
        if (!Schema::connection('tenant')->hasTable('cat_currency_types')) {
            return;
        }

        DB::connection('tenant')->table('cat_currency_types')
            ->where('id', 'USD')
            ->update(['active' => false]);

        DB::connection('tenant')->statement(
            'ALTER TABLE cat_currency_types ALTER COLUMN active DROP DEFAULT'
        );
    }
};
