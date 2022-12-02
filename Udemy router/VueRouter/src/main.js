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
import nested from './components/nested/nested.vue'
import login from './components/login/login.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import img1 from './components/nested/footer1/Footer.vue'
import img2 from './components/nested/footer2/Footer.vue'
import img3 from './components/nested/footer3/Footer.vue'
import icon from './components/nested/icon/index.vue'


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
      //   // console.log("beforeEnter to: ", to);
      //   // console.log("beforeEnter from: ", from);
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
    {
      path: '/nested',
      // // SỬ DỤNG redirect ĐỂ CHUYỂN HƯỚNG KHI CÓ NHIỀU ROUTER CON
      redirect: '/nested/all',
      // // SỬ DỤNG alias ĐỂ LÀM TÊN BÍ DANH
      alias: '/home',
      // // SỬ DỤNG name  THAY CHO VIỆC DÙNG PATH 
      name: 'nested',

      components: { default: nested },
      children: [
        {
          path: 'all',
          name: 'allimg',
          components: {
            default: img1,
            a: img2,
            b: img3,
            d: img1,
          },
        },
        {
          path: 'img1',
          name: 'img1',
          component: img1,
        },
        {
          path: 'img21',
          name: 'img21',
          components: {
            default: img2,
            a: img1,
          },
        },
        {
          name: 'img32',
          path: 'img32',
          components: {
            default: img3,
            b: img2
          },
        },
        {
          path: 'icon',
          name: 'icon',
          components: {
            default: icon,
          },
        },
      ],
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
//   // console.log("beforeEach to: ", to);
//   // console.log("beforeEach from: ", from);
//   // //  check vào to ở params
//   // if (to.name === 'users') {
//   //   return next(false);
//   // }
//   const userWantsToLeave = confirm(
//     '`==> truy cap vao beforeEach  .../App.vue GLOBAL `'
//   );
//   next(userWantsToLeave);
//   // next()
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
