<template>
    <div class="my-filter-complex">
        <div class="my-fc-name">
            <el-input type="text" size="small" v-model="option.data" placeholder="支持回车筛选" @keyup.enter.native="keyupEvent" @input="changeOptionEvent"></el-input>
        </div>
        <div class="my-fc-footer">
            <el-button type="primary" @click="confirmEvent" size="small">确认</el-button>
            <el-button @click="resetEvent" size="small">重置</el-button>
        </div>
    </div>

</template>

<script>
export default {
    name: "FilterInput",
    props: {
        params: Object,
    },
    data() {
        return {
            column: null,
            option: null,
        };
    },
    created() {
        this.load();
    },
    methods: {
        load() {
            const { column } = this.params;
            const option = column.filters[0];
            this.column = column;
            this.option = option;
        },
        changeOptionEvent() {
            const { params, option } = this;
            const { $panel } = params;
            const checked = !!option.data;
            $panel.changeOption(null, checked, option);
        },
        keyupEvent({ $event }) {
            const { params } = this;
            const { $panel } = params;
            // if ($event.keyCode === 13) {
            //     $panel.confirmFilter();
            // }
            $panel.confirmFilter();
        },
        confirmEvent() {
            const { $panel } = this.params;
            $panel.confirmFilter();
        },
        resetEvent() {
            const { $panel } = this.params;
            $panel.resetFilter();
        },
    },
};
</script>

<style scoped>
.my-filter-complex {
    width: 200px;
    padding: 15px 15px 10px 15px;
}

.my-filter-complex .my-fc-footer {
    clear: both;
    text-align: center;
    padding-top: 10px;
}
</style>
