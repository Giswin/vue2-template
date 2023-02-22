<template>
    <div>
        <div class="contract-wrap">

            <div class="class-title">
                <div class="title">出运信息</div>
                <div class="m-r" style="margin-top: -8px;">
                   <el-button size="small" @click="createEndProject">创建决算单</el-button>
                </div>
            </div>

            <div class="contract-table">
                <vxe-table border ref="shipTable" :data="shipList" auto-resize resizable show-overflow size="small" class="mytable-scrollbar" 
                :column-config="{minWidth:140}">
                    <vxe-table-column type="checkbox" align="center" width="40" fixed="left"></vxe-table-column>
                    <vxe-table-column field="shn_invoice_no_ebs" title="运编号" align="left" header-align="center" ></vxe-table-column>
                    <vxe-table-column field="shn_ship_date" title="出运日期" align="center" header-align="center" min-width="120"></vxe-table-column>
                    <vxe-table-column field="shn_dep_name" title="部门" align="left" header-align="center" min-width="140"></vxe-table-column>
                    <vxe-table-column field="shn_sales_name" title="业务员" align="left" header-align="center" min-width="140"></vxe-table-column>
                    <vxe-table-column field="sumQty" title="出运数量" align="left" header-align="center" min-width="130" ></vxe-table-column>
                    <vxe-table-column field="sumMoney" title="出运金额" align="right" header-align="center" min-width="100" formatter="formatAmount"></vxe-table-column>
                    <vxe-table-column field="shn_country_to" title="目的国" align="center" header-align="center" > </vxe-table-column>
                    <vxe-table-column field="isChecked" title="状态" align="center" header-align="center" min-width="90">
                     
                    </vxe-table-column>
                </vxe-table>
            </div>
        </div>
    </div>
</template>

<script>
import projectApi from "@/api/cbs/project.js";

export default {
    components: {
       
    },
    props: {
        shipData: {
            type: Array,
        },
        ode_id:{
			type:String,
		},
    },
    data() {
        return {
            shipList:[],
            ship_array:[],
        };
    },
    created() {
        
    },
        
    methods: {
        initData(){
            this.shipList=this.shipData
        },
        createEndProject(){
           this.ship_array=[]
           let selectShipData=this.$refs.shipTable.getCheckboxRecords();
           selectShipData.forEach(item => {
               this.ship_array.push(item.shn_id)
           });
           if(this.ship_array.length==0){
                this.$alert("请选择出运信息！", "错误提示", {
                    confirmButtonText: "确定",
                    type: "warning",
                });
           }else{
               projectApi.buildErpEndProjectByShipinfo(this.ode_id,this.ship_array).then((res)=>{
                   if(res.code==0){
                       this.$message({
                            type: "success",
                            message: "创建成功!",
                        });
                        this.$emit('refresh');
                   }else{
                       this.$message({
                            type: "success",
                            message: "创建失败!",
                        });
                   }
               })
           }
           
       },
    },
    watch: {
        shipData: function() {
            this.$nextTick(() => { 
                this.initData()
            });
        }
    },
};
</script>

<style lang="scss" scoped>

</style>