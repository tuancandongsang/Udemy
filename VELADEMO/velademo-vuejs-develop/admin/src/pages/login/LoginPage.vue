<template>
  <div id="login-page">
    <div class="body">
      <div class="overlay"></div>
      <div class="image"></div>
      <div class="form-login">
        <h2>Welcome to Velademo</h2>
        <p>Please sign-in to your account and start the adventure</p>
        <div class="account-placeholder">
          <b>Admin: </b> dhtu1@cmcglobal.vn | 123456
        </div>
        <div
          class="account-alert__error"
          :class="
            errorMessage.length == 0 ? '' : 'account-alert__error--active'
          "
        >
          <p>{{ errorMessage }}</p>
        </div>
        <a-form
          :model="formState"
          name="basic"
          layout="vertical"
          autocomplete="off"
          @finish="onFinish"
          :validate-messages="validateMessages"
          class="login-form"
        >
          <a-form-item
            :name="['email']"
            label="Email"
            :rules="[
              {
                required: true,
                type: 'email',
              },
            ]"
          >
            <a-input
              v-model:value="formState.email"
              placeholder="Enter your email"
            />
          </a-form-item>

          <a-form-item
            :name="['password']"
            label="Password"
            :rules="[{ required: true }]"
          >
            <a-input-password
              v-model:value="formState.password"
              placeholder="Enter your password"
            />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit">Sign In</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import "./login.scss";
import router from "@/router";
import { toastSuccess} from '@/utils/toast'

export default {
  data() {
    return {
      errorMessage: "",
      formState: {
        email: "",
        password: "",
      },
      validateMessages: {
        required: "${label} is required",
        types: {
          email: "${label} is not valid",
        },
      },
    };
  },
  created() {},
  methods: {
    async onFinish(values) {
      const data = {
        username: values.email,
        password: values.password,
      };
      await this.$store.dispatch("loginSuccess", data);
      if (this.$store.state.auth.isLogin) {
        this.$router.push("/");
        toastSuccess('Login Success')
      }
    },
  },
  computed: {
    errorMessage() {
      return (this.errorMessage = this.$store.state.auth.error_message);
    },
  },
};
</script>
