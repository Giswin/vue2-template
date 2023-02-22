<template>
    <div>
        <el-button size="small" @click="drawer = true">筛选</el-button>
        <!-- <el-button size="small" @click="clearItems">重置</el-button> -->
        <template v-if="s_view_type == 1">
            <el-drawer :visible.sync="drawer" @close="close" :append-to-body="true" size="450px">
                <template v-slot:title>
                    <div class="title">高级筛选条件</div>
                </template>
                <div style="padding-right: 20px; padding-bottom: 70px;">
                    <FilterFormBox :dataset="dataset" @on-submit="submitForm" @on-reset="resetForm" :label_width="label_width"></FilterFormBox>

                    <div class="drawer-bottom">
                        <ul>
                            <li>
                                <el-button type="primary" @click="submitForm" size="small" style="width: 100%;">确认</el-button>
                            </li>
                            <li>
                                <el-button @click="resetForm" size="small" style="width: 100%;">重置</el-button>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-drawer>
        </template>
        <template v-if="s_view_type == 2">
            <vxe-modal title="筛选条件设置" :value="drawer" width="500" show-footer :mask-closable="false" @close="close">
                <template #default>
                    <FilterFormBox :dataset="dataset" @on-submit="submitForm" @on-reset="resetForm" :label_width="label_width" style="padding-top: 20px; padding-right: 20px;"></FilterFormBox>
                </template>
                <template v-slot:footer>
                    <div class="m-r" style="padding-right: 20px;padding-bottom: 10px;">
                        <ul>
                            <li>
                                <el-button type="primary" @click="submitForm" size="small" style="width: 80px;float: left;">确认</el-button>
                                <el-button @click="resetForm" size="small" style="width: 80px;float: left;">重置</el-button>
                            </li>
                        </ul>
                    </div>
                </template>
            </vxe-modal>
        </template>
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

import FilterFormBox from "./lib/filter-form-box.vue";
export default {
    name: "FilterForm",
    components: {
        FilterFormBox,
    },
    props: {
        // 用来创建条件项表单的数组
        conditions: {
            type: Object,
            default: () => {
                return {};
            },
        },
        label_width: {
            type: String,
            default: "75px",
        },
        // 表单显示方式：1-右边抽屉层，2-弹出模态框层
        view_type: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            drawer: false,
            dataset: {},
            s_view_type: 0,
            maxShowDialog: 8,
        };
    },
    mounted() {
        // 如果父组件指定了显示方式，取父组件，否则根据条件项个数判断来显示，大于 7 个条件项使用右边抽屉层展现
        if (this.view_type > 0) {
            this.s_view_type = this.view_type;
        } else {
            this.s_view_type =
                Object.keys(this.conditions).length > this.maxShowDialog
                    ? 1
                    : 2;
        }
    },
    watch: {
        conditions: {
            handler(newVal) {
                this.dataset = this.$general.deepClone(newVal);
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        close() {
            this.drawer = false;
            this.dataset = this.$general.deepClone(this.conditions);
        },
        // 确定按钮事件
        submitForm() {
            // 将表单数据回填到父组件变量中
            this.$XEUtils.objectEach(this.dataset, (item, key) => {
                this.conditions[key].value = item.value;
            });
            // 触发查询事件
            this.query();
            // 关闭筛选层
            this.drawer = false;
        },

        // 重置查询
        resetForm() {
            this.$XEUtils.objectEach(this.dataset, (item, key) => {
                if (item.type == "input" || item.type == "like") {
                    item.value = "";
                } else if (item.type == "select") {
                    item.value = item.options.config.multiple ? [] : "";
                } else if (item.type == "date" || item.type == "number") {
                    item.value = {
                        start: "",
                        end: "",
                    };
                }
            });
            this.$emit("reset");
        },

        // 清除某个字段的条件项当前值，清除的是父组件传入的属性变量，因为这个方法是给父组件里调用的
        clearItem(field) {
            this.$XEUtils.objectEach(this.conditions, (item, key) => {
                if (item.field == field) {
                    if (item.type == "input" || item.type == "like") {
                        item.value = "";
                    } else if (item.type == "select") {
                        item.value = item.options.config.multiple ? [] : "";
                    } else if (item.type == "date" || item.type == "number") {
                        item.value = {
                            start: "",
                            end: "",
                        };
                    }
                }
            });

            // 触发查询事件
            this.query();
        },

        // 清除所有的条件项当前值，清除后重新执行查询搜索
        clearItems() {
            this.$XEUtils.objectEach(this.conditions, (item, key) => {
                if (item.type == "input" || item.type == "like") {
                    item.value = "";
                } else if (item.type == "select") {
                    item.value = item.options.config.multiple ? [] : "";
                } else if (item.type == "date" || item.type == "number") {
                    item.value = {
                        start: "",
                        end: "",
                    };
                }
            });

            // 触发查询事件
            this.query();
        },

        // 查询事件
        query() {
            // 先获取到有效值的条件项
            let consArray = this.getSelectConditions() || [];

            // 然后再处理下，options的数据就不要带上了，因为要提交到服务端
            let consObject = {};
            this.$XEUtils.arrayEach(consArray, (item, index) => {
                consObject[item.key] = item;
            });

            // 回调父组件的查询方法
            this.$emit("search", { consArray, consObject });
        },

        // 获取用户已设置的条件项值 (Array)， 这个方法是给父组件里调用的，返回的数据用来给filter-tag组件显示条件项标签值显示用
        getSelectConditions() {
            const rtn = [];
            this.$XEUtils.objectEach(this.conditions, (cons, key) => {
                if (
                    ((cons.type == "input" || cons.type == "like") &&
                        cons.value) ||
                    ((cons.type == "date" || cons.type == "number") &&
                        (cons.value.start || cons.value.end))
                ) {
                    rtn.push({
                        key: key,
                        field: cons.field,
                        title: cons.title, // 字段中文
                        value: cons.value,
                        type: cons.type,
                    });
                } else if (cons.type == "select" && cons.value) {
                    if (!(Array.isArray(cons.value) && cons.value.length < 1)) {
                        rtn.push({
                            key: key,
                            field: cons.field,
                            title: cons.title, // 字段中文
                            value: cons.value, // 字段值
                            label:
                                cons.options.config.label ==
                                cons.options.config.value
                                    ? cons.value
                                    : this.getLabelByValue(cons),
                            type: cons.type,
                        });
                    }
                }
            });
            return rtn;
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
                    this.$XEUtils.pluck(aitems, tag.options.config.label) || []
                );
            } // 单选
            else {
                let aitem = this.$XEUtils.find(
                    tag.options.data,
                    (item) => item[tag.options.config.value] == tag.value
                );
                return aitem[tag.options.config.label] || "";
            }
        },
    },
};
</script>

<style scoped lang="scss">
.drawer-body {
    padding-right: 10px;
}
>>> {
    .vxe-input--prefix,
    .vxe-input--suffix,
    .vxe-input--extra-suffix {
        top: 4px;
    }
}
.drawer-bottom {
    position: absolute;
    left: 0;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    ul {
        display: flex;
        justify-content: space-between;
        width: 100%;

        li {
            width: 50%;
            margin: 0 15px;
        }
    }
}

.title {
    font-size: 16px;
    font-weight: 600;
    padding-left: 15px;
}
</style>
