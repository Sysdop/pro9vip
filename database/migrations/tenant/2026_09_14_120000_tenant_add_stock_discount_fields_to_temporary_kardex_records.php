<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TenantAddStockDiscountFieldsToTemporaryKardexRecords extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('temporary_kardex_records')) {
            return;
        }

        Schema::table('temporary_kardex_records', function (Blueprint $table) {
            if (!Schema::hasColumn('temporary_kardex_records', 'stock_already_discounted')) {
                $table->boolean('stock_already_discounted')->default(false)->after('output');
            }
            if (!Schema::hasColumn('temporary_kardex_records', 'stock_discount_column')) {
                $table->string('stock_discount_column')->nullable()->after('stock_already_discounted');
            }
            if (!Schema::hasColumn('temporary_kardex_records', 'stock_discount_label')) {
                $table->string('stock_discount_label')->nullable()->after('stock_discount_column');
            }
            if (!Schema::hasColumn('temporary_kardex_records', 'stock_discount_reason')) {
                $table->string('stock_discount_reason')->nullable()->after('stock_discount_label');
            }
        });
    }

    public function down()
    {
        if (!Schema::hasTable('temporary_kardex_records')) {
            return;
        }

        Schema::table('temporary_kardex_records', function (Blueprint $table) {
            foreach (['stock_discount_reason', 'stock_discount_label', 'stock_discount_column', 'stock_already_discounted'] as $column) {
                if (Schema::hasColumn('temporary_kardex_records', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
}
