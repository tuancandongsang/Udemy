<template>
  <div>
    <h2>client id = {{ $route.params.vuex }}</h2>
    <h1>{{ counter }}</h1>
    <button v-on:click="handleClick">click me</button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  computed: {
    ...mapState({
      counter: (state) => state.counter,
    }),
  },
  mounted() {
    setTimeout(() => {
      this.$notify({
        group: "foo",
        title: "Important message",
        text: "Hello user! This is a notification!",
      });
      console.log(this.$abc);
    }, 1000);
  },
  created() {
    // console.log(this.$route.params.vuex);
  },
  data() {
    return {
      tittle: "client ID",
      description: "hom nay la ngay ram, con chau den choi",
    };
  },
  head() {
    return {
      title: this.tittle,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: this.description },
        { name: "format-detection", content: "telephone=no" },
      ],
    };
  },
  methods: {
    ...mapActions(["increment"]),
    handleClick() {
      this.increment();
    },
  },
};
</script>

<style>
</style>