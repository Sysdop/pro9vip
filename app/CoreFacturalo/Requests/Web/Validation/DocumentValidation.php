<?php

namespace App\CoreFacturalo\Requests\Web\Validation;

use App\CoreFacturalo\Requests\Api\Validation\Functions as ApiFunctions;

class DocumentValidation
{
    public static function validation($inputs) {
        $series = Functions::findSeries($inputs);
        $inputs['series'] = $series->number;
        unset($inputs['series_id']);

        // Serie F solo modifica facturas y serie B solo boletas (notas de crédito/débito).
        ApiFunctions::validateNoteSeriesAffectedDocument($inputs);

        Functions::DNI($inputs);
        Functions::identityDocumentTypeInvoice($inputs);

        return $inputs;
    }
}