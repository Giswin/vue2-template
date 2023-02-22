<style scoped lang="scss">

</style>
<template>
	<vxe-modal title="批量设置" :value="show"  class-name="vertical-center-modal" :showFooter="true" width="440" height="410" resize remember @close="() => this.$emit('update:show', false)" destroy-on-close>
		<div>
			
			<el-row style="margin-bottom:10px;">
				<vxe-table size="mini" @edit-actived="handleQcActive"  border resizable :data="Data" height="280px" :mouse-config="{selected: true}" :keyboard-config="{isArsyRow: true, isDel: false, isEnter: true, isTab: true, isEdit: true}" auto-resize highlight-cell class="vxe-table-scrollbar"  :edit-config="{trigger: 'click', mode: 'cell', icon: 'fa fa-pencil'}">
				  
				  
				  <vxe-table-column field='label' title="设置字段"  header-align="center" :edit-render="{}">
					  
				  </vxe-table-column>
				 <vxe-table-column field="bset" title="是否设置" header-align="center" width="80" >
					  <template #header="{row}">
						  <span style="margin-top: -10px;">是否设置</span> <el-checkbox  @change="change_check" true-label=1 false-label=0 v-model="plset"></el-checkbox>
						   </template>
					 <template v-slot="{row,rowIndex}">
					  <el-checkbox style="margin-left: 35px;" @change="change_default(rowIndex)" true-label=1 false-label=0 v-model="row.bset"></el-checkbox>
					 								
					 </template>
				 </vxe-table-column>
				 
				  <vxe-table-column field="value" title="设置值"  width="230" header-align="center" align="left" :edit-render="{}">
						  <template #edit="{ row }">
						  <el-select  v-show="row.type=='ebs'"
						      v-model="row.value"
							  :disabled="row.bset==false"
						      filterable
						      remote
							  :keyboard-config="{isArrow: true, isDel: false, isEnter: true, isTab: true, isEdit: true, isChecked: true}"
							  :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}" :mouse-config="{selected: true}"
						      placeholder="请输入关键词"
						      :remote-method="remoteMethod1" 
						      :loading="loading">
						      <el-option
						        v-for="item in EbsgoodsOption"  :label="item.goods_name_ebs"
						        	:value="item.goods_name_ebs">
									<span style="float: left">{{ item.goods_name_ebs }}</span>
									 <span style="float: right; color: #8492a6;">{{ unit[item.goods_unit_ebs].dic_name }}</span>
						      </el-option>
						    </el-select>
							<el-select
							v-show="row.type=='ven'"
							    v-model="row.value"
							    filterable
							    remote
								clearable
								@clear="row.value=null;row.value_id=null;row.value_a=null;"
							    placeholder="请输入关键词"
								@change="((item)=>{handleSelectVen(item,row)})"
							    :remote-method="querySearchVen" 
							    :loading="loading">
							    <el-option
							      v-for="item in venOptions" :key="item.trader_id" :label="item.trader_name"
							      	:value="item.trader_name">
							    </el-option>
							  </el-select>
							
							<el-select v-show="row.type=='qc'" v-model="row.value_id" multiple :disabled="row.bset==false" filterable placeholder="可搜索的下拉框"
							            size="small" @change="(option)=>{changeQC(option,row)}" clearable  @clear="row.value_id = [];row.value_a = ''" >
							            <el-option v-for="item in row.option" :label="item.staff_name" :key="item.staff_id"
							                :value="item.staff_id"></el-option>
							</el-select>
							<el-select v-show="row.type=='cus'" v-model="row.value_id" :disabled="row.bset==false" @change="((item)=>{selectcus(item,row)})" @clear="row.value=''" filterable size="small" clearable style="width:100%;">
							    <el-option v-for="item in cusList" :key="item.trader_id" :label="item.trader_name_abb+' ('+item.trader_name+')'" :value="item.trader_id"></el-option>
							</el-select>
							<el-select v-show="row.type=='sel'" @focus="search_unit(row)" v-model="row.value" :disabled="row.bset==false"  @clear="row.value=''" filterable size="small" clearable style="width:100%;">
							    <el-option v-for="item in row.option" :key="item.dic_name" :label="item.dic_name" :value="item.dic_name"></el-option>
							</el-select>
							<el-input v-show="row.type==''" :readonly="row.bset==false" v-model="row.value" style="width:100%;" size="small"></el-input>
							  <el-date-picker
							      v-model="row.value"
							      :disabled="row.bset==false"
							      type="date"
							      placeholder="选择日期"
							     v-show="row.type=='date'"
								  format="yyyy 年 MM 月 dd 日"
								       value-format="yyyy-MM-dd">
							    </el-date-picker>
								<!-- <el-date-picker
							      v-model="row.value_etd"
							      :disabled="row.bset==false"
							      type="date"
							      placeholder="选择日期"
							     v-show="row.type=='etd'"
								  format="yyyy 年 MM 月 dd 日"
								       value-format="yyyy-MM-dd">
							    </el-date-picker> -->
						  </template>
			
				  </vxe-table-column>
				</vxe-table>
			</el-row>
			
			
		</div>
		<div slot="footer">
			<vxe-button @click="savepl">保存</vxe-button>
		</div>
	</vxe-modal>
</template>

<script>
import general from "@/common/general.js"
export default {
	
	components: {
		
	},
	props: {
		show: Boolean,
		Data:Array,//label:列名,type:编辑方式('ven':供应商,'cus':客户，'date':日期，'':输入，'sel':下拉，'option':下拉数组),'bset':'是否默认设置', 'value':默认设置值
	},
	data() {
		return {
			plset:'0',
			venList:{},
			venListData:[],
			venOptions:[],
			cusList:{},
			Ebsgoods:[],
			EbsgoodsData:[],
			EbsgoodsOption:[],
			loading:false,
			dic_jldw_list:[],
			unit:[],
		};
	},
	created() {
	    
	},
	methods: {
	    // 初始化数据加载
	    async initData() {
			this.$dmBaseSet.venderData().then((data)=>{
				this.venList = this.$general.objectKeyBy(data, 'trader_name') || [];
				this.venListData = data || [];
				for (let i = 0; i < this.venListData.length; i++) {
				    this.venListData[i]['value'] = this.venListData[i]['trader_name'];
				}
			});
			this.$dmBaseSet.customerData().then((data)=>{
				this.cusList = this.$general.objectKeyBy(data,'trader_id') || [];
			});
			//EBS商品列表
			this.$dmBaseSet.EbsGoodsData().then((data) => {
				this.EbsgoodsData = this.$general.objectKeyBy(data, 'goods_name_ebs') || [];
				this.Ebsgoods = data || [];
				for (let i = 0; i < this.Ebsgoods.length; i++) {
					this.Ebsgoods[i]['value'] = this.Ebsgoods[i]['goods_name_ebs'];
				}
			});
			this.$dmBaseSet.dicData('TY_JLDW,CS').then((data) => {
				this.dicList = data || {};
				// 计量单位
				this.dic_jldw_list = this.dicList['TY_JLDW'].children;
			this.unit = this.$general.objectKeyBy(this.dic_jldw_list,'dic_name_en') ;
			});
			
	    },
		handleSelectVen(item, row) {
		   row['value_id'] = this.venList[item].trader_id;
		    row['value'] =  this.venList[item].trader_name;
			row['value_a'] = this.venList[item].trader_name_abb;
		},
		remoteMethod1(query) {
		  if (query !== '') {
			this.loading = true;
			setTimeout(() => {
			  this.loading = false;
			  console.log(this.Ebsgoods);
			  this.EbsgoodsOption = this.Ebsgoods.filter(item => {
				return (item.goods_name_ebs).toLowerCase()
				  .indexOf(query.toLowerCase()) > -1;
			  });
			}, 200);
		  } else {
			this.EbsgoodsOption = [];
		  }
		},
		
		changeVen(row) {
		    if (this.venList[row.bom_vender_name]) {
				row['value_id'] = item.trader_id;
		    } else {
		       row['value_id'] = '';
		        row['value'] = '';
				row['value_a'] = '';
		    }
		},
		querySearchVen(query) {
		        if (query !== '') {
		          this.loading = true;
		          setTimeout(() => {
		            this.loading = false;
		            this.venOptions = this.venListData.filter(item => {
		              return (item.trader_name_abb+item.trader_name).toLowerCase()
		                .indexOf(query.toLowerCase()) > -1;
		            });
		          }, 200);
		        } else {
		          this.venOptions = [];
		        }
		      },
	
		createFilter(queryString) {
		    return (restaurant) => {
		        return ((restaurant.trader_name_abb+restaurant.trader_name).toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
		    };
		},
		
		//选择客户
		selectcus(item,row){
			row.value = this.cusList[item].trader_name_abb;
		},
		change_check(){
			if(this.plset=='1'){
				for (let i = 0;i < this.Data.length;i++){
					this.Data[i].bset = true;
				}
			
			}else{
				for (let i = 0;i < this.Data.length;i++){
					this.Data[i].bset = false;
					this.Data[i].value = '';
				}
				
			}
		
		},
		search_unit(row){
			let tmparr=[];
			if(row.label=='单位'){
				for (let i = 0;i < this.Data.length;i++){
					if(this.Data[i].type=='ebs'&&this.Data[i].value!=''){
						for (let m = 0; m < row.option.length; m++) {
							if(row.option[m].label.indexOf(this.EbsgoodsData[this.Data[i].value].goods_label)>=0){
								tmparr.push(row.option[m]);
							}
							
						}
						row.option = this.$general.deepClone(tmparr);
					}
				}
			}
			
		},
		change_default(rowIndex){
			if(this.Data[rowIndex].bset=='1'){
				let ebs=0;
				for (let i = 0;i < this.Data.length;i++){
					if(this.Data[i].type=='ebs'&&this.Data[i].value==''&&this.Data[rowIndex].label=='单位'){
						ebs=1;
						this.$XModal.alert({
							message: '请先选择EBS商品！',
							status: 'warning'
						});
					}
					
				}
				if(ebs==0){
					this.Data[rowIndex].bset = true;
				}else{
					this.Data[rowIndex].bset = false;
				}
			
				
			}else{
				this.Data[rowIndex].bset = false;
				this.Data[rowIndex].value = '';
			}
		},
		savepl(){
			this.$emit('aftersave',this.Data);
		},
		changeQC(ids,row){
			let ppn_qc_name = '';
			for (let i = 0;i < ids.length;i++){
				ppn_qc_name +=  row.option[ids[i]].staff_name + ',';
			}
			ppn_qc_name = ppn_qc_name.substring(0,(ppn_qc_name.length -1));
			row.value_a = ppn_qc_name;
			row.value = ppn_qc_name
		},
		handleQcActive({row}){
			if(row.type=='qc'){
				row.value = ''
				row.value_a = ''
			}
		}
		
	},
	watch:{
		show(newVal){
		   newVal && this.initData();
		 }
	}
};
</script>
