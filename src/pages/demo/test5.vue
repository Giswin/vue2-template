<template>
    <div>
        <cost-edit :show.sync="showModal"></cost-edit>
    </div>
</template>

<script>
import costEdit from "@/pages/order/cost_edit.vue";
export default {
    components: {
        costEdit,
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