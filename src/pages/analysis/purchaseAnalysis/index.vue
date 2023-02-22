
<template>
    <div class="wrapper" :style="{'left':$store.state.css.navWidth + 'px'}">
        <div class="roles-container">
            <div class="lis-tabs">
                <div class="tabs">
                    <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectTab = 1">供应商汇总分析</div>
                    <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectTab = 2">采购员汇总分析</div>
                    <div class="tabs-col" :class="{ show: selectTab == 3 }" @click="selectTab = 3">采购明细分析</div>

                </div>
            </div>

            <listPage1 v-if="selectTab == 1" :allDep="selectOptions.dep"></listPage1>
            <listPage2 v-if="selectTab == 2" :selectOptions="selectOptions"></listPage2>
            <listPage3 v-if="selectTab == 3" :selectOptions="selectOptions"></listPage3>
        </div>
    </div>
</template>

<script>
import listPage1 from "./list-page1.vue";
import listPage2 from "./list-page2.vue";
import listPage3 from "./list-page3.vue";
import ifsApi from "@/api/ifs";

export default {
    components: {
        listPage1,
        listPage2,
        listPage3,
    },

    created() {
        this.getOptions();
    },
    data() {
        return {
            selectTab: 1,
            selectOptions: {
                dep: [],
                vender: [],
            },
        };
    },
    mounted() {},
    methods: {
        getOptions() {
            Promise.all([
                ifsApi.getList("", 2, 0),
                this.$dmBaseSet.venderData(),
            ]).then((res) => {
                this.selectOptions.dep = Object.freeze(res[0].data || []);
                this.selectOptions.vender = Object.freeze(res[1]); //供应商
                console.log("selectOptions", this.selectOptions);
            });
        },
    },

    watch: {},
};
</script>

<style scoped lang="scss">
//特殊样式，而不通用请在这里写样式
.list-table-l {
}
</style>