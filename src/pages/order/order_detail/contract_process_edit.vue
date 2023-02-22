<style scoped lang="scss">
.contract-main {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    >>> .w-e-text-container {
        height: 280px !important;
    }
    .contract-clause {
        border: 1px solid #ddd;
        height: 400px;
        overflow: auto;
        p {
            padding: 0 5px;
            line-height: 28px;
        }
    }
}
</style>
<template>
	<vxe-modal ref="modal1" :value="show" :showFooter="true" width="1040" height="600" resize remember :mask-closable="false">
		<template v-slot:header>
            <span class="vxe-modal--title">{{contract_id==null?'加工合同-新建':'加工合同-编辑'}}</span>
            <div class="model-header-r">
                <div v-if="(contract_id!=null)"> ID:{{contract_id}}</div>
            </div>
            <i title="最大化" class="vxe-modal--zoom-btn trigger--btn vxe-icon--square" v-show="downIcon" @click="trigger_btn"></i>
			<i title="还原" class="vxe-modal--zoom-btn trigger--btn vxe-icon--zoomout" v-show="!downIcon" @click="trigger_btn"></i>
			<i title="关闭" class="vxe-modal--close-btn trigger--btn vxe-icon--close" @click="() => close()" ></i>
        </template>
		<div class="tabs">
            <div class="tabs-col" :class="{ show: selectTab == 0 }" @click="selectTab = 0">基本信息</div>
            <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectTab = 1">合同明细</div>
            <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectTab = 2">合同条款</div>
            <div class="tabs-col" :class="{ show: selectTab == 3 }" @click="selectTab = 3">其他条款</div>
        </div>
		<div v-show="selectTab == 0">
			<div class="class-title" style="margin-top:10px">
			    <div class="title">基本信息</div>
			</div>
			<div style="margin: 0 10px;">
				<el-row :gutter="0">
					<el-col :span="12">
						<table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
							<tbody>
								<tr>
									<th width="100" align="left"><span style="color: red;">*</span>业务部门</th>
									<td>
										 <el-select ref="depSelect2" v-model="base_info.contract_dep_name" placeholder="请选择部门" size="small" clearable @clear="clearDep">
											<el-tree ref="listTree" :data="selectOptions.dep" :props="defaultProps" node-key="dep_id" @node-click="depClick"></el-tree>
											<el-option v-for="item in selectOptions.dep" :key="item.value" :value="item.value" :label="item.title" style="display: none;"></el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<th align="left"><span style="color: red;">*</span>业务员</th>
									<td>
										<el-select v-model="base_info.contract_salesman_name" size="small" clearable placeholder="请选择" @change="changeSales">
											<el-option v-for="item in selectOptions.sales" v-show="item.dep_id == base_info.contract_dep_id" :key="item.staff_id" :label="item.staff_name" :value="item.staff_name"></el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<th align="left"><span style="color: red;">*</span>合同类型</th>
									<td>
										<el-select v-model="base_info.contract_type" style="width: 100%;" clearable @change="changeContractType">
											<el-option v-for="item in selectOptions.productType" 
													   :key="item.lookup_code" 
													   :value="item.lookup_code" 
													   :label="item.meaning">
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<th align="left"><span style="color: red;">*</span>合同日期</th>
									<td>
										<el-date-picker  value-format="yyyy-MM-dd" type="date" v-model="base_info.contract_date"
											placeholder="选择日期" size="small" clearable>
										</el-date-picker>
									</td>
								</tr>
								<tr>
									<th width="100" align="left"><span style="color: red;">*</span>接单抬头</th>
									<td>
										<el-select v-model="base_info.contract_title_name" size="small" clearable @change="changeTitle" placeholder="请选择" :disabled="true">
											<el-option v-for="item in selectOptions.allTitle" :key="item.title_id" :label="item.title" :value="item.title_id"></el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<th width="100" align="left"><span style="color: red;">*</span>币种</th>
									<td>
										 <el-select v-model="base_info.contract_currency" placeholder="请选择" size="small" clearable @change="changeBZ" >
											<el-option v-for="item in selectOptions.BZ" :key="item.dic_name" :label="item.dic_name" :value="item.dic_name"></el-option>
										</el-select>
									</td>
								</tr>
								<tr>
                                    <th align="left">汇率</th>
                                    <td>
                                        <el-input v-model="base_info.contract_ex_rate" clearable :disabled="true"></el-input>
                                    </td>
                                </tr>
								<!-- <tr>
									<th align="left">合同模板</th>
									<td>
										<el-select v-model="base_info.contract_mould_name" style="width: 100%;" clearable @change="changeContractMould">
											<el-option v-for="item in contract_mould_list" 
													:key="item.value"
													:label="item.label"
													:value="item.value">
											</el-option>
										</el-select>
									</td>
								</tr> -->
								<tr>
									<th align="left">签订地</th>
									<td >
										<el-input v-model="base_info.contract_sign_place" placeholder="请输入" clearable></el-input>
									</td>
								</tr>
							</tbody>		
						</table>
					</el-col>
					<el-col :span="12">
						<table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
							<tbody>
								<tr>
									<th width="100" align="left"><span style="color: red;">*</span>供应商</th>
									<td >
										<el-select v-model="base_info.contract_supply_title_name" placeholder="请输入关键词选择" size="small" clearable filterable remote :remote-method="remoteMethod2" @change="changeVender" @clear="clearVender">
											<el-option v-for="item in venOptions" :key="item.trader_id" :value="item.trader_name" :label="item.trader_name"></el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<th width="100" align="left"><span style="color: red;">*</span>实际供应商</th>
									<td >
										<el-select v-model="base_info.contract_actual_supply_title_name" placeholder="请输入关键词选择" size="small" clearable filterable remote :remote-method="remoteMethod2" @change="changeRealVender" @clear="clearActualVender">
											<el-option v-for="item in venOptions" :key="item.trader_id" :value="item.trader_name" :label="item.trader_name"></el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<th width="100" align="left">地址</th>
									<td >
										<el-input v-model="base_info.contract_actual_supply_address" placeholder="请输入" clearable></el-input>
									</td>
								</tr>
								<tr>
									<th width="100" align="left">开户行</th>
									<td >
										<el-input v-model="base_info.contract_actual_supply_contract_info.b_bank_name" placeholder="请输入" clearable></el-input>
									</td>
								</tr>
								<tr>
									<th align="left">账号</th>
									<td >
										<el-input v-model="base_info.contract_actual_supply_contract_info.b_bank_account_num" placeholder="请输入" clearable></el-input>
									</td>
								</tr>
								<tr>
									<th width="100" align="left">法定代理人</th>
									<td >
										<el-input v-model="base_info.contract_actual_supply_contract_info.b_legal_person_b" placeholder="请输入" clearable></el-input>
									</td>
								</tr>
								<tr>
									<th width="100" align="left">委托代理人</th>
									<td >
										<el-input v-model="base_info.contract_actual_supply_contract_info.b_legal_person_e" placeholder="请输入" clearable></el-input>
									</td>
								</tr>
								<tr>
									<th align="left">电话</th>
									<td >
										<el-input v-model="base_info.contract_actual_supply_tel" placeholder="请输入" clearable></el-input>
									</td>
								</tr>
								<tr>
                                    <th align="left">溢装(%)</th>
                                    <td>
                                        <el-input clearable v-model="base_info.contract_over_rate" placeholder="请输入"></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="left">短装(%)</th>
                                    <td>
                                        <el-input clearable v-model="base_info.contract_short_rate" placeholder="请输入"></el-input>
                                    </td>
                                </tr>
								
							</tbody>		
						</table>
					</el-col>
				</el-row>
				
				<!-- <el-row :gutter="0" style="top:-2px">
					<el-col :span="24">
						<table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
							<tbody>
								<tr>
									<th width="100" align="left">合同说明</th>
									<td>
										<el-input v-model="base_info.contract_memo" placeholder="请输入" clearable></el-input>
									</td>
								</tr>
							</tbody>		
						</table>
					</el-col>
				</el-row> -->
			</div>
		</div>
        <div v-show="selectTab == 1">
			<div class="class-title" style="margin-top:10px;padding-right:10px">
			    <div class="title">合同明细</div>
                <div class="m-r" style="margin-top: -5px;">
                    <el-button size="mini" @click="addGoodsInfo()">增行</el-button>
                    <el-button size="mini" @click="delGoodsInfo()">删行</el-button>
                </div>
			</div>
			<div style="margin: 0 10px;">
				<vxe-table ref="goodsTable" border resizable :data="detailInfo" size="small" auto-resize :column-config="{minWidth:130}" class="mytable-scrollbar" 
				highlight-current-row highlight-hover-row show-footer :footer-method="footerMethod" show-overflow :edit-config="{trigger: 'click', mode: 'cell'}" 
				:keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true,editMethod1}" :mouse-config="{selected: true}">
					<!-- <vxe-table-column width="40" align="center" fixed="left">
						<template #default>
							<span class="drag-btn">
								<i class="vxe-icon--menu"></i>
							</span>
						</template>
					</vxe-table-column> -->
					<vxe-table-column type="checkbox" align="center" width="40" fixed="left"></vxe-table-column>
				    <vxe-table-column type="seq" title="序号" width="40" align="center" fixed="left"></vxe-table-column>
					<vxe-table-column field="contract_detail_article_number" title="加工货号" width="100" align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
						<template #edit="{ row }">
							<el-input v-model="row.contract_detail_article_number" size="small" clearable></el-input>
						</template>
					</vxe-table-column>
					<vxe-table-column field="contract_detail_name" title="加工品名" width="100" header-align="center" align="left" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
						<template #edit="{ row }">
							<el-input v-model="row.contract_detail_name" size="small" clearable></el-input>
						</template>
					</vxe-table-column>
					<vxe-table-column field="contract_detail_goods_name_ebs" title="商品名称-EBS" width="120" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                        <template v-slot:edit="{row}">
                            <el-select v-model="row.contract_detail_goods_id_ebs" placeholder="请选择" clearable filterable @change="changeEBSGoods(row)" size="small">
                                <el-option v-for="item in ebsGoods" :key="item.inventory_item_id" :value="item.inventory_item_id" :label="item.description">
                                    <span style="float: left">{{ item.description+'|'+item.segment1 }}</span>
                                    <span style="float: right; color: #8492a6;" >{{ unitObj[item.primary_uom_code]['unit_of_measure_tl'] }}</span>
                                </el-option>
                            </el-select>
                        </template>
                    </vxe-table-column>
					<vxe-table-column field="contract_detail_spec" title="规格" width="100" header-align="center" align="left" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
						<template #edit="{ row }">
							<el-input v-model="row.contract_detail_spec" size="small" clearable></el-input>
						</template>
					</vxe-table-column>
					<vxe-table-column field="contract_detail_qty" title="数量" width="80" header-align="center" align="right" formatter="formatAmount" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
						<template #edit="{ row }">
							<el-input v-model="row.contract_detail_qty" size="small" clearable @change="changeAmount(row)"></el-input>
						</template>
					</vxe-table-column>
					<vxe-table-column field="contract_detail_unit" title="单位" width="50" header-align="center" align="right" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
                        <template #edit="{ row }">
                            <el-select v-model="row.contract_detail_unit" size="small" filterable clearable>
                                <el-option v-for="item in selectOptions.JLDW" v-show="item.symbol==row.uom_class || !row.uom_class" :key="item.dictionary_id" :value="item.dic_name" :label="item.dic_name"></el-option>
                            </el-select>
                        </template>
                    </vxe-table-column>
					<vxe-table-column field="contract_detail_price" title="单价" width="80" header-align="center" align="left" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
						<template #edit="{ row }">
							<el-input v-model="row.contract_detail_price" size="small" clearable @change="changeAmount(row)"></el-input>
						</template>
					</vxe-table-column>
					<vxe-table-column field="contract_detail_tax_rate" title="税率" width="60" header-align="center" align="right" formatter="formatAmount" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
						<template #edit="{ row }">
							<el-input v-model="row.contract_detail_tax_rate" size="small" clearable></el-input>
						</template>
					</vxe-table-column>
					<vxe-table-column field="contract_detail_amount" title="金额"  header-align="center" align="right" formatter="formatAmount" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
						<template #edit="{ row }">
							<el-input v-model="row.contract_detail_amount" size="small" clearable></el-input>
						</template>
					</vxe-table-column>
					<vxe-table-column field="contract_detail_end_process_price" title="成品单价" width="80" header-align="center" align="right" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
						<template #edit="{ row }">
							<el-input v-model="row.contract_detail_end_process_price" size="small" clearable></el-input>
						</template>
					</vxe-table-column>
                    <vxe-table-column field="contract_detail_etd" title="交货日期"  header-align="center" align="left" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
						<template #edit="{ row }">
							<el-date-picker type="date" placeholder="选择日期" style="width: 100%;" size="small" clearable value-format="yyyy-MM-dd" placement="bottom-start" v-model="row.contract_detail_etd" editable></el-date-picker>
						</template>
					</vxe-table-column>
                </vxe-table>
			</div>
           
		</div>
		<div v-show="selectTab == 2">
			<div class="class-title" style="margin-top:10px">
                <div class="title">合同条款</div>
                <div class="m-r" style="margin-top: -5px;padding-right:10px">
                    <el-button size="mini" style="margin-right: 5px;" @click="showClauseEdit">编辑</el-button>
					<el-select size="mini" v-model="TK_order_memo" filterable remote clearable placeholder="复制其他合同条款" 
                    @clear="TK_order_memo=null;" :remote-method="remoteTkMethod" :loading="loading" @change="changeTKOrder">
                        <el-option v-for="item in contractCode" :key="item.odmc_id" :value="item.odmc_id" :label="item.odmc_code_ebs">
                        </el-option>
                    </el-select>
                    <el-select size="mini" placeholder="合同条款选择" v-model="TK_memo" @change="showTK">
                        <el-option v-for="item in TK" :value="item.dictionary_id" :label="item.dic_name">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="contract-main">
                <div class="contract-clause">
                    <div v-for="item in this.clauseList" :key="item.dictionary_id">
                        <p v-html="item.memo"></p>
                    </div>
                </div>
            </div>
			<!-- <div class="class-title" style="margin-top:10px">
			    <div class="title">合同补充信息</div>
			</div>
			<div style="margin: 0 10px;">
				<el-row :gutter="0">
					<el-col :span="24">
						<table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
							<tbody>
								<tr>
									<th width="100" align="left">价格条款</th>
									<td>
										<el-select v-model="base_info.contract_price_clause" filterable size="small" clearable placeholder="请选择">
											<el-option v-for="item in selectOptions.JGTK" :key="item.dic_name" :label="item.dic_name" :value="item.dic_name"></el-option>
										</el-select>
									</td>
									<th width="100" align="left">溢装(%)</th>
									<td>
										<el-input clearable v-model="base_info.contract_over_rate" placeholder="请输入" ></el-input>
									</td>
									<th width="100" align="left">短装(%)</th>
									<td>
										<el-input clearable v-model="base_info.contract_short_rate" placeholder="请输入"></el-input>
									</td>
								</tr>
								<tr>
									<th align="left">运输方式</th>
									<td>
										<el-select v-model="base_info.contract_shipping_mode" size="small" clearable placeholder="请选择">
											<el-option v-for="item in selectOptions.YSFS" :key="item.dic_code" :label="item.dic_name" :value="item.dic_name"></el-option>
										</el-select>
									</td>
									<th align="left">起运港</th>
									<td>
										<el-select v-model="base_info.contract_port_from" size="small" clearable filterable placeholder="请输入关键词选择" remote :remote-method="remotePortFrom">
											<el-option v-for="item in portFromOptions" :key="item.port_code" :label="`${item.port_name_en}-${item.port_name}`" :value="item.port_name_en"></el-option>
										</el-select>
									</td>
									<th align="left">目的港</th>
									<td>
										<el-select v-model="base_info.contract_port_to" size="small" clearable filterable placeholder="请输入关键词选择" remote :remote-method="remotePortTo">
											<el-option v-for="item in portToOptions" :key="item.port_code" :label="`${item.port_name_en}-${item.port_name}`" :value="item.port_name_en"></el-option>
										</el-select>
									</td>
								</tr>
							</tbody>		
						</table>
					</el-col>
				</el-row>
				
			</div> -->
		</div>
		<div v-show="selectTab == 3">
            <div class="class-title" style="margin-top:10px;padding-right:10px;">
			    <div class="title">其他条款</div>
                <div class="m-r" style="margin-top: -5px;" >
                    <el-button size="mini" @click="addPayData()">增行</el-button>
                    <el-button size="mini" @click="delPayData()">删行</el-button>
                </div>
			</div>
			<div style="margin: 0 10px;">
				<vxe-table ref="payTable" border resizable :data="base_info.contract_collect_clause" size="small" auto-resize :column-config="{minWidth:120}"
				    class="mytable-scrollbar" highlight-current-row highlight-hover-row :edit-config="{trigger: 'click', mode: 'cell',}"
					:keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true,editMethod2}" :mouse-config="{selected: true}">
					<vxe-table-column type="checkbox" align="center" width="40" fixed="left"></vxe-table-column>
				    <vxe-table-column field="payment_term_label" title="付款类型" width="140" header-align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
						<template #edit="{row}">
							<el-select style="width: 100%;" v-model="row.payment_term_label" transfer filterable clearable size="small" @change="changePaymentTerm(row)">
								<el-option v-for="item in productPaymetType" :key="item.lookup_code" :value="item.meaning" :label="item.meaning">
								</el-option>
							</el-select>
						</template>
					</vxe-table-column>
					<vxe-table-column field="payment_method_label" title="付款方式" width="140" header-align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
						<template #edit="{row}">
							<el-select v-model="row.payment_method_label" size="small" transfer filterable style="width:100%;" clearable  @change="changePaymentMethod(row)" >
								<el-option v-for="item in productPaymet" :key="item.lookup_code" :value="item.meaning" :label="item.meaning"></el-option>
							</el-select>
						</template>
					</vxe-table-column>
					<vxe-table-column field="percentage" title="比例(%)" width="100" header-align="center" align="right" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
						<template #edit="{ row }">
							<el-input size="small" v-model="row.percentage" type="number"></el-input>
						</template>
					</vxe-table-column>
					<vxe-table-column field="due_days" title="天数" width="100" header-align="center" align="right" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
						<template #edit="{ row }">
							<el-input size="small" v-model="row.due_days" clearable></el-input>
						</template>
					</vxe-table-column>
					<vxe-table-column field="description" title="条款描述" header-align="center" align="right" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
						<template #edit="{ row }">
							<el-input size="small" v-model="row.description" clearable></el-input>
						</template>
					</vxe-table-column>
                </vxe-table>
			</div>
		</div>
		<!-- 合同条款 -->
		<vxe-modal title="合同条款" :value="tkModal" v-show="tkModal" @close="tkModal=false" class-name="vertical-center-modal" height="600px" resize remember :showFooter="true" :mask-closable="false" width="1000">
			<el-row>
				<vxe-table ref="tkListData" :checkbox-config="{'checkAll':true}" border resizable highlight-cell :data="tkList" class="vxe-table-scrollbar" auto-resize :edit-config="{trigger: 'click', mode: 'cell'}">
					<!-- <vxe-table-column type="checkbox" align="center" width="50"></vxe-table-column> -->
					<vxe-table-column type="seq" disabled title="序号" align="center" width="50"></vxe-table-column>
					<vxe-table-column field="memo" title="条款" header-align="center" align="left"  >
						<template v-slot="{row}">
                            <!-- <el-input type="textarea" v-model="row.memo" :autosize="{minRows:2,maxRows:2}" :disabled="row.description == '不可编辑'"></el-input> -->
                            <el-input type="textarea" v-model="row.memo" :autosize="{minRows:2,maxRows:2}"></el-input>
                        </template>
					</vxe-table-column>
				</vxe-table>	
			</el-row>
			<div slot="footer">
				<div class="m-r">
					<el-button size="small" @click="changeTKN">确定</el-button>
				</div>
			</div>
		</vxe-modal>
		<!-- 成本明细 -->
		<bom_detail v-if="bomModal" :show.sync="bomModal" :contractType="contractType" :orderBom="orderBom" :goodsInfo="detailInfo" :order_id="contract_order_id" @getSelectBom="getSelectBom"></bom_detail>
        <div slot="footer">
            <el-button size="small" @click="() => close()">取消</el-button>
            <el-button size="small" v-if="base_info.contract_state_aprv != 2" @click="saveContract">保存</el-button>
			<el-button size="small" v-if="contract_id != null" @click="processPublish">发布</el-button>
            <el-button size="small" v-if="contract_id != null" @click="processPrint">预览</el-button>
        </div>
	</vxe-modal>
</template>

<script>
import ifsApi from '@/api/ifs/index.js'
import ebsApi from '@/api/gbs/ebs.js'
import omApi from "@/api/gbs/om.js";
import purchaseApi from "@/api/cbs/purchase.js";
import projectApi from "@/api/cbs/project.js";
import bom_detail from "@/pages/order/order_detail/bom_detail";

export default {
	components: {
		bom_detail,
	},
	props: {
		show: Boolean,
		contract_id: {
            type: Number,
            default: null,
        },
		contractData:Array,
		goodsInfo:{
			type:Array,
			default:() => {
				return []
			},
		},
		orderData:Object,
		orderBom:Array,
	},
	data() {
		return {
            selectTab:0,
            downIcon: true,
			bomModal:false,
			detailInfo:[],
			base_info: {
                contract_dep_id: null, //业务部门ID
                contract_dep_name: "", //业务部门名称
                contract_salesman_id: null, //业务员ID
                contract_salesman_name: "", // 业务员名称
				contract_type:"",//合同类型
				contract_date:'',//合同日期
                contract_title_id: null, // 接单抬头ID
                contract_title_name: "", //接单抬头名称
				contract_currency: "", //币种
				contract_ex_rate: null, //汇率

				contract_supply_title_id:null,//供应商ID
				contract_supply_title_name:"",//供应商名称
				contract_actual_supply_title_id:null,//实际供应商ID
				contract_actual_supply_title_name:'',//实际供应商名称

				contract_supply_address:'',//地址
				contract_supply_tel:'',//电话
				contract_sign_place: "", //签订地

				contract_actual_supply_address:'',//实际地址
				contract_actual_supply_tel:'',//实际电话
                
				//供应商联系人信息
				contract_supply_contract_info:{
					b_name: "", 
					b_email: "", 
					b_mobile: "", 
					b_bank_name: "", 
					b_legal_person_b: "", 
					b_legal_person_e: "", 
					b_bank_account_num: ""
				},
				//实际供应商联系人信息
				contract_actual_supply_contract_info:{
					b_name: "", 
					b_email: "", 
					b_mobile: "", 
					b_bank_name: "", 
					b_legal_person_b: "", 
					b_legal_person_e: "", 
					b_bank_account_num: ""
				},
				

				contract_memo:"",//合同说明

				//付款方式
				contract_collect_clause: [], 
				contract_clause:'',//合同条款
				contract_price_clause: "", //价格条款
				contract_over_rate:'',//溢装率
				contract_short_rate:'',//短装率
				contract_shipping_mode: "", //运输方式
                contract_port_from: "", //起运港
                contract_port_to: "", //目的港
				
            },
			selectOptions: {
                dep: [], //部门*
                sales: [], //业务员*
                BZ: [], //币种*
                SHFS: [], // 收汇方式/结算方式*
                JGTK: [], // 价格条款*
                YSFS: [], // 运输方式*
                JLDW: [], //计量单位
              
                allTitle: [], // 接单抬头*
                portFrom: [], //起运港*
                portTo: [], //目的港*
             
				vender:[],//供应商
				productType:{}//合同类型
				
            },
			defaultProps: {
                children: "children",
                label: "label",
            },
			defaultProps: {
                children: "children",
                label: "label",
            },
			venOptions: [],
			portFromOptions: [],
            portToOptions: [],
			TK_memo:'',//条款标准
			TK:[],
			TY_JLDW:[],
			tkModal:false,
			tkListData:[],
			tkList: [],
			clauseList: [],
			productPaymetType:[],//付款类型项
			productPaymet:[],//付款方式项
			required: {
                contract_dep_name: "业务部门名称", //业务部门名称
                contract_salesman_name: "业务员名称", // 业务员名称
                contract_title_name: "接单抬头名称", //接单抬头名称
				contract_type:'合同类型',//合同类型
				contract_date:'合同日期',//合同日期
				contract_currency:'币种',//币种
				contract_supply_title_name:'供应商',//供应商
				contract_actual_supply_title_name:'实际供应商',//实际供应商
            },
			
			contract_mould_list:[
				{'value':'01','label':'盛大-工厂-加工合同'},
				{'value':'02','label':'华盛-工厂-带成品单价的加工合同'},
				{'value':'03','label':'华盛-工厂-成品采购合同'},
			],
			
			exchangeList:{},
			contractType:'process',
			editBasicInfo:true,//富文本编辑状态
			trader_id_ebs:'',
			ebs_path:'HS',
			ebsGoods: [],
			goods_stock_org_id_ebs:null,
            goods_stock_org_id_ebs_hk:null,
			unitObj: {},
            contract_order_id:null,
			contractCode:[],
			contractCodeList:[],
			TK_order_memo:"",
			loading:false,
		};
	},
	created() {
	    this.initData();
	},
	methods: {
		async initData(){
			this.getProcessType()//获取采购类型
			this.options()//获取下拉项
			//this.getDic()//获取条款字典
			this.getDep()//获取部门
			this.getVender()//获取供应商
			this.getPaymentType();//获取采购合同付款类型
			this.getPaymentMethodP();//获取采购合同付款方式
			this.getExchgeList()//汇率列表
			this.getContractCodeList();//合同号列表
			if(this.contract_id==null){
				this.getBaseInfo()//获取基本信息
			}else{
				this.getContractData()//根据合同id获取合同数据
			}
			
		},
		getContractCodeList(){
            projectApi.getContractCodeList("process").then((res) => {
                console.log("🚀 ~ file: contract_process_edit.vue:639 ~ projectApi.getContractCodeList ~ res", res)
                this.contractCodeList=res.data
            });
        },
		getEBS(){
            ebsApi.getEbsGoods(this.goods_stock_org_id_ebs,this.ebs_path).then((res) => {
				this.ebsGoods = res.data;
			});
			ebsApi.getEbsData("get_unit", "", this.ebs_path).then((res) => {
                if (res.code == 0) {
                    this.unitObj = this.$general.objectKeyBy(
                        res.data || [],
                        "uom_code"
                    );
                    this.isGetUnit = true;
                }
            });
        },

		getStockId(depId) {
            if (depId) {
                this.selectOptions.dep.forEach((item) => {
                    let children = item.children;
                    if (children && children.length > 0) {
                        children.forEach((data) => {
                            if (data.dep_id == depId) {
                                this.goods_stock_org_id_ebs =data.dep_ebs_org_id;
                                this.goods_stock_org_id_ebs_hk =data.dep_ebs_org_id_hk;
                            }
                        });
                    } else {
                        if (item.dep_id == depId) {
                            this.goods_stock_org_id_ebs = item.dep_ebs_org_id;
                            this.goods_stock_org_id_ebs_hk =item.dep_ebs_org_id_hk;
                        }
                    }
                });
            }
			if (this.ebs_path == "HS") {
                this.base_info.contract_stock_org_id_ebs = this.goods_stock_org_id_ebs;
            }
            if (this.ebs_path == "HK") {
                this.base_info.contract_stock_org_id_ebs = this.goods_stock_org_id_ebs_hk;
            }
            this.getEBS()
        },

		//根据合同id获取合同数据
		getContractData(){
			purchaseApi.getContractInfo(this.contract_id).then((res) => {
				this.base_info = res.data.baseInfo;
				this.contract_order_id=this.base_info.contract_order_id
				this.tkList = this.base_info.contract_clause;
				 if (Array.isArray(this.tkList)) {
                    if (this.tkList.length > 0) {
                        this.clauseList = [];
                        this.clauseList = this.$general.deepClone(this.tkList);
                        this.clauseList.forEach((item) => {
                            item.memo =
                                "<p>" +
                                this.$general.getFormatCode(item.memo) +
                                "</p>";
                        });
                    }
                }
				this.detailInfo = res.data.detailInfo;
				this.detailInfo.sort(function (a, b) {
					return (
						a.order_goods_row_number - b.order_goods_row_number
					);
				});
				this.getStockId(this.base_info.contract_dep_id)
			});
			
			this.getDic();
		},

		//汇率列表
		getExchgeList() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            omApi.getExchangeRate(month, year).then((res) => {
                this.exchangeList = res.data;
				if(this.goodsInfo.length!=0){
					this.base_info.contract_currency=this.goodsInfo[0].order_goods_bom_currency
					this.changeBZ(this.base_info.contract_currency)
				}
            });
        },

		//获取基本信息
		getBaseInfo(){
			this.base_info.contract_order_id=this.orderData.order_id
			this.base_info.contract_category='process'
			this.base_info.contract_dep_name=this.orderData.order_dep_name
			this.base_info.contract_dep_id=this.orderData.order_dep_id
			this.base_info.contract_salesman_name=this.orderData.order_salesman_name
			this.base_info.contract_salesman_id=this.orderData.order_salesman_id
			this.base_info.contract_title_name=this.orderData.order_title_name
			this.base_info.contract_title_id=this.orderData.order_title_id
			this.base_info.contract_project_id=this.orderData.order_project_id
			this.base_info.contract_project_code=this.orderData.order_project_code
			//this.base_info.contract_stock_org_id_ebs=this.orderData.order_ebs_stock_id
			this.base_info.contract_date=this.$general.getNowDate()
			if(this.goodsInfo.length!=0){
				this.base_info.contract_supply_title_name=this.goodsInfo[0].order_goods_bom_ven_name
				this.base_info.contract_supply_title_id=this.goodsInfo[0].order_goods_bom_ven_id
				this.base_info.contract_actual_supply_title_name=this.goodsInfo[0].order_goods_bom_ven_name
				this.base_info.contract_actual_supply_title_id=this.goodsInfo[0].order_goods_bom_ven_id
				this.base_info.contract_is_stock = 2;
				let goodsInfo = this.$general.deepClone(this.goodsInfo);
				goodsInfo.forEach(item => {
					this.detailInfo.push({
						contract_detail_article_number:item.order_goods_bom_article_number,//采购货号
						contract_detail_name:item.order_goods_bom_name,//采购品名
						contract_detail_spec:item.order_goods_bom_spec,//采购规格
						contract_detail_qty:item.order_goods_bom_qty,//采购数量
						contract_detail_unit:item.order_goods_bom_unit,//采购单位
						contract_detail_price:item.order_goods_bom_price,//单价
						contract_detail_tax_rate:this.$dmBaseSet.datalist.optionsData.VAT_RATE.option_value,//税率,//税率
						contract_detail_amount:item.order_goods_bom_qty * item.order_goods_bom_price,//金额小计
						contract_detail_etd:null,//交货日期
						contract_detail_goods_id:item.order_goods_bom_archives_id,//商品id
						contract_detail_goods_id_ebs:item.order_goods_bom_ebs_id,//ebs商品id
						contract_detail_goods_name_ebs:item.order_goods_bom_ebs_name,//ebs商品名称
						contract_detail_order_goods_bom_id:item.order_goods_bom_id,//订单成本信息ID
					})
					
				});
			}else{
                this.base_info.contract_is_stock = 1;
            }

			if (Array.isArray(this.tkList)) {
                if (this.tkList.length > 0) {
                    this.clauseList = [];
                    this.clauseList = this.$general.deepClone(this.tkList);
                    this.clauseList.forEach((item) => {
                        item.memo =
                            "<p>" +
                            this.$general.getFormatCode(item.memo) +
                            "</p>";
                    });
                }
            }
			
			this.getDic();
		},

		
		// 获取部门
        async getDep() {
            let list = await ifsApi.getList("", 2, 0);
            this.allDep = list.data;
			this.selectOptions.dep = this.allDep;
			if(this.contract_id == null){
                this.getStockId(this.base_info.contract_dep_id)
            }
        },
		
		async getDic(){
			this.$dmBaseSet.dicData('TY_BZ,TY_HTTK-PP_I,TY_HTTK-PP_E,TY_JLDW').then((data) =>{
				this.TY_JLDW = this.$general.objectKeyBy(data['TY_JLDW'].children,'dic_name') || [];
				let pui = data['TY_HTTK-PP_I'].children || [];
				let pue = data['TY_HTTK-PP_E'].children || [];
				this.TK = pui.concat(pue) || [];
				if (Array.isArray(this.tkList)) {
                        if (this.tkList.length > 0) {
                            for (let i = 0; i < this.TK.length; i++) {
                                let children = this.TK[i].children;
                                for (let j = 0; j < children.length; j++) {
                                    for (
                                        let m = 0;
                                        m < this.tkList.length;
                                        m++
                                    ) {
                                        if (
                                            children[j].dictionary_id ==
                                            this.tkList[m].dictionary_id
                                        ) {
                                            this.TK_memo =
                                                this.TK[i].dictionary_id;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    console.log("TK", this.TK);
			});
		},

		//获取加工合同类型
		getProcessType(){
			ebsApi.getEbsData('get_process_type','','HS').then((result)=>{
				if(result.code == 0){
					this.selectOptions.productType = result.data || [];
					console.log("🚀 ~ file: contract_process_edit.vue ~ line 669 ~ ebsApi.getEbsData ~ result.data", result.data)
				}
			})
		},

		changeContractType(value){
			
		},

		//币种切换
		changeBZ(value){
			this.base_info.contract_ex_rate = this.exchangeList[value];
		},

		//获取下拉项
		options() {
            //
            Promise.all([
                this.$dmBaseSet.personData(),
                ifsApi.dicData(
                    "TY_BZ,TY_SHFS,TY_JGTK,TY_YSFS,TY_JLDW,CBM_ORDER_TYPE"
                ),
                ifsApi.getTitlelist(),
                ifsApi.getCustomerList(),
                ifsApi.getPorts(1, 0),
                ifsApi.getPorts(0, 1),
                this.$dmBaseSet.getOptions(),
                // 业务类型的还没写
            ]).then((res) => {
                this.selectOptions.sales = res[0].list || []; //业务员
                this.selectOptions.BZ = res[1]["TY_BZ"].children || []; //币种
                this.selectOptions.JGTK = res[1]["TY_JGTK"].children || []; //价格条款
                this.selectOptions.SHFS = res[1]["TY_SHFS"].children || []; //收汇方式
                this.selectOptions.YSFS = res[1]["TY_YSFS"].children || []; //运输方式
                this.selectOptions.JLDW = res[1]["TY_JLDW"].children || []; //计量单位

                this.selectOptions.allTitle = res[2].tnt_title || []; //接单抬头
                this.selectOptions.portFrom = res[4].data || []; //起运港
                this.selectOptions.portTo = res[5].data || []; //目的港

				this.base_info.contract_sign_place=this.$dmBaseSet.datalist.optionsData.SIGN_PLACE.option_value[1].value

            });
        },
		//部门选择
		depClick(data) {
            if (data.end) {
                 this.base_info.contract_dep_id = data.value;
                this.base_info.contract_dep_name = data.title;
				this.base_info.contract_salesman_name = null;
                this.base_info.contract_salesman_id = null;
				this.getStockId(this.base_info.contract_dep_id)
                this.$refs.depSelect2.handleClose();
            }
        },
		//清理部门
		clearDep() {
            this.base_info.contract_dep_id = null;
            this.base_info.contract_dep_name = null;
        },
		//业务员选择
		changeSales(value) {
            if (value) {
                this.selectOptions.sales.forEach((item) => {
                    if (item.staff_name == value) {
                        this.base_info.contract_salesman_id = item.staff_id;
                    }
                });
            } else {
                this.base_info.contract_salesman_id = null;
            }
        },
		//抬头选择
        changeTitle(value) {
            if (value) {
                this.selectOptions.allTitle.forEach((item) => {
                    if (value == item.title_id) {
                        this.base_info.contract_title_id = item.title_id;
                        this.base_info.contract_title_name = item.title;
                    }
                });
                if (value == 4) {
                    this.ebs_path = "HK";
                    this.base_info.contract_stock_org_id_ebs = this.goods_stock_org_id_ebs_hk;
                } else {
                    this.ebs_path = "HS";
                    this.base_info.contract_stock_org_id_ebs = this.goods_stock_org_id_ebs;
                }
            } else {
                this.base_info.contract_title_id = null;
            }
        },
        // 获取供应商
        async getVender() {
           this.$dmBaseSet.venderData().then(()=>{
				this.selectOptions.vender=this.$dmBaseSet.datalist.venderData
				if(this.base_info.contract_actual_supply_title_name != null){
					this.changeRealVender(this.base_info.contract_actual_supply_title_name)
				}
				
			})
        },
		//供应商选择
		changeVender(value) {
            if (value) {
                this.selectOptions.vender.forEach((item) => {
                    if (item.trader_name == value) {
                        this.base_info.contract_supply_title_id = item.trader_id;
						this.base_info.contract_supply_title_name = value;
                    }
                });
            } else {
                this.base_info.contract_supply_title_id = null;
            }
        },
		//实际供应商选择
		changeRealVender(value){
			this.clearActualVender()
            if (value) {
                this.selectOptions.vender.forEach((item) => {
                    if (item.trader_name == value) {
                        this.base_info.contract_actual_supply_title_id = item.trader_id;
						this.base_info.contract_actual_supply_title_name = value;
						this.trader_id_ebs = this.ebs_path == 'HS' ? Number(item.trader_id_ebs) : Number(item.trader_id_ebs_hk);
                    }
                });
				this.getVenBank()
                this.getVenBankAddress()
				this.getCustomerT()
                
            } else {
                this.base_info.contract_supply_title_id = null;
				this.base_info.contract_actual_supply_title_id = null;
            }
		},

		//获取供应商银行信息
		async getVenBank(){
			await ebsApi.getEbsData('get_venlist_bank',this.trader_id_ebs,this.ebs_path).then((result) => {
				if(result.code == 0 && result.data != null){
					if(result.data.length != 0){
						let venderBank = result.data[0] || {};
						this.base_info.contract_actual_supply_contract_info.b_bank_name = venderBank.bank_branch_name
						this.base_info.contract_actual_supply_contract_info.b_bank_account_num = venderBank.bank_account_num
					}
						
				}
				
			})
		},

		//获取供应商地址信息
		async getVenBankAddress(){
			await ebsApi.getEbsData('get_venlist_bank_address',this.trader_id_ebs,this.ebs_path).then((result)=>{
				if(result.code == 0 && result.data != null){
					if(result.data.length != 0){
						let venderBankAddress = result.data[0] || {};
						this.base_info.contract_actual_supply_address = venderBankAddress.address1
						this.base_info.contract_actual_supply_tel = venderBankAddress.contact_tel
					}
						
				}
			})
		},

		//通过ID获取客户法人
		async getCustomerT(){
			await ebsApi.getEbsData('get_venlist_id',this.trader_id_ebs,this.ebs_path).then((result)=>{
				if(result.code == 0 && result.data != null){
					if(result.data.length != 0){
						let customerT = result.data || [];
						this.base_info.contract_actual_supply_contract_info.b_legal_person_b = customerT[0].legal_person
						this.base_info.contract_actual_supply_contract_info.b_legal_person_e = customerT[0].legal_person
					}
				}
			})
		},

		changeEBSGoods(row) {
            this.ebsGoods.forEach((item) => {
                if (item.inventory_item_id == row.contract_detail_goods_id_ebs) {
                    row.contract_detail_goods_name_ebs = item.description;
                    row.uom_class = item.uom_class;
                    this.selectOptions.JLDW.forEach((data) => {
                        if (this.ebs_path == "HS") {
                            if (item.primary_uom_code == data.ebs_code) {
                                row.contract_detail_unit = data.dic_name;
                                row.order_goods_unit_code = data.dic_code;
                            }
                        }
                        if (this.ebs_path == "HK") {
                            if (item.primary_uom_code == data.ebs_code_hk) {
                                row.contract_detail_unit = data.dic_name;
                                row.contract_detail_unit_code = data.dic_code;
                            }
                        }
                    });
                }
            });
        },

		//计算金额
		changeAmount(row){
            row.contract_detail_amount=row.contract_detail_qty * row.contract_detail_price
        },

		//合同模板选择
		changeContractMould(value){
			this.base_info.contract_mould_id=value
			this.contract_mould_list.forEach(item => {
				if(item.value==value){
					this.base_info.contract_mould_name=item.label
				}
			});
		},

		//切换付款类型
		changePaymentTerm(row){
			this.productPaymetType.forEach(item => {
				if(item.meaning==row.payment_term_label){
					row.payment_term_code=item.lookup_code
				}
			});
		},

		//切换付款方式
		changePaymentMethod(row){
			this.productPaymet.forEach(item => {
				if(item.meaning==row.payment_method_label){
					row.payment_method_code=item.lookup_code
				}
			});
		},
		//清理供应商
        clearVender() {
            this.base_info.contract_supply_title_id = null;
			this.base_info.contract_supply_title_name = null;
        },

		//清理供应商
        clearActualVender() {
            this.base_info.contract_actual_supply_title_id = null;
			this.base_info.contract_actual_supply_title_name = null;
			this.base_info.contract_actual_supply_contract_info.b_legal_person_b = null;
			this.base_info.contract_actual_supply_contract_info.b_legal_person_e = null;
			this.base_info.contract_actual_supply_address = null;
			this.base_info.contract_actual_supply_contract_info.b_bank_name = null;
			this.base_info.contract_actual_supply_contract_info.b_bank_account_num = null;
			this.base_info.contract_actual_supply_tel = null;
        },
		//供应商远程搜索
        remoteMethod2(query) {
            if (query !== "") {
                this.venOptions = this.selectOptions.vender.filter((item) => {
                    return (
                        item.trader_name
                            .toLowerCase()
                            .indexOf(query.toLowerCase()) > -1
                    );
                });
            } else {
                this.venOptions = [];
            }
        },
		//起运港远程搜索
		remotePortFrom(query) {
            if (query !== "") {
                this.portFromOptions = this.selectOptions.portFrom.filter(
                    (item) => {
                        return (
                            (item.port_name_en + item.port_name)
                                .toLowerCase()
                                .indexOf(query.toLowerCase()) > -1
                        );
                    }
                );
            } else {
                this.portFromOptions = [];
            }
        },
		//目的港远程搜索
        remotePortTo(query) {
            if (query !== "") {
                this.portToOptions = this.selectOptions.portTo.filter(
                    (item) => {
                        return (
                            (item.port_name_en + item.port_name)
                                .toLowerCase()
                                .indexOf(query.toLowerCase()) > -1
                        );
                    }
                );
            } else {
                this.portToOptions = [];
            }
        },

		//页面窗口大小切换
	    trigger_btn(index) {
            this.$refs.modal1.zoom();
            this.downIcon = !this.downIcon;
        },

		//增加付款方式
		addPayData(){
			this.base_info.contract_collect_clause.push({})
		},

		//删除付款方式
		delPayData(){
			let selectRecords = this.$refs.payTable.getCheckboxRecords();
			if (selectRecords.length > 0) {
				 this.$confirm("确定要删除付款方式?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                        .then(() => {
                           	for (let m = selectRecords.length - 1; m >= 0; m--) {
								let row = this.$refs.payTable.getRowIndex(selectRecords[m]);
								this.base_info.contract_collect_clause.splice(row, 1);
							}
                        })
                        .catch(() => {
                           
                        });
				
			} else {
				this.$XModal.alert({
					message: '请选择要删除的行！',
					status: 'warning'
				});
			}
		},

		//增加商品信息
		addGoodsInfo(){
			if(this.base_info.contract_is_stock==2){
                this.bomModal = true;
            }else{
                this.detailInfo.push({
                    contract_detail_article_number:null ,//采购货号
                    contract_detail_name: '', //采购品名
                    contract_detail_spec: '', //采购规格
                    contract_detail_qty: null, //采购数量
                    contract_detail_unit: null, //采购单位
                    contract_detail_price: null, //单价
                    contract_detail_tax_rate:this.$dmBaseSet.datalist.optionsData.VAT_RATE.option_value, //税率
                    contract_detail_amount: null, //金额小计
                    contract_detail_etd: null, //交货日期

                    // contract_detail_goods_id: item.order_goods_bom_archives_id, //商品id
                    contract_detail_goods_id_ebs: null, //ebs商品id
                    contract_detail_goods_name_ebs:null, //ebs商品名称
                    // contract_detail_order_goods_bom_id: item.order_goods_bom_id, //订单成本信息ID
                });
            }
		},

		//删除商品信息
		delGoodsInfo(){
			let selectRecords = this.$refs.goodsTable.getCheckboxRecords();
			if (selectRecords.length > 0) {
				this.$confirm("确定要删除商品信息?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
				.then(() => {
					for (let m = selectRecords.length - 1; m >= 0; m--) {
						let row = this.$refs.goodsTable.getRowIndex(selectRecords[m]);
						this.detailInfo.splice(row, 1);
					}
				})
				.catch(() => {
					
				});
			} else {
				this.$XModal.alert({
					message: '请选择要删除的行！',
					status: 'warning'
				});
			}
		},

		//合同条款选择
		async showTK() {
            let dictionary_id = this.TK_memo;
            let tkListData = [];

            for (let i = 0; i < this.TK.length; i++) {
                if (dictionary_id == this.TK[i].dictionary_id) {
                    tkListData = this.TK[i].children || [];
                    break;
                }
            }
            let sales = await ifsApi.getStaffInfo(
                this.base_info.contract_salesman_id
            );
            for (let i = 0; i < tkListData.length; i++) {
                tkListData[i].memo = tkListData[i].memo.replace(
                    "{$ppn_delivery_date}",
                    ""
                );
                tkListData[i].memo = tkListData[i].memo.replace(
                    "{$ppn_over_rate}",
                    ""
                );
                tkListData[i].memo = tkListData[i].memo.replace(
                    "{$ppn_sales_name}",
                    this.base_info.contract_salesman_name
                );
                tkListData[i].memo = tkListData[i].memo.replace(
                    "{$ppn_sales_tel}",
                    sales.data.staff_work_mobile
                );
                tkListData[i].memo = tkListData[i].memo.replace(
                    "{$ppn_sales_email}",
                    sales.data.staff_work_email
                );
                tkListData[i].memo = tkListData[i].memo.replace(
                    "{$ppn_ven_email}",
                    ""
                );
                tkListData[i].memo = tkListData[i].memo.replace(
                    "{$ppn_ven_linker}",
                    ""
                );
                tkListData[i].memo = tkListData[i].memo.replace(
                    "{$ppn_ven_phone}",
                    ""
                );
            }
            this.tkList = [];
            tkListData.forEach((item) => {
                let obj = {
                    memo: "",
                    description: "",
                    dictionary_id: "",
                };
                obj.memo = item.memo;
                obj.description = item.description;
                obj.dictionary_id = item.dictionary_id;
                this.tkList.push(obj);
            });

            // this.tkListData = tkListData;

            this.tkModal = true;
        },
        showClauseEdit() {
            this.tkModal = true;
        },

        //合同条款确认
        changeTKN() {
            // let checkData = this.tkListData;
            let checkData = [];
            checkData = this.$general.deepClone(this.tkList);
            if (checkData.length > 0) {
                checkData.forEach((item) => {
                    item.memo =
                        "<p>" + this.$general.getFormatCode(item.memo) + "</p>";
                });
                this.clauseList = [];
                this.clauseList = checkData;
                this.base_info.contract_clause = this.tkList;
                console.log("保存clause", this.tkList);
                this.tkModal = false;

                // this.changeTK(TK);
            } else {
                this.$alert("请选择明细！", "错误提示", {
                    confirmButtonText: "确定",
                    type: "warning",
                });
            }
        },

		//获取采购合同付款类型
		getPaymentType(){
			ebsApi.getEbsData('get_payment_type','','HS').then((result)=>{//this.ebs_path 'HK''HS'
				if(result.code == 0){	
					this.productPaymetType = result.data || [];
				}
			})
		},
		
		//获取采购合同付款方式
		getPaymentMethodP(){
			ebsApi.getEbsData('get_payment_method','',"HS").then((result)=>{
				if(result.code == 0){	
					this.productPaymet = result.data || [];
				}
			})
		},

		footerMethod({
			columns,
			data
		}) {
			return [
				columns.map((column, columnIndex) => {
					if (columnIndex === 2) {
						return '合计'
					}
					if (['contract_detail_qty'].includes(column.property)) {
						let value = this.$XEUtils.sum(data, column.property)
						return this.$general.transform(value, 2)
					}
					if (['contract_detail_amount'].includes(column.property)) {
						let value = this.$XEUtils.sum(data, column.property)
						return this.$general.transform(value, 2)
					}
					return ''
				})
			]
		},

		//选择项目号
		updateProjectCode(projectCode,projectID){
            this.base_info.contract_project_code=projectCode
            this.base_info.contract_project_id=projectID
        },
		
		//合同保存
		saveContract(){
			for (let key in this.required) {
                if (!this.base_info[key]) {
                    this.$message({
                        message: "请填写" + `${this.required[key]}` + "!",
                        type: "error",
                    });
                    return;
                }
            }
            if (this.detailInfo.length > 0) {
				for(let i=0;i<this.detailInfo.length;i++){
					if (this.detailInfo[i].contract_detail_etd== null) {
						this.$message({
							message: "请填写交货期!",
							type: "error",
						});
						return;
					}
				}
				if(this.base_info.contract_clause.length==0){
                    this.$message({
                        message: "请填写合同条款!",
                        type: "error",
                    });
                    return;
                }
				if (this.base_info.contract_collect_clause.length > 0) {
                    let percentage = 0
                    for (let i = 0; i < this.base_info.contract_collect_clause.length; i++) {
						
                        if (this.base_info.contract_collect_clause[i].payment_term_label == null) {
                            this.$message({
                                message: "请选择付款类型!",
                                type: "error",
                            });
                            return;
                        }
                        if (this.base_info.contract_collect_clause[i].payment_method_label == null) {
                            this.$message({
                                message: "请选择付款方式!",
                                type: "error",
                            });
                            return;
                        }
                        if (this.base_info.contract_collect_clause[i].percentage == null) {
                            this.$message({
                                message: "请填写付款比例!",
                                type: "error",
                            });
                            return;
                        }
                        
                        percentage = Number(this.base_info.contract_collect_clause[i].percentage) + Number(percentage)
                    }
                    if (percentage != 100) {
                        this.$message({
                            message: "付款比例之和必须等于100!",
                            type: "error",
                        });
                        return;
                    }
                    if(this.base_info.contract_stock_org_id_ebs==null){
						this.getStockId(this.base_info.contract_dep_id)
					}
					purchaseApi.updateContractInfo(this.base_info, this.detailInfo).then((res) => {
						if (res.code == 0) {
							this.$message({
								message: "保存加工合同成功！",
								type: "success",
							});
							this.$emit("afterSaveProContract");
							this.base_info.contract_id = res.data
							this.contract_id = res.data
						}
					});
                }else{
					this.$message({
						message: "请填写其他条款！",
						type: "error",
					});
					return;
				}
            }else{
				this.$message({
					message: "请填写合同明细！",
					type: "error",
				});
				return;
			}
		},
			
		close(){
			this.$emit('update:show', false)
		},

		//获取选择商品信息
		getSelectBom(bomData){
            this.base_info.contract_actual_supply_title_name=bomData[0].order_goods_bom_ven_name
			this.base_info.contract_supply_title_name=bomData[0].order_goods_bom_ven_name
            if (this.base_info.contract_actual_supply_title_name != null) {
                this.changeRealVender(
                    this.base_info.contract_actual_supply_title_name
                );
            }
			this.detailInfo=[]
			bomData.forEach(item => {
				this.detailInfo.push({
					contract_detail_article_number:item.order_goods_bom_article_number,//采购货号
					contract_detail_name:item.order_goods_bom_name,//采购品名
					contract_detail_spec:item.order_goods_bom_spec,//采购规格
					contract_detail_qty:item.order_goods_bom_qty,//采购数量
					contract_detail_unit:item.order_goods_bom_unit,//采购单位
					contract_detail_price:item.order_goods_bom_price,//单价
					contract_detail_tax_rate:this.$dmBaseSet.datalist.optionsData.VAT_RATE.option_value,//税率
					contract_detail_amount:item.order_goods_bom_qty * item.order_goods_bom_price,//金额小计
					contract_detail_etd:null,//交货日期
					contract_detail_goods_id:item.order_goods_bom_archives_id,//商品id
					contract_detail_goods_id_ebs:item.order_goods_bom_ebs_id,//ebs商品id
					contract_detail_goods_name_ebs:item.order_goods_bom_ebs_name,//ebs商品名称
					contract_detail_order_goods_bom_id:item.order_goods_bom_id,//订单成本信息ID
				})
			});
		},
		//预览
		processPrint(){
			window.open('/#/order_process_contract_print?contract_id='+this.contract_id+'&flag=preview');
		},

		async processPublish(){
			 
			this.saveContract()
			purchaseApi.contractPublish(this.contract_id).then((res)=>{
                if(res.code == 0){
                    this.$emit("afterSaveProContract");
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: res.msg+'发布失败！',
                        type: 'error'
                    });
                }
            })
		},

		 

		// 合同明细
        editMethod1({ row, column }) {
            const $table = this.$refs.goodsTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        
        //其他条款 
        editMethod2({ row, column }) {
            const $table = this.$refs.payTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },

		remoteTkMethod(query) {
            if (query !== '') {
                this.loading = true;
				setTimeout(() => {
                    this.loading = false;
                    this.contractCode = this.contractCodeList.filter(item => {
                        return (item.odmc_code_ebs).toLowerCase()
                        .indexOf(query.toLowerCase()) > -1;
                    });
				}, 200);
			} else {
				this.contractCode = [];
			}
        },

        async changeTKOrder(value){
            let TK = [];
            if(value > 0){
                await purchaseApi.getContractInfo(value).then((res) => {
                    let base_info=res.data.baseInfo
                    this.tkList = base_info.contract_clause;
                    TK = this.tkList
                });
            }else{
                return false;
            }
            if(TK.length==0){
                this.$message({
                    message: '条款为空！',
                    type: 'warning'
                });
                return false;
            }
            
			this.$confirm("是否要替换该合同条款？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    if (Array.isArray(this.tkList)) {
                        if (this.tkList.length > 0) {
                            this.clauseList = [];
                            this.clauseList = this.$general.deepClone(this.tkList);
                            this.clauseList.forEach((item) => {
                                item.memo =
                                    "<p>" +
                                    this.$general.getFormatCode(item.memo) +
                                    "</p>";
                            });
                        }
                    }
                })
                .catch(() => {
                    this.TK_order_memo=null
                });
        },
	},

	watch:{
		
	}
};
</script>