import syUpload from "./sy-upload.vue";

// 为组件提供 install 安装方法，供按需引入
syUpload.install = function (Vue) {
  Vue.component(syUpload, syUpload);
};

export default syUpload;
