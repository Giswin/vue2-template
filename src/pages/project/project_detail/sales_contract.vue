<template>
    <div>
        <div class="contract-wrap">

            <div class="class-title">
                <div class="title">合同信息</div>
            </div>

            <div class="contract-table">

                <vxe-table border ref="salesTable" :data="salesList" auto-resize resizable show-overflow size="small" class="mytable-scrollbar" :column-config="{minWidth:130}" highlight-current-row highlight-hover-row>
                    <vxe-table-column field="order_bms_code" title="合同号" align="left" header-align="center" min-width="150"></vxe-table-column>
                    <vxe-table-column field="order_state" title="状态" min-width="60" align="center" header-align="center">
                        <template v-slot="{ row }">
                            <span v-if="row.order_state !=2">
                                <template v-if="row.order_state ==1">
                                        {{state_arr[row.order_state]}}
                                </template>
                                <a v-else @click="get_flowRecords(row.order_id)" style="text-decoration:underline;color: blue;">
                                    <template >
                                        {{state_arr[row.order_state]}}
                                    </template>
                                </a>
                            </span>
                            <a v-else @click="get_flowRecords(row.order_id)" style="text-decoration:underline;color: blue;">
                                <template >
                                    {{state_aprv_arr[row.order_state_aprv]}}
                                </template>
                            </a>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_date" title="合同日期" align="center" header-align="center" min-width="120"></vxe-table-column>
                    <vxe-table-column field="order_type" title="合同类型" align="left" header-align="center" min-width="80">
                        <template v-slot="{row}">
                            <span v-if="row.order_type == 'EXPORT'">出口销售订单</span>
                            <span v-if="row.order_type == 'TRADE'">国内销售订单</span>
                            <span v-if="row.order_type == 'OVERSEAS'">海外加工面辅料出口</span>
                            <span v-if="row.order_type == 'OVERSEAS_FAC'">海外工厂出运</span>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="order_cus_name" title="客户" align="left" header-align="center" show-overflow="title" min-width="137"></vxe-table-column>
                    <vxe-table-column field="order_title_name" title="我司抬头" align="left" header-align="center" show-overflow="title" min-width="130"></vxe-table-column>
                    <vxe-table-column field="order_currency" title="币种" align="left" header-align="center" min-width="60"></vxe-table-column>
                    <vxe-table-column field="order_amount_oc" title="金额" align="right" header-align="center" min-width="100" :formatter="formatterNum">
                    </vxe-table-column>
                    <vxe-table-column field="order_send_time" title="同步时间" align="center" header-align="center" show-overflow="title" min-width="120"></vxe-table-column>
                    <vxe-table-column title="操作" align="center" header-align="center" min-width="90">
                        <template #default="{row}">
                            <a :href="`#/order_detail?flag=${row.order_code}&id=${row.order_id}`">详情</a>
                        </template>
                    </vxe-table-column>

                </vxe-table>
            </div>
        </div>
        <approve_flow :RecordDatalist="RecordDatalist" v-if="modalFlow" :show.sync="modalFlow"></approve_flow>
    </div>
</template>

<script>
import orderApi from "@/api/cbs/order.js";
import approve_flow from '@/pages/order/order_detail/approve_flow';
export default {
    components: {
        approve_flow
    },
    props: {
        salesData: {
            type: Array,
        },
    },
    data() {
        return {
            salesList: [],
            RecordDatalist:[],
            modalFlow:false,
            state_arr:{
                1:'草稿',
                2:'在手',
                3:'变更',
                4:'暂停',
                5:'中止',
                6:'完成',
                9:'作废',
            },
            state_aprv_arr:{
                1:'待审',		
                2:'已审',		
                3:'拒绝',		
            },
        };
    },
    created() {
        this.salesList = this.salesData;
    },
    methods: {
        formatterNum({ cellValue }) {
            return this.$XEUtils.commafy(this.$XEUtils.toNumber(cellValue), {
                digits: 2,
            });
        },

        //获取流程记录
		get_flowRecords(order_id){
            orderApi.getOrderApprFlowList(order_id).then((result)=>{
                if(result.code == 0){
                    this.RecordDatalist = result.data || [];
                    this.modalFlow=true
                }
            })
        },
    },
};
</script>

<style lang="scss" scoped>
.contract-wrap {
    height: 450px;
    .contract-table {
        margin-top: 15px;
        height: 90%;
    }
}
</style>