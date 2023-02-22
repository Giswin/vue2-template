<template>
    <div class="wrap">
        <vxe-modal ref="model1" v-model="show" width="1100" resize height="670" show-footer destroy-on-close>
            <template v-slot:header>
                销售合同编辑
                <div class="model-header-r">
                    编码:
                </div>
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
            <div class="tabs">
                <div class="tabs-col" :class="{ show: selectTab == 0 }" @click="selectTab = 0">基本信息</div>
                <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectTab = 1">合同明细</div>
                <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectTab = 2">合同条款</div>
                <div class="tabs-col" :class="{ show: selectTab == 3 }" @click="selectTab = 3">其他条款</div>
            </div>

            <div class="basic-info" v-show="selectTab==0">
                <el-row>
                    <el-col :span="12">
                        <div class="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                                <tbody>
                                    <tr>
                                        <th align="center" width="120">合同号-ID</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>业务组</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>制单人</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>业务员</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>订单类型</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>合同日期</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center">签约地</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center">合同有效期</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>合同客户</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>最终客户</th>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <th align="center" width="120">客户订单号</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center" width="120">交货日期</th>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="right">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                                <tbody>
                                    <tr>
                                        <th align="center"><span>*</span>价格条款</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center">付款条件</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center" width="120"><span>*</span>结算方式</th>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <th align="center"><span>*</span>运输方式</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>起运港</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>目的港</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>币种</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center">汇率</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center">短装率%</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center">溢装率%</th>
                                        <td></td>
                                    </tr>
                                    <tr height="82">
                                        <th align="center">汇率列表</th>
                                        <td></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </el-col>

                </el-row>
            </div>

            <div class="contract-detail" v-show="selectTab==1">
                <div class="detail-btns">
                    <el-button size="mini" @click="addRow">增行</el-button>
                    <el-button size="mini" @click="delRow">删行</el-button>
                    <el-button size="mini" @click="multipleSet">批量设置</el-button>
                </div>
                <div class="detail-table">
                    <vxe-table border resizable ref="detailTable" :data="detailList" show-overflow size="small" class="mytable-scrollbar" max-height="100%" auto-resize :column-config="{minWidth:100}" :edit-config="{trigger: 'click', mode: 'cell'}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod}" :mouse-config="{selected: true}" :edit-rules="validRule">
                        <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                        <vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="中文款号" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="中文规格" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="英文规格" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="库存组织" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>

                        <vxe-table-column field="order_goods_name" title="商品名称-EBS" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>

                        <vxe-table-column field="order_goods_name" title="数量" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="单位" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="销售币种" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="销售单价" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="销售金额" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="销售汇率" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="税率" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="备注" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                    </vxe-table>
                </div>
            </div>

            <div class="contract-terms" v-show="selectTab==2">
                <div class="terms-select">
                    <el-select size="small" v-model="contract_code" @change="changeContract">
                        <el-option v-for="item in contractClause" :key="item.dic_code" :label="item.dic_name" :value="item.dic_code"></el-option>
                    </el-select>
                </div>

                <div class="contract-main">
                    <wang-editor :htmlData.sync="htmlData" @change="htmlChange"></wang-editor>
                </div>
            </div>

            <div class="other-terms" v-show="selectTab==3">
                <div class="other-btns">
                    <el-button size="mini" @click="addRow2">增行</el-button>
                    <el-button size="mini" @click="delRow2">删行</el-button>
                </div>

                <div class="other-table">
                    <vxe-table border resizable ref="otherTable" :data="otherList" show-overflow size="small" class="mytable-scrollbar" max-height="100%" auto-resize :edit-config="{trigger: 'click', mode: 'cell'}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod2}" :mouse-config="{selected: true}">
                        <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                        <vxe-table-column type="seq" title="序号" width="60" align="center"></vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="结算类型" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="结算方式" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="结算比列%" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="天数" width="120" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="条件描述" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="SWIFT码" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                    </vxe-table>
                </div>
            </div>

            <template v-slot:footer>
                <div class="m-l">
                </div>
                <div class="m-r">
                    <el-button size="small">上一步</el-button>

                    <el-button size="small">下一步</el-button>
                    <el-button size="small" style="margin-left:15px">完成</el-button>
                </div>
            </template>
        </vxe-modal>
    </div>
</template>

<script>
import WangEditor from "@/components/general/wangEditor/index.vue";

export default {
    components: {
        WangEditor,
    },
    data() {
        return {
            show: true,
            downIcon: true,
            selectTab: 0,
            // 基本信息
            base_info: {
                // 合同ID
                // 业务组
                // 制单人
                // 业务员
                // 订单类型
                // 合同日期
                // 签约地
                // 合同有效期
                // 合同客户
                // 最终客户
                // 客户订单号
                // 交货日期
                // 价格条款
                // 付款条件（内销）
                // 结算方式
                // 运输方式
                // 起运港
                // 目的港
                // 币种
                // 汇率
                // 短装率%
                // 溢装率%
                // 汇率列表
            },
            // 合同明细
            detailList: [],
            validRule: {
                oded_stock_org_id_ebs: [
                    { required: true, message: "请填写库存组织" },
                ],
                oded_item_id_ebs: [{ required: true, message: "请编辑商品ID" }],
                oded_vender_id_ebs: [
                    { required: true, message: "请编辑供应商" },
                ],
            },
            // 合同条款
            contract_code: "",
            contractClause: [],
            htmlData: "",

            // 其他条款
            otherList: [],
        };
    },
    methods: {
        screen() {
            this.$refs.model1.zoom();
            this.downIcon = !this.downIcon;
        },
        closeModel() {
            this.show = false;
            this.$emit("closeEidt");
        },
        // 基本信息

        // 合同明细
        addRow() {
            let obj = {
                // 中文款号
                // 中文规格
                // 英文规格
                // 库存组织
                // 商品名称-EBS
                // 数量
                // 单位
                // 单位编码
                // 销售币种
                // 销售单价
                // 销售金额
                // 销售汇率
                // 税率
                // 备注
            };
        },
        delRow() {},
        multipleSet() {},
        editMethod({ row, column }) {
            const $table = this.$refs.detailTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        // 合同条款
        changeContract(value) {},
        htmlChange(data) {},
        // 其他条款
        editMethod2({ row, column }) {
            const $table = this.$refs.otherTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        addRow2() {
            let obj = {
                // 结算类型
                // 结算方式
                // 结算比例%
                // 天数
                // 条件描述
                // SWIFT码
            };
        },
        delRow2() {},
    },
};
</script>

<style lang="scss" scoped>
.basic-info {
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
    .left {
        padding-right: 8px;
    }
    .right {
        padding-left: 8px;
    }
}

.contract-detail {
    margin-top: 15px;
    height: 80%;
    .detail-btns {
        display: flex;
        justify-content: flex-end;
        margin: 15px 0;
    }
    .detail-table {
        height: 100%;
    }
}

.contract-terms {
    margin-top: 15px;
    .terms-select {
        display: flex;
        justify-content: flex-end;
        margin-right: 3px;
    }
    .contract-main {
        margin-top: 15px;
        >>> .w-e-text-container {
            height: 300px !important;
        }
    }
}

.other-terms {
    margin-top: 15px;
    height: 80%;

    .other-btns {
        display: flex;
        justify-content: flex-end;
        margin: 15px 0;
    }
    .other-table {
        height: 100%;
    }
}
</style>