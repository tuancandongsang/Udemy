<template>
  <div>
    <div id="products">
      <div class="body">
        <h3 class="text-center">Trending Products</h3>
        <p class="text-center">Top view in this week</p>
        <div class="product-list">
          <div class="container">
            <div class="row">
              <Product
                v-for="product in products"
                :key="product.id"
                :product="product"
                @showCart="showCart"
                @handleVisibleViewInfoModal="handleVisibleViewInfoModal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Cart />
  </div>

  <!-- modal view info -->
  <a-modal
    v-model:visible="isVisible"
    centered
    wrapClassName="view-info-modal"
    :footer="null"
    :title="null"
    width="60%"
  >
    <Modal :popUpProduct = "popUpProduct"></Modal>
  </a-modal>
</template>

<script lang="ts">
import "./products.scss";
import Drawer from "../drawer/Drawer.vue";
import Product from "../product/Product.vue";
import Modal from "../../components/modal/Modal.vue";
import ProductService from "@/api/ProductService";

export default {
  data() {
    return {
      isLoading: false,
      products: [],
      isVisible: false,
      popUpProduct: {},
    };
  },
  components: {
    Drawer,
    Product,
    Modal,
  },
  methods: {
    showCart(id) {
      const index = this.products.findIndex((item) => item.id === id);
      const infor = this.products[index];
      const data = {
        listImg: infor.listImg,
        id: infor.id,
        name: infor.name,
        price: infor.price,
        quantity: 1,
      };
      this.$store.commit("ADD_PRODUCT_ONE", data);
      this.$store.commit("ISVISIBLE_CART");
    },
    handleCloseDrawer(event: any) {
      this.isVisibleDrawer = false;
    },
    handleVisibleViewInfoModal(id) {
      this.isVisible = true;
      const index = this.products.findIndex((item) => item.id === id);
      const info = this.products[index];      
      const data = {
        listImg: info.listImg,
        id: info.id,
        name: info.name,
        price: info.price,
        desc: info.desc,
        quantity: 1,
      };
      this.popUpProduct = data             
    },
  },
  async created() {
    const response = await ProductService.getList(1, 8);
    this.products = response.voList;
  },
};
</script>
