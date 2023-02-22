<style scoped lang="scss">
    .left-fee{
        position: absolute;
        top:5px;
        left:10px;
        width: 48%;
        bottom: 0px;
    }
    .right-fee{
        position: absolute;
        top:5px;
        right:10px;
        width: 48%;
        bottom: 0px;
    }	

    .note-img {
		position: relative;
        ul {
            li {
                float: left;
            }
        }
		background: #fafafa;
        line-height:30px;
		width: 190px;
		height: 230px;
        img {
            height:auto;
			max-width: 100%;
			max-height: 100%;
			transform: translateX(-50%) translateY(-50%);
			top: 50%;
			left: 50%;
			position: absolute;
        }

        b {
            font-size: 16px;
        }

        label {
            border: 1px solid $border-color;
            padding: 2px 5px;
            margin-right: 5px;
        }
    }
    .main-col {
        border: 1px solid $border-color;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 15px;
        text-align: center;
        height: 100px;

        .title {
            font-size: 18px;
        }

        .digital {
            font-size: 26px;
            font-weight: bold;
            margin-top: 15px;
            color: $primary-color;
        }

        &:hover {
            margin-top: -5px;
            -webkit-transition: all .3s;
            transition: all .3s;
            border: 1px solid $primary-color;
        }
    }
</style>
<template>
    <div>
        <el-row>
            <div class="class-title">
                <div class="title">基本信息</div>
            </div>
            <el-row style="border-bottom: 1px dashed #ddd;padding: 10px 0;">
				<el-col :span="18" style="height: 25px;">客户：<span style="font-size:15px;"><b>{{orderData.order_cus_name}}</b></span></el-col>
				<el-col :span="6" style="height: 25px;">业务类型：<span style="font-size:15px;"><b>{{orderData.order_business_type}}</b></span></el-col>
			</el-row>
			<div style="padding-top:10px">
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
					<tbody>
						<tr>
							<th width="120" align="left">业务部门</th>
							<td style="word-break: break-all;" width="200">{{orderData.order_dep_name}}</td>
							<th width="120" align="left">接单币种</th>
							<td width="200">{{orderData.order_currency}}</td>
							<th width="120" align="left">信用证号</th>
							<td>{{orderData.order_lc_no}}</td>
						</tr>
						<tr>
							<th align="left">业务员</th>
							<td>{{orderData.order_salesman_name}}</td>
							<th align="left">美元汇率</th>
							<td>{{orderData.order_ex_rate_usd}}</td>
							<th align="left">开证日期</th>
							<td>{{orderData.order_lc_issue_date}}</td>
						</tr>
						<tr>
							<th align="left">接单日期</th>
							<td>{{orderData.order_date}}</td>
							<th align="left">价格条款</th>
							<td>{{orderData.order_price_clause}}</td>
							<th align="left">开证银行</th>
							<td></td>
						</tr>	
						<tr>
							<th align="left">接单抬头</th>
							<td>{{orderData.order_title_name}}</td>
							<th align="left">结算方式</th>
							<td><span>{{orderData.order_collect_mode}}</span><span style="padding-left:10px">{{orderData.order_collect_days}} 天</span> </td>
							<th align="left">起运港</th>
							<td>{{orderData.order_port_from}}</td>
						</tr>	
						<tr>
							<th align="left">PI/PO</th>
							<td>{{orderData.order_cus_od_code}}</td>
							<th align="left">运输方式</th>
							<td>{{orderData.order_shipping_mode}}</td>
							<th align="left">目的港</th>
							<td>{{orderData.order_port_to}}</td>
						</tr>	
					</tbody>
				</table>
			</div>
        </el-row>
        <el-row :gutter="0" style="top:-1px">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition" >
                <tbody>
                    <tr>
                        <th align="left" width="120" >订单备注</th>
                        <td>
                            {{orderData.order_memo}}
                        </td>
                    </tr>
                </tbody>		
            </table>
        </el-row>
		<el-row style="padding-top: 30px;">
            <div class="class-title">
                <div class="title">评审信息</div>
            </div>
			<el-row :gutter="30">
                <el-col :span="8">
                    <div class="main-col">
                        <div class="title">订单金额</div>
                        <div class="digital">{{orderData.order_currency}} {{$general.transform(orderData.order_amount_oc || 0)}}</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="main-col">
                        <div class="title">毛利润</div>
                        <div class="digital">{{$general.transform(orderData.order_profit || 0)}}</div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="main-col">
                        <div class="title">毛利率 %</div>
                        <div class="digital">{{$general.transform(orderData.order_profit_rate || 0)}}</div>
                    </div>
                </el-col>
            </el-row>
		</el-row>
        <el-row style="padding-top: 30px;">
            <div class="class-title">
                <div class="title">预算信息</div>
            </div>
			
            <div>
				<vxe-table resizable stripe highlight-hover-row highlight-current-row border round auto-resize 
				 column-min-width="140" :data="budgetInfo" class="vxe-table-scrollbar" 
				>
					<vxe-table-column type="seq" title="序号" align="center" width="60" ></vxe-table-column>
					<vxe-table-column field="label" title="预算项目" header-align="center" align="left" width="200" >
                        <template v-slot="{ row }">
                            <span :style="{color: row.color ? 'red' : 'black'}">{{row.label}}</span>
                        </template>
                    </vxe-table-column>
					<vxe-table-column field="unit" title="币种/单位" align="center" width="80"></vxe-table-column>
					<vxe-table-column field="value" title="金额" header-align="center" align="right" width="180">
                        <template v-slot="{ row }">
                            <span :style="{color: row.color ? 'red' : 'black'}">{{row.value}}</span>
                        </template>
					</vxe-table-column>
					<vxe-table-column field="memo" title="说明" header-align="center" align="left"></vxe-table-column>
				</vxe-table>
			</div>
		</el-row>

        <el-row style="padding-top: 30px;">
			<div class="class-title">
				<div class="title">费用信息</div>
			</div>
		</el-row>
		<el-row>
			<div>
				<div class="left-fee">
					<vxe-table ref="feeCnyData" border resizable :data="orderData.order_fee_cny_detail" height="500" class="mytable-scrollbar" 
					auto-resize :column-config="{minWidth:140}" :footer-method="footerMethod" show-footer>
						<vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
						<vxe-table-column field="name" title="费用名称(CNY)" header-align="center" align="center"  ></vxe-table-column>
						<vxe-table-column  field="amount" title="费用金额" width="120" header-align="center" align="right" formatter="formatAmount" ></vxe-table-column>
					</vxe-table>	
				</div>
				<div class="right-fee">
					<vxe-table ref="feeUsdData" border resizable :data="orderData.order_fee_usd_detail" height="500" 
					class="mytable-scrollbar" auto-resize :column-config="{minWidth:140}" :footer-method="footerMethod" show-footer>
						<vxe-table-column type="seq" title="序号" width="40" align="center"></vxe-table-column>
						<vxe-table-column field="name" title="费用名称(USD)" header-align="center" align="center"  ></vxe-table-column>
						<vxe-table-column  field="amount" title="费用金额" width="120" header-align="center" align="right" formatter="formatAmount" ></vxe-table-column>
					</vxe-table>	
				</div>
			</div>
		</el-row>
       
    </div>
</template>

<script>

    export default {
        name: 'order_budget',
        components: {
        },
        props: {
            orderData: Object,
            budgetInfo:Array,
        },
        created() {
        },
            
        data() {
            return {
                
            }
        },

        watch: {
            
        },
        methods: {
            footerMethod ({ columns, data }) {
			  return [
				columns.map((column, columnIndex) => {
				  if (columnIndex === 1) {
					return '合计'
				  }
				 if(['amount'].includes(column.property)){
					return this.$XEUtils.sum(data, column.property).toFixed(2);
				 }
				  return null
				}),
			  ]
			},
           
        }
    }
</script>

<style>
</style>