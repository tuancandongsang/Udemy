<template>
  <section id="contract-feature" class="py-8 border-bottom">
    <v-container>
      <div class="feature-title">
        <p class="text-center" data-aos="zoom-in-up">
          <b>Quản lý công việc hiệu quả, làm chủ<br>thời gian, tăng năng suất</b>
        </p>
      </div>
      <feature :features="features" :slidesToShow="3" :alt-str="features.altStr"/>
    </v-container>
  </section>
</template>

<script>
import Feature from '@/components/base/Feature';

export default {
  components: {Feature},
  data() {
    return {
      features: [
        {
          icon: 'svg/icon-cap.svg',
          title: 'Nắm bắt công việc',
          content:
              'Tất cả công việc đều được theo dõi tập trung thông qua một nền tảng duy nhất. Tự động nhắc nhở khi chưa hoàn thành công việc.',
          altStr: 'Icon quản lý công việc 22'
        },
        {
          icon: 'svg/icon-clock.svg',
          title: 'Phân loại văn bản thông minh',
          content:
              'Cập nhật tiến độ công việc mọi lúc mọi nơi, có nhắc nhở đối với các đầu việc sắp đến hạn. Phân loại các công việc đã/đang/chưa xử lý, hỗ trợ quản lý thời gian tối ưu.',
          altStr: 'Icon tiết kiệm thời gian 20'
        },
        {
          icon: 'svg/icon-check-list.svg',
          title: 'Báo cáo hiệu quả',
          content:
              'Xuất báo cáo tự động dựa trên các dữ liệu có sẵn trên nền tảng. Chính xác, nhanh gọn.',
          altStr: 'Icon báo cáo hiệu quả quản lý công việc 24'
        }
      ]
    };
  }
};
</script>
