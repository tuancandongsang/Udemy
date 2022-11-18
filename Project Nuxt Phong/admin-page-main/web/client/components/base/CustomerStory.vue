<template>
  <section id="customer-story" class="py-8 mb-10">
    <v-container>
      <div class="text-center" data-aos="zoom-in-up" style="padding-top: 80px">
        <p class="customer-story-title text-center">
          Doanh nghiệp lựa chọn MDO Việt Nam
        </p>
      </div>
      <v-row style="padding-top: 60px" class="d-flex justify-center">
        <v-col
            cols="3"
            sm="3"
        >
          <v-img
              style="width: 400px;height: 120px"
              :src="require(`~/assets/images/logo/logoTapDoanCIENC04.png`)"
              alt="khách hàng doanh nghiệp MDO Việt Nam"
          ></v-img>
        </v-col>
        <v-col
            cols="3"
            sm="3"
        >
          <v-img
              style="width: 400px;height: 120px"
              :src="require(`~/assets/images/logo/logoCtyCoKhiHoaHoc.png`)"
              alt="khách hàng doanh nghiệp MDO Việt Nam"
          ></v-img>
        </v-col>
        <v-col
            cols="3"
            sm="3"
        >
          <v-img
              style="width: 400px;height: 120px"
              :src="require(`~/assets/images/logo/logoTapDoanThienMinhDuc.png`)"
              alt="khách hàng doanh nghiệp MDO Việt Nam"
          ></v-img>
        </v-col>
        <v-col
            cols="3"
            sm="3"
        >
          <v-img
              style="width: 400%;height: 120px"
              :src="require(`~/assets/images/logo/logoCtyCapNuocNgheAn.png`)"
              alt="khách hàng doanh nghiệp MDO Việt Nam"
          ></v-img>
        </v-col>
      </v-row>
      <div class="text-center" data-aos="zoom-in-up" style="padding-top: 80px">
        <p class="customer-story-title text-center">
          Khách hàng nói gì về chúng tôi
        </p>
      </div>
      <div class="customer-story-slider" v-if="customers" data-aos="zoom-in-up">
        <VueSlickCarousel v-bind="setting" v-if="customers && customers.length > 0">
          <div v-for="(item, index) in customers" :key="index">
            <div class="d-flex align-center flex-column flex-md-row">
              <div class="slide-left">
                <div class="customer-comment">{{ item.comment }}</div>
                <div class="customer-name">{{ item.name }}</div>
                <div class="customer-company">{{ item.company }}</div>
              </div>
              <div class="slide-right">
                <div class="customer-logo">
                  <img :src="item.logo"/>
                </div>
                <v-avatar size="260">
                  <img :src="item.avatar" alt="alt"/>
                </v-avatar>
              </div>
            </div>
          </div>
        </VueSlickCarousel>
      </div>
    </v-container>
  </section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
import MDOService from '~/api/mdoService';

export default {
  components: {VueSlickCarousel},
  data() {
    return {
      setting: {
        arrows: false,
        dots: true,
        dotsClass: 'slick-dots story-dots',
        edgeFriction: 0.35,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      },
      customers: null
    };
  },
  created() {
    this.getCustomersStories();
  },
  methods: {
    async getCustomersStories() {
      const response = await MDOService.getCustomersStories();
      if (response) {
        try {
          this.customers = response.data.map(customer => {
            const attr = customer.attributes;
            return {
              comment: attr.comment,
              name: attr.name,
              company: attr.company,
              avatar: attr.avatar.data.attributes.url,
              logo: attr.logoCompany.data.attributes.url
            };
          });
        } catch (error) {
          console.log(error);
        }

      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/css/colors";
</style>
