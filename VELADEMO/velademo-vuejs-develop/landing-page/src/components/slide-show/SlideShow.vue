<template>
  <div class="carousel">
    <a-carousel arrows>
      <template #prevArrow>
        <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
          <button type="button" class="btn-slide btn-slide-previous">
            <span>
              <img src="../../assets/images/angle-l-24.png" alt="angle-l-24" />
            </span>
          </button>
        </div>
      </template>
      <template #nextArrow>
        <div class="custom-slick-arrow" style="right: 10px">
          <button type="button" class="btn-slide btn-slide-next">
            <span>
              <img src="../../assets/images/angle-r-24.png" alt="angle-l-24" />
            </span>
          </button>
        </div>
      </template>
      <div class="carousel-item">
        <div class="body">
          <h5 class="animate__animated animate__bounceInLeft">
            <b>Quick parcel delivery, </b>
            <span>from $25</span>
          </h5>
          <h2 class="animate__animated animate__bounceInLeft animate__delay-1s">
            Everyone’s Talking<br />About Sweeper and funnel.
          </h2>
          <button
            class="btn-shop animate__animated animate__bounceInLeft animate__delay-2s"
            type="button"
          >
            <span>Start Shopping</span>
            <span>
              <img src="../../assets/images/angle-r-w.png" alt="angle-r_w" />
            </span>
          </button>
        </div>
      </div>
      <div class="carousel-item">
        <div class="body">
          <h5 class="animate__animated animate__bounceInLeft">
            <b>Quick parcel delivery, </b>
            <span>from $25</span>
          </h5>
          <h2>Everyone’s Talking<br />About Sweeper and funnel.</h2>
          <button class="btn-shop" type="button">
            <span>Start Shopping</span>
            <span>
              <img src="../../assets/images/angle-r-w.png" alt="angle-r_w" />
            </span>
          </button>
        </div>
      </div>
      <div class="carousel-item">
        <div class="body">
          <h5 class="animate__animated animate__bounceInLeft">
            <b>Quick parcel delivery, </b>
            <span>from $25</span>
          </h5>
          <h2>Everyone’s Talking<br />About Sweeper and funnel.</h2>
          <button class="btn-shop" type="button">
            <span>Start Shopping</span>
            <span>
              <img src="../../assets/images/angle-r-w.png" alt="angle-r_w" />
            </span>
          </button>
        </div>
      </div>
      <div class="carousel-item">
        <div class="body">
          <h5 class="animate__animated animate__bounceInLeft">
            <b>Quick parcel delivery, </b>
            <span>from $25</span>
          </h5>
          <h2>Everyone’s Talking<br />About Sweeper and funnel.</h2>
          <button class="btn-shop" type="button">
            <span>Start Shopping</span>
            <span>
              <img src="../../assets/images/angle-r-w.png" alt="angle-r_w" />
            </span>
          </button>
        </div>
      </div>
    </a-carousel>
  </div>
</template>

<script lang="ts">
import "./slide-show.scss";

import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons-vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    LeftCircleOutlined,
    RightCircleOutlined,
  },
});
</script>

<style scoped>
/* For demo */
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
