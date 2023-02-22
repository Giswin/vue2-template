<style lang="scss">
//特殊样式，而不通用请在这里写样式
.nav {
    position: fixed;
    top: 85px;
    left: 0px;
    width: 170px;
    bottom: 0px;
    background: #fff;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
    &::-webkit-scrollbar-track {
        background-color: #ffffff;
    } /*滚动条的轨道*/
    &::-webkit-scrollbar-thumb {
        background-color: #ddd;
    } /*滚动条里面的小方块，能向上向下移动*/
    &::-webkit-scrollbar-thumb:hover {
        background-color: #a8a8a8;
    }
    &::-webkit-scrollbar-thumb:active {
        background-color: #787878;
    }
    &::-webkit-scrollbar-corner {
        background-color: #ffffff;
    } /*边角，即两个滚动条的交汇处*/
    ul {
        li {
        }
    }
    .el-submenu__title {
        height: 50px;
        line-height: 50px;
        i {
            margin-right: 5px;
            color: #333;
        }
    }
    .el-menu-item {
        height: 50px;
        line-height: 50px;
        i {
            margin-right: 5px;
            color: #333;
        }
    }
    .el-submenu .el-menu-item {
        height: 50px;
        line-height: 50px;
    }
}
.nav1 {
    position: fixed;
    top: 85px;
    left: 0px;
    width: 65px;
    bottom: 0px;
    background: #fff;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
    }
    &::-webkit-scrollbar-track {
        background-color: #ffffff;
    } /*滚动条的轨道*/
    &::-webkit-scrollbar-thumb {
        background-color: #ddd;
    } /*滚动条里面的小方块，能向上向下移动*/
    &::-webkit-scrollbar-thumb:hover {
        background-color: #a8a8a8;
    }
    &::-webkit-scrollbar-thumb:active {
        background-color: #787878;
    }
    &::-webkit-scrollbar-corner {
        background-color: #ffffff;
    } /*边角，即两个滚动条的交汇处*/
    ul {
        li {
        }
    }
    .el-tooltip {
        text-align: center;
        color: #333;
    }
    .el-submenu__title {
        height: 50px;
        line-height: 50px;
        text-align: center;
        i {
            color: #333;
        }
    }
    .el-menu-item {
        height: 50px;
        line-height: 50px;
        i {
            color: #333;
        }
    }
    .el-submenu .el-menu-item {
        height: 50px;
        line-height: 50px;
        color: #333;
    }
}
</style>
<template>
    <div v-if="$route.meta.showNav">
        <div class="header-ioc">
            <syIcon type="dedent" v-show="downIcon" @click="md_menu" title="收起导航"></syIcon>
            <syIcon type="indent" v-show="!downIcon" @click="md_menu" title="展开导航"></syIcon>
        </div>
        <el-menu v-bind:class="{ nav: !showMenu ,nav1: showMenu}" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :collapse-transition="false">
            <template v-for="(item,index) in menu_list">
                <el-submenu :index="(index+1)+''" v-if="item.children" v-bind:key="item.name" v-show="!item.right || $store.state.rights.indexOf(item.right)>=0">
                    <template slot="title">
                        <i class="fa" :class="{[`${item.icon}`]: item.icon!=='' }"></i>
                        <span slot="title">{{item.title}}</span>
                    </template>
                    <el-menu-item v-for="(child,cindex) in item.children" v-bind:key="child.name" :index="(index+1)+'-' + cindex" @click="showPage(child.router,item.title,child.title, index, child.name)" v-show="!child.right || $store.state.rights.indexOf(child.right)>=0">{{child.title}}</el-menu-item>
                </el-submenu>
                <el-menu-item :index="(index+1)+''" v-else v-bind:key="item.name" v-show="!item.right || $store.state.rights.indexOf(item.right)>=0" @click="showPage(item.router,item.title,item.title, index, item.name)">
                    <i class="fa" :class="{[`${item.icon}`]: item.icon!=='' }"></i>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script>
import menu_list from "@/data/menu.js";
import syIcon from "@/components/general/sy-icon/sy-icon.vue";

var _self;

export default {
    name: "syNav",
    components: {
        syIcon,
    },
    data() {
        return {
            menu_list, // 菜单数据结构
            downIcon: true,
            showMenu: false,
            //current:-1,
            activeGName: [""], // 要展开的菜单组name
            activeGCName: "", // 要展开的菜单项name
            rights: [],
            isCollapse: false,
        };
    },
    created() {
        _self = this;
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        submenu(index) {
            this.$set(
                this.menu_list[index],
                "expland",
                this.menu_list[index].expland ? false : true
            );
        },
        md_menu(index) {
            this.downIcon = !this.downIcon;
            this.showMenu = !this.showMenu;
            this.isCollapse = !this.isCollapse;
            if (this.isCollapse == true) {
                this.$store.state.css.navWidth = 65;
            } else {
                this.$store.state.css.navWidth = 165;
            }
        },
        showPage: function (router, main_menu, sub_menu, index, menuName) {
            this.$emit("showPage", router, main_menu, sub_menu);

            if (this.showMenu == true) {
                for (let i = 0; i < this.menu_list.length; i++) {
                    this.$set(this.menu_list[i], "expland", false);
                }
            }
            this.$set(this.menu_list[index], "expland", true);
            this.activeGCName = menuName;
        },

        // 页面刷新时定位菜单位置
        posMenu: function (routerName) {
            if (routerName == "") return;
            let groupMenu = {};
            let childMenu = {};
            for (let i = 0; i < this.menu_list.length; i++) {
                if (this.menu_list[i].children) {
                    for (
                        let j = 0;
                        j < this.menu_list[i].children.length;
                        j++
                    ) {
                        if (
                            this.menu_list[i].children[j].router.name ==
                                routerName ||
                            this.menu_list[i].children[j].router == routerName
                        ) {
                            groupMenu = this.menu_list[i];
                            childMenu = this.menu_list[i].children[j];
                            break;
                        }
                    }
                } else {
                    // 如无子级菜单，将菜单组名称设置为空
                    if (
                        this.menu_list[i].router.name == routerName ||
                        this.menu_list[i].router == routerName
                    ) {
                        groupMenu = "";
                        childMenu = this.menu_list[i];
                        break;
                    }
                }

                if (groupMenu.length > 0) {
                    break;
                }
            }
            this.activeGName = [groupMenu.name || ""];
            this.activeGCName = childMenu.name || "";
            this.$store.state.menu_group_name = groupMenu.title || "";
            this.$store.state.active_menu_name = childMenu.title || "";

            this.$nextTick(() => {
                if (this.$refs.main_menu) {
                    this.$refs.main_menu.updateOpened();
                    this.$refs.main_menu.updateActiveName();
                }
            });
        },
    },
    mounted: function () {
        if (this.$store.state.hasLogin) {
            // 刷新页面时，根据路由的name == 菜单的router，定位到指定的菜单
            this.posMenu(this.$route.name);
        }
    },
    watch: {
        // 监听路由变化
        $route: function (to, from) {
            // 地址栏跳转路由时，根据路由的name == 菜单的router，定位到指定的菜单
            this.posMenu(to.name);
        },
    },
};
</script>

