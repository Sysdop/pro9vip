<?php

namespace Modules\Inventory\Helpers;

use App\Models\Tenant\Dispatch;
use Modules\Item\Models\ItemLot;

/**
 * Marca ItemLot.has_sale=true para series usadas en guías que descontaron stock.
 * Usado por comando artisan y migraciones de backfill.
 */
class ItemLotDispatchSoldHelper
{
    /**
     * Recorre guías elegibles y marca series. Idempotente.
     *
     * @param  bool $useKardex  Si true, incluye guías con salida neta en kardex aunque el switch actual esté apagado
     * @param  bool $dryRun     Si true, solo calcula candidatos sin escribir
     * @return array{dispatches:int, lot_ids:int, updated:int, pending:int}
     */
    public static function backfill(bool $useKardex = true, bool $dryRun = false): array
    {
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
        $dispatchCount = 0;

        foreach ($dispatches as $dispatch) {
            $reason = $dispatch->transfer_reason_type;
            $switchOn = $reason && $reason->discount_stock;
            $kardexOut = $useKardex && $dispatch->hasDiscountedPhysicalStock();

            if (!$switchOn && !$kardexOut) {
                continue;
            }

            $dispatchCount++;

            foreach ($dispatch->items as $dispatchItem) {
                // No exigir has_sale en el JSON: presencia en la guía = serie usada.
                foreach (ItemLot::extractLotIdsFromItemData($dispatchItem->item, false) as $id) {
                    $lotIds[$id] = true;
                }
            }
        }

        $ids = array_keys($lotIds);
        $pending = empty($ids)
            ? 0
            : (int) ItemLot::query()->whereIn('id', $ids)->where('has_sale', false)->count();

        $updated = 0;
        if (!$dryRun) {
            $updated = ItemLot::markAsSoldByIds($ids);
        }

        return [
            'dispatches' => $dispatchCount,
            'lot_ids' => count($lotIds),
            'pending' => $pending,
            'updated' => $updated,
        ];
    }
}
