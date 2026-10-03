<template>
    <div class="ag-notification-wrapper">
        <el-dropdown trigger="click" @visible-change="onDropdownVisible">
            <span class="el-dropdown-link notification-icon text-secondary">
                <el-badge :value="badgeCount" :hidden="!hasLoaded || badgeCount === 0" class="ag-bell-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-bell"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
                </el-badge>
            </span>
            <el-dropdown-menu slot="dropdown" class="ag-notification-menu">
                <li class="ag-notification-panel" @click.stop>
                    <div class="ag-notification-header">
                        <div class="ag-notification-header__top">
                            <h4 class="ag-notification-title">Notificaciones</h4>
                            <div class="ag-notification-header__actions">
                                <button
                                    v-if="canAnnouncePayments && !soundEnabled"
                                    type="button"
                                    class="text-xs font-medium ag-enable-sound"
                                    title="Activa el sonido y el aviso de escritorio para los pagos Yape/Plin. El navegador exige un clic para permitirlos."
                                    @click.stop="enableSound"
                                >
                                    Activar avisos
                                </button>
                                <button
                                    v-if="hasUnreadNotifications"
                                    type="button"
                                    class="text-xs text-gray-400 hover:text-gray-600 font-medium ag-mark-all-read"
                                    @click.stop="markAllAsRead"
                                >
                                    Marcar todo como leído
                                </button>
                            </div>
                        </div>
                        <div class="ag-notification-header__read">
                            <button
                                v-for="readFilter in readFilters"
                                :key="readFilter.id"
                                type="button"
                                class="ag-read-tab"
                                :class="{ 'is-active': activeReadFilter === readFilter.id }"
                                @click.stop="setActiveReadFilter(readFilter.id)"
                            >
                                {{ readFilter.label }}
                            </button>
                        </div>
                    </div>

                    <div class="ag-notification-filters ag-notification-filters--category">
                        <button
                            v-for="filter in filters"
                            :key="filter.id"
                            type="button"
                            class="ag-filter-chip"
                            :class="{ 'is-active': activeCategoryFilter === filter.id }"
                            @click.stop="setActiveCategoryFilter(filter.id)"
                        >
                            {{ filter.label }}
                        </button>
                    </div>

                    <div class="ag-notification-list">
                        <transition-group
                            v-if="filteredNotifications.length"
                            name="ag-list-fade"
                            tag="div"
                            class="ag-notification-list-inner"
                        >
                            <a
                                v-for="notification in filteredNotifications"
                                :key="notification.id"
                                href="#"
                                class="ag-notification-card"
                                :class="{ 'is-unread': isUnread(notification) }"
                                @click.prevent="openNotification(notification)"
                            >
                                <transition name="ag-dot-fade">
                                    <span
                                        v-if="isUnread(notification)"
                                        class="ag-unread-dot w-2 h-2 bg-blue-600 rounded-full"
                                    ></span>
                                </transition>
                                <button
                                    v-if="isUnread(notification)"
                                    type="button"
                                    class="text-xs text-gray-400 hover:text-gray-600 font-medium ag-mark-read-btn"
                                    @click.stop="markAsRead(notification)"
                                >
                                    Marcar como leído
                                </button>
                                <div class="ag-notification-card__icon" :class="`is-${notification.icon_bg}`">
                                    <component :is="iconComponents[notification.icon]" />
                                </div>
                                <div class="ag-notification-card__body">
                                    <div class="ag-notification-card__title-row">
                                        <strong class="ag-notification-card__title">{{ notification.title }}</strong>
                                        <span v-if="notification.tag" class="ag-notification-tag">{{ notification.tag }}</span>
                                    </div>
                                    <p class="ag-notification-card__description">
                                        <template v-for="(part, index) in notification.description_parts">
                                            <strong v-if="part.bold" :key="'b-' + notification.id + '-' + index">{{ part.text }}</strong>
                                            <span v-else :key="'t-' + notification.id + '-' + index">{{ part.text }}</span>
                                        </template>
                                    </p>
                                    <span class="ag-notification-card__time">{{ notification.time_ago }}</span>
                                </div>
                            </a>
                        </transition-group>
                        <div v-else class="ag-notification-empty">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                            </svg>
                            <p>{{ emptyStateMessage }}</p>
                        </div>
                    </div>
                </li>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import {
    connect as centrifugoConnect,
    on as centrifugoOn,
    off as centrifugoOff,
    onConnect as centrifugoOnConnect,
    offConnect as centrifugoOffConnect
} from '../utils/centrifugo';

const IconSend = {
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 14l11 -11" />
            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
        </svg>
    `
};

const IconInvoice = {
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
            <path d="M9 7l1 0" />
            <path d="M9 13l6 0" />
            <path d="M13 17l2 0" />
        </svg>
    `
};

const IconBox = {
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9l8 -4.5" />
            <path d="M12 12l8 -4.5" />
            <path d="M12 12v9" />
            <path d="M12 12l-8 -4.5" />
        </svg>
    `
};

const IconBag = {
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M17 17h-11v-14h-2" />
            <path d="M6 5l14 1l-1 7h-13" />
        </svg>
    `
};

const IconCloudAlert = {
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6.657 18c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.993c1.913 0 3.464 1.567 3.464 3.5c0 1.933 -1.551 3.5 -3.464 3.5h-11.878" />
            <path d="M13 16l-2 2l2 2" />
            <path d="M11 18h4" />
        </svg>
    `
};

const READ_STORAGE_PREFIX = 'ag_header_notifications_read';
const POLL_INTERVAL_MS = 30000;
const POLL_INTERVAL_OPEN_MS = 15000;
// Evita refrescos duplicados cuando focus y visibilitychange se disparan juntos
const MIN_REFRESH_GAP_MS = 10000;

// ── Pagos recibidos (Yape / Plin) en tiempo real ────────────────────────────────
// El equipo-oido registra el pago en el backend, que publica este evento por
// Centrifugo. Al recibirlo se refresca la lista y, si aparecio un pago que no
// conociamos, suena la campanita. El polling de arriba se mantiene como respaldo:
// si el WebSocket esta caido el pago igual aparece, solo que hasta 30 s despues.
const PAYMENT_EVENT = 'received-payment-created';
const PAYMENT_ID_PREFIX = 'received_payment_';

// Aviso entre pestanas: con varias abiertas todas reciben la publicacion y sonarian
// todas. Cada pago se reclama una sola vez en localStorage; la pestana que lo reclama
// avisa y las demas se callan. Es por pago y no por tiempo, asi que varios pagos
// seguidos avisan todos. Dos pestanas que lean a la vez podrian reclamar el mismo
// pago: el peor caso es un aviso duplicado, aceptable frente a perder uno.
const PAYMENT_CLAIM_PREFIX = 'ag_received_payment_claim_';
const PAYMENT_CLAIM_TTL_MS = 10 * 60 * 1000;
const SOUND_ENABLED_KEY = 'ag_received_payment_sound_enabled';

export default {
    components: {
        IconSend,
        IconInvoice,
        IconBox,
        IconBag,
        IconCloudAlert
    },
    props: {
        initialCount: {
            type: Number,
            default: 0
        },
        // Endpoint y canal los arma el backend (NotificationViewComposer) con el mismo
        // fqdn con el que publica. Vacios = sin tiempo real, solo polling.
        wsUrl: {
            type: String,
            default: ''
        },
        channel: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            notifications: [],
            readSnapshots: {},
            hasLoaded: false,
            activeReadFilter: 'todas',
            activeCategoryFilter: 'todas',
            polling: null,
            loading: false,
            pollingInFlight: false,
            pendingRefresh: false,
            dropdownOpen: false,
            requestToken: 0,
            lastFetchAt: 0,
            boundVisibilityHandler: null,
            boundFocusHandler: null,
            maxKnownPaymentId: 0,
            paymentsSeeded: false,
            soundEnabled: false,
            audioContext: null,
            boundPaymentHandler: null,
            boundReconnectHandler: null,
            filters: [
                { id: 'todas', label: 'Todas' },
                { id: 'comprobantes', label: 'Comprobantes' },
                { id: 'pagos', label: 'Pagos' },
                { id: 'inventario', label: 'Inventario' },
                { id: 'cotizaciones', label: 'Cotizaciones' },
                { id: 'pedidos', label: 'Pedidos' },
                { id: 'sistema', label: 'Sistema' }
            ],
            readFilters: [
                { id: 'no-leidas', label: 'No leídas' },
                { id: 'leidas', label: 'Leídas' }
            ],
            iconComponents: {
                send: 'IconSend',
                invoice: 'IconInvoice',
                box: 'IconBox',
                bag: 'IconBag',
                'cloud-alert': 'IconCloudAlert'
            }
        };
    },
    computed: {
        badgeCount() {
            if (!this.hasLoaded) {
                return 0;
            }

            return this.unreadCount;
        },
        unreadCount() {
            return this.notifications.filter((notification) => this.isUnread(notification)).length;
        },
        hasUnreadNotifications() {
            return this.unreadCount > 0;
        },
        canAnnouncePayments() {
            return Boolean(this.wsUrl && this.channel);
        },
        filteredNotifications() {
            let result = [...this.notifications];

            if (this.activeReadFilter === 'no-leidas') {
                result = result.filter((notification) => this.isUnread(notification));
            } else if (this.activeReadFilter === 'leidas') {
                result = result.filter((notification) => !this.isUnread(notification));
            }

            if (this.activeCategoryFilter === 'pedidos') {
                result = result.filter((notification) => notification.type === 'pedidos');
            } else if (this.activeCategoryFilter !== 'todas') {
                result = result.filter((notification) => notification.type === this.activeCategoryFilter);
            }

            if (this.activeReadFilter === 'todas') {
                result.sort((first, second) => {
                    const firstUnread = this.isUnread(first) ? 0 : 1;
                    const secondUnread = this.isUnread(second) ? 0 : 1;

                    return firstUnread - secondUnread;
                });
            }

            return result;
        },
        emptyStateMessage() {
            if (this.activeReadFilter === 'no-leidas') {
                if (this.activeCategoryFilter !== 'todas') {
                    return `No hay notificaciones no leídas en ${this.getCategoryLabel(this.activeCategoryFilter)}`;
                }

                return 'No hay notificaciones no leídas';
            }

            if (this.activeReadFilter === 'leidas') {
                if (this.activeCategoryFilter !== 'todas') {
                    return `Aún no hay notificaciones leídas en ${this.getCategoryLabel(this.activeCategoryFilter)}`;
                }

                return 'Aún no hay notificaciones leídas';
            }

            if (this.activeCategoryFilter !== 'todas') {
                return `No hay notificaciones en ${this.getCategoryLabel(this.activeCategoryFilter)}`;
            }

            return '¡Todo al día! No hay pendientes';
        }
    },
    created() {
        this.readSnapshots = this.loadReadSnapshots();
        this.loadSoundPreference();
    },
    mounted() {
        this.fetchNotifications();
        this.startPolling();
        this.bindRealtimeListeners();
        this.bindPaymentRealtime();
    },
    beforeDestroy() {
        this.stopPolling();
        this.unbindRealtimeListeners();
        this.unbindPaymentRealtime();
    },
    methods: {
        setActiveReadFilter(filterId) {
            this.activeReadFilter = filterId;
        },
        setActiveCategoryFilter(filterId) {
            this.activeCategoryFilter = filterId;
        },
        getCategoryLabel(categoryId) {
            const category = this.filters.find((filter) => filter.id === categoryId);

            return category ? category.label.toLowerCase() : 'esta categoría';
        },
        readStorageKey() {
            return `${READ_STORAGE_PREFIX}_${window.location.hostname}`;
        },
        loadReadSnapshots() {
            try {
                const stored = localStorage.getItem(this.readStorageKey());

                if (!stored) {
                    return {};
                }

                const parsed = JSON.parse(stored);

                if (Array.isArray(parsed)) {
                    return parsed.reduce((snapshots, id) => {
                        snapshots[id] = '__legacy__';

                        return snapshots;
                    }, {});
                }

                return parsed && typeof parsed === 'object' ? parsed : {};
            } catch (error) {
                return {};
            }
        },
        persistReadSnapshots() {
            try {
                localStorage.setItem(this.readStorageKey(), JSON.stringify(this.readSnapshots));
            } catch (error) {
                console.log('No se pudo guardar el estado de lectura de notificaciones.', error);
            }
        },
        getNotificationFingerprint(notification) {
            if (!notification) {
                return '';
            }

            return [
                notification.id,
                notification.title || '',
                notification.tag || '',
                String(notification.count ?? ''),
                JSON.stringify(notification.description_parts || []),
            ].join('|');
        },
        reconcileLegacySnapshots(notifications) {
            let changed = false;

            notifications.forEach((notification) => {
                if (this.readSnapshots[notification.id] !== '__legacy__') {
                    return;
                }

                this.$set(
                    this.readSnapshots,
                    notification.id,
                    this.getNotificationFingerprint(notification)
                );
                changed = true;
            });

            if (changed) {
                this.persistReadSnapshots();
            }
        },
        isUnread(notification) {
            if (!notification || notification.unread === false) {
                return false;
            }

            const fingerprint = this.getNotificationFingerprint(notification);
            const readFingerprint = this.readSnapshots[notification.id];

            if (!readFingerprint || readFingerprint === '__legacy__') {
                return true;
            }

            return readFingerprint !== fingerprint;
        },
        applyReadState(notifications) {
            this.reconcileLegacySnapshots(notifications);

            return notifications.map((notification) => ({
                ...notification,
                unread: this.isUnread(notification),
            }));
        },
        notificationsHaveChanged(currentNotifications, nextNotifications) {
            if (currentNotifications.length !== nextNotifications.length) {
                return true;
            }

            return nextNotifications.some((notification, index) => {
                const current = currentNotifications[index];

                if (!current || current.id !== notification.id) {
                    return true;
                }

                return (
                    current.title !== notification.title
                    || String(current.count ?? '') !== String(notification.count ?? '')
                    || JSON.stringify(current.description_parts) !== JSON.stringify(notification.description_parts)
                );
            });
        },
        syncNotificationsSilently(nextNotifications) {
            if (!this.notificationsHaveChanged(this.notifications, nextNotifications)) {
                return false;
            }

            this.notifications = nextNotifications;

            return true;
        },
        markAsRead(notification) {
            if (!notification || !this.isUnread(notification)) {
                return;
            }

            this.$set(
                this.readSnapshots,
                notification.id,
                this.getNotificationFingerprint(notification)
            );
            this.persistReadSnapshots();

            const index = this.notifications.findIndex((item) => item.id === notification.id);

            if (index !== -1) {
                this.$set(this.notifications[index], 'unread', false);
            }
        },
        markAllAsRead() {
            let changed = false;

            this.notifications.forEach((notification) => {
                if (!this.isUnread(notification)) {
                    return;
                }

                this.$set(
                    this.readSnapshots,
                    notification.id,
                    this.getNotificationFingerprint(notification)
                );
                changed = true;
                this.$set(notification, 'unread', false);
            });

            if (changed) {
                this.persistReadSnapshots();
            }
        },
        onDropdownVisible(visible) {
            this.dropdownOpen = visible;

            if (visible) {
                this.fetchNotifications();
            }

            this.restartPolling();
        },
        openNotification(notification) {
            const url = notification && notification.url;

            if (!url || url === '#') {
                return;
            }

            window.location.assign(url);
        },
        async fetchNotifications(options = {}) {
            const silent = options.silent === true || options.background === true;

            if (silent) {
                if (this.pollingInFlight) {
                    this.pendingRefresh = true;
                    return;
                }

                this.pollingInFlight = true;
            } else if (this.loading) {
                return;
            } else {
                this.loading = true;
            }

            const requestToken = ++this.requestToken;
            this.lastFetchAt = Date.now();

            try {
                const response = await this.$http.get('/notifications/header');
                const data = response.data || {};

                if (requestToken !== this.requestToken) {
                    return;
                }

                const nextNotifications = this.applyReadState(
                    Array.isArray(data.notifications) ? data.notifications : []
                );

                if (silent) {
                    this.syncNotificationsSilently(nextNotifications);
                } else {
                    this.notifications = nextNotifications;
                }

                this.announceReceivedPayments(nextNotifications);

                this.hasLoaded = true;
            } catch (error) {
                if (requestToken === this.requestToken) {
                    console.log('No se pudieron actualizar las notificaciones.', error);

                    if (!silent || !this.hasLoaded) {
                        this.notifications = [];
                    }
                }
            } finally {
                if (requestToken === this.requestToken) {
                    if (silent) {
                        this.pollingInFlight = false;
                    } else {
                        this.loading = false;
                        this.hasLoaded = true;
                    }
                }

                if (this.pendingRefresh) {
                    this.pendingRefresh = false;
                    this.fetchNotifications({ silent: true });
                }
            }
        },
        // ── Pagos recibidos: tiempo real, campanita y aviso del sistema ─────────

        isReceivedPayment(notification) {
            return Boolean(notification)
                && String(notification.id).indexOf(PAYMENT_ID_PREFIX) === 0;
        },

        paymentIdOf(notification) {
            const id = parseInt(String(notification.id).slice(PAYMENT_ID_PREFIX.length), 10);

            return Number.isFinite(id) ? id : 0;
        },

        /**
         * Devuelve los pagos que entraron despues de lo ya conocido.
         *
         * Se compara contra el id mas alto visto (autoincremental), no contra la lista
         * de ids: el header solo trae los pendientes mas recientes, y al reclamar uno
         * entra a la lista un pago viejo que no debe sonar como si recien llegara.
         * Tampoco se confia en el payload del evento (va vacio a proposito): asi el
         * aviso es correcto aunque lleguen varios pagos juntos, se pierda un evento o
         * el refresco venga del polling.
         */
        collectNewPayments(notifications) {
            const previousMax = this.maxKnownPaymentId;
            const nuevos = [];

            notifications.forEach((notification) => {
                if (!this.isReceivedPayment(notification)) {
                    return;
                }

                const id = this.paymentIdOf(notification);

                if (id > this.maxKnownPaymentId) {
                    this.maxKnownPaymentId = id;
                }

                if (id > previousMax) {
                    nuevos.push(notification);
                }
            });

            return nuevos;
        },

        announceReceivedPayments(notifications) {
            const nuevos = this.collectNewPayments(notifications);

            // La primera carga solo siembra el id mas alto conocido. Sin esto, abrir la
            // caja en la manana haria sonar la campanita por toda la cola del dia.
            if (!this.paymentsSeeded) {
                this.paymentsSeeded = true;

                return;
            }

            const propios = this.claimPayments(nuevos);

            if (!propios.length) {
                return;
            }

            this.playPaymentSound();
            propios.forEach((notification) => this.showDesktopNotification(notification));
        },

        /**
         * Reclama cada pago una sola vez entre todas las pestanas y devuelve los que
         * reclamo esta. Suena una vez por tanda aunque sean varios pagos.
         */
        claimPayments(payments) {
            if (!payments.length) {
                return [];
            }

            try {
                const now = Date.now();
                this.pruneExpiredPaymentClaims(now);

                return payments.filter((notification) => {
                    const key = PAYMENT_CLAIM_PREFIX + this.paymentIdOf(notification);

                    if (localStorage.getItem(key)) {
                        return false;
                    }

                    localStorage.setItem(key, String(now));

                    return true;
                });
            } catch (error) {
                // Sin localStorage se avisa igual: mejor sonar de mas que no sonar.
                return payments;
            }
        },

        pruneExpiredPaymentClaims(now) {
            for (let index = localStorage.length - 1; index >= 0; index -= 1) {
                const key = localStorage.key(index);

                if (!key || key.indexOf(PAYMENT_CLAIM_PREFIX) !== 0) {
                    continue;
                }

                const claimedAt = parseInt(localStorage.getItem(key), 10);

                if (!claimedAt || (now - claimedAt) > PAYMENT_CLAIM_TTL_MS) {
                    localStorage.removeItem(key);
                }
            }
        },

        loadSoundPreference() {
            try {
                this.soundEnabled = localStorage.getItem(SOUND_ENABLED_KEY) === '1';
            } catch (error) {
                this.soundEnabled = false;
            }
        },

        /**
         * El navegador bloquea el audio hasta que el usuario interactua con la pagina.
         * Este metodo corre desde un click, que es el unico momento en el que se puede
         * desbloquear el AudioContext y pedir el permiso de notificaciones.
         */
        enableSound() {
            this.soundEnabled = true;

            try {
                localStorage.setItem(SOUND_ENABLED_KEY, '1');
            } catch (error) {
                console.log('No se pudo guardar la preferencia de sonido.', error);
            }

            this.requestDesktopPermission();
            this.playPaymentSound();
        },

        ensureAudioContext() {
            if (this.audioContext) {
                return this.audioContext;
            }

            const AudioContextClass = window.AudioContext || window.webkitAudioContext;

            if (!AudioContextClass) {
                return null;
            }

            try {
                this.audioContext = new AudioContextClass();
            } catch (error) {
                this.audioContext = null;
            }

            return this.audioContext;
        },

        /**
         * Campanita de dos notas generada con Web Audio: no hace falta ningun archivo
         * de audio en public/. Si mas adelante se quiere un mp3 propio, se reemplaza
         * este metodo por un new Audio(...).play().
         */
        playPaymentSound() {
            if (!this.soundEnabled) {
                return;
            }

            const context = this.ensureAudioContext();

            if (!context) {
                return;
            }

            try {
                if (context.state === 'suspended') {
                    context.resume();
                }

                [{ frequency: 880, offset: 0 }, { frequency: 1320, offset: 0.12 }].forEach((note) => {
                    const oscillator = context.createOscillator();
                    const gain = context.createGain();
                    const startAt = context.currentTime + note.offset;

                    oscillator.type = 'sine';
                    oscillator.frequency.value = note.frequency;

                    gain.gain.setValueAtTime(0.0001, startAt);
                    gain.gain.exponentialRampToValueAtTime(0.25, startAt + 0.02);
                    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.45);

                    oscillator.connect(gain);
                    gain.connect(context.destination);
                    oscillator.start(startAt);
                    oscillator.stop(startAt + 0.5);
                });
            } catch (error) {
                console.log('No se pudo reproducir el aviso de pago.', error);
            }
        },

        requestDesktopPermission() {
            if (typeof window.Notification === 'undefined') {
                return;
            }

            if (window.Notification.permission !== 'default') {
                return;
            }

            try {
                window.Notification.requestPermission();
            } catch (error) {
                console.log('No se pudo pedir el permiso de notificaciones.', error);
            }
        },

        /**
         * Aviso del sistema operativo: se ve aunque el navegador este minimizado o en
         * otra pestana. Si el permiso no esta concedido no pasa nada: quedan la
         * campanita del header y el sonido.
         */
        showDesktopNotification(notification) {
            if (typeof window.Notification === 'undefined') {
                return;
            }

            if (window.Notification.permission !== 'granted') {
                return;
            }

            try {
                const body = (notification.description_parts || [])
                    .map((part) => part.text)
                    .join('');

                // tag = id del pago: el sistema no apila dos avisos del mismo pago.
                new window.Notification(notification.title, {
                    body: body,
                    tag: notification.id
                });
            } catch (error) {
                console.log('No se pudo mostrar el aviso del sistema.', error);
            }
        },

        bindPaymentRealtime() {
            if (!this.canAnnouncePayments) {
                return;
            }

            this.boundPaymentHandler = () => {
                this.fetchNotifications({ silent: true });
            };

            // En cada (re)suscripcion se refresca para recuperar los pagos que hayan
            // entrado mientras el socket estuvo caido.
            this.boundReconnectHandler = () => {
                this.fetchNotifications({ silent: true });
            };

            centrifugoOn(PAYMENT_EVENT, this.boundPaymentHandler);
            centrifugoOnConnect(this.boundReconnectHandler);
            centrifugoConnect(this.wsUrl, this.channel);
        },

        unbindPaymentRealtime() {
            if (this.boundPaymentHandler) {
                centrifugoOff(PAYMENT_EVENT, this.boundPaymentHandler);
                this.boundPaymentHandler = null;
            }

            if (this.boundReconnectHandler) {
                centrifugoOffConnect(this.boundReconnectHandler);
                this.boundReconnectHandler = null;
            }
        },

        bindRealtimeListeners() {
            this.boundVisibilityHandler = () => {
                if (!document.hidden) {
                    this.refreshIfStale();
                }
            };
            this.boundFocusHandler = () => {
                this.refreshIfStale();
            };

            document.addEventListener('visibilitychange', this.boundVisibilityHandler);
            window.addEventListener('focus', this.boundFocusHandler);
        },
        unbindRealtimeListeners() {
            if (this.boundVisibilityHandler) {
                document.removeEventListener('visibilitychange', this.boundVisibilityHandler);
                this.boundVisibilityHandler = null;
            }

            if (this.boundFocusHandler) {
                window.removeEventListener('focus', this.boundFocusHandler);
                this.boundFocusHandler = null;
            }
        },
        refreshIfStale() {
            if (this.lastFetchAt && Date.now() - this.lastFetchAt < MIN_REFRESH_GAP_MS) {
                return;
            }

            this.fetchNotifications({ silent: true });
        },
        getPollInterval() {
            return this.dropdownOpen ? POLL_INTERVAL_OPEN_MS : POLL_INTERVAL_MS;
        },
        restartPolling() {
            this.stopPolling();
            this.startPolling();
        },
        startPolling() {
            this.polling = setInterval(() => {
                // Con la pestaña oculta no se consulta; al volver, visibilitychange refresca
                if (document.hidden) {
                    return;
                }

                this.fetchNotifications({ silent: true });
            }, this.getPollInterval());
        },
        stopPolling() {
            if (this.polling) {
                clearInterval(this.polling);
                this.polling = null;
            }
        }
    }
};
</script>

<style scoped>
.ag-notification-wrapper {
    display: inline-block;
    vertical-align: middle;
}

.ag-bell-badge :deep(.el-badge__content) {
    background-color: #2563eb !important;
    top: 0 !important;
    right: 2px !important;
    border: none;
    padding: 0 5px;
    font-size: 10px;
    height: 16px;
    line-height: 16px;
    min-width: 18px;
    text-align: center;
    border-radius: 3px !important;
    font-weight: bold;
}

.ag-notification-menu {
    background-color: #ffffff !important;
    z-index: 5000 !important;
    border: none !important;
    box-shadow: 0 8px 24px rgba(5, 12, 38, 0.12) !important;
    border-radius: 12px !important;
    padding: 0 !important;
    margin-top: 10px !important;
    min-width: 420px !important;
    max-width: 420px !important;
}

.ag-notification-panel {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 420px;
}

.ag-notification-header {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    box-sizing: border-box;
    padding: 16px 20px;
    border-bottom: 1px solid #f0f2f5;
}

.ag-notification-header__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 12px;
}

.ag-notification-header__read {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
}

.ag-notification-header__actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
}

/* Desbloqueo del audio: el navegador no deja sonar nada hasta el primer clic. */
.ag-enable-sound {
    border: none;
    background: #eef2ff;
    color: #4338ca;
    padding: 5px 10px;
    border-radius: 999px;
    line-height: 1;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.2s ease;
}

.ag-enable-sound:hover {
    background: #e0e7ff;
}

.ag-read-tab {
    border: none;
    background: #f3f4f6;
    color: #6b7280;
    font-size: 11px;
    font-weight: 500;
    line-height: 1;
    padding: 5px 10px;
    border-radius: 999px;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
}

.ag-read-tab:hover {
    background: #e5e7eb;
}

.ag-read-tab.is-active {
    background: #050C26;
    color: #ffffff;
}

.text-xs {
    font-size: 12px;
    line-height: 1;
}

.text-gray-400 {
    color: #9CA3AF;
}

.hover\:text-gray-600:hover {
    color: #4B5563;
}

.font-medium {
    font-weight: 500;
}

.w-2 {
    width: 8px;
}

.h-2 {
    height: 8px;
}

.bg-blue-600 {
    background-color: #2563EB;
}

.rounded-full {
    border-radius: 9999px;
}

.ag-mark-all-read {
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.2s ease;
}

.ag-mark-all-read:hover {
    color: #4B5563;
}

.ag-notification-title {
    margin: 0;
    flex-shrink: 0;
    font-size: 16px;
    font-weight: 700;
    color: #050C26;
    line-height: 1.2;
}

.ag-notification-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.ag-notification-filters--category {
    padding: 12px 20px;
    border-bottom: 1px solid #f0f2f5;
}

.ag-filter-chip {
    border: none;
    background: #f3f4f6;
    color: #6b7280;
    font-size: 12px;
    font-weight: 500;
    line-height: 1;
    padding: 7px 12px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.ag-filter-chip:hover {
    background: #e5e7eb;
}

.ag-filter-chip.is-active {
    background: #050C26;
    color: #ffffff;
}

.ag-notification-list {
    max-height: 420px;
    overflow-y: auto;
}

.ag-notification-list-inner {
    position: relative;
}

.ag-list-fade-move {
    transition: transform 0.25s ease;
}

.ag-list-fade-enter-active,
.ag-list-fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.ag-list-fade-enter,
.ag-list-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}

.ag-list-fade-leave-active {
    position: absolute;
    left: 0;
    right: 0;
}

.ag-notification-card {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 16px 20px;
    text-decoration: none !important;
    border-bottom: 1px solid #f0f2f5;
    transition: background-color 0.2s ease;
}

.ag-notification-card:last-child {
    border-bottom: none;
}

.ag-notification-card:hover {
    background-color: #f8fafc;
}

.ag-notification-card__icon {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.ag-notification-card__icon.is-yellow {
    background: #FEF3C7;
    color: #B45309;
}

.ag-notification-card__icon.is-blue {
    background: #DBEAFE;
    color: #2563EB;
}

.ag-notification-card__icon.is-red {
    background: #FEE2E2;
    color: #DC2626;
}

.ag-notification-card__icon.is-green {
    background: #D1FAE5;
    color: #059669;
}

.ag-notification-card__body {
    flex: 1;
    min-width: 0;
}

.ag-notification-card__title-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 4px;
}

.ag-unread-dot {
    position: absolute;
    top: 14px;
    right: 16px;
    flex-shrink: 0;
    pointer-events: none;
}

.ag-mark-read-btn {
    position: absolute;
    top: 10px;
    right: 30px;
    border: none;
    background: transparent;
    padding: 2px 0;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease, color 0.2s ease;
    z-index: 1;
}

.ag-notification-card:hover .ag-mark-read-btn {
    opacity: 1;
}

.ag-dot-fade-enter-active,
.ag-dot-fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.ag-dot-fade-enter,
.ag-dot-fade-leave-to {
    opacity: 0;
    transform: scale(0.5);
}

.ag-notification-card__title {
    font-size: 14px;
    font-weight: 700;
    color: #050C26;
    line-height: 1.3;
}

.ag-notification-tag {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    border-radius: 999px;
    background: #FEF3C7;
    color: #92400E;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.04em;
}

.ag-notification-card__description {
    margin: 0 0 6px;
    font-size: 13px;
    line-height: 1.45;
    color: #6B7280;
}

.ag-notification-card__description strong {
    color: #050C26;
    font-weight: 700;
}

.ag-notification-card__time {
    font-size: 12px;
    color: #9CA3AF;
}

.ag-notification-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 40px 24px;
    color: #9CA3AF;
    text-align: center;
}

.ag-notification-empty p {
    margin: 0;
    font-size: 14px;
    color: #6B7280;
}
</style>
