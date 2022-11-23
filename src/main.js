import Vue from 'vue/dist/vue.esm.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';

Vue.use(ElementUI);

new Vue({
  el: '#root',
  render: (h) => h(App),
});
