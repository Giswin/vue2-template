/*********************** 引入业务组件库 ***********************/
// 导入组件
import syAttach from "./general/sy-attach/index.vue";
import syUpload from "./general/sy-upload/sy-upload.vue";
import syUploadHeader from "./general/sy-upload-header/sy-upload-header.vue";
import syUploadBox from "./general/sy-upload-box/sy-upload-box.vue";
import syProgress from "./general/sy-progress/sy-progress.vue";
// import syQrcode from "./general/sy-qrcode/sy-qrcode.vue";

import syMultipleSet from "./general/sy-multiple-set/index.vue";
import FilterInput from "./project/vxe-table/render/FilterInput.vue";
import FilterSelect from "./project/vxe-table/render/FilterSelect.vue";
import FilterRange from "./project/vxe-table/render/FilterRange.vue";
import FilterDate from "./project/vxe-table/render/FilterDate.vue";
import FilterForm from "./general/filter-form/filter-form.vue";
import FilterTag from "./general/filter-form/filter-tag.vue";

// 组件列表
const components = [
  syAttach,
  syUpload,
  syUploadHeader,
  syUploadBox,
  syProgress,
  // syQrcode,
  syMultipleSet,
  FilterInput,
  FilterSelect,
  FilterRange,
  FilterDate,
  FilterForm,
  FilterTag,
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，那么所有的组件都会被注册
const install = function(Vue) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  components.map((component) => Vue.component(component.name, component));
};

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  syAttach,
  syUpload,
  syUploadHeader,
  syUploadBox,
  syProgress,
  // syQrcode,
  syMultipleSet,
  FilterInput,
  FilterSelect,
  FilterRange,
  FilterDate,
  FilterForm,
  FilterTag,
};
