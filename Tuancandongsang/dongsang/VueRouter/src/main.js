import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import store from './store/index.js';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router1 from './router'



const router = createRouter({
  history: createWebHistory(),
  routes: router1,
  linkActiveClass: 'active',
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});


const app = createApp(App);

app.use(router);
app.use(store);
app.use(Antd);
app.mount('#app');
