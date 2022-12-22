<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'appmain',
};
</script>

<style>
.app-main {
  /* 50= navbar  50  */
  /* min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden; */
}
</style>