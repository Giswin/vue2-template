<template>
    <div>
        <div class="settle-nav">
            <el-divider>
                <span :class="{ show: selectTaber == 0 }" @click="selectTaber = 0">基本信息</span>
                <el-divider direction="vertical"></el-divider>
                <span :class="{ show: selectTaber == 1 }" @click="selectTaber = 1">订单信息</span>
                <el-divider direction="vertical"></el-divider>
                <span :class="{ show: selectTaber == 2 }" @click="selectTaber = 2">成本信息</span>
                <el-divider direction="vertical"></el-divider>
                <span :class="{ show: selectTaber == 3 }" @click="selectTaber = 3">费用信息</span>
            </el-divider>
        </div>

        <div class="budget-main">
            <div class="budget-basic" v-show="selectTaber==0">
                <div class="class-title">
                    <div class="title">基本信息</div>
                </div>
                <div>
                    <el-row>
                        <el-col :span="12">
                            <div class="basic-left">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                                    <tbody>
                                        <tr>
                                            <th width="80">项目号</th>
                                            <td colspan="3">{{base_info.ode_project_code_ebs}}</td>
                                        </tr>
                                        <tr>
                                            <th>业务组</th>
                                            <td width="160">{{base_info.ode_dep_name_ebs}}</td>
                                            <th width="80">业务员</th>
                                            <td>{{base_info.ode_sales_name}}</td>
                                        </tr>
                                        <tr>
                                            <th>业务类型</th>
                                            <td colspan="3">{{base_info.ode_bus_type}}</td>
                                        </tr>
                                        <tr>
                                            <th>接单抬头</th>
                                            <td colspan="3">{{base_info.ode_od_title_name}}</td>
                                        </tr>
                                        <tr>
                                            <th>接单日期</th>
                                            <td colspan="3">
                                                {{ode_od_date}}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>项目客户</th>
                                            <td colspan="3">{{base_info.ode_cus_name}}</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="basic-right">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                                    <tbody>
                                        <tr>
                                            <th width="80">价格条款</th>
                                            <td colspan="3">{{base_info.ode_price_clause}}</td>
                                        </tr>
                                        <tr>
                                            <th>结算方式</th>
                                            <td>{{base_info.ode_collect_mode}}</td>
                                            <th width="80">天数</th>
                                            <td>{{base_info.ode_collect_days}}</td>
                                        </tr>
                                        <tr>
                                            <th>订单数量</th>
                                            <td colspan="3">{{$general.transform(base_info.ode_qty_sales_ebs||0)}}</td>
                                        </tr>
                                        <tr>
                                            <th>订单金额</th>
                                            <td colspan="3">{{$general.transform(base_info.ode_amount_sales || 0)}}</td>
                                        </tr>
                                        <tr>
                                            <th>出运方式</th>
                                            <td>{{ode_ship_mode}}</td>

                                            <th width="80">交货日期</th>
                                            <td>{{ode_delivery_date_ebs}}</td>

                                        </tr>

                                        <tr>
                                            <th>项目备注</th>
                                            <td colspan="3">{{base_info.ode_memo}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>

            <div class="budget-order" v-show="selectTaber==1">
                <div class="class-title">
                    <div class="title">订单信息</div>
                </div>
                <div class="order-table">
                    <vxe-table border resizable ref="orderTable" :data="orderList" show-overflow show-footer highlight-current-row highlight-hover-row size="small" class="mytable-scrollbar" max-height="100%" auto-resize :column-config="{minWidth:100}" :footer-method="footerMethod1" :footer-row-class-name="footerRowClassName">
                        <vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
                        <!-- <vxe-table-column field="oded_stock_org_name_ebs" title="库存组织" width="140" align="left" header-align="center"></vxe-table-column> -->
                        <vxe-table-column field="oded_style_no_ebs" title="货号" width="120" align="left" header-align="center"></vxe-table-column>
                        <vxe-table-column field="oded_item_name_ebs" title="商品名称" width="120" align="left" header-align="center"></vxe-table-column>
                        <vxe-table-column field="oded_item_description_ebs" title="商品描述" width="120" align="left" header-align="center"></vxe-table-column>
                        <!-- <vxe-table-column field="oded_specs_ebs" title="规格" align="left" header-align="center"></vxe-table-column> -->
                        <vxe-table-column field="oded_qty_ebs" title="数量" width="120" align="right" header-align="center" :formatter="formatterNum2">
                            <!-- <template v-slot="{row}">{{$general.transform(row.oded_qty_ebs || 0,0)}}</template> -->
                        </vxe-table-column>
                        <vxe-table-column field="oded_unit" title="单位" width="90" align="left" header-align="center"></vxe-table-column>
                        <vxe-table-column field="oded_currency_ebs" title="币种" width="90" align="left" header-align="center"></vxe-table-column>
                        <vxe-table-column field="oded_price_ebs" title="单价" width="120" align="right" header-align="center"></vxe-table-column>
                        <vxe-table-column field="oded_amount_ebs" title="金额小计" align="right" header-align="center" :formatter="formatterNum">
                            <!-- <template v-slot="{row}">{{$general.transform(row.oded_amount_ebs || 0)}}</template> -->
                        </vxe-table-column>

                    </vxe-table>
                </div>
            </div>

            <div class="budget-cost" v-show="selectTaber==2">
                <div class="class-title">
                    <div class="title">成本信息</div>
                </div>
                <div class="cost-table">
                    <vxe-table border resizable ref="costTable" :data="costList" show-overflow show-footer highlight-current-row highlight-hover-row size="small" class="mytable-scrollbar" height="100%" auto-resize :column-config="{minWidth:100}" :footer-method="footerMethod2" :footer-row-class-name="footerRowClassName2">
                        <vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
                        <!-- <vxe-table-column field="oded_stock_org_name_ebs" title="库存组织" width="140" align="left" header-align="center"></vxe-table-column> -->
                        <vxe-table-column field="oded_style_no_ebs" title="货号" width="120" align="left" header-align="center"></vxe-table-column>
                        <vxe-table-column field="oded_item_name_ebs" title="商品名称" width="120" align="left" header-align="center"></vxe-table-column>
                        <vxe-table-column field="oded_item_description_ebs" title="商品描述" width="120" align="left" header-align="center"></vxe-table-column>
                        <!-- <vxe-table-column field="oded_specs_ebs" title="规格" align="left" header-align="center"></vxe-table-column> -->

                        <vxe-table-column field="oded_qty_ebs" title="数量" width="100" align="right" header-align="center" :formatter="formatterNum2">
                            <!-- <template v-slot="{row}">{{$general.transform(row.oded_qty_ebs || 0,0)}}</template> -->
                        </vxe-table-column>
                        <vxe-table-column field="oded_unit" title="单位" width="70" align="left" header-align="center"></vxe-table-column>
                        <vxe-table-column field="oded_currency_ebs" title="币种" width="80" align="left" header-align="center"></vxe-table-column>
                        <vxe-table-column field="oded_price_ebs" title="单价" width="100" align="right" header-align="center"></vxe-table-column>
                        <vxe-table-column field="oded_amount_ebs" title="金额" align="right" header-align="center" :formatter="formatterNum">
                            <!-- <template v-slot="{row}">{{$general.transform(row.oded_amount_ebs || 0)}}</template> -->
                        </vxe-table-column>
                        <vxe-table-column field="oded_ex_rate_ebs" title="汇率" width="60" header-align="center" align="right"></vxe-table-column>
                        <vxe-table-column field="oded_tax_rebate_rate_ebs" title="退税率" width="80" align="right" header-align="center">

                        </vxe-table-column>

                    </vxe-table>
                </div>
            </div>

            <div class="budget-fee" v-show="selectTaber==3">
                <div class="class-title">
                    <div class="title">费用信息</div>
                </div>
                <div class="fee-table">
                    <vxe-table border resizable ref="feeTable" :data="feeList" show-overflow show-footer highlight-current-row highlight-hover-row size="small" class="mytable-scrollbar" height="100%" auto-resize :footer-method="footerMethod3" :footer-row-class-name="footerRowClassName3">
                        <vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
                        <vxe-table-column field="odef_fee_type_code_ebs" title="费用代码" align="left" header-align="center" width="240"></vxe-table-column>
                        <vxe-table-column field="odef_name" title="费用名称" align="left" header-align="center"></vxe-table-column>
                        <vxe-table-column field="odef_currency_ebs" title="币种" align="left" header-align="center"></vxe-table-column>
                        <vxe-table-column field="odef_ex_rate_ebs" title="汇率" align="right" header-align="center"></vxe-table-column>
                        <vxe-table-column field="odef_amount_ebs" title="金额" align="right" header-align="center" :formatter="formatterNum"></vxe-table-column>
                    </vxe-table>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import projectApi from "@/api/cbs/project.js";

export default {
    props: {
        ode_id: {
            type: String || Number,
        },
        budgetInfo: {
            type: Object,
        },
        transMethods: {
            type: Array,
        },
    },
    data() {
        return {
            selectTaber: 0,
            // 基本信息
            base_info: {
                // 项目号
                // 业务组
                // 业务员
                // 业务类型
                // 接单抬头
                // 创建日期
                // 项目客户
                // 价格条款
                // 结算方式
                // 天数
                // 订单数量
                // 订单金额
                // 出运方式
                // 交货日期
                // 项目备注
            },
            ode_od_date: "", //接单日期
            ode_delivery_date_ebs: "", //交货日期
            ode_ship_mode: "", //出运方式
            // 订单信息
            orderList: [],
            orderObj: {},
            cnyAllCount: 0,
            // 成本信息
            costList: [],
            costObj: {},
            cnyAllCount2: 0,
            // 费用信息
            feeList: [],
            feeObj: {},
            cnyAllCount3: 0,
        };
    },
    created() {
        console.log("预算信息", this.budgetInfo);
        this.getInfo();
    },
    methods: {
        formatterNum({ cellValue }) {
            return this.$XEUtils.commafy(this.$XEUtils.toNumber(cellValue), {
                digits: 2,
            });
        },
        formatterNum2({ cellValue }) {
            return this.$XEUtils.commafy(this.$XEUtils.toNumber(cellValue), {
                digits: 0,
            });
        },
        //   获取预算信息
        getInfo() {
            this.base_info = this.budgetInfo.baseInfo;

            this.ode_od_date = this.base_info.ode_od_date;
            this.ode_delivery_date_ebs = this.base_info.ode_delivery_date_ebs;
            if (this.ode_od_date) {
                this.ode_od_date = this.ode_od_date.slice(0, 10);
            }
            if (this.ode_delivery_date_ebs) {
                this.ode_delivery_date_ebs = this.ode_delivery_date_ebs.slice(
                    0,
                    10
                );
            }

            this.transMethods.forEach((item) => {
                if (item.lookup_code == this.base_info.ode_ship_mode_code_ebs) {
                    this.ode_ship_mode = item.displayed_field;
                }
            });

            this.orderList = this.budgetInfo.orderInfo;
            let orderObj = {};
            this.orderList.forEach((item) => {
                let count = 0;
                count =
                    Number(item.oded_ex_rate_ebs) *
                    Number(item.oded_amount_ebs);

                // this.$set(item, "amount_cny", count);
                this.cnyAllCount += count;
                if (!orderObj[item.oded_currency_ebs]) {
                    this.$set(orderObj, item.oded_currency_ebs, 0);
                }
            });

            this.orderObj = orderObj;
            this.orderList.forEach((item) => {
                for (let key in this.orderObj) {
                    if (item.oded_currency_ebs == key) {
                        this.orderObj[key] += Number(item.oded_amount_ebs);
                    }
                }
            });
            this.orderObj["折CNY总计"] = this.cnyAllCount;
            console.log("OOOO", this.orderObj);

            this.costList = this.budgetInfo.costInfo;

            let costObj = {};
            this.costList.forEach((item) => {
                let count = 0;
                count =
                    Number(item.oded_ex_rate_ebs) *
                    Number(item.oded_amount_ebs);

                // this.$set(item, "amount_cny", count);
                this.cnyAllCount2 += count;
                if (!costObj[item.oded_currency_ebs]) {
                    this.$set(costObj, item.oded_currency_ebs, 0);
                }
            });

            this.costObj = costObj;
            this.costList.forEach((item) => {
                for (let key in this.costObj) {
                    if (item.oded_currency_ebs == key) {
                        this.costObj[key] += Number(item.oded_amount_ebs);
                    }
                }
            });
            this.costObj["折CNY总计"] = this.cnyAllCount2;
            console.log("OOOO", this.costObj);

            this.feeList = this.budgetInfo.feeInfo;
            let feeObj = {};
            this.feeList.forEach((item) => {
                let count = 0;
                count =
                    Number(item.odef_ex_rate_ebs) *
                    Number(item.odef_amount_ebs);

                // this.$set(item, "amount_cny", count);
                this.cnyAllCount3 += count;
                if (!feeObj[item.odef_currency_ebs]) {
                    this.$set(feeObj, item.odef_currency_ebs, 0);
                }
            });

            this.feeObj = feeObj;
            this.feeList.forEach((item) => {
                for (let key in this.feeObj) {
                    if (item.odef_currency_ebs == key) {
                        this.feeObj[key] += Number(item.odef_amount_ebs);
                    }
                }
            });
            this.feeObj["折CNY总计"] = this.cnyAllCount3;
            console.log("OOOO", this.feeObj);
        },
        // 订单信息

        footerRowClassName({ $rowIndex }) {
            return "footer-style";
        },
        footerMethod1({ columns, data }) {
            let countArr = [];

            for (let key in this.orderObj) {
                countArr.push(
                    columns.map((column, columnIndex) => {
                        if (["oded_currency_ebs"].includes(column.property)) {
                            return key;
                        }
                        if (["oded_amount_ebs"].includes(column.property)) {
                            return this.$general.transform(
                                this.orderObj[key] || 0
                            );
                        }
                        return null;
                    })
                );
            }

            return countArr;
        },

        // 成本信息
        footerRowClassName2({ $rowIndex }) {
            return "footer-style2";
        },
        footerMethod2({ columns, data }) {
            let countArr = [];

            for (let key in this.costObj) {
                countArr.push(
                    columns.map((column, columnIndex) => {
                        if (["oded_currency_ebs"].includes(column.property)) {
                            return key;
                        }
                        if (["oded_amount_ebs"].includes(column.property)) {
                            return this.$general.transform(
                                this.costObj[key] || 0
                            );
                        }
                        return null;
                    })
                );
            }

            return countArr;
        },
        // 费用信息
        footerRowClassName3({ $rowIndex }) {
            return "footer-style3";
        },
        footerMethod3({ columns, data }) {
            let countArr = [];

            for (let key in this.feeObj) {
                countArr.push(
                    columns.map((column, columnIndex) => {
                        if (["odef_currency_ebs"].includes(column.property)) {
                            return key;
                        }
                        if (["odef_amount_ebs"].includes(column.property)) {
                            return this.$general.transform(
                                this.feeObj[key] || 0
                            );
                        }
                        return null;
                    })
                );
            }

            return countArr;
        },
    },
};
</script>

<style lang="scss" scoped>
.budget-basic {
    .basic-left {
        padding-right: 8px;
    }

    .basic-right {
        padding-left: 8px;
    }
}

.budget-order {
    height: 400px;
    .order-table {
        height: 100%;
    }
}
.budget-cost {
    height: 400px;
    .cost-table {
        height: 100%;
    }
}

.budget-fee {
    height: 483px;
    width: 100%;
    .fee-table {
        height: 100%;
        width: 100%;
    }
}

>>> .footer-style,
>>> .footer-style2,
>>> .footer-style3 {
    background-color: #f6ffcc;
}
</style>