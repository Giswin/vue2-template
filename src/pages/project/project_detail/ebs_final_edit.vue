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
		    同步-决算表
			<div class="model-r">
				<div class="model-header-r">
				    ID：{{ebs_head.odpe_id}}
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
		    <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectTab = 1">订单明细</div>
			<div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectTab = 2">采购明细</div>
			<div class="tabs-col" :class="{ show: selectTab == 3 }" @click="selectTab = 3">加工明细</div>
			<div class="tabs-col" :class="{ show: selectTab == 4 }" @click="selectTab = 4">费用明细</div>
			<div class="tabs-col" :class="{ show: selectTab == 5 }" @click="selectTab = 5">出运明细</div>
		</div>
		<div class="tabs-body of">
			<div style="padding:0px 15px 0px 15px;" v-show="selectTab == 0">
				<el-row :gutter="12">
					<el-Col :span="12">
						<table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
							<tbody>
								<tr>
									<th width="100" align="center">决算-ID</th>
									<td style="background: #f5f7fa;">{{ebs_head.odpe_id_ebs}}</td>
								</tr>
								<tr>
									<th align="center"><span style="color: red;">*</span>业务组</th>
									<td>
										<el-select
											style="width: 100%;"
											v-model="ebs_head.odpe_dep_id_ebs"
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
										</el-select>
									</td>
								</tr>
								<tr>
									<th align="center"><span style="color: red;">*</span>制单人</th>
									<td>
										<el-select style="width: 100%;" v-model="ebs_head.odpe_creator_id_ebs" transfer 
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
										<el-select style="width: 100%;" v-model="ebs_head.odpe_sales_id_ebs" transfer filterable
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
									<th align="center"><span style="color: red;">*</span>订单客户</th>
									<td style="background: #f5f7fa;">
										<el-select style="width:100%;" v-model="ebs_head.odpe_cus_id_ebs" disabled>
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
									<th align="center">客户订单号</th>
									<td style="background: #f5f7fa;">
										<el-input style="width:100%;" clearable v-model="ebs_head.odpe_od_code_cus"></el-input>
									</td>
								</tr>
								<tr>
									<th align="center"><span style="color: red;">*</span>订单状态</th>
									<td style="background: #f5f7fa;">
										<el-select style="width: 100%;" v-model="ebs_head.odpe_status_code" transfer 
										filterable label-in-value   clearable>
											<el-option 
													   key="完成" 
													   value="完成" 
													   label="完成">
											</el-option>
											<el-option 
													   key="未完成" 
													   value="未完成" 
													   label="未完成">
											</el-option>
										</el-select>
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
											v-model="ebs_head.odpe_collect_id_ebs"
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
									<th width="100" align="center"><span v-if="ebs_head.odpe_od_type == '外销'" style="color: red;">*</span>价格条款</th>
									<td>
										<el-select style="width: 100%;" v-model="ebs_head.odpe_price_clause" transfer filterable clearable>
											<el-option v-for="item in priceTerm" 
													   :key="item.lookup_code" 
													   :value="item.lookup_code" 
													   :label="item.lookup_code">
											</el-option>
										</el-select>
									</td>
								</tr>
	
								<tr>
									<th align="center"><span style="color: red;">*</span>交货日期</th>
									<td style="background: #f5f7fa;">
										<el-date-picker v-model="ebs_head.odpe_delivery_date_ebs" 
										value-format="yyyy-MM-dd" type="date"
										    placeholder="选择日期" size="small" clearable></el-date-picker>
										</el-input>
									</td>
								</tr>
								<tr>
									<th align="center">订单数量</th>
									<td style="background: #f5f7fa;">{{ebs_head.odpe_qty_sales_ebs}}</td>
								</tr>
								<tr>
									<th width="100" align="center">数量单位</th>
									<td>
										{{ebs_head.odpe_qty_unit_ebs}}
									</td>
								</tr>
								<tr>
									<th align="center"><span style="color: red;">*</span>订单日期</th>
									<td>
										<el-date-picker v-model="ebs_head.odpe_od_date" value-format="yyyy-MM-dd" type="date"
										    placeholder="选择日期" size="small" clearable>
										</el-date-picker>
									</td>
								</tr>
								<tr>
									<th align="center"><span style="color: red;">*</span>出运数量</th>
									<td>
										<el-input style="width:100%;" clearable v-model="ebs_head.odepe_qty_ship_ebs"></el-input>ss
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
								<el-dropdown-item @click.native="addSalesDetail()">增行</el-dropdown-item>
								<el-dropdown-item @click.native="delSalesDetail()">删行</el-dropdown-item>
								<el-dropdown-item @click.native="showSetModel('ebs_line_order')">批量设置</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
				<div class="model-bottom-body" style="top:50px;">
					<vxe-table ref="ebs_line_order"  border resizable 
					:data="ebs_line_order"  :edit-rules="validRule"
					size="small"  class="mytable-scrollbar" show-overflow height="100%" auto-resize 
					:column-config="{minWidth:100}" :edit-config="{trigger: 'click', mode: 'cell'}">
						<vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
						<vxe-table-column type="seq" title="序号" width="40" align="center" ></vxe-table-column>
						<vxe-table-column field="odped_style_no_ebs" title="中文款号" width="160" header-align="center"
						 :edit-render="{name: 'ElInput'}" sortable 
						 :filters="[{ data: '' }]" :filter-method="filterMethod">
							<template #filter="{ $panel, column }">
							    <vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
						 </vxe-table-column>
						<vxe-table-column field="odped_style_no_en_ebs" title="英文款号" header-align="center" :edit-render="{name: 'ElInput'}" sortable></vxe-table-column >
						<vxe-table-column field="odped_stock_org_id_ebs" title="库存组织" width="100" header-align="center" >
							<template v-slot="{ row,rowIndex }">
								<el-select
									style="width: 100%;"
									v-model="row.odped_stock_org_id_ebs"
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
						<vxe-table-column field="odped_item_id_ebs" title="商品名称-EBS" width="140" header-align="center" 
						:edit-render="{}"
						:filters="[{ data: '' }]" :filter-method="filterMethod">
							<template #filter="{ $panel, column }">
							    <vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.odped_item_description_ebs"
									transfer
									filterable
									remote
									clearable
									@clear="row.odped_item_id_ebs=null;row.odped_item_name_ebs=null;row.odped_item_description_ebs=null;"
									@change="changeGoods(row)"
									:remote-method="remoteGoodsMethod"
									:loading="loading"
								>
									<el-option v-for="item in goodsOptions"
											   :key="item.description"
											   :value="item.description"
											   :label="item.description+'|'+item.segment1"
									>
										<span style="float: left">{{ item.description+'|'+item.segment1 }}</span>
										<span style="float: right; color: #8492a6;">{{ unitObj[item.primary_uom_code]['unit_of_measure_tl'] }}</span>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column field="odped_specs_ebs" title="商品名称" width="140" header-align="center" 
						:edit-render="{name: 'ElInput'}" sortable
						:filters="[{ data: '' }]" :filter-method="filterMethod">
							<template #filter="{ $panel, column }">
							    <vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="odped_unit_code_ebs" title="单位" width="100" align="center" >
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.odped_unit_code_ebs"
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
						<vxe-table-column field="odped_currency_ebs" title="币种" width="100" align="center" >
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.odped_currency_ebs"
									transfer
									filterable
									@change="changeCurrency(row)"
								>
									<el-option v-for="item in currency"
											   :key="item.currency_code"
											   :value="item.currency_code"
											   :label="item.currency_code"
									>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column field="odped_qty_ebs" title="数量" width="100" header-align="center"
						 align="right" :edit-render="{}">
							<template v-slot:edit="{ row }">
								<el-input v-model="row.odped_qty_ebs" 
								@change="row.odped_amount_ebs = row.odped_qty_ebs * row.odped_price_ebs"
								>
								</el-input>
							</template>
						 </vxe-table-column>
						<vxe-table-column field="odped_price_ebs" title="原币单价" width="100" header-align="center" align="right" :edit-render="{}">
							<template v-slot:edit="{ row }">
								<el-input v-model="row.odped_price_ebs"
								@change="row.odped_amount_ebs = row.odped_qty_ebs * row.odped_price_ebs"
								>
								</el-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="odped_amount_ebs" title="金额" width="80" header-align="center" align="right"></vxe-table-column>
						<!-- <vxe-table-column field="odped_end_process_price_ebs" title="成品单价" header-align="center" align="right" :edit-render="{name: 'ElInput'}" ></vxe-table-column > -->
						<vxe-table-column field="odped_ex_rate_ebs" title="汇率" width="60" header-align="center" :edit-render="{name: 'ElInput'}"></vxe-table-column>
						<vxe-table-column field="odped_tax_rate_code" title="税率" width="60" header-align="center"></vxe-table-column>
						<vxe-table-column field="odped_ex_rate_pr_ebs" title="预算汇率" header-align="center" align="right"></vxe-table-column >
						<vxe-table-column field="odped_qty_pr_ebs" title="预算数量" header-align="center" align="right"></vxe-table-column >
						<vxe-table-column field="odped_price_pr_ebs" title="预算单价" header-align="center" align="right"></vxe-table-column >
						<vxe-table-column field="odped_amount_pr_ebs" title="预算金额" header-align="center" align="right"></vxe-table-column >
						<vxe-table-column field="odped_end_process_price_pr_ebs" title="预算成品单价" header-align="center" align="right"></vxe-table-column >
						<vxe-table-column field="odped_mo_price_pr_ebs" title="预算加工单价" header-align="center" align="right"></vxe-table-column >
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
										<el-dropdown-item @click.native="addProductDetail()">增行</el-dropdown-item>
										<el-dropdown-item @click.native="delProductDetail()()">删行</el-dropdown-item>
										<el-dropdown-item @click.native="showSetModel('ebs_line_product')">批量设置</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</div>
						</div>
					</div>
				</div>
				<div class="model-bottom-body" style="top:50px;">
					<vxe-table border resizable show-overflow ref="ebs_line_product" :data="ebs_line_product" size="small" 
					class="mytable-scrollbar" 
					height="100%" auto-resize :column-config="{minWidth:100}" 
					:edit-config="{trigger: 'click', mode: 'cell'}"
					:edit-rules="validRule">
						<vxe-table-column type="checkbox" width="40" align="center" ></vxe-table-column>
						<vxe-table-column type="seq" title="序号" width="40" align="center" ></vxe-table-column>
						<vxe-table-column field="odped_style_no_ebs" title="中文款号" width="160" header-align="center" 
						:edit-render="{name: 'ElInput'}" sortable
						:filters="[{ data: '' }]" :filter-method="filterMethod">
							<template #filter="{ $panel, column }">
								<vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="odped_style_no_en_ebs" title="英文款号" header-align="center" :edit-render="{name: 'ElInput'}" sortable></vxe-table-column>
						<vxe-table-column field="odped_stock_org_id_ebs" title="库存组织" width="100" header-align="center" >
							<template v-slot="{ row,rowIndex }">
								<el-select
									style="width: 100%;"
									v-model="row.odped_stock_org_id_ebs"
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
						<vxe-table-column field="odped_item_id_ebs" title="商品名称-EBS" width="140" header-align="center" 
						:edit-render="{}"
						:filters="[{ data: '' }]" :filter-method="filterMethod">
							<template #filter="{ $panel, column }">
								<vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.odped_item_description_ebs"
									transfer
									filterable
									remote
									clearable
									@clear="row.odped_item_id_ebs=null;row.odped_item_name_ebs=null;row.odped_item_description_ebs=null;"
									@change="changeGoods(row)"
									:remote-method="remoteGoodsMethod"
									:loading="loading"
								>
									<el-option v-for="item in goodsOptions"
											   :key="item.description"
											   :value="item.description"
											   :label="item.description+'|'+item.segment1"
									>
										<span style="float: left">{{ item.description+'|'+item.segment1 }}</span>
										<span style="float: right; color: #8492a6;">{{ unitObj[item.primary_uom_code]['unit_of_measure_tl'] }}</span>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column field="odped_specs_ebs" title="商品名称" width="140" header-align="center" 
						:edit-render="{name: 'ElInput'}" sortable
						:filters="[{ data: '' }]" :filter-method="filterMethod">
							<template #filter="{ $panel, column }">
								<vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="odped_vender_id_ebs" title="供应商" width="280" header-align="center" :edit-render="{}">
							<!-- <template v-slot="{ row,rowIndex }">
								<div style="display: flex;">
									<div style="flex: 1;">
										<el-select
											style="width:100%;"
											v-model="row.odped_vender_id_ebs"
											clearable
										>
											<el-option v-for="item in vender"
													   :key="item.party_id"
													   :value="item.party_id"
													   :label="item.party_name"
											>
											</el-option>
										</el-select>
									</div>
									<div style="width: 70px;">
										<el-button style="width:100%;"
												@click="showCustomer(3,rowIndex,'product')"
										>
											调整
										</el-button>
									</div>
								</div>
							</template> -->
							<template v-slot="{ row,rowIndex }">
								<div style="padding-right: 60px;">
									{{row.odped_vender_name}}--{{row.odped_vender_id_ebs}}
									<div style="position: absolute;top:3px;right:1px;">
										<el-button size="small" style="width:60px;" @click="showCustomer(3,rowIndex,'product')">调整</el-button>
									</div>
								</div>
							</template>
						</vxe-table-column>
						<vxe-table-column field="odped_loss_rate_ebs" title="损耗%" width="60" header-align="center" align="right"></vxe-table-column>
						<vxe-table-column field="odped_unit_code_ebs" title="单位" width="80" align="center" >
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.odped_unit_code_ebs"
									transfer
									disabled
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
						<vxe-table-column field="odped_currency_ebs" title="币种" width="80" align="center" >
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.odped_currency_ebs"
									transfer
									filterable
									clearable
									@change="changeCurrency(row)"
								>
									<el-option v-for="item in currency"
											   :key="item.currency_code"
											   :value="item.currency_code"
											   :label="item.currency_code"
									>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column field="odped_qty_ebs" title="数量" width="100" header-align="center"
						 align="right" :edit-render="{}">
							<template v-slot:edit="{ row }">
								<el-input v-model="row.odped_qty_ebs" 
								@change="row.odped_amount_ebs = row.odped_qty_ebs * row.odped_price_ebs"
								>
								</el-input>
							</template>
						 </vxe-table-column>
						<vxe-table-column field="odped_price_ebs" title="单价" width="100" header-align="center" align="right" :edit-render="{}">
							<template v-slot:edit="{ row }">
								<el-input v-model="row.odped_price_ebs"
								@change="row.odped_amount_ebs = row.odped_qty_ebs * row.odped_price_ebs"
								>
								</el-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="odped_amount_ebs" title="金额" width="80" header-align="center" align="right"></vxe-table-column>
						<vxe-table-column field="odped_ex_rate_ebs" title="汇率" width="60" header-align="center" :edit-render="{name: 'ElInput'}"></vxe-table-column>
						<vxe-table-column field="odped_tax_rate_code" title="税率" width="60" header-align="center"></vxe-table-column>
						<vxe-table-column field="odped_tax_rebate_rate_ebs" title="退税率" width="60" header-align="center" align="right" ></vxe-table-column>
						<vxe-table-column field="odped_sales_type_ebs" title="转开票" width="60" header-align="center" :edit-render="{}">
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.odped_sales_type_ebs"
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
						<vxe-table-column field="odped_ex_rate_pr_ebs" title="预算汇率" header-align="center" align="right"></vxe-table-column >
						<vxe-table-column field="odped_qty_pr_ebs" title="预算数量" header-align="center" align="right"></vxe-table-column >
						<vxe-table-column field="odped_price_pr_ebs" title="预算单价" header-align="center" align="right"></vxe-table-column >
						<vxe-table-column field="odped_amount_pr_ebs" title="预算金额" header-align="center" align="right"></vxe-table-column >
						<vxe-table-column field="odped_end_process_price_pr_ebs" title="预算成品单价" header-align="center" align="right"></vxe-table-column >
						<vxe-table-column field="odped_mo_price_pr_ebs" title="预算加工单价" header-align="center" align="right"></vxe-table-column >
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
										<el-dropdown-item @click.native="addProcessDetail()">增行</el-dropdown-item>
										<el-dropdown-item @click.native="delProcessDetail()()">删行</el-dropdown-item>
										<el-dropdown-item @click.native="showSetModel('ebs_line_process')">批量设置</el-dropdown-item>
									</el-dropdown-menu>
								</el-dropdown>
							</div>
						</div>
					</div>
				</div>
				<div class="model-bottom-body" style="top:50px;">
					<vxe-table border resizable show-overflow ref="ebs_line_process" :data="ebs_line_process" size="small" class="mytable-scrollbar"
					  height="100%" auto-resize :column-config="{minWidth:100}" 
					  :edit-config="{trigger: 'click', mode: 'cell'}"
					  :edit-rules="validRuleProcess">
						<vxe-table-column type="checkbox" width="40" align="center" ></vxe-table-column>
						<vxe-table-column type="seq" title="序号" width="40" align="center" ></vxe-table-column>
						<vxe-table-column field="odped_style_no_ebs" title="中文款号" width="160" header-align="center" 
						:edit-render="{name: 'ElInput'}" sortable
						:filters="[{ data: '' }]" :filter-method="filterMethod">
							<template #filter="{ $panel, column }">
								<vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="odped_style_no_en_ebs" title="英文款号" header-align="center" :edit-render="{name: 'ElInput'}" sortable></vxe-table-column>
						<!-- <vxe-table-column field="odped_specs_ebs" title="中文规格" width="140" header-align="center" :edit-render="{name: 'ElInput'}"></vxe-table-column>
						<vxe-table-column field="odped_specs_en_ebs" title="英文规格" width="140" header-align="center" :edit-render="{name: 'ElInput'}"></vxe-table-column> -->
						<vxe-table-column field="odped_stock_org_name_ebs" title="库存组织" width="100" header-align="center" >
							<template v-slot="{ row,rowIndex }">
								<el-select
									style="width: 100%;"
									v-model="row.odped_stock_org_id_ebs"
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
						<vxe-table-column field="odped_item_id_ebs" title="商品名称-EBS" width="140" header-align="center" 
						:edit-render="{}"
						:filters="[{ data: '' }]" :filter-method="filterMethod"
						>
							<template #filter="{ $panel, column }">
								<vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.odped_item_description_ebs"
									transfer
									filterable
									remote
									clearable
									@clear="row.odped_item_id_ebs=null;row.odped_item_name_ebs=null;row.odped_item_description_ebs=null;"
									@change="changeGoods(row)"
									:remote-method="remoteGoodsMethod"
									:loading="loading"
								>
									<el-option v-for="item in goodsOptions"
											   :key="item.description"
											   :value="item.description"
											   :label="item.description+'|'+item.segment1"
									>
										<span style="float: left">{{ item.description+'|'+item.segment1 }}</span>
										<span style="float: right; color: #8492a6;">{{ unitObj[item.primary_uom_code]['unit_of_measure_tl'] }}</span>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column field="odped_specs_ebs" title="商品名称" width="140" header-align="center" 
						:edit-render="{name: 'ElInput'}" sortable
						:filters="[{ data: '' }]" :filter-method="filterMethod"
						>
							<template #filter="{ $panel, column }">
								<vxe-input type="type" v-for="(option, index) in column.filters" :key="index" v-model="option.data" @input="$panel.changeOption($event, !!option.data, option)"></vxe-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="odped_vender_id_ebs" title="供应商" width="280" header-align="center" :edit-render="{}">
							<template v-slot="{ row,rowIndex }">
								<div style="display: flex;">
									<div style="flex: 1;padding-top: 8px;">
										{{row.odped_vender_name}}--{{row.odped_vender_id_ebs}}
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
						<vxe-table-column field="odped_mo_type_ebs" title="加工类型" width="80" header-align="center" :edit-render="{}">
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.odped_mo_type_ebs"
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
						<vxe-table-column field="odped_loss_rate_ebs" title="损耗%" width="60" header-align="center" align="right"></vxe-table-column>
						<vxe-table-column field="odped_unit_code_ebs" title="单位" width="80" align="center" :edit-render="{}">
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.odped_unit_code_ebs"
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
						<vxe-table-column field="odped_currency_ebs" title="币种" width="80" align="center" :edit-render="{}">
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.odped_currency_ebs"
									transfer
									filterable
									clearable
									@change="changeCurrency(row)"
								>
									<el-option v-for="item in currency"
											   :key="item.currency_code"
											   :value="item.currency_code"
											   :label="item.currency_code"
									>
									</el-option>
								</el-select>
							</template>
						</vxe-table-column>
						<vxe-table-column field="odped_qty_ebs" title="数量" width="100" header-align="center"
						 align="right" :edit-render="{}">
							<template v-slot:edit="{ row }">
								<el-input v-model="row.odped_qty_ebs" 
								@change="row.odped_amount_ebs = row.odped_qty_ebs * row.odped_mo_price_ebs"
								>
								</el-input>
							</template>
						 </vxe-table-column>
						<!-- <vxe-table-column field="odped_price_ebs" title="单价" width="100" header-align="center" align="right" :edit-render="{}">
							<template v-slot:edit="{ row }">
								<el-input v-model="row.odped_price_ebs"
								@change="row.odped_amount_ebs = row.odped_qty_ebs * row.odped_price_ebs"
								>
								</el-input>
							</template>
						</vxe-table-column> -->
						<vxe-table-column field="odped_end_process_price_ebs" title="成品单价" width="70" header-align="center" align="right" :edit-render="{}">
							<template v-slot:edit="{ row }">
								<el-input
									style="width:100%;"
									v-model="row.odped_end_process_price_ebs"
								>
								</el-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="odped_mo_price_ebs" title="加工单价" width="80" header-align="center" align="right" :edit-render="{}">
							<template v-slot:edit="{ row }">
								<el-input
									style="width:100%;"
									v-model="row.odped_mo_price_ebs"
									@change="row.odped_amount_ebs = row.odped_qty_ebs * row.odped_mo_price_ebs"
								>
								</el-input>
							</template>
						</vxe-table-column>
						<vxe-table-column field="odped_amount_ebs" title="金额" width="80" header-align="center" align="right"></vxe-table-column>
						<vxe-table-column field="odped_ex_rate_ebs" title="汇率" width="60" header-align="center" :edit-render="{name: 'ElInput'}"></vxe-table-column>
						<vxe-table-column field="odped_tax_rate_code" title="税率" width="60" header-align="center"></vxe-table-column>
						<vxe-table-column field="odped_tax_rebate_rate_ebs" title="退税率" width="60" header-align="center" align="right" ></vxe-table-column>
						<vxe-table-column field="odped_sales_type_ebs" title="转开票" width="60" header-align="center" :edit-render="{}">
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.odped_sales_type_ebs"
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
						<vxe-table-column field="odped_ex_rate_pr_ebs" title="预算汇率" header-align="center" align="right"></vxe-table-column >
						<vxe-table-column field="odped_qty_pr_ebs" title="预算数量" header-align="center" align="right"></vxe-table-column >
						<vxe-table-column field="odped_price_pr_ebs" title="预算单价" header-align="center" align="right"></vxe-table-column >
						<vxe-table-column field="odped_amount_pr_ebs" title="预算金额" header-align="center" align="right"></vxe-table-column >
						<vxe-table-column field="odped_end_process_price_pr_ebs" title="预算成品单价" header-align="center" align="right"></vxe-table-column >
						<vxe-table-column field="odped_mo_price_pr_ebs" title="预算加工单价" header-align="center" align="right"></vxe-table-column >
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
						<vxe-table-column field="odpef_line_id_ebs" title="项目费用ID" align="center" width="120"></vxe-table-column>
						<vxe-table-column field="odpef_name" title="费用名称" align="center" width="120"></vxe-table-column>
						<vxe-table-column field="odpef_fee_type_code_ebs" title="费用类型代码" align="center" width="120"></vxe-table-column>
						<vxe-table-column field="odpef_currency_ebs" title="币种" align="center" width="120"></vxe-table-column>
						<vxe-table-column field="odpef_amount_ebs" title="金额" align="center" width="120" :edit-render="{name: 'ElInput'}"></vxe-table-column>
						<vxe-table-column field="odpef_ex_rate_ebs" title="汇率" align="center" width="120" :edit-render="{name: 'ElInput'}"></vxe-table-column>
						<vxe-table-column field="odpef_amount_pr_ebs" title="预算金额" align="center" width="120" ></vxe-table-column>
						<vxe-table-column field="odpef_ex_rate_pr_ebs" title="预算汇率" align="center" width="120" ></vxe-table-column>
						<vxe-table-column field="odpef_line_memo_ebs" title="备注" align="center" width="120"></vxe-table-column>
						<vxe-table-column field="odpef_creator_id_ebs" title="创建人" align="center" width="120" :edit-render="{}">
							<template v-slot="{ row }">
								<el-select
									style="width: 100%;"
									v-model="row.odpef_creator_id_ebs"
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
			
			<div style="padding:0px 15px 0px 15px;" v-show="selectTab == 5">
				<div>
					<div class="m-r">
					
					</div>
				</div>
				<div class="model-bottom-body" style="top:50px;">
					<vxe-table border resizable :data="ebs_ship" size="small" class="mytable-scrollbar" 
					show-overflow height="100%" auto-resize :column-config="{minWidth:100}" 
					:edit-config="{trigger: 'click', mode: 'row'}">
						 
						<vxe-table-column type="seq" title="序号" align="center" width="50"></vxe-table-column>
						<vxe-table-column  field="odpes_ship_code_ebs" title="运编号" align="center" width="360"></vxe-table-column>
						 
					</vxe-table>
				</div>
			</div>
		</div>
		<template v-slot:footer>
			<div class="m-r">
				<vxe-button size="small" v-if="ebs_head.odpe_state == 0 && 1==0" @click="updateErpEndProject(2)">保存</vxe-button>
				<vxe-button size="small" v-if="ebs_head.odpe_state == 0" @click="updateErpEndProject(1)">同步</vxe-button>
				<vxe-button size="small" v-if="ebs_head.odpe_state == 1" @click="changeEbsState(0)">撤销</vxe-button>
				<vxe-button size="small" v-if="ebs_head.odpe_id_ebs > 0 && ebs_head.odpe_state == 0 && 1==0" @click="updateErpEndProject(1,1)">发布</vxe-button>
				<vxe-button size="small" v-if="ebs_head.odpe_state == 1  && $store.state.rights.indexOf('OP-50-96')>=0" @click="updateAudit()">同步审核信息</vxe-button>
				<!-- <vxe-button size="small" @click="print_project()">预览</vxe-button> -->
			</div>
		</template>
		
		<!-- 客户弹层 -->
		<vxe-modal title="交易方弹层" :value="customerModal" v-show="customerModal" @close="customerModal=false" class-name="vertical-center-modal" height="600px"  resize remember :showFooter="true" :mask-closable="false" width="800">
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
		</div>
		<div slot="footer">
			<div class="m-r">
				<el-button size="small" @click="changeCustomer()">确定</el-button>
			</div>
		</div>
		</vxe-modal>
		<!-- 客户弹层 -->
		
		<!-- 批量设置 -->
		<set_model v-if="setModal" :show.sync="setModal" @afterSave="setAfter"></set_model>
		<!-- 批量设置 -->
		
	
	</vxe-modal>
</template>

<script>
	
	import ifsApi from '@/api/ifs'
	import ebsApi from '@/api/gbs/ebs.js' 
	import projectApi from '@/api/cbs/project.js'
	import omApi from '@/api/gbs/om.js'

	import set_model from '@/pages/project/project_detail/set_model';
	
	export default {
		components: {
			set_model,
		
		},
	    props: {
			show: Boolean,
			id:'',
			budget_head:'',
	    },
		created() {
			
		},
	    data() {
			return {
				showview: false,
				downIcon: true,
				customerModal:false,
				setModal:false,
				selectTab:0,
				
				ebs_path:'HS',
				
				ebs_head:{},
				ebs_line:[],
				ebs_cost:[],
				ebs_ship:[],
				
				budget_line:[],
				budget_cost:[],
				
				ebs_line_order:[],
				ebs_line_product:[],
				ebs_line_process:[],
				
				userGroupId:'',
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
				goodsList:[],//商品
				goodsDataList:[],//商品
				goodsOptions:[],
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
				
				TY_JLDW:[],
				
				validRule:{
					odped_stock_org_id_ebs : [
						{ required: true, message: '请填写库存组织' },
					],
					odped_item_id_ebs : [
						{ required: true, message: '请编辑商品ID' },
					],
					odped_mo_price_ebs : [
						{ required: true, message: '请编辑加工单价' },
					],
				},
				
				validRuleProcess:{
					odped_stock_org_id_ebs : [
						{ required: true, message: '请填写库存组织' },
					],
					odped_item_id_ebs : [
						{ required: true, message: '请编辑商品ID' },
					],
					odped_vender_id_ebs : [
						{ required: true, message: '请编辑供应商' },
					],
					odped_mo_price_ebs : [
						{ required: true, message: '请编辑加工单价' },
					],
				},
				
				setTable:'',
				
				salesDetailModal:false,
				productDetailModal:false,
				processDetailModal:false,
				message:[],
				rateData:{},
				loading: false,
			}	 
		},
		watch:{
		    show:{
		        handler(newVal, oldVal){
					this.initData();
		        },
		        immediate:true,
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
				this.$emit('aftersave');
			},
			async initData(){
				await this.getOrderProjectEbsList();
				this.initDataMain();
				this.getOrderEbsList();
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
				this.getRate();
				//this.getFeeType();
				if(this.ebs_head.odpe_od_type == '内销'){
					this.validRule = {
						odped_stock_org_id_ebs : [
							{ required: true, message: '请填写库存组织' },
						],
					}
				}
					
			},
			
			async getRate() {
				let date = new Date(this.budget_head.ode_create_time);
				let month = date.getMonth()+1;
				let year  = date.getFullYear();
				let rateData  = await omApi.getExchangeRate(month,year);
				console.log(rateData.data);
				this.rateData = rateData.data || {};
			},
			
			initDataMain() {
				if(this.ebs_head.odpe_dep_id_ebs != ''){
					this.getGroupUser();
				}
				if(this.ebs_head.odpe_cus_id_ebs != ''){
					this.getCustomer(this.ebs_head.odpe_cus_id_ebs);
				}
				if(this.ebs_head.odpe_end_cus_ebs != ''){
					//this.getCustomerT(this.ebs_head.odpe_end_cus_ebs);
				}
				this.getEndLineData();
				
			},
			
			async getDic(){
				this.$dmBaseSet.dicData('TY_BZ,TY_JLDW').then((data) =>{
					this.TY_JLDW = this.$general.objectKeyBy(data['TY_JLDW'].children,'dic_name') || [];
				});
			},
			
			async getOrderEbsList (){
				let num = 0;
			 	projectApi.getOrderEbsList(this.budget_head.ode_id).then((result)=>{
					if(result.code == 0){
						this.budget_line = result.data.line || [];
						this.budget_cost = result.data.cost || [];
						
					}
				})
			},
			
			//获取基础信息
			async getOrderProjectEbsList (){
				let num = 0;
			 	await projectApi.getOrderProjectEbsList(this.id).then((result)=>{
					if(result.code == 0){
						this.ebs_head = result.data.head || {};
						this.ebs_line = result.data.line || [];
						this.ebs_cost = result.data.cost || [];
						this.ebs_ship= result.data.ship ||[];
						this.ebs_line_order = [];
						this.ebs_line_product = [];
						this.ebs_line_process = [];
						
						if(this.budget_head['ode_system_type'] == 2){
							this.ebs_path = 'HK';
						}else{
							this.ebs_path = 'HS';
						}
						
						for (let i = 0;i < this.ebs_line.length;i++){
							if(this.ebs_line[i].odped_line_type_code_ebs == 'ORDER'){
								this.ebs_line_order.push(this.ebs_line[i]);
							}else if(this.ebs_line[i].odped_line_type_code_ebs == 'MATERIAL'){
								this.ebs_line_product.push(this.ebs_line[i]);
							}else if(this.ebs_line[i].odped_line_type_code_ebs == 'MO'){
								this.ebs_line_process.push(this.ebs_line[i]);
							}
						}	
						if(this.ebs_head.odpe_id_ebs > 0){
							this.getProjectShip();
						}
						
						if(this.ebs_line.length > 0)
							this.getGoodsList(this.ebs_line[0].odped_stock_org_id_ebs);
					}
				})
			},
			
			getProjectShip (){
				ebsApi.getEbsData('get_project_ship',this.ebs_head.odpe_id_ebs).then((result)=>{
					if(result.code == 0 && result.data != null){
						this.ebs_ship = result.data || [];
						for (let i = 0;i < this.ebs_ship.length;i++){
							this.ebs_ship[i].select_flag = 
							this.ebs_ship[i].select_flag == 'y' || this.ebs_ship[i].select_flag == 'Y' 
							? true : false;
							this.ebs_ship[i].shipment_date = this.sy_substr(this.ebs_ship[i].shipment_date || '','before','T');
						}
					}
				})
			},
			
			sy_substr(obj,state,flage) {
				if(obj.length > 0){
					let index = obj.lastIndexOf(flage);
					
					if(index > 0){
						if(state == 'before'){
						 obj=obj.substring(0,index);
						}else{
						 obj=obj.substring(index+1,obj.length);
						}
					}
				}
				
				return obj;
			},
			
			getVen(){
				let tmpArr = this.ebs_line;
				let arr = [];
				
				for (let i = 0;i < tmpArr.length;i++){
					arr.push(tmpArr[i].odped_vender_id_ebs);
				}
				arr = this.$XEUtils.uniq(arr);
				this.vender = [];
				for (let i = 0;i < arr.length;i++){
					if(arr[i] > 0)
						this.getVender(arr[i]);
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
						this.userGroup = this.$general.objectKeyBy(result.data,'group_id') || [];
					}
				})
			},
			
			
			//根据业务组获取业务员
			getGroupUser(){
				ebsApi.getEbsData('get_group_user',this.ebs_head.odpe_dep_id_ebs,this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.groupUser = this.$general.objectKeyBy(result.data,'user_id') || [];
					}
				})
			},
			
			
			//获取业务类型
			getTradeType(){
				ebsApi.getEbsData('get_tradetype','',this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.tradeType = this.$general.objectKeyBy(result.data,'transaction_type_id') || [];
					}
				})
			},
			
			
			//获取付款方式
			getPaymentMethod(){
				this.paymentMethod = {
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
				};
			},
			 
			
			//获取出运方式
			getTransMethod(){
				ebsApi.getEbsData('get_trans_method','',this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.transMethod = result.data || [];
					}
				})
			},
			
			
			//获取价格条款
			getPriceTerm(){
				ebsApi.getEbsData('get_price_term','',this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.priceTerm = result.data || [];
					}
				})
			},
			
			
			//获取单位代码
			getUnit(){
				ebsApi.getEbsData('get_unit','',this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.unit = result.data || [];
						this.unitObj =this.$general.objectKeyBy(result.data || [],'uom_code');
						
						for (let i = 0;i < this.ebs_line_order.length;i++){
							if(this.ebs_line_order[i].odped_item_description_ebs)
								this.ebs_line_order[i].unit_type = this.goodsList[this.ebs_line_order[i].odped_item_description_ebs].uom_class;
						}
						
						for (let i = 0;i < this.ebs_line_product.length;i++){
							if(this.ebs_line_product[i].odped_item_description_ebs)
								this.ebs_line_product[i].unit_type = this.goodsList[this.ebs_line_product[i].odped_item_description_ebs].uom_class;
						}
						
						for (let i = 0;i < this.ebs_line_process.length;i++){
							if(this.ebs_line_process[i].odped_item_description_ebs)
								this.ebs_line_process[i].unit_type = this.goodsList[this.ebs_line_process[i].odped_item_description_ebs].uom_class;
						}
					}
				})
			},
			
			
			//获取币种单位
			getCurrency(){
				ebsApi.getEbsData('get_currency','',this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.currency = result.data || [];
					}
				})
			},
			
			
			//获取库存组织
			getStockOrg(){
				ebsApi.getEbsData('get_stock_org','',this.ebs_path).then((result)=>{
					if(result.code == 0){	
						this.stockOrg = this.$general.objectKeyBy(result.data,'organization_id') || [];
					}
				})
			},
			
			
			//获取加工类型
			getProcessType(){
				ebsApi.getEbsData('get_process_type','',this.ebs_path).then((result)=>{
					if(result.code == 0){	
						this.processType = result.data || [];
					}
				})
			},
			
			
			//获取费用类型
			getFeeType(){
				ebsApi.getEbsData('get_feetype','').then((result)=>{
					if(result.code == 0){	
						this.feeType = result.data || [];
					}
				})
			},
			
			 
			
			
			//获取商品列表
			getGoodsList(params){
				let param = `organization_id=${params}`;
				this.goodsFlag = 1;
				ebsApi.getEbsData('get_goodslist',param,this.ebs_path).then((result)=>{
					if(result.code == 0){
						this.goodsList = this.$general.objectKeyBy(result.data,'description') || [];
						this.goodsDataList = result.data || [];
					}
				})
			},
			
			
			//更改业务组
			changeUserGroup(){
				if(this.ebs_head.odpe_dep_id_ebs > 0)
					this.ebs_head.odpe_dep_name_ebs = this.userGroup[this.ebs_head.odpe_dep_id_ebs].group_display_name;
				this.getGroupUser();
			},
			
			changeCreator(){
				this.ebs_head.odpe_creator = this.groupUser[this.ebs_head.odpe_creator_id_ebs].full_name
			},
			
			//更改业务
			changeGroupUser(option){
				 this.ebs_head.odpe_sales_name = this.groupUser[this.ebs_head.odpe_sales_id_ebs].full_name
			},
			
			changeTradeType(){
				this.ebs_head.odpe_bus_type = this.tradeType[this.ebs_head.odpe_bus_type_id_ebs].name
			},
			
			changeTermsId(){
				this.ebs_head.odpe_collect_mode = this.paymentMethod[this.ebs_head.odpe_collect_id_ebs].code
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
				let party_name = checkData[0].trader_name
				if(checkData.length == 1){
					if(this.customerType == 1 || this.customerType == 2){
						if(this.customerType == 1){
							this.ebs_head.odpe_cus_id_ebs = party_id
							this.getCustomer(party_id);
						}else if(this.customerType == 2){
							this.ebs_head.odpe_end_cus_ebs = party_id
							this.getCustomerT(party_id);
						}
						this.customerModal = false;
					}else{
						if(this.line_type == 'product'){
							this.ebs_line_product[this.lineRow].odped_vender_id_ebs = party_id
							this.ebs_line_product[this.lineRow].odped_vender_name = party_name
						}else if (this.line_type == 'process'){ 
							this.ebs_line_process[this.lineRow].odped_vender_id_ebs = party_id
							this.ebs_line_process[this.lineRow].odped_vender_name = party_name
						}
						this.getEndLineData();
						//this.getVen();
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
				row.odped_stock_org_name_ebs = this.stockOrg[row.odped_stock_org_id_ebs].organization_name;
				this.getGoodsList(row.odped_stock_org_id_ebs);
			},
			
			
			//选中物料后操作
			changeGoods(row){
				if((row.odped_item_description_ebs).length > 0){
					row.odped_item_id_ebs = this.goodsList[row.odped_item_description_ebs].inventory_item_id;
					row.odped_item_name_ebs = this.goodsList[row.odped_item_description_ebs].segment1;
					row.odped_item_description_ebs = this.goodsList[row.odped_item_description_ebs].description;
					row.odped_unit_code_ebs = this.goodsList[row.odped_item_description_ebs].primary_uom_code
					row.odped_unit = this.unitObj[row.odped_unit_code_ebs]['unit_of_measure_tl'];
					row.unit_type = this.goodsList[row.odped_item_description_ebs].uom_class;
				}
			},
			
			//同步EBS预算
			updateErpEndProject(flag,up){
				let msg = this.checkSaveData();
				if(msg.length > 0){
					return;
				}
				 
				if(flag == 1){
					this.$confirm("请仔细核对数据，该操作会把当前数据同步到甲骨文系统，如确认，建议您随后进行相关检查，是否进行同步？", 
					"提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning",}
					).then(type=>{
						if(type=='confirm'){
							 this.getEndLineData();
							 projectApi.updateErpEndProject(JSON.stringify(this.ebs_head),JSON.stringify(this.ebs_line),
							 JSON.stringify(this.ebs_cost),JSON.stringify(this.ebs_ship),flag).then((result)=>{
							 	if(result.code == 0){
							 		this.$message({
							 		          message: '同步成功!',
							 		          type: 'success'
							 		        });
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
					ebsApi.updateErpEndProject(JSON.stringify(this.ebs_head),JSON.stringify(this.ebs_line),JSON.stringify(this.ebs_cost),JSON.stringify(this.ebs_ship),flag).then((result)=>{
						this.$message({
								  message: '保存成功!',
								  type: 'success'
								});
						this.getOrderProjectEbsList();
						this.$emit('aftersave');
					})
				}
			},
			
			async changeEbsState(state){
				// if(this.ebs_head.odpe_state_aprv == 1){
				// 	this.$message({
				// 			  message: '已审批同步不能撤销!',
				// 			  type: 'warring'
				// 			});
				// 	return false;
				// }
				if(state == 0 || state == 2){
					let con = false;
					let conditions = {
						'me_state' : 1,
						'me_object_id' : this.ebs_head.odpe_id,
						//'me_type':13,
						'me_object_memo':'bm_project_end',
					};
					let result = await ifsApi.messageList(conditions,'',true,'','')
					this.message = result.data.list || [];
					con = await this.logoutMessage();
					if(!con){
						this.$message({
						    message: '历史消息失效失败!',
						    type: 'error'
						});
					}else{
						this.$message({
						    message: '历史消息失效成功!',
						    type: 'success'
						});
					}
				}
				ebsApi.changeEbsState(this.ebs_head.odpe_id,'project',state,this.$config.EBS_PROJECT_AUDIT,this.ebs_path).then((result)=>{
					if(result.code == 0){
						if(state == 1){
							this.$message({
									  message: '发布成功!',
									  type: 'success'
									});
						}else{
							this.$message({
									  message: '撤销成功!',
									  type: 'success'
									});
						}
					}else{
						this.$message({
								  message: result.msg,
								  type: 'error'
								});
					}
					this.getOrderProjectEbsList();
					this.$emit('aftersave');
				})
			},
			
			async logoutMessage (){
				let pd = true;
				for (let i = 0;i < this.message.length;i++){
					await ifsApi.logoutMessage(this.message[i].me_id,2).catch(()=>{this.$message.error({
						          message: '消息失效异常',
						          type: 'error'
						        });
								pd = false;});
					
					if(pd == false)
						break;
				}
				return pd;
			},
			
			//保存检测
			checkSaveData(){
				let msg = '';
				if(this.ebs_head.odpe_dep_id_ebs == 0 || !this.ebs_head.odpe_dep_id_ebs)
					msg += '业务组,';
				if(this.ebs_head.odpe_creator_id_ebs == 0 || !this.ebs_head.odpe_creator_id_ebs)
					msg += '制单人,';
				if(this.ebs_head.odpe_sales_id_ebs == 0 || !this.ebs_head.odpe_sales_id_ebs)
					msg += '业务员,';
				if(!this.ebs_head.odpe_od_date)
					msg += '决算日期,';
				if(this.ebs_head.odpe_cus_id_ebs == 0 || !this.ebs_head.odpe_cus_id_ebs)
					msg += '订单客户,';
				if(this.ebs_head.odpe_collect_id_ebs == 0 || !this.ebs_head.odpe_collect_id_ebs)
					msg += '结算方式,';
				if((this.ebs_head.odpe_price_clause == 0 || !this.ebs_head.odpe_price_clause) && this.ebs_head.odpe_od_type == '外销')
					msg += '价格条款,';
				if(this.ebs_head.odpe_delivery_date_ebs == 0 || !this.ebs_head.odpe_delivery_date_ebs)
					msg += '交货日期,';
				if(this.ebs_head.odepe_qty_ship_ebs == 0 || !this.ebs_head.odepe_qty_ship_ebs)
					msg += '出运数量,';	
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
					
				for(let i = 0;i < this.ebs_line_order.length;i++){
					if((this.ebs_line_order[i].odped_stock_org_id_ebs == 0 || !this.ebs_line_order[i].odped_stock_org_id_ebs
					 || this.ebs_line_order[i].odped_item_id_ebs == 0 || !this.ebs_line_order[i].odped_item_id_ebs) && this.ebs_head.odpe_od_type == '外销'){
						  msg = '库存组织,商品ID';
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
					if((this.ebs_line_product[i].odped_stock_org_id_ebs == 0 || !this.ebs_line_product[i].odped_stock_org_id_ebs
					 || this.ebs_line_product[i].odped_item_id_ebs == 0 || !this.ebs_line_product[i].odped_item_id_ebs)
					 //|| this.ebs_line_product[i].odped_vender_id_ebs == 0 || !this.ebs_line_product[i].odped_vender_id_ebs) 
					 && this.ebs_head.odpe_od_type == '外销'
					 ){
						  msg = '库存组织,商品ID';
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
					if((this.ebs_line_process[i].odped_stock_org_id_ebs == 0 || !this.ebs_line_process[i].odped_stock_org_id_ebs
					 || this.ebs_line_process[i].odped_item_id_ebs == 0 || !this.ebs_line_process[i].odped_item_id_ebs
					 || this.ebs_line_process[i].odped_vender_id_ebs == 0 || !this.ebs_line_process[i].odped_vender_id_ebs
					 || this.ebs_line_process[i].odped_mo_price_ebs == 0 || !this.ebs_line_process[i].odped_mo_price_ebs) && this.ebs_head.odpe_od_type == '外销'){
						  msg = '库存组织,商品ID,供应商,单价';
					  }
					if(this.ebs_line_process[i].odped_mo_type_ebs == 'DIS' 
					&& this.ebs_line_process[i].odped_end_process_price_ebs == 0){
						if(msg.length > 0){
							msg = msg + ',双经销成品单价';
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
				return msg;	
			},
			
			
			addSalesDetail(){
				this.getOrderProjectEbsList(2);
				this.salesDetailModal = true;
			},
			
			addProductDetail(){
				this.getOrderProjectEbsList(2);
				this.productDetailModal = true;
			},
			
			addProcessDetail(){
				this.getOrderProjectEbsList(2);
				this.processDetailModal = true;
			},
			
			delSalesDetail(){
				let checkData = this.$refs.ebs_line_order.getCheckboxRecords();
				if(checkData.length > 0){
					let tmpArr = [];
					for (let i = checkData.length - 1;i >= 0;i--){
						let row = this.$refs.ebs_line_order.getRowIndex(checkData[i]);
						this.ebs_line_order.splice(row,1);
					}
				}else{
					this.$message({
						message: '请选择明细!',
						type: 'warning'
					});
				}
			},
			
			delProductDetail(){
				let checkData = this.$refs.ebs_line_product.getCheckboxRecords();
				if(checkData.length > 0){
					let tmpArr = [];
					for (let i = checkData.length - 1;i >= 0;i--){
						let row = this.$refs.ebs_line_product.getRowIndex(checkData[i]);
						this.ebs_line_product.splice(row,1);
					}
				}else{
					this.$message({
						message: '请选择明细!',
						type: 'warning'
					});
				}
			},
			
			delProcessDetail(){
				let checkData = this.$refs.ebs_line_process.getCheckboxRecords();
				if(checkData.length > 0){
					let tmpArr = [];
					for (let i = checkData.length - 1;i >= 0;i--){
						let row = this.$refs.ebs_line_process.getRowIndex(checkData[i]);
						this.ebs_line_process.splice(row,1);
					}
				}else{
					this.$message({
						message: '请选择明细!',
						type: 'warning'
					});
				}
			},
			
			async salesAfterAdd(checkData){
				for (let i = 0;i < checkData.length;i++){
					let detail_data = [];
					for(let j = 0;j < this.budget_line.length;j++){
						if(checkData[i]['odscd_style_no_ebs'] == this.budget_line[j]['oded_style_no_ebs'] &&
							checkData[i]['odscd_style_no_en_ebs'] == this.budget_line[j]['oded_style_no_en_ebs'] &&
							(checkData[i]['odscd_specs_ebs']).trim() == (this.budget_line[j]['oded_specs_ebs']).trim() &&
							parseFloat(checkData[i]['odscd_price_ebs']).toFixed(2) == parseFloat(this.budget_line[j]['oded_price_ebs']).toFixed(2) &&
							this.budget_line[j]['oded_line_type_code_ebs'] == 'ORDER'){
								detail_data = this.budget_line[j];
						}
					}
					this.ebs_line_order.push({
						'odped_odpe_id'       :this.ebs_head.odpe_id,
						'odped_style_id'      : checkData[i]['odscd_style_id'],
						'odped_bom_id'        : checkData[i]['odscd_bom_id'],
						'odped_vender_id'     : '',
						'odped_vender_name'   : '',
		
						'odped_line_id_ebs'        : '',//预算表行ID-EBS prj_line_id
						'odped_odpe_id_ebs'        : '',//预算表行ID-EBS prj_id
						'odped_project_id_ebs'     : this.budget_head['ode_project_id_ebs'],//项目ID-EBS project_id 决算无
						'odped_project_code_ebs'   : this.budget_head['ode_project_code_ebs'],//项目号-EBS
						'odped_creator_id_ebs'     : this.budget_head['ode_creator_id_ebs'],//创建人ID-EBS created_by
		
						'odped_line_type_code_ebs' : 'ORDER',//行类型代码 line_type_code
						'odped_stock_org_id_ebs'   : checkData[i]['odscd_stock_org_id_ebs'],//库存组织代码 organization_id
						'odped_stock_org_name_ebs' : checkData[i]['odscd_stock_org_name_ebs'],//库存组织名称 organization_id
						'odped_item_id_ebs'        : checkData[i]['odscd_item_id_ebs'],//商品ID item_id
						'odped_item_name_ebs'      : checkData[i]['odscd_item_name_ebs'],//商品名称 item_name
						'odped_item_name_en_ebs'   : checkData[i]['odscd_item_name_en_ebs'],
						'odped_item_description_ebs': checkData[i]['odscd_item_description_ebs'],//说明 item_description
						'odped_item_description_en_ebs': checkData[i]['odscd_item_description_en_ebs'],
						'odped_style_no_ebs'       : checkData[i]['odscd_style_no_ebs'],//中文款号-EBS item_attribute1
						'odped_style_no_en_ebs'    : checkData[i]['odscd_style_no_en_ebs'],//英文款号-EBS item_attribute6
						'odped_specs_ebs'          : checkData[i]['odscd_specs_ebs'],//中文规格-EBS item_attribute2
						'odped_specs_en_ebs'       : checkData[i]['odscd_specs_en_ebs'],//中文规格-EBS item_attribute7
						'odped_line_memo_ebs'      : checkData[i]['odscd_line_memo_ebs'],//行备注-EBS description
		
						'odped_qty_ebs'            : checkData[i]['odscd_qty_ebs'],//数量-EBS quantity
						'odped_unit_code_ebs'      : checkData[i]['odscd_unit_code_ebs'],//数量单位编码-EBS uom_code
						'odped_unit'               : checkData[i]['odscd_unit'],//数量单位编码-EBS uom_code
						'odped_currency_ebs'       : checkData[i]['odsc_currency'],//币种代码 currency_code
						'odped_ex_rate_ebs'        : checkData[i]['odsc_exchange_rate'],//汇率 exchange_rate
						'odped_price_ebs'          : checkData[i]['odscd_price_ebs'],//原币单价 unit_price
						'odped_amount_ebs'         : (checkData[i]['odscd_qty_ebs'] * checkData[i]['odscd_price_ebs']).toFixed(2),//金额 amount
						'odped_tax_rate_code'      : checkData[i]['odscd_tax_rate'],//加工必填 税率 tax_code
						'odped_tax_rebate_rate_ebs': checkData[i]['odscd_tax_rate_code'],//加工必填 退税率 rebate_rate
		
						'odped_mo_type_ebs'        : '',//加工必填 加工类型 order_type
						'odped_mo_price_ebs'       : '',//加工单价 prd_unit_price
						'odped_loss_rate_ebs'      : '',//损耗 attribute5
						'odped_vender_id_ebs'      : '',//加工必填 供应商ID vendor_id
						'odped_sales_type_ebs'     : '',//转开类型 attribute7
						'odped_end_process_price_ebs': detail_data.length > 0 ? detail_data['oded_end_process_price_ebs'] : checkData[i]['odscd_price_ebs'],//成品单价 mfg_unit_price
		
						'odped_price_pr_ebs'             : detail_data['oded_price_ebs'],//预算单价-EBS unit_price_pr
						'odped_qty_pr_ebs'               : detail_data['oded_qty_ebs'],//预算数量-EBS quantity_pr
						'odped_amount_pr_ebs'            : (detail_data['oded_price_ebs'] * detail_data['oded_qty_ebs']).toFixed(2),//预算金额-EBS amount_pr
						'odped_ex_rate_pr_ebs'           : detail_data['oded_ex_rate_ebs'],//预算汇率-EBS exchange_rate_pr
						'odped_end_process_price_pr_ebs' : detail_data['oded_end_process_price_ebs'],//预算成品单价-EBS mfg_unit_price_pr
						'odped_mo_price_pr_ebs'          : detail_data['oded_mo_price_ebs'],//预算加工费单价-EBS prd_unit_price_pr
					})
				}
				this.$message({
					message: '添加完成!',
					type: 'success'
				});
				this.salesDetailModal = false;
			},
			
			async productAfterAdd(checkData){
				let data_type = checkData[0]['type'] ? checkData[0]['type'] : 2;
				let odped_style_id             = '';
				let odped_bom_id               = '';
				let odped_vender_id            = '';
				let odped_vender_name          = '';
				
				let odped_stock_org_id_ebs     = '';
				let odped_stock_org_name_ebs   = '';
				let odped_item_id_ebs          = '';
				let odped_item_name_ebs        = '';
				let odped_item_name_en_ebs     = '';
				let odped_item_description_ebs = '';
				let odped_item_description_en_ebs= '';
				let odped_style_no_ebs         = '';
				let odped_style_no_en_ebs      = '';
				let odped_specs_ebs            = '';
				let odped_specs_en_ebs         = '';
				let odped_line_memo_ebs        = '';
				
				let odped_qty_ebs              = '';
				let odped_unit_code_ebs        = '';
				let odped_unit                 = '';
				let odped_currency_ebs         = '';
				let odped_ex_rate_ebs          = '';
				let odped_price_ebs            = '';
				let odped_amount_ebs           = '';
				let odped_tax_rate_code        = '';
				let odped_tax_rate_ebs         = '';
				let odped_tax_rebate_rate_ebs  = '';
				
				let item_id = '';
				let item_name = '';
				let item_name_en = '';
				let item_description_ebs = '';
				
				for (let i = 0;i < checkData.length;i++){
					let detail_data = [];
					for(let j = 0;j < this.budget_line.length;j++){
						 if((checkData[i]['odpcd_style_no_ebs'] == this.budget_line[j]['oded_style_no_ebs'] &&
							checkData[i]['odpcd_style_no_en_ebs'] == this.budget_line[j]['oded_style_no_en_ebs'] &&
							(checkData[i]['odpc_supply_title_name']).trim() == (this.budget_line[j]['oded_vender_name']).trim() &&
								//parseFloat(checkData[i]['odpcd_price_ebs']).toFixed(2) == parseFloat(this.budget_line[j]['oded_price_ebs']).toFixed(2) &&
								this.budget_line[j]['oded_line_type_code_ebs'] == 'MATERIAL' &&
								data_type == 1) || 
								(checkData[i]['odg_item_no'] == this.budget_line[j]['oded_style_no_ebs'] &&
							checkData[i]['odg_item_no'] == this.budget_line[j]['oded_style_no_en_ebs'] &&
							checkData[i]['odgb_name']+' '+checkData[i]['odgb_spec'] == this.budget_line[j]['oded_specs_ebs'] &&
								//parseFloat(checkData[i]['odpcd_price_ebs']).toFixed(2) == parseFloat(this.budget_line[j]['oded_price_ebs']).toFixed(2) &&
								this.budget_line[j]['oded_line_type_code_ebs'] == 'MATERIAL' &&
								data_type == 2)){
							detail_data = this.budget_line[j];
							item_id = detail_data['oded_item_id_ebs'];
							item_name = detail_data['oded_item_name_ebs'];
							item_name_en = detail_data['oded_item_name_en_ebs'];
							item_description_ebs = detail_data['oded_item_description_ebs'];
						}
					}
					//分支
					//1采购合同明细生成、2采购通知明细生成；
					switch (data_type){
						case 1 :
							odped_style_id             = checkData[i]['odpcd_style_id'];
							odped_bom_id               = checkData[i]['odpcd_bom_id'];
							odped_vender_id            = checkData[i]['odpc_supply_title_id'];
							odped_vender_name          = checkData[i]['odpc_supply_title_name'];
		
							odped_stock_org_id_ebs     = checkData[i]['odpcd_stock_org_id_ebs'];
							odped_stock_org_name_ebs   = checkData[i]['odpcd_stock_org_name_ebs'];
							odped_item_id_ebs          = checkData[i]['odpcd_item_id_ebs'];
							odped_item_name_ebs        = checkData[i]['odpcd_item_name_ebs'];
							odped_item_name_en_ebs     = checkData[i]['odpcd_item_name_en_ebs'];
							odped_item_description_ebs = checkData[i]['odpcd_item_description_ebs'];
							odped_item_description_en_ebs= checkData[i]['odpcd_item_description_en_ebs'];
							odped_style_no_ebs         = checkData[i]['odpcd_style_no_ebs'];
							odped_style_no_en_ebs      = checkData[i]['odpcd_style_no_en_ebs'];
							odped_specs_ebs            = checkData[i]['odpcd_specs_ebs'];
							odped_specs_en_ebs         = checkData[i]['odpcd_specs_en_ebs'];
							odped_line_memo_ebs        = checkData[i]['odpcd_line_memo_ebs'];
		
							odped_qty_ebs              = checkData[i]['odpcd_qty_ebs'];
							odped_unit_code_ebs        = checkData[i]['odpcd_unit_code_ebs'];
							odped_unit                 = checkData[i]['odpcd_unit'];
							odped_currency_ebs         = checkData[i]['odpcd_currency_ebs'];
							odped_ex_rate_ebs          = checkData[i]['odpcd_ex_rate_ebs'];
							odped_price_ebs            = checkData[i]['odpcd_price_ebs'];
							odped_amount_ebs           = parseFloat(checkData[i]['odpcd_qty_ebs'] * checkData[i]['odpcd_price_ebs']).toFixed(4);
							odped_tax_rate_code        = checkData[i]['odpcd_tax_rate_code'];
							odped_tax_rate_ebs         = checkData[i]['odpcd_tax_rate_ebs'] ? checkData[i]['odpcd_tax_rate_ebs'] : 13;
							odped_tax_rebate_rate_ebs  = checkData[i]['odpcd_tax_rebate_rate_ebs'] > 0
								?  checkData[i]['odpcd_tax_rebate_rate_ebs'] : checkData[i]['odpcd_tax_rate_ebs'];
							break;
						case 2 :
							odped_style_id             = checkData[i]['odg_id'];
							odped_bom_id               = checkData[i]['odgb_id'];
							odped_vender_id            = checkData[i]['pun_ven_id'];
							odped_vender_name          = checkData[i]['pun_ven_name'];
		
							odped_stock_org_id_ebs     = this.ebs_line_product.length > 0 ? this.ebs_line_product[this.ebs_line_product.length-1]['odped_stock_org_id_ebs'] : '';
							odped_stock_org_name_ebs   = this.ebs_line_product.length > 0 ? this.ebs_line_product[this.ebs_line_product.length-1]['odped_stock_org_name_ebs'] : '';
							odped_item_id_ebs          = item_id;
							odped_item_name_ebs        = item_name;
							odped_item_name_en_ebs     = item_name_en;
							odped_item_description_ebs = item_description_ebs;
							odped_item_description_en_ebs= '';
							odped_style_no_ebs         = checkData[i]['odg_item_no'];
							odped_style_no_en_ebs      = checkData[i]['odg_item_no'];
							odped_specs_ebs            = checkData[i]['odgb_name']+' '+checkData[i]['odgb_spec'];
							odped_specs_en_ebs         = checkData[i]['odgb_name_en']+' '+checkData[i]['odgb_spec'];
							odped_line_memo_ebs        = checkData[i]['odgb_memo'];
		
							odped_qty_ebs              = checkData[i]['qty'];
							odped_unit_code_ebs        = this.TY_JLDW[checkData[i]['odgb_unit_rq']]['ebs_code'] ? this.TY_JLDW[checkData[i]['odgb_unit_rq']]['ebs_code'] :'PCS';
							odped_unit                 = checkData[i]['odgb_unit_rq'] ? checkData[i]['odgb_unit_rq'] :'件';
							odped_currency_ebs         = checkData[i]['pun_currency'];
							odped_ex_rate_ebs          = checkData[i]['pun_ex_rate'];
							odped_price_ebs            = checkData[i]['punb_price_unit_r'];
							odped_amount_ebs           = parseFloat(checkData[i]['qty'] * checkData[i]['punb_price_unit_r']).toFixed(4);
							odped_tax_rate_code        = 'VAT13';
							odped_tax_rate_ebs         = 13;
							odped_tax_rebate_rate_ebs  = 13;
							break;
					}
					
					this.ebs_line_product.push({
						'odped_odpe_id'        : this.ebs_head.odpe_id,
						'odped_style_id'       : odped_style_id,
						'odped_bom_id'         : odped_bom_id,
						'odped_vender_id'      : odped_vender_id,
						'odped_vender_name'    : odped_vender_name,
		
						'odped_line_id_ebs'        : '',//预算表行ID-EBS prj_line_id
						'odped_odpe_id_ebs'        : '',//预算表行ID-EBS prj_id
						'odped_project_id_ebs'     : this.budget_head['ode_project_id_ebs'],//项目ID-EBS project_id
						'odped_project_code_ebs'   : this.budget_head['ode_project_code_ebs'],//项目号-EBS
						'odped_creator_id_ebs'     : this.budget_head['ode_creator_id_ebs'],//创建人ID-EBS created_by
		
						'odped_line_type_code_ebs' : 'MATERIAL',//行类型代码 line_type_code
						'odped_stock_org_id_ebs'   : odped_stock_org_id_ebs,//库存组织代码
						'odped_stock_org_name_ebs' : odped_stock_org_name_ebs,//库存组织名称 organization_id
						'odped_item_id_ebs'        : odped_item_id_ebs,//商品ID item_id
						'odped_item_name_ebs'      : odped_item_name_ebs,//商品名称 item_name
						'odped_item_name_en_ebs'   : odped_item_name_en_ebs,
						'odped_item_description_ebs': odped_item_description_ebs,//说明 item_description
						'odped_item_description_en_ebs': odped_item_description_en_ebs,
						'odped_style_no_ebs'       : odped_style_no_ebs,//中文款号-EBS item_attribute1
						'odped_style_no_en_ebs'    : odped_style_no_en_ebs,//英文款号-EBS item_attribute6
						'odped_specs_ebs'          : odped_specs_ebs,//中文规格-EBS item_attribute2
						'odped_specs_en_ebs'       : odped_specs_en_ebs,//中文规格-EBS item_attribute7
						'odped_line_memo_ebs'      : odped_line_memo_ebs,//行备注-EBS description
		
						'odped_qty_ebs'            : odped_qty_ebs,//数量-EBS quantity
						'odped_unit_code_ebs'      : odped_unit_code_ebs,//数量单位编码-EBS uom_code
						'odped_unit'               : odped_unit,//数量单位编码-EBS uom_code
						'odped_currency_ebs'       : odped_currency_ebs,//币种代码 currency_code
						'odped_ex_rate_ebs'        : odped_ex_rate_ebs,//汇率 attribute3
						'odped_price_ebs'          : odped_price_ebs,//原币单价 unit_price
						'odped_amount_ebs'         : odped_amount_ebs,//金额 amount
						'odped_tax_rate_code'      : odped_tax_rate_code,//加工必填 税率 tax_code
						'odped_tax_rate_ebs'       : odped_tax_rate_ebs,
						'odped_tax_rebate_rate_ebs': odped_tax_rebate_rate_ebs,//加工必填 退税率 attribute6
		
						'odped_mo_type_ebs'        : '',//加工必填 加工类型 order_type DIS P_AGENCY
						'odped_mo_price_ebs'       : 0,//加工单价 prd_unit_price
						'odped_loss_rate_ebs'      : 0,//损耗 attribute5
						'odped_vender_id_ebs'      : detail_data['oded_vender_id_ebs'],//加工必填 供应商ID attribute4
						'odped_sales_type_ebs'     : detail_data['oded_sales_type_ebs'],//转开类型 attribute7
						'odped_end_process_price_ebs': detail_data['oded_end_process_price_ebs'],//成品单价 mfg_unit_price
		
						'odped_price_pr_ebs'             : detail_data['oded_price_ebs'],//预算单价-EBS unit_price_pr
						'odped_qty_pr_ebs'               : detail_data['oded_qty_ebs'],//预算数量-EBS quantity_pr
						'odped_amount_pr_ebs'            : (detail_data['oded_price_ebs'] * detail_data['oded_qty_ebs']).toFixed(2),//预算金额-EBS amount_pr
						'odped_ex_rate_pr_ebs'           : detail_data['oded_ex_rate_ebs'],//预算汇率-EBS exchange_rate_pr
						'odped_end_process_price_pr_ebs' : detail_data['oded_end_process_price_ebs'],//预算成品单价-EBS mfg_unit_price_pr
						'odped_mo_price_pr_ebs'          : detail_data['oded_mo_price_ebs'],//预算加工费单价-EBS prd_unit_price_pr
					})
				}
				this.$message({
					message: '添加完成!',
					type: 'success'
				});
				this.productDetailModal = false;
			},
			
			async processAfterAdd(checkData){
				for (let i = 0;i < checkData.length;i++){
					let detail_data = [];
					for(let j = 0;j < this.budget_line.length;j++){
						 if(checkData[i]['odmcd_style_no_ebs'] == this.budget_line[j]['oded_style_no_ebs'] &&
							 checkData[i]['odmcd_style_no_en_ebs'] == this.budget_line[j]['oded_style_no_en_ebs'] &&
							 (checkData[i]['odmc_supply_title_name']) == (this.budget_line[j]['oded_vender_name']) &&
								 //parseFloat(checkData[i]['odmcd_price_ebs']).toFixed(2) == parseFloat(this.budget_line[j]['oded_price_ebs']).toFixed(2) &&
								 this.budget_line[j]['oded_line_type_code_ebs'] == 'MO'){
							 detail_data = this.budget_line[j];
						 }
					}
					this.ebs_line_process.push({
						'odped_odpe_id'            : this.ebs_head.odpe_id,
						'odped_style_id'           : checkData[i]['odmcd_style_id'],
						'odped_bom_id'             : checkData[i]['odmcd_bom_id'],
						'odped_vender_id'          : checkData[i]['odmc_supply_title_id'],
						'odped_vender_name'        : checkData[i]['odmc_supply_title_name'],
		
						'odped_line_id_ebs'        : '',//预算表行ID-EBS prj_line_id
						'odped_odpe_id_ebs'        : '',//预算表行ID-EBS prj_id
						'odped_project_id_ebs'     : this.budget_head['ode_project_id_ebs'],//项目ID-EBS project_id
						'odped_project_code_ebs'   : this.budget_head['ode_project_code_ebs'],//项目号-EBS
						'odped_creator_id_ebs'     : this.budget_head['ode_creator_id_ebs'],//创建人ID-EBS created_by
		
						'odped_line_type_code_ebs' : 'MO',//行类型代码 line_type_code
						'odped_stock_org_id_ebs'   : checkData[i]['odmcd_stock_org_id_ebs'],//库存组织代码
						'odped_stock_org_name_ebs' : checkData[i]['odmcd_stock_org_name_ebs'],//库存组织名称 organization_id
						'odped_item_id_ebs'        : checkData[i]['odmcd_item_id_ebs'],//商品ID item_id 105756
						'odped_item_name_ebs'      : checkData[i]['odmcd_item_name_ebs'],//商品名称 item_name '加工费（元）'
						'odped_item_name_en_ebs'   : checkData[i]['odmcd_item_name_en_ebs'],
						'odped_item_description_ebs': checkData[i]['odmcd_item_description_ebs'],//说明 item_description
						'odped_item_description_en_ebs':checkData[i]['odmcd_item_description_en_ebs'],
						'odped_style_no_ebs'       : checkData[i]['odmcd_style_no_ebs'],//中文款号-EBS item_attribute1
						'odped_style_no_en_ebs'    : checkData[i]['odmcd_style_no_en_ebs'],//英文款号-EBS item_attribute6
						'odped_specs_ebs'          : checkData[i]['odmcd_specs_ebs'],//中文规格-EBS item_attribute2
						'odped_specs_en_ebs'       : checkData[i]['odmcd_specs_en_ebs'],//英文规格-EBS item_attribute7
						'odped_line_memo_ebs'      : checkData[i]['odmcd_line_memo_ebs'],//行备注-EBS description
		
						'odped_qty_ebs'            : checkData[i]['odmcd_qty_ebs'],//数量-EBS quantity
						'odped_unit_code_ebs'      : checkData[i]['odmcd_unit_code_ebs'],//数量单位编码-EBS uom_code
						'odped_unit'               : checkData[i]['odmcd_unit'],//数量单位编码-EBS uom_code
						'odped_currency_ebs'       : checkData[i]['odmcd_currency_ebs'],//币种代码 currency_code
						'odped_ex_rate_ebs'        : checkData[i]['odmcd_ex_rate_ebs'],//汇率 attribute3
						'odped_price_ebs'          : 0,//checkData[i]['odmcd_price_ebs'],//原币单价 unit_price
						'odped_amount_ebs'         :(checkData[i]['odmcd_qty_ebs'] * checkData[i]['odmcd_price_ebs']).toFixed(2),//金额 amount
						'odped_tax_rate_code'      : checkData[i]['odmcd_tax_rate_code'],//加工必填 税率 tax_code
						'odped_tax_rate_ebs'	   : checkData[i]['odmcd_tax_rate_ebs'] > 0 ? checkData[i]['odmcd_tax_rate_ebs'] : 13,
						'odped_tax_rebate_rate_ebs': checkData[i]['odmcd_tax_rebate_rate_ebs'] > 0 ? checkData[i]['odmcd_tax_rebate_rate_ebs'] : 13,//加工必填 退税率 attribute6
		
						'odped_mo_type_ebs'        : checkData[i]['odmc_order_type_code_ebs'],//加工必填 加工类型 order_type DIS P_AGENCY
						'odped_mo_price_ebs'       : checkData[i]['odmcd_price_ebs'],//加工单价 prd_unit_price
						'odped_loss_rate_ebs'      : checkData[i]['oded_loss_rate_ebs'],//损耗 attribute5
						'odped_vender_id_ebs'      : checkData[i]['odmc_cus_id_ebs'],//加工必填 供应商ID attribute4
						'odped_sales_type_ebs'     : checkData[i]['oded_sales_type_ebs'],//转开类型 attribute7
						'odped_end_process_price_ebs': checkData[i]['odmcd_end_process_price_ebs'],//成品单价 mfg_unit_price
		
						'odped_price_pr_ebs'             : detail_data['oded_price_ebs'],//预算单价-EBS unit_price_pr
						'odped_qty_pr_ebs'               : detail_data['oded_qty_ebs'],//预算数量-EBS quantity_pr
						'odped_amount_pr_ebs'            : (detail_data['oded_price_ebs'] * detail_data['oded_qty_ebs']).toFixed(2),//预算金额-EBS amount_pr
						'odped_ex_rate_pr_ebs'           : detail_data['oded_ex_rate_ebs'],//预算汇率-EBS exchange_rate_pr
						'odped_end_process_price_pr_ebs' : detail_data['oded_end_process_price_ebs'],//预算成品单价-EBS mfg_unit_price_pr
						'odped_mo_price_pr_ebs'          : detail_data['oded_mo_price_ebs'],//预算加工费单价-EBS prd_unit_price_pr
					})
				}
				this.$message({
					message: '添加完成!',
					type: 'success'
				});
				this.processDetailModal = false;
			},
			 
			
			changeMoTypeEbs(row){
				if(row.odped_mo_type_ebs == 'P_AGENCY'){
					row.odped_item_id_ebs = 105756;
					row.odped_item_name_ebs = '加工费（元）';
				}else{
					// row.odped_item_id_ebs = '';
					// row.odped_item_name_ebs = '';
				}
			},
			
			filterMethod ({ option, row, column }) {
				if(row.odped_style_no_ebs && column.property == 'odped_style_no_ebs')
					return row.odped_style_no_ebs.includes(option.data);
				else if(row.odped_item_id_ebs && column.property == 'odped_item_id_ebs')
					return row.odped_item_description_ebs.includes(option.data);
				else if(row.odped_specs_ebs && column.property == 'odped_specs_ebs')
					return row.odped_specs_ebs.includes(option.data);
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
				console.log(data);
				let checkData = '';
				if(this.setTable == 'ebs_line_order')
					checkData = this.$refs.ebs_line_order.getCheckboxRecords();
				else if(this.setTable == 'ebs_line_product')
					checkData = this.$refs.ebs_line_product.getCheckboxRecords();
				else if(this.setTable == 'ebs_line_process')
					checkData = this.$refs.ebs_line_process.getCheckboxRecords();
				for (let i = 0;i < checkData.length;i++){
					if(data.style_no_ebs != '')
						checkData[i].odped_style_no_ebs = data.style_no_ebs;
					if(data.style_no_en_ebs != '')
						checkData[i].odped_style_no_en_ebs = data.style_no_en_ebs;
					if(data.stock_org_id_ebs != '')
						checkData[i].odped_stock_org_id_ebs = data.stock_org_id_ebs;
					if(data.stock_org_name_ebs != '')
						checkData[i].odped_stock_org_name_ebs = data.stock_org_name_ebs;
					if(data.item_id_ebs != '')
						checkData[i].odped_item_id_ebs = data.item_id_ebs;
					if(data.item_name_ebs != '')
						checkData[i].odped_item_name_ebs = data.item_name_ebs;
					if(data.item_description_ebs != '')
						checkData[i].odped_item_description_ebs = data.item_description_ebs;
					if(data.specs_ebs != '')
						checkData[i].odped_specs_ebs = data.specs_ebs;
					if(data.vender_id_ebs != '')
						checkData[i].odped_vender_id_ebs = data.vender_id_ebs;
					if(data.vender_name_ebs != '')
						checkData[i].odped_vender_name = data.vender_name_ebs;
					if(data.unit_code_ebs != ''){
						checkData[i].odped_unit_code_ebs = data.unit_code_ebs;
						checkData[i].odped_unit = this.unitObj[data.unit_code_ebs]['unit_of_measure_tl'];
						checkData[i].unit_type = data.unit_type;
					}
						
					if(data.currency_ebs != ''){
						checkData[i].odped_currency_ebs = data.currency_ebs;
						checkData[i].odped_ex_rate_ebs = this.rateData[data.currency_ebs];
					}	
				}
			},
			
			changeUnit(row){
				row.odped_unit =  this.unitObj[row.odped_unit_code_ebs]['unit_of_measure_tl'];
			},
			
			editShipData(flag){
				if(flag == 1){
					ebsApi.getEbsData('project_ship_init',this.ebs_head.odpe_id_ebs).then((result)=>{
						this.getProjectShip();
					})
				}else if(flag == 2){
					ebsApi.getEbsData('delete_project_shipapp',this.ebs_head.odpe_id_ebs).then((result)=>{
						this.getProjectShip();
					})
				}
				
			},
			print_project(){
				window.open(`/#/ebs_final_accountting_print?id=${this.ebs_head.odpe_id}`);
			},
			
			changeCurrency(row){
				row.odped_ex_rate_ebs = this.rateData[row.odped_currency_ebs];
			},
			
			remoteGoodsMethod(query) {
				if (query !== '') {
				  this.loading = true;
				  setTimeout(() => {
					this.loading = false;
					this.goodsOptions = this.goodsDataList.filter(item => {
					  return (item.description+item.segment1).toLowerCase()
						.indexOf(query.toLowerCase()) > -1;
					});
				  }, 200);
				} else {
				  this.goodsOptions = [];
				}
		   },
		   
		   async updateAudit(){
		   	ebsApi.changeEbsStateAprv(this.ebs_head.odpe_id,'project',1,this.$config.EBS_ORDER_AUDIT,this.ebs_path);
		   	this.$message({
		   			  message: '已同步!',
		   			  type: 'success'
		   			});
		   },
		}
	}
</script>