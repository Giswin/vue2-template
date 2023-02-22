import syUploadHeader from "./sy-upload-header.vue";

// 为组件提供 install 安装方法，供按需引入
syUploadHeader.install = function (Vue) {
  Vue.component(syUploadHeader, syUploadHeader);
};

export default syUploadHeader;
