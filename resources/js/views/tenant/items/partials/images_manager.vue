<template>
    <div class="form-group">
        <div class="image-manager-control">
            <button type="button"
                    class="image-manager-control__cover avatar-uploader"
                    :title="images.length ? 'Gestionar imágenes' : 'Agregar imágenes'"
                    @click="open">
                <span class="el-upload">
                    <img v-if="images.length" :src="images[0].url" class="avatar" alt="">
                    <i v-else class="el-icon-picture-outline avatar-uploader-icon"></i>
                </span>
                <span v-if="images.length > 1" class="image-manager-control__more bg-white rounded">
                    <el-tag size="mini">+{{ images.length - 1 }}</el-tag>
                </span>
            </button>
            <div class="d-flex flex-column ms-2">
                <label class="mb-0">
                    Imágenes
                    <el-tooltip :content="tooltip">
                        <i class="fa fa-info-circle "></i>
                    </el-tooltip>
                </label>
                <button type="button" class="btn btn-sm second-buton" @click="open">
                    {{ images.length ? 'Gestionar' : 'Agregar' }}
                </button>
            </div>
        </div>

        <el-dialog :visible.sync="visible"
                   append-to-body
                   width="480px">
            <span slot="title" class="el-dialog__title">
                Imágenes del producto <small class="text-muted">{{ count }}/{{ max }}</small>
            </span>

            <div v-show="isEmpty">
                <el-upload :action="action"
                           :data="{'type': 'items'}"
                           :headers="headers"
                           :before-upload="onBeforeUpload"
                           :on-progress="onProgress"
                           :on-success="onSuccess"
                           :on-error="onError"
                           :show-file-list="false"
                           multiple
                           drag
                           class="image-manager__dropzone">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">Arrastra tus imágenes aquí o <em>haz clic para buscarlas</em></div>
                </el-upload>
                <p class="text-muted image-manager__hint">La primera imagen será la principal. {{ hint }}</p>
            </div>

            <div v-show="!isEmpty">
                <draggable :value="images"
                           :animation="150"
                           :delay="150"
                           :delay-on-touch-only="true"
                           draggable=".is-image"
                           filter=".image-manager__remove, .image-manager__action"
                           :prevent-on-filter="false"
                           ghost-class="image-manager__card--ghost"
                           class="image-manager__cards pt-2"
                           @input="$emit('reorder', $event)">
                    <div v-for="(image, index) in images"
                         :key="image.key"
                         class="image-manager__card is-image">
                        <div class="image-manager__thumb avatar-uploader">
                            <span class="el-upload">
                                <img :src="image.url" class="avatar" alt="" draggable="false">
                            </span>
                            <el-button icon="el-icon-close"
                                       circle
                                       class="image-manager__remove"
                                       title="Quitar imagen"
                                       @click="$emit('remove', index)"></el-button>
                        </div>
                        <el-tag v-if="index === 0" size="mini">★ Principal</el-tag>
                        <a v-else
                           href="#"
                           class="image-manager__action text-primary"
                           @click.prevent="$emit('make-main', index)">Hacer principal</a>
                    </div>

                    <template slot="footer">
                        <div v-for="upload in pending"
                             :key="`pending-${upload.uid}`"
                             class="image-manager__card">
                            <div class="image-manager__thumb avatar-uploader">
                                <span class="el-upload">
                                    <el-progress :percentage="upload.percent"
                                                 :show-text="false"
                                                 :stroke-width="4"
                                                 class="image-manager__progress"></el-progress>
                                </span>
                            </div>
                            <small class="text-muted">Subiendo…</small>
                        </div>

                        <div v-for="error in errors"
                             :key="`error-${error.uid}`"
                             class="image-manager__card">
                            <el-tooltip :content="error.name" placement="top">
                                <div class="image-manager__thumb avatar-uploader">
                                    <span class="el-upload">
                                        <i class="el-icon-warning-outline avatar-uploader-icon text-danger"></i>
                                    </span>
                                    <el-button icon="el-icon-close"
                                               circle
                                               class="image-manager__remove"
                                               title="Descartar"
                                               @click="dismiss(error)"></el-button>
                                </div>
                            </el-tooltip>
                            <small class="text-danger image-manager__error">{{ error.message }}</small>
                            <a href="#"
                               class="image-manager__action text-primary"
                               @click.prevent="retry(error)">Reintentar ↻</a>
                        </div>

                        <div v-show="count < max" class="image-manager__card">
                            <el-upload ref="add"
                                       :action="action"
                                       :data="{'type': 'items'}"
                                       :headers="headers"
                                       :before-upload="onBeforeUpload"
                                       :on-progress="onProgress"
                                       :on-success="onSuccess"
                                       :on-error="onError"
                                       :show-file-list="false"
                                       multiple
                                       class="image-manager__thumb avatar-uploader">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </template>
                </draggable>

                <p :class="count >= max ? 'text-danger' : 'text-muted'" class="image-manager__hint">
                    <template v-if="count >= max">Alcanzaste el límite de {{ max }} imágenes. Elimina una para subir otra.</template>
                    <template v-else>La primera es la principal · arrastra para reordenar</template>
                </p>
            </div>

            <span slot="footer" class="d-flex justify-content-end">
                <el-button type="primary" @click="visible = false">Guardar</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    name: 'ItemImagesManager',
    components: {draggable},
    props: {
        images: {type: Array, default: () => []},
        max: {type: Number, default: 8},
        action: {type: String, required: true},
        headers: {type: Object, default: () => ({})},
        allowedTypes: {type: Array, default: () => []},
        maxSizeKb: {type: Number, default: 2048},
        hint: {type: String, default: ''},
    },
    data() {
        return {
            visible: false,
            pending: [],
            finished: {},
            errors: [],
        }
    },
    computed: {
        count() {
            return this.images.length + this.pending.length
        },
        isEmpty() {
            return !this.images.length && !this.pending.length && !this.errors.length
        },
        tooltip() {
            return `La primera es la principal y es la que se usa en todo el sistema; las demás se muestran en la galería del producto de la tienda virtual y del restaurante. ${this.hint}`
        },
    },
    methods: {
        open() {
            this.visible = true
        },
        validationError(file) {
            if (this.allowedTypes.length && !this.allowedTypes.includes(file.type)) return 'Formato no válido'

            if ((file.size / 1024) > this.maxSizeKb) {
                return `Supera ${(this.maxSizeKb / 1024).toFixed(1).replace('.0', '')} MB`
            }

            return null
        },
        onBeforeUpload(file) {
            const error = this.validationError(file)

            if (error) {
                this.errors.push({uid: file.uid, name: file.name, message: error})
                return false
            }

            if (this.count >= this.max) return false

            this.pending.push({uid: file.uid, percent: 0})
            return true
        },
        onProgress(event, file) {
            const upload = this.pending.find(row => row.uid === file.uid)

            if (upload) upload.percent = Math.round(event.percent || 0)
        },
        onSuccess(response, file) {
            if (!response.success) return this.fail(file, response.message || 'No se pudo subir')

            this.finish(file.uid, {
                key: `new-${file.uid}`,
                source: 'new',
                filename: response.data.filename,
                temp_path: response.data.temp_path,
                url: response.data.temp_image,
            })
        },
        onError(error, file) {
            this.fail(file, 'No se pudo subir')
        },
        fail(file, message) {
            this.errors.push({uid: file.uid, name: file.name, message})
            this.finish(file.uid, null)
        },
        finish(uid, image) {
            this.finished[uid] = image

            while (this.pending.length && this.pending[0].uid in this.finished) {
                const next = this.pending.shift().uid

                if (this.finished[next]) this.$emit('add', this.finished[next])
                delete this.finished[next]
            }
        },
        dismiss(error) {
            this.errors = this.errors.filter(row => row !== error)
        },
        retry(error) {
            this.dismiss(error)

            const input = this.$refs.add ? this.$refs.add.$el.querySelector('input[type="file"]') : null

            if (input) input.click()
        },
    },
}
</script>
