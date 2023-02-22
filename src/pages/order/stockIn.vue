<template>
    <div class="wrap">
        <vxe-modal ref="model1" :value="show" width="700" resize height="450" show-footer destroy-on-close>
            <template v-slot:header>
                入库信息
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

            <div class="table-body">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                    <tbody>
                        <tr>
                            <th width="80">订单号</th>
                            <td></td>
                            <th width="80">货号</th>
                            <td></td>
                            <th width="80">品名</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th>供应商</th>
                            <td colspan="3"></td>
                            <th>采购数量</th>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <div>
                <div class="btns">
                    <el-button size="small" @click="addRow">增行</el-button>
                    <el-button size="small" @click="delRow" style="margin-left:15px">删行</el-button>
                </div>
                <vxe-table border ref="stockInTable" :data="stockInList" resizable size="small" height="100%" auto-resize :column-config="{minWidth:120}" :row-config="{height:40}" :edit-config="{trigger: 'click', mode: 'cell',activeMethod: activeCellMethod}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod}" :mouse-config="{selected: true}" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row>
                    <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>

                </vxe-table>
            </div>

            <template v-slot:footer>
                <div class="m-l">
                </div>
                <div class="m-r">
                    <el-button size="small">确定</el-button>
                </div>
            </template>
        </vxe-modal>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            downIcon: true,
            stockInList: [],
        };
    },
    methods: {
        closeModel() {
            this.$emit("update:show", false);
        },
        screen() {
            this.$refs.model1.zoom();
            this.downIcon = !this.downIcon;
        },
        activeCellMethod() {},

        editMethod({ row, column }) {
            const $table = this.$refs.stockInTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        addRow() {},
        delRow() {},
    },
};
</script>

<style>
</style>