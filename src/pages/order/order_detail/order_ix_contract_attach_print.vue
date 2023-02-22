<style scoped lang="scss">
.print-head{
	position: relative;
	.name{
		font-size:20px;
		text-align: center;
		font-weight: bold;
		padding-top:20px;
	}
	.title{
		font-size: 18px;
		text-align: center;
		font-weight: bold;
	}
	.address{
		font-size:14px;
		text-align: center;
	}
	.tel{
		font-size:14px;
		text-align: center;
	}
}
.print-title{
	position: relative;
	.name{
		font-size: 16px;
		font-weight: bold;
		text-align: center;
	}
	.look{
		
	}
}
.remarks{
	margin-top:10px;
	margin-bottom:10px;
	line-height: 16px;
}
.head-right{
	position: absolute;
	top:-18px;
	right: -15px;
	.img{
		float: left;
		img{
			width: 120px;
			height:120px;
		}
	}
	.sp{
		float: left;
		margin-left: 10px;
		height: 80px;
		width: 80px;
		text-align: center;
		line-height: 80px;
	}
}
.li-th{
	border-top: 1px solid #000;
	border-bottom: 1px solid #000;
	ul{
		li{
			text-align: center;
			line-height: 30px;
			float: left;
		}
	}
}
.li-td{
	ul{
		li{
			text-align: center;
			line-height: 30px;
			float: left;
		}
	}
}
.li-foot{
	border-top: 1px solid #000;
	border-bottom: 1px solid #000;
	ul{
		li{
			text-align: center;
			line-height: 30px;
			float: left;
		}
	}
}
.approve{
	position: absolute;
	top:40px;
	right:150px;
	font-size: 16px;
	border: 5px solid red;
	padding:3px 10px;
	transform:rotate(45deg);
	-ms-transform:rotate(45deg); 	/* IE 9 */
	-moz-transform:rotate(45deg); 	/* Firefox */
	-webkit-transform:rotate(45deg); /* Safari 和 Chrome */
	-o-transform:rotate(45deg);
}
</style>
<template>	
	<div >
		<div style="width:890px; margin: auto;padding-top: 10px; position: relative;" v-if="!printting">
			<div class="m-r">
				
			</div>
			<div class="clear"></div>
		</div>
		<div style="width:890px; min-height:1270px; position: relative; margin: auto; position: relative;background: #fff;padding: 20px;border: 1px solid #000;margin-top: 10px;color: #000;">
			<div v-if="orderData.order_state == 1 " class="approve">待发布</div>
			<div v-if="orderData.order_state == 2 && orderData.order_state_aprv == 1" class="approve">待审核</div>
			<div v-if="orderData.order_state == 2 && orderData.order_state_aprv == 3" class="approve">未通过</div>
			<div v-if="orderData.order_state_aprv == 2" class="approve">已审批</div>
			<table width="100%" cellspacing="0" cellpadding="0" border="0">
				<thead>
					<tr>
						<td>
							<div class="print-head">
								<div class="name">
									{{cbm_path == 'HS' ? '江苏国泰华盛实业有限公司' : '江苏国泰华盛实业（香港）有限公司'}}
									<div class="head-right">
										<div class="img">
											<img :src="`${$config.CLOUD_QRCODE}合同编号:${orderData.order_bms_code}
											版本号:${orderData.order_version} 
											交易方:${orderData.order_cus_name} 
											合同日期: ${orderData.order_date} 
											合同金额: ${sum.amount || 0} 
											审批人: ${RecordDatalist.wfr_op_name_e ? RecordDatalist.wfr_op_name_e : ''} 
											审批时间: ${RecordDatalist.wfr_op_time_e ? RecordDatalist.wfr_op_time_e : ''} 
											MOULD_CODE: cbm_ix_contract_attach 
											ID: ${orderData.order_bms_id}`"/>
										</div>
									</div>
								</div>
							</div>
							<div class="print-title">
								<div class="name">国内销售合同</div>
								<div class="look" style="padding-top: 30px;">
									<el-row>
										<el-col :span="13">
											<div style="line-height: 20px;">
												<ul>
													<li>
														<span style="letter-spacing:3.2px">甲&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方</span>：{{orderData.order_cus_name}}
													</li>
													<li>
														<span style="letter-spacing:3.2px">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</span>：{{cusInfo.cus_address}}
													</li>
													<li>
														<span style="letter-spacing:3.2px">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</span>：{{cusInfo.cus_tel}}
													</li>
													<li>
														<span style="letter-spacing:3.2px">传&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;真</span>：{{cusInfo.cus__co_fax}}
													</li>
													<li>
														<span style="letter-spacing:1px">省&nbsp;&nbsp;（市）</span>：{{cusCity[0]}}市（县）：{{cusCity[1]}}
													</li>
													<li>
														<span style="letter-spacing:3.9px">合&nbsp;同&nbsp;号</span>：{{orderData.order_bms_code}}
													</li>
													<li>
														<span>合同参考号：</span>
													</li>
													<li>
														<span style="letter-spacing:3.9px">目&nbsp;的&nbsp;地</span>：{{orderData.order_port_to}}
													</li>
													<li>
														<span style="letter-spacing:3.6px">交货方式</span>：{{orderData.order_shipping_mode}}
													</li>
													<li>
														<span style="letter-spacing:3.6px">交货日期</span>：{{orderData.order_delivery_date}}
													</li>
												</ul>
											</div>
										</el-col>
										<el-col :span="11">
											<div style="line-height: 20px;">
												<ul>
													<li>
														<span style="letter-spacing:3.2px">乙&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方</span>：{{cbm_path == 'HS' ? '江苏国泰华盛实业有限公司' : '江苏国泰华盛实业（香港）有限公司'}}
													</li>
													<li>
														<span style="letter-spacing:3.2px">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</span>：{{cbm_path == 'HS' ? '张家港市杨舍镇人民中路125号国泰新世纪广场' : '香港九龙湾宏照道39号企业广场三期25楼2501-02室'}}
													</li>
													<li>
														<span style="letter-spacing:3.2px">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</span>：{{cbm_path == 'HS' ? '0512-58988898' : '+852-23454668'}}
													</li>
													<li>
														<span style="letter-spacing:3.2px">传&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;真</span>：{{cbm_path == 'HS' ? '0512-58686837' : '+852-23454520'}}
													</li>
													<li>
														<span style="letter-spacing:1.1px">省&nbsp;&nbsp;（市）</span>：{{cbm_path == 'HS' ? '江苏 市（县）：张家港' : '香港 市（县）：'}}
													</li>
													<li>
														<span style="letter-spacing:3.6px">签订日期</span>：{{orderData.order_date}}
													</li>
													<li>
														<span style="letter-spacing:3.2px">币&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种</span>：{{orderData.order_currency}}
													</li>
													<li>
														<span style="letter-spacing:3.6px">付款条件</span>：{{paymentTypeMeaning}}
													</li>
													<li>
														<span style="letter-spacing:3.6px">付款形式</span>：{{paymentMethodCode}}
													</li>
													<li>
														合同有效期：
													</li>
												</ul>
											</div>
										</el-col>
									</el-row>
								</div>
							</div>
						</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<div class="remarks">
								依照《中华人民共和国民法典-合同编》及有关法规，经双方协商，订立如下条件：
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div class="li-th">
								<ul>
									<li style="width:228px;">商品名称</li>
									<li style="width:220px;">商品说明</li>
									<li style="width:100px;">数量</li>
									<li style="width:80px;">单位</li>
									<li style="width:100px;">单价（元）</li>
									<li style="width:120px;">金额（元）</li>
									<div class="clear"></div>
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div class="li-td">
								<ul>
									<li style="width:228px;">&nbsp;详情见附件页</li>
									<li style="width:220px;">&nbsp;</li>
									<li style="width:100px; text-align: right;"></li>
									<li style="width:80px; text-align: center;"></li>
									<li style="width:100px; text-align: right;"></li>
									<li style="width:120px; text-align: right;"></li>
									<div class="clear"></div>
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div class="li-foot">
								<ul>
									<li style="width:228px;">&nbsp;</li>
									<li style="width:220px;">总数量：</li>
									<li style="width:100px; text-align: right;">{{$general.transform(sum.qty || 0)}} </li>
									<li style="width:80px; text-align: center;">&nbsp;</li>
									<li style="width:100px; text-align: right;">合计金额：</li>
									<li style="width:120px; text-align: right;">{{orderData.order_currency}} {{$general.transform(sum.amount || 0)}}</li>
									<div class="clear"></div>
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div style="line-height: 30px;">
								<b style="font-size: 15px;">总计金额（大写）：人民币{{$general.toCNMoney(sum.amount || 0)}}</b>
							</div>	
						</td>
					</tr>
					<tr>
						<td>
							<div style="margin-top:10px;">
								合同条款：
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div v-html="$general.getFormatCodeForm(orderData.order_contract_clause)" style="padding: 5px;"></div>
						</td>
					</tr>
					<tr></tr>
					<tr></tr>
					<tr></tr>
					<tr>
						<td>
							<div style="margin-top:30px;">
								<table width="100%" cellspacing="0" cellpadding="0" border="0">
									<tbody>
										<tr style="line-height: 28px;">
											<td style="" width="50%">
												甲方： {{orderData.order_cus_name}}
											</td>
											<td style="">
												乙方：{{cbm_path == 'HS' ? '江苏国泰华盛实业有限公司' : '江苏国泰华盛实业（香港）有限公司'}}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</td>
					</tr>
				</tbody>
			</table>							
		</div>
		<div style="width:890px; height:1280px; margin: auto;background: #fff;padding: 20px;border: 1px solid #000;margin-top: 10px;color: #000;">
			<table width="100%" cellspacing="0" cellpadding="0" border="0">
				<thead>
					<tr>
						<td>
							<div class="print-head">
								<div class="name">
									{{cbm_path == 'HS' ? '江苏国泰华盛实业有限公司' : '江苏国泰华盛实业（香港）有限公司'}}
									<div class="head-right">
										<div class="img">
											<img :src="`${$config.CLOUD_QRCODE}合同编号:${orderData.order_bms_code}
											版本号:${orderData.order_version} 
											交易方:${orderData.order_cus_name} 
											合同日期: ${orderData.order_date} 
											合同金额: ${sum.amount || 0} 
											审批人: ${RecordDatalist.wfr_op_name_e ? RecordDatalist.wfr_op_name_e : ''} 
											审批时间: ${RecordDatalist.wfr_op_time_e ? RecordDatalist.wfr_op_time_e : ''} 
											MOULD_CODE: cbm_ix_contract 
											ID: ${orderData.order_id}`"/>
										</div>
									</div>
								</div>
							</div>
							<div class="print-title">
								<div class="name">国内销售合同</div>
								<div class="look" style="padding-top: 30px;">
									<el-row>
										<el-col :span="13">
											<div style="line-height: 20px;">
												<ul>
													<li>
														<span style="letter-spacing:3.2px">甲&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方</span>：{{orderData.order_cus_name}}
													</li>
													<li>
														<span style="letter-spacing:3.2px">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</span>：{{cusInfo.cus_address}}
													</li>
													<li>
														<span style="letter-spacing:3.2px">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</span>：{{cusInfo.cus_tel}}
													</li>
													<li>
														<span style="letter-spacing:3.2px">传&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;真</span>：{{cusInfo.cus__co_fax}}
													</li>
													<li>
														<span style="letter-spacing:1px">省&nbsp;&nbsp;（市）</span>：{{cusCity[0]}}市（县）：{{cusCity[1]}}
													</li>
													<li>
														<span style="letter-spacing:3.9px">合&nbsp;同&nbsp;号</span>：{{orderData.order_bms_code}}
													</li>
													<li>
														<span>合同参考号：</span>
													</li>
													<li>
														<span style="letter-spacing:3.9px">目&nbsp;的&nbsp;地</span>：{{orderData.order_port_to}}
													</li>
													<li>
														<span style="letter-spacing:3.6px">交货方式</span>：{{orderData.order_shipping_mode}}
													</li>
													<li>
														<span style="letter-spacing:3.6px">交货日期</span>：{{orderData.order_delivery_date}}
													</li>
												</ul>
											</div>
										</el-col>
										<el-col :span="11">
											<div style="line-height: 20px;">
												<ul>
													<li>
														<span style="letter-spacing:3.2px">乙&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;方</span>：{{cbm_path == 'HS' ? '江苏国泰华盛实业有限公司' : '江苏国泰华盛实业（香港）有限公司'}}
													</li>
													<li>
														<span style="letter-spacing:3.2px">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</span>：{{cbm_path == 'HS' ? '张家港市杨舍镇人民中路125号国泰新世纪广场' : '香港九龙湾宏照道39号企业广场三期25楼2501-02室'}}
													</li>
													<li>
														<span style="letter-spacing:3.2px">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话</span>：{{cbm_path == 'HS' ? '0512-58988898' : '+852-23454668'}}
													</li>
													<li>
														<span style="letter-spacing:3.2px">传&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;真</span>：{{cbm_path == 'HS' ? '0512-58686837' : '+852-23454520'}}
													</li>
													<li>
														<span style="letter-spacing:1.1px">省&nbsp;&nbsp;（市）</span>：{{cbm_path == 'HS' ? '江苏 市（县）：张家港' : '香港 市（县）：'}}
													</li>
													<li>
														<span style="letter-spacing:3.6px">签订日期</span>：{{orderData.order_date}}
													</li>
													<li>
														<span style="letter-spacing:3.2px">币&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种</span>：{{orderData.order_currency}}
													</li>
													<li>
														<span style="letter-spacing:3.6px">付款条件</span>：{{paymentTypeMeaning}}
													</li>
													<li>
														<span style="letter-spacing:3.6px">付款形式</span>：{{paymentMethodCode}}
													</li>
													<li>
														合同有效期：
													</li>
												</ul>
											</div>
										</el-col>
									</el-row>
								</div>
							</div>
						</td>
					</tr>
				</thead>
				<tbody>
					<div style="font-size: 20px;"><b>商品附件</b></div>
					<tr>
						<td>
							<div class="li-th">
								<ul>
									<li style="width:228px;">商品名称</li>
									<li style="width:220px;">商品说明</li>
									<li style="width:100px;">数量</li>
									<li style="width:80px;">单位</li>
									<li style="width:100px;">单价（元）</li>
									<li style="width:120px;">金额（元）</li>
									<div class="clear"></div>
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div class="li-td">
								<ul v-for="(line,key) in orderGoods">
									<li style="width:228px;">&nbsp;{{line.order_goods_name}}</li>
									<li style="width:220px;">&nbsp;{{line.order_goods_spec}}</li>
									<li style="width:100px; text-align: right;">{{$general.transform(line.order_goods_qty || 0)}} </li>
									<li style="width:80px; text-align: center;">{{line.order_goods_unit}}</li>
									<li style="width:100px; text-align: right;">{{orderData.order_currency}} {{line.order_goods_price}}</li>
									<li style="width:120px; text-align: right;">{{orderData.order_currency}} {{$general.transform(line.order_goods_amount || 0)}}</li>
									<div class="clear"></div>
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div class="li-foot">
								<ul>
									<li style="width:228px;">&nbsp;</li>
									<li style="width:220px; ">总数量：</li>
									<li style="width:100px; text-align: right;">{{$general.transform(sum.qty || 0)}} </li>
									<li style="width:80px; text-align: center;">&nbsp;</li>
									<li style="width:100px; text-align: right;">合计金额：</li>
									<li style="width:120px; text-align: right;">{{orderData.order_currency}} {{$general.transform(sum.amount || 0)}}</li>
									<div class="clear"></div>
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div style="line-height: 30px;">
								<b style="font-size: 15px;">总计金额（大写）：人民币{{$general.toCNMoney(sum.amount || 0)}}</b>
							</div>	
						</td>
					</tr>
				</tbody>
			</table>							
		</div>	
	</div>
</template>

<script>
import orderApi from '@/api/cbs/order.js'
import ebsApi from '@/api/gbs/ebs.js'
import ifsApi from "@/api/ifs";
	
	
	export default {
	    components: {
			
	    },
	    props: {
	        
	    },
	    data() {
	        return {
	    		order_id:this.$route.query.order_id|'',
				bms_id:this.$route.query.id,
				type:this.$route.query.type,
				orderData:{},
				orderGoods:[],
				sum:{
					qty:0,
					amount:0,
					amountEN:'',
				},
				paymentTypeMeaning:'',
				paymentMethodCode:'',
				printting: false,
				
				RecordDatalist:{
					wfr_op_name_e:'',
					wfr_op_time_e:'',
				},

				cusInfo:{
					cus_address:'',
					cus_tel:'',
					cus__co_fax:'',
				},
				cusCity:[],
				cbm_path:'HS'
	    	}
	    },
	    methods: {
	    	Printpart(id_str)//id-str 内容中的id
			{
				this.printting = true;
				
				setTimeout(()=>{
					window.print();
					this.printting = false
				},300)
			},

			async initData(){
				this.getOrder()
				
				
			},
			
			//获取指定订单的相关信息
			async getOrder (){
			 
				orderApi.getOrderDetail(this.order_id,this.bms_id).then((result)=>{
					if(result.code == 0){
						this.orderData  = result.data.baseInfo || {};
						this.order_id=this.orderData.order_id;
						this.orderGoods = result.data.goodsInfo || [];
						if(this.orderData.order_title_id==1){
							this.cbm_path="HS"
						}else if(this.orderData.order_title_id==4){
							this.cbm_path="HK"
						}
						this.computeOrder()
						
						this.getPaymentMethod()

						this.getCusInfo()
						this.get_flowRecords()
					}
				})
			},
			
			//计算订单金额
			async computeOrder (){
				let qty = 0;
				let amount = 0;
				for (let i = 0;i < this.orderGoods.length;i++){
					qty = parseFloat(qty) + parseFloat(this.orderGoods[i].order_goods_qty);
					amount = parseFloat(amount) + parseFloat(this.orderGoods[i].order_goods_amount);
				}
				this.sum.qty = parseFloat(qty).toFixed(2);
				this.sum.amount = parseFloat(amount).toFixed(2);
			},

			//获取客户信息
			async getCusInfo(){
				ifsApi.getCustomerList().then((result) => {
					let cusList = result.page_list
					cusList.forEach(item => {
						if(item.cus_name==this.orderData.order_cus_name){
							let cusInfo = JSON.parse(item.cus_msg_title)
							let cusCity = JSON.parse(item.cus_city)
							this.cusCity = cusCity
							this.cusInfo.cus_address = cusInfo.Address
							this.cusInfo.cus_tel = cusInfo.Tel
							this.cusInfo.cus__co_fax = item.cus__co_fax
							
						}
					});
				})
			},

			//获取付款方式
			async getPaymentMethod(){
				ebsApi.getEbsData("get_sales_payment", "", this.ebs_path).then((result) => {
					if (result.code == 0) {
						let paymentType = result.data || [];
						let collect_clause=JSON.parse(this.orderData.order_collect_clause)
						if(collect_clause!=null){
							paymentType.forEach(item => {
								if(item.lookup_code==collect_clause[0].receipt_type_code){
									this.paymentTypeMeaning=item.meaning
								}
							});

							let paymentMethod = [
								{code:'虚拟收款',id:28033},
								{code:'D/A',id:14033},
								{code:'D/P',id:14034},
								{code:'L/C',id:14035},
								{code:'T/T',id:14036},
								{code:'押汇',id:14037},
								{code:'支票_1800',id:14038},
								{code:'期初虚拟收款方法',id:14039},
								{code:'现金',id:14040},
								{code:'银票',id:14042},
								{code:'银行转账',id:14043},
							];

							paymentMethod.forEach(item => {
								if(item.id==collect_clause[0].receipt_method_code){
									this.paymentMethodCode=item.code
								}
							});
						}
					}
				});
			},
			
			
			//获取流程记录
			async get_flowRecords(){
				await orderApi.getOrderApprFlowList(this.order_id).then((result)=>{
					if(result.code == 0){
						let RecordDatalist = result.data || {};
						let tmpArr = [];
						for (let i = 0;i < RecordDatalist.length;i++){
							if(RecordDatalist[i].wfr_op_time_e != null){
								RecordDatalist[i].wfr_op_time_e = RecordDatalist[i].wfr_op_time_e.substring(0,10);
								tmpArr.push(RecordDatalist[i]);
							}
						}
						if(tmpArr.length > 0){
							this.RecordDatalist = tmpArr[tmpArr.length - 1];
						}
					}
				})
				
				
			},

			//获取出运方式
			getTransMethod(){
				ebsApi.getEbsData('get_trans_method','',this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.transMethod = this.$general.objectKeyBy(result.data || [],'lookup_code');
					}
				})
			},
	    },
	    created(){
	    	this.initData();
	    },
	    watch:{
	        
	    },
	}
</script>