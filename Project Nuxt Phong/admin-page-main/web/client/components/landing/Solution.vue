<template>
  <div>
    <section class="landing-solution border-bottom">
      <v-container>
        <div class="section-title" data-aos="zoom-in">
          CÁC GIẢI PHÁP TIÊU BIỂU CỦA MDO
        </div>
        <div class="section-subtitle text-center" data-aos="zoom-in">
          Được tích hợp toàn diện với nhau, dễ dàng sử dụng trên trình duyệt web
          và Mobile
        </div>
        <div class="border-bottom my-8"></div>
        <div
          class="
            section-content
            d-flex
            flex-column flex-md-row
            align-center
            justify-space-between
          "
        >
          <div class="section-left">
            <p class="primary--text" data-aos="zoom-in-down">KÝ ĐIỆN TỬ</p>
            <p data-aos="zoom-in-down">
              Đáp ứng đầy đủ tiêu chuẩn pháp lý, an toàn bảo mật tuyệt đối
            </p>
            <p data-aos="zoom-in-down">
              Giải pháp Ký điện tử tích hợp trong quy trình giúp doanh nghiệp
              giải quyết bài toán giao dịch điện tử và ký tá văn bản nội bộ. ký
              mọi lúc mọi nơi một cách dễ dàng, an toàn, bảo mật và nhanh chóng,
              đảm bảo giá trị pháp lý tương đương như khi sử dụng phương thức ký
              truyền thống.
            </p>
            <ul class="section-detail-list-item" data-aos="zoom-in-down">
              <li>
                Ký trên đa dạng các lại chứng từ : Hợp đồng, văn bản, tài
                liệu...
              </li>
              <li>
                Cho phép ký nhiều văn bản một lúc, rút ngăn thời gian thực hiện
                bằng 1/10 so với ký tay
              </li>
              <li>
                Tự động thông báo việc phê duyệt, thực hiện ký tới các đối tượng
                liên quan trong luồng quy trình
              </li>
              <li>
                Lưu trữ tập trung, dễ dàng tìm kiếm . An toàn bảo mật, giảm
                thiểu rủi ro phân tán, thất lạc văn bản.
              </li>
              <li>
                Tối ưu 70% thời gian và chi phí cho doanh nghiệp so với phương
                thức truyền thống
              </li>
            </ul>
            <v-btn
              data-aos="zoom-in"
              class="hidden-sm-and-down"
              color="primary"
              id="btn-ky-dien-tu"
              @click="showRegister"
              outlined
              rounded
              >Đăng ký Nhận demo</v-btn
            >
          </div>
          <div class="section-right">
            <img
              data-aos="zoom-in"
              :src="require(`~/assets/images/pages/landing/solution.png`)"
              alt=""
            />
            <div class="text-center" data-aos="zoom-in">
              <v-btn
                class="hidden-md-and-up"
                color="primary"
                id="btn-ky-dien-tu"
                @click="showRegister"
                outlined
                rounded
                >Đăng ký Nhận demo</v-btn
              >
            </div>
          </div>
        </div>
      </v-container>
    </section>
    <section class="landing-solution border-bottom">
      <v-container>
        <div
          class="
            section-content
            d-flex
            flex-column flex-md-row
            align-center
            flex-md-row-reverse
            justify-space-between
          "
        >
          <div class="section-left">
            <p class="primary--text" data-aos="zoom-in-down">
              QUẢN LÝ PHÒNG HỌP
            </p>
            <p data-aos="zoom-in-down">
              Chủ động và linh hoạt trong công tác đặt lịch
            </p>
            <p data-aos="zoom-in-down">
              Chủ động và linh hoạt trong công tác đặt lịch; Quản lý và lưu trữ
              lịch sử, biên bản họp, các quyết định cuộc họp, từ đó sử dụng làm
              căn cứ triển khai các hoạt động kinh doanh khác.
            </p>
            <ul class="section-detail-list-item" data-aos="zoom-in-down">
              <li>
                Nhân viên dễ dàng nắm bắt thông tin, tình trạng để book lịch họp
                theo thời gian thực.
              </li>
              <li>
                Tiết kiệm thời gian và thực hiện các thao tác đặt phòng hoàn
                toàn trên quy trình
              </li>
              <li>
                Đặt lịch, duyệt lịch được tự động phân cấp một cách hợp lý, cho
                phép cấu hình một cách linh hoạt.
              </li>
              <li>
                Cung cấp đầy đủ thông tin về Phòng Họp và Tài Nguyên phòng họp
                cho người đặt lịch.
              </li>
              <li>Nhắc lịch họp qua SMS, Email và các hệ thống Reminder.</li>
              <li>
                Đồng bộ lịch với các hệ thống calender trên điện thoại và máy
                tính.
              </li>
            </ul>
            <v-btn
              color="primary"
              class="hidden-sm-and-down"
              data-aos="zoom-in"
              outlined
              rounded
              id="btn-quanly-phong-hop"
              @click="showRegister"
              >Đăng ký Nhận demo</v-btn
            >
          </div>
          <div class="section-right">
            <img
              data-aos="zoom-in"
              :src="require(`~/assets/images/pages/landing/solution1.png`)"
              alt=""
            />
            <div class="text-center" data-aos="zoom-in">
              <v-btn
                class="hidden-md-and-up"
                color="primary"
                @click="showRegister"
                outlined
                id="btn-quanly-phong-hop"
                rounded
                >Đăng ký Nhận demo</v-btn
              >
            </div>
          </div>
        </div>
      </v-container>
    </section>
    <section class="landing-solution border-bottom">
      <v-container>
        <div
          class="
            section-content
            d-flex
            flex-column flex-md-row
            align-center
            justify-space-between
          "
        >
          <div class="section-left">
            <p class="primary--text" data-aos="zoom-in-down">
              QUẢN LÝ CÔNG VIỆC
            </p>
            <p data-aos="zoom-in-down">
              Quản lý, giám sát toàn trình luồng xử lý văn bản
            </p>
            <p data-aos="zoom-in-down">
              Khởi tạo và cập nhật tiến độ công việc trực tiếp trên quy trình.
              Dễ dàng theo dõi, đánh giá và quản lý kết quả thực hiện công việc;
              Có chế độ nhắc nhở, cảnh báo tự động khi đến hạn xử lý.
            </p>
            <ul class="section-detail-list-item" data-aos="zoom-in-down">
              <li>Giao nhận việc trực tuyến mọi lúc, mọi nới</li>
              <li>
                Truyền tải thông tin đầy đủ, tập trung trực tiếp tới nhân viên
              </li>
              <li>
                Cập nhập, giám sát và quản lý tiến độ công việc tự động xuyên
                suốt.
              </li>
              <li>
                Tự động cảnh báo và nhắc việc thông minh giúp cá nhân chủ động
                thực hiện công việc theo đúng Deadline.
              </li>
              <li>Giúp nhân sự chủ động tự đánh giá và quản lý công việc</li>
              <li>
                Hỗ trợ quản lý đưa ra những điều chỉnh tức thì để tối đa hoá kết
                quả công việc
              </li>
            </ul>
            <v-btn
              class="hidden-sm-and-down"
              color="primary"
              data-aos="zoom-in"
              outlined
              id="btn-quanly-congviec"
              rounded
              @click="showRegister"
              >Đăng ký Nhận demo</v-btn
            >
          </div>
          <div class="section-right">
            <img
              data-aos="zoom-in"
              :src="require(`~/assets/images/pages/landing/solution2.png`)"
              alt=""
            />
            <div class="text-center" data-aos="zoom-in">
              <v-btn
                class="hidden-md-and-up"
                color="primary"
                @click="showRegister"
                outlined
                id="btn-quanly-congviec"
                rounded
                >Đăng ký Nhận demo</v-btn
              >
            </div>
          </div>
        </div>
      </v-container>
    </section>
    <section class="landing-solution border-bottom">
      <v-container>
        <div
          class="
            section-content
            d-flex
            flex-column flex-md-row
            align-center
            flex-md-row-reverse
            justify-space-between
          "
        >
          <div class="section-left">
            <p class="primary--text" data-aos="zoom-in-down">
              ĐIÊU HÀNH VĂN BẢN
            </p>
            <p data-aos="zoom-in-down">
              Quản lý, giám sát toàn trình luồng xử lý văn bản
            </p>
            <p data-aos="zoom-in-down">
              Gửi, đọc và xử lý văn bản đồng bộ trên quy trình nhanh chóng, cho
              phép theo dõi, trao đổi hoặc luân chuyển văn bản và có ghi lại
              lịch sử; Giúp doanh nghiệp lưu trữ, quản lý và tìm kiếm tập trung
              các văn bản điện tử theo các lĩnh vực hoạt động.
            </p>
            <ul class="section-detail-list-item" data-aos="zoom-in">
              <li>
                Phân phối văn bản đơn giản không phải photo, in ấn, đi lại nhiều
              </li>
              <li>
                Dễ dàng quản lý, tra cứu thông tin Tìm kiếm bản gốc nhanh chóng
              </li>
              <li>
                Truyền đạt các thông báo, chỉ thị của lãnh đạo đến các bộ phận
                nhanh chóng, kịp thời...
              </li>
              <li>Quản lý thông tin nội bộ hiệu quả</li>
              <li>
                Tiết kiệm thời gian, nhân lực, chi phí cho việc in ấn, photo, đi
                lại, gửi văn bản thủ công
              </li>
              <li>Tăng cường làm việc cộng tác giữa các cá nhân, bộ phận</li>
            </ul>
            <v-btn
              class="hidden-sm-and-down"
              data-aos="zoom-in"
              color="primary"
               id="btn-dieuhanh-vanban"
              @click="showRegister"
              outlined
              rounded
              >Đăng ký Nhận demo</v-btn
            >
          </div>
          <div class="section-right">
            <img
              data-aos="zoom-in"
              :src="require(`~/assets/images/pages/landing/solution3.png`)"
              alt=""
            />
            <div class="text-center" data-aos="zoom-in">
              <v-btn
                class="hidden-md-and-up"
                color="primary"
                @click="showRegister"
                outlined
                rounded
                id="btn-dieuhanh-vanban"
                >Đăng ký Nhận demo</v-btn
              >
            </div>
          </div>
        </div>
      </v-container>
    </section>
  </div>
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