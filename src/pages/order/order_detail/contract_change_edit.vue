<style scoped lang="scss">
//特殊样式，而不通用请在这里写样式
</style>
<template>
	<vxe-modal ref="model1" :value="show" width="600" resize height="280" show-footer destroy-on-close>
		<template v-slot:header>
		    合同变更申请
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
		<div>
			<div style="padding-top: 10px;">
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
					<tbody>
						<tr>
							<th align="center" width="90">变更内容说明</th>
							<td style="height: 130px;">
								<el-input
								  type="textarea"
								  :rows="4"
								  placeholder="请输入内容"
								  v-model="change_reason">
								</el-input>
							</td>
						</tr>
					</tbody>		
				</table>			
			</div>
		</div>	
		
		<template v-slot:footer>
			<div class="m-r">
				<el-button type="submit" @click="contractChange" size="small">确定</el-button>
				<el-button type="submit" @click="$emit('update:show',false)" size="small">取消</el-button>
			</div>
		</template>	
	</vxe-modal>
</template>

<script>
	import purchaseApi from '@/api/cbs/purchase.js'
	export default {
	    props: {
			show: Boolean,
			contract_id: {
				type: Number,
				default: null,
			},
	    },
		created() {
			//this.initData();
		
		},
	    data() {
	        return {
				selectTab:0,
				showview: false,
				downIcon: true,
				change_reason:'',
			}
		},
		methods:{
			//页面窗口大小切换
			screen(){
				this.$refs.model1.zoom()
				this.downIcon = !this.downIcon;
			},

			//关闭页面
			closeModel(){
				this.$emit('update:show',false);
			},

			//合同变更
			contractChange(){
				purchaseApi.contractChange(this.contract_id,this.change_reason).then((res)=>{
					if(res.code == 0){
						this.$emit('changeAfter',{});
						this.$message({
							message: '变更成功!',
							type: 'success'
						});
					}else{
						this.$message({
							message: res.msg+'变更失败！',
							type: 'error'
						});
					}
				})
			}
			
		},
		watch:{
			
		}
	}
</script>