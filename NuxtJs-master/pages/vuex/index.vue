<template>
  <div>
    <h1>vuex child <b>index.vue </b></h1>
    <ul>
      <li>
        <nuxt-link
          active-class="active"
          exact-active-class="exact"
          to="/vuex"
        >
        vuex page</nuxt-link
        >
      </li>
      <li>
        <nuxt-link
          active-class="active"
          exact-active-class="exact"
          to="/vuex/10"
        >
        vuex id</nuxt-link
        >
      </li>
      <li>
        <nuxt-link
          active-class="active"
          exact-active-class="exact"
          to="/vuex/10/setting"
        >
        vuex setting
        </nuxt-link>
      </li>
    </ul>
    <div>
      <nuxt-child />
    </div>
    <ul>
      <li>{{ posts }}</li>
    </ul>
    <button v-on:click="handleAdd">add item</button>
    <h3>{{ name }}</h3>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      posts: (state) => state.post.post,
      name: (state) => state.name,
    }),
  },
  methods: {
    ...mapActions({
      actaddPosts: "post/actaddPosts",
    }),
    handleAdd() {
      this.actaddPosts("tuancan");
    },
  },
};
</script>

<style>
</style>