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
        .btn_filter {
            margin: 10px 0 10px 20px;
        }
    }
    .second {
        display: flex;
        li {
            margin: 10px;
            width: 160px;
        }
        .btn_filter {
            margin: 10px 0 10px 20px;
        }
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
            <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectTab = 1">分公司</div>
            <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectTab = 2">部门</div>
            <div class="tabs-col" :class="{ show: selectTab == 3 }" @click="selectTab = 3">业务</div>
            <div class="tabs-col" :class="{ show: selectTab == 4 }" @click="selectTab = 4">客户</div>
        </div>
        <div class="list" style="top: 92px">
            <div class="date-wrap" style="padding-top: 10px">
                <ul>
                    <li>
                        <span>出运日期:</span>
                        <el-date-picker value-format="yyyy-MM-dd" v-model="condition.sh_date_b" type="date" transfer size="small" style="width: 130px; margin-left: 10px"></el-date-picker>
                        <span style="padding: 0px 5px">至</span>
                        <el-date-picker value-format="yyyy-MM-dd" v-model="condition.sh_date_e" type="date" transfer size="small" style="width: 130px"></el-date-picker>
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
                            <el-select v-model="selectOption.shn_dep_name.value" size="small" placeholder="部门" filterable clearable multiple collapse-tags>
                                <el-option v-for="item in selectOption.shn_dep_name.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li>
                        <li>
                            <el-select v-model="selectOption.shn_cus_name.value" size="small" placeholder="客户" filterable clearable multiple collapse-tags>
                                <el-option v-for="item in selectOption.shn_cus_name.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li>
                        <li>
                            <el-select v-model="selectOption.shn_currency.value" size="small" placeholder="币种" filterable clearable multiple collapse-tags>
                                <el-option v-for="item in selectOption.shn_currency.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li>

                        <div class="btn_filter">
                            <el-button size="small" @click="queryChange">筛选</el-button>
                        </div>
                    </ul>

                </div>
            </div>
        </transition>

        <div class="tabs-list-body" style="top: 150px;left: 15px;right: 15px;">
            <listPage31 v-if="selectTab == 1" :pieList="pieList"></listPage31>
            <listPage32 v-if="selectTab == 2" :pieList="pieList"></listPage32>
            <listPage33 v-if="selectTab == 3" :pieList="pieList"></listPage33>
            <listPage34 v-if="selectTab == 4" :pieList="pieList" :selectOption="selectOption" :date="condition" :key="timer"></listPage34>
        </div>
    </div>

</template>

<script>
import analysisApi from "@/api/cbs/analysis.js";
import listPage31 from "./list-page31.vue";
import listPage32 from "./list-page32.vue";
import listPage33 from "./list-page33.vue";
import listPage34 from "./list-page34.vue";
export default {
    components: {
        listPage31,
        listPage32,
        listPage33,
        listPage34,
    },

    data() {
        return {
            selectTab: 1,
            condition: {
                sh_date_b: "", //出运发布时间起始，默认当年1月1日
                sh_date_e: "", //出运发布时间结束，默认当天
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
                shn_dep_name: {
                    title: "部门",
                    value: [],
                    options: [],
                },
                shn_cus_name: {
                    title: "客户", //简称
                    value: [],
                    options: [],
                },

                shn_currency: {
                    title: "币种",
                    value: [],
                    options: [],
                },
            },
            groupOption: {
                groupProps: [],
                sumProps: [
                    "shCount",
                    "shn_qty_a", //实际出运数量
                    "shn_amount_a",
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
            sh_dep_name: [],
        };
    },
    created() {
        this.date();
        this.query();
    },
    mounted() {},
    methods: {
        date() {
            let date = new Date();
            let y = date.getFullYear();
            let m = (date.getMonth() + 1).toString().padStart(2, "0");
            let d = date.getDate().toString().padStart(2, "0");
            let start = y + "-01-01";
            let end = y + "-" + m + "-" + d;
            this.condition.sh_date_b = start;
            this.condition.sh_date_e = end;
        },
        query() {
            analysisApi.getshipDetail(this.condition).then((res) => {
                this.dataList = Object.freeze(res.data || []);

                console.log("dataList222", this.dataList);

                Object.keys(this.selectOption).forEach((item) => {
                    this.option(this.dataList, item);
                });

                this.sh_dep_name = this.selectOption.shn_dep_name.options;

                this.queryChange();
            });
        },
        option(dataList, key) {
            this.selectOption[key].options = this.$general
                .groupBy(dataList, key)
                .map((item) => {
                    return { value: item, label: item };
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
            this.groupbyAnalysis();
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
        totalCount(list) {
            this.total = this.$general.toArraySumGroup(list, {
                groupProps: [],
                sumProps: ["shn_amount_a"],
            });
        },
        // 出运票数
        addNum(tabName) {
            let filterArr = [];
            this.filterList.forEach((item) => {
                item.shCount = 0;
                let obj1 = {
                    category: item[tabName],
                    shn_code: item.shn_code,
                };
                let isExist = filterArr.includes(obj1);
                if (!isExist) {
                    let obj2 = {
                        category: item[tabName],
                        shn_code: item.shn_code,
                    };
                    filterArr.push(obj2);
                    item.shCount = 1;
                }
            });
        },
        groupbyAnalysis() {
            let groupList = [];
            if (this.selectTab == 1) {
                this.addNum("branch_name");
                this.groupChange("branch_name", groupList, this.filterList);
            }
            if (this.selectTab == 2) {
                this.addNum("shn_dep_name");
                this.groupChange("shn_dep_name", groupList, this.filterList);
            }
            if (this.selectTab == 3) {
                this.addNum("shn_sales_name");
                this.groupChange("shn_sales_name", groupList, this.filterList);
            }
            if (this.selectTab == 4) {
                this.addNum("shn_cus_name");
                this.groupChange("shn_cus_name", groupList, this.filterList);
            }
        },
        groupChange(tabName, groupList, list) {
            if (tabName == "shn_cus_name") {
                this.groupOption.groupProps = ["shn_cus_id", "shn_cus_name"];
            }
            if (tabName == "shn_sales_name") {
                this.groupOption.groupProps = [
                    "shn_sales_id",
                    "shn_sales_name",
                ];
            } else {
                this.groupOption.groupProps = [tabName];
            }
            groupList = this.$general.toArraySumGroup(list, this.groupOption);

            groupList.forEach((item) => {
                item.proportion = parseFloat(
                    (
                        item["shn_amount_a"] / this.total[0]["shn_amount_a"]
                    ).toFixed(4)
                );

                item.shn_amount_a = parseFloat(
                    (item.shn_amount_a / 10000).toFixed(2)
                );
                item.shn_qty_a = parseFloat(item.shn_qty_a.toFixed(2));
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
                shCount: 0,
                shn_qty_a: 0,
                shn_amount_a: 0,
                proportion: 0,
            };
            obj[tabName] = "其他";
            otherData.forEach((item) => {
                obj.shn_qty_a += item.shn_qty_a;
                obj.shn_amount_a += item.shn_amount_a;
                obj.shCount += item.shCount;
            });
            obj.shn_amount_a = parseFloat(obj.shn_amount_a.toFixed(2));
            obj.shn_qty_a = parseFloat(obj.shn_qty_a.toFixed(2));

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
                    this.selectOption.shn_dep_name.options = [];
                    let depArr = [];
                    this.sh_dep_name.forEach((item) => {
                        newVal.value.forEach((dep) => {
                            if (item.value.indexOf(dep) > -1) {
                                depArr.push(item);
                            }
                        });
                    });
                    this.selectOption.shn_dep_name.options = depArr.sort();
                } else {
                    this.selectOption.shn_dep_name.options = this.sh_dep_name;
                }
            },
            deep: true,
        },
    },
};
</script>