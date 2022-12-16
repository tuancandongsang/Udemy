<template>
  <v-card class="blog-feature post" v-if="blog" :to="`/blog/${blog.attributes.slug}`">
    <div class="blog-feature-thumb">
      <img :src="blog.attributes.thumbnail.data.attributes.url" alt=""/>
    </div>
    <div class="blog-feature-content pa-5">
      <div class="blog-feature-title">{{ blog.attributes.title }}</div>
      <p>
        {{ blog.attributes.description }}
      </p>
      <div class="feature-post-footer d-flex justify-space-between">
        <span class="post-date">{{
            formatDate(blog.attributes.updatedAt)
          }}</span>
        <a :href="`/blog/${blog.attributes.slug}`" class="post-readmore"
        >Read more</a
        >
      </div>
    </div>
  </v-card>
</template>

<script>
import MDOService from '~/api/mdoService';
import minxinDate from '~/mixins/mixinDate';

export default {
  mixins: [minxinDate],
  data() {
    return {
      blog: null
    };
  },
  async mounted() {
    await this.getFeatureBlog();
  },
  methods: {
    async getFeatureBlog() {
      const blog = await MDOService.getFeatureBlog(1);
      if (blog) {
        this.blog = blog.data[0];
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
