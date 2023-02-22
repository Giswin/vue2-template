import https from "@/https.js";

const shipApi = {
  baseUrl: "/cbm",

  /**
   * 导出报关单信息
   * @param {Object} id 出运报关ID
   */
  exportExcel: async function(id) {
    let values = await https.fetchGet(this.baseUrl + "/ship/shc/exportExcel", {
      id,
    });
    return (await values.data) || {};
  },
  // 获取待通知列表

  getToShipList: async function(condition, paging) {
    let values = await https.fetchPost(
      this.baseUrl + "/ship/shn/getToShipList",
      {
        condition,
        paging,
        onlyGetRecordCount: false,
      }
    );
    return values.data || {};
  },

  //   标识出运状态
  setShipState: async function(order_goods_ids, order_goods_state) {
    let values = await https.fetchPost(
      this.baseUrl + "/ship/shn/setShipState",
      { order_goods_ids, order_goods_state }
    );
    return values.data || {};
  },

  //   新建（生成）出运通知
  shipCreate: async function(order_goods_ids) {
    let values = await https.fetchPost(this.baseUrl + "/ship/shn/create", {
      order_goods_ids,
    });
    return values.data || {};
  },

  //   获取出运通知详情
  getShipInfo: async function(shn_id) {
    let values = await https.fetchGet(this.baseUrl + "/ship/shn/get", {
      shn_id,
    });
    return values.data || {};
  },

  //   编辑出运通知
  shipUpdate: async function(baseInfo, detailInfo) {
    let values = await https.fetchPost(this.baseUrl + "/ship/shn/update", {
      baseInfo,
      detailInfo,
    });
    return values.data || {};
  },

  //   设置出运通知结案，或取消结案
  setShipnoteState: async function(shn_id, type) {
    let values = await https.fetchPost(
      this.baseUrl + "/ship/shn/setShipnoteState",
      {
        shn_id,
        type,
      }
    );
    return values.data || {};
  },
  // 出运明细增行（获取增行后的明细数据）
  addDetail: async function(order_goods_ids) {
    let values = await https.fetchPost(this.baseUrl + "/ship/shn/addDetail", {
      order_goods_ids,
    });
    return values.data || {};
  },

  // 获取运编号（同步主表到ebs）
  getshnEbs: async function(shn_id) {
    let values = await https.fetchPost(this.baseUrl + "/ship/shnEbs/create", {
      shn_id,
    });
    return values.data || {};
  },

  // 获取出运通知列表
  getShipList: async function(condition) {
    let values = await https.fetchPost(this.baseUrl + "/ship/shn/list", {
      condition,
      paging: true,
      onlyGetRecordCount: false,
    });
    return values.data || {};
  },

  // 获取出运通知明细列表
  getDetailList: async function(condition) {
    let values = await https.fetchPost(this.baseUrl + "/ship/shn/detailList", {
      condition,
      paging: true,
      onlyGetRecordCount: false,
    });
    return values.data || {};
  },

  // 发布出运通知
  publishShipNote: async function(shn_id) {
    let values = await https.fetchPost(this.baseUrl + "/ship/shn/publish", {
      shn_id,
    });
    return values.data || {};
  },

  // 撤回出运通知
  withdrawShipNote: async function(shn_id) {
    let values = await https.fetchPost(this.baseUrl + "/ship/shn/withdraw", {
      shn_id,
    });
    return values.data || {};
  },

  // 删除出运通知
  deleteShipNote: async function(shn_ids) {
    let values = await https.fetchPost(this.baseUrl + "/ship/shn/delete", {
      shn_ids,
    });
    return values.data || {};
  },

  // 获取报关单列表
  getCustomList: async function(condition) {
    let values = await https.fetchPost(this.baseUrl + "/ship/shc/list", {
      condition,
      paging: true,
      onlyGetRecordCount: false,
    });
    return values.data || {};
  },

  // 获取报关单详情
  getCustomInfo: async function(shc_id) {
    let values = await https.fetchGet(this.baseUrl + "/ship/shc/get", {
      shc_id,
    });
    return values.data || {};
  },

  // 生成（新建）报关单
  customCreate: async function(shn_ids) {
    let values = await https.fetchPost(this.baseUrl + "/ship/shc/create", {
      shn_ids,
    });
    return values.data || {};
  },

  // 编辑报关单
  customUpdate: async function(baseInfo, noteDetail, shcDetail) {
    let values = await https.fetchPost(this.baseUrl + "/ship/shc/update", {
      baseInfo,
      noteDetail,
      shcDetail,
    });
    return values.data || {};
  },

  // 删除报关单
  customDelete: async function(shc_ids) {
    let values = await https.fetchPost(this.baseUrl + "/ship/shc/delete", {
      shc_ids,
    });
    return values.data || {};
  },

  //  同步出运通知数据
  syncShipNote: async function(shn_id) {
    let values = await https.fetchPost(this.baseUrl + "/ship/shnEbs/sync", {
      shn_id,
    });
    return values.data || {};
  },
  //  撤回同步出运通知数据
  un_syncShipNote: async function(shn_id) {
    let values = await https.fetchPost(
      this.baseUrl + "/ship/shnEbs/un_sync",{shn_id}
      
    );
    return values.data || {};
  },
};

export default shipApi;
