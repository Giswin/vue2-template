<template>
    <div>
        <vxe-modal ref="model1" :value="show" width="100%" resize height="100%" transfer :showHeader="false">
            <div class="bi-body of">
                <div class="model-close" @click="closeModel">
                    <i class="fa fa-times"></i>
                </div>
                <div class="title-name">
                    {{ curr_vender.contract_actual_supply_title_name }}
                    <i class="el-icon-search" @click="customerQue = true"></i>
                    <div class="customer-que" v-show="customerQue">
                        <el-autocomplete placeholder="请输入客户名称" v-model="inputVal" class="input-with-select" @select="search" :fetch-suggestions="querySearchAsync">
                            <el-button slot="append" icon="el-icon-search" @click="customerQue = false"></el-button>
                        </el-autocomplete>
                    </div>
                </div>
                <div class="filter-analysis">
                    <div>
                        <div class="m-l" style="margin-left: 15px" v-show="depStr.length>0">
                            部门:<el-tag size="mini" v-for="(item,index) in depStr" :key="index" style="margin-left: 15px">{{ item }}</el-tag>
                        </div>
                        <div class="m-l" style="margin-left: 15px">
                            接单日期：<el-tag size="mini">{{ queryCondition.contract_create_time_start }}</el-tag>
                            <el-tag style="margin-left: 15px" size="mini" v-show="queryCondition.contract_create_time_end">{{ queryCondition.contract_create_time_end }}</el-tag>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
                <div class="main-analysis">
                    <table class="main-analysis-summary">
                        <tbody>
                            <tr>
                                <td>
                                    <span class="text">采购次数</span>
                                    <el-tooltip content="采购次数" placement="bottom" effect="light">
                                        <i class="el-icon-question"></i>
                                    </el-tooltip>
                                    <div class="value">
                                        {{curr_vender.purchase_num}}
                                    </div>
                                </td>
                                <td>
                                    <span class="text">采购成品数</span>
                                    <el-tooltip content="采购成品数" placement="bottom" effect="light">
                                        <i class="el-icon-question"></i>
                                    </el-tooltip>
                                    <div class="value">
                                        {{curr_vender.product_num}}

                                    </div>
                                </td>
                                <td>
                                    <span class="text">金额(万)</span>
                                    <el-tooltip content="金额(万)" placement="bottom" effect="light">
                                        <i class="el-icon-question"></i>
                                    </el-tooltip>
                                    <div class="value">
                                        {{curr_vender.money}}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="bi-analysis-body">
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <main1 :pieData="showData.branch_name"></main1>
                        </el-col>
                        <el-col :span="12">
                            <main2 :pieData="showData.contract_dep_name"></main2>
                        </el-col>
                        <el-col :span="12">
                            <main3 :barData="showData.purchase_month"></main3>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </vxe-modal>
    </div>
</template>

<script>
import analysisApi from "@/api/cbs/analysis.js";
import main1 from "./vender_analysis/main1.vue";
import main2 from "./vender_analysis/main2.vue";
import main3 from "./vender_analysis/main3.vue";

export default {
    components: {
        main1,
        main2,
        main3,
    },
    props: {
        show: Boolean,
        vender: Object,
        contractType: String,
        queryCondition: Object,
        depStr: Array,
        searchList: Array,
    },
    data() {
        return {
            customerQue: false,
            inputVal: "",
            curr_vender: {},
            condition: {
                contract_dep_id_arr: [],
                contract_create_time_start: "",
                contract_create_time_end: "",
                contract_actual_supply_title_id: "",
                contract_category: "",
            },
            dataList: [],
            total: [],
            groupOption: {
                groupProps: [],
                sumProps: ["money"],
            },
            showData: {
                branch_name: [],
                contract_dep_name: [],
                purchase_month: [],
            },
            timeout: "",
        };
    },
    created() {},
    methods: {
        closeModel() {
            this.$emit("update:show", false);
        },
        search() {
            this.searchList.forEach((item) => {
                if (item.contract_actual_supply_title_name == this.inputVal) {
                    this.curr_vender = item;
                }
            });
            this.getVenderInfo();
        },
        querySearchAsync(queryString, cb) {
            var array = [];
            this.searchList.forEach((item) => {
                array.push({ value: item.contract_actual_supply_title_name });
            });

            var results = queryString
                ? array.filter(this.createStateFilter(queryString))
                : array;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 0);
        },
        createStateFilter(queryString) {
            return (state) => {
                return (
                    state.value
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) > -1
                );
            };
        },
        getVenderInfo() {
            this.condition.contract_dep_id_arr =
                this.queryCondition.contract_dep_id_arr;
            this.condition.contract_create_time_start =
                this.queryCondition.contract_create_time_start;
            this.condition.contract_create_time_end =
                this.queryCondition.contract_create_time_end;
            this.condition.contract_actual_supply_title_id =
                this.curr_vender.contract_actual_supply_title_id;
            this.condition.contract_category = this.contractType;

            analysisApi.getAnalysisVenDetail(this.condition).then((res) => {
                console.log("供应商明细", res.data);
                this.dataList = res.data;
                this.totalCount();
                this.showList();
                this.inputVal = "";
                this.customerQue = false;
            });
        },
        totalCount() {
            this.total = this.$general.toArraySumGroup(this.dataList, {
                groupProps: [],
                sumProps: ["money"],
            });
        },
        gorupbyAnalysis(groupName) {
            this.groupOption.groupProps[0] = groupName;
            let groupList = [];
            groupList = this.$general.toArraySumGroup(
                this.dataList,
                this.groupOption
            );
            groupList.forEach((item) => {
                item.proportion = parseFloat(
                    (item["money"] / this.total[0]["money"]).toFixed(4)
                );
            });

            groupList.sort(function (a, b) {
                return b["proportion"] - a["proportion"];
            });
            if (groupList.length > 19) {
                return this.sliceData(groupList, groupName);
            } else {
                return groupList;
            }
        },
        sliceData(groupList, groupName) {
            let countData = groupList.slice(0, 19);
            let otherData = groupList.slice(19);
            let res = [];
            let count = 0;
            countData.forEach((item) => {
                count = count + item.proportion;
                res.push(item);
            });
            let obj = {
                money: 0,
                proportion: 0,
            };
            obj[groupName] = "其他";
            otherData.forEach((item) => {
                obj.money += item.money;
            });
            obj.money = parseFloat(obj.money.toFixed(2));

            obj.proportion = parseFloat((1 - count).toFixed(4));
            res.push(obj);
            return res;
        },
        showList() {
            for (let k in this.showData) {
                this.showData[k] = this.gorupbyAnalysis(k);
            }
            console.log("showData", this.showData);
            this.showData.purchase_month.sort(function (a, b) {
                return b["purchase_month"] - a["purchase_month"];
            });
        },
    },
    watch: {
        vender: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.curr_vender = this.vender;
                    console.log("curr_vender", this.curr_vender);
                    console.log("contractType", this.contractType);
                    this.getVenderInfo();
                }
            },
            deep: true,
        },
    },
};
</script>

<style scoped lang="scss">
//特殊样式，而不通用请在这里写样式
.title-name {
    font-size: 32px;
    text-align: center;
    height: 80px;
    line-height: 60px;
    position: relative;

    i {
        font-size: 22px;
        cursor: pointer;
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        position: absolute;
        margin: 20px;

        &:hover {
            background: #0000ff;
            font-weight: bold;
            color: #fff;
            font-size: 16px;
            border-radius: 50%;
        }
    }
}

.model-close {
    position: fixed;
    top: 0px;
    z-index: 9;
    right: 15px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    text-align: center;

    &:hover {
        background: red;
        color: #fff;
    }
}

.main-analysis {
    border: 1px solid #ddd;
    padding: 30px 0px;
    background: #fff;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 0px 5px 8px 0px #eee;

    table.main-analysis-summary {
        border-collapse: separate;
        table-layout: fixed;
        width: 100%;

        tr {
            td {
                text-align: center;
                border-right: 1px solid #ddd;

                i {
                    color: #409eff;
                    font-size: 15px;
                    cursor: pointer;
                    padding-left: 5px;
                }

                span.text {
                    color: #787a7d;
                }

                div.value {
                    font-size: 20px;
                    color: #121315;
                }
            }

            .last {
                border-right: none;
            }
        }
    }
}

.bi-body {
    background: #fafbfc;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    padding: 30px;
    box-sizing: border-box;
}

.filter-analysis {
    border: 1px solid #ddd;
    background: #fff;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    margin-bottom: -1px;
    padding: 10px 15px;
    box-shadow: 0px 0px 8px 0px #eee;

    .filtr-w {
        width: 90px;
        margin-right: 5px;
    }

    .tags {
        display: flex;
    }
}

.bi-analysis-body {
    margin-top: 20px;
}

.customer-que {
    position: absolute;
    margin: auto;
    width: 400px;
    text-align: center;
    height: 50px;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    line-height: 30px;
}
</style>