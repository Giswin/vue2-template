<template>
    <div class="wrap">
        <vxe-modal ref="model1" v-model="show" width="600" resize height="400" show-footer destroy-on-close>

            <template v-slot:header>
                <div>创建项目测算</div>

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
            <div>
                <div class="table-body">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="definition">
                        <tbody>
                            <tr>
                                <th width="180" align="center"><span>*</span>业务部门</th>
                                <td>
                                    <el-select ref="depSelect2" v-model="dep_name" placeholder="请选择部门" size="small" clearable @clear="clearDep">
                                        <el-tree ref="listTree" :data="selectOptions.dep" :props="defaultProps" node-key="dep_id" @node-click="depClick"></el-tree>
                                        <el-option v-for="item in selectOptions.dep" :key="item.value" :value="item.value" :label="item.title" style="display: none;"></el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr>
                                <th align="center"><span>*</span>业务员</th>
                                <td>
                                    <el-select v-model="salesID" size="small" clearable placeholder="请选择">
                                        <el-option v-for="item in selectOptions.sales"
										 v-show="item.dep_id == departmentID"
										  :key="item.staff_id" :label="item.staff_name" 
										  :value="item.staff_id"></el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr>
                                <th align="center"><span>*</span>接单抬头</th>
                                <td>
                                    <el-select v-model="titleID" size="small" clearable @change="changeTitle" placeholder="请选择">
                                        <el-option v-for="item in selectOptions.allTitle" :key="item.title_id" :label="item.title" :value="item.title_id"></el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr>
                                <th align="center"><span>*</span>业务类型</th>
                                <td>
                                    <el-select v-model="projectTypeID" size="small" clearable filterable @change="changeProjectType">
                                        <el-option v-for="item in bussinessType" :key="item.transaction_type_id" :label="item.name" :value="item.transaction_type_id"></el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <!-- <tr>
                                <th align="center">接单日期</th>
                                <td>
                                    <el-date-picker v-model="base_info.order_date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" size="small" clearable></el-date-picker>
                                </td>
                            </tr> -->

                            <!-- <tr>
                                <th align="center">订单备注</th>
                                <td height="60">
                                    <el-input v-model="base_info.order_memo" placeholder="请输入" type="textarea" clearable></el-input>
                                </td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
            </div>

            <template v-slot:footer>
                <div class="m-l">
                </div>
                <div class="m-r">
					 
                    <el-button size="small" @click="save">确定</el-button>
                    <el-button @click="closeIcon" size="small" style="margin-left:15px">取消</el-button>
                </div>
            </template>
        </vxe-modal>
    </div>
</template>

<script>
import ebsApi from "@/api/gbs/ebs.js";
import projectApi from "@/api/cbs/project.js";
export default {
    props: {
        selectOptions: {
            type: Object,
        },
    },
    data() {
        return {
            show: true,
            downIcon: true,
            defaultProps: {
                children: "children",
                label: "title",
            },
            ebs_path: "HS",
            bussinessType: [
                {
                    description: "1800囤货采购",
                    name: "1800囤货采购",
                    org_id: 582,
                    transaction_type_id: 1285
                },
                {
                    description: "1800国内贸易",
                    name: "1800国内贸易",
                    org_id: 582,
                    transaction_type_id: 1286
                },

            ], //业务类型
            titleID: 1, //订单抬头ID
            titleName: "江苏国泰华盛实业有限公司", //订单抬头
            departmentID: this.$store.state.user.edep, //业务部门ID
            dep_name: this.$store.state.user.edepname, //
            salesID: Number(this.$store.state.user.eid), //业务员ID
            projectTypeID: null, //业务类型ID
            projectTypeName: "", //业务类型
        };
    },

    created() {
        //this.getType();
		 
    },
    methods: {
        closeModel() {
            this.show = false;
            this.$emit("closeCreate");
        },
        closeIcon() {
            this.show = false;
            this.$emit("closeIcon");
        },
        screen() {
            this.$refs.model1.zoom();
            this.downIcon = !this.downIcon;
        },
        //获取业务类型
        getType() {
            ebsApi
                .getEbsData("get_tradetype", "", this.ebs_path)
                .then((result) => {
                    if (result.code == 0) {
                        this.bussinessType = result.data || [];
                        console.log("bussinessType", this.bussinessType);
                    }
                });
        },
        depClick(data) {
            console.log("depclick", data);
            if (data.end) {
                this.departmentID = data.value;
                this.dep_name = data.title;
                this.$refs.depSelect2.handleClose();
            }
        },
        clearDep() {
            this.departmentID = null;
            this.dep_name = null;
        },
        changeProjectType(value) {
            this.bussinessType.forEach((item) => {
                if (value == item.transaction_type_id) {
                    this.projectTypeName = item.name;
                }
            });
        },
        changeTitle(value) {
            this.selectOptions.allTitle.forEach((item) => {
                if (value == item.title_id) {
                    this.titleName = item.title;
                }
            });
            if (value == 4) {
                this.ebs_path = "HK";
            } else {
                this.ebs_path = "HS";
            }
            this.getType();
        },
        save() {
            projectApi
                .createCalProject(
                    this.titleID,
                    this.titleName,
                    this.departmentID,
                    this.salesID,
                    this.projectTypeID,
                    this.projectTypeName
                )
                .then((res) => {
                    console.log("baocun", res);
                    if (res.code == 1) {
                        this.$message({
                            type: "success",
                            message: "创建成功!",
                        });
						this.closeModel();
                    }
					else
					{
						this.$message({
						    type: "error",
						    message: res.msg,
						});
					}
                });
        },
    },
};
</script>

<style lang="scss" scoped>
>>> .vxe-modal--content {
    padding: 5px;
}
</style>