<template>
  <section id="contract-feature" class="py-8 border-bottom">
    <v-container>
      <div class="feature-title">
        <p class="text-center" data-aos="zoom-in-up">
          <b>Quản trị văn bản khoa học, hiệu quả</b>
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
          icon: 'svg/icon-hand.svg',
          title: 'Tối ưu chi phí',
          content:
              'Giảm thiểu 80% thời gian làm việc cho đội ngũ nhân viên hành chính, tiết kiệm hoàn toàn không gian lưu trữ phần cứng và sắp xếp quản lý văn bản khoa học trên hệ thống.',
          altSTr: 'Icon tiết kiệm chi phí 13'
        },
        {
          icon: 'svg/icon-document.svg',
          title: 'Phân loại văn bản thông minh',
          content:
              'Văn bản được phân loại theo các nhóm: hình thức văn bản, ngành, đơn vị xây dựng,...thuận tiện cho việc tìm kiếm, tra cứu, theo dõi khi cần thiết.',
          altSTr: 'Icon điều hành văn bản 23'
        },
        {
          icon: 'svg/icon-device.svg',
          title: 'Đồng bộ hóa trên các thiết bị',
          content:
              'Kết nối, trao đổi công việc với đồng nghiệp mọi lúc mọi nơi mà không phải bận tâm lưu trữ lại tài liệu hay nội dung cuộc họp bởi thông tin đã tự động được lưu trữ và đồng bộ trên tất cả thiết bị.'
        }
      ]
    };
  }
};
</script>
