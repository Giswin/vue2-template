<template>
    <vxe-modal title="装柜类型" v-model="show" class-name="vertical-center-modal" height="340" resize :showFooter="true" :mask-closable="false" @close="closeLoad" width="330">
        <div>
            <div class="model-bottom-body" style="top:8px;">
                <vxe-table ref="xhTable" :data="loadList" class="vxe-table-scrollbar" size="small" border resizable auto-resize :mouse-config="{ selected: true }" :edit-config="{trigger: 'click', mode: 'cell'}" :keyboard-config="{
                          isArrow: true,
                          isDel: false,
                          isEnter: true,
                          isTab: true,
                          isEdit: true,
                          isChecked: true,
                        }">
                    <vxe-table-column field="type" title="集装箱类型" header-align="center"></vxe-table-column>
                    <vxe-table-column field="num" title="数量" header-align="center" align="right" width="100" :edit-render="{autofocus:'.el-input__inner',enabled:!isLCL}">
                        <template #edit="{row}">
                            <el-input v-model="row.num" size="small" clearable :disabled="isLCL"></el-input>
                        </template>
                    </vxe-table-column>
                </vxe-table>
                <el-checkbox v-model="isLCL" @change="changeLCL">LCL</el-checkbox>
            </div>
        </div>

        <div slot="footer">
            <div class="m-r">
                <el-button size="mini" @click="save">确定</el-button>
                <el-button size="mini" @click="closeLoad">返回</el-button>
            </div>
        </div>
    </vxe-modal>
</template>

<script>
export default {
    props: {
        loadType: {
            type: Array,
        },
        loadArr: {
            type: Array,
        },
    },
    data() {
        return {
            show: true,
            loadList: [],
            isLCL: false,
        };
    },
    created() {
        console.log("装柜类型", this.loadType);
        this.getLoadList();
    },
    methods: {
        getLoadList() {
            this.loadType.forEach((item) => {
                if (item.dic_name !== "LCL") {
                    let obj = {
                        type: "",
                        num: 0,
                    };
                    obj.type = item.dic_name;
                    this.loadList.push(obj);
                }
            });
            if (this.loadArr) {
                this.loadArr.forEach((item) => {
                    if (item.type == "LCL") {
                        this.isLCL = true;
                        return;
                    }
                    this.loadList.forEach((data) => {
                        if (item.type == data.type) {
                            data.num = item.num;
                        }
                    });
                });
            }
        },

        changeLCL() {},
        closeLoad() {
            this.show = false;
            this.$emit("closeLoad");
        },
        save() {
            let loadSave = [];
            if (this.isLCL) {
                let obj = {
                    type: "LCL",
                    num: 1,
                };

                loadSave.push(obj);
            } else {
                this.loadList.forEach((item) => {
                    if (Number(item.num) !== 0) {
                        item.num = Number(item.num);
                        loadSave.push(item);
                    }
                });
            }

            this.$emit("afterSave", loadSave);
            this.closeLoad();
        },
    },
};
</script>

<style lang="scss" scoped>
</style>

