<template>
	<div>
		<vxe-modal ref="model1" :value="show" :showFooter="true" @close="$emit('update:show',false)" :mask-closable="false" width="1200" height="600px" destroy-on-close>
		<template v-slot:header>
			面辅料明细选择-{{ebs_path}}-{{ebs_head.ode_ebs_type == 2  ? '测算表' : '预算表'}}-{{ebs_head.ode_system_type == 3 ? '面辅料项目' : '成品项目'}}
		    <div class="model-r">
		    	<div class="model-close">
		    		<i class="fa fa-times" @click="$emit('update:show',false)"></i>
		    	</div>
		    </div>						
		</template>
		<div>
			<div>
				<div class="tabs-left">
					<div>
						<div class="m-l">
							<el-input placeholder="项目号/订单号/款号/业务员/客户" v-model="condition.keyword" @keyup.enter.native="query" clearable class="input-with-select" style="width:350px;" size="small">
								<!-- <el-button slot="append" icon="el-icon-search" @click="query()"></el-button> -->
							</el-input>
						</div>
						<!-- <div class="m-l" style="padding-left: 10px;">
							<el-autocomplete
							      class="inline-input"
								  resize
							      v-model="condition.ven_name"
							      :fetch-suggestions="querySearchVen"
							      placeholder="请输入供应商"
							      :trigger-on-focus="false"
							      @select="(item)=>{handleSelectVen(item)}"
								  @change="changeVen"
								  size="small"
								  style="width:250px;"
								  clearable
								  @clear="condition.ven_id = '';condition.ven_id = ''"
							    ></el-autocomplete>
						</div> -->
						<div class="m-l" style="padding-left: 10px;">
							<el-button size="small" @click="query()">查询</el-button>
						</div>
					</div>
				</div>
			</div>
			<div class="model-bottom-body" style="top:50px;bottom: 50px;">
				<vxe-table ref="productDetail" border resizable highlight-cell :data="productDetail" class="vxe-table-scrollbar" auto-resize height="100%" :edit-config="{trigger: 'click', mode: 'cell'}">
					<vxe-table-column type="checkbox" width="40" align="center" fixed="left"></vxe-table-column>
					<vxe-table-column field="od_code" title="订单号" sortable header-align="center" width="100"></vxe-table-column>
					<vxe-table-column field="od_project_no" title="成品项目号" sortable header-align="center" width="100"></vxe-table-column>
					<vxe-table-column field="odg_item_no" title="款号" sortable header-align="center" width="100"></vxe-table-column>
					<vxe-table-column field="od_sales_name" title="业务" header-align="center" sortable width="120">
						<template v-slot="{ row }">
							{{row.od_dep_name}} - {{row.od_sales_name}}
						</template>
					</vxe-table-column>
					<vxe-table-column field="od_cus_name" title="客户" sortable header-align="center" width="100"></vxe-table-column>
					<vxe-table-column field="od_bus_type" title="业务类型" header-align="center" width="120">
						<template v-slot="{ row }">
							{{row.od_bus_type}} - {{row.od_type}}
						</template>
					</vxe-table-column>
					<vxe-table-column field="od_title_name" title="接单抬头" header-align="center" width="100"></vxe-table-column>
					<vxe-table-column field="pcs" title="数量" header-align="center" align="right" width="100">
						<template v-slot="{ row }">{{$general.transform(row.pcs || 0,0)}} {{row.odg_unit}}</template>
					</vxe-table-column>
					<vxe-table-column field="odg_price_mode" title="定价方式" header-align="center" width="80" align="right">
						<template v-slot="{row}">{{priceMode[row.odg_price_mode] ? priceMode[row.odg_price_mode].label : ''}}</template>
					</vxe-table-column>
					<vxe-table-column field="od_currency" title="币种" width="80" align="center"></vxe-table-column>
						<template v-slot="{row}">{{priceMode[row.odg_price_mode] ? priceMode[row.odg_price_mode].label : '————'}}</template>
					</vxe-table-column>
					<vxe-table-column field="odgsku_price" title="单价" header-align="center" width="80" align="right">
						<template v-slot="{row}">{{row.odg_price_mode == '01' ? row.odgsku_price : ''}}</template>
					</vxe-table-column>
					<vxe-table-column field="amount" title="金额" header-align="center" align="right" width="120">
						<template v-slot="{ row }">{{$general.transform(row.amount || 0)}}</template>
					</vxe-table-column>
					<vxe-table-column field="od_date" title="接单日期" header-align="center" width="100"></vxe-table-column>
				</vxe-table>
			</div>
		</div>
		<div slot="footer">
			<div class="m-r">
				<el-button size="small" @click="confirm">确定</el-button>
			</div>
		</div>
		</vxe-modal>
	</div>
</template>

<script>
	import ebsApi from '@/api/gbs/ebs.js'
	
	
	export default {
	    props: {
			show: Boolean,
			ebs_head:'',
			ebs_path:'',
	    },
	    data() {
	        return {
				productDetail:[],
				condition:{
					keyword:'',
					no_paging:'1',
					selectTab:6,
				},
				allVen:{},
				venListData:[],
				priceMode:{},
	        }
	    },
	    created() {
	        this.getVen();
			this.getOptions();
	    },
	    methods: {
			// 获取工厂选择列表
			getVen() {
			   this.$dmBaseSet.venderData().then((data) => {
			       this.allVen = this.$general.objectKeyBy(data, 'trader_name') || {};
			       this.venListData = data || {};
				   for (let i = 0;i < this.venListData.length;i++){
				   	this.venListData[i]['value'] = this.venListData[i]['trader_name'];
				   }
			   });
			},
			
			async getOptions() {
			    let data = await this.$dmBaseSet.getOptions();
			    if(data.G_OM_PRICE_MODE.option_value){
			       this.priceMode = this.$general.objectKeyBy(data.G_OM_PRICE_MODE.option_value, 'value') || {};
			    }
			},
			
			query(){
				ebsApi.queryEbs(JSON.stringify(this.condition)).then((result)=>{
					if(result.code == 0){
						this.productDetail = result.data.data || [];
					}
				})
			},
			
			querySearchVen(queryString, cb) {
			    let restaurants = this.venListData;
			    let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
			    // 调用 callback 返回建议列表的数据
			    cb(results);
			},
			
			createFilter(queryString) {
				return (restaurant) => {
				  return (restaurant.trader_name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
				};
			},
			
			handleSelectVen(item){
				this.condition.ven_id = item.trader_id;
				this.condition.ven_name = item.trader_name;
			},
			
			changeVen(){
				if(this.allVen[this.condition.ven_name]){
					this.condition.ven_id = this.allVen[this.condition.ven_name]['trader_id'];
					this.condition.ven_name = this.allVen[this.condition.ven_name]['trader_name'];
				}else{
					this.condition.odgo_factory_id = '';
					this.condition.odgo_factory_name = '';
				}
			},
			
			confirm(){
				let checkData = this.$refs.productDetail.getCheckboxRecords();
				if(checkData.length > 0){
					this.$emit('afterAdd',checkData);
				}else{
					this.$message({
						message: '请选择明细!',
						type: 'warning'
					});
				}
			},
			
	    },
		beforeDestroy () {
			this.$refs.model1.close();
		},
		watch: {
		    show: {
		        handler(newVal) {
					
		        },
		    }
		},
	}
</script>