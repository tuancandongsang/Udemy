<template>
  <div class="blog-header">
    <v-navigation-drawer
        fixed
        v-model="drawer"
        class="hidden-md-and-up menu-mobile"
    >
      <v-list nav dense>
        <v-list-item-group>
          <template v-for="(item, index) in menu">
            <nuxt-link :to="item.link" :key="index">
              <v-list-item :key="index">
                <v-list-item-title class="text-uppercase">{{
                    item.title
                  }}
                </v-list-item-title>
              </v-list-item>
            </nuxt-link>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-container class="pb-0">
      <v-toolbar dense flat>
        <v-toolbar-items class="hidden-sm-and-down nav-item">
          <template v-for="(item, index) in menu">
            <nuxt-link :to="item.link" :key="index">
              <v-btn text>{{ item.title }}</v-btn>
            </nuxt-link>
          </template>
        </v-toolbar-items>
        <v-btn
            color="primary"
            class="hidden-md-and-up"
            icon
            @click.stop="drawer = !drawer"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-text-field
            v-model="keyword"
            rounded
            outlined
            dense
            class="primary--text v-input--is-focused"
            hide-details
            placeholder="Tìm kiếm"
            append-icon="mdi-magnify"
            @change="trimSpace(keyword)"
            @keyup.enter="searchBlogKeyword"
            @click:clear="resetSearch"
        ></v-text-field>
      </v-toolbar>
    </v-container>
    <v-divider></v-divider>
  </div>
</template>

<script>
import MDOService from '~/api/mdoService';

export default {
  props: {
    page: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      drawer: false,
      keyword: '',
      totalPage: 1,
      totalElement: 0,
      blogs: null,
      root: {
        link: '/blog',
        title: 'Trang chủ'
      },
      menu: [],
      slugHeader: ''
    };
  },
  watch: {
    page() {
      this.searchBlog(this.page);
    },
    blogs() {
      this.$emit('blogs', this.blogs);
    },
    keyword() {
      this.$emit('key-word', this.keyword);
    },
    totalPage() {
      this.$emit('total-page', this.totalPage);
    },
    totalElement() {
      this.$emit('total-element', this.totalElement);
    },
    slugHeader() {
      this.$emit('slug-header', this.slugHeader);
    }

  },
  created() {
    this.getCategories();
    this.slugHeader = this.$route.params.slug;
  },
  methods: {
    async getCategories() {
      const response = await MDOService.getCategories();
      if (response) {
        var categories = response.data.map((cat) => {
          const attr = cat.attributes;
          return {
            link: `/danh-muc/${attr.slug}`,
            title: attr.name.toUpperCase()
          };
        });
        categories.unshift(this.root);
        this.menu = categories;
      }
    },
    async searchBlog(page) {
      if (!this.keyword) {
        this.blogs = [];
        this.$emit('search-blog', this.blogs);
        return null;
      }
      const blogs = await MDOService.searchBlog(this.keyword, page);
      // const blogs = await MDOService.getBlogsByCategoryAndKeyWordContaing(page, this.slugHeader, this.keyword);
      if (blogs) {
        this.totalPage = blogs.meta.pagination.pageCount;
        this.page = blogs.meta.pagination.page;
        this.totalElement = blogs.meta.pagination.total;
        this.blogs = blogs.data.map((blog) => {
          const attr = blog.attributes;
          return {
            title: attr.title,
            description: attr.description,
            date: attr.updatedAt,
            slug: attr.slug,
            thumbnail: attr.thumbnail.data.attributes.formats.thumbnail.url
          };
        });
        this.$emit('search-blog', this.blogs);

      }
    }
    ,
    searchBlogKeyword() {
      let keyword = this.keyword;
      keyword = keyword.trim().length > 0 ? keyword : '';
      this.keyword = keyword;
      this.searchBlog();
    },
    resetSearch() {
      this.keyword = '';
      this.searchBlog();
    },
    trimSpace(keyword) {
      return keyword.trim();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
