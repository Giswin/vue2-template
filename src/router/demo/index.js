const test1 = () =>
  import(/* webpackChunkName: "home-index" */ "@/pages/demo/test1.vue");
const test2 = () =>
  import(/* webpackChunkName: "home-index" */ "@/pages/demo/test2.vue");
const test3 = () =>
  import(/* webpackChunkName: "home-index" */ "@/pages/demo/test3.vue");
const test4 = () =>
  import(/* webpackChunkName: "home-index" */ "@/pages/demo/test4.vue");
const test5 = () =>
  import(/* webpackChunkName: "home-index" */ "@/pages/demo/test5.vue");


const routes = [

  {
    path: "/demo",
    component: test1,
    name: "demo",
    meta: {
      title: "组件demo",
      requireAuth: false, //需要登录显示
      showHeader: true, //头部显示
      showNav: true, //菜单显示
      showtag: true, //标签显示
      showPosition: true, //显示当前位置
      showClick: true, //全部标签显示
      keepAlive: true, // 需要缓存
    },
  },
  {
    path: "/test2",
    component: test2,
    name: "test2",
    meta: {
      title: "测试1",
      requireAuth: false, //需要登录显示
      showHeader: true, //头部显示
      showNav: true, //菜单显示
      showtag: true, //标签显示
      showPosition: true, //显示当前位置
      showClick: true, //全部标签显示
      keepAlive: true, // 需要缓存
    },
  },
  {
    path: "/test3",
    component: test3,
    name: "test3",
    meta: {
      title: "测试2",
      requireAuth: false, //需要登录显示
      showHeader: true, //头部显示
      showNav: true, //菜单显示
      showtag: true, //标签显示
      showPosition: true, //显示当前位置
      showClick: true, //全部标签显示
      keepAlive: true, // 需要缓存
    },
  },
  {
    path: "/test4",
    component: test4,
    name: "test4",
    meta: {
      title: "测试3",
      requireAuth: false, //需要登录显示
      showHeader: true, //头部显示
      showNav: true, //菜单显示
      showtag: true, //标签显示
      showPosition: true, //显示当前位置
      showClick: true, //全部标签显示
      keepAlive: true, // 需要缓存
    },
  },
  {
    path: "/test5",
    component: test5,
    name: "test5",
    meta: {
      title: "测试4",
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

export default routes;
