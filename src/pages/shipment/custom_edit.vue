<template>
    <div class="wrap">
        <vxe-modal ref="model1" v-model="show" width="1200" resize height="650" show-footer destroy-on-close>
            <template v-slot:header>
                <div>出运报关编辑</div>
                <div class="model-header-r">
                    报关单号：{{base_info.shc_code}}
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
                <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectTab = 1">通知明细</div>
                <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectTab = 2">报关明细</div>
                <div class="tabs-col" :class="{ show: selectTab == 3 }" @click="selectTab = 3">报关附件</div>
            </div>

            <div class="base-info" v-show="selectTab==0">
                <!-- <div class="class-title">
                    <div class="title">基本信息</div>
                </div> -->
                <el-row>
                    <el-col :span="8" class="col1">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                            <tbody>
                                <tr>
                                    <th width="100" align="center">运编号</th>
                                    <td>
                                        <el-input v-model="base_info.shc_invoice_no" disabled></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">业务部门</th>
                                    <td>
                                        <el-input v-model="base_info.shc_dep_name" clearable disabled></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center"><span>*</span>单证员</th>
                                    <td>
                                        <el-select v-model="base_info.shc_document_id" filterable size="small" clearable @clear="clearDocument">
                                            <el-option v-for="item in selectOptions.documentPeople" @click.native="changeDocument(item)" :key="item.staff_id" :label="item.staff_name" :value="item.staff_id">
                                            </el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">单证报关证号</th>
                                    <td>
                                        <el-input v-model="base_info.shc_document_no" clearable></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">单证电话</th>
                                    <td>
                                        <el-input v-model="base_info.shc_document_tel" clearable></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">船务</th>
                                    <td>
                                        <el-select v-model="base_info.shc_ship_id" filterable size="small" clearable @clear="base_info.shc_ship_id = '';base_info.shc_ship_name = ''">
                                            <el-option v-for="item in selectOptions.shipPeople" @click.native="changeShip(item)" :key="item.staff_id" :label="item.staff_name" :value="item.staff_id">
                                            </el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">境内发货人</th>
                                    <td>
                                        <el-input v-model="base_info.shc_title_name" clearable disabled title="出运抬头"></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">企业税号</th>
                                    <td>
                                        <el-input v-model="base_info.shc_title_tax_code" clearable></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">企业海关编码</th>
                                    <td>
                                        <el-input v-model="base_info.shc_title_custom_code" clearable></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">结算客户</th>
                                    <td>
                                        <el-select :title="base_info.shc_cus_name" v-model="base_info.shc_cus_id" size="small" filterable clearable @clear="clearConCus">
                                            <el-option v-for="item in selectOptions.allCus" :key="item.trader_id" @click.native="changeConCus(item)" :label="item.trader_name" :value="item.trader_id"></el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">境外收货人</th>
                                    <td>
                                        <el-select :title="base_info.shc_consignee_name" v-model="base_info.shc_consignee_id" size="small" filterable clearable @clear="base_info.shc_consignee_id = null;base_info.shn_consignee_name=''; base_info.shc_consignee_addr_tel='';">
                                            <el-option v-for="item in selectOptions.allCus" :key="item.trader_id" @click.native="changeConTitle(item)" :label="item.trader_name" :value="item.trader_id"></el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr height="95">
                                    <th align="center">收货地址/电话</th>
                                    <td>
                                        <el-input v-model="base_info.shc_consignee_addr_tel" type="textarea" clearable></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">出境关别</th>
                                    <td>
                                        <el-input v-model="base_info.shc_exit_customs" clearable></el-input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                    <el-col :span="8" class="col2">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                            <tbody>
                                <tr>
                                    <th width="120" align="center">申报日期</th>
                                    <td colspan="3">
                                        <el-date-picker v-model="base_info.shc_custom_date" type="date" placeholder="选择日期" size="small" value-format="yyyy-MM-dd"></el-date-picker>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">备案号</th>
                                    <td colspan="3">
                                        <el-input v-model="base_info.shc_record_no" clearable></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">运输方式</th>
                                    <td colspan="3">
                                        <el-select v-model="base_info.shc_shipping_mode" clearable size="small">
                                            <el-option v-for="item in selectOptions.YSFS" :key="item.dic_code" :label="item.dic_name" :value="item.dic_name"></el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">运输工具/航班次号</th>
                                    <td colspan="3">
                                        <el-input v-model="base_info.shc_ship_name_no" clearable></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">提运单号</th>
                                    <td colspan="3">
                                        <el-input v-model="base_info.shc_lading_bill_no" clearable></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">许可证号</th>
                                    <td colspan="3">
                                        <el-input v-model="base_info.shc_license_no" clearable></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">贸易国/地区</th>
                                    <td colspan="3">
                                        <el-select v-model="base_info.shc_country_trade" filterable clearable size="small">
                                            <el-option v-for="item in selectOptions.country" :key="item.cCountryNameE" :label="item.cCountryNameE + '('+item.cCountryName+')'" :value="item.cCountryName"></el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">运抵国/地区</th>
                                    <td colspan="3">
                                        <el-select v-model="base_info.shc_country_to" filterable clearable size="small">
                                            <el-option v-for="item in selectOptions.country" :key="item.cCountryNameE" :label="item.cCountryNameE  + '('+item.cCountryName+')'" :value="item.cCountryName"></el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">目的港</th>
                                    <td colspan="3">
                                        <el-select v-model="base_info.shc_prot_to" size="small" clearable filterable placeholder="请输入关键词选择" remote :remote-method="remotePortTo">
                                            <el-option v-for="item in portToOptions" :key="item.port_code" :label="`${item.port_name_en}-${item.port_name}`" :value="item.port_name_en"></el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">离境口岸</th>
                                    <td colspan="3">
                                        <el-select v-model="base_info.shc_port_from" size="small" clearable filterable placeholder="请输入关键词选择" remote :remote-method="remotePortFrom">
                                            <el-option v-for="item in portFromOptions" :key="item.port_code" :label="`${item.port_name_en}-${item.port_name}`" :value="item.port_name_en"></el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">预计船期</th>
                                    <td colspan="3">
                                        <el-input v-model="base_info.shc_ship_date_e" clearable disabled></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">实际船期</th>
                                    <td colspan="3">
                                        <el-date-picker v-model="base_info.shc_ship_date_a" type="date" placeholder="选择日期" size="small" value-format="yyyy-MM-dd"></el-date-picker>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">征免性质</th>
                                    <td colspan="3">
                                        <el-input v-model="base_info.shc_tax_property" clearable></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="center">结算方式</th>
                                    <td width="80">
                                        <el-input v-model="base_info.shc_collect_mode" disabled></el-input>
                                    </td>
                                    <td>
                                        <el-input v-model="base_info.shc_collect_days"></el-input>
                                    </td>
                                    <td width="50" align="center">天</td>
                                </tr>
                                <tr>
                                    <th align="center">贸易方式</th>
                                    <td colspan="3">
                                        <el-select v-model="base_info.shc_business_type" size="small" filterable clearable>
                                            <el-option v-for="item in selectOptions.tradeMode" :key="item.dic_code" :label="item.dic_name" :value="item.dic_name">
                                            </el-option>
                                        </el-select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>

                    <el-col :span="8" class="col3">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                            <tbody>
                                <tr>
                                    <th width="100" align="center">包装方式</th>
                                    <td>
                                        <el-input v-model="base_info.shc_pack_mode" clearable></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th></th>
                                    <td class="count-btn">
                                        <div>
                                            <el-button size="mini" @click="setDefaultCustomSum">默认报关明细包装毛净体合计</el-button>
                                        </div>
                                    </td>

                                </tr>
                                <tr>
                                    <th width="100" align="center"><span>*</span>包装件数</th>
                                    <td>
                                        <el-input v-model="base_info.shc_pack_num" clearable></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th width="100" align="center"><span>*</span>毛重KGS</th>
                                    <td>
                                        <el-input v-model="base_info.shc_weight_g" clearable></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th width="100" align="center"><span>*</span>净重KGS</th>
                                    <td>
                                        <el-input v-model="base_info.shc_weight_n" clearable></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th width="100" align="center"><span>*</span>体积CBM</th>
                                    <td>
                                        <el-input v-model="base_info.shc_volume" clearable></el-input>
                                    </td>
                                </tr>
                                <tr height="63">
                                    <th width="100" align="center">随附单证及编号</th>
                                    <td>
                                        <el-input type="textarea" v-model="base_info.shc_documnet_no" clearable></el-input>
                                    </td>
                                </tr>
                                <tr height="96">
                                    <th width="100" align="center">标记唛码及备注</th>
                                    <td>
                                        <el-input type="textarea" v-model="base_info.shc_mark" clearable></el-input>
                                    </td>
                                </tr>

                                <tr>
                                    <th width="100" align="center">价格条款</th>
                                    <td>
                                        <el-input v-model="base_info.shc_price_clause" disabled></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th width="100" align="center">报关币种</th>
                                    <td>
                                        <el-input v-model="base_info.shc_currency" disabled></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th width="100" align="center">保费费率</th>
                                    <td>
                                        <el-input v-model="base_info.shc_insurance_rate" placeholder="请填写保费费率" clearable></el-input>
                                    </td>
                                </tr>
                                <tr>
                                    <th width="100" align="center">保费</th>
                                    <td>
                                        <el-tooltip class="item" effect="dark" content="注：保费 = (报关单金额 × 1.1 × 保费费率)" placement="top-start">
                                            <el-input v-model="base_info.shc_insurance" clearable disabled></el-input>
                                        </el-tooltip>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </el-col>

                </el-row>
            </div>

            <div class="note-detail" v-show="selectTab==1">
                <div class="class-title">
                    <div class="m-l" style="margin-left: 10px;">
                        币种：{{base_info.shc_currency}}
                    </div>
                    <div class="class-r">
                        <el-dropdown>
                            <el-button size="small" style="margin-left: 5px;">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="updateNoteDetail">更新通知明细</el-dropdown-item>
                                <el-dropdown-item @click.native="deleteNoteDetail">删行</el-dropdown-item>
                                <el-dropdown-item @click.native="createCustomDetail">导入到报关明细</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>

                <div class="note-table">
                    <vxe-table border ref="noteTable" :data="noteDetail" size="small" class="mytable-scrollbar" max-height="100%" auto-resize resizable show-footer :footer-method="footerMethod1" show-overflow :column-config="{minWidth:100}" :mouse-config="{selected: true}" :keyboard-config="{isArrow: true, isDel: false, isEnter: true, isTab: true, isEdit: true, isChecked: true}" :edit-config="{trigger: 'click', mode: 'cell'}">
                        <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                        <vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
                        <vxe-table-column field="shnd_prj_no_ebs" title="项目号" width="120" header-align="center">
                        </vxe-table-column>
                        <vxe-table-column field="shnd_po_no" title="订单号" width="120" header-align="center">
                        </vxe-table-column>
                        <vxe-table-column field="shnd_article_number" title="货号" width="120" header-align="center">
                        </vxe-table-column>
                        <vxe-table-column field="shnd_goods_name" title="中文品名" width="120" header-align="center">
                        </vxe-table-column>
                        <vxe-table-column field="shnd_goods_name_en" title="英文品名" width="140" header-align="center">
                        </vxe-table-column>
                        <vxe-table-column field="shnd_goods_spec" title="规格" width="140" header-align="center">
                        </vxe-table-column>
                        <vxe-table-column field="shnd_unit" title="单位" width="60" align="center"></vxe-table-column>
                        <vxe-table-column field="shnd_qty_a" title="实际出运数量" width="100" header-align="center" align="right" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shnd_qty_a" clearable></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shnd_price_a" title="实际单价" width="100" align="center" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shnd_price_a" clearable></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shnd_carton_num_a" title="实际箱数" width="100" header-align="center" align="right" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shnd_carton_num_a" clearable></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shnd_volume_a" title="实际体积CBM" width="100" header-align="center" align="right" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shnd_volume_a" clearable></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shnd_weight_g_a" title="实际毛重KGS" width="100" header-align="center" align="right" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shnd_weight_g_a" clearable></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shnd_weight_n_a" title="实际净重KGS" width="100" header-align="center" align="right" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shnd_weight_n_a" clearable></el-input>
                            </template>
                        </vxe-table-column>

                        <vxe-table-column field="shnd_amount_a" title="实际金额" width="100" header-align="center" align="right">
                            <template v-slot="{row}">
                                {{countAmount(row)}}
                            </template>
                        </vxe-table-column>

                    </vxe-table>
                </div>
            </div>

            <div class="custom-detail" v-show="selectTab==2">
                <div class="class-title">
                    <div class="m-l" style="margin-left: 10px;">
                        币种：{{base_info.shc_currency}}
                    </div>
                    <div class="class-r">
                        <el-button size="small" @click="mergeCustomDetail">按商品名称+货号+单价合并</el-button>

                        <el-dropdown>
                            <el-button size="small" style="margin-left: 5px;">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="addCustomDetail">新增</el-dropdown-item>
                                <el-dropdown-item @click.native="copyCustomDetail">复制</el-dropdown-item>
                                <el-dropdown-item @click.native="deleteCustomDetail">删除</el-dropdown-item>
                                <el-dropdown-item @click.native="showSetFromPage">批量设置</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>

                <div class="custom-table">
                    <vxe-table border ref="customTable" :data="cusDetail" size="small" class="mytable-scrollbar" max-height="100%" auto-resize resizable show-footer :scroll-y="{enabled: false}" :footer-method="footerMethod2" :column-config="{minWidth:100}" :mouse-config="{selected: true}" :keyboard-config="{isArrow: true, isDel: false, isEnter: true, isTab: true, isEdit: true, isChecked: true}" :edit-config="{trigger: 'click', mode: 'cell'}">
                        <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                        <vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
                        <vxe-table-column field="shcd_hscode" title="海关编码" width="120" header-align="center" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shcd_hscode" clearable></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shcd_po_no" title="订单号" width="140" header-align="center" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shcd_po_no" clearable></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shcd_bom_name" title="报关品名-规格" width="140" header-align="center" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shcd_bom_name" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" clearable></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shcd_bom_name_en" title="英文报关品名-规格" width="140" header-align="center" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shcd_bom_name_en" type="textarea" :autosize="{ minRows: 3, maxRows: 4}" clearable></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shcd_article_number" title="货号" width="100" header-align="center" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shcd_article_number" clearable></el-input>
                            </template>
                        </vxe-table-column>

                        <vxe-table-column field="shcd_qty_a" title="实际出运数量" width="100" header-align="center" align="right" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shcd_qty_a" clearable></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shcd_unit" title="计量单位" width="70" align="center" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shcd_unit" clearable></el-input>
                            </template>
                        </vxe-table-column>

                        <vxe-table-column field="shcd_price_a" title="实际单价" width="100" align="center" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shcd_price_a" clearable></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shcd_amount_a" title="实际金额" width="100" header-align="center" align="right">
                            <template v-slot="{row}">
                                <span> {{countAmount2(row)}} </span>

                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shcd_carton_num_a" title="实际箱数" width="100" header-align="center" align="right" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shcd_carton_num_a" clearable @change="changeCarton"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shcd_volume" title="实际体积CBM" width="100" header-align="center" align="right" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shcd_volume" clearable @change="changeVolume"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shcd_weight_g" title="实际毛重KGS" width="100" header-align="center" align="right" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shcd_weight_g" clearable @change="changeWeightG"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shcd_weight_n" title="实际净重KGS" width="100" header-align="center" align="right" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shcd_weight_n" clearable @change="changeWeightN"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shcd_country_origin" title="原产国/地区" width="100" header-align="center" align="center" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shcd_country_origin" clearable></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shcd_country_to" title="目的国/地区" width="100" header-align="center" align="center" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shcd_country_to" clearable></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shcd_source_city" title="境内货源地" width="100" header-align="center" align="center" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shcd_source_city" clearable></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shcd_tax_property" title="征免" width="100" header-align="center" align="center" :edit-render="{ autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" v-model="row.shcd_tax_property" clearable></el-input>
                            </template>
                        </vxe-table-column>

                    </vxe-table>
                </div>
            </div>

            <div class="attach-wrap" v-show="selectTab==3">
                <div class="custom-attach">
                    <div class="class-title">
                        <div class="m-l" style="margin-left: 10px;">
                            报关附件
                        </div>
                    </div>
                    <div class="custom-list">
                        <sy-attach :mode="1" :object_name="'cbm_ship_custom'" :object_keyid="shc_id" :attach_class="attach_class">
                        </sy-attach>
                    </div>
                </div>

                <div class="note-attach">
                    <div class="class-title">
                        <div class="m-l" style="margin-left: 10px;">
                            通知附件
                        </div>
                    </div>
                    <div class="note-list">
                        <sy-attach v-if="this.shn_ids.length > 0" :mode="1" :object_name="'cbm_ship_note'" :object_keyid="(this.shn_ids || []).join(',')" :attach_class="[]" :read_only="true"></sy-attach>
                    </div>
                </div>

            </div>

            <template v-slot:footer>
                <div class="m-l">
                </div>
                <div class="m-r">
                    <el-button size="small" @click="saveCustom">保存</el-button>
                    <el-button @click="closeIcon" size="small" style="margin-left:15px">取消</el-button>
                </div>
            </template>
        </vxe-modal>
        <syMultipleSet :show.sync="modal1" :dataset="fieldsFrom" @on-ok="setSelectRowsValue"></syMultipleSet>

    </div>
</template>

<script>
import shipApi from "@/api/cbs/ship.js";

export default {
    props: {
        selectOptions: {
            type: Object,
        },
        shc_id: {
            type: Number,
        },
        cus_state: {
            type: Number,
        },
    },
    data() {
        return {
            show: true,
            downIcon: true,
            selectTab: 0,
            portToOptions: [],
            portFromOptions: [],
            base_info: {
                shc_code: "", //报关单号
                shc_invoice_no: "", // 运编号
                shc_dep_name: "", // 业务部门
                shc_dep_id: "", // 业务部门ID
                shc_document_name: "", // 单证员
                shc_document_id: "", // 单证员ID
                shc_document_no: "", // 单证报关证号
                shc_document_tel: null, // 单证电话
                shc_ship_id: null, // 船务ID
                shc_ship_name: "", // 船务姓名
                shc_title_name: "", // 境内发货人（出运抬头）
                shc_title: null, //出运抬头ID
                shc_title_tax_code: "", // 企业税号
                shc_title_custom_code: "", // 企业海关编码
                shc_cus_name: "", // 结算客户
                shc_cus_id: "", // 结算客户ID
                shc_consignee_name: "", // 境外收货人
                shc_consignee_id: "", // 境外收货人ID
                shc_consignee_addr_tel: "", // 收货地址、电话
                shc_exit_customs: "", // 出境关别
                shc_ship_date_a: null, // 出口日期(实际船期)
                shc_custom_date: null, // 申报日期
                shc_record_no: "", // 备案号
                shc_shipping_mode: "", // 运输方式
                shc_ship_name_no: "", // 运输工具/航班
                shc_lading_bill_no: "", // 提运单号
                shc_license_no: "", // 许可证号
                shc_country_trade: "", // 贸易国/地区
                shc_country_to: "", // 抵运国/地区
                shc_prot_to: "", // 目的港
                shc_port_from: "", // 离境口岸
                shc_ship_date_e: null, // 预计船期
                shc_ship_date_a: null, // 实际船期
                shc_tax_property: "", // 征免性质
                shc_collect_mode: "", // 结算方式
                shc_collect_days: "", // 天数
                shc_business_type: "", // 贸易方式
                shc_pack_mode: "", // 包装方式
                shc_pack_num: null, // 包装件数
                shc_weight_g: null, // 毛重KGS
                shc_weight_n: null, // 净重KGS
                shc_volume: null, // 体积CBM
                shc_documnet_no: "", // 随附单证及编号
                shc_mark: "", // 标记唛码及备注
                shc_price_clause: "", // 价格条款
                shc_currency: "", // 报关币种
                shc_amount: 0, //报关金额
                shc_insurance_rate: null, // 保费费率
                shc_insurance: "", // 保费
            },

            required: {
                shc_document_name: "单证员",
                shc_pack_num: "包装件数",
                shc_weight_g: "毛重",
                shc_weight_n: "净重",
                shc_volume: "体积",
            },

            // 通知明细
            noteDetail: [],

            // 报关明细
            cusDetail: [],
            fieldsFrom: [],
            modal1: false,

            // 报关附件
            attach_class: ["报关资料"],
        };
    },
    created() {
        this.getCusInfo();
    },
    computed: {
        shn_ids() {
            return this.$XEUtils.uniq(
                this.$XEUtils.pluck(this.noteDetail, "shnd_shn_id")
            );
        },
    },
    methods: {
        closeModel() {
            this.show = false;
            this.$refs.model1.close();
            setTimeout(() => {
                this.$emit("closeCustom");
            }, 500);
        },
        closeIcon() {
            this.show = false;
            this.$refs.model1.close();
            setTimeout(() => {
                this.$emit("closeCusIcon");
            }, 500);
        },
        screen() {
            this.$refs.model1.zoom();
            this.downIcon = !this.downIcon;
        },
        getCusInfo() {
            shipApi.getCustomInfo(this.shc_id).then((res) => {
                if (res.code == 0) {
                    console.log("报关单详情", res);
                    this.base_info = res.data.baseInfo;
                    this.noteDetail = res.data.noteDetail;
                    this.cusDetail = res.data.shcDetail;
                    this.$parent.query();

                    if (this.cus_state == 1) {
                        this.$message({
                            message:
                                "报关单生成成功!   " +
                                "编码为" +
                                this.base_info.shc_code,
                            type: "success",
                        });
                    }
                }
            });
        },
        clearDocument() {
            this.base_info.shc_document_id = null;
            this.base_info.shc_document_name = "";
        },
        // 单证人员选择
        changeDocument(item) {
            this.base_info.shc_document_id = item.staff_id;
            this.base_info.shc_document_name = item.staff_name;
            this.base_info.shc_document_no = "";
            this.base_info.shc_document_tel = item.staff_work_mobile;
        },
        // 船务人员选择
        changeShip(item) {
            this.base_info.shc_ship_id = item.staff_id;
            this.base_info.shc_ship_name = item.staff_name;
        },
        // 收货人
        changeConTitle(item) {
            //console.log(item)
            this.base_info.shc_consignee_id = item.trader_id;
            this.base_info.shc_consignee_name = item.trader_name;
            this.base_info.shc_consignee_addr_tel =
                item.trader_msg_title["Address"] || "";
        },
        // 结算客户
        changeConCus(item) {
            this.base_info.shc_cus_id = item.trader_id;
            this.base_info.shc_cus_name = item.trader_name;
            this.changeConTitle(item);
        },
        clearConCus() {
            this.base_info.shc_cus_id = null;
            this.base_info.shc_cus_name = "";
            this.base_info.shc_consignee_id = null;
            this.base_info.shc_consignee_name = "";
            this.base_info.shc_consignee_addr_tel = "";
        },
        // 目的港
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
        // 起运港
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
        // 毛净体合计
        setDefaultCustomSum() {
            this.base_info.shc_pack_num = 0;
            this.base_info.shc_weight_g = 0;
            this.base_info.shc_weight_n = 0;
            this.base_info.shc_volume = 0;

            let clist = this.cusDetail || [];

            for (let i = 0; i < clist.length; i++) {
                this.base_info.shc_pack_num += Number(
                    clist[i]["shcd_carton_num_a"] || 0
                );

                this.base_info.shc_weight_g += Number(
                    clist[i]["shcd_weight_g"] || 0
                );
                this.base_info.shc_weight_n += Number(
                    clist[i]["shcd_weight_n"] || 0
                );
                this.base_info.shc_volume += Number(
                    clist[i]["shcd_volume"] || 0
                );
            }

            this.base_info.shc_weight_g =
                this.base_info.shc_weight_g.toFixed(3);
            this.base_info.shc_weight_n =
                this.base_info.shc_weight_n.toFixed(3);
            this.base_info.shc_volume = this.base_info.shc_volume.toFixed(3);
        },

        // 通知明细

        // 更新出运明细
        updateNoteDetail() {
            let ids = this.shn_ids || [];
            // 遍历出运通知ID，获取对应出运通知明细的数据
            this.addNoteDetails(ids, 0);
        },
        addNoteDetails(ids, i) {
            if (i >= ids.length) return;

            shipApi.getShipInfo(ids[i]).then((res) => {
                if (res.code == 0) {
                    let noteBase = res.data.baseInfo;
                    let noteDetail = res.data.detailInfo;
                    if (i == 0) {
                        this.base_info.shc_invoice_no =
                            noteBase.shn_invoice_no_ebs;
                    }
                    let details = noteDetail || [];
                    for (let j = 0; j < details.length; j++) {
                        // 判断是否已关联报关，没有关联的，增加到本报关单
                        if (!details[j]["shnd_shc_id"]) {
                            details[j].shnd_shc_id = this.base_info.shc_id;
                            details[j].shnd_qty_a = details[j].shnd_qty_e;
                            details[j].shnd_price_a = details[j].shnd_price_e;
                            details[j].shnd_amount_a = details[j].shnd_amount_e;

                            details[j].shnd_carton_num_a =
                                details[j].shnd_carton_num_e;
                            details[j].shnd_volume_a = details[j].shnd_volume_e;
                            details[j].shnd_weight_g_a =
                                details[j].shnd_weight_g_e;
                            details[j].shnd_weight_n_a =
                                details[j].shnd_weight_n_e;

                            this.noteDetail.push(details[j]);
                        }
                    }
                }
                this.addNoteDetails(ids, i + 1);
            });
        },
        // 删除出运明细
        deleteNoteDetail() {
            let selectedRows = this.$refs.noteTable.getCheckboxRecords(true);
            if (selectedRows.length < 1) {
                this.$message({
                    message: "请勾选通知明细记录",
                    type: "warning",
                });
                return false;
            }

            for (let i = selectedRows.length - 1; i >= 0; i--) {
                let n = this.$refs.noteTable.getRowIndex(selectedRows[i]);
                this.noteDetail.splice(n, 1);
            }
        },

        // 出运明细填写实际出运数量和单价，计算实际出运金额
        countAmount(row) {
            let count = 0;
            count = Number(row.shnd_qty_a) * Number(row.shnd_price_a);
            row.shnd_amount_a = this.$general.toDecimal2(count);
            return this.$XEUtils.commafy(this.$general.toDecimal2(count));
        },
        // 出运明细表格合计
        footerMethod1({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex === 2) {
                        return "合计";
                    }

                    if (column.property == "shnd_amount_a") {
                        return this.$XEUtils.commafy(
                            this.$XEUtils.sum(data, column.property),
                            {
                                digits: 2,
                            }
                        );
                    } else if (column.property == "shnd_qty_a") {
                        return this.$XEUtils.commafy(
                            this.$XEUtils.sum(data, column.property),
                            {
                                digits: 2,
                            }
                        );
                    }

                    return null;
                }),
            ];
        },
        // 导入到报关明细
        createCustomDetail() {
            if (!this.noteDetail || this.noteDetail.length == 0) {
                this.$message({
                    message: " 没有可导入的出运通知明细!",
                    type: "info",
                });
                return;
            }

            const noteDetails = this.noteDetail;

            for (let i = 0; i < noteDetails.length; i++) {
                if (
                    Number(noteDetails[i].shnd_qty_a) <= 0 ||
                    Number(noteDetails[i].shnd_price_a) <= 0
                ) {
                    this.$message({
                        message: " 实际出运数量和单价必须填写!",
                        type: "info",
                    });
                    return;
                }
            }

            // 先清除报关明细记录
            this.cusDetail = [];
            let tempData = [];

            let added = 0;
            for (let i = 0; i < noteDetails.length; i++) {
                added = 0;
                for (let j = 0; j < tempData.length; j++) {
                    if (
                        noteDetails[i].shnd_order_goods_id ==
                            tempData[j].odg_id &&
                        noteDetails[i].shnd_price_a == tempData[j].shcd_price_a
                    ) {
                        tempData[j]["shcd_qty_a"] =
                            parseInt(tempData[j]["shcd_qty_a"]) +
                            parseInt(noteDetails[i]["shnd_qty_a"]);
                        tempData[j]["shcd_amount_a"] = (
                            parseFloat(tempData[j]["shcd_amount_a"]) +
                            parseFloat(noteDetails[i]["shnd_amount_a"])
                        ).toFixed(2);

                        tempData[j]["shcd_carton_num_a"] =
                            parseFloat(tempData[j]["shcd_carton_num_a"]) +
                            parseFloat(
                                noteDetails[i]["shnd_carton_num_a"] || 0
                            );
                        tempData[j]["shcd_volume"] = (
                            parseFloat(tempData[j]["shcd_volume"]) +
                            parseFloat(noteDetails[i]["shnd_volume_a"] || 0)
                        ).toFixed(2);
                        tempData[j]["shcd_weight_g"] = (
                            parseFloat(tempData[j]["shcd_weight_g"]) +
                            parseFloat(noteDetails[i]["shnd_weight_g_a"] || 0)
                        ).toFixed(2);
                        tempData[j]["shcd_weight_n"] = (
                            parseFloat(tempData[j]["shcd_weight_n"]) +
                            parseFloat(noteDetails[i]["shnd_weight_n_a"] || 0)
                        ).toFixed(2);

                        added = 1;
                        break;
                    }
                }

                if (added == 0) {
                    tempData.push({
                        odg_id: noteDetails[i].shnd_order_goods_id,
                        shcd_id: null,
                        shcd_no: null,
                        shcd_shc_id: this.shc_id,
                        shcd_po_no: noteDetails[i]["shnd_po_no"],
                        shcd_hscode: "",
                        shcd_article_number: noteDetails[i].shnd_article_number,
                        shcd_bom_name_en: noteDetails[i]["shnd_goods_name_en"],
                        shcd_bom_name: noteDetails[i]["shnd_goods_name"],

                        shcd_qty_a: noteDetails[i]["shnd_qty_a"],
                        shcd_unit: noteDetails[i]["shnd_unit"],

                        shcd_price_a: noteDetails[i]["shnd_price_a"],
                        shcd_amount_a: noteDetails[i]["shnd_amount_a"],

                        shcd_country_origin: "",
                        shcd_country_to: "",
                        shcd_source_city: "",
                        shcd_tax_property: "照章征税",
                        shcd_declare: "",

                        shcd_carton_num_a:
                            noteDetails[i]["shnd_carton_num_a"] || 0,
                        shcd_volume: noteDetails[i]["shnd_volume_a"] || 0,
                        shcd_weight_g: noteDetails[i]["shnd_weight_g_a"] || 0,
                        shcd_weight_n: noteDetails[i]["shnd_weight_n_a"] || 0,
                    });
                }
            }

            this.cusDetail = tempData;
            console.log("cusDetail", this.cusDetail);

            this.selectTab = 2;
        },

        // 报关明细
        // 报关明细表格合计
        footerMethod2({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex === 2) {
                        return "合计";
                    }
                    if (
                        ["shcd_amount_a", "shcd_qty_a"].indexOf(
                            column.property
                        ) > -1
                    ) {
                        return this.$XEUtils.commafy(
                            this.$XEUtils.sum(data, column.property),
                            {
                                digits: 2,
                            }
                        );
                    }
                    if (
                        [
                            "shcd_volume",
                            "shcd_weight_g",
                            "shcd_weight_n",
                        ].indexOf(column.property) > -1
                    ) {
                        return this.$XEUtils.commafy(
                            this.$XEUtils.sum(data, column.property),
                            {
                                digits: 3,
                            }
                        );
                    }

                    return null;
                }),
            ];
        },

        countAmount2(row) {
            // shcd_qty_a shcd_price_a shcd_amount_a
            let count = 0;
            count = Number(row.shcd_qty_a) * Number(row.shcd_price_a);
            row.shcd_amount_a = this.$general.toDecimal2(count);
            return this.$XEUtils.commafy(this.$general.toDecimal2(count));
        },

        // 新增
        addCustomDetail() {
            this.cusDetail.push({
                shcd_id: null,
                shcd_no: null,
                shcd_shc_id: this.shc_id,
                shcd_hscode: "",
                shcd_bom_name: "",
                shcd_article_number: "",
                shcd_qty_a: null,
                shcd_unit: "件",
                shcd_price_a: null,
                shcd_amount_a: null,
                shcd_country_origin: "",
                shcd_country_to: "",
                shcd_source_city: "",
                shcd_tax_property: "照章征税",
                shcd_declare: "",
                shcd_carton_num_a: 0,
                shcd_volume: 0,
                shcd_weight_g: 0,
                shcd_weight_n: 0,
            });
        },
        getCheckedRow() {
            let selectedRows = this.$refs.customTable.getCheckboxRecords(true);
            if (selectedRows.length < 1) {
                this.$message({ message: "请勾选行记录！ ", type: "warning" });
                return [];
            }
            return selectedRows;
        },
        // 复制
        copyCustomDetail() {
            let selectedRows = this.getCheckedRow();
            if (selectedRows.length < 1) return;

            let copy_row = {};
            for (let i = 0; i < selectedRows.length; i++) {
                copy_row = this.$general.deepClone(selectedRows[i]);
                copy_row.shcd_id = null;
                copy_row._XID = copy_row._XID + "_1";
                this.cusDetail.push(copy_row);
            }
        },
        // 删除
        deleteCustomDetail() {
            let selectedRows = this.getCheckedRow();
            if (selectedRows.length < 1) return;

            for (let i = selectedRows.length - 1; i >= 0; i--) {
                this.cusDetail.splice(
                    this.$refs.customTable.getRowIndex(selectedRows[i]),
                    1
                );
            }
        },
        // 改变箱数
        changeCarton() {
            let count = 0;
            this.cusDetail.forEach((item) => {
                count += Number(item.shcd_carton_num_a);
            });
            this.base_info.shc_pack_num = count;
        },
        // 改变体积
        changeVolume() {
            let count = 0;
            this.cusDetail.forEach((item) => {
                count += Number(item.shcd_volume);
            });
            this.base_info.shc_volume = parseFloat(count).toFixed(3);
        },
        // 改变毛重
        changeWeightG() {
            let count = 0;
            this.cusDetail.forEach((item) => {
                count += Number(item.shcd_weight_g);
            });
            this.base_info.shc_weight_g = parseFloat(count).toFixed(3);
        },
        // 改变净重
        changeWeightN() {
            let count = 0;
            this.cusDetail.forEach((item) => {
                count += Number(item.shcd_weight_n);
            });
            this.base_info.shc_weight_n = parseFloat(count).toFixed(3);
        },
        // 批量设置
        // 显示批量设置弹出层
        showSetFromPage() {
            let selectedRows = this.getCheckedRow();
            if (selectedRows.length < 1) return;

            this.fieldsFrom = [
                {
                    field: "shcd_country_origin",
                    title: "原产国/地区",
                    type: "text",
                    value: "",
                },
                {
                    field: "shcd_country_to",
                    title: "目的国/地区",
                    type: "text",
                    value: "",
                },
                {
                    field: "shcd_source_city",
                    title: "境内货源地",
                    type: "text",
                    value: "",
                },
                {
                    field: "shcd_tax_property",
                    title: "征免",
                    type: "text",
                    value: "",
                },
            ];

            this.modal1 = true;
        },

        // 批量设置处理
        setSelectRowsValue(backData) {
            let selectedRows = this.$refs.customTable.getCheckboxRecords(true);

            let rowIndex = 0;
            this.$XEUtils.arrayEach(selectedRows, (row) => {
                // 获取选中行的对应数据集索引号
                rowIndex = this.$refs.customTable.getRowIndex(row);
                // 批量设置对应的字段值
                for (let i = 0; i < backData.length; i++) {
                    this.cusDetail[rowIndex][backData[i].field] =
                        backData[i].value;
                }
            });

            this.modal1 = false;
        },
        // 按商品名称+货号+单价合并 报关明细

        mergeCustomDetail() {
            if (!this.cusDetail || this.cusDetail.length == 0) {
                return;
            }
            const customDetails = this.cusDetail;

            // 合并前必须填写商品名称及规格信号、货号、单价
            for (let k = 0; k < customDetails.length; k++) {
                if (
                    !customDetails[k]["shcd_bom_name"] ||
                    !customDetails[k]["shcd_article_number"] ||
                    !customDetails[k]["shcd_price_a"]
                ) {
                    this.$message({
                        message: "合并前必须填写商品名称、货号、单价",
                        type: "info",
                    });
                    return;
                }
            }

            // 先清除报关明细记录
            this.cusDetail = [];

            let tempData = [];
            let added = 0;
            for (let i = 0; i < customDetails.length; i++) {
                added = 0;
                for (let j = 0; j < tempData.length; j++) {
                    if (
                        customDetails[i].shcd_bom_name ==
                            tempData[j].shcd_bom_name &&
                        customDetails[i].shcd_article_number ==
                            tempData[j].shcd_article_number &&
                        parseFloat(customDetails[i].shcd_price_a) ==
                            parseFloat(customDetails[j].shcd_price_a)
                    ) {
                        tempData[j]["shcd_qty_a"] = (
                            parseFloat(tempData[j]["shcd_qty_a"]) +
                            parseFloat(customDetails[i]["shcd_qty_a"])
                        ).toFixed(2);
                        tempData[j]["shcd_amount_a"] = (
                            parseFloat(tempData[j]["shcd_amount_a"]) +
                            parseFloat(customDetails[i]["shcd_amount_a"])
                        ).toFixed(2);

                        tempData[j]["shcd_carton_num_a"] =
                            parseFloat(tempData[j]["shcd_carton_num_a"]) +
                            parseFloat(
                                customDetails[i]["shcd_carton_num_a"] || 0
                            );
                        tempData[j]["shcd_volume"] = (
                            parseFloat(tempData[j]["shcd_volume"]) +
                            parseFloat(customDetails[i]["shcd_volume"] || 0)
                        ).toFixed(2);
                        tempData[j]["shcd_weight_g"] = (
                            parseFloat(tempData[j]["shcd_weight_g"]) +
                            parseFloat(customDetails[i]["shcd_weight_g"] || 0)
                        ).toFixed(2);
                        tempData[j]["shcd_weight_n"] = (
                            parseFloat(tempData[j]["shcd_weight_n"]) +
                            parseFloat(customDetails[i]["shcd_weight_n"] || 0)
                        ).toFixed(2);
                        added = 1;
                        break;
                    }
                }

                if (added == 0) {
                    tempData.push({
                        shcd_id: null,
                        shcd_no: null,
                        shcd_shc_id: this.shc_id,

                        shcd_hscode: customDetails[i]["shcd_hscode"],
                        shcd_po_no: customDetails[i]["shcd_po_no"],
                        shcd_bom_name: customDetails[i]["shcd_bom_name"],
                        shcd_bom_name_en: customDetails[i]["shcd_bom_name_en"],
                        shcd_article_number:
                            customDetails[i]["shcd_article_number"],
                        shcd_qty_a: customDetails[i]["shcd_qty_a"],
                        shcd_unit: customDetails[i]["shcd_unit"],

                        shcd_price_a: customDetails[i]["shcd_price_a"],
                        shcd_amount_a: customDetails[i]["shcd_amount_a"],

                        shcd_country_origin:
                            customDetails[i]["shcd_country_origin"],
                        shcd_country_to: customDetails[i]["shcd_country_to"],
                        shcd_source_city: customDetails[i]["shcd_source_city"],
                        shcd_tax_property:
                            customDetails[i]["shcd_tax_property"],
                        shcd_declare: customDetails[i]["shcd_declare"],

                        shcd_carton_num_a:
                            customDetails[i]["shcd_carton_num_a"] || 0,
                        shcd_volume: customDetails[i]["shcd_volume"] || 0,
                        shcd_weight_g: customDetails[i]["shcd_weight_g"] || 0,
                        shcd_weight_n: customDetails[i]["shcd_weight_n"] || 0,
                    });
                }
            }
            this.cusDetail = tempData;
        },

        saveCustom() {
            for (let key in this.required) {
                if (!this.base_info[key] || Number(this.base_info[key]) == 0) {
                    this.$message({
                        message: "请填写" + `${this.required[key]}` + "  ! ",
                        type: "error",
                    });
                    this.selectTab = 0;
                    return;
                }
            }

            shipApi
                .customUpdate(this.base_info, this.noteDetail, this.cusDetail)
                .then((res) => {
                    if (res.code == 0) {
                        this.$message({
                            message: "出运报关单保存成功！ ",
                            type: "success",
                        });
                        this.getCusInfo();
                    }
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.col1 {
    padding-right: 8px;
}
.col2 {
    padding: 0 8px;
}
.col3 {
    padding-left: 8px;
}
table.definition tbody tr th {
    height: 21px;
}
table.definition tbody tr td {
    height: 21px;
}
.base-info {
    margin-top: 15px;
    .count-btn {
        padding: 1px;
    }
}
.note-detail {
    margin-top: 15px;
    .note-table {
        margin-top: 15px;
    }
}
.custom-detail {
    margin-top: 15px;
    .custom-table {
        margin-top: 15px;
        height: 450px;
    }
}

.attach-wrap {
    margin-top: 15px;
    .custom-attach {
    }
    .note-attach {
        margin-top: 15px;
    }
}
</style>