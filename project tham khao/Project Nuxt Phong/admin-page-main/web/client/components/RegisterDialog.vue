<template>
  <section id="register">
    <v-container>
      <p class="register-title text-center">Đăng ký</p>
      <div class="d-flex flex-column flex-md-row my-10 justify-center">
        <v-card
          class="register-box-left col-12 col-md-6"
          color="#F4F4F4"
        >
          <p class="size-18">
            Sẵn sàng đồng hành giải quyết những thách thức phức tạp nhất của bạn
            với các giải pháp tùy chỉnh.
            <br />
            Là sản phẩm được các doanh nghiệp lớn tin tưởng lựa chọn.
          </p>
          <div class="text-center">
            <img
              data-aos="fade-up"
              class="logo-register"
              src="~assets/images/logo-mdo-big.svg"
              alt=""
            />
          </div>
        </v-card>
        <base-register-form />
      </div>
    </v-container>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>