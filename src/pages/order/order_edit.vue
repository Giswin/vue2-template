<template>
    <div class="wrap">
        <vxe-modal ref="model1" v-model="show" width="1100" resize height="650" show-footer destroy-on-close>
            <template v-slot:header>
                <div v-if="order_id!==0">订单编辑</div>
                <div v-if="order_id==0">新建订单</div>
                <div class="model-header-r">
                    <div v-if="(order_id!==0&&base_info.order_cus_od_code)"> 订单编号:{{base_info.order_cus_od_code}}</div>
                </div>
                <div class="model-r">
                    <div class="model-screen">
                        <i class="fa fa-window-maximize" v-show="downIcon" @click="screen"></i>
                        <i class="fa fa-window-restore" v-show="!downIcon" @click="screen"></i>
                    </div>
                    <div class="model-close">
                        <i class="fa fa-times" @click="closeIcon"></i>
                    </div>
                </div>
            </template>
            <div class="tabs">
                <div class="tabs-col" :class="{ show: selectTab == 0 }" @click="selectTab = 0">基本信息</div>
                <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="changeSelectTab(1)">商品信息</div>
                <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectTab = 2">费用信息</div>
                <div class="tabs-col" :class="{ show: selectTab == 3 }" @click="selectTab = 3">合同条款</div>
                <div class="tabs-col" :class="{ show: selectTab == 4 }" @click="selectTab = 4">其他条款</div>

            </div>
            <div class="basic-info" v-show="selectTab==0">
                <div class="class-title">
                    <div class="title">基本信息</div>
                </div>
                <div class="table-body">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                        <tbody>
                            <tr>
                                <th width="120" align="center"><span>*</span>业务部门</th>
                                <td width="200">
                                    <el-select ref="depSelect2" v-model="base_info.order_dep_name" placeholder="请选择部门" size="small" clearable @clear="clearDep">
                                        <el-tree ref="listTree" :data="selectOptions.dep" :props="defaultProps" node-key="dep_id" @node-click="depClick"></el-tree>
                                        <el-option v-for="item in selectOptions.dep" :key="item.value" :value="item.value" :label="item.title" style="display: none;"></el-option>
                                    </el-select>
                                </td>
                                <th width="120" align="center"><span>*</span>币种</th>
                                <td>
                                    <el-select v-model="base_info.order_currency" placeholder="请选择" size="small" clearable @change="changeBZ">
                                        <el-option v-for="item in selectOptions.BZ" :key="item.dic_name" :label="item.dic_name" :value="item.dic_name"></el-option>
                                    </el-select>

                                </td>
                                <td colspan="2">
                                    <el-input v-model="base_info.order_ex_rate_oc" :disabled="order_id > 0"></el-input>
                                </td>

                                <th width="120" align="center">信用证号</th>
                                <td width="200">
                                    <el-input v-model="base_info.order_lc_no" placeholder="请输入" size="small" clearable></el-input>
                                </td>
                            </tr>
                            <tr>
                                <th width="120" align="center"><span>*</span>业务员</th>
                                <td>
                                    <el-select v-model="base_info.order_salesman_name" size="small" clearable placeholder="请选择" @change="changeSales">
                                        <el-option v-for="item in selectOptions.sales" v-show="item.dep_id == base_info.order_dep_id" :key="item.staff_id" :label="item.staff_name" :value="item.staff_name"></el-option>
                                    </el-select>
                                </td>
                                <th width="120" align="center">美元汇率</th>
                                <td colspan="3">
                                    <el-input v-model="base_info.order_ex_rate_usd" size="small" clearable></el-input>
                                </td>
                                <th width="120" align="center">开证日期</th>
                                <td>
                                    <el-date-picker v-model="base_info.order_lc_issue_date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="small" clearable></el-date-picker>
                                </td>
                            </tr>
                            <tr>
                                <th width="120" align="center"><span>*</span>接单日期</th>
                                <td>
                                    <el-date-picker v-model="base_info.order_date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="small" clearable @change="changeDate"></el-date-picker>
                                </td>

                                <th width="120" align="center"><span>*</span>结算方式</th>
                                <td>
                                    <el-select v-model="base_info.order_collect_mode" filterable size="small" clearable placeholder="请选择">
                                        <el-option v-for="item in selectOptions.SHFS" :key="item.dic_name" :label="item.dic_name" :value="item.dic_name"></el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-input v-model="base_info.order_collect_days" size="small" clearable></el-input>
                                </td>
                                <td align="center" width="40" style="background: #efefef;">
                                    天
                                </td>
                                <th width="120" align="center">默认增值税率</th>
                                <td>
                                    <el-input v-model="base_info.order_vat_rate" size="small" clearable></el-input>
                                </td>
                            </tr>
                            <tr>
                                <th width="120" align="center"><span>*</span>接单抬头</th>
                                <td>
                                    <el-select v-model="base_info.order_title_id" size="small" clearable @change="changeTitle" placeholder="请选择" :disabled="isGetProject">
                                        <el-option v-for="item in selectOptions.allTitle" :key="item.title_id" :label="item.title" :value="item.title_id"></el-option>
                                    </el-select>
                                </td>

                                <th width="120" align="center"><span v-show="requireFlag">*</span>价格条款</th>
                                <td colspan="3">
                                    <el-select v-model="base_info.order_price_clause" filterable size="small" clearable placeholder="请选择">
                                        <el-option v-for="item in selectOptions.JGTK" :key="item.dic_name" :label="item.dic_name" :value="item.dic_name"></el-option>
                                    </el-select>
                                </td>
                                <th width="120" align="center">默认退税率</th>
                                <td>
                                    <el-input v-model="base_info.order_tax_refund_rate" size="small" clearable></el-input>
                                </td>
                            </tr>
                            <tr>

                                <th width="120" align="center"><span>*</span>客户</th>
                                <td>
                                    <el-select v-model="base_info.order_cus_name" size="small" clearable filterable placeholder="请输入关键词选择" remote :remote-method="remoteCustomer" @change="changeCustomer">
                                        <el-option v-for="item in cusOptions" :key="item.trader_id" :label="item.trader_name" :value="item.trader_name"></el-option>
                                    </el-select>
                                </td>
                                <th width="120" align="center"><span v-show="requireFlag">*</span>运输方式</th>
                                <td colspan="3">
                                    <el-select v-model="base_info.order_shipping_mode" size="small" clearable placeholder="请选择">
                                        <el-option v-for="item in selectOptions.YSFS" :key="item.dic_code" :label="item.dic_name" :value="item.dic_name"></el-option>
                                    </el-select>
                                </td>
                                <th width="150" align="center">签订地</th>
                                <td>
                                    <el-input v-model="base_info.order_sign_place" size="small" clearable></el-input>

                                </td>
                            </tr>
                            <tr>

                                <th width="120" align="center"><span>*</span>客户订单号</th>
                                <td>
                                    <el-input v-model="base_info.order_cus_od_code" placeholder="请输入" size="small" clearable></el-input>
                                </td>
                                <th width="120" align="center"><span v-show="requireFlag">*</span>起运港</th>
                                <td colspan="3">
                                    <el-select v-model="base_info.order_port_from" size="small" clearable filterable placeholder="请输入关键词选择" remote :remote-method="remotePortFrom">
                                        <el-option v-for="item in portFromOptions" :key="item.port_code" :label="`${item.port_name_en}-${item.port_name}`" :value="item.port_name_en"></el-option>
                                    </el-select>
                                </td>

                                <th width="120" align="center"><span>*</span>成品发票</th>
                                <td>
                                    <el-select v-model="base_info.order_invoice_mode" size="small" clearable placeholder="请选择" @change="changeInvoice">
                                        <el-option v-for="item in selectOptions.invoiceMode" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr>

                                <th width="120" align="center"><span>*</span>业务类型</th>
                                <td>
                                    <el-select v-model="base_info.order_business_type" size="small" clearable filterable :disabled="isGetProject">
                                        <el-option v-for="item in selectOptions.businessType" :key="item.dic_code" :label="item.dic_name" :value="item.dic_name"></el-option>
                                    </el-select>
                                </td>
                                <th width="120" align="center"><span v-show="requireFlag">*</span>目的港</th>
                                <td colspan="3">
                                    <el-select v-model="base_info.order_port_to" size="small" clearable filterable placeholder="请输入关键词选择" remote :remote-method="remotePortTo">
                                        <el-option v-for="item in portToOptions" :key="item.port_code" :label="`${item.port_name_en}-${item.port_name}`" :value="item.port_name_en"></el-option>
                                    </el-select>
                                </td>
                                <th width="120" align="center">手续费(CNY)</th>
                                <td>
                                    <el-input v-model="base_info.order_cost_agent_fee" placeholder="请输入" size="small" clearable :disabled="isCharge"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <th width="120" align="center"><span>*</span>订单类型</th>
                                <td>
                                    <el-select v-model="base_info.order_type" size="small" @change="changeType" clearable placeholder="请选择" :disabled="isGetProject">
                                        <el-option v-for="item in selectOptions.TYYWLX" :key="item.dic_code" :label="item.dic_name" :value="item.dic_name_en"></el-option>
                                    </el-select>
                                </td>
                                <th width="120" align="center"><span>*</span>交货期</th>
                                <td colspan="3">
                                    <el-date-picker v-model="base_info.order_delivery_date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="small" clearable></el-date-picker>
                                </td>

                                <th width="120" align="center"></th>
                                <td></td>
                            </tr>
                            <tr height="60">
                                <th width="120" align="center">订单备注</th>
                                <td colspan="7">
                                    <el-input v-model="base_info.order_memo" placeholder="请输入" type="textarea" clearable></el-input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="goods-info" v-show="selectTab==1">
                <div class="class-title">
                    <div class="title">商品信息</div>
                    <div class="class-r btns">
                        <el-button size="mini" @click="addRow">增行</el-button>
                        <el-button size="mini" @click="delRow">删行</el-button>

                    </div>
                </div>

                <div class="goods-table">
                    <vxe-table border resizable row-key ref="goodsTable" :data="goodsList" show-overflow show-footer size="small" class="mytable-scrollbar" max-height="100%" auto-resize :column-config="{minWidth:100}" :edit-config="{trigger: 'click', mode: 'cell'}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod}" :mouse-config="{selected: true}" :footer-method="footerMethod1" :footer-row-class-name="footerRowClassName">
                        <vxe-table-column width="40" align="center">
                            <template #default>
                                <span class="drag-btn">
                                    <i class="vxe-icon--menu"></i>
                                </span>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                        <vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
                        <!-- <vxe-table-column field="order_goods_row_number" title="行号" width="40" align="center"></vxe-table-column> -->

                        <vxe-table-column field="order_goods_article_number" title="货号" width="120" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template #header>
                                <span>货号</span><span class="requireStar">*</span>
                            </template>
                            <template v-slot:edit="{row}">
                                <el-select v-model="row.order_goods_article_number" size="small" transfer clearable filterable @change="changeArticleNum(row)">
                                    <el-option v-for="item in articleNumOptions" :key="item.goods_article_number" :value="item.goods_article_number" :label="`${item.goods_article_number} - ${item.goods_name}`"></el-option>
                                </el-select>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="中文品名" width="120" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name" @change="changeGoodsName(row)"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name_en" title="英文品名" width="120" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template #header>
                                <span>英文品名</span><span class="requireStar" v-if="(base_info.order_trade_type == '外销' )">*</span>
                            </template>
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name_en" @change="changeGoodsNameEn(row)"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_ebs_name" title="EBS商品" width="120" align="left" header-align="center">
                            <template #header>
                                <span>EBS商品</span><span class="requireStar">*</span>
                            </template>
                            <template v-slot="{row}">
                                <el-select v-model="row.order_goods_ebs_id" ref="mySelected" placeholder="请选择" clearable filterable @change="changeEBSGoods(row)" size="small">
                                    <el-option v-for="item in ebsGoods" :key="item.inventory_item_id" :value="item.inventory_item_id" :label="item.description">
                                        <span style="float: left">{{ item.description+'|'+item.segment1 }}</span>
                                        <span style="float: right; color: #8492a6;" v-if="isGetUnit">{{ unitObj[item.primary_uom_code]['unit_of_measure_tl'] }}</span>
                                        <!-- <span style="float: right; color: #8492a6;" v-if="ebs_path=='HS'">{{ unitHS[item.primary_uom_code]['ebs_data'] }}</span>
                                        <span style="float: right; color: #8492a6;" v-if="ebs_path=='HK'">{{ unitHK[item.primary_uom_code]['ebs_data_hk'] }}</span> -->
                                    </el-option>
                                </el-select>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_spec" title="规格" width="120" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_spec" @change="changeGoodsSpec(row)"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_qty" title="销售数量" width="120" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template #header>
                                <span>销售数量</span><span class="requireStar">*</span>
                            </template>
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_qty" @change="changeGoodsQty(row)"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_unit" title="单位" width="80" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
                            <template v-slot:edit="{row}">
                                <el-select v-model="row.order_goods_unit" size="small" transfer @change="chengeGoodsUnit(row)" clearable filterable>
                                    <el-option v-for="item in selectOptions.JLDW" v-show="item.symbol==row.uom_class || !row.uom_class" :key="item.dictionary_id" :value="item.dic_name" :label="item.dic_name"></el-option>
                                </el-select>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_price" title="销售单价" width="100" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template #header>
                                <span>销售单价</span><span class="requireStar">*</span>
                            </template>
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_price"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_amount" title="销售金额" width="120" align="right" header-align="center">
                            <!-- 销售单价*数量 -->
                            <!-- <template #default="{row}">
                                <span>{{countAmount(row)}}</span>
                            </template> -->
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_price_p" title="预计成本价" width="120" align="left" header-align="center">
                            <template v-slot="{row}">
                                <div class="price">
                                    <el-input type="text" size="small" class="cost-input" v-model="row.order_goods_price_p" @change="changeEstimatedPrice(row)" :disabled="row.bomInfo.length > 1"></el-input>
                                    <i class="el-icon-edit" @click="handleCostEdit(row)"></i>
                                </div>

                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_ven_name" title="供应商" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template #edit="{row}">
                                <el-select v-model="row.order_goods_ven_name" placeholder="请输入关键字选择" size="small" clearable filterable remote :remote-method="remoteVender" @change="changeVender(row)" :disabled="row.bomInfo.length > 1">
                                    <el-option v-for="item in venOptions" :key="item.trader_id" :value="item.trader_name" :label="item.trader_name"></el-option>
                                </el-select>
                            </template>
                        </vxe-table-column>

                    </vxe-table>
                </div>
            </div>

            <div class="fee-info" v-show="selectTab==2">
                <el-row>
                    <el-col :span="12">
                        <div class="fee-left">
                            <div class="class-title">
                                <div class="title">CNY费用</div>
                            </div>

                            <div class="cnTable">
                                <vxe-table ref="cnTable" border :data="cnyFee" auto-resize resizable size="small" height="362" class="mytable-scrollbar" :column-config="{minWidth:140}" :edit-config="{trigger: 'click', mode: 'cell'}" :footer-method="footerMethod2" :mouse-config="{selected: true}" :keyboard-config="{isArrow: true, isDel: false, isEnter: true, isTab: true, isEdit: true, isChecked: true,editMethod2}" show-footer show-overflow>
                                    <vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
                                    <vxe-table-column field="name" title="费用名称" header-align="center" align="left"></vxe-table-column>
                                    <vxe-table-column field="amount" title="费用金额" width="200" header-align="center" align="right" :edit-render="{name: 'ElInput',autofocus:'.el-input__inner'}">
                                        <template v-slot:edit="{ row }">
                                            <el-input v-model="row.amount" size="small" placeholder="请输入内容" clearable></el-input>
                                        </template>
                                    </vxe-table-column>
                                </vxe-table>
                            </div>
                            <div class="class-title import-tariff">
                                <div class="title">进口关税</div>
                            </div>
                            <div class="traiff">
                                <el-input placeholder="请输入" size="small" v-model="base_info.order_duty_cny" style="width:200px"></el-input>
                            </div>
                        </div>

                    </el-col>
                    <el-col :span="12">
                        <div class="fee-right">
                            <div class="class-title">
                                <div class="title">USD费用</div>
                            </div>
                            <div class="usTable">
                                <vxe-table ref="usTable" border :data="usdFee" auto-resize resizable size="small" height="362" class="mytable-scrollbar" :column-config="{minWidth:140}" :edit-config="{trigger: 'click', mode: 'cell'}" :footer-method="footerMethod3" :mouse-config="{selected: true}" :keyboard-config="{isArrow: true, isDel: false, isEnter: true, isTab: true, isEdit: true, isChecked: true,editMethod3}" show-footer show-overflow>
                                    <vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
                                    <vxe-table-column field="name" title="费用名称" header-align="center" align="left"></vxe-table-column>
                                    <vxe-table-column field="amount" title="费用金额" width="200" header-align="center" align="right" :edit-render="{name: 'ElInput',autofocus:'.el-input__inner'}">
                                        <template v-slot:edit="{ row }">
                                            <el-input v-model="row.amount" size="small" placeholder="请输入" clearable></el-input>
                                        </template>
                                    </vxe-table-column>
                                </vxe-table>
                            </div>
                        </div>

                    </el-col>
                </el-row>
            </div>

            <div class="contract" v-show="selectTab==3">
                <div class="class-title contract-head">
                    <div class="title">合同条款</div>
                    <div class="terms-select">
                        <el-select size="small" v-model="contract_code" @change="changeContract">
                            <el-option v-for="item in contractClause" :key="item.dic_code" :label="item.dic_name" :value="item.dic_code"></el-option>
                        </el-select>
                    </div>
                </div>

                <div class="contract-main">
                    <wang-editor :htmlData.sync="htmlData" @change="htmlChange"></wang-editor>
                </div>
            </div>

            <div class="other-terms" v-show="selectTab==4">
                <div class="other-btns">
                    <el-button size="mini" @click="addRow2">增行</el-button>
                    <el-button size="mini" @click="delRow2">删行</el-button>
                </div>

                <div class="other-table">
                    <vxe-table border resizable ref="otherTable" :data="otherList" show-overflow size="small" class="mytable-scrollbar" max-height="100%" auto-resize :edit-config="{trigger: 'click', mode: 'cell'}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true,editMethod4}" :mouse-config="{selected: true}">
                        <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                        <vxe-table-column type="seq" title="序号" width="60" align="center"></vxe-table-column>
                        <vxe-table-column field="type_code_name" title="结算类型" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner',autoselect: true}">
                            <template #edit="{row}">
                                <el-select size="small" clearable transfer v-model="row.type_code_name" @change="changePayTerm(row)">
                                    <el-option v-for="item in salesPayment" :key="item.lookup_code" :value="item.meaning" :label="item.meaning">
                                    </el-option>
                                </el-select>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="method_code_name" title="结算方式" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template #edit="{row}">
                                <el-select size="small" clearable transfer v-model="row.method_code_name" @change="changePayMethod(row)">
                                    <el-option v-for="item in paymentMethod" :key="item.id" :value="item.code" :label="item.code">
                                    </el-option>
                                </el-select>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="base_percentage" title="结算比列%" width="100" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.base_percentage"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="due_days" title="天数" width="120" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.due_days"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="description" title="条件描述" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.description"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="swift_code" title="SWIFT码" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.swift_code"></el-input>
                            </template>
                        </vxe-table-column>
                    </vxe-table>
                </div>

                <div class="class-title supple-info">
                    <div class="title">补充信息</div>
                </div>

                <div class="supple-main">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                        <tbody>
                            <tr>

                                <th align="center" width="120">溢装率(%)</th>
                                <td>
                                    <el-input v-model="base_info.order_over_rate" size="small" clearable></el-input>
                                </td>
                                <th align="center" width="120">短装率(%)</th>
                                <td>
                                    <el-input v-model="base_info.order_short_rate" size="small" clearable></el-input>
                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>

            <template v-slot:footer>
                <div class="m-l">
                </div>
                <div class="m-r">
                    <el-button size="small" @click="saveOrder">保存</el-button>
                    <el-button @click="closeIcon" size="small" style="margin-left:15px">取消</el-button>
                </div>
            </template>
        </vxe-modal>
        <cost-edit v-if="showCostEdit" :goodsRow.sync="goodsRow" :ebsGoods="ebsGoods" :costOptions="costOptions" :exchangeList="exchangeList" :unitObj="unitObj" :ebs_path="ebs_path" @closeCostEdit="handleCostClose" @confirmCost="costConfirm"></cost-edit>
    </div>
</template>

<script>
//行拖动
import Sortable from "sortablejs";
import costEdit from "./cost_edit.vue";
import orderApi from "@/api/cbs/order.js";
import goodsApi from "@/api/cbs/goods.js";
import omApi from "@/api/gbs/om.js";
import WangEditor from "@/components/general/wangEditor/index.vue";
import ebsApi from "../../api/gbs/ebs";

export default {
    components: {
        costEdit,
        WangEditor,
    },
    props: {
        selectOptions: {
            type: Object,
        },
        order_id: {
            type: Number,
            default: 0,
        },
        order_cus_od_code: {
            type: String,
            default: "",
        },
    },

    data() {
        return {
            show: true,
            downIcon: true,
            selectTab: 0,
            // 基本信息
            defaultProps: {
                children: "children",
                label: "title",
            },
            requireFlag: false,
            isGetProject: false,
            isCharge: true, //手续费
            base_info: {
                order_dep_id: this.$store.state.user.edep, //业务部门ID
                order_dep_name: this.$store.state.user.edepname, //业务部门名称
                order_salesman_id: this.$store.state.user.eid, //业务员ID
                order_salesman_name: this.$store.state.user.name, // 业务员名称
                order_type: "", //订单类型
                // order_business_type_id: null, //业务类型ID
                order_business_type: "", //业务类型
                order_trade_type: "", //订单贸易类型内销外销
                order_date: this.$general.getNowDate(), //接单日期
                order_title_id: 1, // 接单抬头ID
                order_title_name: "江苏国泰华盛实业有限公司", //接单抬头名称
                order_ebs_stock_id: "", //ebs库存组织ID
                order_cus_id: null, //客户ID
                order_cus_name: "", //客户全称
                order_cus_od_code: "", //客户订单号
                order_currency: "", //币种
                order_ex_rate_oc: null, //接单原币汇率
                order_ex_rate_usd: null, //美元汇率
                order_collect_mode: "", //结算方式
                order_collect_days: null, //结算天数
                order_price_clause: "", //价格条款
                order_shipping_mode: "", //运输方式
                order_port_from: "", //起运港
                order_port_to: "", //目的港
                order_lc_no: "", //信用证号
                order_lc_issue_date: null, //开证日期
                order_vat_rate: this.selectOptions.vatRate, //默认增值税率
                order_tax_refund_rate: this.selectOptions.refundRate, //默认退税率
                order_sign_place: "", //签订地
                order_invoice_mode: "", //成品发票
                order_cost_agent_fee: "", //手续费
                order_delivery_date: null, //交货期
                order_amount_oc: null, //订单金额-原币
                order_amount_usd: null, //订单金额-美元
                order_memo: "", //订单备注
                order_fee_cny: null, //人民币费用
                order_fee_usd: null, //美元费用
                order_fee_cny_detail: [], //人民币费用明细
                order_fee_usd_detail: [], //美元费用预算明细
                order_duty_cny: "", //关税成本
                order_contract_clause: "", //合同条款
                order_collect_clause: "", //付款方式
                order_over_rate: null, //短装率
                order_short_rate: null, //溢装率
            },
            cusOptions: [],
            portFromOptions: [],
            portToOptions: [],
            exchangeList: {},
            // bussinessType: [],
            ebs_path: "HS",
            goods_stock_org_id_ebs: null,
            goods_stock_org_id_ebs_hk: null,
            stockId: null,
            required: {
                order_dep_name: "业务部门名称", //业务部门名称
                order_salesman_id: "业务部门名称", //业务员ID
                order_salesman_name: "业务员名称", // 业务员名称
                order_type: "订单类型", //订单类型
                order_date: "接单日期", //接单日期
                order_title_id: "接单抬头名称", // 接单抬头ID
                order_title_name: "接单抬头名称", //接单抬头名称
                order_cus_id: "客户名称", //客户ID
                order_cus_name: "客户名称", //客户全称
                order_cus_od_code: "客户订单号", //客户订单号
                order_currency: "币种",
                order_delivery_date: "交货期", //交货期
                order_business_type: "业务类型", //业务类型
                order_contract_clause: "合同条款",
                order_collect_mode: "结算方式",
                order_collect_days: "结算天数",
                order_invoice_mode: "成品发票",
            },
            // 商品信息
            goodsList: [],
            showCostEdit: false,
            ebsGoods: [],
            unitObj: {},
            isGetUnit: false,
            unitHS: {},
            unitHK: {},
            goods_article_number: "",
            bomInfo: [], //
            order_goods_qty: null,
            goodsRow: {},
            venOptions: [],
            costOptions: {
                prepareType: [], //备货类型
                JLDW: [], //计量单位
                BZ: [], //币种
                vatRate: "", //默认增值税率
                refundRate: "", //默认退税率
                vender: [], //供应商
                category: [], //商品类别
            },

            articleNumOptions: [],
            // 费用信息
            cnyFee: [],
            usdFee: [],
            cnyDetail: [],
            usdDetail: [],
            feeList: [],
            // 合同条款
            contractClause: [], //合同条款选项
            htmlData: "",
            contract_code: "",
            // 其他条款
            otherList: [],
            salesPayment: [], //结算类型
            paymentMethod: [
                { code: "D/A", id: 14033 },
                { code: "D/P", id: 14034 },
                { code: "L/C", id: 14035 },
                { code: "T/T", id: 14036 },
                { code: "押汇", id: 14037 },
                { code: "支票_1800", id: 14038 },
                { code: "期初虚拟收款方法", id: 14039 },
                { code: "现金", id: 14040 },
                { code: "银票", id: 14042 },
                { code: "银行转账", id: 14043 },
                { code: "虚拟收款", id: 28033 },
            ], //结算方式
        };
    },
    created() {
        // this.unitHS = Object.freeze(
        //     this.$general.objectKeyBy(this.selectOptions.JLDW, "ebs_code")
        // );

        // this.unitHK = Object.freeze(
        //     this.$general.objectKeyBy(this.selectOptions.JLDW, "ebs_code_hk")
        // );

        this.findInfo();
        if (this.order_id == 0) {
            this.getExchgeList();
            this.getStockId(this.$store.state.user.edep);
            if (this.ebs_path == "HS") {
                this.base_info.order_ebs_stock_id = this.goods_stock_org_id_ebs;
            }
            if (this.ebs_path == "HK") {
                this.base_info.order_ebs_stock_id =
                    this.goods_stock_org_id_ebs_hk;
            }
        }
        this.handleCostOption();
    },
    mounted() {
        this.rowDrop();
    },
    beforeDestroy() {
        this.$refs.model1.close();
    },
    destroyed() {},
    methods: {
        closeModel() {
            this.show = false;
            this.$refs.model1.close();
            setTimeout(() => {
                this.$emit("closeOrderEdit");
            }, 500);
        },
        closeIcon() {
            this.show = false;
            this.$refs.model1.close();
            setTimeout(() => {
                this.$emit("closeIcon");
            }, 500);
        },
        screen() {
            this.$refs.model1.zoom();
            this.downIcon = !this.downIcon;
        },
        getExchgeList() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            console.log("datelalal", month, year);
            omApi.getExchangeRate(month, year).then((res) => {
                this.exchangeList = res.data;
                this.base_info.order_ex_rate_usd = this.exchangeList["USD"];
            });
        },
        changeSelectTab(tabNum) {
            if (tabNum == 1) {
                if (!this.base_info.order_cus_id) {
                    this.$message({
                        message: "请先选择客户！",
                        type: "warning",
                    });
                    return;
                }
                if (this.ebs_path == "HS") {
                    this.base_info.order_ebs_stock_id =
                        this.goods_stock_org_id_ebs;
                }
                if (this.ebs_path == "HK") {
                    this.base_info.order_ebs_stock_id =
                        this.goods_stock_org_id_ebs_hk;
                }
                console.log("stockId", this.base_info.order_ebs_stock_id);
                console.log("ebs_path", this.ebs_path);
                ebsApi
                    .getEbsGoods(
                        this.base_info.order_ebs_stock_id,
                        this.ebs_path
                    )
                    .then((res) => {
                        this.ebsGoods = res.data;
                        console.log("ebsGoods", this.ebsGoods);
                        if (this.goodsList.length > 0) {
                            this.goodsList.forEach((item) => {
                                this.$set(item, "uom_class", "");
                                this.ebsGoods.forEach((data) => {
                                    if (
                                        data.inventory_item_id ==
                                        item.order_goods_ebs_id
                                    ) {
                                        item.uom_class = data.uom_class;
                                    }
                                });
                            });
                        }
                    });
                ebsApi.getEbsData("get_unit", "", this.ebs_path).then((res) => {
                    if (res.code == 0) {
                        this.unitObj = this.$general.objectKeyBy(
                            res.data || [],
                            "uom_code"
                        );
                        this.isGetUnit = true;
                        console.log("unitObj", this.unitObj);
                    }
                });
                this.selectTab = 1;
            }
        },

        findInfo() {
            if (this.order_id !== 0) {
                orderApi.getOrderInfo(this.order_id).then((res) => {
                    console.log("编辑订单", res);
                    this.base_info = res.data.baseInfo;
                    console.log(
                        "🚀 ~ file: order_edit.vue:834 ~ orderApi.getOrderInfo ~ this.base_info.order_invoice_mode",
                        this.base_info.order_invoice_mode
                    );
                    //是否填写手续费
                    if (
                        this.base_info.order_invoice_mode == 3 ||
                        this.base_info.order_invoice_mode == 5
                    ) {
                        this.isCharge = false;
                    } else {
                        this.isCharge = true;
                    }
                    let order_date = this.base_info.order_date;
                    let year = parseInt(order_date.slice(0, 4));
                    console.log("year111", year);
                    let month = parseInt(order_date.slice(5, 7));
                    console.log("month111", month);
                    omApi.getExchangeRate(month, year).then((res) => {
                        this.exchangeList = res.data;
                    });
                    let order_dep_id = this.base_info.order_dep_id;
                    this.getStockId(order_dep_id);

                    let order_title_id = this.base_info.order_title_id;
                    if (order_title_id) {
                        if (order_title_id == 4) {
                            this.ebs_path = "HK";
                            this.base_info.order_ebs_stock_id =
                                this.goods_stock_org_id_ebs_hk;
                        } else {
                            this.ebs_path = "HS";
                            this.base_info.order_ebs_stock_id =
                                this.goods_stock_org_id_ebs;
                        }
                    }
                    // ebsApi
                    //     .getEbsData("get_tradetype", "", this.ebs_path)
                    //     .then((result) => {
                    //         if (result.code == 0) {
                    //             this.bussinessType = result.data || [];
                    //         }
                    //     });
                    ebsApi
                        .getEbsData("get_sales_payment", "", this.ebs_path)
                        .then((result) => {
                            if (result.code == 0) {
                                this.salesPayment = result.data || [];
                                this.handlePayment();
                            }
                        });

                    let order_project_id = this.base_info.order_project_id;
                    if (!order_project_id) {
                        this.isGetProject = false;
                    } else {
                        this.isGetProject = true;
                    }

                    this.goodsList = res.data.goodsInfo;
                    this.goodsList.sort(function (a, b) {
                        return (
                            a.order_goods_row_number - b.order_goods_row_number
                        );
                    });

                    this.goodsList.forEach((item) => {
                        if (
                            item.bomInfo.length == 1 ||
                            item.bomInfo.length == 0
                        ) {
                            item.order_goods_has_bom = 2;
                        }
                        if (item.bomInfo.length > 1) {
                            item.order_goods_has_bom = 1;
                        }
                    });

                    this.htmlData = this.base_info.order_contract_clause;
                    if (this.base_info.order_trade_type) {
                        if (this.base_info.order_trade_type == "内销") {
                            this.contractClause =
                                this.selectOptions.tradeClause;
                            this.requireFlag = false;
                        } else if (this.base_info.order_trade_type == "外销") {
                            this.contractClause =
                                this.selectOptions.exportClause;
                            this.requireFlag = true;
                        }
                    }

                    this.cnyDetail = this.base_info.order_fee_cny_detail;
                    this.usdDetail = this.base_info.order_fee_usd_detail;
                    this.getBmBsFee();
                });
            } else {
                this.getBmBsFee();
                // ebsApi.getEbsData("get_tradetype", "", "HS").then((result) => {
                //     if (result.code == 0) {
                //         this.bussinessType = result.data || [];
                //     }
                // });
                ebsApi
                    .getEbsData("get_sales_payment", "", "HS")
                    .then((result) => {
                        if (result.code == 0) {
                            this.salesPayment = result.data || [];
                        }
                    });
            }
        },
        handlePayment() {
            if (this.base_info.order_collect_clause) {
                this.otherList = JSON.parse(
                    this.base_info.order_collect_clause
                );
                this.otherList.forEach((item) => {
                    this.$set(item, "type_code_name", "");
                    this.$set(item, "method_code_name", "");
                    this.salesPayment.forEach((data) => {
                        if (data.lookup_code == item.receipt_type_code) {
                            item.type_code_name = data.meaning;
                        }
                    });
                    this.paymentMethod.forEach((data2) => {
                        if (data2.id == item.receipt_method_code) {
                            item.method_code_name = data2.code;
                        }
                    });
                });
            }
        },
        handleCostOption() {
            this.costOptions.prepareType = this.selectOptions.prepareType;
            this.costOptions.JLDW = this.selectOptions.JLDW;
            this.costOptions.BZ = this.selectOptions.BZ;
            this.costOptions.vatRate = this.selectOptions.vatRate;
            this.costOptions.refundRate = this.selectOptions.refundRate;
            this.costOptions.vender = this.selectOptions.vender;
            this.costOptions.category = this.selectOptions.category;
            this.costOptions = Object.freeze(this.costOptions);
        },
        // 基本信息
        depClick(data) {
            console.log("depclick", data);
            if (data.end) {
                this.base_info.order_dep_id = data.value;
                this.base_info.order_dep_name = data.title;
                this.base_info.order_salesman_id = null;
                this.base_info.order_salesman_name = "";
                this.$refs.depSelect2.handleClose();
                this.goods_stock_org_id_ebs = data.dep_ebs_org_id;
                this.goods_stock_org_id_ebs_hk = data.dep_ebs_org_id_hk;
                if (this.ebs_path == "HS") {
                    this.base_info.order_ebs_stock_id =
                        this.goods_stock_org_id_ebs;
                }
                if (this.ebs_path == "HK") {
                    this.base_info.order_ebs_stock_id =
                        this.goods_stock_org_id_ebs_hk;
                }
            }
        },
        clearDep() {
            // this.$refs.listTree.setCheckedKeys([]);
            this.base_info.order_dep_id = null;
            this.base_info.order_dep_name = null;
        },
        getStockId(depId) {
            if (depId) {
                this.selectOptions.dep.forEach((item) => {
                    let children = item.children;
                    if (children && children.length > 0) {
                        children.forEach((data) => {
                            if (data.dep_id == depId) {
                                this.goods_stock_org_id_ebs =
                                    data.dep_ebs_org_id;
                                this.goods_stock_org_id_ebs_hk =
                                    data.dep_ebs_org_id_hk;
                            }
                        });
                    } else {
                        if (item.dep_id == depId) {
                            this.goods_stock_org_id_ebs = item.dep_ebs_org_id;
                            this.goods_stock_org_id_ebs_hk =
                                item.dep_ebs_org_id_hk;
                        }
                    }
                });
            }
        },
        changeSales(value) {
            if (value) {
                this.selectOptions.sales.forEach((item) => {
                    if (item.staff_name == value) {
                        this.base_info.order_salesman_id = item.staff_id;
                    }
                });
            } else {
                this.base_info.order_salesman_id = null;
            }
        },
        changeBZ(value) {
            // 根据1、币种 2、接单日期 显示当月汇率
            if (value) {
                if (this.base_info.order_date && this.exchangeList !== {}) {
                    this.base_info.order_ex_rate_oc = this.exchangeList[value];
                }
            }
        },
        changeDate(value) {
            if (value) {
                console.log("接单日期", value);
                let year = parseInt(value.slice(0, 4));
                console.log("year", year);
                let month = parseInt(value.slice(5, 7));
                console.log("month", month);
                omApi.getExchangeRate(month, year).then((res) => {
                    console.log(res);
                    this.exchangeList = res.data;
                    if (
                        this.base_info.order_currency &&
                        this.base_info.order_currency !== ""
                    ) {
                        this.base_info.order_ex_rate_oc =
                            this.exchangeList[this.base_info.order_currency];
                    }
                    this.base_info.order_ex_rate_usd = this.exchangeList["USD"];
                });
            }
        },
        changeType(value) {
            if (value) {
                if (value == "TRADE") {
                    this.base_info.order_trade_type = "内销";
                    this.contractClause = this.selectOptions.tradeClause;
                    this.base_info.order_sign_place = "张家港";
                    this.requireFlag = false;
                } else {
                    this.base_info.order_trade_type = "外销";
                    this.contractClause = this.selectOptions.exportClause;
                    this.base_info.order_sign_place = "zhangjiagang";
                    this.requireFlag = true;
                }

                this.base_info.order_contract_clause = "";
                this.htmlData = "";
            }
        },
        remoteCustomer(query) {
            if (query !== "") {
                this.cusOptions = this.selectOptions.allCus.filter((item) => {
                    return (
                        item.trader_name
                            .toLowerCase()
                            .indexOf(query.toLowerCase()) > -1
                    );
                });
            } else {
                this.cusOptions = [];
            }
        },
        changeCustomer(value) {
            if (value) {
                this.selectOptions.allCus.forEach((item) => {
                    if (value == item.trader_name) {
                        this.base_info.order_cus_id = item.trader_id;
                        let currency = item.trader_msg_cus_ex.Currency;
                        if (
                            this.exchangeList !== {} &&
                            !this.base_info.order_currency
                        ) {
                            if (currency) {
                                this.base_info.order_currency = currency;
                                this.base_info.order_ex_rate_oc =
                                    this.exchangeList[currency];
                            }
                        }
                        let priceClause = item.trader_msg_cus_ex.PriceClause;
                        if (priceClause) {
                            this.base_info.order_price_clause = priceClause;
                        }
                        let collectMode = item.trader_msg_cus_ex.Collect;
                        if (collectMode) {
                            this.base_info.order_collect_mode = collectMode;
                        }
                        let collectDays = item.trader_msg_cus_ex.Days;
                        if (collectDays) {
                            this.base_info.order_collect_days = collectDays;
                        }
                        let trade_type = item.trader_msg_cus_ex.trade_type;
                        if (trade_type) {
                            this.base_info.order_business_type = trade_type;
                        }
                    }
                });
            } else {
                this.base_info.order_cus_id = null;
            }
        },
        changeTitle(value) {
            if (value) {
                this.selectOptions.allTitle.forEach((item) => {
                    if (value == item.title_id) {
                        this.base_info.order_title_name = item.title;
                    }
                });
                if (value == 4) {
                    this.ebs_path = "HK";
                    this.base_info.order_ebs_stock_id =
                        this.goods_stock_org_id_ebs_hk;
                } else {
                    this.ebs_path = "HS";
                    this.base_info.order_ebs_stock_id =
                        this.goods_stock_org_id_ebs;
                }
                // ebsApi
                //     .getEbsData("get_tradetype", "", this.ebs_path)
                //     .then((result) => {
                //         if (result.code == 0) {
                //             this.bussinessType = result.data || [];
                //         }
                //     });
                ebsApi
                    .getEbsData("get_sales_payment", "", this.ebs_path)
                    .then((result) => {
                        if (result.code == 0) {
                            this.salesPayment = result.data || [];
                        }
                    });
            } else {
                this.base_info.order_title_name = "";
            }
        },
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
        changeInvoice(value) {
            this.base_info.order_cost_agent_fee = null;
            if (value == 3 || value == 5) {
                this.isCharge = false;
            } else {
                this.isCharge = true;
            }
        },

        // 商品信息

        delRow() {
            if (this.goodsList.length > 0) {
                const table = this.$refs.goodsTable;
                const selectRecords = table.getCheckboxRecords();
                console.log("sel", selectRecords);
                if (selectRecords.length > 0) {
                    this.$confirm("确定要删除商品信息?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                        .then(() => {
                            this.$refs.goodsTable.removeCheckboxRow();
                            selectRecords.forEach((data) => {
                                this.goodsList = this.goodsList.filter(
                                    (item) => {
                                        return item !== data;
                                    }
                                );
                            });
                            console.log("删除后的goodsList", this.goodsList);
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                        })
                        .catch(() => {
                            this.$message({
                                type: "info",
                                message: "已取消删除",
                            });
                        });
                } else {
                    this.$message({
                        type: "warning",
                        message: "请勾选要删除的行！",
                    });
                }
            }
        },
        addRow() {
            let obj = {
                order_goods_row_number: null, //行号
                order_goods_article_number: null, //货号
                order_goods_archives_id: null, //商品档案ID
                order_goods_name: "", //中文品名
                order_goods_name_en: "", //英文品名
                order_goods_ebs_name: "", //ebs商品名称
                order_goods_ebs_id: null, //ebs商品ID
                uom_class: "", //ebs商品类别
                order_goods_spec: "", //规格
                order_goods_unit: "", //单位
                order_goods_unit_code: "", //单位编码
                order_goods_qty: null, //销售数量
                order_goods_price: null, //销售单价
                order_goods_amount: null, //销售金额
                order_goods_price_p: "", //预计成本价
                bomInfo: [], //cbm_order_goods_bom
                order_goods_has_bom: 1,
                order_goods_ven_name: "", //供应商名称
                order_goods_ven_id: null, //供应商ID
            };
            this.goodsList.push(obj);
        },
        editMethod({ row, column }) {
            const $table = this.$refs.goodsTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        activeCellMethod({ row, column, columnIndex }) {
            if (
                ["order_goods_unit", "order_goods_price_p"].includes(
                    column.property
                )
            ) {
                if (!row.order_goods_article_number) {
                    this.$message({
                        message: "请先填写货号！",
                        type: "error",
                    });
                    return false;
                } else {
                    return true;
                }
            }
            return true;
        },
        //行拖拽
        rowDrop() {
            this.$nextTick(() => {
                const xTable = this.$refs.goodsTable;
                this.sortable1 = Sortable.create(
                    xTable.$el.querySelector(
                        ".body--wrapper>.vxe-table--body tbody"
                    ),
                    {
                        handle: ".drag-btn",
                        onEnd: ({ newIndex, oldIndex }) => {
                            const currRow = this.goodsList.splice(
                                oldIndex,
                                1
                            )[0];
                            this.goodsList.splice(newIndex, 0, currRow);
                        },
                    }
                );
            });
        },

        handleCostClose() {
            this.showCostEdit = false;
        },
        changeArticleNum(row) {
            if (row.order_goods_article_number) {
                goodsApi
                    .getByArticleNum(row.order_goods_article_number)
                    .then((res) => {
                        console.log("dingdong", res);
                        let baseInfo = res.data.baseInfo;
                        row.order_goods_archives_id = baseInfo.goods_id;
                        row.order_goods_name = baseInfo.goods_name;
                        row.order_goods_name_en = baseInfo.goods_name_en;
                        row.order_goods_spec = baseInfo.goods_sale_spec;
                        row.order_goods_unit = baseInfo.goods_sale_unit;
                        row.order_goods_unit_code =
                            baseInfo.goods_sale_unit_code;

                        row.order_goods_qty = null; //销售数量
                        row.order_goods_price = null; //销售单价
                        row.order_goods_amount = null; //销售金额
                        row.order_goods_price_p = ""; //预计成本价
                        row.order_goods_ven_name = ""; //供应商名称
                        row.order_goods_ven_id = null; //供应商id
                        row.order_goods_ebs_name = ""; //ebs商品名称
                        row.order_goods_ebs_id = null; //ebs商品ID
                        row.uom_class = ""; //ebs商品类别
                        row.bomInfo = [];

                        // let bomInfo = res.data.bomInfo;

                        if (row.bomInfo.length == 0) {
                            row.order_goods_has_bom = 2;

                            let costObj = {
                                // order_goods_bom_archives_id: "", //商品id
                                order_goods_bom_type: "01", //备货类型
                                order_goods_bom_type_name: "境内采购", //备货类型标签名
                                order_goods_bom_article_number: "", //采购货号
                                order_goods_bom_name: "", //中文品名
                                order_goods_bom_name_en: "", //英文品名
                                order_goods_bom_spec: "", //采购规格
                                order_goods_bom_quota_qty: 1, //定额数量
                                order_goods_bom_qty: "", //采购数量xxx
                                order_goods_bom_unit: "", //采购单位
                                order_goods_bom_unit_code: "", //采购单位编码
                                order_goods_bom_price: "", //采购单价
                                order_goods_bom_currency: "CNY", //采购币种
                                order_goods_bom_ex_rate: 1, //采购汇率
                                order_goods_bom_amount: "", //采购金额
                                order_goods_bom_vat_rate:
                                    this.selectOptions.vatRate, //增值税率
                                order_goods_bom_tax_refund_rate:
                                    this.selectOptions.refundRate, //退税率
                                order_goods_bom_ven_name: "", //供应商名称
                                order_goods_bom_ven_id: "", //供应商ID
                                order_goods_bom_class: "成品", //商品类别
                                order_goods_bom_ebs_id: null, //ebs商品ID
                                order_goods_bom_ebs_name: "", //ebs商品名称
                                uom_class: "", //ebs商品类别
                            };
                            costObj.order_goods_bom_article_number =
                                row.order_goods_article_number;
                            costObj.order_goods_bom_name = row.order_goods_name;
                            costObj.order_goods_bom_name_en =
                                row.order_goods_name_en;
                            costObj.order_goods_bom_spec = row.order_goods_spec;
                            costObj.order_goods_bom_unit = row.order_goods_unit;
                            costObj.order_goods_bom_unit_code =
                                row.order_goods_unit_code;
                            costObj.order_goods_bom_qty =
                                Number(row.order_goods_qty) *
                                Number(costObj.order_goods_bom_quota_qty);
                            costObj.order_goods_bom_ven_name =
                                row.order_goods_ven_name;
                            costObj.order_goods_bom_ven_id =
                                row.order_goods_ven_id;

                            row.bomInfo.push(costObj);
                        }
                    });
            }
        },
        changeGoodsQty(row) {
            // 不管此商品有没有BOM,所有的采购数量=销售数量*定额数量
            // 采购金额=采购单价*采购数量*汇率
            if (row.bomInfo.length > 0) {
                row.bomInfo.forEach((item) => {
                    if (Number(item.order_goods_bom_quota_qty) !== 0) {
                        item.order_goods_bom_qty =
                            Number(row.order_goods_qty) *
                            Number(item.order_goods_bom_quota_qty);
                    }
                    item.order_goods_bom_amount =
                        Number(item.order_goods_bom_qty) *
                        Number(item.order_goods_bom_price) *
                        Number(item.order_goods_bom_ex_rate);
                });
            }
        },
        changeGoodsSpec(row) {
            if (row.bomInfo.length == 1) {
                row.bomInfo[0].order_goods_bom_spec = row.order_goods_spec;
            }
        },
        changeGoodsName(row) {
            if (row.bomInfo.length == 1) {
                row.bomInfo[0].order_goods_bom_name = row.order_goods_name;
            }
        },
        changeGoodsNameEn(row) {
            if (row.bomInfo.length == 1) {
                row.bomInfo[0].order_goods_bom_name_en =
                    row.order_goods_name_en;
            }
        },
        changeEBSGoods(row) {
            // let label = this.$refs.mySelected.selected.label;
            // let index = label.indexOf("|");
            // let segment1 = label.slice(index + 1);
            this.ebsGoods.forEach((item) => {
                if (item.inventory_item_id == row.order_goods_ebs_id) {
                    row.order_goods_ebs_name = item.description;
                    row.uom_class = item.uom_class;
                    console.log("uom_class", row.uom_class);
                    if (row.bomInfo.length == 1) {
                        row.bomInfo[0].order_goods_bom_ebs_name =
                            row.order_goods_ebs_name;
                        row.bomInfo[0].order_goods_bom_ebs_id =
                            row.order_goods_ebs_id;
                    }

                    this.selectOptions.JLDW.forEach((data) => {
                        if (this.ebs_path == "HS") {
                            if (item.primary_uom_code == data.ebs_code) {
                                row.order_goods_unit = data.dic_name;
                                row.order_goods_unit_code = data.dic_code;
                                if (row.bomInfo.length == 1) {
                                    row.bomInfo[0].order_goods_bom_unit =
                                        row.order_goods_unit;
                                    row.bomInfo[0].order_goods_bom_unit_code =
                                        row.order_goods_unit_code;
                                }
                            }
                        }
                        if (this.ebs_path == "HK") {
                            if (item.primary_uom_code == data.ebs_code_hk) {
                                row.order_goods_unit = data.dic_name;
                                row.order_goods_unit_code = data.dic_code;
                                if (row.bomInfo.length == 1) {
                                    row.bomInfo[0].order_goods_bom_unit =
                                        row.order_goods_unit;
                                    row.bomInfo[0].order_goods_bom_unit_code =
                                        row.order_goods_unit_code;
                                }
                            }
                        }
                    });
                }
            });
        },
        changeEstimatedPrice(row) {
            console.log("成本价改变啦");
            if (row.bomInfo.length == 1) {
                row.bomInfo[0].order_goods_bom_price = row.order_goods_price_p;
                if (Number(row.bomInfo[0].order_goods_bom_quota_qty) !== 0) {
                    row.bomInfo[0].order_goods_bom_amount =
                        Number(row.bomInfo[0].order_goods_bom_qty) *
                        Number(row.bomInfo[0].order_goods_bom_price) *
                        Number(row.bomInfo[0].order_goods_bom_ex_rate);
                }
            }
        },
        remoteVender(query) {
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
        changeVender(row) {
            this.selectOptions.vender.forEach((data) => {
                if (data.trader_name == row.order_goods_ven_name) {
                    row.order_goods_ven_id = data.trader_id;
                    if (row.bomInfo.length == 1) {
                        row.bomInfo[0].order_goods_bom_ven_name =
                            row.order_goods_ven_name;
                        row.bomInfo[0].order_goods_bom_ven_id =
                            row.order_goods_ven_id;
                    }
                }
            });
        },
        chengeGoodsUnit(row) {
            console.log("danwei", row);

            if (row.bomInfo.length == 1) {
                row.bomInfo[0].order_goods_bom_unit = row.order_goods_unit;
            }
            this.selectOptions.JLDW.forEach((data) => {
                if (data.dic_name == row.order_goods_unit) {
                    row.order_goods_unit_code = data.dic_code;

                    if (row.bomInfo.length == 1) {
                        row.bomInfo[0].order_goods_bom_unit_code =
                            row.order_goods_unit_code;
                    }
                }
            });
        },
        // 在值发生改变时更新表尾合计
        updateFooterEvent() {
            const $table = this.$refs.goodsTable;
            $table.updateFooter();
        },
        footerRowClassName({ $rowIndex }) {
            if ($rowIndex == 0) {
                return "footer-style";
            }
        },
        footerMethod1({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex === 3) {
                        return "合计";
                    }
                    if (["order_goods_qty"].includes(column.property)) {
                        return this.sumNum(data, column.property);
                    } else if (
                        ["order_goods_amount"].includes(column.property)
                    ) {
                        return this.countAllamount(data);
                    }
                    return null;
                }),
            ];
        },
        sumNum(list, field) {
            let count = 0;
            list.forEach((item) => {
                count += Number(item[field]);
            });

            return this.$general.toDecimal2(count);
        },
        countAmount(row) {
            let count = 0;
            count = Number(row.order_goods_qty) * Number(row.order_goods_price);
            row.order_goods_amount = this.$general.toDecimal2(count);
            return count;
        },
        countAllamount(data) {
            let count = 0;
            data.forEach((item) => {
                count += Number(this.countAmount(item));
            });
            return this.$general.toDecimal2(count);
        },
        handleCostEdit(row) {
            console.log("rowedit", row);
            if (!row.order_goods_qty) {
                this.$message({
                    message: "请先填写销售数量！",
                    type: "warning",
                });
                return;
            }
            this.goodsRow = row;
            console.log("那一行的数据", this.goodsRow);

            this.showCostEdit = true;
        },
        costConfirm(payload) {
            console.log("cost信息", payload);
            let amount = 0;
            for (let i = 0; i < payload.bomInfo.length; i++) {
                amount =
                    payload.bomInfo[i].order_goods_bom_ex_rate *
                        payload.bomInfo[i].order_goods_bom_amount +
                    amount;
            }

            this.goodsList.forEach((item) => {
                if (item == this.goodsRow) {
                    item.order_goods_price_p = parseFloat(
                        amount / item.order_goods_qty
                    ).toFixed(3);
                    item.bomInfo = payload.bomInfo;
                }
            });
        },

        // 费用信息
        async getBmBsFee() {
            // let condition = [];
            let res = await omApi.getBmBsFee();
            console.log("fee", res);
            let feeList = res.data;
            let cnyList = [];
            let usdList = [];

            feeList.forEach((item) => {
                if (item.bs_fee_currency == "CNY") {
                    cnyList.push(item);
                } else if (item.bs_fee_currency == "USD") {
                    usdList.push(item);
                }
            });

            cnyList.sort(function (a, b) {
                return a.bs_fee_code - b.bs_fee_code;
            });
            usdList.sort(function (a, b) {
                return a.bs_fee_code - b.bs_fee_code;
            });
            console.log("排序", cnyList, usdList);

            // 直接用cnyFee展示，提交的时候重新弄个数组this.order_fee_cny_detail=[],把name、amount提交出去
            // 展示的时候先处理数据，用baseInfo.order_fee_cny_detail的name匹配bs_fee_name，name.indexOf(bs_fee_name),填进去name、amount
            this.handleFee(cnyList, this.cnyFee);
            this.handleFee(usdList, this.usdFee);
            console.log(this.cnyFee, this.usdFee);

            if (this.order_id !== 0) {
                this.fillFeeList(this.cnyDetail, this.cnyFee);
                this.fillFeeList(this.usdDetail, this.usdFee);
            }
        },
        fillFeeList(feeDetail, feeList) {
            for (let i = 0; i < feeDetail.length; i++) {
                for (let j = 0; j < feeList.length; j++) {
                    if (feeDetail[i].name == feeList[j].name) {
                        feeList[j].amount = feeDetail[i].amount;
                        break;
                    }
                }
            }
        },
        handleFee(dataList, currencyList) {
            dataList.forEach((item) => {
                let arr = item.bs_fee_name.split("：");

                let obj = {
                    name: "",
                    amount: "",
                    bs_fee_code: "",
                    bs_fee_currency: "",
                    bs_fee_name: "",
                };
                obj.name = arr[1];
                obj.bs_fee_code = item.bs_fee_code;
                obj.bs_fee_currency = item.bs_fee_currency;
                obj.bs_fee_name = item.bs_fee_name;
                currencyList.push(obj);
            });
        },
        editMethod2({ row, column }) {
            const $table = this.$refs.cnyTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        editMethod3({ row, column }) {
            const $table = this.$refs.usdTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        sumNum1(list, field) {
            let count = 0;
            list.forEach((item) => {
                count += Number(item[field]);
            });
            this.base_info.order_fee_cny = this.$general.toDecimal2(count);
            return this.$general.toDecimal2(count);
        },
        sumNum2(list, field) {
            let count = 0;
            list.forEach((item) => {
                count += Number(item[field]);
            });
            this.base_info.order_fee_usd = this.$general.toDecimal2(count);
            return this.$general.toDecimal2(count);
        },

        footerMethod2({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex === 1) {
                        return "合计";
                    }
                    if (["amount"].includes(column.property)) {
                        return this.sumNum1(data, column.property);
                    }
                    return null;
                }),
            ];
        },
        footerMethod3({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex === 1) {
                        return "合计";
                    }
                    if (["amount"].includes(column.property)) {
                        return this.sumNum2(data, column.property);
                    }
                    return null;
                }),
            ];
        },
        // 合同条款
        htmlChange(data) {
            this.base_info.order_contract_clause = data;
        },
        changeContract(value) {
            if (value) {
                this.contractClause.forEach((item) => {
                    if (item.dic_code == value) {
                        if (this.base_info.order_trade_type == "外销") {
                            let children = item.children;
                            console.log(children);
                            let str = "";
                            children.forEach((data) => {
                                if (data.dic_code == "TY_HTTK-SC_E-01-2") {
                                    let value = data.value;
                                    str += "<p>" + value + "</p>";
                                } else if (
                                    data.dic_code == "TY_HTTK-SC_E-02-3"
                                ) {
                                    let memo = data.memo;
                                    str += "<p>" + memo + "</p>";
                                } else {
                                    let content = data.content;
                                    str += "<p>" + content + "</p>";
                                }
                            });
                            str = str.replace(
                                "{$port_of_shipment}",
                                this.base_info.order_port_from
                            );
                            str = str.replace(
                                "{$port_of_destination}",
                                this.base_info.order_port_to
                            );
                            this.htmlData = str;
                        } else if (this.base_info.order_trade_type == "内销") {
                            let children = item.children;
                            let str = "";
                            children.forEach((data) => {
                                if (data.dic_code == "TY_HTTK-SC_I-01-93") {
                                    let value = data.value;
                                    let index = value.indexOf("乙");
                                    let value1 = value.slice(0, index);
                                    let value2 = value.slice(index);
                                    str +=
                                        "<p>" +
                                        value1 +
                                        "</p>" +
                                        "<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                                        value2 +
                                        "</p>";
                                } else if (
                                    data.dic_code == "TY_HTTK-SC_I-01-3"
                                ) {
                                    let value = data.value;
                                    let index = value.indexOf(":");
                                    let index1 = parseInt(index) + 1;
                                    let index2 = parseInt(index1) + 1;
                                    let value1 = value.slice(0, index1);
                                    let value2 = value.slice(index2);
                                    str +=
                                        "<p>" +
                                        value1 +
                                        "</p>" +
                                        "<p>" +
                                        value2 +
                                        "</p>";
                                } else {
                                    let content = data.content;
                                    str += "<p>" + content + "</p>";
                                }
                            });
                            this.htmlData = str;
                        }
                    }
                });
            }
        },
        // 其他条款
        editMethod4({ row, column }) {
            const $table = this.$refs.otherTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        addRow2() {
            let obj = {
                so_header_id: "",
                receipt_type_code: "", // 结算类型
                type_code_name: "", //结算类型标签名
                receipt_method_code: "", // 结算方式
                method_code_name: "", //结算方式标签名
                base_percentage: null, // 结算比例%
                due_days: null, // 天数
                description: "", // 条件描述
                swift_code: "", // SWIFT码
                sequence_no: null,
                created_by: "",
            };
            this.otherList.push(obj);
        },
        delRow2() {
            if (this.otherList.length > 0) {
                const table = this.$refs.otherTable;
                const selectRecords = table.getCheckboxRecords();
                console.log("sel", selectRecords);
                if (selectRecords.length > 0) {
                    this.$confirm("确定要删除条款信息行?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                        .then(() => {
                            this.$refs.otherTable.removeCheckboxRow();
                            selectRecords.forEach((data) => {
                                this.otherList = this.otherList.filter(
                                    (item) => {
                                        return item !== data;
                                    }
                                );
                            });
                            console.log("删除后的otherList", this.otherList);
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                        })
                        .catch(() => {
                            this.$message({
                                type: "info",
                                message: "已取消删除",
                            });
                        });
                } else {
                    this.$message({
                        type: "warning",
                        message: "请勾选要删除的行！",
                    });
                }
            }
        },
        changePayTerm(row) {
            this.salesPayment.forEach((item) => {
                if (row.type_code_name == item.meaning) {
                    row.receipt_type_code = item.lookup_code;
                }
            });
        },
        changePayMethod(row) {
            this.paymentMethod.forEach((item) => {
                if (row.method_code_name == item.code) {
                    row.receipt_method_code = item.id;
                }
            });
        },

        // 保存
        feeSave(feeList) {
            let updateList = [];
            feeList.forEach((item) => {
                let obj = {
                    name: "",
                    amount: "",
                    code: "",
                };
                obj.name = item.name;
                obj.amount = item.amount;
                obj.code = item.bs_fee_code;
                updateList.push(obj);
            });
            return updateList;
        },
        handleSave() {
            this.base_info.order_fee_cny_detail = this.feeSave(this.cnyFee);
            this.base_info.order_fee_usd_detail = this.feeSave(this.usdFee);
            console.log(
                "feeSave",
                this.base_info.order_fee_cny_detail,
                this.base_info.order_fee_usd_detail
            );
            this.base_info.order_collect_days = parseInt(
                this.base_info.order_collect_days
            );
            if (this.goodsList.length > 0) {
                this.goodsList.forEach((item, index) => {
                    item.order_goods_row_number = index + 1;
                    item.bomInfo.forEach((data) => {
                        if (data.order_goods_bom_type_name) {
                            delete data.order_goods_bom_type_name;
                        }
                    });
                });
            }
        },

        saveOrder() {
            for (let key in this.required) {
                if (!this.base_info[key]) {
                    this.$message({
                        message: "请填写" + `${this.required[key]}` + "!",
                        type: "error",
                    });
                    return;
                }
            }

            if (this.base_info.order_trade_type == "外销") {
                if (!this.base_info.order_price_clause) {
                    this.$message({
                        message: "请填写价格条款!",
                        type: "error",
                    });
                    return;
                }
                if (!this.base_info.order_shipping_mode) {
                    this.$message({
                        message: "请填写运输方式!",
                        type: "error",
                    });
                    return;
                }
                if (!this.base_info.order_port_from) {
                    this.$message({
                        message: "请填写起运港!",
                        type: "error",
                    });
                    return;
                }
                if (!this.base_info.order_port_to) {
                    this.$message({
                        message: "请填写目的港!",
                        type: "error",
                    });
                    return;
                }
            }

            if (this.goodsList.length == 0) {
                this.$message({
                    message: "请填写商品信息页面!",
                    type: "error",
                });
                return;
            }
            if (this.goodsList.length > 0) {
                for (let i = 0; i < this.goodsList.length; i++) {
                    if (!this.goodsList[i].order_goods_article_number) {
                        this.$message({
                            message:
                                "请选择商品信息页第 " + (i + 1) + " 行的货号！",
                            type: "warning",
                        });
                        return;
                    }
                    if (
                        !this.goodsList[i].order_goods_ebs_id ||
                        !this.goodsList[i].order_goods_ebs_name
                    ) {
                        this.$message({
                            message:
                                "请选择商品信息页第 " +
                                (i + 1) +
                                " 行的EBS商品！",
                            type: "warning",
                        });
                        return;
                    }
                    if (
                        !this.goodsList[i].order_goods_qty ||
                        this.goodsList[i].order_goods_qty.trim() == ""
                    ) {
                        this.$message({
                            message:
                                "请填写商品信息页第 " +
                                (i + 1) +
                                " 行的销售数量！",
                            type: "warning",
                        });
                        return;
                    }
                    if (
                        !this.goodsList[i].order_goods_price ||
                        this.goodsList[i].order_goods_price.trim() == ""
                    ) {
                        this.$message({
                            message:
                                "请填写商品信息页第 " +
                                (i + 1) +
                                " 行的销售单价！",
                            type: "warning",
                        });
                        return;
                    }
                }
                if (this.base_info.order_trade_type == "外销") {
                    for (let i = 0; i < this.goodsList.length; i++) {
                        if (!this.goodsList[i].order_goods_article_number) {
                            this.$message({
                                message:
                                    "请选择商品信息页第 " +
                                    (i + 1) +
                                    " 行的货号！",
                                type: "warning",
                            });
                            return;
                        }
                        if (
                            this.goodsList[i].order_goods_name_en.trim() == ""
                        ) {
                            this.$message({
                                message:
                                    "请填写商品信息页第 " +
                                    (i + 1) +
                                    " 行的英文品名！",
                                type: "warning",
                            });
                            return;
                        }
                    }
                }
            }
            if (this.otherList.length > 0) {
                let count = 0;
                this.otherList.forEach((item, index) => {
                    item.sequence_no = index + 1;
                    count += Number(item.base_percentage);
                });
                if (count !== 100) {
                    this.$message({
                        message: "其他条款:结算比例之和必须等于100!",
                        type: "warning",
                    });
                    return;
                } else {
                    this.otherList.forEach((item) => {
                        delete item._XID;
                        delete item.type_code_name;
                        delete item.method_code_name;
                    });
                    this.base_info.order_collect_clause = JSON.stringify(
                        this.otherList
                    );
                    // console.log("otherList", this.otherList);
                }
            } else {
                this.$message({
                    message: "请填写其他条款!",
                    type: "error",
                });
                return;
            }

            // if (this.base_info.order_collect_mode == "L/C") {
            //     if (!this.base_info.order_lc_no) {
            //         this.$message({
            //             message: "请填写信用证号!",
            //             type: "error",
            //         });
            //         return;
            //     }
            //     if (!this.base_info.order_lc_issue_date) {
            //         this.$message({
            //             message: "请填写开证日期!",
            //             type: "error",
            //         });
            //         return;
            //     }
            // }
            if (!this.htmlData) {
                this.$message({
                    message: "请填写合同条款!",
                    type: "error",
                });
                return;
            }

            console.log("baocun", this.cnyFee);
            this.handleSave();

            console.log("保存的base_info", this.base_info);
            console.log("保存的goodsList", this.goodsList);

            orderApi
                .updateOrderInfo(this.base_info, this.goodsList)
                .then((res) => {
                    if (res.code == 0) {
                        this.$message({
                            message: "保存订单信息成功！",
                            type: "success",
                        });
                        this.closeModel();
                    }
                });
        },
    },
    watch: {
        "base_info.order_cus_id": {
            handler(newVal, oldVal) {
                if (newVal) {
                    goodsApi.getarticleNumList(newVal).then((res) => {
                        console.log("商品信息-货号", res);
                        this.articleNumOptions = res.data;
                    });
                }
            },
            immediate: true,
            deep: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.basic-info {
    margin-top: 15px;
    padding: 0 3px;
    .table-body {
        margin-top: 15px;
        table.definition tbody tr th {
            height: 26px;
        }
        table.definition tbody tr td {
            height: 26px;
        }
    }
}

.goods-info {
    margin-top: 15px;
    height: 80%;
    .class-title {
        .btns {
            margin-top: 5px;
        }
    }
    .goods-table {
        margin-top: 20px;
        height: 100%;
    }
}
.fee-info {
    margin-top: 15px;
    .import-tariff {
        margin-top: 15px;
    }
    .fee-left {
        padding-right: 10px;
    }
    .fee-right {
        padding-left: 10px;
    }
}

.contract {
    .contract-head {
        margin-top: 15px;
        position: relative;
        .terms-select {
            position: absolute;
            right: 3px;
            top: -3px;
        }
    }
    .contract-main {
        margin-top: 15px;
        >>> .w-e-text-container {
            height: 350px !important; /*!important是重点，因为原div是行内样式设置的高度300px*/
        }
    }
}
.price {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .cost-input {
        margin-right: 5px;
    }
    i {
        color: green;
        font-size: 16px;
        margin-left: 5px;
    }
}
>>> .footer-style {
    font-weight: 600;
}
.other-terms {
    margin-top: 15px;
    height: 320px;

    .other-btns {
        display: flex;
        justify-content: flex-end;
        margin: 15px 0;
    }
    .other-table {
        height: 100%;
    }
}
.supple-info {
    margin-top: 15px;
}
.supple-main {
    width: 600px;
}
.requireStar {
    color: red;
    margin-left: 5px;
    font-size: 16px;
}
</style>