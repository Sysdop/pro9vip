<?php

namespace App\Console\Commands;

use Hyn\Tenancy\Models\Website;
use Illuminate\Console\Command;
use Modules\Inventory\Helpers\ItemLotDispatchSoldHelper;

class MarkItemLotsSoldFromDispatchesCommand extends Command
{
    /**
     * --tenant=  : id(s) o uuid(s) de website separados por coma (ej. tenancy_house). Vacío = todos.
     * --dry      : solo informa, no escribe.
     *
     * @var string
     */
    protected $signature = 'inventory:mark-series-sold-from-dispatches {--tenant=} {--dry}';

    /**
     * @var string
     */
    protected $description = 'Marca ItemLot.has_sale=1 para series usadas en guías que descontaron stock (sanación producción)';

    public function handle()
    {
        $websites = $this->resolveWebsites();

        if ($websites->isEmpty()) {
            $this->error('No se encontraron tenants para procesar.');
            return 1;
        }

        $dry = (bool) $this->option('dry');
        $totalUpdated = 0;

        foreach ($websites as $website) {
            $tenancy = app(\Hyn\Tenancy\Environment::class);
            $tenancy->tenant($website);

            $this->line("== Tenant #{$website->id} ({$website->uuid}) ==");

            if ($dry) {
                $result = ItemLotDispatchSoldHelper::backfill(true, true);
                $this->info("  [dry] Guías: {$result['dispatches']} | Series candidatas: {$result['lot_ids']} | Pendientes de marcar: {$result['pending']}");
                continue;
            }

            $result = ItemLotDispatchSoldHelper::backfill(true, false);
            $totalUpdated += $result['updated'];
            $this->info("  Guías: {$result['dispatches']} | Series candidatas: {$result['lot_ids']} | Marcadas: {$result['updated']}");
        }

        if (!$dry) {
            $this->info("Total series marcadas como vendidas: {$totalUpdated}");
        }

        return 0;
    }

    /**
     * @return \Illuminate\Support\Collection|Website[]
     */
    private function resolveWebsites()
    {
        $raw = trim((string) $this->option('tenant'));

        if ($raw === '') {
            return Website::all();
        }

        $parts = array_values(array_filter(array_map('trim', explode(',', $raw))));

        return Website::query()
            ->where(function ($q) use ($parts) {
                $q->whereIn('uuid', $parts);

                $ids = array_filter($parts, function ($part) {
                    return ctype_digit((string) $part);
                });

                if (!empty($ids)) {
                    $q->orWhereIn('id', $ids);
                }
            })
            ->get();
    }
}
