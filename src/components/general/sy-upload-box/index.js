import syUploadBox from "./sy-upload-box.vue";

// 为组件提供 install 安装方法，供按需引入
syUploadBox.install = function (Vue) {
  Vue.component(syUploadBox, syUploadBox);
};

export default syUploadBox;
