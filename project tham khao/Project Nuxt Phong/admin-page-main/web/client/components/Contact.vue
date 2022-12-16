<template>
  <div>
    <section id="contact" class="py-5">
      <v-container>
        <v-row
          justify="space-between"
          class="justify-sm-center justify-md-space-between"
        >
          <v-col
            cols="12"
            sm="8"
            md="5"
            ref="companyBox"
            id="companyBox"
            data-aos="fade-right"
          >
            <h4>vanphongso.org</h4>
            <div class="d-flex align-center mb-3">
              <v-icon class="pr-2">mdi-map-marker-radius-outline</v-icon>
              <span>{{ $t("labels.company_address") }}</span>
            </div>
            <div class="d-flex align-center mb-3">
              <v-icon class="pr-2">mdi-phone-in-talk-outline</v-icon>
              <span>+84 981910368</span>
            </div>
            <div class="d-flex align-center">
              <v-icon class="pr-2">mdi-email-fast-outline</v-icon>
              <span>sales@bssd.vn</span>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="8"
            md="5"
            ref="contactBox"
            id="contactBox"
            data-aos="fade-left"
          >
            <validation-observer ref="observerSendContact">
              <h4>{{ $t("labels.contact_help") }}</h4>
              <validation-provider
                v-slot="{ errors }"
                name="name"
                rules="required"
              >
                <v-text-field
                  :label="$t('labels.fullName')"
                  outlined
                  dense
                  rounded
                  elevation="2"
                  :error-messages="errors"
                  v-model="name"
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="phone"
                rules="required|numeric|min:10"
              >
                <v-text-field
                  :label="$t('labels.phone')"
                  outlined
                  dense
                  rounded
                  :error-messages="errors"
                  v-model="phone"
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="email"
                rules="required|email"
              >
                <v-text-field
                  label="Email"
                  v-model="email"
                  outlined
                  dense
                  rounded
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="content"
                rules="required"
              >
                <v-textarea
                  outlined
                  rounded
                  :label="$t('labels.content')"
                  required
                  v-model="content"
                  rows="3"
                  :error-messages="errors"
                ></v-textarea>
              </validation-provider>
              <v-btn
                block
                :loading="loading"
                rounded
                color="#1FBEF1"
                @click.prevent="sendContact"
                class="btn-contact-send"
                dark
                >{{ $t("labels.send") }}</v-btn
              >
            </validation-observer>
          </v-col>
          <!-- <v-col cols="12" sm="8" md="4" style="position: relative">
            <h4>Bản đồ</h4>
           
          </v-col> -->
        </v-row>
      </v-container>
    </section>
    <v-divider></v-divider>
    <section id="footer" class="py-10">
      <v-container>
        <v-row
          justify="space-between"
          class="justify-sm-center justify-md-space-between mb-sm-3"
        >
          <v-col cols="12" sm="8" md="4">
            <h4>
              {{ $t("labels.compay_name") }}
            </h4>
            <p>
              {{ $t("labels.compay_sologan") }}
            </p>
          </v-col>
          <v-col cols="12" sm="8" md="4" class="mb-sm-3">
            <h4>{{ $t("labels.contact_info") }}</h4>
            <div class="d-flex align-center mb-3">
              <v-icon class="pr-2">mdi-map-marker-radius-outline</v-icon>
              <span>{{ $t("labels.company_address") }}</span>
            </div>
            <div class="d-flex align-center mb-3">
              <v-icon class="pr-2">mdi-phone-in-talk-outline</v-icon>
              <span>+84 981910368</span>
            </div>
            <div class="d-flex align-center">
              <v-icon class="pr-2">mdi-email-fast-outline</v-icon>
              <span>sales@bssd.vn</span>
            </div>
          </v-col>
          <v-col cols="12" sm="8" md="4">
            <validation-observer ref="observerSendSubcribe">
              <h4>{{$t('labels.new')}}</h4>
              <p>
                {{$t('labels.subcribe_content')}}
              </p>
              <validation-provider
                v-slot="{ errors }"
                name="email"
                rules="required|email"
              >
                <v-text-field
                  label="Email"
                  outlined
                  dense
                  rounded
                  dark
                  :error-messages="errors"
                  v-model="emailSubscribe"
                  type="email"
                ></v-text-field>
                <input type="hidden" v-model="hidden" />
                <v-btn
                  @click.prevent="sendContactSubscribe"
                  :loading="loadingSubscribe"
                  :disabled="loading"
                  rounded
                  class="px-10"
                  >{{$t('labels.agree')}}</v-btn
                >
              </validation-provider>
            </validation-observer>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <v-snackbar
      :timeout="3000"
      :value="showAlert"
      elevation="24"
      content-class="alert"
      color="blue lighten-1"
    >
      <span class="white--text subtitle-1">{{$t('labels.send_contact_success')}}</span>
    </v-snackbar>
  </div>
</template>

<script>
import constants from "~/config/constants";
export default {
  name: "Contact",
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      content: "",
      hidden: "",
      emailSubscribe: "",
      loading: false,
      loadingSubscribe: false,
      showAlert: false,
    };
  },
  methods: {
    async sendContact() {
      // Validate
      const validForm = await this.$refs.observerSendContact.validate();
      if (validForm) {
        let domain = document.baseURI;
        this.loading = true;
        let params = {
          name: this.name,
          phone: this.phone,
          mail: this.email,
          content: this.content,
          domain,
        };
        await this.$axios.$post(`${constants.BASE_MAILER}/mail/contact`, params);
        this.showAlert = true;
        this.loading = false;
      }
    },

    async sendContactSubscribe() {
      const validForm = await this.$refs.observerSendSubcribe.validate();
      if (validForm) {
        this.loadingSubscribe = true;
        let mail = this.emailSubscribe;
        let domain = document.baseURI;
        await this.$axios.$post(`${constants.BASE_MAILER}/mail/subcribe`, {
          domain,
          mail,
        });
        this.showAlert = true;
        this.loadingSubscribe = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
