<template>
    <div>
        <div class="final-wrap">

            <div class="class-title">
                <div class="title">决算信息</div>
                <div class="m-r">
                    <el-button size="small" style="margin-left: 15px;" @click="buildErpEndProject()">新增</el-button>
                </div>

            </div>

            <div class="final-table">
                <vxe-table border ref="finalTable" :data="finalData" auto-resize resizable show-overflow size="small" class="mytable-scrollbar" max-height="100%" :column-config="{minWidth:100}">
                    <vxe-table-column field="odpe_id" title="决算ID" align="left" header-align="center"></vxe-table-column>
                    <vxe-table-column field="odpe_create_time" title="创建日期" align="center" header-align="center"></vxe-table-column>
                    <vxe-table-column field="odpe_currency_sales" title="币种" align="center" header-align="center"></vxe-table-column>
                    <vxe-table-column field="odpe_amount_sales" title="金额" align="right" header-align="center"></vxe-table-column>
                    <vxe-table-column field="odpe_api_time" title="同步时间" align="center" header-align="center"></vxe-table-column>
                    <vxe-table-column title="操作" align="center" header-align="center">
                        <template #default="{ row }">
                            <el-dropdown>
                                <el-button size="mini">
                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-show="row.odpe_id_ebs == 0 || !row.odpe_id_ebs || row.odpe_id_ebs == null" @click.native="handleToEdit(row.odpe_id)">编辑</el-dropdown-item>
                                    <el-dropdown-item v-show="row.odpe_id_ebs >0 " @click.native="delOrderProject(row.odpe_id,2)">撤销同步</el-dropdown-item>
                                    <!-- <el-dropdown-item @click.native="print_project(row.odpe_id)">打印</el-dropdown-item> -->
                                    <el-dropdown-item v-show="row.odpe_id_ebs == 0 || !row.odpe_id_ebs || row.odpe_id_ebs == null" @click.native="delOrderProject(row.odpe_id,1)">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </vxe-table-column>

                </vxe-table>
            </div>
        </div>
        <project_ebs :id="odpe_id" v-if="modelProject" :show.sync="modelProject" :budget_head="budget_head" @aftersave="refresh()"></project_ebs>
    </div>
</template>

<script>
import cbsApi from "@/api/cbs/project.js";
import project_ebs from "@/pages/project/project_detail/ebs_final_edit";
export default {
    props: {
        finalData: {
            type: Array,
        },
        //项目主键
        ode_id: {
            type: String,
        },
        budget_head: {
            type: Object,
        },
    },
    components: {
        project_ebs,
    },
    data() {
        return {
            finalObject: {},
            cnyAllCount: 0,
            modelProject: false,
        };
    },
    created() {},
    methods: {
        print_project(odpe_id) {
            window.open(`/#/ebs_final_accountting_print?id=${odpe_id}`);
        },
        footerMethod({ columns, data }) {
            let countArr = [];

            for (let key in this.finalObject) {
                countArr.push(
                    columns.map((column, columnIndex) => {
                        if (["odpe_currency_sales"].includes(column.property)) {
                            return key;
                        }
                        if (["odpe_amount_sum"].includes(column.property)) {
                            return this.$general.transform(
                                this.finalObject[key] || 0
                            );
                        }
                        return null;
                    })
                );
            }

            return countArr;
        },

        footerRowClassName({ $rowIndex }) {
            return "footer-style";
        },
        // 编辑
        handleToEdit(id) {
            this.odpe_id = id;
            this.modelProject = true;
        },

        // 删除决算单
        delOrderProject(odpe_id, flag) {
            let message = "";
            if (flag == 1) message = "是否删除该决算!";
            else if (flag == 2) message = "是否撤销同步该决算!";
            this.$confirm(message, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then((type) => {
                if (type == "confirm") {
                    cbsApi.delOrderProject(odpe_id, flag).then((res) => {
                        this.$message({
                            message: res.msg,
                            type: res.code == 0 ? "success" : "warring",
                        });
                        this.refresh();
                    });
                }
            });
        },

        refresh() {
            this.$emit("refresh");
        },
        //生成
        buildErpEndProject() {
            cbsApi.buildErpEndProject(this.ode_id, "", 1).then((res) => {
                if (res.code == 0) {
                    this.refresh();
                    this.$forceUpdate();
                    this.$message({
                        message: "新建成功!",
                        type: "success",
                    });
                } else {
                    this.$message({
                        message: "新建失败!",
                        type: "warning",
                    });
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.final-wrap {
    height: 450px;
    .final-table {
        margin-top: 15px;
        height: 90%;
    }
}
>>> .footer-style {
    background-color: #f6ffcc;
}
</style>