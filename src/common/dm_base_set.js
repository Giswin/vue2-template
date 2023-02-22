import https from "@/https.js";
import store from "@/store/index.js";
import config from "@/config/config.js";
import XEUtils from "xe-utils";
/**
 * 文档说明：基础数据调用模块对象JS，调用对象里的对应数据集方法，可返回数据
 * 使用方法：外部调用的时候，要用 asyc  await 方式
 */

const dmBaseSet = {
  baseUrl: "/ifs",

  datalist: {
    customerData: null,
    venderData: null,
    //货代
    forwardData: null,
    departmentData: null,
    serviceData: null,
    personData: null,
    documentData: null,
    accRightsData: null,
    exchangeRateData: null,

    deptreeData: null,
    shippingData: null,
    traderData: null,

    // 国家地区
    countryData: null,
    // 公司信息
    companyData: null,
    // 系统选项
    optionsData: null,
    // 字典项
    dicData: null,
    // 出运港
    sPostData: null,
    // 目的港
    ePostData: null,
    // 尺码组
    sizeGroupData: null,
  },

  // 可一次获取后载入缓存的数据
  loadData() {
    this.getsPostData();
    this.getePostData();

    this.companyData();
    this.getOptions();
    this.getDicAllData();

    this.serviceData();
    this.traderData();
    this.customerData();
    this.venderData();
    this.forwardData();
    this.departmentData();
    this.personData();

    this.sampDepData();
    this.sizeGroupData();
    this.countryData();
    this.getExchangeRateAm();
  },

  getsPostData: async function() {
    if (this.datalist["sPostData"] != null) {
      return this.datalist["sPostData"];
    }
    let request = await https.fetchGet("/ifs/ifs/public/getPorts", {
      port_ship: 1,
      port_des: 0,
    });
    this.datalist["sPostData"] = request.data || [];
    return this.datalist["sPostData"];
  },
  getePostData: async function() {
    if (this.datalist["ePostData"] != null) {
      return this.datalist["ePostData"];
    }
    let request = await https.fetchGet("/ifs/ifs/public/getPorts", {
      port_ship: 0,
      port_des: 1,
    });
    this.datalist["ePostData"] = request.data || [];
    return this.datalist["ePostData"];
  },

  // 公司抬头
  getTitleData: async function() {
    let company = await this.companyData();
    return company && company.tnt_title ? company.tnt_title : [];
  },

  /**
   * 获取选项
   */
  getOptions: async function() {
    if (this.datalist["optionsData"] != null) {
      return this.datalist["optionsData"];
    }
    let request = await https.fetchGet(this.baseUrl + `/ifs/option/getOptions`);
    this.datalist["optionsData"] = (await request.data.data) || [];
    return (await request.data.data) || {};
  },

  // 账号所有权限操作项
  accRightsData: async function(acc_id) {
    if (this.datalist["accRightsData"] != null) {
      return this.datalist["accRightsData"];
    }
    if (!acc_id) {
      acc_id = store.state.user.uid;
    }
    let request = await https.fetchGet(
      this.baseUrl + "/ifs/user/getRights/" + acc_id,
      {}
    );
    this.datalist["accRightsData"] = (await request.data.data) || [];
    return (await request.data.data) || [];
  },

  // 字典数据集
  dicData: async function(dic_code) {
    let request = await https.fetchGet(this.baseUrl + "/ifs/dic/tree", {
      dic_code: dic_code,
    });
    if (!dic_code) {
      return (await request.data.data) || [];
    } else {
      return (await request.data.data[0]) || [];
    }
  },

  // 获取所有字典，返回的是tree
  getDicAllData: async function() {
    if (this.datalist["dicData"] != null) {
      return this.datalist["dicData"];
    } else {
      let request = await https.fetchGet(this.baseUrl + "/ifs/dic/tree");
      this.datalist["dicData"] = request.data.data || [];
      return this.datalist["dicData"];
    }
  },

  /**
   * 获取字典
   * @param {string} dic_code 字典编码，多个编码用逗号拼接
   */
  filterDic: async function(dic_code) {
    let codes = dic_code.split(",");

    // 1、获取所有字典
    let dicList = await this.getDicAllData();
    if (dicList.length < 1 || !dic_code) return dicList;

    // 2、第一次筛选后，得到符合的主节点字典 （这样做的目的是为了减少第二次筛选递归循环的次数）
    let mainDics = XEUtils.filter(
      dicList,
      (dic) => dic_code.indexOf(dic.dic_code) > -1
    );

    // 3、定义的递归筛选函数
    const treeSearch = function(dics, code) {
      for (let j = 0; j < dics.length; j++) {
        if (dics[j].dic_code === code) {
          // 找到直接返回
          return dics[j];
        } else if (code.indexOf(dics[j].dic_code) > -1) {
          // 如果是模糊匹配到，那么说明可能要找的字典是在它的子级里，那么继续查找它的子级
          if (dics[j].children && dics[j].children.length > 0) {
            return treeSearch(dics[j].children, code);
          }
        }
      }
      return false;
    };

    /**
         * 这边要注意，如果参数为一个字典编码，返回结构为 {字典信息}
         * 如果参数为多个字典编码，返回结构为:
         * {
             字典编码1: {字典信息}, 
             字典编码2: {字典信息}
            }
         */
    let result = {};

    // 4、第二次筛选
    if (codes.length == 1) {
      // 如果传的参数只有一个字典编码，并且等于某个主字典编码，那么就直接返回这个主字典
      let rs = XEUtils.find(dicList, (dic) => dic.dic_code === dic_code);
      if (rs) {
        return rs;
      } else {
        result = treeSearch(mainDics, codes[0]);
      }
    } else {
      for (let i = 0; i < codes.length; i++) {
        let sDic = treeSearch(mainDics, codes[i]);
        if (sDic) {
          result[codes[i]] = sDic;
        }
      }
    }

    return result;
  },

  // 公司抬头信息
  companyData: async function() {
    if (this.datalist["companyData"] != null) {
      return this.datalist["companyData"];
    }
    let request = await https.fetchGet(
      this.baseUrl + "/co/tenant/" + config.TENANT_ID
    );
    this.datalist["companyData"] = request.data.data || [];
    return this.datalist["companyData"];
  },

  // 客户数据集
  customerData: async function() {
    if (this.datalist["customerData"] != null) {
      return this.datalist["customerData"];
    }
    let traderData = await this.traderData();

    this.datalist["customerData"] = traderData.filter(
      (item) =>
        item.trader_property && item.trader_property.indexOf("客户") != -1
    );
    return this.datalist["customerData"] || [];
  },

  // 供应商数据集
  venderData: async function() {
    if (this.datalist["venderData"] != null) {
      return this.datalist["venderData"];
    }
    let traderData = await this.traderData();

    this.datalist["venderData"] = traderData.filter(
      (item) =>
        item.trader_property && item.trader_property.indexOf("供应商") != -1
    );
    return this.datalist["venderData"] || [];
  },
  // 货代数据集
  forwardData: async function() {
    if (this.datalist["forwardData"] != null) {
      return this.datalist["forwardData"];
    }
    let traderData = await this.traderData();

    this.datalist["forwardData"] = traderData.filter(
      (item) => item.trader_class && item.trader_class.indexOf("货代") != -1
    );
    return this.datalist["forwardData"] || [];
  },
  // 服务商数据集
  serviceData: async function() {
    if (this.datalist["serviceData"] != null) {
      return this.datalist["serviceData"];
    }
    let condition = {
      conditions: {
        trader_property: ["服务商"],
        trader_class: "服装",
      },
      no_paging: true,
    };
    let request = await https.fetchGet(
      this.baseUrl + "/rs/trader/list",
      condition
    );
    this.datalist["serviceData"] = (await request.data.data.list) || [];
    return (await request.data.data.list) || [];
  },

  traderData: async function() {
    if (this.datalist["traderData"] != null) {
      return this.datalist["traderData"];
    }
    let condition = {
      no_paging: true,
    };
    let request = await https.fetchGet(
      this.baseUrl + "/rs/trader/list",
      condition
    );
    this.datalist["traderData"] = (await request.data.data.list) || [];
    return (await request.data.data.list) || [];
  },

  departmentData: async function() {
    if (this.datalist["departmentData"] != null) {
      return this.datalist["departmentData"];
    }
    let request = await https.fetchGet(
      this.baseUrl + "/rs/department/list?type=1",
      {}
    );
    this.datalist["departmentData"] = (await request.data.data) || [];
    return (await request.data.data) || [];
  },

  endDepartmentData: async function() {
    const deps = await this.departmentData();
    const noEndId = XEUtils.uniq(XEUtils.pluck(deps, "dep_father_id"));
    return XEUtils.filter(deps, (item) => noEndId.indexOf(item.dep_id) == -1);
  },

  // 用户数据集
  personData: async function() {
    if (this.datalist["personData"] != null) {
      return this.datalist["personData"];
    }
    let request = await https.fetchGet(this.baseUrl + "/rs/staff/recList", {
      condition: {
        office: 1,
      },
      page: 1,
      per_page: 1,
      no_paging: false,
    });
    this.datalist["personData"] = (await request.data.data) || [];
    return (await request.data.data) || [];
  },

  // 单证数据
  documentStaffData: async function() {
    if (this.datalist["documentData"] != null) {
      return this.datalist["documentData"];
    }
    let request = await https.fetchGet(
      this.baseUrl + "/ifs/user/getRangeStaffs",
      {
        position: "服装单证",
      }
    );
    this.datalist["documentData"] = (await request.data.data) || [];
    return (await request.data.data) || [];
  },

  // 船务数据
  shipStaffData: async function() {
    if (this.datalist["shippingData"] != null) {
      return this.datalist["shippingData"];
    }
    let request = await https.fetchGet(
      this.baseUrl + "/ifs/user/getRangeStaffs",
      {
        position: "服装船务",
      }
    );
    this.datalist["shippingData"] = (await request.data.data) || [];
    return (await request.data.data) || [];
  },

  // 打样中心数据集
  sampDepData: async function() {
    if (this.datalist["sampDepData"] != null) {
      return this.datalist["sampDepData"];
    }
    let request = await https.fetchGet("/gbs/sp/getSampDep");
    this.datalist["sampDepData"] = (await request.data.data) || [];
    return (await request.data.data) || [];
  },

  //获取汇率
  async getExchangeRateAm(month, year) {
    // if (this.datalist['exchangeRateData'] != null) {
    //     return this.datalist['exchangeRateData'];
    // }
    let date = new Date();
    let current_month = date.getMonth() + 1;
    let current_year = date.getFullYear();
    if (month == current_month && year == current_year) {
      //如果是当前月份调用获取当前月份汇率 缓存下来
      return this.getCurrentExchangeRateAm();
    }
    let request = await https.fetchGet("/gbs/om/getExchangeRateAm", {
      month,
      year,
    });
    // this.datalist['exchangeRateData'] = await request.data.data || [];
    return (await request.data.data) || {};
  },
  //获取当前月份汇率
  async getCurrentExchangeRateAm() {
    if (this.datalist["exchangeRateData"] != null) {
      if (Object.keys(this.datalist["exchangeRateData"]).length > 0) {
        return this.datalist["exchangeRateData"];
      }
    }
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let request = await https.fetchGet("/gbs/om/getExchangeRateAm", {
      month,
      year,
    });
    this.datalist["exchangeRateData"] = (await request.data.data) || [];
    return (await request.data.data) || {};
  },

  // 获取尺码组
  async sizeGroupData() {
    if (this.datalist["sizeGroupData"] != null) {
      return this.datalist["sizeGroupData"];
    }
    let request = await https.fetchGet("/gbs/gs/getSizeGroups");
    this.datalist["sizeGroupData"] = (await request.data.data) || [];
    return (await request.data.data) || {};
  },

  async countryData() {
    if (this.datalist["countryData"] != null) {
      return this.datalist["countryData"];
    }
    let request = await https.fetchGet(this.baseUrl + "/km/country");
    this.datalist["countryData"] = (await request.data.data) || [];
    return (await request.data.data) || {};
  },

  // 获取EBS商品列表
  async EbsGoodsData() {
    if (this.datalist["EbsGoodsData"] != null) {
      return this.datalist["EbsGoodsData"];
    }
    let request = await https.fetchGet("/ifs/km/EbsGoods");
    this.datalist["EbsGoodsData"] = (await request.data.data) || [];
    return (await request.data.data) || {};
  },

  //部门树数据
  deptreeData: async function() {
    if (this.datalist["deptreeData"] != null) {
      return this.datalist["deptreeData"];
    }

    let request = await https.fetchGet(
      this.baseUrl + "/rs/department/tree?date=&type=2&expand=",
      {}
    );
    this.datalist["deptreeData"] = (await request.data.data) || [];
    return (await request.data.data) || [];
  },
};

export default dmBaseSet;
