import Vue from 'vue/dist/vue.esm.js';
import Vuex from 'vuex';

Vue.use(Vuex);

const files = require.context('./modules', true, /index\.js/);

const modules = {};

files.keys().forEach((key) => {
  Object.assign(modules, files(key).default);
});

const store = new Vuex.Store({
  modules,
});

export default store;
