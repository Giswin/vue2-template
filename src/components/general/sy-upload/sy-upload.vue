<template>

    <div style="width: 100%; height: 100%; position:relative; min-height: 400px; ">
        <div style="margin-bottom: 50px;">
            <!----------------------文件上传------------------- -->
            <template v-if="viewMode == 1">
                <div>

                    <syUploadBox ref="upload" :show-upload-list="true" :default-file-list="defaultList" :on-success="handleSuccess" :format="format" :max-size="maxSize" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :on-remove="handleRemoveFile" :before-upload="handleBeforeUpload" multiple type="drag" :action="fileUploadApi" :headers="headers" :data="formData" style="height: 100%;">
                        <div style="padding: 20px 0">
                            <syIcon type="cloud-upload" size="52" style="color: #3399ff"></syIcon>
                            <p>Click or drag files here to upload</p>
                        </div>
                    </syUploadBox>
                </div>
            </template>

            <!----------------------图片上传------------------- -->
            <template v-if="viewMode == 2">
                <div class="demo-upload-list" v-for="item in uploadList">
                    <template v-if="item.status === 'finished'">
                        <img :src="item.ref_url">
                        <div class="demo-upload-list-cover">
                            <syIcon type="eye-outline" @click.native="handleView(item.ref_url)"></syIcon>
                            <syIcon type="trash-outline" @click.native="handleRemoveImage(item)"></syIcon>
                        </div>
                    </template>

                </div>

                <syUploadBox ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="format" :max-size="maxSize" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" paste :action="fileUploadApi" :headers="headers" :data="formData" style="display: inline-block;width:96px;">
                    <div style="width: 96px;height:96px;line-height: 96px;">
                        <syIcon type="camera" size="20"></syIcon>
                    </div>
                </syUploadBox>

                <vxe-modal title="View Image" :model="visible">
                    <img :src="imgName" v-if="visible" style="width: 100%">
                </vxe-modal>

            </template>
        </div>

        <div style="position: absolute; bottom: 0px; left:0px; width: 100%;">
            <div class="vxe-row">
                <div class="vxe-col--24">
                    <div class="footer-btns">
                        <el-button style="width: 48%;" @click.native="onOkClick" size="small">确定</el-button>
                        <el-button style="width: 48%;" @click.native="onCancelClick" size="small">取消</el-button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import syUploadBox from "@/components/general/sy-upload-box/sy-upload-box.vue";
import syIcon from "@/components/general/sy-icon/sy-icon.vue";

export default {
    name: "syUpload",
    components: { syUploadBox, syIcon },
    props: {
        viewMode: {
            type: [String, Number],
            default: 1, // 1-文件列表形式，2-图片上传显示形式
        },
        // 文件上传API地址
        fileUploadApi: {
            type: String,
            default: "",
        },
        // 调用文件上传和删除API时，需要设置的头信息
        headers: {
            type: Object,
            default() {
                return {};
            },
        },
        // 文件存储的oss服务器地址路径
        oss: {
            type: String,
            default: "",
        },
        // 限制上传文件大小(默认 2048 KB)
        maxSize: {
            type: Number,
            default: 2048,
        },
        // 每次上传的最大文件个数
        maxFiles: {
            type: Number,
            default: 999,
        },
        // 调用文件上传和删除API时，需要附带的额外参数
        formData: {
            type: Object,
            default: () => {
                return {};
            },
        },
        // 默认已存在的文件列表
        defaultList: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            format: [],
            imgName: "",
            visible: false,
            uploadList: [],
            uploadings: 0,
        };
    },
    methods: {
        handleView(url) {
            this.imgName = url;
            this.visible = true;
        },
        // 图片列表删除
        async handleRemoveImage(file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            // @todo 向文件服务器发出请求，删除这条文件
            this.formData.file_name = file.file_name;
            //let values = await this.$https.fetchPost(this.fileDeleteApi, this.formData)
            //let values = await this.$general.delete_upyunfile(file.file_name)
            // 通知父组件删除文件方法，并且把删除的文件信息传过去
            this.$emit("on-remove", file);
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

        onOkClick: function () {
            if (this.uploadings > 0) {
                this.$XModal.alert({
                    status: "loading",
                    message: "正在处理，请稍等 ...",
                });
            } else {
                this.$emit("on-ok", this.uploadList);
            }
        },
        onCancelClick: function () {
            this.$emit("on-cancel");
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.uploadList = this.$refs["upload"].fileList;
        });
        this.format = this.viewMode == 2 ? ["jpg", "jpeg", "png"] : [];
    },
};
</script>

<style lang="scss" scoped>
.footer-btns {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
</style>

