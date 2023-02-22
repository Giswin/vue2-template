<template>
    <div class="detail-main">
        <div class="detail-head-button">

            <div class="m-r">
                <!-- 草稿 -->
                <template v-if="base_info.shn_state==1">
                    <el-button size="small" @click="handleToPublish">发布</el-button>
                </template>
                <!-- 发布后 -->
                <template v-if="base_info.shn_state==2">
                    <el-button size="small" @click="handleToWithdraw">撤消发布</el-button>
					<el-button size="small" @click="setFinish(6)" v-if="customFlag==true">结案</el-button>
                </template>
				<template v-if="base_info.shn_state==6">
                     
					<el-button size="small" @click="setFinish(2)">取消结案</el-button>
                </template>
            </div>
            <div class="clear"></div>
        </div>
        <div class="detail-body">
            <div class="detail-body-head">
                <div class="detail-body-head-position">
                    <span>出运通知详情</span><br>
                    {{base_info.shn_code}}
                </div>
                <div class="detail-body-head-col">
                    <ul>
                        <li>创建信息：{{base_info.shn_create_time}} {{base_info.shn_creator}}</li>
                        <li>修改信息：{{base_info.shn_update_time}} {{base_info.shn_updator}}</li>
                        <li>发布信息：{{base_info.shn_publish_time}} {{base_info.shn_publisher}}</li>
                    </ul>
                </div>

                <div class="m-r">
                    <div class="">
                        <div style="cursor:pointer">
                            <div class="detail-body-head-state draft" v-show="base_info.shn_state == 1">待发布</div>
                            <div class="detail-body-head-state pause" v-show="base_info.shn_state == 2 && base_info.shn_state_aprv == 1">待审核</div>
                            <div class="detail-body-head-state change" v-show="base_info.shn_state == 2 && base_info.shn_state_aprv == 3">未通过</div>
                            <div class="detail-body-head-state change" v-show="base_info.shn_state == 3">变更中</div>
                            <div class="detail-body-head-state finish" v-show="base_info.shn_state == 2 && base_info.shn_state_aprv == 2">已审核</div>
                            <div class="detail-body-head-state finish" style="background: #2196f3;" v-show="base_info.shn_state == 6 && base_info.shn_state_aprv == 2">已结案</div>
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
            <div style="padding-top: 15px;">
                <div class="tabs">
                    <div class="tabs-col" :class="{ show: selectTab == 0 }" @click="selectTab = 0">基本信息</div>
                    <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectTab = 1">出运明细</div>
                    <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectTab = 2">报关明细</div>
                    <div class="tabs-col" :class="{ show: selectTab == 3 }" @click="selectTab = 3" v-if="1==0">变更信息</div>
                    <div class="tabs-col" :class="{ show: selectTab == 4 }" @click="selectTab = 4">相关附件</div>
                </div>
            </div>
            <div class="detail-tabs-body of" v-show="(selectTab == 0)">
                <baseInfo v-if="showFlag&&selectFlag" :baseInfo="base_info" :selectOptions="selectOptions" @changeInfo="changeInfo"></baseInfo>
            </div>
            <div class="detail-tabs-body of" v-show="(selectTab == 1)">
                <detailList v-if="showFlag&&selectFlag" :detailList="detailList" :currency="ship_currency" :shn_id="shn_id" :selectOptions="selectOptions" @changeInfo="changeInfo"></detailList>
            </div>
            <div class="detail-tabs-body of" v-show="(selectTab == 2)">
                <customDetail v-if="showFlag" :customList="customList" :currency="ship_currency"></customDetail>
            </div>
            <div class="detail-tabs-body of" v-show="(selectTab == 3 )">
                3
            </div>
            <div class="detail-tabs-body of" v-show="(selectTab == 4)">
                <div class="note-attach" v-if="showAttach">
                    <sy-attach :mode="1" :object_name="'cbm_ship_note'" :object_keyid="shn_id" :attach_class="attach_class"></sy-attach>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
import shipApi from "@/api/cbs/ship.js";
import ifsApi from "@/api/ifs";
import baseInfo from "./baseInfo.vue";
import detailList from "./detailList.vue";
import customDetail from "./customDetail.vue";

export default {
    components: {
        baseInfo,
        detailList,
        customDetail,
    },
    data() {
        return {
            selectTab: 0,
            shn_id: 0,
            shn_code: "",
            showFlag: false,
            selectFlag: false,
            selectOptions: {
                sales: [], //业务员**
                documentPeople: [], //单证员
                shipPeople: [], //船务员
                BZ: [], //币种**
                YSFS: [], // 运输方式**
                allCus: [], // 客户**
                allTitle: [], // 接单抬头**
                titleOptions: [], //抬头选项
                portFrom: [], //起运港
                portTo: [], //目的港
                businessType: [], //业务类型
                tradeMode: [], // 贸易方式
            },
			
            // 基础信息
            base_info: {},
            // 出运明细
            detailList: [],
            ship_currency: "",
            // 报关明细
            customList: [],
            // 附件类型
            attach_class: ["出运资料"],
            showAttach: false,
			customFlag:false,
        };
    },
    created() {
        this.getData();
        this.getOptions();
    },
    methods: {
        getData() {
            let params = this.$route.query;
            this.shn_id = Number(params.id);
            this.showAttach = true;
            this.shn_code = params.flag;
            this.getDetailInfo();
        },
		setFinish(type){
			//标记结案或取消结案
			let msg='';
			if(type==6)
				msg="确认要结案吗？";
			else
				msg="确认要取消结案吗？"
			this.$confirm(msg, "提示", {
			    confirmButtonText: "确定",
			    cancelButtonText: "取消",
			    type: "warning",
			})
			    .then(() => {
			       shipApi.setShipnoteState(this.shn_id,type).then((res)=>{
					   if (res.code == 0) {
					       this.$message({
					           message:res.msg,
					           type: "success",
					       });
					       this.getDetailInfo();
					   }
				   })
			    })
			    .catch(() => {
			        this.$message({
			            type: "info",
			            message: "已取消操作",
			        });
			    });
		},
        getDetailInfo() {
            shipApi.getShipInfo(this.shn_id).then((res) => {
                console.log("详情信息", res);
                if (res.code == 0) {
                    this.base_info = Object.freeze(res.data.baseInfo);
                    this.ship_currency = this.base_info.shn_currency;
                    this.detailList = Object.freeze(res.data.detailInfo);
					this.customFlag=res.data.customFlag||false;
                    this.customList = [];
                    this.detailList.forEach((item) => {
                        if (item.shnd_shc_id && item.shc_code) {
                            this.customList.push(item);
                        }
                    });

                    this.showFlag = true;
                }
            });
        },
        getOptions() {
            Promise.all([
                this.$dmBaseSet.personData(),
                this.$dmBaseSet.customerData(),
                this.$dmBaseSet.filterDic(
                    "TY_BZ,TY_YSFS,TY_YWLX,TY_TRADE_MODE_EBS"
                ),
                ifsApi.getPorts(1, 0),
                ifsApi.getPorts(0, 1),
                ifsApi.getTitlelist(),
                this.$dmBaseSet.getOptions(),
                this.$dmBaseSet.documentStaffData(),
                this.$dmBaseSet.shipStaffData(),
            ]).then((res) => {
                this.selectOptions.sales = Object.freeze(res[0].list || []); //业务员
                this.selectOptions.allCus = Object.freeze(res[1] || []); //客户
                this.selectOptions.BZ = Object.freeze(
                    res[2]["TY_BZ"].children || []
                ); //币种

                this.selectOptions.YSFS = Object.freeze(
                    res[2]["TY_YSFS"].children
                ); //运输方式

                this.selectOptions.businessType = Object.freeze(
                    res[2]["TY_YWLX"].children
                ); //业务类型
                this.selectOptions.tradeMode = Object.freeze(
                    res[2]["TY_TRADE_MODE_EBS"].children
                ); //贸易方式

                this.selectOptions.portFrom = Object.freeze(res[3].data); //起运港
                this.selectOptions.portTo = Object.freeze(res[4].data); //目的港
                this.selectOptions.allTitle = Object.freeze(res[5].tnt_title); //接单抬头
                this.selectOptions.titleOptions =
                    res[6].TITLE_PROPERTY_OPTION.option_value || []; //抬头选项
                this.selectOptions.documentPeople = Object.freeze(
                    res[7].list || []
                ); //单证员
                this.selectOptions.shipPeople = Object.freeze(
                    res[8].list || []
                ); //船务员

                this.selectOptions = Object.freeze(this.selectOptions);
                this.selectFlag = true;

                console.log("selectOptions", this.selectOptions);
            });
        },
        changeInfo() {
            this.getDetailInfo();
        },

        // 发布
        handleToPublish() {
            this.$confirm("确定要发布该出运通知?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    shipApi.publishShipNote(this.shn_id).then((res) => {
                        console.log("publish", res);
                        if (res.code == 0) {
                            this.$message({
                                message: "出运通知发布成功！",
                                type: "success",
                            });
                            this.getDetailInfo();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消发布",
                    });
                });
        },
        handleToWithdraw() {
            this.$confirm("确定要撤回该出运通知?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                shipApi.withdrawShipNote(this.shn_id).then((res) => {
                    if (res.code == 0) {
                        this.$message({
                            message: "出运通知已撤回！",
                            type: "success",
                        });
                        this.getDetailInfo();
                    }
                });
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.note-attach {
    padding: 0px 15px;
}
</style>