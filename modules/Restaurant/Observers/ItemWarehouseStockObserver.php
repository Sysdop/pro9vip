<?php

namespace Modules\Restaurant\Observers;

use Illuminate\Database\Eloquent\Model;
use Modules\Restaurant\Services\RestaurantStockSync;

/**
 * Observa item_warehouse (App\Models\Tenant\ItemWarehouse y
 * Modules\Inventory\Models\ItemWarehouse apuntan a la misma tabla) para
 * mantener el stock del restaurante al dia en cualquier flujo que lo mueva.
 *
 * Ojo: los update() masivos (Model::where()->update()) no disparan eventos;
 * cualquier escritura de stock debe hacerse con save() sobre la instancia.
 */
class ItemWarehouseStockObserver
{
    public function __construct(
        private readonly RestaurantStockSync $sync
    ) {}

    public function saved(Model $itemWarehouse): void
    {
        if (!$itemWarehouse->wasRecentlyCreated && !$itemWarehouse->wasChanged('stock')) {
            return;
        }

        $this->sync->touchItems([$itemWarehouse->item_id]);
    }

    public function deleted(Model $itemWarehouse): void
    {
        $this->sync->touchItems([$itemWarehouse->item_id]);
    }
}
