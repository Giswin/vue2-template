const menu_list = [
  {
    name: "N0",
    title: "系统首页",
    icon: "fa-home",
    router: {
      name: "home",
    },
    // right: "Y_MU00_HOMEPAGE",
  },

  {
    name: "N1",
    title: "商品档案",
    icon: "fa-drivers-license-o",
    router: {
      name: "goods_list",
    },
    right: "OP_70_GOODS",
  },
  {
    name: "N2",
    title: "订单管理",
    icon: "fa-file-powerpoint-o",
    router: { name: "order_list" },
    right: "OP_70_ORDER",
  },
  {
    name: "N3",
    title: "采购管理",
    icon: "fa-calendar-check-o",
    router: { name: "purchase_list" },
    right: "OP_70_PURCHASE",
  },
  {
    name: "N4",
    title: "项目管理",
    icon: "fa-institution",
    router: { name: "project_list" },
    right: "OP_70_PROJECT",
  },

  {
    name: "N5",
    title: "出运管理",
    icon: "fa-ship",
    router: { name: "shipment_list" },
    right: "OP_70_SHIPOUT",
  },
  {
    name: "N6",
    title: "统计分析",
    icon: "fa-pie-chart",
    right: "OP_70_BI",
    children: [
      {
        name: "N1302",
        title: "订单分析",
        router: { name: "order_analysis" },
      },
      {
        name: "N1303",
        title: "采购分析",
        router: { name: "purchase_analysis" },
      },
    ],
  },
];
export default menu_list;
