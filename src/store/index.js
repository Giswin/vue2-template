import Vue from "vue";
import Vuex from "vuex";
import myStorage from "../common/my_storage.js";
import dmBaseSet from "../common/dm_base_set.js";
import https from "@/https.js";
import XEUtils from "xe-utils";
import Cookies from "js-cookie";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 当前所在功能菜单组
    menu_group_name: "",
    // 当前所在功能菜单项
    active_menu_name: "",

    /**
     * 是否已登录
     */
    hasLogin: false,

    /**
     * token认证码
     */
    token: "",

    /**
     * 登录用户信息
     */
    user: {},

    // 临时变量
    TMP: {
      do_close_page: false, // 用来所有自定义标签页上的关闭按钮控制标签页的关闭，在App组件中添加Watch
      after_login_router: "/home", // 登录后跳转路由path
      request_count: 0, // 当前正在请求数
      loadingBar: true,
      session_id: "",
    },

    // 用户拥有的角色集合(账户组)
    roles: [],
    // 用户权限操作项编码集合
    rights: [],

    noAccessExpireTime: 7200, // 单位：秒, 无访问失效时间，也就是后端session的有效期

    expire: 99999999, // 不限制state在客户端上存储的时间，由服务端来判断token是否过期

    css: {
      // 框架header高度
      headerHeight: 64,
      // 表格分页高度
      tablePagerHeight: 50,

      // 表格最大高度
      tableMaxHeight: 0,
      // 浏览器窗口内部高度
      innerHeight: 0,
      navWidth: 165, //
    },

    websockerSendMessage: {},

    websockerMessage: {},

    websockerMessageList: [],
  },
  mutations: {
    SET_TMP_VALUE(state, item) {
      state.TMP[item.name] = item.value;
    },

    // 更新token
    UPDATE_TOKEN(state, token) {
      state.token = token || "";
      myStorage.setItem("store", JSON.stringify(state), state.expire);
    },

    // 更新登录用户信息
    UPDATE_USER_INFO(state, user) {
      // Update vuex user info
      user ? (state.user = user) : console.warn("No user info received");
      // Storage user info
      state.hasLogin = true;
      myStorage.setItem("store", JSON.stringify(state), state.expire);
    },

    // 退出登录信息
    USER_LOGIN_OUT(state) {
      state.token = "";
      state.user = {};
      state.hasLogin = false;
    },

    // 获取本地存储的store
    GET_APP_STORAGE(state) {
      state.hasLogin = false;

      if (process.env.VUE_APP_RUN && process.env.VUE_APP_RUN == "DEV") {
        //state.user = {"uid":335,"eid":"76","uac":"17768113816","name":"张亚平","nameE":null,"sex":"男","userpic":null,"tenantid":1,"edep":177,"edepname":"盛邦.综合部","company":"","position":"[]","phone":"17768113816"};
        //state.user = {"uid":1612,"eid":"1353","uac":"13773233990","name":"王佳慧","nameE":null,"sex":"女","userpic":null,"tenantid":1,"edep":87,"edepname":"盛天.12部","company":"","position":"[\"服装业务\"]","phone":"13773233990"};
        // state.user = {"uid":652,"eid":"393","uac":"18362798563","name":"张姝姝","nameE":null,"sex":"女","userpic":null,"tenantid":1,"edep":122,"edepname":"盛天.1部","company":"","position":"[\"核算会计\"]","phone":"13701560037"};
        // state.user = {
        //   uid: 1165,
        //   eid: "906",
        //   uac: "17802592661",
        //   name: "毛婉茜",
        //   nameE: null,
        //   sex: "男",
        //   userpic: null,
        //   tenantid: 63,
        //   edep: 75,
        //   edepname: "信息管理部",
        //   company: "",
        //   position:
        //     '["信息管理","制版员","裁剪工","缝制工","后道工","织片工","挡车工","套口工","锁钉工","检验员"]',
        //   phone: "17802592661",
        // };

        state.user = {
          uid: 2341,
          eid: 2319,
          uac: "admin",
          name: "管理员",
          nameE: null,
          sex: null,
          userpic:
            "https://oss.gthsip.com/GTHS-EIP/956e0387e186d01d813e845d310ba023ewclpilameyz4trp.jpg",
          tenantid: 1,
          edep: 6,
          edepname: "盛兴.1部",
          company: "",
          position: null,
          phone: "18662706017",
        };
        // 加载用户操作权限列表

        // state.user = {"uid":2341,"eid":"2319","uac":"13905155310","name":"管理员-测","nameE":null,"sex":"男","userpic":null,"tenantid":1,"edep":75,"edepname":"信息管理部","company":"","position":"[\"信息管理\",\"制版员\",\"裁剪工\",\"缝制工\",\"后道工\",\"织片工\",\"挡车工\",\"套口工\",\"检验员\"]","phone":"13905155310"}

        dmBaseSet.accRightsData(state.user.uid).then((response) => {
          state.rights = XEUtils.pluck(response || [], "opt_code");
          state.hasLogin = true;
        });
      } else {
        state.TMP.session_id = Cookies.get("S_CLIENT");

        //console.log('正在获取用户信息------------');
        https.fetchGet("/user/").then((response) => {
          state.user = response.data || {};
          if (!state.user.uid) return;
          // 加载用户操作权限列表
          dmBaseSet.accRightsData(state.user.uid).then((response) => {
            state.rights = XEUtils.pluck(response || [], "opt_code");
            state.hasLogin = true;
          });
        });
      }
    },

    // 获取当前浏览器信息
    getCss(state) {
      state.css.innerHeight = window.innerHeight;
      state.css.tableMaxHeight = state.css.innerHeight - 64 - 100;
    },
  },
});

export default store;
