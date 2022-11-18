<template>
  <section id="about-detail" class="py-6">
    <section class="py-6">
      <div class="d-flex text-center title-recruit align-center justify-center" data-aos="zoom-in-up">
        <p class="text-title-recruit">
          Những vị trí tuyển dụng của BSSD
        </p>
      </div>
    </section>
    <section id="contact-info">
      <v-container class="d-flex flex-wrap justify-space-between align-center align-content-stretch">
        <div v-for="(item,index) in listPositionToApply" :key="index">
          <div class="d-flex flex-column flex-wrap align-content-space-around  align-start mt-5">
            <v-chip
            >
              {{ item.positionName }}
            </v-chip>
            <span class="description-job mt-1 ml-3"><b>Mô tả Công việc :</b></span>
            <ul class="ml-4 mt-1" v-for="(content, idx) in item.listContent" :key="idx">
              <li>{{ content }}</li>
            </ul>
            <span class="ml-10 mt-1"><a href="">Xem chi tiết  &nbsp&nbsp&nbsp> </a></span>
          </div>
        </div>
      </v-container>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      listPositionToApply: [
        {
          id: 1,
          positionName: 'Flutter',
          listContent: [
            'Xây dựng và thiết lập hệ thống khách hàng dựa trên blockchain.',
            'Làm việc với BA để phân tích và thiết kế tính năng',
            'Triển khai, testing backend, front end, ứng dụng di động',
            'Làm việc với agile/scrum'
          ]
        },
        {
          id: 2,
          positionName: 'Lập trình viên Java',
          listContent: [
            'Triển khai dự án Hệ thống văn phòng điện tử,E-commerce.',
            'Thiết kế, lập trình, xây dựng, phát triển các chức năng của hệ thống.',
            'Viết API kết nối giữa với mobile & web',
            'Báo cáo hàng ngày, hàng tuần cho cấp trên và team member trong dự án;'
          ]
        },
        {
          id: 3,
          positionName: 'Java Intern',
          listContent: [
            'Được đào tạo bởi các team leader có kinh nghiệm.',
            'Tham gia phát triển, xây dựng sản phẩm mới.',
            'Làm việc, phối hợp công việc theo nhóm dưới sự phân công của quản lý dự án.',
            'Chi tiết trao đổi trong quá trình phỏng vấn.'
          ]
        },
        {
          id: 5,
          positionName: 'Tester',
          listContent: [
            'Lập kế hoạch kiểm thử phần mềm (Test plan)',
            'Viết tài liệu kịch bản kiểm thử phần mềm (Testcase), chuẩn bị data test',
            'Viết automation scripts',
            'Test các module chức năng'
          ]
        },
        {
          id: 4,
          positionName: 'Lập trình viên',
          listContent: [
            'Phân tích yêu cầu từ khách hàng, thiết kế,',
            'lập trình phía Front-end cho hệ thống web sử dụng ngôn ngữ ReactJS hoặc VueJS.',
            'Phối hợp với thành viên khác  (Trưởng nhóm, Tester, khách hàng)',
            'Triển khai dự án nhằm đạt được mục tiêu đã đề ra'
          ]
        },
        {
          id: 6,
          positionName: 'UI/UX Desgner',
          listContent: [
            'Thiết kế UX, UI cho Web design, Mobileapp,Card Design',
            'Thiết kế, nghiên cứu và lên bố cục giao diện, người dùng cho sản phẩm',
            'Phân tích yêu cầu người dùng',
            'Xây dựng mockup cho ra bản prototype tối ưu cho người dùng'
          ]
        }
      ]
    }
  }
};
</script>

<style lang="scss" scoped>

.title-recruit {
  background-color: #00BCD4 !important;
  min-height: 100px !important;
}

.text-title-recruit {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 141.5%;
  /* or 45px */

  text-align: center;

  color: #FFFFFF;
}

.theme--light.v-chip:not(.v-chip--active) {
  background: #FFFFFF;
  border: 1px solid #00BCD4;
  box-shadow: 5px 10px 32px rgba(193, 193, 193, 0.25);
  border-radius: 180px;
}

.v-chip.v-chip--no-color.theme--light.v-size--default {
  font-family: 'Poppins';
  font-style: normal !important;
  font-weight: 700 !important;
  font-size: 24px !important;
  line-height: 36px !important;
  display: flex !important;
  align-items: center !important;
  color: #00BCD4 !important;
}

.description-job {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: #333535;
}

</style>
