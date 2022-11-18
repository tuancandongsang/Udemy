<template>
  <div>
    <div class="hidden-sm-and-down">
      <div
          class="
          feature-detail
          d-flex
          flex-column flex-md-row
          justify-center
          text-center
        "
      >
        <v-card
            v-for="(feature, index) in features"
            :key="index"
            data-aos="zoom-in"
            :data-aos-delay="250 * index"
            class="feature-item mx-7 pa-4 mb-4"
        >
          <div class="feature-icon">
            <img :src="require(`~/assets/${feature.icon}`)"/>
          </div>
          <div class="feature-item-title">{{ $t(feature.title) }}</div>
          <div class="feature-item-content" v-html="$t(feature.content)"/>
        </v-card>
      </div>
    </div>
    <div class="hidden-md-and-up">
      <div class="feature-detail text-center">
        <VueSlickCarousel
            v-if="features && features.length > 0"
            ref="carousel"
            v-bind="setting">
          <v-card
              v-for="(feature, index) in features"
              :key="index"

              data-aos="zoom-in"
              :data-aos-delay="250 * index"
              class="feature-item mx-7 pa-4 mb-4"
          >
            <div class="feature-icon">
              <img :src="require(`~/assets/${feature.icon}`)" :alt="feature.altStr"/>
            </div>
            <div class="feature-item-title">{{ $t(feature.title) }}</div>
            <div class="feature-item-content" v-html="$t(feature.content)"/>
          </v-card>
        </VueSlickCarousel>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  name: 'Feature',
  components: {VueSlickCarousel},
  props: ['features', 'slidesToShow', 'altStr'],
  data() {
    return {
      setting: {
        dots: false,
        arrows: false,
        infinite: false,
        initialSlide: 0,
        speed: 500,
        slidesToShow: this.slidesToShow,
        slidesToScroll: 1,
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 900,
            settings: {
              slidesToShow: 2,
              dots: true
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              dots: true
            }
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
