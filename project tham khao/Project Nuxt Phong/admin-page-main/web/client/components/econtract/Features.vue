<template>
  <section id="contract-feature" class="py-8 border-bottom">
    <v-container>
      <div class="feature-title">
        <p class="text-center" data-aos="zoom-in-up">
          <b>Kết nối, trao đổi dữ liệu nhanh chóng</b>
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
          icon: 'svg/icon-connect.svg',
          title: 'Kết nối dễ dàng',
          content:
              'Dễ dàng thực hiện ký kết các hợp đồng giữa doanh nghiệp với doanh nghiệp, doanh nghiệp với đối tác, doanh nghiệp với cá nhân ở bất kỳ đâu mà không cần gặp mặt hai bên.',
          altSTr: 'Icon điều hành và quản trị 16'
        },
        {
          icon: 'svg/icon-fly.svg',
          title: 'Tiện lợi, nhanh chóng, minh bạch',
          content:
              'Quy trình ký kết hợp đồng điện tử rõ ràng, minh bạch. Thông báo tự động tới người tham gia ký.',
          altSTr: 'Icon hợp đồng điện tử 21'
        },
        {
          icon: 'svg/icon-check-list.svg',
          title: 'Áp dụng rộng rãi',
          content:
              'Áp dụng mọi loại hợp đồng/ tài liệu/ chứng nhận điện tử như hợp đồng lao động, hợp đồng cung cấp dịch vụ, hợp đồng mua bán, hợp đồng dịch vụ - thương mại, hợp đồng bảo hiểm,....',
          altSTr: 'Icon báo cáo hiệu quả quản lý công việc 24'
        }
      ]
    };
  }
};
</script>
