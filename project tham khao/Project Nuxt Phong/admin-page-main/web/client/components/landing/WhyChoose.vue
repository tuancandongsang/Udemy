<template>
  <section class="landing-choose">
    <v-container>
      <div class="section-title" data-aos="zoom-in">TẠI SAO KHÁCH HÀNG CHỌN CHÚNG TÔI</div>
      <div class="section-subtitle text-center" data-aos="zoom-in">
        Giải pháp toàn diện, tối ưu chi phí quản trị, chăm sóc tận tình.
      </div>
      <div
        class="
          row
          flex-sm-row
          justify-space-between
          flex-wrap
          mt-15
        "
      >
        <div
          v-for="(item, i) in items"
          :key="i"
          class="
            col-6 col-md-3 col-sm-4
            choose-item
            d-flex
            align-center
            flex-column
            mb-4
          "
           data-aos="zoom-in-down"
           :data-aos-delay="i*100"
        >
          <v-avatar size="80" color="white" class="elevation-3">
            <img
              :src="require(`~/assets/images/pages/landing/icon/${item.icon}`)"
              style="width:50%"
            />
          </v-avatar>
          <!-- <v-btn color="white" fab class="mb-4">
           
          </v-btn> -->
          <div class="choose-item-content py-4">{{ item.content }}</div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "cup.svg",
          content:
            "Là  Doanh nghiệp ICT hàng đầu Việt Nam, hoạt động lâu năm trong lĩnh vực CNTT.",
        },
        {
          icon: "1.svg",
          content:
            "Là đối tác số 1 của các doanh nghiệp đa ngành: bất động sản, tài chính, ngân hàng, bán lẻ, sản xuất…",
        },
        {
          icon: "share.svg",
          content: "Giải pháp toàn diện: Hạ tầng, sản phẩm, dịch vụ…",
        },
        {
          icon: "folder.svg",
          content:
            "Đa dạng các Phương án  triển khai, tối ưu chi phí  cho Doanh nghiệp",
        },
        {
          icon: "plane.svg",
          content:
            "Triển khai nhanh chóng, Hỗ trợ tích hợp hệ thống với các ứng dụng của khách hàng",
        },
        {
          icon: "protect.svg",
          content:
            "Hệ thống sử dụng công  nghệ Webbase, an toàn – bảo mật với nền tảng  HQTCSDL Oracle 11R2",
        },
        {
          icon: "upload.svg",
          content:
            "Dữ liệu được lưu trữ linh hoạt tùy theo nhu cầu của doanh nghiệp trên nền tảng Cloud hay On Premise",
        },
        {
          icon: "service.svg",
          content:
            "Hỗ trợ tận tình, chu đáo  24/7 qua tổng đài, các group hỗ trợ như:  Skype, Zalo, Email,…",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>