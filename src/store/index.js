import Vue from "vue/dist/vue.esm.js";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);

const files = require.context("./modules", true, /index\.js/);

const modules = {};

files.keys().forEach((key) => {
  Object.assign(modules, files(key).default);
});

const store = new Vuex.Store({
  modules,
  plugins: [vuexLocal.plugin],
});

export default store;
