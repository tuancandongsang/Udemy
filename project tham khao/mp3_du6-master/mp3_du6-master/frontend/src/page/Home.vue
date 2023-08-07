<template>
  <div id="home">
    <div class="background"></div>
    <div class="container">
      <h1>MP3 Zing of DU6</h1>
      <div class="search">
        <div class="submit">
          <input
            type="text"
            placeholder="Search name, singer..."
            v-model="textSearch"
          />
          <button @click="SearchForName">Submit</button>
        </div>
      </div>
      <div class="list">
        <div
          class="item"
          @click="selectMenu('list')"
          :class="select === 'list' ? 'shadow' : ''"
        >
          Bài hát
        </div>
        <div
          class="item"
          @click="selectMenu('playlist')"
          :class="select === 'playlist' ? 'shadow' : ''"
        >
          Playlist
        </div>
        <div
          class="item"
          @click="selectMenu('singer')"
          :class="select === 'singer' ? 'shadow' : ''"
        >
          Singer
        </div>
      </div>
      <div class="main-home">
        <router-view></router-view>
      </div>
      <footer>
        <div class="footer">
          <span><ShopOutlined /> </span>
          <span><AudioOutlined /> </span>
          <span><SearchOutlined /> </span>
          <span><InstagramOutlined /> </span>
          <span @click="this.$router.push('/login')"> <LogoutOutlined /></span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import {
  ShopOutlined,
  AudioOutlined,
  SearchOutlined,
  InstagramOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import "./home.scss";
export default {
  components: {
    ShopOutlined,
    AudioOutlined,
    SearchOutlined,
    InstagramOutlined,
    LogoutOutlined,
  },

  name: "home",
  data() {
    return {
      select: "list",
      textSearch: "",
    };
  },
  created() {
    this.select = this.$route.name;
  },
  methods: {
    selectMenu(text) {
      this.select = text;
      this.$router.push(`${text}`);
    },
    SearchForName() {
      console.log(this.textSearch);
    },
  },
  computeds: {
    select() {
      return this.select;
    },
  },
};
</script>
