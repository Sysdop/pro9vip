<template>
    <div class="card card-config">
        <div class="card-header bg-info">
            <h3 class="my-0">Certificado Qz Tray</h3>
        </div>
        <div class="card-body">
            <p>Se tiene que ingresar los dos archivos generados en los certificados de Qz Tray
                <strong>
                    (Es importante que se coloque los dos certificados)
                </strong>
            </p>
            <div class="table-responsive" v-if="record">
                <table class="table">
                    <thead>
                    <tr>
                        <th>Archivo</th>
                        <th class="text-end">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{{ record }}</td>
                        <td class="text-end">
                            <button title="Eliminar" type="button" class="btn btn-xs btn-danger btn-shad"
                                    @click.prevent="clickDelete"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
                <div class="row text-center mx-auto" v-else>
                    <div class="col-md-6 col-12">
                        <label>Digital Certificate</label>
                        <el-input v-model="form.digital_qztray"
                            :readonly="true">
                            <el-upload slot="append"
                                ref="digitalqz"
                                :name="'digital_qztray'"
                                :headers="headers"
                                :on-success="successUpload"
                                :on-error="errorUpload"
                                :show-file-list="false"
                                :multiple="false"
                                action="/certificates-qztray/uploads">
                                <el-button icon="el-icon-upload"
                                    type="primary"></el-button>
                            </el-upload>
                        </el-input>
                    </div>
                    <div class="col-lg-6 col-12">
                        <span>Private Key</span>
                        <el-input v-model="form.private_qztray"
                            :readonly="true">
                            <el-upload slot="append"
                                ref="privateqz"
                                :data="{'digital_qztray': null}"
                                :name="'private_qztray'"
                                :headers="headers"
                                :on-success="successUpload"
                                :on-error="errorUpload"
                                :show-file-list="false"
                                :multiple="false"
                                action="/certificates-qztray/uploads">
                                <el-button icon="el-icon-upload"
                                    type="primary"></el-button>
                            </el-upload>
                        </el-input>
                    </div>
                    <div class="row mt-4" v-if="showButtons">
                        <div class="col-md-12 text-end">
                                <button type="button" class="btn btn-xs btn-danger btn-shad btn-shad-text me-2"
                                        @click.prevent="removeCertificateQzTray">Eliminar</button>
                                <button type="button" class="btn btn-xs btn-primary btn-shad btn-shad-text"
                                        @click.prevent="clickDownload()">Descargar Zip</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import {deletable} from '../../../../mixins/deletable'

export default {
    mixins: [deletable],
    data() {
        return {
            headers: headers_token,
            showButtons : false,
            resources: 'certificates-qztray',
            form: {},
        }
    },
    created() {
        this.initForm()
        this.getRecordCertificatesQzTray()
    },
    methods: {
        successUpload(response, file, fileList) {

            if (response.success) {
                this.$message.success(response.message)
                this.form[response.type] = response.name
                this.showButtons = true;
            } else {
                this.$message({message: 'Error al subir el archivo', type: 'error'})
            }
        },
        errorUpload(error)
        {
            this.$message({message: 'Error al subir el archivo', type: 'error'})
        },
        initForm(){
            this.form = {
                digital_qztray: null,
                private_qztray: null
            }
        },
        getRecordCertificatesQzTray() {
            this.$http
                .get(`/${this.resources}/record`)
                .then(response => {
                    let certificates = response.data.record[0]
                        if (certificates.digital_certificate_qztray || certificates.private_certificate_qztray ) {
                            this.showButtons = true
                        }
                        this.form.digital_qztray = certificates.digital_certificate_qztray ? certificates.digital_certificate_qztray : null;
                        this.form.private_qztray = certificates.private_certificate_qztray ? certificates.private_certificate_qztray : null;
                })
        },
        async removeCertificateQzTray() {
            await this.destroy(`/${this.resources}`)
            this.showButtons = false;
            this.getRecordCertificatesQzTray()
        },
        clickDownload(){
            window.open("/certificates-qztray/download", "_blank");
        }
    }
}
</script>