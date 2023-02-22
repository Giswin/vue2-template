import https from "@/https.js";

const omApi = {
  baseUrl: "/bms",

  /**
   * 获取业务费用设置
   */
  getBmBsFee: async function() {
    let values = await https.fetchGet(
      this.baseUrl + "/am/getBmBsFee?condition=[]"
    );
    return (await values.data) || [];
  },

  //   汇率
  getExchangeRate: async function(month, year) {
    let values = await https.fetchGet(this.baseUrl +"/am/getExchangeRateAm", {
      month,
      year,
    });
    return (await values.data) || {};
  },
};

export default omApi;