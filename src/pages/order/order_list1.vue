<template>
    <div class="wrapper" :style="{'left':$store.state.css.navWidth + 'px'}">
        <div class="roles-container">
            <div class="lis-tabs">
                <div class="tabs">
                    <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectChange(1)">草稿</div>
                    <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectChange(2)">在手</div>

                    <div class="tabs-col" :class="{ show: selectTab == 3}" @click="selectChange(3)">完成</div>

                    <div class="tabs-col" :class="{ show: selectTab == 8}" @click="selectChange(8)">进度</div>
                    <div class="tabs-right">
                        <div class="tabs-search">
                            <div class="m-l">
                                <el-input :placeholder="placeholder" v-model="condition.keyword" @keyup.enter.native="query" clearable class="input-with-select" style="width:420px;" size="small">
                                    <el-button slot="append" icon="el-icon-search" @click="query"></el-button>
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div v-if="selectTab!==8">

                <div class="listform">
                    <div class="form-body" style="margin-right:15px;">
                        <div class="tags" style="margin-top: 13px;">
                            <div class="m-l" style="margin: 0 10px;">筛选条件:</div>
                            <div class="m-l">
                                <filter-tag :tags="formTags" @remove-tag="closeTag"></filter-tag>
                            </div>
                        </div>
                        <div class="form-button">
                            <div class="m-l" style="margin-left: 5px;">
                                <filter-form ref="filterForm" :conditions="formConditions" label_width="110px" :view_type="view_type" @search="filterFormConfirm"></filter-form>
                            </div>
                            <div class="m-l" style="margin-left: 5px;">
                                <el-button size="small" @click="closeFilter">清空筛选</el-button>
                            </div>
                            <div class="m-l" style="margin-left: 5px;">
                                <el-button size="small" type="primary" @click="handleCreate">新建</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="selectTab==1">
                    <div class="tabs-list-body tabs-list-body-table">
                        <div class="table">
                            <vxe-table border :data="dataList1" ref="orderTable1" resizable size="small" auto-resize height="100%" :column-config="{minWidth:140}" :sort-config="{remote:true}" @sort-change="handleSortChange" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row>
                                <vxe-table-column field="order_cus_od_code" title="订单号" header-align="center" align="left" min-width="120" sortable></vxe-table-column>
                                <vxe-table-column field="order_project_code" title="项目编号" header-align="center" min-width="130" align="left" sortable></vxe-table-column>
                                <vxe-table-column field="order_dep_name" title="部门" header-align="center" min-width="90" align="left" sortable></vxe-table-column>
                                <vxe-table-column field="order_salesman_name" title="业务员" header-align="center" min-width="90" align="left" sortable></vxe-table-column>
                                <vxe-table-column field="order_business_type" title="业务类型" header-align="center" min-width="120" align="left" sortable>
                                    <template v-slot="{row}">
                                        <span v-if="row.order_type == 'TRADE'">{{row.order_business_type}}-内销</span>
                                        <span v-else>{{row.order_business_type}}-外销</span>
                                    </template>
                                </vxe-table-column>

                                <vxe-table-column field="order_cus_name" title="客户" header-align="center" align="left" sortable></vxe-table-column>
                                <vxe-table-column field="order_date" title="接单日期" header-align="center" align="center" min-width="95" sortable></vxe-table-column>
                                <vxe-table-column field="order_currency" title="币种" header-align="center" min-width="80" align="center" sortable></vxe-table-column>
                                <vxe-table-column field="order_amount_oc" title="订单金额" header-align="center" min-width="120" align="right" :formatter="formatterNum" sortable></vxe-table-column>
                                <vxe-table-column field="order_delivery_date" title="交货期" header-align="center" align="center" min-width="95" sortable></vxe-table-column>

                                <vxe-table-column title="操作" header-align="center" align="center" min-width="100">
                                    <template #default="{ row }">
                                        <el-dropdown>
                                            <el-button size="mini">
                                                更多<i class="el-icon-arrow-down el-icon--right"></i>
                                            </el-button>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item @click.native="handleToEdit(row.order_id)">编辑</el-dropdown-item>
                                                <el-dropdown-item @click.native="handleToDetail(row)">详情</el-dropdown-item>
                                                <el-dropdown-item @click.native="handleToCopy(row.order_id)">复制</el-dropdown-item>
                                                <el-dropdown-item @click.native="handleToDelete(row.order_id)">删除</el-dropdown-item>

                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </template>
                                </vxe-table-column>

                            </vxe-table>
                        </div>
                    </div>
                </div>
                <div v-show="selectTab!==1">
                    <div class="tabs-list-body tabs-list-body-table">
                        <div class="table">
                            <vxe-table border :data="dataList" ref="orderTable" resizable size="small" auto-resize height="100%" :column-config="{minWidth:130}" :sort-config="{remote:true}" @sort-change="handleSortChange" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row>
                                <vxe-table-column field="order_cus_od_code" title="订单号" header-align="center" align="left" min-width="120" sortable></vxe-table-column>
                                <vxe-table-column field="order_project_code" title="项目编号" header-align="center" min-width="125" align="left" sortable></vxe-table-column>
                                <vxe-table-column field="order_dep_name" title="部门" header-align="center" min-width="90" align="left" sortable></vxe-table-column>
                                <vxe-table-column field="order_salesman_name" title="业务员" header-align="center" min-width="75" align="left" sortable></vxe-table-column>
                                <vxe-table-column field="order_business_type" title="业务类型" header-align="center" min-width="100" align="left" sortable>
                                    <template v-slot="{row}">
                                        <span v-if="row.order_type == 'TRADE'">{{row.order_business_type}}-内销</span>
                                        <span v-else>{{row.order_business_type}}-外销</span>
                                    </template>
                                </vxe-table-column>
                                <vxe-table-column field="order_cus_name" title="客户" header-align="center" align="left" sortable></vxe-table-column>
                                <vxe-table-column field="order_date" title="接单日期" header-align="center" align="center" min-width="90" sortable></vxe-table-column>
                                <vxe-table-column field="order_currency" title="币种" header-align="center" min-width="70" align="center" sortable></vxe-table-column>
                                <vxe-table-column field="order_amount_oc" title="订单金额" header-align="center" min-width="110" align="right" :formatter="formatterNum" sortable></vxe-table-column>
                                <vxe-table-column field="order_delivery_date" title="交货期" header-align="center" align="center" min-width="90" sortable></vxe-table-column>
                                <vxe-table-column field="order_state_str" title="审批状态" header-align="center" min-width="90" align="left">
                                    <!-- <template v-slot="{row}">
                                        <span v-if="row.order_state_aprv == '1'">待审</span>
                                        <span v-else-if="row.order_state_aprv == '2'">已审</span>
                                        <span v-else-if="row.order_state_aprv == '3'">已审不通过</span>
                                        <span v-else>暂无</span>
                                    </template> -->
                                </vxe-table-column>
                                <vxe-table-column title="操作" header-align="center" align="center" min-width="100">
                                    <template #default="{ row }">
                                        <el-dropdown>
                                            <el-button size="mini">
                                                更多<i class="el-icon-arrow-down el-icon--right"></i>
                                            </el-button>
                                            <el-dropdown-menu slot="dropdown">
                                                <!-- <el-dropdown-item @click.native="handleToEdit(row)">编辑</el-dropdown-item> -->
                                                <el-dropdown-item @click.native="handleToDetail(row)">详情</el-dropdown-item>
                                                <el-dropdown-item @click.native="handleToWithdraw(row.order_id)" v-if="selectTab==2&&row.order_state_str !== '变更'&&row.order_state_str !== '已审'">撤回</el-dropdown-item>
                                                <el-dropdown-item @click.native="handleToCopy(row.order_id)" v-if="selectTab==2&&row.order_state_str !== '变更'">复制</el-dropdown-item>
                                                <el-dropdown-item @click.native="handleToPublish(row.order_id)" v-if="selectTab==2&&row.order_state_str == '变更'">发布</el-dropdown-item>
                                                <el-dropdown-item @click.native="handleToState(row.order_id,6)" v-if="row.order_state >1 && row.order_state<5">标记结案</el-dropdown-item>
                                                <el-dropdown-item @click.native="handleToState(row.order_id,5)" v-if="row.order_state >1 && row.order_state<5">标记中止</el-dropdown-item>
                                                <el-dropdown-item @click.native="handleToState(row.order_id,2)" v-if="row.order_state == 6 || row.order_state == 5">标记在手</el-dropdown-item>

                                                <!-- <el-dropdown-item @click.native="handleToDelete(row.order_id)">删除</el-dropdown-item> -->

                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </template>
                                </vxe-table-column>

                            </vxe-table>
                        </div>
                    </div>
                </div>

                <div class="list-bottom">
                    <div class="m-r">
                        <vxe-pager background :current-page.sync="tablePages.cur_page" :page-size.sync="tablePages.page_count" :total="tablePages.total" @page-change="pageChange" :page-sizes="[10,20,50,100,500,1000,10000]">
                        </vxe-pager>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <div v-if="selectTab==8">
                <order-progress :progressOptions="progressOptions" :keyword.sync="condition.keyword"></order-progress>
            </div>
        </div>

        <order-edit v-if="showEdit" :order_id="order_id" :order_cus_od_code="order_cus_od_code" :selectOptions="selectOptions" @closeOrderEdit="handleCloseEdit" @closeIcon="handelCloseIcon"></order-edit>

    </div>
</template>

<script>
import ifsApi from "@/api/ifs";
import orderApi from "@/api/cbs/order.js";
import ebsApi from "@/api/gbs/ebs.js";
import orderEdit from "./order_edit.vue";
import orderProgress from "./progress/progress.vue";

export default {
    components: {
        orderEdit,
        orderProgress,
    },
    data() {
        return {
            selectTab: 1,
            tabimg: 1,
            condition: {
                page: 1,
                perPage: 20,
                columns: [],
                keyword: "",
                orderBy: "",
                query_state: "1",
            },
            placeholder:
                "货号/中文品名/英文品名/订单号/项目号/部门/业务员/客户",
            dataList: [],
            dataList1: [],
            view_type: 1,
            search: {},
            formTags: [],
            formConditions: {
                // 下拉选择
                order_dep_name: {
                    type: "select",
                    field: "order_dep_name",
                    title: "部门",
                    value: [],
                    treeName: "orderDep",
                    // 下拉选择框的下拉数据集配置
                    options: {
                        config: {
                            label: "value", // 下拉选项显示字段
                            value: "value", // 下拉选择值字段
                            multiple: true, // 是否为多选
                            tree: true,
                        },
                        data: [], // 下拉数据集
                    },
                },
                order_cus_id: {
                    type: "select",
                    field: "order_cus_id",
                    title: "客户名称",
                    value: [],
                    // 下拉选择框的下拉数据集配置
                    options: {
                        config: {
                            label: "trader_name", // 下拉选项显示字段
                            value: "trader_id", // 下拉选择值字段
                            multiple: true, // 是否为多选
                        },
                        data: [], // 下拉数据集
                    },
                },
                order_business_type: {
                    type: "select",
                    field: "order_business_type",
                    title: "业务类型",
                    value: [],
                    // 下拉选择框的下拉数据集配置
                    options: {
                        config: {
                            label: "lable", // 下拉选项显示字段
                            value: "value", // 下拉选择值字段
                            multiple: true, // 是否为多选
                        },
                        data: [], // 下拉数据集
                    },
                },
                // 日期区间过滤
                order_date: {
                    type: "date",
                    field: "order_date",
                    title: "下单日期",
                    value: {
                        start: "", // 起始日期
                        end: "", // 截止日期
                    },
                },
            },
            // 表格分页
            tablePages: {
                cur_page: 1, // 当前页
                page_count: 20, // 每页条数
                total: 0, // 总条数
            },
            showEdit: false,
            order_id: 0,
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
            progressOptions: {
                dep: [], //部门*
                allCus: [], // 客户*
            },
        };
    },
    created() {
        console.log("created111");
        this.findList();
        this.getDep();
        this.getOptions();
    },
    mounted() {},
    activated() {
        console.log("激活");
    },
    destroyed() {
        console.log("订单管理销毁");
    },
    computed: {},
    methods: {
        //标示状态
        handleToState(order_id, state) {
            let msg = "";
            if (state == 6) msg = "确定要标记该订单为完成吗？";
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
                            this.query();
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
        async getDep() {
            let list = await ifsApi.getList("", 2, 0);
            let dep = list.data || [];
            this.formConditions.order_dep_name.options.data =
                Object.freeze(dep);
            this.selectOptions.dep = Object.freeze(dep);
            this.progressOptions.dep = Object.freeze(dep);
        },
        getOptions() {
            //
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
                this.formConditions.order_business_type.options.data =
                    Object.freeze(res[1]["TY_YWLX"].children);
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
                this.formConditions.order_cus_id.options.data =
                    Object.freeze(cus);
                this.progressOptions.allCus = Object.freeze(cus);

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

        query() {
            this.tablePages.cur_page = 1;
            this.findList();
        },
        findList() {
            this.condition.page = this.tablePages.cur_page;
            this.condition.perPage = this.tablePages.page_count;
            this.condition.keyword = this.condition.keyword.trim();
            // 传condition获取List数据

            orderApi.getOrderList(this.condition).then((res) => {
                console.log("列表数据", res);
                if (res.code == 0) {
                    if (this.selectTab == 1) {
                        this.dataList1 = Object.freeze(res.data.list);
                    } else {
                        this.dataList = Object.freeze(res.data.list);
                    }
                    this.tablePages.cur_page = parseInt(res.data.page);
                    this.tablePages.total = parseInt(res.data.count);
                }
            });
        },

        // 改变selectTab
        selectChange(tabNum) {
            this.selectTab = tabNum;
            if (tabNum !== 8) {
                this.placeholder =
                    "货号/中文品名/英文品名/订单号/项目号/部门/业务员/客户";
                this.condition.query_state = tabNum.toString();
                this.condition.keyword = "";
                this.query();
            } else {
                this.placeholder = "订单号/货号";
            }
        },
        formatterNum({ cellValue }) {
            return this.$XEUtils.commafy(this.$XEUtils.toNumber(cellValue), {
                digits: 2,
            });
        },
        // 数据分页切换
        pageChange({ currentPage, pageSize }) {
            this.tablePages.cur_page = currentPage;
            this.tablePages.page_count = pageSize;
            this.findList();
        },
        // 排序
        handleSortChange({ column, property, order }) {
            if (order == "desc") {
                this.condition.orderBy = column.property + " " + "desc";
            }
            if (order == "asc") {
                this.condition.orderBy = column.property + " " + "asc";
            }
            this.query();
        },
        // 新建订单
        handleCreate() {
            this.order_id = 0;
            this.order_cus_od_code = "";
            this.showEdit = true;
        },
        // 筛选表单确认回调方法
        filterFormConfirm({ consArray }) {
            // 获取已设置的条件项值来刷新筛选表单标签值
            this.formTags = consArray || [];
            this.showTag();
            console.log("consArray", consArray);
        },
        showTag() {
            this.condition.columns = [];
            this.formTags.forEach((item) => {
                let obj = {
                    type: "",
                    field: "",
                    value: null,
                };
                obj.type = item.type;
                obj.field = item.field;
                obj.value = item.value;
                this.condition.columns.push(obj);
            });
            this.query();
        },
        // 关闭筛选标签
        closeTag(tag) {
            this.$refs["filterForm"].clearItem(tag.field);
            this.showTag();
        },
        // 清除筛选条件
        closeFilter() {
            this.$refs.filterForm.clearItems();
        },
        handleToEdit(order_id) {
            this.order_id = order_id;
            this.showEdit = true;
        },

        handleToDetail(row) {
            this.$router.push({
                path: "/order_detail",
                query: {
                    flag: row.order_code,
                    id: row.order_id,
                },
            });
        },

        handleToCopy(order_id) {
            this.$confirm("确定要复制该订单信息?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    orderApi.copyOrder(order_id).then((res) => {
                        if (res.code == 0) {
                            this.$message({
                                message: "复制订单成功！",
                                type: "success",
                            });
                            this.query();
                            this.handleToEdit(res.data);
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消复制订单",
                    });
                });
        },
        handleToDelete(order_id) {
            this.$confirm("确定要删除该订单?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    orderApi.deleteOrderInfo(order_id).then((res) => {
                        console.log("delete", res);
                        if (res.code == 0) {
                            this.$message({
                                message: "订单删除成功！",
                                type: "success",
                            });
                            this.query();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        handleToWithdraw(order_id) {
            this.$confirm("确定要撤回该订单?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    orderApi.orderWithdraw(order_id).then((res) => {
                        console.log("withdraw", res);
                        if (res.code == 0) {
                            this.$message({
                                message: "订单撤回成功！",
                                type: "success",
                            });
                            this.query();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消撤回",
                    });
                });
        },

        handleToPublish(order_id) {
            this.$confirm("确定要发布该订单?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    orderApi.orderPublish(order_id).then((result) => {
                        console.log("publish", result);
                        if (result.code == 0) {
                            this.$message({
                                message:  result.msg,
                                type: "success",
                            });
                            this.query();
                        }
						else
						{
							this.$message({
								message:  result.msg,
								type: "error",
							});	
						}
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消发布",
                    });
                });
        },
        handleCloseEdit() {
            this.showEdit = false;
            this.query();
        },
        handelCloseIcon() {
            this.showEdit = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.listform .form-button {
    top: -3px;
    right: 0px;
}
</style>
