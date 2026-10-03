/**
 * Nota de credito sobre un comprobante con descuentos.
 *
 * El XML de la nota (credit.blade.php) no tiene cac:AllowanceCharge: los descuentos no se
 * pueden informar, asi que los items se cargan con el descuento incluido en el precio.
 *
 * Se parte de los totales que el comprobante declaro (total_taxed, total_exonerated, ...,
 * total) y no de recalcular cada descuento: esos totales ya reflejan descuentos por item y
 * globales, el gravado recalculado (total - igv) y los subtotales editados. Cada total se
 * reparte entre los items de su afectacion en proporcion a su valor de venta.
 *
 * - Descuentos que afectan la base (00 por item, 02 global): la nota queda con la misma base,
 *   el mismo IGV y el mismo total que el comprobante.
 * - Descuentos que no afectan la base (01 por item, 03 global): se respeta el total cobrado.
 *   Sin AllowanceCharge no se puede respetar tambien el IGV: la base y el IGV bajan en proporcion.
 */

// afectaciones onerosas y el total del comprobante que las agrupa
const PAID_AFFECTATIONS = {
    '10': 'total_taxed',
    '20': 'total_exonerated',
    '30': 'total_unaffected',
    '40': 'total_exportation',
}

const DISCOUNT_TYPES_NO_BASE = ['01', '03']
const DISCOUNT_TYPES_PREPAYMENT = ['04', '05', '06']

// diferencia maxima entre lo repartido y el total del comprobante que se atribuye a redondeos
const ROUNDING_TOLERANCE = 0.05

// descuentos, cargos y anticipos llegan como objeto indexado (json_decode a object) o arreglo
const toList = (value) => (value ? Object.values(value) : [])

const toNumber = (value) => parseFloat(value) || 0

const discountTypes = (document) => {
    const types = toList(document.discounts).map(discount => discount.discount_type_id)

    toList(document.items).forEach(row => {
        toList(row.discounts).forEach(discount => types.push(discount.discount_type_id))
    })

    return types
}

/**
 * Si el comprobante tiene descuentos que no afectan la base imponible
 */
const hasDiscountsNoBase = (document) => {
    return discountTypes(document).some(type => DISCOUNT_TYPES_NO_BASE.includes(type))
}

/**
 * Motivo por el que los items no se pueden cargar automaticamente, o null si se puede.
 * En esos casos se mantiene el flujo manual.
 */
const getDiscountsIncludedBlocker = (document, default_rate) => {
    const items = toList(document.items)

    if (toNumber(document.total_prepayment) > 0
        || toList(document.prepayments).length > 0
        || discountTypes(document).some(type => DISCOUNT_TYPES_PREPAYMENT.includes(type))) {
        return 'tiene anticipos'
    }

    if (toNumber(document.total_charge) > 0
        || toList(document.charges).length > 0
        || items.some(row => toList(row.charges).length > 0)) {
        return 'tiene cargos'
    }

    if (toNumber(document.total_isc) > 0 || toNumber(document.total_other_taxes) > 0) {
        return 'tiene ISC u otros tributos'
    }

    if (toNumber(document.total_plastic_bag_taxes) > 0) {
        return 'tiene impuesto a las bolsas plásticas'
    }

    const paid_items = items.filter(row => PAID_AFFECTATIONS[row.affectation_igv_type_id])

    if (paid_items.length === 0) {
        return 'no tiene productos con valor de venta'
    }

    // un item oneroso sin valor (descuento del 100%) no se puede emitir con precio 0
    if (paid_items.some(row => toNumber(row.total_value) <= 0 || toNumber(row.quantity) <= 0)) {
        return 'tiene productos con valor de venta cero'
    }

    const groups = _.groupBy(paid_items, 'affectation_igv_type_id')

    const empty_group = Object.keys(groups).some(affectation => {
        return toNumber(document[PAID_AFFECTATIONS[affectation]]) <= 0
    })

    if (empty_group) {
        return 'sus totales por afectación no corresponden a sus productos'
    }

    const { declared_total } = distribute(document, default_rate)
    const difference = declared_total - toNumber(document.total)

    // lo repartido nunca puede ser menor al total cobrado; si es mayor, solo se explica
    // por descuentos que no afectan la base o por redondeos
    if (difference < -ROUNDING_TOLERANCE
        || (difference > ROUNDING_TOLERANCE && !hasDiscountsNoBase(document))) {
        return 'sus totales no cuadran con sus productos'
    }

    return null
}

/**
 * Reparte los totales declarados del comprobante entre sus items onerosos
 *
 * @return {{rows: Array<{row: Object, rate: number, declared: number}>, declared_total: number}}
 */
function distribute(document, default_rate) {
    const paid_items = toList(document.items).filter(row => PAID_AFFECTATIONS[row.affectation_igv_type_id])
    const groups = _.groupBy(paid_items, 'affectation_igv_type_id')

    const rows = []

    Object.keys(groups).forEach(affectation => {
        const group_base = toNumber(document[PAID_AFFECTATIONS[affectation]])
        const group_weight = _.sumBy(groups[affectation], row => toNumber(row.total_value))

        groups[affectation].forEach(row => {
            // solo el gravado paga IGV; se usa la tasa del item (18% o 10.5% segun el caso)
            const rate = affectation === '10'
                ? (toNumber(row.percentage_igv) / 100 || default_rate)
                : 0

            const base = group_base * toNumber(row.total_value) / group_weight

            rows.push({ row, rate, declared: base * (1 + rate) })
        })
    })

    return { rows, declared_total: _.sumBy(rows, 'declared') }
}

/**
 * Items del comprobante listos para calculateRowItem: sin descuentos ni cargos y con el
 * precio unitario (con IGV) que da el total cobrado. Los items gratuitos se devuelven sin
 * cambios de montos.
 *
 * @param {Object} document comprobante afectado (items, totales, descuentos)
 * @param {number} default_rate tasa de IGV (0.18) si el item no la trae
 * @return {Array<{row: Object, rate: number}>} copias; el comprobante no se modifica
 */
const buildItemsWithDiscountsIncluded = (document, default_rate) => {
    const { rows, declared_total } = distribute(document, default_rate)

    // factor 1 salvo redondeos, o menor a 1 si hay descuentos que no afectan la base:
    // lleva la suma de los items exactamente al total cobrado
    const factor = toNumber(document.total) / declared_total

    const paid = rows.map(({ row, rate, declared }) => {
        const copy = JSON.parse(JSON.stringify(row))
        const unit_price = (declared * factor) / toNumber(copy.quantity)

        copy.item.unit_price = unit_price
        copy.item.currency_type_id = document.currency_type_id
        copy.input_unit_price_value = unit_price
        copy.discounts = []
        copy.charges = []

        return { row: copy, rate }
    })

    const free = toList(document.items)
        .filter(row => !PAID_AFFECTATIONS[row.affectation_igv_type_id])
        .map(row => {
            const copy = JSON.parse(JSON.stringify(row))
            copy.discounts = []
            copy.charges = []

            return { row: copy, rate: null }
        })

    // se conserva el orden original del comprobante
    const all = [...paid, ...free]
    const original = toList(document.items)

    return _.sortBy(all, ({ row }) => original.findIndex(it => it.id === row.id))
}

export {
    buildItemsWithDiscountsIncluded,
    getDiscountsIncludedBlocker,
    hasDiscountsNoBase,
}
