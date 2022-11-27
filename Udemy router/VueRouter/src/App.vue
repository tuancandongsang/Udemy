<template>
  <the-navigation></the-navigation>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <router-view name="footer"></router-view>
  </footer>
</template>

<script>
import TheNavigation from './components/nav/TheNavigation.vue';
import data from './mixins/data.js';

export default {
  components: {
    TheNavigation,
  },
  mixins: [data],
  provide() {
    return {
      teams: this.teams,
      users: this.users,
    };
  },
  created() {},
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>