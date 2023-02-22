<style scoped lang="scss">
</style>
<template>
    <vxe-modal title="批量设置" :value="show" class-name="vertical-center-modal" :showFooter="true" width="440" height="410" resize remember @close="() => this.$emit('update:show', false)" destroy-on-close>

        <div>

            <div style="margin-bottom:10px;">
                <vxe-table ref="multipleSetFrom" size="mini" border resizable :data="dataset" height="280px" :mouse-config="{selected: true}" :keyboard-config="{
                      isArrow: true,
                      isDel: false,
                      isEnter: true,
                      isTab: true,
                      isEdit: true,
                      isChecked: true,
                    }" :edit-config="{ trigger: 'click', mode: 'cell', showStatus: true }" auto-resize highlight-cell class="vxe-table-scrollbar">

                    <vxe-table-column field='title' title="设置字段" header-align="center"></vxe-table-column>
                    <vxe-table-column type="checkbox" width="40" align="center"></vxe-table-column>

                    <vxe-table-column field="value" title="设置值" width="230" header-align="center" align="left">
                        <template #default="{ row, rowIndex }">
                            <el-input :disabled="$refs.multipleSetFrom.isCheckedByCheckboxRow(row) == false" v-if="row.type == 'text'" v-model="row.value" size="small" clearable></el-input>
                            <el-input :disabled="$refs.multipleSetFrom.isCheckedByCheckboxRow(row) == false" v-if="row.type == 'number'" v-model="row.value" size="small" clearable></el-input>

                            <el-select :disabled="$refs.multipleSetFrom.isCheckedByCheckboxRow(row) == false" v-if="row.type == 'select' && (!row.options.data || row.options.data.length <= 100)" v-model="row.value" :multiple="row.options.multiple" filterable placeholder="请选择" size="small" clearable style="width: 100%;">
                                <el-option v-for="(opt, index) in row.options.data" :key="opt[row.options.valueField]" :label="opt[row.options.labelField]" :value="opt[row.options.valueField]">
                                </el-option>
                            </el-select>
                            <el-select :disabled="$refs.multipleSetFrom.isCheckedByCheckboxRow(row) == false" v-if="row.type == 'select' && row.options.data && row.options.data.length > 100" v-model="row.value" :multiple="row.options.multiple" filterable placeholder="请输入下拉选择" size="small" clearable style="width: 100%;" remote @focus="curr_prop = rowIndex" :reserve-keyword="true" :loading="loading" :remote-method="filterSelect">
                                <el-option v-for="(opt, index) in temp_options[rowIndex]" :key="opt[row.options.valueField]" :label="opt[row.options.labelField]" :value="opt[row.options.valueField]">
                                </el-option>
                            </el-select>
                            <el-date-picker v-if="row.type == 'date'" type="date" placeholder="选择日期" v-model="row.value" style="width: 100%;" size="small" clearable :disabled="$refs.multipleSetFrom.isCheckedByCheckboxRow(row) == false" value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </template>

                    </vxe-table-column>
                </vxe-table>
            </div>

        </div>

        <div slot="footer">
            <div class="m-r">
                <vxe-button @click="confirmBtn">确定</vxe-button>
                <vxe-button @click="()=>this.$emit('update:show',false)">取消</vxe-button>
            </div>
        </div>
    </vxe-modal>
</template>

<script>
/*
    dataset的配置结构为：
    [
        {
            title: '属性标签名',
            field: '', // 批量设置的属性字段
            type: '',  // 4种编辑方式/类型： text|number|select|date
            value: null, // 批量设置的值
            
            // 如果是 select 类型的，要配置 options
            options:{
                data: [],  // 下拉选项的数据源
                valueField: '', // 选中的值字段
                labelField: '', // 选中显示的名称字段
                multiple: false // 是否为多选
            }
        }
    ]
    */

export default {
    name: "syMultipleSet",
    props: {
        show: Boolean,
        // 用来创建条件项表单的数组
        dataset: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    data() {
        return {
            temp_options: {},
            curr_prop: "",
            loading: false,
        };
    },
    methods: {
        // select 多选时过滤方法
        filterSelect(query) {
            if (query !== "") {
                this.loading = true;

                setTimeout(() => {
                    let listData =
                        this.dataset[this.curr_prop].options.data || [];
                    let labelName =
                        this.dataset[this.curr_prop].options.labelField;
                    this.$set(
                        this.temp_options,
                        this.curr_prop,
                        listData.filter(
                            (item) =>
                                item[labelName]
                                    .toLowerCase()
                                    .indexOf(query.toLowerCase()) > -1
                        )
                    );
                }, 200);
                this.loading = false;
            } else {
                this.$set(this.temp_options, this.curr_prop, []);
            }
        },

        // 根据选项值，获取选项显示名称
        getLabelByValue(tag) {
            // 多选
            if (Array.isArray(tag.value)) {
                let aitems = this.$XEUtils.filter(
                    tag.options.data,
                    (item) =>
                        tag.value.indexOf(
                            item[tag.options.config.value] || ""
                        ) > -1
                );
                return (
                    this.$XEUtils.pluck(aitems, tag.options.labelField) || []
                );
            } // 单选
            else {
                let aitem = this.$XEUtils.find(
                    tag.options.data,
                    (item) => item[tag.options.valueField] == tag.value
                );
                return aitem[tag.options.labelField] || "";
            }
        },

        // 确定按钮方法
        confirmBtn() {
            let selectedRows =
                this.$refs.multipleSetFrom.getCheckboxRecords(true);
            if (selectedRows.length < 1) {
                this.$XModal.message("请勾选要批量设置的属性", "error");
                return false;
            }

            let backData = [];

            for (let i = 0; i < selectedRows.length; i++) {
                backData.push({
                    field: selectedRows[i].field,
                    value: selectedRows[i].value,
                });
            }

            this.$emit("on-ok", backData);
        },
    },
};
</script>
