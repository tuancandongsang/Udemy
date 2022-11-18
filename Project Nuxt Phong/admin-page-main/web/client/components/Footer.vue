<template>
  <div>
    <section id="footer">
      <v-container>
        <div class="d-flex flex-column flex-md-row">
          <div class="col-12 col-md-5 footer-left">
            <div class="footer-logo d-flex align-center">
              <a href="/" class="d-flex align-center">
                <img
                    class="img-logo"
                    src="~assets/images/logo-mdo.svg"
                    alt="Logo MDO 1"
                />
                <span class="white--text">mdo.com.vn</span>
              </a>
            </div>
            <div>
              Nền tảng quản trị doanh nghiệp với đầy đủ <br/>
              tính năng giúp doanh nghiệp vận hành <br/>
              hiệu quả, tăng năng suất lao động
            </div>
            <div>
              <ul class="footer-socials d-flex list-style-none">
                <li>
                  <v-btn
                      color="primary"
                      icon
                      outlined
                      href="https://www.facebook.com/mdovietnam"
                      target="_blank"
                      rel="nofollow"
                  >
                    <v-icon>mdi-facebook</v-icon>
                  </v-btn
                  >
                </li>
                <li>
                  <v-btn
                      color="primary"
                      icon
                      outlined
                      href="https://www.linkedin.com/company/78843582"
                      target="_blank"
                      rel="nofollow"
                  >
                    <v-icon>mdi-linkedin</v-icon>
                  </v-btn
                  >
                </li>
                <li>
                  <v-btn
                      color="primary"
                      icon
                      outlined
                      href="https://www.youtube.com/channel/UCfu5VTesXx4QWINSV68eELw"
                      target="_blank"
                      rel="nofollow"
                  >
                    <v-icon>mdi-youtube</v-icon>
                  </v-btn
                  >
                </li>
              </ul>
            </div>
            <div>Hotline: (+84) 37395 8888</div>
            <div>© Bssd.vn 2022</div>
          </div>
          <div
              class="
              footer-right
              col-12 col-md-7
              d-flex
              justify-space-between
              flex-column flex-md-row
            "
          >
            <div class="footer-section">
              <p class="footer-title">Sản phẩm</p>
              <ul class="list-style-none">
                <li v-for="(item, index) in products" :key="index">
                  <a :href="item.link"> {{ item.title }}</a>
                </li>
              </ul>
            </div>
            <div class="footer-section">
              <p class="footer-title">Công ty</p>
              <ul class="list-style-none">
                <li v-for="(item, index) in company" :key="index">
                  <a :href="item.link" v-if="item.type !== 'newtab'"> {{ item.title }}</a>
                  <a :href="item.link" v-if="item.type === 'newtab'" target="_blank"> {{ item.title }}</a>
                </li>
              </ul>
            </div>
            <div class="footer-section">
              <p class="footer-title">Blog</p>
              <ul class="list-style-none">
                <li v-for="(item, index) in blog" :key="index">
                  <a :href="item.link"> {{ item.title }}</a>
                </li>
              </ul>
            </div>
            <div class="footer-section">
              <p class="footer-title">Liên kết</p>
              <ul class="list-style-none">
                <li v-for="(item, index) in social" :key="index">
                  <a rel="nofollow" target="_blank" :href="item.link"> {{ item.title }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </v-container>
    </section>
    <!-- Messenger Plugin chat Code -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [
        {
          link: '/ky-dien-tu',
          title: 'Ký điện tử'
        },
        {
          link: '/hop-dong-dien-tu',
          title: 'Hợp đồng điện tử'
        },
        {
          link: '/dieu-hanh-van-ban',
          title: 'Điều hành văn bản'
        },
        {
          link: '/quan-ly-cong-viec',
          title: 'Quản lý công việc'
        },
        {
          link: '',
          title: 'Quy trình làm việc'
        },
        {
          link: '',
          title: 'Tin tức, truyền thông'
        },
        {
          link: '/lich-hop',
          title: 'Lịch họp'
        }
      ],
      company: [
        {
          link: '/ve-chung-toi',
          title: 'Giới thiệu'
        },
        // {
        //   link: "#",
        //   title: "Khách hàng",
        // },
        {
          type: 'newtab',
          link: '/lien-he',
          title: 'Liên hệ'
        },
        {
          link: '/dieu-khoan',
          title: 'Điều khoản'
        }
        // {
        //   link: "#",
        //   title: "Chính sách bảo mật",
        // },
        // {
        //   link: "#",
        //   title: "Đối tác",
        // },
        // {
        //   link: "#",
        //   title: "Tuyển dụng",
        // },
      ],
      blog: [
        {
          link: '/bao-chi',
          title: 'Báo chí'
        },
        {
          link: '/blog',
          title: 'Blog'
        }
      ],
      social: [
        {
          link: ' https://www.facebook.com/mdovietnam',
          title: 'Facebook'
        },
        {
          link: 'https://www.linkedin.com/company/78843582',
          title: 'LinkedIn'
        },
        {
          link: 'https://www.youtube.com/channel/UCfu5VTesXx4QWINSV68eELw',
          title: 'Youtube'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
