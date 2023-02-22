
<style scoped lang="scss">
//特殊样式，而不通用请在这里写样式
.list-table-l {
}
</style>
<template>
    <div class="wrapper" :style="{'left':$store.state.css.navWidth + 'px'}">
        <div class="roles-container">
            <div class="lis-tabs">
                <div class="tabs">
                    <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectTab = 1">订单汇总分析</div>
                    <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectTab = 2">订单明细分析</div>
                    <div class="tabs-col" :class="{ show: selectTab == 3 }" @click="selectTab = 3">出运汇总分析</div>
                    <div class="tabs-col" :class="{ show: selectTab == 4 }" @click="selectTab = 4">出运明细分析</div>

                </div>
            </div>
            <listPage1 v-show="selectTab == 1"></listPage1>
            <listPage2 v-if="selectTab == 2"></listPage2>
            <listPage3 v-if="selectTab == 3"></listPage3>
            <listPage4 v-if="selectTab == 4"></listPage4>
        </div>
    </div>
</template>

<script>
import listPage1 from "./list-page1.vue";
import listPage2 from "./list-page2.vue";
import listPage3 from "./list-page3.vue";
import listPage4 from "./list-page4.vue";
export default {
    components: {
        listPage1,
        listPage2,
        listPage3,
        listPage4,
    },

    created() {},
    data() {
        return {
            selectTab: 1,
        };
    },
    mounted() {},
    methods: {},

    watch: {},
};
</script>
