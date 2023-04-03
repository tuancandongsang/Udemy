import { createRouter, createWebHistory } from 'vue-router';
import NotFound from '../page/pageNotFound/NotFoundPage.vue';
import Login from '../page/login/Login.vue';
import Home from '../page/home/Home.vue';
import Layout from '../layout/Layout.vue';
import Detail from '../page/detail/Detail.vue';
import { getJwtToken } from '../utils/helpers';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        {
          path: '/home',
          component: Home,
          name: 'home'
        },
        {
          path: '/:id',
          component: Detail,
          props: true,
        },
      ],
    },
    { path: '/:notFound(.*)', component: NotFound, name: 'NotFound' },
  ],
});
router.beforeEach((to, from, next) => {
  const token = getJwtToken();
  if (!token && to.path !== '/login') {
    next({ path: '/login' });
  }
  if (token && to.path === '/login') {
    next(from.path);
  } else {
    next();
  }
});
