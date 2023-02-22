<style scoped lang="scss">
#container,
#buttonGroup {
	max-width: 1200px;
	min-width: 320px;
	margin: 1em auto;
}
.hidden {
	display: none;
}
.main-container button {
	font-size: 12px;
	border-radius: 2px;
	border: 0;
	background-color: #ddd;
	padding: 13px 18px;
}
.main-container button[disabled] {
	top:100px;
	color: silver;
}
.button-row button {
	display: inline-block;
	margin:5px;
}
.overlay {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.3);
	transition: opacity 500ms;
}
.popup {
	margin: 70px auto;
	padding: 20px;
	background: #fff;
	border-radius: 5px;
	width: 300px;
	position: relative;
}
.popup input,
.popup select {
	width: 100%;
	margin: 5px 0 15px;
}
.popup button {
	float: right;
	margin-left: 0.2em;
}
.popup .clear {
	height: 50px;
}
.popup input[type='text'],
.popup select {
	height: 2em;
	font-size: 16px;
}
</style>
<template>
	<div style="padding: 20px;margin-top: 100px;">
		<div class="main-container">
			<div id="container"></div>
			<div id="buttonGroup" class="button-row">
				<el-button @click="btnShowDialog">
					<i class="fa fa-plus"></i>
					添加
				</el-button>
				<el-button @click="btnRemoveTask" :disabled="getSelectedPoints">
					<i class="fa fa-remove"></i>
					删除
				</el-button>
			</div>
		</div>
		<vxe-modal ref="isAddingTask" v-model="isAddingTask" width="420" resize height="400" transfer show-footer>
			<template v-slot:header>
				<div class="model-title">添加节点</div>
				<div class="model-content"></div>
				<div class="model-r">
					<div class="model-screen" @click="screen">
						<i class="icon el-icon-full-screen" v-show="downIcon"></i>
						<i class="icon el-icon-copy-document" v-show="!downIcon"></i>
					</div>
					<div class="model-close" @click="btnCancelAddTask"><i class="icon el-icon-close"></i></div>
				</div>
			</template>
			<template #default>
				<div class="model-content-body">
					<el-form ref="form" :model="form" label-width="80px">
						<el-form-item label="名称">
							<el-input v-model="form.inputName" size="small"></el-input>
						</el-form-item>
						<el-form-item label="部门">
							<el-select v-model="form.selectDepartment" placeholder="请选择活动区域" style="width: 100%;" size="small" @change="departmentChange">
								<el-option  v-for="(item,index) in departmentOption" :key="index" :label="item" :value="index" ></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="工厂">
							<el-select v-model="form.selectDependency" placeholder="请选择活动区域" style="width: 100%;" size="small" clearable>
								<el-option  v-for="(item,index) in dependencyOption" :key="index" :label="item.name" :value="item.id" ></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="日期">
							<el-date-picker value-format="yyyy-MM-dd" v-model="form.time_start" type="date" transfer size="small" style="width: 130px" :disabled="dateDisable"></el-date-picker>
							<span style="padding: 0px 5px">至</span>
							<el-date-picker value-format="yyyy-MM-dd" v-model="form.time_end" type="date" transfer size="small" style="width: 130px" :disabled="dateDisable"></el-date-picker>
						</el-form-item>
						<el-form-item>
							<el-checkbox-group v-model="form.chkMilestone" @change="changeMilestone">
								<el-checkbox label="重要事件" name="type"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-form>
				</div>
			</template>
			<template v-slot:footer>
				<div class="m-r">
					<el-button size="mini" @click="btnAddTask">确定</el-button>
					<el-button size="mini" @click="btnCancelAddTask">取消</el-button>
				</div>
			</template>
		</vxe-modal>
	</div>
</template>

<script>
import gantt from '@/pages/Gant/common/highcharts-gantt.js';
import points from '@/pages/Gant//common/draggable-points.js';
import exporting from '@/pages/Gant/common/exporting.js';

var today = new Date(),
day = 1000 * 60 * 60 * 24;
today.setUTCHours(0);
today.setUTCMinutes(0);
today.setUTCSeconds(0);
today.setUTCMilliseconds(0);
today = today.getTime();


var each = Highcharts.each
// reduce = Highcharts.reduce;

export default {
	// components: {
	// 	gantt,
	// 	points,
	// 	exporting,
	// },
	data() {
		return {
			datalist: [],
			downIcon: true,
			isAddingTask: false,
			getSelectedPoints:true,
			form: {
				inputName: '',
				selectDepartment: '',
				selectDependency: '',
				chkMilestone: '',
				time_start:null,
				time_end:null,
			},
			chart:{},
			departmentOption:[],
			dependencyOption:[],
			
			dateDisable:false,

		};
	},
	mounted() {
		setTimeout(() => {
			this.initStrateGoal();
		}, 400);
		// 全局配置，需要在图标初始化之前配置
		Highcharts.setOptions({
			global: {
				useUTC: false // 不使用utc时间
			}, // 默认都是英文的，这里做了部分中文翻译
			lang: {
				noData: '暂无数据',
			 
				days:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25'],
				months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
			}
			
		});
		this.datalist = [
			{
				start: '2023-01-12',
				end: '2023-01-22',
				name: '计划一',
				id: '1',
				y: 0
			},
			{
				start: today + day * 7,
				end: today + day * 11,
				name: '计划二',
				id: '2',
				y: 0,
			},
			{
				start: today + day * 5,
				end: today + day * 8,
				name: '计划三',
				id: '3',
				y: 1
			},
			{
				start: today + day * 9,
				end: today + day * 10,
				name: '计划四',
				id: '4',
				y: 1
			},
			{
				start: today + day * 9,
				end: today + day * 11,
				name: '计划五',
				id: '5',
				y: 2
			},
			{
				start: today + day * 11.5,
				end: today + day * 12.5,
				name: '计划六',
				id: '6',
				dependency: '5',
				y: 2
			},
			
		];

	},
	methods: {
		screen() {
			this.$refs.model1.zoom();
			this.downIcon = !this.downIcon;
		},
		closeModel() {
			this.$emit('update:show', false);
		},
		btnShowDialog() {
			this.isAddingTask = true;
			this.form= {
				inputName: '',
				selectDepartment: '',
				selectDependency: '',
				chkMilestone: false,
				time_start:null,
				time_end:null,
			}
			this.dateDisable=false
		},
		updateRemoveButtonStatus() {
			this.getSelectedPoints = !this.getSelectedPoints
		},
		/* Add button handlers for add/remove tasks */
		btnRemoveTask() {
			var points = this.chart.getSelectedPoints();
			each(points, function (point) {
				point.remove();
			});

		},
		btnAddTask () {
			if(this.form.chkMilestone==true){
				this.form.time_start=null
				this.form.time_end=null
			}else{
				var date=this.$general.getYearMonth()
				var nowDate = date.year+'-'+date.month+'-'+date.day
				var startDay = this.getDiffDay(this.form.time_start, nowDate)
				var endDay = this.getDiffDay(this.form.time_end, nowDate)
			}
			

			var y = this.form.selectDepartment,
			dependency = this.chart.get(this.form.selectDependency),
			maxEnd = this.chart.series[0].points.reduce(function (acc, point) {
				return point.y === y && point.end ? Math.max(acc, point.end) : acc;
			}, 0),
			undef,
			milestone = this.form.chkMilestone || undef;

			if (maxEnd === 0) {
				maxEnd = today;
			}

			var start,end
			if(this.form.time_start==null){
				start = maxEnd + (milestone ? day : 0)
				end = milestone ? undef : maxEnd + day
			}else{
				start =eval(today + startDay[0] + startDay[1] * day )
				end =eval(today + endDay[0] + endDay[1] * day )
			}

			this.chart.series[0].addPoint({
				// start: maxEnd + (milestone ? day : 0),
				// end: milestone ? undef : maxEnd + day,
				start:start,
				end:end,
				y: y,
				name: this.form.inputName,
				dependency: dependency ? dependency.id : undef,
				milestone:milestone
			});
			this.isAddingTask = false;
		},

		// 计算两个日期之间的差值
		getDiffDay(date_1, date_2) {
			let totalDays,diffDate,mothed
			let myDate_1 = Date.parse(date_1)
			let myDate_2 = Date.parse(date_2) 
			let diffDay = []
			// 将两个日期都转换为毫秒格式，然后做差
			diffDate = myDate_1 - myDate_2 
			totalDays = Math.floor(diffDate / (1000 * 3600 * 24)) // 向下取整
			if(totalDays<0){
				mothed='-'
			}else{
				mothed='+'
			}
			totalDays=Math.abs(totalDays)
			diffDay=[mothed,totalDays]
			alert('aa');
			return diffDay    // 相差的天数
		},
			
		changeMilestone(value){
			if(value==true){
				this.form.time_start=null
				this.form.time_end=null
				this.dateDisable=true
			}else{
				this.dateDisable=false
			}
		},
		btnCancelAddTask () {
			this.isAddingTask = false;
		},
		initStrateGoal() {
			// Create the chart
			var chart = Highcharts.ganttChart('container', {
				chart: {
					spacingLeft: 1
				},
				title: {
					text: '排单'
				},
				subtitle: {
					text: 'Drag and drop points to edit'
				},

				plotOptions: {
					series: {
						animation: false, // Do not animate dependency connectors
						dragDrop: {
							draggableX: true,
							draggableY: true,
							dragMinY: 0,
							dragMaxY: 2,
							dragPrecisionX: day / 3 //Snap to eight hours
						},
						dataLabels: {
							enabled: true,
							format: '{point.name}',
							style: {
								cursor: 'default',
								pointerEvents: 'none'
							}
						},
						allowPointSelect: true,
						point: {
							events: {
								select: this.updateRemoveButtonStatus,
								unselect: this.updateRemoveButtonStatus,
								remove: this.updateRemoveButtonStatus
							}
						}
					}
				},
				yAxis: {
					type: 'category',
					categories: ['业务一部', '业务二部', '业务三部'],
					min: 0,
					max: 2
				},
				xAxis: {
					currentDateIndicator: true
				},
				tooltip: {
					xDateFormat: '%Y-%m-%d' //'%a %b %d, %H:%M'
				},
				series: [
					{
						name: 'Project 1',
						data: this.datalist
					}
				]
			});
			this.chart=chart
			this.departmentOption=chart.yAxis[0].categories
			this.dependencyOption=chart.series[0].data
		},
		departmentChange(value){
			let dependencyOption=this.chart.series[0].data
			let dependencyNewOption=[]
			dependencyOption.forEach(item => {
				if(item.y==value){
					dependencyNewOption.push(item)
				}
			});
			this.dependencyOption=dependencyNewOption
		},
			
	}
};
</script>
