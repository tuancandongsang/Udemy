<template>
  <v-app dark>
    <v-container class="d-flex align-center justify-center fill-height">
      <div class="text-center">
        <h1 class="primary--text display-4">404</h1>
        <NuxtLink to="/"> Quay lại trang chủ </NuxtLink>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
