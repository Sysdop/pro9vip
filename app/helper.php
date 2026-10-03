<?php

use App\Models\Tenant\Catalogs\AffectationIgvType;
use App\Models\Tenant\Catalogs\Country;
use App\Models\Tenant\Catalogs\CurrencyType;
use App\Models\Tenant\Catalogs\Department;
use App\Models\Tenant\Catalogs\IdentityDocumentType;
use App\Models\Tenant\Catalogs\OperationType;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;


if (!function_exists('func_str_to_upper_utf8')) {
    function func_str_to_upper_utf8($text)
    {
        if (is_null($text)) {
            return null;
        }
        return mb_strtoupper($text, 'utf-8');
    }
}

if (!function_exists('func_str_to_lower_utf8')) {
    function func_str_to_lower_utf8($text)
    {
        if (is_null($text)) {
            return null;
        }
        return mb_strtolower($text, 'utf-8');
    }
}

if (!function_exists('func_filter_items')) {
    function func_filter_items($query, $text)
    {
        $text_array = explode(' ', $text);
        foreach ($text_array as $txt) {
            $trim_txt = trim($txt);
            $query->where('text_filter', 'like', "%$trim_txt%");
        }

        return $query;
    }
}

if (!function_exists('func_get_locations')) {
    function func_get_locations()
    {
        if (Cache::has('locations')) {
            return Cache::get('locations');
        }

        $locations = [];
        $departments = Department::query()
            ->with('provinces', 'provinces.districts')
            ->get();
        foreach ($departments as $department) {
            $children_provinces = [];
            foreach ($department->provinces as $province) {
                $children_districts = [];
                foreach ($province->districts as $district) {
                    $children_districts[] = [
                        'value' => $district->id,
                        'label' => func_str_to_upper_utf8($district->description . " (" . $district->id . ")")
                    ];
                }
                $children_provinces[] = [
                    'value' => $province->id,
                    'label' => func_str_to_upper_utf8($province->description),
                    'children' => $children_districts
                ];
            }
            $locations[] = [
                'value' => $department->id,
                'label' => func_str_to_upper_utf8($department->description),
                'children' => $children_provinces
            ];
        }

        Cache::put('locations', $locations, 1440);

        return $locations;
    }
}

if (!function_exists('func_get_countries')) {
    function func_get_countries()
    {
        if (Cache::has('countries')) {
            return Cache::get('countries');
        }

        $countries = Country::query()
            ->get();

        Cache::put('countries', $countries, 1440);

        return $countries;
    }
}

if (!function_exists('func_get_operation_types')) {
    function func_get_operation_types()
    {
        if (Cache::has('operation_types')) {
            return Cache::get('operation_types');
        }

        $operation_types = OperationType::query()
            ->where('active', true)
            ->get();

        Cache::put('operation_types', $operation_types, 1440);

        return $operation_types;
    }
}

if (!function_exists('func_get_affectation_igv_types')) {
    function func_get_affectation_igv_types()
    {
        if (Cache::has('affectation_igv_types')) {
            return Cache::get('affectation_igv_types');
        }

        $affectation_igv_types = AffectationIgvType::query()
            ->where('active', true)
            ->get();

        Cache::put('affectation_igv_types', $affectation_igv_types, 1440);

        return $affectation_igv_types;
    }
}

if (!function_exists('func_get_identity_document_types')) {
    function func_get_identity_document_types()
    {
        if (Cache::has('identity_document_types')) {
            return Cache::get('identity_document_types');
        }

        $identity_document_types = IdentityDocumentType::query()
            ->where('active', true)
            ->orderByPersonPriority()
            ->get();

        Cache::put('identity_document_types', $identity_document_types, 1440);

        return $identity_document_types;
    }
}

if (!function_exists('func_get_currency_types')) {
    function func_get_currency_types()
    {
        if (Cache::has('currency_types')) {
            return Cache::get('currency_types');
        }

        $currency_types = CurrencyType::query()
            ->where('active', true)
            ->get();

        Cache::put('currency_types', $currency_types, 1440);

        return $currency_types;
    }
}

if (!function_exists('func_is_windows')) {
    function func_is_windows()
    {
        return strtoupper(substr(PHP_OS, 0, 3)) === 'WIN';
    }
}

if (!function_exists('func_unit_type_display_mode')) {
    /**
     * Devuelve el modo configurado para mostrar la unidad de medida
     * (configurations.unit_type_display): 'code', 'symbol' o 'description'.
     * Si no puede resolverse (columna aún no migrada, sin conexión tenant),
     * devuelve 'code'.
     *
     * @return string
     */
    function func_unit_type_display_mode()
    {
        static $cache = [];

        try {
            $tenant = \Illuminate\Support\Facades\DB::connection('tenant')->getDatabaseName();
        } catch (\Throwable $e) {
            return 'code';
        }

        if (!isset($cache[$tenant])) {
            try {
                $cache[$tenant] = \App\Models\Tenant\Configuration::query()->value('unit_type_display') ?: 'code';
            } catch (\Throwable $e) {
                $cache[$tenant] = 'code';
            }
        }

        return $cache[$tenant];
    }
}

if (!function_exists('func_unit_type_display')) {
    /**
     * Devuelve la unidad de medida formateada según la configuración del tenant
     * (unit_type_display): 'code' => código SUNAT (NIU), 'symbol' => símbolo (UND),
     * 'description' => nombre completo (Unidades). Si no puede resolverse
     * (catálogo incompleto, columna aún no migrada, sin conexión tenant),
     * devuelve el código tal cual.
     *
     * @param string|null $unit_type_id
     * @return string|null
     */
    function func_unit_type_display($unit_type_id)
    {
        if ($unit_type_id === null || trim((string) $unit_type_id) === '') {
            return $unit_type_id;
        }

        $mode = func_unit_type_display_mode();
        if ($mode === 'code') {
            return $unit_type_id;
        }

        static $cache = [];

        try {
            $tenant = \Illuminate\Support\Facades\DB::connection('tenant')->getDatabaseName();
        } catch (\Throwable $e) {
            return $unit_type_id;
        }

        if (!isset($cache[$tenant])) {
            try {
                $cache[$tenant] = \App\Models\Tenant\Catalogs\UnitType::query()
                    ->get(['id', 'symbol', 'description'])
                    ->keyBy('id');
            } catch (\Throwable $e) {
                $cache[$tenant] = collect();
            }
        }

        $unit = $cache[$tenant]->get(trim((string) $unit_type_id));
        if (!$unit) {
            return $unit_type_id;
        }

        $value = $mode === 'symbol' ? $unit->symbol : $unit->description;

        return $value ?: $unit_type_id;
    }
}

if (!function_exists('func_get_templates')) {
    function func_get_templates()
    {
        $templates = app_path('CoreFacturalo'.DIRECTORY_SEPARATOR.'Templates'.
                                             DIRECTORY_SEPARATOR.'pdf');
                

        $files = collect(File::directories($templates))
                ->map(fn($dir) => basename($dir))
                ->values()
                ->toArray();

        return $files;            

    }
}