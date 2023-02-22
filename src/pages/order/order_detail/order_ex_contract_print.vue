<style scoped lang="scss">
table.table-form{ border:1px solid #000;}
table.table-form thead tr th{border:1px solid #000;}
table.table-form tbody tr td{border:1px solid #fff;}
table.table-form tfoot tr td{border-bottom:1px solid #000; border-left: 1px solid #fff;  border-right: 1px solid #fff; padding: 0px 5px;}
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
	margin-top: 8px;
	margin-bottom:5px;
	line-height: 16px;
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
.ewm{
		position: absolute;
		top: 0px;
		right: -15px;
		img{
			width: 140px;
			height: 140px;
		}
	}
</style>
<template>	
	<div :style="{'padding-bottom': type == 'aprv' ? '130px':'0px'}">
		<!-- <div style="width:890px; margin: auto;padding-top: 10px;" v-if="!printting">
			<div class="m-r">
				 <el-button @click="Printpart()" size="small">打印</el-button>
			</div>
			<div class="clear"></div>
		</div> -->
		<!--startprint1-->
		<div id="myPrint5" style="width:980px; min-height:1270px; position: relative; margin: auto;background: #fff;padding: 20px;border: 1px solid #000;margin-top: 10px;color: #000;">
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
								</div>
								<div class="title">
									{{cbm_path == 'HS' ? 'JIANGSU GUOTAI HUASHENG INDUSTRIAL CO.,LTD.' : 'JIANGSU GUOTAI HUASHENG INDUSTRIAL（HK）CO.,LTD.'}}
								</div>
								<div class="ewm">
									<img :src="`${$config.CLOUD_QRCODE}合同编号:${orderData.order_bms_code} 
									版本号:${orderData.order_version} 
									交易方:${orderData.order_cus_name} 
									合同日期: ${orderData.order_date} 
									合同金额: ${orderData.order_currency} ${sum.amount || 0} 
									审批人: ${RecordDatalist.wfr_op_name_e ? RecordDatalist.wfr_op_name_e : ''}
									审批时间: ${RecordDatalist.wfr_op_time_e ? RecordDatalist.wfr_op_time_e : ''}  
									MOULD_CODE: cbm_ex_contract 
									ID: ${orderData.order_bms_id}`"/>
								</div>
								<div class="address">
									{{cbm_path == 'HS' ? 
									'16-22/F, Guotai New Century Plaza, Middle Renmin Rd.,Zhangjiagang City, Jiangsu Province, China' :
									 'FLAT/RM 2501-2 25/F，ENTERPRISE SQUARE THREE，39 WANG CHIU ROAD， KOWLOON BAY，'}}
								</div>
								<div class="address">
									{{cbm_path == 'HS' ? 
									'' :
									 'KOWLOON, HONHKONG '}}
								</div>
								<div class="tel">{{cbm_path == 'HS' ? 'TEL:0512-58988898 FAX:0512-58686837' : 'TEL:+852-23454668   FAX:+852-23454520'}}</div>
							</div>
						</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<div class="print-title">
								<div class="name">销售确认书</div>
								<div class="name">SALES CONFIRMATION</div>
								<div class="look">
									<el-row>
										<el-col :span="17">
											<div >
												<ul>
													<li>买方</li>
													<li>Buyers：{{orderData.order_cus_name}}</li>
													<li>ADD：{{cusInfo.cus_address}}</li>
													<li>
														TEL：{{cusInfo.cus_tel}} FAX：{{cusInfo.cus_fax}}
													</li>
												</ul>
											</div>
										</el-col>
										<el-col :span="7">
											<div>
												<ul>
													<li>编号</li>
													<li>NO：{{orderData.order_bms_code}}</li>
													<li>日期</li>
													<li>
														DATE：{{orderData.order_date}}
													</li>
												</ul>
											</div>
										</el-col>
									</el-row>
								</div>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div class="remarks">
								This contract is made by and between the Buyer and Seller,Whereby the Buyer agrees to buy and the Seller agrees to sell the under-mentioned commodity according to the terms and conditions stipulated below:
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<table width="100%" cellspacing="0" cellpadding="0" border="0" class="table-form">
								<thead>
									<tr>
										<th>(1)商品名称、规格、包装及唛头<br>Name of Commodity,Specification,and Packing</th>
										<th width="140">(2)数量<br>QUANTITY</th>
										<th width="140">(3)单价<br>UNIT PRICE</th>
										<th width="120">(4)总价<br>AMOUNT</th>
										<th width="100">(5)备注<br>REMARKS</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td></td>
										<td align="right"></td>
										<td align="right"></td>
										<td align="right"><b style="font-size: 16;">{{orderData.order_price_clause}}</b></td>
										<td></td>
									</tr>
									<tr v-for="(line,key) in orderGoods">
										<td><b style="font-size: 16;">{{line.order_goods_name_en}}-{{line.order_goods_spec}}</b></td>
										<td align="right"><b style="font-size: 16;">{{$general.transform(line.order_goods_qty || 0)}} {{line.order_goods_en_unit}}</b></td>
										<td align="right"><b style="font-size: 16;">{{orderData.order_currency}} {{line.order_goods_price}}/{{line.order_goods_en_unit}}</b></td>
										<td align="right"><b style="font-size: 16;">{{orderData.order_currency}} {{$general.transform(line.order_goods_amount || 0)}}</b></td>
										<td><b style="font-size: 16;"></b></td>
									</tr>
								</tbody>
								<tfoot>
									<tr>
										<td align="right"><b style="font-size: 16;">Total：</b></td>
										<td align="right"><b style="font-size: 16;">{{$general.transform(sum.qty || 0)}} </b></td>
										<td align="right"></td>
										<td align="right"><b style="font-size: 16;">{{orderData.order_currency}} {{$general.transform(sum.amount || 0)}}</b></td>
										<td></td>
									</tr>
									<tr>
										<td height="28" colspan="5">
											<div class="m-l" style="width: 100px;text-align: center;"><b style="font-size: 16;">(6)总值<br>Amount :</b></div>
											<div class="m-l" style="margin-top:20px"><b style="font-size: 16;">SAY {{orderData.order_currency}} {{sum.amountEN}}</b></div>
										</td>
									</tr>
								</tfoot>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table width="100%" cellspacing="0" cellpadding="0" border="0">
								<tbody>
									<tr>
										<td style="padding:60px 5px 5px 5px;position: relative;">
											<div style="position: absolute;top:30px;right:0px;border: 1px solid #000;padding: 0px 5px;">
												Please mention S/C.No.,when opening L/C
											</div>
											<el-row>
												<div v-html="$general.getFormatCodeForm(orderData.order_contract_clause)"></div>
											</el-row>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table width="100%" cellspacing="0" cellpadding="0" border="0">
								<tbody>
									<tr>
										<td style="padding: 5px;" width="50%">
											买方确认<br>
											Confirmed by Buyer<br>
											{{orderData.order_cus_name}}<br>
										</td>
										<td style="padding: 5px;">
											卖方确认<br>
											Confirmed by Sellers &nbsp;&nbsp;&nbsp;  {{dep_leader}}<span style="margin-left: 40px;"></span><br>
											{{cbm_path == 'HS' ? 'JIANGSU GUOTAI HUASHENG INDUSTRIAL CO.,LTD.' : 'JIANGSU GUOTAI HUASHENG INDUSTRIAL（HK）CO.,LTD.'}}
											
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		</div>	
		<!-- <approve_form v-if="type == 'aprv'" :state="ebs_head.odsc_state" @before-save="getOrderSalesEbsList" @after-save="fresh_apvstate" :wf_code="$config.EBS_ORDER_AUDIT" :wfr_object_id='id' :show.sync="value1"></approve_form> -->
	</div>
</template>

<script>
import orderApi from '@/api/cbs/order.js'
import ifsApi from "@/api/ifs";

	
	export default {
	    components: {
			//approve_form,
	    },
        props: {
            
        },
	    data() {
	        return {
                printting: false,
                cbm_path:'HS',
				order_id:this.$route.query.order_id||'',
				bms_id:this.$route.query.id,
				type:this.$route.query.type,
				orderData:{},
				orderGoods:[],
				sum:{
					qty:0,
					amount:0,
					amountEN:'',
				},
				cusInfo:{
					cus_address:'',
					cus_tel:'',
					cus_fax:'',
				},
				
                dep_leader:'',

				RecordDatalist:{
					wfr_op_name_e:'',
					wfr_op_time_e:'',
				},

			}
		},
		methods: {
			async initData(){
				await this.getOrder()
				
			},

			//打印
			Printpart(id_str)//id-str 内容中的id
			{
				this.printting = true;
				
				setTimeout(()=>{
					window.print();
					this.printting = false
				},300)
			},
			
			//获取指定订单的相关信息
			async getOrder (){
				orderApi.getOrderDetail(this.order_id,this.bms_id).then((result)=>{
					if(result.code == 0){
						this.orderData  = result.data.baseInfo || {};
						this.order_id=this.orderData.order_id;
						let clause= this.$general.getFormatCodeForm(this.orderData.order_contract_clause)
						this.orderGoods = result.data.goodsInfo || [];
						
						if(this.orderData.order_title_id==1){
							this.cbm_path="HS"
						}else if(this.orderData.order_title_id==4){
							this.cbm_path="HK"
						}
						this.computeOrder()
						this.getCusInfo()
                        this.getDepList()
                        this.getEnglishUnit()
						this.get_flowRecords()
					}
						
						
				})
			},
			
			//订单计算
			async computeOrder (){
				let qty = 0;
				let amount = 0;
				for (let i = 0;i < this.orderGoods.length;i++){
					qty = parseFloat(qty) + parseFloat(this.orderGoods[i].order_goods_qty);
					amount = parseFloat(amount) + parseFloat(this.orderGoods[i].order_goods_amount);
				}
				this.sum.qty = parseFloat(qty).toFixed(2);
				this.sum.amount = parseFloat(amount).toFixed(2);
                this.englishmoney()
			},
			
			//金额转英文
			async englishmoney(){
				await ifsApi.toENMoney(this.sum.amount || 0).then((result)=>{
					if(result.code == 0){
						this.sum.amountEN = result.data || '';
					}
				})
			},

			//获取英文单位
            getEnglishUnit(){
                ifsApi.dicData( "TY_JLDW").then((res) => {
                    let unitList = res.children
                    this.orderGoods.forEach(item => {
                        unitList.forEach(index => {
                            if(index.dic_code==item.order_goods_unit_code){
                                item.order_goods_en_unit=index.dic_name_en
                            }
                        });
                    });
                    
                })
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

			//获取客户信息
            async getCusInfo(){
				ifsApi.getCustomerList().then((result) => {
					let cusList = result.page_list
					cusList.forEach(item => {
						if(item.cus_name==this.orderData.order_cus_name){
							let cusInfo = JSON.parse(item.cus_msg_title)
							this.cusInfo.cus_address = cusInfo.Address
							this.cusInfo.cus_tel = cusInfo.Tel
							this.cusInfo.cus_fax = item.cus__co_fax
						}
					});
				})
			},

			//获取部门列表
			async getDepList(){
				await ifsApi.getDepList(this.orderData.order_dep_id).then((result)=>{
					if(result){
						this.dep_leader = result.data.dep_leader;
					}
				})
			},
			
		},
		created(){
			window.onbeforeunload =  (e) => {
			    e = e || window.event;
					console.log(this.$store.state.TMP.request_count);
					console.log(this.$store.state.TMP.loadingBar)
				if (e && this.$store.state.TMP.request_count > 0 && this.$store.state.TMP.loadingBar == true) {
				   e.returnValue = '程序还在执行,如果关闭页面会造成数据异常，请稍候！';
				   return "程序还在执行,如果关闭页面会造成数据异常，请稍候！";
				}
			};
			this.initData();
		},
		
		beforeDestroy() {
			window.onbeforeunload = () => {};
		},
		watch:{
		    
		},
	}
</script>