<template>
  <section id="contract-feature" class="py-8 border-bottom">
    <v-container>
      <div class="feature-title">
        <p class="text-center" data-aos="zoom-in-up">
          <b>Tiết kiệm +3.000 giờ mỗi năm chỉ để <br> tìm kiếm phòng họp</b>
        </p>
      </div>
      <feature :features="features" :slidesToShow="3" :alt-str="features.altSTr"/>
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
          icon: 'svg/icon-date.svg',
          title: 'Book phòng họp',
          content:
              'Chủ động điều phối việc đặt phòng họp mà không chồng chéo lên lịch của bộ phận khác. <br/>  Thoải mái lựa chọn quy mô phòng họp và cơ sở vật chất đi kèm để phù hợp với tính chất cuộc họp sắp diễn ra.',
          altSTr: 'Icon book phòng họp 18'
        },
        {
          icon: 'svg/icon-bell.svg',
          title: 'Nhắc nhở lịch họp',
          content:
              'Quy trình ký kết hợp đồng điện tử rõ ràng, minh bạch. Thông báo tự động tới người tham gia ký.',
          altSTr: 'Icon thông báo quản lý công việc 17'
        },
        {
          icon: 'svg/icon-check-list.svg',
          title: 'Áp dụng rộng rãi',
          content:
              'Không cần nhân viên hành chính loay hoay sắp xếp lịch họp.<br> Lịch họp bị chồng chéo gây ngắt quãng nội dung <br> Tự động cập nhật vào lịch cá nhân thành viên vào cuộc họp',
          altSTr: 'Icon báo cáo hiệu quả quản lý công việc 24'
        }
      ]
    };
  }
};
</script>
