<template>
  <div>
    <h2>
         userName === this.$route.params.userName == {{this.$route.params.userName}} <br>
         userID === this.$route.params.userID == {{this.$route.params.userID}}
    </h2>
    <button v-on:click="()=>handleBack(this.$router.go(-1))">BACK</button>
  </div>
</template>

<script>
export default {
    mounted(){
    // console.log('userName',this.$route);
  }
}
</script>

<style>

</style>