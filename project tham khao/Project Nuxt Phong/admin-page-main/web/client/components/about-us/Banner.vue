<template>
  <section id="about-us-banner">
    <!-- <img :src="require('@/assets/images/' + banner)" alt=""> -->
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
    title: {
      type: String,
      default: "homePage.banner.title",
    },
    subtitle: {
      type: String,
      default: "homePage.banner.subtitle",
    },
    banner: {
      type: String,
      default: "banner.png",
    },
    showBtn: {
      type: Boolean,
      default: true
    }
  },
  mounted() {},
  methods: {
     gotoRegister() {
      const el = document.getElementById("register");
      if (el) {
        window.scrollTo(0, el.offsetTop);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
