import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },

  {
    path: '/permission',
    alias: ['/home', 'list'],
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router

//   path: '/permission',

//   component: Layout,

//   redirect: '/permission/page',  ====>  chuy???n h?????ng t???  '/permission' t???i '/permission/page' ...............
// redirect: noredirect N???u noredirect, route n??y s??? kh??ng click ???????c

//   alias: '/home',   ==>> thay th???  t??? path: '/permission' th??nh '/home' n???u truy c???p v??o .../home' ( ch??? l?? thay th??? t??n k ph???i chuy???n h?????ng n???u c??? thay permission b???ng home) ( alias t??n g???i kh??c)

// alwaysShow: true  ==> Khi 1 route cha c?? nhi???u h??n 1 route con, t???t c??? c??c route con s??? hi???n th??? d?????i d???ng nested (menu con)
// Nh??ng khi 1 route cha ch??? c?? 1 route con, th?? menu s??? hi???n th??? route con thay cho route cha (menu con ch??? c?? 1 link, th?? s??? thay th??? menu cha)
// N???u b???n v???n mu???n hi???n th??? menu cha - con trong khi menu con ch??? c?? 1 link, th?? b???n thi???t l???p alwaysShow: true

//   name: 'Permission',  // T??n c???a route, lu??n lu??n y??u c???u n???u kh??ng ch??ng ta s??? c?? v???n ????? v???i <keep-alive>.

//   hidden: false,  ===> hidden: true ???n ??i tr??n hi???n th??? ( ??p d???ng v???i trang b??o l???i), hidden: false hi???n th???, m???c ?????nh l?? false

//   meta: {
//     title: 'Permission',  ====> t??n c???a ul (T??n xu???t hi???n tr??n layout (??? Sidebar, Breadcrumbs,...))
//     icon: 'lock',   ===> icon tr?????c t??n c???a ul........................
//     roles: ['admin', 'editor']  // Nh??m ng?????i d??ng ???????c ph??p truy c???p v??o route n??y, n???u kh??ng thi???t l???p, t???t c??? c??c nh??m ?????u truy c???p ???????c
//     permissions: ['view menu zip', 'manage user'], ==>> Quy???n h???n ????? ???????c ph??p truy c???p v??o route n??y, n???u kh??ng thi???t l???p, t???t c??? ng?????i d??ng ????? truy c???p ???????c
//     noCache: true  ===>>> N???u l?? true, route n??y s??? kh??ng ???????c "cache" b???i <keep-alive>. M???c ?????nh l?? false (t???t c?? route ?????u ???????c cache)
//     breadcrumb: false   ==>> N???u l?? false, route n??y s??? kh??ng xu???t hi???n ??? breadcrumb (m???c ?????nh l?? true)
//   },
//   children: [
//     {
//       path: '/page',  ===> s??? ???????c c???ng g???p v???i router cha th??nh '/permission/page'....................
//       alias: '/home', ===> c?? l?? thay th??? '/permission/page' th??nh    ..."/permission/home" ........................
//       component: () => import('@/views/permission/page'),
//       name: 'PagePermission',
//       meta: {
//         title: 'Page Permission',  ===>> t??n c???a li ............................
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     },
//     {
//       path: 'directive',
//       component: {
//       default: UserProfile,  ===>  component con m???c ?????nh ......................
//       helper: UserProfilePreview  ===> component con c?? th??? th??m ph??? tr??? v??o component default ....................
//     },
//       name: 'DirectivePermission',
//       meta: {
//         title: 'Directive Permission'
//         // if do not set roles, means: this page does not require permission
//       }
//     },
//     {
//       path: 'role',
//       component: () => import('@/views/permission/role'),
//       name: 'RolePermission',
//       meta: {
//         title: 'Role Permission',
//         roles: ['admin']
//       }
//     }
//   ]
// },

// linkActiveClass: 'active', ==>> v???i c??c link ??c click s??? c?? th??m class l?? active

// scrollBehavior(to, from, savedPosition) {
//     // console.log(to, from, savedPosition);
//     if (savedPosition) {
//       return savedPosition;
//     }
//     return { left: 0, top: 0 };
//   }
// scrollBehavior  ==>> gi??p b???o l??u v??? tr?? scoll tr??nh duy???t

// const router = new VueRouter({
//   routes: [
//     {
//       path: '/foo',
//       component: Foo,
//       beforeEnter: (to, from, next) => {

//       }
//     }
//   ]
// })
// ??? ????y ch??ng ta s??? ?????nh ngh??a th??m beforeEnter trong c???u tr??c c???a Router.
// Vi???c ?????nh ngh??a n??y n??i ch??ng ta bi???t r???ng l?? beforeEnter s??? ???????c g???i t???i tr?????c khi
// router ???????c chuy???n h?????ng. Tham s??? truy???n v??o c???a beforeEnter bao g???m 3 tham s???: to, from v?? next.
//  ?????ng ngh??a v???i vi???c c??c b???n c?? th??? ho??n to??n ??i???u h?????ng router ??? ????y.

// const router = new VueRouter({ ??? });
// router.beforeEach((to, from, next) => {
// })
// router.beforeResolve((to, from, next) => {
// })
// router.afterEach((to, from) => {
// })
// Trong ????:

// beforeEach: S??? ???????c g???i t???i khi m?? b???t k?? router n??o c???a c??c b???n ???????c ng?????i d??ng k??ch ho???t.
//  T???i ????y, c??c b???n s??? c???n 3 tham s??? ?????u v??o l?? to, from v?? next.
// to: Ch???a c??c thu???c t??nh c???a m???t Router v?? ng?????i d??ng h?????ng ?????n (d??ng ch??nh thu???c t??nh ??? ????y ????? ph??n quy???n).
// from: Ch???a c??c thu???c t??nh c???a m???t Router, cho bi???t b???n ??ang ??? router n??o tr?????c khi b???n chuy???n h?????ng ??i.
// next: ????y l?? m???t Function b???t bu???c c??c b???n ph???i g???i ????? x??c ?????nh chuy???n h?????ng.
// beforeResolve: ???????c g???i t???i tr?????c khi m?? s??? ??i???u h?????ng c???a ch??ng ta ???????c x??c nh???n.
// C??ng bao g???m 3 tham s??? nh?? beforeEach
// afterEach: ???????c g???i khi m?? t???t c??? c??c logic, x??? l?? c???a ch??ng ta ???? xong.
// ??? afterEach, ch??ng ta ch??? c?? 2 tham s??? l?? to v?? from ch??nh v?? v???y m?? kh??ng th???
// ??i???u h?????ng sang m???t router kh??c ??? th???i ??i???m n??y.

// Component Guards ??? Can thi???p v??o t???ng component trong VueJS
// ????y l?? m???c ????? nh??? nh???t cho vi???c c??c b???n can thi???p v??o Router ??? ???? l?? Component.
//  Ch??ng ta s??? c?? Options c???n l??u ?? ??? ????y:

// const Foo = {
//    template: "...",
//    beforeRouteEnter (to, from, next) {

//    },
//    beforeRouteUpdate (to, from, next) {

//    },
//    beforeRouteLeave (to, from, next) {

//    }
//  }
// C??? beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave ?????u c?? 3 tham s??? l?? to, from, next.
// Nh?? v???y ch??ng ta ?????u c?? th??? chuy???n h?????ng component t???i th???i ??i???m n??y.
// Tuy nhi??n th?? 3 hook n??y s??? ???????c g???i ??? c??c th???i ??i???m kh??c nhau:

// beforeRouteEnter: ???????c g???i tr?????c khi m?? ??i???u h?????ng ???????c x??c nh???n.
// ??? ????y b???n kh??ng th??? truy c???p v??o con tr??? this c???a Vue, v?? n?? ???????c ch???y tr?????c khi m?? component ???????c kh???i t???o.
// beforeRouteUpdate: ???????c g???i khi m?? router ???? ???????c thay ?????i v?? ch??ng ta s??? d???ng l???i Component ch??ng ta ?????nh ngh??a ra beforeRouteUpdate.
// beforeRouteLeave: ???????c g???i tr?????c khi m?? ch??ng ra chuy???n h?????ng ra kh???i component t???i m???t Route kh??c.

// // D???NG 1 ROUTER
// import { createRouter, createWebHistory } from 'vue-router';
// const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//         { path: '/', redirect: '/teams' },
//         {
//             path: '/permission',
//             alias: ['/home', 'list'],
//             component: { helper: Layout, default: UserProfile, },
//             redirect: '/permission/page',  // OR redirect: noredirect
//             alwaysShow: true,
//             hidden: false, // OR hidden: true
//             name: 'Permission',
//             beforeEnter(to, from, next) {
//                 console.log('users beforeEnter');
//                 console.log(to, from);
//                 next();
//             },
//             meta: {
//                 title: 'Permission',
//                 icon: 'lock',
//                 roles: ['admin', 'editor'],
//                 permissions: ['view menu zip', 'manage user'],
//                 noCache: true,
//                 breadcrumb: false,
//             },
//             children: [
//                 {
//                     path: 'page',
//                     alias: '/home',
//                     component: () => import('@/views/permission/page'),
//                     name: 'PagePermission',
//                     meta: {
//                         title: 'Page Permission',
//                         roles: ['admin']
//                     }
//                 },
//                 {
//                     path: 'directive',
//                     component: () => import('@/views/permission/directive'),
//                     name: 'DirectivePermission',
//                     meta: {
//                         title: 'Directive Permission'
//                     }
//                 },
//             ]
//         },
//         { path: '/:notFound(.*)', component: NotFound }
//     ],
//     linkActiveClass: 'active',
//     scrollBehavior(_, _2, savedPosition) {
//         if (savedPosition) {
//             return savedPosition;
//         }
//         return { left: 0, top: 0 };
//     }
// });

// router.beforeEach(function (to, from, next) {
//     if (to.meta.needsAuth) {
//         next();
//     } else {
//         next();
//     }
// });

// router.afterEach(function (to, from) {
// });
// router.beforeResolve((to, from, next) => {
// })

// export default router;

