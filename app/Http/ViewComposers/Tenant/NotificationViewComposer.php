<?php

namespace App\Http\ViewComposers\Tenant;

use App\Http\Helpers\HeaderNotifications;
use Hyn\Tenancy\Contracts\CurrentHostname;

class NotificationViewComposer
{
    public function compose($view)
    {
        try {
            $view->vc_notification_cards = (new HeaderNotifications())->getAll()['total_count'];
        } catch (\Throwable $exception) {
            $view->vc_notification_cards = 0;
        }

        $this->composeCentrifugo($view);
    }

    /**
     * Datos para que la campanita escuche los avisos en tiempo real.
     *
     * El canal se arma aqui, en el backend, con la misma llamada que usan los
     * publicadores (CurrentHostname::fqdn). Asi el navegador no tiene que adivinarlo a
     * partir de window.location: si lo dedujera mal se suscribiria a un canal muerto y
     * no llegaria nada, sin ningun error visible.
     *
     * Si algo falla se devuelve vacio: el front simplemente no conecta y la campanita
     * sigue funcionando con su polling.
     */
    private function composeCentrifugo($view)
    {
        try {
            $fqdn = app(CurrentHostname::class)?->fqdn;

            $view->vc_centrifugo_ws = $fqdn ? (string) config('centrifugo.ws_url') : '';
            $view->vc_centrifugo_channel = $fqdn ? "restaurant:{$fqdn}" : '';
        } catch (\Throwable $exception) {
            $view->vc_centrifugo_ws = '';
            $view->vc_centrifugo_channel = '';
        }
    }
}
