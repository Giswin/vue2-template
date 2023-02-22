<style scoped lang="scss">
//特殊样式，而不通用请在这里写样式
.detail-img {
    float: left;
}

.detail-basic {
    float: left;
    margin-left: 25px;

    .sy-row {
        ul {
            li {
                line-height: 35px;
                float: left;
            }
        }
    }
}

.magnifier-layer {
    z-index: 9;
}

.skutab {
    color: $primary-color;
    cursor: pointer;
}

>>> {
    .bom-td {
        .mytable-scrollbar {
            .vxe-table--render-wrapper {
                .vxe-table--main-wrapper {
                    .vxe-table--body-wrapper {
                        .vxe-table--body {
                            .vxe-body--row {
                                .vxe-body--column {
                                    padding: 0px;
                                    line-height: inherit;
                                }
                            }
                        }
                    }

                    .vxe-table--footer-wrapper {
                        .vxe-table--footer {
                            .vxe-footer--row {
                                .vxe-footer--column {
                                    padding: 0px;
                                    line-height: 30px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
<template>
    <div class="detail-main">
        <div class="detail-head-button">
            <div class="m-r">
                <el-dropdown v-if="orderData.order_state_aprv == 2" style="padding-right:10px">
                    <el-button size="small">
                        合同打印<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" v-if="orderData.order_type=='TRADE'">
                        <el-dropdown-item @click.native="contractPrint(1)">内销合同（标准）</el-dropdown-item>
                        <el-dropdown-item @click.native="contractPrint(2)">内销合同（附件）</el-dropdown-item>
                    </el-dropdown-menu>
                    <el-dropdown-menu slot="dropdown" v-else>
                        <el-dropdown-item @click.native="contractPrint(1)">外销合同（标准）</el-dropdown-item>
                        <el-dropdown-item @click.native="contractPrint(2)">外销合同（附件）</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button size="small" v-if="orderData.order_state == 1 || orderData.order_state == 3" @click="OrderPublish(orderData.order_id)">发布</el-button>
                <el-button size="small" v-if="orderData.order_state == 1 || orderData.order_state == 3" @click="OrderEdit(orderData.order_id)">编辑</el-button>
                <el-button size="small" v-if="orderData.order_state == 2 && (orderData.order_state_aprv == 1 || orderData.order_state_aprv == 3) && withdrawState" @click="OrderWithdraw(orderData.order_id)">撤销</el-button>
                <el-button size="small" v-if="orderData.order_state == 2 && orderData.order_state_aprv == 2" @click="handleToState(orderData.order_id,5)">中止</el-button>
                <el-button size="small" v-if="orderData.order_state == 2 && orderData.order_state_aprv == 2" @click="handleToState(orderData.order_id,6)">结案</el-button>
                <el-button size="small" v-if="orderData.order_state == 2 && orderData.order_state_aprv == 2" @click="change()">变更</el-button>
                <el-button size="small" @click="doPrint()">打印</el-button>
                <el-button size="small" v-if="orderData.order_send_time==null && orderData.order_state_aprv == 2" @click="syncOrder(orderData.order_id)">同步审批</el-button>
            </div>
            <div class="clear"></div>
        </div>
        <div class="detail-body">
            <div class="detail-body-head">
                <div class="detail-body-head-position">
                    <span>订单详情</span><br>
                    {{orderData.order_code}} - <b style="color: #d5232f;">V{{orderData.order_version}}</b>
                </div>
                <div class="detail-body-head-col">
                    <ul>
                        <li>创建信息：{{orderData.order_create_time}} {{orderData.order_creator}}</li>
                        <li>修改信息：{{orderData.order_update_time}} {{orderData.order_updator}}</li>
                        <li>发布信息：{{orderData.order_publish_time}} {{orderData.order_publisher}}</li>
                    </ul>
                </div>
                <div class="detail-body-head-col">
                    <ul>
                        <li>项目号：<b>{{orderData.order_project_code}}</b></li>
                    </ul>
                    <el-button v-if="orderData.order_project_code==null" size="small" @click="createProject()">生成项目号</el-button>
                    <el-button v-if="orderData.order_project_code==null" size="small" @click="()=>projectModal=true">选择项目号</el-button>
                    <ul v-if="orderData.order_bms_code!=null">
                        <li>合同号：<b>{{orderData.order_bms_code}}</b></li>
                    </ul>
                    <ul v-if="orderData.order_send_time!=null">
                        <li>同步信息：{{orderData.order_send_time}} {{orderData.order_sender}}</li>
                    </ul>
                </div>

                <div class="m-r">
                    <div class="">
                        <div @click="modalFlow = true" style="cursor:pointer">
                            <div class="detail-body-head-state draft" v-show="orderData.order_state == 1">草稿</div>
                            <div class="detail-body-head-state pause" v-show="orderData.order_state == 2 && orderData.order_state_aprv == 1">待审核</div>
                            <div class="detail-body-head-state change" v-show="orderData.order_state == 2 && orderData.order_state_aprv == 3">拒绝</div>
                            <div class="detail-body-head-state change" v-show="orderData.order_state == 3">变更中</div>
                            <div class="detail-body-head-state finish" v-show="orderData.order_state == 2 && orderData.order_state_aprv == 2">已审核</div>
                            <div class="detail-body-head-state change" v-show="orderData.order_state == 5">中止</div>
                            <div class="detail-body-head-state change" v-show="orderData.order_state == 6">结案</div>
                        </div>
                        <approve_flow :RecordDatalist="RecordDatalist" v-if="modalFlow" :show.sync="modalFlow"></approve_flow>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
            <div style="padding-top: 15px;">
                <div class="tabs">
                    <div class="tabs-col" :class="{ show: selectTab == 0 }" @click="selectTab = 0">订单预算</div>
                    <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectTab = 1">订单商品</div>
                    <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectTab = 2">单据</div>
                    <div class="tabs-col" :class="{ show: selectTab == 3 }" @click="selectTab = 3">变更信息</div>

                </div>
            </div>
            <!-- 订单预算 -->
            <div class="detail-tabs-body of" v-if="selectTab == 0" style="padding-right:15px">
                <order_budget :orderData="orderData" :budgetInfo="budgetInfo"></order_budget>
            </div>
            <!-- 订单商品 -->
            <div class="detail-tabs-body of" v-if="selectTab == 1">
                <order_goods :orderDetail="orderGoods" :orderBom="orderBom" :orderData="orderData" @refresh="refresh"></order_goods>
            </div>
            <!-- 单据 -->
            <div class="detail-tabs-body of" v-if="selectTab == 2">
                <order_bill :contarctList="contarctList" :orderData="orderData" @refresh="refresh"></order_bill>
            </div>
            <!-- 变更信息 -->
            <div class="detail-tabs-body of" v-if="selectTab == 3">
                <order_change :changeList="changeList"></order_change>
            </div>
            <!-- 项目选择 -->
            <project_select v-if="projectModal" :show.sync="projectModal" :selectCondition="selectCondition" @getProjectCode="updateProjectCode"></project_select>

            <!-- 订单变更页面 -->
            <order_change_edit v-model="changeModel" @changeAfter="changeModel = false;initData()" :show.sync="changeModel" :order_id="order_id"></order_change_edit>

            <!-- 订单编辑页面 -->
            <order_edit v-if="showEdit" :order_id="order_id" :order_cus_od_code="order_cus_od_code" :selectOptions="selectOptions" @closeOrderEdit="handleCloseEdit" @closeIcon="handelCloseIcon"></order_edit>
        </div>
    </div>

</template>

<script>
import orderApi from "@/api/cbs/order.js";
import projectApi from "@/api/cbs/project.js";
import purchaseApi from "@/api/cbs/purchase.js";
import ebsApi from "@/api/gbs/ebs.js";
import ifsApi from "@/api/ifs";
import approve_flow from "@/pages/order/order_detail/approve_flow";
import order_budget from "@/pages/order/order_detail/order_budget";
import order_goods from "@/pages/order/order_detail/order_goods";
import order_bill from "@/pages/order/order_detail/order_bill";
import order_change from "@/pages/order/order_detail/order_change_info";
import project_select from "@/pages/order/order_detail/project_select";
import order_edit from "@/pages/order/order_edit";
import order_change_edit from "@/pages/order/order_detail/order_change_edit";

export default {
    name: "order_detail",
    components: {
        approve_flow,
        order_budget,
        order_goods,
        order_bill,
        project_select,
        order_edit,
        order_change_edit,
        order_change,
    },
    props: {},
    data() {
        return {
            modalFlow: false,
            projectModal: false,
            order_id: Number(this.$route.query.id),
            selectTab: null,
            // 订单
            orderData: {},
            budgetInfo: [],
            orderGoods: [{ order_goods_bom_type: "" }],
            orderBom: [],
            RecordDatalist: [],

            //Tasklist:[],
            changeModel: false,
            withdrawState: true,
            showEdit: false,
            order_cus_od_code: "",
            selectOptions: {
                dep: [], //部门*
                sales: [], //业务员*
                BZ: [], //币种*
                SHFS: [], // 收汇方式/结算方式*
                JGTK: [], // 价格条款*
                YSFS: [], // 运输方式*
                JLDW: [], //计量单位
                TYYWLX: [], // 订单类型
                businessType: [], //业务类型
                allCus: [], // 客户*
                allTitle: [], // 接单抬头*
                portFrom: [], //起运港*
                portTo: [], //目的港*
                invoiceMode: [], //成品发票*
                vatRate: "", //默认增值税率
                refundRate: "", //默认退税率
                prepareType: [], //备货类型
                tradeClause: [], //内销合同条款
                exportClause: [], //外销合同条款
                vender: [], //供应商
                category: [], //商品类别
            },
            changeInfo: [], //变更信息
            changeList: [], //变更记录
            contarctList: [], //合同列表
            tradeType: [], //业务类型
            selectCondition: {
                order_business_type: null,
                order_price_clause: null,
                order_collect_mode: null,
                order_cus_id: null,
                order_title_id: null,
            }, //项目号选择校验条件
        };
    },
    created() {
        this.initData();
    },

    mounted() {},

    methods: {
        //标记状态
        handleToState(order_id, state) {
            let msg = "";
            if (state == 6) msg = "确定要标记该订单为结案吗？";
            else if (state == 2) msg = "确定要标记该订单为在手吗？";
            else if (state == 5) msg = "确定要标记该订单为中止吗？";

            this.$confirm(msg, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    orderApi.setOrderState(order_id, state).then((res) => {
                        if (res.code == 0) {
                            this.$message({
                                message: res.msg,
                                type: "success",
                            });
                            this.getOrder();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消设置",
                    });
                });
        },
        //初始化数据
        async initData() {
            this.getOrder();
            this.getChangeInfo();
            this.getContractList();
            this.getOptions();
            this.getDep();
            this.get_flowRecords();
            this.selectTab = 0;
        },

        //获取部门
        async getDep() {
            let list = await ifsApi.getList("", 2, 0);
            let dep = list.data || [];
            this.selectOptions.dep = Object.freeze(dep);
        },

        //获取下拉项
        getOptions() {
            Promise.all([
                this.$dmBaseSet.personData(),
                ifsApi.dicData(
                    "TY_BZ,TY_SHFS,TY_JGTK,TY_YSFS,TY_JLDW,TY_YWLX,CBM_ORDER_TYPE,TY_HTTK-SC_E,TY_HTTK-SC_I,G_BOM_CATEGORY"
                ),
                ifsApi.getTitlelist(),
                this.$dmBaseSet.customerData(),
                ifsApi.getPorts(1, 0),
                ifsApi.getPorts(0, 1),
                this.$dmBaseSet.getOptions(),
                this.$dmBaseSet.venderData(),
                // 业务类型的还没写
            ]).then((res) => {
                this.selectOptions.sales = Object.freeze(res[0].list); //业务员
                this.selectOptions.BZ = Object.freeze(res[1]["TY_BZ"].children); //币种
                this.selectOptions.JGTK = Object.freeze(
                    res[1]["TY_JGTK"].children
                ); //价格条款
                this.selectOptions.SHFS = Object.freeze(
                    res[1]["TY_SHFS"].children
                ); //收汇方式
                this.selectOptions.YSFS = Object.freeze(
                    res[1]["TY_YSFS"].children
                ); //运输方式
                this.selectOptions.JLDW = Object.freeze(
                    res[1]["TY_JLDW"].children
                ); //计量单位
                this.selectOptions.TYYWLX = Object.freeze(
                    res[1]["CBM_ORDER_TYPE"].children
                ); //订单类型
                this.selectOptions.businessType = Object.freeze(
                    res[1]["TY_YWLX"].children
                ); //业务类型

                this.selectOptions.tradeClause = Object.freeze(
                    res[1]["TY_HTTK-SC_I"].children
                ); //内销合同条款

                this.selectOptions.exportClause = Object.freeze(
                    res[1]["TY_HTTK-SC_E"].children
                ); //外销合同条款
                this.selectOptions.category = Object.freeze(
                    res[1]["G_BOM_CATEGORY"].children
                ); //商品类别
                console.log("字典数据", res[1]);

                this.selectOptions.allTitle = Object.freeze(res[2].tnt_title); //接单抬头

                let cus = res[3];
                this.selectOptions.allCus = Object.freeze(cus); //客户
                this.selectOptions.portFrom = Object.freeze(res[4].data); //起运港
                this.selectOptions.portTo = Object.freeze(res[5].data); //目的港
                this.selectOptions.invoiceMode =
                    res[6].END_INVOICE_MODE.option_value || []; //成品发票
                this.selectOptions.vatRate = res[6].VAT_RATE.option_value || ""; //默认增值税率
                this.selectOptions.refundRate =
                    res[6].TAX_REFUND_RATE.option_value || ""; //默认退税率
                this.selectOptions.prepareType =
                    res[6].TY_PREPARE_MODE.option_value || ""; //备货类型

                this.selectOptions.vender = Object.freeze(res[7]); //供应商

                this.selectOptions = Object.freeze(this.selectOptions);

                console.log("selectOptions", this.selectOptions);
            });
        },

        //获取指定订单的相关信息
        async getOrder() {
            await orderApi.getOrderDetail(this.order_id).then((result) => {
                if (result.code == 0) {
                    console.log(
                        "🚀 ~ file: index.vue:343 ~ awaitorderApi.getOrderDetail ~ result",
                        result
                    );
                    this.orderData = result.data.baseInfo || {};
                    (this.selectCondition = {
                        order_business_type: this.orderData.order_business_type,
                        order_price_clause: this.orderData.order_price_clause,
                        order_collect_mode: this.orderData.order_collect_mode,
                        order_cus_id: this.orderData.order_cus_id,
                        order_title_id: this.orderData.order_title_id,
                    }),
                        (this.order_cus_od_code =
                            this.orderData.order_cus_od_code);
                    this.orderGoods = result.data.goodsInfo || [];
                    this.orderBom = result.data.bomInfo || [];
                    this.budgetInfo = result.data.budgetInfo || [];
                    console.log(
                        "🚀 ~ file: index.vue:405 ~ awaitorderApi.getOrderDetail ~ this.budgetInfo",
                        this.budgetInfo
                    );
                    this.changeInfo = result.data.historyInfo || [];
                }
            });
        },

        //获取变更信息
        getChangeInfo() {
            orderApi.getChangeInfo(this.order_id).then((result) => {
                if (result.code == 0) {
                    this.changeList = result.data || [];
                }
            });
        },

        //获取合同列表
        getContractList() {
            purchaseApi.getOrderContractList(this.order_id).then((result) => {
                if (result.code == 0) {
                    this.contarctList = result.data || [];
                    console.log(
                        "🚀 ~ file: index.vue:423 ~ purchaseApi.getOrderContractList ~ this.contarctList",
                        this.contarctList
                    );
                }
            });
        },
        //获取流程记录
        async get_flowRecords() {
            await orderApi
                .getOrderApprFlowList(this.order_id)
                .then((result) => {
                    if (result.code == 0) {
                        this.RecordDatalist = result.data || [];
                        this.RecordDatalist.forEach((item) => {
                            if (item.wfr_state == 1) {
                                if (item.wfr_op_result == 1) {
                                    this.withdrawState = false;
                                } else if (item.wfr_op_result == 2) {
                                    this.withdrawState = true;
                                }
                            }
                        });
                    }
                });
        },

        //生成项目号
        createProject() {
            this.$confirm("确认生成项目号？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    projectApi.createProject(this.order_id).then((res) => {
                        if (res.code == 1) {
                            this.$message({
                                type: "success",
                                message: "生成成功!",
                            });
                            this.getOrder();
                        } else if (res.code == 0) {
                            this.$message({
                                type: "error",
                                message: res.msg,
                            });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消项目号生成！",
                    });
                });
        },
        //项目号更新
        updateProjectCode(projectCode, projectID) {
            this.orderData.order_project_code = projectCode;
            this.orderData.order_project_id = projectID;
            orderApi.getOrderInfo(this.order_id).then((result) => {
                if (result.code == 0) {
                    let base_info = result.data.baseInfo || {};
                    base_info.order_project_code =
                        this.orderData.order_project_code;
                    base_info.order_project_id =
                        this.orderData.order_project_id;
                    let goodsList = result.data.goodsInfo || [];
                    orderApi
                        .updateOrderInfo(base_info, goodsList)
                        .then((res) => {
                            if (res.code == 0) {
                                this.$message({
                                    message: "保存订单信息成功！",
                                    type: "success",
                                });
                            }
                        });
                }
            });
        },
        //打印订单预算表
        doPrint() {
            window.open(
                "/#/order_approve_print?order_id=" +
                    this.order_id +
                    "&flag=print"
            );
            let _this = this;
            window.addEventListener(
                "message",
                function (event) {
                    var eventData = event.data;
                    if (typeof eventData === "string") {
                        try {
                            var eventObj = JSON.parse(eventData);
                            if (eventObj.type === "returnCallBack2") {
                                _this.initData();
                            }
                        } catch (error) {
                            console.log(error.message);
                        }
                    }
                },
                false
            );
        },
          //发布
        async OrderPublish(order_id) {
            orderApi.orderPublish(order_id).then((res) => {
                if (res.code == 0) {
                    this.initData();
                    this.$message({
                        message: res.msg,
                        type: "success",
                    });
                } else {
                    this.$message({
                        message: res.msg + "发布失败！",
                        type: "error",
                    });
                }
            });
        },

        //编辑
        OrderEdit() {
            this.showEdit = true;
        },

        //撤销
        OrderWithdraw(order_id) {
            orderApi.orderWithdraw(order_id).then((res) => {
                if (res.code == 0) {
                    this.initData();
                    this.$message({
                        message: "撤销成功!",
                        type: "success",
                    });
                } else {
                    this.$message({
                        message: res.msg + "撤销失败！",
                        type: "error",
                    });
                }
            });
        },

        //变更
        change() {
            // this.orderGoods.forEach(item => {
            // 	item.bomInfo=[]
            // 	this.orderBom.forEach(index => {
            // 		if(item.order_goods_id==index.order_goods_bom_goods_id){
            // 			item.bomInfo.push(index)
            // 		}
            // 	});

            // });
            this.changeModel = true;
        },

        //同步
        syncOrder(id) {
            this.$confirm("确定要同步该订单审批记录?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    orderApi.syncOrderAudingRecord(id).then((result) => {
                        if (result.code == 0) {
                            this.$message({
                                type: "success",
                                message: "同步成功!",
                            });
                        } else {
                            this.$message({
                                type: "error",
                                message: "同步失败!" + result.msg,
                            });
                        }
                        this.initData();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消同步",
                    });
                });
        },

        //销售合同打印
        contractPrint(type) {
            if (this.orderData.order_type == "TRADE") {
                if (type == 1) {
                    window.open(
                        "/#/order_ix_contract_print?order_id=" + this.order_id
                    );
                } else if (type == 2) {
                    window.open(
                        "/#/order_ix_contract_attach_print?order_id=" +
                            this.order_id
                    );
                }
            } else {
                if (type == 1) {
                    window.open(
                        "/#/order_ex_contract_print?order_id=" + this.order_id
                    );
                } else if (type == 2) {
                    window.open(
                        "/#/order_ex_contract_attach_print?order_id=" +
                            this.order_id
                    );
                }
            }
        },

        //编辑确认关闭
        handleCloseEdit() {
            this.showEdit = false;
            this.initData();
        },

        //关闭编辑页面
        handelCloseIcon() {
            this.showEdit = false;
        },

        //刷新
        refresh(data) {
            this.getOrder();
            this.getContractList();
            this.selectTab = data;
        },
    },
    watch: {},
};
</script>