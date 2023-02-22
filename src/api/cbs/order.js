import https from "@/https.js";

const orderApi = {
  baseUrl: "/cbm",

  /**
   *  获取订单列表
   * @param condition
   * @returns {Promise<*|{}>}
   */
  getOrderList: async function(condition) {
    let values = await https.fetchPost(this.baseUrl + "/order/order/list", {
      condition,
      paging: true,
      onlyGetRecordCount: false,
    });
    return values.data || {};
  },
  // 获取某个订单的详情信息
  getOrderInfo: async function(order_id) {
    let values = await https.fetchGet(
      this.baseUrl + "/order/order/get?order_id=" + order_id
    );
    return values.data || {};
  },

  // 获取某个订单的详情信息
  getOrderDetail: async function(order_id,bms_id) {
    let values = await https.fetchGet(
      this.baseUrl + "/order/order/getDetail?order_id=" + order_id+"&bms_id="+bms_id
    );
    return values.data || {};
  },

  // 删除某个订单
  deleteOrderInfo: async function(order_id) {
    let values = await https.fetchPost(this.baseUrl + "/order/order/delete", {
      order_id,
    });
    return values.data || {};
  },
  //设置订单状态
	setOrderState: async function(order_id,state) {
    let values = await https.fetchPost(this.baseUrl + "/order/order/setOrderState", {
      order_id,state
    });
    return values.data || {};
  },
  // 更新某个订单信息
  updateOrderInfo: async function(baseInfo, goodsInfo) {
    let values = await https.fetchPost(this.baseUrl + "/order/order/update", {
      baseInfo,
      goodsInfo,
    });
    return values.data || {};
  },

  // 复制某个订单
  copyOrder: async function(order_id) {
    let values = await https.fetchPost(this.baseUrl + "/order/order/copy", {
      order_id,
    });
    return values.data || {};
  },

  // 订单进度列表查询
  progressList: async function(condition) {
    let values = await https.fetchPost(
      this.baseUrl + "/order/order/progressList",
      {
        condition,
        paging: true,
        onlyGetRecordCount: false,
      }
    );
    return values.data || {};
  },

  // 入库登记
  warehouseReg: async function(
    order_goods_bom_id,
    order_goods_bom_storage_info
  ) {
    let values = await https.fetchPost(
      this.baseUrl + "/order/order/warehouseReg",
      {
        order_goods_bom_id,
        order_goods_bom_storage_info,
      }
    );
    return values.data || {};
  },

  // 跟踪信息登记
  trackInfoReg: async function(
    order_goods_bom_id,
    order_goods_bom_tracking_info
  ) {
    let values = await https.fetchPost(
      this.baseUrl + "/order/order/trackInfoReg",
      {
        order_goods_bom_id,
        order_goods_bom_tracking_info,
      }
    );
    return values.data || {};
  },

  // 订单明细状态登记
  orderDetailStateReg: async function(
    order_goods_id,
    order_goods_state,
    order_goods_abort_reason
  ) {
    let values = await https.fetchPost(
      this.baseUrl + "/order/order/orderDetailStateReg",
      {
        order_goods_id,
        order_goods_state,
        order_goods_abort_reason,
      }
    );
    return values.data || {};
  },

  // 订单发布
  orderPublish: async function(order_id) {
    let values = await https.fetchPost(this.baseUrl + "/order/order/publish", {
      order_id,
    });
    return values.data || {};
  },

  // 撤回
  orderWithdraw: async function(order_id) {
    let values = await https.fetchPost(this.baseUrl + "/order/order/withdraw", {
      order_id,
    });
    return values.data || {};
  },

  //变更
  orderChange: async function(order_id,change_reason) {
    let values = await https.fetchPost(this.baseUrl + "/order/order/change", {
      order_id,
      change_reason
    });
    return values.data || {};
  },

  //同步
  orderSync: async function(order_id) {
    let values = await https.fetchPost(this.baseUrl + "/order/order/syncOrder", {
      order_id
    });
    return values.data || {};
  },
  //同步订单审批
  syncOrderAudingRecord: async function(order_id) {
    let values = await https.fetchPost(this.baseUrl + "/order/order/syncOrderAudingRecord", {
      order_id
    });
    return values.data || {};
  },


  //获取订单审批工作流列表
	getOrderApprFlowList: async function(order_id) {
    let values = await https.fetchGet(this.baseUrl + "/order/order/flowList?order_id=" + order_id);
    return values.data || [];
  },

  //获取当前工作流任务
	getOrderCurrentTaskList: async function(order_id) {
    let values = await https.fetchGet(this.baseUrl + "/order/order/currentTask?order_id=" + order_id);
    return values.data || [];
  },

  // 执行订单审批工作流
  executeAprvFlow: async function(order_id,result,memo) {
    let values = await https.fetchPost(this.baseUrl + "/order/order/executeAprv", {
      order_id,
      result,
      memo
    });
    return values.data || {};
  },

  // 变更信息
  getChangeInfo: async function(order_id) {
    let values = await https.fetchGet(this.baseUrl + "/order/order/changeList?order_id=" + order_id);
    return values.data || {};
  },

  // 待采购物料查询
  getPrePurchaseList: async function(condition) {
    let values = await https.fetchPost(this.baseUrl + "/order/getPrePurchaseList", {
      condition,
      paging: true,
      onlyGetRecordCount: false,
    });
    return values.data || {};
  },

  // 批量设置订单成本供应商
  setBomVender: async function(order_goods_bom_ids,order_goods_bom_ven_id,order_goods_bom_ven_name) {
    let values = await https.fetchPost(this.baseUrl + "/order/order/batchSetBom", {
      order_goods_bom_ids,
      order_goods_bom_ven_id,
      order_goods_bom_ven_name,
    });
    return values.data || {};
  },
  

  

  
  
};

export default orderApi;
