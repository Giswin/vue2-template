<template>
    <div id="app">
        <div class="wrap">
            <div class="icon1">
                <syIcon type="envira" size="20" color="green"></syIcon>
            </div>
            <div class="icon2">
                <syIcon type="trash" size="20" @click="open"></syIcon>
            </div>
            <div class="icon3">
                <syIcon custom="fa-twitter" size="20" color="#177cb0"></syIcon>
            </div>

        </div>
        <div id="max">
            <div class="icon4">
                <syIcon :type="windowIcon" size="20" @click="screen"></syIcon>
            </div>
            <div class="content">点击图标全屏</div>
        </div>

    </div>

</template>

<script>
import syIcon from "./sy-icon.vue";
export default {
    components: {
        syIcon,
    },
    data() {
        return {
            fullscreen: false,
            windowIcon: "window-maximize",
        };
    },
    methods: {
        open() {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        screen() {
            // let element = document.documentElement;//整个页面全屏效果
            let element = document.getElementById("max");
            if (this.fullscreen) {
                this.windowIcon = "window-maximize";

                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                this.windowIcon = "window-restore";

                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
    },
};
</script>

<style lang="scss" scoped>
.wrap {
    display: flex;
    justify-content: center;
}
.icon1,
.icon2,
.icon3 {
    margin-right: 15px;
}
#max {
    position: relative;
    width: 400px;
    height: 400px;
    margin: 50px 0 0 400px;
    background-color: #fff;
    overflow: hidden;
    .icon4 {
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .content {
        width: 300px;
        height: 40px;
        margin: 50px;
        font-size: 20px;
    }
}
</style>