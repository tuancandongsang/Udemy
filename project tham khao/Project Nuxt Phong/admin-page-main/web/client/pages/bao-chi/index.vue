<template>
  <div id="wrap-main">
    <news-feature />
    <news-top-post />
    <news-list-post />
  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
export default {
  head: {
    title: "Báo chí nói về chúng tôi - mdo.com.vn",
    meta: [
      {
        name: "title",
        content: "MDO - Báo chí nói về chúng tôi - mdo.com.vn",
      },
      {
        name: "description",
        content:
          "MDO Báo chí - Nơi chia sẻ những thông tin báo chí nói về chúng tôi với cái nhìn khách quan nhất",
      },
    ],
  },
  mounted() {
    AOS.init({
      offset: 0,
    });
    window.scroll(0, 5);
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
