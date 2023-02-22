<template>
    <div class="wrap">
        <syUploadBox ref="upload" :show-upload-list="true" :default-file-list="defaultList" :on-success="handleSuccess" :format="format" :max-size="maxSize" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :on-remove="handleRemoveFile" :before-upload="handleBeforeUpload" multiple type="drag" :action="fileUploadApi" :headers="headers" :data="formData" style="height: 100%;">
            <div style="padding: 20px 0">
                <syIcon type="cloud-upload" size="52" style="color: #3399ff"></syIcon>
                <p>Click or drag files here to upload</p>
            </div>
        </syUploadBox>
    </div>
</template>

<script>
import syUploadBox from "./sy-upload-box.vue";
import syIcon from "@/components/general/sy-icon/sy-icon.vue";
import config from "@/config/config.js";
import general from "@/common/general.js";

export default {
    components: {
        syUploadBox,
        syIcon,
    },
    props: {},

    data() {
        return {
            format: [],
            imgName: "",
            visible: false,
            uploadList: [],
            uploadings: 0,
            upyun: config.upyun,
            // 文件上传API地址
            fileUploadApi: "",
            // 调用文件上传和删除API时，需要设置的头信息
            headers: {},
            // 限制上传文件大小(默认 2048 KB)
            maxSize: 2048,
            // 1-文件列表形式，2-图片上传显示形式
            viewMode: 1,
            // 调用文件上传和删除API时，需要附带的额外参数
            formData: {},
            // 默认已存在的文件列表
            defaultList: [],
            // 文件存储的oss服务器地址路径
            oss: "",
            // 每次上传的最大文件个数
            maxFiles: 999,
        };
    },
    created() {
        // 获取上传OSS时需要携带的数据参数
        this.formData = general.upyunParams() || {};

        const timer = setInterval(() => {
            this.formData = general.upyunParams() || {};
        }, 1000);
        this.$once("hook:beforeDestroy", () => {
            clearInterval(timer);
            //console.log('清除了一个定时器')
        });
    },
    mounted() {
        this.$nextTick(() => {
            this.uploadList = this.$refs["upload"].fileList;
        });
        this.format = this.viewMode == 2 ? ["jpg", "jpeg", "png"] : [];
        this.fileUploadApi = this.upyun.upyunUrl;
        this.oss = this.upyun.getyunUrl;
    },
    computed: {},
    methods: {
        // 上传成功后
        handleSuccess(res, file) {
            if (res) {
                //file.name = res.name;
                file.file_name = res.url;
                file.ref_url = this.oss + res.url;
                file.file_type = res.mimetype;
                file.file_size = res.file_size;
                file.response = res;
            }
            // 通知父组件上传成功，并且把上传成功返回的内容和文件信息传过去
            this.$emit("do-upload", res, file);
            this.uploadings--;
        },
        handleFormatError(file) {
            let tempstring = this.format.join(" or ");
            this.$XModal.message({
                status: "warning",
                message:
                    "File format of " +
                    file.name +
                    " is incorrect, please select " +
                    tempstring +
                    ".",
            });
        },
        handleMaxSize(file) {
            let wm = this.maxSize / 1024;
            this.$XModal.message({
                status: "warning",
                message:
                    "File  " +
                    file.name +
                    " is too large, no more than " +
                    wm.toFixed(1) +
                    "M.",
            });
        },
        // 文件列表删除
        async handleRemoveFile(file) {
            // @todo 向文件服务器发出请求，删除这条文件
            this.formData.file_name = file.file_name;
            //let values = await this.$https.fetchPost(this.fileDeleteApi, this.formData)
            //let values = await this.$general.delete_upyunfile(file.file_name)
            // 通知父组件删除文件方法，并且把删除的文件信息传过去
            this.$emit("on-remove", file);
        },
        handleBeforeUpload(file) {
            const check = this.uploadList.length < this.maxFiles;
            if (!check) {
                this.$XModal.message({
                    status: "warning",
                    message:
                        "Up to " + this.maxFiles + " files can be uploaded.",
                });
            }
            this.uploadings++;
            return check;
        },
    },
};
</script>

<style>
</style>