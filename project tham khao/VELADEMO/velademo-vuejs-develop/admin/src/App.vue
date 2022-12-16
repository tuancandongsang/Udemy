<template>
  <div style="height: 100px" v-if="
    ['home-page', 'add-product', 'product-detail', 'AddBlogs','blogs',].indexOf($route.name) > -1
  " />
  <Header v-if="
    ['home-page', 'add-product', 'product-detail', 'AddBlogs','blogs',].indexOf($route.name) > -1
  " />
  <div class="container-layout">
    <div>
      <Sidebar v-if="
        ['home-page', 'add-product', 'product-detail', 'AddBlogs','blogs',].indexOf($route.name) > -1
      " />
    </div>
    <div class="app-main">
      <RouterView />
    </div>
  </div>
  <Footer v-if="
    ['home-page', 'add-product', 'product-detail', 'AddBlogs','blogs',].indexOf($route.name) > -1
  " />
</template>

<script lang="ts">
import Header from "./layouts/header/Header.vue";
import Footer from "./layouts/footer/Footer.vue";
import Sidebar from "./layouts/Sidebar.vue"
export default {
  components: {
    Header,
    Footer,
    Sidebar,
  },
  methods: {},
  updated() { },
};
</script>
<style scoped>
.container-layout {
  display: flex;
}

.app-main {
  flex: 1;
}
</style>
