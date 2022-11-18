<template>
  <div class="blog-sidebar">
    <div class="d-flex align-center justify-center mb-5">
      <img :src="require(`~/assets/images/pages/blog/thumb-news.png`)" alt="" />
    </div>
    <div class="sidebar-form">
      <div class="form-title">Đăng ký nhận bản tin</div>
      <form-subcriber />
    </div>

    <div class="hots-post" v-if="blogs && blogs.length > 0">
      <p class="post-header-title">BÀI VIẾT NỔI BẬT</p>
      <template>
        <div class="hots-post-item" v-for="blog in blogs" :key="blog.id">
          <div class="post-title">
            <nuxt-link :to="`/blog/${blog.attributes.slug}`">
              {{ blog.attributes.title }}</nuxt-link
            >
          </div>
          <div class="post-content">
            {{ blog.attributes.description }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import MDOService from "~/api/mdoService";
import FormSubcriber from "./FormSubcriber.vue";
export default {
  components: { FormSubcriber },
  data() {
    return {
      blogs: null,
    };
  },
  async mounted() {
    this.getFeatureBlog();
  },
  methods: {
    async getFeatureBlog() {
      const blogs = await MDOService.getFeatureBlog(6);
      if (blogs) {
        this.blogs = blogs.data;
      }
    },
  },
};
</script>

<style lan
FormSubcriberg="scss" scoped>
</style>
