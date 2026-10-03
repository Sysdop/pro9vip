<?php

namespace App\Traits;

use App\Models\Tenant\ItemUnitType;
use App\Models\Tenant\ItemUnitTypePrice;
use Illuminate\Support\Facades\Log;

/**
 * Valida la presentación (factor de unidades) del JSON `item` en las líneas que mueven stock.
 *
 * El inventario multiplica la cantidad por item->presentation->quantity_unit, que llega del
 * cliente. El formulario podía enviar la presentación de otro producto (se quedaba la del
 * producto elegido antes), así que aquí se verifica contra BD que la presentación pertenezca
 * al item de la línea y se usa el quantity_unit de BD. Si no pertenece, se descarta.
 *
 * Solo actúa cuando se escribe el campo item: las líneas históricas conservan el factor con
 * el que movieron stock, para que su reversión (anulación/edición) devuelva lo mismo.
 */
trait SanitizesItemPresentation
{
    public static function bootSanitizesItemPresentation()
    {
        static::saving(function ($model) {
            $model->sanitizeItemPresentation();
        });
    }

    public function sanitizeItemPresentation()
    {
        if (!$this->isDirty('item') || empty($this->attributes['item']) || empty($this->item_id)) {
            return;
        }

        $item = json_decode($this->attributes['item']);

        if (!is_object($item) || empty($item->presentation)) {
            return;
        }

        $presentation = (object) $item->presentation;

        if (empty((array) $presentation)) {
            return;
        }

        $unit_type = $this->findOwnItemUnitType($presentation);

        if ($unit_type) {
            if ((float) ($presentation->quantity_unit ?? 0) === (float) $unit_type->quantity_unit
                && (int) ($presentation->item_id ?? 0) === (int) $unit_type->item_id) {
                return;
            }

            if (isset($presentation->quantity_unit) && (float) $presentation->quantity_unit !== (float) $unit_type->quantity_unit) {
                $this->logDiscardedPresentation($presentation, 'factor distinto al de BD, se usa el de BD');
            }

            $presentation->item_id = $unit_type->item_id;
            $presentation->quantity_unit = (float) $unit_type->quantity_unit;
            $item->presentation = $presentation;
        } else {
            $this->logDiscardedPresentation($presentation, 'no pertenece al item de la linea, se descarta');
            $item->presentation = [];
        }

        $this->attributes['item'] = json_encode($item);
    }

    /**
     * Presentación de BD que corresponde al payload, solo si es del item de la línea.
     *
     * @param object $presentation
     * @return ItemUnitType|null
     */
    protected function findOwnItemUnitType($presentation)
    {
        $id = $presentation->id ?? null;

        if ($id && property_exists($presentation, 'price_label_id')) {
            // POS: se guarda la fila de lista de precios, su id es de item_unit_type_prices
            $price = ItemUnitTypePrice::query()->find($id);
            $unit_type = $price
                ? ItemUnitType::query()->without('unit_type')->find($price->item_unit_type_id)
                : null;
        } elseif ($id) {
            $unit_type = ItemUnitType::query()->without('unit_type')->find($id);
        } elseif (isset($presentation->quantity_unit)) {
            // sin id (API/sincronización): se busca entre las presentaciones del propio item
            $query = ItemUnitType::query()->without('unit_type')
                ->where('item_id', $this->item_id)
                ->where('quantity_unit', $presentation->quantity_unit);

            if (!empty($presentation->unit_type_id)) {
                $query->where('unit_type_id', $presentation->unit_type_id);
            }

            $unit_type = $query->first();
        } else {
            $unit_type = null;
        }

        if ($unit_type && (int) $unit_type->item_id === (int) $this->item_id) {
            return $unit_type;
        }

        return null;
    }

    protected function logDiscardedPresentation($presentation, $reason)
    {
        Log::warning('Presentacion de item corregida: ' . $reason, [
            'model' => static::class,
            'id' => $this->id,
            'item_id' => $this->item_id,
            'presentation_id' => $presentation->id ?? null,
            'presentation_item_id' => $presentation->item_id ?? null,
            'quantity_unit' => $presentation->quantity_unit ?? null,
            'quantity' => $this->quantity,
        ]);
    }
}
