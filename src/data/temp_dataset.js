const db = {
    userConditions: {
    	status: {
    		type: 'select',
    		field: 'status',
    		title: '状态',
    		value: '',
    		options: {
    			config: {
    				label: 'name',
    				value: 'state',
    				multiple: false
    			},
    			data: [{
    				state: 0,
    				name: '未激活'
    			}, {
    				state: 1,
    				name: '正式'
    			}, {
    				state: 2,
    				name: '禁用'
    			}]
    		}
    	},
    	user_name: {
    		type: 'input',
    		field: 'user_name',
    		title: '用户名',
    		value: ''
    	},
    	sex: {
    		type: 'select',
    		field: 'sex',
    		title: '性别',
    		value: [],
    		options: {
    			config: {
    				label: 'name',
    				value: 'name',
    				multiple: true
    			},
    			data: [{
    				name: '男'
    			}, {
    				name: '女'
    			}]
    		}
    	},
    	birthday: {
    		type: 'date',
    		field: 'birthday',
    		title: '出生日期',
    		value: {
    			start: '',
    			end: ''
    		}
    	},
    	age: {
    		type: 'number',
    		field: 'age',
    		title: '年龄',
    		value: {
    			start: '',
    			end: ''
    		}
    	}
    },
	userConditions1: {
		
		user_name: {
			type: 'input',
			field: 'user_name',
			title: '业务',
			value: ''
		},
		gt_name: {
			type: 'input',
			field: 'gt_name',
			title: '工厂',
			value: ''
		},
		poday: {
			type: 'date',
			field: 'poday',
			title: '订单交期',
			value: {
				start: '',
				end: ''
			}
		},
		birthday: {
			type: 'date',
			field: 'birthday',
			title: '出货日期',
			value: {
				start: '',
				end: ''
			}
		},
	},
	tableData:[
		{
			name:'业务一部-季雪婷',//业务信息
			no:'66736',//款号
			po:'N10312901',//po
			color:'white',//颜色
			mode:'独色独码',//包装方式
			memo:'',//包装说明
			etd:'2022-03-01',//订单交期
			poven:'荣飞针纺',//po工厂
			ppven:'荣飞针纺',//生产工厂
			pppcs:'2800',//订单数量
			carton:'20',//单箱件数
			numbers:'140',//箱数
			nciTime:'2022-03-02',//入库时间
			whName:'江阴',//入库仓库
			nciOp:'张姝姝',//入库仓库
			nciPcs:'2800',//入库数量
			nciCarton:'20',//单箱件数
			nciNumbers:'140',//入库箱数
			nciSize1:'60',//箱规
			nciSize2:'40',//箱规
			nciSize3:'30',//箱规
			nciSize:'60*40*30',//箱规
			volume:'14.1',//体积
			weight_n:'5.3',//净重
			weight_g:'5.3',//毛重
			nciType:'',//入库类型
			nciMemo:'',//入库备注
			creatTime:'2022-03-04',//尾检时间
			ncqResult:'通过',//尾检结果
			ncqCreator:'张秣',//尾检人员
			ncqUrl:'',//尾检报告
			ncqMemo:'',//尾检说明
			apprTime:'2022-03-04',//确认时间
			apprSales:'张秣',//确认人员
			apprMemo:'',//确认说明
			ncrTime:'2022-03-04',//确认时间
			ncrCreator:'张秣',//尾检人员
			ncrPcs:'2800',//检针数量
			ncrNumbers:'140',//检针箱数
			ncrNumber:'0',//检针数
			ncrMemo:'',//检针说明
			ncoPcs:'2800',//检针数量
			ncoNumbers:'140',//检针箱数
			ncoTime:'2022-03-04',//确认时间
		},
		{
			name:'业务一部-季雪婷',//业务信息
			no:'66736',//款号
			po:'N10312901',//po
			color:'white',//颜色
			mode:'独色独码',//包装方式
			memo:'',//包装说明
			etd:'2022-03-01',//订单交期
			poven:'荣飞针纺',//po工厂
			ppven:'荣飞针纺',//生产工厂
			pppcs:'2800',//订单数量
			carton:'20',//单箱件数
			numbers:'140',//箱数
			nciTime:'2022-03-02',//入库时间
			whName:'江阴',//入库仓库
			nciOp:'张姝姝',//入库仓库
			nciPcs:'2800',//入库数量
			nciCarton:'20',//单箱件数
			nciNumbers:'140',//入库箱数
			nciSize1:'60',//箱规
			nciSize2:'40',//箱规
			nciSize3:'30',//箱规
			nciSize:'60*40*30',//箱规
			volume:'14.1',//体积
			weight_n:'5.3',//净重
			weight_g:'5.3',//毛重
			nciType:'',//入库类型
			nciMemo:'',//入库备注
			creatTime:'2022-03-04',//尾检时间
			ncqResult:'通过',//尾检结果
			ncqCreator:'张秣',//尾检人员
			ncqUrl:'',//尾检报告
			ncqMemo:'',//尾检说明
			apprTime:'2022-03-04',//确认时间
			apprSales:'张秣',//确认人员
			apprMemo:'',//确认说明
			ncrTime:'2022-03-04',//确认时间
			ncrCreator:'张秣',//尾检人员
			ncrPcs:'2800',//检针数量
			ncrNumbers:'140',//检针箱数
			ncrNumber:'0',//检针数
			ncrMemo:'',//检针说明
		},
	],
}

export default db