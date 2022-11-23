<template>
  <div>
    <h1 style="color:red">Nested page parent</h1>
    <ul>
      <li>
        <nuxt-link active-class="active" exact-active-class="exact" to="/nested"> nested page</nuxt-link>
      </li>
      <li>
        <nuxt-link active-class="active" exact-active-class="exact" to="/nested/20"> nested id và Validate</nuxt-link>
      </li>
      <li>
        <nuxt-link active-class="active" exact-active-class="exact" to="/nested/setting"> nested setting active-class
        </nuxt-link>
      </li>
    </ul>
    <nuxt-child />
    <button
      style=" padding: 8px 12px; background-color: antiquewhite; border: none; border-radius: 4px; cursor: pointer;"
      v-on:click="() => handleBack(this.$router.go(-1))">BACK</button>

  </div>
</template>

<script>
export default {
  validate(context) {
    // if(!Number(context.params.userId)){
    //   return false
    // }
    // console.log(context.params);
    return true // if the params are valid
    // return false // will stop Nuxt to render the route and display the error page
  },
  layout(context) {
    // console.log("[context user.vue]", Object.keys(context));
    return context.isMobile ? 'mobile' : 'user'
    // console.log('userAgent', userAgent);
    // console.log('navigator', navigator);
    // return 'admin'
  },
 
}
</script>

<style>
.exact {
  color: red;
}
</style>