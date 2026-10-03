<template>
    <section class="card card-dashboard">
        <div class="card-body" v-if="loader">
            <template>
                <vcl-table :rows="4" :columns="2"></vcl-table>
            </template>
        </div>
        <div class="card-body pb-0" v-show="!loader">
            <label>Productos por agotarse
                <el-tooltip class="item" effect="dark" content="Aplica filtro por sucursal" placement="top-start">
                    <i class="fa fa-info-circle"></i>
                </el-tooltip>
            </label>
        </div>
        <div class="card-body p-0" v-show="!loader">
            <simple-data-table :resource="resource">
                <tr slot="heading">
                    <th>#</th>
                    <th >Producto</th>
                    <th class="text-center">Stock</th>
                    <th>Estado</th>
                    <th>Almacén</th>
                    <th class="text-center">Aprovisionar</th>
                </tr>
                <tr slot-scope="{ index, row }">
                    <td>{{ index }}</td>
                    <td  >{{ row.product }}</td>
                    <td class="text-center">{{ row.stock }}</td>
                    <td>
                        <span class="badge bg-danger text-white" v-if="row.state == '01'">Agotado</span>
                        <span class="badge bg-warning text-white" v-if="row.state == '02'">Pocas unidades</span>
                    </td>
                    <td>{{ row.warehouse }} </td>
                    <td  class="text-center">
                        <button type="button" style="min-width: 41px" class="btn btn-xs btn-primary btn-shad m-1__2"
                                    @click.prevent="clickProvision()"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M15 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg></button>
                    </td>

                </tr>
            </simple-data-table>
        </div>
    </section>
</template>


<script>

    import SimpleDataTable from '../../components/SimpleDataTable.vue'
    import { VclTable } from 'vue-content-loading';

    export default {
        components: {SimpleDataTable, VclTable},

        data () {
            return {
                loader: true,
                resource: 'dashboard/stock-by-product',
                records: []
            }
        },
        mounted(){
            this.events()

        },
        created() {
        },
        methods: {
            events(){
                this.$eventHub.$on('recordsSkeletonLoader', (status) => {
                    this.loader = status
                })

                this.$eventHub.$on('changeStock', (establishment_id) => {
                    this.$eventHub.$emit('reloadSimpleDataTable', establishment_id)
                    // console.log(establishment_id)
                })
            },
            clickProvision(){
                window.open('/purchases/create')
            },
        }
    }
</script>
