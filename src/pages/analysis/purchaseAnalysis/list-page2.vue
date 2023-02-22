<template>
    <div class="vender-wrap">
        <div class="listform">
            <div class="form-body" style="margin-right:15px;">
                <!-- 这里的宽度是根据右边来定的，如果你要修改这里的宽度，右边也要相等增加对应像素 -->
                <ul>
                    <li>
                        <span>部门:</span>
                        <el-select ref="depSelect" v-model="depStr" collapse-tags placeholder="请选择部门" size="small" clearable multiple @change="changeDep" @clear="clearDep" style="width: 170px; margin-left: 5px">
                            <el-tree ref="listTree2" :data="selectOptions.dep" :props="defaultProps" show-checkbox node-key="dep_id" @check-change="depClick"></el-tree>
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

        <div class="col-left">
            <div style="width:100%; height:95%;" id="salesMen"></div>
        </div>
        <div class="col-right">
            <vxe-table ref="userTable" border :data="dataList" size="small" auto-resize height="100%" show-footer resizable :footer-method="footerMethod" :scroll-y="{enabled: false}" :column-config="{minWidth:80}" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row>
                <vxe-table-column type="seq" title="序号" width="40" header-align="center" align="center">
                </vxe-table-column>
                <vxe-table-column field="contract_creator" title="采购员" min-width="110" header-align="center"></vxe-table-column>
                <vxe-table-column field="purchase_num" title="采购次数" header-align="center" min-width="85" align="right" sortable></vxe-table-column>
                <vxe-table-column field="purchase_percent" title="次数占比" header-align="center" align="right" min-width="90" sortable>
                    <template #default="{row}">
                        <span> {{ row.purchase_percent+'%' }}
                        </span>
                    </template>
                </vxe-table-column>
                <vxe-table-column field="product_num" title="采购成品数" header-align="center" min-width="95" align="right" sortable></vxe-table-column>
                <vxe-table-column field="product_percent" title="成品数占比" header-align="center" align="right" min-width="100" sortable>
                    <template #default="{row}">
                        <span> {{ row.product_percent+'%' }}
                        </span>
                    </template>
                </vxe-table-column>
                <vxe-table-column field="money" title="采购金额CNY(万)" header-align="center" min-width="130" align="right" sortable>
                    <template #default="{ row }">
                        {{$general.transform(row.money || 0)}}
                    </template>
                </vxe-table-column>
                <vxe-table-column field="money_percent" title="金额占比" header-align="center" align="right" min-width="95" sortable>
                    <template #default="{row}">
                        <span> {{ row.money_percent+'%' }}
                        </span>
                    </template>
                </vxe-table-column>
            </vxe-table>
        </div>

    </div>
</template>

<script>
import analysisApi from "@/api/cbs/analysis.js";
import { Chart } from "@antv/g2";

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
            defaultProps: {
                children: "children",
                label: "title",
            },
            contractType: [
                { label: "采购", value: "purchase" },
                { label: "加工", value: "process" },
            ],
            depStr: [],
            venOptions: [],
            dataList: [],
            chart: {},
        };
    },
    created() {
        this.date();
        this.query();
    },
    mounted() {
        this.initStrateGoal();
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
            analysisApi.getAnalysisPer(this.condition).then((res) => {
                this.dataList = res.data;
                this.dataList.forEach((item) => {
                    item.money = Number(item.money);
                });
                this.dataList.sort(function (a, b) {
                    return b["money"] - a["money"];
                });
                console.log("采购员汇总分析", res.data);
            });
        },

        depClick() {
            let checkData = this.$refs.listTree2.getCheckedNodes();
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
            let selectNotes = this.$refs.listTree2.getCheckedNodes();
            let filterNotes = [];
            selectNotes.forEach((item) => {
                if (this.depStr.includes(item.title)) {
                    filterNotes.push(item);
                }
            });
            this.$refs.listTree2.setCheckedNodes(filterNotes);
        },
        clearDep() {
            this.$refs.listTree2.setCheckedKeys([]);
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
                            this.$XEUtils.sum(data, column.property),
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
        initStrateGoal() {
            this.chart = new Chart({
                container: "salesMen",
                autoFit: true,
                padding: [20, 30, 20, 40],
            });
            this.chart.data(this.dataList);
            this.chart.coordinate("theta", {
                radius: 0.75,
            });

            this.chart.scale("money_percent", {
                formatter: (val) => {
                    val = val + "%";
                    return val;
                },
            });

            this.chart.tooltip({
                showTitle: false,
                showMarkers: false,
                itemTpl: `<div style="margin-bottom: 10px;list-style:none;">
                          <span style="background-color:{color};" class="g2-tooltip-marker"></span>
                          {name}:<span style="margin-left:20px">{value}</span>
                          </div>
                         `,
            });
            this.chart
                .interval()
                .position("money")
                .color("contract_creator")
                .label("money_percent", {
                    offset: 15,
                    layout: { type: "fixed-overlap" },
                    content: (data) => {
                        let num = data.money_percent;
                        return `${data.contract_creator}: ${num}%`;
                    },
                })
                .tooltip(
                    "contract_creator*money",
                    (contract_creator, money) => {
                        return {
                            name: contract_creator,
                            value: money,
                        };
                    }
                )
                .adjust("stack");

            this.chart.interaction("element-active");

            this.chart.render();
        },
    },
    watch: {
        dataList: {
            handler(newVal, oldVal) {
                this.chart.changeData(newVal);
            },
            deep: true,
        },
    },
};
</script>

<style lang="scss" scoped>
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

.col-left {
    position: absolute;
    top: 100px;
    right: 770px;
    bottom: 0px;
    left: 0px;
}

.col-right {
    position: absolute;
    top: 100px;
    right: 0px;
    bottom: 0px;
}
</style>