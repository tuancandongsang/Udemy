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

//   redirect: '/permission/page',  ====>  chuyển hướng từ  '/permission' tới '/permission/page' ...............
// redirect: noredirect Nếu noredirect, route này sẽ không click được

//   alias: '/home',   ==>> thay thế  từ path: '/permission' thành '/home' nếu truy cập vào .../home' ( chỉ là thay thế tên k phải chuyển hướng nếu cố thay permission bằng home) ( alias tên gọi khác)

// alwaysShow: true  ==> Khi 1 route cha có nhiều hơn 1 route con, tất cả các route con sẽ hiển thị dưới dạng nested (menu con)
// Nhưng khi 1 route cha chỉ có 1 route con, thì menu sẽ hiển thị route con thay cho route cha (menu con chỉ có 1 link, thì sẽ thay thế menu cha)
// Nếu bạn vẫn muốn hiển thị menu cha - con trong khi menu con chỉ có 1 link, thì bạn thiết lập alwaysShow: true

//   name: 'Permission',  // Tên của route, luôn luôn yêu cầu nếu không chúng ta sẽ có vấn đề với <keep-alive>.

//   hidden: false,  ===> hidden: true ẩn đi trên hiển thị ( áp dụng với trang báo lỗi), hidden: false hiển thị, mặc định là false

//   meta: {
//     title: 'Permission',  ====> tên của ul (Tên xuất hiện trên layout (ở Sidebar, Breadcrumbs,...))
//     icon: 'lock',   ===> icon trước tên của ul........................
//     roles: ['admin', 'editor']  // Nhóm người dùng được phép truy cập vào route này, nếu không thiết lập, tất cả các nhóm đều truy cập được
//     permissions: ['view menu zip', 'manage user'], ==>> Quyền hạn để được phép truy cập vào route này, nếu không thiết lập, tất cả người dùng đề truy cập được
//     noCache: true  ===>>> Nếu là true, route này sẽ không được "cache" bởi <keep-alive>. Mặc định là false (tất cã route đểu được cache)
//     breadcrumb: false   ==>> Nếu là false, route này sẽ không xuất hiện ở breadcrumb (mặc định là true)
//   },
//   children: [
//     {
//       path: '/page',  ===> sẽ được cộng gộp với router cha thành '/permission/page'....................
//       alias: '/home', ===> cũ là thay thế '/permission/page' thành    ..."/permission/home" ........................
//       component: () => import('@/views/permission/page'),
//       name: 'PagePermission',
//       meta: {
//         title: 'Page Permission',  ===>> tên của li ............................
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     },
//     {
//       path: 'directive',
//       component: {
//       default: UserProfile,  ===>  component con mặc định ......................
//       helper: UserProfilePreview  ===> component con có thể thêm phụ trợ vào component default ....................
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

// linkActiveClass: 'active', ==>> với các link đc click sẽ có thêm class là active

// scrollBehavior(to, from, savedPosition) {
//     // console.log(to, from, savedPosition);
//     if (savedPosition) {
//       return savedPosition;
//     }
//     return { left: 0, top: 0 };
//   }
// scrollBehavior  ==>> giúp bảo lưu vị trí scoll trình duyệt

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
// Ở đây chúng ta sẽ định nghĩa thêm beforeEnter trong cấu trúc của Router.
// Việc định nghĩa này nói chúng ta biết rằng là beforeEnter sẽ được gọi tới trước khi
// router được chuyển hướng. Tham số truyền vào của beforeEnter bao gồm 3 tham số: to, from và next.
//  Đồng nghĩa với việc các bạn có thể hoàn toàn điều hướng router ở đây.

// const router = new VueRouter({ … });
// router.beforeEach((to, from, next) => {
// })
// router.beforeResolve((to, from, next) => {
// })
// router.afterEach((to, from) => {
// })
// Trong đó:

// beforeEach: Sẽ được gọi tới khi mà bất kì router nào của các bạn được người dùng kích hoạt.
//  Tại đây, các bạn sẽ cần 3 tham số đầu vào là to, from và next.
// to: Chứa các thuộc tính của một Router và người dùng hướng đến (dùng chính thuộc tính ở đây để phân quyền).
// from: Chứa các thuộc tính của một Router, cho biết bạn đang ở router nào trước khi bạn chuyển hướng đi.
// next: Đây là một Function bắt buộc các bạn phải gọi để xác định chuyển hướng.
// beforeResolve: Được gọi tới trước khi mà sự điều hướng của chúng ta được xác nhận.
// Cũng bao gồm 3 tham số như beforeEach
// afterEach: Được gọi khi mà tất cả các logic, xử lý của chúng ta đã xong.
// Ở afterEach, chúng ta chỉ có 2 tham số là to và from chính vì vậy mà không thể
// điều hướng sang một router khác ở thời điểm này.

// Component Guards – Can thiệp vào từng component trong VueJS
// Đây là mức độ nhỏ nhất cho việc các bạn can thiệp vào Router – đó là Component.
//  Chúng ta sẽ có Options cần lưu ý ở đây:

// const Foo = {
//    template: "...",
//    beforeRouteEnter (to, from, next) {

//    },
//    beforeRouteUpdate (to, from, next) {

//    },
//    beforeRouteLeave (to, from, next) {

//    }
//  }
// Cả beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave đều có 3 tham số là to, from, next.
// Như vậy chúng ta đều có thể chuyển hướng component tại thời điểm này.
// Tuy nhiên thì 3 hook này sẽ được gọi ở các thời điểm khác nhau:

// beforeRouteEnter: Được gọi trước khi mà điều hướng được xác nhận.
// Ở đây bạn không thể truy cập vào con trỏ this của Vue, vì nó được chạy trước khi mà component được khởi tạo.
// beforeRouteUpdate: Được gọi khi mà router đã được thay đổi và chúng ta sẻ dụng lại Component chúng ta định nghĩa ra beforeRouteUpdate.
// beforeRouteLeave: Được gọi trước khi mà chúng ra chuyển hướng ra khỏi component tới một Route khác.

// // DỰNG 1 ROUTER
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

