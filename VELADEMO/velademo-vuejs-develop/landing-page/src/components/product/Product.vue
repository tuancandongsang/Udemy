<template>
  <div class="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-6">
    <div class="product">
      <div class="action">
        <button
          class="btn btn-add-cart"
          v-on:click="$emit('showCart', product.id)"
        >
          <span>
            <img src="../../assets/images/shopping-bag-16.png" alt="add-cart" />
          </span>
        </button>
        <button
          class="btn btn-view display-none-990px"
          v-on:click="$emit('handleVisibleViewInfoModal', product.id)"
        >
          <span>
            <img src="../../assets/images/search-b-16.png" alt="add-cart" />
          </span>
        </button>
      </div>
      <RouterLink :to="'/product/' + product.id">
        <div class="image">
          <img v-bind:src="urlImg + product.listImg[0]?.url" alt="product" />
        </div>
      </RouterLink>
      <RouterLink :to="'/product/' + product.id">
        <h6 class="name">{{ product.name }}</h6>
      </RouterLink>
      <p class="price">${{ product.price }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import "./product.scss";
export default {
  props: {
    product: Object,
  },
  data() {
    return {
      urlImg:'http://localhost:8081/api/image/downloadFile/'
    };
  },
};
</script>