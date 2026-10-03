<?php

namespace Modules\MobileApp\Http\Controllers\Api;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Http\Controllers\Controller;
use App\Models\Tenant\DocumentPayment;
use App\Services\CentrifugoService;
use Hyn\Tenancy\Contracts\CurrentHostname;
use Modules\MobileApp\Models\ReceivedPayment;
use App\Http\Requests\Tenant\DocumentPaymentRequest;
use App\Http\Controllers\Tenant\DocumentPaymentController as DocumentPaymentControllerWeb;
use Modules\MobileApp\Http\Requests\Api\ReceivedPaymentStoreRequest;
use Modules\MobileApp\Http\Requests\Api\ReceivedPaymentClaimRequest;
use Modules\MobileApp\Http\Resources\Api\ReceivedPaymentCollection;

/**
 * Bandeja de pagos recibidos (Yape / Plin).
 *
 * Flujo:
 *  - El equipo-oido empuja cada pago capturado (store), idempotente por dedup_hash.
 *    Un pago nuevo publica un evento por Centrifugo para que la web de escritorio
 *    avise en el acto (campanita del header) sin esperar a su polling.
 *  - Todos los dispositivos del negocio listan la bandeja (byScroll).
 *  - Un usuario reclama un pago pendiente (claim): se asigna de forma atomica a
 *    un comprobante reutilizando DocumentPaymentController@store, que registra el
 *    pago global y lo asocia a la caja. El comprobante pasa a pagado.
 *  - Un pago ya reclamado puede actualizarse (update) o, si seguia pendiente,
 *    descartarse (discard).
 *
 * Esta bandeja no crea relaciones que afecten a la tabla documents: solo guarda
 * de forma desacoplada el id del comprobante y del pago generados.
 */
class ReceivedPaymentController extends Controller
{

    /**
     *
     * Push del equipo-oido: registra un pago capturado.
     *
     * Idempotente por dedup_hash: un re-push del mismo pago no duplica el registro,
     * devuelve el existente con duplicated = true.
     *
     * Solo el camino de exito publica el evento en tiempo real: los dos caminos de
     * duplicado salen antes, para que un re-push del drenado no vuelva a hacer sonar
     * la campanita de la web.
     *
     * @param  ReceivedPaymentStoreRequest $request
     * @return array
     */
    public function store(ReceivedPaymentStoreRequest $request)
    {
        $existing = ReceivedPayment::where('dedup_hash', $request->input('dedup_hash'))->first();

        if ($existing) {
            return $this->buildResponse(true, 'El pago ya habia sido registrado', $existing, ['duplicated' => true]);
        }

        try {
            $record = ReceivedPayment::create(array_merge($this->normalizedStorePayload($request), [
                'status' => ReceivedPayment::STATUS_PENDING,
            ]));
        } catch (QueryException $e) {
            // Carrera entre dos push simultaneos con el mismo dedup_hash:
            // el indice unico protege y devolvemos el registro ya existente.
            $record = ReceivedPayment::where('dedup_hash', $request->input('dedup_hash'))->first();

            if (!$record) {
                throw $e;
            }

            return $this->buildResponse(true, 'El pago ya habia sido registrado', $record, ['duplicated' => true]);
        }

        $this->publishCreatedEvent();

        return $this->buildResponse(true, 'Pago registrado con exito', $record, ['duplicated' => false]);
    }


    /**
     *
     * Datos validados del push, con posted_at llevado a la zona horaria de la app.
     *
     * El equipo-oido manda posted_at en UTC (ISO 8601 con Z) y Eloquent guarda la hora
     * de pared tal cual, sin convertir la zona. Un pago de las 20:00 en Lima quedaba
     * como 01:00 del dia siguiente: la campanita lo mostraba 5 horas en el futuro y, al
     * reclamarlo, el pago del comprobante salia con fecha del dia siguiente.
     *
     * Una fecha sin zona se interpreta en la de la app, asi que un cliente que ya mande
     * hora local no cambia.
     *
     * @param  ReceivedPaymentStoreRequest $request
     * @return array
     */
    private function normalizedStorePayload(ReceivedPaymentStoreRequest $request)
    {
        $data = $request->validated();
        $timezone = config('app.timezone');

        $data['posted_at'] = Carbon::parse($data['posted_at'], $timezone)->setTimezone($timezone);

        return $data;
    }


    /**
     *
     * Listado de la bandeja con scroll infinito (cursor-based pagination).
     *
     * Bandeja compartida: no se filtra por usuario, todos los dispositivos del
     * negocio ven los mismos pagos.
     *
     * Parametros soportados:
     * - limit: cantidad de registros (maximo 100, default tenant.items_per_page)
     * - cursor: posicion actual (null en primera peticion)
     * - status: pending | matched | discarded
     * - provider: YAPE | PLIN
     * - device_id: equipo-oido que capturo el pago
     * - input: busqueda parcial por remitente o texto de la notificacion
     *
     * @param  Request $request
     * @return array
     */
    public function byScroll(Request $request)
    {
        $limit = min((int) $request->input('limit', config('tenant.items_per_page', 15)), 100);
        $cursor = $request->input('cursor');

        $query = ReceivedPayment::whereFilterApi($request)->orderBy('id', 'desc');

        $records = $cursor
            ? $query->cursorPaginate($limit, ['*'], 'cursor', $cursor)
            : $query->cursorPaginate($limit);

        return [
            'success' => true,
            'data' => new ReceivedPaymentCollection($records),
            'pagination' => [
                'next_cursor' => $records->nextCursor()?->encode() ?? null,
                'has_more'    => $records->hasMorePages(),
            ],
        ];
    }


    /**
     *
     * Reclamo atomico de un pago pendiente y asignacion al comprobante.
     *
     * Transicion pending -> matched con candado (lockForUpdate): si otro
     * dispositivo lo reclamo primero responde 409. Internamente ejecuta la logica
     * de DocumentPaymentController@store para registrar el pago en el comprobante
     * (que se emitio pendiente de pago), usando el monto y la fecha del pago
     * capturado y el metodo/destino enviados por el cliente.
     *
     * Body:
     * - document_id: comprobante a pagar
     * - payment_method_type_id: metodo de pago (lo reconoce el front)
     * - payment_destination_id: destino del pago ('cash' o id de cuenta bancaria)
     *
     * @param  int $id
     * @param  ReceivedPaymentClaimRequest $request
     * @return array
     */
    public function claim($id, ReceivedPaymentClaimRequest $request)
    {
        $record = DB::connection('tenant')->transaction(function () use ($id, $request) {

            $received = ReceivedPayment::where('id', $id)->lockForUpdate()->firstOrFail();

            if (!$received->isPending()) {
                $this->throwConflict('El pago ya fue procesado por otro dispositivo.');
            }

            $store = $this->runDocumentPaymentStore($received, $request);

            $received->status = ReceivedPayment::STATUS_MATCHED;
            $received->matched_document_id = (int) $request->input('document_id');
            $received->matched_document_payment_id = $store['id'];
            $received->claimed_by_user_id = auth()->id();
            $received->save();

            return $received;
        });

        return $this->buildResponse(true, 'Pago reclamado y asignado al comprobante con exito', $record);
    }


    /**
     *
     * Actualizar un pago ya reclamado.
     *
     * El store web siempre crea un global_payment y un cash_document_payment
     * nuevos (incluso al editar), por lo que reutilizarlo en modo edicion
     * duplicaria esos registros. Para mantener la consistencia se hace un
     * reemplazo limpio: dentro de la transaccion se elimina el pago anterior con
     * sus relaciones y se genera uno nuevo con los datos enviados.
     *
     * @param  int $id
     * @param  ReceivedPaymentClaimRequest $request
     * @return array
     */
    public function update($id, ReceivedPaymentClaimRequest $request)
    {
        $record = DB::connection('tenant')->transaction(function () use ($id, $request) {

            $received = ReceivedPayment::where('id', $id)->lockForUpdate()->firstOrFail();

            if (!$received->isMatched()) {
                $this->throwConflict('Solo se puede actualizar un pago que ya fue reclamado.', 422);
            }

            $this->removeMatchedDocumentPayment($received);

            $store = $this->runDocumentPaymentStore($received, $request);

            $received->matched_document_id = (int) $request->input('document_id');
            $received->matched_document_payment_id = $store['id'];
            $received->claimed_by_user_id = auth()->id();
            $received->save();

            return $received;
        });

        return $this->buildResponse(true, 'Pago actualizado con exito', $record);
    }


    /**
     *
     * Descartar un pago pendiente (no se asigna a ningun comprobante).
     *
     * No se permite descartar un pago ya reclamado (409).
     *
     * @param  int $id
     * @return array
     */
    public function discard($id)
    {
        $record = DB::connection('tenant')->transaction(function () use ($id) {

            $received = ReceivedPayment::where('id', $id)->lockForUpdate()->firstOrFail();

            if ($received->isMatched()) {
                $this->throwConflict('No se puede descartar un pago ya reclamado.');
            }

            $received->status = ReceivedPayment::STATUS_DISCARDED;
            $received->save();

            return $received;
        });

        return $this->buildResponse(true, 'Pago descartado con exito', $record);
    }


    /**
     *
     * Avisa por Centrifugo que entro un pago nuevo a la bandeja.
     *
     * El evento va sin payload a proposito: el namespace del canal admite suscripcion
     * anonima, asi que no se manda el pagador ni el monto. La web recibe el aviso y
     * consulta el detalle por su endpoint autenticado.
     *
     * CentrifugoService::publish atrapa sus propias excepciones y solo loguea, por lo
     * que un Centrifugo caido no puede romper el registro del pago.
     *
     * @return void
     */
    private function publishCreatedEvent()
    {
        $fqdn = app(CurrentHostname::class)?->fqdn ?? 'local';

        app(CentrifugoService::class)->publish("restaurant:{$fqdn}", [
            'event'   => 'received-payment-created',
            'payload' => null,
        ]);
    }


    /**
     *
     * Ejecuta el registro del pago en el comprobante reutilizando el proceso web.
     *
     * Construye una DocumentPaymentRequest con el monto y la fecha del pago
     * capturado y el metodo/destino del cliente, y delega en el controlador web
     * para reutilizar su logica (pago global, asociacion a caja y procesamiento
     * del credito pendiente).
     *
     * @param  ReceivedPayment $received
     * @param  ReceivedPaymentClaimRequest $request
     * @return array
     */
    private function runDocumentPaymentStore(ReceivedPayment $received, $request)
    {
        $payload = [
            'id' => null,
            'document_id' => (int) $request->input('document_id'),
            'date_of_payment' => $received->posted_at->format('Y-m-d'),
            'payment_method_type_id' => $request->input('payment_method_type_id'),
            'payment_destination_id' => $request->input('payment_destination_id'),
            'payment' => $received->amount,
            'reference' => trim($received->provider.' '.$received->sender_name),
        ];

        $documentPaymentRequest = DocumentPaymentRequest::create('', 'POST', $payload);

        return app(DocumentPaymentControllerWeb::class)->store($documentPaymentRequest);
    }


    /**
     *
     * Elimina el pago del comprobante generado previamente con sus relaciones
     * (cash_document_payments y global_payment), para un reemplazo limpio.
     *
     * @param  ReceivedPayment $received
     * @return void
     */
    private function removeMatchedDocumentPayment(ReceivedPayment $received)
    {
        if (!$received->matched_document_payment_id) {
            return;
        }

        $payment = DocumentPayment::find($received->matched_document_payment_id);

        if ($payment) {
            $payment->cashDocumentPayments()->delete();
            $payment->global_payment()->delete();
            $payment->delete();
        }
    }


    /**
     *
     * Lanza una respuesta de conflicto (transicion de estado no permitida).
     *
     * @param  string $message
     * @param  int $status
     * @return void
     */
    private function throwConflict($message, $status = 409)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => $message,
        ], $status));
    }


    /**
     *
     * Estructura estandar de respuesta para un pago recibido.
     *
     * @param  bool $success
     * @param  string $message
     * @param  ReceivedPayment $record
     * @param  array $extra
     * @return array
     */
    private function buildResponse($success, $message, ReceivedPayment $record, array $extra = [])
    {
        return array_merge([
            'success' => $success,
            'message' => $message,
            'data' => $record->getApiRowResource(),
        ], $extra);
    }

}
