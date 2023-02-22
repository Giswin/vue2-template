import axios from "axios";
import qs from "qs";
import store from "./store/index.js";
import router from "./router";
import Vue from "vue";
// import Cookies from 'js-cookie'

import XEUtils from "xe-utils"; // 这句代码必须要有，否则会报错
import VXETable from "vxe-table";
var Message = VXETable.modal;

axios.defaults.timeout = 1200000; // 响应时间
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8"; //配置请求头
// 在开发模式和生产模式环境变量文件中分别配置[VUE_APP_API_URL]参数值
//axios.defaults.baseURL = process.env.VUE_APP_API_URL;

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  (config) => {
    //将token放到headers的Authorization值
    //config.headers.Authorization = store.state.token;

    // session变了后，要重新加载页面
    //console.log(store.state.TMP.session_id)
    if (
      store.state.TMP.session_id != "" &&
      store.state.TMP.session_id != XEUtils.cookie.get("S_CLIENT")
    ) {
      window.location = window.location.href.replace(/#/g, "vue-router");
      return false;
    }

    // 记录访问时间
    localStorage.setItem("lastAccessTime", new Date());

    // 不是跨域
    if (!config.headers["X-CORS"] || config.headers["X-CORS"] != 1) {
      // 将用户信息放到header里传给后端
      config.headers["Author"] = encodeURI(JSON.stringify(store.state.user));

      config.headers["X-Requested-With"] = "XMLHttpRequest";
      let regex = /.*XSRF-TOKEN=([^;.]*).*$/;
      config.headers["X-XSRF-TOKEN"] =
        document.cookie.match(regex) === null
          ? null
          : document.cookie.match(regex)[1];

      delete config.headers["X-CORS"];
    } else {
      delete config.headers["X-CORS"];
    }

    //在发送请求之前,将post请求参数json转formData
    /* if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    } */
    store.commit("SET_TMP_VALUE", {
      name: "request_count",
      value: store.state.TMP["request_count"] + 1,
    });
    return config;
  },
  (error) => {
    console.log("错误的传参");
    VXETable.modal.message({ message: "错误的传参", status: "error" });
    return Promise.reject(error);
  }
);

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  (res) => {
    store.commit("SET_TMP_VALUE", {
      name: "request_count",
      value: store.state.TMP["request_count"] - 1,
    });

    //对响应数据做些事
    // 判断返回的数据中是否有token参数，如果有，那么要刷新store里的token
    if (res.data.token) {
      store.commit("UPDATE_TOKEN", res.data.token);
    }

    // SESSION过期
    if (res.data.code == 1001) {
      // 清除cookies里的SESSION
      XEUtils.cookie.remove("S_CLIENT", {
        domain: process.env.VUE_APP_COOKIE_DOMAIN,
      });
      // 刷新页面
      window.location = window.location.href.replace(/#/g, "vue-router");
    } else if (res.data.code == 1005) {
      // 未登录，跳转到登录页
      XEUtils.cookie.remove("S_CLIENT", {
        domain: process.env.VUE_APP_COOKIE_DOMAIN,
      });
      window.location = window.location.href.replace(/#/g, "vue-router");
    }
    if (res.data.err) {
      console.log(res.data);
      VXETable.modal.message({
        message: res.data.msg || "服务端程序错误",
        status: "error",
      });
      return Promise.reject(res.data);
    }
    return res;
  },
  (error) => {
    store.commit("SET_TMP_VALUE", {
      name: "request_count",
      value: store.state.TMP["request_count"] - 1,
    });
    console.log("请求失败");
    VXETable.modal.message({ message: "请求失败", status: "error" });
    return Promise.reject(error);
  }
);

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: param })
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}
// 设置axios请求的默认头信息
export function setHeaders(name, val) {
  axios.defaults.headers.post[name] = val || "";
}
export default {
  fetchPost,
  fetchGet,
  setHeaders,
};
