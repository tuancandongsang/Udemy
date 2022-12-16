<template>
  <div id="wrap-main">
    <about-us-banner :banner="banner"/>
    <about-us-intro/>
    <about-us-detail/>
    <about-us-register/>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  head: {
    title: 'Giới thiệu Công ty - mdo.com.vn',
    meta: [
      {
        name: 'title',
        content:
            'MDO - Giới thiệu Công ty - mdo.com.vn'
      },
      {
        name: 'description',
        content:
            'Thông tin về tầm nhìn doanh nghiệp, định hướng phát triển MDO - nền tảng quản trị doanh nghiệp toàn diện, hỗ trợ doanh nghiệp trong chuyển đổi số'
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
      titleBanner: 'VỀ CHÚNG TÔI',
      subTitleBanner:
          'Là doanh nghiệp hoạt động lâu năm trong <br>lĩnh vực công nghệ thông tin (CNTT) tại Việt Nam.<br>Chúng tôi tự hào cung cấp các sản phẩm, giải pháp và dịch vụ CNTT tối ưu, nhằm mang lại giá trị thiết thực nhất cho khách hàng, đối tác và các thành viên công ty.',
      banner: 'pages/banner-about-us.png'
    };
  },
  methods: {}
};
</script>
