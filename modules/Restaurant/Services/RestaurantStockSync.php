<?php

namespace Modules\Restaurant\Services;

use App\Models\Tenant\Item;
use App\Models\Tenant\ItemSet;
use App\Services\CentrifugoService;
use Hyn\Tenancy\Contracts\CurrentHostname;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Modules\Restaurant\Http\Controllers\RestaurantController;
use Modules\Restaurant\Models\RestaurantItemSupply;
use Modules\Restaurant\Models\RestaurantStockProduct;

/**
 * Mantiene restaurant_stock_products al dia a partir de las fuentes reales de
 * stock (item_warehouse para productos, supplies para insumos) y avisa al POS
 * por Centrifugo.
 *
 * Lo disparan los observers de ItemWarehouse y Supply, asi que cubre cualquier
 * flujo que mueva stock (ventas, compras, traslados, ajustes, pedidos...) sin
 * tener que llamarlo a mano en cada uno.
 *
 * - El recalculo espera al commit de la transaccion en curso: si hay rollback
 *   no se toca nada ni se publica un stock que nunca existio.
 * - Se recalculan tambien los dependientes: platos que usan el insumo y combos
 *   (sets) que contienen el producto o el plato.
 * - En HTTP se publica un solo snapshot al terminar el request, aunque se hayan
 *   guardado muchas filas (una venta de 10 items no hace 10 publicaciones).
 */
class RestaurantStockSync
{
    /**
     * @var array<string, bool> fqdn => publicacion pendiente
     */
    private array $pendingPublish = [];

    private bool $terminatingRegistered = false;

    /**
     * Cambio el stock (item_warehouse) de estos productos.
     *
     * @param  array<int>  $itemIds
     */
    public function touchItems(array $itemIds): void
    {
        $itemIds = $this->cleanIds($itemIds);

        if (empty($itemIds)) {
            return;
        }

        $this->afterCommit(function () use ($itemIds) {
            $this->recalculate(array_merge($itemIds, $this->setsContaining($itemIds)));
        });
    }

    /**
     * Cambio el stock de estos insumos: se recalculan los platos que los usan.
     *
     * @param  array<int>  $supplyIds
     */
    public function touchSupplies(array $supplyIds): void
    {
        $supplyIds = $this->cleanIds($supplyIds);

        if (empty($supplyIds)) {
            return;
        }

        $this->afterCommit(function () use ($supplyIds) {
            $dishIds = RestaurantItemSupply::whereIn('supply_id', $supplyIds)
                ->distinct()
                ->pluck('item_id')
                ->all();

            $this->recalculate(array_merge($dishIds, $this->setsContaining($dishIds)));
        });
    }

    /**
     * Pide publicar el snapshot de stock al POS (p. ej. tras reservar o liberar
     * cantidades en mesa). Se agrupa con el resto de cambios del request.
     */
    public function requestPublish(): void
    {
        $this->afterCommit(function () {
            $this->schedulePublish();
        });
    }

    /**
     * @param  array<int>  $itemIds
     */
    private function recalculate(array $itemIds): void
    {
        $itemIds = $this->restaurantItems($this->cleanIds($itemIds));

        if (empty($itemIds)) {
            return;
        }

        $stockService = app(RestaurantStockService::class);

        foreach ($itemIds as $itemId) {
            $stockService->calculateAndUpdateStock($itemId);
        }

        $this->schedulePublish();
    }

    /**
     * Solo interesan los productos del restaurante o los que ya tienen fila
     * (componentes de combos y modificadores reservados en mesa). Asi un
     * movimiento de stock ajeno al modulo no llena la tabla.
     *
     * @param  array<int>  $itemIds
     * @return array<int>
     */
    private function restaurantItems(array $itemIds): array
    {
        if (empty($itemIds)) {
            return [];
        }

        $withRow = RestaurantStockProduct::whereIn('item_id', $itemIds)->pluck('item_id')->all();

        $restaurant = Item::whereIn('id', $itemIds)
            ->where('apply_restaurant', 1)
            ->pluck('id')
            ->all();

        return $this->cleanIds(array_merge($withRow, $restaurant));
    }

    /**
     * Combos que contienen alguno de los productos.
     *
     * @param  array<int>  $itemIds
     * @return array<int>
     */
    private function setsContaining(array $itemIds): array
    {
        if (empty($itemIds)) {
            return [];
        }

        return ItemSet::whereIn('individual_item_id', $itemIds)
            ->distinct()
            ->pluck('item_id')
            ->all();
    }

    private function schedulePublish(): void
    {
        $fqdn = app(CurrentHostname::class)?->fqdn ?? 'local';

        // Fuera de HTTP (colas, artisan) no hay fin de request al que esperar.
        if (app()->runningInConsole()) {
            $this->publish($fqdn);
            return;
        }

        $this->pendingPublish[$fqdn] = true;

        if ($this->terminatingRegistered) {
            return;
        }

        $this->terminatingRegistered = true;

        app()->terminating(function () {
            $pending = array_keys($this->pendingPublish);
            $this->pendingPublish = [];
            $this->terminatingRegistered = false;

            foreach ($pending as $fqdn) {
                $this->publish($fqdn);
            }
        });
    }

    private function publish(string $fqdn): void
    {
        try {
            $data = app(RestaurantController::class)->getStockStatus()['data'] ?? [];

            app(CentrifugoService::class)->publish("restaurant:{$fqdn}", [
                'event'   => 'stock-updated',
                'payload' => $data,
            ]);
        } catch (\Throwable $e) {
            Log::warning('No se pudo publicar el stock del restaurante: ' . $e->getMessage());
        }
    }

    /**
     * Ejecuta el callback al confirmar la transaccion mas externa, o en el acto
     * si no hay ninguna abierta. Si hay rollback el callback se descarta.
     * Nunca debe romper el flujo que movio el stock.
     */
    private function afterCommit(callable $callback): void
    {
        $safe = function () use ($callback) {
            try {
                $callback();
            } catch (\Throwable $e) {
                Log::warning('No se pudo sincronizar el stock del restaurante: ' . $e->getMessage());
            }
        };

        try {
            DB::connection('tenant')->afterCommit($safe);
        } catch (\Throwable $e) {
            $safe();
        }
    }

    /**
     * @param  array<mixed>  $ids
     * @return array<int>
     */
    private function cleanIds(array $ids): array
    {
        return array_values(array_unique(array_filter(array_map('intval', $ids))));
    }
}
