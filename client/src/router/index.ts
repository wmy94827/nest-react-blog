import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { PUBLIC_PATH } from "@/utils/constant";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/layouts/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
      },
      {
        path: "/articleDetail/:articleId",
        name: "articleDetail",
        component: () => import("@/views/articleDetail/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(PUBLIC_PATH),
  routes,
});

export default router;
