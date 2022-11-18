
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './lang/i18n'
import store from './store'


const app = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
export default app
