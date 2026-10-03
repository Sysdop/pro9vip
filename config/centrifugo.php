<?php

return [
    'url'     => env('CENTRIFUGO_URL', 'http://localhost:8000'),
    'api_key' => env('CENTRIFUGO_API_KEY', ''),

    // Endpoint que usa el navegador para conectarse por WebSocket. El backend publica
    // contra 'url' (HTTP interno, server-side); el front se suscribe contra este.
    //
    // Tiene que ser wss:// y no ws://: el panel corre sobre https y el navegador
    // bloquea por mixed content cualquier WebSocket sin cifrar. Apache expone el
    // proxy en ws.DOMINIO (vhost 01-ws.*.conf), que es justo lo que anuncia
    // win-centrifugo.bat al arrancar.
    'ws_url'  => env('CENTRIFUGO_WS_URL', 'wss://ws.' . env('APP_URL_BASE', 'localhost')),
];
