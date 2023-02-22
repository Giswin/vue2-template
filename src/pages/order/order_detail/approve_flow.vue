<style scoped lang="scss">
    //特殊样式，而不通用请在这里写样式
    .approve-main {
        position: absolute;
        right: -1px;
        top: -1px;
        width: 460px;
        border: 1px solid #ddd;
        padding: 20px;
        box-sizing: border-box;
        background: #fff;
        line-height: normal;
        box-shadow: 0px 0px 5px 0px #ddd;
        border-radius: 5px;
        text-align: left;
        z-index: 9;

        .title {
            text-align: left;
            font-size: 14px;
            margin-bottom: 10px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
            font-weight: bold;

            .close-approve {
                float: right;
                cursor: pointer;
                width: 20px;
                text-align: center;
                border-radius: 5px;
            }

            .close-approve:hover {
                background: #D4081A;
                color: #fff;
            }
        }
    }

    .head-sp {
        cursor: pointer;
    }

    .approve-main {
        display: block;
    }

    >>> {
        .el-timeline-item__node--normal {
            width: 20px;
            height: 20px;
        }

        .el-timeline-item__tail {
            left: 8px;
        }
    }
</style>
<template>
    <div class="approve-main">
        <div class="title">
            当前状态
            <div class="close-approve" @click.stop="closeModel">×</div>
        </div>

        <el-row>
            <div>
                 审批记录
                <div style="margin-top: 10px; height: 215px;">
                    <el-timeline>
                        <el-timeline-item v-for="(activity, index) in RecordData" v-if="activity.wfr_state != 0"
                            :key="index" :icon="activity.icon" :type="activity.type" :color="activity.color"
                            :size="activity.size" :timestamp="activity.timestamp">
                            {{activity.content}}
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {
            show: Boolean,
            RecordDatalist: Array,
        },
        data() {
            return {
                reverse: true,
                RecordData: [],
            };
        },
        mounted() {


        },
        created() {
            this.init()
        },
        methods: {
            closeModel() {
                this.$emit('update:show', false);
            },
            init(){
                let tmpArr = [];
                for (let i = 0; i < this.RecordDatalist.length; i++) {
                    tmpArr.push({
                        'content': this.RecordDatalist[i].wfr_op_name_p + ' ' + (!this.RecordDatalist[i].wfr_op_time_e ? '' : this.RecordDatalist[
                            i].wfr_op_time_e),
                        'timestamp': !this.RecordDatalist[i].wfr_memo ? '' : this.RecordDatalist[i].wfr_memo,
                        'icon': this.RecordDatalist[i].wfr_op_result == 1 ? 'el-icon-check' : this.RecordDatalist[i].wfr_op_result ==
                            2 ? 'el-icon-close' : '',
                        'color': this.RecordDatalist[i].wfr_op_result == 1 ? '#0bbd87' : this.RecordDatalist[i].wfr_op_result == 2 ?
                            'red' : '',
                        'wfr_state': this.RecordDatalist[i].wfr_state
                    });
                }
                this.RecordData = tmpArr;
            }
        },
        watch: {
            
        }
    };
</script>
