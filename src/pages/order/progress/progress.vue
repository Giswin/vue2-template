<template>
    <div>

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
                        <filter-form ref="filterForm" :conditions="proConditions" label_width="110px" :view_type="view_type" @search="filterFormConfirm"></filter-form>
                    </div>
                    <div class="m-l" style="margin-left: 5px;">
                        <el-button size="small" @click="closeFilter">清空筛选</el-button>
                    </div>
                    <div class="m-l" style="margin-left: 5px;">
                        <!-- <el-button size="small" type="primary" @click="handleCreate">新建</el-button> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="tabs-list-body tabs-list-body-table">
            <div class="table of">
                <vxe-table border :data="dataList2" resizable size="small" auto-resize height="100%" :column-config="{minWidth:140}" :sort-config="{remote:true}" @sort-change="handleSortChange" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row>
                    <vxe-table-column field="order_cus_od_code" title="订单号" header-align="center" min-width="120" align="left" fixed="left" sortable></vxe-table-column>
                    <vxe-table-column field="order_dep_name" title="部门" header-align="center" min-width="100" align="left" sortable></vxe-table-column>
                    <vxe-table-column field="order_salesman_name" title="业务员" header-align="center" min-width="100" align="left" sortable></vxe-table-column>
                    <vxe-table-column field="order_cus_name" title="客户" header-align="center" min-width="140" align="left" sortable></vxe-table-column>
                    <vxe-table-column field="order_date" title="接单日期" header-align="center" align="center" min-width="100" sortable></vxe-table-column>
                    <vxe-table-column field="order_delivery_date" title="交货期" header-align="center" align="center" min-width="100" sortable></vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="货号" header-align="center" min-width="120" align="left" sortable></vxe-table-column>
                    <vxe-table-column field="order_goods_name" title="销售品名" header-align="center" min-width="120" align="left" sortable></vxe-table-column>
                    <vxe-table-column field="order_goods_spec" title="销售规格" header-align="center" min-width="140" align="left" sortable></vxe-table-column>
                    <vxe-table-column field="order_goods_qty" title="订单数" header-align="center" min-width="120" align="right" sortable></vxe-table-column>
                    <vxe-table-column field="order_goods_bom_ven_name" title="供应商" header-align="center" min-width="140" align="left" sortable></vxe-table-column>
                    <vxe-table-column field="order_goods_bom_name" title="采购品名" header-align="center" min-width="120" align="left" sortable></vxe-table-column>
                    <vxe-table-column field="order_goods_bom_spec" title="采购规格" header-align="center" min-width="140" align="left" sortable></vxe-table-column>
                    <vxe-table-column field="order_goods_bom_qty" title="采购数量" header-align="center" min-width="100" align="right" :formatter="formatterNum" sortable></vxe-table-column>
                    <vxe-table-column field="order_goods_bom_price" title="采购价" header-align="center" min-width="100" align="right" sortable></vxe-table-column>
                    <vxe-table-column field="order_goods_bom_storage_qty" title="入库数" header-align="center" min-width="100" align="right" :formatter="formatterNum" sortable></vxe-table-column>
                    <vxe-table-column field="order_goods_shipping_qty" title="出运数" header-align="center" min-width="100" align="right" :formatter="formatterNum" sortable></vxe-table-column>
                    <vxe-table-column title="操作" header-align="center" min-width="110" align="center" fixed="right">
                        <template #default="{ row }">
                            <el-dropdown>
                                <el-button size="mini">
                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="stockIn(row)">入库信息</el-dropdown-item>
                                    <el-dropdown-item @click.native="traceInfo(row)">跟踪信息</el-dropdown-item>
                                    <el-dropdown-item @click.native="stateMark(row)">标记状态</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </vxe-table-column>
                </vxe-table>

            </div>

            <div class="list-bottom">
                <div class="m-r">
                    <vxe-pager background :current-page.sync="tablePages.cur_page" :page-size.sync="tablePages.page_count" :total="tablePages.total" @page-change="pageChange" :page-sizes="[10,20,50,100,500,1000,10000]">
                    </vxe-pager>
                </div>
                <div class="clear"></div>
            </div>
            <stock-in v-if="showStock" :stockInList="stockInList" :stockInfo="stockBasic" @closeStock="closeStock" @closeIcon="closeIcon"></stock-in>
            <trace v-if="showTrace" :traceList="traceList" :traceInfo="traceBasic" @closeTrace="closeTrace" @closeIcon="closeIcon"></trace>
            <mark-state v-if="showState" :stateInfo="stateBasic" @closeState="closeState" @closeIcon="closeIcon"></mark-state>
        </div>
    </div>
</template>

<script>
import orderApi from "@/api/cbs/order.js";
import stockIn from "./stockIn.vue";
import trace from "./trace.vue";
import markState from "./markState.vue";
export default {
    components: {
        stockIn,
        trace,
        markState,
    },
    props: {
        progressOptions: {
            type: Object,
        },
        keyword: {
            type: String,
        },
    },
    data() {
        return {
            proConditions: {
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
                order_goods_state: {
                    type: "select",
                    field: "order_goods_state",
                    title: "状态选择",
                    value: [],
                    options: {
                        config: {
                            label: "label",
                            value: "value",
                            multiple: true,
                        },
                        data: [
                            { label: "正在执行", value: 1 },
                            { label: "已经完成", value: 2 },
                            { label: "异常终止", value: 3 },
                        ],
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
            condition: {
                page: 1,
                perPage: 20,
                columns: [],
                keyword: "",
            },
            view_type: 1,
            dataList2: [],
            search: {},
            formTags: [],
            timer: null,
            // 表格分页
            tablePages: {
                cur_page: 1, // 当前页
                page_count: 20, // 每页条数
                total: 0, // 总条数
            },
            showStock: false,
            stockInList: [],
            stockBasic: {
                order_goods_bom_id: "", //编号-PK
                order_code: "", //订单号
                order_goods_article_number: "", //货号
                order_goods_name: "", //品名
                order_goods_bom_ven_name: "", //供应商
                order_goods_bom_qty: "", //采购数量
            },
            showTrace: false,
            traceList: [],
            traceBasic: {
                order_goods_bom_id: "", //编号-PK
                order_code: "", //订单号
                order_goods_article_number: "", //货号
                order_goods_name: "", //品名
                order_goods_bom_ven_name: "", //供应商
                order_goods_bom_qty: "", //采购数量
            },
            showState: false,
            stateBasic: {
                order_goods_id: "", //编号-PK
                order_code: "", //订单号
                order_goods_article_number: "", //货号
                order_goods_name: "", //品名
                order_goods_bom_ven_name: "", //供应商
                order_goods_bom_qty: "", //采购数量
                order_goods_state: "", //订单状态
            },
        };
    },
    created() {
        this.findList();
        this.handleOptions();
    },
    methods: {
        handleOptions() {
            this.proConditions.order_dep_name.options.data =
                this.progressOptions.dep;
            this.proConditions.order_cus_id.options.data =
                this.progressOptions.allCus;
        },
        query() {
            this.tablePages.cur_page = 1;
            this.findList();
        },
        findList() {
            this.condition.page = this.tablePages.cur_page;
            this.condition.perPage = this.tablePages.page_count;
            // 传condition获取List数据
            orderApi.progressList(this.condition).then((res) => {
                console.log("进度列表", res);
                if (res.code == 0) {
                    this.dataList2 = Object.freeze(res.data.list);
                    this.tablePages.cur_page = parseInt(res.data.page);
                    this.tablePages.total = parseInt(res.data.count);
                }
            });
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
        // 筛选表单确认回调方法
        filterFormConfirm({ consArray }) {
            // 获取已设置的条件项值来刷新筛选表单标签值
            this.formTags = consArray || [];
            this.showTag();
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

        // 入库信息
        stockIn(row) {
            console.log("入库信息", row);
            this.stockInList = JSON.parse(row.order_goods_bom_storage_info);
            console.log("stockList", this.stockInList);
            this.stockBasic.order_goods_bom_id = row.order_goods_bom_id;
            this.stockBasic.order_cus_od_code = row.order_cus_od_code;
            this.stockBasic.order_goods_article_number =
                row.order_goods_article_number;
            this.stockBasic.order_goods_name = row.order_goods_name;
            this.stockBasic.order_goods_bom_ven_name =
                row.order_goods_bom_ven_name;
            this.stockBasic.order_goods_bom_qty = row.order_goods_bom_qty;

            this.showStock = true;
        },
        // 跟踪信息
        traceInfo(row) {
            this.traceList = JSON.parse(row.order_goods_bom_tracking_info);
            console.log("traceList", this.traceList);
            this.traceBasic.order_goods_bom_id = row.order_goods_bom_id;
            this.traceBasic.order_cus_od_code = row.order_cus_od_code;
            this.traceBasic.order_goods_article_number =
                row.order_goods_article_number;
            this.traceBasic.order_goods_name = row.order_goods_name;
            this.traceBasic.order_goods_bom_ven_name =
                row.order_goods_bom_ven_name;
            this.traceBasic.order_goods_bom_qty = row.order_goods_bom_qty;

            this.showTrace = true;
        },
        // 状态标记
        stateMark(row) {
            this.stateBasic.order_goods_id = row.order_goods_id;
            this.stateBasic.order_goods_state = row.order_goods_state;
            this.stateBasic.order_goods_abort_reason =
                row.order_goods_abort_reason;

            this.stateBasic.order_cus_od_code = row.order_cus_od_code;
            this.stateBasic.order_goods_article_number =
                row.order_goods_article_number;
            this.stateBasic.order_goods_name = row.order_goods_name;
            this.stateBasic.order_goods_bom_ven_name =
                row.order_goods_bom_ven_name;
            this.stateBasic.order_goods_bom_qty = row.order_goods_bom_qty;
            this.showState = true;
        },
        closeStock() {
            this.showStock = false;
            this.query();
        },
        closeTrace() {
            this.showTrace = false;
            this.query();
        },
        closeState() {
            this.showState = false;
            this.query();
        },
        closeIcon(data) {
            if (data == 1) {
                this.showStock = false;
            }
            if (data == 2) {
                this.showTrace = false;
            }
            if (data == 3) {
                this.showState = false;
            }
        },
        keySearch(newVal) {
            this.condition.keyword = newVal;
            this.query();
        },
    },
    watch: {
        keyword: {
            handler(newVal, oldVal) {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    this.keySearch(newVal);
                }, 1000);
            },
        },
    },
};
</script>

<style scoped lang="scss">
.listform .form-button {
    top: -3px;
    right: 0px;
}
</style>