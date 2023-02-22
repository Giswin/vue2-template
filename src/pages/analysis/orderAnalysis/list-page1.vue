<style scoped lang="scss">
//特殊样式，而不通用请在这里写样式
.list-table-l {
}
.tabs-list-body {
    top: 174px !important;
}

.form-body /deep/.el-select__tags-text {
    display: inline-block;
    max-width: 46px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.pull-down {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 9;
    height: 105px;
    background-color: #f6ffcc;
    border-bottom: 1px solid #ddd;
    padding: 0 5px;
    .first {
        display: flex;
        li {
            margin: 10px;
            width: 160px;
        }
    }
    .second {
        display: flex;
        li {
            margin: 10px;
            width: 160px;
        }
    }
    .btn_filter {
        margin: 10px 0 10px 20px;
    }
}
.v-enter,
.v-leave-to {
    opacity: 0;
    height: 0;
}

.v-enter-to,
.v-leave {
    opacity: 1;
}

.v-enter-active,
.v-leave-active {
    transition: all 0.8s ease;
}
.arrowRotate {
    transform: rotate(-180deg);
    transform-origin: center;
    transition: all 0.5s ease;
}
.arrowRotate2 {
    transition: all 0.5s;
}
.wrap_box {
    overflow: hidden;
    .list {
        overflow: hidden;
        border-bottom: 1px solid #ddd;
        .date-wrap {
            display: flex;
            // margin-left: 15px;
            height: 40px;
            justify-content: space-between;
            .btn_wrap {
                display: flex;
                justify-content: space-around;
                .btn_query,
                .more {
                    margin-right: 20px;
                }
            }
        }
        .filter-wrapper {
            display: flex;
            span {
                padding-left: 15px;
            }
        }
    }
}
</style>
<template>
    <div style="padding: 10px 15px;" class="wrap_box">
        <div class="tabs">
            <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectTab = 1">
                分公司
            </div>
            <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectTab = 2">
                部门
            </div>
            <div class="tabs-col" :class="{ show: selectTab == 3 }" @click="selectTab = 3">
                业务
            </div>
            <div class="tabs-col" :class="{ show: selectTab == 4 }" @click="selectTab = 4">
                客户
            </div>
        </div>

        <div class="list" style="top: 92px">
            <div class="date-wrap" style="padding-top: 10px">
                <ul>
                    <li>
                        <span>接单日期:</span>
                        <el-date-picker value-format="yyyy-MM-dd" v-model="condition.order_date_start" type="date" transfer size="small" style="width: 130px; margin-left: 10px"></el-date-picker>
                        <span style="padding: 0px 5px">至</span>
                        <el-date-picker value-format="yyyy-MM-dd" v-model="condition.order_date_end" type="date" transfer size="small" style="width: 130px"></el-date-picker>
                    </li>
                </ul>
                <div class="btn_wrap">

                    <div class="btn_query">
                        <el-button size="small" @click="query">请求后端数据</el-button>
                    </div>
                    <div class="more" @click="arrow">
                        <el-button size="small"> {{pullText}}
                            <i :class="{'el-icon-arrow-down':true,'arrowRotate':isPullDown,'arrowRotate2':!isPullDown}"></i>
                        </el-button>

                    </div>
                    <div class="clear_all">
                        <el-button size="small" @click="closeFilter">清除筛选</el-button>
                    </div>
                </div>
            </div>
            <div class="filter-wrapper">
                <span v-if="tableTags.length>0">筛选项：</span>
                <filter-tag :tags="tableTags" @remove-tag="clearTag"></filter-tag>
            </div>

        </div>
        <transition>
            <div class="pull-down" v-show="isPullDown">
                <div class="form-body">
                    <!-- 这里的宽度是根据右边来定的，如果你要修改这里的宽度，右边也要相等增加对应像素 -->
                    <ul class="first">
                        <li>
                            <el-select v-model="selectOption.branch_name.value" size="small" placeholder="分公司" filterable clearable multiple collapse-tags>
                                <el-option v-for="item in selectOption.branch_name.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li>
                        <li>
                            <el-select v-model="selectOption.order_dep_name.value" size="small" placeholder="部门" filterable clearable multiple collapse-tags>
                                <el-option v-for="item in selectOption.order_dep_name.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li>
                        <!-- <li>
                            <el-select v-model="selectOption.order_cus_name.value" size="small" placeholder="客户" filterable clearable multiple collapse-tags>
                                <el-option v-for="item in selectOption.order_cus_name.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li> -->

                        <!-- <li>
                            <el-select v-model="selectOption.cusyear.value" size="small" placeholder="年份" filterable multiple collapse-tags clearable>
                                <el-option v-for="item in selectOption.cusyear.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li>
                        <li>
                            <el-select v-model="selectOption.season.value" size="small" placeholder="季节" filterable clearable multiple collapse-tags>
                                <el-option v-for="item in selectOption.season.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li> -->
                        <div class="btn_filter">
                            <el-button size="small" @click="queryChange">筛选</el-button>
                        </div>
                    </ul>
                    <ul class="second">
                        <!-- <li>
                            <el-select v-model="selectOption.knit.value" size="small" placeholder="编织" filterable clearable multiple collapse-tags>
                                <el-option v-for="item in selectOption.knit.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li>
                        <li>
                            <el-select v-model="selectOption.sex.value" size="small" placeholder="男女" filterable clearable multiple collapse-tags>
                                <el-option v-for="item in selectOption.sex.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li>
                        <li>
                            <el-select v-model="selectOption.upper.value" size="small" placeholder="上下" filterable clearable multiple collapse-tags>
                                <el-option v-for="item in selectOption.upper.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li>
                        <li>
                            <el-select v-model="selectOption.category.value" size="small" placeholder="品类" filterable clearable multiple collapse-tags>
                                <el-option v-for="item in selectOption.category
                                        .options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li> -->
                        <!-- <li>
                            <el-select v-model="selectOption.order_state_str.value" size="small" placeholder="订单状态" filterable clearable multiple collapse-tags>
                                <el-option v-for="item in selectOption.order_state_str.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li> -->

                    </ul>

                </div>
            </div>
        </transition>
        <div class="tabs-list-body" style="top: 150px; left: 15px; right: 15px">
            <listPage11 v-if="selectTab == 1" :pieList="pieList"></listPage11>
            <listPage12 v-if="selectTab == 2" :pieList="pieList"></listPage12>
            <listPage13 v-if="selectTab == 3" :pieList="pieList"></listPage13>
            <listPage14 v-if="selectTab == 4" :pieList="pieList" :date="condition" :selectOption="selectOption" :key="timer"></listPage14>
        </div>
    </div>
</template>

<script>
import analysisApi from "@/api/cbs/analysis.js";
import listPage11 from "./list-page11.vue";
import listPage12 from "./list-page12.vue";
import listPage13 from "./list-page13.vue";
import listPage14 from "./list-page14.vue";

export default {
    components: {
        listPage11,
        listPage12,
        listPage13,
        listPage14,
    },

    created() {
        this.date();
        this.query();
    },
    mounted() {},

    data() {
        return {
            selectTab: 1,
            condition: {
                order_date_start: "", //订单接单时间起始，默认当年1月1日
                order_date_end: "", //订单接单时间结束，默认当天
            },
            dataList: [],
            filterList: [],
            filterData: [],
            selectOption: {
                branch_name: {
                    title: "分公司",
                    value: [],
                    options: [],
                },
                order_dep_name: {
                    title: "部门",
                    value: [],
                    options: [],
                },
            },
            groupOption: {
                groupProps: [],
                sumProps: [
                    "order_num",
                    "order_qty",
                    "order_amount_cny",
                    "order_amount_usd",
                ],
            },
            pieList: [],
            total: [],
            pieData: [],
            filterCondition: [],
            timer: null,
            isPullDown: false,
            pullText: "下拉筛选",
            tableTags: [],
            od_dep_name: [],
        };
    },
    methods: {
        date() {
            let date = new Date();
            let y = date.getFullYear();
            let m = (date.getMonth() + 1).toString().padStart(2, "0");
            let d = date.getDate().toString().padStart(2, "0");
            let start = y + "-01-01";
            let end = y + "-" + m + "-" + d;
            this.condition.order_date_start = start;
            this.condition.order_date_end = end;
        },

        query() {
            analysisApi.getAnalysisSummary(this.condition).then((res) => {
                this.dataList = Object.freeze(res.data || []);
                console.log("dataList111", this.dataList);
                Object.keys(this.selectOption).forEach((item) => {
                    this.option(this.dataList, item);
                });

                this.od_dep_name = this.selectOption.order_dep_name.options;
                this.queryChange();
            });
        },

        searchVal() {
            for (let k in this.selectOption) {
                if (this.selectOption[k].value.length > 0) {
                    return true;
                }
            }
            return false;
        },
        queryChange() {
            if (this.searchVal()) {
                this.filterList = this.multiFilter(
                    this.dataList,
                    this.selectOption
                );
            } else {
                this.filterList = this.dataList;
            }

            this.totalCount(this.filterList);
            this.groupbyAnalysis(this.filterList);
            this.isPullDown = false;
            this.pullText = "下拉筛选";
            this.showTag();
            this.timer = new Date().getTime();
        },
        multiFilter(dataList, selectOption) {
            let res = [];
            dataList.forEach((item, index) => {
                let flag = true;
                for (let key in selectOption) {
                    if (selectOption[key].value.length > 0) {
                        flag = selectOption[key].value.includes(item[key]);
                        if (!flag) {
                            break;
                        }
                    }
                }

                if (flag) {
                    res.push(item);
                }
            });
            return res;
        },

        option(dataList, key) {
            this.selectOption[key].options = this.$general
                .groupBy(dataList, key)
                .map((item) => {
                    return { value: item, label: item };
                });
        },
        totalCount(list) {
            this.total = this.$general.toArraySumGroup(list, {
                groupProps: [],
                sumProps: ["order_amount_usd"],
            });
        },
        groupbyAnalysis(list) {
            let groupList = [];
            if (this.selectTab == 1) {
                this.groupChange("branch_name", groupList, list);
            }
            if (this.selectTab == 2) {
                this.groupChange("order_dep_name", groupList, list);
            }
            if (this.selectTab == 3) {
                this.groupChange("order_salesman_name", groupList, list);
            }
            if (this.selectTab == 4) {
                this.groupChange("order_cus_name", groupList, list);
            }
        },
        groupChange(tabName, groupList, list) {
            if (tabName == "order_cus_name") {
                this.groupOption.groupProps = [
                    "order_cus_id",
                    "order_cus_name",
                ];
            } else if (tabName == "order_salesman_name") {
                this.groupOption.groupProps = [
                    "order_salesman_id",
                    "order_salesman_name",
                ];
            } else {
                this.groupOption.groupProps = [tabName];
            }
            groupList = this.$general.toArraySumGroup(list, this.groupOption);

            groupList.forEach((item) => {
                item.proportion = parseFloat(
                    (
                        item["order_amount_usd"] /
                        this.total[0]["order_amount_usd"]
                    ).toFixed(4)
                );
                item.order_amount_cny = parseFloat(
                    (item.order_amount_cny / 10000).toFixed(2)
                );
                item.order_amount_usd = parseFloat(
                    (item.order_amount_usd / 10000).toFixed(2)
                );
            });

            groupList.sort(function (a, b) {
                return b["proportion"] - a["proportion"];
            });

            this.tableData(groupList, tabName);
        },
        tableData(groupList, tabName) {
            if (groupList.length > 50) {
                let countData = groupList.slice(0, 50);
                let otherData = groupList.slice(50);
                this.sliceData(countData, otherData, tabName);
            } else {
                groupList.forEach((item) => {
                    item.percent = (item.proportion * 100).toFixed(2) + "%";
                });
                this.pieList = groupList;
            }
        },
        sliceData(countData, otherData, tabName) {
            let res = [];
            let count = 0;
            countData.forEach((item) => {
                count = count + item.proportion;
                res.push(item);
            });
            let obj = {
                order_num: 0,
                order_qty: 0,
                order_amount_cny: 0,
                order_amount_usd: 0,
                proportion: 0,
            };
            obj[tabName] = "其他";
            otherData.forEach((item) => {
                obj.order_num += item.order_num;
                obj.order_qty += item.order_qty;
                obj.order_amount_cny += item.order_amount_cny;
                obj.order_amount_usd += item.order_amount_usd;
            });
            obj.order_amount_cny = parseFloat(obj.order_amount_cny.toFixed(2));
            obj.order_amount_usd = parseFloat(obj.order_amount_usd.toFixed(2));

            obj.proportion = parseFloat((1 - count).toFixed(4));
            res.push(obj);
            res.forEach((item) => {
                item.percent = (item.proportion * 100).toFixed(2) + "%";
            });
            this.pieList = res;
        },
        arrow() {
            this.isPullDown = !this.isPullDown;
            if (this.isPullDown) {
                this.pullText = "上拉收起";
            } else {
                this.pullText = "下拉筛选";
            }
        },
        showTag() {
            this.tableTags = [];
            for (let key in this.selectOption) {
                let obj = {
                    key: key, // 标签key
                    field: key, // 字段名称
                    title: this.selectOption[key].title, // 字段中文名称
                    value: this.selectOption[key].value, // 字段值
                    label: "", // 字段显示值(可选)
                };

                if (this.selectOption[key].value.length > 0) {
                    this.tableTags.push(obj);
                }
            }
        },
        clearTag(tag) {
            this.selectOption[tag.field].value = [];
            this.queryChange();
        },
        closeFilter() {
            this.tableTags = [];
            for (let k in this.selectOption) {
                this.selectOption[k].value = [];
            }
            this.queryChange();
        },
    },

    watch: {
        selectTab: {
            handler(newVal, oldVal) {
                this.queryChange();
            },
        },
        "selectOption.branch_name": {
            handler(newVal, oldVal) {
                if (newVal.value && newVal.value.length > 0) {
                    this.selectOption.order_dep_name.options = [];
                    let depArr = [];
                    this.od_dep_name.forEach((item) => {
                        newVal.value.forEach((dep) => {
                            if (item.value.indexOf(dep) > -1) {
                                depArr.push(item);
                            }
                        });
                    });
                    this.selectOption.order_dep_name.options = depArr.sort();
                } else {
                    this.selectOption.order_dep_name.options = this.od_dep_name;
                }
            },
            deep: true,
        },
    },
};
</script>