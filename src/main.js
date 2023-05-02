import Vue from "vue/dist/vue.esm.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import store from "./store";
import dialog from "./dialog";
import directives from "./directives";
import App from "./App.vue";

Vue.use(ElementUI);
Vue.use(dialog);
Vue.use(directives);

new Vue({
  el: "#root",
  router,
  store,
  render: (h) => h(App),
});
