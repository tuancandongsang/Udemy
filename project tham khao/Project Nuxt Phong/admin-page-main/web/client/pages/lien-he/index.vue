<template>
  <div id="wrap-main">
    <section class="bg-primary" style="height: 90px"></section>
    <contact-intro/>
    <contact-info/>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  head: {
    title: 'Liên hệ - mdo.com.vn',
    meta: [
      {
        name: 'title',
        content: 'MDO - Liên hệ - mdo.com.vn'
      },
      {
        name: 'description',
        content:
            'Cung cấp thông tin liên hệ MDO - nền tảng quản trị doanh nghiệp toàn diện, hỗ trợ doanh nghiệp trong công cuộc chuyển đối số'
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
