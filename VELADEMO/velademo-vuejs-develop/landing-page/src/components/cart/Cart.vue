<template>
  <a-drawer class="view-cart-drawer" title="Shopping Cart" placement="right" v-model:visible="visible"
    @close="handleCloseCart">
    <div id="view-cart">
      <div class="products">
        <div class="item" v-for="product in cart" :key="product.id">
          <div class="info">
            <div class="img">
              <RouterLink :to="'/product/' + product.id">
                <img :src="urlImg+ product?.listImg[0]?.url" alt="product-img" />
              </RouterLink>
            </div>
            <div class="order">
              <RouterLink :to="'/product/' + product.id">
                <h5>{{ product.name }}</h5>
              </RouterLink>
              <p>$ {{ product.price }}</p>
              <div class="action">
                <button class="btn btn-increment" @click="handleDiminishQty(product.id)">
                  -
                </button>
                <p class="quantity">{{ product.quantity }}</p>
                <button class="btn btn-increment" @click="handleInscreQty(product.id)">
                  +
                </button>
              </div>
            </div>
          </div>
          <button class="btn-remove" @click="handleDelete(product.id)">
            X
          </button>
        </div>
      </div>
      <div class="total-price">
        <p>Subtotal</p>
        <h5>${{ totalCoin }}</h5>
      </div>
      <p class="privacy">
        Shipping, taxes, and discounts will be calculated at checkout.
      </p>
      <button class="btn-view-cart" @click="handleCheckout">
        Check Out
      </button>
    </div>
  </a-drawer>
</template>
<script lang="ts">
import "./cart.scss";
import { toastError } from "@/utils/toast"
import { formatNumber, reduceArr } from "../../utils/common"
import { setCheckoutLogin } from '../../utils/helpers'

export default {
  name: "Cart",
  data() {
    return {
      visible: false,
      quantity: 1,
      cart: [],
      urlImg:'http://localhost:8081/api/image/downloadFile/'
    };
  },
  methods: {
    handleCloseCart() {
      this.$store.commit("CLOSE_CART");
    },
    handleDelete(id) {
      this.$store.commit("DELETE_ITEM_CART", id);
    },
    handleInscreQty(id) {
      const index = this.cart.findIndex((item) => item.id == id);
      this.cart[index].quantity = this.cart[index].quantity + 1;
    },
    handleDiminishQty(id) {
      const index = this.cart.findIndex((item) => item.id == id);
      if (this.cart[index].quantity <= 1) {
        return (this.cart[index].quantity = 1);
      }
      this.cart[index].quantity = this.cart[index].quantity - 1;
    },
    async handleCheckout() {
      this.$store.commit('PATH', this.$route.path)
      if (this.cart.length === 0) {
        toastError('Cart empty!')
      } else if (this.$store.state.auth.isLogin) {
        this.$store.commit('UPDATE_CART_NOTLOGIN', this.cart)
        this.$router.push({
          name: "login",
        });
        setCheckoutLogin("true")
      }
      else {
        await this.$store.dispatch("updateCart", this.cart);
        await this.$store.dispatch("updateCartCurrent");
        this.$router.push("/checkout");
        this.handleCloseCart();
      }
    },
  },
  computed: {
    totalCoin() {
      const total = this.cart.map((item) => item.quantity * item.price);
      const number = reduceArr(total)
      return formatNumber(number);
    },
    visible() {
      return this.$store.state.cart.visibleCart;
    },
    quantity() {
      if (this.quantity < 1) {
        return (this.quantity = 1);
      }
      return this.quantity;
    },
    cart() {
      return (this.cart = this.$store.state.cart.cart);
    },
  },
  created() {
    this.cart = this.$store.state.cart.cart
  },
};
</script>
