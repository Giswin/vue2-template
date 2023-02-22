<style scoped lang="scss">
//特殊样式，而不通用请在这里写样式
</style>
<template>
    <div>
		<div>
			<div class="class-title">
			    <div class="title">单据</div>
			</div>
			<div>
				<vxe-table border resizable :data="contarctList" size="small" auto-resize :column-config="{minWidth:120}" show-overflow
				    class="mytable-scrollbar" highlight-current-row highlight-hover-row>
					<vxe-table-column v-if="orderData.order_send_time!=null" field="contract_bms_code" title="合同号" width="140" header-align="center"></vxe-table-column>
					<vxe-table-column field="contract_category" title="类型" width="100" align="center">
						<template v-slot="{ row }">
							<span v-if="row.contract_category=='purchase'">采购合同</span>
							<span v-if="row.contract_category=='process'">加工合同</span>
						</template>
					</vxe-table-column>
					
				    <vxe-table-column field="contract_code" title="单据编号" width="140" header-align="center"></vxe-table-column>
					<vxe-table-column field="contract_supply_title_name" title="交易方" align="left" header-align="center"></vxe-table-column>
					<vxe-table-column field="contract_date" title="单据日期" width="100" header-align="center" align="center"></vxe-table-column>
					<vxe-table-column field="contract_amount" title="金额" width="100" header-align="center" align="right" formatter="formatAmount"></vxe-table-column>
					<vxe-table-column field="contract_state_aprv" title="审批状态" width="100" header-align="center" align="center">
						<template v-slot="{ row }">
							<span v-if="row.contract_state_aprv==null">未提交</span>
							<span v-if="row.contract_state_aprv==1">已提交</span>
							<span v-if="row.contract_state_aprv==2">已审核</span>
							<span v-if="row.contract_state_aprv==3">被拒绝</span>
						</template>
					</vxe-table-column>
					<vxe-table-column field="contract_send_time" title="同步状态" width="100"  header-align="center" align="center">
						<template v-slot="{ row }">
							<span v-if="row.contract_send_time==null">未同步</span>
							<span v-else>{{row.contract_send_time}} 同步</span>
						</template>
					</vxe-table-column>
                    <vxe-table-column field="OP" title="操作" width="100" header-align="center" align="center" fixed="right">
						<template v-slot="{ row }">
							 <el-dropdown>
                                    <el-button size="mini">
                                        更多<i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
									<el-dropdown-menu>
										<el-dropdown-item v-if="row.contract_state==1 || row.contract_state==3" @click.native="edit(row)">编辑</el-dropdown-item>
										<el-dropdown-item @click.native="handleToDetail(row)">详情</el-dropdown-item>
                                        <el-dropdown-item v-if="row.contract_state==1" @click.native="del(row)">删除</el-dropdown-item>
										<el-dropdown-item v-if="orderData.order_state_aprv == 2 &&(row.contract_state==1 || row.contract_state==3)" @click.native="publishContract(row)">发布</el-dropdown-item>
                                        <el-dropdown-item v-if="row.contract_state==2 && (row.contract_state_aprv==1 || row.contract_state_aprv==3) " @click.native="withdrawContract(row)">撤回</el-dropdown-item>
                                        <el-dropdown-item v-if="row.contract_state==2 && row.contract_state_aprv==2" @click.native="changeContract(row)">变更</el-dropdown-item>
										<el-dropdown-item v-if="row.contract_state_aprv==2&&row.contract_send_time==null" @click.native="syncContract(row)">同步审批</el-dropdown-item>
										<el-dropdown-item @click.native="print(row,1)">打印（标准）</el-dropdown-item>
										<el-dropdown-item @click.native="print(row,2)">打印（附件）</el-dropdown-item>
										<el-dropdown-item v-if="row.contract_type == 'DIS' && row.contract_actual_supply_title_name == row.contract_supply_title_name" @click.native="print(row,6)">打印(华盛-工厂-成品单价)</el-dropdown-item>
										<el-dropdown-item v-if="row.contract_type == 'DIS' && row.contract_actual_supply_title_name == row.contract_supply_title_name" @click.native="print(row,7)">打印(华盛-工厂-成品单价-附件)</el-dropdown-item>
										<el-dropdown-item v-if="row.contract_type == 'DIS' && row.contract_actual_supply_title_name == row.contract_supply_title_name" @click.native="print(row,3)">成品采购(华盛-工厂)</el-dropdown-item>
										<el-dropdown-item v-if="row.contract_type == 'DIS' && row.contract_actual_supply_title_name == row.contract_supply_title_name" @click.native="print(row,8)">成品采购(华盛-工厂-附件)</el-dropdown-item>

										<el-dropdown-item v-if="row.contract_type == 'DIS' && row.contract_actual_supply_title_name != row.contract_supply_title_name && row.contract_supply_title_name=='江苏国泰盛大贸易有限公司'" @click.native="print(row,4)">成品采购(华盛-盛大)</el-dropdown-item>
										<el-dropdown-item v-if="row.contract_type == 'DIS' && row.contract_actual_supply_title_name != row.contract_supply_title_name && row.contract_supply_title_name=='江苏国泰盛大贸易有限公司'" @click.native="print(row,9)">成品采购(华盛-盛大-附件)</el-dropdown-item>
										<el-dropdown-item v-if="row.contract_type == 'DIS' && row.contract_actual_supply_title_name != row.contract_supply_title_name && row.contract_supply_title_name=='江苏国泰盛大贸易有限公司'" @click.native="print(row,5)">加工(盛大-工厂)</el-dropdown-item>
										<el-dropdown-item v-if="row.contract_type == 'DIS' && row.contract_actual_supply_title_name != row.contract_supply_title_name && row.contract_supply_title_name=='江苏国泰盛大贸易有限公司'" @click.native="print(row,10)">加工(盛大-工厂-附件)</el-dropdown-item>

										<el-dropdown-item v-if="row.contract_type == 'DIS' && row.contract_actual_supply_title_name != row.contract_supply_title_name && row.contract_supply_title_name=='张家港保税区盛融贸易有限公司'" @click.native="print(row,11)">成品采购(华盛-盛融)</el-dropdown-item>
										<el-dropdown-item v-if="row.contract_type == 'DIS' && row.contract_actual_supply_title_name != row.contract_supply_title_name && row.contract_supply_title_name=='张家港保税区盛融贸易有限公司'" @click.native="print(row,12)">成品采购(华盛-盛融-附件)</el-dropdown-item>
										<el-dropdown-item v-if="row.contract_type == 'DIS' && row.contract_actual_supply_title_name != row.contract_supply_title_name && row.contract_supply_title_name=='张家港保税区盛融贸易有限公司'" @click.native="print(row,13)">加工(盛融-工厂)</el-dropdown-item>
										<el-dropdown-item v-if="row.contract_type == 'DIS' && row.contract_actual_supply_title_name != row.contract_supply_title_name && row.contract_supply_title_name=='张家港保税区盛融贸易有限公司'" @click.native="print(row,14)">加工(盛融-工厂-附件)</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
						</template>
					</vxe-table-column>
                </vxe-table>
			</div>
		</div>
		<!-- 采购合同编辑 -->
		<contract_purchase_edit v-if="modalContractPP" :show.sync="modalContractPP"  :contract_id="contract_id" @afterSavePurContract="savePurContract()"></contract_purchase_edit>
		 <!-- 加工合同编辑 -->
		<contract_process_edit v-if="modalContractPU" :show.sync="modalContractPU"  :contract_id="contract_id" @afterSaveProContract="saveProContract()"></contract_process_edit>

		<!-- 合同变更页面 -->
		<contract_change_edit v-if="changeModel" @changeAfter="changeModel = false;refresh()" :show.sync="changeModel" :contract_id="contract_id"></contract_change_edit>
	</div>
</template>

<script>
	import contract_purchase_edit from '@/pages/order/order_detail/contract_purchase_edit';
	import contract_process_edit from '@/pages/order/order_detail/contract_process_edit';
	import contract_change_edit from '@/pages/order/order_detail/contract_change_edit';
	import purchaseApi from "@/api/cbs/purchase.js";
    export default {
        components: {
			contract_purchase_edit,
			contract_process_edit,
			contract_change_edit
        },
        props: {
			orderData:Object,
			contarctList:Array,
			allCus:Array,
        },
        created() {
        },
        data() {
            return {
				modalContractPP:false,
				modalContractPU:false,
				contract_id:"", 
				changeModel:false,
				baseInfo:{},
				detailInfo:[],
            }
        },

        watch: {
            
        },
        methods: {
			//编辑
           	edit(row){
				if(row.contract_category=="process"){
					this.modalContractPU=true
				}else if(row.contract_category=="purchase"){
					this.modalContractPP=true
				}
				this.contract_id=row.contract_id
			},
		   	handleToDetail(row){
				if(row.contract_category == 'process'){
					this.$router.push({
						path: "/process_detail",
						query: {
							id:row.contract_id
						},
					});
				}else{
					this.$router.push({
						path: "/purchase_detail",
						query: {
							id:row.contract_id
						},
					});
				}
				
			},

		   //删除
		   del(row){
			   //删除接口
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
		   //打印
		   print(row,type){
			   if(row.contract_category=="purchase"){
				   if(type==1){
					   if(row.contract_state==2 && row.contract_state_aprv==1){
							window.open('/#/order_purchase_contract_print?contract_id='+row.contract_id+'&flag=approve');
						}else{
							window.open('/#/order_purchase_contract_print?contract_id='+row.contract_id+'&flag=print');
						}
				   }else{
					   window.open('/#/order_purchase_contract_attach_print?contract_id='+row.contract_id+'&flag=print');
				   }
						
			   }
			   else if(row.contract_category=="process"){
				   	if(type==1){
						if(row.contract_state==2 && row.contract_state_aprv==1){
							window.open('/#/order_process_contract_print?contract_id='+row.contract_id+'&flag=approve');
						}else{
							window.open('/#/order_process_contract_print?contract_id='+row.contract_id+'&flag=print');
						}
					}else if(type==2){
						window.open('/#/order_process_contract_attach_print?contract_id='+row.contract_id+'&flag=print');
					}else if(type==3){
						window.open('/#/order_process_contract_print?contract_id='+row.contract_id+'&flag=print'+'&type='+type);
					}else if(type==4){
						window.open('/#/order_process_contract_print_new?contract_id='+row.contract_id+'&flag=print'+'&type='+type);
					}else if(type==5){
						window.open('/#/order_process_contract_print_new?contract_id='+row.contract_id+'&flag=print'+'&type='+type);
					}else if(type==6){
						window.open('/#/order_process_contract_print?contract_id='+row.contract_id+'&flag=print'+'&type='+type);
					}else if(type==7){
						window.open('/#/order_process_contract_attach_print?contract_id='+row.contract_id+'&flag=print'+'&type=6');
					}else if(type==8){
						window.open('/#/order_process_contract_attach_print?contract_id='+row.contract_id+'&flag=print'+'&type=3');
					}else if(type==9){
						window.open('/#/order_process_contract_attach_print_new?contract_id='+row.contract_id+'&flag=print'+'&type=4');
					}else if(type==10){
						window.open('/#/order_process_contract_attach_print_new?contract_id='+row.contract_id+'&flag=print'+'&type=5');
					}else if(type == 11){
                        window.open('/#/order_process_contract_print_new?contract_id='+row.contract_id+'&flag=print'+'&type='+type);
                    }else if(type == 12){
                        window.open('/#/order_process_contract_attach_print_new?contract_id='+row.contract_id+'&flag=print'+'&type=11');
                    }else if(type == 13){
                        window.open('/#/order_process_contract_print_new?contract_id='+row.contract_id+'&flag=print'+'&type='+type);
                    }else if(type == 14){
                        window.open('/#/order_process_contract_attach_print_new?contract_id='+row.contract_id+'&flag=print'+'&type=13');
                    }
				   	
			   }
		   },
			 
		   //发布
		   async publishContract(row){
			 
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
		   async withdrawContract(row){
			   await purchaseApi.contractWithdraw(row.contract_id).then((res)=>{
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
		   	changeContract(row){
				this.changeModel=true
				this.contract_id=row.contract_id
		   	},

			//同步
			syncContract(row){
				this.$confirm("确定要同步该合同审批记录吗?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						purchaseApi.syncContractAudingRecord(row.contract_id).then((result) => {
							if(result.code == 0){
								this.$message({
									type: "success",
									message: "同步成功!",
								});
							}
							this.refresh()
						})
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消同步",
						});
					});
			},

			saveProContract(){
				this.refresh()
			},

			savePurContract(){
				this.refresh()
			},

			//刷新
			refresh(){
				this.$emit('refresh',2);
			},
        }
    }
</script>