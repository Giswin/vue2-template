<template>
    <div class="wrap">
        <table width="500" cellspacing="0" cellpadding="0" border="1">
            <tbody>
                <tr>
                    <th width="80">供应商</th>
                    <td width="220">
                        <contentChangeBox field="pun_ven_name_a" :old="main_old" :new="main_new"></contentChangeBox>
                    </td>

                </tr>
                <tr>
                    <th width="80">款号</th>
                    <td width="220">
                        <contentChangeBox field="odg_item_no" :old="main_old" :new="main_new"></contentChangeBox>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
import contentChangeBox from "./index.vue";
export default {
    components: {
        contentChangeBox,
    },
    data() {
        return {
            main_new: {
                odg_item_no: " M4270905",
                pun_ven_name_a: "上海竑润贸易有限公司",
            }, // 当前对象数据
            main_old: {
                odg_item_no: " M4270905",
                pun_ven_name_a: "上海竑润贸易",
            }, // 上一版本的对象数据
        };
    },
};
</script>

<style>
</style>