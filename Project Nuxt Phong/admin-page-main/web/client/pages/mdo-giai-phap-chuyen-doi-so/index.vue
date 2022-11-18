<template>
  <div id="wrap-main" class="landing">
    <landing-banner-register />
    <landing-base />
    <landing-solution />
    <landing-why-choose />
    <customer />
    <base-customer-story />
     <landing-register-2 />
  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
export default {
    layout: "landing",
    head: {
    title: "Nền tảng chuyển đổi số doanh nghiệp",
    meta: [
      {
        name: "title",
        content:
          "MDO - Nền tảng chuyển đổi số doanh nghiệp",
      },
      {
        name: "description",
        content: "MDO là giải pháp chuyển đổi số cho doanh nghiệp, giúp doanh nghiệp trở nên khác biệt trong vận hành, tối ưu nguồn lực và đạt được mục tiêu kinh doanh.",
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
    return {
      titleBanner: "homePage.banner.title",
      subTitleBanner: "homePage.banner.subtitle",
    };
  },
  methods: {},
};
</script>
