<template>
  <div id="wrap-main">
    <policy-banner :banner="banner"/>
    <policy-intro/>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  head: {
    title: 'Điều khoản sử dụng - mdo.com.vn',
    meta: [
      {
        name: 'title',
        content:
            'MDO - Điều khoản sử dụng - mdo.com.vn'
      },
      {
        name: 'description',
        content:
            'Điều khoản sử dụng website MDO - cung cấp cho khách hàng thông tin ràng buộc khi sử dụng website'
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
      banner: 'pages/banner-dieu-khoan.png'
    };
  },
  methods: {}
};
</script>
