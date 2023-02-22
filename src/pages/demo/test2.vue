<template>
    <div id="test">
        <goods-edit :show.sync="showModal"></goods-edit>
    </div>
</template>

<script>
import goodsEdit from "@/pages/goods/goods_edit.vue";
export default {
    components: {
        goodsEdit,
    },
    data() {
        return {
            showModal: true,
        };
    },
};
</script>

<style>
</style>

