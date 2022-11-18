<template>
  <section
    :id="`sections-${id}`"
    class="py-10"
    :class="`section-gen-${genClass}`"
  >
    <style>
      .section-gen-{{genClass}} .item-app-section-content {
        min-height: {{minHeightCard}}px
      }
    </style>
    <v-container>
      <v-row>
        <v-col>
          <div
            class="d-flex align-center flex-column solutions"
            data-aos="zoom-in"
          >
            <h4 class="solution-name" v-html="$t(title)" />
            <p class="solution-desc" v-html="$t(subTitle)" />
          </div>
        </v-col>
      </v-row>
      <div v-if="slide">
        <!-- Slide for PC -->
        <v-carousel
          :height="minHeightCard*2+240"
          :show-arrows-on-hover="true"
          light
          cycle
          class="slide-section d-none d-md-flex"
          hide-delimiter-background
        >
          <v-carousel-item v-for="page in numberPageSlide" :key="page">
            <v-row
              justify="center"
              ref="wrap-items-app-section"
              class="px-10 py-15"
            >
              <template v-for="item in 6">
                <v-col
                  cols="12"
                  v-if="features[item - 1 + (page - 1) * 6]"
                  :sm="column + 2"
                  :md="column"
                  :key="item"
                  :lg="numberCols < 3 ? column - 1 : column"
                  class="item-app-section"
                >
                  <BaseCard
                    :linkItem="linkItem"
                    :feature="features[item - 1 + (page - 1) * 6]"
                  />
                </v-col>
              </template>
            </v-row>
          </v-carousel-item>
        </v-carousel>
        <!-- Slide for Tablet -->
        <v-carousel
          :height="minHeightCard+120"
          :show-arrows="true"
          light
          cycle
          class="slide-section d-none d-sm-flex d-md-none"
          hide-delimiter-background
        >
          <v-carousel-item v-for="page in numberPageTabletSlide" :key="page">
            <v-row
              justify="center"
              ref="wrap-items-app-section"
              class="px-10 py-15"
            >
              <template v-for="item in 2">
                <v-col
                  cols="12"
                  v-if="features[item - 1 + (page - 1) * 2]"
                  :sm="column + 2"
                  :md="column"
                  :key="item"
                  :lg="numberCols < 3 ? column - 1 : column"
                  class="item-app-section"
                >
                  <BaseCard
                    :linkItem="linkItem"
                    :feature="features[item - 1 + (page - 1) * 2]"
                  />
                </v-col>
              </template>
            </v-row>
          </v-carousel-item>
        </v-carousel>
        <!-- Slide for Mobilde -->
        <v-carousel
          :height="minHeightCard+120"
          :show-arrows="true"
          light
          cycle
          class="slide-section d-flex d-sm-none"
          hide-delimiter-background
        >
          <v-carousel-item v-for="(feature,index) in features" :key="index">
            <v-row
              justify="center"
              ref="wrap-items-app-section"
              class="px-10 py-15"
            >
                <v-col
                  cols="12"
                  :sm="column + 2"
                  :md="column"
                  :lg="numberCols < 3 ? column - 1 : column"
                  class="item-app-section"
                >
                  <BaseCard
                    :linkItem="linkItem"
                    :feature="feature"
                  />
                </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
      </div>
      <div v-else>
        <v-row justify="center" ref="wrap-items-app-section">
          <v-col
            v-for="(feature, index) in features"
            :key="index"
            cols="12"
            :sm="column+2"
            :lg="numberCols < 3 ? column - 1 : column"
            class="item-app-section"
          >
            <BaseCard :linkItem="linkItem" :feature="feature" animation="zoom-out-down" />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "AppSection",
  components: { VueSlickCarousel },
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    features: {
      type: Array,
      default: undefined,
    },
    id: {
      type: String,
      default: "",
    },
    numberCols: {
      type: Number,
      default: 3,
    },
    linkItem: {
      type: Boolean,
      default: false,
    },
    slide: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      minHeightCard: 0,
      //Slide
      dots: true,
      infinite: true,
      centerMode: true,
      centerPadding: "20px",
      slidesToShow: 1,
      slidesToScroll: 1,
      loadedData: false,
      genClass: "",
      numberPageSlide: 1,
      numberPageTabletSlide: 1,
      // variableWidth: true,
    };
  },
  methods: {
    showSilder() {
      if (this.slide) {
        this.numberPageSlide = Math.ceil(this.features.length / 6);
        this.numberPageTabletSlide = Math.ceil(this.features.length / 2);
      }
    },
    onResizeScreen() {
      this.checkHeightCard();
    },
    checkHeightCard() {
      if (!this.loadedData) {
        return;
      }
      let childs = document.querySelectorAll(
        `.section-gen-${this.genClass} .item-app-section-content`
      );
      let lstHeigth = [];
      for (let item of childs) {
        lstHeigth.push(item.clientHeight);
      }
      let maxHeight = Math.max(...lstHeigth);
      this.minHeightCard = maxHeight;
    },
    gendStr(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
  },
  computed: {
    column() {
      return 12 / this.numberCols;
    },
    getHeight() {
      return `min-height: ${this.minHeightCard}px`;
    },
  },
  mounted() {
    this.showSilder();
    this.genClass = this.gendStr(4);
    this.checkHeightCard();
    this.$nextTick(function () {
      this.onResizeScreen();
    });
    window.addEventListener("resize", this.onResizeScreen);
    this.loadedData = true;
  },
};
</script>

<style lang="scss" src="./AppSection.scss">

</style>
