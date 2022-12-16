<template>
  <div>
    <validation-observer ref="obsSubscriber">
      <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
        <div class="form-subcribe">
          <v-text-field
            required
            v-model="emailSubscribe"
            :rounded="rounded"
            :outlined="rounded"
            :error-messages="errors"
            placeholder="Nhập Email của bạn"
          ></v-text-field>

          <v-btn color="primary" id="btn-subscribe" :loading="loading" @click="submit"
            >SUBSCRIBE</v-btn
          >
        </div>
      </validation-provider>
    </validation-observer>
    <v-snackbar
      :timeout="3000"
      :value="showAlert"
      fixed
      top
      color="primary"
      right
    >
      <div class="pa-2 size-16">Gửi đăng ký thành công!</div>
    </v-snackbar>
  </div>
</template>

<script>
import constants from "~/config/constants";
export default {
  props: {
    rounded: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      emailSubscribe: "",
      showAlert: false,
    };
  },
  methods: {
    async submit() {
      const validForm = await this.$refs.obsSubscriber.validate();
      let mail = this.emailSubscribe;
      let domain = document.baseURI;

      if (validForm) {
        this.loading = true;
        await this.$axios.$post(
          `${constants.BASE_MAILER}/mail/subcribe`,
          {
            domain,
            mail,
          }
        );
        this.emailSubscribe = ''
        // window.location.href="/thank"
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>