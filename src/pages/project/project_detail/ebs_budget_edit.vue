<style lang="scss">
//特殊样式，而不通用请在这里写样式
.note-img{
	img{
		height: 225px;
	}
}
.vxe-form .vxe-form--item{
	padding: 0em 0.8em 0.5em 0;
}

</style>
<template>
	<vxe-modal ref="model1" :value="show" width="1060" resize height="630" show-footer destroy-on-close>
		<template v-slot:header>
		    同步-{{ebs_path}}-{{ebs_head.ode_ebs_type == 2  ? '测算表' : '预算表'}}
			<div class="model-r">
				<div class="model-header-r">
				    ID：{{ebs_head.ode_id}}
				</div>
				<div class="model-screen">
					<i class="fa fa-window-maximize" v-show="downIcon" @click="screen"></i>
					<i class="fa fa-window-restore" v-show="!downIcon" @click="screen"></i>
				</div>
				<div class="model-close">
					<i class="fa fa-times" @click="closeModel"></i>
				</div>
			</div>
		</template>
		<div class="tabs">
		    <div class="tabs-col" :class="{ show: selectTab == 0 }" @click="selectTab = 0">基本信息</div>
		    <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectTab = 1" v-if="ebs_head.ode_ebs_type != 2">订单明细</div>
			<div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectTab = 2" v-if="ebs_head.ode_ebs_type != 2">采购明细</div>
			<div class="tabs-col" :class="{ show: selectTab == 3 }" @click="selectTab = 3" v-if="ebs_head.ode_ebs_type != 2">加工明细</div>
			<div class="tabs-col" :class="{ show: selectTab == 4 }" @click="selectTab = 4">费用明细</div>
		</div>
		<div class="tabs-body of">
			<div style="padding:0px 15px 0px 15px;" v-show="selectTab == 0">
				<el-row :gutter="12">
					<el-col :span="12">
						<table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
							<tbody>
								<tr>
									<th width="100" align="center">项目号-ID</th>
									<td style="background: #f5f7fa;">{{ebs_head.ode_project_code_ebs}}</td>
								</tr>
								<tr>
									<th align="center"><span style="color: red;">*</span>业务组</th>
									<td>
										<!-- <el-select
											style="width: 100%;"
											v-model="ebs_head.ode_dep_id_ebs"
											transfer
											filterable
											@change="changeUserGroup"
											label-in-value
											clearable
										>
											<el-option v-for="item in userGroup"
													:key="item.group_id"
													:value="item.group_id"
													:label="item.group_display_name"
											>
											</el-option>
										</el-select> -->
										<el-select
											style="width: 100%;"
											v-model="ebs_head.ode_dep_name_ebs"
											transfer
											filterable
											remote
											clearable
											placeholder="部门"
											@clear="ebs_head.ebs_head.ode_dep_id_ebs=null;ebs_head.ode_dep_name_ebs=null;"
											:remote-method="remoteDepMethod"
											:loading="loading"
											size="small"
											@change="changeUserGroup"
										>
											<el-option v-for="item in allUserGroup"
													   :key="item.group_display_name"
													   :value="item.group_display_name"
													   :label="item.group_display_name"
											>
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<th align="center"><span style="color: red;">*</span>制单人</th>
									<td>
										<el-select style="width: 100%;" v-model="ebs_head.ode_creator_id_ebs" transfer 
										filterable label-in-value :disabled="userGroup.length < 1" 
										@change="changeCreator" clearable>
											<el-option v-for="item in groupUser" 
													   :key="item.user_id" 
													   :value="item.user_id" 
													   :label="item.full_name"
											>
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<th align="center"><span style="color: red;">*</span>业务员</th>
									<td>
										<el-select style="width: 100%;" v-model="ebs_head.ode_sales_id_ebs" transfer filterable
											@change="changeGroupUser" label-in-value :disable="userGroup.length < 1" clearable>
											<el-option v-for="item in groupUser" 
													   :key="item.user_id" 
													   :value="item.user_id" 
													   :label="item.full_name">
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<th align="center"><span style="color: red;">*</span>订单类型</th>
									<td>
										<el-select style="width: 100%;" v-model="ebs_head.ode_bus_type_id_ebs" 
										transfer filterable clearable
										change="changeTradeType" 
										>
											<el-option v-for="item in tradeType" 
													   :key="item.transaction_type_id" 
													   :value="item.transaction_type_id" 
											           :label="item.name">
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<th align="center"><span style="color: red;">*</span>订单日期</th>
									<td>
										<el-date-picker v-model="ebs_head.ode_od_date" value-format="yyyy-MM-dd" type="date"
										    placeholder="选择日期" size="small" clearable>
										</el-date-picker>
									</td>
								</tr>
								<tr>
									<th align="center"><span style="color: red;">*</span>订单客户</th>
									<td style="background: #f5f7fa;">
										<el-select style="width:100%;" v-model="ebs_head.ode_cus_id_ebs" disabled>
											<el-option v-for="item in customer" 
													   :key="item.party_id" 
													   :value="item.party_id" 
													   :label="item.party_name">
											</el-option>
										</el-select>
										<div style="position: absolute;top:2px;right: 2px;">
											<el-button size="small" @click="showCustomer(1)">
												调整
											</el-button>
										</div>
									</td>
								</tr>
								<tr>
									<th align="center"><span style="color: red;">*</span>最终客户</th>
									<td style="background: #f5f7fa;">
										<el-select style="width:100%;" v-model="ebs_head.ode_end_cus_ebs" disabled>
											<el-option v-for="item in customerT" 
													   :key="item.party_id" 
													   :value="item.party_id" 
													   :label="item.party_name">
											</el-option>
										</el-select>
										<div style="position: absolute;top:2px;right: 2px;">
											<el-button size="small" @click="showCustomer(2)">
												调整
											</el-button>
										</div>
									</td>
								</tr>
								<tr>
									<th align="center">客户订单号</th>
									<td style="background: #f5f7fa;">
										<el-input style="width:100%;" clearable v-model="ebs_head.ode_od_code_cus"></el-input>
									</td>
								</tr>
							</tbody>		
						</table>
					</el-col>
					<el-col :span="12">
						<table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
							<tbody>
								<tr>
									<th width="100" align="center"><span style="color: red;">*</span>结算方式</th>
									<td>
										<el-select
											style="width: 100%;"
											transfer
											filterable
											clearable
											@change="changeTermsId"
											v-model="ebs_head.ode_collect_id_ebs"
										>
											<el-option v-for="item in paymentMethod"
													:key="item.id"
													:value="item.id"
													:label="item.code"
											>
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<th width="100" align="center"><span v-if="ebs_head.ode_od_type == '外销'" style="color: red;">*</span>价格条款</th>
									<td>
										<el-select style="width: 100%;" v-model="ebs_head.ode_price_clause" transfer filterable clearable>
											<el-option v-for="item in priceTerm" 
													   :key="item.lookup_code" 
													   :value="item.lookup_code" 
													   :label="item.lookup_code">
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<th width="100" align="center"><span style="color: red;">*</span>运输方式</th>
									<td>
										<el-select style="width: 100%;" v-model="ebs_head.ode_ship_mode_code_ebs" transfer filterable clearable>
											<el-option v-for="item in transMethod" 
													   :key="item.lookup_code"
													   :value="item.lookup_code"
													   :label="item.displayed_field + '-' + item.lookup_code">
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<th align="center"><span style="color: red;">*</span>交货日期</th>
									<td style="background: #f5f7fa;">
										<el-date-picker v-model="ebs_head.ode_delivery_date_ebs" 
										value-format="yyyy-MM-dd" type="date"
										    placeholder="选择日期" size="small" clearable></el-date-picker>
										</el-input>
									</td>
								</tr>
								<tr>
									<th align="center">订单数量</th>
									<td style="background: #f5f7fa;">{{ebs_head.ode_qty_sales_ebs}}</td>
								</tr>
								<tr>
									<th width="100" align="center"><span style="color: red;">*</span>数量单位</th>
									<td>
										{{ebs_head.ode_qty_unit_ebs}}
									</td>
								</tr>
								<tr>
									<th align="center">公司费用</th>
									<td style="background: #f5f7fa;">
										<el-input style="width:100%;" clearable v-model="ebs_head.ode_amount_fee_ebs"></el-input>
									</td>
								</tr>
								<tr>
									<th align="center">SWIFT码</th>
									<td>
										<el-input style="width:100%;" v-model="ebs_head.ode_swift_code_ebs" clearable></el-input>
									</td>
								</tr>
								<tr>
									<th align="center">订单备注</th>
									<td>
										<el-input style="width:100%;" v-model="ebs_head.ode_memo" clearable>
										</el-input>
									</td>
								</tr>
							</tbody>		
						</table>
					</el-col>
				</el-row>
			</div>
			<div style="padding:0px 15px 0px 15px;" v-show="selectTab == 1">
				<div>
					<div class="m-r">
						<el-dropdown>
							<el-button size="small">
						    操作<i class="el-icon-arrow-down el-icon--right"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item @click.native="addDetail()">增行</el-dropdown-item>
								<el-dropdown-item @click.native="delDetail()">删行</el-dropdown-item>
								<el-dropdown-item @click.native="showSetModel('ebs_line_order')">批量设置</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
				<div class="model-bottom-body" style="top:50px;">
					<vxe-table ref="ebs_line_order" @checkbox-change="checkboxChangeOrder" border resizable 
					:data="ebs_line_order"  :edit-rules="validRule"
					size="small"  class="mytable-scrollbar" show-overflow height="100%" auto-resize 
					:column-config="{minWidth:100}" :edit-config="{trigger: 'click', mode: 'cell'}">
						<vxe-table-column type="checkbox" width="40" align="center" fixed="left"></vxe-table-column>
						<vxe-table-column type="seq" title="序号" width="40" align="center" ></vxe-table-column>
						<vxe-table-column field="oded_style_no_ebs" title="中文款号" width="160" header-align="center"
						 :edit-render="{name: 'ElInput'}" sortable 
						 :filters="[{ data: '' }]" :filter-method="filterMethod">
							<template #filter="{ $panel, column }">
							    <vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
						 </vxe-table-column>
						<!-- <vxe-table-column field="oded_style_no_en_ebs" title="英文款号" header-align="center" :edit-render="{name: 'ElInput'}" sortable></vxe-table-column > -->
						<vxe-table-column field="oded_stock_org_id_ebs" title="库存组织" width="100" header-align="center" >
							<template v-slot="{ row,rowIndex }">
								<el-select
									style="width: 100%;"
									v-model="row.oded_stock_org_id_ebs"
									transfer
									disabled
									@change="changeOrganization(row)"
								>
									<el-option v-for="item in stockOrg"
											:key="item.organization_id"
											:value="item.organization_id"
											:label="item.organization_name"
									>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_item_id_ebs" title="商品名称-EBS" width="140" header-align="center" 
						:edit-render="{}"
						:filters="[{ data: '' }]" :filter-method="filterMethod">
							<template #filter="{ $panel, column }">
							    <vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.oded_item_description_ebs"
									filterable
									remote
									placeholder="商品"
									clearable
									:remote-method="remoteGoodMethod"
									:loading="loading"
									size="small"
									@change="changeGoods(row)"
								>
									<el-option v-for="item in allGoodsList"
											   :key="item.description"
											   :value="item.description"
											   :label="item.description+'|'+item.segment1"
									>
										<span style="float: left">{{ item.description+'|'+item.segment1 }}</span>
										<span style="float: right; color: #8492a6;" v-if="Object.keys(unitObj).length > 0">{{ unitObj[item.primary_uom_code]['unit_of_measure_tl'] }}</span>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_specs_ebs" title="商品名称" width="140" header-align="center" 
						:edit-render="{name: 'ElInput'}" sortable
						:filters="[{ data: '' }]" :filter-method="filterMethod">
							<template #filter="{ $panel, column }">
							    <vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_qty_ebs" title="数量" width="80" header-align="center" align="right" :edit-render="{}">
							<template v-slot:edit="{row}">
								<el-input style="width:100%;"
									v-model="row.oded_qty_ebs"
									@change="row.oded_amount_ebs = row.oded_qty_ebs * row.oded_price_ebs"></el-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_unit_code_ebs" title="单位" width="100" align="center" >
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.oded_unit_code_ebs"
									transfer
									filterable
									@change="changeUnit(row)"
								>
									<el-option v-for="item in unit"
											   :key="item.uom_code"
											   :value="item.uom_code"
											   :label="item.unit_of_measure_tl"
											   
									>
									</el-option>
								</el-select>
								<!-- v-if="row.unit_type == item.uom_class || !row.unit_type" -->
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_currency_ebs" title="币种" width="100" align="center" >
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.oded_currency_ebs"
									transfer
									filterable
									@change="changeCurrency(row)"
									disabled
								>
									<el-option v-for="item in BZ"
											   :key="item.dic_name"
											   :value="item.dic_name"
											   :label="item.dic_name"
									>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_price_ebs" title="单价" width="60" header-align="center" align="right" :edit-render="{}">
							<template v-slot:edit="{row}">
								<el-input style="width:100%;"
									v-model="row.oded_price_ebs"
									@change="row.oded_amount_ebs = row.oded_qty_ebs * row.oded_price_ebs"></el-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_amount_ebs" title="金额" width="80" header-align="center" align="right"></vxe-table-column>
						<vxe-table-column field="oded_ex_rate_ebs" title="汇率" width="60" header-align="center" :edit-render="{name: 'ElInput'}"></vxe-table-column>
						<vxe-table-column field="oded_tax_rate_code" title="税率" width="60" header-align="center"></vxe-table-column>
					</vxe-table>
				</div>
			</div>
			<div style="padding:0px 15px 0px 15px;" v-show="selectTab == 2">
				<div>
					<div class="m-r">
						<div>
							<div class="m-r">
								<el-dropdown>
									<el-button size="small">
								    操作<i class="el-icon-arrow-down el-icon--right"></i>
									</el-button>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item @click.native="showSetModel('ebs_line_product')">批量设置</el-dropdown-item>
										<el-dropdown-item @click.native="showSetDataModal()" v-show="ebs_head.ode_system_type == 3">设置单价</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</div>
						</div>
					</div>
				</div>
				<div class="model-bottom-body" style="top:50px;">
					<vxe-table border resizable ref="ebs_line_product" :data="ebs_line_product" size="small" class="mytable-scrollbar" 
					height="100%" auto-resize :column-config="{minWidth:100}" show-overflow
					:edit-config="{trigger: 'click', mode: 'cell'}"
					:edit-rules="validRule">
						<vxe-table-column type="checkbox" width="40" align="center" fixed="left"></vxe-table-column>
						<vxe-table-column type="seq" title="序号" width="40" align="center" ></vxe-table-column>
						<vxe-table-column field="oded_style_no_ebs" title="中文款号" width="160" header-align="center" 
						:edit-render="{name: 'ElInput'}" sortable
						:filters="[{ data: '' }]" :filter-method="filterMethod">
							<template #filter="{ $panel, column }">
								<vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
						</vxe-table-column>
						<!-- <vxe-table-column field="oded_style_no_en_ebs" title="英文款号" header-align="center" :edit-render="{name: 'ElInput'}" sortable></vxe-table-column> -->
						<vxe-table-column field="oded_stock_org_id_ebs" title="库存组织" width="100" header-align="center" >
							<template v-slot="{ row,rowIndex }">
								<el-select
									style="width: 100%;"
									v-model="row.oded_stock_org_id_ebs"
									transfer
									filterable
									clearable
									@change="changeOrganization(row)"
								>
									<el-option v-for="item in stockOrg"
											   :key="item.organization_id"
											   :value="item.organization_id"
											   :label="item.organization_name"
									>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_item_id_ebs" title="商品名称-EBS" width="140" header-align="center" 
						:edit-render="{}"
						:filters="[{ data: '' }]" :filter-method="filterMethod">
							<template #filter="{ $panel, column }">
								<vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.oded_item_description_ebs"
									filterable
									remote
									placeholder="商品"
									clearable
									:remote-method="remoteGoodMethod"
									:loading="loading"
									size="small"
									@change="changeGoods(row)"
								>
									<el-option v-for="item in allGoodsList"
											   :key="item.description"
											   :value="item.description"
											   :label="item.description+'|'+item.segment1"
									>
										<span style="float: left">{{ item.description+'|'+item.segment1 }}</span>
										<span style="float: right; color: #8492a6;" v-if="Object.keys(unitObj).length > 0">{{ unitObj[item.primary_uom_code]['unit_of_measure_tl'] }}</span>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_specs_ebs" title="商品名称" width="140" header-align="center" 
						:edit-render="{name: 'ElInput'}" sortable
						:filters="[{ data: '' }]" :filter-method="filterMethod">
							<template #filter="{ $panel, column }">
								<vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_vender_id_ebs" title="供应商" width="280" header-align="center">
							<template v-slot="{ row,rowIndex }">
								<div style="padding-right: 60px;">
									{{row.oded_vender_name}}--{{row.oded_vender_id_ebs}}
									<div style="position: absolute;top:3px;right:1px;">
										<el-button size="small" style="width:60px;" @click="showCustomer(3,rowIndex,'product')">调整</el-button>
									</div>
								</div>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_loss_rate_ebs" title="损耗%" width="60" header-align="center" align="right"></vxe-table-column>
						<vxe-table-column field="oded_qty_ebs" title="数量" width="80" header-align="center" align="right" :edit-render="{}">
							<template v-slot:edit="{row}">
								<el-input style="width:100%;"
									v-model="row.oded_qty_ebs"
									@change="row.oded_amount_ebs = row.oded_qty_ebs * row.oded_price_ebs"></el-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_unit_code_ebs" title="单位" width="80" align="center" >
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.oded_unit_code_ebs"
									transfer
									filterable
									clearable
									@change="changeUnit(row)"
								>
									<el-option v-for="item in unit"
											   :key="item.uom_code"
											   :value="item.uom_code"
											   :label="item.unit_of_measure_tl"
											    v-if="row.unit_type == item.uom_class || !row.unit_type"
									>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						
						<vxe-table-column field="oded_currency_ebs" :title="ebs_head.ode_system_type == 3 ? '采购币种' : '币种'" width="80" align="center" >
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.oded_currency_ebs"
									transfer
									filterable
									clearable
									@change="changeCurrency(row)"
								>
									<el-option v-for="item in BZ"
											   :key="item.dic_name"
											   :value="item.dic_name"
											   :label="item.dic_name"
									>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_price_ebs" :title="ebs_head.ode_system_type == 3 ? '采购单价' : '单价'" width="80" header-align="center" align="right" :edit-render="{}">
							<template v-slot:edit="{row}">
								<el-input style="width:100%;"
									v-model="row.oded_price_ebs"
									@change="row.oded_amount_ebs = row.oded_qty_ebs * row.oded_price_ebs"></el-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_amount_ebs" :title="ebs_head.ode_system_type == 3 ? '采购金额' : '金额'" width="80" header-align="center" align="right"></vxe-table-column>
						<vxe-table-column field="oded_ex_rate_ebs" :title="ebs_head.ode_system_type == 3 ? '采购汇率' : '汇率'" width="80" header-align="center" :edit-render="{name: 'ElInput'}"></vxe-table-column>
						
						<vxe-table-column  field="oded_currency_ebs_order" title="销售币种" width="80" align="center" >
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.oded_currency_ebs_order"
									transfer
									filterable
									clearable
									@change="changeCurrencyOrder(row)"
								>
									<el-option v-for="item in BZ"
											   :key="item.dic_name"
											   :value="item.dic_name"
											   :label="item.dic_name"
									>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column  field="oded_price_ebs_order" title="销售单价" width="80" header-align="center" align="right" :edit-render="{}">
							<template v-slot:edit="{row}">
								<el-input style="width:100%;"
									v-model="row.oded_price_ebs_order"
									@change="row.oded_amount_ebs_order = row.oded_qty_ebs * row.oded_price_ebs_order"></el-input>
							</template>
						</vxe-table-column>
						<vxe-table-column  field="oded_amount_ebs_order" title="销售金额" width="80" header-align="center" align="right"></vxe-table-column>
						<vxe-table-column  field="oded_ex_rate_ebs_order" title="销售汇率" width="80" header-align="center" :edit-render="{name: 'ElInput'}"></vxe-table-column>
						
						<vxe-table-column field="oded_tax_rate_code" title="税率" width="60" header-align="center"></vxe-table-column>
						<vxe-table-column field="oded_tax_rebate_rate_ebs" title="退税率" width="60" header-align="center" align="right" ></vxe-table-column>
						<vxe-table-column field="oded_sales_type_ebs" title="转开票" width="60" header-align="center" :edit-render="{}">
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.oded_sales_type_ebs"
									transfer
									filterable
									clearable
								>
									<el-option v-for="item in attribute7Arr"
											   :key="item.value"
											   :value="item.value"
											   :label="item.value"
									>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
					</vxe-table>
				</div>
			</div>
			<div style="padding:0px 15px 0px 15px;" v-show="selectTab == 3">
				<div>
					<div class="m-r">
						<div>
							<div class="m-r">
								<el-dropdown>
									<el-button size="small">
								    操作<i class="el-icon-arrow-down el-icon--right"></i>
									</el-button>
									<el-dropdown-menu slot="dropdown">
										<el-dropdown-item @click.native="showSetModel('ebs_line_process')">批量设置</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</div>
						</div>
					</div>
				</div>
				<div class="model-bottom-body" style="top:50px;">
					<vxe-table border resizable ref="ebs_line_process" :data="ebs_line_process" size="small" class="mytable-scrollbar"
					  height="100%" auto-resize :column-config="{minWidth:100}" 
					  :edit-config="{trigger: 'click', mode: 'cell'}"
					  :edit-rules="validRule">
						<vxe-table-column type="checkbox" width="40" align="center" fixed="left"></vxe-table-column>
						<vxe-table-column type="seq" title="序号" width="40" align="center" ></vxe-table-column>
						<vxe-table-column field="oded_style_no_ebs" title="中文款号" width="160" header-align="center" 
						:edit-render="{name: 'ElInput'}" sortable
						:filters="[{ data: '' }]" :filter-method="filterMethod">
							<template #filter="{ $panel, column }">
								<vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
						</vxe-table-column>
						<!-- <vxe-table-column field="oded_style_no_en_ebs" title="英文款号" header-align="center" :edit-render="{name: 'ElInput'}" sortable></vxe-table-column> -->
						<vxe-table-column field="oded_specs_ebs" title="中文规格" width="140" header-align="center" :edit-render="{name: 'ElInput'}"></vxe-table-column>
						<vxe-table-column field="oded_specs_en_ebs" title="英文规格" width="140" header-align="center" :edit-render="{name: 'ElInput'}"></vxe-table-column>
						<vxe-table-column field="oded_stock_org_id_ebs" title="库存组织" width="100" header-align="center" >
							<template v-slot="{ row,rowIndex }">
								<el-select
									style="width: 100%;"
									v-model="row.oded_stock_org_id_ebs"
									transfer
									filterable
									clearable
									@change="changeOrganization(row)"
								>
									<el-option v-for="item in stockOrg"
											  :key="item.organization_id"
											  :value="item.organization_id"
											  :label="item.organization_name"
									>
									</el-option>
								</el-select>
								
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_item_id_ebs" title="商品名称-EBS" width="140" header-align="center" 
						:edit-render="{}"
						:filters="[{ data: '' }]" :filter-method="filterMethod"
						>
							<template #filter="{ $panel, column }">
								<vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.oded_item_description_ebs"
									filterable
									remote
									placeholder="商品"
									clearable
									:remote-method="remoteGoodMethod"
									:loading="loading"
									size="small"
									@change="changeGoods(row)"
								>
									<el-option v-for="item in allGoodsList"
											   :key="item.description"
											   :value="item.description"
											   :label="item.description+'|'+item.segment1"
									>
										<span style="float: left">{{ item.description+'|'+item.segment1 }}</span>
										<span style="float: right; color: #8492a6;" v-if="Object.keys(unitObj).length > 0">{{ unitObj[item.primary_uom_code]['unit_of_measure_tl'] }}</span>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_item_name_ebs" title="商品名称" width="140" header-align="center" 
						:edit-render="{name: 'ElInput'}" sortable
						:filters="[{ data: '' }]" :filter-method="filterMethod"
						>
							<template #filter="{ $panel, column }">
								<vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_vender_id_ebs" title="供应商" width="280" header-align="center">
							<template v-slot="{ row,rowIndex }">
								<div style="display: flex;">
									<div style="flex: 1;padding-top: 8px;">
										<!-- <el-select
											style="width:100%;"
											v-model="row.oded_vender_id_ebs"
											clearable
											@clear="row.oded_vender_id_ebs = 0;row.oded_vender_name_ebs = ''"
										>
											<el-option v-for="item in vender"
													   :key="item.party_id"
													   :value="item.party_id"
													   :label="item.party_name"
											>
											</el-option>
										</el-select> -->
										{{row.oded_vender_name}}--{{row.oded_vender_id_ebs}}
									</div>
									<div style="width: 70px;">
										<el-button style="width:100%;"
												@click="showCustomer(3,rowIndex,'process')"
										>
											调整
										</el-button>
									</div>
								</div>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_mo_type_ebs" title="加工类型" width="80" header-align="center" :edit-render="{}">
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.oded_mo_type_ebs"
									transfer
									filterable
									clearable
									@change="changeMoTypeEbs(row)"
								>
									<el-option v-for="item in processType"
											  :key="item.lookup_code"
											  :value="item.lookup_code"
											  :label="item.meaning"
									>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_loss_rate_ebs" title="损耗%" width="60" header-align="center" align="right"></vxe-table-column>
						<vxe-table-column field="oded_qty_ebs" title="数量" width="80" header-align="center" align="right" :edit-render="{}">
							<template v-slot:edit="{ row }">
								<el-input
									style="width:100%;"
									v-model="row.oded_qty_ebs"
									@change="changeGetAmountMo(row)"
								>
								</el-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_unit_code_ebs" title="单位" width="80" align="center" :edit-render="{}">
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.oded_unit_code_ebs"
									transfer
									filterable
									clearable
									@change="changeUnit(row)"
								>
									<el-option v-for="item in unit"
											   :key="item.uom_code"
											   :value="item.uom_code"
											   :label="item.unit_of_measure_tl"
											    v-if="row.unit_type == item.uom_class || !row.unit_type"
									>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_currency_ebs" title="币种" width="80" align="center" :edit-render="{}">
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.oded_currency_ebs"
									transfer
									filterable
									clearable
									@change="changeCurrency(row)"
								>
									<el-option v-for="item in BZ"
											   :key="item.dic_name"
											   :value="item.dic_name"
											   :label="item.dic_name"
									>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_end_process_price_ebs" title="成品单价" width="70" header-align="center" align="right" :edit-render="{}">
							<template v-slot:edit="{ row }">
								<el-input
									style="width:100%;"
									v-model="row.oded_end_process_price_ebs"
								>
								</el-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_mo_price_ebs" title="加工单价" width="70" header-align="center" align="right" :edit-render="{}">
							<template v-slot:edit="{ row }">
								<el-input
									style="width:100%;"
									v-model="row.oded_mo_price_ebs"
									@change="changeGetAmountMo(row)"
								>
								</el-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="oded_amount_ebs" title="金额" width="80" header-align="center" align="right"></vxe-table-column>
						<vxe-table-column field="oded_ex_rate_ebs" title="汇率" width="60" header-align="center" :edit-render="{name: 'ElInput'}"></vxe-table-column>
						<vxe-table-column field="oded_tax_rate_code" title="税率" width="60" header-align="center"></vxe-table-column>
						<vxe-table-column field="oded_tax_rebate_rate_ebs" title="退税率" width="60" header-align="center" align="right" ></vxe-table-column>
						<vxe-table-column field="oded_sales_type_ebs" title="转开票" width="60" header-align="center" :edit-render="{}">
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.oded_sales_type_ebs"
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
							</template>
						</vxe-table-column>
					</vxe-table>
				</div>
			</div>
			<div style="padding:0px 15px 0px 15px;" v-show="selectTab == 4">
				<div>
					<div class="m-r">
						<!-- <el-dropdown>
							<el-button size="small">
						    批量设置<i class="el-icon-arrow-down el-icon--right"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>删除</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown> -->
					</div>
				</div>
				<div class="model-bottom-body" style="top:50px;">
					<vxe-table border resizable :data="ebs_cost" size="small" class="mytable-scrollbar" 
					show-overflow height="100%" auto-resize :column-config="{minWidth:100}" 
					:edit-config="{trigger: 'click', mode: 'cell'}">
						<vxe-table-column field="odef_line_id_ebs" title="项目费用ID" align="center" width="120"></vxe-table-column>
						<vxe-table-column field="odef_project_id_ebs" title="项目ID" align="center" width="120"></vxe-table-column>
						<vxe-table-column field="odef_name" title="费用名称" align="center" width="120"></vxe-table-column>
						<vxe-table-column field="odef_fee_type_code_ebs" title="费用类型代码" align="center" width="120"></vxe-table-column>
						<vxe-table-column  field="odef_vender_id" title="供应商id" align="center" width="120"></vxe-table-column>
						<vxe-table-column  field="odef_currency_ebs" title="币种" align="center" width="120"></vxe-table-column>
						<vxe-table-column  field="odef_amount_ebs" title="金额" align="center" width="120" :edit-render="{}">
							<template v-slot:edit="{ row }">
								<el-input
									style="width:100%;"
									v-model="row.odef_amount_ebs"
								>
								</el-input>
							</template>
						</vxe-table-column>
						<vxe-table-column  field="odef_ex_rate_ebs" title="汇率" align="center" width="120" :edit-render="{name: 'ElInput'}"></vxe-table-column>
						<vxe-table-column  field="odef_tax_rate_ebs" title="税率" align="center" width="120" :edit-render="{name: 'ElInput'}"></vxe-table-column>
						<vxe-table-column  field="odef_line_memo_ebs" title="备注" align="center" width="120" :edit-render="{name: 'ElInput'}"></vxe-table-column>
						<vxe-table-column  field="odef_creator_id_ebs" title="创建人" align="center" width="120" :edit-render="{}">
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.odef_creator_id_ebs"
									transfer
									filterable
									label-in-value
									:disabled="userGroup.length < 1"
								>
									<el-option v-for="item in groupUser"
											   :key="item.user_id"
											   :value="item.user_id"
											   :label="item.full_name"
									>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
					</vxe-table>
				</div>
			</div>
		</div>
		<template v-slot:footer>
			<div class="m-r">
				<!-- <vxe-button size="small" v-if="!ebs_head.ode_project_id_ebs && ebs_head.ode_state != 1" @click="updateOrderEbsList(2)">保存</vxe-button> -->
				<vxe-button size="small"  @click="showUpdateModal()">同步预览</vxe-button>
				<vxe-button size="small" v-if="ebs_head.ode_project_id_ebs && 1==0" @click="updateAudit">同步审核信息</vxe-button>
				<!-- <vxe-button size="small" v-if="ebs_head.ode_project_id_ebs" @click="print_budget()">打印预览</vxe-button> -->
			</div>
		</template>
		
		<!-- 预算添加弹层 -->
		<budget_add v-show="budgetDetailModal" :show.sync="budgetDetailModal" 
		:ebs_head="ebs_head" @afterAdd="afterAdd">
		</budget_add>
		<budget_add_other v-show="productDetailModal" :show.sync="productDetailModal"
		:ebs_head="ebs_head" :ebs_path="ebs_path" @afterAdd="afterProdcutAdd">
		</budget_add_other>
		<!-- 预算添加弹层 -->
		
		<!-- 客户弹层 -->
		<vxe-modal title="交易方弹层" :value="customerModal" v-show="customerModal" @close="customerModal=false" class-name="vertical-center-modal" height="600px" resize remember :showFooter="true" :mask-closable="false" width="800">
			<el-input placeholder="全称" style="width: 100%;" v-model="customerFullName" @change="getCustomerFullName">
				<el-button slot="append" icon="el-icon-search" @click="getCustomerFullName()"></el-button>
			</el-input>
		<div>
			<vxe-table ref="customerList" border resizable highlight-cell :data="customerList" class="vxe-table-scrollbar" auto-resize :edit-config="{trigger: 'click', mode: 'cell'}">
				<vxe-table-column type="checkbox" align="center" width="50"></vxe-table-column>
				<vxe-table-column type="seq" title="序号" align="center" width="50"></vxe-table-column>
				<vxe-table-column field="trader_name" title="交易方全称" header-align="center" align="left"  width="200"></vxe-table-column>
				<vxe-table-column field="trader_co_address" title="注册地址/联系" header-align="center" align="left"  ></vxe-table-column>
			</vxe-table>	
			<span v-show="customerList.length == 0" style="color: red;">如查询不到交易方,请联系系统管理员。</span>
		</div>
		<div slot="footer">
			<div class="m-r">
				<el-button size="small" @click="changeCustomer()">确定</el-button>
			</div>
		</div>
		</vxe-modal>
		<!-- 客户弹层 -->
		
		<!-- 批量设置 -->
		<set_model v-if="loading1" v-show="setModal" :show.sync="setModal" @afterSave="setAfter" :ebs_path="ebs_path" :initObject="setObject"></set_model>
		<!-- 批量设置 -->
		
		<!-- 单价计算弹层 -->
		<vxe-modal  title="销售单价计算" :value="setDataModal" v-show="setDataModal" :showFooter="true"
		 @close="setDataModal=false" :mask-closable="false" width="800" height="400px">
			<div style="width:99%;">
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
					<tbody>
						<tr>
							<th align="center" width="100">采购单价倍率</th>
							<td>
								<el-input v-model="setData.compute"></el-input>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div>
				<span style="color:red;">计算方法:如果采购币种是CNY时，销售单价=采购单价*倍率/(1+增值税率)/销售币种汇率</br>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											如果采购币种非CNY时，销售单价=采购单价*采购币种汇率*倍率/销售币种汇率</span>
			</div>
			<div slot="footer">
				<div class="m-r">
					<el-button size="small" @click="pl_set">确定</el-button>
				</div>
			</div>
		</vxe-modal>
		<!-- 单价计算弹层 -->
		
		<!-- 发布预览弹层 -->
		<vxe-modal  title="发布预览" :value="updateModal" v-show="updateModal" :showFooter="true"
		 @close="updateModal=false" :mask-closable="false" width="800" height="400px">
			<div style="width:99%;">
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
					<tbody>
						<tr>
							<th align="center" width="100">订单金额</th>
							<td>
								{{ebs_budget_detail_currency}} {{$general.transform(sum.order_amount || 0)}}
							</td>
						</tr>
						<tr>
							<th align="center" width="100">总成本</th>
							<td>
								CNY {{$general.transform(sum.cgcb_amount || 0)}}
							</td>
						</tr>
						<tr>
							<th align="center" width="100">利润</th>
							<td>
								CNY {{$general.transform(sum.lr || 0)}}
							</td>
						</tr>
						<tr>
							<th align="center" width="100">利润率</th>
							<td>
								{{sum.lrl}}%
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div slot="footer">
				<div class="m-r">
					<el-button v-if="!ebs_head.ode_state_aprv" size="small" @click="updateOrderEbsList(1)">同步</el-button>
				</div>
			</div>
		</vxe-modal>
		<!-- 发布预览弹层 -->
	</vxe-modal>
</template>

<script>
	 
	import ifsApi from '@/api/ifs'
	import ebsApi from '@/api/gbs/ebs.js'
	import projectApi from '@/api/cbs/project.js'
	import omApi from '@/api/gbs/om.js'
	import budget_add from '@/pages/project/project_detail/budget_add';
	import budget_add_other from '@/pages/project/project_detail/budget_add_other';
	import set_model from '@/pages/project/project_detail/set_model';
	
	export default {
		components: {
			budget_add,
			set_model,
			budget_add_other,
		},
	    props: {
			show: Boolean,
			id:'',
	    },
		created() {
			
		},
	    data() {
			return {
				showview: false,
				downIcon: true,
				customerModal:false,
				setModal:false,
				setDataModal:false,
				updateModal:false,
				selectTab:0,
				
				ebs_path:'HS',
				loading:false,
				loading1:false,
				
				ebs_head:{},
				ebs_line:[],
				ebs_cost:[],
				ebs_head_default:{},
				ebs_line_default:[],
				ebs_cost_default:[],
				
				ebs_line_order:[],
				ebs_line_product:[],
				ebs_line_process:[],
				
				userGroupId:'',
				allUserGroup:[],//业务组
				userGroup:[],//业务组
				groupUser:[],//业务
				tradeType:[],//业务类型
				customer:[],//客户
				customerT:[],//最终客户
				customerList:[],//客户列表
				customerFullName:'',
				customerType:0,
				paymentMethod:[],//付款方式
				transMethod:[],//出运方式
				priceTerm:[],//价格条款
				unit:[],//数量单位
				unitObj:{},
				currency:[],//币种单位
				stockOrg:[],//库存组织
				processType:[],//加工类型
				feeType:[],//费用类型
				vender:[],//供应商
				lineRow:'',
				allGoodsList:[],
				goodsList:[],//商品
				x_project_number:'',
				
				salesPayment:[],//付款方式
				paymentMethodO:[],
				productPaymetType:[],
				productPaymet:[],
				attribute7Arr:[
					{'code':'转开','value':'转开'},
					{'code':'不转开','value':'不转开'},
				],
				line_type:'',
				
				budgetDetailModal:false,
				productDetailModal:false,
				TY_JLDW:[],
				TY_JLDW_EN:[],
				
				validRule:{
					oded_stock_org_id_ebs : [
						{ required: true, message: '请填写库存组织' },
					],
					oded_item_id_ebs : [
						{ required: true, message: '请编辑商品ID' },
					],
					oded_vender_id_ebs : [
						{ required: true, message: '请编辑供应商' },
					],
				},
				
				setTable:'',
				rateData:{},
				BZ:[],
				setData:{
					compute:1,
				},
				columns:[],
				setObject:{
					stock_org_id_ebs:'',
					stock_org_name_ebs:'',
				},
				sum:{
					order_qty:0,
					order_amount:0,
					order_amount_usd:0,
					material_amount:0,
					material_qty:0,
					accessories_amount:0,
					accessories_qty:0,
					pack_amount:0,
					pack_qty:0,
					mo_amount:0,
					mo_qty:0,
					cb_amount:0,
					ts_amount:0,
					other_free_cny:0,
					other_free_usd:0,
					cgcb_amount:0,
					srje_amount:0,
					srrmbje_amount:0,
					lr:0,
					lrl:0,
					hhcb:0,
				},
				ebs_budget_detail_currency:0,
				ebs_budget_detail_rate:0,
			}	 
		},
		beforeDestroy () {
			this.$refs.model1.close();
		},
		watch:{
		    show:{
		        handler(newVal, oldVal){
					this.initData();
		        },
		        immediate:true,
		    },
			ebs_line_order:{
				handler(newVal, oldVal){
					if(this.ebs_head.ode_system_type == 3){
						let ebs_line_order_obj = this.$general.objectKeyBy(this.ebs_line_order,'oded_bom_id');
						//for (let i = 0;i < this.ebs_line_order.length;i++){
							for (let j = 0;j < this.ebs_line_product.length;j++){
								//if(this.ebs_line_order[i]['oded_bom_id'] == this.ebs_line_product[j]['oded_bom_id']){
									this.$set(this.ebs_line_product[j],'oded_style_no_ebs',ebs_line_order_obj[this.ebs_line_product[j]['oded_bom_id']]['oded_style_no_ebs']);
									this.$set(this.ebs_line_product[j],'oded_stock_org_id_ebs',ebs_line_order_obj[this.ebs_line_product[j]['oded_bom_id']]['oded_stock_org_id_ebs']);
									this.$set(this.ebs_line_product[j],'oded_stock_org_name_ebs',ebs_line_order_obj[this.ebs_line_product[j]['oded_bom_id']]['oded_stock_org_name_ebs']);
									this.$set(this.ebs_line_product[j],'oded_item_id_ebs',ebs_line_order_obj[this.ebs_line_product[j]['oded_bom_id']]['oded_item_id_ebs']);
									this.$set(this.ebs_line_product[j],'oded_item_name_ebs',ebs_line_order_obj[this.ebs_line_product[j]['oded_bom_id']]['oded_item_name_ebs']);
									this.$set(this.ebs_line_product[j],'oded_item_description_ebs',ebs_line_order_obj[this.ebs_line_product[j]['oded_bom_id']]['oded_item_description_ebs']);
									this.$set(this.ebs_line_product[j],'oded_qty_ebs',ebs_line_order_obj[this.ebs_line_product[j]['oded_bom_id']]['oded_qty_ebs']);
									this.$set(this.ebs_line_product[j],'oded_price_ebs_order',ebs_line_order_obj[this.ebs_line_product[j]['oded_bom_id']]['oded_price_ebs']);
									this.$set(this.ebs_line_product[j],'oded_amount_ebs_order',ebs_line_order_obj[this.ebs_line_product[j]['oded_bom_id']]['oded_amount_ebs']);
									this.$set(this.ebs_line_product[j],'oded_currency_ebs_order',ebs_line_order_obj[this.ebs_line_product[j]['oded_bom_id']]['oded_currency_ebs']);
									this.$set(this.ebs_line_product[j],'oded_ex_rate_ebs_order',ebs_line_order_obj[this.ebs_line_product[j]['oded_bom_id']]['oded_ex_rate_ebs']);
								//}
							}
							this.$forceUpdate();
						//}
					}
				},
				immediate:true,
				deep:true,
			},
			ebs_line_product:{
				handler(newVal, oldVal){
					if(this.ebs_head.ode_system_type == 3){
						let ebs_line_product_obj = this.$general.objectKeyBy(this.ebs_line_product,'oded_bom_id');
						//for (let j = 0;j < this.ebs_line_product.length;j++){
							for (let i = 0;i < this.ebs_line_order.length;i++){
								//if(this.ebs_line_order[i]['oded_bom_id'] == this.ebs_line_product[j]['oded_bom_id']){
									this.$set(this.ebs_line_order[i],'oded_style_no_ebs',ebs_line_product_obj[this.ebs_line_order[i]['oded_bom_id']]['oded_style_no_ebs']);
									this.$set(this.ebs_line_order[i],'oded_stock_org_id_ebs',ebs_line_product_obj[this.ebs_line_order[i]['oded_bom_id']]['oded_stock_org_id_ebs']);
									this.$set(this.ebs_line_order[i],'oded_stock_org_name_ebs',ebs_line_product_obj[this.ebs_line_order[i]['oded_bom_id']]['oded_stock_org_name_ebs']);
									this.$set(this.ebs_line_order[i],'oded_item_id_ebs',ebs_line_product_obj[this.ebs_line_order[i]['oded_bom_id']]['oded_item_id_ebs']);
									this.$set(this.ebs_line_order[i],'oded_item_name_ebs',ebs_line_product_obj[this.ebs_line_order[i]['oded_bom_id']]['oded_item_name_ebs']);
									this.$set(this.ebs_line_order[i],'oded_item_description_ebs',ebs_line_product_obj[this.ebs_line_order[i]['oded_bom_id']]['oded_item_description_ebs']);
									this.$set(this.ebs_line_order[i],'oded_qty_ebs',ebs_line_product_obj[this.ebs_line_order[i]['oded_bom_id']]['oded_qty_ebs']);
									this.$set(this.ebs_line_order[i],'oded_price_ebs',ebs_line_product_obj[this.ebs_line_order[i]['oded_bom_id']]['oded_price_ebs_order']);
									this.$set(this.ebs_line_order[i],'oded_amount_ebs',ebs_line_product_obj[this.ebs_line_order[i]['oded_bom_id']]['oded_amount_ebs_order']);
									this.$set(this.ebs_line_order[i],'oded_currency_ebs',ebs_line_product_obj[this.ebs_line_order[i]['oded_bom_id']]['oded_currency_ebs_order']);
									this.$set(this.ebs_line_order[i],'oded_ex_rate_ebs',ebs_line_product_obj[this.ebs_line_order[i]['oded_bom_id']]['oded_ex_rate_ebs_order']);
								//}
							}
							this.$forceUpdate();
						//}
					}
				},
				immediate:true,
				deep:true,
			},
		},
		methods:{
			screen(){
				this.$refs.model1.zoom()
				this.downIcon = !this.downIcon;
			},
			closeModel(){
				this.$refs.model1.close();
				this.$emit('update:show',false);
			},
			async initData(){
				await this.getOrderEbsList();
				await this.getDefaultInfo();
				if((this.ebs_head.ode_api_man||'')==''){
					//把默认值赋值给当前数据
					this.mergeData();
				}
				else
				{
					this.setDetailData();
				}
				this.getUserGroup();
				this.getTradeType();
				this.getPaymentMethod();
				this.getTransMethod();
				this.getPriceTerm();
				this.getUnit();
				this.getCurrency();
				this.getStockOrg();
				this.getProcessType();
				this.getDic();
				this.getRateData();
				//this.getFeeType();
				if(this.ebs_head.ode_od_type == '内销'){
					this.validRule = {
						oded_stock_org_id_ebs : [
							{ required: true, message: '请填写库存组织' },
						],
					}
				}
			
				
			},
			//把默认数据赋值给当前数据
			mergeData(){
				this.ebs_head = this.ebs_head_default || {};
				this.ebs_line = this.ebs_line_default || [];
				this.ebs_cost = this.ebs_cost_default || [];
				this.setDetailData();
			},
			async getRateData(){
				let date = new Date();
				let month = date.getMonth()+1;
				let year  = date.getFullYear();
			 
				let rateData = await omApi.getExchangeRate(month, year);
				this.rateData = rateData || {};	
			},
			
			async getDic(){
				this.$dmBaseSet.dicData('TY_BZ,TY_JLDW').then((data) =>{
					this.TY_JLDW = Object.freeze(this.$general.objectKeyBy(data['TY_JLDW'].children || [],'dic_name') || {});
					this.TY_JLDW_EN = Object.freeze(this.$general.objectKeyBy(data['TY_JLDW'].children || [],'dic_name_en' ) || {});
					this.BZ = Object.freeze(data['TY_BZ'].children || []); //币种
				});
			},
			//获取默认信息，这些信息，从订单数据生成的，如果是第一次，需要覆盖原来的信息
			//后续需要手工点击合并
			async getDefaultInfo(){
				await projectApi.getDefaultProject(this.id).then((result)=>{
					this.ebs_head_default = result.data.head || {};
					this.ebs_line_default = result.data.line || [];
					this.ebs_cost_default = result.data.cost || [];
				}) 	
						
			},
			//把获取的数据进行处理，显示到页面上
			setDetailData(){
				this.ebs_line_order = [];
				this.ebs_line_product = [];
				this.ebs_line_process = [];
				
				if(this.ebs_head['ode_system_type'] == 2){
					this.ebs_path = 'HK';
				}else{
					this.ebs_path = 'HS';
				}
				this.loading1 = true;
					
					
				for (let i = 0;i < this.ebs_line.length;i++){
					if(this.ebs_line[i].oded_line_type_code_ebs == 'ORDER'){
						this.ebs_line_order.push(this.ebs_line[i]);
					}else if(this.ebs_line[i].oded_line_type_code_ebs == 'MATERIAL'){
						this.ebs_line_product.push(this.ebs_line[i]);
					}else if(this.ebs_line[i].oded_line_type_code_ebs == 'MO'){
						this.ebs_line_process.push(this.ebs_line[i]);
					}
				}
					
					
				if(this.ebs_head.ode_dep_id_ebs != ''){
					this.getGroupUser();
				}
				
				if(this.ebs_head.ode_cus_id_ebs != ''){
					this.getCustomer(this.ebs_head.ode_cus_id_ebs);
				}
				
				if(this.ebs_head.ode_end_cus_ebs != ''){
					this.getCustomerT(this.ebs_head.ode_end_cus_ebs);
				}
				this.getEndLineData();
				//获取供应商ID
				this.getVen();
					
				if(this.ebs_line.length > 0){
					this.getGoodsList(this.ebs_line[0].oded_stock_org_id_ebs);
					this.setObject = {
						stock_org_id_ebs:this.ebs_line[0].oded_stock_org_id_ebs,
						stock_org_name_ebs:this.ebs_line[0].oded_stock_org_name_ebs,
					}
				}
						
				if(this.ebs_head.ode_system_type != 3){
					this.$nextTick(() => {
						this.columns = this.$refs.ebs_line_product.getColumns();
					})
					setTimeout(() => {
					  // 将指定列设置为隐藏状态
						this.columns.forEach(column => {
						if (['oded_currency_ebs_order','oded_ex_rate_ebs_order',
						'oded_price_ebs_order','oded_amount_ebs_order'].includes(column.property)) {
						  column.visible = false
						}
					  })
					  if (this.$refs.ebs_line_product) {
						this.$refs.ebs_line_product.refreshColumn()
					  }
					}, 800)
				}
				this.$forceUpdate()
				 
			},
			//获取基础信息
			async getOrderEbsList (){
				let num = 0;
			 	await projectApi.getOrderEbsList(this.id).then((result)=>{
					if(result.code == 0){
							
						this.ebs_head = result.data.head || {};
						this.ebs_line = result.data.line || [];
						this.ebs_cost = result.data.cost || [];
						
					}	
				})
			},
			
			getVen(){
				let tmpArr = this.ebs_line;
				let arr = [];
				
				for (let i = 0;i < tmpArr.length;i++){
					arr.push(tmpArr[i].oded_vender_id_ebs);
				}
				arr = this.$XEUtils.uniq(arr);
				this.vender = [];
				for (let i = 0;i < arr.length;i++){
					//if(arr[i] > 0)
						//this.getVender(arr[i]);
				}
			},
			
			getEndLineData(){
				let line_data = [];
				
				for (let i = 0;i < this.ebs_line_order.length;i++){
					line_data.push(this.ebs_line_order[i]);
				}
				
				for (let j = 0;j < this.ebs_line_product.length;j++){
					line_data.push(this.ebs_line_product[j]);
				}
				
				for (let k = 0;k < this.ebs_line_process.length;k++){
					line_data.push(this.ebs_line_process[k]);
				}
				
				this.ebs_line = line_data;
			},
			
			//获取业务组
			getUserGroup(){
				ebsApi.getEbsData('get_group','',this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.userGroup = Object.freeze(result.data || []);
					}
				})
			},
			
			
			//根据业务组获取业务员
			getGroupUser(){
				ebsApi.getEbsData('get_group_user',this.ebs_head.ode_dep_id_ebs,this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.groupUser = this.$general.objectKeyBy(Object.freeze(result.data || []),'user_id') || {};
					}
				})
			},
			
			
			//获取业务类型
			getTradeType(){
				ebsApi.getEbsData('get_tradetype','',this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.tradeType = Object.freeze(this.$general.objectKeyBy(result.data || [],'transaction_type_id') || {});
					}
				})
			},
			
			
			//获取付款方式
			getPaymentMethod(){
				this.paymentMethod = Object.freeze({
					28033:{'code':'虚拟收款','id':28033},
					14033:{'code':'D/A','id':14033},
					14034:{'code':'D/P','id':14034},
					14035:{'code':'L/C','id':14035},
					14036:{'code':'T/T','id':14036},
					14037:{'code':'押汇','id':14037},
					14038:{'code':'支票_1800','id':14038},
					14039:{'code':'期初虚拟收款方法','id':14039},
					14040:{'code':'现金','id':14040},
					14042:{'code':'银票','id':14042},
					14043:{'code':'银行转账','id':14043},
				});
			},
			 
			
			//获取出运方式
			getTransMethod(){
				ebsApi.getEbsData('get_trans_method','',this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.transMethod = Object.freeze(result.data || []);
					}
				})
			},
			
			
			//获取价格条款
			getPriceTerm(){
				ebsApi.getEbsData('get_price_term','',this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.priceTerm = Object.freeze(result.data || []);
					}
				})
			},
			
			
			//获取单位代码
			getUnit(){
				ebsApi.getEbsData('get_unit','',this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.unit = Object.freeze(result.data || []);
						this.unitObj =Object.freeze(this.$general.objectKeyBy(result.data || [],'uom_code'));
						
						let goodsList = this.$general.objectKeyBy(this.goodsList,'inventory_item_id') || [];
						for (let i = 0;i < this.ebs_line_order.length;i++){
							if(this.ebs_line_order[i].oded_item_id_ebs > 0)
								this.ebs_line_order[i].unit_type =goodsList[this.ebs_line_order[i].oded_item_id_ebs].uom_class;
						}
						console.log(this.ebs_line_order)
						for (let i = 0;i < this.ebs_line_product.length;i++){
							if(this.ebs_line_product[i].oded_item_id_ebs > 0)
								this.ebs_line_product[i].unit_type =goodsList[this.ebs_line_product[i].oded_item_id_ebs].uom_class;
						}
						
						for (let i = 0;i < this.ebs_line_process.length;i++){
							if(this.ebs_line_process[i].oded_item_id_ebs > 0)
								this.ebs_line_process[i].unit_type = goodsList[this.ebs_line_process[i].oded_item_id_ebs].uom_class;
						}
						
					}
				})
			},
			
			
			//获取币种单位
			getCurrency(){
				ebsApi.getEbsData('get_currency','',this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.currency = Object.freeze(result.data || []);
					}
				})
			},
			
			
			//获取库存组织
			getStockOrg(){
				ebsApi.getEbsData('get_stock_org','',this.ebs_path).then((result)=>{
					if(result.code == 0){	
						this.stockOrg = Object.freeze(this.$general.objectKeyBy(result.data|| [],'organization_id') || {});
					}
				})
			},
			
			
			//获取加工类型
			getProcessType(){
				ebsApi.getEbsData('get_process_type','',this.ebs_path).then((result)=>{
					if(result.code == 0){	
						this.processType = Object.freeze(result.data || []);
					}
				})
			},
			
			
			//获取费用类型
			getFeeType(){
				ebsApi.getEbsData('get_feetype','').then((result)=>{
					if(result.code == 0){	
						this.feeType = Object.freeze(result.data || []);
					}
				})
			},
			
			 
			
			
			//获取商品列表
			getGoodsList(params){
				let param = `organization_id=${params}`;
				this.goodsFlag = 1;
				ebsApi.getEbsData('get_goodslist',param,this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.goodsList = Object.freeze(result.data || []);
					}
				})
			},
			
			
			//更改业务组
			changeUserGroup(){
				let userGroup = this.$general.objectKeyBy(this.userGroup,'group_display_name') || {};
				if(this.ebs_head.ode_dep_name_ebs)
					this.ebs_head.ode_dep_id_ebs = userGroup[this.ebs_head.ode_dep_name_ebs].group_id;
				this.getGroupUser();
			},
			
			changeCreator(){
				this.ebs_head.ode_creator = this.groupUser[this.ebs_head.ode_creator_id_ebs].full_name
			},
			
			//更改业务
			changeGroupUser(option){
				 this.ebs_head.ode_sales_name = this.groupUser[this.ebs_head.ode_sales_id_ebs].full_name
			},
			
			changeTradeType(){
				this.ebs_head.ode_bus_type = this.tradeType[this.ebs_head.ode_bus_type_id_ebs].name
			},
			
			changeTermsId(){
				this.ebs_head.ode_collect_mode = this.paymentMethod[this.ebs_head.ode_collect_id_ebs].code
			},
			
			showCustomer(type,row = '',line_type = ''){
				this.customerType = type;
				this.customerList = [];
				this.customerModal = true;
				this.lineRow = row;
				this.line_type = line_type;
			},
			
			
			//通过ID获取客户
			getCustomer(params){
				ebsApi.getEbsData('get_venlist_id',params,this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.customer = result.data || [];
					}
				})
			},
			
			
			//通过ID获取最终客户
			async getCustomerT(params){
			  	await ebsApi.getEbsData('get_venlist_id',params,this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.customerT = result.data || [];
					}
				})
			},
			
			
			//通过ID获取供应商
			async getVender(params){
				await ebsApi.getEbsData('get_venlist_id',params,this.ebs_path).then((result)=>{
					if(result.code == 0){
						if(result.data.length > 0){
							this.vender.push(result.data[0] || []);
							this.$forceUpdate();
						}
					}
				})
			},
			
			
			//通过全称获取客户
			getCustomerFullName(){
				// ebsApi.getEbsData('get_venlist',this.customerFullName,this.ebs_path).then((result)=>{
				// 	if(result.code == 0){
				// 		this.customerList = result.data || [];
				// 	}
				// })
				ifsApi.getVenderDataList(this.customerFullName,this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.customerList = result.data.list || [];
					}
				})
			},
			
			
			//更改客户
			changeCustomer(){
				let checkData = this.$refs.customerList.getCheckboxRecords();
				let party_id = this.ebs_path == 'HS' ? Number(checkData[0].trader_id_ebs) : Number(checkData[0].trader_id_ebs_hk);
				if(checkData.length == 1){
					if(this.customerType == 1 || this.customerType == 2){
						if(this.customerType == 1){
							this.ebs_head.ode_cus_id_ebs = party_id;
							this.ebs_head.ode_cus_name = checkData[0].trader_name;
							this.getCustomer(party_id);
						}else if(this.customerType == 2){
							this.ebs_head.ode_end_cus_ebs = party_id;
							this.ebs_head.ode_cus_name = checkData[0].trader_name;
							this.getCustomerT(party_id);
						}
						this.customerModal = false;
					}else{
						if(this.line_type == 'product'){
							this.ebs_line_product[this.lineRow].oded_vender_id_ebs = party_id;
							this.ebs_line_product[this.lineRow].oded_vender_name = checkData[0].trader_name;
							this.ebs_line_product[this.lineRow].oded_vender_id = checkData[0].trader_id;
						}else if (this.line_type == 'process'){ 
							this.ebs_line_process[this.lineRow].oded_vender_id_ebs = party_id;
							this.ebs_line_process[this.lineRow].oded_vender_name = checkData[0].trader_name;
							this.ebs_line_process[this.lineRow].oded_vender_id = checkData[0].trader_id;
						}
						this.getEndLineData();
						this.getVen();
						this.customerModal = false;
					}
				}else if(checkData.length > 1){
					this.$Modal.warning({title: '错误提示',content: '只能选择单条！'});
				}else{
					this.$Modal.warning({title: '错误提示',content: '请选择明细！'});
				}
			},
			
			
			//更改库存组织
			changeOrganization(row){
				row.oded_stock_org_name_ebs = this.stockOrg[row.oded_stock_org_id_ebs].organization_name;
				this.getGoodsList(row.oded_stock_org_id_ebs);
			},
			
			
			//选中物料后操作
			changeGoods(row){
				let goodsList = this.$general.objectKeyBy(this.goodsList,'description') || [];
				row.oded_item_id_ebs = goodsList[row.oded_item_description_ebs].inventory_item_id;
				row.oded_item_name_ebs = goodsList[row.oded_item_description_ebs].segment1
				//row.oded_item_description_ebs = goodsList[row.oded_item_name_ebs].description
				row.unit_type = goodsList[row.oded_item_description_ebs].uom_class;
				row.oded_unit_code_ebs = goodsList[row.oded_item_description_ebs].primary_uom_code
				row.oded_unit = this.unitObj[row.oded_unit_code_ebs]['unit_of_measure_tl'];
				console.log(row);
			},
			
			//同步EBS预算
			async updateOrderEbsList(flag){
				let msg = this.checkSaveData();
				if(msg.length > 0){
					return;
				}
				if(flag == 1){
					this.$confirm("请仔细核对数据，该操作会把当前数据同步到甲骨文系统，如确认，建议您随后进行相关检查，是否进行同步？", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning",
					}).then(type=> {
						if(type=='confirm'){
							 this.getEndLineData();
							 projectApi.updateOrderEbsList(JSON.stringify(this.ebs_head),JSON.stringify(this.ebs_line),JSON.stringify(this.ebs_cost),flag).then((result)=>{
							 	if(result.code == 0){
							 		this.$message({
							 		          message: '同步成功!',
							 		          type: 'success'
							 		        });
							 		 
							 		this.$emit('aftersave');
									this.closeModel();
							 	}else{
									this.$message({
									          message: `${result.msg} ${result.data}`,
									          type: 'warning'
									        });
							 	}
							 })
						}
					})
				}else{
					this.getEndLineData();
					await ebsApi.updateOrderEbsList(JSON.stringify(this.ebs_head),JSON.stringify(this.ebs_line),JSON.stringify(this.ebs_cost),flag).then((result)=>{
						this.$message({
								  message: '保存成功!',
								  type: 'success'
								});
						 
						this.$emit('aftersave');
					})
				}
			},
			
			showUpdateModal(){
				let msg = this.checkSaveData();
				if(msg.length > 0){
					return;
				}
				this.computeBudget();
				this.updateModal = true;
			},
			
			computeBudget(){
				let material_amount = 0,material_qty = 0,
					accessories_amount = 0,accessories_qty = 0,
					pack_amount = 0,pack_qty = 0,
					mo_amount = 0,mo_qty = 0,
					order_amount = 0,order_qty = 0,order_qty_sum = 0,order_amount_usd = 0,
					ebs_budget_detail_currency = '',ebs_budget_detail_rate,order_type_flag = 0,
					other_free_cny = 0,other_free_usd = 0;
				
				for (let i = 0;i < this.ebs_cost.length;i++){
					switch (this.ebs_cost[i].odef_currency_ebs){
						case 'USD':
							other_free_usd = parseFloat(other_free_usd) + parseFloat(this.ebs_cost[i].odef_amount_ebs);
							break;
						case 'CNY':
							other_free_cny = parseFloat(other_free_cny) + parseFloat(this.ebs_cost[i].odef_amount_ebs);
							break;
					}
				}
				this.sum.other_free_cny = parseFloat(other_free_cny).toFixed(2);
				this.sum.other_free_usd = parseFloat(other_free_usd).toFixed(2);
				
				this.getEndLineData();	
				for (let i = 0;i < this.ebs_line.length;i++){
					switch (this.ebs_line[i].oded_line_type_code_ebs){
						case 'ORDER':
							ebs_budget_detail_currency = this.ebs_line[i].oded_currency_ebs;
							ebs_budget_detail_rate = this.ebs_line[i].oded_ex_rate_ebs;
							order_qty_sum    	 = parseFloat(order_qty_sum) + parseFloat(this.ebs_line[i].oded_qty_ebs);
							break;
						case 'MO':
							if(this.ebs_line[i].oded_mo_type_ebs == 'DIS'){
								order_type_flag = 1;
							}
							break;		
							
					}
				}	
				this.ebs_budget_detail_currency = ebs_budget_detail_currency;//币种取预算行里的销售信息
				this.ebs_budget_detail_rate = ebs_budget_detail_rate;
							
				
				let ebs_budget_detail_rate2 = 0;
				
				for (let i = 0;i < this.ebs_cost.length;i++){
					switch (this.ebs_cost[i].odef_currency_ebs){
						case 'USD':
							ebs_budget_detail_rate2 = this.ebs_cost[i].odef_ex_rate_ebs;
						
					}
				}	
				
				for (let i = 0;i < this.ebs_line.length;i++){
					switch (this.ebs_line[i].oded_line_type_code_ebs){
						case 'ORDER':
							order_qty    	 = parseFloat(order_qty) + parseFloat(this.ebs_line[i].oded_qty_ebs);
							order_amount = parseFloat(order_amount) + parseFloat(this.ebs_line[i].oded_amount_ebs);
							order_amount_usd = parseFloat(order_amount_usd) + parseFloat(this.ebs_line[i].oded_amount_ebs);		
							break;
						case 'MATERIAL':
							material_qty    = parseFloat(material_qty) + parseFloat(this.ebs_line[i].oded_qty_ebs); 
							if(order_type_flag == 1){
								material_amount = 0;
							}else{
								material_amount = parseFloat(material_amount) +
								(this.ebs_line[i].oded_currency_ebs == 'CNY' ? parseFloat(this.ebs_line[i].oded_amount_ebs)
								: parseFloat(this.ebs_line[i].oded_amount_ebs) * this.ebs_line[i].oded_ex_rate_ebs); 
							}
							break;
						case 'ACCESSORIES':
							accessories_qty    = parseFloat(accessories_qty) + parseFloat(this.ebs_line[i].oded_qty_ebs);
							accessories_amount = parseFloat(accessories_amount) + 
							(this.ebs_line[i].oded_currency_ebs == 'CNY' ? parseFloat(this.ebs_line[i].oded_amount_ebs)
							: parseFloat(this.ebs_line[i].oded_amount_ebs) * this.ebs_line[i].oded_ex_rate_ebs); 
							break;
						case 'PACK':
							pack_qty    = parseFloat(pack_qty) + parseFloat(this.ebs_line[i].oded_qty_ebs);
							pack_amount = parseFloat(pack_amount) + 
							(this.ebs_line[i].oded_currency_ebs == 'CNY' ? parseFloat(this.ebs_line[i].oded_amount_ebs)
							: parseFloat(this.ebs_line[i].oded_amount_ebs) * this.ebs_line[i].oded_ex_rate_ebs); 
							break;
						case 'MO':
							mo_qty 	  = parseFloat(mo_qty) + parseFloat(this.ebs_line[i].oded_qty_ebs);
							if(order_type_flag == 1){
								if(this.ebs_line[i].oded_mo_type_ebs != 'DIS'){
									mo_amount = parseFloat(mo_amount) + 0; 
								}else{
									mo_amount = parseFloat(mo_amount) +
									(this.ebs_line[i].oded_currency_ebs == 'CNY' ? parseFloat(this.ebs_line[i].oded_end_process_price_ebs * this.ebs_line[i].oded_qty_ebs)
									: parseFloat(this.ebs_line[i].oded_end_process_price_ebs * this.ebs_line[i].oded_qty_ebs) * this.ebs_line[i].oded_ex_rate_ebs); 
								}
							}else{
								mo_amount = parseFloat(mo_amount) +
								(this.ebs_line[i].oded_currency_ebs == 'CNY' ? parseFloat(this.ebs_line[i].oded_amount_ebs)
								: parseFloat(this.ebs_line[i].oded_amount_ebs) * this.ebs_line[i].oded_ex_rate_ebs); 
							}
							
							break;
					}
				}
				
				this.sum.order_qty 	    	= parseFloat(order_qty).toFixed(2);
				this.sum.order_amount    	= parseFloat(order_amount).toFixed(2);
				this.sum.order_amount_usd   = parseFloat(order_amount_usd).toFixed(2);
				this.sum.material_qty 	    = parseFloat(material_qty).toFixed(2);
				this.sum.material_amount    = parseFloat(material_amount).toFixed(2);
				this.sum.accessories_qty    = parseFloat(accessories_qty).toFixed(2);
				this.sum.accessories_amount = parseFloat(accessories_amount).toFixed(2);
				this.sum.pack_qty 			= parseFloat(pack_qty).toFixed(2);
				this.sum.pack_amount	    = parseFloat(pack_amount).toFixed(2);
				this.sum.mo_qty 			= parseFloat(mo_qty).toFixed(2);
				this.sum.mo_amount		    = parseFloat(mo_amount).toFixed(2);
				this.sum.cb_amount          = parseFloat(parseFloat(material_amount) + parseFloat(accessories_amount)
											  + parseFloat(pack_amount) + parseFloat(mo_amount)).toFixed(2);
				this.sum.ts_amount          = parseFloat(this.sum.cb_amount / (1 + this.$config.COST_ZZSL) 
											  * this.$config.COST_TSL).toFixed(2);	
				this.sum.cgcb_amount        = parseFloat(parseFloat(this.sum.cb_amount) - parseFloat(this.sum.ts_amount) 
											  + parseFloat(this.sum.other_free_cny)).toFixed(2);
				this.sum.srje_amount		= parseFloat(this.sum.order_amount_usd) - parseFloat(this.sum.other_free_usd * ebs_budget_detail_rate2 / this.ebs_budget_detail_rate) ;																													
				this.sum.srrmbje_amount		= parseFloat(this.sum.srje_amount * this.ebs_budget_detail_rate).toFixed(2);																												
				this.sum.lr                 = parseFloat(this.sum.srrmbje_amount - this.sum.cgcb_amount).toFixed(2);
				this.sum.lrl				= this.sum.srrmbje_amount > 0 
												  ? parseFloat(this.sum.lr / this.sum.srrmbje_amount * 100).toFixed(2)
												  : 0;
				this.sum.hhcb				= this.sum.srje_amount > 0 
													? parseFloat(this.sum.cgcb_amount / this.sum.srje_amount).toFixed(2)
													: 0;
				console.log(this.sum);									
			},
			
			
			//保存检测
			checkSaveData(){
				let msg = '';
				if(this.ebs_head.ode_dep_id_ebs == 0 || !this.ebs_head.ode_dep_id_ebs)
					msg += '业务组,';
				if(this.ebs_head.ode_creator_id_ebs == 0 || !this.ebs_head.ode_creator_id_ebs)
					msg += '制单人,';
				if(this.ebs_head.ode_sales_id_ebs == 0 || !this.ebs_head.ode_sales_id_ebs)
					msg += '业务员,';
				if(this.ebs_head.ode_bus_type_id_ebs == 0 || !this.ebs_head.ode_bus_type_id_ebs)
					msg += '订单类型,';
				if(!this.ebs_head.ode_od_date)
					msg += '订单日期,';
				if(this.ebs_head.ode_cus_id_ebs == 0 || !this.ebs_head.ode_cus_id_ebs)
					msg += '订单客户,';
				if(this.ebs_head.ode_end_cus_ebs == 0 || !this.ebs_head.ode_end_cus_ebs)
					msg += '最终客户,';
				if(this.ebs_head.ode_collect_id_ebs == 0 || !this.ebs_head.ode_collect_id_ebs)
					msg += '结算方式,';
				if((this.ebs_head.ode_price_clause == 0 || !this.ebs_head.ode_price_clause) && this.ebs_head.ode_od_type == '外销')
					msg += '价格条款,';
				if(this.ebs_head.ode_ship_mode_code_ebs == 0 || !this.ebs_head.ode_ship_mode_code_ebs)
					msg += '运输方式,';
				if(this.ebs_head.ode_delivery_date_ebs == 0 || !this.ebs_head.ode_delivery_date_ebs)
					msg += '交货日期,';
				if(this.ebs_head.ode_qty_unit_ebs == 0 || !this.ebs_head.ode_qty_unit_ebs)
					msg += '数量单位,';	
				msg = msg.substring(0,msg.length-1);
				if(msg.length > 0){
					msg = '基础信息：' + msg + '必填！';
					this.selectTab = 0;
					this.$message({
					          message: msg,
					          type: 'warning'
					        });
					return msg;
				}
				
				if(this.ebs_head.ode_ebs_type == 2){
									
								
				}else{	
					for(let i = 0;i < this.ebs_line_order.length;i++){
						if((this.ebs_line_order[i].oded_stock_org_id_ebs == 0 || !this.ebs_line_order[i].oded_stock_org_id_ebs
						 || this.ebs_line_order[i].oded_item_id_ebs == 0 || !this.ebs_line_order[i].oded_item_id_ebs
						 || this.ebs_line_order[i].oded_ex_rate_ebs < 0
						 || this.ebs_line_order[i].oded_price_ebs == 0)){
							  msg = '第'+(i+1)+'行'+'库存组织,商品ID,汇率,单价';
							  console.log('第'+i+'行');
							  console.log(this.ebs_line_order[i].oded_stock_org_id_ebs+';');
							  console.log(this.ebs_line_order[i].oded_item_id_ebs+';');
							  console.log(this.ebs_line_order[i].oded_ex_rate_ebs+';');
							  console.log(this.ebs_line_order[i].oded_price_ebs+';');
						  }
					}
					if(msg.length > 0){
						msg = '订单明细：' + msg + '必填！';;
						this.selectTab = 1;
						this.$message({
								  message: msg,
								  type: 'warning'
								});
						return msg;
					}
					
					for(let i = 0;i < this.ebs_line_product.length;i++){
						if((this.ebs_line_product[i].oded_stock_org_id_ebs == 0 || !this.ebs_line_product[i].oded_stock_org_id_ebs
						 || this.ebs_line_product[i].oded_item_id_ebs == 0 || !this.ebs_line_product[i].oded_item_id_ebs
						 //|| this.ebs_line_product[i].oded_vender_id_ebs == 0 || !this.ebs_line_product[i].oded_vender_id_ebs
						 || this.ebs_line_product[i].oded_ex_rate_ebs < 0) 
						 ){
							  msg = '第'+(i+1)+'行'+'库存组织,商品ID,汇率';
						  }
					}
					if(msg.length > 0){
						msg = '采购明细：' + msg + '必填！';;
						this.selectTab = 2;
						this.$message({
								  message: msg,
								  type: 'warning'
								});
						return msg;
					}
					
					for(let i = 0;i < this.ebs_line_process.length;i++){
						if((this.ebs_line_process[i].oded_stock_org_id_ebs == 0 || !this.ebs_line_process[i].oded_stock_org_id_ebs
						 || this.ebs_line_process[i].oded_item_id_ebs == 0 || !this.ebs_line_process[i].oded_item_id_ebs
						 || this.ebs_line_process[i].oded_vender_id_ebs == 0 || !this.ebs_line_process[i].oded_vender_id_ebs
						 || this.ebs_line_process[i].oded_ex_rate_ebs < 0 )
						 ){
							  msg = '第'+(i+1)+'行'+'库存组织,商品ID,供应商,汇率';
						  }
						if(this.ebs_line_process[i].oded_mo_type_ebs == 'DIS' 
						&& (!this.ebs_line_process[i].oded_end_process_price_ebs 
						|| this.ebs_line_process[i].oded_end_process_price_ebs ==0)){
							if(msg.length > 0){
								msg = msg + ',双经销成品单价';
								break;
							}else{
								msg ='双经销成品单价';
							}
						} 
					}
					if(msg.length > 0){
						msg = '加工明细：' + msg + '必填！';;
						this.selectTab = 3;
						this.$message({
								  message: msg,
								  type: 'warning'
								});
						return msg;
					}
				}
				
				return msg;	
			},
			
			
			async addDetail(){
				await this.updateOrderEbsList(2);
				if(this.ebs_head.ode_system_type == 1 || this.ebs_head.ode_system_type == 2)
					this.budgetDetailModal = true;
				if(this.ebs_head.ode_system_type == 3)
					this.productDetailModal = true;
			},
			
			delDetail(){
				let checkData = this.$refs.ebs_line_order.getCheckboxRecords();
				if(checkData.length > 0){
					let tmpArr = [];
					for (let i = checkData.length - 1;i >= 0;i--){
						if(this.ebs_head.ode_system_type == 1 || this.ebs_head.ode_system_type == 2)
							tmpArr.push(checkData[i]['oded_style_id']);
						else if(this.ebs_head.ode_system_type == 3)
							tmpArr.push(checkData[i]['oded_bom_id']);
						let row = this.$refs.ebs_line_order.getRowIndex(checkData[i]);
						this.ebs_line_order.splice(row,1);
					}
					
					for (let i = this.ebs_line_product.length - 1;i >= 0 ;i--){
						for (let j = 0;j < tmpArr.length;j++){
							if((this.ebs_line_product[i].oded_style_id == tmpArr[j] 
							&& (this.ebs_head.ode_system_type == 1 || this.ebs_head.ode_system_type == 2)) ||
							(this.ebs_line_product[i].oded_bom_id == tmpArr[j]
							&& this.ebs_head.ode_system_type == 3)){
								this.ebs_line_product.splice(i,1);
								break;
							}	
						}
					}
					
					for (let i = this.ebs_line_process.length - 1;i >= 0 ;i--){
						for (let j = 0;j < tmpArr.length;j++){
							if((this.ebs_line_process[i].oded_style_id == tmpArr[j]
							&& (this.ebs_head.ode_system_type == 1 || this.ebs_head.ode_system_type == 2)) ||
							(this.ebs_line_process[i].oded_bom_id == tmpArr[j]
							&& this.ebs_head.ode_system_type == 3)){
								this.ebs_line_process.splice(i,1);
								break;
							}
						}
					}
				}else{
					this.$message({
						message: '请选择明细!',
						type: 'warning'
					});
				}
			},
			
			async afterAdd(data){
				let checkData = [];
				let od_id_str = this.$XEUtils.pluck(data,'od_id').join(',');
				checkData = await ebsApi.getPriceOrderData(JSON.stringify({'od_id_str':od_id_str}));
				for (let i = 0;i < checkData.length;i++){
					this.ebs_line_order.push({
						'oded_ode_id'        : this.ebs_head.ode_id,
						'oded_style_id'      : checkData[i]['odg_id'],
						'oded_bom_id'        : '',
						'oded_vender_id'     : '',
						'oded_vender_name'   : '',
						
						'oded_line_id_ebs'        : '',//预算表行ID-EBS project_line_id
						'oded_project_id_ebs'     : '',//项目ID-EBS project_id
						'oded_project_code_ebs'   : '',//项目号-EBS
						'oded_creator_id_ebs'     : this.ebs_head.ode_creator_id_ebs,//创建人ID-EBS created_by
						
						'oded_line_type_code_ebs' : 'ORDER',//行类型代码 line_type_code
						'oded_stock_org_id_ebs'   : this.ebs_line_order.length > 0 ?
						 this.ebs_line_order[this.ebs_line_order.length - 1]['oded_stock_org_id_ebs'] :'',//库存组织代码
						'oded_stock_org_name_ebs' : this.ebs_line_order.length > 0 ? 
						this.ebs_line_order[this.ebs_line_order.length - 1]['oded_stock_org_name_ebs'] : '',//库存组织名称 organization_id
						'oded_item_id_ebs'        : 0,//商品ID item_id
						'oded_item_name_ebs'      : '',//商品名称 item_name
						'oded_item_name_en_ebs'   : '',
						'oded_item_description_ebs': '',//说明 item_description
						'oded_item_description_en_ebs':'',
						'oded_style_no_ebs'       : checkData[i]['odg_item_no'],//中文款号-EBS item_attribute1
						'oded_style_no_en_ebs'    : checkData[i]['odg_item_no'],//英文款号-EBS item_attribute6
						'oded_specs_ebs'          : checkData[i]['odg_item_name'],//中文规格-EBS item_attribute2
						'oded_specs_en_ebs'       : checkData[i]['odg_item_name_en'],//中文规格-EBS item_attribute7
						'oded_line_memo_ebs'      : '',//行备注-EBS description
						
						'oded_qty_ebs'            : checkData[i]['pcs'],//数量-EBS quantity
						'oded_unit_code_ebs'      : 'PCS',//数量单位编码-EBS uom_code    this.TY_JLDW[checkData[i]['odg_unit']]['ebs_code'] ? this.TY_JLDW[checkData[i]['odg_unit']]['ebs_code'] :'PCS'
						'oded_unit'               : '件',//数量单位编码-EBS uom_code
						'oded_currency_ebs'       : this.ebs_head.ode_currency_sales,//币种代码 currency_code
						'oded_ex_rate_ebs'        : this.ebs_line_order.length > 0 ? 
						this.ebs_line_order[this.ebs_line_order.length - 1]['oded_ex_rate_ebs'] : '',//汇率 attribute3
						'oded_price_ebs'          : checkData[i]['odgsku_price'],//原币单价 unit_price
						'oded_amount_ebs'         : checkData[i]['amount'],//金额 amount
						'oded_tax_rate_code'      : '',//加工必填 税率 tax_code
						'oded_tax_rebate_rate_ebs': '',//加工必填 退税率 attribute6
						
						'oded_end_process_price_ebs': checkData[i]['odgsku_price'],//成品单价 mfg_unit_price
						'oded_mo_type_ebs'        : '',//加工必填 加工类型 order_type
						'oded_mo_price_ebs'       : '',//加工单价 prd_unit_price
						'oded_loss_rate_ebs'      : '',//损耗 attribute5
						'oded_vender_id_ebs'      : '',//加工必填 供应商ID attribute4
						'oded_sales_type_ebs'     : '',//转开类型 attribute7
					})
					od_id_str += checkData[i]['od_id']+',';
				}
				od_id_str = od_id_str.substring(0,od_id_str.length - 1);
				await this.getBomList(od_id_str);
				this.$message({
					message: '添加完成!',
					type: 'success'
				});
				this.budgetDetailModal = false;
			},
			
			async getBomList(od_id_str){
				await ebsApi.getBomList(JSON.stringify({'od_id_str':od_id_str})).then((result)=>{
					let checkData = result.data || [];
					let line_type_code = '';
					let tmpArr = {};
					for (let i = 0;i < checkData.length;i++){
						if((checkData[i].odgb_class == '成品加工')
						|| (checkData[i].odgb_class == '物料加工')){
							line_type_code = 'MO';
						}else{
							line_type_code = 'MATERIAL';
						}
						tmpArr = {
							'oded_ode_id'        : this.ebs_head.ode_id,
							'oded_style_id'      : checkData[i]['odg_id'],
							'oded_bom_id'        : checkData[i]['odgb_id'],
							'oded_vender_id'     : checkData[i]['odgb_ven_id'],
							'oded_vender_name'   : checkData[i]['odgb_ven_name_a'],
		
							'oded_line_id_ebs'        : '',//预算表行ID-EBS project_line_id
							'oded_project_id_ebs'     : '',//项目ID-EBS project_id
							'oded_project_code_ebs'   : '',//项目号-EBS
							'oded_creator_id_ebs'     : this.ebs_head.ode_creator_id_ebs,//创建人ID-EBS created_by
		
							'oded_line_type_code_ebs' : line_type_code,//行类型代码 line_type_code
							'oded_stock_org_id_ebs'   : this.ebs_line_order[this.ebs_line_order.length - 1]['oded_stock_org_id_ebs'],//库存组织代码
							'oded_stock_org_name_ebs' : this.ebs_line_order[this.ebs_line_order.length - 1]['oded_stock_org_name_ebs'],//库存组织名称 organization_id
							'oded_item_id_ebs'        : 0,//商品ID item_id
							'oded_item_name_ebs'      : '',//商品名称 item_name
							'oded_item_name_en_ebs'   : '',
							'oded_item_description_ebs': '',//说明 item_description
							'oded_item_description_en_ebs':'',
							'oded_style_no_ebs'       : checkData[i]['odg_item_no'],//中文款号-EBS item_attribute1
							'oded_style_no_en_ebs'    : checkData[i]['odg_item_no'],//英文款号-EBS item_attribute6
							'oded_specs_ebs'          : checkData[i]['odgb_name']+' '+checkData[i]['odgb_spec'],//中文规格-EBS item_attribute2
							'oded_specs_en_ebs'       : checkData[i]['odgb_name_en']+' '+checkData[i]['odgb_spec'],//中文规格-EBS item_attribute7
							'oded_line_memo_ebs'      : checkData[i]['odgb_memo'],//行备注-EBS description
		
							'oded_qty_ebs'            : checkData[i]['qty'],//数量-EBS quantity
							'oded_unit_code_ebs'      : checkData[i]['odgb_unit_pu']
													  ? this.TY_JLDW[checkData[i]['odgb_unit_pu']]['ebs_code'] :'PCS',//数量单位编码-EBS uom_code
							'oded_unit'               : checkData[i]['odgb_unit_pu'] ? checkData[i]['odgb_unit_pu'] :'件',//数量单位编码-EBS uom_code
							'oded_currency_ebs'       : checkData[i]['odgb_currency'],//币种代码 currency_code
							'oded_ex_rate_ebs'        : this.ebs_line_order[this.ebs_line_order.length - 1]['oded_ex_rate_ebs'],//汇率 attribute3
							'oded_price_ebs'          : checkData[i]['odgb_price_pu'],//原币单价 unit_price
							'oded_amount_ebs'         : checkData[i]['amount'],//金额 amount
							'oded_tax_rate_code'      : 'VAT13',//加工必填 税率 tax_code
							'oded_tax_rebate_rate_ebs': 13,//加工必填 退税率 attribute6
		
							'oded_end_process_price_ebs': 0,//成品单价 mfg_unit_price
							'oded_mo_type_ebs'        : line_type_code == 'MO' ? 'P_AGENCY' : '',//加工必填 加工类型 order_type DIS P_AGENCY
							'oded_mo_price_ebs'       : checkData[i]['odgb_price_pu'],//加工单价 prd_unit_price
							'oded_loss_rate_ebs'      : checkData[i]['odgb_loss_rate'],//损耗 attribute5
							'oded_vender_id_ebs'      : '',//加工必填 供应商ID attribute4
							'oded_sales_type_ebs'     : '不转开',//转开类型 attribute7
						};
						if(line_type_code == 'MATERIAL'){
							this.ebs_line_product.push(tmpArr);
						}else{
							this.ebs_line_process.push(tmpArr);
						}
					}
				})
			},
			
			checkboxChangeOrder({checked,row}){
				//成品项目的订单明细肯定是勾选一个同商品一起勾选；为了同时删除；面辅料项目暂定
				for (let i = 0;i < this.ebs_line_order.length;i++){
					if(this.ebs_head.ode_system_type == 1 || this.ebs_head.ode_system_type == 2){
						if(row.oded_style_id == this.ebs_line_order[i]['oded_style_id'] && checked)
							this.$refs.ebs_line_order.setCheckboxRow(this.ebs_line_order[i],true);
						else
							this.$refs.ebs_line_order.setCheckboxRow(this.ebs_line_order[i],false);
					}	
				}
			},
			
			changeMoTypeEbs(row){
				if(row.oded_mo_type_ebs == 'P_AGENCY'){
					row.oded_item_id_ebs = 105756;
					row.oded_item_name_ebs = 'HSQT0032';
					row.oded_item_description_ebs = '加工费（元）';
					
				}else{
					row.oded_item_id_ebs = '';
					row.oded_item_name_ebs = '';
					row.oded_item_description_ebs = '';
				}
			},
			
			filterMethod ({ option, row, column }) {
				if(row.oded_style_no_ebs && column.property == 'oded_style_no_ebs')
					return row.oded_style_no_ebs.includes(option.data);
				else if(row.oded_item_id_ebs && column.property == 'oded_item_id_ebs')
					return row.oded_item_description_ebs.includes(option.data);
				else if(row.oded_specs_ebs && column.property == 'oded_specs_ebs')
					return row.oded_specs_ebs.includes(option.data);
			},
			
			showSetModel(table){
				let checkData = '';
				this.setTable = table;
				if(table == 'ebs_line_order')
					checkData = this.$refs.ebs_line_order.getCheckboxRecords();
				else if(table == 'ebs_line_product')
					checkData = this.$refs.ebs_line_product.getCheckboxRecords();
				else if(table == 'ebs_line_process')
					checkData = this.$refs.ebs_line_process.getCheckboxRecords();
				if(checkData.length > 0){
					this.setModal = true;
				}else{
					this.$message({
						message: '请选择明细!',
						type: 'warring'
					});
				}
			},
			
			setAfter(data){
				let checkData = '';
				if(this.setTable == 'ebs_line_order')
					checkData = this.$refs.ebs_line_order.getCheckboxRecords();
				else if(this.setTable == 'ebs_line_product')
					checkData = this.$refs.ebs_line_product.getCheckboxRecords();
				else if(this.setTable == 'ebs_line_process')
					checkData = this.$refs.ebs_line_process.getCheckboxRecords();
				for (let i = 0;i < checkData.length;i++){
					if(data.style_no_ebs != '')
						checkData[i].oded_style_no_ebs = data.style_no_ebs;
					if(data.style_no_en_ebs != '')
						checkData[i].oded_style_no_en_ebs = data.style_no_en_ebs;
					if(data.stock_org_id_ebs != '')
						checkData[i].oded_stock_org_id_ebs = data.stock_org_id_ebs;
					if(data.stock_org_name_ebs != '')
						checkData[i].oded_stock_org_name_ebs = data.stock_org_name_ebs;
					if(data.item_id_ebs != '')
						checkData[i].oded_item_id_ebs = data.item_id_ebs;
					if(data.item_name_ebs != '')
						checkData[i].oded_item_name_ebs = data.item_name_ebs;
					if(data.item_description_ebs != '')
						checkData[i].oded_item_description_ebs = data.item_description_ebs;
					if(data.specs_ebs != '')
						checkData[i].oded_specs_ebs = data.specs_ebs;
					if(data.vender_id_ebs != '')
						checkData[i].oded_vender_id_ebs = data.vender_id_ebs;
					if(data.vender_name_ebs != '')
						checkData[i].oded_vender_name_ebs = data.vender_name_ebs;
					if(data.unit_code_ebs != ''){
						checkData[i].oded_unit_code_ebs = data.unit_code_ebs;
						checkData[i].oded_unit = this.unitObj[checkData[i].oded_unit_code_ebs]['unit_of_measure_tl'];
						checkData[i].unit_type = data.unit_type;
					}
					if(data.sales_type_ebs != '')
						checkData[i].oded_sales_type_ebs = data.sales_type_ebs;	
					if(data.tax_code != '')
						checkData[i].oded_tax_rate_code = data.tax_code;	
					if(data.tax_rate != '')
						checkData[i].oded_tax_rebate_rate_ebs = data.tax_rate;			
				}
			},
			
			async afterProdcutAdd(data){
				//后台找订单下的采购bom
				let od_id_str = this.$XEUtils.pluck(data,'od_id').join(',');
				let result = await ebsApi.getBomList(JSON.stringify({'od_id_str':od_id_str,'type':'product_ml'})) || [];
				let checkData = result.data || [];
				let line_type_code = 'MATERIAL';
				for (let i = 0;i < checkData.length;i++){
					this.ebs_line_order.push({
						'oded_ode_id'        : this.ebs_head.ode_id,
						'oded_style_id'      : checkData[i]['odg_id'],
						'oded_bom_id'        : checkData[i]['odgb_id'],
						'oded_vender_id'     : '',
						'oded_vender_name'   : '',
						
						'oded_line_id_ebs'        : '',//预算表行ID-EBS project_line_id
						'oded_project_id_ebs'     : '',//项目ID-EBS project_id
						'oded_project_code_ebs'   : '',//项目号-EBS
						'oded_creator_id_ebs'     : this.ebs_head.ode_creator_id_ebs,//创建人ID-EBS created_by
						
						'oded_line_type_code_ebs' : 'ORDER',//行类型代码 line_type_code
						'oded_stock_org_id_ebs'   : this.ebs_line_order.length > 0 ?
						 this.ebs_line_order[this.ebs_line_order.length - 1]['oded_stock_org_id_ebs'] :'',//库存组织代码
						'oded_stock_org_name_ebs' : this.ebs_line_order.length > 0 ? 
						this.ebs_line_order[this.ebs_line_order.length - 1]['oded_stock_org_name_ebs'] : '',//库存组织名称 organization_id
						'oded_item_id_ebs'        : 0,//商品ID item_id
						'oded_item_name_ebs'      : '',//商品名称 item_name
						'oded_item_name_en_ebs'   : '',
						'oded_item_description_ebs': '',//说明 item_description
						'oded_item_description_en_ebs':'',
						'oded_style_no_ebs'       : checkData[i]['odg_item_no'],//中文款号-EBS item_attribute1
						'oded_style_no_en_ebs'    : checkData[i]['odg_item_no'],//英文款号-EBS item_attribute6
						'oded_specs_ebs'          : checkData[i]['odgb_name']+' '+checkData[i]['odgb_spec'],//中文规格-EBS item_attribute2
						'oded_specs_en_ebs'       : checkData[i]['odgb_name_en']+' '+checkData[i]['odgb_spec'],//中文规格-EBS item_attribute7
						'oded_line_memo_ebs'      : '',//行备注-EBS description
						
						'oded_qty_ebs'            : checkData[i]['pcs'],//数量-EBS quantity
						'oded_unit_code_ebs'      : checkData[i]['odgb_unit_rq']
													? this.TY_JLDW[checkData[i]['odgb_unit_rq']]['ebs_code'] :'PCS',//数量单位编码-EBS uom_code
						'oded_unit'               : checkData[i]['odgb_unit_rq'] ? checkData[i]['odgb_unit_rq'] :'件',//数量单位编码-EBS uom_code
						'oded_currency_ebs'       : 'USD',//币种代码 currency_code
						'oded_ex_rate_ebs'        : this.ebs_line_order.length > 0 ? 
						this.ebs_line_order[this.ebs_line_order.length - 1]['oded_ex_rate_ebs'] : '',//汇率 attribute3
						'oded_price_ebs'          : 0,//原币单价 unit_price
						'oded_amount_ebs'         : 0,//金额 amount
						'oded_tax_rate_code'      : '',//加工必填 税率 tax_code
						'oded_tax_rebate_rate_ebs': '',//加工必填 退税率 attribute6
						
						'oded_end_process_price_ebs': checkData[i]['odgb_price_pu'],//成品单价 mfg_unit_price
						'oded_mo_type_ebs'        : '',//加工必填 加工类型 order_type
						'oded_mo_price_ebs'       : '',//加工单价 prd_unit_price
						'oded_loss_rate_ebs'      : '',//损耗 attribute5
						'oded_vender_id_ebs'      : '',//加工必填 供应商ID attribute4
						'oded_sales_type_ebs'     : '',//转开类型 attribute7
					})
					
					this.ebs_line_product.push({
						'oded_ode_id'        : this.ebs_head.ode_id,
						'oded_style_id'      : checkData[i]['odg_id'],
						'oded_bom_id'        : checkData[i]['odgb_id'],
						'oded_vender_id'     : checkData[i]['odgb_ven_id'],
						'oded_vender_name'   : checkData[i]['odgb_ven_name_a'],
						
						'oded_line_id_ebs'        : '',//预算表行ID-EBS project_line_id
						'oded_project_id_ebs'     : '',//项目ID-EBS project_id
						'oded_project_code_ebs'   : '',//项目号-EBS
						'oded_creator_id_ebs'     : this.ebs_head.ode_creator_id_ebs,//创建人ID-EBS created_by
						
						'oded_line_type_code_ebs' : 'MATERIAL',//行类型代码 line_type_code
						'oded_stock_org_id_ebs'   : this.ebs_line_order.length > 0 ?
						 this.ebs_line_order[this.ebs_line_order.length - 1]['oded_stock_org_id_ebs'] :'',//库存组织代码
						'oded_stock_org_name_ebs' : this.ebs_line_order.length > 0 ? 
						this.ebs_line_order[this.ebs_line_order.length - 1]['oded_stock_org_name_ebs'] : '',//库存组织名称 organization_id
						'oded_item_id_ebs'        : 0,//商品ID item_id
						'oded_item_name_ebs'      : '',//商品名称 item_name
						'oded_item_name_en_ebs'   : '',
						'oded_item_description_ebs': '',//说明 item_description
						'oded_item_description_en_ebs':'',
						'oded_style_no_ebs'       : checkData[i]['odg_item_no'],//中文款号-EBS item_attribute1
						'oded_style_no_en_ebs'    : checkData[i]['odg_item_no'],//英文款号-EBS item_attribute6
						'oded_specs_ebs'          : checkData[i]['odgb_name']+' '+checkData[i]['odgb_spec'],//中文规格-EBS item_attribute2
						'oded_specs_en_ebs'       : checkData[i]['odgb_name_en']+' '+checkData[i]['odgb_spec'],//中文规格-EBS item_attribute7
						'oded_line_memo_ebs'      : '',//行备注-EBS description
						
						'oded_qty_ebs'            : checkData[i]['qty'],//数量-EBS quantity
						'oded_unit_code_ebs'      : checkData[i]['odgb_unit_rq']
													? this.TY_JLDW[checkData[i]['odgb_unit_rq']]['ebs_code'] :'PCS',//数量单位编码-EBS uom_code
						'oded_unit'               : checkData[i]['odgb_unit_rq'] ? checkData[i]['odgb_unit_rq'] :'件',//数量单位编码-EBS uom_code
						'oded_currency_ebs'       : this.ebs_head.ode_currency_sales,//币种代码 currency_code
						'oded_ex_rate_ebs'        : this.ebs_line_product.length > 0 ? 
						this.ebs_line_product[this.ebs_line_product.length - 1]['oded_ex_rate_ebs'] : '',//汇率 attribute3
						'oded_price_ebs'          : checkData[i]['odgb_price_pu'],//原币单价 unit_price
						'oded_amount_ebs'         : checkData[i]['amount'],//金额 amount
						'oded_tax_rate_code'      : 'VAT13',//加工必填 税率 tax_code
						'oded_tax_rebate_rate_ebs': 13,//加工必填 退税率 attribute6
						
						'oded_end_process_price_ebs': 0,//成品单价 mfg_unit_price
						'oded_mo_type_ebs'        : line_type_code == 'MO' ? 'P_AGENCY' : '',//加工必填 加工类型 order_type DIS P_AGENCY
						'oded_mo_price_ebs'       : 0,//加工单价 prd_unit_price
						'oded_loss_rate_ebs'      : checkData[i]['odgb_loss_rate'],//损耗 attribute5
						'oded_vender_id_ebs'      : '',//加工必填 供应商ID attribute4
						'oded_sales_type_ebs'     : '不转开',//转开类型 attribute7
					})
				}
				
				result = await ebsApi.getBomList(JSON.stringify({'od_id_str':od_id_str,'type':'process_ml'})) || [];
				checkData = result.data || [];
				line_type_code = 'MO';
				for (let i = 0;i < checkData.length;i++){
					this.ebs_line_process.push({
						'oded_ode_id'        : this.ebs_head.ode_id,
						'oded_style_id'      : checkData[i]['odg_id'],
						'oded_bom_id'        : checkData[i]['odgb_id'],
						'oded_vender_id'     : checkData[i]['odgb_ven_id'],
						'oded_vender_name'   : checkData[i]['odgb_ven_name_a'],
						
						'oded_line_id_ebs'        : '',//预算表行ID-EBS project_line_id
						'oded_project_id_ebs'     : '',//项目ID-EBS project_id
						'oded_project_code_ebs'   : '',//项目号-EBS
						'oded_creator_id_ebs'     : this.ebs_head.ode_creator_id_ebs,//创建人ID-EBS created_by
						
						'oded_line_type_code_ebs' : 'MO',//行类型代码 line_type_code
						'oded_stock_org_id_ebs'   : this.ebs_line_order.length > 0 ?
						 this.ebs_line_order[this.ebs_line_order.length - 1]['oded_stock_org_id_ebs'] :'',//库存组织代码
						'oded_stock_org_name_ebs' : this.ebs_line_order.length > 0 ? 
						this.ebs_line_order[this.ebs_line_order.length - 1]['oded_stock_org_name_ebs'] : '',//库存组织名称 organization_id
						'oded_item_id_ebs'        : 0,//商品ID item_id
						'oded_item_name_ebs'      : '',//商品名称 item_name
						'oded_item_name_en_ebs'   : '',
						'oded_item_description_ebs': '',//说明 item_description
						'oded_item_description_en_ebs':'',
						'oded_style_no_ebs'       : checkData[i]['odg_item_no'],//中文款号-EBS item_attribute1
						'oded_style_no_en_ebs'    : checkData[i]['odg_item_no'],//英文款号-EBS item_attribute6
						'oded_specs_ebs'          : checkData[i]['odgb_name']+' '+checkData[i]['odgb_spec'],//中文规格-EBS item_attribute2
						'oded_specs_en_ebs'       : checkData[i]['odgb_name_en']+' '+checkData[i]['odgb_spec'],//中文规格-EBS item_attribute7
						'oded_line_memo_ebs'      : '',//行备注-EBS description
						
						'oded_qty_ebs'            : checkData[i]['qty'],//数量-EBS quantity
						'oded_unit_code_ebs'      : checkData[i]['odgb_unit_rq']
													? this.TY_JLDW[checkData[i]['odgb_unit_rq']]['ebs_code'] :'PCS',//数量单位编码-EBS uom_code
						'oded_unit'               : checkData[i]['odgb_unit_rq'] ? checkData[i]['odgb_unit_rq'] :'件',//数量单位编码-EBS uom_code
						'oded_currency_ebs'       : this.ebs_head.ode_currency_sales,//币种代码 currency_code
						'oded_ex_rate_ebs'        : this.ebs_line_order.length > 0 ? 
						this.ebs_line_order[this.ebs_line_order.length - 1]['oded_ex_rate_ebs'] : '',//汇率 attribute3
						'oded_price_ebs'          : checkData[i]['odgb_price_pu'],//原币单价 unit_price
						'oded_amount_ebs'         : checkData[i]['amount'],//金额 amount
						'oded_tax_rate_code'      : 'VAT13',//加工必填 税率 tax_code
						'oded_tax_rebate_rate_ebs': 13,//加工必填 退税率 attribute6
						
						'oded_end_process_price_ebs': checkData[i]['odgb_price_pu'],//成品单价 mfg_unit_price
						'oded_mo_type_ebs'        : line_type_code == 'MO' ? 'P_AGENCY' : '',//加工必填 加工类型 order_type DIS P_AGENCY
						'oded_mo_price_ebs'       : checkData[i]['odgb_price_pu'],//加工单价 prd_unit_price
						'oded_loss_rate_ebs'      : checkData[i]['odgb_loss_rate'],//损耗 attribute5
						'oded_vender_id_ebs'      : '',//加工必填 供应商ID attribute4
						'oded_sales_type_ebs'     : '不转开',//转开类型 attribute7
					})
				}
				this.$message({
					message: '添加完成!',
					type: 'success'
				});
				this.productDetailModal = false;
			},
			changeCurrency(row){
				row.oded_ex_rate_ebs = this.rateData[row.oded_currency_ebs];
			},
			changeCurrencyOrder(row){
				row.oded_ex_rate_ebs_order = this.rateData[row.oded_currency_ebs_order];
			},
			showSetDataModal(){
				let checkData = this.$refs.ebs_line_product.getCheckboxRecords();
				if(checkData.length > 0){
					this.setDataModal = true;
					this.setData.compute = 1;
				}else{
					this.$message({
						message: '请选择明细!',
						type: 'warning'
					});
				}
			},
			pl_set(){
				//标准的计算方法应该是：（暂时就不考虑备货方式的因素）
				//IF 采购币种 =CNY ，销售单价 = 采购单价 / （1+增值税率）* 倍率  / 销售币种折CNY汇率
                //ELSE ，销售单价  = 采购单价 * 采购币种折CNY汇率 * 倍率 / 销售币种折CNY汇率
				let checkData = this.$refs.ebs_line_product.getCheckboxRecords();
				if(this.setData.compute > 0){
					for (let i = 0;i < checkData.length;i++){
						for (let j = 0;j < this.ebs_line_order.length;j++){
							if(checkData[i]['oded_bom_id'] == this.ebs_line_order[j]['oded_bom_id']){
								if(checkData[i]['oded_currency_ebs'] == 'CNY'){
									checkData[i]['oded_price_ebs_order'] = parseFloat(parseFloat(checkData[i]['oded_price_ebs']) / 
									parseFloat(parseFloat(1) + parseFloat(this.$config.COST_ZZSL)) * parseFloat(this.setData.compute) /
									parseFloat(checkData[i]['oded_ex_rate_ebs_order'])).toFixed(4);
								}else{
									checkData[i]['oded_price_ebs_order'] = parseFloat(parseFloat(checkData[i]['oded_price_ebs']) *
									parseFloat(checkData[i]['oded_ex_rate_ebs']) * parseFloat(this.setData.compute) /
									parseFloat(checkData[i]['oded_ex_rate_ebs_order'])).toFixed(4);
								}
								checkData[i]['oded_amount_ebs_order'] = parseFloat(parseFloat(checkData[i]['oded_price_ebs_order']) * parseFloat(checkData[i]['oded_qty_ebs'])).toFixed(2);
							}
						}
					}
					this.setDataModal = false;
				}else{
					this.$message({
						message: '请正确输入数据!',
						type: 'warning'
					});
				}
			},
			changeUnit(row){
				row.oded_unit = this.unitObj[row.oded_unit_code_ebs]['unit_of_measure_tl'];
				// for (let i = 0;i < this.unit.length;i++){
				// 	if(row.oded_unit_code_ebs == this.unit[i]['uom_code']){
				// 		row.oded_unit = this.unit[i]['unit_of_measure_tl'];
				// 	}
				// }
			},
			//打印预算
			print_budget(){
				window.open(`/#/ebs_budget_print?id=${this.ebs_head.ode_id}`);
			},
			
			async updateAudit(){
				let res = await ebsApi.updateBudgetAudit(JSON.stringify(this.ebs_head),JSON.stringify(this.ebs_line));
				if(res.code == 0){
					this.$message({
							  message: '已同步!',
							  type: 'success'
							});
				}else{
					this.$message({
							  message: res.data,
							  type: 'error'
							});
				}
			},
			
			changeGetAmountMo(row) {
				 row.oded_amount_ebs = parseFloat(parseFloat(row.oded_qty_ebs) * parseFloat(row.oded_mo_price_ebs)).toFixed(2);
			},
			remoteDepMethod(query) {
				if (query !== '') {
				  this.loading = true;
				  setTimeout(() => {
					this.loading = false;
					this.allUserGroup = this.userGroup.filter(item => {
					  return (item.group_display_name).toLowerCase()
						.indexOf(query.toLowerCase()) > -1;
					});
				  }, 200);
				} else {
				  this.allUserGroup = [];
				}
			},
			remoteGoodMethod(query) {
				if (query !== '') {
				  this.loading = true;
				  setTimeout(() => {
					this.loading = false;
					this.allGoodsList = this.goodsList.filter(item => {
					  return (item.description).toLowerCase()
						.indexOf(query.toLowerCase()) > -1;
					});
				  }, 200);
				} else {
				  this.allGoodsList = [];
				}
			},
		}
	}
</script>