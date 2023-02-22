<style lang="scss">
//特殊样式，而不通用请在这里写样式
</style>
<template>
    <div class="head" v-if="$route.meta.showHeader" :style="{'left':$store.state.css.navWidth + 'px'}">
        <div class="logo">
            <img src="../assets/gths-logo.jpg">
        </div>
        <!-- 当前位置 -->
        <div class="current" v-if="$route.meta.showPosition">
            <div class="breadcrumb" v-show="$store.state.active_menu_name != ''">
                <a href="#">
                    首页
                    <span>/</span>
                </a>
                <div class="col" v-if="$store.state.menu_group_name != ''">
                    {{$store.state.menu_group_name}}
                    <span>/</span>
                </div>
                <div class="col">
                    {{$store.state.active_menu_name}}
                </div>
            </div>
        </div>
        <!-- 右侧 -->
        <div class="right">
            <div class="nav-bar">
                <ul>

                    <li title="全屏模式">
                        <syIcon type="expand" @click="screen" v-show="downIcon"></syIcon>
                        <syIcon type="compress" @click="screen" v-show="!downIcon"></syIcon>
                    </li>
                    <li title="刷新" @click="refrashClick">
                        <syIcon type="refresh"></syIcon>
                    </li>
                    <li title="删除缓存数据" @click="removeCache">
                        <syIcon type="trash"></syIcon>
                    </li>
                </ul>
            </div>
            <div class="member">
                <div class="member-active">
                    <img :src="$store.state.user.userpic">
                </div>
                <div class="member-dropdown">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{$store.state.user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <!-- <el-dropdown-item command="toPerson">个人中心</el-dropdown-item> -->
                            <el-dropdown-item command="quit">退出系统</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import https from "@/https.js";
import syIcon from "@/components/general/sy-icon/sy-icon.vue";

export default {
    name: "syHead",
    components: {
        syIcon,
    },
    data() {
        return {
            fullscreen: false,
            downIcon: true,
            current: -1,
            dropdown: -1,
            selectTab: "0",
            listData: [
                {
                    name: "今天很开心，我要出去喝酒，你要一起去吗",
                },
                {
                    name: "今天很开心，我要出去喝酒，你要一起去吗",
                },
                {
                    name: "今天很开心，我要出去喝酒，你要一起去吗",
                },
                {
                    name: "今天很开心，我要出去喝酒，你要一起去吗",
                },
                {
                    name: "今天很开心，我要出去喝酒，你要一起去吗",
                },
                {
                    name: "今天很开心，我要出去喝酒，你要一起去吗",
                },
                {
                    name: "今天很开心，我要出去喝酒，你要一起去吗",
                },
                {
                    name: "今天很开心，我要出去喝酒，你要一起去吗",
                },
                {
                    name: "今天很开心，我要出去喝酒，你要一起去吗",
                },
                {
                    name: "今天很开心，我要出去喝酒，你要一起去吗",
                },
            ],
        };
    },
    props: {
        count: Number,
        overflowCount: {
            type: [Number, String],
            default: 99,
        },
    },

    methods: {
        // 信息切换
        setTabIndex: function (index) {
            this.selectTab = index;
        },
        handleCommand(command) {
            if (command == "quit") {
                this.quit();
            }
            if (command == "toPerson") {
                this.toPerson();
            }
        },
        // 退出登录
        quit: function () {
            this.$XModal.confirm("确定要退出当前系统吗？").then((type) => {
                if (type == "confirm") {
                    https.fetchPost("/logout", {}).then(() => {
                        // 再退出认证中心
                        window.location = process.env.VUE_APP_AUTH + "/logout";
                    });
                }
            });
        },
        screen() {
            let element = document.documentElement;
            this.downIcon = !this.downIcon;
            if (this.fullscreen) {
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
        // 个人中心
        toPerson() {
            window.location = "/eip-pc/";
        },
        // 刷新组件页
        refrashClick() {
            this.$emit("on-refrash");
        },

        // 删除缓存数据
        removeCache() {
            // dmBaseSet里的内容缓存
            this.$XEUtils.objectEach(this.$dmBaseSet.datalist, (item, key) => {
                this.$dmBaseSet.datalist[key] = null;
            });
            this.$dmBaseSet.loadData();

            // 浏览器storage里的缓存
        },
    },
};
</script>

