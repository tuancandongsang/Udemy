<template>
  <div id="list">
    <div class="tittle">
      <div class="header"><b>Bài hát (số bài ở đây)</b></div>
      <div class="icon"><SwapOutlined /></div>
    </div>
    <div ref="productsList" @scroll="handleScroll" class="main">
      <div v-for="item in products" :key="item.id">
        <div class="item">
          <img :src="item.url" alt="ten sy" />
          <div class="song">
            <p class="song-name">{{ item.id }}</p>
            <p class="song-detail">{{ item.title }}</p>
          </div>
          <div class="song-icon">
            <div class="icon"><DownloadOutlined /></div>
            <div class="icon"><DashOutlined /></div>
          </div>
        </div>
      </div>
      <div v-if="loading">Loading...</div>
    </div>
  </div>
</template>

<script>
import {
  SwapOutlined,
  DownloadOutlined,
  DashOutlined,
} from "@ant-design/icons-vue";
import "./list.scss";
import axios from "axios";

export default {
  components: { SwapOutlined, DownloadOutlined, DashOutlined },
  data() {
    return {
      products: [],
      loading: false,
      start: 0,
      limit: 10,
      totalProducts: null,
    };
  },
  created() {},
  methods: {
    async getProducts() {
      this.loading = true;
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_start=${this.start}&_limit=${this.limit}`
      );
      this.totalProducts = response.data;
      this.products = [...this.products, ...this.totalProducts];
      this.loading = false;
    },
    async handleScroll() {
      const list = this.$refs.productsList;
      console.log("list", list);
      if (list.scrollTop + list.clientHeight + 2 >= list.scrollHeight) {
        this.start += 10;
        await this.getProducts();
      }
    },
  },
  async mounted() {
    await this.getProducts();
  },
};
</script>

<style></style>
