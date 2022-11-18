<template>
  <section class="pt-12">
    <v-container>
      <div class="section-title text-center" data-aos="zoom-in">
        QUY TRÌNH GIAO KẾT HỢP ĐỒNG ĐIỆN TỬ TRÊN MDO
      </div>
      <div class="section-subtitle text-center" data-aos="zoom-in">
        Nền tảng thông minh, giải pháp giúp doanh nghiệp trở lên vượt trội hơn
      </div>
      <div class="d-flex flex-column flex-md-row justify-space-bettwen mt-12 mdo-process">
        <VueSlickCarousel v-bind="setting" class="py-6" v-if="processes && processes.length > 0">
          <div
            v-for="(process, i) in processes"
            data-aos="zoom-in"
            :data-aos-delay="150 * i"
            :key="i"
            class="process-item px-3"
          >
            <div class="process-header">
              <div class="process-step">
                <v-avatar size="75" color="white">
                  <span class="step"> {{ i + 1 }}</span>
                </v-avatar>
                <span class="icon-arrow" v-if="i < 3">
                  <img
                    :src="require(`~/assets/svg/icon-arrow-right.svg`)"
                    alt=""
                  />
                </span>
              </div>
            </div>
            <div class="process-detail">
              <div class="process-title">{{ process.title }}</div>
              <div class="process-content" v-html="process.content"></div>
            </div>
          </div>
        </VueSlickCarousel>
      </div>
    </v-container>
  </section>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  components: { VueSlickCarousel },
  data() {
    return {
      setting: {
        dots: false,
        arrows: false,
        infinite: false,
        initialSlide: 0,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 1336,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              dots: true
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              dots: true
            },
          },
        ],
      },
      processes: [
        {
          title: "Khởi tạo",
          content: `Upload file hợp đồng <br/>
                    Xác định luồng và thứ tự người xem xét/ký <br/>
                    Gửi hợp đồng Hệ thống tạo luồng ký tự động`,
        },
        {
          title: "Phê duyệt",
          content: `Hệ thống gửi hợp đồng cần xét duyệt đến Email người được quyền xét duyệt <br/>
                    Duyệt trước nội dung hợp đồng`,
        },
        {
          title: "Ký số",
          content: `Nhận email thông báo tự động <br/>
                    Gửi hợp đồng <br/>
                    Hệ thống tạo luồng ký tự động`,
        },
        {
          title: "Xác nhận",
          content: `Email thông báo hợp đồng đã được ký số cho đối tác<br/>
Ký trả lại hợp đồng<br/>
Hệ thống gửi thông báo hoàn tất`,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>