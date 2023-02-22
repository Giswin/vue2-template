<template>
    <div class="detail-wrap">
        <div class="listform">
            <div class="form-body" style="margin-right:15px;">
                <ul>
                    <li>
                        <span>部门:</span>
                        <el-select ref="depSelect" v-model="depStr" collapse-tags placeholder="请选择部门" size="small" clearable multiple @change="changeDep" @clear="clearDep" style="width: 170px; margin-left: 5px">
                            <el-tree ref="listTree3" :data="selectOptions.dep" :props="defaultProps" show-checkbox node-key="dep_id" @check-change="depClick"></el-tree>
                            <el-option v-for="item in selectOptions.dep" :key="item.value" :value="item.value" :label="item.title" style="display: none;"></el-option>
                        </el-select>
                    </li>
                    <li>
                        <span>供应商:</span>
                        <el-select class="vender-select" v-model="condition.contract_actual_supply_title_id" placeholder="请输入关键字选择" size="small" clearable filterable remote :remote-method="remoteVender">
                            <el-option v-for="item in venOptions" :key="item.trader_id" :value="item.trader_name" :label="item.trader_name"></el-option>
                        </el-select>
                    </li>
                    <li>
                        <el-select v-model="condition.contract_category" size="small" clearable placeholder="合同类型" style="width: 90px; margin-left: 5px">
                            <el-option v-for="item in contractType" :key="item.value" :value="item.value" :label="item.label"></el-option>
                        </el-select>
                    </li>
                    <li>

                        <span>下单日期:</span>
                        <el-date-picker value-format="yyyy-MM-dd" v-model="condition.contract_create_time_start" type="date" transfer size="small" style="width: 130px; margin-left: 5px"></el-date-picker>
                        <span style="padding: 0px 5px">至</span>
                        <el-date-picker value-format="yyyy-MM-dd" v-model="condition.contract_create_time_end" type="date" transfer size="small" style="width: 130px"></el-date-picker>
                    </li>

                </ul>

                <div class="query-button">
                    <el-button size="small" @click="query">查询</el-button>
                </div>
            </div>
        </div>
        <div class="detail-filter">

            <div class="filter-tags">过滤条件：</div>
            <div class="filter-contain">
                <div class="filter-main">
                    <filter-tag :tags="tableTags" @remove-tag="
                            (tag) =>
                                $refs.userTable.clearFilter(
                                    $refs.userTable.getColumnByField(tag.field)
                                )
                        "></filter-tag>
                </div>
            </div>

            <div class="filter-btns">
                <div class="m-l">
                    <el-button size="mini" @click="closeFilter">清除</el-button>
                </div>
            </div>
        </div>
        <div class="detail-table">

            <vxe-toolbar custom ref="tooltable"></vxe-toolbar>

            <vxe-table ref="userTable" id="venData" border :data="tableData" height="100%" class="mytable-scrollbar" show-overflow resizable size="small" :column-config="{ minWidth: 140 }" stripe auto-resize show-footer highlight-current-row highlight-hover-row :filter-config="{ remote: false }" @filter-change="globalFilterMethod" :footer-method="footerMethod">
                <vxe-table-column field="seq" type="seq" title="序号" width="50" header-align="center" align="center" fixed="left"></vxe-table-column>
                <vxe-table-column field="contract_code" title="合同号" :width="$columns.info.medium" header-align="center" align="left" fixed="left" sortable :filters="[{ data: null }]" :filter-render="{ name: 'FilterInput' }">
                </vxe-table-column>
                <vxe-table-column field="contract_dep_name" title="部门" :width="$columns.info.medium" header-align="center" align="left" fixed="left" sortable :filters="[{ data: null }]" :filter-render="{ name: 'FilterInput' }">
                </vxe-table-column>
                <vxe-table-column field="contract_salesman_name" title="业务员" :width="$columns.info.small" header-align="center" align="left" fixed="left" sortable :filters="[{ data: null }]" :filter-render="{ name: 'FilterInput' }">
                </vxe-table-column>
                <vxe-table-column field="contract_creator" title="采购员" min-width="120" header-align="center" align="left" sortable :filters="[{ data: null }]" :filter-render="{ name: 'FilterInput' }">
                </vxe-table-column>
                <vxe-table-column field="contract_publish_time" title="发布日期" :width="$columns.date.medium" header-align="center" align="center" sortable :filters="[{ data: { start: '', end: '' } }]" :filter-render="{ name: 'FilterDate' }">
                </vxe-table-column>
                <vxe-table-column field="contract_detail_etd" title="交期" :width="$columns.date.medium" header-align="center" align="center" sortable :filters="[{ data: { start: '', end: '' } }]" :filter-render="{ name: 'FilterDate' }">
                </vxe-table-column>

                <vxe-table-column field="contract_title_name" title="下单抬头" header-align="center" align="left" sortable :filters="[{ data: { vals: [], sVal: '' } }]" :filter-render="{ name: 'FilterSelect' }">
                </vxe-table-column>

                <vxe-table-column field="contract_detail_article_number" title="货号" :width="$columns.info.medium" header-align="center" align="left" sortable :filters="[{ data: null }]" :filter-render="{ name: 'FilterInput' }">
                </vxe-table-column>
                <vxe-table-column field="contract_detail_name" title="品名" :width="$columns.info.medium" header-align="center" align="left" :filters="[{ data: null }]" :filter-render="{ name: 'FilterInput' }">
                </vxe-table-column>
                <vxe-table-column field="contract_detail_spec" title="规格" header-align="center" align="left" :filters="[{ data: null }]" :filter-render="{ name: 'FilterInput' }">
                </vxe-table-column>
                <vxe-table-column field="contract_actual_supply_title_name" title="供应商" header-align="center" align="left" sortable :filters="[{ data: null }]" :filter-render="{ name: 'FilterInput' }">
                </vxe-table-column>

                <vxe-table-column field="contract_currency" title="币种" :width="$columns.type.medium" header-align="center" align="left" sortable :filters="[{ data: { vals: [], sVal: '' } }]" :filter-render="{ name: 'FilterSelect' }">
                </vxe-table-column>
                <vxe-table-column field="contract_detail_amount" title="金额" min-width="120" header-align="center" align="right" sortable :filters="[{ data: { start: '', end: '' } }]" :filter-render="{ name: 'FilterRange' }">
                </vxe-table-column>

            </vxe-table>
        </div>
    </div>

</template>

<script>
import analysisApi from "@/api/cbs/analysis.js";

export default {
    props: {
        selectOptions: Object,
    },
    data() {
        return {
            condition: {
                contract_dep_id_arr: [],
                contract_create_time_start: "",
                contract_create_time_end: "",
                contract_actual_supply_title_id: "",
                contract_category: "purchase",
            },
            depStr: [],
            defaultProps: {
                children: "children",
                label: "title",
            },
            venOptions: [],
            contractType: [
                { label: "采购", value: "purchase" },
                { label: "加工", value: "process" },
            ],
            // 表格列条件项标签值
            tableTags: [],
            tableData: [],
        };
    },
    created() {
        this.$nextTick(() => {
            // 手动将表格和工具栏进行关联
            this.$refs.userTable.connect(this.$refs.tooltable);
        });
        this.date();
        this.query();
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
        date() {
            let date = new Date();
            let y = date.getFullYear();
            let m = (date.getMonth() + 1).toString().padStart(2, "0");
            let d = date.getDate().toString().padStart(2, "0");
            let start = y + "-01-01";
            let end = y + "-" + m + "-" + d;
            this.condition.contract_create_time_start = start;
            this.condition.contract_create_time_end = end;
        },
        query() {
            analysisApi.getAnalysisDetail(this.condition).then((res) => {
                this.tableData = Object.freeze(res.data);
            });
        },
        depClick() {
            let checkData = this.$refs.listTree3.getCheckedNodes();
            console.log("checkData", checkData);
            let dep_ids = [];
            this.depStr = [];
            checkData.forEach((item) => {
                if (item.end) {
                    dep_ids.push(item.value);
                    this.depStr.push(item.title);
                }
            });
            this.condition.contract_dep_id_arr = dep_ids;
            console.log("dep_ids_arr", dep_ids);
            console.log("depStr", this.depStr);
        },
        changeDep() {
            let selectNotes = this.$refs.listTree3.getCheckedNodes();
            let filterNotes = [];
            selectNotes.forEach((item) => {
                if (this.depStr.includes(item.title)) {
                    filterNotes.push(item);
                }
            });
            this.$refs.listTree3.setCheckedNodes(filterNotes);
        },
        clearDep() {
            this.$refs.listTree3.setCheckedKeys([]);
            this.condition.contract_dep_id_arr = [];
            this.depStr = [];
        },

        remoteVender(query) {
            if (query !== "") {
                this.venOptions = this.selectOptions.vender.filter((item) => {
                    return (
                        item.trader_name
                            .toLowerCase()
                            .indexOf(query.toLowerCase()) > -1
                    );
                });
            } else {
                this.venOptions = [];
            }
        },
        //清除所有过滤条件
        closeFilter() {
            this.$refs.userTable.clearFilter();
            this.tableTags = [];
        },
        filterCloseFun() {
            this.$refs.userTable.closeFilter();
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
        footerMethod({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex === 0) {
                        return "合计";
                    }
                    if (["contract_detail_amount"].includes(column.property)) {
                        let num = this.$XEUtils.sum(data, column.property);
                        return this.$general.transform(num, 2);
                    }

                    return "-";
                }),
            ];
        },
    },
};
</script>

<style lang="scss" scoped>
.detail-wrap {
    .detail-filter {
        position: absolute;
        top: 113px;
        left: 5px;
        right: 0;
        z-index: 99;
        display: flex;
        .filter-contain {
            .filter-main {
                margin-bottom: 0px;
            }
        }
        .filter-btns {
            position: absolute;
            right: 10px;
        }
    }
    .detail-table {
        position: absolute;
        left: 0;
        top: 150px;
        right: 0;
        bottom: 50px;
        >>> .vxe-toolbar {
            position: absolute;
            z-index: 99;
            top: -50px;
            right: 80px;
            background-color: transparent;
        }
    }
}

.vender-select {
    max-width: 150px;
    margin-left: 5px;
}
.form-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0px;
    .query-button {
        position: absolute;
        top: 10px;
        left: 900px;
    }
}
</style>