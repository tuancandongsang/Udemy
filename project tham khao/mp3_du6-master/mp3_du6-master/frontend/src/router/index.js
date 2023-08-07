import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", component: () => import("../page/login/Login.vue") },
    {
      path: "/",
      redirect: "/list",
      component: () => import("../page/Home.vue"),
      children: [
        {
          path: "list",
          component: () => import("../components/list/List.vue"),
          name: "list",
        },
        {
          path: "playlist",
          component: () => import("../components/playlist/Playlist.vue"),
          name: "playlist",
        },
        {
          path: "singer",
          component: () => import("../components/singer/Singer.vue"),
          name: "singer",
        },
      ],
    },
    // { path: '/:notFound(.*)', component: NotFound, name: 'NotFound' },
  ],
});
// router.beforeEach((to, from, next) => {
//   const token = getJwtToken();
//   if (!token && to.path !== '/login') {
//     next({ path: '/login' });
//   }
//   if (token && to.path === '/login') {
//     next(from.path);
//   } else {
//     next();
//   }
// });
