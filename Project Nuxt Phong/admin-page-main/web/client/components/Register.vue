<template>
  <section id="register" class="bg-primary">
    <v-container>
      <p class="register-title text-center black--text">Đăng ký</p>
       <p class="size-18 text-center black--text">
            Sẵn sàng đồng hành giải quyết những thách thức phức tạp nhất của bạn
            với các giải pháp tùy chỉnh.
            <br />
            Là sản phẩm được các doanh nghiệp lớn tin tưởng lựa chọn.
          </p>
      <div class="d-flex flex-column flex-md-row my-10 justify-center">
        <base-register-form-home :bg-form="'transparent'" />
      </div>
    </v-container>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>