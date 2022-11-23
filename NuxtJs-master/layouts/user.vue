<template>
  <div>
    <header class="header">header user</header>
    <div class="container">
      <aside>
        <NuxtAside />
        
      </aside>
    <nuxt />
    </div>
    <button
            style=" padding: 8px 12px; background-color: antiquewhite; border: none; border-radius: 4px; cursor: pointer;"
            v-on:click="() => handleBack(this.$router.go(-1))">BACK</button>
    <footer class="footer">footer user</footer>
  </div>
</template>

<script>
// import client from '../pages/client.vue'
export default {
  // components: { client },

}
</script>

<style scoped>
.container{
  display: flex;
}
aside{
  margin-right: 50px;
  background-color: tan;
  padding-right: 60px;
}
.footer, .header{
  background-color: antiquewhite;
  padding: 20px 0;
  font-size: 2rem;
  font-weight: 900px;
  text-align: center;
}
</style>