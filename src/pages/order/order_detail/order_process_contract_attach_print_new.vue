<style scoped lang="scss">
table.table-form{ border:1px solid #000;}
table.table-form thead tr th{border:1px solid #000;}
table.table-form tbody tr td{border:1px solid #000;}
table.table-form tfoot tr td{border:1px solid #000;padding: 0px 5px;}
.print-head{
	position: relative;
	.name{
		font-size: 18px;
		text-align: center;
		font-weight: bold;
		padding-top:20px;
	}
	.title{
		font-size: 18px;
		text-align: center;
		font-weight: bold;
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
}
.remarks{
	font-weight: bold;
	margin-top: 8px;
	margin-bottom:5px;
}
.approve{
	position: absolute;
	top:40px;
	right:172px;
	font-size: 16px;
	border: 5px solid red;
	padding:3px 10px;
	transform:rotate(45deg);
	-ms-transform:rotate(45deg); 	/* IE 9 */
	-moz-transform:rotate(45deg); 	/* Firefox */
	-webkit-transform:rotate(45deg); /* Safari 和 Chrome */
	-o-transform:rotate(45deg);
}
.clause-item {
    line-height: 18px;
}
</style>
<template>	
	<div >
		<div style="width:890px; margin: auto;padding-top: 10px;" v-if="!printting">
			<div class="m-r">
				 <!-- <vxe-button v-if="oce_id > 0" size="small" @click="value1 = true">审批</vxe-button> -->
			</div>
			<div class="clear"></div>
		</div>
		<div style="width:890px; margin: auto; min-height:1270px; position: relative; background: #fff;padding: 20px;border: 1px solid #000;margin-top: 10px;color: #000;">
			<div v-if="base_info.contract_state == 1 || !base_info.contract_state" class="approve">待发布</div>
			<div v-if="base_info.contract_state == 2 && base_info.contract_state_aprv == 1" class="approve">待审核</div>
			<div v-if="base_info.contract_state == 2 && base_info.contract_state_aprv == 3" class="approve">未通过</div>
			<div v-if="base_info.contract_state_aprv == 2" class="approve">已审批</div>
			<table width="100%" cellspacing="0" cellpadding="0" border="0">
				<thead>
					<tr>
						<td>
							<div class="print-head">
								<div class="name">{{tittleArr[type].tittle}}</div>
								<div class="title">{{contractArr[type]}}</div>
								<div class="ewm">
									<img :src="`${$config.CLOUD_QRCODE}合同编号:${base_info.contract_bms_code}
									版本号:${base_info.contract_version} 
									交易方:${base_info.contract_supply_title_name} 
									合同日期: ${base_info.contract_date} 
									合同金额: ${sum.amount} 
									审批人: ${RecordDatalist.wfr_op_name_e ? RecordDatalist.wfr_op_name_e : ''}
									审批时间: ${RecordDatalist.wfr_op_time_e ? RecordDatalist.wfr_op_time_e : ''} 
									MOULD_CODE:${'cbm_order_process_contract_attach_new '} 
									ID: ${base_info.contract_bms_id} 
									TYPE: ${type}`"/>
								</div>
								<el-row style="line-height: 28px;margin-top:5px;">
									<el-col :span="14">
										<div>
											<ul>
												<li style="margin-top: 28px;">甲方：{{tittleArr[type].tittle}} </li>
												<li>乙方：{{supplyTitle[type].tittle}}</li>
											</ul>
										</div>
									</el-col>
									<el-col :span="10">
										<div>
											<ul>
												<li>合同编号：{{base_info.contract_bms_code}}</li>
												<li>签订地点：{{base_info.contract_sign_place}}</li>
												<li>签订日期：{{base_info.contract_date}}</li>
											</ul>
										</div>
									</el-col>
								</el-row>
							</div>
						</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<div class="remarks">
								经甲乙双方协商一致，成效下列商品并订立一般条约如下甲方向乙方订购下列出口产品并订立一般条款如下：
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<table width="100%" cellspacing="0" cellpadding="0" border="0" class="table-form">
								<thead>
									<tr>
										<th width="180">货物名称</th>
										<th>规格型号</th>
										<th width="50">单位</th>
										<th width="80">数量</th>
										<th width="100">{{type == 4 || type == 11 ? '单价(成品)' : '单价(加工费)'}}</th>
										<th width="100">金额({{bzToChineseUnit[base_info.contract_currency]}})</th>
										<th width="140">备注</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>详情见附件页</td>
										<td></td>
										<td align="center"></td>
										<td align="right"></td>
										<td align="right"></td>
										<td align="right"></td>
										<td></td>
									</tr>
								</tbody>
								<tfoot>
									<tr>
										<td height="28" align="center">总计：</td>
										<td></td>
										<td></td>
										<td align="right">{{$general.transform(sum.qty || 0)}} </td>
										<td></td>
										<td align="right">{{$general.transform(sum.amount || 0)}}</td>
										<td></td>
									</tr>
									<tr>
										<td height="28" colspan="7"><b style="font-size: 15px;">总计金额（大写）:{{bzToChinese[base_info.contract_currency]}}{{sum.amountCN}}</b></td>
									</tr>
								</tfoot>
								
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table width="100%" cellspacing="0" cellpadding="0" border="0" class="table-form">
								<tbody>
									<tr>
										<td style="padding: 5px;">
											<!-- <template v-for="(index,key) in ebs_head.ybs_clause">
												{{(key+1)}}.{{index.title}}{{index.value}}<br>
											</template> -->
											<el-row>
												<div v-for="item in clauseList" :key="item.dictionary_id">
                                                    <p v-html="item.memo" class="clause-item"></p>
                                                </div>
											</el-row>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table width="100%" cellspacing="0" cellpadding="0" border="0" class="table-form">
								<tbody>
									<tr style="line-height: 28px;">
										<td style="padding: 5px;" width="50%" >
											甲方：{{tittleArr[type].tittle}}<br>
											(盖章有效)<br>
											法定地址：{{tittleArr[type].address}}<br>
											法定代表人：金志江<br>
											委托代理人：{{dep_leader}}<br>
											电话：{{tittleArr[type].cus_tel}}<br>
											开户银行：{{tittleArr[type].bank_name}}<br>
											帐号：{{tittleArr[type].bank_account_num}}<br>
										</td>
										<td style="padding: 5px;">
											乙方：{{supplyTitle[type].tittle}}<br>
											(盖章有效)<br>
											法定地址：{{supplyTitle[type].address}}<br>
											法定代表人：{{supplyTitle[type].legal_person_b}}<br>
											委托代理人：{{supplyTitle[type].dep_leader}}<br>
											电话：{{supplyTitle[type].cus_tel}}<br>
											开户银行：{{supplyTitle[type].bank_name}}<br>
											帐号：{{supplyTitle[type].bank_account_num}}<br>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div style="width:890px; height:1290px; margin: auto;background: #fff;padding: 20px;border: 1px solid #000;margin-top: 10px;color: #000;">
			<table width="100%" cellspacing="0" cellpadding="0" border="0">
				<thead>
					<tr>
						<td style="padding-top: 15px;">
							<div class="print-head">
								<div class="name">{{tittleArr[type].tittle}}</div>
								<div class="title">{{contractArr[type]}}</div>
								<div class="ewm">
									<img :src="`${$config.CLOUD_QRCODE}合同编号:${base_info.contract_bms_code}
									版本号:${base_info.contract_version} 
									交易方:${base_info.contract_supply_title_name} 
									合同日期: ${base_info.contract_date} 
									合同金额: ${sum.amount} 
									审批人: ${RecordDatalist.wfr_op_name_e ? RecordDatalist.wfr_op_name_e : ''}
									审批时间: ${RecordDatalist.wfr_op_time_e ? RecordDatalist.wfr_op_time_e : ''} 
									MOULD_CODE:${'cbm_order_process_contract_attach_new '} 
									ID: ${base_info.contract_bms_id} 
									TYPE: ${type}`"/>
								</div>
								<el-row style="line-height: 28px;margin-top:5px;">
									<el-col :span="14">
										<div>
											<ul>
												<li style="margin-top: 28px;">甲方：{{type == 4 ? base_info.contract_title_name : '江苏国泰盛大贸易有限公司'}} </li>
												<li>乙方：{{type == 4 ? '江苏国泰盛大贸易有限公司' : base_info.contract_actual_supply_title_name}}</li>
											</ul>
										</div>
									</el-col>
									<el-col :span="10">
										<div>
											<ul>
												<li>合同编号：{{base_info.contract_bms_code}}</li>
												<li>签订地点：{{base_info.contract_sign_place}}</li>
												<li>签订日期：{{base_info.contract_date}}</li>
											</ul>
										</div>
									</el-col>
								</el-row>
							</div>
						</td>
					</tr>
				</thead>
				<tbody>
					<div style="font-size: 20px;"><b>商品附件</b></div>
					<tr>
						<td>
							<table width="100%" cellspacing="0" cellpadding="0" border="0" class="table-form">
								<thead>
									<tr>
										<th width="180">货物名称</th>
										<th>规格型号</th>
										<th width="50">单位</th>
										<th width="80">数量</th>
										<th width="100">{{type == 4 || type == 11 ? '单价(成品)' : '单价(加工费)'}}</th>
										<th width="100">金额({{bzToChineseUnit[base_info.contract_currency]}})</th>
										<th width="140">备注</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(index,key) in detailInfo">
										<td>{{index.contract_detail_goods_name_ebs}}</td>
										<td>
										    <p>{{index.contract_detail_name}}</p>
										    <p>{{index.contract_detail_spec}}</p>
										</td>
										<td align="center">{{index.contract_detail_unit}}</td>
										<td align="right">{{$general.transform(index.contract_detail_qty || 0)}}</td>
										<td align="right">{{type == 4 || type == 11 ? index.contract_detail_end_process_price: index.contract_detail_price}}</td>
										<td align="right">{{type == 4 || type == 11 ? $general.transform(index.contract_detail_end_process_price * index.contract_detail_qty || 0): $general.transform(index.contract_detail_amount || 0)}}</td>
										<td>{{index.memo}}</td>
									</tr>
								</tbody>
								<tfoot>
									<tr>
										<td height="28" align="center">总计：</td>
										<td></td>
										<td></td>
										<td align="right">{{$general.transform(sum.qty || 0)}} </td>
										<td></td>
										<td align="right">{{$general.transform(sum.amount || 0)}}</td>
										<td></td>
									</tr>
									<tr>
										<td height="28" colspan="7"><b style="font-size: 15px;">总计金额（大写）:{{bzToChinese[base_info.contract_currency]}}{{sum.amountCN}}</b></td>
									</tr>
								</tfoot>
							</table>
						</td>
					</tr>
				</tbody>
			</table>	
		</div>	
		
	</div>
</template>

<script>
	import purchaseApi from "@/api/cbs/purchase.js";
	import ifsApi from '@/api/ifs'
	
	export default {
		components: {
		},
	    data() {
	        return {
				contract_id:this.$route.query.id||'',
				bms_id:this.$route.query.id||'',
				flag:this.$route.query.flag,
				type:this.$route.query.type,
				base_info:{},
				detailInfo:[],
				clauseList: [],
				sum:{
					qty:0,
					amount:0,
					amountCN:0,
				},

				
				oce_id:this.$route.query.oce_id,
				ebs_head:{},
				
				RecordDatalist:{},
				printting: false,
				value1:false,
				supply_contract_info:{},
				dep_leader:'',
				bzToChinese:{
					'CNY':'人民币',
					'USD':'美元',
					'EUR':'欧元',
					'HKD':'港元',
					'GBP':'英镑',
				},
				bzToChineseUnit:{
					'CNY':'元',
					'USD':'美元',
					'EUR':'欧元',
					'HKD':'港元',
					'GBP':'英镑',
				},
				tittleArr:{
					4:{
						tittle:'',//江苏国泰华盛实业有限公司
						address:'',//张家港市 人民中路33号 国泰新世纪广场
						cus_tel:'',
						bank_name:'',
						bank_account_num:'',
					},
					5:{
						tittle:'',//江苏国泰盛大贸易有限公司
						address:'',//
						cus_tel:'',
						bank_name:'',
						bank_account_num:'',
					},
					11:{
						tittle:'',//江苏国泰华盛实业有限公司
						address:'',//
						cus_tel:'',
						bank_name:'',
						bank_account_num:'',
					},
					13:{
						tittle:'',//张家港保税区盛融贸易有限公司
						address:'',//
						cus_tel:'',
						bank_name:'',
						bank_account_num:'',
					},
				},
				supplyTitle:{
					4:{
						tittle:'',//江苏国泰盛大贸易有限公司
						address:'',//
						legal_person_b:'',
						dep_leader:'',
						cus_tel:'',
						bank_name:'',
						bank_account_num:'',
					},
					5:{
						tittle:'',//工厂
						address:'',//
						legal_person_b:'',
						dep_leader:'',
						cus_tel:'',
						bank_name:'',
						bank_account_num:'',
					},
					11:{
						tittle:'',//张家港保税区盛融贸易有限公司
						address:'',//
						legal_person_b:'',
						dep_leader:'',
						cus_tel:'',
						bank_name:'',
						bank_account_num:'',
					},
					13:{
						tittle:'',//工厂
						address:'',//
						legal_person_b:'',
						dep_leader:'',
						cus_tel:'',
						bank_name:'',
						bank_account_num:'',
					},
				},
				contractArr:{
					4:'采购合同',
					5:'加工合同',
					11:'采购合同',
					13:'加工合同',
				},
			}
		},
		methods: {
			async initData(){
				this.getContractData()
			},

			//根据合同id获取合同数据
			getContractData(){
				let qty = 0;
				let amount = 0;
				purchaseApi.getContractInfo(this.contract_id,this.bms_id,'process').then((res) => {
					this.base_info = res.data.baseInfo;
					this.contract_id=this.base_info.contract_id;
					this.clauseList = this.base_info.contract_clause;
					this.clauseList.forEach((item) => {
						item.memo =
							"<p>" + this.$general.getFormatCode(item.memo) + "</p>";
					});
					this.detailInfo = res.data.detailInfo;
					this.supply_contract_info=res.data.baseInfo.contract_actual_supply_contract_info
					
					if(this.base_info.contract_state_aprv==2||this.base_info.contract_state_aprv==3){
						this.flag="print"
					}
					for (let i = 0;i < this.detailInfo.length;i++){
						qty = parseFloat(qty) + parseFloat(this.detailInfo[i].contract_detail_qty);
						if(this.type==4){
							amount = parseFloat(amount) + parseFloat(this.detailInfo[i].contract_detail_qty*this.detailInfo[i].contract_detail_end_process_price);
						}else{
							amount = parseFloat(amount) + parseFloat(this.detailInfo[i].contract_detail_amount);
						}
					}
					this.sum.amount = parseFloat(amount).toFixed(2);
					this.sum.qty = parseFloat(qty).toFixed(2);
					this.sum.amountCN = this.$general.toCNMoney(this.sum.amount);

					this.getDepList()
				});
			},

			async getTitle() {
			    let data = await ifsApi.getTitlelist();
				let allTitle = data.tnt_title || [];
				let tmp = {};
				let tmpSupply = {};
				for (let i = 0;i < allTitle.length;i++){
					tmp = {
						tittle:allTitle[i].title,
						address:allTitle[i].addr,
						legal_person_b:'金志江',
						dep_leader:this.dep_leader,
						cus_tel:allTitle[i].tel,
						bank_name:allTitle[i].bank_info.length > 0 ? allTitle[i].bank_info[0].bank : '',
						bank_account_num:allTitle[i].bank_info.length > 0 ? allTitle[i].bank_info[0].account : '',
					};
					if(allTitle[i].title_id == 1){
						this.tittleArr[4] = tmp;
						this.tittleArr[11] = tmp;
					}else if(allTitle[i].title_id == 3){
						this.tittleArr[5] = tmp;
						this.supplyTitle[4] = tmp;
					}else if(allTitle[i].title_id == 5){
						this.supplyTitle[11] = tmp;
						this.tittleArr[13] = tmp;
					}
				}
				tmpSupply =  {
						tittle:this.base_info.contract_actual_supply_title_name,//工厂
						address:this.base_info.contract_actual_supply_address,//
						legal_person_b:this.supply_contract_info.b_legal_person_b,
						dep_leader:this.supply_contract_info.b_legal_person_e,
						cus_tel:this.base_info.contract_actual_supply_tel,
						bank_name:this.supply_contract_info.b_bank_name,
						bank_account_num:this.supply_contract_info.b_bank_account_num,
					};
				this.supplyTitle[5] = tmpSupply;
				this.supplyTitle[13] = tmpSupply;	
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

			//获取部门信息
			async getDepList(){
				await ifsApi.getDepList(this.base_info.contract_dep_id).then((result)=>{
					if(result){
						this.dep_leader = result.data.dep_leader;
					}
					this.getTitle()
				})
			},
			
			//刷新审批状态
			async fresh_apvstate($event){
				this.value1=false;
				this.initData()
				
			},
		},
		created(){
			window.onbeforeunload =  (e) => {
			    e = e || window.event;
					console.log(this.$store.state.TMP.request_count);
					console.log(this.$store.state.TMP.loadingBar)
				if (e && this.$store.state.TMP.request_count > 0 
				&& this.$store.state.TMP.loadingBar == true
				&& this.loadingBar == true) {
				   e.returnValue = '程序还在执行,如果关闭页面会造成数据异常，请稍候！';
				   return "程序还在执行,如果关闭页面会造成数据异常，请稍候！";
				}
			};
			this.initData();
		},
		
		beforeDestroy() {
			window.onbeforeunload = () => {};
		},
	}
</script>