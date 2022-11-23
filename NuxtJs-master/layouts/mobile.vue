<template>
  <div class="root-mobile">
    <header style="color:black"><h1> header mobile</h1></header>
    <button
            style=" padding: 8px 12px; background-color: antiquewhite; border: none; border-radius: 4px; cursor: pointer;"
            v-on:click="() => handleBack(this.$router.go(-1))">BACK</button>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>