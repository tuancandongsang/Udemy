export default {
  data() {
    return {
      menuManager: [
        {
          icon: `chu-ky-so.svg`,
          title: 'menus.list_products.features.ky_so_dien_tu',
          subtitle: 'Ký duyệt văn bản trực tiếp trên nền tảng',
          link: '/ky-dien-tu',
          bgIcon: 'blue',
          altStr: 'Icon ký điện tử 2'
        },
        {
          icon: `hhdt.svg`,
          title: 'menus.list_products.features.hop_dong_dien_tu',
          link: '/hop-dong-dien-tu',
          subtitle: 'Ký hợp đồng online mọi lúc mọi nơi',
          bgIcon: 'purple',
          altStr: 'Icon hợp đồng điện tử 11'
        },
        {
          icon: `dhvb.svg`,
          title: 'menus.list_products.features.dieu_hanh_van_ban',
          subtitle: 'Gửi, đọc và xử lý văn bản nhanh chóng ',
          link: '/dieu-hanh-van-ban',
          bgIcon: 'red',
          altStr: 'Icon điều hành văn bản 9'
        },
        {
          icon: `qlcv.svg`,
          title: 'menus.list_products.features.quan_ly_cong_viec',
          subtitle: 'Giám sát và cập nhập tiến độ 24/7',
          link: '/quan-ly-cong-viec',
          bgIcon: 'yellow'
        },
        {
          icon: `qtlv.svg`,
          title: 'menus.list_products.features.quy_trinh_lam_viec',
          link: '#qtlv',
          subtitle: 'Tối ưu quy trình vận hành cho doanh nghiệp',
          bgIcon: 'lime',
          altStr: 'Icon quy trình làm việc 10'
        },

        {
          icon: `quan-ly-lich-hop.svg`,
          title: 'menus.list_products.features.lich_hop_cong_tac',
          subtitle: 'Quản lý linh hoạt trong công tác đặt lịch',
          link: '/lich-hop',
          bgIcon: 'red',
          altStr: 'Quản lý lịch họp 1'
        },
        {
          icon: `tintuc.svg`,
          title: 'menus.list_products.features.tin_tuc_truyen_thong',
          link: '#tintuc',
          subtitle: 'Ký duyệt văn bản trực tiếp trên nền tảng',
          bgIcon: 'orange',
          altStr: 'Icon tin tức doanh nghiệp 15'
        }
      ],
      menuOffice: [
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
          link: '#lich-cong-tac',
          bgIcon: 'purple'
        },
        {
          icon: `cong-tac-phi.svg`,
          title: 'menus.list_products.features.cong_tac_phi',
          subtitle: 'Minh bạch trong hạch toán công tác phí',
          link: '#cong-tac-phi',
          bgIcon: 'orange'
        },
        {
          icon: `camera.svg`,
          title: 'menus.list_products.features.camera_ai',
          subtitle: 'Hệ thống camera thông minh',
          link: '#camera',
          bgIcon: 'red'
        }
      ],
      menuAccounting: [
        {
          icon: `quan-ly-nhan-su.svg`,
          title: 'menus.list_products.features.quan_ly_nhan_su',
          subtitle: 'Quản lý, lưu trữ thông tin tập chung',
          link: '#quan-ly-nhan-su',
          bgIcon: 'blue'
        },
        {
          icon: `cham-cong.svg`,
          title: 'menus.list_products.features.cham_cong_giam_sat',
          link: '#cham-cong',
          subtitle: 'Đồng bộ dữ liêu minh bạch thời gian chấm công',
          bgIcon: 'red'
        },
        {
          icon: `cong-luong.svg`,
          title: 'menus.list_products.features.bang_cong',
          subtitle: 'Dự báo ngân sách, tự động tính lương',
          link: '#cong-luong',
          bgIcon: 'yellow'
        },
        {
          icon: `kpi.svg`,
          title: 'menus.list_products.features.danh_gia_kpi',
          subtitle: 'Quản lý đánh giá KPI',
          link: '#kpi',
          bgIcon: 'lime'
        },
        {
          icon: `pm-ke-toan.svg`,
          title: 'menus.list_products.features.phan_mem_ke_toan',
          subtitle: 'Xử lý kế toán thuế và kế toán nội bộ',
          link: '#pm-ke-toan',
          bgIcon: 'purple'
        },
        {
          icon: `hoa-don-dien-tu.svg`,
          title: 'menus.list_products.features.hoa_don_dien_tu',
          subtitle: 'Tích hợp với các phầm mền kế toán trên thị trường',
          link: '#hoa-don-dien-tu',
          bgIcon: 'orange'
        }
      ],
      menuUtilities: [
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
    };
  }
};
