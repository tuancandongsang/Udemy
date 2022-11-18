<template>
  <div id="wrap-main" class="landing2 landing">
    <landing-banner-register2/>
    <landing-process/>
    <landing-benefit/>
    <landing-base2/>
    <landing-apply/>
    <landing-why-choose/>
    <customer/>
    <base-customer-story/>
    <landing-register-1/>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  layout: 'landing',
  head: {
    title: 'Hợp đồng điện tử - Ký hợp đồng mọi lúc mọi nơi',
    meta: [
      {
        name: 'title',
        content: 'MDO Hợp đồng điện tử - Ký hợp đồng mọi lúc mọi nơi'
      },
      {
        name: 'description',
        content:
            'Ký mọi lúc, mọi nơi. Đáp ứng được sự tiện lợi, nhanh chóng, minh bạch khi ký hợp đồng từ xa. Áp dụng với mọi loại tài liệu/ giao dịch/ hợp đồng điện tử'
      }
    ]
  },
  mounted() {
    AOS.init({
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
