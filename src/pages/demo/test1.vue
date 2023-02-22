<template>
    <div class="test">
        <div class="test-wrap">
            <div class="btns">
                <el-button type="primary" style="margin:15px 15px 0 0" @click="changeComName('WangEditor')">wangEditor</el-button>
                <el-button type="primary" style="margin:15px 15px 0 0" @click="changeComName('syAttach')">syAttach</el-button>
                <el-button type="primary" style="margin:15px 15px 0 0" @click="changeComName('syUpload')">syUpload</el-button>
                <el-button type="primary" style="margin:15px 15px 0 0" @click="changeComName('syUploadHeader')">syUploadHeader</el-button>
                <el-button type="primary" style="margin:15px 15px 0 0" @click="changeComName('syUploadBox')">syUploadBox</el-button>
                <el-button type="primary" style="margin:15px 15px 0 0" @click="changeComName('syProgress')">syProgress</el-button>
                <el-button type="primary" style="margin:15px 15px 0 0" @click="changeComName('syMultipleSet')">syMultipleSet</el-button>
                <el-button type="primary" style="margin:15px 15px 0 0" @click="changeComName('contentChangeBox')">contentChangeBox</el-button>
                <el-button type="primary" style="margin:15px 15px 0 0" @click="changeComName('filterForm')">filter</el-button>
                <el-button type="primary" style="margin:15px 15px 0 0" @click="changeComName('syQrcode')">syQrcode</el-button>
                <el-button type="primary" style="margin:15px 15px 0 0" @click="changeComName('syIcon')">syIcon</el-button>

            </div>
            <div class="com">
                <component :is="nameCom"></component>
            </div>
        </div>

    </div>
</template>

<script>
import WangEditor from "@/components/general/wangEditor/demo.vue";
import syAttach from "@/components/general/sy-attach/demo.vue";
import syUpload from "@/components/general/sy-upload/demo.vue";
import syUploadBox from "@/components/general/sy-upload-box/demo.vue";
import syProgress from "@/components/general/sy-progress/demo.vue";
import syMultipleSet from "@/components/general/sy-multiple-set/demo.vue";
import contentChangeBox from "@/components/general/content-change-box/demo.vue";
import filterForm from "@/components/general/filter-form/demo.vue";
import syQrcode from "@/components/general/sy-qrcode/demo.vue";
import syUploadHeader from "@/components/general/sy-upload-header/demo.vue";
import syIcon from "@/components/general/sy-icon/demo.vue";

export default {
    components: {
        WangEditor,
        syAttach,
        syUpload,
        syUploadBox,
        syProgress,
        syMultipleSet,
        contentChangeBox,
        filterForm,
        syQrcode,
        syUploadHeader,
        syIcon,
    },
    data() {
        return {
            nameCom: "WangEditor",
        };
    },
    methods: {
        changeComName(demoName) {
            this.nameCom = demoName;
        },
    },
};
</script>

<style lang="scss" scoped>
.test {
    margin: 150px 50px;
    width: 80vw;
    .test-wrap {
        width: 100%;
    }
    .btns {
        margin-bottom: 50px;
    }
}
</style>

