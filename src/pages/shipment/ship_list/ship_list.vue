<template>
    <div class="wrapper" :style="{'left':$store.state.css.navWidth + 'px'}">
        <div class="roles-container">
            <div class="lis-tabs">
                <div class="tabs">
                    <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectChange(1)">待通知</div>
                    <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectChange(2)">草稿</div>
                    <div class="tabs-col" :class="{ show: selectTab == 3 }" @click="selectChange(3)">待报关</div>
                    <div class="tabs-col" :class="{ show: selectTab == 4 }" @click="selectChange(4)">待报关明细</div>
                    <div class="tabs-col" :class="{ show: selectTab == 5 }" @click="selectChange(5)">已报关</div>
					<div class="tabs-col" :class="{ show: selectTab == 8 }" @click="selectChange(8)">已结案</div>
                    <div class="tabs-col" :class="{ show: selectTab == 6 }" @click="selectChange(6)">已报关明细</div>
                    <!-- <div class="tabs-col" :class="{ show: selectTab == 7 }" @click="selectChange(7)">待交单</div>
                    <div class="tabs-col" :class="{ show: selectTab == 8 }" @click="selectChange(8)">已交单</div> -->
                    <div class="tabs-col" :class="{ show: selectTab == 7 }" @click="selectChange(7)">报关单</div>
                    <div class="tabs-right">
                        <div class="tabs-search">
                            <div class="m-l">
                                <el-input :placeholder="tabList[selectTab-1].placeholder" v-model="keyword" @keyup.enter.native="query" style="width:520px;" clearable class="input-with-select" size="small">
                                    <el-button slot="append" icon="el-icon-search" @click="query"></el-button>
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="((selectTab==1)&&selectFlag)">
                <listPage1 ref="listPage" :keyword="keyword" :selectOptions="selectOptions"></listPage1>
            </div>
            <div v-if="((selectTab==2 || selectTab==3||selectTab==5 || selectTab==8)&&selectFlag)">
                <listPage2 ref="listPage" :keyword="keyword" :selectTab="selectTab" :selectOptions="selectOptions"></listPage2>
            </div>
            <div v-if="((selectTab==4 || selectTab==6)&&selectFlag)">
                <listPage3 ref="listPage" :keyword="keyword" :selectTab="selectTab" :selectOptions="selectOptions"></listPage3>
            </div>
            <div v-if="(selectTab==7&&selectFlag)">
                <listPage4 ref="listPage" :keyword="keyword" :selectOptions="selectOptions"></listPage4>
            </div>
        </div>

    </div>
</template>

<script>
import ifsApi from "@/api/ifs";
import listPage1 from "./listPage1.vue";
import listPage2 from "./listPage2.vue";
import listPage3 from "./listPage3.vue";
import listPage4 from "./listPage4.vue";

export default {
    components: {
        listPage1,
        listPage2,
        listPage3,
        listPage4,
    },
    data() {
        return {
            selectTab: 1,
            keyword: "",
            selectOptions: {
                dep: [], //部门**
                sales: [], //业务员**
                documentPeople: [], //单证员
                shipPeople: [], //船务员
                BZ: [], //币种**
                SHFS: [], // 收汇方式/结算方式**
                JGTK: [], // 价格条款**
                YSFS: [], // 运输方式**
                allCus: [], // 客户**
                allTitle: [], // 接单抬头**
                titleOptions: [], //抬头选项
                portFrom: [], //起运港
                portTo: [], //目的港
                vender: [], //供应商
                businessType: [], //业务类型
                tradeMode: [], // 贸易方式
                country: [], //生产国别
            },
            selectFlag: false,
            // 分页项配置
            tabList: [
                // 生成出运通知
                {
                    title: "待通知",
                    selectTab: 1,
                    placeholder:
                        " 业务部门 / 业务员 / 客户 / 项目号 / 货号 / 目的港 / 供应商",
                    component: "listPage1",
                },

                // 发布出运通知
                {
                    title: "草稿",
                    selectTab: 2,
                    placeholder:
                        " 通知编码 / 运编号 / 部门 / 业务员 / 客户 / 创建人 / 目的港 / 项目号 / 货号",
                    component: "listPage2",
                },

                // 生成报关单
                {
                    title: "待报关",
                    selectTab: 3,
                    placeholder:
                        " 通知编码 / 运编号 / 部门 / 业务员 / 客户 / 创建人 / 目的港 / 项目号 / 货号",
                    component: "listPage2",
                },

                {
                    title: "待报关明细",
                    selectTab: 4,
                    placeholder:
                        " 通知编码 / 运编号 / 部门 / 业务员 / 客户 / 创建人 / 目的港 / 项目号 / 货号",
                    component: "listPage3",
                },
                // 同步出运申请
                {
                    title: "已报关",
                    selectTab: 5,
                    placeholder:
                        " 通知编码 / 运编号 / 部门 / 业务员 / 客户 / 创建人 / 目的港 / 项目号 / 货号",
                    component: "listPage2",
                },
				
                {
                    title: "已报关明细",
                    selectTab: 6,
                    placeholder:
                        " 通知编码 / 运编号 / 部门 / 业务员 / 客户 / 创建人 / 目的港 / 项目号 / 货号",
                    component: "listPage3",
                },

                // 同步交单

                // 编辑报关单
                {
                    title: "报关单",
                    selectTab: 7,
                    placeholder:
                        " 报关单号 / 运编号 / 部门 / 业务员 / 客户 / 项目号 / 货号 / 目的港",
                    component: "listPage4",
                },
				{
				    title: "已结案",
				    selectTab: 8,
				    placeholder:
				        " 通知编码 / 运编号 / 部门 / 业务员 / 客户 / 创建人 / 目的港 / 项目号 / 货号",
				    component: "listPage2",
				},
            ],
        };
    },
    created() {
        this.getOptions();
    },
    methods: {
        selectChange(tabNum) {
            this.selectTab = tabNum;
        },

        getOptions() {
            Promise.all([
                ifsApi.getList("", 2, 0),
                this.$dmBaseSet.personData(),
                this.$dmBaseSet.customerData(),
                this.$dmBaseSet.venderData(),
                this.$dmBaseSet.filterDic(
                    "TY_BZ,TY_SHFS,TY_YSFS,TY_JGTK,TY_YWLX,TY_TRADE_MODE_EBS"
                ),
                ifsApi.getPorts(1, 0),
                ifsApi.getPorts(0, 1),
                ifsApi.getTitlelist(),
                this.$dmBaseSet.getOptions(),
                this.$dmBaseSet.documentStaffData(),
                this.$dmBaseSet.shipStaffData(),
                this.$dmBaseSet.countryData(),
            ]).then((res) => {
                this.selectOptions.dep = Object.freeze(res[0].data || []); //部门
                this.selectOptions.sales = Object.freeze(res[1].list || []); //业务员
                this.selectOptions.allCus = Object.freeze(res[2] || []); //客户
                this.selectOptions.vender = Object.freeze(res[3] || []); //供应商
                this.selectOptions.BZ = Object.freeze(
                    res[4]["TY_BZ"].children || []
                ); //币种
                this.selectOptions.SHFS = Object.freeze(
                    res[4]["TY_SHFS"].children
                ); //结算方式
                this.selectOptions.YSFS = Object.freeze(
                    res[4]["TY_YSFS"].children
                ); //运输方式
                this.selectOptions.JGTK = Object.freeze(
                    res[4]["TY_JGTK"].children
                ); //价格条款
                this.selectOptions.businessType = Object.freeze(
                    res[4]["TY_YWLX"].children
                ); //业务类型
                this.selectOptions.tradeMode = Object.freeze(
                    res[4]["TY_TRADE_MODE_EBS"].children
                ); //贸易方式

                this.selectOptions.portFrom = Object.freeze(res[5].data); //起运港
                this.selectOptions.portTo = Object.freeze(res[6].data); //目的港
                this.selectOptions.allTitle = Object.freeze(res[7].tnt_title); //接单抬头
                this.selectOptions.titleOptions =
                    res[8].TITLE_PROPERTY_OPTION.option_value || []; //抬头选项
                console.log("单证", res[9]);
                this.selectOptions.documentPeople = Object.freeze(
                    res[9].list || []
                ); //单证员
                this.selectOptions.shipPeople = Object.freeze(
                    res[10].list || []
                ); //船务员
                this.selectOptions.country = Object.freeze(res[11] || []);

                this.selectOptions = Object.freeze(this.selectOptions);
                this.selectFlag = true;

                console.log("selectOptions", this.selectOptions);
            });
        },
        query() {
            // 调用子组件里的查询方法
            this.$nextTick(() => {
                this.$refs["listPage"].query();
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.listform .form-button {
    top: -3px;
    right: 0px;
}
</style>