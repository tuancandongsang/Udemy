<template>
  <div>
    <VueSlickCarousel
      :arrows="true"
      :dots="true"
      :infinite="infinite"
      :centerMode="centerMode"
      :autoplay="true"
      :speed="500"
      :slidesToShow="slidesToShow"
      :slidesToScroll="slidesToScroll"
      :variableWidth="variableWidth"
      centerPadding="30"
    >
      <div>
        <img src="~assets/images/customers/vnsteel.png" alt="" />
      </div>
      <div>
        <img src="~assets/images/customers/habeco.png" alt="" />
      </div>
      <div>
        <img src="~assets/images/customers/hipt.png" alt="" />
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "Carousel",
  components: { VueSlickCarousel },
  data() {
    return {
      dots: true,
      infinite: true,
      centerMode: true,
      centerPadding: "20px",
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
    };
  },
};
</script>
<style lang="scss" scoped>
.slick-dots {
  bottom: -35px;
  li button:before {
    font-size: 10px !important;
  }
}
</style>
