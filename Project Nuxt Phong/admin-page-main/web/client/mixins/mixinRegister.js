const HEADERS_PRODUCT = [
    "Điều hành và quản trị",
    "Quản lý văn phòng",
    "Nhân sự - Kế toán",
    "Tiện ích",
];
const PRODUCTS_MANAGER = [
    "Ký điện tử",
    "Điều hành văn bản",
    "Quản lý công việc",
    "Quy trình làm việc",
    "Hợp đồng điện tử",
    "Tin tức, truyền thông",
    "Lịch họp công tác",
];
const PRODUCTS_OFFICE = [
    "Văn phòng phẩm",
    "Camera AI",
    "Tài liệu số, thư viện",
    "Quản lý tài sản",
    "Đăng ký đi công tác",
    "Công tác phí",
];
const PRODUCTS_HR = [
    "Quản lý nhân sự",
    "Chấm công giám sát",
    "Bảng công/ lương",
    "Đánh giá/ KPI",
    "Phần mềm kế toán",
    "Hóa đơn điện tử",
];
const PRODUCTS_UTILITIES = [
    "Tương tác",
    "Khảo sát",
    "Quản lý yêu cầu",
    "Quản lý danh mục",
    "Quản lý đối tác",
];
const JOBS = [
    "CEO/ Founder/ Chủ tịch",
    "Giám đốc (CFO, CTO, Nhân sự, VP)",
    "Quản lý",
    "Nhân viên",
    "Khác",
];
const CITIES = ["Khu vực miền Bắc", "Khu vực miền Nam", "Khu vực miền Trung"];
const PEOPLES = [
    "1 – 15 nhân sự",
    "16 – 30 nhân sự",
    "31 – 60 nhân sự",
    "61 – 200 nhân sự",
    "201 – 500 nhân sự",
    "501 – 1000 nhân sự",
    "Trên 1000 nhân sự",
];
import constants from "../config/constants";

export default {
    data() {
        return {
            lstProducts: [],
            lstJobs: JOBS,
            lstCities: CITIES,
            lstPeoples: PEOPLES,
            showAlert: false,
            loading: false,
            formData: {
                fullName: "",
                email: "",
                phone: "",
                product: PRODUCTS_MANAGER[4],
                job: "",
                city: "",
                people: "",
                company: "",
                domain: "",
            },
        };
    },
    methods: {
        initProducts() {
            // Dieu hanh quan tri
            this.lstProducts.push({header: HEADERS_PRODUCT[0]});
            PRODUCTS_MANAGER.map((product) =>
                this.lstProducts.push({name: product, group: HEADERS_PRODUCT[0]})
            );
            this.lstProducts.push({divider: true});

            // Quan ly van phong
            this.lstProducts.push({header: HEADERS_PRODUCT[1]});
            PRODUCTS_OFFICE.map((product) =>
                this.lstProducts.push({name: product, group: HEADERS_PRODUCT[1]})
            );
            this.lstProducts.push({divider: true});

            // Nhan su ke toan
            this.lstProducts.push({header: HEADERS_PRODUCT[2]});
            PRODUCTS_HR.map((product) =>
                this.lstProducts.push({name: product, group: HEADERS_PRODUCT[2]})
            );
            this.lstProducts.push({divider: true});

            // Tien ich
            this.lstProducts.push({header: HEADERS_PRODUCT[3]});
            PRODUCTS_UTILITIES.map((product) =>
                this.lstProducts.push({name: product, group: HEADERS_PRODUCT[3]})
            );
            this.lstProducts.push({divider: true});
        },
        isObject(item) {
            return typeof item !== "object";
        },
        async onRegister(href = "/thankyou") {
            const validForm = await this.$refs.obsRegister.validate();
            if (validForm) {
                this.loading = true;
                await this.$axios.$post(
                    `${constants.BASE_SERVICE}/registers`,
                    {data: this.formData}
                );
                window.location.href = href;
                // this.showAlert = true;
                this.loading = false;
            }
        },
    },
};
