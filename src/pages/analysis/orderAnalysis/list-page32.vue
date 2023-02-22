<style scoped lang="scss">
//特殊样式，而不通用请在这里写样式
.col-left {
    position: absolute;
    top: 0px;
    right: 590px;
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
            <div style="width:100%; height:95%;" id="shContainer2"></div>
        </div>
        <div class="col-right">
            <vxe-table ref="userTable" border :data="pieList" size="small" auto-resize height="100%" show-footer :footer-method="footerMethod" :column-config="{minWidth:80}" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row>
                <vxe-table-column field="seq" type="seq" title="序号" width="50" header-align="center" align="center">
                </vxe-table-column>
                <vxe-table-column field="shn_dep_name" title="部门" :width="$columns.info.medium" header-align="center">
                </vxe-table-column>
                <vxe-table-column field="shCount" title="出运票数" header-align="center" :width="$columns.number.medium" align="right" sort-by="shCount" sort-type="number" sortable formatter="formatNumber"></vxe-table-column>
                <vxe-table-column field="shn_qty_a" title="出运件数" header-align="center" :width="$columns.number.medium" align="right" sort-by="shn_qty_a" sort-type="number" sortable formatter="formatAmount"></vxe-table-column>
                <vxe-table-column field="shn_amount_a" title="出运金额(万)" header-align="center" :width="$columns.number.large" align="right" sort-by="shn_amount_a" sort-type="number" sortable formatter="formatAmount"></vxe-table-column>
                <vxe-table-column field="percent" title="占比" header-align="center" :width="$columns.number.small" align="center" sort-by="proportion" sort-type="number" sortable></vxe-table-column>
            </vxe-table>
        </div>
    </div>
</template>

<script>
import { Chart } from "@antv/g2";
export default {
    components: {},
    props: ["pieList"],
    created() {},
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
                container: "shContainer2",
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
                .color("shn_dep_name")
                .label("proportion", {
                    offset: 20,
                    layout: { type: "fixed-overlap" },
                    content: (data) => {
                        let num = data.proportion;
                        num = (num * 100).toFixed(2);
                        return `${data.shn_dep_name}: ${num}%`;
                    },
                })
                .tooltip(
                    "shn_dep_name*shn_amount_a",
                    (shn_dep_name, shn_amount_a) => {
                        let trans_usd = this.$general.transform(
                            shn_amount_a,
                            2
                        );
                        return {
                            name: shn_dep_name,
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
