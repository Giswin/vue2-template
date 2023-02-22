/* 引入Vue框架 */
import Vue from "vue";

/* 引入Vue路由 */
import VueRouter from "vue-router";
/* 引入项目路由集定义 */
import router from "./router";

/* 注入配置文件模块 */
import config from "./config/config.js";
Vue.prototype.$config = config;

/* 注入vuex全局变量模块 */
import store from "./store/index.js";
Vue.prototype.$store = store;

/* 引入vue axios ajax */
import https from "./https.js";

Vue.prototype.$https = https;

import XEUtils from "xe-utils";
Vue.prototype.$XEUtils = XEUtils;

/* 注入基础数据模块对象 */
import dmBaseSet from "./common/dm_base_set.js";
Vue.prototype.$dmBaseSet = dmBaseSet;

/* 注入自定义通用函数模块 */
import general from "./common/general.js";
Vue.prototype.$general = general;
import "@/assets/scss/index.scss";

import "./components/general/styles/index.scss";
// Default SortableJS

/* 加载自定义功能组件库 */
// import 'sy-chengjun-ui/packages/styles/font-icon.scss';
// import syChengjunUi from 'sy-chengjun-ui'
// Vue.use(syChengjunUi)

/* 引入element 框架 */
import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

import VXETable from "./plugins/vxe-table.js";

Vue.use(VXETable);
Vue.prototype.$XModal = VXETable.modal;

//安装执行语句 npm install vxe-table-plugin-element element-ui

/* 引入v-viewer插件 */
//npm install v-viewer
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
//Vue.use(Viewer) 默认配置写法
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
  },
});

// 条码
import barcode from "vue-barcode";
Vue.component("syBarcode", barcode);

//表格定义宽度
import columns from "./data/columns.js";
Vue.prototype.$columns = columns;

/* 加载自定义业务组件库 */
import syTrandeUi from "./components/index.js";
Vue.use(syTrandeUi);

// 全局自定义的指令注册
import permission from "./directive/permission";
Vue.use(permission);

// register global utility filters 注册全局的过滤器 ，过滤器使用实例： {{ payAmount | moneyFormatter }}
import * as filters from "./filters/index.js";
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

// 引入应用根组件
import App from "./App.vue";

// 消息提示的环境配置，是否为生产环境
Vue.config.productionTip = false;

// 解决重新指向相同路由提示错误的问题
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);
Vue.prototype.$EventBus = new Vue();

// 页面加载时，读取Storage里的store到store.state中
store.commit("GET_APP_STORAGE");
store.commit("getCss");

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = "小马跟单 - " + to.meta.title;
  } else {
    document.title = "小马跟单";
  }
  // 判断当前路由是否需要登录
  if (to.meta.requireAuth == true) {
    // 是否已登录
    if (store.state.hasLogin) {
      next();
    } else {
      // 未登录，则跳转到登录页面
      store.commit("USER_LOGIN_OUT");
      store.commit("SET_TMP_VALUE", {
        after_login_router: to.path,
      });
      next("/login");
    }
  } else {
    next();
  }

  next();
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

// 加入这段代码, 是为了配置是否运行浏览器识别Vue Devtools插件调试工具， 生产环境中不允许看到vue的调试信息
const isDebugMode = process.env.NODE_ENV !== "production";
Vue.config.debug = isDebugMode;
Vue.config.devtools = isDebugMode;
Vue.config.productionTip = isDebugMode;
