<?php

namespace Modules\Purchase\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Modules\Purchase\Models\PurchaseOrder;
use Modules\Inventory\Models\Warehouse;

class PurchaseOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $purchase_order = PurchaseOrder::with(['items'])->find($this->id);

        return [
            'id' => $this->id,
            'external_id' => $this->external_id,
            'number_full' => $this->number_full,
            'upload_filename' => $this->upload_filename,
            'date_of_issue' => $this->date_of_issue->format('Y-m-d'),
            'purchase_order' => $this->transformPurchaseOrder($purchase_order),
            'warehouse' => Warehouse::find($this->establishment_id),
        ];
    }

    /**
     * Payload seguro para el formulario de edición (fechas Y-m-d + ítems normalizados).
     */
    private function transformPurchaseOrder(PurchaseOrder $purchase_order): array
    {
        $data = $purchase_order->toArray();

        $data['date_of_issue'] = optional($purchase_order->date_of_issue)->format('Y-m-d');
        $data['date_of_due'] = optional($purchase_order->date_of_due)->format('Y-m-d');
        $data['items'] = $this->transformItems($purchase_order->items);

        return $data;
    }

    private function transformItems($items)
    {
        return $items->map(function ($row) {
            $item = $row->item;
            if (is_string($item)) {
                $item = json_decode($item);
            }

            return [
                'id' => $row->id,
                'purchase_order_id' => $row->purchase_order_id,
                'purchase_id' => $row->purchase_id,
                'item_id' => $row->item_id,
                'item' => $item,
                'quantity' => $row->quantity,
                'unit_value' => $row->unit_value,
                'affectation_igv_type_id' => $row->affectation_igv_type_id,
                'total_base_igv' => $row->total_base_igv,
                'percentage_igv' => $row->percentage_igv,
                'total_igv' => $row->total_igv,
                'system_isc_type_id' => $row->system_isc_type_id,
                'total_base_isc' => $row->total_base_isc,
                'percentage_isc' => $row->percentage_isc,
                'total_isc' => $row->total_isc,
                'total_base_other_taxes' => $row->total_base_other_taxes,
                'percentage_other_taxes' => $row->percentage_other_taxes,
                'total_other_taxes' => $row->total_other_taxes,
                'total_taxes' => $row->total_taxes,
                'price_type_id' => $row->price_type_id,
                'unit_price' => $row->unit_price,
                'total_value' => $row->total_value,
                'total_charge' => $row->total_charge,
                'total_discount' => $row->total_discount,
                'total' => $row->total,
                'attributes' => $row->attributes,
                'charges' => $row->charges,
                'discounts' => $row->discounts,
                'affectation_igv_type' => $row->affectation_igv_type,
                'system_isc_type' => $row->system_isc_type,
                'price_type' => $row->price_type,
            ];
        })->values()->all();
    }
}
