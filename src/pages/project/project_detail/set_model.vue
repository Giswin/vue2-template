<template>
	<div>
		<vxe-modal ref="model1" title="批量设置弹层" :value="show" :showFooter="true" @close="$emit('update:show',false)" :mask-closable="false" width="800" height="400px">
			<div style="width:99%;">
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
					<tbody>
						<tr>
							<th align="center" width="100">中文款号</th>
							<td><el-input v-model="data.style_no_ebs"></el-input></td>
						</tr>
						<tr>
							<th align="center">英文款号</th>
							<td><el-input v-model="data.style_no_en_ebs"></el-input></td>
						</tr>
						<tr>
							<th align="center">库存组织</th>
							<td>
								<el-select
									style="width: 100%;"
									v-model="data.stock_org_id_ebs"
									transfer
									filterable
									clearable
									@change="changeOrganization()"
								>
									<el-option v-for="item in stockOrg"
											:key="item.organization_id"
											:value="item.organization_id"
											:label="item.organization_name"
									>
									</el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<th align="center">商品名称-EBS</th>
							<td>
								<el-select
									style="width: 100%;"
									v-model="data.item_id_ebs"
									transfer
									filterable
									clearable
									@change="changeGoods()"
								>
									<el-option v-for="item in goodsList"
											   :key="item.inventory_item_id"
											   :value="item.inventory_item_id"
											   :label="item.description+'|'+item.segment1"
									>
										<span style="float: left">{{ item.description+'|'+item.segment1 }}</span>
										<span style="float: right; color: #8492a6;">{{ unitObj[item.primary_uom_code]['unit_of_measure_tl'] }}</span>
									</el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<th align="center">商品名称</th>
							<td>
								<el-input v-model="data.specs_ebs"></el-input>
							</td>
						</tr>
						<tr>
							<th align="center">供应商</th>
							<td>
								<el-autocomplete
									  style="width: 100%; position: initial;"
									  resize
									  size="small"
									  v-model="data.vender_name_ebs"
									  :fetch-suggestions="querySearchVen"
									  placeholder="选择供应商"
									  :trigger-on-focus="false"
									  @select="(item)=>{handleSelectVen(item)}"
									  @change="changeVen()"
									  clearable
								></el-autocomplete>
							</td>
						</tr>
						<tr>
							<th align="center">单位</th>
							<td>
								<el-select
									style="width: 100%;"
									v-model="data.unit_code_ebs"
									transfer
									filterable
								>
									<el-option v-for="item in unit"
											   :key="item.uom_code"
											   :value="item.uom_code"
											   :label="item.unit_of_measure_tl"
											    v-if="data.unit_type == item.uom_class"
									>
									</el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<th align="center">转开票</th>
							<td>
								<el-select
									style="width: 100%;"
									v-model="data.sales_type_ebs"
									transfer
									filterable
									label-in-value
								>
									<el-option v-for="item in attribute7Arr"
											   :key="item.value"
											   :value="item.value"
											   :label="item.value"
									>
									</el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<th align="center">税率</th>
							<td>
								<el-select
									style="width: 100%;"
									v-model="data.tax_code"
									transfer
									filterable
									label-in-value
								>
									<el-option v-for="item in taxCodeList"
											   :key="item.tax_code"
											   :value="item.tax_code"
											   :label="item.tax_code"
									>
									</el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<th align="center">退税率</th>
							<td>
								<el-select
									style="width: 100%;"
									v-model="data.tax_rate"
									transfer
									filterable
									label-in-value
								>
									<el-option v-for="item in taxCodeList"
											   :key="item.tax_rate"
											   :value="item.tax_rate"
											   :label="item.tax_rate"
									>
									</el-option>
								</el-select>
							</td>
						</tr>
						<tr v-if="type == 'product'">
							<th align="center">交期</th>
							<td>
								<el-date-picker v-model="data.etd_ebs" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
								         size="small"></el-date-picker>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div slot="footer">
					<div class="m-r">
						<el-button size="small" @click="save">确定</el-button>
					</div>
			</div>
		</vxe-modal>
	</div>
</template>

<script>
	import ifsApi from '@/api/ifs'
	import ebsApi from '@/api/gbs/ebs.js'
	export default {
	    props: {
			show: Boolean,
			initObject:'',
			ebs_path:'',
			type:'',
	    },
	    data() {
	        return {
				
				data:{
					style_no_ebs:'',
					style_no_en_ebs:'',
					stock_org_id_ebs:'',
					stock_org_name_ebs:'',
					item_id_ebs:'',
					item_name_ebs:'',
					item_description_ebs:'',
					specs_ebs:'',
					vender_id_ebs:'',
					vender_name_ebs:'',
					unit_code_ebs:'',
					sales_type_ebs:'',
					tax_code:'VAT13',
					tax_rate:13,
					etd_ebs:'',
					unit_type:'',
				},
				stockOrg:{},
				goodsList:{},
				venListData:[],
				allVen:{},
				unit:[],
				unitObj:{},
				attribute7Arr:[
					{'code':'转开','value':'转开'},
					{'code':'不转开','value':'不转开'},
				],
				taxCodeList:[],
	        }
	    },
		created(){
			this.getStockOrg();
			this.getCustomer();
			this.getUnit();
			this.getTaxCode();
		},
		beforeDestroy () {
			this.$refs.model1.close();
		},
	    methods: {
			initData(){
				this.data = {
					style_no_ebs:'',
					style_no_en_ebs:'',
					stock_org_id_ebs:this.initObject.stock_org_id_ebs,
					stock_org_name_ebs:this.initObject.stock_org_name_ebs,
					item_id_ebs:'',
					item_name_ebs:'',
					item_description_ebs:'',
					specs_ebs:'',
					vender_id_ebs:'',
					unit_code_ebs:'',
					sales_type_ebs:'',
					tax_code:'VAT13',
					tax_rate:13,
				};
				if(this.data.stock_org_id_ebs > 0){
					this.getGoodsList(this.data.stock_org_id_ebs);
				}
			},
			
			//获取库存组织
			getStockOrg(){
				ebsApi.getEbsData('get_stock_org','',this.ebs_path).then((result)=>{
					if(result.code == 0){	
						this.stockOrg = this.$general.objectKeyBy(result.data,'organization_id') || [];
					}
				})
			},
			
			//获取交易方
			getCustomer(){
				ifsApi.getVenderDataList('',this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.allVen = this.$general.objectKeyBy(result.data.list, 'trader_id') || {};
						this.venListData = result.data.list || [];
						for (let i = 0;i < this.venListData.length;i++){
							this.venListData[i]['value'] = this.venListData[i]['trader_name_abb'];
						}
					}
				})
			},
			
			//获取单位代码
			getUnit(){
				ebsApi.getEbsData('get_unit','',this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.unit = result.data || [];
						this.unitObj =this.$general.objectKeyBy(result.data || [],'uom_code');
					}
				})
			},
			
			//获取税率编码
			getTaxCode() {
				ebsApi.getEbsData('get_taxcode','',this.ebs_path).then((result)=>{
					if(result.code == 0){	
						this.taxCodeList = result.data || [];
					}
				})
			},
			
			//更改库存组织
			changeOrganization(){
				this.data.stock_org_name_ebs = this.stockOrg[this.data.stock_org_id_ebs].organization_name;
				this.getGoodsList(this.data.stock_org_id_ebs);
			},
			
			//获取商品列表
			getGoodsList(params){
				let param = `organization_id=${params}`;
				this.goodsFlag = 1;
				ebsApi.getEbsData('get_goodslist',param,this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.goodsList = this.$general.objectKeyBy(result.data,'inventory_item_id') || [];
					}
				})
			},
			
			changeGoods(){
				this.data.item_name_ebs = this.goodsList[this.data.item_id_ebs].segment1
				this.data.item_description_ebs = this.goodsList[this.data.item_id_ebs].description
				this.data.unit_code_ebs = this.goodsList[this.data.item_id_ebs].primary_uom_code
				this.data.unit_type = this.goodsList[this.data.item_id_ebs].uom_class;
			},
			
			querySearchVen(queryString, cb) {
			    let restaurants = this.venListData;
			    let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
			    // 调用 callback 返回建议列表的数据
			    cb(results);
			},
			
			createFilter(queryString) {
				return (restaurant) => {
				  return (restaurant.trader_name_abb.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
				};
			},
			
			handleSelectVen(item){
				this.data.vender_id_ebs = this.ebs_path == 'HS' ? item.trader_id_ebs : item.trader_id_ebs_hk;
			},
			
			changeVen(){
				if(this.allVen[this.data.vender_name_ebs]){
					this.data.vender_id_ebs = this.ebs_path == 'HS' ?
										this.allVen[this.data.vender_name_ebs]['trader_id_ebs'] :
										this.allVen[this.data.vender_name_ebs]['trader_id_ebs_hk'];	
					this.data.vender_name_ebs = this.allVen[this.data.vender_name_ebs]['trader_name_abb'];	
				}else{
					this.data.vender_id_ebs = '';
					this.data.vender_name_ebs = '';
				}
			}, 
			
			save(){
				this.$emit('afterSave',this.data);
				this.$emit('update:show',false);
			},
			
			changeTaxCode() {
				let taxCodeList = this.$general.objectKeyBy(this.taxCodeList, 'tax_code') || {};
				this.data.tax_rate = taxCodeList[this.data.tax_code]['tax_rate'];
			},
	    },
		watch: {
		    show: {
		        handler(newVal) {
					if(newVal)
						this.initData();
		        },
		    }
		},
	}
</script>