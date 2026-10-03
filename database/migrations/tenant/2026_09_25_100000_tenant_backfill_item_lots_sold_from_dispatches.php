<?php

use App\Models\Tenant\Dispatch;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Modules\Item\Models\ItemLot;

/**
 * Backfill: series usadas en guías que descontaron stock pero quedaron con has_sale=0.
 *
 * Antes del fix en InventoryKardexServiceProvider::dispatch(), la guía bajaba stock
 * pero no marcaba ItemLot.has_sale, por eso el kardex por series seguía en DISPONIBLE.
 *
 * Idempotente: solo pone has_sale=1, nunca lo apaga.
 */
class TenantBackfillItemLotsSoldFromDispatches extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('dispatches') || !Schema::hasTable('dispatch_items') || !Schema::hasTable('item_lots')) {
            return;
        }

        $dispatches = Dispatch::query()
            ->with(['items', 'transfer_reason_type'])
            ->where('document_type_id', '09')
            ->whereNotIn('state_type_id', ['09', '11'])
            ->whereNull('reference_document_id')
            ->whereNull('reference_sale_note_id')
            ->whereNull('reference_order_note_id')
            ->where(function ($q) {
                $q->whereNull('transfer_reason_type_id')
                    ->orWhere('transfer_reason_type_id', '!=', '04');
            })
            ->get();

        $lotIds = [];

        foreach ($dispatches as $dispatch) {
            $reason = $dispatch->transfer_reason_type;
            if (!$reason || !$reason->discount_stock) {
                continue;
            }

            foreach ($dispatch->items as $dispatchItem) {
                $itemData = $dispatchItem->item;
                if (!$itemData || empty($itemData->lots)) {
                    continue;
                }

                foreach ((array) $itemData->lots as $lot) {
                    $lot = (object) $lot;
                    if (empty($lot->id) || empty($lot->has_sale)) {
                        continue;
                    }
                    $lotIds[(int) $lot->id] = true;
                }
            }
        }

        if (empty($lotIds)) {
            return;
        }

        ItemLot::query()
            ->whereIn('id', array_keys($lotIds))
            ->where('has_sale', false)
            ->update(['has_sale' => true]);
    }

    public function down()
    {
        // No revertimos: no se puede saber cuáles se activaron solo por este backfill.
    }
}
