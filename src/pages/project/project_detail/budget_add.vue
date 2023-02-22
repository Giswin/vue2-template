<template>
	<div>
		<vxe-modal ref="model1"  title="订单明细弹层" :value="show" :showFooter="true" @close="$emit('update:show',false)" :mask-closable="false" width="1200" height="600px" destroy-on-close>
		<div>
			<div>
				<div class="tabs-right">
					<div class="tabs-search">
						<div class="m-l">
							<el-input placeholder="项目号/订单号/款号" v-model="condition.keyword" clearable class="input-with-select" style="width:500px;" size="small">
								<el-button slot="append" icon="el-icon-search" @click="query()"></el-button>
							</el-input>
						</div>
					</div>
				</div>
			</div>
			<div class="model-bottom-body" style="top:50px;bottom: 50px;">
				<vxe-table ref="budgetDetail" border resizable highlight-cell :data="budgetDetail" class="vxe-table-scrollbar" auto-resize height="100%" :edit-config="{trigger: 'click', mode: 'cell'}">
					<vxe-table-column type="checkbox" width="40" align="center" ></vxe-table-column>
					<vxe-table-column field="od_code" title="订单号" header-align="center" width="110"></vxe-table-column>
					<vxe-table-column field="odg_item_no" title="款号" header-align="center" width="100"></vxe-table-column>
					<vxe-table-column title="业务" header-align="center" width="120">
						<template v-slot="{ row }">{{row.od_dep_name}} - {{row.od_sales_name}}</template>
					</vxe-table-column>
					<vxe-table-column field="od_cus_name" title="客户" header-align="center" width="100"></vxe-table-column>
					<vxe-table-column field="od_bus_type" title="业务类型" header-align="center" width="120">
						<template v-slot="{ row }">{{row.od_bus_type}} - {{row.od_type}}</template>
					</vxe-table-column>
					<vxe-table-column field="od_title_name" title="接单抬头" header-align="center" width="110"></vxe-table-column>
					<vxe-table-column field="pcs" title="数量" header-align="center" align="right" width="100">
						<template v-slot="{ row }">{{$general.transform(row.pcs || 0,0)}} {{row.odg_unit}}</template>
					</vxe-table-column>
					<vxe-table-column field="od_currency" title="币种" header-align="center" width="80"></vxe-table-column>
					<vxe-table-column field="odg_price_mode" title="定价方式" header-align="center" width="80" align="right">
						<template v-slot="{row}">{{priceMode[row.odg_price_mode] ? priceMode[row.odg_price_mode].label : ''}}</template>
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
			<div class="list-bottom" style="left: 15px;right: 15px;">
				<div class="m-r">
					<vxe-pager background :total="condition.totalResult"
							   :current-page.sync="condition.currentPage"
							   :page-size.sync="condition.pageSize"
							   @page-change="query"
							   :page-sizes="[10,20,50,100,500,1000]"
							   >
					</vxe-pager>
				</div>
				<div class="clear"></div>
			</div>
		</div>
		<div slot="footer">
			<div class="m-r">
				<el-button size="small" @click="addBudgetDetail()">确定</el-button>
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
	    },
	    data() {
	        return {
				budgetDetail:[],
				condition:{
					keyword:'',
					od_dep_id:'',
					od_dep_id_arr:[],
					od_dep_name_str:[],
					od_cus_id:'',
					od_cus_id_arr:[],
					od_cus_name_str:'',
					od_bus_type:'',
					od_date_b:'',
					od_date_e:'',
					odgo_etd_b:'',
					odgo_etd_e:'',
					selectTab:1,
					pageSize:20,
					currentPage:1,
					totalResult:0,
					no_paging:'',
					orderBy:'',
				},
				sort:'od_create_time',
				arrow:true,
				priceMode:{},
	        }
	    },
	    created() {
	        this.getOptions();
	    },
	    methods: {
			addBudgetDetail(){
				let checkData = this.$refs.budgetDetail.getCheckboxRecords();
				if(checkData.length > 0){
					for (let i = 0;i < checkData.length;i++){
						if(checkData[i]['od_title'] == 3){
							this.$message({
							    message: '选择明细中包含接单抬头为盛大贸易，新建失败!请联系系统管理员。',
							    type: 'warning'
							});
							return false;
						}
					}
					this.$emit('afterAdd',checkData);
				}else{
					this.$message({
						message: '请选择明细!',
						type: 'warning'
					});
				}
			},
			
			query(){
				this.condition.selectTab = 1;
				let arrow = '';
				if(this.arrow)
					arrow = 'DESC';
				else 
					arrow = 'ASC';
				this.condition.orderBy = this.sort +' '+arrow;
				this.condition.keyword = this.condition.keyword.trim();
				this.condition.od_cus_id = this.ebs_head.ode_cus_id;
				ebsApi.queryEbs(JSON.stringify(this.condition)).then((result)=>{
					if(result.code == 0){
						this.budgetDetail = result.data.data || [];
						this.condition.totalResult = result.data.count;
					}
				})
			},
			
			async getOptions() {
			    let data = await this.$dmBaseSet.getOptions();
			    if(data.G_OM_PRICE_MODE.option_value){
			       this.priceMode = this.$general.objectKeyBy(data.G_OM_PRICE_MODE.option_value, 'value') || {};
			    }
			},
	    },
		beforeDestroy () {
			this.$refs.model1.close();
		},
		watch: {
		    show: {
		        handler(newVal) {
					if(newVal)
						this.query();
		        },
		    }
		},
	}
</script>