<template>
  <v-card
      class="register-apply-box col-12 col-md-6 px-6 justify-center align-center rounded-xl"
      :style="`background: ${bgForm}`"
  >
    <validation-observer ref="objApplyForWork">
      <div class="d-flex justify-center align-center">
        <p class="register-apply-title mt-2">
          Đăng ký ứng tuyển
        </p>
      </div>
      <div class="form-group">
        <label class="label-form-group">Họ và tên của bạn *</label>
        <validation-provider
            v-slot="{ errors }"
            name="fullName"
            rules="required"
        >
          <v-text-field
              v-model="formData.fullName"
              rounded
              solo
              outlined
              maxlength="40"
              dense
              placeholder="Nhập tên của bạn"
              :error-messages="errors"
          >

          </v-text-field>
        </validation-provider>
      </div>
      <div class="form-group">
        <label class="label-form-group">Số điện thoại *</label>
        <validation-provider
            v-slot="{ errors }"
            name="phone"
            rules="required|numeric|min:10"
        >
          <v-text-field
              v-model="formData.phone"
              rounded
              solo
              outlined
              maxlength="10"
              dense
              placeholder="Nhập Số điện thoại"
              :error-messages="errors"
          ></v-text-field>
        </validation-provider>
      </div>
      <div class="form-group">
        <label class="label-form-group">Email *</label>
        <validation-provider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
        >
          <v-text-field
              v-model="formData.email"
              rounded
              solo
              outlined
              dense
              maxlength="40"
              :error-messages="errors"
              placeholder="Nhập Email"
          ></v-text-field>
        </validation-provider>
      </div>
      <div class="form-group">
        <label class="label-form-group">Ngày sinh *</label>
        <validation-provider
            v-slot="{ errors }"
            name="dateOfBirth"
            rules="required"
        >
          <v-menu
              v-model="menuOpenDatePicker"
              :close-on-content-click="false"
              min-width="auto"
              nudge-left="300px"
              offset-x
              transition="scale-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="formData.dateOfBirth"
                  outlined
                  rounded
                  dense
                  :error-messages="errorDateMsg"
              >
                <template v-slot:append>
                  <v-img
                      @click:append="menuOpenDatePicker = !menuOpenDatePicker"
                      v-on="on"
                      v-bind="attrs"
                      style="cursor: pointer"
                      :src="require('@/assets/icons/calendar .svg')"/>
                </template>
              </v-text-field>
            </template>
            <v-date-picker
                v-model="valuePickerDate"
                locale="vi"
                format="DD/MM/YYYY"
                flat
                show-adjacent-months
            />
          </v-menu>
        </validation-provider>
      </div>
      <div class="form-group">
        <label class="label-form-group"> Giới tính *</label>
        <validation-provider
            v-slot="{ errors }"
            name="gender"
            rules="required"
        >
          <v-select
              v-model="formData.gender"
              :items="listGender"
              outlined
              dense
              rounded
              solo
              placeholder="Chọn giới tính"
              :error-messages="errors"
          >

          </v-select>
        </validation-provider>
      </div>
      <div class="form-group">
        <label class="label-form-group">Vị trí ứng tuyển *</label>
        <validation-provider
            v-slot="{ errors }"
            name="positionName"
            rules="required"
        >
          <v-autocomplete
              v-model="formData.positionToApply"
              :items="listPositon"
              outlined
              dense
              rounded
              solo
              placeholder="Chọn vị trí"
              :error-messages="errors"
          ></v-autocomplete>
        </validation-provider>
      </div>
      <div class="form-group">
        <label class="label-form-group">Lời nhắn</label>
        <v-text-field
            v-model="formData.message"
            rounded
            solo
            outlined
            dense
            maxlength="11"
            placeholder="Cho chúng tôi hiểu thêm về bạn, hay những băn khoăn của bạn..."
        ></v-text-field>
      </div>
      <div class="up-load-cv mt-1">
        <label class="label-form-group">CV của bạn *</label>
        <validation-provider
            ref="fileCvProfile"
            v-slot="{ errors }"
            name="profile"
            rules=""
        >
          <v-file-input
              id="fileCv"
              solo
              rounded
              outlined
              chips
              :show-size="1000"
              style="cursor: pointer"
              :error-messages="errorTypeFile"
              prepend-icon=""
              placeholder="Ấn tại đây để chọn hoặc tải lên file của bạn!"
              v-model="fileCvUpload"
              accept="application/pdf"
              show-size
              :loading="uploadingFile"
              :clearable="!uploadingFile"
              @change="upload"
          >
            <template v-slot:append>
              <v-img
                  :loading="uploadingFile"
                  :disabled="uploadingFile"
                  @click="uploadFile"
                  style="cursor: pointer" :src="require('@/assets/svg/iconUpload.svg')"/>
            </template>
            <template v-slot:selection>
              <v-chip>
                <img
                    :src="getIconFile(`${formData.profileCv.name}`)"
                    class="mr-2"
                >
                <span>{{ formData.profileCv.name }}</span>
              </v-chip>
            </template>
          </v-file-input>
        </validation-provider>

      </div>
      <v-btn
          block
          :loading="loading"
          color="primary"
          class="py-6 rounded-pill btn-register btn-form-register"
          dark
          rounded
          id="btn-register"
          @click="onRegister('/thank')"
      >
        <span class="text-register-apply d-flex justify-center align-center">Đăng ký ngay</span>
      </v-btn>
    </validation-observer>
    <v-snackbar
        :timeout="3000"
        :value="showAlert"
        elevation="24"
        content-class="alert"
        color="primary"
    >
      <span class="white--text subtitle-1">Gửi đăng ký thành công!</span>
    </v-snackbar>
  </v-card>
</template>

<script>
import mixinApplyForWork from "@/mixins/mixinApplyForWork";
import moment from "moment";

export default {
  props: {
    showSubtitle: {
      type: Boolean,
      default: false,
    },
    bgForm: {
      type: String,
      default: "#fff",
    },
  },

  data() {
    return {
      menuOpenDatePicker: false,
      uploadingFile: false,
      tmpFileContract: null,
      fileContract: null,
      valuePickerDate: '',
      errorDateMsg: '',
      errorTypeFile: '',
      iconPdf: require('@/assets/icons/pdf.svg'),
      iconDoc: require('@/assets/icons/doc.svg'),
      iconXls: require('@/assets/icons/xls.svg'),
      iconPng: require('@/assets/icons/png.svg'),
      iconTxt: require('@/assets/icons/txt.svg'),
      iconMsg: require('@/assets/icons/msg.svg'),
      iconZip: require('@/assets/icons/zip.svg'),
      iconRar: require('@/assets/icons/rar.svg'),
      iconJpg: require('@/assets/icons/jpg.svg'),
      iconDefault: require('@/assets/icons/iconfileDefaul.svg')
    }
  },
  watch: {
    "formData.dateOfBirth"() {
      const isvalid = moment(this.formData.dateOfBirth, 'DD/MM/YYYY', true).isValid()
      if (isvalid) {
        this.errorDateMsg = ''
        let valueTransferDate = ''
        const dateTextToTransfer = this.formData.dateOfBirth
        valueTransferDate = moment(dateTextToTransfer, 'DD/MM/YYYY').format('YYYY-MM-DD')
        this.valuePickerDate = valueTransferDate
      } else {
        this.errorDateMsg = 'Ngày sinh không đúng định dạng'
      }
    },
    valuePickerDate() {
      const valueDateTransfer = this.valuePickerDate
      let valueTransfer = ''
      valueTransfer = moment(valueDateTransfer, 'YYYY-MM-DD').format('DD/MM/YYYY')
      this.formData.dateOfBirth = valueTransfer
    },
    fileCvUpload() {
      if (this.fileCvUpload) {
        const extFile = this.fileCvUpload.name
            .split('.')
            .pop()
            .toLowerCase()
        const arrCheckTypeFile = [
          'doc',
          'docx',
          'xls',
          'xlsx',
          'pdf',
          'png',
          'jpg',
        ]
        if (!arrCheckTypeFile.includes(extFile)) {
          this.errorTypeFile = 'File không đúng định dạng,(file : doc, docx, xls, xlsx, pdf, png, jpg)'
        } else {
          this.errorTypeFile = ''
        }
      }

    }
  },
  mixins: [mixinApplyForWork],
  mounted() {
    this.formData.domain = document.baseURI;
  },
  methods: {
    getIconFile(fileName) {
      if (fileName) {
        const extFile = fileName
            .split('.')
            .pop()
            .toLowerCase()
        var icon = ''
        switch (extFile) {
          case 'pdf':
            icon = this.iconPdf
            break
          case 'doc':
          case 'docx':
            icon = this.iconDoc
            break

          case 'csv':
          case 'xls':
          case 'xlsx':
            icon = this.iconXls
            break
          case 'jpg':
            icon = this.iconJpg
            break
          case 'png':
            icon = this.iconPng
            break
          case 'txt':
            icon = this.iconTxt
            break
          case 'msg':
            icon = this.iconMsg
            break
          case 'zip':
            icon = this.iconZip
            break
          case 'rar':
            icon = this.iconRar
            break
          default:
            icon = this.iconDefault
            break
        }
        return icon
      }
    },
  }
};
</script>

<style lang="scss">
#register {
  .register-home {
    .form-group .v-input__control {
      min-width: 270px;
    }
  }
}

.register-apply-title {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 32px;
  /* identical to box height, or 89% */


  color: #0B132A;
}

.text-register-apply {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 25px;
  /* or 45px */

  text-align: center;

  color: #FFFFFF;
}

.register-apply-box {
  background-color: #FDFDFD !important;
}

.label-form-group {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 12px;
  /* identical to box height, or 86% */

  letter-spacing: 0.0125em;

  color: #0B132A;
}

.up-load-cv {
  label {
    font-weight: 700;
    font-size: 14px;
  }

  .v-input__control {
    min-width: 195px;

    .v-input__slot {
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15) !important;
      border: 1px dashed;

      fieldset {
        border: none;
      }
    }
  }
}
</style>