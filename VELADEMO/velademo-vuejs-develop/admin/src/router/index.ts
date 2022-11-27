import {getJwtToken } from '../utils/helpers'
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home-page",
      component: () => import("@/pages/HomePage.vue"),
    },
    {
      path: "/login",
      name: "login-page",
      component: () => import("@/pages/login/LoginPage.vue"),
    },
    {
      path: "/blogs",
      name: "blogs",
      component: () => import("@/pages/blogs/Blogs.vue"),
    },
    {
      path: "/add-blogs",
      name: "AddBlogs",
      component: () => import("@/pages/blogs/addBlogs/AddBlogs.vue"),
    },
    {
      path: "/add-product",
      name: "add-product",
      component: () => import("@/pages/products/add-product/AddProduct.vue"),
    },
    {
      path: "/product/:id",
      name: "product-detail",
      component: () => import("@/pages/product-detail/ProductDetail.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found-page",
      component: () => import("../pages/not-found-page/NotFoundPage.vue"),
    }
  ],
});
router.beforeEach((to, from, next) =>{
  const token = getJwtToken();
  if(!token && to.path !== '/login'){
    next({path: "/login"})
  } if(token && to.path === '/login'){
    next(from.path)
  }else{
    next()
  }
})

export default router;
