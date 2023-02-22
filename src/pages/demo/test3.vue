<template>
    <div class="wrapper" :style="{'left':$store.state.css.navWidth + 'px'}">
        <div class="roles-container">
            <!-- <div class="list-sort-right">
                <div class="tabimg">
                    <ul>
                        <li :class="{ show: tabimg == 0 }" @click="tabimg = 0">
                            <i class="el-icon-picture"></i>
                        </li>
                        <li :class="{ show: tabimg == 1 }" @click="tabimg = 1">
                            <i class="el-icon-tickets"></i>
                        </li>
                    </ul>
                </div>
            </div> -->
            <div class="tabs-list-body tabs-list-body-div">

                <div class="div of">
                    <div class="list-img">
                        <ul>
                            <li v-for="(item,index) in dataList" :key="index">
                                <div class="img-main">
                                    <div class="img-box">
                                        <img src="" alt="">
                                        <div class="hover-box">

                                            <div>编辑</div>
                                            <div>复制</div>
                                            <div>删除</div>

                                        </div>
                                    </div>
                                    <div class="label-box">
                                        <div class="text"> <span class="title">货号:</span><span>{{item.gd_num}}</span></div>
                                        <div class="text"> <span class="title">品名:</span><span>{{item.gd_name}}</span></div>
                                        <div class="text"> <span class="title">业务:</span><span>{{item.sales}}</span></div>

                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="list-bottom"></div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            tabimg: 0,
            dataList: [
                {
                    gd_num: "125652 - 1",
                    gd_name: "桌子",
                    sales: "盛天10部 张姝姝",
                },
                {
                    gd_num: " 125652 - 1",
                    gd_name: "桌子",
                    sales: "盛天10部 张姝姝",
                },
                {
                    gd_num: "125652 - 1",
                    gd_name: "桌子",
                    sales: "盛天10部 张姝姝",
                },
                {
                    gd_num: "125652 - 1",
                    gd_name: "桌子",
                    sales: "盛天10部 张姝姝",
                },
                {
                    gd_num: "125652 - 1",
                    gd_name: "桌子",
                    sales: "盛天10部 张姝姝",
                },
                {
                    gd_num: "125652 - 1",
                    gd_name: "桌子",
                    sales: "盛天10部 张姝姝",
                },
                {
                    gd_num: "125652 - 1",
                    gd_name: "桌子",
                    sales: "盛天10部 张姝姝",
                },
                {
                    gd_num: "125652 - 1",
                    gd_name: "桌子",
                    sales: "盛天10部 张姝姝",
                },
                {
                    gd_num: "125652 - 1",
                    gd_name: "桌子",
                    sales: "盛天10部 张姝姝",
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.list-img {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    ul {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        height: auto;
        li {
            margin-bottom: 15px;
            box-sizing: border-box;
            padding: 0 8px;
            .img-main {
                width: 100%;
                box-sizing: border-box;
                border: 1px solid #ddd;
                .img-box {
                    position: relative;
                    width: 100%;
                    height: 220px;
                    background-color: #fcff66;
                    .hover-box {
                        display: none;
                    }
                    &:hover {
                        .hover-box {
                            cursor: pointer;
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            height: 60px;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            background: $primary-color;
                            opacity: 0.8;
                            color: #fff;
                            font-size: 16px;
                        }
                    }
                }
                .label-box {
                    padding: 10px;
                    .text {
                        display: flex;
                        flex-wrap: nowrap;
                        padding: 3px 0;
                        span {
                            display: block;
                            padding: 0 2px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .title {
                            width: 42px;
                        }
                    }
                }
            }
            .img-main:hover {
                border: 1px solid $primary-color;
            }
        }
    }
}

.list-img {
    ul {
        @media screen and(min-width: 1700px) {
            li {
                width: 12.5%;
            }
        }
        @media screen and (min-width: 1201px) and(max-width:1699px) {
            li {
                width: 16.666667%;
            }
        }
        @media screen and (min-width: 992px) and(max-width:1200px) {
            li {
                width: 20%;
            }
        }

        @media screen and (min-width: 768px) and (max-width: 991px) {
            li {
                width: 33.33333333%;
            }
        }
        @media screen and (min-width: 576px) and (max-width: 767px) {
            li {
                width: 50%;
            }
        }
    }
}
</style>