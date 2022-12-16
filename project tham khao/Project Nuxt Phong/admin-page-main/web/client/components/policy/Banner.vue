<template>
  <section id="policy-banner">
    <div
      class="banner-bg d-flex justify-center align-center"
      :style="{
        backgroundImage: `url(${require('@/assets/images/' + banner)})`,
      }"
    >
    </div>
  </section>
</template>

<script>
export default {
  name: "Banner",
  props: {
    banner: {
      type: String,
      default: "banner.png",
    },
  },
  mounted() {},
  methods: {
  },
};
</script>

<style lang="scss" scoped>

</style>
