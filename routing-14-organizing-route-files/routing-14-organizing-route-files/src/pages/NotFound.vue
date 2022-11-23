<template>
  <div>
    <h2>
      Page not found! Maybe view our
      <router-link to="/teams">Teams</router-link>?
    </h2>
  </div>
</template>
<script>
export default {
  props: ['notFound'],
  created() {
    console.log("tuancan", this.notFound);
  }
}
</script>