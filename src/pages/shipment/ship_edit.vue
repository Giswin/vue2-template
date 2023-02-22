<template>
    <div class="wrap">
        <vxe-modal ref="model1" v-model="show" width="1100" resize height="650" show-footer destroy-on-close>
            <template v-slot:header>
                <div>出运通知编辑</div>
                <div class="model-header-r">
                    <div> 编码:{{base_info.shn_code}}</div>
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
                <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectTab = 1">出运明细</div>
                <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectTab = 2">附件信息</div>
            </div>

            <div class="basic-info" v-show="selectTab==0">
                <div class="class-title">
                    <div class="title">基本信息</div>
                </div>
                <div class="table-body">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                        <tbody>
                            <tr>
                                <th width="120" align="center">运编号</th>
                                <td width="180">
                                    <el-input v-model="base_info.shn_invoice_no_ebs" :disabled="base_info.shn_id_ebs>0" placeholder="由EBS生成" size="small" clearable></el-input>

                                </td>
                                <th width="120" align="center"><span>*</span>业务类型</th>
                                <td width="180" colspan="3">
                                    <el-input v-model="base_info.shn_business_type" disabled></el-input>

                                    <!-- <el-select v-model="base_info.shn_business_type" size="small" clearable filterable>
                                        <el-option v-for="item in selectOptions.businessType" :key="item.dic_code" :label="item.dic_name" :value="item.dic_name"></el-option>
                                    </el-select> -->
                                </td>
                                <th width="120" align="center"><span>*</span>出运币种</th>
                                <td width="180">
                                    <el-select v-model="base_info.shn_currency" placeholder="请选择" size="small" clearable @change="changeBZ">
                                        <el-option v-for="item in selectOptions.BZ" :key="item.dic_name" :label="item.dic_name" :value="item.dic_name"></el-option>
                                    </el-select>
                                </td>

                            </tr>
                            <tr>
                                <th align="center"><span>*</span>业务部门</th>
                                <td>
                                    <!-- <el-select ref="depSelect2" v-model="base_info.shn_dep_name" placeholder="请选择部门" size="small" clearable @clear="clearDep">
                                        <el-tree ref="listTree" :data="selectOptions.dep" :props="defaultProps" node-key="dep_id" @node-click="depClick"></el-tree>
                                        <el-option v-for="item in selectOptions.dep" :key="item.value" :value="item.value" :label="item.title" style="display: none;"></el-option>
                                    </el-select> -->
                                    <el-input v-model="base_info.shn_dep_name" disabled></el-input>

                                </td>
                                <th align="center"><span>*</span>价格条款</th>
                                <td colspan="3">
                                    <el-input v-model="base_info.shn_price_clause" disabled></el-input>

                                    <!-- <el-select v-model="base_info.shn_price_clause" filterable size="small" clearable placeholder="请选择">
                                        <el-option v-for="item in selectOptions.JGTK" :key="item.dic_name" :label="item.dic_name" :value="item.dic_name"></el-option>
                                    </el-select> -->
                                </td>

                                <th width="120" align="center">出运通知金额</th>
                                <td width="70" class="disabled-td" align="right">
                                    <div>
                                        {{base_info.shn_currency}} {{base_info.shn_amount_e}}
                                    </div>
                                </td>

                            </tr>
                            <tr>
                                <th align="center"><span>*</span>业务员</th>
                                <td>
                                    <el-select v-model="base_info.shn_sales_id" size="small" clearable placeholder="请选择" @clear="clearSales">
                                        <el-option v-for="item in selectOptions.sales" v-show="(item.dep_id == base_info.shn_dep_id)" :key="item.staff_id" :label="item.staff_name" :value="item.staff_id" @click.native="changeSales(item)"></el-option>
                                    </el-select>
                                </td>
                                <th width="120" align="center">结算方式</th>
                                <td width="120">
                                    <el-input v-model="base_info.shn_collect_mode" disabled></el-input>

                                    <!-- <el-select v-model="base_info.shn_collect_mode" filterable size="small" clearable placeholder="请选择">
                                        <el-option v-for="item in selectOptions.SHFS" :key="item.dic_name" :label="item.dic_name" :value="item.dic_name"></el-option>
                                    </el-select> -->
                                </td>
                                <td width="60">
                                    <el-input v-model="base_info.shn_collect_days" size="small" clearable></el-input>
                                </td>
                                <td width="40" align="center" style="background: #f6f6f6;">天</td>
                                <th align="center">体积(CBM)</th>
                                <td class="disabled-td" align="right">
                                    <!-- <el-input v-model="base_info.shn_volume_e" placeholder="请输入" size="small" clearable></el-input> -->
                                    {{base_info.shn_volume_e}}
                                </td>

                            </tr>
                            <tr>
                                <th align="center"><span>*</span>单证员</th>
                                <td>
                                    <el-select v-model="base_info.shn_document_id" filterable size="small" clearable @clear="clearDocument">
                                        <el-option v-for="item in selectOptions.documentPeople" @click.native="changeDocument(item)" :key="item.staff_id" :label="item.staff_name" :value="item.staff_id">
                                        </el-option>
                                    </el-select>
                                </td>
                                <th align="center">信用证号</th>
                                <td colspan="3">
                                    <el-input v-model="base_info.shn_lc_no" placeholder="请输入" size="small" clearable></el-input>
                                </td>
                                <th align="center">毛重(KG)</th>
                                <td class="disabled-td" align="right">
                                    <!-- <el-input v-model="base_info.shn_weight_g_e" placeholder="请输入" size="small" clearable></el-input> -->
                                    {{base_info.shn_weight_g_e}}
                                </td>

                            </tr>
                            <tr>
                                <th align="center"><span>*</span>船务</th>
                                <td>
                                    <el-select v-model="base_info.shn_ship_id" filterable size="small" clearable @clear="clearShip">
                                        <el-option v-for="item in selectOptions.shipPeople" @click.native="changeShip(item)" :key="item.staff_id" :label="item.staff_name" :value="item.staff_id">
                                        </el-option>
                                    </el-select>
                                </td>
                                <th align="center"><span>*</span>运输方式</th>
                                <td colspan="3">
                                    <el-select v-model="base_info.shn_shipping_mode" size="small" clearable placeholder="请选择">
                                        <el-option v-for="item in selectOptions.YSFS" :key="item.dic_code" :label="item.dic_name" :value="item.dic_name"></el-option>
                                    </el-select>
                                </td>
                                <th align="center">净重(KG)</th>
                                <td class="disabled-td" align="right">
                                    <!-- <el-input v-model="base_info.shn_weight_n_e" placeholder="请输入" size="small" clearable></el-input> -->
                                    {{base_info.shn_weight_n_e}}
                                </td>

                            </tr>
                            <tr>
                                <th align="center"><span>*</span>贸易方式</th>
                                <td>
                                    <el-select v-model="base_info.shn_trade_mode_code" size="small" filterable clearable @clear="base_info.shn_trade_mode_code = '';base_info.shn_trade_mode = ''">
                                        <el-option v-for="item in selectOptions.tradeMode" :key="item.dic_code" @click.native="changeTradeCode(item)" :label="item.dic_name" :value="item.dic_code">
                                        </el-option>
                                    </el-select>
                                </td>
                                <th align="center"><span>*</span>起运港</th>
                                <td colspan="3">
                                    <el-select v-model="base_info.shn_port_from" size="small" clearable filterable placeholder="请输入关键词选择" remote :remote-method="remotePortFrom">
                                        <el-option v-for="item in portFromOptions" :key="item.port_code" :label="`${item.port_name_en}-${item.port_name}`" :value="item.port_name_en"></el-option>
                                    </el-select>
                                </td>
                                <th align="center" rowspan="7">订舱要求</th>
                                <td rowspan="7">
                                    <el-input v-model="base_info.shn_memo" placeholder="请输入" type="textarea" clearable></el-input>

                                </td>

                            </tr>
                            <tr>
                                <th align="center"><span>*</span>接单抬头</th>
                                <td>
                                    <el-input v-model="base_info.shn_acc_book_name" disabled></el-input>
                                </td>
                                <th align="center"><span>*</span>目的港</th>
                                <td colspan="3">
                                    <el-select v-model="base_info.shn_port_to" size="small" clearable filterable placeholder="请输入关键词选择" remote :remote-method="remotePortTo">
                                        <el-option v-for="item in portToOptions" :key="item.port_code" :label="`${item.port_name_en}-${item.port_name}`" :value="item.port_name_en"></el-option>
                                    </el-select>
                                </td>

                            </tr>
                            <tr>
                                <th align="center"><span>*</span>抬头选项</th>
                                <td>
                                    <el-select v-model="base_info.shn_title_mode" size="small" clearable placeholder="请选择" @change="changeTitleOptions">
                                        <el-option v-for="item in selectOptions.titleOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </td>
                                <th align="center">预计船期</th>
                                <td colspan="3">
                                    <el-date-picker v-model="base_info.shn_ship_date_e" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="small" clearable></el-date-picker>
                                </td>

                            </tr>
                            <tr>
                                <th align="center"><span>*</span>出运抬头</th>
                                <td>
                                    <el-select v-if="base_info.shn_title_mode == '01'" v-model="base_info.shn_title" size="small" filterable clearable @clear="clearTitle">
                                        <el-option v-for="item in selectOptions.allTitle" @click.native="changeShTitle(item,1)" :key="item.title_id" :label="item.title" :value="item.title_id">
                                        </el-option>
                                    </el-select>
                                    <el-select v-if="base_info.shn_title_mode == '02'" v-model="base_info.shn_title_name" size="small" placeholder="请输入关键词选择" filterable clearable @clear="clearTitle" remote :remote-method="remoteCustomer">
                                        <el-option v-for="item in cusOptions" :key="item.trader_id" @click.native="changeShTitle(item,2)" :label="item.trader_name" :value="item.trader_name"></el-option>
                                    </el-select>
                                </td>
                                <th align="center">装箱日期</th>
                                <td colspan="3">
                                    <el-date-picker v-model="base_info.shn_load_date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="small" clearable></el-date-picker>
                                </td>

                            </tr>
                            <tr>
                                <th align="center">订单客户</th>
                                <td>
                                    <el-input v-model="base_info.shn_od_cus_name" disabled></el-input>

                                </td>

                                <th align="center">装箱地点</th>
                                <td colspan="3">
                                    <el-input v-model="base_info.shn_load_location" placeholder="请输入" size="small" clearable></el-input>

                                </td>
                            </tr>
                            <tr>
                                <th align="center"><span>*</span>结算抬头</th>
                                <td>
                                    <el-select v-model="base_info.shn_cus_id" size="small" filterable @clear="base_info.shn_cus_id = null;base_info.shn_cus_name='';">
                                        <el-option v-for="item in selectOptions.allCus" :key="item.trader_id" @click.native="changeCusTitle(item)" :label="item.trader_name" :value="item.trader_id"></el-option>
                                    </el-select>
                                </td>
                                <th align="center">装柜类型</th>
                                <td colspan="3">
                                    <el-input v-model="loadStr" readonly @click.native="zgClick"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <th align="center"><span>*</span>收货抬头</th>
                                <td>
                                    <el-select v-model="base_info.shn_consignee_id" size="small" filterable @clear="base_info.shn_consignee_id = null;base_info.shn_consignee_name='';">
                                        <el-option v-for="item in selectOptions.allCus" :key="item.trader_id" @click.native="changeConTitle(item)" :label="item.trader_name" :value="item.trader_id"></el-option>
                                    </el-select>
                                </td>
                                <th></th>
                                <td colspan="3"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p style="color:red;margin-top:5px;">注：结算抬头即销售合同客户，收货抬头即实际收货人</p>
            </div>

            <div class="ship-detail" v-show="selectTab==1">
                <div class="class-title">
                    <div class="title">出运明细</div>
                    <div class="class-r btns">
                        <el-button size="mini" @click="addRow">增行</el-button>
                        <el-button size="mini" @click="delRow">删行</el-button>
                    </div>
                </div>

                <div class="detail-table of">
                    <vxe-table border resizable row-key ref="detailTable" :data="detailList" show-overflow show-footer size="small" class="mytable-scrollbar" max-height="100%" auto-resize :column-config="{minWidth:100}" :edit-config="{trigger: 'click', mode: 'cell'}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod}" :mouse-config="{selected: true}" :footer-method="footerMethod1">
                        <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                        <vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
                        <vxe-table-column field="shnd_prj_no_ebs" title="项目号" min-width="120" align="left" header-align="center"></vxe-table-column>
                        <vxe-table-column field="shnd_po_no" title="订单号" min-width="120" align="left" header-align="center"></vxe-table-column>
                        <vxe-table-column field="shnd_article_number" title="货号" min-width="110" align="left" header-align="center"></vxe-table-column>
                        <!-- <vxe-table-column field="shnd_goods_name" title="中文品名" width="120" align="left" header-align="center"></vxe-table-column> -->
                        <vxe-table-column field="shnd_goods_name_en" title="英文品名" min-width="110" align="left" header-align="center"></vxe-table-column>
                        <vxe-table-column field="shnd_qty_e" title="出运数量" min-width="100" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.shnd_qty_e"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shnd_price_e" title="出运单价" min-width="90" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
                            <template #edit="{row}">
                                <el-input size="small" clearable v-model="row.shnd_price_e"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shnd_amount_e" title="出运金额" min-width="100" align="right" header-align="center" :formatter="formatterNum">
                        </vxe-table-column>

                        <vxe-table-column field="shnd_carton_num_e" title="箱数" min-width="90" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.shnd_carton_num_e"></el-input>
                            </template>
                        </vxe-table-column>
                        <!-- <vxe-table-column field="shnd_pack_desc" title="箱规说明" min-width="100" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.shnd_pack_desc"></el-input>
                            </template>
                        </vxe-table-column> -->
                        <vxe-table-column field="shnd_volume_e" title="体积CBM" min-width="90" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.shnd_volume_e"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shnd_weight_g_e" title="毛重KGS" min-width="90" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.shnd_weight_g_e"></el-input>
                            </template>
                        </vxe-table-column>
                        <vxe-table-column field="shnd_weight_n_e" title="净重KGS" min-width="90" align="right" header-align="center" :edit-render="{autofocus:'.el-input__inner'}">
                            <template v-slot:edit="{row}">
                                <el-input size="small" clearable v-model="row.shnd_weight_n_e"></el-input>
                            </template>
                        </vxe-table-column>
                    </vxe-table>
                </div>
            </div>

            <div class="attach-info" v-show="selectTab==2">
                <sy-attach :mode="mode" :object_name="object_name" :object_keyid="shn_id" :attach_class="attach_class"></sy-attach>

            </div>

            <template v-slot:footer>
                <div class="m-l">
                    <el-button size="small" v-if="base_info.shn_id && !base_info.shn_invoice_no_ebs" @click="getShipCode" style="margin-right: 10px;">获取运编号</el-button>

                </div>
                <div class="m-r">
                    <el-button size="small" @click="saveNote">保存</el-button>
                    <el-button @click="closeIcon" size="small" style="margin-left:15px">取消</el-button>
                </div>
            </template>
        </vxe-modal>
        <load-edit v-if="showLoad" :loadType="loadType" :loadArr="base_info.shn_load_mode" @closeLoad="closeLoad" @afterSave="saveLoad"></load-edit>
        <add-detail v-if="showAddDetail" :selectOptions="selectOptions" :depTag="depTag" :filterObj="filterObj" :shipInfo="shipInfo" @closeAdd="closeAdd" @closeAddIcon="closeAddIcon" @changeInfo="changeInfo"></add-detail>
    </div>
</template>

<script>
import Sortable from "sortablejs";
import shipApi from "@/api/cbs/ship.js";
import loadEdit from "./load_edit.vue";
import addDetail from "./addDetail_edit.vue";
export default {
    components: { loadEdit, addDetail },
    props: {
        selectOptions: {
            type: Object,
        },
        shn_id: {
            type: Number,
        },
        edit_state: {
            type: Number,
        },
        tabNumber: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            show: true,
            downIcon: true,
            selectTab: 0,
            shipInfo: {},
            // 基本信息
            defaultProps: {
                children: "children",
                label: "title",
            },
            cusOptions: [],
            portFromOptions: [],
            portToOptions: [],
            showLoad: false,
            loadType: [],
            loadStr: "",
            base_info: {
                shn_code: "", //编码
                shn_invoice_no_ebs: "", // 运编号
                shn_dep_id: null, //业务部门ID
                shn_dep_name: "", //业务部门
                shn_sales_id: null, //业务员ID
                shn_sales_name: "", //业务员名称
                shn_sales_id_ebs: null, //业务员id-EBS
                shn_trade_mode: "", // 贸易方式
                shn_trade_mode_code: "", // 贸易方式编码
                shn_document_id: null, //单证员ID
                shn_document_name: "", // 单证员
                shn_document_dep_id: null, //单证部门ID
                shn_ship_id: null, //船务ID
                shn_ship_name: "", //船务姓名
                shn_ship_dep_id: null, //船员部门ID
                shn_acc_book_id: null, //接单抬头ID
                shn_acc_book_name: "", //接单抬头全称
                shn_title_mode: "", // 抬头选项
                shn_title: null, // 出运抬头
                shn_title_name: "", //出运抬头全称
                shn_od_cus_id: null, //订单客户ID
                shn_od_cus_name: "", //订单客户全称
                shn_cus_id: null, // 结算客户ID
                shn_cus_name: "", //结算客户全称
                shn_consignee_id: null, // 收货单位ID
                shn_consignee_name: "", //收货单位全称
                shn_business_type: "", //业务类型
                shn_collect_mode: "", //结算方式
                shn_collect_days: "", //结算天数
                shn_price_clause: "", // 价格条款
                shn_lc_no: "", //信用证号
                shn_shipping_mode: "", //运输方式
                shn_port_from: "", //起运港
                shn_port_to: "", //目的港
                shn_ship_date_e: null, //预计船期
                shn_load_date: null, //装箱日期
                shn_load_location: "", //装箱地点
                shn_load_mode: [], // 柜型要求
                shn_amount_e: null, // 出运通知金额
                shn_currency: "", //币种
                shn_weight_g_e: "", // 毛重（KG)
                shn_weight_n_e: "", // 净重(KG)
                shn_volume_e: "", // 体积(CBM)
                shn_memo: "", //订舱要求
            },
            required: {
                // shn_dep_name: "业务部门",
                // shn_sales_name: "业务员",
                shn_document_name: "单证员",
                shn_ship_name: "船务",
                shn_trade_mode: "贸易方式",
                shn_acc_book_name: "接单抬头",
                shn_title_mode: "抬头选项",
                shn_title_name: "出运抬头",
                shn_od_cus_name: "订单客户全称", //订单客户全称
                shn_cus_name: "结算客户全称", //结算客户全称
                shn_consignee_name: "收货单位全称", //收货单位全称
                shn_business_type: "业务类型", //业务类型
                shn_price_clause: "价格条款", // 价格条款
                shn_shipping_mode: "运输方式", //运输方式
                shn_port_from: "起运港", //起运港
                shn_port_to: "目的港", //目的港
                shn_currency: "出运币种", //币种
            },
            // 出运明细
            detailList: [],
            depTag: {},
            filterObj: {
                title: null, //接单抬头
                cus: null, // 订单客户
                busType: "", // 业务类型
                priceClause: "", // 价格条款
            },
            showAddDetail: false,
            // 附件信息
            mode: 1,
            object_name: "cbm_ship_note",
            attach_class: ["出运资料"],
        };
    },
    created() {
        this.selectTab = this.tabNumber;
        this.getInfo(this.shn_id);
        this.getLoadDic();
    },
    mounted() {},
    methods: {
        closeModel() {
            this.show = false;
            this.$refs.model1.close();
            setTimeout(() => {
                this.$emit("closeEdit");
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

        getInfo(shn_id) {
            shipApi.getShipInfo(shn_id).then((res) => {
                console.log("出运详情信息", res);
                this.base_info = res.data.baseInfo;
                this.base_info.shn_title_mode =
                    this.base_info.shn_title_mode.padStart(2, "0");
                console.log("抬头选项", this.base_info.shn_title_mode);
                if (
                    this.base_info.shn_load_mode &&
                    this.base_info.shn_load_mode.length > 0
                ) {
                    this.getLoadStr(this.base_info.shn_load_mode);
                }

                this.detailList = res.data.detailInfo;
                if (this.edit_state == 0) {
                    this.$message({
                        message:
                            "出运通知创建成功!   " +
                            "编码为" +
                            this.base_info.shn_code,
                        type: "success",
                    });
                }
            });
        },
        getLoadDic() {
            this.$dmBaseSet.dicData("TY_JZXLX").then((data) => {
                if (data) {
                    this.loadType = data.children;
                }
            });
        },
        getLoadStr(loadList) {
            this.loadStr = "";
            loadList.forEach((item) => {
                if (item.type !== "LCL") {
                    this.loadStr += item.type + " " + item.num + ";";
                } else {
                    this.loadStr = "LCL";
                }
            });
        },
        // 基本信息
        depClick(data) {
            console.log("depclick", data);
            if (data.end) {
                this.base_info.shn_dep_id = data.value;
                this.base_info.shn_dep_name = data.title;
                this.base_info.shn_sales_id = null;
                this.base_info.shn_sales_name = "";
                this.$refs.depSelect2.handleClose();
            }
        },
        clearDep() {
            this.base_info.shn_dep_id = null;
            this.base_info.shn_dep_name = null;
        },
        clearSales() {
            this.base_info.shn_sales_id = null;
            this.base_info.shn_sales_name = "";
            this.base_info.shn_sales_id_ebs = null;
        },
        // 业务员选择
        changeSales(item) {
            this.base_info.shn_sales_id = item.staff_id;
            this.base_info.shn_sales_name = item.staff_name;
            this.base_info.shn_sales_id_ebs = item.staff_ebs_id;
            this.base_info.shn_dep_id_ebs = item.staff_ebs_dep_id;
        },
        //判断取华盛的ebsid还是香港的ebs id
        ebsIdType() {
            //如果是香港华盛时
            if (this.base_info.shn_acc_book_id == 4) {
                return 2;
            } else {
                return 1;
            }
        },
        changeDocument(item) {
            this.base_info.shn_document_id = item.staff_id;
            if (this.ebsIdType() == 2) {
                this.base_info.shn_document_id_ebs = item.staff_ebs_id_hk;
            } else {
                this.base_info.shn_document_id_ebs = item.staff_ebs_id;
            }

            this.base_info.shn_document_name = item.staff_name;
            this.base_info.shn_document_dep_id = item.staff_department_id;
        },
        clearShip() {
            this.base_info.shn_ship_id = null;
            this.base_info.shn_ship_name = "";
        },
        // 船务人员选择后，将对应部门保存下来
        changeShip(item) {
            this.base_info.shn_ship_id = item.staff_id;
            this.base_info.shn_ship_name = item.staff_name;
            this.base_info.shn_ship_dep_id = item.staff_department_id;
        },
        clearDocument() {
            this.base_info.shn_document_id = null;
            this.base_info.shn_document_name = "";
            this.base_info.shn_document_dep_id = null;
        },
        // 贸易方式
        changeTradeCode(item) {
            this.base_info.shn_trade_mode_code = item.dic_code;
            this.base_info.shn_trade_mode = item.dic_name;
        },
        clearTitle() {
            this.base_info.shn_title = null;
            this.base_info.shn_title_name = "";
        },
        changeTitleOptions() {
            this.base_info.shn_title = null;
            this.base_info.shn_title_name = "";
        },
        changeShTitle(item, type) {
            if (type == 1) {
                this.base_info.shn_title = item.title_id;
                this.base_info.shn_title_name = item.title;
            } else if (type == 2) {
                this.base_info.shn_title = item.trader_id;
                this.base_info.shn_title_name = item.trader_name;
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
        // 结算抬头变更
        changeCusTitle(item) {
            this.base_info.shn_cus_id = item.trader_id;
            this.base_info.shn_cus_name = item.trader_name;
            this.changeConTitle(item);
        },
        // 收货抬头变更
        changeConTitle(item) {
            this.base_info.shn_consignee_id = item.trader_id;
            this.base_info.shn_consignee_name = item.trader_name;
        },
        changeBZ(value) {},
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
        zgClick() {
            this.showLoad = true;
        },
        closeLoad() {
            this.showLoad = false;
        },
        saveLoad(loadList) {
            this.loadStr = "";
            loadList.forEach((item) => {
                if (item.type !== "LCL") {
                    this.loadStr += item.type + " " + item.num + ";";
                } else {
                    this.loadStr = "LCL";
                }
                delete item._XID;
            });
            this.base_info.shn_load_mode = loadList;
            console.log("保存的loadList", this.base_info.shn_load_mode);
        },

        // 获取运编号
        getShipCode() {
            let msg = this.base_info.shn_invoice_no_ebs
                ? "运编号已有,是否要替换?替换后原运编号失效!"
                : "确定要同步EBS出运头吗？";
            this.$confirm(msg, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                if (this.shn_id > 0) {
                    for (let key in this.required) {
                        if (!this.base_info[key]) {
                            this.$message({
                                message:
                                    "请填写" + `${this.required[key]}` + "!",
                                type: "error",
                            });
                            return;
                        }
                    }
                    shipApi
                        .shipUpdate(this.base_info, this.detailList)
                        .then((res) => {
                            console.log("出运通知保存", res);
                            if (res.code == 0) {
                                shipApi.getshnEbs(this.shn_id).then((res) => {
                                    console.log("获取运编号", res);
                                    if (res.code == 0) {
                                        this.$message({
                                            message: "运编号获取成功 ！ ",
                                            type: "success",
                                        });
                                        this.refreshData();
                                    } else {
                                        this.$message({
                                            message: res.msg,
                                            type: "error",
                                        });
                                    }
                                });
                            }
                        });
                }
            });
        },
        refreshData() {
            shipApi.getShipInfo(this.shn_id).then((res) => {
                console.log("出运详情信息", res);
                this.base_info = res.data.baseInfo;
                this.base_info.shn_title_mode =
                    this.base_info.shn_title_mode.padStart(2, "0");
                if (
                    this.base_info.shn_load_mode &&
                    this.base_info.shn_load_mode.length > 0
                ) {
                    this.getLoadStr(this.base_info.shn_load_mode);
                }

                this.detailList = res.data.detailInfo;
            });
        },

        // 出运明细信息
        //行拖拽
        rowDrop() {
            this.$nextTick(() => {
                const xTable = this.$refs.detailTable;
                this.sortable1 = Sortable.create(
                    xTable.$el.querySelector(
                        ".body--wrapper>.vxe-table--body tbody"
                    ),
                    {
                        handle: ".drag-btn",
                        onEnd: ({ newIndex, oldIndex }) => {
                            const currRow = this.detailList.splice(
                                oldIndex,
                                1
                            )[0];
                            this.detailList.splice(newIndex, 0, currRow);
                        },
                    }
                );
            });
        },
        editMethod({ row, column }) {
            const $table = this.$refs.detailTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        formatterNum({ cellValue }) {
            return this.$XEUtils.commafy(this.$XEUtils.toNumber(cellValue), {
                digits: 2,
            });
        },
        addRow() {
            //(业务部门、接单抬头、客户、业务类型、价格条款、PO目的港 、币种)
            this.depTag = {
                field: "order_dep_id",
                title: "业务部门",
                value: this.base_info.shn_dep_id,
                label: this.base_info.shn_dep_name,
                type: "select",
            };

            this.filterObj.title = this.base_info.shn_acc_book_id;
            this.filterObj.cus = this.base_info.shn_od_cus_name;
            this.filterObj.busType = this.base_info.shn_business_type;
            this.filterObj.priceClause = this.base_info.shn_price_clause;

            this.shipInfo = {
                baseInfo: this.base_info,
                detailInfo: this.detailList,
            };

            this.showAddDetail = true;
        },
        delRow() {
            if (this.detailList.length > 0) {
                const table = this.$refs.detailTable;
                const selectRecords = table.getCheckboxRecords();
                console.log("sel", selectRecords);
                if (selectRecords.length > 0) {
                    this.$confirm("确定要删除出运明细信息?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                        .then(() => {
                            this.$refs.detailTable.removeCheckboxRow();
                            selectRecords.forEach((data) => {
                                this.detailList = this.detailList.filter(
                                    (item) => {
                                        return item !== data;
                                    }
                                );
                            });
                            console.log("detailList", this.detailList);
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
        footerRowClassName({ $rowIndex }) {
            if ($rowIndex == 0) {
                return "footer-style";
            }
        },
        footerMethod1({ columns, data }) {
            return [
                columns.map((column, columnIndex) => {
                    if (columnIndex == 2) {
                        return "合计";
                    }
                    // 出运金额
                    if (column.property == "shnd_amount_e") {
                        return this.countAllamount(data);
                    } else if (column.property == "shnd_qty_e") {
                        return this.$XEUtils.commafy(
                            this.$XEUtils.sum(data, column.property),
                            {
                                digits: 0,
                            }
                        );
                    } else if (column.property == "shnd_carton_num_e") {
                        return this.$XEUtils.commafy(
                            this.$XEUtils.sum(data, column.property),
                            {
                                digits: 0,
                            }
                        );
                    } else if (
                        [
                            "shnd_volume_e",
                            "shnd_weight_g_e",
                            "shnd_weight_n_e",
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
        sumNum(list, field) {
            let count = 0;
            list.forEach((item) => {
                count += Number(item[field]);
            });

            return count;
        },
        countAmount(row) {
            let count = 0;
            count = Number(row.shnd_qty_e) * Number(row.shnd_price_e);
            row.shnd_amount_e = this.$general.toDecimal2(count);
            return count;
        },
        countAllamount(data) {
            let count = 0;
            data.forEach((item) => {
                count += Number(this.countAmount(item));
            });
            return this.$XEUtils.commafy(this.$general.toDecimal2(count));
        },

        closeAdd(selectedRows) {
            this.showAddDetail = false;
            if (!selectedRows) {
                return;
            }
            let goods_ids = [];
            selectedRows.forEach((item) => {
                let isExist = false;
                this.detailList.forEach((data) => {
                    if (item.order_goods_id == data.shnd_order_goods_id) {
                        isExist = true;
                    }
                });
                if (!isExist) {
                    goods_ids.push(item.order_goods_id);
                }
            });

            shipApi.addDetail(goods_ids).then((res) => {
                console.log("出运明细列表", res);
                if (res.code == 0) {
                    let addDetail = res.data;
                    this.detailList = this.detailList.concat(addDetail);
                }
            });
        },
        closeAddIcon() {
            this.showAddDetail = false;
        },
        changeInfo(data) {
            console.log("change222", data);
            this.base_info.shn_od_cus_name = data.cus_name;
            this.base_info.shn_od_cus_id = data.cus_id;
            this.base_info.shn_business_type = data.busType;
            this.base_info.shn_price_clause = data.priceClause;
        },
        // 附件信息

        // 保存编辑
        saveNote() {
            for (let key in this.required) {
                if (!this.base_info[key]) {
                    this.$message({
                        message: "请填写" + `${this.required[key]}` + "!",
                        type: "error",
                    });
                    return;
                }
            }
            if (this.detailList.length < 1) {
                this.$message({
                    message: "请填写出运明细列表!",
                    type: "error",
                });
                return;
            }

            console.log("保存的base_info", this.base_info);
            shipApi.shipUpdate(this.base_info, this.detailList).then((res) => {
                console.log("出运通知保存", res);
                if (res.code == 0) {
                    this.$message({
                        message: "出运通知保存成功!",
                        type: "success",
                    });
                    this.closeModel();
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.basic-info {
    margin-top: 15px;
    .table-body {
        margin-top: 15px;
        table.definition tbody tr th {
            height: 23px;
        }
        table.definition tbody tr td {
            height: 23px;
        }
    }
}
.ship-detail {
    margin-top: 15px;
    // .detail-table{
    //     overflow: auto;
    //  }
}
.attach-info {
    margin-top: 15px;
}
.disabled-td {
    background-color: #f5f7fa;
}
</style>