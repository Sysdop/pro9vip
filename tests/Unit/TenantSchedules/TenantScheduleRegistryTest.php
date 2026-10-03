<?php

namespace Tests\Unit\TenantSchedules;

use App\Models\System\TenantSchedule;
use App\Services\System\TenantSchedules\Definitions\SuscriptionSendRemindersDefinition;
use App\Services\System\TenantSchedules\TenantScheduleRegistry;
use Illuminate\Support\Carbon;
use Modules\Ecommerce\Models\Tenant\DiscountCampaign;
use Modules\FullSuscription\Models\Tenant\SuscriptionPaymentReminder;

/**
 * La agenda se mantiene sola al guardar datos del tenant: la empresa entra a
 * tenant_schedules cuando tiene trabajo y sale cuando ya no
 */
class TenantScheduleRegistryTest extends TenantSchedulesTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        Carbon::setTestNow('2026-09-25 10:00:00');
    }

    public function test_saving_a_reminder_registers_the_company_at_its_time(): void
    {
        $website = $this->website('tenancy_a');
        $this->environment->tenant($website);

        SuscriptionPaymentReminder::create([
            'reminder_days' => 1,
            'reminder_type' => 'before',
            'reminder_time' => Carbon::today()->setTime(16, 4),
            'shipping_medium' => 'email',
        ]);

        $schedule = $this->row($website, 'suscription:send-reminders');

        $this->assertTrue($schedule->is_active);
        $this->assertSame('2026-09-25 16:04', $schedule->next_run_at->format('Y-m-d H:i'));
    }

    public function test_changing_the_reminder_time_moves_the_schedule(): void
    {
        $website = $this->website('tenancy_a');
        $this->environment->tenant($website);

        $reminder = SuscriptionPaymentReminder::create([
            'reminder_days' => 1,
            'reminder_type' => 'before',
            'reminder_time' => Carbon::today()->setTime(16, 4),
            'shipping_medium' => 'email',
        ]);

        $reminder->update(['reminder_time' => Carbon::today()->setTime(9, 15)]);

        // 09:15 de hoy ya paso a las 10:00: el siguiente turno es mañana
        $this->assertSame('2026-09-26 09:15', $this->row($website, 'suscription:send-reminders')->next_run_at->format('Y-m-d H:i'));
    }

    public function test_deleting_the_last_reminder_removes_the_company_from_the_schedule(): void
    {
        $website = $this->website('tenancy_a');
        $this->environment->tenant($website);

        $reminder = SuscriptionPaymentReminder::create([
            'reminder_days' => 1,
            'reminder_type' => 'before',
            'reminder_time' => Carbon::today()->setTime(16, 4),
            'shipping_medium' => 'email',
        ]);

        $reminder->delete();

        $schedule = $this->row($website, 'suscription:send-reminders');
        $this->assertFalse($schedule->is_active);
        $this->assertNull($schedule->next_run_at);
    }

    public function test_campaign_is_scheduled_at_its_expiration_and_removed_when_deleted(): void
    {
        $website = $this->website('tenancy_a');
        $this->environment->tenant($website);

        $campaign = DiscountCampaign::create([
            'name' => 'Primavera',
            'value' => 10,
            'expires_at' => Carbon::parse('2026-10-01 23:59'),
            'is_active' => true,
        ]);

        $this->assertSame('2026-10-01 23:59', $this->row($website, 'ecommerce:expire-discount-campaigns')->next_run_at->format('Y-m-d H:i'));

        $campaign->delete();

        $this->assertFalse($this->row($website, 'ecommerce:expire-discount-campaigns')->is_active);
    }

    /**
     * Guardar datos sin empresa activa (migraciones, seeders) no escribe en la agenda
     */
    public function test_without_active_company_nothing_is_registered(): void
    {
        SuscriptionPaymentReminder::create([
            'reminder_days' => 1,
            'reminder_type' => 'before',
            'reminder_time' => Carbon::today()->setTime(16, 4),
            'shipping_medium' => 'email',
        ]);

        $this->assertSame(0, TenantSchedule::count());
    }

    /**
     * El sync diario solo registra empresas con trabajo: las demas no quedan en la agenda
     */
    public function test_sync_registers_only_commands_with_pending_work(): void
    {
        $website = $this->website('tenancy_a');
        $this->reminder('16:04');

        $this->environment->tenant($website);
        TenantScheduleRegistry::syncAll($website);

        $this->assertSame(['suscription:send-reminders'], TenantSchedule::where('is_active', true)->pluck('command')->all());
    }

    public function test_reminders_receive_the_scheduled_day_and_time(): void
    {
        $options = (new SuscriptionSendRemindersDefinition())->options(Carbon::parse('2026-09-24 23:50'));

        $this->assertSame(['--time' => '23:50', '--date' => '2026-09-24'], $options);
    }

    private function row($website, string $command): TenantSchedule
    {
        return TenantSchedule::where('website_id', $website->id)->where('command', $command)->firstOrFail();
    }
}
