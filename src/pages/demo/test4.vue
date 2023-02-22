<template>
    <div>
        <order-edit :show.sync="showModal"></order-edit>
    </div>
</template>

<script>
import orderEdit from "@/pages/order/order_edit.vue";
export default {
    components: {
        orderEdit,
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