const order_analysis = () =>
  import(/* webpackChunkName: "analysis-index" */ "@/pages/analysis/orderAnalysis/index.vue");
const purchase_analysis = () =>
  import(/* webpackChunkName: "analysis-index" */ "@/pages/analysis/purchaseAnalysis/index.vue");
const routes = [
  {
    path: "/order_analysis",
    component: order_analysis,
    name: "order_analysis",
    meta: {
      title: "订单分析",
      englishTitle:"Order Analysis",
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
    path: "/purchase_analysis",
    component: purchase_analysis,
    name: "purchase_analysis",
    meta: {
      title: "采购分析",
      englishTitle:"Purchase Analysis",
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
