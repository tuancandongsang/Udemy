<template>
  <section id="register" class="banner-register landing2 bg-primary2">
    <v-container>
      <div class="d-flex flex-column flex-md-row justify-center">
        <div
          class="
            register-box-left
            col-12 col-md-7
            mx-md-5
            pb-0
            d-flex
            flex-column
            justify-space-between
          "
          data-aos="zoom-in-down"
        >
          <div>
            <p class="register-box-title text-left size-30 white--text">
              GIẢI PHÁP HỢP ĐỒNG ĐIỆN TỬ MDO
            </p>
            <div class="box-content white--text">
              <p>
               <v-icon color="white">mdi-check-circle</v-icon> Nền tảng công nghệ mới nhất Cloud base, Mobilility, AI.. An toàn
                và bảo mật
              </p>

              <p><v-icon color="white">mdi-check-circle</v-icon> Đảm bảo tính pháp lý về giao dịch điện tử, xác thực điện tử</p>

              <p><v-icon color="white">mdi-check-circle</v-icon> Dễ dàng triển khai, áp dụng cho mọi loại hình doanh nghiệp</p>

              <p>
                <v-icon color="white">mdi-check-circle</v-icon> Tối ưu 90% thời gian và chi phí so với hợp đồng truyền thống
              </p>
            </div>
          </div>
          <div class="text-center">
            <img
              :src="require(`~/assets/images/pages/landing/banner2.png`)"
              alt=""
              srcset=""
            />
          </div>
        </div>
        <base-register-form-landing :show-subtitle="true" />
      </div>
    </v-container>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>