<template>
    <div>
        <div class="page-header pe-0">
            <h2>
                <a href="/dashboard">
                    <i class="fas fa-tachometer-alt">
                    </i>
                </a>
            </h2>
            <ol class="breadcrumbs">
                <li class="active">
                    <span>
                        Prestamos Bancarios
                    </span>
                </li>
            </ol>
            <div class="right-wrapper pull-right pt-2">
                <!--
                @todo Crear exportador
                <el-button class="submit"
                           type="success"
                           @click.prevent="clickDownload('excel')">
                    <i class="fa fa-file-excel">
                    </i> Exportar Excel
                </el-button>
                -->
                <a :href="`/${resource}/create`"
                   class="btn btn-custom btn-sm me-2">
                    <i class="fa fa-plus-circle">
                    </i> Nuevo</a>
            </div>
        </div>
        <div class="card tab-content-default row-new mb-0">
            <div class="card-body">
                <data-table :resource="resource">
                    <tr slot="heading">
                        <!-- <th>#</th> -->
                        <th class="text-start">Fecha Emisión</th>
                        <th>Banco</th>
                        <th>Número</th>
<!--                        <th>Motivo</th>-->
                        <th class="text-center">Pagos</th>
                        <th class="text-center">Moneda</th>
                        <th class="text-end">Total</th>
                        <th class="text-center">Dist. Prestamo Bancario</th>
                    <tr>
                    <tr slot-scope="{ index, row }"
                        :class="setClassToTable(row)">
                        <!-- <td>{{ index }}</td> -->
                        <td class="text-start">{{ row.date_of_issue }}</td>
                        <td>{{ row.bank.description }}
                        </td>
                        <td>{{ row.number }}<br/>
                            <small v-text="row.payment_type_description">
                            </small>
                            <br/>
                        </td>
<!--                        <td class="">{{ row.expense_reason_description }}</td>-->
                        <td class="text-center">
                            <button
                                class="btn btn-xs btn-info btn-shad btn-shad-text m-1__2"
                                style="min-width: 41px"
                                type="button"
                                @click.prevent="clickExpensePayment(row.id)"
                            >Pagos
                            </button>
                        </td>
                        <td class="text-center">{{ row.currency_type_id }}</td>
                        <td class="text-end">{{ formatDecimal(row.total) }}</td>

                        <td class="text-center">

                            <button v-if="row.state_type_id != '11'"
                                    class="btn btn-xs btn-info btn-shad m-1__2 me-1"
                                    type="button"
                                    @click.prevent="clickCreate(row.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415" /><path d="M16 5l3 3" /></svg>
                            </button>

                            <!--
                            <button class="btn waves-effect waves-light btn-xs btn-info m-1__2"
                                    style="min-width: 41px"
                                    type="button"
                                    @click.prevent="clickPayment(row.id)">
                                <i class="fa fa-search">
                                </i>
                            </button>
                            -->
                            <button v-if="row.state_type_id === '05'"
                                    class="btn btn-xs btn-danger btn-shad m-1__2"
                                    type="button"
                                    @click.prevent="clickVoided(row.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                            </button>
                        </td>

                    </tr>
                </data-table>
            </div>


            <document-payments :expenseId="recordId"
                               :showDialog.sync="showDialogPayments">
            </document-payments>
            <expense-voided :expenseId="recordId"
                            :showDialog.sync="showDialogVoided">
            </expense-voided>

            <loan-payments
                :expenseId="recordId"
                :external="true"
                :showDialog.sync="showDialogExpensePayments"
            >
            </loan-payments>
        </div>
    </div>

</template>
<style>
@media only screen and (max-width: 485px){
    .filter-container{
      margin-top: 0px;
      & .btn-filter-content, .btn-container-mobile{
        display: flex;
        align-items: center;
        justify-content: start;
      }
    }
}
</style>
<script>

import DataTable from '@components/DataTable.vue'
import DocumentPayments from './partials/payments.vue'
import ExpenseVoided from './partials/voided.vue'
import LoanPayments from '@viewsModuleExpense/loan_payments/payments.vue'
import queryString from 'query-string'
import {decimalQuantity} from '@mixins/decimal-quantity'

export default {
    mixins: [decimalQuantity],
    components: {
        DataTable,
        DocumentPayments,
        ExpenseVoided,
        LoanPayments
    },
    data() {
        return {
            showDialogVoided: false,
            resource: 'bank_loan',
            showDialogPayments: false,
            showDialogExpensePayments: false,
            recordId: null,
            showDialogOptions: false
        }
    },
    created() {
    },
    methods: {
        setClassToTable(row) {
            let text = 'text-danger'
            if (row.state_type_id === '11') {
                text = 'text-warning';
            } else if (row.state_type_id === '13') {
                text = 'border-light';
            } else if (row.state_type_id === '01') {
                text = 'border-left border-info';
            } else if (row.state_type_id === '03') {
                text = 'border-left border-success';
            } else if (row.state_type_id === '05') {
                text = 'border-left border-secondary';
            } else if (row.state_type_id === '07') {
                text = 'border-left border-dark';
            } else if (row.state_type_id === '09') {
                text = 'border-left border-danger';
            } else if (row.state_type_id === '11') {
                text = 'border-left border-warning';
            }
            return text;
        },
        clickCreate(id = '') {
            location.href = `/${this.resource}/create/${id}`
        },
        clickExpensePayment(recordId) {
            this.recordId = recordId;
            this.showDialogExpensePayments = true
        },
        clickVoided(recordId) {
            this.recordId = recordId;
            this.showDialogVoided = true;
        },
        clickDownload(download) {
            let data = this.$root.$refs.DataTable.getSearch();
            let query = queryString.stringify({
                'column': data.column,
                'value': data.value
            });

            window.open(`/${this.resource}/report/excel/?${query}`, '_blank');
        },
        clickOptions(recordId = null) {
            this.recordId = recordId
            this.showDialogOptions = true
        },
        clickPayment(recordId) {
            this.recordId = recordId;
            this.showDialogPayments = true;
        },
    }
}
</script>
