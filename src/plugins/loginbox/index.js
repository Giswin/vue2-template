import login_box from './index.vue';

//定义插件对象
let LoginBox = {}
let currentLoginBox = null

//Vue的install方法，用于定义vue插件
LoginBox.install = function(Vue, options){
	const MessageInstance = Vue.extend(login_box);  //创建模板
	let msgbox = null;                              //定义组件实例变量
	// 给模版增加属性，属性为一个方法
	/*MessageInstance.prototype.callBack = (action)=>{
		if(!action)
			currentLoginBox.reject();
		else
			currentLoginBox.resolve();
	};*/

	//在Vue的原型上添加实例，以全局调用
	Vue.prototype.$login = {
		show(){
			if(! msgbox){
				msgbox = new MessageInstance().$mount();  //创建组件实例
				document.body.appendChild(msgbox.$el);  //挂载实例DOM
			}
			msgbox.show = true;

			return new Promise((resolve,reject) => {
				currentLoginBox = {resolve,reject}
			})
		}
	}
};
export default LoginBox;