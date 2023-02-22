<template>
    <div>
        <div class="listform">
            <div class="form-body" style="margin-right:15px;">
                <!-- 这里的宽度是根据右边来定的，如果你要修改这里的宽度，右边也要相等增加对应像素 -->
                <ul>
                    <li>
                        <span>部门:</span>
                        <el-select ref="depSelect" v-model="depStr" collapse-tags placeholder="请选择部门" size="small" clearable multiple @change="changeDep" @clear="clearDep" style="width: 180px; margin-left: 10px">
                            <el-tree ref="listTree" :data="allDep" :props="defaultProps" show-checkbox node-key="dep_id" @check-change="depClick"></el-tree>
                            <el-option v-for="item in allDep" :key="item.value" :value="item.value" :label="item.title" style="display: none;"></el-option>
                        </el-select>
                    </li>
                    <li>

                        <span>下单日期:</span>
                        <el-date-picker value-format="yyyy-MM-dd" v-model="condition.contract_create_time_start" type="date" transfer size="small" style="width: 130px; margin-left: 10px"></el-date-picker>
                        <span style="padding: 0px 5px">至</span>
                        <el-date-picker value-format="yyyy-MM-dd" v-model="condition.contract_create_time_end" type="date" transfer size="small" style="width: 130px"></el-date-picker>
                    </li>

                </ul>

                <div class="query-button">
                    <el-button size="small" @click="query">查询</el-button>
                </div>
            </div>

        </div>
        <div class="vender-table">
            <div class="table-left">
                <div class="left-title">
                    <div class="class-title">
                        <div class="title">采购列表</div>
                    </div>
                    <div class="tip"><i class="el-icon-info"></i>点击供应商可展开详细信息</div>
                </div>
                <div class="purchase-table">
                    <vxe-table ref="purchaseTable" border :data="purchaseList" size="small" resizable height="100%" show-footer :footer-method="footerMethod" :column-config="{minWidth:84}" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row>
                        <vxe-table-column field="seq" type="seq" title="序号" width="40" header-align="center" align="center">
                        </vxe-table-column>
                        <vxe-table-column field="contract_actual_supply_title_name" title="供应商" header-align="center" align="left">
                            <template v-slot="{row}">
                                <span @click="handleToBI(row,1)">{{row.contract_actual_supply_title_name}}</span>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="purchase_num" title="采购次数" sortable header-align="center" align="right"></vxe-table-column>
                        <vxe-table-column field="purchase_percent" title="次数占比" sortable header-align="center" align="right">
                            <template #default="{row}">
                                <span> {{ row.purchase_percent+'%' }}
                                </span>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="product_num" title="采购成品数" sortable header-align="center" align="right" min-width="95"></vxe-table-column>
                        <vxe-table-column field="product_percent" title="成品数占比" sortable header-align="center" align="right" min-width="95">
                            <template #default="{row}">
                                <span> {{ row.product_percent+'%' }}
                                </span>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="money" title="金额CNY(万)" sortable header-align="center" align="right" min-width="105" formatter="formatAmount"></vxe-table-column>
                    </vxe-table>
                </div>
            </div>

            <div class="table-right">

                <div class="right-title">
                    <div class="class-title">
                        <div class="title">加工列表</div>
                    </div>
                    <div class="tip"><i class="el-icon-info"></i>点击供应商可展开详细信息</div>
                </div>
                <div class="process-table">
                    <vxe-table ref="processTable" border :data="processList" size="small" resizable height="100%" show-footer :footer-method="footerMethod" :column-config="{minWidth:84}" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row>
                        <vxe-table-column field="seq" type="seq" title="序号" width="40" header-align="center" align="center">
                        </vxe-table-column>
                        <vxe-table-column field="contract_actual_supply_title_name" title="供应商" header-align="center" align="left">
                            <template v-slot="{row}">
                                <span @click="handleToBI(row,2)">{{row.contract_actual_supply_title_name}}</span>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="purchase_num" title="采购次数" sortable header-align="center" align="right"></vxe-table-column>
                        <vxe-table-column field="purchase_percent" title="次数占比" sortable header-align="center" align="right">
                            <template #default="{row}">
                                <span> {{ row.purchase_percent+'%' }}
                                </span>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="product_num" title="采购成品数" sortable header-align="center" align="right" min-width="95"></vxe-table-column>
                        <vxe-table-column field="product_percent" title="成品数占比" sortable header-align="center" align="right" min-width="95">
                            <template #default="{row}">
                                <span> {{ row.product_percent+'%' }}
                                </span>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="money" title="金额CNY(万)" sortable header-align="center" align="right" min-width="105" formatter="formatAmount"></vxe-table-column>
                    </vxe-table>
                </div>
            </div>

        </div>
        <bi_vender_analysis :show.sync="model1" :vender="curr_item" :contractType="contractType" :queryCondition="condition" :depStr="depStr" :searchList="searchList"></bi_vender_analysis>
    </div>
</template>

<script>
import analysisApi from "@/api/cbs/analysis.js";
import bi_vender_analysis from "./bi_vender_analysis.vue";
export default {
    components: {
        bi_vender_analysis,
    },
    props: {
        allDep: Array,
    },
    data() {
        return {
            condition: {
                contract_dep_id_arr: [],
                contract_create_time_start: "",
                contract_create_time_end: "",
            },
            defaultProps: {
                children: "children",
                label: "title",
            },
            depStr: [],
            purchaseList: [],
            processList: [],
            model1: false,
            curr_item: {},
            contractType: "",
            searchList: [],
        };
    },
    created() {
        this.date();
        this.query();
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
            analysisApi.getAnalysisVen(this.condition).then((res) => {
                console.log("caigou", res);
                this.purchaseList = res.data.purchaseList;
                this.processList = res.data.processList;
                this.sortList(this.purchaseList);
                this.sortList(this.processList);
            });
        },
        sortList(dataList) {
            dataList.sort(function (a, b) {
                return b["money"] - a["money"];
            });
        },
        depClick() {
            let checkData = this.$refs.listTree.getCheckedNodes();
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
            let selectNotes = this.$refs.listTree.getCheckedNodes();
            let filterNotes = [];
            selectNotes.forEach((item) => {
                if (this.depStr.includes(item.title)) {
                    filterNotes.push(item);
                }
            });
            this.$refs.listTree.setCheckedNodes(filterNotes);
        },
        clearDep() {
            this.$refs.listTree.setCheckedKeys([]);
            this.condition.contract_dep_id_arr = [];
            this.depStr = [];
        },
        footerMethod({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex === 0) {
                        return "合计";
                    }
                    if (
                        ["purchase_num", "product_num"].includes(
                            column.property
                        )
                    ) {
                        return this.$general.transform(
                            parseFloat(
                                this.$XEUtils.sum(data, column.property)
                            ),
                            0
                        );
                    }
                    if (columnIndex == 6) {
                        let num = this.$XEUtils.sum(data, column.property);
                        return this.$general.transform(num, 2);
                    }
                    return "-";
                }),
            ];
        },
        handleToBI(row, type) {
            if (type == 1) {
                this.contractType = "purchase";
                this.searchList = this.purchaseList;
            }
            if (type == 2) {
                this.contractType = "process";
                this.searchList = this.processList;
            }
            this.curr_item = row;
            this.model1 = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.form-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 0px;
    .query-button {
        position: absolute;
        top: 10px;
        left: 630px;
    }
}
.vender-table {
    margin-top: 50px;
    display: flex;
    .table-left {
        width: 48%;
        .left-title {
            position: absolute;
            top: 115px;
            width: 48%;
            left: 10px;
            .tip {
                float: right;
                margin-top: -27px;
            }
        }
        .purchase-table {
            position: absolute;
            top: 145px;
            bottom: 20px;
            left: 10px;
            width: 48%;
        }
    }
    .table-right {
        width: 48%;
        .right-title {
            position: absolute;
            top: 115px;
            width: 48%;
            right: 10px;
            bottom: 10px;
            .tip {
                float: right;
                margin-top: -27px;
            }
        }
        .process-table {
            position: absolute;
            top: 145px;
            bottom: 20px;
            right: 10px;
            width: 48%;
        }
    }
}
</style>