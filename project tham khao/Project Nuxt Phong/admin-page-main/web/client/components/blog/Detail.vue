<template>
  <div v-if="blog">
    <div class="blog-feature">
      <div class="blog-feature-content">
        <h1>{{ blog.attributes.title }}</h1>
        <div v-html="$md.render(blog.attributes.content)"/>
        <div class="feature-post-footer d-flex justify-space-between">
          <span class="post-date">{{
              formatDate(blog.attributes.updatedAt)
            }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MDOService from '~/api/mdoService';
import minxinDate from '~/mixins/mixinDate';
import mixinSeo from '~/mixins/mixinSeo';

export default {
  mixins: [minxinDate, mixinSeo],
  props: {
    slug: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      blog: null,
      blogs: []
    };
  },
  mounted() {
    this.getBlogDetail();
  },
  methods: {
    async getBlogDetail() {
      const blog = await MDOService.getBlogDetail(this.slug);
      if (blog) {
        this.blog = blog.data[0];
        if (this.blog.attributes.seo) {
          Object.assign(this.seoData, this.blog.attributes.seo);
        }
        this.seoData.title = this.blog.attributes.title;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
