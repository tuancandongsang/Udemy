<template>
  <div class="row mt-4 mb-4">
    <div class="blog-body">
      <div class="card" v-for="item in productBlog" :key="item.id">
        <img :src="urlImg + item?.images[0]?.url" class="card-img-top" alt="..." />
        <div class="blog__title">lifestyle</div>
        <div class="blog-article d-flex">
          <span class="blog-article__author">{{ item.userName }}</span>
          <span>Apr 04, 2020</span>
        </div>
        <div class="blog__text">{{ item.title }}</div>
        <p class="card-text">{{ item.description }}</p>
        <button class="blog-btn">
          Read More
          <span><i class="fa-regular fa-circle-right"></i></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import "./product-blog.scss";
import BlogsService from "@/api/BlogsService";

export default {
  data() {
    return {
      productBlog: [],
      urlImg: "http://localhost:8081/api/image/downloadFile/",
    };
  },
  async created() {
    const response = await BlogsService.getListBlogs(1,6);
    this.productBlog = response.voList;
  },
};
</script>
