<?php

namespace App\CoreFacturalo\Requests\Api\Validation;

use App\Models\Tenant\Document;
use App\Models\Tenant\Warehouse;
use App\Models\Tenant\Establishment;
use App\Models\Tenant\Item;
use App\Models\Tenant\Person;
use App\Models\Tenant\Series;
use App\Models\Tenant\Catalogs\District;
use Exception;
use App\Models\Tenant\Configuration;
use App\Services\SeriesCodeGenerator;
use App\Traits\SunatItemCodeTrait;
use Carbon\Carbon;

class Functions
{
    use SunatItemCodeTrait;

    public static function establishment($inputs) {
        $establishment = Establishment::where('code', $inputs['code'])->first();

        if ($establishment) {
            return $establishment->id;
        }

        throw new Exception("El código ingresado del establecimiento es incorrecto.");
    }

    public static function person($inputs, $type) {
        $district_id = $inputs['district_id'];

        if(in_array($inputs['identity_document_type_id'],['6'])){
            $ubigeo = Functions::validateUbigeo($district_id);
        }

        $province_id = ($district_id)?substr($district_id, 0 ,4):null;
        $department_id = ($district_id)?substr($district_id, 0 ,2):null;

        $person = Person::updateOrCreate([
            'type' => $type,
            'identity_document_type_id' => $inputs['identity_document_type_id'],
            'number' => $inputs['number'],
        ], [
            'name' => $inputs['name'],
            'trade_name' => $inputs['trade_name'],
            'country_id' => $inputs['country_id'],
            'department_id' => $department_id,
            'province_id' => $province_id,
            'district_id' => $district_id,
            'address' => $inputs['address'],
            'email' => $inputs['email'],
            'telephone' => $inputs['telephone'],
            'address_type_id' => $inputs['address_type_id'],
        ]);

        return $person->id;
    }

    public static function validateUbigeo($ubigeo) {

        if (strlen($ubigeo) > 0 && strlen($ubigeo) != 6 ) throw new Exception("El código ubigeo debe contener 6 dígitos");

        if (strlen($ubigeo) == 6) {
            $query_distric = District::where('id', $ubigeo)->first();

            if (!$query_distric) throw new Exception("El código ubigeo es incorrecto");
        }
    }

    public static function item($inputs)
    {
        $item = Item::where('internal_id', $inputs['internal_id'])
            ->first();

        if (!$item) {

            $item = new Item();
            $item->internal_id = $inputs['internal_id'];
            $item->description = $inputs['description'];
            $item->name = $inputs['name'];
            $item->second_name = $inputs['second_name'];
            $item->item_type_id = $inputs['item_type_id'];
            $item->item_code = self::validateSunatItemCode($inputs);
            $item->item_code_gs1 = $inputs['item_code_gs1'];
            $item->unit_type_id = $inputs['unit_type_id'];
            $item->currency_type_id = $inputs['currency_type_id'];
            $item->sale_unit_price =  $inputs['unit_price'];
            $item->sale_affectation_igv_type_id = $inputs['affectation_igv_type_id'];
            $item->purchase_affectation_igv_type_id = $inputs['affectation_igv_type_id'];
            $item->stock = 0;
            $item->amount_plastic_bag_taxes = self::getAmountPlasticBagTaxes();
            $item->save();

        }else{
            
            $update_description = isset($inputs['update_description']) ? $inputs['update_description'] : false;

            if($update_description)
            {
                $item->update([
                    'description' => $inputs['description'],
                ]);
            }
            
        }

        return $item->id;
    }

    public static function getAmountPlasticBagTaxes()
    {
        return Configuration::select('amount_plastic_bag_taxes')->first()->amount_plastic_bag_taxes;
    }

    /**
     * Código de producto SUNAT del ítem que se crea desde la API: si se informa,
     * debe tener exactamente 8 dígitos numéricos (misma regla que el formulario).
     *
     * @param array $inputs
     * @return string|null
     * @throws Exception
     */
    public static function validateSunatItemCode($inputs)
    {
        $item_code = self::cleanSunatItemCode($inputs['item_code'] ?? null);

        if ($item_code !== null && !self::isValidSunatItemCode($item_code)) {
            throw new Exception("Producto {$inputs['internal_id']}: " . self::getSunatItemCodeMessage());
        }

        return $item_code;
    }

    public static function item2($inputs) {

        // Solo aplica si el ítem no existe; si existe, firstOrCreate no usa estos valores.
        $item_code = Item::where('internal_id', $inputs['internal_id'])->exists()
            ? null
            : self::validateSunatItemCode($inputs);

        $item = Item::firstOrCreate([
            'internal_id' => $inputs['internal_id'],
        ], [
            'description' => $inputs['description'],
            'name' => $inputs['name'],
            'second_name' => $inputs['second_name'],
            'item_type_id' => $inputs['item_type_id'],
            'item_code' => $item_code,
            'item_code_gs1' => $inputs['item_code_gs1'],
            'unit_type_id' => $inputs['unit_type_id'],
            'currency_type_id' => $inputs['currency_type_id'],
            'sale_unit_price' =>  $inputs['unit_price'],
            'sale_affectation_igv_type_id' => $inputs['affectation_igv_type_id'],
            'purchase_affectation_igv_type_id' => $inputs['affectation_igv_type_id'],
            'stock' => $inputs['quantity']
        ]);
        return $item->id;
    }

    public static function findAffectedDocumentByExternalId($external_id) {
        $document = Document::where('external_id', $external_id)
            ->first();

        if (!$document) throw new Exception("No se encontró el documento con código externo {$external_id}.");

        return $document;
    }

    public static function voidedDocuments($inputs, $type) {
        if (count($inputs['documents']) === 0) {
            throw new Exception("No se enviaron documentos para la anulación.");
        }

        $documents = [];
        foreach ($inputs['documents'] as $row) {
            $document = Document::where('external_id', $row['external_id'])
                ->whereDate('date_of_issue', $inputs['date_of_reference'])
                ->where('group_id', ($type === 'summary')?'02':'01')
                ->first();

            if (!$document) throw new Exception("El código externo {$row['external_id']} no fue encontrado o la fecha indica no corresponde al documento.");

            $documents[] = [
                'document_id' => $document->id,
                'description' => $row['description']
            ];
        }

        return $documents;
    }

    public static function validateSeries($inputs) {
        $series = Series::where('number', $inputs['series'])
            ->where('document_type_id', $inputs['document_type_id'])
            ->where('establishment_id', $inputs['establishment_id'])
            ->first();

        if (!$series) {
            throw new Exception("La serie ingresada {$inputs['series']}, es incorrecta.");
        }

        if ((bool) optional(Configuration::first())->isNrus()
            && ! in_array($series->document_type_id, SeriesCodeGenerator::nrusDocumentTypeIds(), true)) {
            throw new Exception("Para empresas NRUS solo están disponibles las series de Boleta de venta electrónica y Nota de venta.");
        }
    }

    /**
     * Coherencia de serie en notas de crédito/débito: una serie que empieza con F
     * solo modifica facturas (01) y una que empieza con B solo boletas (03).
     * Las series de contingencia (numéricas) no aplican.
     *
     * Recibe document_type_id, series y affected_document_id o data_affected_document.
     *
     * @param array $inputs
     * @throws Exception
     */
    public static function validateNoteSeriesAffectedDocument($inputs)
    {
        if (!in_array($inputs['document_type_id'] ?? null, ['07', '08'], true)) {
            return;
        }

        $series = strtoupper(trim((string) ($inputs['series'] ?? '')));
        $expected_by_prefix = ['F' => '01', 'B' => '03'];
        $prefix = substr($series, 0, 1);

        if (!isset($expected_by_prefix[$prefix])) {
            return;
        }

        $data_affected_document = $inputs['data_affected_document'] ?? null;

        if (!empty($data_affected_document)) {
            $affected_document_type_id = data_get($data_affected_document, 'document_type_id');
        } elseif (!empty($inputs['affected_document_id'])) {
            $affected_document_type_id = Document::where('id', $inputs['affected_document_id'])->value('document_type_id');
        } else {
            return;
        }

        if ((string) $affected_document_type_id !== $expected_by_prefix[$prefix]) {
            $allowed = ($prefix === 'F') ? 'facturas' : 'boletas de venta';
            throw new Exception("La serie {$series} de la nota solo puede modificar {$allowed}.");
        }
    }

    /**
     * Las notas de débito por penalidad (motivo 13, catálogo 10) son operaciones
     * inafectas del IGV. Misma regla que DocumentRequest para el formulario web.
     *
     * @param array $inputs
     * @throws Exception
     */
    public static function validatePenaltyDebitNote($inputs)
    {
        if (($inputs['document_type_id'] ?? null) !== '08'
            || (string) ($inputs['note_credit_or_debit_type_id'] ?? '') !== '13') {
            return;
        }

        $has_igv = round((float) ($inputs['total_igv'] ?? 0), 2) > 0;

        foreach (($inputs['items'] ?? []) as $row) {
            if ($has_igv) {
                break;
            }
            $has_igv = is_array($row) && round((float) ($row['total_igv'] ?? 0), 2) > 0;
        }

        if ($has_igv) {
            throw new Exception('Las penalidades son operaciones inafectas del IGV');
        }
    }

    public static function DNI($inputs){
        if (($inputs['document_type_id'] == '03') && ($inputs['total']) > 700) {
            $person = Person::query()
                ->with('identity_document_type')
                ->find($inputs['customer_id'] ?? null);

            if (!$person) {
                throw new Exception('No se encontró el cliente seleccionado. Verifique que exista y no haya sido eliminado.');
            }

            if (!in_array($person->identity_document_type_id, ['01','04','06','07'])) {
                throw new Exception("El tipo doc. identidad {$person->identity_document_type->description} del cliente no es valido.");
            }
        }
    }

    public static function identityDocumentTypeInvoice($inputs)
    {
        if($inputs['document_type_id'] == '01') {
            if($inputs['operation_type_id'] === '0101') {
                $person = Person::find($inputs['customer_id'] ?? null);
                if (!$person) {
                    throw new Exception('No se encontró el cliente seleccionado. Verifique que exista y no haya sido eliminado.');
                }
                if (!in_array($person->identity_document_type_id, ['6'], true)) {
                    throw new Exception("El tipo doc. identidad {$person->identity_document_type->description} del cliente no es válido.");
                }
            }
        }
    }


    public static function validateDetraction($inputs) 
    {

        if(!is_null($inputs['detraction']) && $inputs['operation_type_id'] == '1004')
        {
            // validar ubigeo origen
            self::validateRequiredDistrict($inputs['detraction']['origin_location_id'][2] ?? null);

            // validar ubigeo destino
            self::validateRequiredDistrict($inputs['detraction']['delivery_location_id'][2] ?? null);

        }

    }


    public static function validateRequiredDistrict($district_id) 
    {
        if (is_null($district_id)) throw new Exception("El campo ubigeo es obligatorio");

        if (strlen($district_id) !== 6) throw new Exception("El campo ubigeo debe contener 6 dígitos");

        $exist_district = District::select('id')->find($district_id);
        if (!$exist_district) throw new Exception("El código ubigeo es incorrecto");
    }

    
    /**
     * 
     * Validar fecha de emisión en base a los días configurados en el plazo de envío
     *
     * Días contados desde la fecha de emisión
     * 
     * @param  array $inputs
     * @return void
     */
    public static function validateDateOfIssue($inputs) 
    {

        $configuration = Configuration::select('shipping_time_days', 'restrict_receipt_date')->firstOrFail();

        if($configuration->restrict_receipt_date)
        {
            $today = Carbon::now();
            $date_of_issue = Carbon::parse($inputs['date_of_issue']);
            $difference_days = $configuration->shipping_time_days - $date_of_issue->diffInDays($today);
    
            if($difference_days <= 0) throw new Exception("La fecha de emisión no puede ser menor a {$configuration->shipping_time_days} día(s).");
        }

    }


}
