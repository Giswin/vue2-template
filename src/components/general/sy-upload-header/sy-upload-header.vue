<template>
    <vxe-modal :value="show" transfer width="455" :mask-closable="false" footer-hide :title="$t('uploadPictures')" @close="closehead">
        <div style="width: 420px; height: 450px; position:relative;overflow-x: hidden;" :style="{ 'background': 'url(' + backgroundImage +') no-repeat 0px 70px'}">

            <!----------------------图片上传------------------- -->
            <template>
                <div>
                    <syUploadBox ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="format" :max-size="maxSize" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" type="drag" paste :action="fileUploadApi" :headers="headers" :data="formData" style="display: inline-block;width:60px;height:60px;">

                        <div style="width: 60px;height:50px;line-height: 60px;">
                            <syIcon type="camera" size="30"></syIcon>
                        </div>
                    </syUploadBox>
                </div>

                <div v-show="imageUrl != ''" class="demo-upload-list" style="width: 430px; height: 330px;">
                    <template>
                        <img :src="imageUrl" style="width: 420px;height:320px;margin-top: 10px;">
                    </template>
                </div>
            </template>

            <div style="position: absolute; bottom: 0px; left:0px; width: 100%;">
                <div class="vxe-row">
                    <div class="vxe-col--24 demo-col">
                        <div style="width: 100%;">
                            <el-button style="width: 48%;" @click.native="onOkClick">{{$t('confirm')}}</el-button>
                            <el-button style="width: 48%;" @click.native="onCancelClick">{{$t('cancel')}}</el-button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </vxe-modal>
</template>
<script>
import syUploadBox from "@/components/general/sy-upload-box/sy-upload-box.vue";
import syIcon from "@/components/general/sy-icon/sy-icon.vue";

//method:
/* 
    @removeImage 
    
    */

export default {
    name: "syUploadHeader",
    components: {
        syUploadBox,
        syIcon,
    },
    props: {
        title: {
            type: String,
            default: "上传图片",
        },
        show: Boolean,
        // 头像上传API地址
        fileUploadApi: {
            type: String,
            default: "",
        },
        // 显示的头像url地址
        src: {
            type: String,
            default: "",
        },
        // 头像存储的oss服务器地址路径
        oss: {
            type: String,
            default: "",
        },

        // 限制上传头像文件大小
        maxSize: {
            type: Number,
            default: 2048,
        },

        // 上传和删除，需要设置的头信息
        headers: {
            type: Object,
            default() {
                return {};
            },
        },
        //文件上传和删除API时，需要附带的额外参数
        formData: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            backgroundImage: require("@/assets/"+this.$t('bj')+'.jpg'),
            format: ["jpg", "jpeg", "png"],
            imageUrl: "",
            defaultList: [],
            uploadList: [],
            uploadings: 0,
        };
    },
    methods: {
        // 图片列表删除
        async handleRemoveImage(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            // 通知父组件删除图片方法，并且把删除的文件信息传过去
            this.$emit("on-remove", file);
            this.uploadList = [];
        },

        // 上传成功后
        handleSuccess(res, file) {
            if (res) {
                file.file_name = res.url;
                file.ref_url = this.oss + res.url;
                file.file_type = res.mimeType;
                file.file_size = res.file_size;
            }
            this.imageUrl = file.ref_url;
            this.uploadList = [file];
            this.uploadings--;
            // 通知父组件头像上传成功，并且把上传成功返回的内容和文件信息传过去
            this.$emit("do-upload", res, file);
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

        // 手动上传文件
        handleBeforeUpload(file) {
            if (this.uploadList.length > 0) {
                this.handleRemoveImage(file);
            }
            this.uploadings++;
            return true;
        },

        onOkClick: function () {
            if (this.uploadings > 0) {
                this.$XModal.alert({
                    status: "loading",
                    message: "正在处理，请稍等 ...",
                });
            } else {
                // 将头像url更新
                this.$emit("update:src", this.imageUrl);
                this.$emit("on-ok", this.uploadList[0]);
                this.$emit("update:show", false);
            }
        },
        onCancelClick: function () {
            this.$emit("on-cancel");
            this.$emit("update:show", false);
        },
        closehead: function () {
            this.$emit("update:show", false);
        },
    },
    watch: {
        src: {
            handler(newVal, oldVal) {
                this.imageUrl = newVal;
            },
            immediate: true,
        },
    },
};
</script>
