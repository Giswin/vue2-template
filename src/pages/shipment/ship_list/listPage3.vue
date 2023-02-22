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

                </div>
            </div>
        </div>

        <div class="tabs-list-body tabs-list-body-table">

            <div class="table of">
                <vxe-toolbar custom ref="xToolbar3"></vxe-toolbar>
                <vxe-table border ref="dataTable3" :data="dataList3" resizable size="small" auto-resize height="100%" :column-config="{minWidth:140}" class="mytable-scrollbar" show-overflow highlight-current-row :sort-config="{ remote: true, trigger: 'cell' }" @sort-change="sortChange" highlight-hover-row>
                    <vxe-table-column type="checkbox" width="30" align="center" fixed="left"></vxe-table-column>
                    <vxe-table-column field="shn_code" title="单据编码" header-align="center" min-width="120" fixed="left" sortable></vxe-table-column>
                    <vxe-table-column field="shn_invoice_no_ebs" title="运编号" align="center" :width="$columns.info.large" fixed="left" sortable></vxe-table-column>
                    <vxe-table-column field="shn_publish_time" title="发布时间" min-width="120" align="center" sortable fixed="left"></vxe-table-column>
                    <vxe-table-column field="shn_dep_name" title="部门" :width="$columns.info.small" header-align="center" fixed="left" sortable></vxe-table-column>
                    <vxe-table-column field="shn_sales_name" title="业务员" :width="$columns.info.mini" align="center" fixed="left" sortable></vxe-table-column>

                    <vxe-table-column field="shc_code" title="报关单号" width="120" align="center" sortable></vxe-table-column>
                    <vxe-table-column field="shn_title_name" title="出运抬头" :width="$columns.info.large" header-align="center"></vxe-table-column>
                    <vxe-table-column field="shn_cus_name" title="结算客户" :width="$columns.info.medium" header-align="center" sortable></vxe-table-column>

                    <vxe-table-column field="shn_port_from" title="装运港" :width="$columns.info.medium" header-align="center" sortable></vxe-table-column>
                    <vxe-table-column field="shn_port_to" title="目的港" :width="$columns.info.medium" header-align="center" sortable></vxe-table-column>

                    <vxe-table-column field="shnd_article_number" title="货号" width="100" header-align="center" fixed="left"></vxe-table-column>

                    <vxe-table-column field="shn_currency" title="币种" width="50" align="center"></vxe-table-column>

                    <vxe-table-colgroup title="预计出运" header-align="center">
                        <vxe-table-column field="shnd_qty_e" title="数量" header-align="center" align="right" :width="$columns.number.small" sortable></vxe-table-column>
                        <vxe-table-column field="shnd_price_e" title="单价" header-align="center" align="right" :width="$columns.number.small" sortable></vxe-table-column>
                        <vxe-table-column field="shnd_amount_e" title="金额" header-align="center" align="right" :width="$columns.number.medium" sortable></vxe-table-column>
                    </vxe-table-colgroup>
                    <vxe-table-colgroup title="实际出运" header-align="center">
                        <vxe-table-column field="shnd_qty_a" title="数量" header-align="center" align="right" :width="$columns.number.small" sortable></vxe-table-column>
                        <vxe-table-column field="shnd_price_a" title="单价" header-align="center" align="right" :width="$columns.number.small" sortable></vxe-table-column>
                        <vxe-table-column field="shnd_amount_a" title="金额" header-align="center" align="right" :width="$columns.number.medium" sortable></vxe-table-column>
                    </vxe-table-colgroup>

                    <vxe-table-column title="操作" width="100" align="center" fixed="right">
                        <template #default="{ row }">
                            <el-dropdown>
                                <el-button size="mini">
                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="handleToDetail(row)">详情</el-dropdown-item>
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
    </div>
</template>

<script>
import shipApi from "@/api/cbs/ship.js";
export default {
    props: {
        selectTab: {
            type: Number,
        },
        selectOptions: {
            type: Object,
        },
        keyword: {
            type: String,
        },
    },
    data() {
        return {
            dataList3: [],
            formTags: [],
            condition: {
                page: 1,
                perPage: 20,
                columns: [],
                keyword: "",
                query_state: 1,
                orderBy: "",
            },
            // 表格分页
            tablePages: {
                cur_page: 1, // 当前页
                page_count: 20, // 每页条数
                total: 0, // 总条数
            },
            view_type: 1,

            formConditions: {
                shn_code: {
                    type: "input",
                    field: "shn_code",
                    title: "单据编码",
                    value: "",
                },
                shn_dep_name: {
                    type: "select",
                    field: "shn_dep_name",
                    title: "部门",
                    value: [],
                    treeName: "shipDep3",
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
                shn_sales_id: {
                    type: "select",
                    field: "shn_sales_id",
                    title: "业务员",
                    value: "",
                    options: {
                        config: {
                            label: "staff_name", // 下拉选项显示字段
                            value: "staff_id", // 下拉选择值字段
                            multiple: true, // 是否为多选
                        },
                        data: [{}], // 下拉数据集
                    },
                },
                shn_cus_id: {
                    type: "select",
                    field: "shn_cus_id",
                    title: "客户",
                    value: "",
                    options: {
                        config: {
                            label: "trader_name_abb",
                            value: "trader_id",
                            multiple: false,
                        },
                        data: [],
                    },
                },
                shn_acc_book_id: {
                    type: "select",
                    field: "shn_acc_book_id",
                    title: "接单抬头",
                    value: "",
                    options: {
                        config: {
                            label: "title",
                            value: "title_id",
                            multiple: false,
                        },
                        data: [],
                    },
                },
            },
        };
    },
    created() {
        this.getOptionData();

        this.query();
        this.$nextTick(() => {
            // 手动将表格和工具栏进行关联
            this.$refs.dataTable3.connect(this.$refs.xToolbar3);
        });
    },
    methods: {
        query() {
            this.tablePages.cur_page = 1;
            this.findList();
        },
        findList() {
            this.condition.page = this.tablePages.cur_page;
            this.condition.perPage = this.tablePages.page_count;
            this.condition.keyword = this.keyword;
            this.condition.columns = this.formTags;

            if (this.selectTab == 4) {
                this.condition.query_state = 1;
            }
            if (this.selectTab == 6) {
                this.condition.query_state = 2;
            }
            // 传condition获取List数据
            shipApi.getDetailList(this.condition).then((res) => {
                console.log("出运通知明细列表", res);
                if (res.code == 0) {
                    this.dataList3 = Object.freeze(res.data.list);
                    this.tablePages.cur_page = parseInt(res.data.page);
                    this.tablePages.total = parseInt(res.data.count);
                }
            });
        },
        getOptionData() {
            this.formConditions.shn_dep_name.options.data =
                this.selectOptions.dep;
            this.formConditions.shn_sales_id.options.data =
                this.selectOptions.sales;
            this.formConditions.shn_cus_id.options.data =
                this.selectOptions.allCus;
            this.formConditions.shn_acc_book_id.options.data =
                this.selectOptions.allTitle;
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

        formatAmount({ cellValue }, digits = 0) {
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
        // 跳转详情
        handleToDetail(row) {
            let data = {
                id: row.shn_id,
                flag: row.shn_code,
            };
            this.$router.push({
                path: "/ship_detail",
                query: data,
            });
        },
    },
    watch: {
        selectTab: {
            handler(newVal, oldVal) {
                if (newVal) {
                    if (newVal == 4) {
                        this.condition.query_state = 1;
                    }
                    if (newVal == 6) {
                        this.condition.query_state = 2;
                    }
                    this.query();
                }
            },
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