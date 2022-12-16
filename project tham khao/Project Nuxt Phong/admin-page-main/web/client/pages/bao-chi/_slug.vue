<template>
  <div id="wrap-main">
    <blog-header />
    <v-container>
      <div class="row my-5">
        <div class="col-12">
          <news-detail :slug="slug" />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
export default {
  mounted() {
    AOS.init({
      offset: 0,
    });
    window.scroll(0, 5);
  },
  data() {
    return {
      slug: "",
    };
  },
  created() {
    this.slug = this.$route.params.slug;
  },
  methods: {},
};
</script>
