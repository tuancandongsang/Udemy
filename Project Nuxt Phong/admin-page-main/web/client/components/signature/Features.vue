<template>

  <section id="contract-feature" class="py-8 border-bottom">
    <v-container>
      <div class="feature-title" style=" padding-top: 65px;">
        <p class="text-center" data-aos="zoom-in-up">
          <b>Tiết kiệm 70% nguồn lực cho doanh nghiệp</b>
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
          icon: 'svg/icon-hand.svg',
          title: 'Tối ưu chi phí',
          content:
              'Giảm bớt những chi phí không cần thiết như chi phí in ấn, chi phí lưu trữ trên phần cứng.',
          altStr: 'Icon tiết kiệm chi phí 13'
        },
        {
          icon: 'svg/icon-device.svg',
          title: 'Mọi lúc mọi nơi',
          content:
              'Xử lý mọi yêu cầu nhanh gọn, dễ dàng trên tất cả các nền tảng: PC, Mobile, Tablet. Giảm thời gian chờ đợi phê duyệt, tăng nhanh khả năng tiến triển các đầu việc tiếp theo.',
          altStr: 'Icon đa nền tảng 6'
        },
        {
          icon: 'svg/icon-cloud.svg',
          title: 'Lưu trữ tập trung',
          content:
              'Lưu trữ toàn bộ tài liệu trên một nền tảng duy nhất. Tìm kiếm nhanh gọn. Tránh mất mát, thất lạc, gây nguy hiểm trong các vấn đề kinh doanh liên quan.',
          altStr: 'Icon lưu trữ trên nền tảng số 25'
        }
      ]
    };
  }
};
</script>
