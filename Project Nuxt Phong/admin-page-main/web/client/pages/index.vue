<template>
  <div id="wrap-main">
    <banner
    />
    <features
    />
    <roadmap/>
    <tools/>
    <customer/>
    <base-customer-story/>
    <news-story/>
    <register/>
  </div>
</template>

<script>
import AOS from 'aos';
import Banner from '~/components/Banner';
import Customer from '~/components/Customer';
import 'aos/dist/aos.css';

export default {
  head: {
    title: 'MDO - Nền tảng chuyển đổi số doanh nghiệp'
  },
  components: {
    Banner,
    Customer
  },
  mounted() {
    AOS.init(
        {
          offset: 0
        });
    window.scroll(0, 5);
  },
  data() {
    return {
      titleBanner: 'homePage.banner.title',
      subTitleBanner: 'homePage.banner.subtitle'
    };
  },
  methods: {}
};
</script>
