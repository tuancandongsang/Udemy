<template>
  <a-carousel
    :arrows="true"
    :autoplay="true"
    :infinite="true"
    :slidesToShow="slidesToShow"
    :dots="dots"
  >
    <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
        <left-circle-outlined />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 10px">
        <right-circle-outlined />
      </div>
    </template>
    <slot></slot>
  </a-carousel>
</template>

<script lang="ts">
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons-vue";

export default {
  props: {
    slidesToShow: Number,
    dots: Boolean,
  },
  components: {
    LeftCircleOutlined,
    RightCircleOutlined,
  },
};
</script>

<style scoped>
.ant-carousel :deep(.slick-slide) {
  overflow: hidden;
}
.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  opacity: 0.4;
  width: 50px;
  height: 50px;
  z-index: 1;
}
.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}
.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 1;
}
</style>
