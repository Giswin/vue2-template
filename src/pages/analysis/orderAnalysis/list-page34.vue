<style scoped lang="scss">
//特殊样式，而不通用请在这里写样式
.col-left {
    position: absolute;
    top: 0px;
    right: 590px;
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

            <div style="width:100%; height:95%;" id="shContainer4"></div>
        </div>
        <div class="col-right">
            <vxe-table ref="userTable" border :data="pieList" size="small" auto-resize height="100%" show-footer :footer-method="footerMethod" :column-config="{minWidth:80}" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row>
                <vxe-table-column field="seq" type="seq" title="序号" width="50" header-align="center" align="center">
                </vxe-table-column>
                <vxe-table-column field="shn_cus_name" title="客户" :width="$columns.info.medium" header-align="center">
                </vxe-table-column>
                <vxe-table-column field="shCount" title="出运票数" header-align="center" :width="$columns.number.medium" align="right" sort-by="shCount" sort-type="number" sortable formatter="formatNumber"></vxe-table-column>
                <vxe-table-column field="shn_qty_a" title="出运件数" header-align="center" :width="$columns.number.medium" align="right" sort-by="shn_qty_a" sort-type="number" sortable formatter="formatAmount"></vxe-table-column>
                <vxe-table-column field="shn_amount_a" title="出运金额(万)" header-align="center" :width="$columns.number.large" align="right" sort-by="shn_amount_a" sort-type="number" sortable formatter="formatAmount"></vxe-table-column>
                <vxe-table-column field="percent" title="占比" header-align="center" :width="$columns.number.small" align="center" sort-by="proportion" sort-type="number" sortable></vxe-table-column>
            </vxe-table>
        </div>
        <bi_sh_customer_analysis v-if="model2" :customer="curr_item" :pieData="pieData" :labelArr="labelArr" :pieList="pieList" :date="date" :selectOption="selectOption" :key="timer" @closeCus="closeCus"></bi_sh_customer_analysis>
    </div>
</template>

<script>
import { Chart } from "@antv/g2";
import analysisApi from "@/api/cbs/analysis.js";
import bi_sh_customer_analysis from "@/pages/analysis/orderAnalysis/bi_sh_customer_analysis.vue";
export default {
    components: {
        bi_sh_customer_analysis,
    },
    props: ["pieList", "date", "selectOption"],

    created() {},
    data() {
        return {
            model2: false,
            chart: {},
            curr_item: {},
            timer: null,
            labelArr: [],
            pieData: [],
        };
    },
    mounted() {
        this.initStrateGoal();
    },
    methods: {
        footerMethod({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex === 0) {
                        return "合计";
                    }
                    if (columnIndex == 4 || columnIndex == 3) {
                        let num = this.$XEUtils.sum(data, column.property);
                        return this.$general.transform(num, 2);
                    }
                    if (columnIndex == 2) {
                        let num = this.$XEUtils.sum(data, column.property);
                        return this.$general.transform(num, 0);
                    }
                    return "-";
                }),
            ];
        },
        initStrateGoal() {
            this.chart = new Chart({
                container: "shContainer4",
                autoFit: true,
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
                          {name}:<span style="margin-left:20px">{value}</span>
                          </div>
                         `,
            });

            this.chart
                .interval()
                .position("shn_amount_a")
                .color("shn_cus_name")
                .label("proportion", {
                    offset: 20,
                    layout: { type: "fixed-overlap" },
                    content: (data) => {
                        let num = data.proportion;
                        num = (num * 100).toFixed(2);
                        return `${data.shn_cus_name}: ${num}%`;
                    },
                })
                .tooltip(
                    "shn_cus_name*shn_amount_a",
                    (shn_cus_name, shn_amount_a) => {
                        let trans_usd = this.$general.transform(
                            shn_amount_a,
                            2
                        );
                        return {
                            name: shn_cus_name,
                            value: trans_usd,
                        };
                    }
                )
                .adjust("stack");

            this.chart.interaction("element-active");

            this.chart.on("click", (params) => {
                if (
                    params.data.data &&
                    params.data.data.shn_cus_name !== "其他"
                ) {
                    this.curr_item = params.data.data;
                    console.log("curr_item", this.curr_item);
                    let condition = {
                        shn_cus_id: this.curr_item.shn_cus_id,
                        branch_names: this.selectOption.branch_name.value,
                        shn_dep_names: this.selectOption.shn_dep_name.value,
                        sh_date_b: this.date.sh_date_b,
                        sh_date_e: this.date.sh_date_e,
                    };
                    analysisApi.getshipLabel(condition).then((res) => {
                        console.log("标签分类", res);
                        this.labelArr = res.data;
                        this.getPieData();
                        this.model2 = true;
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
                        shn_amount_a: 0,
                        proportion: 0,
                        id: item.id,
                    };
                    obj.shn_amount_a = parseFloat(
                        Number(usdObj[key]) / 10000
                    ).toFixed(2);
                    obj.shn_amount_a = Number(obj.shn_amount_a);
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
            this.model2 = false;
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
