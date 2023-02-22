<template>
    <div>

        <div class="listform">
            <div class="form-body" style="margin-right:15px;">
                <div class="tags" style="margin-top: 13px;">
                    <div class="m-l" style="margin: 0 10px;">筛选条件:</div>
                    <div class="m-l">
                        <filter-tag :tags="formTags" @remove-tag="closeTag"></filter-tag>
                    </div>
                </div>
                <div class="form-button">
                    <div class="m-l" style="margin-left: 5px;">
                        <filter-form ref="filterForm" :conditions="conditions" label_width="110px" :view_type="view_type" @search="filterFormConfirm"></filter-form>
                    </div>
                    <div class="m-l" style="margin-left: 5px;">
                        <el-button size="small" @click="closeFilter">清空筛选</el-button>
                    </div>
                    <div class="m-l" style="margin-left: 5px;">
                        <!-- <el-button size="small" type="primary" @click="handleCreate">新建</el-button> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="tabs-list-body tabs-list-body-table">
            <div class="table">
                <vxe-table border :data="dataList2" resizable size="small" auto-resize height="100%" :column-config="{minWidth:140}" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row>
                    <vxe-table-column field="order_code" title="订单号" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column field="order_dep_name" title="部门" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column field="order_salesman_name" title="业务员" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column field="order_cus_name" title="客户" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column field="order_date" title="接单日期" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column field="od_cus_name" title="客户交期" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column field="od_cus_name" title="货号" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column field="od_cus_name" title="销售品名" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column field="od_cus_name" title="销售规格" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column field="od_cus_name" title="订单数" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column field="od_cus_name" title="供应商" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column field="od_cus_name" title="采购品名" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column field="od_cus_name" title="采购规格" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column field="od_cus_name" title="采购数量" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column field="od_cus_name" title="采购价" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column field="od_cus_name" title="入库数" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column field="od_cus_name" title="出运数" header-align="center" width="150" align="left"></vxe-table-column>
                    <vxe-table-column title="操作" header-align="center" width="150" align="left">
                        <template #default="{ row }">
                            <el-dropdown>
                                <el-button size="mini">
                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="stockIn(row)">入库信息</el-dropdown-item>
                                    <el-dropdown-item @click.native="stockOut(row)">标记信息</el-dropdown-item>
                                    <el-dropdown-item @click.native="trackStatus(row)">跟踪状态</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </vxe-table-column>
                </vxe-table>

            </div>

            <div class="list-bottom">
                <div class="m-r">
                    <vxe-pager background :current-page.sync="tablePages.cur_page" :page-size.sync="tablePages.page_count" :total="tablePages.total" @page-change="pageChange" :page-sizes="[10,20,50,100,500,1000,10000]">
                    </vxe-pager>
                </div>
                <div class="clear"></div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            conditions: {
                // 下拉选择
                dep: {
                    type: "select",
                    field: "dep",
                    title: "部门",
                    value: [],
                    treeName: "orderDep",
                    // 下拉选择框的下拉数据集配置
                    options: {
                        config: {
                            label: "value", // 下拉选项显示字段
                            value: "value", // 下拉选择值字段
                            multiple: true, // 是否为多选
                            tree: true,
                        },
                        data: [], // 下拉数据集
                    },
                },
                cus: {
                    type: "select",
                    field: "salse",
                    title: "客户名称",
                    value: [],
                    // 下拉选择框的下拉数据集配置
                    options: {
                        config: {
                            label: "cus_name", // 下拉选项显示字段
                            value: "cus_id", // 下拉选择值字段
                            multiple: true, // 是否为多选
                        },
                        data: [], // 下拉数据集
                    },
                },
                // 日期区间过滤
                order_date: {
                    type: "date",
                    field: "order_date",
                    title: "下单日期",
                    value: {
                        start: "", // 起始日期
                        end: "", // 截止日期
                    },
                },
            },
            view_type: 1,
            dataList2: [],
            search: {},
            formTags: [],
            // 表格分页
            tablePages: {
                cur_page: 1, // 当前页
                page_count: 20, // 每页条数
                total: 0, // 总条数
            },
        };
    },
    methods: {
        // 筛选表单确认回调方法
        filterFormConfirm({ consArray }) {
            // 获取已设置的条件项值来刷新筛选表单标签值
            this.formTags = consArray || [];
            this.showTag();
        },
        showTag() {
            this.search = {};
            this.formTags.forEach((item) => {
                this.search[item.key] = item.value;
            });
            console.log("search", this.search);
            this.query();
        },
        // 关闭筛选标签
        closeTag(tag) {
            this.$refs["filterForm"].clearItem(tag.field);
            this.showTag();
        },
        // 清除筛选条件
        closeFilter() {
            this.$refs.filterForm.clearItems();
        },
        // 数据分页切换
        pageChange() {},

        // 入库信息
        stockIn() {},
        // 出库信息
        stockOut() {},
        // 状态跟踪
        trackStatus() {},
    },
};
</script>

<style scoped lang="scss">
.listform .form-button {
    top: -3px;
    right: 0px;
}
</style>