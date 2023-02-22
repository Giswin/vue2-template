<template>
    <div class="wrap">
        <div class="img-box">
            <img v-if="goodsData.odg_pic_url" :src="goodsData.odg_pic_url" @click="showview=true">
        </div>

        <syUploadHeader :show.sync="showview" @on-ok="saveHeaderImg" @on-cancel="showview = false" :fileUploadApi="upyun.upyunUrl" :oss="upyun.getyunUrl" :formData="uploadFormData" :maxSize="10240" :src="goodsData.odg_pic_url" :title="'款式图片'"></syUploadHeader>
    </div>
</template>

<script>
import syUploadHeader from "./sy-upload-header.vue";
import config from "@/config/config.js";
import general from "@/common/general.js";

export default {
    components: {
        syUploadHeader,
    },
    data() {
        return {
            showview: false,
            upyun: config.upyun,
            uploadFormData: {},
            goodsData: {
                odg_pic_url:
                    "https://oss.gthsip.com/GTHS-GBS/0dc1c6ba00286207a281d01890201149a9lthpo2vbl9tacz.png",
            },
        };
    },
    created() {
        this.getUploadOSS_Params();
    },
    methods: {
        getUploadOSS_Params() {
            // 获取上传OSS时需要携带的数据参数
            this.uploadFormData = general.upyunParams() || {};
            console.log("uploadFormData", this.uploadFormData);

            const timer = setInterval(() => {
                this.uploadFormData = general.upyunParams() || {};
            }, 1000);
            this.$once("hook:beforeDestroy", () => {
                clearInterval(timer);
                //console.log('清除了一个定时器')
            });
        },
        // 回填上传的款式图片地址到款式表
        saveHeaderImg(file) {
            this.goodsData.odg_pic_url = file.ref_url;
        },
    },
};
</script>

<style lang="scss" scoped>
.img-box {
    width: 200px;
    height: 200px;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>