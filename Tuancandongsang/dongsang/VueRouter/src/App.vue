<template>
      <router-view></router-view>
</template>

<script>

import data from './mixins/data.js';

export default {
  components: {
  },
  mixins: [data],
  provide() {
    return {
      teams: this.teams,
      users: this.users,
    };
  },
  created() { },
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