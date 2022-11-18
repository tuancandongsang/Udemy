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
import mixinSeo from '~/mixins/mixinSeo';
import minxinDate from '~/mixins/mixinDate';

export default {
  props: {
    slug: {
      type: String,
      default: ''
    }
  },
  mixins: [minxinDate, mixinSeo],
  data() {
    return {
      blog: null
    };
  },
  created() {
    this.getNewsDetail();
  },
  methods: {
    async getNewsDetail() {
      try {
        const blog = await MDOService.getNewsDetail(this.slug);
        this.blog = blog.data[0];
        if (this.blog.attributes.seo) {
          Object.assign(this.seoData, this.blog.attributes.seo);
        }
        this.seoData.title = this.blog.attributes.title;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
