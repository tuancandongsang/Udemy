<template>
  <div>
    <h1>nuxt-link vs nuxt-child vs Nuxt</h1>
    <p>- Tương tự như trong Vuejs, có <b>router-link</b> thì trong nuxt có <b>nuxt-link</b></p>
    <p>- <b>nuxt-child</b> ở vị trí nhằm lựa tính kế thừa của các component con ở trong file pages</p>
    <img src="../../assets/66.png" alt="">
    <p>- <b>Nuxt</b> ở phía trong <b>layout</b> và chèn các file pages vào</p>
    <img src="../../assets/7.png" alt=""> <br>
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