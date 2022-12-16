<template>
  <div class="modal-body">
    <div class="container">
      <div class="row">
        <div class="col-xxl-4 col-xl-4 col-lg-4">
          <div class="img-box">
            <a-carousel arrows dots-class="slick-dots slick-thumb">
              <template #customPaging="props">
                <a>
                  <img :src="getImgUrl(props.i)" />
                </a>
              </template>
              <div v-for="item in this.popUpProduct.listImg.length" :key="item">
                <RouterLink :to="'/product/' + popUpProduct.id">
                  <img :src="getImgUrl(item - 1)" />
                </RouterLink>
              </div>
            </a-carousel>
          </div>
        </div>
        <div class="col-xxl-8 col-xl-8 col-lg-8">
          <div class="info-detail">
            <RouterLink :to="'/product/' + popUpProduct.id"
              ><h3 class="product-title">
                {{ popUpProduct.name }}
              </h3></RouterLink
            >
            <p>
              {{ popUpProduct.desc }}
            </p>
            <p class="price">{{ price }}</p>
            <div class="add-cart">
              <div class="quantity">
                <button @click="handleDiminishQty">-</button>
                <p>{{ quantity }}</p>
                <button @click="handleInscreQty">+</button>
              </div>
              <button
                class="btn-add-to-cart"
                @click="showCart(popUpProduct.id)"
              >
                Add To Cart
              </button>
            </div>
            <p class="availability">Availability: <span>In stock</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Cart />
</template>

<script>
import "./modal.scss";
import { formatNumber } from "../../utils/common";
import Drawer from "../../components/drawer/Drawer.vue";
import Cart from "../../components/cart/Cart.vue";
export default {
  data() {
    const baseUrl = "http://localhost:8081/api/image/downloadFile/";
    const getImgUrl = (i) => {
      const img = this.popUpProduct.listImg[i].url;
      return `${baseUrl}${img}`;
    };
    return {
      baseUrl,
      getImgUrl,
      isVisibleDrawer: false,
      quantity: 1,
    };
  },
  props: {
    popUpProduct: Object,
  },
  components: {
    Drawer,
    Cart,
  },
  beforeUpdate() {
    return this.quantity == 1;
  },

  computed: {
    price() {
      return formatNumber(this.popUpProduct.price);
    },
    quantity() {
      if (this.quantity < 1) {
        return (this.quantity = 1);
      }
      return this.quantity;
    },
  },
  methods: {
    handleInscreQty() {
      this.quantity += 1;
    },
    handleDiminishQty() {
      this.quantity -= 1;
    },
    showCart(id) {
      const info = this.popUpProduct;
      const data = {
        listImg: info.listImg,
        id: info.id,
        name: info.name,
        price: info.price,
        quantity: this.quantity,
      };
      this.$store.commit("ADD_PRODUCT_DETAIL", {
        id: id,
        data: data,
      });
      this.$store.commit("ISVISIBLE_CART");
    },
    handleCloseDrawer() {
      this.isVisibleDrawer = false;
    },
  },
};
</script>

<style scoped>
/* For demo */
.ant-carousel :deep(.slick-dots) {
  position: relative;
  height: auto;
}
.ant-carousel :deep(.slick-slide img) {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
}
.ant-carousel :deep(.slick-arrow) {
  display: none !important;
}
.ant-carousel :deep(.slick-thumb) {
  bottom: 0px;
}
.ant-carousel :deep(.slick-thumb li) {
  width: 60px;
  height: 45px;
}
.ant-carousel :deep(.slick-thumb li img) {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
  display: block;
}
.ant-carousel :deep .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>
