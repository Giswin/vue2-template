<template>
    <div>
        <vxe-modal ref="model1" v-model="show" width="100%" resize height="100%" transfer :showHeader="false">
            <div class="bi-body of">
                <div class="model-close" @click="closeModel">
                    <i class="fa fa-times"></i>
                </div>
                <div class="title-name">
                    {{ curr_customer.shn_cus_name }}
                    <i class="el-icon-search" @click="customerQue = true"></i>
                    <div class="customer-que" v-show="customerQue">
                        <el-autocomplete placeholder="请输入客户名称" v-model="inputVal" class="input-with-select" @select="search" :fetch-suggestions="querySearchAsync" clearable>
                            <el-button slot="append" icon="el-icon-search" @click="customerQue = false"></el-button>
                        </el-autocomplete>

                    </div>
                </div>

                <div class="filter-analysis">
                    <div style="margin-bottom: 8px">
                        <div class="m-l" v-show="selectOption.branch_name">
                            分公司:<el-tag size="mini" v-for="(item,index) in selectOption.branch_name.value " :key="index" style="margin-left: 15px">{{ item }}</el-tag>
                        </div>
                        <div class="m-l" style="margin-left: 15px" v-show="selectOption.shn_dep_name">
                            部门:<el-tag size="mini" v-for="(item,index) in selectOption.shn_dep_name.value " :key="index" style="margin-left: 15px">{{ item }}</el-tag>
                        </div>
                        <div class="m-l" style="margin-left: 15px" v-show="selectOption.shn_currency">
                            币种:<el-tag size="mini" v-for="(item,index) in selectOption.shn_currency.value " :key="index" style="margin-left: 15px">{{ item }}</el-tag>
                        </div>
                        <div class="m-l" style="margin-left: 15px">
                            接单日期：<el-tag size="mini" v-show="date.sh_date_b">{{ date.sh_date_b }}</el-tag>
                            <el-tag style="margin-left: 15px" size="mini" v-show="date.sh_date_e">{{ date.sh_date_e }}</el-tag>
                        </div>

                        <div class="clear"></div>
                    </div>
                    <!-- <div class="tags">
                        <div>标签:</div>
                        <el-tag size="mini" style="margin-left: 15px" v-for="(item, index) in tagArr" :key="index">{{ item }}</el-tag>
                    </div> -->
                </div>
                <div class="main-analysis">
                    <table class="main-analysis-summary">
                        <tbody>
                            <tr>
                                <td>
                                    <span class="text">出运票数</span>
                                    <el-tooltip content="出运票数" placement="bottom" effect="light">
                                        <i class="el-icon-question"></i>
                                    </el-tooltip>
                                    <div class="value" v-if="curr_customer.shCount">
                                        {{trans_shCount}}
                                    </div>
                                </td>
                                <td>
                                    <span class="text">出运件数</span>
                                    <el-tooltip content="出运件数" placement="bottom" effect="light">
                                        <i class="el-icon-question"></i>
                                    </el-tooltip>
                                    <div class="value" v-if="curr_customer.shn_qty_a">
                                        {{trans_shQty}}
                                    </div>
                                </td>
                                <td>
                                    <span class="text">已出运金额(万)</span>
                                    <el-tooltip content="已出运金额(万)" placement="bottom" effect="light">
                                        <i class="el-icon-question"></i>
                                    </el-tooltip>
                                    <div class="value" v-if="curr_customer.shn_amount_a">
                                        {{ trans_shAmount }}
                                    </div>
                                </td>

                                <td>
                                    <span class="text">已出运金额占比</span>
                                    <el-tooltip content="已出运金额占比" placement="bottom" effect="light">
                                        <i class="el-icon-question"></i>
                                    </el-tooltip>
                                    <div class="value" v-if="curr_customer.percent">
                                        {{curr_customer.percent}}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="bi-analysis-body">
                    <el-row :gutter="15">
                        <el-col class="pie-col" :span="8" v-for="item in labelList" :key="item.id">
                            <div class="bi-main-mini" v-if="labelList.length>0">
                                <div class="pie-title"><span>{{ item.label_name }}</span></div>
                                <div style="width: 100%; height: 300px" :id=item.id></div>
                            </div>
                        </el-col>
                    </el-row>
                </div>

            </div>
        </vxe-modal>
    </div>
</template>

<script>
import { Chart } from "@antv/g2";
import analysisApi from "@/api/cbs/analysis.js";

export default {
    props: {
        customer: Object,
        pieData: Array,
        labelArr: Array,
        date: Object,
        pieList: Array,
        selectOption: Object,
    },
    data() {
        return {
            downIcon: true,
            customerQue: false,
            inputVal: "",
            show: true,
            timeout: "",
            curr_customer: {},
            miniPie: [],
            labelList: [],
            chartArr: [],
        };
    },
    created() {
        this.curr_customer = this.customer;
        this.miniPie = this.pieData;
        this.labelList = this.labelArr;
    },
    mounted() {
        this.$nextTick(() => {
            this.initPie();
        });
    },
    beforeDestroy() {
        this.chartArr = null;
    },
    computed: {
        trans_shCount() {
            return this.$general.transform(this.curr_customer.shCount, 0);
        },
        trans_shQty() {
            return this.$general.transform(this.curr_customer.shn_qty_a, 2);
        },
        trans_shAmount() {
            return this.$general.transform(this.curr_customer.shn_amount_a, 2);
        },
    },
    methods: {
        closeModel() {
            this.$emit("closeCus");
            this.show = false;
        },

        initPie() {
            this.miniPie.forEach((item, index) => {
                this.chartArr[index] = new Chart({
                    container: item[0].id,
                    autoFit: true,
                });
                this.chartArr[index].data(item);
                this.chartArr[index].coordinate("theta", {
                    radius: 0.75,
                });
                this.chartArr[index].scale("proportion", {
                    formatter: (val) => {
                        val = (val * 100).toFixed(1) + "%";
                        return val;
                    },
                });
                this.chartArr[index].tooltip({
                    showTitle: false,
                    showMarkers: false,
                });
                this.chartArr[index]
                    .interval()
                    .position("shn_amount_a")
                    .color("category")
                    .label("proportion", {
                        offset: 20,
                        content: (data) => {
                            let num = data.proportion;
                            num = (num * 100).toFixed(1);
                            return `${data.category} : ${num}%`;
                        },
                    })
                    .adjust("stack");

                this.chartArr[index].interaction("element-single-selected");

                this.chartArr[index].render();
            });
        },
        search() {
            this.pieList.forEach((item) => {
                if (
                    item.shn_cus_name.toLowerCase() ==
                    this.inputVal.toLowerCase()
                ) {
                    this.curr_customer = item;
                }
            });

            let condition = {
                shn_cus_id: this.curr_customer.shn_cus_id,
                branch_names: this.selectOption.branch_name.value,
                shn_dep_names: this.selectOption.shn_dep_name.value,
                sh_date_e: this.date.sh_date_e,
                sh_date_b: this.date.sh_date_b,
            };
            analysisApi.getshipLabel(condition).then((res) => {
                this.labelList = res.data;
                this.getPieData();
                this.chartArr.forEach((item, index) => {
                    item.changeData(this.miniPie[index]);
                });
                this.inputVal = "";
                this.customerQue = false;
            });
        },
        getPieData() {
            this.miniPie = [];
            this.labelList.forEach((item) => {
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
                this.miniPie.push(itemData);
            });
            this.miniPie.forEach((item) => {
                item.sort(function (a, b) {
                    return b["proportion"] - a["proportion"];
                });
            });

            console.log("miniPie22", this.miniPie);
        },
        querySearchAsync(queryString, cb) {
            var array = [];
            this.pieList.forEach((item) => {
                array.push({ value: item.shn_cus_name });
            });
            if (array.length > 50) {
                array.pop();
            }

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
    },
    watch: {},
};
</script>

<style scoped lang="scss">
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
.pie-col {
    height: 353px;
    margin-bottom: 15px;
}
.bi-main-mini {
    background: #fff;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-shadow: 0px 0px 10px 0px #eee;
    padding: 10px;
    .pie-title {
        font-size: 14px;
        font-weight: bold;
        text-align: left;
        color: #333;
        margin-bottom: 10px;
    }
}
</style>