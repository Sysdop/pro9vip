<template>
    <data-table :resource="resource">
        <tr slot="heading">
            <!-- <th>#</th> -->
            <th v-if="!item_id">Producto</th>
            <th>Fecha y hora transacción</th>
            <th>Tipo transacción</th>
            <th>Número</th>
            <th>NV. Asociada</th>
            <th>Pedido</th>
            <th>Doc. Asociado</th>
            <th>Fecha emisión</th>
            <th>Fecha registro</th>
            <th>Entrada</th>
            <th>Salida</th>
            <th v-if="item_id">Saldo</th>
            <th></th>
            <!--
            <th >Almacen </th>
            <th >Precio de almacen</th>
        -->
        </tr>
        <tr slot-scope="{ index, row }">
            <!-- <td>{{ index }}</td> -->
            <td v-if="!item_id">{{ row.item_name }}</td>
            <td>{{ row.date_time }}</td>
            <td>
                <template v-if="hasVoidLabel(row.type_transaction)">
                    {{ voidLabelBase(row.type_transaction) }}
                    <span class="text-danger">(Anulación)</span>
                </template>
                <template v-else>{{ row.type_transaction }}</template>
            </td>
            <td>{{ row.number }}</td>
            <td>{{ row.sale_note_asoc }}</td>
            <td>{{ row.order_note_asoc }}</td>
            <td>{{ row.doc_asoc }}</td>
            <td>{{ row.date_of_issue }}</td>
            <td>{{ row.date_of_register }}</td>
            <!-- <td>{{ row.inventory }}</td> -->
            <td>
                <el-tag
                    v-if="isStockDiscounted(row, 'input')"
                    type="info"
                    size="small"
                    class="ms-0"
                    :title="row.stock_discount_reason">
                    {{ row.stock_discount_label }} <br> {{ stockMovementDisplay(row, 'input') }}
                </el-tag>
                <template v-else>{{ row.input }}</template>
            </td>
            <td>
                <el-tag
                    v-if="isStockDiscounted(row, 'output')"
                    type="success"
                    size="small"
                    class="ms-0"
                    :title="row.stock_discount_reason">
                    {{ row.stock_discount_label }} <br> {{ stockMovementDisplay(row, 'output') }}
                </el-tag>
                <template v-else>{{ row.output }}</template>
            </td>
            <td v-if="item_id">{{ row.balance }}</td>
            <td class="text-end">
                <button class="btn btn-xs btn-info btn-shad"
                        type="button"
                        @click.prevent="downloadPdfGuide(row.guide_id)"
                        v-if="row.guide_id">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-file-type-pdf"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" /><path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" /><path d="M17 18h2" /><path d="M20 15h-3v6" /><path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1" /></svg>
                </button>
            </td>
            <!--
                <td v-if="row.warehouse">{{row.warehouse}}</td>
                <td v-if="row.item_warehouse_price">{{row.item_warehouse_price}}</td>
                -->
        </tr>
    </data-table>
</template>
<style>
.invoice table.table {
    table-layout: auto !important;
}
</style>
<style scoped>
    .el-tag--small {
        height: auto;
        padding: 5px;
        line-height: 14px;
    }
</style>
<script>

import DataTable from '../../components/DataTableKardex.vue'

export default {
    components: {DataTable},
    data() {
        return {
            resource: 'reports/kardex',
            form: {},
            item_id: null
        }
    },
    created() {
        this.$eventHub.$on('emitItemID', (item_id) => {
            // console.log(item_id)
            this.item_id = item_id
        })
    },
    methods: {
        stockMovementDisplay(row, column) {
            if (!this.isStockDiscounted(row, column)) return row[column]

            const match = String(row.stock_discount_reason || '').match(
                /^Stock (?:descontado|reingresado) en (?:la nota de venta|el pedido|la guía|el comprobante)\s+(.+)$/
            )
            return match ? match[1].trim() || '—' : '—'
        },
        isStockDiscounted(row, column) {
            return !!row.stock_already_discounted && row.stock_discount_column === column
        },
        hasVoidLabel(typeTransaction) {
            return typeof typeTransaction === 'string' && typeTransaction.includes('(Anulación)')
        },
        voidLabelBase(typeTransaction) {
            return String(typeTransaction).replace(/\s*\(Anulación\)\s*$/, '').trim()
        },
        downloadPdfGuide(guide_id) {
            if (guide_id) {
                window.open(`/${this.resource}/get_pdf_guide/${guide_id}`, "_blank");
            }
        }
    }
}
</script>
