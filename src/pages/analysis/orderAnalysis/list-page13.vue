<style scoped lang="scss">
//特殊样式，而不通用请在这里写样式
.col-left {
    position: absolute;
    top: 0px;
    right: 712px;
    bottom: 0px;
    left: 0px;
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
            <div style="width: 100%; height: 95%" id="container3"></div>
        </div>
        <div class="col-right">
            <vxe-table ref="userTable" border :data="pieList" size="small" auto-resize height="100%" show-footer :footer-method="footerMethod" :column-config="{ minWidth: 80 }" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row resizable>
                <vxe-table-column field="seq" type="seq" title="序号" width="50" header-align="center" align="center">
                </vxe-table-column>
                <vxe-table-column field="order_salesman_name" title="业务" :width="$columns.info.medium" header-align="center">
                </vxe-table-column>
                <vxe-table-column field="order_num" title="订单数" header-align="center" :width="$columns.number.medium" align="right" sort-by="order_num" sort-type="number" sortable formatter="formatNumber"></vxe-table-column>
                <vxe-table-column field="order_qty" title="订单件数" header-align="center" :width="$columns.number.medium" align="right" sort-by="order_qty" sort-type="number" sortable formatter="formatNumber"></vxe-table-column>
                <vxe-table-column field="order_amount_cny" title="金额CNY(万)" header-align="center" :width="$columns.number.large" align="right" sort-by="order_amount_cny" sort-type="number" sortable formatter="formatAmount"></vxe-table-column>
                <vxe-table-column field="order_amount_usd" title="金额USD(万)" header-align="center" :width="$columns.number.large" align="right" sort-by="order_amount_usd" sort-type="number" sortable formatter="formatAmount"></vxe-table-column>

                <vxe-table-column field="percent" title="占比" header-align="center" :width="$columns.number.small" align="right" sort-by="proportion" sort-type="number" sortable></vxe-table-column>
            </vxe-table>
        </div>
    </div>
</template>

<script>
import { Chart } from "@antv/g2";
export default {
    components: {},

    created() {},
    props: ["pieList"],

    data() {
        return {
            chart: {},
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
                container: "container3",
                autoFit: true,
                padding: [10, 30, 20, 40],
            });
            this.chart.data(this.pieList);
            this.chart.coordinate("theta", {
                radius: 0.75,
            });

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
                .color("order_salesman_name")
                .label("proportion", {
                    offset: 20,
                    layout: { type: "fixed-overlap" },
                    content: (data) => {
                        let num = data.proportion;
                        num = (num * 100).toFixed(2);
                        return `${data.order_salesman_name}: ${num}%`;
                    },
                })
                .tooltip(
                    "order_salesman_name*order_amount_usd",
                    (order_salesman_name, order_amount_usd) => {
                        let trans_usd = this.$general.transform(
                            order_amount_usd,
                            2
                        );
                        return {
                            name: order_salesman_name,
                            value: trans_usd,
                        };
                    }
                )
                .adjust("stack");

            this.chart.interaction("element-active");

            this.chart.render();
        },
    },
    watch: {
        pieList: {
            handler(newVal, oldVal) {
                this.chart.changeData(newVal);
            },
            deep: true,
        },
    },
};
</script>