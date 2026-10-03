<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Agenda de comandos del sistema por empresa.
 *
 * En lugar de ejecutar `tenancy:run <comando>` sobre todas las empresas, cada empresa
 * se registra aqui solo cuando tiene trabajo pendiente para ese comando (recordatorios,
 * campañas por vencer, etc.). El comando tenant-schedules:dispatch lee las filas vencidas
 * y se conecta unicamente a esas empresas.
 *
 * Es independiente de tenant_tasks: aquellas son tareas que configura el usuario,
 * estas son tareas del sistema que se calculan a partir de los datos de cada empresa.
 *
 * Ver App\Services\System\TenantSchedules\TenantScheduleRegistry.
 */
class CreateTenantSchedulesTable extends Migration
{
    public function up()
    {
        Schema::create('tenant_schedules', function (Blueprint $table) {

            $table->bigIncrements('id');

            $table->unsignedBigInteger('website_id');

            // agrupador para filtrar o apagar por modulo (suscription, ecommerce, restaurant)
            $table->string('module', 50);

            // comando artisan que se ejecuta dentro de la empresa
            $table->string('command', 100);

            // proxima ejecucion en la zona horaria de la app (America/Lima);
            // null cuando la empresa ya no tiene trabajo pendiente
            $table->dateTime('next_run_at')->nullable();

            $table->dateTime('last_run_at')->nullable();
            $table->string('last_status', 20)->nullable()->comment('success o error');
            $table->text('last_output')->nullable();

            // bloqueo por fila para que dos ejecuciones no tomen la misma tarea
            $table->dateTime('locked_until')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();

            $table->unique(['website_id', 'command']);

            // el dispatcher busca por estas dos columnas cada minuto
            $table->index(['is_active', 'next_run_at']);

            $table->foreign('website_id')
                ->references('id')
                ->on('websites')
                ->onDelete('cascade');

        });
    }

    public function down()
    {
        Schema::dropIfExists('tenant_schedules');
    }
}
