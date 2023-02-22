<style scoped lang="scss">
//特殊样式，而不通用请在这里写样式
.list-table-l {
}
.wrapper .roles-container-wrapper .list-table /deep/ .vxe-toolbar {
    margin-top: 11px;
    right: 135px;
}
</style>
<template>
    <div class="roles-container-wrapper">
        <div class="filter">
            <div class="filter-tittle">过滤条件：</div>
            <div class="filter-body">
                <div class="filter-body-wrapper">
                    <filter-tag :tags="tableTags" @remove-tag="
                            (tag) =>
                                $refs.userTable.clearFilter(
                                    $refs.userTable.getColumnByField(tag.field)
                                )
                        "></filter-tag>
                </div>
            </div>

            <div class="filter-op">
                <div class="m-l">
                    <el-button size="mini" @click="closeFilter">清除</el-button>
                    <el-button size="mini" @click="exportDataEvent">导出</el-button>
                </div>
            </div>
        </div>
        <div class="list-table">

            <vxe-toolbar custom ref="tooltable"></vxe-toolbar>

            <vxe-table ref="userTable" id="tableData" border height="100%" class="mytable-scrollbar" show-overflow resizable size="small" :column-config="{ minWidth: 140 }" stripe auto-resize show-footer highlight-current-row highlight-hover-row :filter-config="{ remote: false }" @filter-change="globalFilterMethod" :footer-method="footerMethod" :data="tableData">
                <vxe-table-column field="seq" type="seq" title="序号" width="50" header-align="center" align="center" fixed="left"></vxe-table-column>
                <vxe-table-column field="order_code" title="订单号" header-align="center" align="left" fixed="left" sortable :filters="[{ data: null }]" :filter-render="{ name: 'FilterInput' }">
                </vxe-table-column>
                <vxe-table-column field="order_dep_name" title="部门" :width="$columns.info.medium" header-align="center" align="left" fixed="left" sortable :filters="[{ data: null }]" :filter-render="{ name: 'FilterInput' }">
                </vxe-table-column>
                <vxe-table-column field="order_salesman_name" title="业务员" :width="$columns.info.small" header-align="center" align="left" fixed="left" sortable :filters="[{ data: null }]" :filter-render="{ name: 'FilterInput' }">
                </vxe-table-column>
                <vxe-table-column field="order_title_name" title="接单抬头" header-align="center" align="left" sortable :filters="[{ data: { vals: [], sVal: '' } }]" :filter-render="{ name: 'FilterSelect' }">
                </vxe-table-column>
                <vxe-table-column field="order_cus_name" title="客户" header-align="center" align="left" sortable :filters="[{ data: null }]" :filter-render="{ name: 'FilterInput' }">
                </vxe-table-column>
                <vxe-table-column field="order_cus_od_code" title="客户订单号" header-align="center" align="left" sortable :filters="[{ data: null }]" :filter-render="{ name: 'FilterInput' }">
                </vxe-table-column>
                <vxe-table-column field="order_goods_article_number" title="货号" header-align="center" align="left" sortable :filters="[{ data: null }]" :filter-render="{ name: 'FilterInput' }">
                </vxe-table-column>
                <vxe-table-column field="order_goods_name" title="品名" :width="$columns.info.medium" header-align="center" align="left" sortable :filters="[{ data: null }]" :filter-render="{ name: 'FilterInput' }">
                </vxe-table-column>

                <vxe-table-column field="order_date" title="接单日期" :width="$columns.date.medium" header-align="center" align="center" sortable :filters="[{ data: { start: '', end: '' } }]" :filter-render="{ name: 'FilterDate' }">
                </vxe-table-column>

                <vxe-table-column field="order_publish_time" title="发布时间" :width="$columns.date.medium" header-align="center" align="center" sortable :filters="[{ data: { start: '', end: '' } }]" :filter-render="{ name: 'FilterDate' }">
                </vxe-table-column>
                <vxe-table-column field="order_state_str" title="状态" :width="$columns.type.medium" header-align="center" align="left" sortable :filters="[{ data: { vals: [], sVal: '' } }]" :filter-render="{ name: 'FilterSelect' }">
                </vxe-table-column>
                <vxe-table-column field="order_trade_type" title="内外销" :width="$columns.type.medium" header-align="center" align="left" sortable :filters="[{ data: { vals: [], sVal: '' } }]" :filter-render="{ name: 'FilterSelect' }">
                </vxe-table-column>
                <vxe-table-column field="order_business_type" title="业务类型" :width="$columns.type.medium" header-align="center" align="left" sortable :filters="[{ data: { vals: [], sVal: '' } }]" :filter-render="{ name: 'FilterSelect' }">
                </vxe-table-column>
                <vxe-table-column field="order_goods_qty" title="数量" :width="$columns.info.medium" header-align="center" align="right" formatter="formatNumber" sortable :filters="[{ data: { start: '', end: '' } }]" :filter-render="{ name: 'FilterRange' }">
                </vxe-table-column>
                <vxe-table-column field="order_goods_unit" title="单位" :width="$columns.info.small" header-align="center" align="left" sortable :filters="[{ data: null }]" :filter-render="{ name: 'FilterInput' }">
                </vxe-table-column>

                <vxe-table-column field="order_goods_price" title="单价" :width="$columns.info.small" header-align="center" align="right" sortable :filters="[{ data: { start: '', end: '' } }]" :filter-render="{ name: 'FilterRange' }">
                </vxe-table-column>

                <vxe-table-column field="order_currency" title="币种" :width="$columns.type.small" header-align="center" align="left" sortable :filters="[{ data: { vals: [], sVal: '' } }]" :filter-render="{ name: 'FilterSelect' }">
                </vxe-table-column>
                <vxe-table-column field="order_ex_rate_oc" title="汇率" :width="$columns.number.medium" header-align="center" align="right" sortable :filters="[{ data: { start: '', end: '' } }]" :filter-render="{ name: 'FilterRange' }">
                </vxe-table-column>
                <vxe-table-column field="order_goods_amount" title="原币金额" :width="$columns.number.max" header-align="center" align="right" formatter="formatAmount" sortable :filters="[{ data: { start: '', end: '' } }]" :filter-render="{ name: 'FilterRange' }">
                </vxe-table-column>
                <vxe-table-column field="order_goods_amount_cny" title="人民币金额" :width="$columns.number.max" header-align="center" align="right" formatter="formatAmount" sortable :filters="[{ data: { start: '', end: '' } }]" :filter-render="{ name: 'FilterRange' }">
                </vxe-table-column>
                <vxe-table-column field="order_goods_amount_usd" title="美元金额" :width="$columns.number.max" header-align="center" align="right" formatter="formatAmount" sortable :filters="[{ data: { start: '', end: '' } }]" :filter-render="{ name: 'FilterRange' }">
                </vxe-table-column>

                <vxe-table-column field="order_price_clause" title="价格条款" :width="$columns.type.medium" header-align="center" align="left" sortable :filters="[{ data: { vals: [], sVal: '' } }]" :filter-render="{ name: 'FilterSelect' }">
                </vxe-table-column>
                <vxe-table-column field="order_collect_mode" title="收款方式" :width="$columns.type.medium" header-align="center" align="left" sortable :filters="[{ data: { vals: [], sVal: '' } }]" :filter-render="{ name: 'FilterSelect' }">
                </vxe-table-column>
            </vxe-table>
        </div>
    </div>
</template>

<script>
import analysisApi from "@/api/cbs/analysis.js";
export default {
    components: {},

    created() {
        this.$nextTick(() => {
            // 手动将表格和工具栏进行关联
            this.$refs.userTable.connect(this.$refs.tooltable);
        });
        analysisApi.getOrderDetail().then((res) => {
            this.tableData = Object.freeze(res.data || []);
            console.log("tableData", this.tableData);
            this.$nextTick(() => {
                this.filterState();
            });
        });
    },
    data() {
        return {
            tableData: [],
            // 表格列条件项标签值
            tableTags: [],
        };
    },
    mounted() {
        // this.$general.filterChange(this, "userTable");
        this.$nextTick(() => {
            let filterBtns =
                document.getElementsByClassName("vxe-cell--filter");

            for (let j = 0; j < filterBtns.length; j++) {
                filterBtns[j].addEventListener("mouseup", this.filterCloseFun);
            }
        });
    },
    beforeDestroy() {
        let filterBtns = document.getElementsByClassName("vxe-cell--filter");

        for (let j = 0; j < filterBtns.length; j++) {
            filterBtns[j].removeEventListener("mouseup", this.filterCloseFun);
        }
        this.filterFun = null;
    },
    methods: {
        filterState() {
            const xTable = this.$refs.userTable;
            const column = xTable.getColumnByField("order_state_str");
            // 修改第一个选项为勾选状态
            const option = column.filters[0];
            option.data.vals.push("已审");

            option.checked = true;
            // 修改条件之后，需要手动调用 updateData 处理表格数据
            xTable.updateData();
            let obj = {
                field: "order_state_str",
                title: column.title,
                value: option.data.vals,
            };
            this.tableTags.push(obj);
        },
        footerMethod({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex === 0) {
                        return "合计";
                    }
                    if (
                        [
                            "order_goods_amount",
                            "order_goods_amount_cny",
                            "order_goods_amount_usd",
                        ].includes(column.property)
                    ) {
                        let num = this.$XEUtils.sum(data, column.property);
                        return this.$general.transform(num, 2);
                    }
                    if (["order_goods_qty"].includes(column.property)) {
                        let num = this.$XEUtils.sum(data, column.property);
                        return this.$general.transform(num, 0);
                    }
                    return "-";
                }),
            ];
        },
        // 自定义筛选过滤方法
        filterUserNameMethod({ option, row }) {
            return row.user_name.indexOf(option.data) > -1;
        },

        // 当使用服务端条件筛选时，定义的全局筛选过滤方法，取到条件过滤值
        globalFilterMethod({ filterList }) {
            this.tableTags = this.$XEUtils.map(filterList, (filterItem) => {
                return {
                    field: filterItem.property,
                    title: filterItem.column.title,
                    value: filterItem.datas[0].vals
                        ? filterItem.datas[0].vals
                        : filterItem.datas[0],
                };
            });
        },

        exportDataEvent() {
            this.$refs.userTable.exportData({ type: "csv" });
        },
        //清除所有过滤条件
        closeFilter() {
            this.$refs.userTable.clearFilter();
            this.tableTags = [];
        },
        filterCloseFun() {
            this.$refs.userTable.closeFilter();
        },
    },
    watch: {},
};
</script>

