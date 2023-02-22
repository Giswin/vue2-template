<template>
    <div class="wrap">
        <vxe-modal ref="model1" v-model="showStock" width="700" resize height="500" show-footer destroy-on-close>
            <template v-slot:header>
                入库信息
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

            <div class="info-table">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                    <tbody>
                        <tr>
                            <th width="80">订单号</th>
                            <td width="120">{{stockInfo.order_cus_od_code}}</td>
                            <th width="80">货号</th>
                            <td width="120">{{stockInfo.order_goods_article_number}}</td>
                            <th width="80">品名</th>
                            <td>{{stockInfo.order_goods_name}}</td>
                        </tr>
                        <tr>
                            <th>供应商</th>
                            <td colspan="3">{{stockInfo.order_goods_bom_ven_name}}</td>
                            <th>采购数量</th>
                            <td>{{stockInfo.order_goods_bom_qty}}</td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <div class="table-wrap">
                <div class="btns">
                    <el-button size="mini" @click="addRow">增行</el-button>
                    <el-button size="mini" @click="delRow" style="margin-left:15px">删行</el-button>
                </div>
                <div class="stockIn-table">
                    <vxe-table border ref="stockInTable" :data="stockData" max-height="100%" resizable size="small" auto-resize :column-config="{minWidth:120}" :edit-config="{trigger: 'click', mode: 'cell'}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod}" :mouse-config="{selected: true}" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row>
                        <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                        <vxe-table-column field="date" title="入库日期" width="140" align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template #edit="{row}">
                                <el-date-picker v-model="row.date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="small"></el-date-picker>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="qty" title="入库数量" width="80" align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.qty" clearable></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="memo" title="备注" align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.memo" clearable></el-input>
                            </template>
                        </vxe-table-column>
                    </vxe-table>
                </div>
            </div>

            <template v-slot:footer>
                <div class="m-l">
                </div>
                <div class="m-r">
                    <el-button size="small" @click="saveStock">确定</el-button>
                </div>
            </template>
        </vxe-modal>
    </div>
</template>

<script>
import orderApi from "@/api/cbs/order.js";

export default {
    props: {
        stockInList: {
            type: Array,
        },
        stockInfo: {
            type: Object,
        },
    },
    data() {
        return {
            downIcon: true,
            showStock: true,
            stockData: [],
        };
    },
    created() {
        if (this.stockInList) {
            this.stockData = this.stockInList;
        }
    },
    methods: {
        closeModel() {
            this.showStock = false;
            this.$emit("closeStock");
        },
        closeIcon() {
            this.showStock = false;
            this.$emit("closeIcon", 1);
        },
        screen() {
            this.$refs.model1.zoom();
            this.downIcon = !this.downIcon;
        },

        editMethod({ row, column }) {
            const $table = this.$refs.stockInTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        addRow() {
            let obj = {
                date: "",
                qty: "",
                memo: "",
            };
            this.stockData.push(obj);
        },
        delRow() {
            if (this.stockData.length > 0) {
                const table = this.$refs.stockInTable;
                const selectRecords = table.getCheckboxRecords();
                console.log("sel", selectRecords);
                if (selectRecords.length > 0) {
                    this.$confirm("确定要删除入库信息?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                        .then(() => {
                            this.$refs.stockInTable.removeCheckboxRow();
                            selectRecords.forEach((data) => {
                                this.stockData = this.stockData.filter(
                                    (item) => {
                                        return item !== data;
                                    }
                                );
                            });
                            console.log("删除后的stockData", this.stockData);
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
        saveStock() {
            orderApi
                .warehouseReg(this.stockInfo.order_goods_bom_id, this.stockData)
                .then((res) => {
                    if (res.code == 0) {
                        this.$message({
                            message: "入库信息登记成功！",
                            type: "success",
                        });
                        this.closeModel();
                    }
                });
        },
    },
};
</script>

<style scoped lang="scss">
.info-table {
    table.definition tbody tr th {
        height: 26px;
    }
}

.table-wrap {
    height: 65%;
    .btns {
        height: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .stockIn-table {
        height: 100%;
    }
}
</style>