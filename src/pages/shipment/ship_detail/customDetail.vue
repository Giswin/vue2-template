<template>
    <div>
        <div class="top-wrap">
            <div class="m-l">
                <div class="m-l" style="margin-right: 15px;">币种：{{currency}} </div>
                <div class="clear"></div>
            </div>

        </div>
        <div class="detail-table">
            <vxe-table border :data="customList" size="small" resizable auto-resize :column-config="{ minWidth: 140 }" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row show-footer height="100%" :footer-method="footerMethod" :footer-row-class-name="footerRowClassName">
                <vxe-table-column title="序号" type="seq" width="35" align="center" fixed="left"></vxe-table-column>
                <vxe-table-column field="shnd_article_number" title="货号" header-align="center" align="left" min-width="115" fixed="left"></vxe-table-column>
                <vxe-table-column field="shnd_goods_name_en" title="英文品名" header-align="center" align="left" min-width="130" fixed="left"></vxe-table-column>
                <vxe-table-column field="shnd_goods_spec" title="商品规格" header-align="center" align="left" min-width="110"></vxe-table-column>
                <vxe-table-column field="shc_code" title="报关单号" header-align="center" align="left" min-width="120"></vxe-table-column>
                <vxe-table-column field="shnd_unit" title="单位" header-align="center" align="center" min-width="55"></vxe-table-column>

                <vxe-table-colgroup title="预计出运" header-align="center">
                    <vxe-table-column field="shnd_qty_e" title="数量" header-align="center" align="right" :formatter="formatterNum" :width="$columns.number.small"></vxe-table-column>
                    <vxe-table-column field="shnd_price_e" title="单价" header-align="center" align="right" :width="$columns.number.small"></vxe-table-column>
                    <vxe-table-column field="shnd_amount_e" title="金额" header-align="center" align="right" :formatter="formatterNum" :width="$columns.number.medium"></vxe-table-column>
                </vxe-table-colgroup>
                <vxe-table-colgroup title="实际出运" header-align="center">
                    <vxe-table-column field="shnd_qty_a" title="数量" header-align="center" align="right" :formatter="formatterNum" :width="$columns.number.small"></vxe-table-column>
                    <vxe-table-column field="shnd_price_a" title="单价" header-align="center" align="right" :width="$columns.number.small"></vxe-table-column>
                    <vxe-table-column field="shnd_amount_a" title="金额" header-align="center" align="right" :formatter="formatterNum" :width="$columns.number.medium"></vxe-table-column>
                </vxe-table-colgroup>
            </vxe-table>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        customList: {
            type: Array,
        },
        currency: {
            type: String,
        },
    },
    methods: {
        // 表格合计行
        footerMethod({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex === 3) {
                        return "合计";
                    }

                    if (
                        column.property == "shnd_amount_e" ||
                        column.property == "shnd_amount_a"
                    ) {
                        return this.$XEUtils.commafy(
                            this.$XEUtils.sum(data, column.property),
                            {
                                digits: 2,
                            }
                        );
                    } else if (
                        column.property == "shnd_qty_e" ||
                        column.property == "shnd_qty_a"
                    ) {
                        return this.$XEUtils.commafy(
                            this.$XEUtils.sum(data, column.property),
                            {
                                digits: 2,
                            }
                        );
                    } else if (
                        column.property == "shnd_carton_num_e" ||
                        column.property == "shnd_carton_num_a"
                    ) {
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
                            "shnd_volume_a",
                            "shnd_weight_g_a",
                            "shnd_weight_n_a",
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
        formatterNum({ cellValue }) {
            return this.$XEUtils.commafy(this.$XEUtils.toNumber(cellValue), {
                digits: 2,
            });
        },
        footerRowClassName({ $rowIndex }) {
            return "footer-style";
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