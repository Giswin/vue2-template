<template>
    <div id="app">
        <div class="wrap">
            <syMultipleSet :show.sync="modal1" :dataset="fieldsFrom" @on-ok="setSelectRowsValue"></syMultipleSet>
        </div>
    </div>

</template>

<script>
import syMultipleSet from "@/components/general/sy-multiple-set/index.vue";
export default {
    components: { syMultipleSet },
    data() {
        return {
            modal1: true,
            fieldsFrom: [
                {
                    field: "shgcd_country_origin",
                    title: "原产国/地区",
                    type: "text",
                    value: "",
                },
                {
                    field: "shgcd_country_to",
                    title: "目的国/地区",
                    type: "select",
                    value: "",
                    options: {
                        data: [
                            { value: "韩国", label: "韩国" },
                            { value: "新加坡", label: "新加坡" },
                            { value: "几内亚", label: "几内亚" },
                        ], // 下拉选项的数据源
                        valueField: "value", // 选中的值字段
                        labelField: "label", // 选中显示的名称字段
                        multiple: false, // 是否为多选
                    },
                },
                {
                    field: "shgcd_source_city",
                    title: "境内货源地",
                    type: "text",
                    value: "",
                },
                {
                    field: "shgcd_tax_property",
                    title: "征免",
                    type: "text",
                    value: "",
                },
            ],
        };
    },
    methods: {
        setSelectRowsValue(backData) {
            console.log(backData);
            this.modal1 = false;
        },
    },
};
</script>

<style scoped>
</style>
