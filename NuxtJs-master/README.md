# MyProject

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).





//   path: '/permission',
//   component: Layout,
//   redirect: '/permission/page',  ====>  chuyển hướng từ  '/permission' tới '/permission/page' ...............
//   alias: '/home',   ==>> thay thế  từ path: '/permission' thành '/home' nếu truy cập vào .../home' ( chỉ là thay thế tên k phải chuyển hướng nếu cố thay permission bằng home) ( alias tên gọi khác)
//   alwaysShow: true, // will always show the root menu
//   name: 'Permission',
//   hidden: false,  ===> hidden: true luôn ẩn đi trên hiển thị ( áp dụng với trang báo lỗi), hidden: false hiển thị, mặc định là false
//   meta: {
//     title: 'Permission',  ====> tên của ul ...........................
//     icon: 'lock',   ===> icon trước tên của ul........................
//     roles: ['admin', 'editor'] // you can set roles in root nav
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
// Ở đây chúng ta sẽ định nghĩa thêm beforeEnter trong cấu trúc của Router. Việc định nghĩa này nói chúng ta biết rằng là beforeEnter sẽ được gọi tới trước khi 
// router được chuyển hướng. Tham số truyền vào của beforeEnter bao gồm 3 tham số: to, from và next. Đồng nghĩa với việc các bạn có thể hoàn toàn điều hướng router ở đây.



// const router = new VueRouter({ … });
// router.beforeEach((to, from, next) => {
// })
// router.beforeResolve((to, from, next) => {
// })
// router.afterEach((to, from) => {
// })
// Trong đó:

// beforeEach: Sẽ được gọi tới khi mà bất kì router nào của các bạn được người dùng kích hoạt. Tại đây, các bạn sẽ cần 3 tham số đầu vào là to, from và next.
// to: Chứa các thuộc tính của một Router và người dùng hướng đến (dùng chính thuộc tính ở đây để phân quyền).
// from: Chứa các thuộc tính của một Router, cho biết bạn đang ở router nào trước khi bạn chuyển hướng đi.
// next: Đây là một Function bắt buộc các bạn phải gọi để xác định chuyển hướng.
// beforeResolve: Được gọi tới trước khi mà sự điều hướng của chúng ta được xác nhận. Cũng bao gồm 3 tham số như beforeEach
// afterEach: Được gọi khi mà tất cả các logic, xử lý của chúng ta đã xong. Ở afterEach, chúng ta chỉ có 2 tham số là to và from chính vì vậy mà không thể 
// điều hướng sang một router khác ở thời điểm này.


// Component Guards – Can thiệp vào từng component trong VueJS
// Đây là mức độ nhỏ nhất cho việc các bạn can thiệp vào Router – đó là Component. Chúng ta sẽ có Options cần lưu ý ở đây:

// const Foo = {
//    template: "...",
//    beforeRouteEnter (to, from, next) {

//    },
//    beforeRouteUpdate (to, from, next) {
    
//    },
//    beforeRouteLeave (to, from, next) {
  
//    }
//  }
// Cả beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave đều có 3 tham số là to, from, next. Như vậy chúng ta đều có thể chuyển hướng component tại thời điểm này. Tuy nhiên thì 3 hook này sẽ được gọi ở các thời điểm khác nhau:

// beforeRouteEnter: Được gọi trước khi mà điều hướng được xác nhận. Ở đây bạn không thể truy cập vào con trỏ this của Vue, vì nó được chạy trước khi mà component được khởi tạo.
// beforeRouteUpdate: Được gọi khi mà router đã được thay đổi và chúng ta sẻ dụng lại Component chúng ta định nghĩa ra beforeRouteUpdate.
// beforeRouteLeave: Được gọi trước khi mà chúng ra chuyển hướng ra khỏi component tới một Route khác.

