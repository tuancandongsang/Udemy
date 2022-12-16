<template>
  <section id="customer-story" class="py-10">
    <v-container>
      <div class="text-center" data-aos="zoom-in">
        <p class="customer-story-title text-center">Câu chuyện khách hàng</p>
      </div>
      <div class="customer-story-slider">

        <VueSlickCarousel v-bind="setting" v-if="customers && customers.length > 0">
          <div v-for="(item, index) in customers" :key="index">
            <div class="d-flex align-center flex-column flex-md-row">
              <div class="slide-left">
                <div class="customer-comment">{{ item.comment }}</div>
                <div class="customer-name d-flex align-center">{{ item.name }}
                  <v-avatar size="260">
                    <img class="d-flex" style="padding-left: 5px; width: 50px; height: 50px" :src="`${item.avatar}${index}`" alt="alt"/>
                  </v-avatar>
                </div>
                <div class="customer-company">{{ item.company }}</div>
                <div class="customer-logo">
                  <img :src="require(`~/assets/${item.logo}`)"/>
                </div>
              </div>
              <div class="slide-right">

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
      customers: []
    };
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/css/colors";
</style>
