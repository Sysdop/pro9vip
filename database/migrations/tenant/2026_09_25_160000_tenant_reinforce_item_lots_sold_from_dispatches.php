<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Modules\Inventory\Helpers\ItemLotDispatchSoldHelper;

/**
 * Refuerzo del backfill 2026_09_25_100000:
 * - No exige has_sale en el JSON de la guía
 * - Incluye guías con salida neta en kardex aunque el switch del motivo esté apagado
 *
 * Idempotente: solo pone has_sale=1.
 */
class TenantReinforceItemLotsSoldFromDispatches extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('dispatches') || !Schema::hasTable('dispatch_items') || !Schema::hasTable('item_lots')) {
            return;
        }

        ItemLotDispatchSoldHelper::backfill(true);
    }

    public function down()
    {
        // No revertimos.
    }
}
