<template>
  <section id="customer" class="py-10 d-none">
    <v-container>
      <div class="text-center" data-aos="zoom-in">
        <p class="customer-title text-center white--text">
          Được tin tưởng bởi các doanh nghiệp <br />
          hàng đầu
        </p>
      </div>
      <div class="customer-slider" v-if="customers">
        <VueSlickCarousel v-bind="setting" v-if="customers && customers.length > 0">
          <div v-for="(item, index) in customers" :key="index">
            <img :src="item.src" />
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
import MDOService from "~/api/mdoService";
import constants from "~/config/constants";
export default {
  components: { VueSlickCarousel },
  data() {
    return {
      setting: {
        arrows: false,
        dots: false,
        infinite: true,
        initialSlide: 2,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipeToSlide: true,
        accessibility: false,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 1336,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
      },
      customers: null,
    };
  },
  created() {
    this.getCustomers();
  },
  methods: {
    async getCustomers() {
      const response = await MDOService.getCustomersType(
        1,
        constants.CUSTOMER_TYPES.HOME
      );
      if (response) {
        try {
          this.customers = response.data.map((customer) => {
          const { attributes } = customer;
          return {
            src: attributes.logo.data.attributes.url,
          };
        });
        } catch (error) {

        }

      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~assets/css/colors";
#customer {
  background: $primary-color;
}
#landing2 {
  #customer {
    background: $primary-color2;
  }
}
</style>
