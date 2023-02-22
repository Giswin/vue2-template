<template>
    <div class="wrapper" :style="{'left':$store.state.css.navWidth + 'px'}">
        <div class="roles-container">
            <div class="lis-tabs">
                <div class="tabs">
                    <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectChange(2)">草稿</div>
                    <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectChange(1)">已同步</div>
                    <div class="tabs-right">
                        <div class="tabs-search">
                            <div class="m-l">
                                <el-input placeholder="项目号/订单号/客户/部门/业务员" v-model="condition.keyword" @keyup.enter.native="query" clearable class="input-with-select" style="width:350px;" size="small">
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
                        <div class="m-l" style="margin-left: 5px;">
                            <filter-form ref="filterForm" :conditions="formConditions" label_width="110px" :view_type="view_type" @search="filterFormConfirm"></filter-form>
                        </div>
                        <div class="m-l" style="margin-left: 5px;">
                            <el-button size="small" @click="closeFilter">清空筛选</el-button>
                        </div>
                        <div class="m-l" style="margin-left: 5px;">
                            <el-button size="small" type="primary" @click="handleCreateCal">新建测算</el-button>
                        </div>

                    </div>
                </div>
            </div>

            <div class="tabs-list-body tabs-list-body-table">
                <div class="table">
                    <vxe-table border :data="dataList" resizable size="small" auto-resize height="100%" :column-config="{minWidth:120}" class="mytable-scrollbar" show-overflow 
                    highlight-current-row highlight-hover-row :sort-config="{ remote: true, trigger: 'cell' }" @sort-change="sortChange">
                        <vxe-table-column field="ode_project_code_ebs" title="项目号" header-align="center" min-width="130" align="left" sortable></vxe-table-column>
                        <vxe-table-column field="odsc_order_no_cus" title="订单号" header-align="center" min-width="130" align="left" sortable></vxe-table-column>
                        <vxe-table-column field="ode_dep_name" title="部门" header-align="center" min-width="100" align="left" sortable></vxe-table-column>
                        <vxe-table-column field="ode_sales_name" title="业务员" header-align="center" min-width="100" align="left" sortable></vxe-table-column>
                        <vxe-table-column field="ode_cus_name" title="客户" header-align="center" align="left" sortable></vxe-table-column>
                        <vxe-table-column field="ode_create_time" title="创建日期" header-align="center" align="center" sortable></vxe-table-column>
                        <vxe-table-column field="ode_bus_type" title="业务类型" header-align="center" align="left" min-width="90"></vxe-table-column>
                        <!-- <vxe-table-column field="ode_amount_sales" title="订单金额" header-align="center" min-width="130" align="right" :formatter="formatterNum"></vxe-table-column>
                        <vxe-table-column field="ode_amount_pu_ebs" title="采购金额" header-align="center" min-width="130" align="right" :formatter="formatterNum"></vxe-table-column> -->
                        <vxe-table-column field="ode_ebs_type " title="预算/测算" header-align="center" align="left" min-width="90">
                            <template v-slot="{row}">
                                <span v-if="(row.ode_ebs_type == 1)">预算</span>
                                <span v-else-if="(row.ode_ebs_type == 2)">测算</span>
                                <span v-else>暂无</span>
                            </template>
                        </vxe-table-column>

                        <vxe-table-column field="ode_api_time" title="同步时间" header-align="center" align="center" sortable>

                        </vxe-table-column>
                        <vxe-table-column title="操作" header-align="center" align="center" min-width="120">
							<template #default="{ row }">
							    <el-dropdown>
							        <el-button size="mini">
							            更多<i class="el-icon-arrow-down el-icon--right"></i>
							        </el-button>
							        <el-dropdown-menu slot="dropdown">
							
							            <el-dropdown-item size="mini" @click.native="handleToDetail(row)">查看</el-dropdown-item>
								
							            <el-dropdown-item @click.native="delBudget(row.ode_id)" v-if="(row.ode_api_time||'')==''">删除</el-dropdown-item>
										<el-dropdown-item @click.native="cancelBudget(row.ode_id)" v-if="(row.ode_api_time||'')!=''">项目取消</el-dropdown-item>
							        </el-dropdown-menu>
							    </el-dropdown>
							</template>
                           
                        </vxe-table-column>

                    </vxe-table>
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
        <calculate-edit v-if="showCalculate" :selectOptions="selectOptions" @closeCreate="closeCreate" @closeIcon="closeIcon"></calculate-edit>
    </div>
</template>

<script>
import ifsApi from "@/api/ifs";
import ebsApi from "@/api/gbs/ebs.js";
import projectApi from "@/api/cbs/project.js";
import calculateEdit from "@/pages/project/project_calculate";
export default {
    components: {
        calculateEdit,
    },
    data() {
        return {
            selectTab: 2,
            condition: {
                page: 1,
                perPage: 20,
                columns: [],
                keyword: "",
                orderBy: "",
                api_state: 2, //同步状态 1-已同步 2-未同步
            },
            showDetail: false,
            showCalculate: false,
            formTags: [],
            formConditions: {
                ode_dep_name: {
                    type: "select",
                    field: "ode_dep_name",
                    title: "部门",
                    value: [],
                    treeName: "projectDep",
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
                ode_cus_id: {
                    type: "select",
                    field: "ode_cus_id",
                    title: "客户名称",
                    value: [],
                    // 下拉选择框的下拉数据集配置
                    options: {
                        config: {
                            label: "cus_name", // 下拉选项显示字段
                            value: "cus_id", // 下拉选择值字段
                            multiple: true, // 是否为多选
                        },
                        data: [], // 下拉数据集
                    },
                },
                ode_bus_type: {
                    type: "select",
                    field: "ode_bus_type",
                    title: "业务类型",
                    value: [],
                    // 下拉选择框的下拉数据集配置
                    options: {
                        config: {
                            label: "name", // 下拉选项显示字段
                            value: "name", // 下拉选择值字段
                            multiple: true, // 是否为多选
                        },
                        data: [], // 下拉数据集
                    },
                },
                // 日期区间过滤
                ode_create_time: {
                    type: "date",
                    field: "ode_create_time",
                    title: "创建日期",
                    value: {
                        start: "", // 起始日期
                        end: "", // 截止日期
                    },
                },
            },
            allDep: [],
            selectOptions: {
                dep: [], //业务部门
                sales: [], //业务员
                allTitle: [], //接单抬头
            },

            view_type: 1,
            dataList: [],
            // 表格分页
            tablePages: {
                cur_page: 1, // 当前页
                page_count: 20, // 每页条数
                total: 0, // 总条数
            },
        };
    },
    created() {
        this.getOptions();
        this.findList();
    },
    methods: {
        selectChange(tabNum) {
            this.selectTab = tabNum;
            this.condition.api_state = tabNum;
            this.query();
        },
		//删除预算单
		delBudget(ode_id){
			this.$confirm("删除该项目，会同时删除EBS中的项目号，确认吗?", "提示", {
			    confirmButtonText: "确定",
			    cancelButtonText: "取消",
			    type: "warning",
			})
			    .then(() => {
			        projectApi.deleteProject(ode_id).then((result)=>{
			            if(result.code == 0){
			                this.$message({
			                    type: "success",
			                    message: "删除成功!",
			                });
							 this.query();
			            }
						else{
							this.$message({
							    type: "error",
							    message: result.msg,
							});
						}
			            
			        })
			    })
			    .catch(() => {
			        this.$message({
			            type: "info",
			            message: "已取消删除",
			        });
			    });
		},
		//删除预算单
		cancelBudget(ode_id){
			this.$confirm("取消该项目，会同时把EBS中对应的项目标记取消，确认吗?", "提示", {
			    confirmButtonText: "确定",
			    cancelButtonText: "取消",
			    type: "warning",
			})
			    .then(() => {
			        projectApi.cancelProject(ode_id).then((result)=>{
			            if(result.code == 0){
			                this.$message({
			                    type: "success",
			                    message: "取消成功!",
			                });
							 this.query();
			            }
						else{
							this.$message({
							    type: "error",
							    message: result.msg,
							});
						}
			            
			        })
			    })
			    .catch(() => {
			        this.$message({
			            type: "info",
			            message: "取消操作",
			        });
			    });
		},
        getOptions() {
            Promise.all([
                ifsApi.getList("", 2, 0),
                ifsApi.getCustomerList(),
                this.$dmBaseSet.personData(),
                ifsApi.getTitlelist(),
                ebsApi.getEbsData("get_tradetype", "", 'HS')
                // .then((result) => {
                //     if (result.code == 0) {
                //         this.bussinessType = result.data || [];
                //         console.log("bussinessType", this.bussinessType);
                //     }
                // });
            ]).then((res) => {
                console.log(res);
                this.formConditions.ode_dep_name.options.data = Object.freeze(
                    res[0].data
                ); //部门
                this.selectOptions.dep = Object.freeze(res[0].data); //业务部门

                this.formConditions.ode_cus_id.options.data = Object.freeze(
                    res[1].page_list
                );
                this.selectOptions.sales = Object.freeze(res[2].list); //业务员
                this.selectOptions.allTitle = Object.freeze(res[3].tnt_title); //接单抬头
                this.formConditions.ode_bus_type.options.data = Object.freeze(
                    res[4].data
                );
            });
                   
        },
        query() {
            this.tablePages.cur_page = 1;
            this.findList();
        },
        findList() {
            this.condition.page = this.tablePages.cur_page;
            this.condition.perPage = this.tablePages.page_count;
            // 传condition获取List数据
            projectApi.getProjectList(this.condition).then((res) => {
                if (res.code == 0) {
                    this.dataList = res.data.list;
                    console.log("项目dataList", this.dataList);
                    this.tablePages.cur_page = parseInt(res.data.page);
                    this.tablePages.total = parseInt(res.data.count);
                }
            });
        },
        formatterNum({ cellValue }) {
            return this.$XEUtils.commafy(this.$XEUtils.toNumber(cellValue), {
                digits: 2,
            });
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
            console.log("consArray", consArray);
        },
        showTag() {
            this.condition.columns = [];
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
            });
            this.query();
        },
        // 关闭筛选标签
        closeTag(tag) {
            this.$refs["filterForm"].clearItem(tag.field);
            this.showTag();
        },
        // 清除筛选条件
        closeFilter() {
            this.$refs.filterForm.clearItems();
        },
        handleToDetail(row) {
            let data = {
                flag: row.ode_project_code_ebs,
                ode_id: row.ode_id,
                ode_project_id_ebs: row.ode_project_id_ebs,
            };
            this.$router.push({ path: "/project_detail", query: data });
        },
        // 新建测算
        handleCreateCal() {
            this.showCalculate = true;
        },
        // 保存测算
        closeCreate() {
            this.showCalculate = false;
            this.query();
        },
        // 取消测算
        closeIcon() {
            this.showCalculate = false;
        },
        // 列头点击排序事件，排序功能
        sortChange({ column, property, order, sortBy, sortList, $event }) {
            if (order) {
                this.condition.orderBy = (sortBy ? sortBy : column.property) + " " + column.order;
            } else {
                this.condition.orderBy = "";
            }
          
            this.query();
        },
    },
};
</script>

<style lang="scss" scoped>
.listform .form-button {
    top: -3px;
    right: 0px;
}
</style>