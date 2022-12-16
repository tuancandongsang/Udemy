<template>
  <section id="footer">
    <v-container>
      <v-row>
        <v-col>
          <h4>Công ty TNHH Phát triển Hệ Thống Dịch vụ Công nghệ thông tsin</h4>
          <p>
            Với mục tiêu “Mang lại giá trị tối ưu cho khách hàng và đối tác”, chúng tôi tạo ra một hệ sinh thái Văn phòng số với đầy đủ phân hệ, chức năng nhằm mục tiêu chuyển đổi số toàn diện các 
            hoạt động văn phòng, tối ưu chi phí & hỗ trợ công tác quản trị, điều hành doanh nghiệp.
          </p>
        </v-col>
        <v-col>
          <h4>Thông tin liên hệ</h4>
          <div class="d-flex align-center">
            <v-icon>mdi-map-marker-radius-outline</v-icon>
            <span>Số 1, Lô 4E, Trung Yên 10B, Yên Hoà, Cầu Giấy, Hà Nội</span>
          </div>
          <div class="d-flex align-center">
            <v-icon>mdi-phone-in-talk-outline</v-icon>
            <span>+84 981910368</span>
          </div>
          <div class="d-flex align-center">
            <v-icon>mdi-email-fast-outline</v-icon>
            <span>sales@bssd.vn</span>
          </div>
        </v-col>
        <v-col>
          <h4>Bản Tin</h4>
          <p>
            Nhận Email thông báo về cập nhật ứng dụng và những dòng sản phẩm mới nhất của chúng tôi. 
          </p>
          <v-text-field label="Nhập Email" outlined dense rounded></v-text-field>
          <v-btn rounded>Subscribe</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "FooterApp",
};
</script>

<style lang="scss" scoped>
</style>