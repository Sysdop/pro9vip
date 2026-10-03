<?php

namespace App\Services\System\TenantSchedules\Definitions;

use App\Services\System\TenantSchedules\BaseScheduleDefinition;
use Illuminate\Support\Carbon;
use Modules\Ecommerce\Models\Tenant\DiscountCampaign;

/**
 * Desactiva campañas vencidas: se agenda a la fecha de vencimiento mas proxima
 */
class ExpireDiscountCampaignsDefinition extends BaseScheduleDefinition
{
    public function command(): string
    {
        return 'ecommerce:expire-discount-campaigns';
    }

    public function module(): string
    {
        return 'ecommerce';
    }

    public function watchedModels(): array
    {
        return [DiscountCampaign::class];
    }

    public function isNeeded(): bool
    {
        return $this->tableExists(DiscountCampaign::class)
            && $this->pendingCampaigns()->exists();
    }

    public function nextRunAt(Carbon $after): ?Carbon
    {
        $expires_at = $this->pendingCampaigns()->min('expires_at');

        // una campaña ya vencida queda con fecha pasada y el dispatcher la toma de inmediato
        return $expires_at ? Carbon::parse($expires_at) : null;
    }

    private function pendingCampaigns()
    {
        return DiscountCampaign::query()
            ->where('is_active', true)
            ->whereNotNull('expires_at');
    }
}
