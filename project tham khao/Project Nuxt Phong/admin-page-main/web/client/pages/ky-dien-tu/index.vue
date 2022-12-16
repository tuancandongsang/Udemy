<template>
  <div id="wrap-main">
    <banner :title="titleBanner" :subtitle="subTitleBanner" :banner="banner" :alt-s-tr="altSTr"/>
    <base-customer/>
    <signature-features/>
    <signature-why-choose/>
    <signature-register/>
    <base-customer-story/>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
import Banner from '@/components/Banner';

export default {
  components: {Banner},
  head: {
    title: 'Ký điện tử',
    meta: [
      {
        name: 'title',
        content:
            'MDO Ký điện tử - Quản lý phê duyệt và đề xuất cho doanh nghiệp'
      },
      {
        name: 'description',
        content:
            'Sử dụng trong các giao dịch phê duyệt và đề xuất. Ký điện tử mọi lúc mọi nơi một cách dễ dàng, an toàn, bảo mật và nhanh chóng. Đảm bảo tính pháp lý.'
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
      titleBanner: 'Ứng dụng Ký điện tử',
      subTitleBanner:
          'Sử dụng trong các giao dịch phê duyệt. Ký mọi lúc mọi nơi một cách dễ dàng, an toàn, bảo mật và nhanh chóng. Đảm bảo tính pháp lý tương đương như khi sử dụng phương thức ký truyền thống.',
      banner: 'pages/banner-econtract.png',
      altSTr: 'MDO ký điện tử 3'
    };
  },
  methods: {}
};
</script>
