<template>
    <div class="wrap">
        <div class="tags">
            <filter-tag :tags="formTags" @remove-tag="closeTag"></filter-tag>
        </div>
        <div class="filter-box">
            <filter-form ref="filterForm" :conditions="conditions" :view_type="view_type" :label_width="label_width" @search="filterFormConfirm"></filter-form>

        </div>
    </div>
</template>

<script>
import filterForm from "./filter-form.vue";
import FilterTag from "./filter-tag.vue";
export default {
    components: {
        filterForm,
        FilterTag,
    },
    data() {
        return {
            conditions: {
                // 输入过滤框模糊搜索
                user_name: {
                    type: "like", // like, select, date, number, input
                    field: "user_name", // 对应的后端查询字段名，可加表前缀，如：a.username
                    title: "用户名", // 字段中文名，标签名
                    value: "", // 条件项值
                },
                // 下拉选择
                status: {
                    type: "select",
                    field: "status",
                    title: "状态",
                    value: "",
                    // 下拉选择框的下拉数据集配置
                    options: {
                        config: {
                            label: "label", // 下拉选项显示字段
                            value: "value", // 下拉选择值字段
                            multiple: false, // 是否为多选
                        },
                        data: [
                            { label: "启用", value: "启用" },
                            { label: "禁用", value: "禁用" },
                        ], // 下拉数据集
                    },
                },
                // 日期区间过滤
                birthday: {
                    type: "date",
                    field: "birthday",
                    title: "出生日期",
                    value: {
                        start: "", // 起始日期
                        end: "", // 截止日期
                    },
                },
                // 数值区间过滤
                age: {
                    type: "number",
                    field: "age",
                    title: "年龄",
                    value: {
                        start: "",
                        end: "",
                    },
                },
            },
            view_type: 1,
            label_width: "90px",
            formTags: [],
            search: {},
        };
    },
    methods: {
        // 筛选表单确认回调方法
        filterFormConfirm({ consArray }) {
            // 获取已设置的条件项值来刷新筛选表单标签值
            this.formTags = consArray || [];
            this.showTag();
        },
        showTag() {
            this.search = {};
            this.formTags.forEach((item) => {
                this.search[item.key] = item.value;
            });
            console.log("search", this.search);
            // this.query();
        },
        // 关闭筛选标签
        closeTag(tag) {
            this.$refs["filterForm"].clearItem(tag.field);
            this.showTag();
        },
    },
};
</script>

<style lang="scss" scoped>
.tags {
    margin-bottom: 50px;
}
</style>