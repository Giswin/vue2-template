<style scoped lang="scss">
//特殊样式，而不通用请在这里写样式
.list-table-l {
}
.wrapper .roles-container-wrapper .list-table /deep/ .vxe-toolbar {
    margin-top: 11px;
    right: 80px;
}
</style>
<template>
    <div class="roles-container-wrapper">

        <div class="filter">
            <div class="filter-tittle">
                过滤条件：
            </div>
            <div class="filter-body">
                <div class="filter-body-wrapper">
                    <filter-tag :tags="tableTags" @remove-tag="(tag)=>$refs.shipTable.clearFilter($refs.shipTable.getColumnByField(tag.field))"></filter-tag>
                </div>
            </div>
            <div class="filter-op">
                <div class="m-l">
                    <el-button size="mini" @click="closeFilter">清除</el-button>
                </div>
            </div>
        </div>
        <div class="list-table">
            <vxe-toolbar custom ref="tooltable2"></vxe-toolbar>
            <vxe-table ref="shipTable" id="shipData" :data="tableData" :custom-config="{storage: true}" border height="100%" class="mytable-scrollbar" show-overflow resizable size="small" :column-config="{ minWidth: 140 }" stripe auto-resize show-footer highlight-current-row highlight-hover-row :filter-config="{remote:false}" @filter-change="globalFilterMethod" :footer-method="footerMethod">
                <vxe-table-column field="seq" type="seq" title="序号" width="50" header-align="center" align="center" fixed="left"></vxe-table-column>
                <vxe-table-column field="shn_code" title="通知编码" :width="$columns.info.medium" header-align="center" align="left" sortable :filters="[{data: null}]" :filter-render="{name: 'FilterInput'}" fixed="left">
                </vxe-table-column>
                <vxe-table-column field="shn_invoice_no_ebs" title="运编号" min-width="140" header-align="center" align="left" sortable :filters="[{data: null}]" :filter-render="{name: 'FilterInput'}" fixed="left">
                </vxe-table-column>
                <vxe-table-column field="shnd_prj_no_ebs" title="项目号" :width="$columns.info.medium" header-align="center" align="left" sortable :filters="[{data: null}]" :filter-render="{name: 'FilterInput'}" fixed="left">
                </vxe-table-column>

                <vxe-table-column field="shn_dep_name" title="部门" :width="$columns.info.small" header-align="center" align="left" sortable :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}" fixed="left">
                </vxe-table-column>
                <vxe-table-column field="shn_sales_name" title="业务" :width="$columns.info.small" header-align="center" align="left" sortable :filters="[{data: null}]" :filter-render="{name: 'FilterInput'}" fixed="left">
                </vxe-table-column>
                <vxe-table-column field="shn_publish_time" title="发布时间" :width="$columns.info.medium" header-align="center" align="center" sortable :filters="[{data: {start: '', end: ''}}]" :filter-render="{name: 'FilterDate'}">
                </vxe-table-column>
                <vxe-table-column field="shn_title_name" title="出运抬头" :width="$columns.info.medium" header-align="center" align="left" sortable :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}">
                </vxe-table-column>
                <vxe-table-column field="shn_cus_name" title="结算客户" :width="$columns.info.medium" header-align="center" align="left" sortable :filters="[{data: null}]" :filter-render="{name: 'FilterInput'}">
                </vxe-table-column>
                <vxe-table-column field="shn_trade_mode" title="贸易方式" :width="$columns.info.medium" header-align="center" align="left" sortable :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}">
                </vxe-table-column>
                <vxe-table-column field="shn_port_from" title="装运港" min-width="130" header-align="center" align="center" sortable :filters="[{data: null}]" :filter-render="{name: 'FilterInput'}">
                </vxe-table-column>
                <vxe-table-column field="shn_port_to" title="目的港" min-width="130" header-align="center" align="left" sortable :filters="[{data: null}]" :filter-render="{name: 'FilterInput'}">
                </vxe-table-column>
                <vxe-table-column field="shn_qty_a" title="实际出运数量" min-width="130" header-align="center" align="right" formatter="formatAmount" sortable :filters="[{data: {start: '', end: ''}}]" :filter-render="{name: 'FilterRange'}">
                </vxe-table-column>
                <vxe-table-column field="shn_amount_a" title="出运金额" :width="$columns.type.medium" header-align="center" align="right" formatter="formatAmount" sortable :filters="[{data: {start: '', end: ''}}]" :filter-render="{name: 'FilterRange'}">
                </vxe-table-column>
                <vxe-table-column field="shn_currency" title="币种" :width="$columns.number.small" header-align="center" align="left" sortable :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}">
                </vxe-table-column>
                <vxe-table-column field="shn_ship_date" title="实际出运日期" min-width="130" header-align="center" align="center" sortable :filters="[{data: {start: '', end: ''}}]" :filter-render="{name: 'FilterDate'}">
                </vxe-table-column>
                <vxe-table-column field="shn_volume_a" title="体积" :width="$columns.number.medium" header-align="center" align="right" sortable :filters="[{data: {start: '', end: ''}}]" :filter-render="{name: 'FilterRange'}">
                </vxe-table-column>
                <vxe-table-column field="shn_weight_g_a" title="毛重" :width="$columns.number.medium" header-align="center" align="right" sortable :filters="[{data: {start: '', end: ''}}]" :filter-render="{name: 'FilterRange'}">
                </vxe-table-column>
                <vxe-table-column field="shn_weight_n_a" title="净重" :width="$columns.number.medium" header-align="center" align="right" sortable :filters="[{data: {start: '', end: ''}}]" :filter-render="{name: 'FilterRange'}">
                </vxe-table-column>

            </vxe-table>
        </div>

    </div>
</template>

<script>
import analysisApi from "@/api/cbs/analysis.js";
export default {
    components: {},

    data() {
        return {
            tableData: [],
            // 表格列条件项标签值
            tableTags: [],
            condition: {
                sh_date_b: "", //出运发布时间起始，默认当年1月1日
                sh_date_e: "", //出运发布时间结束，默认当天
            },
        };
    },
    created() {
        this.$nextTick(() => {
            // 手动将表格和工具栏进行关联
            this.$refs.shipTable.connect(this.$refs.tooltable2);
        });
        analysisApi.getshipDetail(this.condition).then((res) => {
            this.tableData = Object.freeze(res.data || []);
        });
    },

    mounted() {
        // this.$general.filterChange(this, "shipTable");
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
        footerMethod({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex === 0) {
                        return "合计";
                    }
                    if (
                        ["shn_qty_a", "shn_amount_a"].includes(column.property)
                    ) {
                        let num = this.$XEUtils.sum(data, column.property);
                        return this.$general.transform(num, 2);
                    }
                    if (
                        [
                            "shn_volume_a",
                            "shn_weight_g_a",
                            "shn_weight_n_a",
                        ].includes(column.property)
                    ) {
                        let num = this.$XEUtils.sum(data, column.property);
                        return this.$general.transform(num, 3);
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
        closeFilter() {
            this.$refs.shipTable.clearFilter();
            this.tableTags = [];
        }, //清除所有过滤条件

        filterCloseFun() {
            this.$refs.shipTable.closeFilter();
            console.log("关闭");
        },
    },
    watch: {},
};
</script>

