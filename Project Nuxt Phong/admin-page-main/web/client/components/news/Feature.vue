<template>
  <section class="news-feature" v-if="blog">
    <v-container>
      <v-card class="d-flex flex-column flex-md-row justify-space-between post" :to="`/bao-chi/${blog.attributes.slug}`">
        <div class="feature-post-left">
          <div class="feature-post-title">{{ blog.attributes.title }}</div>
          <div class="feature-post-detail">
            <p>
              {{ blog.attributes.description }}
            </p>
          </div>
          <div class="feature-post-footer">
            <span class="post-date">{{
              formatDate(blog.attributes.updatedAt)
            }}</span>
            <a :href="`/bao-chi/${blog.attributes.slug}`" class="post-readmore"
              >Read more</a
            >
          </div>
        </div>
        <div class="feature-post-right">
          <img :src="blog.attributes.thumbnail.data.attributes.url" />
        </div>
      </v-card>
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
      blog: null,
    };
  },
  async mounted() {
    this.getFeatureBlog();
  },
  methods: {
    async getFeatureBlog() {
      const blog = await MDOService.getFeatureBlog(
        1,
        constants.BLOG_TYPES.NEWS
      );
      if (blog) {
        this.blog = blog.data[0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>