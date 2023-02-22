<template>
    <div class="wrap">
        <vxe-modal ref="model1" v-model="show" width="1100" resize height="600" show-footer destroy-on-close>

            <template v-slot:header>
                <div>报关信息编辑</div>

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

            <div class="basic-table">
                <div class="table-body">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                        <tbody>
                            <tr>
                                <th align="center" width="100">运编号</th>
                                <td></td>
                                <th align="center" width="100">预计船期</th>
                                <td></td>
                                <th align="center" width="100">抵运国</th>
                                <td></td>
                                <th align="center" width="100">包装类型</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th align="center">标记唛码</th>
                                <td colspan="7"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            <div class="customs-btns">
                <div class="left-btns">
                    <el-button size="small">导入出运数据</el-button>

                </div>
                <div class="right-btns">
                    <el-button size="small">合并行</el-button>

                    <el-button size="small">增行</el-button>

                    <el-button size="small">删行</el-button>
                </div>

            </div>

            <div class="customs-table">
                <vxe-table border resizable row-key ref="customsTable" :data="customsList" show-overflow show-footer size="small" class="mytable-scrollbar" max-height="100%" auto-resize :column-config="{minWidth:100}" :edit-config="{trigger: 'click', mode: 'cell'}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod}" :mouse-config="{selected: true}" :footer-method="footerMethod1" :footer-row-class-name="footerRowClassName">
                    <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="货号" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="报关品名" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="报关品名(英文)" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="海关代码" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="申报要素" width="120" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="数量" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="单位(英文)" width="90" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="单位(中文)" width="90" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="销售价" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="销售小计" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="采购价" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="换汇" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="包装数" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="包装单位(英文)" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="毛重小计" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="净重小计" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="体积小计" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_goods_article_number" title="货源地" width="90" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">

                        </template>
                    </vxe-table-column>

                </vxe-table>
            </div>

            <template v-slot:footer>
                <div class="m-r">

                    <el-button>生成报关单据</el-button>
                    <el-button>报关信息回填到商品库</el-button>

                    <el-button size="small">保存</el-button>
                    <el-button @click="closeIcon" size="small" style="margin-left:15px">取消</el-button>

                </div>

            </template>
        </vxe-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: true,
            downIcon: true,
            customsList: [],
        };
    },
    methods: {
        closeModel() {
            this.show = false;
            this.$emit("closeCustoms");
        },
        closeIcon() {
            this.show = false;
            this.$emit("closeCusIcon");
        },
        screen() {
            this.$refs.model1.zoom();
            this.downIcon = !this.downIcon;
        },
        editMethod({ row, column }) {
            const $table = this.$refs.customsTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        footerRowClassName({ $rowIndex }) {
            if ($rowIndex == 0) {
                return "footer-style";
            }
        },
        footerMethod1({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex === 3) {
                        return "合计";
                    }
                    if (["order_goods_qty"].includes(column.property)) {
                        return this.sumNum(data, column.property);
                    } else if (
                        ["order_goods_amount"].includes(column.property)
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

            return count;
        },
        countAmount(row) {
            let count = 0;
            count = row.order_goods_qty * row.order_goods_price;
            row.order_goods_amount = count;
            return count;
        },
        countAllamount(data) {
            let count = 0;
            data.forEach((item) => {
                count += this.countAmount(item);
            });
            return count;
        },
    },
};
</script>

<style lang="scss" scoped>
.basic-table {
    margin-top: 15px;
    .table-body {
        margin-top: 15px;
        table.definition tbody tr th {
            height: 26px;
        }
        table.definition tbody tr td {
            height: 26px;
        }
    }
}
.customs-btns {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    .right-btns {
        display: flex;
    }
}
</style>