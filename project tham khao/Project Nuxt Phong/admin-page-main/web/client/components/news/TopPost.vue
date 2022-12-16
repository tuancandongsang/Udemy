<template>
  <section class="top-post">
    <v-container>
      <div
        class="
          top-post-detail
          d-flex
          flex-column flex-md-row
          justify-space-around
        "
        v-if="blogs"
      >
        <v-card
          v-for="(blog, i) in blogs"
          :key="i"
          class="top-post-item mt-2 post"
          :to="`/bao-chi/${blog.slug}`"
        >
          <img :src="blog.thumbnail" />
          <p class="top-post-title">{{ blog.title }}</p>
          <p class="top-post-detail">
            {{ blog.description }}
          </p>
          <div class="post-date">{{ formatDate(blog.date) }}</div>
        </v-card>
      </div>
    </v-container>
  </section>
</template>

<script>
import MDOService from "~/api/mdoService";
import constants from "~/config/constants";
import minxinDate from "~/mixins/mixinDate";
export default {
  mixins: [minxinDate],
  data() {
    return {
      blogs: null,
    };
  },
  async mounted() {
    this.getFeaturesBlog();
  },
  methods: {
    async getFeaturesBlog() {
      const response = await MDOService.getFeatureBlog(
        3,
        constants.BLOG_TYPES.NEWS
      );
      if (response) {
        this.blogs = response.data.map((blog) => {
          const attr = blog.attributes;
          return {
            thumbnail: attr.thumbnail.data.attributes.formats.thumbnail.url,
            title: attr.title,
            description: attr.description,
            slug: attr.slug,
            date: attr.updatedAt,
          };
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>