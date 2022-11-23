<template>
  <div>
    user ID = $route.params.userID = {{ $route.params.userID }}
    <p>this.$route.params.userID = ???</p>

    <ul>
      <li>
        <nuxt-link :to=a>.../routing/1/setting</nuxt-link>
      </li>
      <li>
        <nuxt-link :to=b>.../routing/2/setting</nuxt-link>
      </li>
      <li>
        <nuxt-link :to=c>.../routing/3/setting</nuxt-link>
      </li>
      <li>
        <nuxt-link :to=d>.../routing/4/setting</nuxt-link>
      </li>
    </ul>
    <button v-on:click="()=>handleBack(this.$router.go(-1))">BACK</button>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.$route.params.userID);
  },
  data() {
    return {
      a: "/routing/1/setting",
      b: "/routing/2/setting",
      c: "/routing/3/setting",
      d: "/routing/4/setting"
    }
  },
}
</script>

<style>

</style>