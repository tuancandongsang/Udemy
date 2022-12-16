<template>
  <section id="feature" class="py-8">
    <v-container>
      <div class="feature-title">
        <p
            class="text-center"
            data-aos="zoom-in"
            v-html="$t('homePage.sections.features.title')"
        ></p>
      </div>
      <feature :features="features" :slidesToShow="4" :alt-str="features.altStr"/>
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
          icon: 'svg/icon-setting.svg',
          title: 'Cấu hình sản phẩm theo DN',
          content:
              'Tối ưu sản phẩm theo nhu cầu của khách hàng. Tư vấn thay đổi tính năng nền tảng theo mô hình quản trị và sản xuất của doanh nghiệp.',
          altStr: 'Icon tối ưu nền tảng quản trị doanh nghiệp theo nhu cầu 3'
        },
        {
          icon: 'svg/icon-protected.svg',
          title: 'Ổn định và an toàn',
          content:
              'Giải pháp hoạt động ổn định cam kết theo SLA với từng doanh nghiệp, khách hàng. Toàn bộ dữ liệu được lưu trữ an toàn, bảo mật và có thể truy xuất mọi lúc, mọi nơi.'
        },
        {
          icon: 'svg/icon-hand.svg',
          title: 'Tiết kiệm chi phí',
          content:
              'Giảm tối đa các chi phí văn phòng như in ấn, tìm kiếm, chi phí đầu tư hạ tầng phần cứng, phần mềm. Rút ngắn thời gian luân chuyển giấy tờ, lưu trữ.',
          altStr: 'Icon tiết kiệm chi phí 13'
        },
        {
          icon: 'svg/icon-device.svg',
          title: 'Tích hợp toàn diện, mọi lúc mọi nơi',
          content:
              'Hoạt động ổn định trên tất cả các nền tảng hiện phổ biến hiện nay (Web, Mobile, Tablet). Có bản cài đặt trên iOS, Android.'
        }
      ]
    };
  }
};
</script>
