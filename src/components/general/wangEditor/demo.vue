<template>
    <div id="app">
        <div class="editor-wrap">
            <WangEditor :htmlData="htmlData" @change="htmlChange"></WangEditor>
        </div>
    </div>

</template>

<script>
import WangEditor from "@/components/general/wangEditor/index.vue";
export default {
    components: { WangEditor },
    data() {
        return {
            htmlData: "<h>html传递内容</h>",
        };
    },
    methods: {
        htmlChange(data) {
            console.log("htmlChange", data);
        },
    },
};
</script>

<style scoped>
.editor-wrap {
    width: 100%;
}
</style>
