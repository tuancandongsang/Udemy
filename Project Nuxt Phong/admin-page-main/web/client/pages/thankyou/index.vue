<template>
  <div id="wrap-main" class="thank-page">
    <v-container>
      <div class="text-center py-8">
        <h2 class="primary--text size-32">CẢM ƠN BẠN!</h2>
        <div class="size-28">ĐÃ ĐĂNG KÝ TRẢI NGHIỆM MDO</div>
          <v-img class="mx-auto my-8" :src="require(`~/assets/images/thank.png`)" max-width="600" />
        <p class="text-center">
          Chuyên viên tư vấn sẽ liên lạc với bạn trong thời gian sớm nhất
        </p>
        <v-btn color="primary" class="btn-call" tel="373958888"
          >Bởi tổng đài 037.395.8888</v-btn
        >
      </div>
    </v-container>
  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
export default {
  mounted() {
    AOS.init({
      offset: 0,
    });
    window.scroll(0, 5);
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
