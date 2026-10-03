<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TenantAddGuardianToClaimsTable extends Migration
{
    public function up()
    {
        Schema::table('claims', function (Blueprint $table) {
            if (! Schema::hasColumn('claims', 'is_minor')) {
                $table->boolean('is_minor')->default(false)->after('phone');
            }
            if (! Schema::hasColumn('claims', 'guardian_type')) {
                $table->string('guardian_type', 20)->nullable()->after('is_minor');
            }
            if (! Schema::hasColumn('claims', 'guardian_identity_document_type')) {
                $table->string('guardian_identity_document_type', 10)->nullable()->after('guardian_type');
            }
            if (! Schema::hasColumn('claims', 'guardian_name')) {
                $table->string('guardian_name', 200)->nullable()->after('guardian_identity_document_type');
            }
            if (! Schema::hasColumn('claims', 'guardian_document_number')) {
                $table->string('guardian_document_number', 20)->nullable()->after('guardian_name');
            }
            if (! Schema::hasColumn('claims', 'guardian_address')) {
                $table->string('guardian_address', 300)->nullable()->after('guardian_document_number');
            }
            if (! Schema::hasColumn('claims', 'guardian_phone')) {
                $table->string('guardian_phone', 20)->nullable()->after('guardian_address');
            }
            if (! Schema::hasColumn('claims', 'guardian_email')) {
                $table->string('guardian_email', 150)->nullable()->after('guardian_phone');
            }
        });
    }

    public function down()
    {
        Schema::table('claims', function (Blueprint $table) {
            $table->dropColumn([
                'is_minor',
                'guardian_type',
                'guardian_identity_document_type',
                'guardian_name',
                'guardian_document_number',
                'guardian_address',
                'guardian_phone',
                'guardian_email',
            ]);
        });
    }
}
