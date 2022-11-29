import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import store from './store/index.js';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';
import login from './components/login/login.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    {
      path: '/users',
      name: 'users',
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      // // BEFOREENTER
      // beforeEnter(to, from, next) {
      //   console.log("beforeEnter to: ", to);
      //   console.log("beforeEnter from: ", from);
      //     const userWantsToLeave = confirm(
      //       '`==> truy cap vao beforeEnter  .../userList.vue `'
      //     );
      //     next(userWantsToLeave);
      // // // nêu next(false): thì component đó không truy cập được
      //     // next(false)
      // },
    },
    {
      path: '/login',
      name: 'login',
      components: {
        default: login,
        footer: UsersFooter,
      },
    },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
  scrollBehavior(_, _2, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

// router.beforeEach((to, from, next) => {
//   console.log("beforeEach to: ", to);
//   console.log("beforeEach from: ", from);
//  //check vào to ở params
//   // if (to.name === 'users') {
//   //   const userWantsToLeave = confirm(
//   //     '`==> truy cap vao beforeEach  .../userList.vue GLOBAL `'
//   //   );
//   //   next(userWantsToLeave);
//   //   return next(false);
//   // }
//   const userWantsToLeave = confirm(
//     '`==> truy cap vao beforeEach  .../App.vue GLOBAL `'
//   );
//   next(userWantsToLeave);
// });

// //   BEFORERESOLVE
// router.beforeResolve((to, from, next) => {
//   console.log("beforeResolve to: ", to);
//   console.log("beforeResolve from: ", from);
//  //check vào to ở params
//   // if (to.name === 'users') {
//   //   const userWantsToLeave = confirm(
//   //     '`==> truy cap vao beforeResolve  .../userList.vue GLOBAL `'
//   //   );
//   //   next(userWantsToLeave);
//   //   return next(false);
//   // }
//   const userWantsToLeave = confirm(
//     '`==> truy cap vao beforeResolve  .../App.vue GLOBAL `'
//   );
//   next(userWantsToLeave);
// });

// //  AFTEREACH
// router.afterEach(function (to, from, next) {
//   console.log("afterEach to: ", to);
//   console.log("afterEach from: ", from);
//     const userWantsToLeave = confirm(
//     '`==> rời khỏi afterEach  .../App.vue GLOBAL `'
//   );
//   next(userWantsToLeave);
// });

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Antd);
app.mount('#app');
