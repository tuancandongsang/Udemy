<template>
  <div id="home-page">
    <SlideShow />
    <Products />
  </div>
</template>

<script lang="ts">
import Products from "@/components/products/Products.vue";
import SlideShow from "@/components/slide-show/SlideShow.vue";

export default {
  components: {
    SlideShow,
    Products,
  },

};
</script>