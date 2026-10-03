<?php

namespace Tests\Unit;

use App\Models\Tenant\DocumentItem;
use App\Models\Tenant\PurchaseItem;
use App\Models\Tenant\SaleNoteItem;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Modules\Order\Models\OrderNoteItem;
use Tests\TestCase;

class SanitizesItemPresentationTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        config([
            'database.connections.tenant' => [
                'driver' => 'sqlite',
                'database' => ':memory:',
                'prefix' => '',
            ],
        ]);
        DB::purge('tenant');

        Schema::connection('tenant')->create('item_unit_types', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('item_id');
            $table->string('unit_type_id');
            $table->decimal('quantity_unit', 12, 4);
        });
        Schema::connection('tenant')->create('item_unit_type_prices', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('item_unit_type_id');
            $table->unsignedInteger('price_label_id');
        });

        // item 1 (A): blister x10 (id 1) y caja x100 (id 2); item 2 (B) sin presentaciones
        DB::connection('tenant')->table('item_unit_types')->insert([
            ['id' => 1, 'item_id' => 1, 'unit_type_id' => 'BX', 'quantity_unit' => 10],
            ['id' => 2, 'item_id' => 1, 'unit_type_id' => 'BJ', 'quantity_unit' => 100],
        ]);
        // fila de lista de precios del POS: su id (50) no es de item_unit_types
        DB::connection('tenant')->table('item_unit_type_prices')->insert([
            ['id' => 50, 'item_unit_type_id' => 2, 'price_label_id' => 1],
        ]);
    }

    private function sanitize($model_class, $item_id, $presentation)
    {
        $line = new $model_class();
        $line->item_id = $item_id;
        $line->quantity = 2;
        $line->item = ['id' => $item_id, 'description' => 'x', 'presentation' => $presentation];
        $line->sanitizeItemPresentation();

        return $line;
    }

    private function factor($line)
    {
        return isset($line->item->presentation->quantity_unit) ? (float) $line->item->presentation->quantity_unit : 1;
    }

    public function test_presentation_of_another_item_is_discarded(): void
    {
        foreach ([DocumentItem::class, SaleNoteItem::class, OrderNoteItem::class, PurchaseItem::class] as $class) {
            $line = $this->sanitize($class, 2, ['id' => 1, 'unit_type_id' => 'BX', 'quantity_unit' => 10]);

            $this->assertSame(1.0, (float) $this->factor($line), $class);
            $this->assertEmpty($line->item->presentation, $class);
        }
    }

    public function test_saving_hook_is_registered(): void
    {
        foreach ([DocumentItem::class, SaleNoteItem::class, OrderNoteItem::class, PurchaseItem::class] as $class) {
            new $class();
            $this->assertTrue(app('events')->hasListeners("eloquent.saving: {$class}"), $class);
        }
    }

    public function test_own_presentation_is_kept(): void
    {
        $line = $this->sanitize(SaleNoteItem::class, 1, ['id' => 1, 'unit_type_id' => 'BX', 'quantity_unit' => 10]);

        $this->assertSame(10.0, $this->factor($line));
        $this->assertSame(1, (int) $line->item->presentation->item_id);
        $this->assertSame('BX', $line->item->presentation->unit_type_id);
    }

    public function test_tampered_factor_uses_database_value(): void
    {
        $line = $this->sanitize(DocumentItem::class, 1, ['id' => 1, 'quantity_unit' => 999]);

        $this->assertSame(10.0, $this->factor($line));
    }

    public function test_pos_price_row_resolves_its_unit_type(): void
    {
        $own = $this->sanitize(DocumentItem::class, 1, ['id' => 50, 'price_label_id' => 1, 'quantity_unit' => 100]);
        $this->assertSame(100.0, $this->factor($own));

        $foreign = $this->sanitize(DocumentItem::class, 2, ['id' => 50, 'price_label_id' => 1, 'quantity_unit' => 100]);
        $this->assertSame(1.0, (float) $this->factor($foreign));
    }

    public function test_presentation_without_id_is_matched_by_factor_within_item(): void
    {
        $own = $this->sanitize(SaleNoteItem::class, 1, ['unit_type_id' => 'BJ', 'quantity_unit' => 100]);
        $this->assertSame(100.0, $this->factor($own));

        $foreign = $this->sanitize(SaleNoteItem::class, 2, ['unit_type_id' => 'BJ', 'quantity_unit' => 100]);
        $this->assertSame(1.0, (float) $this->factor($foreign));
    }

    public function test_line_without_presentation_is_untouched(): void
    {
        $line = $this->sanitize(DocumentItem::class, 2, []);
        $this->assertSame(1.0, (float) $this->factor($line));
    }

    public function test_historical_line_is_not_rewritten_when_item_is_not_dirty(): void
    {
        $line = new DocumentItem();
        $line->setRawAttributes([
            'item_id' => 2,
            'item' => json_encode(['presentation' => ['id' => 1, 'quantity_unit' => 10]]),
        ], true);
        $line->quantity = 3;
        $line->sanitizeItemPresentation();

        // conserva el factor con el que movió stock para que la reversión devuelva lo mismo
        $this->assertSame(10.0, $this->factor($line));
    }
}
