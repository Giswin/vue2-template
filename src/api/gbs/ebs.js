import https from "@/https.js";

const ebsApi = {
  baseUrl: "/bms",

  // 获取库存组织
  getEbsStock: async function(region) {
    let values = await https.fetchGet(
      this.baseUrl + "/ebs/getEbsData?api=get_stock_org&params=&path=" + region
    );
    return (await values.data) || {};
  },

  // 获取EBS商品
  getEbsGoods: async function(organization_id, region) {
    let values = await https.fetchGet(
      this.baseUrl +
        "/ebs/getEbsData?api=get_goodslist&params=organization_id=" +
        organization_id +
        "&path=" +
        region
    );
    return (await values.data) || {};
  },
 

  /**
	 * EBS采购合同预览
	 */
	getOrderProductEbsList: async function(odpc_id){
		let values = await https.fetchGet(this.baseUrl+"/ebs/getOrderProductEbsList?odpc_id="+odpc_id,{});
		return await values.data || {};
	},

  /**
	 * EBS同步加工合同预览
	 */
	getOrderProcessEbsList: async function(odmc_id){
		let values = await https.fetchGet(this.baseUrl+"/ebs/getOrderProcessEbsList?odmc_id="+odmc_id,{});
		return await values.data || {};
	},
  
  /**
	 * EBS获取数据
	 */
	getEbsData: async function(api,params,path){
		let values = await https.fetchGet(this.baseUrl+"/ebs/getEbsData/",{api,params,path});
		return await values.data || {};
	},
	
	
	
};

export default ebsApi;
