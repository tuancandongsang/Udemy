<template>
  <div id="wrap-main">
    <banner
        :banner="banner"
    />
    <intro/>
    <detail/>
    <register/>
  </div>
</template>

<script>
import Banner from "@/components/recruit/Banner";
import Intro from "@/components/recruit/Intro";
import Detail from "@/components/recruit/Detail";
import Register from "@/components/recruit/Register";
import AOS from "aos";

export default {
  name: "index",
  components: {Intro, Banner, Detail, Register},
  head: {
    title: 'Tuyển dụng Công ty - mdo.com.vn',
    meta: [
      {
        name: 'title',
        content:
            'MDO - Giới thiệu Công ty - mdo.com.vn'
      },
      {
        name: 'description',
        content:
            'Thông tin về tuyển dụng nhân sự công ty MDO Việt Nam'
      }
    ],

  },
  mounted() {
    AOS.init({
      offset: 0
    });
    window.scroll(0, 5);
  },
  data() {
    return {
      titleBanner: 'Tuyển Dụng BSS',
      subTitleBanner:
          'Công ty TNHH phát triển hệ thống dịch vụ công nghệ thông tin (BSSD) là doanh nghiệp hoạt động lâu năm\n' +
          'trong lĩnh vực công nghệ thông tin (CNTT). Là nơi hội tụ những con người có nhiều năm kinh nghiệm trong lĩnh vực CNTT từng tốt nghiệp tại các trường đại học hàng đầu có khát vọng lớn, Hứa hẹn sẽ đưa BSSD nói\n' +
          'riêng và nền công nghệ nước nhà nói chúng vươn tầm quốc tế.\n' +
          'Chúng tôi tự hào cung cấp các sản phẩm, giải pháp và dịch vụ CNTT tối ưu, nhằm mang lại giá trị thiết thựcnhất cho khách hàng, đối tác và các thành viên công ty.\n' +
          'Mang trong mình khát vọng lớn BSSD liên tục tìm kiếm những cá nhân xuất sắc có chung khát vọng cùng nhau phát triển, chiếm lĩnh thị trường trong nước làm bước đệm tiến ra thì trường quốc tế.',
      banner: 'pages/tuyenDungBssd.png'
    };
  },
  methods: {}
}
</script>

<style scoped>

</style>