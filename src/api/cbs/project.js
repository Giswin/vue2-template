import https from "@/https.js";

const projectApi = {
  baseUrl: "/cbm",
	/**
	 * EBS同步预算预览
	 */
	getOrderEbsList: async function(ode_id){
		let values = await https.fetchGet(this.baseUrl+"/project/getOrderEbsList?ode_id="+ode_id,{});
		return await values.data || {};
	},
	/**
	 * EBS测算同步
	 */
	syncProject_nx: async function(ode_id){
		let values = await https.fetchPost(this.baseUrl+"/project/syncProject_nx",{ode_id});
		return await values.data || {};
	},
	updateOrderEbsList:async function(ebs_head,ebs_line,ebs_cost,type){
		let values = await https.fetchPost(this.baseUrl+"/project/updateOrderEbsList/",{ebs_head,ebs_line,ebs_cost,type});
		return await values.data || {};
	},
	/**获取默认的项目信息
	 * @param {Object} condition
	 */
	getDefaultProject:async function(ode_id){
		let values = await https.fetchGet(this.baseUrl+"/project/getDefaultProject?ode_id="+ode_id,{});
		return await values.data || {};
	},
	
  //   项目列表查询
  getProjectList: async function(condition) {
    let values = await https.fetchPost(this.baseUrl + "/project/project/list", {
      condition,
      paging: true,
      onlyGetRecordCount: false,
    });
    return values.data || [];
  },
	// 项目删除
  deleteProject: async function(ode_id) {
    let values = await https.fetchPost(this.baseUrl + "/project/deleteProject", {ode_id});
    return values.data || [];
  },
  // 项目取消
  cancelProject: async function(ode_id) {
    let values = await https.fetchPost(this.baseUrl + "/project/cancelProject", {ode_id});
    return values.data || [];
  },
  //   获取项目信息（预算信息）
  getBudgetInfo: async function(ode_id) {
    let values = await https.fetchGet(this.baseUrl + "/project/project/get", {
      ode_id,
    });
    return values.data || {};
  },
  // 获取销售合同列表
  getSalesContractList: async function(ode_id) {
    let values = await https.fetchGet(
      this.baseUrl + "/project/project/getSalesContractList",
      { ode_id }
    );
    return values.data || [];
  },

  //   获取采购合同列表
  getPurchaseContractList: async function(ode_id) {
    let values = await https.fetchGet(
      this.baseUrl + "/project/project/getPurchaseContractList",
      { ode_id }
    );
    return values.data || [];
  },

  //   获取加工合同列表
  getProcessContractList: async function(ode_id) {
    let values = await https.fetchGet(
      this.baseUrl + "/project/project/getProcessContractList?ode_id=" + ode_id
    );
    return values.data || [];
  },

  //   获取项目决算列表
  getFinalList: async function(ode_id) {
    let values = await https.fetchGet(
      this.baseUrl + "/project/project/getFinalAccountList",
      { ode_id }
    );
    return values.data || [];
  },

  //   获取出运列表
  getShipList: async function(ode_id) {
    let values = await https.fetchGet(
      this.baseUrl + "/project/getShipList?ode_id=" + ode_id
    );
    return values.data || [];
  },

  //根据出运生成决算信息
  buildErpEndProjectByShipinfo: async function(ode_id,ship_array) {
    let values = await https.fetchPost(
      this.baseUrl + "/project/buildErpEndProjectByShipinfo",
      {
        ode_id,
        ship_array,
      }
    );
    return values.data || [];
  },
  // 获取决算信息

  // 更新决算信息
	 
  //创建项目号
  createProject: async function(order_id) {
    let values = await https.fetchPost(
      this.baseUrl + "/project/createProject",
      {
        order_id,
      }
    );
    return values.data || [];
  },

  // 创建测算项目号

  createCalProject: async function(
    titleID,
    titleName,
    DepartmentID,
    salesID,
    projectTypeID,
    projectTypeName
  ) {
    let values = await https.fetchPost(
      this.baseUrl + "/project/createBudgetCode",
      {
        titleID,
        titleName,
        DepartmentID,
        salesID,
        projectTypeID,
        projectTypeName,
      }
    );
    return values.data || {};
  },

  //同步预算
  projectSync: async function(project_id) {
    let values = await https.fetchPost(
      this.baseUrl + "/project/project/syncProject",
      {
        project_id,
      }
    );
    return values.data || {};
  },

  //批量同步
  batchSync: async function(obj_array) {
    let values = await https.fetchPost(
      this.baseUrl + "/project/batchImportAuditRecord",
      {
        obj_array,
      }
    );
    return values.data || {};
  },
  /**
   * EBS决算数据生成
   */
  buildErpEndProject: async function(ode_id,odpe_id,product_type){
  	let values = await https.fetchPost(this.baseUrl+"/project/buildErpEndProject/",{ode_id,odpe_id,product_type});
  	return await values.data || {};
  },
  
  /**
   * EBS决算合同预览
   */
  getOrderProjectEbsList: async function(odpe_id){
  	let values = await https.fetchGet(this.baseUrl+"/project/getOrderProjectEbsList",{odpe_id});
  	return await values.data || {};
  },
  
  
  /**
   * EBS决算合同数据同步
   */
  updateErpEndProject: async function(ebs_head,ebs_line,ebs_cost,ebs_ship,flag){
  	let values = await https.fetchPost(this.baseUrl+"/project/updateErpEndProject/",{ebs_head,ebs_line,ebs_cost,ebs_ship,flag});
  	return await values.data || {};
  },
  
  
  /**
   * EBS删除指定决算合同
   */
  delOrderProject: async function(odpe_id,type){
  	let values = await https.fetchPost(this.baseUrl+"/project/delOrderProject/",{odpe_id,type});
  	return await values.data || {};
  },
  
  //   获取项目决算列表
  getContractCodeList: async function(contract_category) {
    let values = await https.fetchGet(
      this.baseUrl + "/project/project/getContractCodeList",
      { contract_category }
    );
    return values.data || [];
  },

};

export default projectApi;
