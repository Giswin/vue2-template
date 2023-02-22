<style scoped lang="scss">

</style>
<template>
	<vxe-modal ref="modal1" :value="show" :showFooter="true" width="1140" height="680" transfer resize remember :mask-closable="false">
        <div slot="header">
			<span class="vxe-modal--title">商品明细-增加</span>
			<i title="最大化" class="vxe-modal--zoom-btn trigger--btn vxe-icon--square" v-show="downIcon" @click="trigger_btn"></i>
			<i title="还原" class="vxe-modal--zoom-btn trigger--btn vxe-icon--zoomout" v-show="!downIcon" @click="trigger_btn"></i>
			<i title="关闭" class="vxe-modal--close-btn trigger--btn vxe-icon--close" @click="() => this.$emit('update:show', false)" ></i>
		</div>
        <el-row>
			<div style="padding-top: 10px;">
				<div class="class-title">
					<div class="title">成本明细</div>
				</div>
				<div>
					<vxe-table ref="bomTable" border resizable :data="contractBom" size="small" auto-resize :column-config="{minWidth:100}" class="checkbox-table"
					 highlight-current-row highlight-hover-row :checkbox-config="{trigger: 'row'}">
						<vxe-table-column type="checkbox" align="center" width="40" ></vxe-table-column>
						<vxe-table-column type="seq" title="序号" width="40" align="center" ></vxe-table-column>
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
						<vxe-table-column field="order_goods_bom_price" title="单价" width="70" header-align="center" align="right" ></vxe-table-column>
						<vxe-table-column field="order_goods_bom_amount" title="金额" width="100" header-align="center" align="right" formatter="formatAmount"></vxe-table-column>
						<vxe-table-column field="order_goods_bom_ven_name" title="供应商" width="140" header-align="center" align="left"></vxe-table-column>
						<vxe-table-column field="order_goods_bom_ready_qty" title="已采购数量"  header-align="center" align="right" formatter="formatAmount"></vxe-table-column>
					</vxe-table>
				</div>
			</div>
		</el-row>
        <div slot="footer">
            <el-button size="small" @click="() => this.$emit('update:show', false)">取消</el-button>
			<el-button size="small" @click="confirm">确认</el-button>
		</div>
	</vxe-modal>
</template>

<script>
import orderApi from '@/api/cbs/order.js'

export default {
	components: {
	},
	props: {
		show: Boolean,
        orderBom:Array,
		goodsInfo:Array,
		contractType:String,
		order_id:Number,
	},
	data() {
		return {
            downIcon: true,
            contractBom:[],
			typeOptions:[],
		};
	},
	created() {
	    console.log("🚀 ~ file: bom_detail.vue:70 ~ created ~ this.orderBom", this.orderBom)
	    this.initData();
	},
	methods: {
		//获取订单成本数据
		initData(){
			this.getBomType()
			if(this.orderBom){
				this.orderBom.forEach(item => {
					if(this.contractType=='purchase'){
						let purchaseType=["01","02","06","09"]
						purchaseType.forEach(index => {
							if(item.order_goods_bom_type==index){	
								this.contractBom.push(item)
							}
						});
					}else{
						let purchaseType=["31","32"]
						purchaseType.forEach(index => {
							if(item.order_goods_bom_type==index){	
								this.contractBom.push(item)
							}
						});
					}
				});
			}else{
				orderApi.getOrderDetail(this.order_id).then((result) => {
					if(result.code == 0){
						let orderBom = result.data.bomInfo || []
						orderBom.forEach(item => {
							if(this.contractType=='purchase'){
								let purchaseType=["01","02","06","09"]
								purchaseType.forEach(index => {
									if(item.order_goods_bom_type==index){	
										this.contractBom.push(item)
									}
								});
							}else{
								let purchaseType=["31","32"]
								purchaseType.forEach(index => {
									if(item.order_goods_bom_type==index){	
										this.contractBom.push(item)
									}
								});
							}
						});
					}
				})
			}
				
		},

		// 备货类型
		async getBomType() {
			let data = await this.$dmBaseSet.getOptions();
			this.typeOptions = data.TY_PREPARE_MODE.option_value;
		},

		//页面大小窗切换
        trigger_btn(index) {
            this.$refs.modal1.zoom();
            this.downIcon = !this.downIcon;
        },

		//已选数据
        checkedData(){
			this.goodsInfo.forEach(item => {
				this.contractBom.forEach(index => {
					if(item.contract_detail_order_goods_bom_id==index.order_goods_bom_id){
						this.$refs.bomTable.toggleCheckboxRow(index)
					}
				});
			});
        },

		//选择确认
		confirm(){
			let selectRecords = this.$refs.bomTable.getCheckboxRecords();
			if (selectRecords.length > 0) {
				let goods_type=[]
				let order_ven=[]
				let order_qty=0
				selectRecords.forEach(item => {
					goods_type.push(item.order_goods_bom_type)
					order_ven.push(item.order_goods_bom_ven_name)
					if(parseInt(item.order_goods_bom_ready_qty )>parseInt(item.order_goods_bom_qty)){
						order_qty=order_qty+1
					}
				});
				goods_type = Array.from(new Set(goods_type))
				order_ven = Array.from(new Set(order_ven))
				if(goods_type.length==1){
					if(order_ven.length==1){
						this.$emit("getSelectBom",selectRecords)
						this.$emit('update:show', false)
					}else{
						this.$XModal.alert({
							message: '供应商不同！请重新选择！！',
							status: 'warning'
						});
					}
				}else{
					this.$XModal.alert({
						message: '不同类型不能生成到一张合同上！请重新选择！！',
						status: 'warning'
					});
				}
			} else {
				this.$XModal.alert({
					message: '请选择明细！',
					status: 'warning'
				});
			}
        },
		
	},
	 watch: {
        contractBom: function() {
            this.$nextTick(() => { 
                this.checkedData()
            });
        }
    },
};
</script>