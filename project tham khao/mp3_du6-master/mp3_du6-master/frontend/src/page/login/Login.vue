<template>
  <div id="login">
    <div class="background"></div>
    <div class="container">
      <h1>Login</h1>
      <div class="form">
        <div class="username">
          <label for="">Username:</label>
          <input type="text" v-model="username" @blur="checkName" />
          <div class="validate-input">{{ message }}</div>
        </div>
        <div class="password">
          <label for="">Password:</label>
          <input type="password" v-model="password" />
          <div class="validate-input">
            {{ messagePassword }}
          </div>
        </div>
      </div>
      <div class="submit">
        <button @click="submitLogin">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import "./login.scss";
export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
      messagePassword: "",
    };
  },
  computed: {
    isValidLogin() {
      return this.username && this.password;
    },
  },
  watch: {
    username() {
      this.username && this.username.length < 9
        ? (this.message = "UserName min length  is 8")
        : (this.message = "");
    },
    password() {
      if (!this.password) {
        this.messagePassword = "Password invalid";
      }
      if (this.password.length < 7) {
        this.messagePassword = "Min 6 text";
      } else {
        this.messagePassword = "";
      }
    },
  },
  methods: {
    submitLogin() {
      if (this.isValidLogin && !this.messagePassword && !this.message) {
        document.cookie=`username_zingDu6=${this.username} ; expires=${new Date('2023-03-29 14:20:00').toUTCString()}`
        this.$router.push("/");
      }
      console.log(document.cookie);
    },
  },
};
</script>

<style>
.validate-input {
  margin-left: 20px;
  margin-top: 3px;
  color: red;
}
</style>