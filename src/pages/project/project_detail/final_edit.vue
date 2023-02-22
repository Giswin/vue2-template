<template>
    <div class="wrap">
        <vxe-modal ref="model1" v-model="show" width="1100" resize height="650" show-footer destroy-on-close>
            <template v-slot:header>
                项目决算表编辑
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
                <div class="tabs-col" :class="{ show: selectTab == 5 }" @click="selectTab = 5">出运明细勾选</div>

            </div>

            <div class="basic-info" v-show="selectTab==0">
                <el-row>
                    <el-col :span="12">
                        <div class="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                                <tbody>
                                    <tr>
                                        <th align="center" width="120">决算-ID</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>业务组</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>制单人</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>业务员</th>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <th align="center"><span>*</span>订单客户</th>
                                        <td></td>
                                    </tr>

                                    <tr>
                                        <th align="center" width="120">客户订单号</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center" width="120"><span>*</span>订单状态</th>
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
                                        <th align="center"><span>*</span>交货日期</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center">订单数量</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center">数量单位</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>订单日期</th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th align="center"><span>*</span>出运数量</th>
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
                    <el-button size="mini">批量设置</el-button>

                </div>
                <div class="order-table">
                    <vxe-table border resizable ref="orderTable" :data="orderList" show-overflow size="small" class="mytable-scrollbar" max-height="100%" auto-resize :column-config="{minWidth:100}" :edit-config="{trigger: 'click', mode: 'cell'}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod}" :mouse-config="{selected: true}">
                        <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                        <vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="中文款号" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="英文款号" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
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
                        <vxe-table-column field="order_goods_name" title="数量" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>

                        <vxe-table-column field="order_goods_name" title="原币单价" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="金额" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="汇率" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="税率" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算汇率" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算数量" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算单价" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算金额" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算成品单价" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算加工单价" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                    </vxe-table>
                </div>
            </div>

            <div class="purchase-detail" v-show="selectTab==2">
                <div class="purchase-btns">
                    <el-button size="mini">增行</el-button>
                    <el-button size="mini">删行</el-button>
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
                        <vxe-table-column field="order_goods_name" title="英文款号" width="140" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
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
                        <vxe-table-column field="order_goods_name" title="预算汇率" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算数量" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算单价" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算金额" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算成品单价" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算加工单价" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                    </vxe-table>
                </div>
            </div>

            <div class="processing-detail" v-show="selectTab==3">
                <div class="processing-btns">
                    <el-button size="mini">增行</el-button>
                    <el-button size="mini">删行</el-button>
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
                        <vxe-table-column field="order_goods_name" title="英文款号" width="150" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
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
                        <vxe-table-column field="order_goods_name" title="预算汇率" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算数量" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算单价" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算金额" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算成品单价" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算加工单价" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
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
                        <vxe-table-column field="order_goods_name" title="预算金额" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="预算汇率" width="100" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
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

            <div class="ship-detail" v-show="selectTab==5">
                <div class="ship-table">
                    <vxe-table border resizable ref="shipTable" :data="shipList" show-overflow size="small" class="mytable-scrollbar" max-height="100%" auto-resize :column-config="{minWidth:100}" :edit-config="{trigger: 'click', mode: 'cell'}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod5}" :mouse-config="{selected: true}">
                        <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                        <vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="出运申请号" width="120" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="客户名称" width="120" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="业务组" width="120" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="出运申请日期" width="120" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.order_goods_name"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="order_goods_name" title="项目交单金额" width="120" align="left" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
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
export default {
    data() {
        return {
            downIcon: true,
            show: true,
            selectTab: 0,
            // 基本信息
            base_info: {
                // 决算ID
                // 业务组
                // 制单人
                // 业务员
                // 订单客户
                // 客户订单号
                // 订单状态
                // 币种
                // 结算方式
                // 价格条款
                // 交货日期
                // 订单数量
                // 订单日期
                // 出运数量
            },
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

            // 出运明细
            shipList: [],
        };
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

        // 订单明细
        editMethod({ row, column }) {
            const $table = this.$refs.orderTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },

        addRow() {
            let obj = {
                // 中文款号
                // 英文款号
                // 库存组织
                // 商品名称-EBS
                // 商品名称
                // 单位
                // 单位编码
                // 币种
                // 数量
                // 原币单价
                // 金额
                // 汇率
                // 税率
                // 预算汇率
                // 预算数量
                // 预算单价
                // 预算金额
                // 预算成品单价
                // 预算加工单价
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
                // 英文款号
                // 库存组织
                // 商品名称-EBS
                // 商品名称
                // 供应商
                // 损耗%
                // 单位
                // 单位编码
                // 币种
                // 数量
                // 单价
                // 金额
                // 汇率
                // 税率
                // 退税率
                // 转开票
                // 预算汇率
                // 预算数量
                // 预算单价
                // 预算金额
                // 预算成品单价
                // 预算加工单价
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
                // 英文款号
                // 库存组织
                // 商品名称-EBS
                // 商品名称
                // 供应商
                // 加工类型
                // 损耗%
                // 单位
                // 单位编码
                // 币种
                // 数量
                // 成品单价
                // 加工单价
                // 金额
                // 汇率
                // 税率
                // 退税率
                // 转开票
                // 预算汇率
                // 预算数量
                // 预算单价
                // 预算金额
                // 预算成品单价
                // 预算加工单价
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
                // 费用名称
                // 费用类型代码
                // 币种
                // 金额
                // 汇率
                // 预算金额
                // 预算汇率
                // 备注
                // 创建人
            };
        },

        // 出运明细
        editMethod5({ row, column }) {
            const $table = this.$refs.shipTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
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
    height: 80%;
    .order-btns {
        display: flex;
        justify-content: flex-end;
        margin: 15px 0;
    }
    .order-table {
        height: 100%;
    }
}
.purchase-detail {
    margin-top: 15px;
    height: 80%;

    .purchase-btns {
        display: flex;
        justify-content: flex-end;
        margin: 15px 0;
    }
    .purchase-table {
        height: 100%;
    }
}

.processing-detail {
    margin-top: 15px;
    height: 80%;

    .processing-btns {
        display: flex;
        justify-content: flex-end;
        margin: 15px 0;
    }
    .processing-table {
        height: 100%;
    }
}

.fee-detail {
    margin-top: 58px;
    height: 80%;
    .fee-table {
        height: 100%;
    }
}
</style>