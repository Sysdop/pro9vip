<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Alinea widgets: flujo de caja + utilidades, luego SUNAT + stock bajo (6+6).
 */
return new class extends Migration
{
    private const FIN_BLOCK = [
        'finanzas.flujo_caja',
        'finanzas.utilidades',
        'sunat.estado_cpe',
        'inventario.stock_bajo',
    ];

    private const FIN_LAYOUT = [
        'finanzas.flujo_caja' => ['type' => 'area', 'size' => 'l', 'cols' => 8, 'rows' => 5],
        'finanzas.utilidades' => ['type' => 'donut', 'size' => 'l', 'cols' => 4, 'rows' => 5],
        'sunat.estado_cpe' => ['type' => 'custom', 'size' => 'm', 'cols' => 6, 'rows' => 4],
        'inventario.stock_bajo' => ['type' => 'custom', 'size' => 'm', 'cols' => 6, 'rows' => 4],
    ];

    public function up(): void
    {
        if (! $this->hasDashboardLayoutsTable()) {
            return;
        }

        $rows = DB::connection('tenant')->table('dashboard_layouts')->get();

        foreach ($rows as $row) {
            $layout = json_decode($row->layout, true);

            if (! is_array($layout) || ! count($layout)) {
                continue;
            }

            $normalized = $this->normalizeLayout($layout, (int) $row->id);

            if ($normalized === null) {
                continue;
            }

            DB::connection('tenant')->table('dashboard_layouts')
                ->where('id', $row->id)
                ->update([
                    'layout' => json_encode(array_values($normalized)),
                    'updated_at' => now(),
                ]);
        }
    }

    public function down(): void
    {
        // No reversible: solo reordenamiento visual.
    }

    private function hasDashboardLayoutsTable(): bool
    {
        return \Illuminate\Support\Facades\Schema::connection('tenant')->hasTable('dashboard_layouts');
    }

    private function normalizeLayout(array $layout, int $rowId): ?array
    {
        $finSet = array_flip(self::FIN_BLOCK);
        $existingBySource = [];

        foreach ($layout as $widget) {
            if (! is_array($widget)) {
                continue;
            }

            $source = $widget['source'] ?? null;
            if ($source && isset($finSet[$source])) {
                $existingBySource[$source] = $widget;
            }
        }

        if (! isset($existingBySource['finanzas.flujo_caja']) && ! isset($existingBySource['finanzas.utilidades'])) {
            return null;
        }

        if (! isset($existingBySource['finanzas.utilidades'])) {
            $existingBySource['finanzas.utilidades'] = [
                'id' => 'w_utilidades_' . $rowId,
                'source' => 'finanzas.utilidades',
                'type' => 'donut',
                'size' => 'l',
                'cols' => 4,
                'rows' => 5,
                'options' => [],
            ];
        }

        $orderedFin = [];
        foreach (self::FIN_BLOCK as $source) {
            if (! isset($existingBySource[$source])) {
                continue;
            }

            $widget = $existingBySource[$source];
            $meta = self::FIN_LAYOUT[$source];

            $orderedFin[] = array_merge($widget, [
                'source' => $source,
                'type' => $widget['type'] ?? $meta['type'],
                'size' => $meta['size'],
                'cols' => $meta['cols'],
                'rows' => $meta['rows'],
                'options' => is_array($widget['options'] ?? null) ? $widget['options'] : [],
            ]);
        }

        if (! count($orderedFin)) {
            return null;
        }

        $result = [];
        $finInserted = false;

        foreach ($layout as $widget) {
            if (! is_array($widget)) {
                continue;
            }

            $source = $widget['source'] ?? null;
            if ($source && isset($finSet[$source])) {
                if (! $finInserted) {
                    $result = array_merge($result, $orderedFin);
                    $finInserted = true;
                }
                continue;
            }

            $result[] = $widget;
        }

        if (! $finInserted) {
            $result = array_merge($result, $orderedFin);
        }

        return $result;
    }
};
