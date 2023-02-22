<template>
    <div class="wrap">
        <vxe-modal ref="model1" v-model="show" width="1100" resize height="650" show-footer destroy-on-close>

            <template v-slot:header>
                <div>出运明细新增</div>

                <div class="model-r">
                    <div class="model-screen">
                        <i class="fa fa-window-maximize" v-show="downIcon" @click="screen"></i>
                        <i class="fa fa-window-restore" v-show="!downIcon" @click="screen"></i>
                    </div>
                    <div class="model-close">
                        <i class="fa fa-times" @click="closeIcon"></i>
                    </div>
                </div>
            </template>
            <div class="main-content">
                <div class="filter-wrap">
                    <div class="tags">
                        <div class="m-l" style="margin-right:5px">筛选条件:</div>
                        <div class="m-l tag-item">
                            <el-tag size="small" class="tag-dep">
                                {{depTag.title}}: <span style="color: blue;">{{depTag.label}}</span>
                            </el-tag>
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

                <div class="table">
                    <vxe-toolbar custom ref="xToolbar1"></vxe-toolbar>

                    <vxe-table border :data="dataList1" ref="addTable" resizable size="small" auto-resize max-height="100%" :column-config="{minWidth:140}" class="mytable-scrollbar" show-overflow highlight-current-row :scroll-y="{oSize: 30,scrollToTopOnChange:true}" :sort-config="{ remote: true, trigger: 'cell' }" @sort-change="sortChange" highlight-hover-row>
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
            <template v-slot:footer>
                <div class="m-l">
                </div>
                <div class="m-r">
                    <el-button size="small" @click="detailAddSave">保存</el-button>
                    <el-button @click="closeIcon" size="small" style="margin-left:15px">取消</el-button>
                </div>
            </template>
        </vxe-modal>
    </div>
</template>

<script>
import shipApi from "@/api/cbs/ship.js";

export default {
    props: {
        selectOptions: {
            type: Object,
        },
        depTag: {
            type: Object,
        },
        filterObj: {
            type: Object,
        },
        shipInfo: {
            type: Object,
        },
    },
    data() {
        return {
            show: true,
            downIcon: true,
            formTags: [],
            dataList1: [],
            view_type: 2,
            condition: {
                columns: [],
                orderBy: "",
            },
            formConditions: {
                order_title_id: {
                    type: "select",
                    field: "order_title_id",
                    title: "接单抬头",
                    value: this.filterObj.title,
                    options: {
                        config: {
                            label: "title", // 下拉选项显示字段
                            value: "title_id", // 下拉选择值字段
                            multiple: false, // 是否为多选
                        },
                        data: this.selectOptions.allTitle, // 下拉数据集
                    },
                },
                order_cus_name: {
                    type: "select",
                    field: "order_cus_name",
                    title: "客户",
                    value: this.filterObj.cus,
                    options: {
                        config: {
                            label: "trader_name", // 下拉选项显示字段
                            value: "trader_name", // 下拉选择值字段
                            multiple: false, // 是否为多选
                        },
                        data: this.selectOptions.allCus, // 下拉数据集
                    },
                },
                order_business_type: {
                    type: "select",
                    field: "order_business_type",
                    title: "业务类型",
                    value: this.filterObj.busType,
                    options: {
                        config: {
                            label: "dic_name",
                            value: "dic_name",
                            multiple: false,
                        },
                        data: this.selectOptions.businessType,
                    },
                },
                order_price_clause: {
                    type: "select",
                    field: "order_price_clause",
                    title: "价格条款",
                    value: this.filterObj.priceClause,
                    options: {
                        config: {
                            label: "dic_name",
                            value: "dic_name",
                            multiple: false,
                        },
                        data: this.selectOptions.JGTK,
                    },
                },
            },
        };
    },
    created() {
        console.log("filterObj", this.filterObj);
        this.firstQuery();
    },
    methods: {
        closeModel() {
            this.show = false;
        },
        closeIcon() {
            this.show = false;
            this.$emit("closeAddIcon");
        },
        screen() {
            this.$refs.model1.zoom();
            this.downIcon = !this.downIcon;
        },
        firstQuery() {
            this.$nextTick(() => {
                this.$refs["filterForm"].submitForm();
                this.query();
            });
        },
        isTag(tagObj) {
            let obj = {
                type: tagObj.type,
                field: tagObj.field,
                value: tagObj.value,
            };
            let flag = false;
            for (let i = 0; i < this.condition.columns.length; i++) {
                if (this.condition.columns[i].field == tagObj.field) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                this.condition.columns.unshift(obj);
            }
        },

        query() {
            // let obj = {
            //     type: this.depTag.type,
            //     field: this.depTag.field,
            //     value: this.depTag.value,
            // };
            // let flag = false;
            // for (let i = 0; i < this.condition.columns.length; i++) {
            //     if (this.condition.columns[i].field == "order_dep_id") {
            //         flag = true;
            //         break;
            //     }
            // }
            // if (!flag) {
            //     this.condition.columns.unshift(obj);
            // }
            let shipStateTag = {
                type: "select",
                field: "order_goods_ship_state",
                value: 1,
            };
            this.isTag(this.depTag);
            this.isTag(shipStateTag);
            // 传condition获取List数据
            shipApi.getToShipList(this.condition, false).then((res) => {
                console.log("出运明细列表", res);
                if (res.code == 0) {
                    this.dataList1 = Object.freeze(res.data.list);
                }
            });
        },
        // 筛选表单确认回调方法
        filterFormConfirm({ consArray }) {
            // 获取已设置的条件项值来刷新筛选表单标签值
            this.formTags = consArray || [];
            // this.formTags.unshift(this.depTag);
            this.showTag();
            console.log("consArray", consArray);
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
        formatAmount({ cellValue }, digits = 0) {
            // 四舍五入金额，每隔3位逗号分隔，默认2位数
            return this.$XEUtils.commafy(this.$XEUtils.toNumber(cellValue), {
                digits,
            });
        },
        // 判断选择的记录是否相同的客户、业务类型、价格条款
        checkIsDiff(selectedRows) {
            let attrs = [
                "order_title_id",
                "order_cus_name",
                "order_business_type",
                "order_price_clause",
                "order_currency",
            ];
            let isDiff = false;
            for (let i = 0; i < selectedRows.length; i++) {
                // 第一行不需要判断
                if (i > 0) {
                    for (let j = 0; j < attrs.length; j++) {
                        // 判断每个要比较的属性，是否和第一行一致
                        if (
                            selectedRows[i][attrs[j]] !=
                            selectedRows[0][attrs[j]]
                        ) {
                            isDiff = true;
                            break;
                        }
                    }
                }
            }
            return isDiff;
        },
        detailAddSave() {
            // 1、判断是否勾选
            let selectedRows = this.$refs.addTable.getCheckboxRecords(true);
            console.log("selectedRows", selectedRows);
            if (selectedRows.length < 1) {
                this.$message({
                    message: "请勾选待通知数据!",
                    type: "warning",
                });
                return;
            }

            // 2、判断勾选的数据是否相同的客户、业务类型、价格条款
            if (this.checkIsDiff(selectedRows)) {
                this.$message({
                    message:
                        " 必须选择相同的接单抬头、客户、业务类型、价格条款、币种！",
                    type: "error",
                });
                return;
            }

            for (let i = 0; i < selectedRows.length; i++) {
                // 不能选择标识已出运的数据来新增出运通知
                if (selectedRows[i]["order_goods_state"] == 2) {
                    this.$message({
                        message: "不允许选择已标识出运的数据来生成出运通知！",
                        type: "error",
                    });

                    return false;
                }
            }

            // 3、出运明细中如果已有数据，要判断选择的数据与已有数据客户、业务类型、价格条款 是否一致
            let firstRow = selectedRows[0];
            if (this.shipInfo.detailInfo.length > 0) {
                if (
                    this.shipInfo.baseInfo.shn_cus_name !=
                        firstRow["order_cus_name"] ||
                    this.shipInfo.baseInfo.shn_business_type !=
                        firstRow["order_business_type"] ||
                    this.shipInfo.baseInfo.shn_price_clause !=
                        firstRow["order_price_clause"] ||
                    this.shipInfo.baseInfo.shn_acc_book_id !=
                        firstRow["order_title_id"]
                ) {
                    this.$message({
                        message:
                            "您选择的数据与当前出运明细中已存在的数据，客户、业务类型、价格条款存在不一致，请先手动删除出运明细",
                        type: "error",
                    });
                    return;
                }
            } else {
                // 如果出运明细为空，则回填接单抬头、客户、业务类型、价格条款
                let infoObj = {
                    cus_name: "",
                    cus_id: null,
                    busType: "",
                    priceClause: "",
                };
                infoObj.cus_name = firstRow["order_cus_name"];
                this.selectOptions.allCus.forEach((item) => {
                    if (item.trader_name == firstRow["order_cus_name"]) {
                        infoObj.cus_id = item.trader_id;
                    }
                });
                infoObj.busType = firstRow["order_business_type"];
                infoObj.priceClause = firstRow["order_price_clause"];
                infoObj.shn_acc_book_id = firstRow["order_title_id"];
                infoObj.shn_acc_book_name = firstRow["order_title_name"];

                this.$emit("changeInfo", infoObj);
            }
            // 将选择的数据返回给父组件回调方法
            this.$emit("closeAdd", selectedRows);
            this.show = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.main-content {
    height: 530px;
    .filter-wrap {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .tags {
            width: 900px;
            .tag-item {
                display: flex;
                .tag-dep {
                    margin-right: 5px;
                }
            }
        }
        .form-button {
        }
    }
    .table {
        margin-top: 15px;
        height: 90%;
    }
}
</style>