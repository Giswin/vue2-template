<template>
    <div>
        <div class="top-wrap">
            <div class="m-l">
                <div class="m-l" style="margin-right: 15px;">币种：{{currency}} </div>
                <div class="clear"></div>
            </div>
            <div class="m-r">
                <el-button size="mini" @click="handleToEdit">编辑</el-button>
            </div>
        </div>
        <div class="detail-table">
            <vxe-table border :data="detailList" size="small" resizable auto-resize :column-config="{ minWidth: 140 }" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row show-footer height="100%" :footer-method="footerMethod" :footer-row-class-name="footerRowClassName">
                <vxe-table-column title="序号" type="seq" width="35" align="center" fixed="left"></vxe-table-column>
                <vxe-table-column field="shnd_article_number" title="货号" header-align="center" min-width="115" fixed="left"></vxe-table-column>
                <vxe-table-column field="shnd_goods_name_en" title="英文品名" header-align="center" min-width="140" fixed="left"></vxe-table-column>

                <vxe-table-column field="shnd_prj_no_ebs" title="项目号" header-align="center" min-width="115"></vxe-table-column>
				 <vxe-table-column field="shnd_po_no" title="订单号" header-align="center" min-width="135"></vxe-table-column>
                <vxe-table-column field="shnd_sc_no_ebs" title="销售合同号" header-align="center" min-width="135"></vxe-table-column>
                <vxe-table-column field="shnd_goods_spec" title="商品规格" header-align="center" min-width="110"></vxe-table-column>

                <vxe-table-column field="shnd_qty_e" title="出运数量" :formatter="formatterNum" header-align="center" align="right" :width="$columns.number.small"></vxe-table-column>
                <vxe-table-column field="shnd_unit" title="单位" header-align="center" align="center" min-width="55"></vxe-table-column>

                <vxe-table-colgroup title="预计出运" header-align="center">
                    <vxe-table-column field="shnd_price_e" title="出运单价" header-align="center" align="right" :width="$columns.number.small"></vxe-table-column>
                    <vxe-table-column field="shnd_amount_e" title="出运金额" :formatter="formatterNum" header-align="center" align="right" :width="$columns.number.medium"></vxe-table-column>
                    <vxe-table-column field="shnd_carton_num_e" title="出运包装数" header-align="center" align="right" :width="$columns.number.small"></vxe-table-column>

                    <vxe-table-column field="shnd_volume_e" title="体积CBM" header-align="center" align="right" :width="$columns.number.small"></vxe-table-column>
                    <vxe-table-column field="shnd_weight_g_e" title="毛重KGS" header-align="center" align="right" :width="$columns.number.small"></vxe-table-column>
                    <vxe-table-column field="shnd_weight_n_e" title="净重KGS" header-align="center" align="right" :width="$columns.number.small"></vxe-table-column>
                </vxe-table-colgroup>
            </vxe-table>
        </div>
        <ship-edit v-if="showEdit" :selectOptions="selectOptions" :shn_id="shn_id" :tabNumber="tabNumber" @closeEdit="closeEdit" @closeIcon="closeIcon"></ship-edit>

    </div>
</template>

<script>
import shipEdit from "../ship_edit.vue";

export default {
    components: {
        shipEdit,
    },

    props: {
        detailList: {
            type: Array,
        },
        currency: {
            type: String,
        },
        selectOptions: {
            type: Object,
        },
        shn_id: {
            type: Number,
        },
    },
    data() {
        return {
            showEdit: false,
            tabNumber: 1,
        };
    },
    methods: {
        // 表格合计行
        footerMethod({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex === 3) {
                        return "合计";
                    }

                    if (column.property == "shnd_amount_e") {
                        return this.$XEUtils.commafy(
                            this.$XEUtils.sum(data, column.property),
                            {
                                digits: 2,
                            }
                        );
                    } else if (column.property == "shnd_qty_e") {
                        return this.$XEUtils.commafy(
                            this.$XEUtils.sum(data, column.property),
                            {
                                digits: 2,
                            }
                        );
                    } else if (column.property == "shnd_carton_num_e") {
                        return this.$XEUtils.commafy(
                            this.$XEUtils.sum(data, column.property),
                            {
                                digits: 0,
                            }
                        );
                    } else if (
                        [
                            "shnd_volume_e",
                            "shnd_weight_g_e",
                            "shnd_weight_n_e",
                        ].indexOf(column.property) > -1
                    ) {
                        return this.$XEUtils.commafy(
                            this.$XEUtils.sum(data, column.property),
                            {
                                digits: 3,
                            }
                        );
                    }

                    return null;
                }),
            ];
        },
        footerRowClassName({ $rowIndex }) {
            return "footer-style";
        },
        formatterNum({ cellValue }) {
            return this.$XEUtils.commafy(this.$XEUtils.toNumber(cellValue), {
                digits: 2,
            });
        },
        handleToEdit() {
            this.tabNumber = 1;
            this.showEdit = true;
        },
        closeIcon() {
            this.showEdit = false;
        },
        closeEdit() {
            // 基本信息和明细列表都要更新
            this.$emit("changeInfo");
            this.showEdit = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.top-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.detail-table {
    position: absolute;
    top: 40px;
    left: 0;
    right: 15px;
    bottom: 10px;
}
>>> .footer-style {
    background-color: #f6ffcc;
}
</style>