import resizeDirective from "./resize";

export default {
  install(Vue) {
    Vue.directive("resize", resizeDirective);
  },
};
