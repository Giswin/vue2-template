import https from "@/https.js";

const goodsApi = {
  baseUrl: "/cbm",

  /**
   *  获取商品列表
   * @param condition
   * @returns {Promise<*|{}>}
   */
  getGoodsList: async function(condition) {
    let values = await https.fetchPost(this.baseUrl + "/goods/goods/list", {
      condition,
      paging: true,
      onlyGetRecordCount: false,
    });
    return values.data || {};
  },
  // 获取某个商品的详情信息
  getGoodsInfo: async function(goods_id) {
    let values = await https.fetchGet(
      this.baseUrl + "/goods/goods/get?goods_id=" + goods_id
    );
    return values.data || {};
  },

  // 删除某个商品信息
  deleteGoodsInfo: async function(goods_id) {
    let values = await https.fetchPost(this.baseUrl + "/goods/goods/delete", {
      goods_id,
    });
    return values.data || {};
  },

  // 更新某个商品信息
  updateGoodsInfo: async function(base_info, bom_info) {
    let values = await https.fetchPost(this.baseUrl + "/goods/goods/update", {
      base_info,
      bom_info,
    });
    return values.data || {};
  },

  // 复制某个商品
  copyGoods: async function(goods_id) {
    let values = await https.fetchPost(this.baseUrl + "/goods/goods/copy", {
      goods_id,
    });
    return values.data || {};
  },

  // 获取商品货号列表
  getarticleNumList: async function(goods_cus_id) {
    let values = await https.fetchPost(
      this.baseUrl + "/goods/goods/articleNumList",
      {
        goods_cus_id,
      }
    );
    return values.data || {};
  },

  // 根据货号获取商品信息
  getByArticleNum: async function(goods_article_number) {
    let values = await https.fetchGet(
      this.baseUrl +
        "/goods/goods/getByArticleNum?goods_article_number=" +
        goods_article_number
    );
    return values.data || {};
  },

  // 获取商品的订单记录
  getGoodsOrderRecords: async function(goods_id) {
    let values = await https.fetchGet(
      this.baseUrl + "/goods/goods/getGoodsOrderRecords?goods_id=" + goods_id
    );
    return values.data || {};
  },
};

export default goodsApi;
