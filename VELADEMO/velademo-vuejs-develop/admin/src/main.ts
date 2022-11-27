import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import { store } from "./stores";
import Toast from "vue-toastification";
import "ant-design-vue/dist/antd.css"; // or 'ant-design-vue/dist/antd.less'
import "vue-toastification/dist/index.css";
import "./assets/main.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Antd);
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  newestOnTop: true,
  filterBeforeCreate: (toast, toasts) => {
    if (toasts.filter((t) => t.type === toast.type).length !== 0) {
      // Returning false discards the toast
      return false;
    }
    // You can modify the toast if you want
    return toast;
  },
});

app.mount("#app");
