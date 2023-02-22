import https from "@/https.js";

const analysisApi = {
  baseUrl: "/cbm",

  // 订单汇总分析
  getAnalysisSummary: async function(condition) {
    let values = await https.fetchGet(
      this.baseUrl + "/order/order/getAnalysisSummary",
      { condition }
    );
    return values.data || {};
  },

  //   订单明细分析
  getOrderDetail: async function() {
    let values = await https.fetchGet(
      this.baseUrl + "/order/order/getAnalysisDetail"
    );
    return values.data || {};
  },

  //   获取某客户订单的商品标签分析数据
  getAnalysisLabel: async function(condition) {
    let values = await https.fetchGet(
      this.baseUrl + "/order/order/getAnalysisLabel",
      { condition }
    );
    return values.data || {};
  },

  // 获取供应商采购汇总分析
  getAnalysisVen: async function(condition) {
    let values = await https.fetchGet(
      this.baseUrl + "/purchase/contract/getAnalysisVen",
      { condition }
    );
    return values.data || {};
  },

  // 获取供应商采购汇总分析明细
  getAnalysisVenDetail: async function(condition) {
    let values = await https.fetchGet(
      this.baseUrl + "/purchase/contract/getAnalysisVenDetail",
      { condition }
    );
    return values.data || {};
  },

  // 获取采购员汇总分析
  getAnalysisPer: async function(condition) {
    let values = await https.fetchGet(
      this.baseUrl + "/purchase/contract/getAnalysisPer",
      { condition }
    );
    return values.data || {};
  },

  // 获取采购明细分析
  getAnalysisDetail: async function(condition) {
    let values = await https.fetchGet(
      this.baseUrl + "/purchase/contract/getAnalysisDetail",
      { condition }
    );
    return values.data || {};
  },

  // 获取出运分析数据
  getshipDetail: async function(condition) {
    let values = await https.fetchGet(this.baseUrl + "/ship/shn/getAnalysis", {
      condition,
    });
    return values.data || {};
  },

  // 获取某客户出运的商品标签分析数据
  getshipLabel: async function(condition) {
    let values = await https.fetchGet(
      this.baseUrl + "/ship/shn/getAnalysisLabel",
      {
        condition,
      }
    );
    return values.data || {};
  },
};

export default analysisApi;
