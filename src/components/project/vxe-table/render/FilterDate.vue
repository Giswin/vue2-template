<template>
    <div class="my-filter-complex">
        <div class="my-fc-name">
			<el-row>
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择日期" v-model="option.data.start"
						style="width: 100%;" size="small" clearable @change="changeOptionEvent()" value-format="yyyy-MM-dd"></el-date-picker>
				</el-col>
				<el-col :span="2" style="text-align: center;line-height: 32px;">-</el-col>
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择日期" v-model="option.data.end"
						style="width: 100%;" size="small" clearable @change="changeOptionEvent()" value-format="yyyy-MM-dd"></el-date-picker>
				</el-col>
			</el-row>			
        </div>
        <div class="my-fc-footer">
            <el-button type="primary" @click="confirmEvent" size="small">确认</el-button>
            <el-button @click="resetEvent" size="small">重置</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FilterDate',
        props: {
            params: Object
        },
        data() {
            return {
                size: 'mini', // 被所有子组件继承 size
                column: null,
                option: null
            }
        },
        created() {
            this.load()
        },
        methods: {
            load() {
                const {
                    column
                } = this.params
                const option = column.filters[0]
                this.column = column
                this.option = option
            },
            changeOptionEvent() {
                const {
                    params,
                    option
                } = this
                const {
                    $panel
                } = params
                const checked = !!option.data.start || !!option.data.end
                $panel.changeOption(null, checked, option)
            },
            confirmEvent() {
                const {
                    $panel
                } = this.params
                $panel.confirmFilter()
            },
            resetEvent() {
                const {
                    $panel
                } = this.params
                $panel.resetFilter()
            }
        }
    }
</script>

<style scoped>
    .my-filter-complex {
        width: 280px;
        padding: 15px 15px 10px 15px;
    }

    .my-filter-complex .my-fc-footer {
        clear: both;
        text-align: center;
        padding-top: 10px;
    }
</style>
