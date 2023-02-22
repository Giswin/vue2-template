<template>
    <div class="wrap">
        <vxe-modal ref="model1" v-model="showTrace" width="700" resize height="500" show-footer destroy-on-close>
            <template v-slot:header>
                跟踪信息
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
                            <td width="120">{{traceInfo.order_cus_od_code}}</td>
                            <th width="80">货号</th>
                            <td width="120">{{traceInfo.order_goods_article_number}}</td>
                            <th width="80">品名</th>
                            <td>{{traceInfo.order_goods_name}}</td>
                        </tr>
                        <tr>
                            <th>供应商</th>
                            <td colspan="3">{{traceInfo.order_goods_bom_ven_name}}</td>
                            <th>采购数量</th>
                            <td>{{traceInfo.order_goods_bom_qty}}</td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <div class="table-wrap">
                <div class="btns">
                    <el-button size="mini" @click="addRow">增行</el-button>
                    <el-button size="mini" @click="delRow" style="margin-left:15px">删行</el-button>
                </div>
                <div class="trace-table">
                    <vxe-table border ref="traceTable" :data="traceData" max-height="100%" resizable size="small" auto-resize :column-config="{minWidth:120}" :edit-config="{trigger: 'click', mode: 'cell'}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod}" :mouse-config="{selected: true}" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row>
                        <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                        <vxe-table-column field="date" title="日期" width="140" align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-date-picker v-model="row.date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="small"></el-date-picker>
                            </template>
                        </vxe-table-column>

                        <vxe-table-column field="content" title="内容" align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.content" clearable></el-input>
                            </template>
                        </vxe-table-column>
                    </vxe-table>
                </div>
            </div>

            <template v-slot:footer>
                <div class="m-l">
                </div>
                <div class="m-r">
                    <el-button size="small" @click="saveTrace">确定</el-button>
                </div>
            </template>
        </vxe-modal>
    </div>
</template>

<script>
import orderApi from "@/api/cbs/order.js";

export default {
    props: {
        traceList: {
            type: Array,
        },
        traceInfo: {
            type: Object,
        },
    },
    data() {
        return {
            downIcon: true,
            showTrace: true,
            traceData: [],
        };
    },
    created() {
        if (this.traceList) {
            this.traceData = this.traceList;
        }
    },
    methods: {
        closeModel() {
            this.showTrace = false;
            this.$emit("closeTrace");
        },
        closeIcon() {
            this.showTrace = false;
            this.$emit("closeIcon", 2);
        },
        screen() {
            this.$refs.model1.zoom();
            this.downIcon = !this.downIcon;
        },

        editMethod({ row, column }) {
            const $table = this.$refs.traceTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        addRow() {
            let obj = {
                date: "",
                content: "",
            };
            this.traceData.push(obj);
        },
        delRow() {
            if (this.traceData.length > 0) {
                const table = this.$refs.traceTable;
                const selectRecords = table.getCheckboxRecords();
                console.log("sel", selectRecords);
                if (selectRecords.length > 0) {
                    this.$confirm("确定要删除跟踪信息?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                        .then(() => {
                            this.$refs.traceTable.removeCheckboxRow();
                            selectRecords.forEach((data) => {
                                this.traceData = this.traceData.filter(
                                    (item) => {
                                        return item !== data;
                                    }
                                );
                            });
                            console.log("删除后的traceData", this.traceData);
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
        saveTrace() {
            orderApi
                .trackInfoReg(this.traceInfo.order_goods_bom_id, this.traceData)
                .then((res) => {
                    if (res.code == 0) {
                        this.$message({
                            message: "跟踪信息登记成功！",
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
    .trace-table {
        height: 100%;
    }
}
</style>