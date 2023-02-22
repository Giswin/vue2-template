<template>
    <div class="wrap">
        <vxe-modal ref="model1" v-model="show" width="400" resize height="350" show-footer destroy-on-close>

            <template v-slot:header>
                <div>提单信息</div>

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

            <div class="bill-table">
                <div class="table-body">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                        <tbody>
                            <tr>
                                <th width="100" align="center">运编号</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th width="100" align="center">提单号</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th width="100" align="center">实际船期</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th width="100" align="center">船名/航次</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th width="100" align="center">备注</th>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <template v-slot:footer>
                <div class="m-l">
                </div>
                <div class="m-r">
                    <el-button size="small" @click="closeEdit">保存</el-button>
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
        };
    },
    methods: {
        closeModel() {
            this.show = false;
            this.$refs.model1.close();
        },
        closeIcon() {
            this.closeModel();
            setTimeout(() => {
                this.$emit("closeBillEdit");
            }, 500);
        },
        closeEdit() {
            this.closeModel();
            setTimeout(() => {
                this.$emit("closeBillIcon");
            }, 500);
        },

        screen() {
            this.$refs.model1.zoom();
            this.downIcon = !this.downIcon;
        },
    },
};
</script>

<style>
</style>