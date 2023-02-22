<template>
    <div class="wrapper" :style="{'left':$store.state.css.navWidth + 'px'}">
        <div class="roles-container">
            <div class="lis-tabs">
                <div class="tabs">
                    <div class="tabs-col" :class="{ show: selectTab == 1 }" @click="selectTab = 1;query()">{{$t('goodsTabs[0]')}}</div>
                    <div class="tabs-col" :class="{ show: selectTab == 2 }" @click="selectTab = 2;query()">{{$t('goodsTabs[1]')}}</div>

                    <div class="tabs-right">
                        <div class="tabs-search">
                            <div class="m-l">
                                <el-input :placeholder="$t('goodsSerch')" v-model="condition.keyword" @keyup.enter.native="query" clearable class="input-with-select" style="width:350px;" size="small">
                                    <el-button slot="append" icon="el-icon-search" @click="query"></el-button>
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="listform">
                <div class="form-body" style="margin-right:15px;">
                    <div class="tags" style="margin-top: 13px;">
                        <div class="m-l" style="margin: 0 10px;">{{$t('filterCondition')}}:</div>
                        <div class="m-l">
                            <filter-tag :tags="formTags" @remove-tag="closeTag"></filter-tag>
                        </div>
                    </div>
                    <div class="form-button">
                        <div class="m-l" style="margin-left: 5px;">
                            <filter-form ref="filterForm" :conditions="formConditions" label_width="110px" :view_type="view_type" @search="filterFormConfirm"></filter-form>
                        </div>
                        <div class="m-l" style="margin-left: 5px;">
                            <el-button size="small" @click="closeFilter">{{$t('clearCondition')}}</el-button>
                        </div>
                        <div class="m-l" style="margin-left: 5px;">
                            <el-button size="small" type="primary" @click="handleCreate(0)">{{$t('new')}}</el-button>
                        </div>
                        <!-- <div class="tabimg">
                            <ul>
                                <li :class="{ show: tabimg == 0 }" @click="tabimg = 0">
                                    <i class="el-icon-picture-outline"></i>
                                </li>
                                <li :class="{ show: tabimg == 1 }" @click="tabimg = 1">
                                    <i class="el-icon-tickets"></i>
                                </li>
                            </ul>
                        </div> -->

                    </div>
                </div>
            </div>
            <div class="list-sort">
                <div class="f-sort">
                    <ul>
                        <li :class="{ show: sort == 'goods_create_time' }">
                            <div @click="sortArrow('goods_create_time')">
                                <span>{{$t('createTime')}}</span>
                                <em>
                                    <i class="fa fa-long-arrow-down" v-show="arrow"></i>
                                    <i class="fa fa-long-arrow-up" v-show="!arrow"></i>
                                </em>
                            </div>
                        </li>

                        <li :class="{ show: sort == 'goods_article_number' }">
                            <div @click="sortArrow('goods_article_number')">
                                <span>{{$t('goodsNo')}}</span>
                                <em>
                                    <i class="fa fa-long-arrow-down" v-show="arrow"></i>
                                    <i class="fa fa-long-arrow-up" v-show="!arrow"></i>
                                </em>
                            </div>
                        </li>
                        <div class="clear"></div>
                    </ul>
                </div>
                <div class="list-sort-right">
                    <div class="tabimg">
                        <ul>
                            <li :class="{ show: tabimg == 0 }" @click="tabimg = 0">
                                <i class="el-icon-picture-outline"></i>
                            </li>
                            <li :class="{ show: tabimg == 1 }" @click="tabimg = 1">
                                <i class="el-icon-tickets"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <div v-show="tabimg==0">
                    <div class="tabs-list-body tabs-list-border">
                        <div class="div of">
                            <div class="list-img">
                                <ul>
                                    <li v-for="(item,index) in dataList1" :key="index">
                                        <div class="img-main">
                                            <div class="img-box">
                                                <!-- <img :src="item.goods_pic_url" alt=""> -->
                                                <el-image :src="item.goods_pic_url" :preview-src-list="[item.goods_pic_url]">
                                                </el-image>
                                                <div class="hover-box">

                                                    <div @click.stop="handleToEdit(item.goods_id)">{{$t('edit')}}</div>
                                                    <div @click.stop="copyGoods(item.goods_id)">{{$t('copy')}}</div>
                                                    <div @click.stop="delGoods(item.goods_id)">{{$t('delete')}}</div>

                                                </div>
                                            </div>
                                            <div class="label-box">
                                                <div class="text"> <span class="title">{{$t('goodsNo')}}:</span><span>{{item.goods_article_number}}</span></div>
                                                <!-- <div class="text"> <span class="title">品名:</span><span :title="item.goods_name">{{item.goods_name}}</span></div> -->
                                                <!-- <div class="text"> <span class="title">业务:</span><span :title="`${item.goods_dep_name}-${item.goods_salesman_name}`">{{item.goods_dep_name}}-{{item.goods_salesman_name}}</span></div> -->

                                                <div class="text"><span class="title">{{$t('goodsName')}}:</span>
                                                    <el-tooltip class="item" effect="dark" :content="item.goods_name" placement="right-end">
                                                        <span>{{item.goods_name}}</span>
                                                    </el-tooltip>
                                                </div>
                                                <div class="text"><span class="title">{{$t('customer')}}:</span>
                                                    <el-tooltip class="item" effect="dark" :content="item.goods_cus_name" placement="right-end">
                                                        <span>{{item.goods_cus_name}}</span>
                                                    </el-tooltip>
                                                </div>
                                                <div class="text"><span class="title">{{$t('salesman')}}:</span>
                                                    <el-tooltip class="item" effect="dark" :content="`${item.goods_dep_name}-${item.goods_salesman_name}`" placement="right-end">
                                                        <span>{{item.goods_dep_name}}-{{item.goods_salesman_name}}</span>
                                                    </el-tooltip>
                                                </div>

                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="tabimg==1">
                    <div class="tabs-list-body tabs-list-body-table">
                        <div class="table">
                            <vxe-table ref="dataList1" border :data="dataList1" resizable size="small" auto-resize height="100%" :column-config="{minWidth:100}" class="mytable-scrollbar" show-overflow highlight-current-row highlight-hover-row>
                                <vxe-table-column type="seq" :title="$t('S/N')" width="40" align="center"></vxe-table-column>
                                <vxe-table-column field="goods_dep_name" :title="$t('department')" header-align="center" align="left"></vxe-table-column>
                                <vxe-table-column field="goods_salesman_name" :title="$t('salesman')" header-align="center" align="left"></vxe-table-column>
                                <vxe-table-column field="goods_category_name" :title="$t('category')" header-align="center" align="left"></vxe-table-column>
                                <vxe-table-column field="goods_article_number" :title="$t('goodsNo')" header-align="center" align="left"></vxe-table-column>
                                <vxe-table-column field="goods_name" :title="$t('cnGoodsName')" header-align="center" align="left"></vxe-table-column>
                                <vxe-table-column field="goods_name_en" :title="$t('enGoodsName')" header-align="center" align="left"></vxe-table-column>

                                <!-- <vxe-table-column field="goods_sale_spec" title="销售规格" header-align="center" align="left"></vxe-table-column>
                                <vxe-table-column field="goods_sale_unit" title="销售单位" header-align="center" align="left" width="68"></vxe-table-column> -->
                                <vxe-table-column field="goods_cus_name" :title="$t('customer')" header-align="center" align="left" width="200"></vxe-table-column>
                                <!-- <vxe-table-column field="goods_purchase_spec" title="采购规格" header-align="center" align="left"></vxe-table-column> -->
                                <vxe-table-column field="goods_create_time" :title="$t('createTime')" header-align="center" align="center" width="140"></vxe-table-column>

                                <vxe-table-column :title="$t('operation')" header-align="center" align="center">
                                    <template #default="{ row }">
                                        <el-dropdown>
                                            <el-button size="mini">
                                                {{$t('more')}}<i class="el-icon-arrow-down el-icon--right"></i>
                                            </el-button>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item @click.native="handleToEdit(row.goods_id)">{{$t('edit')}}</el-dropdown-item>
                                                <el-dropdown-item @click.native="delGoods(row.goods_id)">{{$t('delete')}}</el-dropdown-item>
                                                <el-dropdown-item @click.native="copyGoods(row.goods_id)">{{$t('copy')}}</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </template>
                                </vxe-table-column>
                            </vxe-table>
                        </div>

                    </div>
                </div>

                <div class="list-bottom">
                    <div class="m-r">
                        <vxe-pager background :current-page.sync="tablePages.cur_page" :page-size.sync="tablePages.page_count" :total="tablePages.total" @page-change="pageChange" :page-sizes="[10,20,50,100,500,1000,10000]">
                        </vxe-pager>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>

        </div>
        <goods-edit v-if="showEditModal" :goods_id="goods_id" :selectOptions="selectOptions" @closeGoodsEdit="handleClose" @closeIcon="handleCancle"></goods-edit>
        <!-- <goods-edit :show.sync="showEditModal" :goods_id.sync="goods_id" :edit_state="edit_state" @editCancle="handleCancle" @afterSave="afterSave" @close="handleClose"></goods-edit> -->
    </div>
</template>

<script>
import goodsEdit from "./goods_edit1.vue";
import ifsApi from "@/api/ifs";
import goodsApi from "@/api/cbs/goods.js";
import ebsApi from "@/api/gbs/ebs.js";
export default {
    components: {
        goodsEdit,
    },
    props:{
        languageVal:String
    },
    data() {
        return {
            selectTab: 1,
            tabimg: 0,
            condition: {
                page: 1,
                perPage: 20,
                columns: [],
                keyword: "",
                goods_state: 1,
            },
            dataList1: [],
            view_type: 1,
            formTags: [],
            allDep: [],
            category: [],
            sort: "goods_create_time",
            arrow: true,
            formConditions: {
                // 下拉选择
                goods_dep_name: {
                    type: "select",
                    field: "goods_dep_name",
                    title: this.$t('department'),
                    value: [],
                    treeName: "depTree",
                    // 下拉选择框的下拉数据集配置
                    options: {
                        config: {
                            label: "value", // 下拉选项显示字段
                            value: "value", // 下拉选择值字段
                            nodeKey: "dep_id",
                            multiple: true, // 是否为多选
                            tree: true,
                        },
                        data: [], // 下拉数据集
                    },
                },
                goods_category_name: {
                    type: "select",
                    field: "goods_category_name",
                    title: this.$t('category'),
                    value: [],
                    treeName: "categoryTree",
                    // 下拉选择框的下拉数据集配置
                    options: {
                        config: {
                            label: "value", // 下拉选项显示字段
                            value: "value", // 下拉选择值字段
                            nodeKey: "dic_code",
                            multiple: true, // 是否为多选
                            tree: true,
                        },
                        data: [], // 下拉数据集
                    },
                },
                // 日期区间过滤
                goods_create_time: {
                    type: "date",
                    field: "goods_create_time",
                    title: this.$t('createTime'),
                    value: {
                        start: "", // 起始日期
                        end: "", // 截止日期
                    },
                },
            },
            showEditModal: false,
            goods_id: 0,
            // 表格分页
            tablePages: {
                cur_page: 1, // 当前页
                page_count: 20, // 每页条数
                total: 0, // 总条数
            },
            selectOptions: {
                dep: [], //部门*
                sales: [], //业务员*
                allCus: [], // 客户*
                vender: [], //供应商
                JLDW: [], //计量单位
                category: [], //商品大类
            },
        };
    },
    created() {
        this.findList();
        this.getDep();
        this.getOptions();
        let clientWidth = document.body.clientWidth;
        console.log("clientWidth", clientWidth);
    },
    activated() {
        console.log("激活页面");
    },
    methods: {
        async getDep() {
            let list = await ifsApi.getList("", 2, 0);
            this.selectOptions.dep = Object.freeze(list.data); //部门
            this.formConditions.goods_dep_name.options.data = Object.freeze(
                list.data
            );
        },
        getOptions() {
            Promise.all([
                this.$dmBaseSet.personData(),
                this.$dmBaseSet.customerData(),
                //  this.$dmBaseSet.venderData(),
                ifsApi.dicData("TY_JLDW,CBM_GOODS_CATEGORY"),
            ]).then((res) => {
                this.selectOptions.sales = Object.freeze(res[0].list); //业务员
                this.selectOptions.allCus = Object.freeze(res[1]); //客户
                // this.selectOptions.vender = Object.freeze(res[2]); //供应商
                // this.selectOptions.JLDW = Object.freeze(
                //     res[3]["TY_JLDW"].children
                // ); //计量单位
                this.selectOptions.category = Object.freeze(
                    res[2]["CBM_GOODS_CATEGORY"].children
                ); //商品大类
                this.formConditions.goods_category_name.options.data =
                    Object.freeze(res[2]["CBM_GOODS_CATEGORY"].children);
            });
        },
        async getGoodsList() {
            let res = await goodsApi.getGoodsList(this.condition);
            this.dataList1 = Object.freeze(res.data.list);
            console.log("res", res);
            console.log("dataList1", this.dataList1);
        },
        findList() {
            if (this.selectTab == 1) {
                this.condition.goods_state = 1;
            } else if (this.selectTab == 2) {
                this.condition.goods_state = 2;
            }
            this.condition.page = this.tablePages.cur_page;
            this.condition.perPage = this.tablePages.page_count;

            let arrow = "";
            if (this.arrow) arrow = "desc";
            else arrow = "asc";
            this.condition.orderBy = this.sort + " " + arrow;
            goodsApi.getGoodsList(this.condition).then((res) => {
                if (res.code == 0) {
                    this.dataList1 = Object.freeze(res.data.list);
                    this.tablePages.cur_page = parseInt(res.data.page);
                    this.tablePages.total = parseInt(res.data.count);
                }
            });
        },

        query() {
            this.tablePages.cur_page = 1;
            this.findList();
        },
        sortArrow(sort) {
            console.log("1111");
            if (sort != this.sort) {
                this.arrow = true;
            } else {
                this.arrow = !this.arrow;
            }
            this.sort = sort;
            this.query();
        },

        handleCreate(id) {
            this.goods_id = id;

            this.showEditModal = true;
        },
        handleToEdit(goods_id) {
            this.goods_id = goods_id;

            this.showEditModal = true;
        },
        // 筛选表单确认回调方法
        filterFormConfirm({ consArray }) {
            console.log("consArray", consArray);
            // 获取已设置的条件项值来刷新筛选表单标签值
            this.formTags = consArray || [];
            this.showTag();
        },
        showTag() {
            this.condition.columns = [];
            this.formTags.forEach((item) => {
                let obj = {
                    type: "",
                    field: "",
                    value: null,
                };
                obj.type = item.type;
                obj.field = item.field;
                obj.value = item.value;
                this.condition.columns.push(obj);
            });
            this.query();
        },
        // 关闭筛选标签
        closeTag(tag) {
            this.$refs["filterForm"].clearItem(tag.field);
            this.showTag();
        },
        // 清除筛选条件
        closeFilter() {
            this.$refs.filterForm.clearItems();
        },
        // 数据分页切换
        pageChange({ currentPage, pageSize }) {
            this.tablePages.cur_page = currentPage;
            this.tablePages.page_count = pageSize;
            this.findList();
        },
        handleCancle() {
            this.showEditModal = false;
        },
        handleClose() {
            this.showEditModal = false;
            this.query();
        },
        afterSave() {
            this.query();
        },
        delGoods(goods_id) {
            this.$confirm(this.$t('goodsDelTips'), this.$t('tips'), {
                confirmButtonText: this.$t('confirm'),
                cancelButtonText: this.$t('cancel'),
                type: "warning",
            })
                .then(() => {
                    goodsApi.deleteGoodsInfo(goods_id).then((data) => {
                        console.log("delete", data);
                        if (data.code == 0) {
                            this.$message({
                                message: this.$t('goodsDelmsg'),
                                type: "success",
                            });
                            this.query();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: this.$t('delCancel'),
                    });
                });
        },
        copyGoods(goods_id) {
            this.$confirm(this.$t('goodsCopyTips'), this.$t('tips'), {
                confirmButtonText: this.$t('confirm'),
                cancelButtonText: this.$t('cancel'),
                type: "warning",
            })
                .then(() => {
                    goodsApi.copyGoods(goods_id).then((data) => {
                        if (data.code == 0) {
                            this.$message({
                                message: this.$t('goodsCopymsg'),
                                type: "success",
                            });
                            this.query();
                            let goods_id = data.data;
                            this.handleToEdit(goods_id);
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: this.$t('copyCancel'),
                    });
                });
        },
    },

    watch: {
        languageVal: {
            handler: function() {
                this.formConditions.goods_create_time.title=this.$t('createTime')
                this.formConditions.goods_dep_name.title=this.$t('department')
                this.formConditions.goods_category_name.title=this.$t('category')
            },
            deep: true
        }
  
    },
};
</script>

<style lang="scss" scoped>
.listform .form-button {
    top: -3px;
    right: 0px;
    display: flex;
    .tabimg {
        margin-left: 10px;
        ul {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            li {
                margin: 0;
                padding: 6px 10px;
                i {
                    font-size: 18px;
                }
            }
        }
    }
}
.tabs-list-border {
    top: 143px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
}
.tabs-list-body-table {
    top: 140px;
}

.list-img {
    width: 100%;
    box-sizing: border-box;
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
                    background-color: #ddd;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .el-image {
                        max-width: 100%;
                        max-height: 100%;
                        >>> .el-image__inner {
                            max-width: 100%;
                            max-height: 220px;
                        }
                    }
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
                            // padding: 0 2px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .title {
                            min-width: 42px;
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
        @media screen and (min-width: 1367px) and(max-width:1699px) {
            li {
                width: 16.666667%;
            }
        }
        @media screen and (min-width: 992px) and(max-width:1366px) {
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