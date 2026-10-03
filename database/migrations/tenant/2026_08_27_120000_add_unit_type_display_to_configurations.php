<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUnitTypeDisplayToConfigurations extends Migration
{
    public function up()
    {
        if (!Schema::hasColumn('configurations', 'unit_type_display')) {
            Schema::table('configurations', function (Blueprint $table) {
                // code: código SUNAT (NIU), symbol: símbolo (UND), description: nombre completo (Unidades)
                $table->string('unit_type_display', 20)->default('code');
            });
        }
    }

    public function down()
    {
        if (Schema::hasColumn('configurations', 'unit_type_display')) {
            Schema::table('configurations', function (Blueprint $table) {
                $table->dropColumn('unit_type_display');
            });
        }
    }
}
