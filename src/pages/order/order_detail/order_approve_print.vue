<style scoped lang="scss">
.approve-body{
	margin: auto;
	width:1020px;
	padding-bottom: 130px;
	.top-el-button{
		margin-top: 10px;
	}
	.modal-apv{
		border: 1px solid #333;
		background: #fff;
		margin-top: 10px;
		padding: 20px;
		box-sizing: border-box;
		.title{
			position: relative;
			text-align: center;
			border-bottom: 1px solid #333;
			padding-bottom: 10px;
			.apv-logo{
				position: absolute;
				top: 0px;
				left: 0px;
				img{
					height:20px;
				}
			}
			span.title-name{
				font-size:20px;
				text-align: center;
				font-weight: bold;
			}
			.apv-ewm{
				position: absolute;
				right: 60px;
				top: 0px;
				img{
					height: 50px;
				}
			}
			.apv-status{
				width: 50px;
				height: 50px;
				text-align: center;
				line-height: 50px;
				font-size: 14px;
				position: absolute;
				top: 0px;
				right: 0px;
			}
			.warning-b{
				background: $warning-color;
				color: #fff;
			}

			.error-b{
				background: $error-color;
				color: #fff;
			}

			.success-b{
				background: $success-color;
				color: #fff;
			}
		}
		.class-title{
			.title {
			    position: absolute;
			    top: -2px;
			    left: 0px;
			    font-weight: bold;
			    font-size: 14px;
			    border-bottom: 1px solid #333;
			    padding-left: 10px;
			    line-height: 22px;
				padding-bottom: 0px;
			}
		}
	}
}
table.definition{
	border-collapse:collapse;
	border:1px solid #333;
}
table.definition tbody tr th{
	border:1px solid #333;
}
table.definition thead tr th{
	border:1px solid #333;
}
table.definition tbody tr td{
	border:1px solid #333;
}
table.definition tbody tr th span{
	color: red;
}
table.definition tfoot tr th{
	border:1px solid #333;
	padding:0px 5px;
	font-weight: normal;
}
table.definition tfoot tr td{
	border:1px solid #333;
	padding:0px 5px;
	height: 40px;
}
.style-img{
	margin-left: 8px;
	overflow: hidden;
	width: 100%;
	background: #f6f6f6;
	height: 187px;
	text-align: center;
	img{
		height: 187px;
	}
}
.main-col{
	border-radius: 5px;
	border: 1px solid #333;
	padding: 10px;
	.main-col-title{
		font-size: 16px;
	}
	.digital{
		text-align: center;
		font-weight: bold;
		color: red;
		font-size: 24px;
		margin-top:10px;
	}
}
>>>{
.vxe-table.border--full .vxe-body--column, .vxe-table.border--full .vxe-footer--column, .vxe-table.border--full .vxe-header--column{background-image: -webkit-gradient(linear,left top, left bottom,from(#333),to(#333)),-webkit-gradient(linear,left top, left bottom,from(#333),to(#333));  background-image: linear-gradient(#333,#333),linear-gradient(#333,#333);}
.vxe-table .vxe-table--border-line:before{border-left: 1px solid #333;}
.vxe-table .vxe-table--border-line:after{border-right: 1px solid #333;}
.vxe-table:after { bottom: 0; border-bottom: 1px solid #333;}
.vxe-table:before { bottom: 0; border-top: 1px solid #333;}
.vxe-table .vxe-body--x-space{border-bottom: 1px solid #333;}
.vxe-table .vxe-table--header-wrapper .vxe-table--header-border-line{border-bottom: 1px solid #333;}
.vxe-cell{color: #333;}
}
@media screen and (max-width:1200px) {
.approve-body{
	width: 100%;border:0px;padding: 10px 10px 140px 10px;color: #000;
	box-sizing: border-box;
	background: #fff;
	.modal-apv{
		border: 0px;
		padding: 0px;
		.title{padding-top:0px;text-align: right;line-height: 20px;}
	}
}	
.main-col{
	margin-bottom: 10px;
}
.none-me{display: none;}
.apv-logo{position: absolute; left:0px; top:0px;text-align: left;}
.apv-logo img{height:20px;}
.title-name{font-size:18px;}
.lg{width: 100%;}
.show-me{position: fixed;bottom:0px;left: 0px;width: 100%;z-index: 9;border-radius: 0px;height: 40px;}
.top-button{padding-bottom:0px;border-bottom:0px;background: #fff;font-weight: bold;}
.ivu-btn{height: 40px;}
.sy-col-span-5{
	width: 100%;
}
.sy-col-span-11{
	width: 100%;
}
.sy-col-span-8{
	width: 100%;
}
.sy-col-span-6{
	width: 100%;
}
}
.anchor-nav{
	position: fixed;
	top: 50px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	margin: auto;
	width: 1280px;
	.nav-approve{
		border-radius: 5px;
		background: #fff;
		padding: 10px;
		width:90px;
		a{
			line-height: 30px;
			display: block;
		}
		a:hover{
			background: #eee;
			padding-left: 5px;
		}
	}
	
}
</style>
<template>	
	<div>
		<div class="anchor-nav" v-if="print_flag == true">
			<div class="nav-approve">
				<a href="#approve1">基本信息</a>
				<a href="#approve2">评审信息</a>
				<a href="#approve3">预算信息</a>
				<a href="#approve4">销售明细</a>
				<a href="#approve5">成本明细</a>
				<a href="#approve6">合同信息</a>
			</div>
		</div>
		<div class="approve-body">
			<div class="top-el-button">
				<div class="m-r">
					<!-- <el-button size="small" v-if="flag == 'approve' && print_flag == true" @click="value1 = true">审批</el-button> -->
					<el-button size="small" class="none-me" style="margin-left: 10px;" v-if="print_flag == true" @click="doPrint()">打印</el-button>
					<el-button size="small" class="none-me" style="margin-left: 10px;" v-if="print_flag == true" @click="closePage()">关闭</el-button>
				</div>
				<div class="clear"></div>
			</div>
			<div class="modal-apv">
				<div class="title">
					<div class="apv-logo">
						<img src="../../../assets/gths-logo.jpg">
						<div>江苏国泰华盛实业有限公司</div>
					</div>
					<span class="title-name">订单预算表</span><br>
					<span style="font-weight: normal;">
						发布日期：{{orderData.order_publish_time}}
					</span>
					<div class="apv-ewm none-me">
						<img :src="$config.CLOUD_QRCODE+orderData.order_code" />
					</div>
					<div  @click="modalFlow = true" style="cursor:pointer">
						<div class="apv-status warning-b none-me" v-if="orderData.order_state == 2 && orderData.order_state_aprv == 1">待审</div>
						<div class="apv-status error-b none-me" v-if="orderData.order_state == 2 && orderData.order_state_aprv == 3">拒绝</div>
						<div class="apv-status success-b none-me" v-if="orderData.order_state == 2 && orderData.order_state_aprv == 2">已审核</div>
					</div>
				</div>
				<div style="padding-top: 30px;">
					<div class="class-title" id="approve1">
					    <div class="title">基本信息</div>
					</div>
					<el-row style="border-bottom: 1px dashed #ddd;padding: 10px 0;">
						<el-col :span="18" style="height: 25px;">客户：<span style="font-size:15px;"><b>{{orderData.order_cus_name}}</b></span></el-col>
						<el-col :span="6" style="height: 25px;">业务类型：<span style="font-size:15px;"><b>{{orderData.order_business_type}}</b></span></el-col>
					</el-row>
					<div style="padding-top:10px">
						<table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
							<tbody>
								<tr>
									<th width="120" align="left">业务部门</th>
									<td style="word-break: break-all;" width="200">{{orderData.order_dep_name}}</td>
									<th width="120" align="left">接单币种</th>
									<td width="200">{{orderData.order_currency}}</td>
									<th width="120" align="left">信用证号</th>
									<td>{{orderData.order_lc_no}}</td>
								</tr>
								<tr>
									<th align="left">业务员</th>
									<td>{{orderData.order_salesman_name}}</td>
									<th align="left">美元汇率</th>
									<td>{{orderData.order_ex_rate_usd}}</td>
									<th align="left">开证日期</th>
									<td>{{orderData.order_lc_issue_date}}</td>
								</tr>
								<tr>
									<th align="left">接单日期</th>
									<td>{{orderData.order_date}}</td>
									<th align="left">价格条款</th>
									<td>{{orderData.order_price_clause}}</td>
									<th align="left">开证银行</th>
									<td></td>
								</tr>	
								<tr>
									<th align="left">接单抬头</th>
									<td>{{orderData.order_title_name}}</td>
									<th align="left">结算方式</th>
									<td>{{orderData.order_collect_mode}} {{orderData.order_collect_days}} 天</td>
									<th align="left">起运港</th>
									<td>{{orderData.order_port_from}}</td>
								</tr>	
								<tr>
									<th align="left">PI/PO</th>
									<td>{{orderData.order_cus_od_code}}</td>
									<th align="left">运输方式</th>
									<td>{{orderData.order_shipping_mode}}</td>
									<th align="left">目的港</th>
									<td>{{orderData.order_port_to}}</td>
								</tr>	
							</tbody>
						</table>
					</div>
					<el-row :gutter="0" style="top:-1px">
						<table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition" >
							<tbody>
								<tr>
									<th align="left" width="120" >订单备注</th>
									<td>
										{{orderData.order_memo}}
									</td>
								</tr>
							</tbody>		
						</table>
					</el-row>
				</div>
				<div style="padding-top: 30px;">
					<div class="class-title" id="approve2">
					    <div class="title">评审信息</div>
					</div>
					<el-row :gutter="20">
						<el-col :span="8">
							<el-row style="border: 1px solid #000; padding:15px; text-align: center;">
								<div>订单金额</div>
								<div style="font-size:20px;font-weight: bold;color: red;">{{orderData.order_currency}} {{$general.transform(orderData.order_amount_oc || 0)}}</div>
							</el-row>
						</el-col>
						<el-col :span="8">
							<el-row style="border: 1px solid #000; padding:15px; text-align: center;">
								<div>毛利润</div>
								<div style="font-size:20px;font-weight: bold;color: red;">{{$general.transform(orderData.order_profit || 0)}}</div>
							</el-row>
						</el-col>
						<el-col :span="8">
							<el-row style="border: 1px solid #000; padding:15px; text-align: center;">
								<div>毛利率 %</div>
								<div style="font-size:20px;font-weight: bold;color: red;">{{$general.transform(orderData.order_profit_rate || 0)}}</div>
							</el-row>
						</el-col>
					</el-row>
					<el-row style="padding-top: 20px;" :gutter="20" v-if="orderData.order_version > 1">
						<el-col :span="8">
							<div class="main-col">
								<div style="font-size: 12px;">
									<template v-if="orderData.order_version > 1 && historyInfo.length > 0">
										<template v-for="(item,key) in historyInfo">
											<template v-if="(key == 0 || item.baseInfo.order_version == 1)">
												<div>
													<template v-if="historyInfo.length == 1">
														上一版(V{{item.baseInfo.order_version}})
													</template>
													<template v-else>
														{{item.baseInfo.order_version == 1 ? '第一版(V1)' : (orderData.order_version - item.baseInfo.order_version == 1 ? '上一版(V'+item.baseInfo.order_version+')' : '第'+'版') }} : 
													</template>
													{{$general.transform(item.baseInfo.order_amount_oc || 0)}} 
													<span :style="{'color': (orderData.order_amount_oc - item.baseInfo.order_amount_oc) == 0 ? '' : ((orderData.order_amount_oc - item.baseInfo.order_amount_oc) > 0 ? 'red' : 'green')}">
														{{(orderData.order_amount_oc - item.baseInfo.order_amount_oc) == 0 ? ' &nbsp;&nbsp;↑ ' : ((orderData.order_amount_oc - item.baseInfo.order_amount_oc) > 0 ? ' &nbsp;&nbsp;↑ ' : ' &nbsp;&nbsp;↓ ')}}
														{{$general.transform(Math.abs(orderData.order_amount_oc - item.baseInfo.order_amount_oc) || 0)}}
													</span>
												</div>
											</template>
										</template>
									</template>
								</div>
							</div>
						</el-col>	
						<el-col :span="8">
							<div class="main-col">
								<div style="font-size: 12px;">
									<template v-if="orderData.order_version > 1 && historyInfo.length > 0">
										<template v-for="(item,key) in historyInfo">
											<template v-if="(key == 0 || item.baseInfo.order_version == 1)">
												<div>
													<template v-if="historyInfo.length == 1">
														上一版(V{{item.baseInfo.order_version}})
													</template>
													<template v-else>
														{{item.baseInfo.order_version == 1 ? '第一版(V1)' : (orderData.order_version - item.baseInfo.order_version == 1 ? '上一版(V'+item.baseInfo.order_version+')' : '第'+'版') }} : 
													</template>
													{{$general.transform(item.baseInfo.order_profit || 0)}} 
													<span :style="{'color': (orderData.order_profit - item.baseInfo.order_profit) == 0 ? '' : ((orderData.order_profit - item.baseInfo.order_profit) > 0 ? 'red' : 'green')}">
														{{((orderData.order_profit - item.baseInfo.order_profit) == 0 ? ' &nbsp;&nbsp;↑' : ((orderData.order_profit - item.baseInfo.order_profit) > 0 ? ' &nbsp;&nbsp;↑' : ' &nbsp;&nbsp;↓'))}}
														{{$general.transform(Math.abs(orderData.order_profit - item.baseInfo.order_profit) || 0)}}
													</span>
												</div>
											</template>
										</template>
									</template>
								</div>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="main-col">
								<div style="font-size: 12px;">
									<template v-if="orderData.order_version > 1 && historyInfo.length > 0">
										<template v-for="(item,key) in historyInfo">
											<template v-if="(key == 0 || item.baseInfo.order_version == 1)">
												<div>
													<template v-if="historyInfo.length == 1">
														上一版(V{{item.baseInfo.order_version}})
													</template>
													<template v-else>
														{{item.baseInfo.order_version == 1 ? '第一版(V1)' : (orderData.order_version - item.baseInfo.order_version == 1 ? '上一版(V'+item.baseInfo.order_version+')' : '第'+'版') }} : 
													</template>
													{{$general.transform(item.baseInfo.order_profit_rate || 0)}}
													<span :style="{'color': orderData.order_profit_rate - item.baseInfo.order_profit_rate == 0 ? '' :((orderData.order_profit_rate - item.baseInfo.order_profit_rate) > 0 ? 'red' : 'green')}">
														{{((orderData.order_profit_rate - item.baseInfo.order_profit_rate) == 0 ? ' &nbsp;&nbsp;↑' : ((orderData.order_profit_rate - item.baseInfo.order_profit_rate) > 0 ? ' &nbsp;&nbsp;↑' : ' &nbsp;&nbsp;↓'))}}
														{{$general.transform(Math.abs(orderData.order_profit_rate - item.baseInfo.order_profit_rate) || 0)}}
													</span>
												</div>
											</template>
										</template>
									</template>
								</div>
							</div>
						</el-col>
					</el-row>
				</div>	
				<div style="padding-top: 30px;">
					<div class="class-title" id="approve3">
					    <div class="title">预算信息</div>
					</div>
					<table width="100%" cellspacing="0" cellpadding="0" border="0" class="definition">
						<thead>
							<tr>
								<th width="60">序号</th>
								<th width="200">项目</th>
								<th width="80">币种/单位</th>
								<th width="180">当前预算-V{{orderData.order_version}}</th>
								<th>说明</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(index,key) in budgetInfo">
								<td align="center">{{key + 1}}</td>
								<td :style="{color: index.color ? 'red' : 'black'}">{{index.label}}</td>
								<td align="center">{{index.unit}}</td>
								<td :style="{color: index.color ? 'red' : 'black','background-color': (orderData.order_version > 1 ?(index.value!=null && index.value != $general.transform(index.history[0],2)?'yellow' : ''):'' )}" align="right">
									<el-tooltip v-if="orderData.order_version>1" placement="right">
									  <div slot="content">
										<div>预算版本-V{{orderData.order_version-1}} : {{$general.transform(index.history[0],2)}}</div>
									  </div>
										<p>{{index.value}}</p>
									</el-tooltip>
									<p v-else>{{index.value}}</p>
								</td>
								<td>{{index.memo}}</td>
							</tr>
						</tbody>
					</table>	
				</div>	
				<div style="padding-top: 30px;">
					<div class="class-title" id="approve4">
					    <div class="title">销售明细</div>
					</div>
					<div style="border:1px solid #333">
						<vxe-table border resizable :data="orderGoods" size="small" auto-resize :column-config="{minWidth:100}"
							class="mytable-scrollbar" highlight-current-row highlight-hover-row>
							<vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
							<vxe-table-column field="order_goods_pic_url" title="图片" width="120" header-align="center">
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
							<vxe-table-column field="order_goods_spec" title="订单规格" width="120" header-align="center" align="left"></vxe-table-column>
							<vxe-table-column field="order_goods_qty" title="数量" width="80" header-align="center" align="right" formatter="formatNumber"></vxe-table-column>
							<vxe-table-column field="order_goods_unit" title="单位" width="60" header-align="center" align="center"></vxe-table-column>
							<vxe-table-column field="order_goods_price" title="销售价" width="90" header-align="center" align="right" formatter="formatAmount"></vxe-table-column>
							<vxe-table-column field="order_goods_amount" title="销售小计" width="140" header-align="center" align="right" formatter="formatAmount"></vxe-table-column>
							<vxe-table-column field="order_goods_price_p" title="预计成本单价"  header-align="center" align="right" formatter="formatAmount"></vxe-table-column>
						</vxe-table>
					</div>
				</div>	
				<div style="padding-top: 30px;">
					<div class="class-title" id="approve5">
					    <div class="title">成本明细</div>
					</div>
					<div style="border:1px solid #333">
						<vxe-table ref="costTable" border resizable :data="orderBom" size="small" auto-resize :column-config="{minWidth:70}" show-footer
							:footer-method="footerMethod" class="vxe-table-scrollbar" highlight-current-row highlight-hover-row>
							<vxe-table-column type="seq" title="序号" width="40" align="center" fixed="left"></vxe-table-column>
							<vxe-table-column field="order_goods_bom_type" title="备货类型" width="80" header-align="center" align="left"></vxe-table-column>
							<vxe-table-column field="order_goods_bom_article_number" title="采购货号" width="80" align="center"></vxe-table-column>
							<vxe-table-column field="order_goods_bom_name" title="采购品名" width="100" header-align="center" align="left"></vxe-table-column>
							<vxe-table-column field="order_goods_bom_spec" title="采购规格" width="100" header-align="center" align="left"></vxe-table-column>
							<vxe-table-column field="order_goods_bom_qty" title="采购数量" width="80" header-align="center" align="right"></vxe-table-column>
							<vxe-table-column field="order_goods_bom_unit" title="单位" width="50" header-align="center" align="center"></vxe-table-column>
							<vxe-table-column field="order_goods_bom_currency" title="币种" width="50" header-align="center" align="center"></vxe-table-column>
							<vxe-table-column field="order_goods_bom_price" title="单价" width="70" header-align="center" align="right"></vxe-table-column>
							<vxe-table-column field="order_goods_bom_amount" title="金额" width="100" header-align="center" align="right" formatter="formatAmount"></vxe-table-column>
							<vxe-table-column field="order_goods_bom_ven_name" title="供应商" width="140" header-align="center" align="left"></vxe-table-column>
							<vxe-table-column field="order_goods_bom_ready_qty" title="已采购数量"  header-align="center" align="right" formatter="formatAmount"></vxe-table-column>
						</vxe-table>
					</div>
				</div>	
			</div>
			<div id="approve6">
				<ix_contract v-if="orderData.order_type=='TRADE'"></ix_contract>
				<ex_contract v-else></ex_contract>
			</div>
		</div>
		
		<approve_form v-show="flag == 'approve'" @after-save="fresh_apvstate" :state="orderData.order_state" :wf_code="$config.ORDER_AUDIT" :wfr_object_id='order_id' :show.sync="value1"></approve_form>
		
		<approve_flow :RecordDatalist="RecordDatalist" v-if="modalFlow" :show.sync="modalFlow"></approve_flow>
		
	</div>
</template>

<script>
	import orderApi from '@/api/cbs/order.js'
	import approve_form from '@/pages/order/order_detail/approve_form.vue';
	import approve_flow from '@/pages/order/order_detail/approve_flow.vue';
	import ex_contract from '@/pages/order/order_detail/order_ex_contract_print.vue';
	import ix_contract from '@/pages/order/order_detail/order_ix_contract_print.vue';
	 
	export default {
	    components: {
			approve_form,
			approve_flow,
			ex_contract,
			ix_contract
	    },
        props: {
            show: Boolean,
        },
	    data() {
	        return {
				value1:false,
				flag:this.$route.query.flag,
				modalFlow:false,
				print_flag:true,
				order_id:this.$route.query.order_id,
				orderData:{},
				orderBom:[],
				orderGoods:[],
				budgetInfo:[],
				historyInfo:[],
				RecordDatalist:[],
				typeOptions:[],
			}
		},
		created() {
			this.initData()		
		},
		beforeDestroy() {
			window.onbeforeunload = () => {};
		},
		methods: {
			initData(){
				this.flag = this.$route.query.flag;

				let picList=[]
				for(let i=0;i<this.orderGoods.length;i++){
					picList.push(this.orderGoods[i].order_goods_pic_url)
					this.orderGoods[i].order_goods_pic_list=picList
					picList=[]
				}
				this.getOrder();
				this.getFlowRecords()
			},

			//获取流程记录
			async getFlowRecords(){
				await orderApi.getOrderApprFlowList(this.order_id).then((result)=>{
					if(result.code == 0){
						let list = [];
						list = result.data || [];
						this.RecordDatalist = list
					}
					
				})
			},

			//刷新保存审批状态字段
			fresh_apvstate($event){
				//this.value1=false;
				// var msgData = { type: 'returnCallBack2' }
				// window.opener.postMessage(JSON.stringify(msgData), '*')
				window.opener=null;
				window.close()
			},

			//获取指定订单的相关信息
			async getOrder (){
				await orderApi.getOrderDetail(this.order_id).then((result)=>{
					if(result.code == 0){
						this.orderData  = result.data.baseInfo || [];
						this.orderGoods = result.data.goodsInfo || [];
						this.orderBom = result.data.bomInfo || []
						this.budgetInfo = result.data.budgetInfo || []
						if(this.orderData.order_version>1){
							this.budgetInfo.forEach(item => {
								if(item.label=="毛利率"){
									item.value = item.value.substr(0,item.value.length-1)
								}
							});
						}
						this.historyInfo = result.data.historyInfo || []
						if(this.orderData.order_state_aprv==2){
							this.flag='print'
						}
						this.getBomType()
					}
				})
			},

			// 备货类型
			async getBomType() {
				let data = await this.$dmBaseSet.getOptions();
				this.typeOptions = data.TY_PREPARE_MODE.option_value;
				this.orderBom.forEach(item => {
					this.typeOptions.forEach(index => {
						if(item.order_goods_bom_type==index.value){
							item.order_goods_bom_type=index.label
						}
					});
					
				});
			},
			
			//订单更新审核字段
			async changeOrderOdStateAprv (od_state_aprv){
				await omApi.changeOrderOdStateAprv(this.od_id,od_state_aprv)
			},
			
			//关闭
			closePage() {
				window.opener=null;
				window.close();
			},

			//打印
			doPrint (){
				this.print_flag = false;
				setTimeout(()=>{
					window.print();
					this.print_flag = true;
				},500)
			},

			//合计
			footerMethod({
				columns,
				data
			}) {
				return [
					columns.map((column, columnIndex) => {
						if (columnIndex === 1) {
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
		},
		watch:{
		},
	}
</script>

