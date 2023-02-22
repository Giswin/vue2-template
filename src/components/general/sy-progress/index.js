import syProgress from "./sy-progress.vue";

// 为组件提供 install 安装方法，供按需引入
syProgress.install = function (Vue) {
  Vue.component(syProgress, syProgress);
};

export default syProgress;
