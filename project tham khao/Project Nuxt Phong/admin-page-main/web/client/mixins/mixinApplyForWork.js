const GENDER = [
    "Nam",
    "Nữ",
]
const POSITION_TO_APPLY = [
    "Flutter",
    "Lập trình viên Java",
    "Java Intern",
    "Lập trình viên",
    "Tester",
    "UI/UX Desgner",
];
import constants from "../config/constants";

export default {
    data() {
        return {
            listGender: GENDER,
            listPositon: POSITION_TO_APPLY,
            showAlert: false,
            loading: false,
            file: null,
            fileCvUpload: null,
            formData: {
                fullName: "",
                email: "",
                phone: "",
                dateOfBirth: "",
                gender: null,
                positionToApply: null,
                message: "",
                profile: {
                    file_id: '',
                    file_name: '',
                    file_path: ''
                }
            },
        };
    },
    methods: {
        isObject(item) {
            return typeof item !== "object";
        },
        async onRegister(href = "/thankyou") {
            const validForm = await this.$refs.objApplyForWork.validate();
            if (validForm) {
                console.log(this.formData, 'data')
                try {
                    this.loading = true;
                    await this.$axios.$post(
                        `${constants.BASE_SERVICE}/apply-for-works`,
                        {data: this.formData}
                    );
                    this.loading = false;
                    window.location.href = href;
                } catch (err) {
                    console.log(err)
                    console.log(this.formData)
                }
            }
        },
        async upload() {
            if (process.browser) {
                let formData = new FormData();
                let files = this.fileCvUpload
                formData.append('files', files);

                try {
                    const response = await this.$axios.post(`${constants.BASE_UPLOAD}/api/upload`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            }
                        }
                    )
                    console.log('vao day')
                    if (response) {
                        if (response.data?.name.split('.').pop().toLowerCase() === 'pdf') {
                            response?.data?.url.replace(".pdf", ".jpg")
                        }
                        const objectFileTransfer = response.data
                        const profileCv = {
                            file_id : '',
                            file_name : '',
                            profile_id  :''
                        }
                        profileCv.file_id = objectFileTransfer.id
                        profileCv.file_name = objectFileTransfer.name
                        profileCv.file_path = objectFileTransfer.url
                        this.formData.profile_id = profileCv
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        },

        uploadFile() {
            document.getElementById("fileCv").click();
        },
    },

};
