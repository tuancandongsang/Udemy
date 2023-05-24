import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../page/pageNotFound/NotFoundPage.vue";
import Layout from "../layout/Layout.vue";
import Input from "../page/input-keyboard-valid.vue"
import ExcelExport from '../page/excelExport.vue'
import ImportExcel from '../page/importExcel.vue'
import Refresh from '../page/refresh_time.vue'

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
      ],
    },
    { path: "/:notFound(.*)", component: NotFound, name: "NotFound" },
  ],
});
