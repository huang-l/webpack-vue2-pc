import Vue from 'vue/dist/vue.esm.js';
import VueRouter from 'vue-router';
import Layout from '@/layout/Layout';
import Home from '@/pages/home/Home.vue';
import Table from '@/pages/table/Table.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'table', component: Table },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
