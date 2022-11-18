<template>
  <div id="wrap-main">
    <banner :title="titleBanner" :subtitle="subTitleBanner" :banner="banner" :alt-s-tr="altStr"/>
    <base-customer/>
    <meeting-features/>
    <meeting-why-choose/>
    <meeting-register/>
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
    title: 'Lịch họp',
    meta: [
      {
        name: 'title',
        content: 'MDO Lịch họp - Quản lý phòng họp trong doanh nghiệp'
      },
      {
        name: 'description',
        content:
            'Chủ động và linh hoạt trong công tác đặt lịch họp online. Quản lý và lưu trữ lịch sử, biên bản họp, các quyết định họp.'
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
      titleBanner: 'Ứng dụng Book phòng họp',
      subTitleBanner:
          'Chủ động và linh hoạt trong công tác đặt lịch họp. Quản lý và lưu trữ lịch sử, biên bản họp, các quyết định họp; từ đó sử dụng làm căn cứ triển khai các hoạt động kinh doanh khác.',
      banner: 'pages/banner-meeting.png',
      altStr: 'MDO Book phòng họp 14'
    };
  },
  methods: {}
};
</script>
