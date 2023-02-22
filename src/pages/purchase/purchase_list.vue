<template>
    <div class="wrapper" :style="{'left':$store.state.css.navWidth + 'px'}">
        <div class="roles-container">
            <div class="lis-tabs">
                <div class="tabs">
                    <div class="tabs-col" :class="{ show: selectTab == 0 }" @click="selectChange(0)">待采购</div>
                    <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectChange(1)">草稿</div>
                    <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectChange(2)">在手</div>
                    <div class="tabs-col" :class="{ show: selectTab == 3 }" @click="selectChange(3)">结案</div>
                    <div class="tabs-right">
                        <div class="tabs-search">
                            <div class="m-l">
                                <el-input v-if="selectTab==0" placeholder="订单号/货号/品名/规格/部门/业务员" v-model="preCondition.keyword" @keyup.enter.native="query" clearable class="input-with-select" style="width:350px;" size="small">
                                    <el-button slot="append" icon="el-icon-search" @click="query"></el-button>
                                </el-input>
                                <el-input v-else placeholder="合同号/部门/业务员/供应商" v-model="condition.keyword" @keyup.enter.native="query" clearable class="input-with-select" style="width:350px;" size="small">
                                    <el-button slot="append" icon="el-icon-search" @click="query"></el-button>
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="listform">
                <div class="form-body" style="margin-right:15px;">
                    <div class="tags" style="margin-top: 13px;">
                        <div class="m-l" style="margin: 0 10px;">筛选条件:</div>
                        <div class="m-l">
                            <filter-tag :tags="formTags" @remove-tag="closeTag"></filter-tag>
                        </div>
                    </div>
                    <div class="form-button">
                        <!-- <div class="m-l" style="margin-left: 5px;">
                            <filter-form ref="filterForm" :conditions="formConditions" label_width="110px" :view_type="view_type" @search="filterFormConfirm"></filter-form>
                        </div> -->
                        <div class="m-l" style="margin-left: 5px;">
                            <el-button size="small" @click="closeFilter">清除表格过滤</el-button>
                        </div>
                        <div class="m-l" style="margin-left: 5px;" v-show="selectTab==0">
                            <el-dropdown>
                                <el-button size="small" >
                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="setVender()">批量设置</el-dropdown-item>
                                    <el-dropdown-item @click.native="contractEdit('purchase')">生成采购合同</el-dropdown-item>
                                    <el-dropdown-item @click.native="contractEdit('process')">生成加工合同</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <!-- <el-button size="small" type="primary" @click="handleCreate">新建</el-button> -->
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="selectTab==0">
                <div class="tabs-list-body tabs-list-body-table">
                    <div class="table">
                        <vxe-toolbar size="mini" custom ref="xToolbar1"></vxe-toolbar>
                        <vxe-table ref="preList" border :data="preDataList" resizable size="small" auto-resize height="100%" :column-config="{minWidth:140}" class="mytable-scrollbar" 
                        show-overflow highlight-current-row highlight-hover-row :sort-config="{ remote: true, trigger: 'cell' }" @sort-change="sortChange" :filter-config="{remote:false}" @filter-change="globalFilterMethod">
                            <vxe-table-column type="checkbox" width="40" align="center" fixed="left"></vxe-table-column>
                            <vxe-table-column field="order_publish_time" title="订单发布时间" header-align="center" align="center" min-width="150" :filters="[{data: {start: '', end: ''}}]" :filter-render="{name: 'FilterDate'}" sortable fixed="left"></vxe-table-column>
                            <vxe-table-column field="order_dep_name" title="部门" header-align="center" min-width="80" align="left" fixed="left" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}" sortable></vxe-table-column>
                            <vxe-table-column field="order_salesman_name" title="业务员" header-align="center" min-width="90" align="left" fixed="left" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}" sortable></vxe-table-column>
                            <vxe-table-column field="order_cus_od_code" title="订单号" header-align="center" min-width="120" align="left" fixed="left" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}" sortable></vxe-table-column>
                            <vxe-table-column field="order_goods_article_number" title="货号" header-align="center" min-width="90" align="left" fixed="left" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}" sortable></vxe-table-column>
                            <vxe-table-column field="order_title_name" title="订单抬头" header-align="center" min-width="120" align="left" fixed="left" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}" sortable></vxe-table-column>
                            <vxe-table-column field="order_project_code" title="项目号" header-align="center" min-width="120" align="left" fixed="left" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}" sortable></vxe-table-column>
                            <vxe-table-column field="order_goods_bom_ven_name" title="供应商" header-align="center" align="left" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}"></vxe-table-column>
                            <vxe-table-column field="goods_bom_type" title="备货类型" header-align="center" min-width="80" align="left" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}">
                                <!-- <template v-slot="{row}">
                                    <span v-for="(item, index) in typeOptions" :key="index" v-if="row.order_goods_bom_type == item.value">{{item.label}}</span>
                                </template> -->
                            </vxe-table-column>
                            <vxe-table-column field="order_goods_bom_name" title="品名" header-align="center" min-width="120" align="left" :filters="[{data: null}]" :filter-render="{name: 'FilterInput'}"></vxe-table-column>
                            <vxe-table-column field="order_goods_bom_spec" title="规格" header-align="center" min-width="120" align="left" :filters="[{data: null}]" :filter-render="{name: 'FilterInput'}"></vxe-table-column>
                            <vxe-table-column field="order_goods_bom_qty" title="预算数量" header-align="center" min-width="100" align="right" :filters="[{data: {start: '', end: ''}}]" :filter-render="{name: 'FilterRange'}"></vxe-table-column>
                            <vxe-table-column field="order_goods_bom_ready_qty" title="已采购数量" header-align="center" min-width="100" align="right" :filters="[{data: {start: '', end: ''}}]" :filter-render="{name: 'FilterRange'}"></vxe-table-column>
                            <vxe-table-column field="order_goods_bom_currency" title="币种" header-align="center" min-width="60" align="center" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}"></vxe-table-column>
                            <vxe-table-column field="order_goods_bom_price" title="单价" header-align="center" align="right"  min-width="80" :filters="[{data: {start: '', end: ''}}]" :filter-render="{name: 'FilterRange'}"></vxe-table-column>
                           
                        </vxe-table>
                    </div>
                </div>
            </div>
            <div v-show="selectTab!=0">
                <div class="tabs-list-body tabs-list-body-table">
                    <div class="table">
                        <vxe-table ref="contractTable" border :data="dataList" resizable size="small" auto-resize height="100%" :column-config="{minWidth:140}" class="mytable-scrollbar" 
                        show-overflow highlight-current-row highlight-hover-row :sort-config="{ remote: true, trigger: 'cell' }" @sort-change="sortChange" :filter-config="{remote:false}" @filter-change="globalFilterMethod">
                            <vxe-table-column field="contract_project_code" title="项目号" header-align="center" align="left" min-width="120" sortable :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}"></vxe-table-column>
                            <vxe-table-column field="contract_bms_code" title="合同号" header-align="center" align="left" min-width="140" sortable :filters="[{data: null}]" :filter-render="{name: 'FilterInput'}"></vxe-table-column>
                            <vxe-table-column field="contract_category" title="业务类型" min-width="90" header-align="center" align="left" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}">
                                
                            </vxe-table-column>
                            <vxe-table-column field="contract_type" title="合同类型" min-width="90" header-align="center" align="left" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}">
                                
                            </vxe-table-column>
                            <vxe-table-column field="contract_dep_name" title="部门" header-align="center" min-width="90" align="left" sortable :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}"></vxe-table-column>
                            <vxe-table-column field="contract_salesman_name" title="业务员" header-align="center" min-width="90" align="left" sortable :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}"></vxe-table-column>
                            <vxe-table-column field="contract_actual_supply_title_name" title="供应商" header-align="center" align="left" sortable :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}"></vxe-table-column>
                            <vxe-table-column field="contract_title_name" title="订单抬头" header-align="center" align="left" sortable :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}"></vxe-table-column>
                            <vxe-table-column field="contract_currency" title="币种" header-align="center" min-width="80" align="left" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}"></vxe-table-column>
                            <vxe-table-column field="contract_amount" title="订单金额" header-align="center" align="right"  min-width="120" :filters="[{data: {start: '', end: ''}}]" :filter-render="{name: 'FilterRange'}"></vxe-table-column>
                            <vxe-table-column v-if="!(selectTab==1)" field="aprv_state" title="审批状态" header-align="center" min-width="80" align="left" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterSelect'}">
                            </vxe-table-column>
                            <vxe-table-column title="操作" header-align="center" align="center" min-width="100" >
                                <template #default="{ row }">
                                    <el-dropdown>
                                        <el-button size="mini">
                                            更多<i class="el-icon-arrow-down el-icon--right"></i>
                                        </el-button>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item v-if="row.contract_state==1 || row.contract_state==3" @click.native="handleToEdit(row)">编辑</el-dropdown-item>
                                            <el-dropdown-item @click.native="handleToDetail(row)">详情</el-dropdown-item>
                                            <el-dropdown-item v-if="row.contract_state==1" @click.native="handleToDelete(row)">删除</el-dropdown-item>
                                            <el-dropdown-item v-if="row.contract_state==1 || row.contract_state==3" @click.native="publishContract(row)">发布</el-dropdown-item>
                                            <el-dropdown-item v-if="row.contract_state==2 && row.contract_state_aprv==1 " @click.native="withdrawContract(row)">撤回</el-dropdown-item>
                                            <el-dropdown-item v-if="row.contract_state==2 && row.contract_state_aprv==2" @click.native="changeContract(row)">变更</el-dropdown-item>
                                            <el-dropdown-item v-if="row.contract_state_aprv == 2" @click.native="handleToSync(row)">同步</el-dropdown-item>
                                            <el-dropdown-item @click.native="handleToState(row.contract_id,6)" v-if="row.contract_state >1 && row.contract_state<5">标记结案</el-dropdown-item>
                                            <el-dropdown-item @click.native="handleToState(row.contract_id,5)" v-if="row.contract_state >1 && row.contract_state<5">标记中止</el-dropdown-item>
                                            <el-dropdown-item @click.native="handleToState(row.contract_id,2)" v-if="row.contract_state == 6 || row.contract_state == 5">标记在手</el-dropdown-item>
                                            <el-dropdown-item @click.native="print(row,1)">打印（标准）</el-dropdown-item>
                                            <el-dropdown-item @click.native="print(row,2)">打印（附件）</el-dropdown-item>
                                            <el-dropdown-item v-if="row.contract_type == '双经销' && row.contract_actual_supply_title_name == row.contract_supply_title_name" @click.native="print(row,6)">打印(华盛-工厂-成品单价)</el-dropdown-item>
                                            <el-dropdown-item v-if="row.contract_type == '双经销' && row.contract_actual_supply_title_name == row.contract_supply_title_name" @click.native="print(row,7)">打印(华盛-工厂-成品单价-附件)</el-dropdown-item>
                                            <el-dropdown-item v-if="row.contract_type == '双经销' && row.contract_actual_supply_title_name == row.contract_supply_title_name" @click.native="print(row,3)">成品采购(华盛-工厂)</el-dropdown-item>
                                            <el-dropdown-item v-if="row.contract_type == '双经销' && row.contract_actual_supply_title_name == row.contract_supply_title_name" @click.native="print(row,8)">成品采购(华盛-工厂-附件)</el-dropdown-item>

                                            <el-dropdown-item v-if="row.contract_type == '双经销' && row.contract_actual_supply_title_name != row.contract_supply_title_name && row.contract_supply_title_name=='江苏国泰盛大贸易有限公司'" @click.native="print(row,4)">成品采购(华盛-盛大)</el-dropdown-item>
                                            <el-dropdown-item v-if="row.contract_type == '双经销' && row.contract_actual_supply_title_name != row.contract_supply_title_name && row.contract_supply_title_name=='江苏国泰盛大贸易有限公司'" @click.native="print(row,9)">成品采购(华盛-盛大-附件)</el-dropdown-item>
                                            <el-dropdown-item v-if="row.contract_type == '双经销' && row.contract_actual_supply_title_name != row.contract_supply_title_name && row.contract_supply_title_name=='江苏国泰盛大贸易有限公司'" @click.native="print(row,5)">加工(盛大-工厂)</el-dropdown-item>
                                            <el-dropdown-item v-if="row.contract_type == '双经销' && row.contract_actual_supply_title_name != row.contract_supply_title_name && row.contract_supply_title_name=='江苏国泰盛大贸易有限公司'" @click.native="print(row,10)">加工(盛大-工厂-附件)</el-dropdown-item>

                                            <el-dropdown-item v-if="row.contract_type == '双经销' && row.contract_actual_supply_title_name != row.contract_supply_title_name && row.contract_supply_title_name=='张家港保税区盛融贸易有限公司'">成品采购(华盛-盛融)</el-dropdown-item>
                                            <el-dropdown-item v-if="row.contract_type == '双经销' && row.contract_actual_supply_title_name != row.contract_supply_title_name && row.contract_supply_title_name=='张家港保税区盛融贸易有限公司'" @click.native="print(row,12)">成品采购(华盛-盛融-附件)</el-dropdown-item>
                                            <el-dropdown-item v-if="row.contract_type == '双经销' && row.contract_actual_supply_title_name != row.contract_supply_title_name && row.contract_supply_title_name=='张家港保税区盛融贸易有限公司'" @click.native="print(row,13)">加工(盛融-工厂)</el-dropdown-item>
                                            <el-dropdown-item v-if="row.contract_type == '双经销' && row.contract_actual_supply_title_name != row.contract_supply_title_name && row.contract_supply_title_name=='张家港保税区盛融贸易有限公司'" @click.native="print(row,14)">加工(盛融-工厂-附件)</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </template>
                            </vxe-table-column>
                        </vxe-table>
                    </div>
                </div>
            </div>
            <div class="list-bottom">
                <div class="m-r">
                    <vxe-pager background :current-page.sync="tablePages.cur_page" :page-size.sync="tablePages.page_count" :total="tablePages.total" @page-change="pageChange" :page-sizes="[10,20,50,100,500,1000,10000]">
                    </vxe-pager>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <!-- 采购合同编辑 -->
		<contract_purchase_edit v-if="modalContractPurchase" :show.sync="modalContractPurchase" :orderData="orderData" :orderBom="orderBom" :goodsInfo="goodsInfo" :contract_id="contract_id" @afterSavePurContract="savePurContract()"></contract_purchase_edit>
        <!-- 加工合同编辑 -->
		<contract_process_edit v-if="modalContractProcess" :show.sync="modalContractProcess" :orderData="orderData" :orderBom="orderBom" :goodsInfo="goodsInfo" :contract_id="contract_id" @afterSaveProContract="saveProContract()"></contract_process_edit>
        <!-- 合同变更页面 -->
		<contract_change_edit v-if="changeModel" @changeAfter="changeModel = false;query()" :show.sync="changeModel" :contract_id="contract_id"></contract_change_edit>
        <plset  :show.sync="modalSetVen" @aftersave="savebomVen" :Data="setData"></plset>
    </div>
</template>

<script>
import ifsApi from "@/api/ifs";
import purchaseApi from "@/api/cbs/purchase.js";
import orderApi from '@/api/cbs/order.js'
import contract_purchase_edit from '@/pages/order/order_detail/contract_purchase_edit';
import contract_process_edit from '@/pages/order/order_detail/contract_process_edit';
import contract_change_edit from '@/pages/order/order_detail/contract_change_edit';
import plset from '@/pages/order/order_detail/plset.vue';
export default {
    components: {
        contract_change_edit,
        contract_purchase_edit,
        contract_process_edit,
        plset
    },
    data() {
        return {
            modalContractPurchase:false,
            modalContractProcess:false,
            orderData:{},
            goodsInfo:[],
            orderBom:[],
            selectTab: 0,
            condition: {
                page: 1,
                perPage: 20,
                columns: [],
                keyword: "",
                orderBy: "",
                query_state: "1",
            },
            preCondition: {
                page: 1,
                perPage: 20,
                columns: [],
                keyword: "",
                orderBy: "",
                order_state: "1",
            },
            formTags: [],
            formConditions: {
                contract_dep_name: {
                    type: "select",
                    field: "contract_dep_name",
                    title: "部门",
                    value: [],
                    treeName: "purchaseDep",
                    // 下拉选择框的下拉数据集配置
                    options: {
                        config: {
                            label: "value", // 下拉选项显示字段
                            value: "value", // 下拉选择值字段
                            multiple: true, // 是否为多选
                            tree: true,
                        },
                        data: [], // 下拉数据集
                    },
                },
                contract_actual_supply_title_name: {
                    type: "select",
                    field: "contract_actual_supply_title_name",
                    title: "供应商",
                    value: [],
                    // 下拉选择框的下拉数据集配置
                    options: {
                        config: {
                            label: "trader_name", // 下拉选项显示字段
                            value: "trader_name", // 下拉选择值字段
                            multiple: true, // 是否为多选
                        },
                        data: [], // 下拉数据集
                    },
                },
                // 日期区间过滤
                // order_date: {
                //     type: "date",
                //     field: "order_date",
                //     title: "下单日期",
                //     value: {
                //         start: "", // 起始日期
                //         end: "", // 截止日期
                //     },
                // },
            },
            allDep: [],
            selectOptions: {
                dep: [], //部门
                vender: [], //供应商
                sales: [], //业务员
                BZ: [], //币种
                JGTK: [], // 价格条款* 
                portFrom: [], //起运港*
                portTo: [], //目的港*
                YSFS: [], // 运输方式*
                JLDW: [], //计量单位
                vatRate: "", //默认增值税率
            },
            view_type: 1,
            dataList: [],
            preDataList: [],
            // 表格分页
            tablePages: {
                cur_page: 1, // 当前页
                page_count: 20, // 每页条数
                total: 0, // 总条数
            },
            flag:"",
            baseInfo:{},
            detailInfo:[],
            changeModel:false,
            contract_id:null,
            typeOptions:[],
            modalSetVen:false,
            setData:[],
            selectBomIds:[]
        };
    },
    created() {
        this.getBomType()
        this.getOptions();
        this.query()
    },
    methods: {
        selectChange(tabNum) {
            this.selectTab = tabNum;
            this.dataList=[]
            this.query();
        },

        //标示状态
		handleToState(contract_id,state){
			let msg='';
			if(state==6)
				msg="确定要标记该合同为完成吗？";
			else if(state==2)	
				msg="确定要标记该合同为在手吗？";
            else if(state==5)	
				msg="确定要标记该合同为中止吗？";
			
			this.$confirm(msg, "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					purchaseApi.setContractState(contract_id,state).then((res) => {
						if (res.code == 0) {
							this.$message({
								message: res.msg,
								type: "success",
							});
							this.query();
						}
					});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消设置",
					});
				});	
		},

        getOptions() {
            Promise.all([
                ifsApi.getList("", 2, 0),
                this.$dmBaseSet.personData(),
                ifsApi.dicData("TY_BZ,TY_JGTK,TY_YSFS,TY_JLDW"),
                ifsApi.getPorts(1, 0),
                ifsApi.getPorts(0, 1),
            ]).then((res) => {
                this.selectOptions.dep = res[0].data || []; //部门
                this.formConditions.contract_dep_name.options.data =res[0].data || [];
                this.depDataOption=res[0].data || [];
                this.selectOptions.sales = res[1].list || []; //业务员
                console.log("字典数据", res[2]);
                this.selectOptions.BZ = res[2]["TY_BZ"].children || []; //币种
                this.selectOptions.JGTK = res[2]["TY_JGTK"].children || []; //价格条款
                this.selectOptions.YSFS = res[2]["TY_YSFS"].children || []; //运输方式
                this.selectOptions.JLDW = res[2]["TY_JLDW"].children || []; //计量单位
                this.selectOptions.portFrom = res[3].data || []; //起运港
                this.selectOptions.portTo = res[4].data || []; //目的港

            });
            this.$dmBaseSet.venderData().then(()=>{
				this.selectOptions.vender=this.$dmBaseSet.datalist.venderData
				this.formConditions.contract_actual_supply_title_name.options.data =this.$dmBaseSet.datalist.venderData
			})
            
        },

        // 备货类型
        async getBomType() {
            let data = await this.$dmBaseSet.getOptions();
            this.typeOptions = data.TY_PREPARE_MODE.option_value;
        },
        query() {
            this.tablePages.cur_page = 1;
            this.findList();
        },
        findList() {
            
            if(this.selectTab==0){
                this.preCondition.page = this.tablePages.cur_page;
                this.preCondition.perPage = this.tablePages.page_count;
                
                let field={
                    order_dep_name:"order_dep_name",
                    order_goods_bom_ven_name:"order_goods_bom_ven_name",
                    contract_dep_name:"order_dep_name",
                    contract_actual_supply_title_name:"order_goods_bom_ven_name",
                }    
                for(let i=0; i<this.condition.columns.length;i++){
                    this.preCondition.columns[i].field= field[this.condition.columns[i].field]
                }
                orderApi.getPrePurchaseList(this.preCondition).then((result)=>{
                    if(result.code == 0){
                        this.preDataList=result.data.list || []
                        console.log("🚀 ~ file: purchase_list.vue:379 ~ orderApi.getPrePurchaseList ~ this.preDataList", this.preDataList)
                        this.tablePages.total = parseInt(result.data.count);
                        this.preDataList.forEach(item => {
                            this.typeOptions.forEach(index => {
                                if(item.order_goods_bom_type==index.value){
                                    item.goods_bom_type=index.label
                                }
                            });
                        });
                    }
                })
            }else{
                this.condition.query_state=this.selectTab
                this.condition.page = this.tablePages.cur_page;
                this.condition.perPage = this.tablePages.page_count;
                let field={
                    order_dep_name:"contract_dep_name",
                    order_goods_bom_ven_name:"contract_actual_supply_title_name",
                    contract_dep_name:"contract_dep_name",
                    contract_actual_supply_title_name:"contract_actual_supply_title_name",
                }  
                for(let i=0; i<this.preCondition.columns.length;i++){
                    this.condition.columns[i].field=field[this.preCondition.columns[i].field]
                }
                this.dataList=[]
                purchaseApi.getContractList(this.condition).then((result)=>{
                    if(result.code == 0){
                        let dataList=result.data.list || []
                        dataList.forEach(item => {
                            if(item.contract_category=='purchase'){
                                item.contract_category='采购合同'
                            }
                            if(item.contract_category=='process'){
                                item.contract_category='加工合同'
                            }
                            if(item.contract_type=='01'){
                                item.contract_type='国内采购'
                            }
                            if(item.contract_type=='05'){
                                item.contract_type='进口采购'
                            }
                            if(item.contract_type=='DIS'){
                                item.contract_type='双经销'
                            }
                            if(item.contract_type=='P_AGENCY'){
                                item.contract_type='纯加工'
                            }
                            if(item.contract_state_aprv=='1'){
                                item.aprv_state='待审'
                            }
                            if(item.contract_state_aprv=='2'){
                                item.aprv_state='已审'
                            }
                            if(item.contract_state_aprv=='3'){
                                item.aprv_state='拒绝'
                            }
                            if(item.contract_state=='3'){
                                item.aprv_state='变更'
                            }
                        });
                        this.dataList = dataList
                        console.log("🚀 ~ file: purchase_list.vue:408 ~ purchaseApi.getContractList ~ result.data.list", result.data.list)
                        this.tablePages.total = parseInt(result.data.count);
                    }
                })
            }
                
                
        },
        // 数据分页切换
        pageChange({ currentPage, pageSize }) {
            this.tablePages.cur_page = currentPage;
            this.tablePages.page_count = pageSize;
            this.findList();
        },

        // 筛选表单确认回调方法
        filterFormConfirm({ consArray }) {
            // 获取已设置的条件项值来刷新筛选表单标签值
            this.formTags = consArray || [];
            this.showTag();
        },
        showTag() {
            this.condition.columns = [];
            this.preCondition.columns = [];
            this.formTags.forEach((item) => {
                let obj = {
                    type: "",
                    field: "",
                    value: null,
                };
                obj.type = item.type;
                obj.field = item.field;
                obj.value = item.value;
                this.condition.columns.push(obj);
                this.preCondition.columns.push(obj);
            });
            this.query();
        },
        // 关闭筛选标签
        closeTag(tag) {
            if(this.selectTab==0){
                this.$refs.preList.clearFilter(this.$refs.preList.getColumnByField(tag.field));
            }else{
                this.$refs.contractTable.clearFilter(this.$refs.contractTable.getColumnByField(tag.field));
            }
            
            this.showTag();
        },
        // 清除筛选条件
        closeFilter() {
            if(this.selectTab==0){
                this.$refs.preList.clearFilter()
                this.formTags=[]
            }else{
                this.$refs.contractTable.clearFilter()
                this.formTags=[]
            }
        },

        //创建合同
        contractEdit(type){
            this.contract_id=null
            let selectRecords = this.$refs.preList.getCheckboxRecords();
            this.goodsInfo=selectRecords
            if (selectRecords.length > 0) {
                this.orderData={
                    order_dep_id:selectRecords[0].order_dep_id,
                    order_dep_name:selectRecords[0].order_dep_name,
                    order_salesman_id:selectRecords[0].order_salesman_id,
                    order_salesman_name:selectRecords[0].order_salesman_name,
                    order_title_id:selectRecords[0].order_title_id,
                    order_title_name:selectRecords[0].order_title_name,
                    order_project_code:selectRecords[0].order_project_code,
                    order_project_id:selectRecords[0].order_project_id,
                },
                this.preDataList.forEach(item => {
                    if(item.order_project_code==this.orderData.order_project_code){
                        this.orderBom.push(item)
                    }
                });

                let goods_type=[]
                let order_ven=[]
                let project_id=[]
                let order_qty=0
                selectRecords.forEach(item => {
                    goods_type.push(item.order_goods_bom_type)
                    order_ven.push(item.order_goods_bom_ven_name)
                    project_id.push(item.order_project_code)
                    if(parseInt(item.order_goods_bom_ready_qty )>parseInt(item.order_goods_bom_qty)){
                        order_qty=order_qty+1
                    }
                });
                goods_type = Array.from(new Set(goods_type))
                order_ven = Array.from(new Set(order_ven))
                project_id = Array.from(new Set(project_id))
                if(project_id.length==1){
                    if(goods_type.length==1){
                        if(type=='purchase'){
                            let purchaseType=["01","02","06","09"]
                            let purchase=false
                            for(let i=0;i<purchaseType.length;i++){
                                if(goods_type[0]==purchaseType[i]){
                                    purchase=true
                                    if(order_qty!=0&&order_ven.length>1){
                                        this.$XModal.alert({
                                            message: '已采购数量超过待采购数量! 供应商不一致！请重新选择！',
                                            status: 'warning'
                                        });
                                    }else if(order_qty!=0){
                                        this.$XModal.alert({
                                            message: '已采购数量超过待采购数量! 请重新选择！ ',
                                            status: 'warning'
                                        });
                                    }else if(order_ven.length>1){
                                        this.$XModal.alert({
                                            message: '供应商不一致! 请重新选择！',
                                            status: 'warning'
                                        });
                                    }else{
                                        this.modalContractPurchase=true
                                    }
                                }
                            }
                            if(purchase==false){
                                this.$XModal.alert({
                                    message: '备货类型错误，请重新选择！',
                                    status: 'warning'
                                });
                            }
                        }
                        else{
                            let processType=["31","32"]
                            let process=false
                            for(let i=0;i<processType.length;i++){
                                if(goods_type[0]==processType[i]){
                                    process=true
                                    if(order_qty!=0&&order_ven.length>1){
                                        this.$XModal.alert({
                                            message: '已采购数量超过待采购数量! 供应商不一致！请重新选择！',
                                            status: 'warning'
                                        });
                                    }else if(order_qty!=0){
                                        this.$XModal.alert({
                                            message: '已采购数量超过待采购数量! 请重新选择！',
                                            status: 'warning'
                                        });
                                    }else if(order_ven.length>1){
                                        this.$XModal.alert({
                                            message: '供应商不一致! 请重新选择！',
                                            status: 'warning'
                                        });
                                    }else{
                                        this.modalContractProcess=true
                                    }
                                    
                                }
                            }
                            if(process==false){
                                this.$XModal.alert({
                                    message: '备货类型错误，请重新选择！',
                                    status: 'warning'
                                });
                            }
                        }
                    }else{
                        this.$XModal.alert({
                            message: '不同类型不能生成到一张合同上！',
                            status: 'warning'
                        });
                    }
                }else{
                    this.$XModal.alert({
                        message: '不同项目号不能生成到一张合同上！',
                        status: 'warning'
                    });
                }
            }else{
                this.$XModal.alert({
                    message: '请选择待采购项！',
                    status: 'warning'
                });
            }
                
        },

        setVender(){
            let selectRecords = this.$refs.preList.getCheckboxRecords();
            selectRecords.forEach(item => {
                this.selectBomIds.push(item.order_goods_bom_id)
            });
            this.setData=[]
            if(selectRecords.length>0){
                this.modalSetVen = true
                this.setData.push({
                    label:'供应商',
                    type:'ven',
                    bset:true,
                    value_id :'',
                    value:'',
                    value_a:'',
                })
            }else{
                this.$XModal.alert({ message: '请选择明细！', status: 'warning' })
                return
            }
        },

        savebomVen(data){
            this.modalSetVen = false
            orderApi.setBomVender(this.selectBomIds,data[0].value_id,data[0].value).then((res)=>{
                if(res.code==0){
                    this.$message({
                        type: "success",
                        message: "设置成功!",
                    });
                    this.query()
                }else{
                    this.$message({
                        type: "error",
                        message: "设置失败!",
                    });
                }
            })
            
        },

        saveProContract(){
            this.query();
        },

        savePurContract(){
            this.query();
        },

        // 编辑
        handleToEdit(row) {
            this.orderBom=[]
            this.contract_id=row.contract_id
            this.preDataList.forEach(item => {
                if(item.order_project_code==row.contract_project_code){
                    this.orderBom.push(item)
                }
            });
            if(row.contract_category=='采购合同'){
                this.modalContractPurchase=true
            }else{
                this.modalContractProcess=true
            }
        },

        handleToDetail(row){
            if(row.contract_category == '加工合同'){
                this.$router.push({
                    path: "/process_detail",
                    query: {
                        id:row.contract_id
                    },
                });
            }else{
                this.$router.push({
                    path: "/purchase_detail",
                    query: {
                        id:row.contract_id
                    },
                });
            }
            
        },

        handleEditClose() {
            this.modalContractPurchase=false
            this.query()
        },
        //打印
		   print(row,type){
			   if(row.contract_category=="采购合同"){
				   if(type==1){
					   if(row.contract_state==2 && row.contract_state_aprv==1){
							window.open('/#/order_purchase_contract_print?contract_id='+row.contract_id+'&flag=approve');
						}else{
							window.open('/#/order_purchase_contract_print?contract_id='+row.contract_id+'&flag=print');
						}
				   }else{
					   window.open('/#/order_purchase_contract_attach_print?contract_id='+row.contract_id+'&flag=print');
				   }
						
			   }
			   else if(row.contract_category=="加工合同"){
				   	if(type==1){
						if(row.contract_state==2 && row.contract_state_aprv==1){
							window.open('/#/order_process_contract_print?contract_id='+row.contract_id+'&flag=approve');
						}else{
							window.open('/#/order_process_contract_print?contract_id='+row.contract_id+'&flag=print');
						}
					}else if(type==2){
						window.open('/#/order_process_contract_attach_print?contract_id='+row.contract_id+'&flag=print');
					}else if(type==3){
						window.open('/#/order_process_contract_print?contract_id='+row.contract_id+'&flag=print'+'&type='+type);
					}else if(type==4){
						window.open('/#/order_process_contract_print_new?contract_id='+row.contract_id+'&flag=print'+'&type='+type);
					}else if(type==5){
						window.open('/#/order_process_contract_print_new?contract_id='+row.contract_id+'&flag=print'+'&type='+type);
					}else if(type==6){
						window.open('/#/order_process_contract_print?contract_id='+row.contract_id+'&flag=print'+'&type='+type);
					}else if(type==7){
						window.open('/#/order_process_contract_attach_print?contract_id='+row.contract_id+'&flag=print'+'&type=6');
					}else if(type==8){
						window.open('/#/order_process_contract_attach_print?contract_id='+row.contract_id+'&flag=print'+'&type=3');
					}else if(type==9){
						window.open('/#/order_process_contract_attach_print_new?contract_id='+row.contract_id+'&flag=print'+'&type=4');
					}else if(type==10){
						window.open('/#/order_process_contract_attach_print_new?contract_id='+row.contract_id+'&flag=print'+'&type=5');
					}else if(type == 11){
                        window.open('/#/order_process_contract_print_new?contract_id='+row.contract_id+'&flag=print'+'&type='+type);
                    }else if(type == 12){
                        window.open('/#/order_process_contract_attach_print_new?contract_id='+row.contract_id+'&flag=print'+'&type=11');
                    }else if(type == 13){
                        window.open('/#/order_process_contract_print_new?contract_id='+row.contract_id+'&flag=print'+'&type='+type);
                    }else if(type == 14){
                        window.open('/#/order_process_contract_attach_print_new?contract_id='+row.contract_id+'&flag=print'+'&type=13');
                    }
			   }
		   },
       
        // 删除
        handleToDelete(row) {
             this.$confirm("确定要删除该合同?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    purchaseApi.deleteContract(row.contract_id).then((res) => {
                        if (res.code == 0) {
                            this.$message({
                                message: "合同删除成功！",
                                type: "success",
                            });
                            this.query();
                        }else{
                            this.$message({
                                message: res.msg+'删除失败！',
                                type: 'error'
                            });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },

        //发布
        publishContract(row){
            console.log("🚀 ~ file: purchase_list.vue ~ line 332 ~ publishContract ~ contract_id",row.contract_id)
            purchaseApi.contractPublish(row.contract_id)
            .then((res)=>{
                if(res.code == 0){
                    this.query();
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
        //撤回
        withdrawContract(row){
           purchaseApi.contractWithdraw(row.contract_id)
            .then((res)=>{
                if(res.code == 0){
                    this.query();
                    this.$message({
                        message: '撤回成功!',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: res.msg+'撤回失败！',
                        type: 'error'
                    });
                }
            }) 
        },
        //变更
        changeContract(row){
            this.changeModel=true
            this.contract_id=row.contract_id
        },

        // 同步
        handleToSync(row) {
            this.$confirm("确定要同步该合同?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						purchaseApi.contractSync(row.contract_id).then((result) => {
							if(result.code == 0){
								this.$message({
									type: "success",
									message: "同步成功!",
								});
							}
							this.query()
						})
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消同步",
						});
					});
        },

        // 列头点击排序事件，排序功能
        sortChange({ column, property, order, sortBy, sortList, $event }) {
            if(this.selectTab==0){
                if (order) {
                    this.preCondition.orderBy = (sortBy ? sortBy : column.property) + " " + column.order;
                } else {
                    this.preCondition.orderBy = "";
                }
            }else{
                if (order) {
                    this.condition.orderBy = (sortBy ? sortBy : column.property) + " " + column.order;
                } else {
                    this.condition.orderBy = "";
                }
            }
            this.query();
        },

        globalFilterMethod({
            filterList
        }) {
            let {
                conditions,
                conditionLabels
            } = this.updateConditions(filterList);
            this.formConditions = conditions;
            this.formTags = conditionLabels;
            
            // console.log(filterList)
            // console.log(this.conditions)
            // console.log(this.conditionLabels)
        },
        updateConditions(filterList) {
            let conditions = {};
            let conditionLabels = [];
            for (let i = 0; i < filterList.length; i++) {
                conditions[filterList[i].property] = filterList[i].datas[0].vals ? filterList[i].datas[0].vals :
                    filterList[i].datas[0];
                conditionLabels.push({
                    field: filterList[i].property,
                    title: filterList[i].column.title,
                    value: filterList[i].datas[0].vals ? filterList[i].datas[0].vals.join("、") : (
                        filterList[i].datas[0].start || filterList[i].datas[0].end ? filterList[i]
                        .datas[0].start + ' ~ ' + filterList[i].datas[0].end : filterList[i].datas[0])
                })
            }
            return {
                conditions,
                conditionLabels
            }
        },

    },
    watch: {
        selectTab: {
            handler(newVal,oldVal) {
                if(oldVal==0&&(newVal==1||newVal==2||newVal==3)){
                    this.formTags=[]
                    this.$refs.preList.clearFilter()
                }
                if(newVal==0&&(oldVal==1||oldVal==2||oldVal==3)){
                    this.formTags=[]
                    this.$refs.contractTable.clearFilter()
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.listform .form-button {
    top: -3px;
    right: 0px;
}
>>> .vxe-toolbar {
    position: absolute;
    z-index: 23;
    right: 210px;
    top: -40px;
    width: 30px;
    height: 30px;
}
</style>