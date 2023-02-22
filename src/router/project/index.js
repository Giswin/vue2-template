const project_list = () =>
  import(/* webpackChunkName: "project" */ "@/pages/project/project_list.vue");

const project_detail = () =>
  import(/* webpackChunkName: "project" */ "@/pages/project/project_detail.vue");

const routes = [
  {
    path: "/project_list",
    component: project_list,
    name: "project_list",
    meta: {
      title: "项目管理",
      englishTitle:"Project",
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
    path: "/project_detail",
    component: project_detail,
    name: "project_detail",
    meta: {
      title: "项目详情",
      englishTitle:"Project Detail",
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
