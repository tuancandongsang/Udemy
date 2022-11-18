import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en: {
    message: {
      value: 'This is an example of content translation, hello',
      smg:'english hello'
    }
  },
  be: {
    message: {
      value: 'Гэта прыклад перакладу змесціва. alo',
      smg: 'hello tieng be'
    }
  },
  da: {
    message: {
      value: 'Dette er et eksempel på oversættelse .',
      smg: 'hello tieng da'
    }
  },
 vn: {
    message: {
      value: 'xin chao toi al.',
      smg: 'hello tieng vn'
    }
  }
};

const i18n = new VueI18n({
  locale: 'en',
  messages
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  i18n
}).$mount('#app')
