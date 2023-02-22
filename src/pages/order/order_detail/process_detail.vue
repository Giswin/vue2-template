<style scoped lang="scss">
    //特殊样式，而不通用请在这里写样式
    .main-invoice {
        border: 1px solid $border-color;
        padding: 15px;
        box-sizing: border-box;

        background: #fff;
        width: 1100px;
        margin: auto;
        box-shadow: 0px 0px 8px 0px #ddd;

        .header {
            // text-align: center;
            border-bottom: 1px solid $border-color;
            padding: 10px 0;
            position: relative;
            .title{
				font-weight: bold;
				font-size:22px;
				text-align: center;
				color: #000;
			}
			.data-xx{
				position: absolute;
				top:4px;
				left: 10px;
			}
            .head-sp{
				position: absolute;
				top:2px;
				right: 20px;
                width: 60px;
				line-height: 60px;
				text-align: center;
				font-size: 16px;
			}
            .draft{
				background: #eee;
			}
            .change{
                background: #d5232f;
                color: #fff;
            }
            .finish{
                background: #67C23A;
                color: #fff;
            }
            .pause{
                background: #E6A23C;
                color: #fff;
            }
        }
    }
    .contract-main {
        margin-left: 10px;
        margin-right: 10px;
        margin-top: 10px;
        >>> .w-e-text-container {
            height: 280px !important;
        }
        .contract-clause {
            border: 1px solid #ddd;
            height: 800px;
            overflow: auto;
            p {
                padding: 0 5px;
                line-height: 28px;
            }
        }
    }
</style>
<template>
    <div class="detail-fixed of">
        <div class="main-invoice">
            <div class="header">
                <div class="data-xx">
					<ul>
						<li>创建信息：{{base_info.contract_create_time}} {{base_info.contract_creator}}</li>
						<li>修改信息：{{base_info.contract_update_time}} {{base_info.contract_updator}}</li>
						<li>发布信息：{{base_info.contract_publish_time}} {{base_info.contract_publisher}}</li>
					</ul>
				</div>
                <div class="title">
                    加工合同详情<br>Process Contract Detail
                </div>
                <div @click="modalFlow = true" style="cursor:pointer">
                    <div class="head-sp draft" v-show="base_info.contract_state == 1">草稿</div>
                    <div class="head-sp pause" v-show="base_info.contract_state == 2 && base_info.contract_state_aprv == 1">待审核</div>
                    <div class="head-sp change" v-show="base_info.contract_state == 2 && base_info.contract_state_aprv == 3">拒绝</div>
                    <div class="head-sp change" v-show="base_info.contract_state == 3">变更中</div>
                    <div class="head-sp finish" v-show="base_info.contract_state == 2 && base_info.contract_state_aprv == 2">已审核</div>
                    <div class="head-sp change" v-show="base_info.contract_state == 5">中止</div>
                </div>
            </div>
            <div class="class-title" style="margin-top:20px">
                <div class="title">基本信息</div>
            </div>
            <div style="margin: 0 10px;">
                <el-row :gutter="0">
                    <el-col :span="12">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                            <tbody>
                                <tr>
                                    <th width="100" align="left">业务部门</th>
                                    <td>
                                        {{base_info.contract_dep_name}}
                                    </td>
                                </tr>
                                <tr>
                                    <th align="left">业务员</th>
                                    <td>
                                        {{base_info.contract_salesman_name}}
                                    </td>
                                </tr>
                                <tr>
                                    <th align="left">合同类型</th>
                                    <td>
                                        <span v-if="base_info.contract_type == 'DIS'">双经销</span>
                                        <span v-if="base_info.contract_type == 'P_AGENCY'">纯加工</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="left">合同日期</th>
                                    <td>
                                        {{base_info.contract_date}}
                                    </td>
                                </tr>
                                <tr>
                                    <th align="left">接单抬头</th>
                                    <td>
                                        {{base_info.contract_title_name}}
                                    </td>
                                </tr>
                                <tr>
                                    <th align="left">币种</th>
                                    <td>
                                        {{base_info.contract_currency}}
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <th align="left">汇率</th>
                                    <td>
                                        {{base_info.contract_ex_rate}}
                                    </td>
                                </tr>
                                <tr>
                                    <th align="left">签订地</th>
                                    <td>
                                        {{base_info.contract_sign_place}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                    <el-col :span="12">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                            <tbody>
                                <tr>
                                    <th width="100" align="left">实际供应商</th>
                                    <td colspan="3">
                                        {{base_info.contract_actual_supply_title_name}}
                                    </td>
                                </tr>
                                <tr>
                                    <th width="100" align="left">地址</th>
                                    <td colspan="3">
                                        {{base_info.contract_actual_supply_address}}
                                    </td>
                                </tr>
                                <tr>
                                    <th width="100" align="left">开户行</th>
                                    <td colspan="3">
                                        {{base_info.contract_actual_supply_contract_info.b_bank_name}}
                                    </td>
                                </tr>
                                <tr>
                                    <th align="left">账号</th>
                                    <td colspan="3">
                                        {{base_info.contract_actual_supply_contract_info.b_bank_account_num}}
                                    </td>
                                </tr>
                                <tr>
                                    <th width="100" align="left">法定代理人</th>
                                    <td colspan="3">
                                        {{base_info.contract_actual_supply_contract_info.b_legal_person_b}}
                                    </td>
                                </tr>
                                <tr>
                                    <th width="100" align="left">委托代理人</th>
                                    <td colspan="3">
                                        {{base_info.contract_actual_supply_contract_info.b_legal_person_e}}
                                    </td>
                                </tr>
                                <tr>
                                    <th align="left">电话</th>
                                    <td colspan="3">
                                        {{base_info.contract_actual_supply_tel}}
                                    </td>
                                </tr>
                                <tr>
                                    <th align="left">溢装(%)</th>
                                    <td>
                                        {{base_info.contract_over_rate}}
                                    </td>
                                    <th width="100" align="left">短装(%)</th>
                                    <td>
                                        {{base_info.contract_short_rate}}
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </el-col>
                </el-row>
            
            </div>

            <div class="class-title" style="margin-top:20px;padding-right:10px">
                <div class="title">合同明细</div>
            </div>
            <div style="margin: 0 10px;">
                <vxe-table ref="goodsTable" border resizable :data="detailInfo" size="small" auto-resize :column-config="{minWidth:120}" class="mytable-scrollbar"
                highlight-current-row highlight-hover-row show-footer :footer-method="footerMethod" show-overflow>
                    <vxe-table-column type="seq" title="序号" width="40" align="center" fixed="left"></vxe-table-column>
                    <vxe-table-column field="contract_detail_article_number" title="加工货号" width="100" align="center" >
                    </vxe-table-column>
                    <vxe-table-column field="contract_detail_name" title="加工品名" width="100" header-align="center" align="left" >
                    </vxe-table-column>
                    <vxe-table-column v-if="base_info.contract_is_stock==1" field="contract_detail_goods_name_ebs" title="商品名称-EBS" width="120" align="left" header-align="center" >
                    </vxe-table-column>
                    <vxe-table-column field="contract_detail_spec" title="规格" width="100" header-align="center" align="left" >
                    </vxe-table-column>
                    <vxe-table-column field="contract_detail_qty" title="数量" width="80" header-align="center" align="right" >
                    </vxe-table-column>
                    <vxe-table-column field="contract_detail_unit" title="单位" width="50" header-align="center" align="center" >
                    </vxe-table-column>
                    <vxe-table-column field="contract_detail_price" title="单价" width="80" header-align="center" align="right" >
                    </vxe-table-column>
                    <vxe-table-column field="contract_detail_tax_rate" title="税率" width="58" header-align="center" align="right" formatter="formatAmount" >
                    </vxe-table-column>
                    <vxe-table-column field="contract_detail_amount" title="金额" header-align="center" align="right" formatter="formatAmount" ></vxe-table-column>
                    <vxe-table-column field="contract_detail_end_process_price" title="成品单价" width="80" header-align="center" align="right" :edit-render="{autofocus:'.el-input__inner',autoselect:true}">
					
                    </vxe-table-column>
                    <vxe-table-column field="contract_detail_etd" title="交货日期" header-align="center" align="left" >
                    </vxe-table-column>
                </vxe-table>
            </div>

            <div class="class-title" style="margin-top:20px">
                <div class="title">合同条款</div>
                
            </div>
            <div class="contract-main">
                <div class="contract-clause">
                    <div v-for="item in clauseList" :key="item.dictionary_id">
                        <p v-html="item.memo"></p>
                    </div>
                </div>
            </div>

            <div class="class-title" style="margin-top:20px;padding-right:10px">
                <div class="title">其他条款</div>
            </div>
            <div style="margin: 0 10px;">
                <vxe-table ref="payTable" border resizable :data="base_info.contract_collect_clause" show-overflow size="small" auto-resize :column-config="{minWidth:120}" class="mytable-scrollbar" highlight-current-row highlight-hover-row >
                    <vxe-table-column field="payment_term_label" title="付款类型" width="140" header-align="center" >
                    </vxe-table-column>
                    <vxe-table-column field="payment_method_label" title="付款方式" width="140" header-align="center" >
                    </vxe-table-column>
                    <vxe-table-column field="percentage" title="比例(%)" width="100" header-align="center" align="right" >
                    </vxe-table-column>
                    <vxe-table-column field="due_days" title="天数" width="100" header-align="center" align="right">
                    </vxe-table-column>
                    <vxe-table-column field="description" title="条款描述" header-align="center" align="right" >
                    </vxe-table-column>
                </vxe-table>
                <div v-if="modalFlow" style="width:1070px;margin:auto;height:330px;top:90px;position: fixed;display: flex;" >
                    <approve_flow :RecordDatalist="RecordDatalist" v-if="modalFlow" :show.sync="modalFlow"></approve_flow>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import purchaseApi from "@/api/cbs/purchase.js";
import approve_flow from '@/pages/order/order_detail/approve_flow';
    export default {
		props:{
			
		},
    	components: {
    		approve_flow
    	},
        data() {
            return {
                contract_id: Number(this.$route.query.id),
                detailInfo:[],
                tkList:[],
                clauseList:[],
                base_info:{
                    //实际供应商联系人信息
                    contract_actual_supply_contract_info: {
                        b_name: "",
                        b_email: "",
                        b_mobile: "",
                        b_bank_name: "",
                        b_legal_person_b: "",
                        b_legal_person_e: "",
                        b_bank_account_num: "",
                    },
                },
                modalFlow:false,
                RecordDatalist:[],
            }
        },
    	created () {
			this.initData()
			
    	},
		methods:{
            initData(){
                purchaseApi.getContractInfo(this.contract_id).then((res) => {
                    this.base_info = res.data.baseInfo;
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
                        return a.order_goods_row_number - b.order_goods_row_number;
                    });

                    if(this.base_info.contract_state != 1){
                        this.get_flowRecords()
                    }
                    
                });
            },

            //获取流程记录
            get_flowRecords(){
                purchaseApi.getContractFlowList(this.contract_id).then((result)=>{
                    if(result.code == 0){
                        this.RecordDatalist = result.data || [];
                    }
                })
            },

            footerMethod({ columns, data }) {
                return [
                    columns.map((column, columnIndex) => {
                        if (columnIndex === 2) {
                            return "合计";
                        }
                        if (["contract_detail_qty"].includes(column.property)) {
                            let value = this.$XEUtils.sum(data, column.property);
                            return this.$general.transform(value, 2);
                        }
                        if (["contract_detail_amount"].includes(column.property)) {
                            let value = this.$XEUtils.sum(data, column.property);
                            return this.$general.transform(value, 2);
                        }
                        return "";
                    }),
                ];
            },
        },
		watch:{
			
		},
    }
</script>

<style>
</style>