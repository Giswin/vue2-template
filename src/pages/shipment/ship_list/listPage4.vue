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
                        <filter-form ref="filterForm" :conditions="formConditions" label_width="110px" :view_type="view_type" @search="filterFormConfirm"></filter-form>
                    </div>
                    <div class="m-l" style="margin-left: 5px;">
                        <el-button size="small" @click="closeFilter">清空筛选</el-button>
                    </div>
                    <div class="m-l" style="margin-left: 5px;">
                        <el-button size="small" @click="handleDelete">删除</el-button>
                    </div>

                </div>
            </div>
        </div>

        <div class="tabs-list-body tabs-list-body-table">

            <div class="table of">
                <vxe-toolbar custom ref="xToolbar4"></vxe-toolbar>
                <vxe-table border :data="dataList4" ref="dataTable4" resizable size="small" auto-resize height="100%" :sort-config="{ remote: true, trigger: 'cell' }" @sort-change="sortChange" :column-config="{minWidth:140}" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row>
                    <vxe-table-column type="checkbox" width="50" align="center" fixed="left"></vxe-table-column>
                    <vxe-table-column field="shc_code" title="报关单号" align="center" :width="$columns.info.medium" fixed="left" sortable></vxe-table-column>
                    <vxe-table-column field="shc_invoice_no" title="报关运编号" align="center" :width="$columns.info.large" fixed="left" sortable></vxe-table-column>
                    <vxe-table-column field="ship_codes" title="通知运编号" align="center" :width="$columns.info.medium" fixed="left" sortable></vxe-table-column>
                    <vxe-table-column field="shc_creator" title="创建人" align="center" min-width="120" fixed="left" sortable></vxe-table-column>
                    <vxe-table-column field="shc_update_time" title="修改时间" :width="$columns.date.large" align="center" sortable fixed="left"></vxe-table-column>
                    <!-- <vxe-table-column field="shc_publish_time" title="发布时间" :width="$columns.date.large" align="center" sortable fixed="left"></vxe-table-column> -->

                    <vxe-table-column field="shc_dep_name" title="部门" :width="$columns.info.small" header-align="center" fixed="left" sortable></vxe-table-column>
                    <vxe-table-column field="shc_title_name" title="出运抬头" :width="$columns.info.large" header-align="center"></vxe-table-column>
                    <vxe-table-column field="shc_cus_name" title="结算客户" :width="$columns.info.medium" header-align="center" sortable></vxe-table-column>
                    <vxe-table-column field="shc_business_type" title="贸易方式" :width="$columns.type.medium" align="center"></vxe-table-column>

                    <vxe-table-column field="shc_port_from" title="装运港" :width="$columns.info.medium" header-align="center" sortable></vxe-table-column>
                    <vxe-table-column field="shc_prot_to" title="目的港" :width="$columns.info.medium" header-align="center" sortable></vxe-table-column>
                    <vxe-table-column field="shc_ship_date_e" title="预计船期" :width="$columns.date.medium" align="center" sortable></vxe-table-column>
                    <vxe-table-column field="shc_ship_date_a" title="实际船期" :width="$columns.date.medium" align="center" sortable></vxe-table-column>

                    <vxe-table-column field="shc_currency" title="币种" :width="$columns.type.mini" align="center" sortable></vxe-table-column>
                    <vxe-table-column field="shc_amount" title="出运金额" min-width="100" header-align="center" align="right" :formatter="formatAmount" sortable></vxe-table-column>
                    <vxe-table-column field="shc_qty" title="出运数量" :width="$columns.date.medium" align="center" sortable></vxe-table-column>

                    <vxe-table-column title="操作" width="95" align="center" fixed="right">
                        <template #default="{ row }">
                            <el-dropdown>
                                <el-button size="mini">
                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">

                                    <el-dropdown-item @click.native="handleToEdit(row.shc_id)" v-show="selectOptions!=51">编辑</el-dropdown-item>

                                    <el-dropdown-item @click.native="exportExcel(row)">导出</el-dropdown-item>

                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </vxe-table-column>
                </vxe-table>
            </div>
        </div>
        <div class="list-bottom">
            <div class="m-r">
                <vxe-pager background :current-page.sync="tablePages.cur_page" :page-size.sync="tablePages.page_count" :total="tablePages.total" @page-change="pageChange" :page-sizes="[10,20,50,100,500,1000,10000]">
                </vxe-pager>
            </div>
            <div class="clear"></div>
        </div>
        <custom-edit v-if="showCustom" :selectOptions="selectOptions" :shc_id="shc_id" :cus_state="cus_state" @closeCustom="closeCustom" @closeCusIcon="closeCusIcon"></custom-edit>

    </div>
</template>

<script>
import shipApi from "@/api/cbs/ship.js";
import customEdit from "../custom_edit.vue";

export default {
    components: {
        customEdit,
    },
    props: {
        selectOptions: {
            type: Object,
        },
        keyword: {
            type: String,
        },
    },
    data() {
        return {
            formTags: [],
            condition: {
                page: 1,
                perPage: 20,
                columns: [],
                keyword: "",
                orderBy: "",
            },
            view_type: 1,
            dataList4: [],
            showCustom: false,
            shc_id: 0,
            cus_state: 2,
            // 表格分页
            tablePages: {
                cur_page: 1, // 当前页
                page_count: 20, // 每页条数
                total: 0, // 总条数
            },
            formConditions: {
                shc_code: {
                    type: "input",
                    field: "shc_code",
                    title: "报关单号",
                    value: "",
                },
                shc_dep_name: {
                    type: "select",
                    field: "shc_dep_name",
                    title: "部门",
                    value: [],
                    treeName: "shipDep4",
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
                shc_cus_id: {
                    type: "select",
                    field: "shc_cus_id",
                    title: "客户",
                    value: "",
                    options: {
                        config: {
                            label: "trader_name",
                            value: "trader_id",
                            multiple: false,
                        },
                        data: [],
                    },
                },
            },
        };
    },
    created() {
        this.handleOptions();
        this.query();
    },
    methods: {
        handleOptions() {
            this.formConditions.shc_dep_name.options.data =
                this.selectOptions.dep;

            this.formConditions.shc_cus_id.options.data =
                this.selectOptions.allCus;
        },
        query() {
            this.tablePages.cur_page = 1;
            this.findList();
        },
        findList() {
            this.condition.page = this.tablePages.cur_page;
            this.condition.perPage = this.tablePages.page_count;
            this.condition.keyword = this.keyword;
            this.condition.columns = this.formTags;
            // 传condition获取List数据
            shipApi.getCustomList(this.condition).then((res) => {
                console.log("报关单列表", res);
                if (res.code == 0) {
                    this.dataList4 = Object.freeze(res.data.list);
                    this.tablePages.cur_page = parseInt(res.data.page);
                    this.tablePages.total = parseInt(res.data.count);
                }
            });
        },
        // 数据分页切换
        pageChange({ currentPage, pageSize }) {
            this.tablePages.cur_page = currentPage;
            this.tablePages.page_count = pageSize;
            this.findList();
        },
        // 筛选表单确认回调方法
        filterFormConfirm({ consArray }) {
            // 获取已设置的条件项值来刷新筛选表单标签值
            this.formTags = consArray || [];
            this.showTag();
        },
        showTag() {
            this.condition.columns = [];
            this.formTags.forEach((item) => {
                let obj = {
                    type: "",
                    field: "",
                    value: null,
                };
                obj.type = item.type;
                obj.field = item.field;
                obj.value = item.value;
                this.condition.columns.push(obj);
            });
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

        formatAmount({ cellValue }, digits = 2) {
            // 四舍五入金额，每隔3位逗号分隔，默认2位数
            return this.$XEUtils.commafy(this.$XEUtils.toNumber(cellValue), {
                digits,
            });
        },
        // 列头点击排序事件，排序功能
        sortChange({ column, property, order, sortBy, sortList, $event }) {
            if (order) {
                this.condition.orderBy =
                    (sortBy ? sortBy : column.property) + " " + column.order;
            } else {
                this.condition.orderBy = "";
            }
            this.query();
        },
        // 删除
        handleDelete() {
            let selectedRows = this.$refs.dataTable4.getCheckboxRecords(true);
            if (!selectedRows || selectedRows.length < 1) {
                this.$message({
                    message: "请选择要删除的报关单 ! ",
                    type: "info",
                });
                return;
            }
            let shc_ids = [];
            selectedRows.forEach((item) => {
                shc_ids.push(item.shc_id);
            });

            this.$confirm("确定要发删除报关单?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    shipApi.customDelete(shc_ids).then((res) => {
                        if (res.code == 0) {
                            this.$message({
                                message: "报关单删除成功 ！ ",
                                type: "success",
                            });
                            this.query();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        // 编辑出运报关
        handleToEdit(shc_id) {
            this.shc_id = shc_id;
            this.cus_state = 2;
            this.showCustom = true;
        },
        closeCustom() {
            this.showCustom = false;
            this.query();
        },
        closeCusIcon() {
            this.showCustom = false;
        },
        // 导出
        exportExcel(row) {
            shipApi.exportExcel(row.shc_id).then((res) => {
                if (res.code == 0) {
                    if (res.data) {
                        setTimeout(function () {
                            window.open(res.data.ref_url, "_blank");
                        }, 1000);
                        //   window.open(res.data.ref_url,'_blank');
                    }
                    this.$XModal.message("导出成功", "success");
                } else {
                    this.$XModal.message(res.msg || "导出失败", "error");
                }
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
>>> .vxe-toolbar {
    position: absolute;
    z-index: 23;
    right: 20px;
    top: -40px;
    width: 30px;
    height: 30px;
}
</style>