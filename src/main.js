import Vue from 'vue/dist/vue.esm.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';
import App from './App.vue';
import './main.css';

Vue.use(ElementUI);

new Vue({
  el: '#root',
  router,
  store,
  render: (h) => h(App),
});
