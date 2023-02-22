<template>
    <div>
        <div class="drawer-body" :class="{'of' : dataset.length > 7 }">
            <el-form :model="dataset" :show-message="false" ref="ConditionForm" :label-width="label_width">

                <el-form-item v-for="(item, prop) in dataset" :label="item.title">

                    <el-input v-if="item.type == 'input' || item.type == 'like'" v-model="item.value" size="small" clearable :placeholder="item.type == 'like' ? '模糊搜索,多个值用空格间隔' : '精确搜索'"></el-input>

                    <el-select v-if="item.type == 'select' && (!item.options.data || item.options.data.length <= 100) &&!item.options.config.tree" v-model="item.value" :multiple="item.options.config.multiple" filterable placeholder="请选择" size="small" clearable style="width: 100%;">
                        <el-option v-for="(opt, index) in item.options.data" :key="opt[item.options.config.value]" :label="opt[item.options.config.label]" :value="opt[item.options.config.value]">
                        </el-option>
                    </el-select>
                    <el-select v-if="item.type == 'select' && item.options.data && item.options.data.length > 100 &&!item.options.config.tree" v-model="item.value" :multiple="item.options.config.multiple" filterable placeholder="请输入下拉选择" size="small" clearable style="width: 100%;" ref="remoteSelect" remote @focus="curr_prop = prop" :reserve-keyword="true" :loading="loading" :remote-method="filterSelect" @change="changeRemote">
                        <el-option v-for="(opt, index) in temp_options[prop]" :key="opt[item.options.config.value]" :label="opt[item.options.config.label]" :value="opt[item.options.config.value]">
                        </el-option>
                    </el-select>

                    <el-select v-if="item.type == 'select' &&item.options.config.tree" v-model="item.value" :multiple="item.options.config.multiple" filterable placeholder="请选择" size="small" clearable collapse-tags @remove-tag="removeTag" style="width: 100%;">
                        <el-option v-for="opt in item.options.data" :key="opt[item.options.config.value]" :label="opt[item.options.config.label]" :value="opt[item.options.config.value]" style="display: none;">
                        </el-option>
                        <el-tree :ref="item.treeName" :data="item.options.data" :props="defaultProps" :node-key="item.options.config.nodeKey" show-checkbox @check-change="handleCheckChange(item)"></el-tree>
                    </el-select>

                    <template v-if="item.type == 'date'">
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="item.value.start" style="width: 100%;" size="small" clearable value-format="yyyy-MM-dd" placement="bottom-start">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="2" style="text-align: center;">-</el-col>
                        <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-date-picker type="date" placeholder="选择日期" v-model="item.value.end" style="width: 100%;" size="small" clearable value-format="yyyy-MM-dd" placement="bottom-start">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </template>

                    <template v-if="item.type == 'number'">
                        <el-col :span="11">
                            <el-input type="number" v-model="item.value.start" size="small" clearable style="width: 100%;"></el-input>
                        </el-col>
                        <el-col class="line" :span="2" style="text-align: center;">-</el-col>
                        <el-col :span="11">
                            <el-input type="number" v-model="item.value.end" size="small" clearable style="width: 100%;">
                            </el-input>
                        </el-col>
                    </template>

                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
/* conditions: {
        // 输入过滤框模糊搜索
        user_name: {
            type: 'like', // like, select, date, number, input
            field: 'user_name', // 对应的后端查询字段名，可加表前缀，如：a.username
            title: '用户名', // 字段中文名，标签名
            value: ''        // 条件项值
        },
        // 下拉选择
        status: {
            type: 'select',
            field: 'status',
            title: '状态',
            value: '',
            // 下拉选择框的下拉数据集配置
            options: {
                config: {
                    label: 'label', // 下拉选项显示字段
                    value: 'value', // 下拉选择值字段
                    multiple: false // 是否为多选
                },
                data: [{}] // 下拉数据集
            }
        },
        // 日期区间过滤
        birthday: {
            type: 'date',
            field: 'birthday',
            title: '出生日期',
            value: {
                start: '', // 起始日期
                end: ''    // 截止日期
            }
        },
        // 数值区间过滤
        age: {
            type: 'number',
            field: 'age',
            title: '年龄',
            value: {
                start: '',
                end: ''
            }
        }
    } */

export default {
    name: "FilterFormBox",
    props: {
        // 用来创建条件项表单的数组
        dataset: {
            type: Object,
            default: () => {
                return {};
            },
        },
        label_width: {
            type: String,
            default: "75px",
        },
    },
    data() {
        return {
            //dataset: {}
            temp_options: {},
            curr_prop: "",
            loading: false,
            defaultProps: {
                children: "children",
                label: "title",
            },
        };
    },
    beforeDestroy() {
        this.$EventBus.$off("resetTree");
    },
    methods: {
        filterSelect(query) {
            if (query !== "") {
                this.loading = true;

                setTimeout(() => {
                    let listData =
                        this.dataset[this.curr_prop].options.data || [];
                    let labelName =
                        this.dataset[this.curr_prop].options.config.label;
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
                }, 0);
                this.loading = false;
            } else {
                this.$set(this.temp_options, this.curr_prop, []);
            }
        },
        changeRemote() {
            let arr = this.$refs.remoteSelect;
            console.log("remoteSelect", arr);
            arr.forEach((item) => {
                item.query = "";
            });
        },
        handleCheckChange(item) {
            let selectNodes = this.$refs[item.treeName][0].getCheckedNodes();
            console.log("selectNodes", selectNodes);
            let checkNodes = [];
            selectNodes.forEach((node) => {
                if (node.end || node.is_end == 1) {
                    checkNodes.push(node.title);
                }
            });
            item.value = checkNodes;
        },
        removeTag(data) {
            console.log("removetag", data);
        },
        treeChange(item) {
            console.log(item, "item");
            console.log("treename", item.treeName);

            this.$EventBus.$on("resetTree", (item) => {
                console.log("treename222", item.treeName);
                this.$refs[item.treeName][0].setCheckedKeys([]);
            });
        },
        handleReset(item) {
            this.$nextTick(() => {
                this.$refs[item.treeName][0].setCheckedKeys([]);
            });
        },
    },
    watch: {
        dataset: {
            handler(newVal) {},
            deep: true,
            immediate: true,
        },
    },
};
</script>

<style scoped lang="scss">
>>> {
    .vxe-input--prefix,
    .vxe-input--suffix,
    .vxe-input--extra-suffix {
        top: 4px;
    }
}
</style>
