<?php

namespace Modules\Restaurant\Services;

use App\Models\Tenant\Item;
use Modules\Inventory\Models\ItemWarehouse;
use Modules\Restaurant\Models\RestaurantItemSupply;
use Modules\Restaurant\Models\RestaurantStockProduct;
use Illuminate\Support\Facades\DB;

/**
 * Servicio para gestión de stock en vivo del módulo Restaurant
 *
 * Gestiona el stock disponible considerando cantidades reservadas en mesas activas
 */
class RestaurantStockService
{
    /**
     * Calcula y actualiza el stock de un item en la tabla restaurant_stock_products
     *
     * Determina el stock base desde:
     * - Item::getRestaurantStock() si tiene supplies
     * - Sus componentes si es un set (combo)
     * - ItemWarehouse (primer warehouse) para items normales
     *
     * @param int $item_id
     * @param bool $updateHasSupplies Se mantiene por compatibilidad: has_supplies
     *                                siempre se recalcula (si se asignan insumos a
     *                                un plato despues de creada la fila, el flag
     *                                guardado quedaba desactualizado).
     * @return bool
     */
    public function calculateAndUpdateStock($item_id, $updateHasSupplies = false)
    {
        try {
            $item = Item::find($item_id);

            if (!$item) {
                return false;
            }

            $has_supplies = RestaurantItemSupply::where('item_id', $item_id)->exists();

            if ($has_supplies) {
                $stock = $item->getRestaurantStock();
            } elseif ($item->sets()->exists()) {
                // Antes solo se detectaba el set si el item tenia has_igv; sin el,
                // el combo caia en "item normal" y mostraba el stock del propio combo.
                $stock = $this->calculateSetStock($item);
            } else {
                $stock = $this->warehouseStock($item_id);
            }

            // Actualizar o crear registro en restaurant_stock_products
            RestaurantStockProduct::updateOrCreate(
                ['item_id' => $item_id],
                [
                    'stock' => $stock,
                    'has_supplies' => $has_supplies
                ]
            );

            return true;
        } catch (\Exception $e) {
            \Log::error("Error calculando stock para item {$item_id}: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Stock de un combo: cuantos se pueden armar con el componente limitante.
     *
     * No usa Item::getRestaurantStockSet() porque ese toma items.stock para los
     * componentes sin insumos, columna que no se mantiene en traslados, ajustes,
     * etc. Aqui se lee el mismo item_warehouse que el resto del stock del POS.
     *
     * @param Item $item
     * @return float
     */
    private function calculateSetStock(Item $item)
    {
        $possibleStocks = [];

        foreach ($item->items_sets as $component) {
            $quantity = (float) $component->pivot->quantity;

            if ($quantity <= 0) {
                continue;
            }

            $componentStock = $component->hasRestaurantSupplies()
                ? $component->getRestaurantStock()
                : $this->warehouseStock($component->id);

            $possibleStocks[] = floor($componentStock / $quantity);
        }

        // Sin componentes validos min() lanzaria error y la fila no se actualizaria.
        return empty($possibleStocks) ? 0 : max(0, min($possibleStocks));
    }

    /**
     * Stock del producto en item_warehouse (primer almacen).
     *
     * @param int $item_id
     * @return float
     */
    private function warehouseStock($item_id)
    {
        $itemWarehouse = ItemWarehouse::where('item_id', $item_id)->orderBy('id')->first();

        return $itemWarehouse ? (float) $itemWarehouse->stock : 0;
    }

    /**
     * Reserva una cantidad de un item cuando se agrega a una orden de mesa
     *
     * @param int $item_id
     * @param float $quantity
     * @return bool
     */
    public function reserveQuantity($item_id, $quantity)
    {
        try {
            // Asegurarse de que existe el registro en restaurant_stock_products
            RestaurantStockProduct::firstOrCreate(
                ['item_id' => $item_id],
                [
                    'stock' => 0,
                    'quantity_reserved' => 0,
                    'has_supplies' => false
                ]
            );

            // Incremento atómico. $quantity viene del request: se castea para no
            // interpolar texto del cliente en el SQL.
            RestaurantStockProduct::where('item_id', $item_id)
                ->increment('quantity_reserved', (float) $quantity);

            return true;
        } catch (\Exception $e) {
            \Log::error("Error reservando stock para item {$item_id}: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Libera una cantidad reservada de un item cuando se cierra la mesa
     *
     * Decrementa el campo quantity_reserved con safeguard para no ser negativo
     *
     * @param int $item_id
     * @param float $quantity
     * @return bool
     */
    public function releaseQuantity($item_id, $quantity)
    {
        try {
            // Decrementar sin bajar de 0. Antes se exigia quantity_reserved >= $quantity:
            // con decimales (0.1 * 3 = 0.30000000000000004 vs 0.3000 guardado) la
            // condicion fallaba y la reserva quedaba colgada para siempre.
            // Misma precision que la columna (decimal 12,4) y sin notacion cientifica.
            $quantity = sprintf('%.4F', (float) $quantity);

            RestaurantStockProduct::where('item_id', $item_id)
                ->update([
                    'quantity_reserved' => DB::raw("GREATEST(0, quantity_reserved - {$quantity})")
                ]);

            return true;
        } catch (\Exception $e) {
            \Log::error("Error liberando stock para item {$item_id}: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Obtiene el stock disponible de un item (stock - cantidades reservadas)
     *
     * @param int $item_id
     * @return object|null Objeto con propiedades: stock, quantity_reserved, available
     */
    public function getAvailableStock($item_id)
    {
        try {
            $stockProduct = RestaurantStockProduct::where('item_id', $item_id)->first();

            if (!$stockProduct) {
                // Si no existe registro, calcularlo primero
                $this->calculateAndUpdateStock($item_id);
                $stockProduct = RestaurantStockProduct::where('item_id', $item_id)->first();
            }

            if (!$stockProduct) {
                return (object) [
                    'stock' => 0,
                    'quantity_reserved' => 0,
                    'available' => 0
                ];
            }

            return (object) [
                'stock' => $stockProduct->stock,
                'quantity_reserved' => $stockProduct->quantity_reserved,
                'available' => $stockProduct->stock - $stockProduct->quantity_reserved
            ];
        } catch (\Exception $e) {
            \Log::error("Error obteniendo stock disponible para item {$item_id}: " . $e->getMessage());
            return (object) [
                'stock' => 0,
                'quantity_reserved' => 0,
                'available' => 0
            ];
        }
    }

    /**
     * Sincroniza el stock de todos los items del restaurante
     *
     * Itera sobre todos los items que pertenecen al restaurant y calcula su stock
     * Recalcula el campo has_supplies para cada item
     *
     * @return array Array con count de items procesados
     */
    public function syncAllItems()
    {
        try {
            // Obtener todos los items del restaurant
            $items = Item::where('apply_restaurant', 1)
                ->whereIsActive()
                ->whereNotService()
                ->get();

            $processed = 0;
            $errors = 0;

            foreach ($items as $item) {
                // Pasar true para recalcular has_supplies
                if ($this->calculateAndUpdateStock($item->id, true)) {
                    $processed++;
                } else {
                    $errors++;
                }
            }

            return [
                'processed' => $processed,
                'errors' => $errors,
                'total' => $items->count()
            ];
        } catch (\Exception $e) {
            \Log::error("Error sincronizando todos los items: " . $e->getMessage());
            return [
                'processed' => 0,
                'errors' => 0,
                'total' => 0,
                'error_message' => $e->getMessage()
            ];
        }
    }
}
