<style lang="scss">
//特殊样式，而不通用请在这里写样式
.el-input.is-disabled .el-input__inner {
    color: #333;
}

.el-form-item {
    margin-bottom: 15px;
}
.el-form-item__label {
    line-height: 35px;
}
.el-form-item__content {
    line-height: 35px;
}
.el-input__inner {
    padding: 0px 5px;
}
table.definition {
    tbody {
        tr {
            td {
                position: relative;
                height: 30px;

                .el-input {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    width: 100%;
                    height: 100%;

                    .el-input__inner {
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        width: 100%;
                        height: 100%;
                        border: 0px;
                    }
                }

                .el-textarea {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    width: 100%;
                    height: 100%;

                    .el-textarea__inner {
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        width: 100%;
                        height: 100%;
                        border: 0px;
                        padding: 5px;
                    }
                }

                .el-select {
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    width: 100%;
                    height: 100%;

                    .el-input {
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        width: 100%;
                        height: 100%;

                        .el-input__inner {
                            position: absolute;
                            top: 0px;
                            left: 0px;
                            width: 100%;
                            height: 100%;
                            border: 0px;
                        }
                    }
                }
            }
        }
    }
}

</style>
<template>
    <div>
        <div v-if="$store.state.hasLogin == true">

            <!-- 头部 -->
            <sy-Head @on-refrash="reload" @la="language"></sy-Head>

            <!-- 页标签显示栏 -->
            <syPageTabs v-show="$route.meta.showClick" ref="tabs" :keep-alive-component-instance="keepAliveComponentInstance" :firstPageRouter="firstPage"></syPageTabs>

            <!-- 导航 -->
            <sy-Nav @showPage="showPage" :languageVal="languageVal"></sy-Nav>

            <div class="main-box" ref="keepAliveContainer">
                <!-- 页面主体内容 去掉了:include="cachedViews"-->
                <keep-alive>
                    <router-view :key="$route.fullPath" :languageVal="languageVal"></router-view>
                </keep-alive>
            </div>

        </div>

        <!-- 全局显示的遮罩层 -->
        <div v-if="$store.state.TMP.request_count>0 && $store.state.TMP.loadingBar==true">
            <div style="position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 99999; background: #eee; opacity: 0.5;">
            </div>
            <syLoading></syLoading>
            <!-- <div
                style="font-size:50px; text-align:center; position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 99999;">
                <i class="fa fa-spinner fa-spin" style="margin-top:20%;"></i>
            </div> -->
        </div>
        <websocket v-if="websocketModel" :url="websocketUrl"></websocket>
    </div>
</template>

<script>
import syHead from "./pages/syHead.vue";
import syNav from "./pages/syNav.vue";
import home from "./pages/home.vue";
import syPageTabs from "./pages/syPageTabs.vue";
import websocket from "@/components/general/sy-websocket/websocket.vue";
import syLoading from "@/components/general/sy-loading/loading.vue";
// import Cookies from "js-cookie";

var _self;

export default {
    name: "app",
    components: {
        home,
        syNav,
        syHead,
        websocket,
        syPageTabs,
        syLoading,
    },
    data() {
        return {
            // 用来控制应用加载时页面延迟显示
            showApp: false,

            // 键盘control是否被按下
            isUpKey_Control: false,
            websocketUrl: "",
            websocketModel: false,

            // keep-alive的控件实例对象
            keepAliveComponentInstance: null,
            // 固定的系统首页路由对象
            firstPage: {
                name: "home",
                meta: {
                    title: "系统首页",
                    englishTitle:"Home",
                    requireAuth: false,
                    showHeader: true,
                    showNav: true,
                    showtag: true,
                    showPosition: true,
                },
                path: "/home",
                query: {},
                params: {},
                fullPath: "/home",
            },
            noExecGetCss: 0,

            languageVal:null,
        };
    },
    created() {
        //在页面加载时读取sessionStorage里的语言信息
        if(JSON.parse(sessionStorage.getItem("language"))!=null){
            this.$store.state.language=JSON.parse(sessionStorage.getItem("language"))
        }
        
        //在页面刷新时将vuex里语言信息保存到sessionStorage里
        window.addEventListener("beforeunload",()=>{
            sessionStorage.setItem("language",JSON.stringify(this.$store.state.language))
        })
        _self = this;

    },
        
    mounted: function () {
        // 得到浏览器内框高度
        window.onresize = function () {
            if (_self.noExecGetCss == 0) {
                setTimeout(() => {
                    _self.$store.commit("getCss");
                    _self.noExecGetCss = 0;
                }, 500);
            }
            _self.noExecGetCss++;
        };
        window.onresize();

        /**************** 下面两个键盘监控是用来控制F5刷新组件，Control+F5刷新浏览器  ************/
        // 监控键盘按下事件
        document.onkeydown = function (e) {
            let keyNum = window.event ? e.keyCode : e.which; //获取被按下的键值
            // 键盘按下control键时，记录下isUpKey_Control=true
            if (keyNum == 17) {
                _self.isUpKey_Control = true;
            }
            // 键盘按下F5键时
            if (keyNum == 116) {
                if (_self.isUpKey_Control == false) {
                    // 刷新当前路由组件
                    _self.reload();
                    // 阻止浏览器刷新
                    return false;
                }
            }
        };
        // 监控键盘按键抬起事件
        document.onkeyup = function (e) {
            let keycode = window.event ? e.keyCode : e.which;
            // 键盘按下control键抬起后
            if (keycode == 17) {
                _self.isUpKey_Control = false;
            }
        };
    },
    methods: {
        // 导航菜单点击
        showPage: function (router) {
            this.$router.push(router);
        },

        // 刷新当前标签页组件
        reload() {
            this.$refs.tabs.reload();
        },

        // 获取keep-alive的控件实例对象传入标签组件
        getKeepAliveContainer() {
            // 获取keep-alive的控件实例对象
            this.$nextTick(() => {
                if (this.$refs.keepAliveContainer) {
                    this.keepAliveComponentInstance =
                        this.$refs.keepAliveContainer.childNodes[0].__vue__;
                }
            });
        },

        language(val){
            this.languageVal=val
        }
    },
    watch: {
        "$store.state.hasLogin": {
            handler(val, oldVal) {
                if (val == true) {
                    // 因为当还没登录时，App组件里的子组件元素都还没创建，所以this.$refs.keepAliveContainer是Null，所以要放在登录后获取
                    this.getKeepAliveContainer();

                    let iapi = "gbs";
                    // let cookie = Cookies.get("S_CLIENT");
                    let cookie = this.$XEUtils.cookie.get("S_CLIENT");

                    if (!cookie || cookie == "undefind") {
                        cookie = "";
                    }

                    if (
                        process.env.VUE_APP_RUN &&
                        process.env.VUE_APP_RUN !== "DEV"
                    ) {
                        this.websocketUrl = `wss://mec.gthsip.com/push/test?user_id=${this.$store.state.user.uid}&iapi=${iapi}&cookie=${cookie}`;
                        console.log(this.websocketUrl);
                        this.websocketModel = true;
                    }
                }
            },
            immediate: true,
        },
    },
};
</script>
