<?php

namespace Tests\Unit\TenantSchedules;

use App\Models\System\TenantSchedule;
use Hyn\Tenancy\Environment;
use Hyn\Tenancy\Models\Website;
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Foundation\Bootstrap\LoadConfiguration;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Tests\TestCase;

/**
 * Base para probar tenant_schedules y tenant:run sin tocar ninguna base real.
 *
 * Las conexiones system y tenant se reemplazan por SQLite en memoria antes de que
 * arranquen los providers, y el Environment de hyn por FakeEnvironment. Todos los
 * websites comparten la misma base tenant en memoria.
 */
abstract class TenantSchedulesTestCase extends TestCase
{
    /**
     * @var FakeEnvironment
     */
    protected $environment;

    public function createApplication()
    {
        $app = require __DIR__.'/../../../bootstrap/app.php';

        $app->afterBootstrapping(LoadConfiguration::class, function ($app) {
            $sqlite = [
                'driver' => 'sqlite',
                'database' => ':memory:',
                'prefix' => '',
                'foreign_key_constraints' => false,
            ];

            $app['config']->set('database.default', 'system');
            $app['config']->set('database.connections.system', $sqlite);
            $app['config']->set('database.connections.tenant', $sqlite);
            $app['config']->set('mail.driver', 'array');
            $app['config']->set('queue.default', 'sync');
            $app['config']->set('cache.default', 'array');
        });

        $app->make(Kernel::class)->bootstrap();

        return $app;
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->environment = new FakeEnvironment();
        $this->app->instance(Environment::class, $this->environment);

        $this->createSystemTables();
        $this->createTenantTables();
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();

        parent::tearDown();
    }

    protected function createSystemTables(): void
    {
        $schema = Schema::connection('system');

        $schema->create('websites', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('uuid');
            $table->string('managed_by_database_connection')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        $schema->create('hostnames', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('fqdn');
            $table->unsignedBigInteger('website_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        $schema->create('tenant_tasks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('uuid')->nullable();
            $table->string('uuid_tenant');
            $table->string('class');
            $table->time('execution_time');
            $table->text('output')->nullable();
            $table->timestamps();
        });

        // la tabla de la agenda se crea con su migracion real
        require_once base_path('database/migrations/2026_09_18_100000_create_tenant_schedules_table.php');
        (new \CreateTenantSchedulesTable())->up();
    }

    protected function createTenantTables(): void
    {
        $schema = Schema::connection('tenant');

        $schema->create('suscription_payment_reminders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('reminder_days')->nullable();
            $table->string('reminder_type')->nullable();
            $table->dateTime('reminder_time')->nullable();
            $table->string('shipping_medium')->nullable();
        });

        $schema->create('suscription_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('suscription_id')->nullable();
            $table->string('status')->default('pending');
            $table->date('date_of_due')->nullable();
            $table->timestamps();
        });

        $schema->create('discount_campaigns', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('discount_type')->nullable();
            $table->decimal('value', 12, 2)->default(0);
            $table->dateTime('starts_at')->nullable();
            $table->dateTime('expires_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });

        $schema->create('tasks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('uuid')->nullable();
            $table->string('class');
            $table->time('execution_time');
            $table->text('output')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Insert directo: con Eloquent los observers de hyn intentarian crear la base del tenant
     */
    protected function website(string $uuid, ?string $fqdn = null): Website
    {
        $id = DB::connection('system')->table('websites')->insertGetId(['uuid' => $uuid]);

        if ($fqdn) {
            DB::connection('system')->table('hostnames')->insert(['fqdn' => $fqdn, 'website_id' => $id]);
        }

        return Website::findOrFail($id);
    }

    protected function schedule(Website $website, string $command, $next_run_at, array $attributes = []): TenantSchedule
    {
        return TenantSchedule::create(array_merge([
            'website_id' => $website->id,
            'module' => 'test',
            'command' => $command,
            'next_run_at' => Carbon::parse($next_run_at),
            'is_active' => true,
        ], $attributes));
    }

    /**
     * Recordatorio de pago insertado sin disparar los listeners del modelo
     */
    protected function reminder(string $time, string $type = 'before', int $days = 1): void
    {
        DB::connection('tenant')->table('suscription_payment_reminders')->insert([
            'reminder_days' => $days,
            'reminder_type' => $type,
            'reminder_time' => Carbon::today()->setTimeFromTimeString($time),
            'shipping_medium' => 'email',
        ]);
    }

    protected function campaign($expires_at, bool $is_active = true): int
    {
        return DB::connection('tenant')->table('discount_campaigns')->insertGetId([
            'name' => 'Campaña '.Str::random(4),
            'value' => 10,
            'expires_at' => $expires_at ? Carbon::parse($expires_at) : null,
            'is_active' => $is_active,
        ]);
    }
}
