<template>
  <div id="singer">
    <div class="tittle">
      <div class="header"><b>Danh sách ca sỹ (số ca sỹ ở đây)</b></div>
      <div class="icon"><SwapOutlined /></div>
    </div>
    <div class="main">
      <div class="item">
        <img
          src="https://i.scdn.co/image/ab67616d0000b27301a70eaa9a7b7a562c4cd6f4"
          alt="alo alo"
        />
        <div class="song">
          <p class="song-name">Lê Bảo Bình</p>
          <p class="song-detail">Có tổng cộng xxx bài hát</p>
        </div>
        <div class="song-icon">
          <div class="icon"><PlayCircleOutlined /></div>
          <div class="icon"><DashOutlined /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SwapOutlined,
  PlayCircleOutlined,
  DashOutlined,
} from "@ant-design/icons-vue";
import "./singer.scss";

export default {
  components: { SwapOutlined, PlayCircleOutlined, DashOutlined },
};
</script>

<style></style>
