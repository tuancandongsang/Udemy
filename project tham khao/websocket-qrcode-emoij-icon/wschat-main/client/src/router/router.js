import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../page/Home.vue"),
      name: "home",
    },
    {
      path: "/:channel",
      component: () => import("../page/Channel.vue"),
      props: true,
    },
  ],
});
