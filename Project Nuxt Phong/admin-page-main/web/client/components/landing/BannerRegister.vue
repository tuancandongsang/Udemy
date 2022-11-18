<template>
  <section id="register" class="banner-register bg-primary" style="padding-top : 20px">
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
              GIẢI PHÁP CHUYỂN ĐỔI SỐ <br>
              TOÀN DIỆN CHO DOANH NGHIỆP
            </p>
            <div class="box-content">
              <p>
                <v-icon color="white">mdi-check-circle</v-icon>
                Quản lý và điều hành dễ dàng hơn với hệ thống quản trị tổng
                thể
              </p>
              <p>
                <v-icon color="white">mdi-check-circle</v-icon>
                Tinh gọn và số hóa toàn diện bộ máy vận hành, tăng hiệu suất
                công việc
              </p>
              <p>
                <v-icon color="white">mdi-check-circle</v-icon>
                Nhân viên làm việc hiệu quả, nhà quản lý ra quyết định dễ dàng
                và chính xác.
              </p>
              <p>
                <v-icon color="white">mdi-check-circle</v-icon>
                Tối ưu chi phí quản trị doanh nghiệp, thúc đẩy tăng trưởng doanh
                thu
              </p>
            </div>
          </div>
          <div class="text-center">
            <img
                :src="require(`~/assets/images/pages/landing/banner1.png`)"
                alt=""
                srcset=""
            />
          </div>
        </div>
        <base-register-form-landing :show-subtitle="true"/>
      </div>
    </v-container>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
