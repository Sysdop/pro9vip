<?php

namespace App\Console;

use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Console\Scheduling\Schedule;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule) {
        // Tareas por empresa (tenant_tasks): filtra por la hora exacta y solo se conecta a las
        // empresas con trabajo en este minuto. withoutOverlapping evita que una tarea larga
        // haga que el siguiente minuto abra otra instancia sobre la misma base.
        $schedule->command('tenant:run')
            ->everyMinute()
            ->withoutOverlapping(10);
        // Se ejecutara por hora guardando estado de cpu y memoria (windows/linux)
        //$schedule->command('status:server')->everyMinute();
        // Ordenes de pago del central: el comando solo genera algo cuando la hora coincide con
        // hour_generate_payment_order y bloquea morosos a las 00:00, asi que basta correrlo una
        // vez por hora. Antes corria cada minuto recorriendo todos los clientes.
        $schedule->command('order:payments')
            ->hourly()
            ->withoutOverlapping(30)
            ->appendOutputTo(storage_path('logs/order_create.log'));
        // Comandos por empresa (suscripciones, campañas de descuento, ordenes de impresion):
        // se ejecutan solo en las empresas registradas en tenant_schedules, no con tenancy:run
        // sobre todas. Ver App\Services\System\TenantSchedules\TenantScheduleRegistry.
        // withoutOverlapping con expiracion: si el proceso muere, el bloqueo no frena la agenda
        // 24 horas. En segundo plano para no retrasar los demas comandos del minuto.
        $schedule->command('tenant-schedules:dispatch')
            ->everyMinute()
            ->withoutOverlapping(15)
            ->runInBackground()
            ->appendOutputTo(storage_path('logs/tenant_schedules.log'));
        // Red de seguridad: recalcula la agenda de todas las empresas una vez al dia,
        // antes de print-orders:prune (04:00) y de las suscripciones (08:00)
        $schedule->command('tenant-schedules:sync')->dailyAt('02:00')->timezone('America/Lima')->appendOutputTo(storage_path('logs/tenant_schedules_sync.log'));
        // Marketplace: minimización de retención (Ley 29733) — purga contactos e IPs viejas
        $schedule->command('marketplace:purge')->dailyAt('03:30')->timezone('America/Lima')->appendOutputTo(storage_path('logs/marketplace_purge.log'));
        // Limpieza de archivos por empresa segun lo programado en storage_cleanup_configurations.
        // Corre cada 15 min porque la hora la define cada configuracion, no el schedule; el
        // comando compara contra last_run_at, asi que una corrida perdida se recupera igual.
        $schedule->command('storage:clean')
            ->everyFifteenMinutes()
            ->withoutOverlapping(60)
            ->timezone('America/Lima')
            ->appendOutputTo(storage_path('logs/storage_clean.log'));
        // Bandeja de backups del central: borra vencidos, libera procesos colgados y
        // limpia parciales huerfanos. Corre despues de las otras purgas nocturnas.
        $schedule->command('backup:prune')->dailyAt('05:00')->timezone('America/Lima')->appendOutputTo(storage_path('logs/backup_prune.log'));
        // Reaplican el logo sobre el build de cada app. Es I/O de disco sin cambio real la mayor
        // parte del tiempo; una vez al dia alcanza como red de seguridad tras un deploy.
        $schedule->command('mozo:sync')->dailyAt('04:30')->timezone('America/Lima')->appendOutputTo(storage_path('logs/mozo_sync.log'));
        $schedule->command('vendeya:sync')->dailyAt('04:35')->timezone('America/Lima')->appendOutputTo(storage_path('logs/vendeya_sync.log'));
        // Llena las tablas para libro mayor - Se desactiva CMAR - buscar opcion de url
        // $schedule->command('account_ledger:fill')->hourly();
        
        //restaurar base de datos demo para restaurant
        // $schedule->command('database:restoredemo')->dailyAt('23:50');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands() {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
