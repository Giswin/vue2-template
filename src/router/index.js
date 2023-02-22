import VueRouter from "vue-router";
//const home = () => import( /* webpackChunkName: "home-index" */ '@/pages/home.vue')

import home from "@/pages/home.vue";

// 引入根路由页面组件
import login from "@/pages/login.vue";

const root_routes = [
  //这个是空白页面，重新加载当前页面会用到
  {
    name: "blank",
    path: "/blank",
  },
  {
    path: "/",
    redirect: "/home",
    name: "root",
    meta: {
      title: "系统首页",
      requireAuth: false,
    },
  },
  {
    path: "/home",
    component: home,
    name: "home",
    meta: {
      title: "系统首页",
      requireAuth: false, //需要登录显示
      showHeader: true, //头部显示
      showNav: true, //菜单显示
      showtag: true, //标签显示
      showPosition: true, //显示当前位置
      showClick: true, //全部标签显示
      keepAlive: true, // 需要缓存
    },
  },
];

// 引入demo模块路由
// import goods from "./goods";
// import order from "./order";
// import purchase from "./purchase";
// import project from "./project";
// import shipment from "./shipment";
// import analysis from "./analysis";
 
// 合并模块路由
const routes = [
  ...root_routes,
  // ...goods,
  // ...order,
  // ...purchase,
  // ...project,
  // ...shipment,
  // ...analysis,
  
];

// 创建路由控制器
const router = new VueRouter({
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      //如果savedPosition存在，滚动条会自动跳到记录的值的地方
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0,
      }; //savedPosition也是一个记录x轴和y轴位置的对象
    }
  },
});

export default router;
