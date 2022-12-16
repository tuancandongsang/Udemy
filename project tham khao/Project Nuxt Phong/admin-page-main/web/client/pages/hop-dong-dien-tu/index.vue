<template>
  <div id="wrap-main">
    <banner :title="titleBanner" :subtitle="subTitleBanner" :banner="banner" :alt-s-tr="altSTr"/>
    <base-customer/>
    <econtract-features/>
    <econtract-why-choose/>
    <econtract-register/>
    <base-customer-story/>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
import Banner from '@/components/Banner';

export default {
  components: {
    Banner
  },
  head: {
    title: 'Hợp đồng điện tử',
    meta: [
      {
        name: 'title',
        content:
            'MDO Hợp đồng điện tử - Ký hợp đồng mọi lúc mọi nơi'
      },
      {
        name: 'description',
        content: 'Ký mọi lúc, mọi nơi. Đáp ứng được sự tiện lợi, nhanh chóng, minh bạch khi ký hợp đồng từ xa. Áp dụng với mọi loại tài liệu/ giao dịch/ hợp đồng điện tử'
      }
    ]
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
      titleBanner: 'Ứng dụng Hợp đồng điện tử',
      subTitleBanner: 'Ký kết hợp đồng online mọi lúc, mọi nơi. Đáp ứng được sự tiện lợi, nhanh chóng, minh bạch khi ký hợp đồng từ xa. Áp dụng với mọi loại hợp đồng/tài liệu/giao dịch điện tử.',
      banner: 'pages/banner-contract.png',
      altSTr: 'MDO hợp đồng điện tử 6'

    };
  },
  methods: {}
};
</script>
