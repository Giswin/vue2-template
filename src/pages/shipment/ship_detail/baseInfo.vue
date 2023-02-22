<template>
    <div>
        <div class="ship-note">
            <div class="class-title">
                <div class="title">出运通知信息</div>
                <div class="class-r">
                    <el-button size="mini" @click="handleToEdit" v-if="baseInfo.shn_state!='6'">编辑</el-button>
                </div>
            </div>
            <div class="table-body">
                <el-row>
                    <el-col :span="8" class="col1">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                            <tbody>
                                <tr>
                                    <th width="90">运编号</th>
                                    <td>{{baseInfo.shn_invoice_no_ebs ? baseInfo.shn_invoice_no_ebs : '待生成'}}</td>
                                </tr>
                                <tr>
                                    <th width="90">业务部门</th>
                                    <td>{{baseInfo.shn_dep_name}}</td>
                                </tr>
                                <tr>
                                    <th>业务员</th>
                                    <td>{{baseInfo.shn_sales_name}}</td>
                                </tr>
                                <tr>
                                    <th>单证</th>
                                    <td>{{baseInfo.shn_document_name}}</td>
                                </tr>
                                <tr>
                                    <th>船务</th>
                                    <td>{{baseInfo.shn_ship_name}}</td>
                                </tr>
                                <tr>
                                    <th>贸易方式</th>
                                    <td>{{ baseInfo.shn_trade_mode}}</td>
                                </tr>
                                <tr>
                                    <th>接单抬头</th>
                                    <td>{{baseInfo.shn_acc_book_name}}</td>
                                </tr>
                                <tr>
                                    <th>抬头选项</th>
                                    <td>
                                        <div v-for="item in selectOptions.titleOptions" :key="item.value">
                                            <span v-if="item.value==baseInfo.shn_title_mode">{{item.label}}</span>
                                        </div>
                                    </td>
                                    <!-- <td>{{baseInfo.shn_title_mode}}</td> -->
                                </tr>
                                <tr>
                                    <th>出运抬头</th>
                                    <td>{{baseInfo.shn_title_name}}</td>
                                </tr>
                                <tr>
                                    <th>结算客户</th>
                                    <td>{{baseInfo.shn_cus_name}}</td>
                                </tr>
                                <tr>
                                    <th>收货抬头</th>
                                    <td>{{baseInfo.shn_consignee_name}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                    <el-col :span="8" class="col2">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                            <tbody>
                                <tr>
                                    <th width="90">价格条款</th>
                                    <td>{{baseInfo.shn_price_clause}}</td>
                                </tr>
                                <tr>
                                    <th>结算方式</th>
                                    <td>
                                        <el-tag size="small">
                                            {{baseInfo.shn_collect_mode}}
                                        </el-tag>
                                        <el-tag style="margin-left: 10px;" size="small">
                                            {{baseInfo.shn_collect_days}} 天
                                        </el-tag>
                                    </td>
                                </tr>
                                <tr>
                                    <th>信用证号</th>
                                    <td>{{baseInfo.shn_lc_no}}</td>
                                </tr>
                                <tr>
                                    <th>运输方式</th>
                                    <td>{{baseInfo.shn_shipping_mode}}</td>
                                </tr>
                                <tr>
                                    <th>装运港</th>
                                    <td>{{baseInfo.shn_port_from}}</td>
                                </tr>

                                <tr>
                                    <th>目的港</th>
                                    <td>{{baseInfo.shn_port_to}}</td>
                                </tr>
                                <tr>
                                    <th>预计船期</th>
                                    <td>{{baseInfo.shn_ship_date_e}}</td>
                                </tr>
                                <tr>
                                    <th>装柜日期</th>
                                    <td>{{baseInfo.shn_load_date}}</td>
                                </tr>
                                <tr>
                                    <th>装柜地点</th>
                                    <td>{{baseInfo.shn_load_location}}</td>
                                </tr>
                                <tr height="74">
                                    <th>装柜类型</th>
                                    <td>
                                        <el-tag size="small" v-for="(item,index) in baseInfo.shn_load_mode" :key="'shn_load_mode' + index" style="margin-right: 5px;">
                                            {{item.type}} {{item.num}}
                                        </el-tag>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                    <el-col :span="8" class="col3">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                            <tbody>
                                <tr>
                                    <th width="90">通知金额</th>
                                    <td align="right">{{baseInfo.shn_currency}} {{$XEUtils.commafy(baseInfo.shn_amount_e)}}</td>
                                </tr>
                                <tr>
                                    <th>体积CBM</th>
                                    <td align="right">{{baseInfo.shn_volume_e}}</td>
                                </tr>
                                <tr>
                                    <th>毛重KGS</th>
                                    <td align="right">{{baseInfo.shn_weight_g_e}}</td>
                                </tr>
                                <tr>
                                    <th>净重KGS</th>
                                    <td align="right">{{baseInfo.shn_weight_n_e}}</td>
                                </tr>
                                <tr height="258">
                                    <th>出运备注</th>
                                    <td>{{baseInfo.shn_memo}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="actual-note">
            <div class="class-title">
                <div class="title">实际出运信息</div>
            </div>
            <div class="table-body">
                <el-row>
                    <el-col :span="8" class="col1">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                            <tbody>
                                <tr>
                                    <th width="90">实际金额</th>
                                    <td align="right">{{$XEUtils.commafy(baseInfo.shn_amount_a)}}</td>
                                </tr>
                                <tr>
                                    <th width="90">体积CBM</th>
                                    <td align="right">{{baseInfo.shn_volume_a}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                    <el-col :span="8" class="col2">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                            <tbody>

                                <tr>
                                    <th width="90">毛重KGS</th>
                                    <td align="right">{{baseInfo.shn_weight_g_a}}</td>
                                </tr>
                                <tr>
                                    <th>净重KGS</th>
                                    <td align="right">{{baseInfo.shn_weight_n_a}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>
            </div>
        </div>
        <ship-edit v-if="showEdit" :selectOptions="selectOptions" :shn_id="shn_id" @closeEdit="closeEdit" @closeIcon="closeIcon"></ship-edit>

    </div>
</template>

<script>
import shipEdit from "../ship_edit.vue";

export default {
    components: {
        shipEdit,
    },
    props: {
        baseInfo: {
            type: Object,
        },
        selectOptions: {
            type: Object,
        },
    },
    data() {
        return {
            base_info: {},
            showEdit: false,
            shn_id: 0,
        };
    },
    created() {},
    methods: {
        handleToEdit() {
            this.shn_id = this.baseInfo.shn_id;
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
.table-body {
    margin-top: 15px;
    table.definition tbody tr th {
        height: 26px;
    }
    table.definition tbody tr td {
        height: 26px;
    }
}
.col1 {
    padding-right: 10px;
}
.col2 {
    padding: 0 10px;
}
.col3 {
    padding-left: 10px;
}

.actual-note {
    margin: 15px 0;
}
</style>