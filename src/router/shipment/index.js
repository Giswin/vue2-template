const shipment_list = () =>
  import(/* webpackChunkName: "shipment" */ "@/pages/shipment/ship_list/ship_list.vue");
const ship_detail = () =>
  import(/* webpackChunkName: "shipment" */ "@/pages/shipment/ship_detail/ship_detail.vue");

const routes = [
  {
    path: "/shipment_list",
    component: shipment_list,
    name: "shipment_list",
    meta: {
      title: "出运管理",
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
    path: "/ship_detail",
    component: ship_detail,
    name: "ship_detail",
    meta: {
      title: "出运详情",
      requireAuth: false, //需要登录显示
      showHeader: true, //头部显示
      showNav: false, //菜单显示
      showtag: true, //标签显示
      showPosition: true, //显示当前位置
      showClick: true, //全部标签显示
      keepAlive: true, // 需要缓存
      canMultipleOpen: true,
    },
  },
];

export default routes;
