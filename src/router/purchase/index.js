const purchase_list = () =>
  import(/* webpackChunkName: "purchase" */ "@/pages/purchase/purchase_list.vue");

const routes = [
  {
    path: "/purchase_list",
    component: purchase_list,
    name: "purchase_list",
    meta: {
      title: "采购管理",
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
