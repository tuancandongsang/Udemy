<template>
  <div id="wrap-main" style="padding-top: 20px">
    <blog-header
        :page="page"
        @search-blog="searchBlog"
        @key-word="keyword"
        @total-page="emitTotalPage"
        @total-element="emitTotal"
        @slug-header="emitSlugHeader"
    />

    <v-container>
      <div class="row my-5">
        <div class="col-12 col-md-8" v-if="searchBlog">
          <feature v-if="!isSearch"/>
          <list-post
              :blog-search="blogs"
              :keyword="word"
              v-if="!isSearch"/>

          <!--          list post detail-->
          <div v-else class="list-post-detail">
            <h2 class="mb-7">Đã tìm thấy <span style="color: red">{{ totalElement }}</span> kết quả liên quan </h2>
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
            <div class="text-center mt-8" v-if="totalPage > 1">
              <v-pagination
                  circle
                  v-model="page"
                  :length="totalPage"
                  :total-visible="7"
              ></v-pagination>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <blog-sidebar/>
        </div>
      </div>
    </v-container>
    <blog-register/>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
import MixinDate from '@/mixins/mixinDate';
import Feature from '@/components/blog/Feature';
import ListPost from '@/components/blog/ListPost';

export default {
  head: {
    title: 'Tổng hợp kiến thức trong quản trị doanh nghiệp',
    meta: [
      {
        name: 'title',
        content: 'MDO - Tổng hợp kiến thức trong quản trị doanh nghiệp'
      },
      {
        name: 'description',
        content:
            'MDO Blog - Chuyên trang tổng hợp và cung cấp kiến thức, chia sẻ kinh nghiệm về lĩnh vực quản trị doanh nghiệp, quảng cáo trực tuyến, xây dựng thương hiệu,…'
      }
    ]
  },
  mixins: [MixinDate],
  components: {
    Feature,
    ListPost
  },
  mounted() {
    AOS.init({
      offset: 0
    });
    window.scroll(0, 5);
  },

  data() {
    return {
      isSearch: false,
      blogs: [],
      word: null,
      slugHeader: '',
      totalPage: 1,
      page: 1,
      totalElement: 1
    };
  },
  methods: {
    searchBlog(blogs) {
      this.blogs = blogs;
      if (this.blogs.length > 0) {
        return this.isSearch = true;
      }
      this.isSearch = false;
    },
    keyword(value) {
      this.word = value;
    },
    emitTotalPage(value) {
      this.totalPage = value;
    },
    emitTotal(value) {
      this.totalElement = value;
    },
    emitSlugHeader(value) {
      this.slugHeader = value;
    }
  }
};
</script>
