<template>
  <div class="root">
    <header class="header">{{$t("common.head")}}   Default</header>
    <div class="language">
      <SwitchLanguage />
    </div>
    <div class="container">
      <aside>
        <NuxtAside />
      </aside>
      <nuxt />

    </div>
    <button
      style=" padding: 8px 12px; background-color: antiquewhite; border: none; border-radius: 4px; cursor: pointer;"
      v-on:click="() => handleBack(this.$router.go(-1))">BACK</button>
    <footer class="footer">{{$t('common.footer')}} defaule</footer>
  </div>
</template>

<script>
import NuxtAside from '../components/NuxtAside.vue';
import SwitchLanguage from "../components/languageSelect/SwitchLanguage.vue"

export default {
  components: { NuxtAside, SwitchLanguage }
}
</script>

<style scoped>
.language{
  position: fixed;
  top: 20px;
  left: 20px;

}
.container {
  display: flex;
}

aside {
  margin-right: 50px;
  background-color: tan;
  padding-right: 60px;
}

.footer,
.header {
  background-color: antiquewhite;
  padding: 20px 0;
  font-size: 2rem;
  font-weight: 900px;
  text-align: center;
}
</style>