<template>
    <div class="wrap">
        <vxe-modal ref="model1" v-model="show" width="1100" resize height="650" show-footer destroy-on-close>
            <template v-slot:header>
                项目预算表编辑
                <div class="model-header-r">
                    编码:
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
                <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectTab = 1">订单明细</div>
                <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectTab = 2">采购明细</div>
                <div class="tabs-col" :class="{ show: selectTab == 3 }" @click="selectTab = 3">加工明细</div>
                <div class="tabs-col" :class="{ show: selectTab == 4 }" @click="selectTab = 4">费用明细</div>

            </div>

            <div class="basic-info" v-show="selectTab==0">
                <el-row>
                    <el-col :span="12">
                        <div class="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                                <tbody>
                                    <tr>
                                        <th align="center" width="120">项目号-ID</th>
                                        <td>{{base_info.ode_project_code_ebs}}</td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>业务组</th>
                                        <td>
                                            <el-select size="small" v-model="base_info.ode_dep_id_ebs" transfer filterable @change="changeUserGroup" label-in-value clearable>
                                                <el-option v-for="item in selectOptions.userGroup" :key="item.group_id" :value="item.group_id" :label="item.group_display_name">
                                                </el-option>
                                            </el-select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>制单人</th>
                                        <td>
                                            <el-select size="small" v-model="base_info.ode_creator_id_ebs" transfer filterable label-in-value :disabled="selectOptions.userGroup.length < 1" @change="changeCreator" clearable>
                                                <el-option v-for="item in groupUser" :key="item.user_id" :value="item.user_id" :label="item.full_name">
                                                </el-option>
                                            </el-select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>业务员</th>
                                        <td>
                                            <el-select style="width: 100%;" v-model="base_info.ode_sales_id_ebs" transfer filterable @change="changeSales" label-in-value :disable="selectOptions.userGroup.length < 1" clearable>
                                                <el-option v-for="item in groupUser" :key="item.user_id" :value="item.user_id" :label="item.full_name">
                                                </el-option>
                                            </el-select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>订单类型</th>
                                        <td>
                                            <el-select style="width: 100%;" v-model="base_info.ode_bus_type_id_ebs" transfer filterable clearable @change="changeTradeType">
                                                <el-option v-for="item in selectOptions.YWLX" :key="item.transaction_type_id" :value="item.transaction_type_id" :label="item.name">
                                                </el-option>
                                            </el-select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>订单日期</th>
                                        <td>
                                            <el-date-picker v-model="base_info.ode_od_date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="small" clearable>
                                            </el-date-picker>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>订单客户</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>最终客户</th>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <th align="center" width="120">客户订单号</th>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="right">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                                <tbody>
                                    <tr>
                                        <th align="center" width="120"><span>*</span>结算方式</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>价格条款</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>运输方式</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>交货日期</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center">订单数量</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>数量单位</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center">公司费用</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center">SWIFT码</th>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <th align="center" width="120">订单备注</th>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="order-detail" v-show="selectTab==1">
                <div class="order-btns">
                    <el-button size="mini" @click="addRow">增行</el-button>
                    <el-button size="mini" @click="delRow">删行</el-button>

                </div>
                <div class="order-table">
                    <vxe-table border resizable ref="orderTable" :data="orderList" show-overflow size="small" class="mytable-scrollbar" max-height="100%" auto-resize :column-config="{minWidth:100}" :edit-config="{trigger: 'click', mode: 'cell'}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod}" :mouse-config="{selected: true}" :edit-rules="validRule">
                        <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                        <vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="中文款号" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="库存组织" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="货号" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="商品名称" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="商品描述" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="数量" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="单位" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="币种" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="单价" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="金额小计" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                    </vxe-table>
                </div>
            </div>

            <div class="purchase-detail" v-show="selectTab==2">
                <div class="purchase-btns">
                    <el-button size="mini" @click="multipleSet">批量设置</el-button>

                </div>
                <div class="purchase-table">
                    <vxe-table border resizable ref="purchaseTable" :data="purchaseList" show-overflow size="small" class="mytable-scrollbar" max-height="100%" auto-resize :column-config="{minWidth:100}" :edit-config="{trigger: 'click', mode: 'cell'}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod2}" :mouse-config="{selected: true}" :edit-rules="validRule2">
                        <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                        <vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="中文款号" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="库存组织" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>

                        <vxe-table-column field="order_goods_name" title="商品名称-EBS" width="150" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="商品名称" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="供应商" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="损耗%" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="数量" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="单位" width="80" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="币种" width="80" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="单价" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="金额" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="汇率" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                    </vxe-table>
                </div>
            </div>

            <div class="processing-detail" v-show="selectTab==3">
                <div class="processing-btns">
                    <el-button size="mini" @click="multipleSet2">批量设置</el-button>

                </div>
                <div class="processing-table">
                    <vxe-table border resizable ref="processingTable" :data="processingList" show-overflow size="small" class="mytable-scrollbar" max-height="100%" auto-resize :column-config="{minWidth:100}" :edit-config="{trigger: 'click', mode: 'cell'}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod3}" :mouse-config="{selected: true}" :edit-rules="validRule3">
                        <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                        <vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="中文款号" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="中文规格" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>

                        <vxe-table-column field="order_goods_name" title="英文规格" width="150" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="库存组织" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="商品名称-EBS" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="商品名称" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="供应商" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="加工类型" width="80" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="损耗%" width="80" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="数量" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="单位" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="币种" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="成品单价" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="加工单价" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="金额" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="汇率" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="税率" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="退税率" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="转开票" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                    </vxe-table>
                </div>

            </div>

            <div class="fee-detail" v-show="selectTab==4">
                <div class="fee-table">
                    <vxe-table border resizable ref="feeTable" :data="feeList" show-overflow size="small" class="mytable-scrollbar" max-height="100%" auto-resize :column-config="{minWidth:100}" :edit-config="{trigger: 'click', mode: 'cell'}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod4}" :mouse-config="{selected: true}">
                        <vxe-table-column field="order_goods_name" title="项目费用ID" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="项目ID" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="费用名称" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="费用类型代码" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="供应商ID" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="币种" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="金额" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="汇率" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="税率" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="备注" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="创建人" width="120" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                    </vxe-table>
                </div>
            </div>

            <template v-slot:footer>
                <div class="m-l">
                </div>
                <div class="m-r">
                    <el-button size="small">保存</el-button>
                    <el-button @click="closeIcon" size="small" style="margin-left:15px">取消</el-button>
                </div>
            </template>
        </vxe-modal>
    </div>
</template>

<script>
import ebsApi from "@/api/gbs/ebs.js";
import ifsApi from "@/api/ifs";
export default {
    props: {
        ebs_path: {
            type: String,
            default: "HS",
        },
        selectOptions: {
            type: Object,
        },
    },
    data() {
        return {
            downIcon: true,
            show: true,
            selectTab: 0,
            // 基本信息
            base_info: {
                ode_project_code_ebs: "", // 项目号-ID
                ode_dep_id_ebs: null, // 业务组ID
                ode_dep_name_ebs: "", // 业务组名称
                ode_creator_id_ebs: null, // 制单人ID
                ode_creator: "", // 制单人
                ode_sales_id_ebs: null, // 业务员ID
                ode_sales_name: "", //业务员名称
                ode_bus_type_id_ebs: null, // 订单类型ID
                ode_bus_type: "", //订单类型
                ode_od_date: null, // 订单日期
                ode_cus_id_ebs: null, // 订单客户ID
                ode_end_cus_ebs: null, // 最终客户id
                ode_od_code_cus: "", // 客户订单号
                ode_collect_id_ebs: null, // 结算方式id
                ode_collect_mode: "", //结算方式-EBS
                ode_price_clause: "", // 价格条款
                ode_ship_mode_code_ebs: "", // 运输方式编码
                ode_delivery_date_ebs: null, // 交货日期
                ode_qty_sales_ebs: null, // 订单数量
                ode_qty_unit_ebs: "", // 数量单位
                ode_qty_unit_code_ebs: "", //订单数量单位编码
                ode_amount_fee_ebs: null, // 公司费用
                ode_swift_code_ebs: "", // SWIFT码
                ode_memo: "", // 订单备注
            },
            groupUser: [], //业务员
            customer: [], //订单客户
            // 订单明细
            orderList: [],
            validRule: {
                oded_stock_org_id_ebs: [
                    { required: true, message: "请填写库存组织" },
                ],
                oded_item_id_ebs: [{ required: true, message: "请编辑商品ID" }],
                oded_vender_id_ebs: [
                    { required: true, message: "请编辑供应商" },
                ],
            },
            // 采购明细
            purchaseList: [],
            validRule2: {
                oded_stock_org_id_ebs: [
                    { required: true, message: "请填写库存组织" },
                ],
                oded_item_id_ebs: [{ required: true, message: "请编辑商品ID" }],
                oded_vender_id_ebs: [
                    { required: true, message: "请编辑供应商" },
                ],
            },

            // 加工明细
            processingList: [],
            validRule3: {
                oded_stock_org_id_ebs: [
                    { required: true, message: "请填写库存组织" },
                ],
                oded_item_id_ebs: [{ required: true, message: "请编辑商品ID" }],
                oded_vender_id_ebs: [
                    { required: true, message: "请编辑供应商" },
                ],
            },

            // 费用明细
            feeList: [],
        };
    },
    created() {
        ifsApi.getVenderDataList().then((res) => {
            console.log("交易方全称", res);
            // 2103条，真的太多了。。。
        });
    },
    methods: {
        closeModel() {
            this.show = false;
            this.$emit("closeEdit");
        },
        closeIcon() {
            this.show = false;
            this.$emit("closeIcon");
        },
        screen() {
            this.$refs.model1.zoom();
            this.downIcon = !this.downIcon;
        },
        // 基本信息
        //根据业务组获取业务员
        getGroupUser() {
            ebsApi
                .getEbsData(
                    "get_group_user",
                    this.base_info.ode_dep_id_ebs,
                    this.ebs_path
                )
                .then((res) => {
                    if (res.code == 0) {
                        this.groupUser = res.data;
                        console.log("getGroupUser", this.groupUser);
                    }
                });
        },

        //通过ID获取客户
        getCustomer(params) {
            ebsApi
                .getEbsData("get_venlist_id", params, this.ebs_path)
                .then((result) => {
                    if (result.code == 0) {
                        this.customer = result.data || [];
                    }
                });
        },
        changeUserGroup(value) {
            if (value) {
                this.getGroupUser();
                this.selectOptions.userGroup.forEach((item) => {
                    if (item.group_id == value) {
                        this.base_info.ode_dep_name_ebs =
                            item.group_display_name;
                    }
                });
            }
        },

        changeCreator(value) {
            if (value) {
                this.groupUser.forEach((item) => {
                    if (item.user_id == value) {
                        this.base_info.ode_creator = item.full_name;
                    }
                });
            }
        },
        changeSales(value) {
            this.groupUser.forEach((item) => {
                if (item.user_id == value) {
                    this.base_info.ode_sales_name = item.full_name;
                }
            });
        },
        changeTradeType(value) {
            this.selectOptions.YWLX.forEach((item) => {
                if (item.transaction_type_id == value) {
                    this.base_info.ode_bus_type = item.name;
                }
            });
        },

        // 订单明细
        editMethod({ row, column }) {
            const $table = this.$refs.orderTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },

        addRow() {
            let obj = {
                // 中文款号
                // 库存组织
                // 商品名称-EBS
                // 商品名称
                // 数量
                // 单位
                // 单位编码
                // 币种
                // 单价
                // 金额
            };
        },
        delRow() {},

        // 采购明细
        multipleSet() {},
        editMethod2({ row, column }) {
            const $table = this.$refs.purchaseTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        addRow2() {
            let obj = {
                // 中文款号
                // 库存组织
                // 商品名称-EBS
                // 商品名称
                // 供应商
                // 损耗
                // 数量
                // 单位
                // 单位编码
                // 币种
                // 单价
                // 金额
                // 汇率
                // 税率
                // 退税率
                // 转开票
            };
        },

        // 加工明细
        multipleSet2() {},
        editMethod3({ row, column }) {
            const $table = this.$refs.processingTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        addRow3() {
            let obj = {
                // 中文款号
                // 中文规格
                // 英文规格
                // 库存组织
                // 商品名称-EBS
                // 商品名称
                // 供应商
                // 加工类型
                // 损耗%
                // 数量
                // 单位
                // 单位编码
                // 币种
                // 成品单价
                // 加工单价
                // 金额
                // 汇率
                // 税率
                // 退税率
                // 转开票
            };
        },

        // 费用明细
        editMethod4({ row, column }) {
            const $table = this.$refs.feeTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        addRow4() {
            let obj = {
                // 项目费用ID
                // 项目ID
                // 费用名称
                // 费用类型代码
                // 供应商ID
                // 币种
                // 金额
                // 汇率
                // 税率
                // 备注
                // 创建人
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.basic-info {
    margin-top: 45px;
    .table-body {
        margin-top: 15px;
        table.definition tbody tr th {
            height: 26px;
        }
        table.definition tbody tr td {
            height: 26px;
        }
    }
    .left {
        padding-right: 8px;
    }
    .right {
        padding-left: 8px;
    }
}

.order-detail {
    margin-top: 15px;
    .order-btns {
        display: flex;
        justify-content: flex-end;
        margin: 15px 0;
    }
}
.purchase-detail {
    margin-top: 15px;
    .purchase-btns {
        display: flex;
        justify-content: flex-end;
        margin: 15px 0;
    }
}

.processing-detail {
    margin-top: 15px;
    .processing-btns {
        display: flex;
        justify-content: flex-end;
        margin: 15px 0;
    }
}

.fee-detail {
    margin-top: 58px;
}
</style>