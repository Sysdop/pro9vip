<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Modules\FullSuscription\Services\SuscriptionOrderScheduler;

/**
 * Agenda de ordenes de suscripcion por crear.
 *
 * Reemplaza la condicion isToday() de suscription:create-orders, que perdia la orden
 * si el comando no corria justo ese dia. Tambien registra la agenda inicial de las
 * suscripciones activas (ver SuscriptionOrderScheduler::syncAll).
 *
 * Debe correr antes de 2026_09_18_100100_tenant_register_tenant_schedules, que
 * calcula la agenda central a partir de esta tabla.
 */
return new class extends Migration
{
    public function up()
    {
        Schema::create('suscription_order_schedules', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('suscription_id');

            // dia en que se debe crear la orden (fecha de creacion menos los dias de
            // anticipacion configurados); tambien es el date_of_issue de la orden
            $table->date('run_date');

            $table->string('status', 20)->default('pending')->comment('pending, done, skipped o error');

            // orden generada, cuando status = done
            $table->unsignedBigInteger('suscription_order_id')->nullable();

            $table->dateTime('processed_at')->nullable();
            $table->text('error')->nullable();
            $table->timestamps();

            // una sola orden por suscripcion y fecha
            $table->unique(['suscription_id', 'run_date']);

            // el comando busca las pendientes vencidas
            $table->index(['status', 'run_date']);
        });

        if (Schema::hasTable('user_rel_suscription_plans')) {
            app(SuscriptionOrderScheduler::class)->syncAll();
        }
    }

    public function down()
    {
        Schema::dropIfExists('suscription_order_schedules');
    }
};
