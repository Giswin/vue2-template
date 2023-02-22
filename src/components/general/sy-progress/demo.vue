<template>
    <div class="wrap">
        <div class="stroke1">
            <syProgress v-if="file.showProgress" :strokeWidth="2" :percent="parsePercentage(file.percentage)" :status="file.status === 'finished' && file.showProgress ? 'success' : 'normal'"></syProgress>

        </div>
        <div class="stroke2">
            <syProgress :percent="85" :hideInfo="false" strokeColor="#f6ffcc" :strokeWidth="25" :successPercent="20" :textInside="false"></syProgress>

        </div>
        <el-button @click="changePercent">+20%</el-button>
        <div class="stroke3">
            <syProgress :percent="percent" status="normal" :strokeColor="strokeColor" :strokeWidth="20" :textInside="true"></syProgress>
        </div>

    </div>
</template>

<script>
import syProgress from "./sy-progress.vue";
export default {
    components: {
        syProgress,
    },
    data() {
        return {
            strokeColor: "#ffcff6",
            percent: 20,
            file: {
                file_name:
                    "GTHS-GBS/f95d90787f530f8d3e1a8c3c7caafd64vqs4wh9mebdmf807.png",
                file_size: 12122,
                file_type: "image/png",
                name: "02.png",
                percentage: 50,
                ref_url:
                    "https://oss.gthsip.com/GTHS-GBS/f95d90787f530f8d3e1a8c3c7caafd64vqs4wh9mebdmf807.png",
                response: {
                    code: 200,
                    file_size: 12122,
                    image_frames: 1,
                    image_height: 142,
                    image_type: "PNG",
                    image_width: 1219,
                    message: "ok",
                    mimetype: "image/png",
                    time: 1663653190,
                    url: "GTHS-GBS/f95d90787f530f8d3e1a8c3c7caafd64vqs4wh9mebdmf807.png",
                },
                showProgress: true,
                size: 12122,
                status: "finished",
                uid: 1663653190347,
            },
        };
    },
    methods: {
        parsePercentage(val) {
            return parseInt(val, 10);
        },
        changePercent() {
            if (this.percent < 100) {
                this.percent += 20;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.stroke1,
.stroke2,
.stroke3 {
    margin-bottom: 15px;
}
</style>