<template>
    <!-- <div class="detail-wrap"> -->
    <div class="detail-main">
        <div class="detail-body">
            <div class="detail-body-head">
                <div class="detail-body-head-position">
                    <div class="detail-title">{{baseInfo.ode_ebs_type==1?'预算':'测算'}}详情</div>
                    <div>{{ode_project_code_ebs}}</div>
                </div>

                <div class="detail-body-head-col">
                    <ul v-if="baseInfo">
                        <li>创建信息：<span>{{baseInfo.ode_create_time}}</span><span style="margin-left:15px">{{baseInfo.ode_creator}}</span></li>
                        <li>修改信息：<span>{{baseInfo.ode_update_time}}</span><span style="margin-left:15px">{{baseInfo.ode_updator}}</span></li>
                        <li>同步信息：<span>{{baseInfo.ode_api_time}}</span><span style="margin-left:15px">{{baseInfo.ode_api_man}}</span></li>
                    </ul>
                </div>

                <!-- <div class="detail-body-head-col">
                        <ul>
                            <li>
                                项目类型：
                            </li>
                            <li>
                                业务类型：<span>{{baseInfo.ode_bus_type}}</span>
                            </li>
                            <li>
                                项目号：<span>{{baseInfo.ode_project_code_ebs}}</span>
                            </li>
                        </ul>
                    </div> -->

                <div class="detail-sync" style="width:60px;">
                    <div class="detail-body-head-state draft" v-if="(baseInfo.ode_api_man||'')=='' && (baseInfo.ode_state||0)!=5">未同步</div>
                    <div class="detail-body-head-state finish" v-if="(baseInfo.ode_api_man||'')!=''&& (baseInfo.ode_state||0)!=5">已同步</div>
                    <div class="detail-body-head-state finish" v-if="(baseInfo.ode_state||0)==5">已取消</div>
                </div>
            </div>

            <div style="padding-top: 15px;">
                <div class="tabs">
                    <div class="tabs-col" :class="{ show: selectTab == 0 }" @click="selectTab = 0">预算信息</div>
                    <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectTab = 1">销售合同</div>
                    <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectTab = 2">采购合同</div>
                    <div class="tabs-col" :class="{ show: selectTab == 3 }" @click="selectTab = 3">加工合同</div>
                    <div class="tabs-col" :class="{ show: selectTab == 4 }" @click="selectTab = 4" v-if="baseInfo.ode_ebs_type==1">决算信息</div>
                    <div class="tabs-col" :class="{ show: selectTab == 5 }" @click="selectTab = 5" v-if="baseInfo.ode_ebs_type==1">出运信息</div>

                    <div class="m-r" style="margin-top: -8px;" v-if="selectTab==0">
                        <el-button size="small" @click="batchSync()">批量同步审批记录</el-button>
                        <el-button size="small" v-if="(baseInfo.ode_api_man||'')=='' && baseInfo.ode_ebs_type==1" @click="handleSync">预算同步</el-button>
                        <el-button size="small" v-if="(baseInfo.ode_api_man||'')=='' && baseInfo.ode_ebs_type==2" @click="handleSync_nx">测算同步</el-button>
                    </div>
                    <!-- <div class="m-r" style="margin-top: -8px;" v-if="selectTab==2">
                            <el-button size="small" @click="createPurchase">新增库存采购</el-button>
                        </div>
                        <div class="m-r" style="margin-top: -8px;" v-if="selectTab==3">
                            <el-button size="small" @click="createProcess">新增库存加工</el-button>
                        </div> -->
                </div>
            </div>

            <div class="detail-tabs-body of " v-show="selectTab == 0">
                <detail-budget :ode_id="ode_id" :budgetInfo="budgetInfo" :transMethods="transMethods" v-if="showBudget"></detail-budget>
            </div>

            <div class="detail-list" v-show="selectTab == 1">
                <sales-contract :salesData="salesData" v-if="showSales"></sales-contract>
            </div>

            <div class="detail-list" v-show="selectTab == 2">
                <purchase-contract :purchaseData="purchaseData" :orderData="orderData" :ode_type="baseInfo.ode_ebs_type" @refresh="getPurchaseContractList()"></purchase-contract>
            </div>
            <div class="detail-list" v-show="selectTab == 3">
                <process-contract :processData="processData" :orderData="orderData" :ode_type="baseInfo.ode_ebs_type" @refresh="getProcessContractList()"></process-contract>
            </div>

            <div class="detail-list" v-show="selectTab == 4">
                <final-accounts :ode_id="ode_id" :finalData="finalData" :budget_head="budgetInfo" @refresh="getFinalList" v-if="showFinal"></final-accounts>
            </div>

            <div class="detail-list" v-show="selectTab == 5">
                <shipoutInfo :shipData="shipData" :ode_id="ode_id" @refresh="afterCreateEnd()"></shipoutInfo>
            </div>
        </div>
        <!-- 同步合同-预算 -->
        <budget-edit v-if="showEdit" :show.sync="showEdit" :id="ode_id" @aftersave="getBudgetInfo"></budget-edit>
        <!-- 批量同步-->
        <batchAudit v-if="batchModal" :show.sync="batchModal" :preData="preData" @refresh="afterBatchSync()"></batchAudit>
    </div>

    <!-- </div> -->
</template>

<script>
import detailBudget from "@/pages/project/project_detail/budget.vue";
import shipoutInfo from "@/pages/project/project_detail/shipout.vue";
import budgetEdit from "@/pages/project/project_detail/ebs_budget_edit.vue";
import batchAudit from "@/pages/project/project_detail/batch_audit_records.vue";
import salesContract from "@/pages/project/project_detail/sales_contract.vue";
import purchaseContract from "@/pages/project/project_detail/purchase_contract.vue";
import processContract from "@/pages/project/project_detail/process_contract.vue";
import finalAccounts from "@/pages/project/project_detail/final_accounts.vue";
import contract_purchase_edit from "@/pages/order/order_detail/contract_purchase_edit";
import contract_process_edit from "@/pages/order/order_detail/contract_process_edit";
import ebsApi from "@/api/gbs/ebs.js";
import projectApi from "@/api/cbs/project.js";
import ifsApi from "@/api/ifs";

export default {
    name: "project_detail",
    components: {
        detailBudget,
        budgetEdit,
        salesContract,
        purchaseContract,
        finalAccounts,
        processContract,
        contract_purchase_edit,
        contract_process_edit,
        batchAudit,
        shipoutInfo,
    },
    data() {
        return {
            selectTab: 0,
            showEdit: false,
            batchModal: false,
            ode_project_code_ebs: "", //项目号
            ode_id: null, //项目id
            ode_project_id_ebs: null, //EBS项目ID
            budgetInfo: {}, //预算信息
            baseInfo: {},
            ebs_path: "HS",
            showBudget: false,
            salesData: [],
            showSales: false,
            purchaseData: [],
            //showPurchase: false,
            processData: [],
            //showProcess: false,
            finalData: [],
            showFinal: false,
            shipData: [],
            transMethods: [], //出运方式
            selectOptions: {
                userGroup: [], //业务组**
                sales: [], //业务员**
                YWLX: [], // 业务类型**
                YSFS: [], // 运输方式**
                JGTK: [], // 价格条款**
                stockHS: [], //库存组织HS
                stockHK: [], //库存组织HK

                BZ: [], //币种**
                JLDW: [], //计量单位**

                SHFS: [], // 收汇方式/结算方式**
                allCus: [], // 客户**
                allTitle: [], // 接单抬头**
                vatRate: "", //默认增值税率
                refundRate: "", //默认退税率
                prepareType: [], //备货类型
                tradeClause: [], //内销合同条款
                exportClause: [], //外销合同条款
                vender: [], //供应商
            },
            modalContractPurchase: false,
            modalContractProcess: false,
            orderData: {
                order_dep_id: this.$store.state.user.edep,
                order_dep_name: this.$store.state.user.edepname,
                order_salesman_id: this.$store.state.user.eid,
                order_salesman_name: this.$store.state.user.name,
                order_project_id: null,
                order_project_code: null,
                order_title_id: null,
                order_title_name: null,
                ode_bus_type_id_ebs: null,
            },
            batchData: {
                salesData: [],
                purchaseData: [],
                processData: [],
            },
            preData: [],

            /*GBS全是根EBS里面的data 和ifs有点不同?*/
            /*预算*/

            // 业务组 根据HS HK*
            // 制单人 根据HS HK*
            // 业务员 根据HS HK
            // 订单类型*
            // 结算方式
            // 价格条款*
            // 运输方式*
            // 订单客户
            // 最终客户
            // 库存组织
            // 商品名称EBS
            // 单位
            // 币种*
            // 税率
            // 退税率
            // 供应商 根据HS HK

            /*合同*/

            // 起运港
            // 目的港
            // 合同条款
            // 结算类型
        };
    },
    created() {
        let params = this.$route.query;
        this.ode_project_code_ebs = params.flag;
        this.ode_id = params.ode_id;
        this.ode_project_id_ebs = params.ode_project_id_ebs;
        if (this.ode_id > 0) {
            this.getBudgetInfo();
        }
        this.getSalesContractList();
        this.getPurchaseContractList();
        this.getProcessContractList();
        this.getFinalList();
        this.getShipList();
    },
    methods: {
        //根据运编号创建结算单后的处理
        afterCreateEnd() {
            this.getFinalList();
            this.getShipList();
            this.selectTab = 4;
        },
        getOptions() {
            Promise.all([
                ebsApi.getEbsData("get_group", "", this.ebs_path),
                ebsApi.getEbsData("get_tradetype", "", this.ebs_path),
                ebsApi.getEbsData("get_trans_method", "", this.ebs_path),
                ebsApi.getEbsData("get_price_term", "", this.ebs_path),
                ifsApi.dicData("TY_BZ,TY_JLDW"),
                // ebsApi.getEbsData("get_stock_org", "", "HS"),
                // ebsApi.getEbsData("get_stock_org", "", "HK"),
            ]).then((res) => {
                console.log("options", res);
                this.selectOptions.userGroup = res[0].data; //业务组
                this.selectOptions.YWLX = res[1].data; //业务类型
                this.selectOptions.YSFS = res[2].data; //运输方式
                this.selectOptions.JGTK = res[3].data; //价格条款
                this.selectOptions.BZ = Object.freeze(res[4]["TY_BZ"].children); //币种
                this.selectOptions.JLDW = res[4]["TY_JLDW"].children; //计量单位

                // this.selectOptions.stockHS = res[5].data; // 库存组织HS
                // this.selectOptions.stockHK = res[6].data; // 库存组织HK

                console.log("selectOptions", this.selectOptions);
            });
        },
        getBudgetInfo() {
            projectApi.getBudgetInfo(this.ode_id).then((res) => {
                console.log("预算", res.data);
                this.budgetInfo = res.data;
                this.baseInfo = res.data.baseInfo;
                this.orderData.order_project_id =
                    this.baseInfo.ode_project_id_ebs;
                this.orderData.order_project_code =
                    this.baseInfo.ode_project_code_ebs;
                this.orderData.order_title_id = this.baseInfo.ode_od_title_id;
                this.orderData.order_title_name =
                    this.baseInfo.ode_od_title_name;
                this.orderData.ode_bus_type_id_ebs =
                    this.baseInfo.ode_bus_type_id_ebs;

                ebsApi.getEbsData("get_trans_method", "", "HS").then((res) => {
                    console.log("出运方式", res);
                    this.transMethods = res.data;
                    this.showBudget = true;
                });

                // if (this.baseInfo["ode_system_type"] == 2) {
                //     this.ebs_path = "HK";
                // } else {
                //     this.ebs_path = "HS";
                // }

                // this.getOptions();
            });
        },

        // 获取销售合同列表
        getSalesContractList() {
            projectApi
                .getSalesContractList(this.ode_project_id_ebs)
                .then((res) => {
                    console.log("销售合同", res);
                    this.salesData = res.data || [];
                    this.batchData.salesData = [];
                    this.salesData.forEach((item) => {
                        if (
                            item.order_state_aprv == 2 &&
                            item.order_send_time == null
                        ) {
                            this.batchData.salesData.push(item);
                        }
                    });
                    this.showSales = true;
                });
        },

        //   获取采购合同列表
        getPurchaseContractList() {
            projectApi
                .getPurchaseContractList(this.ode_project_id_ebs)
                .then((res) => {
                    console.log("采购合同", res);
                    this.purchaseData = res.data || [];
                    this.batchData.purchaseData = [];
                    this.purchaseData.forEach((item) => {
                        if (
                            item.contract_state_aprv == 2 &&
                            item.contract_send_time == null
                        ) {
                            this.batchData.purchaseData.push(item);
                        }
                    });
                    //this.showPurchase = true;
                });
        },
        // 获取加工合同列表
        getProcessContractList() {
            projectApi
                .getProcessContractList(this.ode_project_id_ebs)
                .then((res) => {
                    console.log("加工合同", res);
                    this.processData = res.data || [];
                    this.batchData.processData = [];
                    this.processData.forEach((item) => {
                        if (
                            item.contract_state_aprv == 2 &&
                            item.contract_send_time == null
                        ) {
                            this.batchData.processData.push(item);
                        }
                    });
                    //this.showProcess = true;
                });
        },
        //   获取项目决算列表
        getFinalList() {
            projectApi.getFinalList(this.ode_id).then((res) => {
                console.log("决算列表", res);
                this.finalData = res.data || [];
                this.showFinal = true;
            });
        },

        //  获取出运列表
        getShipList() {
            projectApi.getShipList(this.ode_id).then((res) => {
                console.log("出运列表", res);
                this.shipData = res.data || [];
                //this.showFinal = true;
            });
        },
        handleEdit() {
            this.showEdit = true;
        },
        closeEdit() {
            this.showEdit = false;
            // 更新基本信息列表
        },
        closeIcon() {
            this.showEdit = false;
        },

        batchSync() {
            this.preData = [];
            this.batchData.purchaseData.forEach((item) => {
                item.contract_type = "purchase";
                item.contract_code = item.contract_bms_code;
                item.contract_trader = item.contract_actual_supply_title_name;
                item.id = item.contract_id;
                this.preData.push(item);
            });
            this.batchData.processData.forEach((item) => {
                item.contract_type = "process";
                item.contract_code = item.contract_bms_code;
                item.contract_trader = item.contract_actual_supply_title_name;
                item.id = item.contract_id;
                this.preData.push(item);
            });
            this.batchData.salesData.forEach((item) => {
                item.contract_type = "order";
                item.contract_code = item.order_bms_code;
                item.contract_trader = item.order_cus_name;
                item.id = item.order_id;
                this.preData.push(item);
            });
            this.batchModal = true;
        },

        //批量同步刷新
        afterBatchSync() {
            this.getSalesContractList();
            this.getPurchaseContractList();
            this.getProcessContractList();
        },
        //测算同步
        handleSync_nx() {
            this.$confirm("确定要测算同步?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    projectApi.syncProject_nx(this.ode_id).then((result) => {
                        if (result.code == 0) {
                            this.$message({
                                type: "success",
                                message: "同步成功!",
                            });
                            this.getBudgetInfo();
                        } else {
                            this.$message({
                                type: "success",
                                message: "同步失败!" + result.msg,
                            });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消同步",
                    });
                });
        },
        // 同步预算
        handleSync() {
            this.showEdit = true;
            //         this.$confirm("确定要同步?", "提示", {
            // 	confirmButtonText: "确定",
            // 	cancelButtonText: "取消",
            // 	type: "warning",
            // })
            // 	.then(() => {
            // 		projectApi.projectSync(this.ode_id).then((result) => {
            // 			if(result.code == 0){
            // 				this.$message({
            // 					type: "success",
            // 					message: "同步成功!",
            // 				});
            //                             this.getBudgetInfo()
            // 			}else{
            //                             this.$message({
            // 					type: "success",
            // 					message: "同步失败!",
            // 				});
            //                         }

            // 		})
            // 	})
            // 	.catch(() => {
            // 		this.$message({
            // 			type: "info",
            // 			message: "已取消同步",
            // 		});
            // 	});
        },
    },
    watch: {},
};
</script>

<style lang="scss" scoped>
.detail-wrap {
    height: 100vh;
    width: 100vw;
    background-color: #eee;
    position: fixed;
    top: 85px;
    z-index: 999;
}
.detail-body-head {
    overflow: hidden;
    .detail-body-head-position {
        .detail-title {
            font-size: 16px;
            font-weight: 700;
        }
    }
    .detail-sync {
        float: right;
        width: 80px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eee;
        .sync-title {
            font-size: 16px;
            font-weight: 700;
        }
    }
}
.detail-list {
    padding: 23px 13px 0 0;
    overflow: auto;
}
</style>