import Vue from "vue/dist/vue.esm.js";
import VueRouter from "vue-router";
import cookieService from "@/utils/cookieService";
import Login from "@/pages/login/Login.vue";
import MyLayout from "@/layout/MyLayout";
import Home from "@/pages/home/Home.vue";
import Drag from "@/pages/drag/Drag.vue";
import NotFound from "@/pages/404/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: MyLayout,
    children: [
      { path: "", component: Home },
      { path: "drag", component: Drag },
    ],
  },
  { path: "/login", component: Login },
  // 会匹配所有路径 跳转404页面
  { path: "*", component: NotFound },
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
