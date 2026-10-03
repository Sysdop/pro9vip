<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Models\System\ColumnVisibilityConfig;
use App\Models\Tenant\ColumnsToReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ColumnVisibilityController extends Controller
{
    public function show($module)
    {
        $userId = Auth::id() ?? 0;

        $record = ColumnsToReport::where('user_id', $userId)
            ->where('report', $module)
            ->first();

        if ($record) {
            return ['success' => true, 'data' => $record->columns];
        }

        $systemConfig = ColumnVisibilityConfig::where('module', $module)->first();

        if ($systemConfig) {
            return ['success' => true, 'data' => $systemConfig->columns];
        }

        // columnas por defecto de la empresa, solo existen en los tenants que las sembraron al crearse
        $tenantDefault = ColumnsToReport::where('report', ColumnsToReport::TENANT_DEFAULT_PREFIX . $module)
            ->orderBy('id')
            ->first();

        return [
            'success' => true,
            'data' => $tenantDefault ? $tenantDefault->columns : null,
        ];
    }

    public function store(Request $request, $module)
    {
        $request->validate(['columns' => 'required|array']);

        $userId = Auth::id() ?? 0;

        ColumnsToReport::updateOrCreate(
            ['user_id' => $userId, 'report' => $module],
            ['columns' => $request->columns]
        );

        return ['success' => true];
    }
}
