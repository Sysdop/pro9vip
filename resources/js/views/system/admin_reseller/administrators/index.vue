<template>
    <div>
        <header class="page-header">
            <h2>
                <a href="/dashboard">
                    <i class="fas fa-user-shield"></i>
                </a>
            </h2>
            <ol class="breadcrumbs">
                <li class="active">
                    <span>Admin Reseller / Administradores</span>
                </li>
            </ol>
            <div class="right-wrapper pull-right">
                <button class="btn btn-custom btn-sm mt-2 me-2 mb-3 primary-buton" type="button" @click="openCreate">
                    <i class="fa fa-plus-circle"></i> Nuevo Administrador
                </button>
            </div>
        </header>

        <div class="card">
            <div class="card-body mx-2">
                <div class="btn-filter-content mb-3 d-flex">
                    <el-button type="secondary" class="btn-show-filter" :class="{ shift: isFiltersVisible }" @click="toggleFilters">
                        {{ isFiltersVisible ? 'Ocultar filtros' : 'Mostrar filtros' }}
                    </el-button>
                    <el-button v-if="searchQuery" type="secondary" @click="clearFilters">Limpiar Filtros</el-button>
                </div>

                <div v-if="isFiltersVisible" class="filter-section mb-3">
                    <div class="row">
                        <div class="form-group col-lg-4 col-md-6 col-sm-12 mb-2">
                            <label class="control-label mb-1">Buscar:</label>
                            <el-input v-model="searchQuery" placeholder="Nombre o correo" prefix-icon="el-icon-search"></el-input>
                        </div>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th class="text-center">Módulos</th>
                                <th class="text-center">Empresas</th>
                                <th class="text-center">Crear Cliente</th>
                                <th class="text-center">Estado</th>
                                <th class="text-end">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, index) in filteredRecords" :key="row.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ row.name }}</td>
                                <td>{{ row.email }}</td>
                                <td class="text-center">
                                    <el-tag
                                        v-if="hasAllModules(row)"
                                        type="info"
                                        size="small"
                                        class="admin-reseller-master-tag">
                                        TODOS
                                    </el-tag>
                                    <span v-else class="text-muted small">{{ moduleCountLabel(row) }}</span>
                                </td>
                                <td class="text-center">
                                    <el-tag
                                        v-if="hasAllCompanies(row)"
                                        type="info"
                                        size="small"
                                        class="admin-reseller-master-tag">
                                        TODAS
                                    </el-tag>
                                    <span v-else class="text-muted small">{{ companiesCountLabel(row) }}</span>
                                </td>
                                <td class="text-center">
                                    <el-switch v-if="row.is_master" :value="true" disabled></el-switch>
                                    <el-switch
                                        v-else
                                        v-model="row.can_create_clients"
                                        @change="changeCreateClientPermission(row)">
                                    </el-switch>
                                </td>
                                <td class="text-center">
                                    <el-switch v-model="row.status" @change="changeStatus(row)"></el-switch>
                                </td>
                                <td class="text-end align-middle">
                                    <el-button 
                                        v-if="!isCurrentUser(row)"
                                        type="primary" 
                                        size="small" 
                                        class="me-1 mb-0" 
                                        @click="openEdit(row)">
                                        Editar
                                    </el-button>
                                    <el-button
                                        v-if="!isCurrentUser(row)"
                                        type="primary"
                                        size="small"
                                        class="mb-0"
                                        @click="remove(row)">
                                        Eliminar
                                    </el-button>
                                </td>
                            </tr>
                            <tr v-if="filteredRecords.length === 0">
                                <td colspan="8" class="text-center text-muted py-4">No hay administradores registrados.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <el-dialog
            :title="form.id ? 'Editar Administrador' : 'Nuevo Administrador'"
            :visible.sync="showDialog"
            width="92%"
            top="5vh"
            custom-class="dialog-administrator-form"
            append-to-body
            @closed="handleDialogClosed">
            <el-tabs v-model="activeTab" type="card" class="administrator-form-tabs">
                <el-tab-pane label="General" name="general">
                    <div class="row pt-2 px-1">
                        <div class="col-12 mb-3">
                            <div class="admin-super-box" :class="{ 'is-active': form.is_master }" @click="form.is_master = !form.is_master">
                                <el-switch v-model="form.is_master" class="admin-super-switch" @click.native.stop></el-switch>
                                <div class="admin-super-content">
                                    <div class="admin-super-title">Super Administrador</div>
                                    <div class="admin-super-text">
                                        Acceso total a todos los módulos y empresas, <strong>incluidas las nuevas</strong>.
                                    </div>
                                    <span v-if="form.is_master" class="admin-super-badge">
                                        <i class="fas fa-crown"></i> Acceso total activado
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3" :class="{ 'has-danger': errors.name }">
                                <label class="control-label">Nombre</label>
                                <el-input v-model="form.name" placeholder="Nombre completo"></el-input>
                                <small class="form-control-feedback" v-if="errors.name">{{ errors.name[0] }}</small>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3" :class="{ 'has-danger': errors.email }">
                                <label class="control-label">Email</label>
                                <el-input v-model="form.email" placeholder="correo@empresa.com"></el-input>
                                <small class="form-control-feedback" v-if="errors.email">{{ errors.email[0] }}</small>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3" :class="{ 'has-danger': errors.password }">
                                <label class="control-label">{{ form.id ? 'Password (opcional)' : 'Password' }}</label>
                                <el-input v-model="form.password" show-password placeholder="En edición, dejar vacío para no cambiar"></el-input>
                                <small class="form-control-feedback" v-if="errors.password">{{ errors.password[0] }}</small>
                            </div>
                            <div
                                v-if="!form.id || form.password"
                                class="form-group mb-3"
                                :class="{ 'has-danger': errors.password_confirmation || passwordMismatch }">
                                <label class="control-label">{{ form.id ? 'Confirmar nueva contraseña' : 'Confirmar contraseña' }}</label>
                                <el-input
                                    v-model="form.password_confirmation"
                                    show-password
                                    :placeholder="form.id ? 'Repita la nueva contraseña' : 'Repita la contraseña'">
                                </el-input>
                                <small class="form-control-feedback text-danger" v-if="errors.password_confirmation">
                                    {{ errors.password_confirmation[0] }}
                                </small>
                                <small class="form-control-feedback text-danger" v-else-if="passwordMismatch">
                                    Las contraseñas no coinciden
                                </small>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group mb-3">
                                <label class="control-label invisible" aria-hidden="true">
                                    Permitir crear nuevos clientes
                                </label>
                                <div
                                    class="admin-can-create-clients-box d-flex justify-content-between align-items-center flex-nowrap w-100"
                                    role="group"
                                    aria-label="Permitir crear nuevos clientes">
                                    <span class="admin-can-create-clients-box-label text-truncate me-2">
                                        Permitir crear nuevos clientes
                                    </span>
                                    <el-switch
                                        v-if="form.is_master"
                                        :value="true"
                                        disabled
                                        class="admin-can-create-clients-switch flex-shrink-0">
                                    </el-switch>
                                    <el-switch
                                        v-else
                                        v-model="form.can_create_clients"
                                        class="admin-can-create-clients-switch flex-shrink-0">
                                    </el-switch>
                                </div>
                                <small class="admin-can-create-clients-helper small d-block">
                                    Si está desactivado, no verá el botón para registrar clientes.
                                </small>
                            </div>
                            
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="Módulos del sistema" name="modules">
                    <el-alert v-if="form.is_master" class="mb-2" type="info" :closable="false" show-icon
                        title="Super Administrador: tiene acceso a todos los módulos."></el-alert>
                    <template v-else>
                        <p class="text-muted small mb-2 px-1">Marque los módulos del panel a los que podrá acceder este administrador.</p>
                        <div class="px-1 mb-3">
                            <div
                                class="admin-can-create-clients-box d-flex justify-content-between align-items-center flex-nowrap w-100"
                                role="group"
                                aria-label="Activar todos los módulos">
                                <span class="admin-can-create-clients-box-label text-truncate me-2">
                                    Activar todos los módulos
                                </span>
                                <el-switch
                                    v-model="allModulesSelected"
                                    :disabled="!moduleOptions.length"
                                    class="admin-can-create-clients-switch flex-shrink-0">
                                </el-switch>
                            </div>
                        </div>
                    </template>
                    <div :class="{ 'has-danger': errors.module_permissions }">
                        <el-checkbox-group v-model="form.module_permissions" class="row" :disabled="form.is_master">
                            <div
                                v-for="opt in moduleOptions"
                                :key="opt.key"
                                class="col-md-6 center-el-checkbox mb-2">
                                <el-checkbox :label="opt.key">{{ opt.label }}</el-checkbox>
                            </div>
                        </el-checkbox-group>
                        <small class="form-control-feedback d-block" v-if="errors.module_permissions">{{ errors.module_permissions[0] }}</small>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="Clientes asignados" name="clients">
                    <el-alert v-if="form.is_master" class="mb-2" type="info" :closable="false" show-icon
                        title="Super Administrador: tiene acceso a todas las empresas, incluidas las nuevas."></el-alert>
                    <p v-else class="text-muted small mb-2 px-1">
                        Seleccione las empresas (clientes) a las que podrá acceder. Se listan todas las registradas en el sistema.
                        Además, siempre podrá ver los clientes que él mismo registre.
                    </p>
                    <div v-if="!form.is_master" class="form-group mb-0 px-1" :class="{ 'has-danger': errors.client_ids }">
                        <div class="admin-clients-picker">
                            <div class="admin-clients-picker-toolbar">
                                <el-input
                                    v-model="clientSearch"
                                    size="small"
                                    clearable
                                    prefix-icon="el-icon-search"
                                    placeholder="Buscar por RUC o razón social"
                                    class="admin-clients-picker-search">
                                </el-input>
                                <div class="admin-clients-picker-actions">
                                    <el-checkbox v-model="showOnlySelectedClients" :disabled="!selectedClientsCount">
                                        Solo seleccionadas
                                    </el-checkbox>
                                    <el-button
                                        size="small"
                                        :disabled="!assignableClients.length || allClientsSelected"
                                        @click="selectAllClients">
                                        Asignar todas
                                    </el-button>
                                    <el-button
                                        size="small"
                                        class="ms-0"
                                        :disabled="!selectedClientsCount"
                                        @click="clearClients">
                                        Quitar todas
                                    </el-button>
                                </div>
                            </div>
                            <div class="admin-clients-picker-summary">
                                <span><strong>{{ selectedClientsCount }}</strong> de {{ assignableClients.length }} empresas seleccionadas</span>
                                <span v-if="clientSearch || showOnlySelectedClients">{{ filteredClients.length }} en la lista</span>
                            </div>
                            <el-checkbox-group v-model="form.client_ids" class="admin-clients-picker-list">
                                <div
                                    v-for="c in filteredClients"
                                    :key="c.id"
                                    class="admin-clients-picker-item"
                                    :class="{ 'is-selected': form.client_ids.includes(c.id) }">
                                    <el-checkbox :label="c.id">
                                        <span class="admin-clients-picker-number">{{ c.number }}</span>
                                        <span class="admin-clients-picker-name" :title="c.name">{{ c.name }}</span>
                                    </el-checkbox>
                                </div>
                                <div v-if="!filteredClients.length" class="admin-clients-picker-empty">
                                    {{ assignableClients.length ? 'Ninguna empresa coincide con la búsqueda.' : 'No hay empresas registradas.' }}
                                </div>
                            </el-checkbox-group>
                        </div>
                        <small class="form-control-feedback d-block" v-if="errors.client_ids">{{ errors.client_ids[0] }}</small>
                        <small class="text-muted d-block mt-1">
                            “Asignar todas” marca las empresas actuales del listado. Si luego se registran clientes nuevos, deberá asignarlos o volver a usar esta opción.
                        </small>
                    </div>
                </el-tab-pane>
            </el-tabs>

            <span slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">Cancelar</el-button>
                <el-button type="primary" :loading="loadingSubmit" :disabled="isSaveDisabled" @click="submit">Guardar</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            resource: 'admin-reseller/administrators',
            records: [],
            showDialog: false,
            loadingSubmit: false,
            isFiltersVisible: true,
            searchQuery: '',
            clientSearch: '',
            showOnlySelectedClients: false,
            errors: {},
            form: {},
            activeTab: 'general',
            moduleOptions: [],
            assignableClients: [],
            auth_user_id: null,
        };
    },
    computed: {
        filteredRecords() {
            if (!this.searchQuery) return this.records;
            const query = this.searchQuery.toLowerCase();
            return this.records.filter((row) =>
                (row.name || '').toLowerCase().includes(query) ||
                (row.email || '').toLowerCase().includes(query)
            );
        },
        /** Edición: el usuario escribió algo en password (truthy, p. ej. string no vacío). */
        hasPasswordChangeInEdit() {
            return !!(this.form.id && this.form.password);
        },
        showPasswordConfirmation() {
            return !this.form.id || !!this.form.password;
        },
        passwordMismatch() {
            if (!this.showPasswordConfirmation) return false;
            const p = this.form.password != null ? String(this.form.password) : '';
            const c = this.form.password_confirmation != null ? String(this.form.password_confirmation) : '';
            if (c === '') return false;
            return p !== c;
        },
        isSaveDisabled() {
            const c = this.form.password_confirmation != null ? String(this.form.password_confirmation) : '';
            const p = this.form.password != null ? String(this.form.password) : '';
            if (!this.form.id) {
                if (c === '') return true;
                if (p !== c) return true;
                return false;
            }
            if (!this.hasPasswordChangeInEdit) return false;
            if (c === '') return true;
            if (p !== c) return true;
            return false;
        },
        allModulesSelected: {
            get() {
                const selected = this.form.module_permissions || [];
                return this.moduleOptions.length > 0
                    && this.moduleOptions.every((opt) => selected.includes(opt.key));
            },
            set(value) {
                this.form.module_permissions = value ? this.moduleOptions.map((opt) => opt.key) : [];
            },
        },
        selectedClientsCount() {
            return Array.isArray(this.form.client_ids) ? this.form.client_ids.length : 0;
        },
        allClientsSelected() {
            const total = this.assignableClients.length;
            if (!total) return false;
            return this.selectedClientsCount === total;
        },
        filteredClients() {
            const query = (this.clientSearch || '').trim().toLowerCase();
            const selected = this.form.client_ids || [];
            return this.assignableClients.filter((c) => {
                if (this.showOnlySelectedClients && selected.length && !selected.includes(c.id)) return false;
                if (!query) return true;
                return String(c.number || '').toLowerCase().includes(query) ||
                    String(c.name || '').toLowerCase().includes(query);
            });
        },
    },
    watch: {
        'form.is_master'(val) {
            if (!val) return;
            this.allModulesSelected = true;
            this.form.can_create_clients = true;
            this.selectAllClients();
        },
        'form.password'(val) {
            if (!this.form.id) return;
            if (val == null || val === '') {
                this.form.password_confirmation = '';
            }
        },
    },
    created() {
        this.initForm();
        this.getData();
    },
    methods: {
        initForm() {
            this.errors = {};
            this.activeTab = 'general';
            this.clientSearch = '';
            this.showOnlySelectedClients = false;
            this.form = {
                id: null,
                name: null,
                email: null,
                password: '',
                password_confirmation: '',
                status: true,
                module_permissions: [],
                client_ids: [],
                can_create_clients: false,
                is_master: false,
            };
        },
        handleDialogClosed() {
            this.initForm();
        },
        isCurrentUser(row) {
            return !!(row && row.id === this.auth_user_id);
        },
        hasAllModules(row) {
            if (row.is_master) return true;
            const total = this.moduleOptions.length;
            if (!total) return false;
            return (row.module_permissions || []).length >= total;
        },
        hasAllCompanies(row) {
            if (row.is_master) return true;
            const total = this.assignableClients.length;
            if (!total) return false;
            const n = Array.isArray(row.assigned_client_ids) ? row.assigned_client_ids.length : 0;
            return n >= total;
        },
        moduleCountLabel(row) {
            const n = (row.module_permissions || []).length;
            return `${n} módulo${n === 1 ? '' : 's'}`;
        },
        companiesCountLabel(row) {
            const n = Array.isArray(row.assigned_client_ids) ? row.assigned_client_ids.length : 0;
            return `${n} empresa${n === 1 ? '' : 's'}`;
        },
        toggleFilters() {
            this.isFiltersVisible = !this.isFiltersVisible;
        },
        clearFilters() {
            this.searchQuery = '';
        },
        normalizePermissions(item) {
            const p = item.module_permissions;
            if (Array.isArray(p)) {
                return [...p];
            }
            if (p && typeof p === 'object') {
                return Object.values(p);
            }
            return [];
        },
        buildModuleOptions(definitions) {
            if (!definitions || typeof definitions !== 'object') {
                return [];
            }
            return Object.keys(definitions).map((key) => ({
                key,
                label: definitions[key],
            }));
        },
        getData() {
            this.$http.get(`/${this.resource}/records`).then((response) => {
                if (response.data.module_definitions) {
                    this.moduleOptions = this.buildModuleOptions(response.data.module_definitions);
                }
                if (response.data.assignable_clients) {
                    this.assignableClients = response.data.assignable_clients;
                }
                if (response.data.auth_user_id) {
                    this.auth_user_id = response.data.auth_user_id;
                }
                this.records = (response.data.data || []).map((item) => ({
                    ...item,
                    status: !!item.status,
                    is_master: !!(item.is_master === true || item.is_master === 1),
                    module_permissions: this.normalizePermissions(item),
                    can_create_clients: !!item.can_create_clients,
                    assigned_client_ids: Array.isArray(item.assigned_client_ids) ? item.assigned_client_ids : [],
                }));
            });
        },
        openCreate() {
            this.initForm();
            this.showDialog = true;
        },
        openEdit(row) {
            this.initForm();
            this.form = {
                id: row.id,
                name: row.name,
                email: row.email,
                password: '',
                password_confirmation: '',
                status: !!row.status,
                module_permissions: this.normalizePermissions(row),
                client_ids: [...(row.assigned_client_ids || [])],
                can_create_clients: !!row.can_create_clients,
                is_master: !!row.is_master,
            };
            this.showDialog = true;
        },
        selectAllClients() {
            this.form.client_ids = this.assignableClients.map((client) => client.id);
        },
        clearClients() {
            this.form.client_ids = [];
            this.showOnlySelectedClients = false;
        },
        submit() {
            this.errors = {};
            const rawPassword = this.form.password;
            const hasPassword = rawPassword != null && rawPassword !== '';
            const needsMinLength = hasPassword;
            if (needsMinLength && String(rawPassword).length < 6) {
                this.errors = {
                    password: ['La contraseña debe tener al menos 6 caracteres.'],
                };
                return;
            }

            if (this.showPasswordConfirmation) {
                const p = rawPassword != null ? String(rawPassword) : '';
                const c = this.form.password_confirmation != null ? String(this.form.password_confirmation) : '';
                if (p !== c) {
                    this.errors = {
                        password_confirmation: ['Las contraseñas no coinciden'],
                    };
                    return;
                }
            }

            this.loadingSubmit = true;

            const payload = {
                name: this.form.name,
                email: this.form.email,
                password: this.form.password || undefined,
                status: this.form.status,
                module_permissions: this.form.module_permissions || [],
                client_ids: this.form.client_ids || [],
                can_create_clients: !!this.form.can_create_clients,
                is_master: !!this.form.is_master,
            };
            const sendConfirmation = !this.form.id || this.hasPasswordChangeInEdit;
            if (this.showPasswordConfirmation && sendConfirmation) {
                payload.password_confirmation = this.form.password_confirmation;
            }

            const request = this.form.id
                ? this.$http.put(`/${this.resource}/${this.form.id}`, payload)
                : this.$http.post(`/${this.resource}`, payload);

            request
                .then((response) => {
                    this.$message.success(response.data.message);
                    this.showDialog = false;
                    this.getData();
                })
                .catch((error) => {
                    if (error.response && error.response.status === 422) {
                        const d = error.response.data;
                        this.errors = (d && d.errors) ? d.errors : d || {};
                        return;
                    }
                    const d = error.response && error.response.data;
                    const msg =
                        (d && (d.message || (typeof d === 'string' ? d : ''))) ||
                        'No se pudo guardar el registro.';
                    this.$message.error(msg);
                })
                .finally(() => {
                    this.loadingSubmit = false;
                });
        },
        changeStatus(row) {
            this.$http
                .put(`/${this.resource}/${row.id}`, {
                    name: row.name,
                    email: row.email,
                    status: row.status,
                    module_permissions: row.module_permissions || [],
                    client_ids: row.assigned_client_ids || [],
                    can_create_clients: !!row.can_create_clients,
                })
                .then((response) => {
                    this.$message.success(response.data.message);
                })
                .catch((error) => {
                    row.status = !row.status;
                    const d = error.response && error.response.data;
                    const msg =
                        (d && d.message) || 'No se pudo actualizar el estado.';
                    this.$message.error(msg);
                });
        },
        changeCreateClientPermission(row) {
            this.$http
                .put(`/${this.resource}/${row.id}`, {
                    name: row.name,
                    email: row.email,
                    status: !!row.status,
                    module_permissions: row.module_permissions || [],
                    client_ids: row.assigned_client_ids || [],
                    can_create_clients: !!row.can_create_clients,
                })
                .then(() => {
                    this.$message.success('Permiso actualizado correctamente.');
                })
                .catch((error) => {
                    row.can_create_clients = !row.can_create_clients;
                    const d = error.response && error.response.data;
                    const msg =
                        (d && d.message) || 'No se pudo actualizar el permiso.';
                    this.$message.error(msg);
                });
        },
        remove(row) {
            this.$confirm(`Se eliminará el administrador ${row.name}.`, 'Confirmación', {
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
                type: 'warning',
            })
                .then(() => this.$http.delete(`/${this.resource}/${row.id}`))
                .then((response) => {
                    this.$message.success(response.data.message);
                    this.getData();
                })
                .catch((error) => {
                    if (!error || !error.response) {
                        return;
                    }
                    if (error.response.status === 403) {
                        const msg =
                            (error.response.data && error.response.data.message) ||
                            'No autorizado: no se puede eliminar al usuario maestro.';
                        this.$message.error(msg);
                    }
                });
        },
    },
};
</script>

<style scoped>
/* Info / plomo: aspecto de etiqueta, no de botón (Element UI tag plain + refuerzo visual) */
.admin-reseller-master-tag {
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border-color: #e4e7ed !important;
    background-color: #f4f4f5 !important;
    color: #909399 !important;
}

.admin-reseller-master-tag:hover {
    border-color: #dcdfe6 !important;
    background-color: #eef0f3 !important;
}

.admin-can-create-clients-box {
    box-sizing: border-box;
    min-height: 40px;
    padding: 0 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: var(--light-color, #fff);
}

.admin-can-create-clients-box:hover {
    border-color: #b3bad3;
}

.admin-can-create-clients-box-label {
    font-size: 14px;
    line-height: 1.4;
    color: var(--dark-color, #303133);
    min-width: 0;
}

.admin-can-create-clients-helper {
    margin-top: 0.25rem;
    margin-bottom: 0;
    line-height: 1.35;
    color: #909399;
}

.admin-can-create-clients-switch {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
}
.admin-clients-picker {
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    overflow: hidden;
}

.admin-clients-picker-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 16px;
    padding: 10px 12px;
    border-bottom: 1px solid #ebeef5;
}

.admin-clients-picker-search {
    flex: 1 1 240px;
    min-width: 0;
}

.admin-clients-picker-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
}

.admin-clients-picker-summary {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding: 6px 12px;
    font-size: 12px;
    color: #909399;
    border-bottom: 1px solid #ebeef5;
}

.admin-clients-picker-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 4px;
    max-height: 260px;
    overflow-y: auto;
    padding: 8px;
}

.admin-clients-picker-item {
    min-width: 0;
    border-radius: 4px;
    border: 1px solid transparent;
    transition: background-color 0.15s, border-color 0.15s;
}

.admin-clients-picker-item:hover {
    background-color: rgba(144, 147, 153, 0.08);
}

.admin-clients-picker-item.is-selected {
    background-color: color-mix(in srgb, var(--primary) 6%, #ffffff00);
    border-color: color-mix(in srgb, var(--primary) 12%, #ffffff00);
}

.admin-clients-picker-item >>> .el-checkbox {
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 7px 10px;
}

.admin-clients-picker-item >>> .el-checkbox__label {
    display: flex;
    align-items: baseline;
    gap: 10px;
    min-width: 0;
    flex: 1;
}

.admin-clients-picker-number {
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
    font-size: 12px;
    color: #909399;
}

.admin-clients-picker-name {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.admin-clients-picker-empty {
    grid-column: 1 / -1;
    padding: 24px 12px;
    text-align: center;
    font-size: 13px;
    color: #909399;
}

@media (max-width: 767px) {
    .admin-clients-picker-list {
        grid-template-columns: minmax(0, 1fr);
    }
}

.administrator-form-tabs >>> .el-tabs__content {
    padding-top: 8px;
}

.admin-super-box {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 14px 18px;
    border: 1px solid #dcdfe6;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.15s, border-color 0.15s;
}

.admin-super-box.is-active {
    border: 2px solid var(--primary);
    background-color: color-mix(in srgb, var(--primary) 8%, #ffffff);
}

.admin-super-switch {
    flex-shrink: 0;
    margin-top: 2px;
}

.admin-super-content {
    min-width: 0;
}

.admin-super-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--dark-color, #303133);
}

.admin-super-text {
    margin-top: 2px;
    font-size: 13px;
    line-height: 1.4;
    color: #909399;
}

.admin-super-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 8px;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    color: #fff;
    background-color: var(--primary);
}

.admin-super-badge .fa-crown {
    color: #ffd54a;
}
</style>

<style>
/* Dialog creado en body: sin scoped para que aplique a custom-class */
.dialog-administrator-form {
    max-width: 880px;
    margin-left: auto !important;
    margin-right: auto !important;
}

.dialog-administrator-form .el-dialog__body {
    padding: 12px 20px 20px;
}

@media (max-width: 576px) {
    .dialog-administrator-form .el-dialog__body {
        padding: 8px 12px 16px;
    }
}
</style>
