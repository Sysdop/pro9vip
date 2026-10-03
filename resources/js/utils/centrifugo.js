import { Centrifuge } from 'centrifuge';

/**
 * Capa de transporte WebSocket sobre Centrifugo para el panel del tenant.
 * Portado de dev-mozo/src/utils/centrifugo.ts.
 *
 * COMPATIBILIDAD DE VERSIONES (importante):
 *   - Servidor Centrifugo: v6.x
 *   - Cliente centrifuge-js: 5.7.0, fijado exacto en package.json (NO usar ^)
 * centrifuge-js < 5.5.0 no soporta el protocolo de Centrifugo v6: falla con
 * "bad request", codigo 3501.
 *
 * El endpoint y el canal los entrega el backend (NotificationViewComposer) y llegan
 * como props del componente. El canal NO se deduce de window.location a proposito:
 * tiene que ser identico al fqdn con el que publica el backend, porque si se dedujera
 * mal la suscripcion apuntaria a un canal muerto y no llegaria nada, sin ningun error
 * visible.
 *
 * Todo aqui es best-effort: si el WebSocket no levanta, quien lo use debe seguir
 * funcionando por su cuenta (en el header, con su polling).
 */

let centrifuge = null;
let subscription = null;

// handlers de negocio, por nombre de evento
const handlers = {};

// callbacks que corren en cada (re)suscripcion, para reconciliar estado
const connectHandlers = new Set();

let connectionState = 'disconnected';

export function getConnectionState() {
    return connectionState;
}

/**
 * Centrifugo espera la ruta completa /connection/websocket.
 */
function normalizeEndpoint(wsUrl) {
    const base = String(wsUrl || '').trim().replace(/\/+$/, '');

    if (!base) {
        return '';
    }

    return base.endsWith('/connection/websocket') ? base : `${base}/connection/websocket`;
}

/**
 * Conecta y se suscribe al canal del tenant.
 *
 * Idempotente: llamarlo desde varios componentes reutiliza la misma conexion.
 * Sin endpoint o sin canal no hace nada (el backend los manda vacios cuando no puede
 * resolverlos).
 */
export function connect(wsUrl, channel) {
    if (centrifuge) {
        return;
    }

    const endpoint = normalizeEndpoint(wsUrl);

    if (!endpoint || !channel) {
        return;
    }

    try {
        centrifuge = new Centrifuge(endpoint);

        centrifuge.on('connecting', () => {
            connectionState = 'connecting';
        });

        centrifuge.on('disconnected', () => {
            connectionState = 'disconnected';
        });

        centrifuge.on('error', () => {
            // Silencioso: la reconexion la maneja la libreria y el consumidor tiene
            // su propio respaldo.
        });

        subscription = centrifuge.newSubscription(channel);

        subscription.on('subscribed', () => {
            connectionState = 'connected';

            // Reconciliacion: en cada (re)suscripcion, incluida la reconexion, se avisa
            // para refrescar el estado completo y recuperar lo que haya pasado mientras
            // no habia conexion.
            connectHandlers.forEach((callback) => {
                try {
                    callback();
                } catch (error) {
                    console.log('[centrifugo] handler de reconexion fallo', error);
                }
            });
        });

        subscription.on('unsubscribed', () => {
            if (connectionState === 'connected') {
                connectionState = 'connecting';
            }
        });

        subscription.on('publication', (ctx) => {
            const data = (ctx && ctx.data) || {};

            if (!data.event || !handlers[data.event]) {
                return;
            }

            handlers[data.event].forEach((handler) => {
                try {
                    handler(data.payload);
                } catch (error) {
                    console.log('[centrifugo] handler de evento fallo', error);
                }
            });
        });

        subscription.subscribe();
        centrifuge.connect();
    } catch (error) {
        console.log('[centrifugo] no se pudo conectar', error);
        centrifuge = null;
        subscription = null;
    }
}

/**
 * Registra un handler para un evento de negocio.
 */
export function on(event, handler) {
    if (!handlers[event]) {
        handlers[event] = new Set();
    }

    handlers[event].add(handler);
}

/**
 * Quita un handler. Llamar en beforeDestroy del componente que lo registro.
 * NO desconecta el socket: la conexion es compartida.
 */
export function off(event, handler) {
    if (handlers[event]) {
        handlers[event].delete(handler);
    }
}

/**
 * Callback que corre en cada (re)suscripcion al canal.
 */
export function onConnect(callback) {
    connectHandlers.add(callback);
}

export function offConnect(callback) {
    connectHandlers.delete(callback);
}

export default {
    connect,
    on,
    off,
    onConnect,
    offConnect,
    getConnectionState,
};
