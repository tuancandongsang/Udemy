<template>
  <div id="wrap-main">
    <banner :title="titleBanner" :subtitle="subTitleBanner" :banner="banner" :alt-s-tr="altSTr"/>
    <base-customer/>
    <document-features/>
    <document-why-choose/>
    <document-register/>
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
    title: 'Điều hành văn bản',
    meta: [
      {
        name: 'title',
        content:
            'MDO Điều hành văn bản - Quản lý văn bản thông minh'
      },
      {
        name: 'description',
        content: 'Quản trị văn bản khoa học, hiệu quả. Phân loại văn bản thông minh. Công cụ tìm kiếm mạnh mẽ, lưu trữ an toàn, tránh thất lạc.'
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
      titleBanner: 'Điều hành văn bản',
      subTitleBanner: 'Gửi, đọc và xử lý văn bản nhanh chóng. Cho phép theo dõi, trao đổi hoặc luân chuyển văn bản và có ghi lại lịch sử. Công cụ tìm kiếm mạnh mẽ, lưu trữ an toàn, tránh thất lạc.',
      banner: 'pages/banner-document.png',
      altSTr: 'MDO Điều hành văn bản 24'

    };
  },
  methods: {}
};
</script>
