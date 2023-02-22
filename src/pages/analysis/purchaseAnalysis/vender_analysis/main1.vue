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
        <div class="title-name">分公司</div>
        <div style="width: 100%; height: 300px" id="ven1"></div>
    </div>
</template>

<script>
import { Chart } from "@antv/g2";
export default {
    components: {},

    created() {},
    mounted() {
        this.initStrateGoal();
    },
    beforeDestroy() {
        this.chart = null;
    },
    props: ["pieData"],
    data() {
        return {
            chart: {},
        };
    },
    methods: {
        initStrateGoal() {
            this.chart = new Chart({
                container: "ven1",
                autoFit: true,
            });
            this.chart.data(this.pieData);

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
            });

            this.chart
                .interval()
                .position("money")
                .color("branch_name")
                .label("proportion", {
                    offset: 20,
                    content: (data) => {
                        let num = data.proportion;
                        num = (num * 100).toFixed(2);
                        return `${data.branch_name} : ${num}%`;
                    },
                })
                .adjust("stack");

            this.chart.interaction("element-single-selected");

            this.chart.render();
        },
    },
    watch: {
        pieData: {
            handler(newVal, oldVal) {
                this.chart.changeData(newVal);
            },
            deep: true,
        },
    },
};
</script>