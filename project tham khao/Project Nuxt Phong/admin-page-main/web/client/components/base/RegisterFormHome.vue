<template>
  <v-card
      class="register-box-right register-home col-12 col-md-6 px-6"
      :style="`background: ${bgForm}`"
  >
    <validation-observer ref="obsRegister">
      <p class="register-box-subtitle" v-if="showSubtitle">
        ĐĂNG KÝ NHẬN TRẢI NGHIỆM NGAY Demo giải pháp hợp đồng điện tử MDO
      </p>
      <div class="form-group">
        <label>Họ và tên của bạn *</label>
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
          ></v-text-field>
        </validation-provider>
      </div>
      <div class="form-group">
        <label>Sản phẩm bạn quan tâm *</label>
        <validation-provider
            v-slot="{ errors }"
            name="product"
            rules="required"
        >
          <v-autocomplete
              v-model="formData.product"
              :items="lstProducts"
              outlined
              dense
              :readonly="true"
              rounded
              solo
              :error-messages="errors"
              append-icon="mdi-chevron-down"
              placeholder="Chọn giải pháp/ ứng dụng bạn quan tâm nhất"
              item-text="name"
              item-value="name"
          >
            <template v-slot:selection="data">
              {{ data.item.name }}
            </template>
            <template v-slot:item="data">
              <template v-if="isObject(data.item)">
                <v-list-item-content v-text="data.item"></v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-content>
                  <v-list-item-title
                      v-html="data.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                      v-html="data.item.group"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </validation-provider>
      </div>
      <div class="d-flex justify-space-between flex-column flex-md-row">
        <div class="form-group">
          <label>Email *</label>
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
                placeholder="Nhập Email của bạn"
            ></v-text-field>
          </validation-provider>
        </div>
        <div class="form-group">
          <label>Số điện thoại *</label>
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
                dense
                maxlength="11"
                :error-messages="errors"
                placeholder="Nhập Số điện thoại "
            ></v-text-field>
          </validation-provider>
        </div>
      </div>
      <div class="d-flex justify-space-between flex-column flex-md-row">
        <div class="form-group">
          <label>Vị trí công việc *</label>
          <validation-provider
              v-slot="{ errors }"
              name="jobPosition"
              rules="required"
          >
            <v-autocomplete
                v-model="formData.job"
                :items="lstJobs"
                outlined
                dense
                rounded
                solo
                append-icon="mdi-chevron-down"
                placeholder="Chọn vị trí"
                :error-messages="errors"
            ></v-autocomplete>
          </validation-provider>
        </div>
        <div class="form-group">
          <label>Tên công ty *</label>
          <validation-provider
              v-slot="{ errors }"
              name="company"
              rules="required"
          >
            <v-text-field
                v-model="formData.company"
                rounded
                solo
                outlined
                dense
                maxlength="255"
                placeholder="Nhập Tên công ty"
                :error-messages="errors"
            ></v-text-field>
          </validation-provider>
        </div>
      </div>
      <div class="d-flex justify-space-between flex-column flex-md-row">
        <div class="form-group">
          <label>Tỉnh/ Thành phố</label>
          <v-autocomplete
              v-model="formData.city"
              outlined
              :items="lstCities"
              dense
              rounded
              solo
              append-icon="mdi-chevron-down"
              placeholder="Chọn thành phố"
          ></v-autocomplete>
        </div>
        <div class="form-group">
          <label>Quy mô nhân sự</label>
          <v-autocomplete
              v-model="formData.people"
              :items="lstPeoples"
              outlined
              dense
              rounded
              solo
              append-icon="mdi-chevron-down"
              placeholder="Chọn Quy mô"
          ></v-autocomplete>
        </div>
      </div>
      <v-btn
          block
          :loading="loading"
          color="white"
          class="py-6 btn-register btn-form-register"
          dark
          rounded
          id="btn-register"
          @click="onRegister('/thank')"
      >
        <span class="primary--text">Đăng ký</span>
        <span class="shadow shadow-white"></span>
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
import mixinRegister from "~/mixins/mixinRegister";

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
  mixins: [mixinRegister],
  mounted() {
    this.initProducts();
    this.formData.domain = document.baseURI;
  },
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
</style>