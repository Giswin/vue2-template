<template>
    <div class="editor-wrap">
        <div style="border: 1px solid #ccc;">
            <!-- 工具栏 -->
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" />
            <!-- 编辑器 -->
            <Editor :defaultConfig="editorConfig" v-model="html" @onChange="onChange" @onCreated="onCreated" />

        </div>
        <!-- <div style="border: 1px solid #ccc; margin:20px 20px 0 200px">
            <textarea v-model="html" readonly style="width: 100%; height: 200px; outline: none"></textarea>
        </div> -->
    </div>
</template>
  
  <script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default {
    name: "MyEditor",
    components: { Editor, Toolbar },
    props: {
        htmlData: {
            type: String,
            default: "",
        },
        editBasicInfo:true,
    },
    data() {
        return {
            editor: null,
            html: "",
            toolbarConfig: {
                // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
                // excludeKeys: [ /* 隐藏哪些菜单 */ ],
                menuFixed: true,
            },
            editorConfig: {
                placeholder: "请输入内容...",
                // autoFocus: false,
                scroll: true,

                // 所有的菜单配置，都要在 MENU_CONF 属性下
                MENU_CONF: {},
            },
            mode: "default",
        };
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
        },
        onChange(editor) {
            // console.log("onChange", editor.getHtml()); // onChange 时获取编辑器最新内容
            let htmlContent = editor.getHtml();
            let content = editor
            this.$emit("change", htmlContent,content);
        },
    },
    created() {
        this.html = this.htmlData;
        
    },
    mounted() {
        // 模拟 ajax 请求，异步渲染编辑器
        // setTimeout(() => {
        //     this.html = "<p>Ajax 异步设置内容 HTML</p>";
        // }, 1500);
    },
    beforeDestroy() {
        const editor = this.editor;
        if (editor == null) return;
        editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
    },
    watch: {
        htmlData: {
            handler(newVal, oldVal) {
                this.html = newVal;
            },
            
        },
        editBasicInfo: {
            handler(newVal, oldVal) {
                this.editor.disable()
            },
            
        },

    },
};
</script>
  
<style src="@wangeditor/editor/dist/css/style.css"></style>
