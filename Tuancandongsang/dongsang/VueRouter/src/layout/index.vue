<template>
  <div class="container">
    <!-- hiển thị menu sidebar bên trái  -->
    <sidebar class="sidebar-container"/>
    <!-- hiển thị cả màn hình bên phải -->
    <div class="container-right">
      <div>
        <!-- hiển thị thanh nav bên trên  -->
        <navbar />
        <!-- hiển thị thanh bảng trọn bên dưới  -->
        <tagsview />
        <!-- <h1>tags-view</h1> -->
      </div>
      <!-- hiển thị app bên dưới  -->
      <appmain />
      <!-- hiển thị cài đặt -->
      <settings />
      <Footer />
    </div>
  </div>
</template>

<script>
import {
  Footer,
  appmain,
  settings,
  navbar,
  tagsview,
  sidebar,
} from './components/index';
export default {
  name: 'Layout',
  components: { appmain, settings, navbar, tagsview, sidebar, Footer },
};
</script>

<style lang="scss" scoped>
</style>