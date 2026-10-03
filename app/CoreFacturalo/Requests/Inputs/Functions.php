<?php

namespace App\CoreFacturalo\Requests\Inputs;

use App\Models\Tenant\Document;
use App\Models\Tenant\Series;
use Carbon\Carbon;
use Exception;
use Modules\Document\Models\SeriesConfiguration;

class Functions
{
    public static function newNumber($soap_type_id, $document_type_id, $series, $number, $model)
    {
        // Marca la serie como en uso al asignarle n├║mero en emisi├│n (┬º4.7).
        Series::markInUse($document_type_id, $series);

        if ($number === '#') {
            // Serie con comprobantes: sigue al ultimo emitido. max() sobre la
            // columna entera evita saltos frente a orderBy sobre el indice.
            $max = $model::where('soap_type_id', $soap_type_id)
                ->where('document_type_id', $document_type_id)
                ->where('series', $series)
                ->max('number');

            if ($max !== null) {
                return (int) $max + 1;
            }

            // Serie sin comprobantes: arranca despues del ultimo correlativo
            // declarado en Series > Correlativo (si declara 99, emite 100).
            // De ahi en adelante avanza sucesivamente.
            $series_configuration = SeriesConfiguration::where([
                ['document_type_id', $document_type_id],
                ['series', $series],
            ])->first();

            return ($series_configuration) ? (int) $series_configuration->number + 1 : 1;
        }

        return $number;
    }

    public static function filename($company, $document_type_id, $series, $number)
    {
        return join('-', [$company->number, $document_type_id, $series, $number]);
    }

    public static function validateUniqueDocument($soap_type_id, $document_type_id, $series, $number, $model)
    {
        $document = $model::where('document_type_id', $document_type_id)
                        ->where('soap_type_id', $soap_type_id)
                        ->where('series', $series)
                        ->where('number', $number)
                        ->first();
        if($document) {
            throw new Exception("El documento: {$document_type_id} {$series}-{$number} ya se encuentra registrado.");
        }
    }

    public static function identifier($soap_type_id, $date_of_issue, $model)
    {
        $documents = $model::where('soap_type_id', $soap_type_id)
                        ->where('date_of_issue', $date_of_issue)
                        ->get();
        $numeration = count($documents) + 1;
        $path = explode('\\', $model);
        switch (array_pop($path)) {
            case 'Voided':
                $prefix = 'RA';
                break;
            default:
                $prefix = 'RC';
                break;
        }

        return join('-', [$prefix, Carbon::parse($date_of_issue)->format('Ymd'), $numeration]);
    }

    /**
     * @param      $inputs
     * @param      $key
     * @param null $default
     *
     * @return mixed|null
     */
    public static function valueKeyInArray($inputs, $key, $default = null)
    {
        return (isset($inputs[$key]) && null !== $inputs[$key]) ? $inputs[$key] : $default;
    }
}
