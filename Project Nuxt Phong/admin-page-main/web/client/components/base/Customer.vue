<template>
  <section id="contract-customer" class="py-10 border-bottom">
    <v-container>
      <div class="customer-slider" v-if="customers" data-aos="zoom-in-up">
        <VueSlickCarousel v-bind="setting">
          <div v-for="(item, index) in customers" :key="index">
            <img :src="item.src"/>
          </div>
        </VueSlickCarousel>
      </div>
      <!--      <v-row class="mt-6">-->
      <!--        <v-col-->
      <!--            cols="8"-->
      <!--            sm="3"-->
      <!--        >-->
      <!--          <v-img-->
      <!--              style="width: 400px;height: 120px"-->
      <!--              :src="require(`~/assets/images/logo/logoTapDoanCIENC04.png`)"-->
      <!--              alt="khách hàng doanh nghiệp MDO Việt Nam"-->
      <!--          ></v-img>-->
      <!--        </v-col>-->
      <!--        <v-col-->
      <!--            cols="8"-->
      <!--            sm="3"-->
      <!--        >-->
      <!--          <v-img-->
      <!--              style="width: 400px;height: 120px"-->
      <!--              :src="require(`~/assets/images/logo/logoCtyCoKhiHoaHoc.png`)"-->
      <!--              alt="khách hàng doanh nghiệp MDO Việt Nam"-->
      <!--          ></v-img>-->
      <!--        </v-col>-->
      <!--        <v-col-->
      <!--            cols="8"-->
      <!--            sm="3"-->
      <!--        >-->
      <!--          <v-img-->
      <!--              style="width: 400px;height: 120px"-->
      <!--              :src="require(`~/assets/images/logo/logoTapDoanThienMinhDuc.png`)"-->
      <!--              alt="khách hàng doanh nghiệp MDO Việt Nam"-->
      <!--          ></v-img>-->
      <!--        </v-col>-->
      <!--        <v-col-->
      <!--            cols="8"-->
      <!--            sm="3"-->
      <!--        >-->
      <!--          <v-img-->
      <!--              style="width: 400px;height: 120px"-->
      <!--              :src="require(`~/assets/images/logo/logoCtyCapNuocNgheAn.png`)"-->
      <!--              alt="khách hàng doanh nghiệp MDO Việt Nam"-->
      <!--          ></v-img>-->
      <!--        </v-col>-->
      <!--      </v-row>-->
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
        dots: false,
        infinite: true,
        initialSlide: 1,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 1336,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      },
      customers: null,
      logoCustomers: [
        {
          src: '~/assets/images/logo/logoCtyCapNuocNgheAn.png'
        },
        {
          src: '~/assets/images/logo/logoCtyCapNuocNgheAn.png'
        },
        {
          src: '~/assets/images/logo/logoCtyCapNuocNgheAn.png'
        },
        {
          src: '~/assets/images/logo/logoCtyCapNuocNgheAn.png'
        }
      ]
    };
  },
  created() {
    this.getCustomers();
  },
  methods: {
    async getCustomers() {
      const response = await MDOService.getCustomersType();
      if (response) {
        this.customers = response.data.map((customer) => {
          const {attributes} = customer;
          return {
            src: attributes.logo.data.attributes.url
          };
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/css/colors";

#customer {
  background: $primary-color;
}
</style>
