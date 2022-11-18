<template>
  <div>
    <v-list-group
        v-for="(menu, index) in menus"
        :key="index"
        no-action
        sub-group
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>{{ $t(menu.title) }}</v-list-item-title>
        </v-list-item-content>
      </template>
      <nuxt-link v-for="(item, i) in menu.children" :key="i" :to="item.link">
        <v-list-item link>
          <div class="icon-menu">
            <div class="icon-feature" :class="`bg-${item.bgIcon}`">
              <img :src="require(`~/assets/images/icons/${item.icon}`)" :alt="item.altSTr"/>
            </div>
          </div>
          <v-list-item-title v-text="$t(item.title)"></v-list-item-title>
        </v-list-item>
      </nuxt-link>
    </v-list-group>
  </div>
</template>

<script>
export default {
  name: 'MenuSolutionMobile',
  data() {
    return {
      menus: [
        {
          title: 'menus.list_products.groups.dieu_hanh_quan_tri',
          subtitle:
              'Hỗ trợ công tác điều hành, tác nghiệp và quản trị của doanh nghiệp.',
          children: [
            {
              icon: `chu-ky-so.svg`,
              title: 'menus.list_products.features.ky_so_dien_tu',
              subtitle: 'Ký duyệt văn bản trực tiếp trên nền tảng',
              link: '/ky-dien-tu',
              bgIcon: 'blue',
              altSTr: 'Icon ký điện tử 2'
            },
            {
              icon: `hhdt.svg`,
              title: 'menus.list_products.features.hop_dong_dien_tu',
              link: '/hop-dong-dien-tu',
              subtitle: 'Ký hợp đồng online mọi lúc mọi nơi',
              bgIcon: 'purple',
              altSTr: 'Icon hợp đồng điện tử 11'
            },
            {
              icon: `dhvb.svg`,
              title: 'menus.list_products.features.dieu_hanh_van_ban',
              subtitle: 'Gửi, đọc và xử lý văn bản nhanh chóng ',
              link: '/dieu-hanh-van-ban',
              bgIcon: 'red',
              altSTr: 'Icon điều hành văn bản 9'
            },
            {
              icon: `qlcv.svg`,
              title: 'menus.list_products.features.quan_ly_cong_viec',
              subtitle: 'Giám sát và cập nhập tiến độ 24/7',
              link: '/quan-ly-cong-viec',
              bgIcon: 'yellow',
              altSTr: 'Icon quản lý công việc 7'
            },
            {
              icon: `qtlv.svg`,
              title: 'menus.list_products.features.quy_trinh_lam_viec',
              link: '/lich-hop',
              subtitle: 'Tối ưu quy trình vận hành cho doanh nghiệp',
              bgIcon: 'lime',
              altSTr: 'Icon quy trình làm việc 10'
            },

            {
              icon: `quan-ly-lich-hop.svg`,
              title: 'menus.list_products.features.lich_hop_cong_tac',
              subtitle: 'Quản lý linh hoạt trong công tác đặt lịch',
              link: '/lich-hop',
              bgIcon: 'red'
            },
            {
              icon: `tintuc.svg`,
              title: 'menus.list_products.features.tin_tuc_truyen_thong',
              link: '/lich-hop',
              subtitle: 'Ký duyệt văn bản trực tiếp trên nền tảng',
              bgIcon: 'orange',
              altSTr: 'Icon tin tức doanh nghiệp 15'
            }
          ]
        },
        {
          title: 'menus.list_products.groups.quan_ly_van_phong',
          subtitle:
              'Hỗ trợ toàn diện công tác quản lý, đánh giá các hoạt động văn phòng.',
          children: [
            {
              icon: `van-phong-pham.svg`,
              title: 'menus.list_products.features.van_phong_pham',
              subtitle: 'Chủ động yêu cầu các vật phẩm văn phòng cần thiết',
              link: '#van-phong-pham',
              bgIcon: 'blue'
            },
            {
              icon: `quanlyxe.svg`,
              title: 'menus.list_products.features.quan_ly_tai_san',
              subtitle: 'Quản lý, kiểm kê thông tin tài sản',
              link: '#quanlyxe',
              bgIcon: 'lime'
            },
            {
              icon: `tailieu.svg`,
              title: 'menus.list_products.features.tai_lieu_so',
              subtitle: 'Lưu trữ thông minh, chia sẻ dễ dàng',
              link: '#tailieu',
              bgIcon: 'yellow'
            },
            {
              icon: `lich-cong-tac.svg`,
              title: 'menus.list_products.features.dang_ky_cong_tac',
              subtitle: 'Quản lý lịch trình công tác',
              link: '#',
              bgIcon: 'purple'
            },
            {
              icon: `cong-tac-phi.svg`,
              title: 'menus.list_products.features.cong_tac_phi',
              subtitle: 'Minh bạch trong hạch toán công tác phí',
              link: '#',
              bgIcon: 'orange'
            },
            {
              icon: `camera.svg`,
              title: 'menus.list_products.features.camera_ai',
              subtitle: 'Hệ thống camera thông minh',
              link: '#',
              bgIcon: 'red'
            }
          ]
        },
        {
          title: 'menus.list_products.groups.nhan_su_ke_toan',
          subtitle:
              'Hỗ trợ quản lý, đánh giá, tính lương, thưởng, thuế thu nhập nhân viên.',
          children: [
            {
              icon: `quan-ly-nhan-su.svg`,
              title: 'menus.list_products.features.quan_ly_nhan_su',
              subtitle: 'Quản lý, lưu trữ thông tin tập chung',
              link: '#',
              bgIcon: 'blue'
            },
            {
              icon: `cham-cong.svg`,
              title: 'menus.list_products.features.cham_cong_giam_sat',
              link: '#',
              subtitle: 'Đồng bộ dữ liêu minh bạch thời gian chấm công',
              bgIcon: 'red'
            },
            {
              icon: `cong-luong.svg`,
              title: 'menus.list_products.features.bang_cong',
              subtitle: 'Dự báo ngân sách, tự động tính lương',
              link: '#',
              bgIcon: 'yellow'
            },
            {
              icon: `kpi.svg`,
              title: 'menus.list_products.features.danh_gia_kpi',
              subtitle: 'Quản lý đánh giá KPI',
              link: '#',
              bgIcon: 'lime'
            },
            {
              icon: `pm-ke-toan.svg`,
              title: 'menus.list_products.features.phan_mem_ke_toan',
              subtitle: 'Xử lý kế toán thuế và kế toán nội bộ',
              link: '#',
              bgIcon: 'purple'
            },
            {
              icon: `hoa-don-dien-tu.svg`,
              title: 'menus.list_products.features.hoa_don_dien_tu',
              subtitle: 'Tích hợp với các phầm mền kế toán trên thị trường',
              link: '#',
              bgIcon: 'orange'
            }
          ]
        },
        {
          title: 'menus.list_products.groups.tien_ich',
          subtitle:
              'Các tiện ích bổ trợ nâng cao trải nghiệm nội bộ và ngoài doanh nghiệp',
          children: [
            {
              icon: `tuong-tac.svg`,
              title: 'menus.list_products.features.tuong_tac',
              subtitle:
                  'Nhắn tin, gọi điện, bình luận, trao đổi trực tiếp trên nền tảng',
              link: '#',
              bgIcon: 'blue'
            },
            {
              icon: `khao-sat.svg`,
              title: 'menus.list_products.features.khao_sat',
              subtitle: 'Tạo mẫu khảo sát nội bộ và khách hàng',
              link: '#',
              bgIcon: 'red'
            },
            {
              icon: `qly-yeucau.svg`,
              title: 'menus.list_products.features.quan_ly_yeu_cau',
              subtitle: 'Tạo và tiếp nhận yêu cầu từ tất cả các nguồn',
              link: '#',
              bgIcon: 'yellow'
            },
            {
              icon: `ql-danhmuc.svg`,
              title: 'menus.list_products.features.quan_ly_danh_muc',
              link: '#',
              subtitle: 'Quản lý thông tin, phân loại khách hàng',
              bgIcon: 'lime'
            },
            {
              icon: `ql-doitac.svg`,
              title: 'menus.list_products.features.quan_ly_doi_tac',
              subtitle: 'Quản lý phân loại danh mục sản phẩm',
              link: '#',
              bgIcon: 'purple'
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
