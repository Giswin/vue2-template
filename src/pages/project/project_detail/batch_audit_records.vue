<style scoped lang="scss">

</style>
<template>
    <vxe-modal ref="modal1" :value="show" :showFooter="true" width="960" height="640" resize :mask-closable="false">
        <template v-slot:header>
            <span class="vxe-modal--title">批量同步审批记录</span>
            
            <i title="最大化" class="vxe-modal--zoom-btn trigger--btn vxe-icon--square" v-show="downIcon" @click="trigger_btn"></i>
            <i title="还原" class="vxe-modal--zoom-btn trigger--btn vxe-icon--zoomout" v-show="!downIcon" @click="trigger_btn"></i>
            <i title="关闭" class="vxe-modal--close-btn trigger--btn vxe-icon--close" @click="() => close()"></i>
        </template>
        <div class="class-title" style="margin-top:10px">
            <div class="title">已审批未同步</div>
        </div>
        <div style="margin: 0 10px;">
            <vxe-table ref="batchTable" border resizable :data="batchList" size="small" auto-resize :column-config="{minWidth:180}" class="mytable-scrollbar"
                highlight-current-row highlight-hover-row show-overflow
            >
                <vxe-table-column type="checkbox" align="center" width="60" fixed="left"></vxe-table-column>
                <vxe-table-column type="seq" title="序号" width="60" align="center" fixed="left"></vxe-table-column>
                <vxe-table-column field="contract_type" title="类型" width="120" align="center" header-align="center">
                    <template v-slot="{row}">
                        <span v-if="row.contract_type == 'purchase'">采购合同</span>
                        <span v-if="row.contract_type == 'process'">加工合同</span>
                        <span v-if="row.contract_type == 'order'">订单</span>
                    </template>
                </vxe-table-column>
                <vxe-table-column field="contract_code" title="合同号" width="200" align="left" header-align="center"></vxe-table-column>
                <vxe-table-column field="contract_trader" title="交易方"  align="left" header-align="center"></vxe-table-column>
            </vxe-table>
        </div>
        <div slot="footer">
            <el-button size="small" @click="() => close()">取消</el-button>
            <el-button size="small" @click="Sync">同步</el-button>
        </div>
    </vxe-modal>
</template>

<script>
import projectApi from "@/api/cbs/project.js";

export default {
    components: {
    },
    props: {
        show:Boolean,
        preData:Array,
    },
    data() {
        return {
           downIcon: true,
           syncData:[],
           batchList:[],
           

        };
    },
    created() {
        this.initData();
    },
    
    methods: {
        initData() {
            this.batchList=this.preData
        },

        //页面窗口大小切换
        trigger_btn() {
            this.$refs.modal1.zoom();
            this.downIcon = !this.downIcon;
        },

        close(){
            this.$emit('update:show', false)
        },

        getSelectData(){
            this.syncData=[]
            let batchSelectData=this.$refs.batchTable.getCheckboxRecords();
            batchSelectData.forEach(item => {
                this.syncData.push({id:item.id,type:item.contract_type})
            });
        },

        //同步
        Sync(){
            this.getSelectData()
            if(this.syncData.length==0){
                this.$alert("请选择合同！", "错误提示", {
                    confirmButtonText: "确定",
                    type: "warning",
                });
            }else{
                let batchSyncData=JSON.stringify(this.syncData)
                projectApi.batchSync(batchSyncData).then((res)=>{
                    if(res.code==0){
                        this.$message({
                            type: "success",
                            message: "同步成功!",
                        });
                        
                        this.$emit('refresh');
                        this.close()
                    }else{
                        this.$message({
                            type: "success",
                            message: "同步失败!",
                        });
                    }
                })
            }
                
        },

       
    },

    watch: {
        batchList: function() {
            this.$nextTick(() => { 
                this.$refs.batchTable.setAllCheckboxRow(true)
            });
        }
    },
};
</script>