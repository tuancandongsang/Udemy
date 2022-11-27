<template>
  <div class="row mt-4 mb-4">
    <div class="siderbar">
      <div class="siderbar-search">
        <div class="search-group">
          <input
            type="text"
            v-model="search"
            placeholder="Search our blogs"
            class="search-group__input form-control"
          />
          <div class="search-group-addon">
            <button
              class="btn search-group-addon__btn"
              @click="handleSearch"
              type="button"
            >
              <img src="../../assets/images/search.png" alt="search-i" />
            </button>
          </div>
        </div>
      </div>
      <h4 class="siderbar__title">Recent Articles</h4>
      <div class="siderbar-content">
        <ul class="siderbar-content-item">
          <li
            class="siderbar-content-item__list"
            v-for="item in productBlog.voList"
            :key="item.id"
          >
            {{ item.title }}
            <p class="siderbar-content-item__time">Apr 04, 2020</p>
          </li>
        </ul>
      </div>
      <h4 class="siderbar__title">Categories</h4>
      <div class="siderbar-content">
        <ul class="siderbar-content-category">
          <li
            class="siderbar-content-category__item"
            v-for="item in categories"
            :key="item"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <h4 class="siderbar__title">Articles Tags</h4>
      <div class="siderbar-content">
        <ul class="siderbar-content-tag">
          <li class="siderbar-content-tag__item"><span>Apps</span></li>
          <li class="siderbar-content-tag__item">
            <span>Conference</span>
          </li>
          <li class="siderbar-content-tag__item">
            <span>Developers</span>
          </li>
          <li class="siderbar-content-tag__item">
            <span>Enterprise</span>
          </li>
          <li class="siderbar-content-tag__item">
            <span>Startups</span>
          </li>
        </ul>
      </div>
      <div class="siderbar-banner">
        <div class="siderbar-banner__img">
          <img
            src="https://cdn.shopify.com/s/files/1/0376/9440/6700/files/banner2_360x.jpg?v=1629543119"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./sider-bar.scss";
import BlogsService from "@/api/BlogsService";
import CategoryService from "@/api/CategoryService";

export default {
  data() {
    return {
      search: "",
      productBlog: [],
      categories: [],
    };
  },
  methods: {
    handleSearch() {

    },
  },
  async created() {
    const response = await BlogsService.getListBlogs(1,7);
    this.productBlog = response;
    const resCategory = await CategoryService.getCategory();
    this.categories = resCategory;
  },
};
</script>
