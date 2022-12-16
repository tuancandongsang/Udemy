<template>
  <section class="pt-12 landing-solution">
    <v-container>
      <div class="section-title text-center" data-aos="zoom-in">
        ÁP DỤNG HẦU HẾT CÁC LOẠI HỢP ĐỒNG
      </div>
      <div class="section-subtitle text-center" data-aos="zoom-in">
        Hợp đồng điện tử MDO cho phép ký mọi lúc, mọi nơi, mọi thiết bị.
      </div>
      <div class="d-flex flex-column flex-md-row justify-space-bettwen mt-12">
        <v-card class="benefit bg-primary outlined" data-aos="zoom-in">
          <div class="benefit-content white--text">
            <p>Hợp đồng lao động</p>
            <p>Hợp đồng trao đổi/ mua bán</p>
            <p>Hợp đồng thuê khoán</p>
            <p>Hợp đồng cung cấp dịch vụ</p>
            <p>Hợp đồng xây dựng</p>
            <p>Hợp đồng đại lý</p>
            <p>Hợp đồng thương mại, dịch</p>
          </div>
        </v-card>
        <v-card class="benefit outlined" data-aos="zoom-in">
          <div class="benefit-content">
            <p>Hợp đồng mượn/ tặng cho tài sản</p>
            <p>Hợp đồng thuê/ vay tài sản</p>
            <p>Đơn đặt hàng</p>
            <p>Bảo lãnh ngân hàng</p>
            <p>Hợp đồng, chứng nhận bảo hiểm</p>
            <p>Hợp đồng cho vay tín dụng</p>
            <p>Hợp đồng mở thẻ online</p>
            <p>Hợp đồng dịch vụ viễn thông</p>
          </div>
        </v-card>
      </div>
      <div class="text-center" data-aos="zoom-in">
        <v-btn color="primary" @click="showRegister" outlined rounded>Đăng ký Nhận demo</v-btn>
      </div>
    </v-container>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations({
      setOpenDialogRegister: "register/setOpenDialogRegister",
    }),
    showRegister() {
      this.setOpenDialogRegister(true);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>