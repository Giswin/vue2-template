<style scoped lang="scss">
//特殊样式，而不通用请在这里写样式
.col-left {
    position: absolute;
    top: 0px;
    right: 712px;
    bottom: 0px;
    left: 0px;
    .tooltip {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 15px;
    }
}

.col-right {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
}
</style>
<template>
    <div>
        <div class="col-left">
            <div class="tooltip"><i class="el-icon-info"></i>点击饼图可展示客户详细信息</div>

            <div style="width: 100%; height: 95%" id="container4"></div>
        </div>
        <div class="col-right">
            <vxe-table ref="userTable" border :data="pieList" size="small" auto-resize height="100%" show-footer :footer-method="footerMethod" :column-config="{ minWidth: 80 }" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row resizable>
                <vxe-table-column field="seq" type="seq" title="序号" width="50" header-align="center" align="center">
                </vxe-table-column>
                <vxe-table-column field="order_cus_name" title="客户" :width="$columns.info.medium" header-align="center">
                </vxe-table-column>
                <vxe-table-column field="order_num" title="订单数" header-align="center" :width="$columns.number.medium" align="right" sort-by="order_num" sort-type="number" sortable formatter="formatNumber"></vxe-table-column>
                <vxe-table-column field="order_qty" title="订单件数" header-align="center" :width="$columns.number.medium" align="right" sort-by="order_qty" sort-type="number" sortable formatter="formatNumber"></vxe-table-column>
                <vxe-table-column field="order_amount_cny" title="金额CNY(万)" header-align="center" :width="$columns.number.large" align="right" sort-by="order_amount_cny" sort-type="number" sortable formatter="formatAmount"></vxe-table-column>
                <vxe-table-column field="order_amount_usd" title="金额USD(万)" header-align="center" :width="$columns.number.large" align="right" sort-by="order_amount_usd" sort-type="number" sortable formatter="formatAmount"></vxe-table-column>
                <vxe-table-column field="percent" title="占比" header-align="center" :width="$columns.number.small" align="right" sort-by="proportion" sort-type="number" sortable></vxe-table-column>
            </vxe-table>
        </div>
        <bi_customer_analysis v-if="model1" :customer="curr_item" :pieData="pieData" :labelArr="labelArr" :pieList="pieList" :date="date" :selectOption="selectOption" :key="timer" @closeCus="closeCus"></bi_customer_analysis>
    </div>
</template>

<script>
import { Chart } from "@antv/g2";
import bi_customer_analysis from "./bi_customer_analysis.vue";
import analysisApi from "@/api/cbs/analysis.js";

export default {
    components: {
        bi_customer_analysis,
    },

    created() {
        console.log("pieList44", this.pieList);
    },
    props: ["pieList", "date", "selectOption"],

    data() {
        return {
            model1: false,
            timer: null,
            curr_item: {},
            chart: {},
            labelArr: [],
            pieData: [],
        };
    },
    mounted() {
        this.initStrateGoal();
    },
    beforeDestroy() {
        this.chart = null;
    },
    methods: {
        footerMethod({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex === 0) {
                        return "合计";
                    }
                    if (["seq"].includes(column.property)) {
                        return "-";
                    }
                    if (columnIndex == 4 || columnIndex == 5) {
                        let num = this.$XEUtils.sum(data, column.property);
                        return this.$general.transform(num, 2);
                    }
                    if (columnIndex == 2 || columnIndex == 3) {
                        let num = this.$XEUtils.sum(data, column.property);
                        return this.$general.transform(num, 0);
                    }
                    return "-";
                }),
            ];
        },
        initStrateGoal() {
            this.chart = new Chart({
                container: "container4",
                autoFit: true,
                padding: [10, 30, 20, 40],
            });

            this.chart.coordinate("theta", {
                radius: 0.75,
            });

            this.chart.data(this.pieList);

            this.chart.scale("proportion", {
                formatter: (val) => {
                    val = (val * 100).toFixed(2) + "%";
                    return val;
                },
            });

            this.chart.tooltip({
                showTitle: false,
                showMarkers: false,
                itemTpl: `<div style="margin-bottom: 10px;list-style:none;">
                          <span style="background-color:{color};" class="g2-tooltip-marker"></span>
                          {name}:<span style="margin-left:20px">{value}<span style="margin-left:5px">(万) USD</span></span>
                          </div>
                         `,
            });

            this.chart
                .interval()
                .position("order_amount_usd")
                .color("order_cus_name")
                .label("proportion", {
                    offset: 20,
                    layout: { type: "fixed-overlap" },
                    content: (data) => {
                        let num = data.proportion;
                        num = (num * 100).toFixed(2);
                        return `${data.order_cus_name}: ${num}%`;
                    },
                })
                .tooltip(
                    "order_cus_name*order_amount_usd",
                    (order_cus_name, order_amount_usd) => {
                        let trans_usd = this.$general.transform(
                            order_amount_usd,
                            2
                        );
                        return {
                            name: order_cus_name,
                            value: trans_usd,
                        };
                    }
                )
                .adjust("stack");

            this.chart.interaction("element-single-selected");

            this.chart.on("click", (params) => {
                if (
                    params.data.data &&
                    params.data.data.order_cus_name !== "其他"
                ) {
                    this.curr_item = params.data.data;
                    console.log("curr_item", this.curr_item);

                    let condition = {
                        order_cus_id: this.curr_item.order_cus_id,
                        branch_names: this.selectOption.branch_name.value,
                        order_dep_names: this.selectOption.order_dep_name.value,
                        order_date_end: this.date.order_date_end,
                        order_date_start: this.date.order_date_start,
                    };
                    analysisApi.getAnalysisLabel(condition).then((res) => {
                        console.log("标签分类", res);
                        this.labelArr = res.data;
                        this.getPieData();
                        this.model1 = true;
                    });
                }
            });
            this.chart.render();
        },
        getPieData() {
            this.pieData = [];
            this.labelArr.forEach((item) => {
                let itemData = [];
                let usdObj = item.data;
                let total = 0;
                for (let k in usdObj) {
                    total += Number(usdObj[k]);
                }
                for (let key in usdObj) {
                    let obj = {
                        category: key,
                        order_amount_usd: 0,
                        proportion: 0,
                        id: item.id,
                    };
                    obj.order_amount_usd = parseFloat(
                        Number(usdObj[key]) / 10000
                    ).toFixed(2);
                    obj.order_amount_usd = Number(obj.order_amount_usd);
                    obj.proportion = parseFloat(
                        Number(usdObj[key]) / total
                    ).toFixed(4);
                    obj.proportion = Number(obj.proportion);
                    itemData.push(obj);
                }
                this.pieData.push(itemData);
            });
            this.pieData.forEach((item) => {
                item.sort(function (a, b) {
                    return b["proportion"] - a["proportion"];
                });
            });

            console.log("pieData", this.pieData);
        },
        closeCus() {
            this.model1 = false;
        },
    },
    watch: {
        pieList: {
            handler(newVal, oldVal) {
                this.chart.changeData(newVal);
                this.timer = new Date().getTime();
            },
            deep: true,
        },
    },
};
</script>
