<style scoped lang="scss">
.approve-wrapper{
	background: #fff;
	position: fixed;
	bottom: 0px;
	left: 0px;
	right: 0px;
	height:130px;
	z-index: 9;
	box-shadow: 0px 2px 5px 3px #ddd;
	&-body{
		width: 920px;
		margin: auto;
		padding: 20px 0px;
		position: relative;
		display: flex;
		&-textarea{
			flex: 1;
			.ic-title{
				border-left: 8px solid #d5232f;
				line-height: 13px;
				padding-left: 8px;
			}
			>>>{
				.vxe-textarea--inner{
					border: 1px solid #555;
				}
			}
		}	
		&-op{
			width: 120px;
			padding-left: 20px;
			padding-top: 40px;
		}
		.icon{
			position: absolute;
			top:5px;
			right:10px;
			font-size: 20px;
			cursor: pointer;
			color:#409EFF;
			.approve-record{
				font-size: 14px;
				color: #555;
				position: absolute;
				bottom:20px;
				right: 0px;
				background: #fff;
				padding: 15px;
				border: 1px solid #ddd;
				border-radius: 5px;
				width: 360px;
				.ic-title{
					border-left: 8px solid #d5232f;
					line-height: 13px;
					padding-left: 8px;
				}
			}
		}
	}
}

</style>
<template>	
	<div class="approve-wrapper">
		<div class="approve-wrapper-body">
			<div class="icon" @mouseenter="enter" @mouseleave="leave">
				<i class="vxe-icon--info"></i>
				<div class="approve-record" v-show="seen">
					<div class="ic-title">
						<b>审批记录</b>
					</div>
					<div class="of" style="max-height: 230px;padding-top: 10px;">
						<el-row style="border-bottom: 1px solid #ddd;line-height: 30px;" v-for="item in RecordDatalist" v-if="(item.wfr_op_id_e||'')!=''">
							<div class="m-l">{{item.wfr_op_name_e+' '+(item.wfr_op_result==1?'通过':'不通过')+' '+(item.wfr_memo || '')}}</div>
							<div class="m-r">{{item.wfr_op_time_e}}</div>
						</el-row>
					</div>
				</div>
			</div>
			<div class="approve-wrapper-body-textarea">
				<div class="ic-title">
					<b>审核审批意见</b>
				</div>
				<div style="margin-top: 10px;">
					<vxe-textarea type="textarea" v-model="curr_record.wfr_memo" style="height:47px;"></vxe-textarea>
				</div>
			</div>
			<div class="approve-wrapper-body-op">
				<vxe-button status="primary" size="small"  v-if="flag" @click="save_audit(1)">批准</vxe-button>
				<vxe-button size="small" v-if="flag" @click="save_audit(2)">拒绝</vxe-button>
			</div>
		</div>
	</div>
</template>

<script>
	import purchaseApi from '@/api/cbs/purchase.js'

	export default {
	    components: {
			
	    },
        props: {
            show: Boolean,
			wf_code:String,
			wfr_object_id:'',
			state:{
				type: String,
				default: '2',
			},
        },
	    data() {
	        return {
				curr_record:{
					wfr_op_result:'2',
					bEnd:0,
					wfr_memo:'',
				},
				flag:false,
				RecordDatalist:[],
				seen:false,
			}
		},
		created() {
            this.initData();
        },

		methods: {
			enter(){
				this.seen = true
			},
			leave(){
				this.seen = false
			},
			async initData() {
				await this.getFlowRecords();
			},

			//获取工作流
			async getFlowRecords(){
				await purchaseApi.getContractFlowList(this.wfr_object_id).then((result)=>{
					if(result.code == 0){
						this.RecordDatalist = result.data || [];
					}
					for (let i = this.RecordDatalist.length - 1;i >= 0;i--){
						if(this.RecordDatalist[i].wfr_state == 0 && !this.RecordDatalist[i].wfr_op_time_e){
							this.RecordDatalist.splice(i,1);
						}	
					}
					for(let n=0;n<this.RecordDatalist.length;n++){
						if(this.RecordDatalist[n].wfr_op_time_e != null){
							//this.Recordlist[n].wfr_op_time_e = this.Recordlist[n].wfr_op_time_e.substring(0,10);
						}
						if(this.RecordDatalist[n].wfr_op_id_p == this.$store.state.user.uid){
							if(n==this.RecordDatalist.length-1){
								this.bEnd=1;
							}
							if(this.RecordDatalist[n].wfr_state == 1){
								this.flag = true;
								this.rowIndex = n;
								this.curr_record = Object.assign({},this.RecordDatalist[n]);
								this.curr_record.wfr_op_result=1;
								this.curr_record.bEnd=1;
							}
						}
					}

				})
			},
			
			//执行审批
			async save_audit(flag){
				if(this.state == '2'){
					await purchaseApi.executeAprvContract(this.wfr_object_id,flag,this.curr_record.wfr_memo).then((result)=>{
						if(result.code == 0){
							this.$message({
								message: '更新成功',
								type: 'success'
							});
							this.$emit('after-save');

						}
					})
				}else{
					this.$message({
						message: '此单据状态为待发布，可能是相关人员发布后又撤销了。此单据当前无审批需求，请返回，并且关闭当前审批页面即可!',
						type: 'warring'
					});
				}

				
			},
			
		},
		watch:{
			show:{
				 handler(newVal) {
					 if(newVal==true && this.wf_code!=''){
						this.initData();
					 }
				}
			},
		}
	}
</script>

