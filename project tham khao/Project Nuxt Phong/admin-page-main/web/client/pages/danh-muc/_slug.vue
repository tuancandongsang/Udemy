<template>
  <div id="wrap-main">
    <blog-header
        :page="pageSearch"
        @search-blog="searchBlog"
        @key-word="keyword"
        @total-page="emitTotalPage"
        @total-element="emitTotal"
    />
    <v-container>
      <section v-if="!isSearch" class="list-blog-post">
        <div class="row my-5">
          <div class="col-12">
            <!--            list post of category-->
            <category-list-post :slug="slug"/>
          </div>
        </div>
      </section>
      <section v-else class="list-blog-post">
        <div class="list-post-detail">
          <h2 class="mb-7">Đã tìm thấy <span style="color: red">{{ totalElementSearch }}</span> kết quả liên quan </h2>
          <v-card
              v-for="(blog, i) in blogSearch"
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
              :to="`/blog/${blog.slug}`"
          >
            <div class="thumb-post d-flex align-self-center">
              <img :src="blog.thumbnail"/>
            </div>
            <div class="post-item-right">
              <p class="post-item-title">{{ blog.title }}</p>
              <p class="post-item-detail">
                {{ blog.description }}
              </p>
              <div class="post-date">{{ formatDate(blog.date) }}</div>
            </div>
          </v-card>
          <div class="text-center mt-8" v-if="totalPageSearch > 1">
            <v-pagination
                circle
                v-model="pageSearch"
                :length="totalPageSearch"
                :total-visible="7"
            ></v-pagination>
          </div>
        </div>
      </section>
    </v-container>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
import MDOService from '@/api/mdoService';
import minxinDate from '@/mixins/mixinDate';

export default {
  mixins: [minxinDate],
  mounted() {
    AOS.init({
      offset: 0
    });
    window.scroll(0, 5);
    this.getBlogsByCategory(this.page);
  },
  data() {
    return {
      slug: '',
      isSearch: false,
      blogs: [],
      blogSearch: [],
      word: null,
      totalPage: 1,
      totalPageSearch: 1,
      page: 1,
      pageSearch: 1,
      totalElement: 1,
      totalElementSearch: 1
    };
  },
  created() {
    this.slug = this.$route.params.slug;
  },
  watch: {
    page() {
      this.getBlogsByCategory(this.page);
    }
  },
  methods: {
    searchBlog(blogs) {
      this.blogSearch = blogs;
      this.blogSearch.length > 0 ? this.isSearch = true : this.isSearch = false;
    },
    keyword(value) {
      this.word = value;
    },
    emitTotalPage(value) {
      this.totalPageSearch = value;
    },
    emitTotal(value) {
      this.totalElementSearch = value;
    },
    async getBlogsByCategory(page) {
      const response = await MDOService.getBlogsByCategory(page, this.slug);
      if (response) {
        this.totalPage = response.meta.pagination.pageCount;
        this.page = response.meta.pagination.page;
        this.blogs = response.data;
      }
    }
  }
};
</script>
