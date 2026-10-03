<template>
    <div>
        <div class="page-header pr-0">
            <h2><a href="/dashboard"><i class="fas fa-tachometer-alt"></i></a></h2>
            <ol class="breadcrumbs">
                <li class="active"><span>{{ title }}</span></li>
            </ol>
            <div class="right-wrapper pull-right">
                <button type="button" class="btn btn-custom btn-sm  mt-2 me-2" @click.prevent="clickCreate()"><i
                    class="fa fa-plus-circle"></i> Nuevo
                </button>
            </div>
        </div>
        <div class="card mt-3">
            <div class="card-body">
                <data-table :resource="resource">
                    <tr slot="heading">
                        <th>#</th>
                        <th class="text-left">Cliente</th>
                        <th class="text-left">Dirección</th>
                        <th class="text-left">Ubigeo</th>
                        <th class="text-left">Código</th>
                        <th class="text-end">Acciones</th>
                    </tr>
                    <tr slot-scope="{ index, row }">
                        <td>{{ index }}</td>
                        <td class="text-left">{{ row.person_name }}<br/><small v-text="row.person_number"></small></td>
                        <td class="text-left">{{ row.address }}</td>
                        <td class="text-left">{{ row.location_name }}</td>
                        <td class="text-left">{{ row.establishment_code }}</td>
                        <td class="text-end">
                            <button type="button" class="btn btn-xs btn-info btn-shad me-1" title="Editar"
                                    @click.prevent="clickCreate(row.id)"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415" /><path d="M16 5l3 3" /></svg>
                            </button>
                            <template v-if="typeUser === 'admin'">
                                <button type="button" class="btn btn-xs btn-danger btn-shad" title="Eliminar"
                                        @click.prevent="clickDelete(row.id)"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                </button>
                            </template>
                        </td>
                    </tr>
                </data-table>
            </div>

            <dispatch-address-form :showDialog.sync="showDialog"
                                    :recordId="recordId"
                                    @success="successCreate"></dispatch-address-form>
        </div>
    </div>
</template>

<script>

    import DispatchAddressForm from './form.vue'
    import DataTable from '../../../../components/DataTable.vue'
    import {deletable} from '../../../../mixins/deletable'

    export default {
        mixins: [deletable],
        props: ['typeUser'],
        components: {DataTable, DispatchAddressForm},
        data() {
            return {
                title: null,
                showDialog: false,
                resource: 'dispatch_addresses',
                recordId: null,
            }
        },
        created() {
            this.title = 'Direcciones de llegada'
        },
        methods: {
            clickCreate(recordId = null) {
                this.recordId = recordId
                this.showDialog = true
            },
            clickDelete(id) {
                this.destroy(`/${this.resource}/${id}`).then(() =>
                    this.$eventHub.$emit('reloadData')
                )
            },
            successCreate() {
                this.$eventHub.$emit('reloadData')
            }
        }
    }
</script>
