import Vue from 'vue'
import { coerceSize, defaultLayout, typeById, typesForSource } from './registry'

const LS_KEY = 'dashboard_widgets_layout_v1'
/** Una sola vez: alinea bloque finanzas + SUNAT + stock en layouts guardados. */
const LS_NORMALIZE_FIN_BLOCK = 'dashboard_widgets_normalize_fin_block_v1'

/** Orden y tamaño del bloque inferior: flujo + utilidades, luego SUNAT + stock. */
const FIN_BLOCK_SOURCES = [
  'finanzas.flujo_caja',
  'finanzas.utilidades',
  'sunat.estado_cpe',
  'inventario.stock_bajo',
]

const FIN_BLOCK_LAYOUT = {
  'finanzas.flujo_caja': { type: 'area', size: 'l', cols: 8, rows: 5 },
  'finanzas.utilidades': { type: 'donut', size: 'l', cols: 4, rows: 5 },
  'sunat.estado_cpe': { type: 'custom', size: 'm', cols: 6, rows: 4 },
  'inventario.stock_bajo': { type: 'custom', size: 'm', cols: 6, rows: 4 },
}

/**
 * Estado compartido del dashboard de widgets (Vue.observable, Vue 2.6).
 * Persistencia: localStorage como cache; el backend por usuario entra en
 * la fase de persistencia (GET/PUT /dashboard/widgets/layout).
 */
const state = Vue.observable({
  ready: false,
  catalog: { modules: [], sources: [] },
  layout: [],
  datasets: {},
  loading: {},
  editMode: false,
  modalOpen: false,
  filters: {},
})

function http() {
  return Vue.prototype.$http
}

export function dataKey(widget) {
  return widget.source + '|' + JSON.stringify(widget.options || {})
}

function sourceByKey(key) {
  return state.catalog.sources.find(s => s.key === key) || null
}

function sanitizeLayout(rawLayout) {
  if (!Array.isArray(rawLayout)) return []

  return rawLayout.filter(w => {
    if (!w || !w.id || !w.source || !w.type) return false
    const source = sourceByKey(w.source)
    if (!source) return false
    if (w.type === 'custom' && !source.custom_component) return false
    if (w.type !== 'custom' && !typeById(w.type)) return false
    return typesForSource(source).some(t => t.id === w.type)
  }).map(w => ({
    id: String(w.id),
    source: w.source,
    type: w.type,
    size: w.size || 'm',
    cols: w.cols || undefined,
    rows: w.rows || undefined,
    options: w.options || {},
  }))
}

let persistTimer = null

function persistLocal() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state.layout))
  } catch (e) { /* storage lleno o bloqueado: se ignora */ }
  persistRemoteDebounced()
}

/** Guarda en backend con debounce; el server re-valida contra el catálogo. */
function persistRemoteDebounced() {
  if (persistTimer) clearTimeout(persistTimer)
  persistTimer = setTimeout(() => {
    persistTimer = null
    http().put('/dashboard/widgets/layout', { layout: state.layout }).catch(() => {})
  }, 800)
}

function loadLocal() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) return sanitizeLayout(JSON.parse(raw))
  } catch (e) { /* json corrupto: se descarta */ }
  return []
}

function finBlockSourcesSet() {
  return new Set(FIN_BLOCK_SOURCES)
}

function buildFinBlockWidget(source, existing) {
  const meta = FIN_BLOCK_LAYOUT[source]
  const catalog = sourceByKey(source)
  if (!meta || !catalog) return null

  const types = typesForSource(catalog).map(t => t.id)
  let type = meta.type
  if (existing && types.includes(existing.type)) {
    type = existing.type
  } else if (!types.includes(type)) {
    type = types[0] || type
  }

  const id = existing && existing.id
    ? String(existing.id)
    : 'w_' + source.replace(/\./g, '_') + '_' + Date.now().toString(36)

  return {
    id,
    source,
    type,
    size: meta.size,
    cols: meta.cols,
    rows: meta.rows,
    options: (existing && existing.options) || {},
  }
}

/**
 * Reordena el bloque finanzas/SUNAT/stock: flujo (8) + utilidades (4),
 * luego estado SUNAT (6) + stock bajo (6). Inserta utilidades si falta.
 */
function normalizeFinBlockLayout(layout) {
  if (!Array.isArray(layout) || !layout.length) return layout

  let alreadyNormalized = false
  try { alreadyNormalized = localStorage.getItem(LS_NORMALIZE_FIN_BLOCK) === '1' } catch (e) { /* ignore */ }
  if (alreadyNormalized) return layout

  const finSet = finBlockSourcesSet()
  const existingBySource = {}

  layout.forEach(widget => {
    if (widget && finSet.has(widget.source)) {
      existingBySource[widget.source] = widget
    }
  })

  const orderedFin = FIN_BLOCK_SOURCES
    .map(source => buildFinBlockWidget(source, existingBySource[source]))
    .filter(Boolean)

  if (!orderedFin.length) return layout

  const result = []
  let finInserted = false

  layout.forEach(widget => {
    if (!widget || !finSet.has(widget.source)) {
      result.push(widget)
      return
    }

    if (!finInserted) {
      result.push(...orderedFin)
      finInserted = true
    }
  })

  if (!finInserted) {
    result.push(...orderedFin)
  }

  try { localStorage.setItem(LS_NORMALIZE_FIN_BLOCK, '1') } catch (e) { /* ignore */ }

  return result
}

async function fetchDatasets(widgets) {
  const pending = []
  const seen = {}

  widgets.forEach(widget => {
    const key = dataKey(widget)
    if (seen[key]) return
    seen[key] = true
    pending.push({ key, source: widget.source, options: widget.options || {} })
    Vue.set(state.loading, key, true)
  })

  if (!pending.length) return

  try {
    const response = await http().post('/dashboard/widgets/data', {
      widgets: pending.map(p => ({ key: p.key, source: p.source, options: p.options })),
      filters: state.filters,
    })

    const data = response.data.data || {}
    pending.forEach(p => {
      Vue.set(state.datasets, p.key, data[p.key] || { error: 'empty' })
    })
  } catch (e) {
    pending.forEach(p => Vue.set(state.datasets, p.key, { error: 'request_failed' }))
  } finally {
    pending.forEach(p => Vue.set(state.loading, p.key, false))
  }
}

export const widgetStore = {
  state,

  async init(filters) {
    state.filters = Object.assign({}, filters)

    const response = await http().get('/dashboard/widgets/catalog')
    state.catalog = response.data

    // Prioridad: layout del usuario (backend) > cache local > réplica por defecto.
    let layout = []
    try {
      const saved = await http().get('/dashboard/widgets/layout')
      layout = sanitizeLayout(saved.data.layout)
    } catch (e) { /* sin backend de layout: cae a local */ }

    if (!layout.length) layout = loadLocal()
    layout = layout.length ? layout : defaultLayout(state.catalog.sources)
    const normalized = normalizeFinBlockLayout(layout)
    state.layout = normalized
    state.ready = true

    if (normalized !== layout) persistLocal()

    await this.refresh()
  },

  async setFilters(filters) {
    state.filters = Object.assign({}, filters)
    state.datasets = {}
    await this.refresh()
  },

  async refresh() {
    await fetchDatasets(state.layout)
  },

  source(key) {
    return sourceByKey(key)
  },

  dataset(widget) {
    return state.datasets[dataKey(widget)] || null
  },

  isLoading(widget) {
    return !!state.loading[dataKey(widget)]
  },

  toggleEdit() {
    const wasEditing = state.editMode
    state.editMode = !state.editMode
    if (wasEditing) persistLocal()
  },

  openModal() {
    state.modalOpen = true
  },

  closeModal() {
    state.modalOpen = false
  },

  moveWidget(fromIndex, toIndex) {
    if (fromIndex === null || toIndex === null || fromIndex === toIndex) return
    const layout = state.layout.slice()
    const [item] = layout.splice(fromIndex, 1)
    layout.splice(toIndex, 0, item)
    state.layout = layout
    persistLocal()
  },

  removeWidget(id) {
    state.layout = state.layout.filter(w => w.id !== id)
    persistLocal()
  },

  setType(id, typeId) {
    state.layout = state.layout.map(w => {
      if (w.id !== id) return w
      return Object.assign({}, w, {
        type: typeId,
        size: typeId === 'custom' ? w.size : coerceSize(typeId, w.size),
        cols: undefined,
        rows: undefined,
      })
    })
    persistLocal()
  },

  cycleSize(id) {
    state.layout = state.layout.map(w => {
      if (w.id !== id) return w
      const sizes = typeById(w.type).sizes
      const current = sizes.indexOf(w.size)
      return Object.assign({}, w, { size: sizes[(current + 1) % sizes.length], cols: undefined, rows: undefined })
    })
    persistLocal()
  },

  resizeWidget(id, cols, rows) {
    state.layout = state.layout.map(w => {
      return w.id === id ? Object.assign({}, w, { cols, rows }) : w
    })
  },

  persist() {
    persistLocal()
  },

  async addWidget(widget) {
    const id = 'w' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
    const entry = Object.assign({ id, options: {} }, widget)
    state.layout = state.layout.concat([entry])
    persistLocal()
    await fetchDatasets([entry])
    return entry
  },

  async resetLayout() {
    state.layout = defaultLayout(state.catalog.sources)
    persistLocal()
    await this.refresh()
  },

  /** Dataset puntual para el preview del modal (no toca el layout). */
  async preview(source, options) {
    const widget = { source, options: options || {} }
    await fetchDatasets([widget])
    return this.dataset(widget)
  },
}
