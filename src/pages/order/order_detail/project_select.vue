<style scoped lang="scss">

</style>
<template>
	<vxe-modal title="项目选择" :value="show"   width="540" height="380" transfer resize remember @close="() => this.$emit('update:show', false)">
		<div>
			<el-form label-position="left" label-width="60px">
				<div style="overflow: hidden;">
					<el-row :gutter="16">
						<el-col :span="18" style="height:46px">
							<el-form-item label="项目号">
								<el-input style="width: 100%;" size="small" v-model="condition.keyword" ></el-input>
							</el-form-item>
						</el-col>
                        <el-col :span="6">
                            <div class="class-r">
                                <el-button size="small" style="margin-top:3px" @click="query">搜索</el-button>
                            </div>
                        </el-col>
					</el-row>
				</div>
			</el-form>
		</div>
		<div>
            <vxe-table border resizable :data="newProjectData" size="small" auto-resize :column-config="{minWidth:80}"
                class="mytable-scrollbar" highlight-current-row highlight-hover-row>
                <vxe-table-column field="ode_project_id_ebs" title="项目ID" width="120" align="center"></vxe-table-column>
                <vxe-table-column field="ode_project_code_ebs" title="项目号" width="120" header-align="center"></vxe-table-column>
                <vxe-table-column field="ode_cus_name" title="客户" width="160" align="center"></vxe-table-column>
                <vxe-table-column field="OP" title="操作"  header-align="center" align="center">
                    <template #default="{ row }">
                        <div>
                            <el-button size="mini" @click="select(row)">选中</el-button>
                        </div>
                    </template>
                </vxe-table-column>
            </vxe-table>
        </div>
	</vxe-modal>
</template>

<script>
import projectApi from "@/api/cbs/project.js";


export default {
	components: {
	},
	props: {
		show: Boolean,
		selectCondition:Object,
	},
	data() {
		return {
			condition:{
				page: 1,
                perPage: 20,
				api_state:2,
				columns:[],
				orderBy:"ode_create_time desc",
				keyword:"",
				ode_bus_type:null,
				ode_price:null, 
				ode_collect_mode:null,
				ode_cus_id:null,
				ode_od_title_id:null,
			},
			newProjectData:[]
		};
	},
	created() {
		this.query()
	},
	methods: {
		//获取项目号
		query(){
			this.condition.ode_bus_type=this.selectCondition.order_business_type
			this.condition.ode_price=this.selectCondition.order_price_clause
			this.condition.ode_collect_mode=this.selectCondition.order_collect_mode
			this.condition.ode_cus_id=this.selectCondition.order_cus_id
			this.condition.ode_od_title_id=this.selectCondition.order_title_id
			console.log("🚀 ~ file: project_select.vue:80 ~ query ~ this.condition", this.condition)
			projectApi.getProjectList(this.condition).then((res) => {
                if (res.code == 0) {
					this.newProjectData=res.data.list
                	console.log("🚀 ~ file: project_select.vue:74 ~ projectApi.getProjectList ~ this.newProjectData", this.newProjectData)
                }
            });
		},
		
		//选中项目号
		select(row){
			this.$emit("getProjectCode",row.ode_project_code_ebs,row.ode_project_id_ebs)
			this.$emit('update:show', false)
		}
		
	},
	watch:{
		
	}
};
</script>
