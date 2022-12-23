import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import store from './store/index.js';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { router } from './router';
import '../src/style/style.scss'; // global css
import "./assets/main.css";

const routerApp = createRouter({
  history: createWebHistory(),
  routes: router,
  linkActiveClass: 'active',
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

const app = createApp(App);

app.use(routerApp);
app.use(store);
app.use(Antd);
app.mount('#app');
