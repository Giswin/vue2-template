<template>
    <div class="wrap">
        <el-button @click="uploading=true">文件上传</el-button>
        <vxe-modal v-model="uploading" footer-hide title="上传文件" transfer :zIndex="99">
            <sy-upload v-if="uploading" :viewMode="1" @on-ok="handleUploadFile" @on-cancel="uploading = false" :fileUploadApi="upyun.upyunUrl" :oss="upyun.getyunUrl" :formData="uploadFormData" :maxSize="25600"></sy-upload>
        </vxe-modal>
    </div>

</template>

<script>
import syUpload from "@/components/general/sy-upload/sy-upload.vue";
import config from "@/config/config.js";
import general from "@/common/general.js";

export default {
    components: {
        syUpload,
    },
    created() {
        // 获取上传OSS时需要携带的数据参数
        this.uploadFormData = general.upyunParams() || {};

        const timer = setInterval(() => {
            this.uploadFormData = general.upyunParams() || {};
        }, 1000);
        this.$once("hook:beforeDestroy", () => {
            clearInterval(timer);
            //console.log('清除了一个定时器')
        });
    },
    data() {
        return {
            upyun: config.upyun,
            uploadFormData: {},
            uploading: false,
        };
    },
    methods: {
        // 上传文件后
        handleUploadFile(files) {
            //this.file_list = files
            console.log(files);
            // this.updateAttach(files);
            this.uploading = false;
        },
    },
};
</script>

<style scoped>
</style>