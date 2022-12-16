<template>
  <section id="news-story" class="py-8">
    <v-container>
      <div class="text-center" data-aos="zoom-in">
        <p class="news-story-title text-center">Báo chí nói về chúng tôi</p>
      </div>
      <div class="div" v-if="news">
        <VueSlickCarousel v-bind="setting" class="py-6" v-if="news && news.length > 0">
          <div v-for="(item, index) in news" :key="index">
            <img :src="item.src" />
          </div>
        </VueSlickCarousel>
      </div>
      <div v-if="posts">
        <VueSlickCarousel v-bind="postSetting" v-if="posts && posts.length > 0">
          <div v-for="(item, index) in posts" :key="index">
            <div
              class="post-item d-flex mx-2 mb-4 align-start"
              @click="linkTo(`${item.link}`)"
            >
              <img :src="item.thumb" />
              <div class="post-detail pl-2">
                <div class="post-title">{{ item.title }}</div>
                <div class="post-content">{{ item.content }}</div>
                <div class="post-source">{{ item.source }}</div>
              </div>
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
import constants from "~/config/constants";
import MDOService from "~/api/mdoService";
export default {
  components: { VueSlickCarousel },
  data() {
    return {
      setting: {
        dots: false,
        arrows: false,
        infinite: true,
        initialSlide: 2,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        swipeToSlide: true,
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
      postSetting: {
        dots: true,
        arrows: false,
        infinite: true,
        infinite: true,
        slidesToShow: 2,
        speed: 500,
        rows: 2,
        slidesPerRow: 1,
        responsive: [
          {
            breakpoint: 1336,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          // {
          //   breakpoint: 600,
          //   settings: {
          //     slidesToShow: 2,
          //     slidesToScroll: 2,
          //     initialSlide: 2,
          //   },
          // },
          // {
          //   breakpoint: 480,
          //   settings: {
          //     slidesToShow: 1,
          //     slidesToScroll: 1,
          //   },
          // },
        ],
      },
      news: null,
      posts: null,
    };
  },
  created() {
    this.getCustomersNews();
    this.getNews();
  },
  methods: {
    async getCustomersNews() {
      const response = await MDOService.getCustomersType(
        1,
        constants.CUSTOMER_TYPES.NEWS
      );
      if (response) {
        this.news = response.data.map((customer) => {
          const { attributes } = customer;
          return {
            src: attributes.logo.data.attributes.url,
          };
        });
      }
    },
    async getNews() {
      const posts = await MDOService.getBlogs(1, constants.BLOG_TYPES.NEWS);
      if (posts) {
        this.posts = posts.data.map((post) => {
          const attr = post.attributes;
          return {
            thumb: attr.thumbnail.data.attributes.formats.thumbnail.url,
            title: attr.title,
            content: attr.description,
            link: "/bao-chi/" + attr.slug,
            source: attr.from,
          };
        });
      }
    },
    linkTo(link) {
      if (link !== "#") {
        window.location.href = link;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~assets/css/colors";
</style>
