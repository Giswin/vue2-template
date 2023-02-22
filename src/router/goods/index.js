const goods_list = () =>
  import(/* webpackChunkName: "goods-index" */ "@/pages/goods/goods_list.vue");
const gant = () =>
  import(/* webpackChunkName: "home-index" */ "@/pages/Gant/pages/demo/test.vue");
const routes = [
	{
	  path: "/gant",
	  component: gant,
	  name: "gant",
	  meta: {
	    title: "甘特图",
	    requireAuth: false, //需要登录显示
	    showHeader: false, //头部显示
	    showNav: true, //菜单显示
	    showtag: true, //标签显示
	    showPosition: true, //显示当前位置
	    showClick: true, //全部标签显示
	    keepAlive: true, // 需要缓存
	  },
	},
  {
    path: "/goods_list",
    component: goods_list,
    name: "goods_list",
    meta: {
      title: "商品档案",
      englishTitle:"Goods",
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
