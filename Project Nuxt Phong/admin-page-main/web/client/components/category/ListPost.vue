<template>
  <section class="list-blog-post">
    <div
      class="
        wrap-list
        d-flex
        flex-column flex-md-row flex-wrap
        category-wrap
      "
      v-if="blogs && blogs.length > 0"
    >
      <v-card
        class="blog-item post"
        v-for="blog in blogs"
        :key="blog.i"
        :to="`/blog/${blog.attributes.slug}`"
      >
        <div class="thumb-blog">
          <img
            :src="
              blog.attributes.thumbnail.data.attributes.formats.thumbnail.url
            "
            alt=""
          />
        </div>
        <div class="blog-content">
          <div class="blog-title">{{ blog.attributes.title }}</div>
          <p>
            {{ blog.attributes.description }}
          </p>
          <div class="post-date">
            {{ formatDate(blog.attributes.updatedAt) }}
          </div>
        </div>
      </v-card>
    </div>
    <div class="text-center mt-8" v-if="totalPage > 1">
      <v-pagination
        circle
        v-model="page"
        :length="totalPage"
        :total-visible="7"
      ></v-pagination>
    </div>
  </section>
</template>

<script>
import MDOService from "~/api/mdoService";
import minxinDate from "~/mixins/mixinDate";
export default {
  props: {
    slug: {
      type: String,
      default: undefined,
    },
  },
  mixins: [minxinDate],
  data() {
    return {
      page: 1,
      totalPage: 1,
      blogs: null,
    };
  },
  async mounted() {
    await  this.getBlogsByCategory(this.page);
  },
  watch: {
    page() {
      this.getBlogsByCategory(this.page);
    },
  },
  methods: {
    async getBlogsByCategory(page) {
      const response = await MDOService.getBlogsByCategory(page, this.slug);
      if (response) {
        this.totalPage = response.meta.pagination.pageCount;
        this.page = response.meta.pagination.page;
        this.blogs = response.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
