import syQrcode from "./sy-qrcode.vue";

// 为组件提供 install 安装方法，供按需引入
syQrcode.install = function(Vue) {
  Vue.component(syQrcode, syQrcode);
};

export default syQrcode;
