<template>
  <div>
    <div class="top-bar">
      <div class="top-bar-body">
        <div class="top-bar-body_info">
          <p class="call-in">
            <img
              alt="phone-outlined"
              src="../../assets/images/phone-outline.png"
            />
          </p>
          <p class="top-bar-body_phone-number ml-8 mr-8">
            +391 (0)35 2568 4593
          </p>
          <p class="top-bar-email-i mr-8">
            <img alt="phone-outlined" src="../../assets/images/envelope.png" />
          </p>
          <p class="top-bar-email">velatheme@gmail.com</p>
        </div>
        <p class="top-bar-body_sale">
          Free shipping on all orders over
          <u>$79</u>
          <RouterLink to="/products">shop Now!</RouterLink>
        </p>
        <div class="top-bar-body_social">
          <ul>
            <li class="item">
              <img alt="facebook" src="../../assets/images/facebook.png" />
            </li>
            <li class="item">
              <img alt="facebook" src="../../assets/images/instagram.png" />
            </li>
            <li class="item">
              <img alt="facebook" src="../../assets/images/twitter.png" />
            </li>
            <li class="item">
              <img alt="facebook" src="../../assets/images/pinterest.png" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="navigator">
      <!-- input search -->
      <div :class="!isVisibleInputSearch ? 'search-top' : 'search-top active'">
        <div class="search-top-group">
          <input
            type="text"
            placeholder="Enter keywords to search..."
            class="search-top-group__input form-control"
            v-model="inputSearch"
          />
          <button
            class="btn-search"
            type="button"
            v-on:click="handleSearchProduct"
          >
            <img src="../../assets/images/search.png" alt="search-i" />
          </button>
        </div>
      </div>
      <button type="button" class="btn-burger" v-on:click="handleVisibleMenu">
        <span>
          <img
            src="../../assets/images/common/menu-burger.png"
            alt="btn-burger"
          />
        </span>
      </button>
      <div class="logo">
        <RouterLink to="/">
          <img src="../../assets/images/logo.png" alt="rubix" />
        </RouterLink>
      </div>
      <ul class="menus">
        <li class="menu">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="menu">
          <RouterLink to="/products">Shop</RouterLink>
        </li>
        <li class="menu">
          <RouterLink to="/collections">Collections</RouterLink>
        </li>
        <li class="menu">
          <RouterLink to="/blogs">Blogs</RouterLink>
        </li>
        <li class="menu">
          <RouterLink to="/contact">Contact Us</RouterLink>
        </li>
      </ul>
      <ul class="user">
        <li class="profile">
          <p class="account">
            <RouterLink to="/">
              <img src="../../assets/images/user.png" alt="user-i" />
            </RouterLink>
          </p>
          <p class="link" v-if="!isLogin">
            Hi <span style="font-weight: 800">{{ username }}</span
            >! <button @click="handleLogout">Logout</button>
          </p>
          <p class="link" v-else>
            <RouterLink to="/account/login" @click="handleStatusLogin('login')"
              >Login /</RouterLink
            >
            <RouterLink
              to="/account/register"
              @click="handleStatusLogin('register')"
            >
              Sign up</RouterLink
            >
          </p>
        </li>
        <button
          class="btn-search"
          type="button"
          v-on:click="handleVisibleInputSearch"
        >
          <img src="../../assets/images/search.png" alt="search-i" />
        </button>
        <button class="btn-shop-bag" type="button" @click="showCart">
          <img src="../../assets/images/shopping-bag.png" alt="shop-bag" />
          <small class="quantity">{{ qty || "o" }}</small>
        </button>
      </ul>
    </div>

    <!-- menu mobile drawer -->
    <Drawer
      :isVisible="isVisible"
      class="menu-drawer"
      title="Menu Mobile"
      width="50%"
      placement="left"
      @handleClose="handleClose"
    >
      <div id="menu-mobile">
        <div class="body">
          <div class="item">
            <RouterLink to="/">
              <p>Home</p>
            </RouterLink>
          </div>
          <div class="item">
            <RouterLink to="/">
              <p>Shop</p>
            </RouterLink>
          </div>
          <div class="item">
            <RouterLink to="/">
              <p>Collections</p>
            </RouterLink>
          </div>
          <div class="item">
            <RouterLink to="/">
              <p>Blogs</p>
            </RouterLink>
          </div>
          <div class="item">
            <RouterLink to="/"><p>Contact Us</p></RouterLink>
          </div>
          <!-- <div class="item">
            <a-collapse :bordered="false" :ghost="true">
              <a-collapse-panel key="1" header="Shop">
                <p class="nested">Nested</p>
              </a-collapse-panel>
            </a-collapse>
          </div> -->
        </div>
      </div>
    </Drawer>
    <Cart />
  </div>
</template>
<script lang="ts">
import "./header.scss";
import Drawer from "@/components/drawer/Drawer.vue";
import Cart from "@/components/cart/Cart.vue";
import { toastSuccess } from "@/utils/toast";
import {removetJwtToken, removeRefreshToken, removeUserCart, removeCheckoutLogin} from "@/utils/helpers"

export default {
  components: { Drawer, Cart },
  data() {
    return {
      isVisible: false,
      isVisibleInputSearch: false,
      inputSearch: "",
      qty: 0,
      username: "",
      isLogin: true,
    };
  },
  created() {
    this.$store.commit("CHECK_IS_LOGIN");
    this.$store.commit("CHECK_NAME");
  },
  computed: {
    username() {
      return this.$store.state.auth.username;
    },
    isLogin() {
      return this.$store.state.auth.isLogin;
    },
    qty() {
      return (this.qty = this.$store.state.cart.cart.length);
    },
  },
  methods: {
    showCart() {
      this.$store.commit("ISVISIBLE_CART");
    },
    handleStatusLogin(status) {
      this.$store.commit("STATUS_LOGIN", status);
    },
    handleLogout() {
      removeUserCart()
      removetJwtToken()
      removeRefreshToken()
      removeCheckoutLogin()
      this.$store.commit("CHECK_IS_LOGIN");
      toastSuccess("Logout Successfully");
      this.username = "";
      if (this.isLogin) {
        this.$store.commit("LOGOUT_CART");
      }
    },
    handleVisibleMenu() {
      this.isVisible = true;
    },
    handleClose() {
      this.isVisible = false;
    },
    handleVisibleInputSearch() {
      this.inputSearch = "";
      this.isVisibleInputSearch = !this.isVisibleInputSearch;
    },
    handleSearchProduct() {
      this.$router.push({
        name: "search-product",
        query: {
          q: this.inputSearch.trim(),
        },
      });
    },
  },
};
</script>
