<?php

namespace Modules\Restaurant\Observers;

use Modules\Restaurant\Models\Supply;
use Modules\Restaurant\Services\RestaurantStockSync;

/**
 * El stock de los insumos vive en supplies.stock (no en item_warehouse): cuando
 * cambia hay que recalcular todos los platos que lo usan, no solo el vendido.
 */
class SupplyStockObserver
{
    public function __construct(
        private readonly RestaurantStockSync $sync
    ) {}

    public function saved(Supply $supply): void
    {
        if (!$supply->wasRecentlyCreated && !$supply->wasChanged('stock')) {
            return;
        }

        $this->sync->touchSupplies([$supply->id]);
    }

    public function deleted(Supply $supply): void
    {
        $this->sync->touchSupplies([$supply->id]);
    }
}
