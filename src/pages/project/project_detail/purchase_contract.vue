<template>
    <div>
        <div class="contract-wrap">

            <div class="class-title">
                <div class="title">采购信息</div>
                <div class="m-r" style="margin-top: -8px;">
                   <el-button size="small" v-if="orderData.ode_bus_type_id_ebs=='1285'" @click="modalContractPurchase=true;contract_id=null">新增库存采购</el-button>
                </div>
            </div>

            <div class="contract-table">
                <vxe-table border ref="purchaseTable" :data="purchaseData" width="auto" auto-resize resizable show-overflow size="small" class="mytable-scrollbar" max-height="100%" :column-config="{minWidth:120}" highlight-current-row highlight-hover-row>
                    <vxe-table-column field="contract_bms_code" title="合同号" align="left" header-align="center" min-width="150"></vxe-table-column>
                    <vxe-table-column field="contract_state" title="状态" min-width="60" align="center" header-align="center">
                        <template v-slot="{ row }">
                            <span v-if="row.contract_state !=2">
                                <template v-if="row.contract_state ==1">
                                        {{state_arr[row.contract_state]}}
                                </template>
                                <!-- <a v-else @click="get_flowRecords(row.contract_id)" style="text-decoration:underline;color: blue;">
                                    <template >
                                        {{state_arr[row.contract_state]}}
                                    </template>
                                </a> -->
                            </span>
                            <a v-else @click="get_flowRecords(row.contract_id)" style="text-decoration:underline;color: blue;">
                                <template >
                                    {{state_aprv_arr[row.contract_state_aprv]}}
                                </template>
                            </a>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column field="contract_date" title="合同日期" align="center" header-align="center" min-width="120"></vxe-table-column>

                    <vxe-table-column field="contract_type" title="合同类型" align="left" header-align="center" min-width="80">
                        <template v-slot="{row}">
                            <span v-if="row.contract_type == '05'">国内采购</span>
                            <span v-if="row.contract_type == '01'">进口采购</span>
                        </template>
                    </vxe-table-column>

                    <vxe-table-column field="contract_actual_supply_title_name" title="供应商" align="left" header-align="center" show-overflow="title" min-width="137"></vxe-table-column>

                    <vxe-table-column field="contract_title_name" title="我司抬头" align="left" header-align="center" show-overflow="title" min-width="130"></vxe-table-column>
                    <vxe-table-column field="contract_currency" title="币种" align="left" header-align="center" min-width="60"></vxe-table-column>
                    <vxe-table-column field="contract_amount" title="金额" align="right" header-align="center" min-width="100" :formatter="formatterNum">
                        <!-- <template v-slot="{row}">
                            <div>{{$general.transform(row.contract_amount || 0)}}</div>
                        </template> -->
                    </vxe-table-column>
                    <vxe-table-column field="contract_send_time" title="同步时间" align="center" header-align="center" show-overflow="title" min-width="120">
                        <template v-slot="{ row }">
							<span v-if="row.contract_send_time==null">未同步</span>
							<span v-else>{{row.contract_send_time}}</span>
						</template>
                    </vxe-table-column>
                    <vxe-table-column title="操作" align="center" header-align="center" min-width="90">
                        <template #default="{row}">
                            <el-dropdown>
                                <el-button size="mini">
                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-if="row.contract_state==1 || row.contract_state==3" @click.native="handleToEdit(row)">编辑</el-dropdown-item>
                                    <el-dropdown-item @click.native="handleToDetail(row)">详情</el-dropdown-item>
                                    <el-dropdown-item v-if="row.contract_state == 1" @click.native="handleToDelete(row)">删除</el-dropdown-item>
                                    <el-dropdown-item v-if="row.contract_state == 1 || row.contract_state == 3" @click.native="handleToPublish(row)">发布</el-dropdown-item>
                                    <el-dropdown-item v-if="row.contract_state==2 && (row.contract_state_aprv==1 || row.contract_state_aprv==3) " @click.native="withdrawContract(row)">撤回</el-dropdown-item>
                                    <el-dropdown-item v-if="row.contract_state_aprv == 2" @click.native="handleToChange(row)">变更</el-dropdown-item>
                                    <el-dropdown-item @click.native="print(row,1)">打印（标准）</el-dropdown-item>
                                    <el-dropdown-item @click.native="print(row,2)">打印（附件）</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </vxe-table-column>

                </vxe-table>
            </div>
        </div>
        <!-- 采购合同编辑 -->
		<contract_purchase_edit v-if="modalContractPurchase" :show.sync="modalContractPurchase" :orderData="orderData" :contract_id="contract_id" @afterSavePurContract="savePurContract()"></contract_purchase_edit>
        <!-- 合同变更页面 -->
		<contract_change_edit v-if="changeModel" @changeAfter="changeModel = false;refresh()" :show.sync="changeModel" :contract_id="contract_id"></contract_change_edit>
        <approve_flow :RecordDatalist="RecordDatalist" v-if="modalFlow" :show.sync="modalFlow"></approve_flow>
    </div>
</template>

<script>
import purchaseApi from "@/api/cbs/purchase.js";
import contract_purchase_edit from '@/pages/order/order_detail/contract_purchase_edit';
import contract_change_edit from '@/pages/order/order_detail/contract_change_edit';
import approve_flow from '@/pages/order/order_detail/approve_flow';
export default {
    components: {
        contract_purchase_edit,
        contract_change_edit,
        approve_flow
    },
    props: {
        purchaseData: {
            type: Array,
        },
        orderData: {
            type: Object,
        },
    },
    data() {
        return {
            contract_id:null,
            modalContractPurchase:false,
            changeModel:false,
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
            modalFlow:false,
            RecordDatalist:[],
        };
    },
    created() {
    },
    methods: {
        //获取流程记录
		get_flowRecords(contract_id){
            purchaseApi.getContractFlowList(contract_id).then((result)=>{
                if(result.code == 0){
                    this.RecordDatalist = result.data || [];
                    this.modalFlow=true
                }
            })
        },

        formatterNum({ cellValue }) {
            return this.$XEUtils.commafy(this.$XEUtils.toNumber(cellValue), {
                digits: 2,
            });
        },
        // 修改
        handleToEdit(row) {
            this.contract_id=row.contract_id
            this.modalContractPurchase=true
        },

        // 详情
        handleToDetail(row){
            this.$router.push({
                path: "/purchase_detail",
                query: {
                    id:row.contract_id
                },
            });
        },

        // 删除
        handleToDelete(row) {
            this.$confirm("确定要删除该合同?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    purchaseApi.deleteContract(row.contract_id).then((result)=>{
                        if(result.code == 0){
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                        }
                        this.refresh()
                    })
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        // 发布
        handleToPublish(row) {
            purchaseApi.contractPublish(row.contract_id).then((res)=>{
                if(res.code == 0){
                    this.refresh();
                    this.$message({
                        message:res.msg,
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: res.msg+'发布失败！',
                        type: 'error'
                    });
                }
            })
        },

        //撤回
        withdrawContract(row){
            purchaseApi.contractWithdraw(row.contract_id).then((res)=>{
                if(res.code == 0){
                    this.refresh();
                    this.$message({
                        message: '撤回成功!',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: res.msg+'撤回失败！',
                        type: 'error'
                    });
                }
            })
        },

        //变更
		handleToChange(row){
			this.changeModel=true
            this.contract_id=row.contract_id

		},
        
        //刷新
        refresh(){
            this.$emit('refresh');
        },

        //打印
        print(row,type){
            if(type==1){
                window.open('/#/order_purchase_contract_print?contract_id='+row.contract_id+'&flag=print');
            }else{
                window.open('/#/order_purchase_contract_attach_print?contract_id='+row.contract_id+'&flag=print');
            }
        },

        savePurContract(){
            this.refresh()
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