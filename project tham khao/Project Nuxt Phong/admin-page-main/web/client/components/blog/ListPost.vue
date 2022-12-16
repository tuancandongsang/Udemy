<template>
  <section class="list-blog-post">
    <div>
      <div
          class="
          wrap-list
          d-flex
          flex-column flex-md-row flex-wrap
          justify-space-between
        "
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
    </div>
  </section>
</template>

<script>
import MDOService from '~/api/mdoService';
import minxinDate from '~/mixins/mixinDate';

export default {
  mixins: [minxinDate],
  props: {
    blogSearch: {
      type: Array,
      default: undefined
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      page: 1,
      totalPage: 1,
      blogs: []
    };
  },
  async mounted() {
    await this.getBlogs(this.page);
  },
  watch: {
    page() {
      this.getBlogs(this.page);
    }
  },
  methods: {
    async getBlogs(page) {
      const blogs = await MDOService.getBlogsByCategory(page);
      if (blogs) {
        this.totalPage = blogs.meta.pagination.pageCount;
        this.page = blogs.meta.pagination.page;
        this.blogs = blogs.data;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
