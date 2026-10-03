// Aplica "Cantidad de decimales para los precios" (configurations.decimal_quantity) a los montos de los listados
export const decimalQuantity = {
    data() {
        return {
            decimal_quantity: 2,
        }
    },
    created() {
        this.loadDecimalQuantity()
    },
    methods: {
        loadDecimalQuantity() {
            const http = this.$http || window.axios
            if (!http) return
            http.get('/configurations/record').then(response => {
                if (response.data && response.data.data && response.data.data.decimal_quantity) {
                    this.decimal_quantity = response.data.data.decimal_quantity
                }
            }).catch(() => {})
        },
        formatDecimal(value) {
            if (value === undefined || value === null || value === '') return ''
            let cleanValue = value
            if (typeof cleanValue === 'string') {
                cleanValue = cleanValue.replace(/,/g, '').trim()
            }
            if (isNaN(Number(cleanValue))) return value
            return Number(cleanValue).toLocaleString('en-US', { minimumFractionDigits: this.decimal_quantity, maximumFractionDigits: this.decimal_quantity })
        },
        // Para montos que el backend ya envía con símbolo, ej. "S/ 10.500000"
        formatDecimalText(value) {
            if (value === undefined || value === null || value === '') return ''
            const match = String(value).match(/^(.*?)(-?[\d,]*\.?\d+)\s*$/)
            if (!match) return value
            return `${match[1]}${this.formatDecimal(match[2])}`
        },
    },
}
