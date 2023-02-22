import https from "@/https.js";
import config from "@/config/config.js";
const ifsApi = {
  /**
   * 获取部门列表树
   * @param date
   * @param type type=1 包含注销和虚拟部门  type=2 去除注销和虚拟部门
   * @param expand 1 树默认展开， 0 默认关闭
   * @returns {Promise<*|{}>}
   */
  getList: async function(date, type, expand) {
    if (date == null) {
      date = "";
    }
    let values = await https.fetchGet(
      "/ifs/rs/department/tree?date=" +
        date +
        "&type=" +
        type +
        "&expand=" +
        expand
    );
    return (await values.data) || {};
  },

  /**
   *  获取所有部门（注销除外）部分级次，不分顺序
   * @param type type=1 包含虚拟部门  type=2 去除虚拟部门
   * @returns {Promise<*|{}>}
   */
  getDepAll: async function(type) {
    let values = await https.fetchGet("/ifs/rs/department/list?type=" + type);
    return (await values.data) || {};
  },

  /**
   * 获取部门数据 去除注销和虚拟部门
   *
   * @returns {Promise<*|{}>}
   */
  depList: async function() {
    let values = await https.fetchGet("/ifs/rs/department/tree?type=2");
    return (await values.data) || {};
  },

  /**
   * 获取人员列表
   * @param dep_id        部门ID
   * @param keyword      关键字搜索
   * @param condition    过滤条件
   * @param page        第几页
   * @param per_page    每页数据量
   * @param no_paging   true:不分页
   * @returns {Promise<*|{}>}
   */
  getPersonList: async function(
    dep_id,
    keyword,
    condition,
    page,
    per_page,
    no_paging,
    no_rang
  ) {
    let con = {};
    if (condition.length == 0) {
      con = { office: 1 };
    } else {
      con = JSON.parse(condition);
      con.office = 1;
    }
    let values = await https.fetchGet("/ifs/rs/staff/recList", {
      dep_id,
      keyword,
      condition: con,
      page,
      per_page,
      no_paging,
      no_rang,
    });
    return (await values.data) || {};
  },

  /**
   * 获取账号信息
   *
   * */
  getPersonInfo: async function(uac_object_id) {
    let values = await https.fetchGet("/ifs/ua/account/getAccountList", {
      uac_object_id: uac_object_id,
    });
    return (await values.data) || {};
  },

  /**
   * 获取人员信息
   *
   * */
  getRangeStaffs: async function(position) {
    let values = await https.fetchGet("ifs/ifs/user/getRangeStaffs", {
      position: position,
    });
    return (await values.data) || {};
  },

  /**
   * 获取带配置权限的人员
   */
  getRangStaffs: async function(staff_id) {
    let values = await https.fetchGet("/ifs/rs/staff/info", {
      staff_id: staff_id,
    });
    return (await values.data) || {};
  },

  /**
   * 获取人员信息
   *
   * */
  getStaffInfo: async function(staff_id) {
    let values = await https.fetchGet("/ifs/rs/staff/info", {
      staff_id: staff_id,
    });
    return (await values.data) || {};
  },

  /**
   * 获取租户抬头
   */
  getTitlelist: async function() {
    let values = await https.fetchGet("/ifs/co/tenant/" + config.TENANT_ID);
    return (await values.data.data) || [];
  },

  /**
   * 获取客户列表
   */
  getCustomerList: async function() {
    let values = await https.fetchGet("/ifs/rs/customer/select", {
      noPaging: true,
    });
    return (await values.data.data) || [];
  },

  //获取订单导入配置
  getImportInfo: async function() {
    let values = await https.fetchGet("/ifs/rs/customer/getImportInfo");
    return (await values.data.data) || [];
  },

  /**
   * 获取客户列表
   */
  getCustomerData: async function(cus_id) {
    let values = await https.fetchGet(`/ifs/rs/customer/${cus_id}`, { cus_id });
    return (await values.data) || {};
  },

  /**
   * 获取供应商列表
   */
  getVenderList: async function() {
    let values = await https.fetchGet("/ifs/rs/vender/select", {
      noPaging: true,
    });
    return (await values.data.data) || {};
  },

  /**
   * 获取指定供应商
   */
  getVenderData: async function(ven_id) {
    let values = await https.fetchGet(`/ifs/rs/vender/${ven_id}`, { ven_id });
    return (await values.data) || {};
  },

  /**
   * 取字典表树数据
   * @param dic_code
   * @returns {Promise<*>}
   */
  dicData: async function(dic_code) {
    let request = await https.fetchGet("/ifs/ifs/dic/tree", {
      dic_code: dic_code,
    });
    if (!dic_code) {
      return (await request.data.data) || [];
    } else {
      return (await request.data.data[0]) || [];
    }
  },

  /**
   * 取字典表所有数据
   */
  dicDataAll: async function(dic_code) {
    let request = await https.fetchGet("/ifs/ifs/dic/children", {
      dic_code: dic_code,
    });
    return (await request.data.data) || [];
  },

  /**
   * 取当前对象所有审批流实例
   */
  getFlowRecords: async function(wf_code, wfr_object_id) {
    let request = await https.fetchGet("/ifs/wf/workflow/getFlowRecords", {
      wfCode: wf_code,
      object_inc_id: wfr_object_id,
    });
    return (await request.data.data) || [];
  },

  /**
   * 保存审批流实例
   */
  saveFlowRecords: async function(arr) {
    let request = await https.fetchPost("/ifs/wf/workflow/saveFlowRecords", {
      data: arr,
    });
    return (await request.data.data) || [];
  },

  /**
   * 获取指定账号的home页消息列表
   */
  messageList: async function(conditions, keyword, no_paging, per_page, page) {
    let request = await https.fetchGet("/ifs/me/selectMessageList", {
      conditions,
      keyword,
      no_paging,
      per_page,
      page,
    });
    return (await request.data) || [];
  },

  /**
   * 消息失效
   */
  logoutMessage: async function(me_id, me_state) {
    let request = await https.fetchGet("/ifs/me/logoutMessage", {
      me_id,
      me_state,
    });
    return (await request.data) || [];
  },

  /**
   * 获取港口列表数据
   */
  getPorts: async function(port_ship, port_des) {
    let request = await https.fetchGet("/ifs/ifs/public/getPorts", {
      port_ship,
      port_des,
    });
    return (await request.data) || [];
  },

  /**
   * 获取附件记录
   */
  getAttach: async function(object_keyid, object_name, attach_class) {
    let request = await https.fetchGet("/ifs/ifs/attach/select", {
      object_keyid,
      object_name,
      attach_class,
    });
    return (await request.data) || [];
  },

  /**
   * 获取选项
   */
  getOptions: async function(option_code) {
    let values = await https.fetchGet(`/ifs/ifs/option/getOptions`, {
      option_code,
    });
    return (await values.data.data) || {};
  },

  /**
   * 获取指定交易方
   */
  getVenderDataList: async function(trader_name, ebs_path) {
    let condition = {
      conditions: {
        trader_class: "服装",
        trader_name: trader_name,
        trader_name_en: trader_name,
        ebs_path: ebs_path,
      },
      no_paging: true,
    };
    let values = await https.fetchGet(`/ifs/rs/trader/list`, condition);
    return (await values.data) || {};
  },

  /**
   * 获取指定部门数据
   *
   * @returns {Promise<*|{}>}
   */
  getDepList: async function(id) {
    let values = await https.fetchGet("/ifs/rs/department/info/?dep_id=" + id);
    return (await values.data) || {};
  },

  /**
   * 获取ebs国家
   */
  getEbsCountry: async function() {
    let request = await https.fetchGet("/ifs/km/ebsCountry", {});
    return (await request.data) || [];
  },

  /**
   * 金额转英文
   */
  toENMoney: async function(money) {
    let values = await https.fetchGet(
      "/ifs/ifs/public/toENMoney?money=" + money
    );
    return (await values.data) || {};
  },
  /**
   *  手动更新EBS甲骨文交易方状态并且获取状态信息
   * @param party_id 交易方ID
   * @param ebs_title 账号类型
   * @returns {Promise<*|{}>}
   */
  doUpdateEbsTraderState: async function(party_id, ebs_title) {
    let values = await https.fetchGet("/ifs/rs/trader/doUpdateEbsTraderState", {
      party_id,
      ebs_title,
    });
    return (await values.data) || {};
  },
};

export default ifsApi;
