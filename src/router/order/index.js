const order_list = () =>
    import(/* webpackChunkName: "order-index" */ "@/pages/order/order_list1.vue");
  
const order_detail = () => 
    import (/* webpackChunkName: "order-index" */ '@/pages/order/order_detail')

const process_detail = () => 
    import (/* webpackChunkName: "order-index" */ '@/pages/order/order_detail/process_detail.vue')

const purchase_detail = () => 
    import (/* webpackChunkName: "order-index" */ '@/pages/order/order_detail/purchase_detail.vue')
    
const order_approve_print = () => 
	import (/* webpackChunkName: "home-index" */ '@/pages/order/order_detail/order_approve_print.vue')

const order_purchase_contract_print = () => 
	import (/* webpackChunkName: "home-index" */ '@/pages/order/order_detail/order_purchase_contract_print.vue')

const order_purchase_contract_attach_print = () => 
	import (/* webpackChunkName: "home-index" */ '@/pages/order/order_detail/order_purchase_contract_attach_print.vue')

const order_process_contract_print = () => 
	import (/* webpackChunkName: "home-index" */ '@/pages/order/order_detail/order_process_contract_print.vue')

const order_process_contract_attach_print = () => 
	import (/* webpackChunkName: "home-index" */ '@/pages/order/order_detail/order_process_contract_attach_print.vue')

const order_process_contract_print_new = () => 
	import (/* webpackChunkName: "home-index" */ '@/pages/order/order_detail/order_process_contract_print_new.vue')

const order_process_contract_attach_print_new = () => 
	import (/* webpackChunkName: "home-index" */ '@/pages/order/order_detail/order_process_contract_attach_print_new.vue')

const order_ex_contract_print = () => 
	import (/* webpackChunkName: "home-index" */ '@/pages/order/order_detail/order_ex_contract_print.vue')

const order_ex_contract_attach_print = () => 
	import (/* webpackChunkName: "home-index" */ '@/pages/order/order_detail/order_ex_contract_attach_print.vue')

const order_ix_contract_print = () => 
	import (/* webpackChunkName: "home-index" */ '@/pages/order/order_detail/order_ix_contract_print.vue')

const order_ix_contract_attach_print = () => 
	import (/* webpackChunkName: "home-index" */ '@/pages/order/order_detail/order_ix_contract_attach_print.vue')

const routes = [
    {
		path: "/order_list",
		component: order_list,
		name: "order_list",
		meta: {
		  title: "订单管理",
		  requireAuth: false, //需要登录显示
		  showHeader: true, //头部显示
		  showNav: true, //菜单显示
		  showtag: true, //标签显示
		  showPosition: true, //显示当前位置
		  showClick: true, //全部标签显示
		  keepAlive: true, // 需要缓存
		},
	},
    {
		path:"/order_approve_print",
		component: order_approve_print,
		name: "order_approve_print",
		meta: {
			title:'订单预算审批',
			requireAuth: false,//需要登录显示
    		showHeader: false ,//头部显示
    		showNav:false,//菜单显示
    		showtag:false,//标签显示
    		showPosition:false,//显示当前位置
    		showClick:false,//全部标签显示
            keepAlive: false, // 需要缓存
		},
	},
	{
		path:"/order_process_contract_print",
		component: order_process_contract_print,
		name: "order_process_contract_print",
		meta: {
			title:'合同打印',
			requireAuth: false,//需要登录显示
    		showHeader: false ,//头部显示
    		showNav:false,//菜单显示
    		showtag:false,//标签显示
    		showPosition:false,//显示当前位置
    		showClick:false,//全部标签显示
            keepAlive: false, // 需要缓存
		},
	},
	{
		path:"/order_process_contract_attach_print",
		component: order_process_contract_attach_print,
		name: "order_process_contract_attach_print",
		meta: {
			title:'合同打印(附件)',
			requireAuth: false,//需要登录显示
    		showHeader: false ,//头部显示
    		showNav:false,//菜单显示
    		showtag:false,//标签显示
    		showPosition:false,//显示当前位置
    		showClick:false,//全部标签显示
            keepAlive: false, // 需要缓存
		},
	},
	{
		path:"/order_process_contract_print_new",
		component: order_process_contract_print_new,
		name: "order_process_contract_print_new",
		meta: {
			title:'合同打印',
			requireAuth: false,//需要登录显示
    		showHeader: false ,//头部显示
    		showNav:false,//菜单显示
    		showtag:false,//标签显示
    		showPosition:false,//显示当前位置
    		showClick:false,//全部标签显示
            keepAlive: false, // 需要缓存
		},
	},
	{
		path:"/order_process_contract_attach_print_new",
		component: order_process_contract_attach_print_new,
		name: "order_process_contract_attach_print_new",
		meta: {
			title:'合同打印(附件)',
			requireAuth: false,//需要登录显示
    		showHeader: false ,//头部显示
    		showNav:false,//菜单显示
    		showtag:false,//标签显示
    		showPosition:false,//显示当前位置
    		showClick:false,//全部标签显示
            keepAlive: false, // 需要缓存
		},
	},
	{
		path:"/order_purchase_contract_print",
		component: order_purchase_contract_print,
		name: "order_purchase_contract_print",
		meta: {
			title:'采购合同打印',
			requireAuth: false,//需要登录显示
    		showHeader: false ,//头部显示
    		showNav:false,//菜单显示
    		showtag:false,//标签显示
    		showPosition:false,//显示当前位置
    		showClick:false,//全部标签显示
            keepAlive: false, // 需要缓存
		},
	},
	{
		path:"/order_purchase_contract_attach_print",
		component: order_purchase_contract_attach_print,
		name: "order_purchase_contract_attach_print",
		meta: {
			title:'采购合同打印(附件)',
			requireAuth: false,//需要登录显示
    		showHeader: false ,//头部显示
    		showNav:false,//菜单显示
    		showtag:false,//标签显示
    		showPosition:false,//显示当前位置
    		showClick:false,//全部标签显示
            keepAlive: false, // 需要缓存
		},
	},
	{
		path:"/order_ex_contract_print",
		component: order_ex_contract_print,
		name: "order_ex_contract_print",
		meta: {
			title:'外销合同打印',
			requireAuth: false,//需要登录显示
    		showHeader: false ,//头部显示
    		showNav:false,//菜单显示
    		showtag:false,//标签显示
    		showPosition:false,//显示当前位置
    		showClick:false,//全部标签显示
            keepAlive: false, // 需要缓存
		},
	},
	{
		path:"/order_ex_contract_attach_print",
		component: order_ex_contract_attach_print,
		name: "order_ex_contract_attach_print",
		meta: {
			title:'外销合同打印(附件)',
			requireAuth: false,//需要登录显示
    		showHeader: false ,//头部显示
    		showNav:false,//菜单显示
    		showtag:false,//标签显示
    		showPosition:false,//显示当前位置
    		showClick:false,//全部标签显示
            keepAlive: false, // 需要缓存
		},
	},
	{
		path:"/order_ix_contract_print",
		component: order_ix_contract_print,
		name: "order_ix_contract_print",
		meta: {
			title:'内销合同打印',
			requireAuth: false,//需要登录显示
    		showHeader: false ,//头部显示
    		showNav:false,//菜单显示
    		showtag:false,//标签显示
    		showPosition:false,//显示当前位置
    		showClick:false,//全部标签显示
            keepAlive: false, // 需要缓存
		},
	},
	{
		path:"/order_ix_contract_attach_print",
		component: order_ix_contract_attach_print,
		name: "order_ix_contract_attach_print",
		meta: {
			title:'内销合同打印(附件)',
			requireAuth: false,//需要登录显示
    		showHeader: false ,//头部显示
    		showNav:false,//菜单显示
    		showtag:false,//标签显示
    		showPosition:false,//显示当前位置
    		showClick:false,//全部标签显示
            keepAlive: false, // 需要缓存
		},
	},
    {
		path:"/order_detail",
		component: order_detail,
		name: "order_detail",
		meta: {
			title:'订单详情',
			requireAuth: false,//需要登录显示
			showHeader: true ,//头部显示
			showNav:false,//菜单显示
			showtag:true,//标签显示
			showPosition:false,//显示当前位置
			showClick:true,//全部标签显示
            keepAlive: true, // 需要缓存
            canMultipleOpen: true, // 可以打开多个标签页
		},
	},

	{
		path:"/purchase_detail",
		component: purchase_detail,
		name: "purchase_detail",
		meta: {
			title:'采购合同详情',
			requireAuth: false,//需要登录显示
			showHeader: true ,//头部显示
			showNav:false,//菜单显示
			showtag:true,//标签显示
			showPosition:false,//显示当前位置
			showClick:true,//全部标签显示
            keepAlive: true, // 需要缓存
            canMultipleOpen: true, // 可以打开多个标签页
		},
	},

	{
		path:"/process_detail",
		component: process_detail,
		name: "process_detail",
		meta: {
			title:'加工合同详情',
			requireAuth: false,//需要登录显示
			showHeader: true ,//头部显示
			showNav:false,//菜单显示
			showtag:true,//标签显示
			showPosition:false,//显示当前位置
			showClick:true,//全部标签显示
            keepAlive: true, // 需要缓存
            canMultipleOpen: true, // 可以打开多个标签页
		},
	},
];

export default routes;