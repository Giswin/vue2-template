<template>
    <div>
		<div class="nav-click ">
		    <ul >
		        <li class="nav-click-body" v-for="(item,index) in openedPageRouters" :key="item.fullPath"
		            @contextmenu.prevent="showContextMenu($event, item, index)"
		            :title="item.meta.title + (item.query.flag || '')"
		            :class="{'nav-click-show':item.fullPath == $route.fullPath,'nav-click-default':!(item.fullPath == $route.fullPath)}">
		            <div class="nav-click-body-title hidden" @click="onClick(item)">
		                {{item.meta.title}} {{(item.query.flag || '')}}
		            </div>
		            <div v-if="index!=0" class="nav-click-body-close" @click="onClose(item)"
		                :class="{'nav-click-body-show':item.fullPath == $route.fullPath,'nav-click-body-default':!(item.fullPath == $route.fullPath)}">
		                ×</div>
		        </li>
		    </ul>
		    
		</div>
		<div v-show="contextMenuVisible" style="position: fixed; z-index: 4;"
		    :style="{ 'left': contextMenuLeft + 'px', 'top': contextMenuTop + 'px' }">
		    <ul class="__contextmenu">
		        <li>
		            <el-button type="text" @click="reloadRoute" size="mini">重新加载</el-button>
		        </li>
		        <li>
		            <el-button type="text" @click="closeOtherLeft" size="mini">关闭左边</el-button>
		        </li>
		        <li>
		            <el-button type="text" @click="closeOtherRight" size="mini">关闭右边</el-button>
		        </li>
		        <li>
		            <el-button type="text" @click="closeOther" size="mini">关闭其他</el-button>
		        </li>
		    </ul>
		</div>
	</div>
</template>
<script>
    export default {
        name: 'syPageTabs',
        props: {
            keepAliveComponentInstance: {}, //keep-alive控件实例对象
            blankRouteName: {
                type: String,
                default: "blank",
            }, //空白路由的name值
            firstPageRouter: Object, // 系统首页路由对象
        },
        watch: {
            //当路由变更时，执行打开页面的方法
            $route: {
                handler(v) {
                    this.openPage(v);
                },
                immediate: true,
            },
        },
        data() {
            return {
                openedPageRouters: [], //已打开的路由页面

                contextMenuVisible: false, //右键菜单是否显示
                contextMenuLeft: 0, //右键菜单显示位置
                contextMenuTop: 0, //右键菜单显示位置
                contextMenuTargetPageRoute: null, //右键所指向的菜单路由
            }
        },

        mounted() {
            //添加点击关闭右键菜单
            window.addEventListener("click", this.closeContextMenu);
        },
        destroyed() {
            window.removeEventListener("click", this.closeContextMenu);
        },
        methods: {
            //右键显示菜单
            showContextMenu(e, route, index) {
                if (index == 0) {
                    return
                }
                this.contextMenuTargetPageRoute = route;
                this.contextMenuLeft = e.screenX //e.layerX;
                this.contextMenuTop = e.clientY //e.layerY;
                this.contextMenuVisible = true;
            },
            //隐藏右键菜单
            closeContextMenu() {
                this.contextMenuVisible = false;
                this.contextMenuTargetPageRoute = null;
            },


            // 插入首页
            insertFirstPage(route) {
                if (this.firstPageRouter && route.path !== this.firstPageRouter.path) {
                    this.openedPageRouters.push(this.firstPageRouter)
                }
            },

            //打开页面
            openPage(route) {
                // 如果还没创建过一个标签页，先将首页添加标签
                if (this.openedPageRouters.length < 1) {
                    this.insertFirstPage(route);
                }

                if (route.name == this.blankRouteName) {
                    return;
                }
                // 检查该标签页是否已创建
                let isExist = this.openedPageRouters.some(
                    (item) => item.fullPath == route.fullPath
                );

                // 如果没创建，并且路径不等于根路径
                if (!isExist && route.fullPath !== "/") {
                    let openedPageRoute = this.openedPageRouters.find(
                        (item) => item.path == route.path // 注意这边找的不是全路径
                    );
                    //判断页面是否支持不同参数多开页面功能，如果不支持且已存在path值一样的页面路由，那就替换它
                    if (!route.meta.canMultipleOpen && openedPageRoute != null) {
                        this.delRouteCache(openedPageRoute.fullPath);
                        this.openedPageRouters.splice(this.openedPageRouters.indexOf(openedPageRoute), 1, route);
                    } else {
                        this.openedPageRouters.push(route);
                    }
                }
            },

            // 关闭所有的标签
            closeAllClick() {
                // 如果设置了系统首页标签，首页标签不能关掉
                if (this.firstPageRouter && this.openedPageRouters.length < 2) return;

                for (let i = 1; i < this.openedPageRouters.length; i++) {
                    this.delPageRoute(this.openedPageRouters[i]);
                }
                // 全部关闭后，路由跳到首页
                this.onClick(this.openedPageRouters[0]);
            },

            //点击页面标签卡时
            onClick(route) {
                if (route.fullPath !== this.$route.fullPath) {
                    this.$router.push(route.fullPath);
                }
            },
            //关闭页面标签时
            onClose(route) {
                let index = this.openedPageRouters.indexOf(route);
                this.delPageRoute(route);
                if (route.fullPath === this.$route.fullPath) {
                    //删除页面后，跳转到上一页面
                    this.$router.replace(
                        this.openedPageRouters[index == 0 ? 0 : index - 1]
                    );
                }
            },

            //删除页面
            delPageRoute(route) {
                let routeIndex = this.openedPageRouters.indexOf(route);
                if (routeIndex >= 0) {
                    this.openedPageRouters.splice(routeIndex, 1);
                }
                this.delRouteCache(route.fullPath);
            },

            //删除页面缓存
            delRouteCache(key) {
                let cache = this.keepAliveComponentInstance.cache;
                let keys = this.keepAliveComponentInstance.keys;
                for (let i = 0; i < keys.length; i++) {
                    if (keys[i] == key) {
                        keys.splice(i, 1);
                        if (cache[key] != null) {
                            cache[key].componentInstance.$destroy()
                            delete cache[key];
                        }
                        break;
                    }
                }
            },

            //关闭右边页面
            closeOtherRight() {
                let index = this.openedPageRouters.indexOf(
                    this.contextMenuTargetPageRoute
                );
                let currentIndex = this.getPageRouteIndex(this.$route.fullPath);
                for (let i = index + 1; i < this.openedPageRouters.length; i++) {
                    let r = this.openedPageRouters[i];
                    this.delPageRoute(r);
                    i--;
                }
                if (index < currentIndex) {
                    this.$router.replace(this.contextMenuTargetPageRoute);
                }
            },
            //关闭左边页面
            closeOtherLeft() {
                let index = this.openedPageRouters.indexOf(
                    this.contextMenuTargetPageRoute
                );
                let currentIndex = this.getPageRouteIndex(this.$route.fullPath);
                if (index > currentIndex) {
                    this.$router.replace(this.contextMenuTargetPageRoute);
                }
                let startIndex = this.firstPageRouter ? 1 : 0;
                for (let i = startIndex; i < index; i++) {
                    let r = this.openedPageRouters[i];
                    this.delPageRoute(r);
                    i--;
                    index--;
                }
            },
            //关闭其他页面
            closeOther() {
                let startIndex = this.firstPageRouter ? 1 : 0;
                for (let i = startIndex; i < this.openedPageRouters.length; i++) {
                    let r = this.openedPageRouters[i];
                    if (r !== this.contextMenuTargetPageRoute) {
                        this.delPageRoute(r);
                        i--;
                    }
                }
                if (this.contextMenuTargetPageRoute.fullPath != this.$route.fullPath) {
                    this.$router.replace(this.contextMenuTargetPageRoute);
                }
            },

            // 重载指定标签页
            reloadRoute() {
                // 先销毁缓存
                this.delRouteCache(this.contextMenuTargetPageRoute.fullPath);
                // 跳到空页面，再跳回原路由页面
                this.$router.replace({
                    name: this.blankRouteName
                }).then(() => {
                    this.$router.replace(this.contextMenuTargetPageRoute);
                });
            },

            //重载页面
            reload() {
                // 先找到当前路由标签对象
                let i = this.getPageRouteIndex(this.$route.fullPath);
                let curr_router = this.openedPageRouters[i];

                // 先销毁缓存
                this.delRouteCache(curr_router.fullPath);
                // 跳到空页面，再跳回原路由页面
                this.$router.replace({
                    name: this.blankRouteName
                }).then(() => {
                    this.$router.replace(curr_router);
                });
            },

            //根据路径获取索引
            getPageRouteIndex(fullPath) {
                for (let i = 0; i < this.openedPageRouters.length; i++) {
                    if (this.openedPageRouters[i].fullPath === fullPath) {
                        return i;
                    }
                }
            },
        }

    }
</script>

<style lang="scss">
    .__contextmenu {
        // width: 100px;
        margin: 0;
        border: 1px solid #e4e7ed;
        background: #fff;
        z-index: 3000;
        position: fixed;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 14px;
        color: #333;
        box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.1);

        li {
            margin: 0;
            padding: 0px 15px;
            display: block;

            &:hover {
                background: #f2f2f2;
                cursor: pointer;
            }

            button {
                color: #2c3e50;
            }
        }
    }
</style>
