import { createApp } from 'vue';

import App from './App.vue';
import { router } from './router/index.js';
import { setupAndGetI18n } from './config/setup-i18n';

const vueApp = createApp(App);
vueApp.use(router);
setupAndGetI18n(vueApp);

vueApp.mount('#app');
