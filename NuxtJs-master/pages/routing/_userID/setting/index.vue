<template>
  
 <div>
  <h1>setting .vue  userID ===  {{this.$route.params.userID}}</h1>
  <ul>
  <li><nuxt-link to="/routing/1/setting/tuan">.../routing/1/setting/tuan</nuxt-link></li>
  <li><nuxt-link to="/routing/2/setting/herry">.../routing/2/setting/herry</nuxt-link></li>
  <li><nuxt-link to="/routing/3/setting/maria">.../routing/3/setting/maria</nuxt-link></li>
  <li><nuxt-link to="/routing/4/setting/tony">.../routing/4/setting/tony</nuxt-link></li>
  </ul>
  <button v-on:click="()=>handleBack(this.$router.go(-1))">BACK</button>
 </div>
  
</template>

<script>
export default {
  mounted(){
    // console.log('tiuanc',this.$route);
  }
}
</script>

<style>

</style>