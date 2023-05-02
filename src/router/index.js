import Vue from "vue/dist/vue.esm.js";
import VueRouter from "vue-router";
import cookieService from "@/utils/cookieService";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/layout/MyLayout"),
    children: [
      { path: "", component: () => import("@/pages/home/Home.vue") },
      { path: "drag", component: () => import("@/pages/drag/Drag.vue") },
    ],
  },
  { path: "/login", component: () => import("@/pages/login/Login.vue") },
  // 会匹配所有路径 跳转404页面
  { path: "*", component: () => import("@/pages/404/NotFound") },
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
