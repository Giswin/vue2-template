<style scoped lang="scss">
.annotation {
    position: absolute;
    background-color: red;
    right: 0;
    top: 0;
    width: 7px;
    height: 7px;
    border-radius: 0px 0px 0px 8px;
}
.delete {
    text-decoration: line-through 2px;
    text-decoration-color: red;
}
.new {
    background-color: #73e873;
}
</style>

<template>
    <div style="position: relative; height: 100%; width: 100%;" :title="title" :class="{'delete':this.changeState == 'delete'}">
        <div class="content" style="padding: 3px 8px 3px 3px;height: 100%; width: 100%; box-sizing: border-box;">
            <slot v-bind:content="content">
                {{content}}
            </slot>
        </div>
        <!-- 如果是edit变更状态，就存在批注 -->
        <div v-if="changeState == 'change'" class="annotation"></div>
    </div>
</template>

<script>
function showContent(text) {
    return text;
}

export default {
    name: "content_change_box",
    props: {
        field: String, // 显示的字段属性名称
        new: Object, // 当前对象数据
        old: Object, // 上一版本的对象数据

        formatMethod: {
            type: Function,
            default: showContent,
        }, // 显示内容格式化处理方法
    },
    data() {
        return {};
    },
    computed: {
        title() {
            return this.changeState == "change"
                ? "上一版本值为：" + (this.old_content || "空")
                : "";
        },
        content() {
            if (!this.new || this.new == {}) {
                return this.formatMethod(this.old[this.field] || "");
            } else {
                return this.formatMethod(this.new[this.field] || "");
            }
        },
        old_content() {
            if (!this.old || this.old == {}) {
                return null;
            } else {
                return this.formatMethod(this.old[this.field] || "");
            }
        },
        // 当前对象处于的变更状态值
        changeState() {
            if (!this.new || this.new == {}) {
                return "delete";
            } else if (!this.old || this.old == {}) {
                return "new";
            } else if (this.new[this.field] != this.old[this.field]) {
                return "change";
            } else {
                return "none";
            }
        },
    },
    created() {},
    methods: {},
};
</script>
