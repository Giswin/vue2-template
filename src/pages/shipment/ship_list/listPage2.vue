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
                    <div class="m-l" style="margin-left:5px;">
                        <vxe-button v-if="selectTab == 2" size="small" @click="deletes">删除</vxe-button>
                        <vxe-button v-if="selectTab == 3" size="small" @click="createCustom">生成报关</vxe-button>
                    </div>

                </div>
            </div>
        </div>
        <div class="tabs-list-body tabs-list-body-table">

            <div class="table of">
                <vxe-toolbar custom ref="xToolbar2"></vxe-toolbar>

                <vxe-table border :data="dataList2" ref="dataTable2" resizable size="small" auto-resize height="100%" :column-config="{minWidth:140}" class="mytable-scrollbar" show-overflow highlight-current-row :scroll-y="{oSize: 30,scrollToTopOnChange:true}" :sort-config="{ remote: true, trigger: 'cell' }" @sort-change="sortChange" highlight-hover-row>
                    <vxe-table-column type="checkbox" width="40" align="center" fixed="left"></vxe-table-column>
                    <vxe-table-column field="shn_code" title="单据编码" sortable header-align="center" width="110" fixed="left"></vxe-table-column>
                    <vxe-table-column field="shn_invoice_no_ebs" title="运编号" sortable header-align="center" align="left" width="130" fixed="left"></vxe-table-column>
                    <vxe-table-column field="shn_creator" title="创建人" width="110" sortable header-align="center" align="left" fixed="left"></vxe-table-column>
                    <vxe-table-column v-if="selectTab==2" field="shn_update_time" title="修改时间" sortable width="120" header-align="center" align="center" fixed="left"></vxe-table-column>
                    <vxe-table-column v-if="(selectTab > 2)" field="shn_publish_time" title="发布时间" sortable width="120" header-align="center" align="center" fixed="left"></vxe-table-column>
                    <vxe-table-column field="shn_dep_name" title="部门" sortable width="90" header-align="center" fixed="left" align="left"></vxe-table-column>
                    <vxe-table-column field="shn_sales_name" title="业务员" sortable width="90" header-align="center" align="left" fixed="left"></vxe-table-column>
                    <vxe-table-column field="shn_title_name" title="出运抬头" width="120" header-align="center" align="left"></vxe-table-column>
                    <vxe-table-column field="shn_cus_name" title="结算客户" sortable width="120" header-align="center" align="left"></vxe-table-column>
                    <vxe-table-column field="shn_trade_mode" title="贸易方式" width="100" header-align="center" align="center">

                    </vxe-table-column>
                    <vxe-table-column field="shn_port_from" title="起运港" sortable width="100" header-align="center" align="left"></vxe-table-column>
                    <vxe-table-column field="shn_port_to" title="目的港" sortable min-width="100" header-align="center" align="left"></vxe-table-column>
                    <vxe-table-column field="shn_ship_date_e" title="预计船期" sortable width="100" header-align="center" align="center"></vxe-table-column>
                    <vxe-table-column field="shn_load_mode_str" title="装柜类型" width="120" header-align="center" align="left">
                    </vxe-table-column>

                    <vxe-table-column field="shn_load_date" title="预计装柜日期" sortable width="110" header-align="center" align="center"></vxe-table-column>
                    <vxe-table-column field="shn_currency" title="币种" sortable min-width="80" align="center"></vxe-table-column>
                    <vxe-table-column field="shn_amount_e" title="出运金额" sortable min-width="90" align="right"></vxe-table-column>
                    <vxe-table-column field="shn_volume_e" title="预计体积CBM" min-width="100" header-align="center" align="right"></vxe-table-column>
                    <vxe-table-column field="shn_weight_g_e" title="预计毛重KGS" min-width="100" header-align="center" align="right"></vxe-table-column>
                    <vxe-table-column field="shn_weight_n_e" title="预计净重KGS" min-width="100" header-align="center" align="right"></vxe-table-column>
                    <vxe-table-column v-if="selectTab==5" field="shn_ship_date" title="实际出运日期" sortable min-width="120" align="center"></vxe-table-column>
                    <vxe-table-column v-if="selectTab==5" field="shn_qty_a" title="实际出运数量" sortable min-width="120" align="right"></vxe-table-column>
                    <vxe-table-column field="shn_api_time_ebs" title="出运同步" sortable min-width="100" align="center"></vxe-table-column>
                    <vxe-table-column title="操作" header-align="center" align="center" min-width="100" fixed="right">
                        <template #default="{ row }">
                            <el-dropdown>
                                <el-button size="mini">
                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="handleToDetail(row)">详情</el-dropdown-item>

                                    <template v-if="selectTab == 2">
                                        <el-dropdown-item @click.native="handleToEdit(row.shn_id)">编辑</el-dropdown-item>
                                        <el-dropdown-item @click.native="handleToPublish(row.shn_id)">发布</el-dropdown-item>
                                    </template>

                                    <template v-if="selectTab == 3">
                                        <el-dropdown-item @click.native="handleToCustom(row.shn_id)">报关登记</el-dropdown-item>
                                        <el-dropdown-item @click.native="handleToWithdraw(row.shn_id)">撤回</el-dropdown-item>
                                    </template>

                                    <template v-if="selectTab == 5">
                                        <el-dropdown-item @click.native="handleToEdit(row.shn_id)" v-if="(row.shn_api_info_ebs||'')==''">修改通知</el-dropdown-item>
                                        <el-dropdown-item @click.native="handleTosync(row.shn_id)" v-if="(row.shn_api_info_ebs||'')==''">出运同步</el-dropdown-item>
                                        <el-dropdown-item @click.native="unSync(row.shn_id)" v-if="(row.shn_api_info_ebs||'')!=''">撤销同步</el-dropdown-item>
                                        <el-dropdown-item @click.native="setFinish(row.shn_id,6)">结案</el-dropdown-item>
                                    </template>

                                    <el-dropdown-item @click.native="setFinish(row.shn_id,2)" v-show="row.shn_state==6">取消结案</el-dropdown-item>
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
        <ship-edit v-if="showEdit" :selectOptions="selectOptions" :shn_id="shn_id" :edit_state="edit_state" @closeEdit="closeEdit" @closeIcon="closeIcon"></ship-edit>
        <custom-edit v-if="showCustom" :selectOptions="selectOptions" :shc_id="shc_id" :cus_state="cus_state" @closeCustom="closeCustom" @closeCusIcon="closeCusIcon"></custom-edit>
    </div>

</template>

<script>
import shipEdit from "../ship_edit.vue";
import customEdit from "../custom_edit.vue";
import shipApi from "@/api/cbs/ship.js";
export default {
    components: {
        shipEdit,
        customEdit,
    },
    props: {
        selectTab: {
            type: Number,
        },
        keyword: {
            type: String,
        },
        selectOptions: {
            type: Object,
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
                query_state: 1,
            },
            view_type: 1,
            dataList2: [],
            showEdit: false,
            showCustom: false,
            cus_state: 0,
            shn_id: 0,
            shc_id: 0,
            edit_state: 1,
            // 表格分页
            tablePages: {
                cur_page: 1, // 当前页
                page_count: 20, // 每页条数
                total: 0, // 总条数
            },
            // 筛选条件项表单配置 (Object)
            formConditions: {
                shn_code: {
                    type: "input",
                    field: "shn_code",
                    title: "单据编码",
                    value: "",
                },
                shn_invoice_no_ebs: {
                    type: "like",
                    field: "shn_invoice_no_ebs",
                    title: "运编号",
                    value: "",
                },
                shn_dep_name: {
                    type: "select",
                    field: "shn_dep_name",
                    title: "部门",
                    value: [],
                    treeName: "shipDep",
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
                // shn_dep_id: {
                //     type: "select",
                //     field: "shn_dep_id",
                //     title: "业务部门",
                //     value: "",
                //     options: {
                //         config: {
                //             label: "dep_name", // 下拉选项显示字段
                //             value: "dep_id", // 下拉选择值字段
                //             multiple: true, // 是否为多选
                //         },
                //         data: [{}], // 下拉数据集
                //     },
                // },
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
                            label: "trader_name",
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
                shn_creator: {
                    type: "like",
                    field: "shn_creator",
                    title: "创建人",
                    value: "",
                },
            },
        };
    },
    created() {
        this.getOptionData();
        this.query();
    },
    methods: {
        //设置结案状态
        setFinish(shn_id, type) {
            //标记结案或取消结案
            let msg = "";
            if (type == 6) msg = "确认要结案吗？";
            else msg = "确认要取消结案吗？";
            this.$confirm(msg, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    shipApi.setShipnoteState(shn_id, type).then((res) => {
                        if (res.code == 0) {
                            this.$message({
                                message: res.msg,
                                type: "success",
                            });
                            this.query();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消操作",
                    });
                });
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
            if (this.selectTab == 2) {
                this.condition.query_state = 1;
            }
            if (this.selectTab == 3) {
                this.condition.query_state = 2;
            }
            if (this.selectTab == 5) {
                this.condition.query_state = 3;
            }
            if (this.selectTab == 8) {
                this.condition.query_state = 4;
            }
            // 传condition获取List数据
            shipApi.getShipList(this.condition).then((res) => {
                console.log("出运通知列表", res);
                if (res.code == 0) {
                    this.dataList2 = Object.freeze(res.data.list);
                    this.tablePages.cur_page = parseInt(res.data.page);
                    this.tablePages.total = parseInt(res.data.count);
                }
            });
        },
        loadType(loadArr) {
            let loadStr = "";
            loadArr = JSON.parse(loadArr);
            if (Array.isArray(loadArr)) {
                if (loadArr.length > 0) {
                    loadArr.forEach((item) => {
                        loadStr += item.type + " " + item.num + "; ";
                    });
                }
            }
            return loadStr;
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
        formatterNum({ cellValue }) {
            return this.$XEUtils.commafy(this.$XEUtils.toNumber(cellValue), {
                digits: 2,
            });
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

        // 出运通知草稿

        // 删除出运通知
        deletes() {
            let selectNotes = this.$refs.dataTable2.getCheckboxRecords(true);
            if (!selectNotes || selectNotes.length < 1) {
                this.$message({
                    message: "请选择要删除的出运通知!",
                    type: "info",
                });
                return;
            }

            let shn_ids = [];
            selectNotes.forEach((item) => {
                shn_ids.push(item.shn_id);
            });

            this.$confirm("确定要删除吗？如若删除运编号无法恢复！", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    shipApi.deleteShipNote(shn_ids).then((res) => {
                        if (res.code == 0) {
                            this.$message({
                                message: "删除出运通知成功！",
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

        // 详情
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
        // 编辑
        handleToEdit(shn_id) {
            this.shn_id = shn_id;
            this.edit_state = 1;
            this.showEdit = true;
        },
        closeEdit() {
            this.showEdit = false;
            this.query();
        },
        closeIcon() {
            this.showEdit = false;
        },
        // 发布
        handleToPublish(shn_id) {
            this.$confirm("确定要发布该出运通知?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    shipApi.publishShipNote(shn_id).then((res) => {
                        console.log("publish", res);
                        if (res.code == 0) {
                            this.$message({
                                message: "出运通知发布成功！",
                                type: "success",
                            });
                            this.query();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消发布",
                    });
                });
        },

        // 待报关
        createCustom() {
            let selectedRows = this.$refs.dataTable2.getCheckboxRecords(true);
            if (!selectedRows || selectedRows.length < 1) {
                this.$message({
                    message: "请选择要报关的出运通知!",
                    type: "info",
                });
                return;
            }

            let attrs = [
                "shn_dep_id",
                "shn_title",
                "shn_cus_id",
                "shn_trade_mode_code",
                "shn_price_clause",
                "shn_port_from",
                "shn_shipping_mode",
                "shn_port_to",
                "shn_currency",
            ];
            let diffed = false;
            for (let i = 0; i < selectedRows.length; i++) {
                // 第一行不需要判断
                if (i > 0) {
                    for (let j = 0; j < attrs.length; j++) {
                        // 判断每个要比较的属性，是否和第一行一致
                        if (
                            selectedRows[i][attrs[j]] !=
                            selectedRows[0][attrs[j]]
                        ) {
                            diffed = true;
                        }
                    }
                }
            }
            if (diffed) {
                this.$message({
                    message:
                        "贸易方式、部门、出运抬头、客户、价格条款、币种、起运港、目的港、运输方式 必须相同才能一起生成报关单！",
                    type: "error",
                });
                return false;
            }

            let shn_ids = [];
            selectedRows.forEach((item) => {
                shn_ids.push(item.shn_id);
            });

            shipApi.customCreate(shn_ids).then((res) => {
                if (res.code == 0) {
                    this.shc_id = res.data;
                    this.cus_state = 1;
                    this.showCustom = true;
                }
            });
        },

        // 报关登记
        handleToCustom(shn_id) {
            let shn_ids = [];
            shn_ids.push(shn_id);
            shipApi.customCreate(shn_ids).then((res) => {
                if (res.code == 0) {
                    this.shc_id = res.data;
                    this.cus_state = 1;
                    this.showCustom = true;
                }
            });
        },
        closeCustom() {
            this.showCustom = false;
        },
        closeCusIcon() {
            this.showCustom = false;
        },
        // 撤回
        handleToWithdraw(shn_id) {
            this.$confirm("确定要撤回该出运通知?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                shipApi.withdrawShipNote(shn_id).then((res) => {
                    if (res.code == 0) {
                        this.$message({
                            message: "出运通知已撤回！",
                            type: "success",
                        });
                        this.query();
                    }
                });
            });
        },

        // 已报关
        // 出运同步
        handleTosync(shn_id) {
            this.$confirm("确定把出运通知同步到EBS吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                shipApi.syncShipNote(shn_id).then((res) => {
                    if (res.code == 0) {
                        this.$message({
                            message: "出运通知同步成功！",
                            type: "success",
                        });
                        this.query();
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error",
                        });
                    }
                });
            });
        },
        //撤回同步
        unSync(shn_id) {
            this.$confirm("确定要撤回出运通知同步吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                shipApi.un_syncShipNote(shn_id).then((res) => {
                    if (res.code == 0) {
                        this.$message({
                            message: "撤回同步成功！",
                            type: "success",
                        });
                        this.query();
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error",
                        });
                    }
                });
            });
        },
    },
    watch: {
        selectTab: {
            handler(newVal, oldVal) {
                if (newVal) {
                    if (newVal == 2) {
                        this.condition.query_state = 1;
                    }
                    if (newVal == 3) {
                        this.condition.query_state = 2;
                    }
                    if (newVal == 5) {
                        this.condition.query_state = 3;
                    }
                    if (newVal == 8) {
                        this.condition.query_state = 4;
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