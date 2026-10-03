<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * tenant:run filtra por execution_time cada minuto; sin indice era un recorrido
 * completo de la tabla en cada corrida del scheduler.
 */
return new class extends Migration
{
    public function up()
    {
        Schema::table('tenant_tasks', function (Blueprint $table) {
            $table->index('execution_time');
        });
    }

    public function down()
    {
        Schema::table('tenant_tasks', function (Blueprint $table) {
            $table->dropIndex(['execution_time']);
        });
    }
};
