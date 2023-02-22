<style scoped>
#style {
    width: 700px;
    margin: auto;
}
</style>
<template>

</template>

<script>
export default {
    props: {
        url: String,
    },
    data() {
        return {
            //接受到的消息
            receiveMessage: "",
            //websocket对象
            webSocket: null,
            //最大失败次数 超过次数后重连时间间隔加倍
            linkLimit: 10,
            //连接失败次数
            linkNum: 0,
            //防重复连接锁
            lock: false,
            //定时器id 用于清除
            timeOutObj: null,
            //连接时间间隔
            linkTimeSpace: 5000,
            //心跳定时器id
            heartObj: null,
            //心跳时间间隔
            heartSpace: 20000,
        };
    },
    mounted() {},
    created() {
        this.initWebSocket();
    },
    destroyed() {},
    methods: {
        // 初始化 webSocket
        initWebSocket() {
            if (!this.webSocket) {
                if (this.linkNum <= this.linkLimit) {
                    // 创建 WebSocket 对象
                    this.webSocket = new WebSocket(this.url);
                    this.webSocket.onopen = this.onOpenWebSocket;
                    this.webSocket.onmessage = this.onMessageWebSocket;
                    this.webSocket.onerror = this.onErrorWebSocket;
                    this.webSocket.onclose = this.closeWebSocket;
                } else {
                    console.log("重连次数达到上限，时间间隔增加");
                    //时间间隔加5秒
                    this.linkTimeSpace = this.linkTimeSpace + 5000;
                    this.lock = false;
                    this.linkNum = 0;
                    this.reconnect();
                }
            } else {
                //已存在连接时判断连接状态
                if (this.webSocket.readyState == 3) {
                    //ws连接已失效时关闭连接并重新启动
                    this.websocket && this.websocket.close();
                    return;
                }

                if (this.webSocket.readyState == 1) {
                    console.log("已存在连接状态ws");
                    return;
                }
            }
        },
        // 连接建立之后执行 send 方法发送数据
        onOpenWebSocket() {
            this.linkNum = 0;
            //重置心跳
            this.resetHeart();
            console.log("链接建立成功!");
        },
        // 发生异常
        onErrorWebSocket() {
            if (this.webSocket) {
                console.log("发生异常,连接状态：" + this.webSocket.readyState);
                if (this.webSocket.readyState == 3) {
                    this.linkNum++;
                    this.webSocket.close();
                    this.webSocket = null;
                }
            }
        },
        // 数据接收
        onMessageWebSocket(e) {
            //重置心跳
            this.resetHeart();

            if (e.data == "pong") {
                console.log("pong");
                return;
            }

            if (this.isJSON(e.data)) {
                let res = JSON.parse(e.data);
                console.log(res);
                if (res.code == "0") {
                    this.receiveMessage = e.data;
                    this.$store.state.websockerMessage = JSON.parse(e.data);
                    this.$store.state.websockerMessageList.push(
                        JSON.parse(e.data)
                    );
                    this.$forceUpdate();
                } else if (res.code == "1") {
                    console.log("下线通知");

                    this.$XModal.alert(res.msg, "账号登出").then((type) => {
                        this.$XEUtils.cookie.remove("S_CLIENT", {
                            domain: process.env.VUE_APP_COOKIE_DOMAIN,
                        });
                        // 刷新页面
                        window.location = window.location.href.replace(
                            /#/g,
                            "vue-router"
                        );
                    });
                } else {
                    alert("接受数据格式错误");
                }

                //console.log(this.$store.state.websockerMessageList);
            }
        },
        // 数据发送
        sendWebSocket(data) {
            if (this.webSocket && this.webSocket.readyState == 1) {
                this.webSocket.send(data);
            } else {
                console.log(
                    "ws连接异常,无法发送消息" + this.webSocket.readyState
                );
            }
        },
        // 关闭
        closeWebSocket(e) {
            //清除心跳
            this.clearHeart();
            console.log("断开连接", e);
            if (this.webSocket && this.webSocket.readyState == 3) {
                this.webSocket = null;
            }
            this.reconnect();
        },

        createCode() {
            var code = "";
            //设置长度，这里看需求，我这里设置了4
            var codeLength = 4;

            //设置随机字符
            var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

            //循环codeLength 我设置的4就是循环4次
            for (var i = 0; i < codeLength; i++) {
                //设置随机数范围,这设置为0 ~ 36
                var index = Math.floor(Math.random() * 9);

                //字符串拼接 将每次随机的字符 进行拼接
                code += random[index];
            }

            return code;
        },
        //断线重连
        reconnect() {
            //防止重复连接，加锁
            if (this.lock) return;
            this.lock = true;
            //清除原有的定时器
            this.timeOutObj && clearTimeout(this.timeOutObj);
            //添加5秒定时器，5秒后执行重连
            this.timeOutObj = setTimeout(() => {
                console.log("开始尝试重新连接");
                this.initWebSocket();
                //解锁
                this.lock = false;
            }, this.linkTimeSpace);
        },
        //心跳
        heart() {
            this.heartObj = setTimeout(() => {
                this.sendWebSocket("ping");
                console.log("ping");
            }, this.heartSpace);
        },
        //重置心跳
        resetHeart() {
            this.clearHeart();
            this.heart();
        },
        //清除心跳
        clearHeart() {
            this.heartObj && clearTimeout(this.heartObj);
            return true;
        },
        isJSON(str) {
            if (typeof str == "string") {
                try {
                    var obj = JSON.parse(str);
                    //console.log('转换成功：'+obj);
                    return true;
                } catch (e) {
                    //console.log('error：'+str+'!!!'+e);
                    return false;
                }
            }
        },
        //windows强制弹出窗口
        showMsgNotification(out_title, out_msg) {
            var title = out_title ? out_title : "测试标题";
            var options = {
                body: out_msg ? out_msg : "测试内容", // 通知主体
                requireInteraction: true, // 不自动关闭通知
                icon: "https://ifs.gthsip.com:5543/upyun/GTHS-EIP/4abf64d85ae86c48011a20a43e583d8et32clm0dlr2v84c9.png", // 通知图标
                tag: "hangge",
            };
            var Notification =
                window.Notification ||
                window.mozNotification ||
                window.webkitNotification; // 浏览器做兼容处理
            if (Notification) {
                //支持桌面通知
                if (Notification.permission == "granted") {
                    //已经允许通知
                    instance_init(title, options);
                } else {
                    //第一次询问或已经禁止通知(如果用户之前已经禁止显示通知，那么浏览器不会再次询问用户的意见，Notification.requestPermission()方法无效)
                    Notification.requestPermission(function (status) {
                        if (status === "granted") {
                            //用户允许
                            instance_init(title, options);
                        } else {
                            //用户禁止
                            console.log("弹出窗口已被用户浏览器禁止");
                            return false;
                        }
                    });
                }
                /**
                 * Notification定义
                 * */
                function instance_init(title, options) {
                    var instance = new Notification(title, options);
                    instance.onclick = function () {
                        console.log("onclick");
                        // 关闭通知
                        instance.close();
                    };
                    instance.onerror = function () {
                        console.log("onerror");
                    };
                    instance.onshow = function () {
                        console.log("onshow");
                    };
                    instance.onclose = function () {
                        console.log("onclose");
                    };
                }
            } else {
                //不支持(IE等)
                console.log("该浏览器不支持弹出窗口");
            }
        },
    },
    watch: {
        "$store.state.websockerSendMessage": {
            handler(val, oldVal) {
                this.sendWebSocket(JSON.stringify(val));
            },
            deep: true,
        },
        "$store.state.websockerMessage": {
            handler(val, oldVal) {
                this.$Notice.open({
                    title: "小马跟单消息中心",
                    desc: val.html,
                    duration: 0,
                });

                //this.$XModal.message(val.html);

                if (val.focus == 1) {
                    this.showMsgNotification(val.sign, val.html);
                }
            },
            deep: true,
        },
    },
};
</script>

