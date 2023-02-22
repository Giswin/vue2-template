<template>
    <div class="wrap">
        <vxe-modal ref="model1" v-model="show" width="1150" resize height="650" show-footer destroy-on-close>
            <template v-slot:header>
                {{$t('goodsEdit')}}
                <div class="model-header-r" v-if="goods_id!=0">
                    {{$t('code')}}:{{goods_id}}
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
                <div class="tabs-col" :class="{ show: selectTab == 0 }" @click="selectTab = 0">{{$t('baseInfo')}}</div>
                <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectTab = 1">{{$t('orderInfo')}}</div>

            </div>
            <div v-show="selectTab==0">
                <div class="create-info">
                    <div>{{$t('createInfo')}}：<span>{{base_info.goods_creator}}</span><span>{{base_info.goods_create_time}}</span></div>
                    <div class="change-info">{{$t('alterInfo')}}：<span>{{base_info.goods_updator}}</span><span>{{base_info.goods_update_time}}</span></div>
                </div>
                <div class="table-body">
                    <el-row>
                        <el-col :span="16">
                            <div class="basic-info">
                                <div class="class-title">
                                    <div class="title">{{$t('baseInfo')}}</div>
                                </div>
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                                    <tbody>
                                        <tr>
                                            <th width="120" align="center"><span>*</span> {{$t('department')}}</th>
                                            <td width="200">
                                                <el-select ref="depSelect" v-model="base_info.goods_dep_name" size="small" clearable @clear="clearDep" :disabled="goodsUsed">
                                                    <el-tree ref="listTree" :data="selectOptions.dep" :props="defaultProps" node-key="dep_id" @node-click="depClick"></el-tree>
                                                    <el-option v-for="item in selectOptions.dep" :key="item.label" :value="item.value" :label="item.label" style="display: none;"></el-option>
                                                </el-select>
                                            </td>
                                            <th width="120" align="center"><span>*</span> {{$t('salesman')}}</th>
                                            <td width="200">
                                                <el-select v-model="base_info.goods_salesman_name" size="small" clearable @change="changeSales" :disabled="goodsUsed">
                                                    <el-option v-for="item in selectOptions.sales" v-show="item.dep_id == base_info.goods_dep_id" :key="item.staff_id" :label="item.staff_name" :value="item.staff_name"></el-option>
                                                </el-select>
                                            </td>
                                        </tr>
                                        <!-- <tr>
                                            <th align="center"><span>*</span> 商品大类</th>
                                            <td>
                                                <el-select ref="categorySelect" v-model="base_info.goods_category_name" placeholder="请选择" size="small" clearable @clear="clearCategory">
                                                    <el-tree ref="categoryTree" :data="selectOptions.category" :props="categoryProps" node-key="dictionary_id" @node-click="handleCategoryClick"></el-tree>
                                                    <el-option v-for="item in selectOptions.category" :key="item.dic_code" :value="item.dic_name" :label="item.dic_name" hidden></el-option>
                                                </el-select>
                                            </td>
                                            <th align="center"><span>*</span> 货号</th>
                                            <td>
                                                <el-input v-model="base_info.goods_article_number" clearable></el-input>
                                            </td>
                                        </tr> -->

                                        <!-- <tr>
                                            <th align="center"> 销售规格</th>
                                            <td>
                                                <el-input v-model="base_info.goods_sale_spec" clearable @change="changeSalesSpec"></el-input>
                                            </td>
                                            <th align="center"> 采购规格</th>
                                            <td>
                                                <el-input v-model="base_info.goods_purchase_spec" clearable></el-input>
                                            </td>
                                        </tr> -->

                                        <tr>
                                            <th align="center"><span>*</span>{{$t('customer')}}</th>
                                            <td>
                                                <el-select v-model="base_info.goods_cus_name" :placeholder="$t('keywordsSelect')" size="small" clearable filterable remote :remote-method="remoteMethod1" @change="changeCustomer" @clear="clearCustomer" :disabled="goodsUsed">
                                                    <el-option v-for="item in cusOptions" :key="item.trader_id" :value="item.trader_name" :label="item.trader_name"></el-option>
                                                </el-select>
                                            </td>
                                            <th align="center"><span>*</span> {{$t('goodsNo')}}</th>
                                            <td>
                                                <el-input v-model="base_info.goods_article_number" clearable :disabled="goodsUsed"></el-input>
                                            </td>
                                            <!-- <th align="center"> 供应商</th>
                                            <td>
                                                <el-select v-model="base_info.goods_ven_name" placeholder="请输入关键词选择" size="small" clearable filterable remote :remote-method="remoteMethod2" @change="changeVender" @clear="clearVender">
                                                    <el-option v-for="item in venOptions" :key="item.trader_id" :value="item.trader_name" :label="item.trader_name"></el-option>
                                                </el-select>
                                            </td> -->
                                        </tr>
                                        <tr>
                                            <th align="center"><span>*</span> {{$t('cnGoodsName')}}</th>
                                            <td>
                                                <el-input v-model="base_info.goods_name" clearable :disabled="goodsUsed"></el-input>
                                            </td>
                                            <th align="center"> {{$t('enGoodsName')}}</th>
                                            <td>
                                                <el-input v-model="base_info.goods_name_en" clearable :disabled="goodsUsed"></el-input>
                                            </td>
                                        </tr>
                                        <!-- <tr>
                                            <th align="center"> 库存组织（华盛）</th>
                                            <td>
                                                {{base_info.goods_stock_org_name_ebs}}
                                                
                                            </td>
                                            <th align="center"><span>*</span>EBS商品（华盛）</th>
                                            <td>
                                                <el-select v-model="base_info.goods_id_ebs" placeholder="请选择" filterable @change="changeEBSGoodsHS" clearable>
                                                    <el-option v-for="item in ebsGoodsHS" v-show="ebsGoodsHS.length>0" :value="item.inventory_item_id" :key="item.inventory_item_id" :label="item.description"></el-option>
                                                </el-select>
                                            </td>
                                        </tr> -->
                                        <!-- <tr>
                                            <th align="center"> 库存组织（香港）</th>
                                            <td>
                                                {{base_info.goods_stock_org_name_ebs_hk}}
                                               
                                            </td>
                                            <th align="center"> EBS商品（香港）</th>
                                            <td>
                                                <el-select v-model="base_info.goods_id_ebs_hk" placeholder="请选择" filterable clearable @change="changeEBSGoodsHK">
                                                    <el-option v-for="item in ebsGoodsHK" v-show="ebsGoodsHK.length>0" :value="item.inventory_item_id" :key="item.inventory_item_id" :label="item.description"></el-option>
                                                </el-select>
                                            </td>
                                        </tr> -->
                                        <!-- <tr>
                                            <th align="center"> 销售单位</th>
                                            <td>
                                                <el-select v-model="base_info.goods_sale_unit" placeholder="请选择" size="small" filterable clearable @change="changeSalesUnit">
                                                    <el-option v-for="item in selectOptions.JLDW" v-show="item.symbol==uom_class || !uom_class" :key="item.dictionary_id" :value="item.dic_name" :label="item.dic_name"></el-option>
                                                </el-select>
                                            </td>
                                            <th align="center"> 采购单位</th>
                                            <td>
                                                <el-select v-model="base_info.goods_purchase_unit" placeholder="请选择" size="small" filterable clearable @change="changePurchaseUnit">
                                                    <el-option v-for="item in selectOptions.JLDW" v-show="item.symbol==uom_class || !uom_class" :key="item.dictionary_id" :value="item.dic_name" :label="item.dic_name"></el-option>
                                                </el-select>
                                            </td>
                                        </tr> -->
                                        <tr>

                                            <th align="center">{{$t('enable/disable')}}</th>
                                            <td>
                                                <el-switch v-model="isOpen" active-color="#13ce66" inactive-color="#ddd" :active-text="$t('enable')" :inactive-text="$t('disable')" @change="switchChange">
                                                </el-switch>
                                            </td>
                                            <th></th>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="statistics-info">
                                <div class="class-title">
                                    <div class="title">{{$t('statisticalTag')}}</div>
                                </div>
                                <div class="category-wrap">
                                    <div class="category-label">
                                        <span><span style="padding-right:5px;color:red">*</span>{{$t('category')}}</span>
                                    </div>
                                    <div class="category-select">
                                        <el-select ref="categorySelect" v-model="base_info.goods_category_name" size="small" clearable @clear="clearCategory" :disabled="goodsUsed">
                                            <el-tree ref="categoryTree" :data="selectOptions.category" :props="categoryProps" node-key="dictionary_id" @node-click="handleCategoryClick"></el-tree>
                                            <el-option v-for="item in selectOptions.category" :key="item.dic_code" :value="item.dic_name" :label="item.dic_name" hidden></el-option>
                                        </el-select>
                                    </div>

                                </div>

                                <!-- <div class="statistics-main">

                                    <div class="wrap-box" v-for="(item,index) in labelList" :key="index">
                                        <div class="label"><span>{{item.dic_name}}</span></div>
                                        <div class="value">
                                            <el-select v-model="item.selected" size="small" @change="changeLabel" clearable :disabled="goodsUsed">
                                                <el-option v-for="(opt,index) in item.children" :key="index" :value="opt.dic_name" :label="opt.dic_name"></el-option>
                                            </el-select>
                                        </div>
                                    </div>

                                </div> -->
                            </div>

                        </el-col>
                        <el-col :span="8">
                            <div class="img-info">
                                <div class="class-title">
                                    <div class="title">{{$t('goodsPicture')}}</div>
                                </div>
                                <div class="image-empty" v-if="!base_info.goods_pic_url" @click="showview=true">
                                    <i class="el-icon-plus"></i>
                                    <p>{{$t('uploadPicTip')}}</p>
                                    <syUploadHeader :show.sync="showview" @on-ok="saveHeaderImg" @on-cancel="showview = false" :fileUploadApi="upyun.upyunUrl" :oss="upyun.getyunUrl" :formData="uploadFormData" :maxSize="10240" :src="base_info.goods_pic_url"></syUploadHeader>
                                </div>
                                <div class="image-box" @click="showview=true" v-if="(base_info.goods_pic_url&&!goodsUsed)">
                                    <img :src="base_info.goods_pic_url" alt="">
                                    <syUploadHeader :show.sync="showview" @on-ok="saveHeaderImg" @on-cancel="showview = false" :fileUploadApi="upyun.upyunUrl" :oss="upyun.getyunUrl" :formData="uploadFormData" :maxSize="10240" :src="base_info.goods_pic_url"></syUploadHeader>

                                </div>
                                <div class="image-box" v-if="(base_info.goods_pic_url&&goodsUsed)">
                                    <el-image :src="base_info.goods_pic_url" :preview-src-list="[base_info.goods_pic_url]">
                                    </el-image>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>

            <div v-show="(selectTab==1)" class="order-wrap">
                <div class="order-record">
                    <div class="class-title">
                        <div class="title">{{$t('orderRecords')}}</div>
                    </div>

                    <div class="order-table">
                        <vxe-table border ref="bomTable" :data="orderList" resizable size="small" max-height="100%" auto-resize :column-config="{minWidth:120}" :mouse-config="{selected: true}" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row>
                            <vxe-table-column type="seq" :title="$t('S/N')" width="40" align="center"></vxe-table-column>
                            <vxe-table-column field="order_cus_od_code" :title="$t('orderNo')" min-width="100" header-align="center" align="center">
                                <template v-slot="{row}">
                                    <a class="link" :href="`#/order_detail?flag=${row.order_cus_od_code}&id=${row.order_id}`">{{row.order_cus_od_code}}</a>
                                </template>
                            </vxe-table-column>
                            <vxe-table-column field="order_goods_article_number" :title="$t('goodsNo')" min-width="100" header-align="center" align="center"></vxe-table-column>
                            <vxe-table-column field="order_publish_info" :title="$t('publishInfo')" min-width="100" header-align="center" align="center"></vxe-table-column>
                            <vxe-table-column field="order_business_type" :title="$t('businessType')" min-width="100" header-align="center" align="center"></vxe-table-column>
                            <vxe-table-column field="order_cus_name" :title="$t('customer')" min-width="100" header-align="center" align="center"></vxe-table-column>
                            <vxe-table-column field="order_date" :title="$t('receivingDate')" min-width="100" header-align="center" align="center"></vxe-table-column>
                            <vxe-table-column field="order_goods_name" :title="$t('goodsName')" min-width="90" header-align="center" align="center"></vxe-table-column>
                            <vxe-table-column field="order_goods_spec" :title="$t('specifications')" min-width="100" header-align="center" align="center"></vxe-table-column>
                            <vxe-table-column field="order_goods_qty" :title="$t('orderQuantity')" min-width="100" header-align="center" align="center"></vxe-table-column>
                            <vxe-table-column field="order_goods_price" :title="$t('orderPrice')" min-width="90" header-align="center" align="center"></vxe-table-column>
                            <vxe-table-column field="order_goods_amount" :title="$t('orderAmount')" min-width="100" header-align="center" align="center"></vxe-table-column>
                        </vxe-table>
                    </div>
                </div>
                <!-- <div>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                        <tbody>
                            <tr>
                            </tr>
                        </tbody>
                    </table>
                </div> -->
            </div>

            <!-- <div v-show="selectTab==1" class="bom">
                <div class="bom-btns">
                    <div class="m-r">
                        <el-button size="small" @click="addRow">增行</el-button>
                        <el-button size="small" @click="delRow" style="margin-left:15px">删行</el-button>
                    </div>
                </div>
                <div class="bom-info">
                    <div class="class-title bom-title">
                        <div class="title">BOM信息</div>
                    </div>
                    <div class="bom-table">
                        <vxe-table border ref="bomTable" :data="bom_info" resizable size="small" height="100%" auto-resize :column-config="{minWidth:140}" :row-config="{height:40}" :edit-config="{trigger: 'click', mode: 'cell',activeMethod: activeCellMethod}" :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod}" :mouse-config="{selected: true}" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row>
                            <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>
                            <vxe-table-column field="goods_bom_type_name" title="类型" width="80" align="center" :edit-render="{autofocus:'.el-input__inner'}">
                                <template #edit="{row}">
                                    <el-select v-model="row.goods_bom_type_name" size="small" clearable @change="changeBomType(row)">
                                        <el-option v-for="item in typeOptions" :key="item.value" :value="item.label" :label="item.label"></el-option>
                                    </el-select>
                                </template>
                            </vxe-table-column>
                            <vxe-table-column field="goods_article_number" title="货号" width="120" align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
                                <template #edit="{row}">
                                    <el-input size="small" v-model="row.goods_article_number" clearable></el-input>
                                </template>
                            </vxe-table-column>
                            <vxe-table-column field="goods_purchase_name" title="采购品名" width="140" align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
                                <template #edit="{row}">
                                    <el-input size="small" v-model="row.goods_purchase_name" clearable></el-input>
                                </template>
                            </vxe-table-column>
                            <vxe-table-column field="goods_purchase_spec" title="采购规格" width="140" align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
                                <template #edit="{row}">
                                    <el-input size="small" v-model="row.goods_purchase_spec" clearable></el-input>
                                </template>
                            </vxe-table-column>
                            <vxe-table-column field="goods_purchase_unit" title="采购单位" width="80" align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
                                <template #edit="{row}">
                                    <el-select v-model="row.goods_purchase_unit" size="small" filterable clearable @change="chengePurchaseUnit2(row)">
                                        <el-option v-for="item in selectOptions.JLDW" :key="item.dictionary_id" :value="item.dic_name" :label="item.dic_name"></el-option>
                                    </el-select>
                                </template>

                            </vxe-table-column>
                            <vxe-table-column field="goods_quota_qty" title="定额数量" width="70" align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
                                <template #edit="{row}">
                                    <el-input size="small" v-model="row.goods_quota_qty"></el-input>
                                </template>
                            </vxe-table-column>
                            <vxe-table-column field="goods_ven_name" title="供应商" width="160" align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
                                <template #edit="{row}">
                                    <el-select v-model="row.goods_ven_name" placeholder="请输入关键字选择" size="small" clearable filterable remote :remote-method="remoteMethod3" @change="changeVender2(row)">
                                        <el-option v-for="item in venOptions2" :key="item.ven_id" :value="item.ven_name" :label="item.ven_name"></el-option>
                                    </el-select>
                                </template>

                            </vxe-table-column>
                            <vxe-table-column field="goods_stock_org_name_ebs" width="120" title="库存组织(华盛)" align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
                                <template #edit="{row}">
                                    <el-select v-model="row.goods_stock_org_name_ebs" placeholder="请选择" clearable @change="changeStockHS2(row)" size="small">
                                        <el-option v-for="item in hsStock" :key="item.organization_id" :label="item.organization_name" :value="item.organization_name"></el-option>
                                    </el-select>
                                </template>
                            </vxe-table-column>
                            <vxe-table-column field="goods_name_ebs" title="EBS商品(华盛)" width="100" align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
                                <template #edit="{row}">
                                    <el-select v-model="row.goods_name_ebs" placeholder="请选择" clearable filterable @change="changeEBSGoodsHS2(row)" size="small">
                                        <el-option v-for="item in ebsGoodsHS2" v-show="ebsGoodsHS2.length>0" :value="item.description" :key="item.inventory_item_id" :label="item.description"></el-option>
                                    </el-select>
                                </template>
                            </vxe-table-column>
                            <vxe-table-column field="goods_stock_org_name_ebs_hk" title="库存组织(香港)" width="120" align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
                                <template #edit="{row}">
                                    <el-select v-model="row.goods_stock_org_name_ebs_hk" placeholder="请选择" clearable @change="changeStockHK2(row)" size="small">
                                        <el-option v-for="item in hkStock" :key="item.organization_id" :label="item.organization_name" :value="item.organization_name"></el-option>
                                    </el-select>
                                </template>
                            </vxe-table-column>
                            <vxe-table-column field="goods_name_ebs_hk" title="EBS商品(香港)" width="100" align="center" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
                                <template #edit="{row}">
                                    <el-select v-model="row.goods_name_ebs_hk" placeholder="请选择" clearable filterable @change="changeEBSGoodsHK2(row)" size="small">
                                        <el-option v-for="item in ebsGoodsHK2" v-show="ebsGoodsHK2.length>0" :value="item.description" :key="item.segment1" :label="item.description"></el-option>
                                    </el-select>
                                </template>
                            </vxe-table-column>

                        </vxe-table>
                    </div>
                </div>
            </div> -->
            <template v-slot:footer>
                <div class="m-l">
                </div>
                <div class="m-r">
                    <el-button size="small" @click="save">{{$t('save')}}</el-button>
                    <el-button @click="closeIcon" size="small" style="margin-left:15px">{{$t('cancel')}}</el-button>
                </div>
            </template>
        </vxe-modal>
    </div>
</template>

<script>
import ifsApi from "@/api/ifs";
import goodsApi from "@/api/cbs/goods.js";
import ebsApi from "@/api/gbs/ebs.js";
import config from "@/config/config.js";
import general from "@/common/general.js";

export default {
    props: {
        goods_id: {
            type: [Number, String],
            default: 0,
        },
        selectOptions: {
            type: Object,
        },
    },
    data() {
        return {
            show: true,
            downIcon: true,
            selectTab: 0,
            base_info: {
                goods_creator: `${
                    this.$store.state.user.edepname +
                    " " +
                    this.$store.state.user.name
                }`, //创建人名称部门
                goods_create_time: this.$general.getNowDateTime(), //创建时间
                goods_updator: "", //修改人名称
                goods_update_time: "", //修改时间
                goods_dep_id: this.$store.state.user.edep, //业务部门id
                goods_dep_name: this.$store.state.user.edepname, //业务部门名称
                goods_salesman_id: this.$store.state.user.eid, //业务员id
                goods_salesman_name: this.$store.state.user.name, //业务员名称
                goods_category_name: "", //商品大类
                goods_category_code: "", //商品类别编码
                goods_article_number: "", //货号
                goods_sale_name: "", //销售品名
                goods_purchase_name: "", //采购品名
                goods_name: "", //中文品名
                goods_name_en: "", //英文品名
                goods_sale_spec: "", //销售规格
                goods_purchase_spec: "", //采购规格
                goods_sale_unit: "", //销售单位
                goods_sale_unit_code: "", //销售单位编码
                goods_purchase_unit: "", //采购单位
                goods_purchase_unit_code: "", //采购单位编码
                goods_cus_id: null, //客户ID
                goods_cus_name: "", //客户全称
                goods_ven_id: null, //供应商ID
                goods_ven_name: "", //供应商全称
                goods_stock_org_id_ebs: null, //库存组织ID(华盛)
                goods_stock_org_name_ebs: "", //库存组织名称(华盛)
                goods_id_ebs: null, //商品ID(华盛)
                goods_name_ebs: "", //商品名称(华盛)
                goods_stock_org_id_ebs_hk: null, //库存组织ID(香港)
                goods_stock_org_name_ebs_hk: "", //库存组织名称(香港)
                goods_id_ebs_hk: null, //商品ID(香港)
                goods_name_ebs_hk: "", //商品名称(香港)
                goods_state: null,
                goods_labels: [],
            },
            required: {
                goods_dep_name: "业务部门",
                goods_salesman_name: "业务员",
                goods_article_number: "货号", //货号
                goods_category_name: "商品大类", //商品大类
                goods_name: "中文品名", //中文品名
                goods_cus_name: "客户名称",
            },
            goodsUsed: false,
            cusOptions: [],
            venOptions: [],
            venOptions2: [],
            labelList: [],
            hsStock: [],
            hkStock: [],
            ebsGoodsHS: [],
            ebsGoodsHK: [],
            ebsGoodsHS2: [],
            ebsGoodsHK2: [],
            uom_class: "",
            isOpen: true,
            defaultProps: {
                children: "children",
                label: "label",
            },
            categoryProps: {
                children: "children",
                label: "dic_name",
            },
            // 订单信息
            orderList: [],

            // BOM信息
            bom_info: [],
            typeOptions: [],
            showview: false,
            upyun: config.upyun,
            uploadFormData: {},
        };
    },
    created() {
        if (this.goods_id !== 0) {
            this.getGoodsInfo();
            this.getOrderRecords();
        }
        // this.getDep();
        this.getDicData();
        // this.getStock();
        this.getUploadOSS_Params();
        // this.getBomType();
    },
    mounted() {},
    computed: {
        getTime() {
            return this.$general.getNowDateTime();
        },
    },
    methods: {
        // 部门
        getDep() {
            if (this.$store.state.user.edep) {
                this.selectOptions.dep.forEach((item) => {
                    let children = item.children;
                    if (children && children.length > 0) {
                        children.forEach((data) => {
                            if (data.dep_id == this.$store.state.user.edep) {
                                this.base_info.goods_stock_org_id_ebs =
                                    data.dep_ebs_org_id;
                                this.base_info.goods_stock_org_name_ebs =
                                    data.dep_ebs_org_name;
                                this.base_info.goods_stock_org_id_ebs_hk =
                                    data.dep_ebs_org_id_hk;
                                this.base_info.goods_stock_org_name_ebs_hk =
                                    data.dep_ebs_org_name_hk;
                                if (data.dep_ebs_org_id) {
                                    ebsApi
                                        .getEbsGoods(data.dep_ebs_org_id, "HS")
                                        .then((res) => {
                                            this.ebsGoodsHS = Object.freeze(
                                                res.data
                                            );
                                        });
                                }

                                if (data.dep_ebs_org_id_hk) {
                                    ebsApi
                                        .getEbsGoods(
                                            data.dep_ebs_org_id_hk,
                                            "HK"
                                        )
                                        .then((res) => {
                                            this.ebsGoodsHK = Object.freeze(
                                                res.data
                                            );
                                        });
                                }
                            }
                        });
                    } else {
                        if (item.dep_id == this.$store.state.user.edep) {
                            this.base_info.goods_stock_org_id_ebs =
                                item.dep_ebs_org_id;
                            this.base_info.goods_stock_org_name_ebs =
                                item.dep_ebs_org_name;
                            this.base_info.goods_stock_org_id_ebs_hk =
                                item.dep_ebs_org_id_hk;
                            this.base_info.goods_stock_org_name_ebs_hk =
                                item.dep_ebs_org_name_hk;

                            if (item.dep_ebs_org_id) {
                                ebsApi
                                    .getEbsGoods(item.dep_ebs_org_id, "HS")
                                    .then((res) => {
                                        console.log("EBSshangpin", res);
                                        this.ebsGoodsHS = res.data;
                                    });
                            }

                            if (item.dep_ebs_org_id_hk) {
                                ebsApi
                                    .getEbsGoods(item.dep_ebs_org_id_hk, "HK")
                                    .then((res) => {
                                        this.ebsGoodsHK = res.data;
                                    });
                            }
                        }
                    }
                });
            }
        },

        // 获取字典相关
        async getDicData() {
            // 获取字典数据
            ifsApi.dicData("CBM_GOODS_STATISTICS_LABEL").then((data) => {
                console.log("dic", data);

                this.labelList = data.children; //统计标签
                this.labelList.forEach((item) => {
                    this.$set(item, "selected", "");
                });
                console.log("labelList1", this.labelList);
            });
        },
        // 备货类型
        async getBomType() {
            let data = await this.$dmBaseSet.getOptions();
            this.typeOptions = data.TY_PREPARE_MODE.option_value;
            console.log("typeOptions", this.typeOptions);
        },

        // 商品信息
        getGoodsInfo() {
            goodsApi.getGoodsInfo(this.goods_id).then((res) => {
                console.log("商品信息", res);
                this.base_info = res.data.baseInfo;
                this.bom_info = res.data.bomInfo;

                // let dep_id = this.base_info.goods_dep_id;
                // this.$refs.listTree.setCheckedKeys([dep_id]);

                let state = this.base_info.goods_state;
                if (state == 1) {
                    this.isOpen = true;
                } else if (state == 2) {
                    this.isOpen = false;
                }

                let goods_labels = this.base_info.goods_labels;
                goods_labels.forEach((item) => {
                    this.labelList.forEach((data) => {
                        if (item.label_name == data.dic_name) {
                            data.selected = item.label_value;
                        }
                    });
                });

                // let goods_stock_org_id_ebs =
                //     this.base_info.goods_stock_org_id_ebs;
                // let goods_stock_org_id_ebs_hk =
                //     this.base_info.goods_stock_org_id_ebs_hk;

                // let goods_id_ebs = this.base_info.goods_id_ebs;
                // let goods_id_ebs_hk = this.base_info.goods_id_ebs_hk;
                // if (goods_stock_org_id_ebs) {
                //     ebsApi
                //         .getEbsGoods(goods_stock_org_id_ebs, "HS")
                //         .then((res) => {
                //             console.log("EBSshangpin", res);
                //             this.ebsGoodsHS = Object.freeze(res.data);
                //             if (goods_id_ebs) {
                //                 this.ebsGoodsHS.forEach((item) => {
                //                     if (
                //                         item.inventory_item_id == goods_id_ebs
                //                     ) {
                //                         this.uom_class = item.uom_class;
                //                     }
                //                 });
                //             }
                //         });
                // }

                // if (goods_stock_org_id_ebs_hk) {
                //     ebsApi
                //         .getEbsGoods(goods_stock_org_id_ebs_hk, "HK")
                //         .then((res) => {
                //             this.ebsGoodsHK = Object.freeze(res.data);
                //             if (goods_id_ebs_hk) {
                //                 this.ebsGoodsHK.forEach((item) => {
                //                     if (
                //                         item.inventory_item_id ==
                //                         goods_id_ebs_hk
                //                     ) {
                //                         this.uom_class = item.uom_class;
                //                     }
                //                 });
                //             }
                //         });
                // }

                if (this.bom_info.length > 0) {
                    this.getTypeLabel();
                }

                this.goodsUsed = this.base_info.goods_is_used;
                if (this.goodsUsed) {
                    this.$message({
                        type: "warning",
                        message: "该商品已被引用，禁止编辑！",
                    });
                }
            });
        },

        getOrderRecords() {
            goodsApi.getGoodsOrderRecords(this.goods_id).then((res) => {
                console.log("订单记录", res.data);
                this.orderList = Object.freeze(res.data);
            });
        },

        // 获取类型标签
        getTypeLabel() {
            this.bom_info.forEach((item) => {
                this.$set(item, "goods_bom_type_name", "");

                this.typeOptions.forEach((data) => {
                    if (data.value == item.goods_bom_type) {
                        item.goods_bom_type_name = data.label;
                        return;
                    }
                });
            });
        },
        // 库存组织
        getStock() {
            ebsApi.getEbsStock("HS").then((res) => {
                console.log("库存", res);
                if (res.code == 0) {
                    this.hsStock = Object.freeze(res.data);
                }
            });

            ebsApi.getEbsStock("HK").then((res) => {
                console.log("库存HK", res);
                if (res.code == 0) {
                    this.hkStock = Object.freeze(res.data);
                }
            });
        },

        closeModel() {
            this.show = false;
            this.$refs.model1.close();
            setTimeout(() => {
                this.$emit("closeGoodsEdit");
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

        treeCheck: function (node, list) {
            //node 该节点所对应的对象、list 树目前的选中状态对象
            //选中事件在选中后执行，当lis中有两个选中时，使用setCheckedKeys方法，选中一个节点
            if (list.checkedKeys.length > 1) {
                //单选实现
                this.$refs.listTree.setCheckedKeys([node.dep_id]);
            }
            // this.dep = node.title;
            this.base_info.goods_dep_id = node.value;
            this.base_info.goods_dep_name = node.title;
        },
        depClick(data) {
            console.log("depclick", data);
            if (data.end) {
                this.base_info.goods_dep_id = data.value;
                this.base_info.goods_dep_name = data.title;
                this.base_info.goods_salesman_id = null;
                this.base_info.goods_salesman_name = "";
                this.$refs.depSelect.handleClose();
                this.base_info.goods_stock_org_id_ebs = data.dep_ebs_org_id;
                this.base_info.goods_stock_org_name_ebs = data.dep_ebs_org_name;
                this.base_info.goods_stock_org_id_ebs_hk =
                    data.dep_ebs_org_id_hk;
                this.base_info.goods_stock_org_name_ebs_hk =
                    data.dep_ebs_org_name_hk;
                if (data.dep_ebs_org_id) {
                    ebsApi
                        .getEbsGoods(data.dep_ebs_org_id, "HS")
                        .then((res) => {
                            console.log("EBSshangpin", res);
                            this.ebsGoodsHS = Object.freeze(res.data);
                        });
                }
                if (data.dep_ebs_org_id_hk) {
                    ebsApi
                        .getEbsGoods(data.dep_ebs_org_id_hk, "HK")
                        .then((res) => {
                            this.ebsGoodsHK = Object.freeze(res.data);
                        });
                }
            }
        },
        clearDep() {
            this.$refs.listTree.setCheckedKeys([]);
            this.base_info.goods_dep_id = null;
            this.base_info.goods_dep_name = null;
        },

        changeSales(value) {
            if (value) {
                this.selectOptions.sales.forEach((item) => {
                    if (item.staff_name == value) {
                        this.base_info.goods_salesman_id = item.staff_id;
                    }
                });
            } else {
                this.base_info.goods_salesman_id = null;
            }
        },
        handleCategoryClick(data) {
            console.log("category", data);
            if (data.is_end == 1) {
                this.base_info.goods_category_code = data.dic_code;
                this.base_info.goods_category_name = data.dic_name;
                this.$refs.categorySelect.handleClose();
            }
        },
        clearCategory() {
            this.base_info.goods_category_code = "";
            this.base_info.goods_category_name = "";
        },

        changeCategory(data) {
            console.log("category", data);
            let res = this.$refs.categoryTree.getCheckedNodes();
            console.log("hahahahah", res);
        },

        changeSalesUnit(value) {
            if (value) {
                this.base_info.goods_purchase_unit = value;
                this.selectOptions.JLDW.forEach((item) => {
                    if (item.dic_name == value) {
                        this.base_info.goods_sale_unit_code = item.dic_code;
                        this.base_info.goods_purchase_unit_code = item.dic_code;
                    }
                });
            } else {
                this.base_info.goods_sale_unit_code = "";
            }
        },
        changePurchaseUnit(value) {
            if (value) {
                this.selectOptions.JLDW.forEach((item) => {
                    if (item.dic_name == value) {
                        this.base_info.goods_purchase_unit_code = item.dic_code;
                    }
                });
            } else {
                this.base_info.goods_purchase_unit_code = "";
            }
        },
        // 销售规格
        changeSalesSpec(value) {
            this.base_info.goods_purchase_spec = value;
        },
        changeCustomer(value) {
            if (value) {
                this.selectOptions.allCus.forEach((item) => {
                    if (item.trader_name == value) {
                        this.base_info.goods_cus_id = item.trader_id;
                    }
                });
            } else {
                this.base_info.goods_cus_id = null;
            }
        },
        clearCustomer() {
            this.cusOptions = [];
        },
        remoteMethod1(query) {
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
        changeVender(value) {
            if (value) {
                this.selectOptions.vender.forEach((item) => {
                    if (item.trader_name == value) {
                        this.base_info.goods_ven_id = item.trader_id;
                    }
                });
            } else {
                this.base_info.goods_ven_id = null;
            }
        },
        clearVender() {
            this.venOptions = [];
        },
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
        // changeStockHS(value) {
        //     if (value) {
        //         this.hsStock.forEach((item) => {
        //             if (item.organization_name == value) {
        //                 this.base_info.goods_stock_org_id_ebs =
        //                     item.organization_id;
        //                 ebsApi
        //                     .getEbsGoods(item.organization_id, "HS")
        //                     .then((res) => {
        //                         console.log("EBSshangpin", res);
        //                         this.ebsGoodsHS = Object.freeze(res.data);
        //                     });
        //             }
        //         });
        //     } else {
        //         this.base_info.goods_stock_org_id_ebs = null;
        //     }
        // },
        // changeStockHK(value) {
        //     if (value) {
        //         this.hkStock.forEach((item) => {
        //             if (item.organization_name == value) {
        //                 this.base_info.goods_stock_org_id_ebs_hk =
        //                     item.organization_id;
        //                 ebsApi
        //                     .getEbsGoods(item.organization_id, "HK")
        //                     .then((res) => {
        //                         console.log("EBSshangpinHK", res);
        //                         this.ebsGoodsHK = Object.freeze(res.data);
        //                     });
        //             }
        //         });
        //     } else {
        //         this.base_info.goods_stock_org_id_ebs_hk = null;
        //     }
        // },
        changeEBSGoodsHS(value) {
            if (value) {
                this.ebsGoodsHS.forEach((item) => {
                    if (item.inventory_item_id == value) {
                        this.base_info.goods_name_ebs = item.description;
                        this.uom_class = item.uom_class;
                    }
                });
            } else {
                this.base_info.goods_name_ebs = "";
            }
        },
        changeEBSGoodsHK(value) {
            if (value) {
                this.ebsGoodsHK.forEach((item) => {
                    if (item.inventory_item_id == value) {
                        this.base_info.goods_name_ebs_hk = item.description;
                        this.uom_class = item.uom_class;
                    }
                });
            } else {
                this.base_info.goods_name_ebs_hk = "";
            }
        },
        switchChange(value) {
            this.isOpen = value;
            if (value) {
                this.base_info.goods_state = 1;
            } else {
                this.base_info.goods_state = 2;
            }
        },
        changeLabel(value) {
            console.log("value1111", value);
            console.log("label数组", this.labelList);
        },
        getUploadOSS_Params() {
            // 获取上传OSS时需要携带的数据参数
            this.uploadFormData = general.upyunParams() || {};
            console.log("uploadFormData", this.uploadFormData);

            const timer = setInterval(() => {
                this.uploadFormData = general.upyunParams() || {};
            }, 1000);
            this.$once("hook:beforeDestroy", () => {
                clearInterval(timer);
                //console.log('清除了一个定时器')
            });
        },
        // 回填上传的款式图片地址到款式表
        saveHeaderImg(file) {
            this.base_info.goods_pic_url = file.ref_url;
        },
        editMethod({ row, column }) {
            const $table = this.$refs.bomTable;
            // 重写默认的覆盖式，改为追加式
            $table.setActiveCell(row, column);
        },
        addRow() {
            this.bom_info.push({
                goods_article_number: "", //货号
                goods_stock_org_id_ebs: this.base_info.goods_stock_org_id_ebs, //库存组织ID(华盛) **
                goods_stock_org_name_ebs:
                    this.base_info.goods_stock_org_name_ebs, //库存组织名称(华盛)
                goods_stock_org_id_ebs_hk:
                    this.base_info.goods_stock_org_id_ebs_hk, //库存组织ID(香港)**
                goods_stock_org_name_ebs_hk:
                    this.base_info.goods_stock_org_name_ebs_hk, //库存组织名称(香港)
                goods_id_ebs: null, //商品ID(华盛)**
                goods_name_ebs: "", //商品名称(华盛)
                goods_id_ebs_hk: null, //商品ID(香港)**
                goods_name_ebs_hk: "", //商品名称(香港)
                goods_purchase_name: "", //采购品名
                goods_purchase_spec: "", //采购规格
                goods_ven_id: null, //供应商ID**
                goods_ven_name: "", //供应商全称
                goods_bom_type: "01", //采购类型value
                goods_bom_type_name: "境内采购", //采购类型标签
                goods_quota_qty: 1, //bom定额数量
                goods_purchase_unit_code: "", //采购单位编码**
                goods_purchase_unit: "", //采购单位
            });

            this.ebsGoodsHS2 = this.ebsGoodsHS;

            this.ebsGoodsHK2 = this.ebsGoodsHK;
        },
        delRow() {
            if (this.bom_info.length > 0) {
                const table = this.$refs.bomTable;
                const selectRecords = table.getCheckboxRecords();
                console.log("sel", selectRecords);
                if (selectRecords.length > 0) {
                    this.$confirm("确定要删除bom信息?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                        .then(() => {
                            this.$refs.bomTable.removeCheckboxRow();
                            selectRecords.forEach((data) => {
                                this.bom_info = this.bom_info.filter((item) => {
                                    return item !== data;
                                });
                            });
                            console.log("删除后的bom", this.bom_info);
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
        activeCellMethod({ row, column, columnIndex }) {
            if (
                [
                    "goods_purchase_unit",
                    "goods_ven_name",
                    "goods_stock_org_name_ebs",
                    "goods_name_ebs",
                    "goods_stock_org_name_ebs_hk",
                    "goods_name_ebs_hk",
                ].includes(column.property)
            ) {
                if (row.goods_article_number.trim() == "") {
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
        changeVender2(row) {
            this.selectOptions.vender.forEach((data) => {
                if (data.ven_name == row.goods_ven_name) {
                    row.goods_ven_id = data.ven_id;
                }
            });
        },
        remoteMethod3(query) {
            if (query !== "") {
                this.venOptions2 = this.selectOptions.vender.filter((item) => {
                    return (
                        item.ven_name
                            .toLowerCase()
                            .indexOf(query.toLowerCase()) > -1
                    );
                });
            } else {
                this.venOptions2 = [];
            }
        },
        changeBomType(row) {},
        chengePurchaseUnit2(row) {
            console.log("purchase", row);
            this.selectOptions.JLDW.forEach((data) => {
                if (data.dic_name == row.goods_purchase_unit) {
                    row.goods_purchase_unit_code = data.dic_code;
                }
            });
        },
        changeStockHS2(row) {
            this.hsStock.forEach((data) => {
                if (data.organization_name == row.goods_stock_org_name_ebs) {
                    row.goods_stock_org_id_ebs = data.organization_id;

                    ebsApi
                        .getEbsGoods(data.organization_id, "HS")
                        .then((res) => {
                            this.ebsGoodsHS2 = Object.freeze(res.data);
                        });
                }
            });
        },
        changeStockHK2(row) {
            this.hkStock.forEach((data) => {
                if (data.organization_name == row.goods_stock_org_name_ebs_hk) {
                    row.goods_stock_org_id_ebs_hk = data.organization_id;
                    ebsApi
                        .getEbsGoods(data.organization_id, "HK")
                        .then((res) => {
                            this.ebsGoodsHK2 = Object.freeze(res.data);
                        });
                }
            });
        },
        changeEBSGoodsHS2(row) {
            if (
                row.goods_stock_org_name_ebs !== "" &&
                this.ebsGoodsHS2.length == 0
            ) {
                this.hsStock.forEach((data) => {
                    if (
                        data.organization_name == row.goods_stock_org_name_ebs
                    ) {
                        ebsApi
                            .getEbsGoods(data.organization_id, "HS")
                            .then((res) => {
                                this.ebsGoodsHS2 = Object.freeze(res.data);
                            });
                    }
                });
            }

            this.ebsGoodsHS2.forEach((data) => {
                if (data.description == row.goods_name_ebs) {
                    row.goods_id_ebs = data.inventory_item_id;
                }
            });
        },
        changeEBSGoodsHK2(row) {
            if (
                row.goods_stock_org_name_ebs_hk !== "" &&
                this.ebsGoodsHK2.length == 0
            ) {
                this.hkStock.forEach((data) => {
                    if (
                        data.organization_name ==
                        row.goods_stock_org_name_ebs_hk
                    ) {
                        ebsApi
                            .getEbsGoods(data.organization_id, "HK")
                            .then((res) => {
                                this.ebsGoodsHK2 = Object.freeze(res.data);
                            });
                    }
                });
            }

            this.ebsGoodsHK2.forEach((data) => {
                if (data.description == row.goods_name_ebs_hk) {
                    row.goods_id_ebs_hk = data.inventory_item_id;
                }
            });
        },
        save() {
            for (let key in this.required) {
                if (!this.base_info[key]) {
                    this.$message({
                        message: "请填写" + `${this.required[key]}` + "!",
                        type: "error",
                    });
                    return;
                }
            }
            if (!this.base_info.goods_pic_url) {
                this.$message({
                    message: "请上传商品图片！",
                    type: "error",
                });
                return;
            }

            this.handleSave();
            console.log("baocunBase", this.base_info);
            console.log("baocunBOM", this.bom_info);
            goodsApi
                .updateGoodsInfo(this.base_info, this.bom_info)
                .then((data) => {
                    if (data.code == 0) {
                        this.$message({
                            message: "商品信息保存成功！",
                            type: "success",
                        });

                        this.closeModel();
                    }
                });
        },
        handleSave() {
            this.base_info.goods_labels = [];
            this.labelList.forEach((item) => {
                let obj = {
                    label_name: "",
                    label_value: "",
                };

                obj.label_name = item.dic_name;
                obj.label_value = item.selected;
                this.base_info.goods_labels.push(obj);
            });
            if (this.isOpen) {
                this.base_info.goods_state = 1;
            } else {
                this.base_info.goods_state = 2;
            }

            if (this.bom_info.length > 0) {
                this.getTypeValue();
                console.log("删除type_name", this.bom_info);
            }
        },
        getTypeValue() {
            for (let i = 0; i < this.bom_info.length; i++) {
                for (let j = 0; j < this.typeOptions.length; j++) {
                    if (
                        this.bom_info[i].goods_bom_type_name ==
                        this.typeOptions[j].label
                    ) {
                        this.bom_info[i].goods_bom_type =
                            this.typeOptions[j].value;
                        delete this.bom_info[i].goods_bom_type_name;
                        break;
                    }
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.create-info {
    display: flex;
    width: 100%;
    margin: 15px 0;
    span {
        padding-left: 10px;
    }
    .change-info {
        margin-left: 15px;
    }
}
.table-body {
    margin-top: 15px;
    table.definition tbody tr th {
        height: 26px;
    }
    table.definition tbody tr td {
        height: 26px;
    }
    .statistics-info {
        margin-top: 15px;
        .category-wrap {
            display: flex;
            align-items: center;
            .category-label {
                width: 80px;
            }
        }
        .statistics-main {
            display: flex;
            flex-wrap: wrap;
            margin-top: 10px;
            .wrap-box {
                display: flex;
                margin: 10px 20px 0 0;
                align-items: center;
                min-width: 180px;
                .label {
                    width: 80px;
                    span {
                        margin-left: 10px;
                    }
                }
            }
        }
    }
    .img-info {
        padding-left: 35px;
        .image-box {
            width: 300px;
            height: 330px;
            img,
            .el-image {
                max-width: 100%;
                max-height: 100%;
            }
        }
        .image-empty {
            width: 300px;
            height: 330px;
            border: 1px dashed #ddd;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            i {
                font-size: 40px;
            }
            p {
                font-size: 16px;
                margin-top: 15px;
                color: #bbb;
            }
        }
    }
}
.bom {
    height: 80%;
    .bom-btns {
        overflow: hidden;

        margin: 15px 0 0 0;
    }
    .bom-info {
        height: 100%;
        .bom-title {
            margin-top: -10px;
        }
        .bom-table {
            height: 100%;
        }
    }
}
.order-wrap {
    height: 90%;
    .order-record {
        margin-top: 15px;
        height: 100%;
        .order-table {
            margin-top: 15px;
            height: 90%;
        }
    }
}
a {
    text-decoration: underline;
}
</style>