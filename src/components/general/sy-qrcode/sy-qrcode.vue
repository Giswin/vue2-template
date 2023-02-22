<template>
    <div>
        <img :src="imgSrc" :style="imgStyle" />
    </div>
</template>

<script>
import QRCode from "qrcode";

export default {
    name: "syQrcode",
    data() {
        return {
            imgSrc: "",
        };
    },
    // dataset: 树节点数据数组
    props: {
        // 二维码的内容
        content: {
            type: String,
            default: "我是二维码",
        },
        // 样式
        imgStyle: {
            type: Object,
            default: () => {
                return {};
            },
        },
        option: {
            type: Object,
            default: {
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
        },
    },
    watch: {
        content: {
            handler(newVal, oldVal) {
                // With promises
                QRCode.toDataURL(newVal, this.option)
                    .then((url) => {
                        this.imgSrc = url;
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            },
            immediate: true,
        },
    },
};
</script>

<style>
</style>
