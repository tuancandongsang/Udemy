<template>
  <section class="pt-12 landing-solution">
    <v-container>
      <div class="section-title text-center" data-aos="zoom-in">
        LỢI ÍCH CỦA HỢP ĐỒNG ĐIỆN TỬ MDO
      </div>
      <div class="section-subtitle text-center" data-aos="zoom-in">
        Nền tảng thông minh, giải pháp giúp doanh nghiệp trở lên vượt trội hơn
      </div>
      <div class="d-flex flex-column flex-md-row justify-space-bettwen mt-12">
        <v-card class="benefit outlined" data-aos="zoom-in">
          <div class="benefit-content">
            <p class="benefit-title">Quản lý toàn trình</p>
            <p>
              Rút ngắn quy trình từ 48 giờ xuống chỉ còn 1 phút so với hợp đồng
              ký giấy thông thường
            </p>
            <p>
              Ký trực tiếp trên mọi thiết bị: máy tính, điện thoại thông minh,
              máy tính bảng
            </p>
            <p>Linh động, tùy chỉnh theo tổ chức, doanh nghiệp</p>
            <p>Lưu trữ an toàn, bảo mật. Tìm kiếm thông minh</p>
          </div>
        </v-card>
        <v-card class="benefit bg-primary outlined" data-aos="zoom-in">
          <div class="benefit-content white--text">
            <p class="benefit-title">7 KHÔNG</p>
            <p>Không phí in ấn</p>
            <p>Không phí chuyển phát</p>
            <p>Không phí lưu kho</p>
            <p>Không phụ thuộc không gian địa lý</p>
            <p>Không phụ thuộc thời gian</p>
            <p>Không rủi ro thất lạc</p>
            <p>Không gián đoạn thời gian</p>
          </div>
        </v-card>
      </div>
      <div class="text-center" data-aos="zoom-in">
        <v-btn color="primary" id="btn-register-demo-benefit" outlined rounded @click="showRegister"
          >Đăng ký Nhận demo</v-btn
        >
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