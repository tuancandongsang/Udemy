import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import { getJwtToken } from "../utils/helpers"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/account/login",
      name: "login",
      component: () => import("../pages/login-page/LoginPage.vue"),
    },
    {
      path: "/account/register",
      name: "register",
      component: () => import("../pages/login-page/LoginPage.vue"),
    },
    {
      path: "/products",
      name: "products",
      component: HomePage,
    },
    {
      path: "/product/:id",
      name: "product",
      component: () => import("../pages/product-detail/ProductDetail.vue"),
    },
    {
      path: "/search",
      name: "search-product",
      component: () => import("../pages/search-product/SearchProduct.vue"),
    },
    {
      path: "/blogs",
      name: "blogs",
      component: () => import("../pages/blogs/Blogs.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found-page",
      component: () => import("../pages/not-found-page/NotFoundPage.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../pages/contact-page/ContactUsPage.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("../pages/checkout/Checkout.vue"),
    },
    {
      path: "/collections",
      name: "collections",
      component: () => import ("../pages/collections-page/Collections.vue"),
    }
  ],
});
router.beforeResolve((to, from, next) => {
  const token = getJwtToken();
  if (token && to.path === '/account/login') {
      next({ path: "/" })
  } else {
    next()
  }
})

export default router;
