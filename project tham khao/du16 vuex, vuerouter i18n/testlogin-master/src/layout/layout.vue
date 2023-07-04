<template>
  <div class="layout">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue';
export default {
    components:{Header}
}
</script>

<style>
.layout{
   height: 90vh;
}
</style>