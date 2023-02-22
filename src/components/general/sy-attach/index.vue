<style lang="scss">
.vxe-table--body td button {
    margin-right: 5px;
}
.upload-list-cover {
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: white;
    background: red;
    height: 24px;
    cursor: pointer;
    line-height: 24px;
}
.demo-upload-list:hover .upload-list-cover {
    display: block;
}
</style>	
<template>
    <div>
        <div v-if="!read_only" style="margin-bottom: 10px;">
            <div class="m-l">
                <el-select v-model="select_attach_class" placeholder="选择附件分类" size="small">
                    <el-option v-for="item in attach_class" :key="item" :value="item" :label="`${item}`">{{item}}</el-option>
                </el-select>
            </div>
            <div class="m-l">
                <el-button @click="uploadClick" size="small" style="margin-left: 5px;">上传文件</el-button>
                <el-button size="small" v-if="editMemo == false && attach_list.length > 0 && showMode == 1" @click="editMemoClick">编辑备注</el-button>
                <el-button size="small" v-if="editMemo && attach_list.length > 0 && showMode == 1" @click="editMemo = false">撤消</el-button>
                <el-button size="small" v-if="editMemo && attach_list.length > 0 && showMode == 1" @click="saveMemoClick">保存备注</el-button>
            </div>
            <div class="m-r">
                <!-- <vxe-button size="small">
                    <template v-slot>查看形式</template>
                    <template v-slot:dropdowns>
                        <vxe-button type="text" @click.native="showMode = 2">图标</vxe-button>
                        <vxe-button type="text" @click.native="showMode = 1">列表</vxe-button>
                    </template>
                </vxe-button> -->
                <el-dropdown>
                    <el-button type="primary" size="small">
                        更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <el-button size="small" type="text" @click.native="showMode = 2">图标</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <el-button size="small" type="text" @click.native="showMode = 1">列表</el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="clear"></div>
        </div>

        <!----------------------文件列表------------------- -->
        <div v-if="showMode == 1" style="width: 100%;">
            <div>
                <vxe-table border size="small" show-overflow highlight-cell column-min-width="288px" class="vxe-table-scrollbar" max-height="400" :data="attach_list" auto-resize resizable :keyboard-config="{isArrow: true, isDel: true, isTab: true, isEdit: true}">
                    <vxe-table-column field="attach_class" title="分类" width="110" header-align="center"></vxe-table-column>
                    <vxe-table-column field="attach_name" title="名称" width="250" header-align="center">
                        <template v-slot="{ row }">
                            <div>
                                <label style="font-size: 17px;float: left; margin-left: 1px;">
                                    <syIcon :type="row.iconClass ? row.iconClass : 'file-o'"></syIcon>
                                </label>
                                <a @click="imageView(row)" style="float: left;margin-left:5px; cursor: pointer; text-decoration: underline; color: #006AF1;"> {{row.attach_name}}</a>
                            </div>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="file_size" title="大小" width="80" header-align="center" align="right">
                        <template v-slot="{ row }">
                            <div>{{parseInt(row.file_size/1024)}} kb</div>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="attach_memo" title="备注" header-align="center" align="left">
                        <template v-slot="{ row }">
                            <div>
                                <div v-if="!editMemo">
                                    {{row.attach_memo}}
                                </div>
                                <div v-if="editMemo">
                                    <vxe-textarea v-model="row.attach_memo" style="height: 30px;"></vxe-textarea>
                                </div>
                            </div>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="upload_time" title="上传日期" width="170" align="center"></vxe-table-column>
                    <vxe-table-column field="uac_object_name" title="上传人" width="90" align="center"></vxe-table-column>
                    <vxe-table-column title="操作" width="115" align="center">
                        <template v-slot="{ row }">
                            <div>
                                <el-button title="下载" type="success" @click="downloadItem(row)" size="mini" icon="el-icon-download"></el-button>
                                <el-button title="删除" type="primary" v-if="!read_only && (!row.uploader || $store.state.user.uid == row.uploader)" @click="deleteAttach(row)" size="mini" icon="el-icon-delete"></el-button>
                            </div>
                        </template>
                    </vxe-table-column>
                </vxe-table>
            </div>
            <vxe-modal title="View Image" v-model="showImage" transfer>
                <img :src="imgName" v-if="showImage" style="min-height: 500px; width: 100%;">
            </vxe-modal>
        </div>

        <!----------------------图片列表------------------- -->
        <div v-if="showMode == 2" style="border: 1px #eee solid; height: 350px; width: 100%; padding: 10px;">

            <viewer :images="attach_list">
                <div class="demo-upload-list" style="position: relative;" v-for="item in attach_list">
                    <template>
                        <img v-if="item.type == 'PIC'" :src="item.ref_url" height="200" width="180">
                        <div v-else>
                            <syIcon style="font-size:55px; line-height: 70px;" :type="item.iconClass ? item.iconClass : 'file-o'"></syIcon>
                            <br>
                            <label style="position: absolute; bottom:0; left: 0; width: 100%; text-align: center; font-size:13px; line-height: 17px;">
                                {{item.attach_name}}
                            </label>
                        </div>
                        <div class="upload-list-cover" v-if="!read_only && (!item.uploader || $store.state.user.uid == item.uploader)" @click="deleteAttach(item)">删除</div>
                    </template>
                </div>
            </viewer>

            <div style="color: #a5a5a5; font-size: 20px; text-align: center; height:350px; line-height: 300px;" v-if="!attach_list || attach_list.length < 1">
                没有上传过图片
            </div>

        </div>

        <!----------------------文件上传组件对话框------------------- -->
        <vxe-modal v-model="uploading" footer-hide title="上传文件" transfer :zIndex="99">
            <sy-upload v-if="uploading" :viewMode="1" @on-ok="handleUploadFile" @on-cancel="uploading = false" :fileUploadApi="upyun.upyunUrl" :oss="upyun.getyunUrl" :formData="uploadFormData" :maxSize="25600"></sy-upload>
        </vxe-modal>

    </div>
</template>

<script>
import config from "@/config/config.js";
import general from "@/common/general.js";
import attachApi from "@/api/attach/index.js";
import syUpload from "@/components/general/sy-upload/sy-upload.vue";
import syIcon from "@/components/general/sy-icon/sy-icon.vue";
export default {
    name: "sy-attach",
    components: {
        syUpload,
        syIcon,
    },
    props: {
        // 附件列表是否只读
        read_only: {
            type: Boolean,
            default: false,
        },
        mode: {
            type: [String, Number],
            default: 1, // 1-文件列表形式，2-图片上传显示形式
        },
        // 附件关联对象
        object_name: {
            type: [String, Number],
            default: "bd_person",
        },
        // 附件关联对象实例ID ,多个实例ID用逗号拼接
        object_keyid: {
            type: [String, Number],
            default: "",
        },
        // 将上传的附件同时抄送给其他的对象ID（将相同附件挂在多个不同对象ID上）
        object_keys: {
            type: Array,
            default: () => {
                return [];
            },
        },
        // 可选的附件类型
        attach_class: {
            type: Array,
            default: () => {
                return ["员工照片", "员工报告表"];
            },
        },
    },
    data() {
        return {
            // 图片显示
            showImage: false,

            // 调用文件上传开关
            uploading: false,

            select_attach_class: "", // 上传的附件类型

            // 附件列表
            attach_list: [],

            // 附件备注可编辑状态
            editMemo: false,

            // 图片类型
            imageType: [".jpg", ".JPG", "image/jpeg", ".png", "image/png"],

            // 显示形式 1-列表，图标
            showMode: 1,

            upyun: config.upyun,
            uploadFormData: {},
        };
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
    methods: {
        // 修改备注
        editMemoClick() {
            this.editMemo = true;
        },

        // 删除文件处理事件
        handleRemoveFile(file) {
            //this.file_list.remove(file);
            this.deleteAttach(file);
        },
        // 上传文件后
        handleUploadFile(files) {
            //this.file_list = files
            console.log(files);
            this.updateAttach(files);
        },

        downloadItem(item) {
            window.open(
                "/gbs/down.php?url=" +
                    item.ref_url +
                    "&filename=" +
                    item.attach_name
            );
        },

        // 保存备注信息
        async saveMemoClick() {
            let response = await attachApi.updateMemo({
                attachs: this.attach_list,
            });
            if (response.code != 0) {
                this.$XModal.message({ message: "保存失败", status: "error" });
            } else {
                this.$XModal.message({
                    message: "保存成功",
                    status: "success",
                });
                this.editMemo = false;
            }
        },

        // 点击上传按钮动作方法
        uploadClick() {
            if (this.select_attach_class == "") {
                this.$XModal.alert({
                    message: "请选择附件分类",
                    status: "warning",
                });
                return false;
            }
            this.uploading = true;
        },

        /**
         * 获取附件列表
         */
        async get_attach_list() {
            let response = await attachApi.select({
                object_keyid: this.object_keyid,
                object_name: this.object_name,
                attach_class: JSON.stringify(this.attach_class),
            });
            this.attach_list = response.data || [];
            for (let i = 0; i < this.attach_list.length; i++) {
                //文件
                let attach_name = this.attach_list[i].attach_name;
                //获取最后一个.的位置
                let index = attach_name.lastIndexOf(".");
                //获取后缀
                let ext = attach_name.substr(index + 1);
                let t = this.isFileImage(ext);
                this.$set(this.attach_list[i], "type", t);
                this.$set(this.attach_list[i], "ext", ext);
                this.$set(
                    this.attach_list[i],
                    "iconClass",
                    this.getExtIconClassName(t) || "file-o"
                );
            }
        },

        /**
         * 根据上传文件返回的文件列表插入相对应的附件记录
         * @param {Array} filelist
         */
        async updateAttach(filelist) {
            let attach = {};
            let response = {};

            if (this.object_keys.length > 0) {
                for (let j = 0; j < this.object_keys.length; j++) {
                    for (let i = 0; i < filelist.length; i++) {
                        attach = {
                            attach_id: null,
                            attach_name: filelist[i].name,
                            file_name: filelist[i].file_name,
                            attach_class: this.select_attach_class,
                            file_type: filelist[i].file_type,
                            file_size: filelist[i].file_size,

                            app_code: this.$config.appCode,
                            ref_url: filelist[i].ref_url,
                            uploader: this.$store.state.user.uid,
                            object_name: this.object_name,
                            object_keyid: this.object_keys[j],
                            attach_memo: "附件描述",
                        };
                        response = await attachApi.insert(attach);
                        if (response.code != 0) {
                            this.$XModal.alert({
                                status: "error",
                                title: "保存发生错误",
                                message:
                                    (response.msg || "") +
                                    "  保存成功" +
                                    i +
                                    "条, 失败" +
                                    (filelist.length - i) +
                                    "条",
                            });
                            break;
                        }
                    }
                }
            } else {
                for (let i = 0; i < filelist.length; i++) {
                    attach = {
                        attach_id: null,
                        attach_name: filelist[i].name,
                        file_name: filelist[i].file_name,
                        attach_class: this.select_attach_class,
                        file_type: filelist[i].file_type,
                        file_size: filelist[i].file_size,

                        app_code: this.$config.appCode,
                        ref_url: filelist[i].ref_url,
                        uploader: this.$store.state.user.uid,
                        object_name: this.object_name,
                        object_keyid: this.object_keyid,
                        attach_memo: "附件描述",
                    };
                    response = await attachApi.insert(attach);
                    if (response.code != 0) {
                        this.$XModal.alert({
                            status: "error",
                            title: "保存发生错误",
                            message:
                                (response.msg || "") +
                                "  保存成功" +
                                i +
                                "条, 失败" +
                                (filelist.length - i) +
                                "条",
                        });
                        break;
                    }
                }
            }

            this.uploading = false;
            this.get_attach_list();
        },

        /**
         * 删除文件对应的附件记录
         * @param {String} attach_id 附件记录ID
         */
        async deleteAttach(attach) {
            // 调用删除附件记录API
            this.$general.delete_upyunfile(attach.file_name); // 删除云存储的文件
            let response = await attachApi.deleteAttach(attach.attach_id); // 删除附件记录
            if (response.code != 0) {
                this.$XModal.alert({
                    status: "error",
                    title: "删除错误",
                    message: response.msg || "服务器删除程序发生错误",
                });
            } else {
                // 刷新附件数据列表
                this.get_attach_list();
            }
        },

        /**
         * 文件列表点击查看图片
         * @param {String} url 图片URL
         */
        imageView(row) {
            if (this.imageType.indexOf(row.file_type) > -1) {
                this.showImage = true;
                this.imgName = row.ref_url;
            } else {
                window.open(row.ref_url);
            }
        },

        // 返回文件缩略图样式
        isFileImage(ext) {
            if (
                ["png", "jpg", "jpeg", "bmp", "gif", "svg"].indexOf(
                    ext.toLowerCase()
                ) !== -1
            ) {
                return "PIC";
            } else if (
                ["xlsx", "xls", "csv"].indexOf(ext.toLowerCase()) !== -1
            ) {
                return "EXCEL";
            } else if (["doc", "docx"].indexOf(ext.toLowerCase()) !== -1) {
                return "WORD";
            } else if (["pdf"].indexOf(ext.toLowerCase()) !== -1) {
                return "PDF";
            } else if (["zip", "rar"].indexOf(ext.toLowerCase()) !== -1) {
                return "ZIP";
            } else if (
                ["txt", "js", "json", "xml", "conf"].indexOf(
                    ext.toLowerCase()
                ) !== -1
            ) {
                return "TXT";
            } else if (["exe"].indexOf(ext.toLowerCase()) !== -1) {
                return "EXE";
            }
        },
        getExtIconClassName(ext) {
            return {
                PIC: "file-image-o",
                EXCEL: "file-excel-o",
                WORD: "file-word-o",
                PDF: "file-pdf-o",
                ZIP: "file-zip-o",
                TXT: "file-text-o",
                EXE: "cog",
            }[ext];
        },
    },
    mounted() {
        this.get_attach_list();
    },
    watch: {
        object_keyid: {
            handler(newVal, oldVal) {
                this.get_attach_list();
            },
        },
        mode: {
            handler(newVal, oldVal) {
                this.showMode = newVal;
            },
            immediate: true,
        },
    },
};
</script>
