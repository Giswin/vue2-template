<template>
    <div class="my-filter-content">
        <div class="my-fc-search">
            <div class="my-fc-search-top">
                <el-input v-model="option.data.sVal" placeholder="搜索" size="small" @change="searchEvent" suffix-icon="fa fa-search"></el-input>
            </div>
            <div class="my-fc-search-content">
                <template v-if="valList.length">
                    <ul class="my-fc-search-list my-fc-search-list-head">
                        <li class="my-fc-search-item">
                            <el-checkbox v-model="isAll" @change="changeAllEvent">全选</el-checkbox>
                        </li>
                    </ul>
                    <ul class="my-fc-search-list my-fc-search-list-body">
                        <template v-for="(item, sIndex) in valList">
                            <li class="my-fc-search-item" :key="sIndex" v-if="sIndex < 100">
                                <el-checkbox v-model="item.checked">{{ item.value }}</el-checkbox>
                            </li>
                            <li class="my-fc-search-item" :key="sIndex" v-if="sIndex == 101">
                                可选项只显示 100 个
                            </li>
                        </template>
                    </ul>
                </template>
                <template v-else>
                    <div class="my-fc-search-empty">无匹配项</div>
                </template>
            </div>
        </div>
        <div class="my-fc-footer">
            <el-button type="primary" size="mini" @click="confirmFilterEvent">确认</el-button>
            <el-button size="mini" @click="resetFilterEvent">重置</el-button>
        </div>
    </div>
</template>

<script>
import XEUtils from "xe-utils";
export default {
    name: "FilterSelect",
    props: {
        params: Object,
    },
    data() {
        return {
            size: "mini",
            isAll: false,
            option: null,
            colValList: [],
            valList: [],
        };
    },
    created() {
        this.load();
    },
    methods: {
        load() {
            const { $table, column } = this.params;
            const { visibleData } = $table.getTableData();
            const option = column.filters[0];
            const { vals } = option.data;
            const colValList = Object.keys(
                XEUtils.groupBy(visibleData, column.property)
            ).map((val) => {
                return {
                    checked: vals.includes(val),
                    value: val,
                };
            });
            this.option = option;
            this.colValList = colValList;
            this.valList = colValList;
        },
        searchEvent() {
            const { option, colValList } = this;
            this.valList = option.data.sVal
                ? colValList.filter(
                      (item) => item.value.indexOf(option.data.sVal) > -1
                  )
                : colValList;
        },
        changeAllEvent() {
            const { isAll } = this;
            this.valList.forEach((item) => {
                item.checked = isAll;
            });
        },
        confirmFilterEvent(evnt) {
            const { params, option, valList } = this;
            const { data } = option;
            const { $panel } = params;
            data.vals = valList
                .filter((item) => item.checked)
                .map((item) => item.value);
            if (data.vals.length > 0) {
                $panel.changeOption(evnt, true, option);
                $panel.confirmFilter();
            } else {
                $panel.resetFilter();
            }
        },
        resetFilterEvent() {
            const { $panel } = this.params;
            $panel.resetFilter();
        },
    },
};
</script>

<style>
.my-filter-content {
    width: 200px;
    padding: 10px;
    user-select: none;
}
.my-filter-content .my-fc-search .my-fc-search-top {
    position: relative;
    padding: 5px 0;
}
.my-filter-content .my-fc-search .my-fc-search-top > input {
    border: 1px solid #ababab;
    padding: 0 20px 0 2px;
    width: 200px;
    height: 22px;
    line-height: 22px;
}
.my-filter-content .my-fc-search .my-fc-search-content {
    padding: 2px 10px;
}
.my-filter-content .my-fc-search-empty {
    text-align: center;
    padding: 20px 0;
}
.my-filter-content .my-fc-search-list {
    margin: 0;
    padding: 0;
    list-style: none;
}
.my-filter-content .my-fc-search-list-body {
    overflow: auto;
    height: 120px;
}
.my-filter-content .my-fc-search-list .my-fc-search-item {
    padding: 2px 0;
    display: block;
}
.my-filter-content .my-fc-footer {
    text-align: right;
    padding-top: 10px;
}
.my-filter-content .my-fc-footer button {
    padding: 5px 15px;
    margin-left: 15px;
}
</style>