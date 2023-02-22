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
                        <el-dropdown>
                            <el-button size="small" style="margin-left: 5px;">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="newShNote(1)">新建出运通知</el-dropdown-item>
                                <!-- <el-dropdown-item @click.native="newShNote(2)">新建装箱出运通知</el-dropdown-item> -->
                                <el-dropdown-item @click.native="setPoShippedFlag(2)">标识已出运</el-dropdown-item>
                                <el-dropdown-item @click.native="setPoShippedFlag(1)">取消出运标识</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>

                </div>
            </div>
        </div>
        <div class="tabs-list-body tabs-list-body-table">

            <div class="table of">
                <vxe-toolbar custom ref="xToolbar1"></vxe-toolbar>

                <vxe-table border :data="dataList1" ref="dataTable1" resizable size="small" auto-resize height="100%" :column-config="{minWidth:140}" class="mytable-scrollbar" show-overflow highlight-current-row :scroll-y="{oSize: 30,scrollToTopOnChange:true}" :sort-config="{ remote: true, trigger: 'cell' }" @sort-change="sortChange" highlight-hover-row>
                    <vxe-table-column type="checkbox" width="40" align="center" fixed="left"></vxe-table-column>
                    <vxe-table-column field="order_dep_name" title="业务部门" sortable header-align="center" width="90" fixed="left">
                        <template #default="{ row }">
                            <el-badge type="success" is-dot :hidden="(row.order_goods_state  !== '2')">{{ row.order_dep_name }}</el-badge>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_salesman_name" title="业务员" sortable align="center" width="90" fixed="left"></vxe-table-column>
                    <vxe-table-column field="order_business_type" title="业务类型" width="100" header-align="center" fixed="left">

                    </vxe-table-column>
                    <vxe-table-column field="order_cus_name" title="客户" sortable width="100" header-align="center" fixed="left"></vxe-table-column>
                    <vxe-table-column field="order_price_clause" title="价格条款" width="70" header-align="center" fixed="left"></vxe-table-column>
                    <vxe-table-column field="order_collect_mode" title="结算方式" width="70" header-align="center" fixed="left"></vxe-table-column>
                    <vxe-table-column field="order_currency" title="币种" width="50" align="center" fixed="left"></vxe-table-column>
                    <vxe-table-column field="order_port_to" title="目的港" sortable width="120" align="center" fixed="left"></vxe-table-column>
                    <vxe-table-column field="order_project_code" title="项目号" sortable width="120" header-align="center"></vxe-table-column>
                    <vxe-table-column field="order_cus_od_code" title="订单号" sortable width="120" header-align="center"></vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="货号" sortable width="100" header-align="center"></vxe-table-column>
                    <vxe-table-column field="order_goods_name" title="中文品名" width="100" header-align="center"></vxe-table-column>
                    <vxe-table-column field="order_goods_name_en" title="英文品名" width="100" header-align="center"></vxe-table-column>
                    <vxe-table-column field="order_delivery_date" title="订单交期" sortable min-width="100" align="center"></vxe-table-column>
                    <vxe-table-column field="order_goods_qty" title="订单数量" :formatter="formatAmount" width="80" header-align="center" align="right"></vxe-table-column>
                    <vxe-table-column field="order_goods_shipping_qty" title="已出运数量" :formatter="formatAmount" width="80" header-align="center" align="right"></vxe-table-column>
                    <vxe-table-column field="order_goods_to_ship_qty" title="待出运数量" :formatter="formatAmount" width="80" header-align="center" align="right"></vxe-table-column>
                    <vxe-table-column field="order_goods_price" title="单价" width="80" header-align="center" align="right"></vxe-table-column>
                    <vxe-table-column field="order_goods_ven_name" title="供应商" sortable min-width="140" align="center"></vxe-table-column>
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
        <ship-edit v-if="showEdit" :selectOptions="selectOptions" :shn_id="shn_id" :edit_state="edit_state" @closeEdit="closeEdit" @closeIcon="closeIcon"></ship-edit>
    </div>

</template>

<script>
import shipEdit from "../ship_edit.vue";
import shipApi from "@/api/cbs/ship.js";
import ebsApi from "@/api/gbs/ebs.js";
export default {
    components: {
        shipEdit,
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
            // 筛选条件项表单配置 (Object)
            formConditions: {
                order_dep_name: {
                    type: "select",
                    field: "order_dep_name",
                    title: "业务部门",
                    value: [],
                    treeName: "shipDep1",
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
                order_business_type: {
                    type: "select",
                    field: "order_business_type",
                    title: "业务类型",
                    value: "",
                    options: {
                        config: {
                            label: "dic_name",
                            value: "dic_name",
                            multiple: false,
                        },
                        data: [],
                    },
                },
                order_title_id: {
                    type: "select",
                    field: "order_title_id",
                    title: "接单抬头",
                    value: null,
                    options: {
                        config: {
                            label: "title", // 下拉选项显示字段
                            value: "title_id", // 下拉选择值字段
                            multiple: false, // 是否为多选
                        },
                        data: [], // 下拉数据集
                    },
                },

                order_goods_ven_name: {
                    type: "select",
                    field: "order_goods_ven_name",
                    title: "供应商名称",
                    value: [],
                    // 下拉选择框的下拉数据集配置
                    options: {
                        config: {
                            label: "trader_name", // 下拉选项显示字段
                            value: "trader_name", // 下拉选择值字段
                            multiple: true, // 是否为多选
                        },
                        data: [], // 下拉数据集
                    },
                },
                order_delivery_date: {
                    type: "date",
                    field: "order_delivery_date",
                    title: "订单交期",
                    value: {
                        start: "",
                        end: "",
                    },
                },
                order_goods_ship_state: {
                    type: "select",
                    field: "order_goods_ship_state",
                    title: "出运状态",
                    value: 1,
                    options: {
                        config: {
                            label: "label",
                            value: "value",
                            multiple: false,
                        },
                        data: [
                            {
                                value: 1,
                                label: "未出运",
                            },
                            {
                                value: 2,
                                label: "全部",
                            },
                        ],
                    },
                },
            },

            // 筛选表单标签值
            formTags: [
                {
                    key: "order_goods_ship_state",
                    field: "order_goods_ship_state",
                    title: "出运状态",
                    value: 1,
                    label: "未出运",
                    type: "select",
                },
            ],
            // formTags: [],
            condition: {
                page: 1,
                perPage: 20,
                columns: [],
                keyword: "",
                orderBy: "",
            },
            view_type: 1,
            dataList1: [],
            edit_state: 0,
            // 表格分页
            tablePages: {
                cur_page: 1, // 当前页
                page_count: 20, // 每页条数
                total: 0, // 总条数
            },
            showEdit: false,
            shn_id: 0,
        };
    },
    created() {
        this.handleOptions();
        this.findList();
        this.$nextTick(() => {
            // 手动将表格和工具栏进行关联
            this.$refs.dataTable1.connect(this.$refs.xToolbar1);
        });
    },
    methods: {
        handleOptions() {
            this.formConditions.order_dep_name.options.data =
                this.selectOptions.dep;
            this.formConditions.order_title_id.options.data =
                this.selectOptions.allTitle;
            this.formConditions.order_goods_ven_name.options.data =
                this.selectOptions.vender;
            this.formConditions.order_business_type.options.data =
                this.selectOptions.businessType;
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
            shipApi.getToShipList(this.condition, true).then((res) => {
                console.log("待出运列表", res);
                if (res.code == 0) {
                    this.dataList1 = Object.freeze(res.data.list);
                    this.tablePages.cur_page = parseInt(res.data.page);
                    this.tablePages.total = parseInt(res.data.count);
                }
            });
        },
        formatterNum({ cellValue }) {
            return this.$XEUtils.commafy(this.$XEUtils.toNumber(cellValue), {
                digits: 2,
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

        formatAmount({ cellValue }, digits = 0) {
            // 四舍五入金额，每隔3位逗号分隔，默认2位数
            return this.$XEUtils.commafy(this.$XEUtils.toNumber(cellValue), {
                digits,
            });
        },
        formatDate({ cellValue }) {
            return this.$XEUtils.toDateString(cellValue, "yyyy-MM-dd");
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

        /*待通知*/

        // 新建出运通知
        newShNote(noteType) {
            const table = this.$refs.dataTable1;
            const selectedRows = table.getCheckboxRecords(true);
            console.log("sel", selectedRows);
            if (selectedRows.length < 1) {
                this.$message({
                    message: "请勾选待通知数据",
                    type: "error",
                });
                return;
            }
            let attrs = [
                "order_title_id",
                "order_dep_name",
                "order_business_type",
                "order_cus_name",
                "order_price_clause",
                "order_currency",
            ];
            let flag = false;
            for (let i = 0; i < selectedRows.length; i++) {
                // 不能选择标识已出运的数据来新增出运通知
                if (selectedRows[i]["order_goods_state"] == 2) {
                    this.$message({
                        message: "不允许选择已标识出运的数据来生成出运通知！",
                        type: "error",
                    });

                    return false;
                }

                // 第一行不需要判断
                if (i > 0) {
                    for (let j = 0; j < attrs.length; j++) {
                        // 判断每个要比较的属性，是否和第一行一致
                        if (
                            selectedRows[i][attrs[j]] !=
                            selectedRows[0][attrs[j]]
                        ) {
                            flag = true;
                            break;
                        }
                    }
                }
            }

            if (flag) {
                this.$message({
                    message:
                        "业务类型、业务部门、客户、接单抬头、价格条款、币种必须相同才能一起生成出运通知！",
                    type: "error",
                });

                return false;
            } else {
                let goods_ids = [];
                selectedRows.forEach((item) => {
                    goods_ids.push(item.order_goods_id);
                });
                shipApi.shipCreate(goods_ids).then((res) => {
                    console.log("新建出运通知", res);
                    if (res.code == 0) {
                        this.edit_state = 0;
                        this.shn_id = res.data;
                        this.showEdit = true;
                    }
                });
            }
        },
        closeEdit() {
            this.showEdit = false;
            this.query();
        },
        closeIcon() {
            this.showEdit = false;
        },
        setPoShippedFlag(state) {
            let selectedRows = this.$refs.dataTable1.getCheckboxRecords(true);
            console.log("selectedRows", selectedRows);
            if (selectedRows.length < 1) {
                this.$message({
                    message: "请勾选待通知数据",
                    type: "error",
                });
                return;
            }
            let goods_ids = [];
            selectedRows.forEach((item) => {
                goods_ids.push(item.order_goods_id);
            });
            let msg =
                state == 2
                    ? "确定要将这些PO标记为已出运吗?"
                    : "要取消这些PO已出运标识吗?";

            let successMsg =
                state == 2 ? "标记已出运成功！" : "取消已出运标识成功！";
            this.$confirm(msg, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    shipApi.setShipState(goods_ids, state).then((res) => {
                        if (res.code == 0) {
                            this.$message({
                                message: successMsg,
                                type: "success",
                            });
                            this.query();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消标记操作",
                    });
                });
        },
    },
    watch: {},
};
</script>

<style scoped lang="scss">
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
