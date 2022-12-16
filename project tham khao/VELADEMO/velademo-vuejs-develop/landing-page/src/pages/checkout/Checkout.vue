<template>
  <div id="checkout">
    <div class="shopping">
      <router-link to="/">
        <img
          src="https://cdn.shopify.com/s/files/1/0376/9440/6700/files/logo.png?6007"
          alt=""
          class="shopping-img"
      /></router-link>
      <div class="shopping-contact">
        <div class="shopping-contact-infor">Contact information</div>
      </div>
      <div>
        <a-input
          :value="useremail"
          placeholder="My email..."
          class="shopping-input"
        />
      </div>
      <div class="shopping-Shipping">Shipping address</div>
      <div>
        <a-input
          placeholder="Phone number"
          class="shopping-input"
          type="number"
          v-model:value="phoneNumber"
          @keyup="validatePhoneNumber"
        />
        <p class="shopping-requid" v-if="!isValidatePhoneNumber">required</p>
        <div class="shopping-container">
          <a-form-item>
            <a-input
              style="padding-right: 50px"
              placeholder="First name"
              class="shopping-input"
              v-model:value="firstName"
              @keyup="validateFirstName"
            />
            <a-form-item>
              <p class="shopping-requid" v-if="!isValidateFirstName">required</p>
            </a-form-item>
          </a-form-item>
          <a-form-item>
            <a-input
              style="margin-left: 20px"
              placeholder="Last name"
              class="shopping-input"
              v-model:value="lastName"
              @keyup="validateLastName"
            />
            <a-form-item style="margin-left: 20px">
              <p class="shopping-requid" v-if="!isValidateLastName">required</p>
            </a-form-item>
          </a-form-item>
        </div>
        <a-input
          v-model:value="address"
          @keyup="validateAddress"
          placeholder="Address"
          class="shopping-input"
        />
        <p class="shopping-requid" v-if="!isValidateAddress">required</p>
        <a-input
          v-model:value="apartment"
          @keyup="validateApartment"
          placeholder="Message to the shop..."
          class="shopping-input"
        />
        <p class="shopping-requid" v-if="!isValidateApartment">required</p>
      </div>
      <div class="shopping-continue">
        <div class="shopping-continue-return" @click="handleBack">
          <span class="shopping-continue-return_arrow">
            <left-outlined />
          </span>
          return to cart
        </div>
        <!-- <div class="shopping-continue-to">Continue to shipping</div> -->
        <div class="shopping-continue-to" @click="handleSubmit">
          <a-space>
            <a-button
              type="primary"
              :loading="iconLoading"
              class="shopping-continue-to-buy"
              >Buying</a-button
            >
          </a-space>
        </div>
      </div>
    </div>
    <div class="cart">
      <div class="cart-box">
        <ul class="cart-box-product">
          <li class="cart-box-product-list" v-for="item in products" :key="id">
            <div class="cart-box-product-list-img">
              <img :src="urlImg + item.listImg[0].url" alt="" />
              <span>{{ item.quantity }}</span>
            </div>
            <p class="cart-box-product-list-name">{{ item.name }}</p>
            <p class="cart-box-product-list-price">{{ item.price }} $</p>
          </li>
        </ul>
      </div>
      <div class="cart-total">
        <p class="cart-total-title">Total</p>
        <p class="cart-total-price">{{ totalCoin }} $</p>
      </div>
    </div>
  </div>
</template>
<script>
import "./checkout.scss";
import { RightOutlined, LeftOutlined } from "@ant-design/icons-vue";
import { getUserCart } from "@/utils/helpers";
import { PoweroffOutlined } from "@ant-design/icons-vue";
import { toastSuccess } from "@/utils/toast";
export default {
  data() {
    return {
      urlImg:'http://localhost:8081/api/image/downloadFile/',
      useremail: getUserCart(),
      products: [],
      iconLoading: false,
      cartEmpty: [],
      phoneNumber: "",
      isValidatePhoneNumber: true,
      firstName: "",
      isValidateFirstName: true,
      lastName: "",
      isValidateLastName: true,
      address: "",
      isValidateAddress: true,
      apartment: "",
      isValidateApartment: true,
    };
  },
  created() {
    this.products = this.$store.state.cart.cart;
  },
  computed: {
    products() {
      return this.$store.state.cart.cart;
    },
    totalCoin() {
      const total = this.products.map((item) => item.quantity * item.price);
      return total
        .reduce((total, currentValue) => {
          return total + currentValue;
        }, 0)
        .toFixed(2);
    },
  },
  watch: {
    phoneNumber() {
      if (this.phoneNumber.length > 10) {
        this.phoneNumber = this.phoneNumber.substring(0, 10);
      }
    },
  },
  methods: {
    validatePhoneNumber() {
      const validationRegex = /^\d{10}$/;
      if (this.phoneNumber.match(validationRegex)) {
        this.isValidatePhoneNumber = true;
      } else {
        this.isValidatePhoneNumber = false;
      }
    },
    validateFirstName() {
      if (this.firstName === "") {
        this.isValidateFirstName = false;
      } else {
        this.isValidateFirstName = true;
      }
    },
    validateLastName() {
      if (this.lastName === "") {
        this.isValidateLastName = false;
      } else {
        this.isValidateLastName = true;
      }
    },
    validateAddress() {
      if (this.address === "") {
        this.isValidateAddress = false;
      } else {
        this.isValidateAddress = true;
      }
    },
    validateApartment() {
      if (this.apartment === "") {
        this.isValidateApartment = false;
      } else {
        this.isValidateApartment = true;
      }
    },
    handleBack() {
      this.$router.push("/");
      this.$store.commit("ISVISIBLE_CART");
    },
    handleSubmit() {
      if (this.phoneNumber === "") {
        this.isValidatePhoneNumber = false;
      }
      if (this.firstName === "") {
        this.isValidateFirstName = false;
      }
      if (this.lastName === "") {
        this.isValidateLastName = false;
      }
      if (this.address === "") {
        this.isValidateAddress = false;
      }
      if (this.apartment === "") {
        this.isValidateApartment = false;
      } else {
        this.iconLoading = true;
        setTimeout(async () => {
          toastSuccess("Buy Success");
          await this.$store.dispatch("updateCart", this.cartEmpty);
          await this.$store.dispatch("updateCartCurrent");
          this.$router.push("/");
        }, 1000);
      }
    },
  },
  components: { RightOutlined, LeftOutlined, PoweroffOutlined },
};
</script>

<style>
.ant-form-item {
  margin-bottom: 0;
}
</style>
