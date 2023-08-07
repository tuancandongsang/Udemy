import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router/index.js';
import './style.css';

const vueApp = createApp(App);
vueApp.use(router);
vueApp.mount('#app');

