import https from "@/https.js";

const purchaseApi = {
  baseUrl: "/cbm",

  /**
   *  获取合同列表
   * @param condition
   * @returns {Promise<*|{}>}
   */
   getContractList: async function(condition) {
    let values = await https.fetchPost(this.baseUrl + "/purchase/contract/list", {
      condition,
      
    });
    return values.data || {};
  },

  // 获取合同信息
  getContractInfo: async function(contract_id,bms_id,type) {
    let values = await https.fetchGet(
      this.baseUrl + "/purchase/contract/get?contract_id=" + contract_id+"&bms_id="+bms_id+'&type='+type
    );
    return values.data || {};
  },

  // 复制某个合同
  copyContract: async function(contract_id) {
    let values = await https.fetchPost(this.baseUrl + "/purchase/contract/copy", {
        contract_id,
    });
    return values.data || {};
  },
 
  // 删除某个合同
  deleteContract: async function(contract_id) {
    let values = await https.fetchPost(this.baseUrl + "/purchase/contract/delete", {
        contract_id,
    });
    return values.data || {};
  },


  //更新合同信息
  updateContractInfo: async function(baseInfo,detailInfo) {
      let values = await https.fetchPost(this.baseUrl + "/purchase/contract/update", {
          baseInfo,
          detailInfo,
      });
      return values.data || {};
  },

    //获取订单合同列表
  getOrderContractList: async function(order_id) {
    let values = await https.fetchGet(this.baseUrl + "/purchase/contract/getOrderContractList?order_id=" + order_id
    );
    return values.data || {};
  },

  // 发布
  contractPublish: async function(contract_id) {
    let values = await https.fetchPost(this.baseUrl + "/purchase/contract/publish", {
      contract_id,
    });
    return values.data || {};
  },

  // 撤回
  contractWithdraw: async function(contract_id) {
    let values = await https.fetchPost(this.baseUrl + "/purchase/contract/withdraw", {
      contract_id,
    });
    return values.data || {};
  },
  
  // 变更
  contractChange: async function(contract_id,change_reason) {
    let values = await https.fetchPost(this.baseUrl + "/purchase/contract/change", {
      contract_id,
      change_reason
    });
    return values.data || {};
  },

   // 同步
   contractSync: async function(contract_id) {
    let values = await https.fetchPost(this.baseUrl + "/purchase/contract/syncContract", {
      contract_id
    });
    return values.data || {};
  },
  //同步审批记录
  syncContractAudingRecord: async function(contract_id) {
    let values = await https.fetchPost(this.baseUrl + "/purchase/contract/syncContractAudingRecord", {
      contract_id
    });
    return values.data || {};
  },
  

  //获取合同审批工作流列表
	getContractFlowList: async function(contract_id) {
    let values = await https.fetchGet(this.baseUrl + "/purchase/contract/flowList?contract_id=" + contract_id);
    return values.data || [];
  },
    
    //获取合同当前任务
    getContractCurrentTaskList: async function(contract_id) {
        let values = await https.fetchGet(this.baseUrl + "/purchase/contract/currentTask?contarct_id=" + contract_id);
        return values.data || [];
    },

    // 执行合同审批
    executeAprvContract: async function(contract_id,result,memo) {
        let values = await https.fetchPost(this.baseUrl + "/purchase/contract/executeAprv", {
          contract_id,
            result,
            memo
        });
        return values.data || {};
    },
	//设置合同状态 2 在手 5 终止 6 完成
	setContractState: async function(contract_id,state) {
    let values = await https.fetchPost(this.baseUrl + "/purchase/contract/setContractState", {
      contract_id,state
    });
    return values.data || {};
  },
};

export default purchaseApi;