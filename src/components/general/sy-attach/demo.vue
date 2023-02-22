<template>
    <div class="wrap">

        <sy-attach :mode="mode" :object_name="object_name" :object_keyid="object_keyid" :attach_class="attach_class"></sy-attach>

    </div>

</template>

<script>
import syAttach from "@/components/general/sy-attach/index.vue";

export default {
    components: {
        syAttach,
    },
    data() {
        return {
            mode: 1,
            object_name: "bd_person",
            object_keyid: "P000010",
            attach_class: ["员工合同", "员工照片"],
        };
    },
};
</script>

<style lang="scss" scoped>
</style>
