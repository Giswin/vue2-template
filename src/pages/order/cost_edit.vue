<template>
    <div class="wrap">
        <vxe-modal ref="model2" v-model="show" width="1100" resize height="650" show-footer destroy-on-close>
            <template v-slot:header>
                成本信息编辑
                <div class="model-r">
                    <div class="model-screen">
                        <i class="fa fa-window-maximize" v-show="downIcon" @click="screen"></i>
                        <i class="fa fa-window-restore" v-show="!downIcon" @click="screen"></i>
                    </div>
                    <div class="model-close">
                        <i class="fa fa-times" @click="closeModel"></i>
                    </div>
                </div>
            </template>

            <div class="class-title">
                <div class="title">成本信息</div>
                <div class="class-r btns">
                    <el-button size="mini" @click="addRow">增行</el-button>
                    <el-button size="mini" @click="delRow">删行</el-button>
                </div>
            </div>

            <div class="cost-table">
                <vxe-table border resizable row-key ref="costTable" :data="costList" show-overflow show-footer size="small" class="mytable-scrollbar" max-height="100%" auto-resize :column-config="{minWidth:100}" :scroll-y="{enabled: false}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod}" :edit-config="{trigger: 'click', mode: 'cell'}" :mouse-config="{selected: true}" :footer-method="footerMethod" :footer-row-class-name="footerRowClassName2" @edit-actived="editActivedEvent">
                    <vxe-table-column width="40" align="center">
                        <template #default>
                            <span class="drag-btn2">
                                <i class="vxe-icon--menu"></i>
                            </span>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                    <vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
                    <vxe-table-column field="order_goods_bom_class" title="商品类别" width="110" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template #header>
                            <span>商品类别</span><span class="requireStar">*</span>
                        </template>
                        <template #edit="{row}">
                            <el-select v-model="row.order_goods_bom_class" size="small" clearable @change="changeBomCategory(row)">
                                <el-option v-for="item in costOptions.category" :key="item.dic_code" :value="item.dic_name" :label="item.dic_name"></el-option>
                            </el-select>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_bom_type_name" title="备货类型" width="110" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template #header>
                            <span>备货类型</span><span class="requireStar">*</span>
                        </template>
                        <template #edit="{row}">
                            <el-select v-model="row.order_goods_bom_type_name" size="small" clearable @change="changeBomType(row)">
                                <el-option v-for="item in costOptions.prepareType" :key="item.value" :value="item.label" :label="item.label"></el-option>
                            </el-select>
                        </template>
                    </vxe-table-column>
                    <!-- <vxe-table-column field="order_goods_bom_article_number" title="采购货号" width="110" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template #edit="{row}">
                            <el-select v-model="row.order_goods_bom_article_number" size="small" filterable clearable>
                                <el-option v-for="item in articleNumOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                            </el-select>
                            <el-input size="small" v-model="row.order_goods_bom_article_number" clearable></el-input>
                        </template>
                    </vxe-table-column> -->
                    <vxe-table-column field="order_goods_bom_name" title="中文品名" width="110" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template #edit="{row}">
                            <el-input size="small" v-model="row.order_goods_bom_name" clearable></el-input>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_bom_name_en" title="英文品名" width="110" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template #edit="{row}">
                            <el-input size="small" v-model="row.order_goods_bom_name_en" clearable></el-input>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_bom_ebs_name" title="EBS商品" width="110" align="left" header-align="center">
                        <template #header>
                            <span>EBS商品</span><span class="requireStar">*</span>
                        </template>
                        <template v-slot="{row}">
                            <el-select v-model="row.order_goods_bom_ebs_id" ref="selectLabel" placeholder="请选择" clearable filterable @change="changeEBSGoods(row)" size="small">
                                <el-option v-for="item in ebsGoods" :key="item.inventory_item_id" :value="item.inventory_item_id" :label="item.description">
                                    <span style="float: left">{{ item.description+'|'+item.segment1 }}</span>
                                    <span style="float: right; color: #8492a6;">{{ unitObj[item.primary_uom_code]['unit_of_measure_tl'] }}</span>
                                    <!-- <span style="float: right; color: #8492a6;" v-if="ebs_path=='HS'">{{ unitHS[item.primary_uom_code]['ebs_data'] }}</span> -->
                                    <!-- <span style="float: right; color: #8492a6;" v-if="ebs_path=='HK'">{{ unitHK[item.primary_uom_code]['ebs_data_hk'] }}</span> -->
                                </el-option>

                            </el-select>
                        </template>
                    </vxe-table-column>

                    <vxe-table-column field="order_goods_bom_spec" title="规格" width="110" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template #edit="{row}">
                            <el-input size="small" v-model="row.order_goods_bom_spec" clearable></el-input>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_bom_quota_qty" title="单耗" width="80" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template #edit="{row}">
                            <el-input size="small" v-model="row.order_goods_bom_quota_qty" clearable @change="changeQuto(row)"></el-input>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_bom_qty" title="数量" width="100" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template #edit="{row}">
                            <el-input size="small" v-model="row.order_goods_bom_qty" clearable :disabled="qtyDisabled"></el-input>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_bom_unit" title="单位" width="70" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template #header>
                            <span>单位</span><span class="requireStar">*</span>
                        </template>
                        <template #edit="{row}">
                            <el-select v-model="row.order_goods_bom_unit" size="small" @change="chengeCostUnit(row)" filterable clearable>
                                <el-option v-for="item in costOptions.JLDW" v-show="item.symbol==row.uom_class || !row.uom_class" :key="item.dictionary_id" :value="item.dic_name" :label="item.dic_name"></el-option>
                            </el-select>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_bom_price" title="单价" width="90" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template #header>
                            <span>单价</span><span class="requireStar">*</span>
                        </template>
                        <template #edit="{row}">
                            <el-input size="small" v-model="row.order_goods_bom_price" clearable></el-input>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_bom_currency" title="币种" width="70" align="center" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template #edit="{row}">
                            <el-select v-model="row.order_goods_bom_currency" placeholder="请选择" size="small" clearable @change="changeBZ(row)">
                                <el-option v-for="item in costOptions.BZ" :key="item.dic_name" :label="item.dic_name" :value="item.dic_name"></el-option>
                            </el-select>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_bom_ex_rate" title="汇率" width="70" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template #edit="{row}">
                            <el-input size="small" v-model="row.order_goods_bom_ex_rate" clearable></el-input>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_bom_amount" title="金额" width="110" align="right" header-align="center">
                        <!-- 计算 采购单价*采购单位 -->
                        <!-- <template #default="{row}">
                            <span>{{countAmount(row)}}</span>
                        </template> -->
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_bom_ven_name" title="供应商" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template #edit="{row}">
                            <el-select v-model="row.order_goods_bom_ven_name" placeholder="请输入关键字选择" size="small" clearable filterable remote :remote-method="remoteMethod" @change="changeVender(row)">
                                <el-option v-for="item in venOptions" :key="item.trader_id" :value="item.trader_name" :label="item.trader_name"></el-option>
                            </el-select>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_bom_vat_rate" title="增值税率" width="70" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template #edit="{row}">
                            <el-input size="small" v-model="row.order_goods_bom_vat_rate" clearable></el-input>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_bom_tax_refund_rate" title="退税率" width="60" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template #edit="{row}">
                            <el-input size="small" v-model="row.order_goods_bom_tax_refund_rate" clearable></el-input>
                        </template>
                    </vxe-table-column>

                </vxe-table>
            </div>

            <template v-slot:footer>
                <div class="m-l">
                </div>
                <div class="m-r">
                    <el-button size="small" @click="costConfirm">确定</el-button>
                    <el-button @click="closeModel" size="small" style="margin-left:15px">取消</el-button>
                </div>
            </template>

        </vxe-modal>
    </div>
</template>

<script>
import Sortable from "sortablejs";
import orderApi from "@/api/cbs/order.js";
import goodsApi from "@/api/cbs/goods.js";

export default {
    props: {
        costOptions: {
            type: Object,
        },
        goodsRow: {
            type: Object,
        },
        exchangeList: {
            type: Object,
        },
        ebsGoods: {
            type: Array,
        },
        unitObj: {
            type: Object,
        },

        ebs_path: {
            type: String,
        },
    },
    data() {
        return {
            downIcon: true,
            show: true,
            costList: [],
            venOptions: [],
            articleNumOptions: [],
            allCost: 0,
            required: {
                order_goods_bom_class: "商品类别",
                order_goods_bom_type: "备货类型",
                order_goods_bom_ebs_name: "ebs商品",
                order_goods_bom_unit: "单位",
                order_goods_bom_price: "单价",
            },

            qtyDisabled: true,
        };
    },
    created() {
        this.getCostList2();
        console.log(
            "🚀 ~ file: cost_edit.vue:225 ~ created ~ this.costOptions",
            this.costOptions
        );
        console.log("汇率列表", this.exchangeList);
        // 当新建时
        // 1、没有BOM  直接 costList=bomInfo赋值
        // 2、有BOM 要在成本编辑页面创建这些BOM 要取options*

        // 当编辑时 无论哪种都要直接 costList=bomInfo赋值
        // 1、没有BOM
        // 2、有BOM 要取options*
    },
    mounted() {
        this.rowDrop();
    },
    methods: {
        closeModel() {
            this.show = false;
            this.$emit("closeCostEdit");
        },
        screen() {
            this.$refs.model2.zoom();
            this.downIcon = !this.downIcon;
        },

        getCostList2() {
            // 无论有没有BOM第一条BOM信息总是有的
            if (this.goodsRow.bomInfo.length > 0) {
                this.handleBomInfo();
            }
        },

        getCostList() {
            goodsApi
                .getByArticleNum(this.goodsRow.order_goods_article_number)
                .then((res) => {
                    let bomInfo = res.data.bomInfo;

                    console.log("bomInfo", bomInfo);

                    // 当商品有BOM的时候，成本价在这里做，传过来的row.bomInfo=[]

                    if (bomInfo.length > 0) {
                        bomInfo.forEach((item) => {
                            let num = item.goods_article_number;
                            let obj = {
                                value: "",
                                label: "",
                            };
                            obj.value = num;
                            obj.label = num;

                            this.articleNumOptions.push(obj);

                            if (this.goodsRow.bomInfo.length == 0) {
                                let costObj = {
                                    order_goods_bom_type: "", //备货类型
                                    order_goods_bom_type_name: "", //备货类型标签名
                                    order_goods_bom_article_number: "", //采购货号
                                    order_goods_bom_name: "", //中文品名
                                    order_goods_bom_name_en: "", //英文品名
                                    order_goods_bom_spec: "", //采购规格
                                    order_goods_bom_quota_qty: "", //单耗
                                    order_goods_bom_qty: "", //采购数量
                                    order_goods_bom_unit: "", //采购单位
                                    order_goods_bom_unit_code: "", //采购单位编码
                                    order_goods_bom_price: "", //采购单价
                                    order_goods_bom_currency: "CNY", //采购币种
                                    order_goods_bom_ex_rate: 1, //采购汇率
                                    order_goods_bom_amount: "", //采购金额
                                    order_goods_bom_vat_rate: "", //增值税率
                                    order_goods_bom_tax_refund_rate: "", //退税率
                                    order_goods_bom_ven_name: "", //供应商名称
                                    order_goods_bom_ven_id: "", //供应商ID
                                    order_goods_bom_class: "", //商品类别
                                    order_goods_bom_ebs_id: null, //ebs商品ID
                                    order_goods_bom_ebs_name: "", //ebs商品名称
                                    uom_class: "", //ebs商品类别
                                };

                                costObj.order_goods_bom_type =
                                    item.goods_bom_type;
                                this.costOptions.prepareType.forEach((data) => {
                                    if (data.value == item.goods_bom_type) {
                                        costObj.order_goods_bom_type_name =
                                            data.label;
                                    }
                                });

                                costObj.order_goods_bom_article_number =
                                    item.goods_article_number;
                                costObj.order_goods_bom_name = item.goods_name;
                                costObj.order_goods_bom_name_en =
                                    item.goods_name_en;

                                costObj.order_goods_bom_spec =
                                    item.goods_purchase_spec;
                                costObj.order_goods_bom_quota_qty =
                                    item.goods_quota_qty;
                                costObj.order_goods_bom_unit =
                                    item.goods_purchase_unit;
                                costObj.order_goods_bom_unit_code =
                                    item.goods_purchase_unit_code;
                                costObj.order_goods_bom_vat_rate =
                                    this.costOptions.vatRate;
                                costObj.order_goods_bom_tax_refund_rate =
                                    this.costOptions.refundRate;
                                costObj.order_goods_bom_ven_name =
                                    item.goods_ven_name;
                                costObj.order_goods_bom_ven_id =
                                    item.goods_ven_id;

                                costObj.order_goods_bom_qty =
                                    Number(this.goodsRow.order_goods_qty) *
                                    Number(costObj.order_goods_bom_quota_qty);

                                this.costList.push(costObj);
                            }
                        });
                    }

                    // 1、商品没有BOM  此时在edit页面做好了bomInfo数组length=1,直接填在这里
                    // 2、当不是新建，是编辑的时候，大家都有row.bomInfo,直接填在这里
                    if (this.goodsRow.bomInfo.length > 0) {
                        this.handleBomInfo();
                    }
                });
        },
        handleBomInfo() {
            this.costList = this.goodsRow.bomInfo;
            this.costList.forEach((item) => {
                this.$set(item, "order_goods_bom_type_name", "");
                this.costOptions.prepareType.forEach((type) => {
                    if (item.order_goods_bom_type == type.value) {
                        item.order_goods_bom_type_name = type.label;
                    }
                });
                this.$set(item, "uom_class", "");
                this.ebsGoods.forEach((data) => {
                    if (data.inventory_item_id == item.order_goods_bom_ebs_id) {
                        item.uom_class = data.uom_class;
                    }
                });
            });
        },

        addRow() {
            let obj = {
                order_goods_bom_type: "01", //备货类型
                order_goods_bom_type_name: "境内采购", //备货类型标签名
                order_goods_bom_article_number: "", //采购货号
                order_goods_bom_name: "", //中文品名
                order_goods_bom_name_en: "", //英文品名
                order_goods_bom_spec: "", //采购规格
                order_goods_bom_quota_qty: 1, //定额数量
                order_goods_bom_qty: "", //采购数量
                order_goods_bom_unit: "", //采购单位
                order_goods_bom_unit_code: "", //采购单位编码
                order_goods_bom_price: "", //采购单价
                order_goods_bom_currency: "CNY", //采购币种
                order_goods_bom_ex_rate: 1, //采购汇率
                order_goods_bom_amount: "", //采购金额
                order_goods_bom_vat_rate: this.costOptions.vatRate, //增值税率
                order_goods_bom_tax_refund_rate: this.costOptions.refundRate, //退税率
                order_goods_bom_ven_name: "", //供应商名称
                order_goods_bom_ven_id: "", //供应商ID
                order_goods_bom_class: "", //商品类别
                order_goods_bom_ebs_id: null, //ebs商品ID
                order_goods_bom_ebs_name: "", //ebs商品名称
                uom_class: "", //ebs商品类别
            };
            this.changeQuto(obj);
            this.costList.push(obj);
        },
        delRow() {
            if (this.costList.length > 0) {
                const table = this.$refs.costTable;
                const selectRecords = table.getCheckboxRecords();
                console.log("sel", selectRecords);
                let len1 = this.costList.length;
                let len2 = selectRecords.length;
                let remains = len1 - len2;
                if (remains < 1) {
                    this.$message({
                        message: "至少保留一行成本信息！",
                        type: "warning",
                    });
                    return;
                }
                if (selectRecords.length > 0) {
                    this.$confirm("确定要删除成本信息?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                        .then(() => {
                            this.$refs.costTable.removeCheckboxRow();
                            selectRecords.forEach((data) => {
                                this.costList = this.costList.filter((item) => {
                                    return item !== data;
                                });
                            });
                            console.log("删除后的costList", this.costList);
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                        })
                        .catch(() => {
                            this.$message({
                                type: "info",
                                message: "已取消删除",
                            });
                        });
                } else {
                    this.$message({
                        type: "warning",
                        message: "请勾选要删除的行！",
                    });
                }
            }
        },
        rowDrop() {
            this.$nextTick(() => {
                const xTable = this.$refs.costTable;
                this.sortable1 = Sortable.create(
                    xTable.$el.querySelector(
                        ".body--wrapper>.vxe-table--body tbody"
                    ),
                    {
                        handle: ".drag-btn2",
                        onEnd: ({ newIndex, oldIndex }) => {
                            const currRow = this.costList.splice(
                                oldIndex,
                                1
                            )[0];
                            this.costList.splice(newIndex, 0, currRow);
                        },
                    }
                );
            });
        },

        editMethod({ row, column }) {
            const $table = this.$refs.costTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        editActivedEvent({ rowIndex, row }) {
            if (Number(row.order_goods_bom_quota_qty) == 0) {
                this.qtyDisabled = false;
            } else {
                this.qtyDisabled = true;
            }
        },
        // 在值发生改变时更新表尾合计
        updateFooterEvent() {
            const $table = this.$refs.costTable;
            $table.updateFooter();
        },

        footerRowClassName2({ $rowIndex }) {
            if ($rowIndex == 0) {
                return "cost-footer";
            }
        },
        footerMethod({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex === 3) {
                        return "合计";
                    }
                    if (["order_goods_bom_qty"].includes(column.property)) {
                        return this.sumNum(data, column.property);
                    } else if (
                        ["order_goods_bom_amount"].includes(column.property)
                    ) {
                        return this.countAllamount(data);
                    }
                    return null;
                }),
            ];
        },
        sumNum(list, field) {
            let count = 0;
            list.forEach((item) => {
                count += Number(item[field]);
            });
            return this.$general.toDecimal2(count);
        },
        countAmount(row) {
            let count = 0;
            count =
                Number(row.order_goods_bom_qty) *
                Number(row.order_goods_bom_price);
            row.order_goods_bom_amount = this.$general.toDecimal2(count);
            return count;
        },
        countAllamount(data) {
            let count = 0;
            data.forEach((item) => {
                count += Number(this.countAmount(item));
            });
            this.allCost = count;
            return this.$general.toDecimal2(count);
        },
        chengeCostUnit(row) {
            this.costOptions.JLDW.forEach((data) => {
                if (data.dic_name == row.order_goods_bom_unit) {
                    row.order_goods_bom_unit_code = data.dic_code;
                }
            });
        },
        // 改变bom采购定额的数量，采购总数量也要跟着变 采购数量=销售数量*采购定额数量
        changeQuto(row) {
            if (Number(row.order_goods_bom_quota_qty) !== 0) {
                row.order_goods_bom_qty =
                    Number(this.goodsRow.order_goods_qty) *
                    Number(row.order_goods_bom_quota_qty);
            }
        },
        changeBZ(row) {
            row.order_goods_bom_ex_rate =
                this.exchangeList[row.order_goods_bom_currency];
        },
        changeBomCategory(row) {
            let category = ["成品加工", "面料加工", "辅料加工"];
            if (category.includes(row.order_goods_bom_class)) {
                row.order_goods_bom_type_name = "境内加工生产";
                row.order_goods_bom_type = "31";
            }
        },

        changeEBSGoods(row) {
            this.ebsGoods.forEach((item) => {
                if (item.inventory_item_id == row.order_goods_bom_ebs_id) {
                    row.order_goods_bom_ebs_name = item.description;
                    row.uom_class = item.uom_class;

                    this.costOptions.JLDW.forEach((data) => {
                        if (this.ebs_path == "HS") {
                            if (item.primary_uom_code == data.ebs_code) {
                                row.order_goods_bom_unit = data.dic_name;
                                row.order_goods_bom_unit_code = data.dic_code;
                            }
                        }
                        if (this.ebs_path == "HK") {
                            if (item.primary_uom_code == data.ebs_code_hk) {
                                row.order_goods_bom_unit = data.dic_name;
                                row.order_goods_bom_unit_code = data.dic_code;
                            }
                        }
                    });
                }
            });
        },

        remoteMethod(query) {
            if (query !== "") {
                this.venOptions = this.costOptions.vender.filter((item) => {
                    return (
                        item.trader_name
                            .toLowerCase()
                            .indexOf(query.toLowerCase()) > -1
                    );
                });
            } else {
                this.venOptions = [];
            }
        },
        changeBomType(row) {
            this.costOptions.prepareType.forEach((data) => {
                if (data.label == row.order_goods_bom_type_name) {
                    row.order_goods_bom_type = data.value;
                }
            });
        },
        changeVender(row) {
            this.costOptions.vender.forEach((data) => {
                if (data.trader_name == row.order_goods_bom_ven_name) {
                    row.order_goods_bom_ven_id = data.trader_id;
                }
            });
        },
        costConfirm() {
            for (let i = 0; i < this.costList.length; i++) {
                let num = i + 1;
                for (let key in this.required) {
                    if (!this.costList[i][key]) {
                        this.$message({
                            message:
                                "请填写第" +
                                num +
                                "行的" +
                                `${this.required[key]}` +
                                "!",
                            type: "error",
                        });
                        return;
                    }
                }
            }

            let payload = {
                cost: this.allCost,
                bomInfo: this.costList,
            };

            this.$emit("confirmCost", payload);
            this.$emit("closeCostEdit");
        },
    },
    watch: {},
};
</script>

<style lang="scss" scoped>
.class-title {
    margin-top: 15px;
    .btns {
        margin-top: 5px;
    }
}
.cost-table {
    margin-top: 25px;
    height: 70%;
}
>>> .cost-footer {
    font-weight: 600;
}
.requireStar {
    color: red;
    margin-left: 5px;
    font-size: 16px;
}
</style>