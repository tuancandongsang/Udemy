import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../page/pageNotFound/NotFoundPage.vue";
import Layout from "../layout/Layout.vue";
import Input from "../page/input-keyboard-valid.vue"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/input-keyboard-valid",
      component: Layout,
      children: [
        {
          path: "/input-keyboard-valid",
          component: Input,
          name: "home",
        },
      ],
    },
    { path: "/:notFound(.*)", component: NotFound, name: "NotFound" },
  ],
});
