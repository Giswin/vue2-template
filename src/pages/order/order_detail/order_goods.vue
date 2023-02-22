<style scoped lang="scss">
//特殊样式，而不通用请在这里写样式
</style>
<template>
    <div>
		<el-row>
			<div class="class-title">
				<div class="title">销售明细</div>
			</div>
			<div>
				<vxe-table border resizable :data="orderDetail" size="small" auto-resize :column-config="{minWidth:90}"
					class="mytable-scrollbar" highlight-current-row highlight-hover-row>
					<vxe-table-column type="seq" title="序号" width="50" align="center"></vxe-table-column>
					<vxe-table-column field="order_goods_pic_url" title="图片" width="140" header-align="center">
						<template v-slot="{ row }">
							<el-image v-show="(row.order_goods_pic_url||'')!=''"
								style="width: 50px; height: 50px"
								:src="row.order_goods_pic_url" 
								:preview-src-list="row.order_goods_pic_list"
								>
							</el-image>
						</template>
					</vxe-table-column>
					<vxe-table-column field="order_goods_article_number" title="货号" width="80" align="center"></vxe-table-column>
					<vxe-table-column field="order_goods_name" title="订单品名" width="100" header-align="center" align="left"></vxe-table-column>
					<vxe-table-column field="order_goods_spec" title="订单规格" width="100" header-align="center" align="left"></vxe-table-column>
					<vxe-table-column field="order_goods_qty" title="数量" width="100" header-align="center" align="right" formatter="formatAmount"></vxe-table-column>
					<vxe-table-column field="order_goods_unit" title="单位" width="60" header-align="center" align="center"></vxe-table-column>
					<vxe-table-column field="order_goods_price" title="销售价" width="100" header-align="center" align="right" ></vxe-table-column>
					<vxe-table-column field="order_goods_amount" title="销售小计" width="100" header-align="center" align="right" formatter="formatAmount"></vxe-table-column>
					<vxe-table-column field="order_goods_delivery_date" title="交货期" width="100" header-align="center" align="left"></vxe-table-column>
					<vxe-table-column field="order_goods_price_p" title="预计成本单价"  header-align="center" align="right" formatter="formatAmount"></vxe-table-column>
				</vxe-table>
			</div>
		</el-row>
		<el-row>
			<div style="padding-top: 30px;">
				<div class="class-title">
					<div class="title">成本明细</div>
					<div class="class-r">
						<el-button size="mini" v-if="orderData.order_state_aprv == 2" @click="setVender()">批量设置</el-button>
						<el-button size="mini" v-if="orderData.order_state_aprv == 2" @click="contractEdit(0)">生成加工合同</el-button>
						<el-button size="mini" v-if="orderData.order_state_aprv == 2" @click="contractEdit(1)">生成采购合同</el-button>
					</div>
				</div>
				<div>
					<vxe-table ref="costTable" border resizable :data="orderBom" size="small" auto-resize :column-config="{minWidth:90}" show-footer
					:footer-method="footerMethod" class="vxe-table-scrollbar" highlight-current-row highlight-hover-row>
						<vxe-table-column type="checkbox"  align="center" width="40" fixed="left"></vxe-table-column>
						<vxe-table-column type="seq" title="序号" width="40" align="center" fixed="left"></vxe-table-column>
						<vxe-table-column field="order_goods_bom_type" title="备货类型" width="80" header-align="center" align="left">
							<template v-slot="{row}">
								<span v-for="(item, index) in typeOptions" :key="index" v-if="row.order_goods_bom_type == item.value">{{item.label}}</span>
							</template>
						</vxe-table-column>
						<vxe-table-column field="order_goods_bom_article_number" title="采购货号" width="80" align="center"></vxe-table-column>
						<vxe-table-column field="order_goods_bom_name" title="采购品名" width="100" header-align="center" align="left"></vxe-table-column>
						<vxe-table-column field="order_goods_bom_spec" title="采购规格" width="100" header-align="center" align="left"></vxe-table-column>
						<vxe-table-column field="order_goods_bom_qty" title="采购数量" width="80" header-align="center" align="right" formatter="formatAmount"></vxe-table-column>
						<vxe-table-column field="order_goods_bom_unit" title="单位" width="60" header-align="center" align="center"></vxe-table-column>
						<vxe-table-column field="order_goods_bom_currency" title="币种" width="60" header-align="center"></vxe-table-column>
						<vxe-table-column field="order_goods_bom_price" title="单价" width="70" header-align="center" align="right"></vxe-table-column>
						<vxe-table-column field="order_goods_bom_amount" title="金额" width="100" header-align="center" align="right" formatter="formatAmount"></vxe-table-column>
						<vxe-table-column field="order_goods_bom_ven_name" title="供应商" width="140" header-align="center" align="left"></vxe-table-column>
						<vxe-table-column field="order_goods_bom_ready_qty" title="已采购数量"  header-align="center" align="right" formatter="formatAmount"></vxe-table-column>
					</vxe-table>
				</div>
			</div>
		</el-row>
        <!-- 采购合同编辑 -->
		<contract_purchase_edit v-if="modalContractPP" :show.sync="modalContractPP"  :goodsInfo="goodsInfo" :orderData="orderData" :orderBom="orderBom" @afterSavePurContract="savePurContract()"></contract_purchase_edit>
		 <!-- 加工合同编辑 -->
		<contract_process_edit v-if="modalContractPU" :show.sync="modalContractPU"  :goodsInfo="goodsInfo" :orderData="orderData" :orderBom="orderBom" @afterSaveProContract="saveProContract()"></contract_process_edit>
		<plset  :show.sync="modalSetVen" @aftersave="savebomVen" :Data="setData"></plset>
	</div>
</template>

<script>
    import contract_purchase_edit from '@/pages/order/order_detail/contract_purchase_edit';
	import contract_process_edit from '@/pages/order/order_detail/contract_process_edit';
	import plset from '@/pages/order/order_detail/plset.vue';
	import orderApi from '@/api/cbs/order.js'

    export default {
        components: {
            contract_purchase_edit,
			contract_process_edit,
			plset,
        },
        props: {
            orderDetail:Array,
			orderBom: Array,
			orderData:Object,
        },
        created() {
			this.init()
        },
        data() {
            return {
                modalContractPP:false,
				modalContractPU:false,
				modalSetVen:false,
				goodsInfo:[],
				typeOptions:[],
				setData:[],
				selectBomIds:[],
            }
        },

        watch: {
            
        },
        methods: {
			init(){
				let picList=[]
				for(let i=0;i<this.orderDetail.length;i++){
					picList.push(this.orderDetail[i].order_goods_pic_url)
					this.orderDetail[i].order_goods_pic_list=picList
					this.orderDetail[i].order_goods_delivery_date=this.orderData.order_delivery_date
					picList=[]
				}
				this.getBomType()
			},

			setVender(){
				let selectRecords = this.$refs.costTable.getCheckboxRecords();
				selectRecords.forEach(item => {
					this.selectBomIds.push(item.order_goods_bom_id)
				});
				this.setData=[]
				if(selectRecords.length>0){
					this.modalSetVen = true
					this.setData.push({
						label:'供应商',
						type:'ven',
						bset:true,
						value_id :'',
						value:'',
						value_a:'',
					})
				}else{
					this.$XModal.alert({ message: '请选择明细！', status: 'warning' })
					return
				}
			},

			savebomVen(data){
				this.modalSetVen = false
				orderApi.setBomVender(this.selectBomIds,data[0].value_id,data[0].value).then((res)=>{
					if(res.code==0){
						this.$message({
							type: "success",
							message: "设置成功!",
						});
						this.refresh()
					}else{
						this.$message({
							type: "error",
							message: "设置失败!",
						});
					}
				})
				
			},

			//创建合同
            contractEdit(id){
				if(this.orderData.order_project_code==null){
					this.$alert('请先获取项目号！', '错误提示', {
						confirmButtonText: '确定',
						type:"warning"
					});
				}else{
					let selectRecords = this.$refs.costTable.getCheckboxRecords();
					if (selectRecords.length > 0) {
						let goods_type=[]
						let order_ven=[]
						let order_qty=0
						selectRecords.forEach(item => {
							goods_type.push(item.order_goods_bom_type)
							order_ven.push(item.order_goods_bom_ven_name)
							if(parseInt(item.order_goods_bom_ready_qty )>parseInt(item.order_goods_bom_qty)){
								order_qty=order_qty+1
								item.order_goods_bom_qty=0
							}
						});
						this.goodsInfo=selectRecords
						goods_type = Array.from(new Set(goods_type))
						order_ven = Array.from(new Set(order_ven))
						if(goods_type.length==1){
							if(id==1){
								let purchaseType=["01","02","06","09"]
								let purchase=false
								for(let i=0;i<purchaseType.length;i++){
									if(goods_type[0]==purchaseType[i]){
										purchase=true
										if(order_qty!=0){
											this.$confirm("部分BOM已超量采购,确认要生成?", "消息提示", {
												confirmButtonText: "确定",
												cancelButtonText: "取消",
												type: "warning",
											})
											.then(() => {
												this.modalContractPP=true
											})
											.catch(() => {
												this.$message({
													type: "info",
													message: "已取消",
												});
											});
										}else if(order_ven.length>1){
											this.$XModal.alert({
												message: '供应商不一致! 请重新选择！',
												status: 'warning'
											});
											
										}else{
											this.modalContractPP=true
										}
									}
										
								}
								if(purchase==false){
									this.$XModal.alert({
										message: '备货类型错误，请重新选择！',
										status: 'warning'
									});
								}
								
									
							}
							else{
								let processType=["31","32"]
								let process=false
								for(let i=0;i<processType.length;i++){
									if(goods_type[0]==processType[i]){
										process=true
										if(order_qty!=0){
											this.$confirm("部分BOM已超量采购,确认要生成?", "消息提示", {
												confirmButtonText: "确定",
												cancelButtonText: "取消",
												type: "warning",
											})
											.then(() => {
												this.modalContractPU=true
											})
											.catch(() => {
												this.$message({
													type: "info",
													message: "已取消",
												});
											});
										}else if(order_ven.length>1){
											this.$XModal.alert({
												message: '供应商不一致! 请重新选择！',
												status: 'warning'
											});
										}else{
											this.modalContractPU=true
										}
										
									}
								}
								if(process==false){
									this.$XModal.alert({
										message: '备货类型错误，请重新选择！',
										status: 'warning'
									});
								}
							}
						}else{
							this.$XModal.alert({
								message: '不同类型不能生成到一张合同上！',
								status: 'warning'
							});
						}
					} else {
						this.$XModal.alert({
							message: '请选择明细！',
							status: 'warning'
						});
					}
				}
					
            },

			// 备货类型
			async getBomType() {
				let data = await this.$dmBaseSet.getOptions();
				this.typeOptions = data.TY_PREPARE_MODE.option_value;
			},

			saveProContract(){
				this.refresh()
			},

			savePurContract(){
				this.refresh()
			},

			refresh(){
				this.$emit('refresh',1);
			},

			//合计
            footerMethod({
				columns,
				data
			}) {
				return [
					columns.map((column, columnIndex) => {
						if (columnIndex === 2) {
							return '合计'
						}
						if (['order_goods_bom_quota_qty'].includes(column.property)) {
							let value = this.$XEUtils.sum(data, column.property)
							return this.$general.transform(value, 0)
						}
						if (['order_goods_bom_amount'].includes(column.property)) {
							let value = this.$XEUtils.sum(data, column.property)
							return this.$general.transform(value, 2)
						}
						return ''
					})
				]
			},
        }
    }
</script>


