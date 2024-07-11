<template>
  <div class="layout">
    <div><Header /></div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header/Header.vue";
export default {
  components: { Header },
};
</script>
<style scoped>
.layout {
  display: flex;
  align-items: flex-start;
}
.container {
  padding: 20px 0;
}
</style>
