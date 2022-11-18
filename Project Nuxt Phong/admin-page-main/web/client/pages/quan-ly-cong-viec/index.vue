<template>
  <div id="wrap-main">
    <banner :title="titleBanner" :subtitle="subTitleBanner" :banner="banner" :alt-s-tr="altSTr"/>
    <base-customer/>
    <task-features/>
    <task-why-choose/>
    <task-register/>
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
    title: 'Quản lý công việc',
    meta: [
      {
        name: 'title',
        content:
            'MDO Quản lý công việc - Quản lý công việc hiệu quả, minh bạch'
      },
      {
        name: 'description',
        content: 'Khởi tạo và cập nhật tiến độ quản lý công việc liên tục. Theo dõi và đánh giá kết quả. Có chế độ nhắc nhở, cảnh báo tự động khi đến hẹn xử lý.'
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
      titleBanner: 'Quản lý công việc',
      subTitleBanner: 'Khởi tạo và cập nhật tiến độ công việc liên tục. Theo dõi, đánh giá và quản lý kết quả thực hiện công việc. Có chế độ nhắc nhở, cảnh báo tự động khi đến hẹn xử lý.',
      banner: 'pages/banner-task.png',
      altSTr: 'MDO quản lý công việc 11'

    };
  },
  methods: {}
};
</script>
