import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../page/pageNotFound/NotFoundPage.vue";
import Layout from "../layout/Layout.vue";
import Input from "../page/input-keyboard-valid.vue"
import ExcelExport from '../page/excelExport.vue'
import ImportExcel from '../page/importExcel.vue'
import Refresh from '../page/refresh_time.vue'
import Css from '../page/css.vue'
import Debounce from '../page/debounce.vue'
import CreateNamespacedHelpers from '../page/CreateNamespacedHelpers.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/input-keyboard-valid",
      component: Layout,
      children: [
        {
          path: "/input-keyboard-valid",
          component: Input,
          name: "input",
        },
        {
          path: "/excel-export",
          component: ExcelExport,
          name: "excelExport",
        },
        {
          path: "/import-excel",
          component: ImportExcel,
          name: "excelImport",
        },
        {
          path: "/refresh",
          component: Refresh,
          name: "Refresh",
        },
        {
          path: "/css",
          component: Css,
          name: "css",
        },
        {
          path: '/Debounce',
          component: Debounce,
          name: 'Debounce'
        },
        {
          path: '/createNamespacedHelpers',
          component: CreateNamespacedHelpers,
          name: 'createNamespacedHelpers'
        }
      ],
    },
    { path: "/:notFound(.*)", component: NotFound, name: "NotFound" },
  ],
});
