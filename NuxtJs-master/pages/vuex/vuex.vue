<template>
    <div>
        <h1 style="color:red">client parent <b>client.vue</b></h1>
        <ul>
            <li>
                <nuxt-link active-class="active" exact-active-class="exact" to="/vuex"> vuex page</nuxt-link>
            </li>
            <li>
                <nuxt-link active-class="active" exact-active-class="exact" to="/vuex/10"> vuex id</nuxt-link>
            </li>
            <li>
                <nuxt-link active-class="active" exact-active-class="exact" to="/vuex/10/setting"> vuex setting
                </nuxt-link>
            </li>
        </ul>
        <nuxt-child />
    </div>
</template>

<script>
export default {
    layout:'client',
    head: {
    title: 'vuex page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Home page description'
      }
    ],
  }
}
</script>

<style>

</style>