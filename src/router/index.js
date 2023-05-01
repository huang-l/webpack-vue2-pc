import Vue from "vue/dist/vue.esm.js";
import VueRouter from "vue-router";
import cookieService from "@/utils/cookieService";
import Login from "@/pages/login/Login.vue";
import MyLayout from "@/layout/MyLayout";
import Home from "@/pages/home/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: MyLayout,
    children: [{ path: "", component: Home }],
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const token = cookieService.getCookie("token");
  if (!token && to.path !== "/login") {
    next("/login");
  }
  next();
});

export default router;
