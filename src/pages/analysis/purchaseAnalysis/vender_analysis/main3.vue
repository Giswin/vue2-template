<style scoped lang="scss">
//特殊样式，而不通用请在这里写样式
.bi-main-mini {
    background: #fff;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-shadow: 0px 0px 10px 0px #eee;
    padding: 10px;
    margin-bottom: 15px;
    .title-name {
        font-size: 14px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
    }
}
</style>
<template>
    <div class="bi-main-mini">
        <div class="title-name">下单周期</div>
        <div style="width: 100%; height: 300px;" id="ven3"></div>
    </div>
</template>

<script>
import { registerTheme, Chart } from "@antv/g2";
export default {
    components: {},

    created() {},
    beforeDestroy() {
        this.chart = null;
    },
    props: ["barData"],

    data() {
        return {
            chart: {},
        };
    },
    mounted() {
        this.initStrateGoal();
    },
    methods: {
        initStrateGoal() {
            this.chart = new Chart({
                container: "ven3",
                autoFit: true,
                padding: [20, 20, 20, 30],
            });

            this.chart.data(this.barData);
            this.chart.scale("money", {
                alias: "下单金额(万USD)",
                nice: true,
            });

            this.chart.tooltip({
                showCrosshairs: true, // 展示 Tooltip 辅助线
                shared: false,
            });

            this.chart
                .interval()
                .position("purchase_month*money")
                .state({
                    selected: {
                        style: {
                            fill: "#E8684A",
                        },
                    },
                });
            this.chart
                .line()
                .position("purchase_month*money")
                .color("#66CC99")
                .label("money");
            registerTheme("newTheme", {
                minColumnWidth: 20,
                maxColumnWidth: 40,
            });
            this.chart.interaction("element-selected");
            this.chart.theme("newTheme");
            this.chart.render();
        },
    },
    watch: {
        barData: {
            handler(newVal, oldVal) {
                this.chart.changeData(newVal);
            },
            deep: true,
        },
    },
};
</script>