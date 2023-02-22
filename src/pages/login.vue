<style scoped lang="scss">
.sign-wrap {
    position: fixed;
    margin: auto;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 410px;
    height: 460px;
    background: #fff;
    box-shadow: 1px 2px 15px rgba(0, 0, 0, 0.3);
}
.sign-wrap > div > .title {
    font-size: 26px;
    color: #00c2b3;
    text-align: center;
}
.sign-wrap > div > .title span {
    color: $primary-color;
}
.sign-form {
    padding: 0px 38px 0px 38px;
}
.purpose-row {
    padding-top: 20px;
    white-space: nowrap;
}
.purpose-row ul {
}
.purpose-row span {
    line-height: 34px;
    width: 160px;
    text-align: center;
    margin-right: 14px;
    cursor: pointer;
    display: inline-block;
}
.purpose-row span.show {
    border: 1px solid $primary-color;
    color: $primary-color;
}
.form-row {
    margin-top: 25px;
}
.btn-sms {
    position: absolute;
    top: 4px;
    right: 4px;
}
.sign-miniapp {
    text-align: center;
    font-size: 14px;
}
.invalid-box {
    width: 200px;
    height: 200px;
    margin: auto;
    margin-top: 20px;
    box-sizing: border-box;
}
.invalid-box img {
    width: 100%;
    height: 100%;
}
>>> {
    .ivu-input {
        border-radius: 0px;
    }
    .ivu-btn {
        border-radius: 0px;
    }
    .ivu-btn:hover {
    }
    .ivu-btn-text:focus {
        box-shadow: none;
    }
    .ivu-checkbox-input {
        color: $primary-color;
    }
    .ivu-form-item {
        margin-bottom: 0px;
    }
}
.login-button {
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: rgb(222, 255, 192);
}
>>> .el-form-item__content {
    width: 100%;
}
</style>
<template>
    <div :style="{'background': 'url(' + backgroundImage + ') 0% 0%  / cover no-repeat '}" style="position: fixed; width: 100%; height: 100%;top: 0px;left:0px;z-index:999999;">
        <div class="sign-wrap">
            <div style="height: 40px;">
                <div class="m-r">
                    <!-- <div v-if="btn" @click="showToggle" class="btn-switch"></div>
					<div v-if="phone" @click="showToggle2" class="phone-switch"></div> -->
                </div>
                <div class="clear"></div>
            </div>
            <div class="sign-form" v-if="btnBody">
                <div class="title">欢迎进入系统</div>
                <div class="purpose-row">
                    <!-- <span :class="{ show: tabindex == 0 }"  @click="setTabIndex(0)">账号登录</span>
					<span :class="{ show: tabindex == 1 }"  @click="setTabIndex(1)">手机登录</span> -->
                </div>
                <div>
                    <div v-if="tabindex == 0">
                        <el-form ref="form1" :model="user" inline :rules="ruleValidate">
                            <div class="form-row">
                                <el-form-item prop="userName" style="width: 100%;">

                                    <el-input v-model="user.userName" prefix="ios-contact" @on-enter="toPassword" placeholder="输入用户名"></el-input>

                                </el-form-item>
                            </div>
                            <div class="form-row">
                                <el-form-item style="width: 100%;">
                                    <el-input v-model="user.pwd" ref="password" type="password" password placeholder="输入密码" @on-enter="login" prefix="ios-lock"></el-input>
                                    <div v-if="tip_msg != ''">
                                        <label style="color: red;">{{tip_msg}}</label>
                                    </div>
                                </el-form-item>
                            </div>
                            <div class="form-row">
                                <div @click="login" class="login-button">登录</div>
                            </div>
                            <div class="form-row" style="text-align: center; display: none;">
                                <el-checkbox v-model="single">同意小马HR 用户协议及隐私政策</el-checkbox>
                            </div>
                        </el-form>

                    </div>
                    <div v-if="tabindex == 1">
                        <el-form>
                            <div class="form-row">
                                <el-form style="width: 100%;">
                                    <el-input prefix="md-phone-portrait" size="large" placeholder="请输入11位手机号"></el-input>
                                </el-form>
                            </div>
                            <div class="form-row">
                                <el-form-item style="width: 100%;">
                                    <el-input size="large" prefix="md-mail" placeholder="请输入短信验证码"></el-input>
                                    <el-button class="btn-sms" type="text" v-show="sendAuthCode" @click="getAuthCode">发送验证码</el-button>
                                    <el-button class="btn-sms" type="text" v-show="!sendAuthCode" @click="getAuthCode" disabled>{{auth_time}}秒重新发送验证码</el-button>
                                </el-form-item>
                            </div>
                            <div class="form-row">
                                <el-button type="error" long size="large">登录</el-button>
                            </div>
                            <div class="form-row" style="text-align: center;">
                                <el-checkbox>同意小马HR 用户协议及隐私政策</el-checkbox>
                            </div>
                        </el-form>

                    </div>
                </div>
            </div>
            <!-- <div v-if="phoneBody">
				<div class="title">微信<span>扫一扫</span>快速登录</div>
				<div class="form-row invalid-box">
					<img src="../assets/ewm.jpg"/>
				</div>
				<div class="form-row sign-miniapp">
				   请用微信“扫一扫”扫描上方二维码
				</div>
			</div> -->
        </div>
    </div>
</template>

<script>
import md5 from "js-md5";
import myStorage from "../common/my_storage.js";
import router from "../router";
var thislogin;
export default {
    name: "login",
    data() {
        return {
            single: false,
            btn: true,
            btnBody: true,
            phone: false,
            phoneBody: false,
            tabindex: 0,
            sendAuthCode: true,
            auth_time: 0,
            user: {
                userName: "",
                pwd: "",
            },

            tip_msg: "",

            isRemember: false,
            expire: 604800, // 记住密码，有效期为7天

            backgroundImage: require("@/assets/backgound-img.jpg"),

            formValidate: {
                userName: "",
                pwd: "",
            },
            ruleValidate: {
                userName: [
                    {
                        required: true,
                        message: "请输入正常账号",
                        trigger: "blur",
                    },
                ],
                pwd: [
                    {
                        required: true,
                        message: "请输入正常密码",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    props: {
        msg: String,
    },
    created() {
        thislogin = this;
    },
    methods: {
        getAuthCode: function () {
            this.sendAuthCode = false;
            this.auth_time = 60;
            var auth_timetimer = setInterval(() => {
                this.auth_time--;
                if (this.auth_time <= 0) {
                    this.sendAuthCode = true;
                    clearInterval(auth_timetimer);
                }
            }, 1000);
        },
        showToggle: function () {
            this.phone = true;
            this.btn = false;
            this.btnBody = false;
            this.phoneBody = true;
        },
        showToggle2: function () {
            this.phone = false;
            this.btn = true;
            this.btnBody = true;
            this.phoneBody = false;
        },
        setTabIndex: function (index) {
            this.tabindex = index;
            this.tabindex = index;
        },
        // 登录
        login: function () {
            let issuccess = this.checkVaild("form1");
            if (!issuccess) return;

            this.$https
                .fetchPost("/ifs/ifs/login", {
                    username: thislogin.user.userName,
                    pwd: md5(thislogin.user.pwd),
                })
                .then(function (values) {
                    if (values.data.code != 0) {
                        thislogin.tip_msg = values.data.msg;
                        return;
                    }
                    // 登录成功
                    if (thislogin.isRemember) {
                        // 记住用户名和密码
                        thislogin.setLocalStorage();
                    }
                    thislogin.$store.commit("UPDATE_TOKEN", values.data.token);
                    thislogin.$store.commit(
                        "UPDATE_USER_INFO",
                        values.data.data
                    );
                    if (thislogin.$store.state.TMP.after_login_router != "") {
                        router.push(
                            thislogin.$store.state.TMP.after_login_router
                        ); // 登录成功后跳转到的页面
                    }
                    thislogin.$emit("after-login");
                });
        },

        // 账号点击enter 光标跳转至密码
        toPassword() {
            this.$refs.password.focus();
        },

        // 登录前，检查用户名和密码
        checkVaild: function (name) {
            let rtn = true;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // rtn = true;
                } else {
                    rtn = false;
                }
            });
            return rtn;
        },

        // 记住用户名和密码
        setLocalStorage: function () {
            myStorage.setItem("user", this.user, this.expire);
        },
        // 获取本地缓存中的用户名和密码
        getLocalStorage: function () {
            let user = myStorage.getItem("user") || {};
            if (user.userName && user.pwd) {
                this.user.userName = user.userName;
                this.user.pwd = user.pwd;
                this.isRemember = true;
            }
        },
        // 取消记住密码选择后，清空已存的用户名和密码
        clearLocalStorage: function () {
            if (!this.isRemember) {
                myStorage.setItem("user", {}, 0);
            }
        },
    },

    mounted: function () {
        //console.log(this.$route);
        // 简单的让登录面板自适应垂直居中
        //thislogin.$store.commit('USER_LOGIN_OUT');
        //thislogin.marginTop = (this.$store.state.css.innerHeight - 50 - 280) / 2  + 'px';
        /* let that = this;
            window.onresize = function(){
                that.marginTop = (window.innerHeight - 50 - 280) / 2  + 'px';
            }
            window.onresize(); */

        // 读取用户名和密码
        this.getLocalStorage();
    },
    computed: {
        marginTop() {
            return (this.$store.state.css.innerHeight - 50 - 280) / 2 + "px";
        },
    },
};
</script>
