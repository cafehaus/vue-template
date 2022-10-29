import { createRouter, createWebHistory } from "vue-router";
import Layout from "../views/layout/Layout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: 'home',
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("../views/HomeView.vue"),
        },
        {
          path: "/doc",
          name: "doc",
          component: () => import("../views/DocView.vue"),
        },
      ]
    }
  ],
});

export default router;
