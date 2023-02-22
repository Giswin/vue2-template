<style scoped lang="scss">
//特殊样式，而不通用请在这里写样式
</style>
<template>
    <div>
		<div>
			<div class="class-title">
			    <div class="title">变更记录</div>
			</div>
			<div>
				<vxe-table border resizable show-overflow :data="changeList"  auto-resize :column-config="{minWidth:120}"
                    class="mytable-scrollbar" highlight-current-row highlight-hover-row>
                    <vxe-table-column type="seq" title="序号" width="40" align="center" fixed="left"></vxe-table-column>
                    <vxe-table-column field="change_op_name" title="变更人" width="130" align="center">
                    </vxe-table-column>
                    <vxe-table-column field="change_op_time" title="变更时间" width="160" align="center">
                    </vxe-table-column>
                    <vxe-table-column field="change_reason" title="原因说明" width="320" header-align="center" align="left"></vxe-table-column>
                    <vxe-table-column field="change_desc"  title="变更内容" align="center">
                        <template v-slot="{row}">
                            <span >{{row.change_desc.text}}</span>
                        </template>
                    </vxe-table-column>
                </vxe-table>
			</div>
		</div>
		
	</div>
</template>

<script>
import orderApi from '@/api/cbs/order.js'
    export default {
        components: {
			
        },
        props: {
            changeList:{
                type:Array
            },
        },
        created() {
        },
        data() {
            return {
            }
        },

        watch: {
            
        },
        methods: {
			
        }
    }
</script>