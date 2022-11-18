<template>
  <section class="list-post my-15">
    <v-container>
      <div class="list-post-detail" v-if="blogs">
        <v-card
          v-for="(blog, i) in blogs"
          :key="i"
          class="
            list-post-item
            d-flex
            flex-column flex-md-row
            align-center align-md-start
            justify-space-between
            mb-2
            post
          "
          :to="`/bao-chi/${blog.slug}`"
        >
          <div class="thumb-post d-flex align-self-center">
            <img :src="blog.thumbnail" />
          </div>
          <div class="post-item-right">
            <p class="post-item-title">{{ blog.title }}</p>
            <p class="post-item-detail">
              {{ blog.description }}
            </p>
            <div class="post-date">{{ formatDate(blog.date) }}</div>
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
      page: 1,
      totalPage: 1,
      blogs: null,
    };
  },
  async mounted() {
    this.getBlogs(this.page);
  },
  watch: {
    page() {
      this.getBlogs(this.page)
    }
  },
  methods: {
    async getBlogs(page) {
      const blogs = await MDOService.getBlogs(page, constants.BLOG_TYPES.NEWS);
      if (blogs) {
        this.totalPage = blogs.meta.pagination.pageCount;
        this.page = blogs.meta.pagination.page;
        this.blogs = blogs.data.map((blog) => {
          const attr = blog.attributes;
          return {
            title: attr.title,
            description: attr.description,
            date: attr.updatedAt,
            slug: attr.slug,
            thumbnail: attr.thumbnail.data.attributes.formats.thumbnail.url,
          };
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>