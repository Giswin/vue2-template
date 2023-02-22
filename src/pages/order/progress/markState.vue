<template>
    <div class="wrap">
        <vxe-modal ref="model1" v-model="showState" width="700" resize height="500" show-footer destroy-on-close>
            <template v-slot:header>
                订单商品状态
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
                            <td width="120">{{stateInfo.order_cus_od_code}}</td>
                            <th width="80">货号</th>
                            <td width="120">{{stateInfo.order_goods_article_number}}</td>
                            <th width="80">品名</th>
                            <td>{{stateInfo.order_goods_name}}</td>
                        </tr>
                        <tr>
                            <th>供应商</th>
                            <td colspan="3">{{stateInfo.order_goods_bom_ven_name}}</td>
                            <th>采购数量</th>
                            <td>{{stateInfo.order_goods_bom_qty}}</td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <div class="state">
                <el-radio-group v-model="order_goods_state">
                    <el-radio :label="1">正在执行</el-radio>
                    <el-radio :label="2">已经完成</el-radio>
                    <el-radio :label="3">异常终止</el-radio>
                </el-radio-group>
                <div class="reason" v-show="order_goods_state==3">
                    <el-input v-model="order_goods_abort_reason" placeholder="请输入异常终止原因" type="textarea"></el-input>

                </div>
            </div>

            <template v-slot:footer>
                <div class="m-l">
                </div>
                <div class="m-r">
                    <el-button size="small" @click="saveState">确定</el-button>
                </div>
            </template>
        </vxe-modal>
    </div>
</template>

<script>
import orderApi from "@/api/cbs/order.js";

export default {
    props: {
        stateInfo: {
            type: Object,
        },
    },
    created() {
        if (["1", "2", "3"].includes(this.stateInfo.order_goods_state)) {
            this.order_goods_state = parseInt(this.stateInfo.order_goods_state);
        }
        if (this.stateInfo.order_goods_abort_reason) {
            this.order_goods_abort_reason =
                this.stateInfo.order_goods_abort_reason;
        }
    },
    data() {
        return {
            showState: true,
            downIcon: true,
            order_goods_state: 1,
            order_goods_abort_reason: "",
        };
    },
    methods: {
        closeModel() {
            this.showState = false;
            this.$emit("closeState");
        },
        closeIcon() {
            this.showState = false;
            this.$emit("closeIcon", 3);
        },
        screen() {
            this.$refs.model1.zoom();
            this.downIcon = !this.downIcon;
        },
        saveState() {
            orderApi
                .orderDetailStateReg(
                    this.stateInfo.order_goods_id,
                    this.order_goods_state,
                    this.order_goods_abort_reason
                )
                .then((res) => {
                    if (res.code == 0) {
                        this.$message({
                            message: "订单明细状态登记成功！",
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
.state {
    margin-top: 30px;
    .reason {
        margin-top: 15px;
    }
}
</style>