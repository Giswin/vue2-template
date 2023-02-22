<template>
    <div class="qrcode">
        <div class="wrap">
            <div class="btns">
                <el-button @click="changeContent(webName1)" style="margin:0 0 50px 20px">{{webName1}}</el-button>
                <el-button @click="changeContent(webName2)" style="margin:0 0 50px 20px">{{webName2}}</el-button>
            </div>

            <syQrcode :content="content" :imgStyle="imgStyle" :option="option"></syQrcode>
        </div>

    </div>
</template>

<script>
import syQrcode from "./sy-qrcode.vue";
export default {
    components: {
        syQrcode,
    },
    data() {
        return {
            content: "https://baidu.com",
            imgStyle: {
                width: "200px",
                height: "200px",
            },
            option: {
                errorCorrectionLevel: "M",
                margin: 1,
                height: 200,
                width: 200,
                type: "image/jpeg",
                scal: 177,
                color: {
                    dark: "#fff", // 二维码背景颜色
                    light: "#000", // 二维码前景颜色
                },
                rendererOpts: {
                    quality: 0.9,
                },
            },
            webName1: "百度",
            webName2: "京东",
        };
    },
    methods: {
        changeContent(webName) {
            if (webName == "京东") {
                this.content = "https://m.jd.com/";
                this.option.color.light = "#d6ecf0";
            } else {
                this.content = "https://baidu.com";
                this.option.color.light = "#000";
            }
        },
    },
};
</script>

<style scoped lang="scss">
.wrap {
    margin: 0 500px;
    .btns {
        display: flex;
    }
}
</style>