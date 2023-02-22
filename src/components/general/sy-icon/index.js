// 导入组件，组件必须声明 name
import syIcon from './sy-icon.vue'

// 为组件提供 install 安装方法，供按需引入
syIcon.install = function (Vue) {
  Vue.component(syIcon.name, syIcon)
}

// 导出组件
export default syIcon