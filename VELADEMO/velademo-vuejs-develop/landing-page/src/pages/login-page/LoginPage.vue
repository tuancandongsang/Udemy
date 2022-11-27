<template>
  <div id="authen-page">
    <div class="container">
      <div class="account">
        <div class="account-nav">
          <div class="account-nav-login" @click="handleLogin('login')">
            <h4 class="account-nav-login__title" v-bind:class="
              statusLogin === 'login'
                ? 'account-nav-login__title--active'
                : ''
            ">
              Login
            </h4>
          </div>
          <div class="account-nav-create" @click="handleLogin('register')">
            <h4 class="account-nav-create__title" v-bind:class="
              statusLogin === 'register'
                ? 'account-nav-create__title--active'
                : ''
            ">
              Create Account
            </h4>
          </div>
        </div>
        <div class="account-main">
          <div class="account-content" v-if="statusLogin === 'login'">
            <div class="login-alert" :class="alertLogin ? 'alert-success' : 'alert-error'">
              <p v-if="messageAlertLogin.length > 0">
                {{ messageAlertLogin }}
              </p>
            </div>

            <div>
              <div class="account-email">
                <input type="email" class="form-control account-email-control" required autofocus placeholder="Email"
                  v-on:change="onChangeEmail" />
              </div>
              <div class="account-password">
                <input v-bind:type="showPassword ? 'text' : 'password'" class="form-control account-password-control"
                  required placeholder="Password" v-on:change="onChangePassword" />
                <div class="account-password__showbtn" @click="handleShowPassword">
                  <span class="showbtn" v-if="isPassword">Hide </span>
                  <span class="showbtn" v-if="!isPassword">Show</span>
                </div>
              </div>
              <div class="account-signin-btn">
                <input type="button" value="Sign In" v-on:click="handleSubmitLogin" class="signin-btn" />
              </div>
            </div>
          </div>

          <div class="register-content" v-if="statusLogin === 'register'">
            <div class="register-alert" :class="alertRegister ? 'alert-success' : 'alert-error'">
              <p v-if="messageAlertRegister.length > 0">
                {{ messageAlertRegister }}
              </p>
            </div>

            <div>
              <div class="register-name">
                <input type="text" class="form-control register-name-control" placeholder="Full Name" required autofocus
                  @change="handleName" />
              </div>
              <div class="register-email">
                <input type="email" class="form-control register-email-control" required placeholder="Email"
                  v-on:change="onChangeEmailRegister" />
              </div>
              <div class="register-password">
                <input v-bind:type="showPassword ? 'text' : 'password'" class="form-control register-password-control"
                  required placeholder="Password" v-on:change="onChangePasswordRegister" />
                <div class="register-password__showbtn" @click="handleShowPassword">
                  <span class="showbtn" v-if="isPassword">Hide</span>
                  <span class="showbtn" v-if="!isPassword">Show</span>
                </div>
              </div>
              <div class="register-confirm-password">
                <input type="password" class="form-control register-confirm-password-control"
                  placeholder="Confirm Password" v-on:change="onChangeConfirmPassword" />
              </div>
              <div class="register-create-btn">
                <input type="button" value="Create Account" class="create-account-btn"
                  v-on:click="handleSubmitRegister" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginService from "@/api/LoginService";
import "./login.scss";
import { getCheckoutLogin } from '@/utils/helpers'
export default {
  data() {
    return {
      alertLogin: true,
      messageAlertLogin: "",
      alertRegister: true,
      messageAlertRegister: "",
      statusLogin: this.$store.state.auth.statusLogin,
      isPassword: true,
      login: {
        email: "",
        password: "",
      },
      register: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validateEmail(email) {
        if (
          String(email)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
          return true;
        } else {
          return false;
        }
      },
      validatePassword(password) {
        if (
          String(password)
            .match(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            )
        ) {
          return true;
        } else {
          return false;
        }
      },
    };
  },

  watch: {
    statusLogin(newValue, oldValue) {
      this.messageAlertLogin = "";
      this.messageAlertRegister = "";
    },
  },

  created() {
    if (!this.$store.state.auth.isLogin) {
      this.$router.push({
        name: "home",
      });
    }
  },

  methods: {
    //login methods

    handleLogin(status) {
      this.$store.commit("STATUS_LOGIN", status);
    },
    handleShowPassword() {
      this.isPassword = !this.isPassword;
    },
    onChangeEmail(e) {
      this.login.email = e.target.value;
    },
    onChangePassword(e) {
      this.login.password = e.target.value;
    },
    unique(arr) {
      const newArr = []
      for (var i = 0; i < arr.length; i++) {
        const x = newArr.map(item => item?.id).indexOf(arr[i].id)
        console.log(x);
        if (x === -1) {
          newArr.push(arr[i])
        } else {
          const index = newArr.findIndex(item => item.id === arr[i].id)
          newArr[index].quantity = newArr[index].quantity + arr[i].quantity
        }
      }
      return newArr
    },

    async handleSubmitLogin() {
      const data = this.login;
      if (data.email === "") {
        this.alertLogin = false;
        this.messageAlertLogin = "Email must be not empty!";
      } else if (!this.validateEmail(data.email)) {
        this.alertLogin = false;
        this.messageAlertLogin = "Invalid email";
      } else if (data.password === "") {
        this.alertLogin = false;
        this.messageAlertLogin = "Password must be not empty!";
      } else {
        const infor = {
          username: data.email.trim(),
          password: data.password.trim(),
        };
        await this.$store.dispatch("getLogin", infor);
        await this.$store.dispatch("updateCartCurrent")
        const carttotal =  [...this.$store.state.cart.cart, ...this.$store.state.cart.cartNotLogin]
        await this.$store.dispatch("updateCart", this.unique(carttotal))
        await this.$store.dispatch("updateCartCurrent")
        this.$store.commit("CHECK_NAME");
        if (!this.$store.state.auth.isLogin) {
          this.alertLogin = true;
          this.messageAlertLogin = "Sign in Successfully!";
          setTimeout(() => {
            if(getCheckoutLogin() === 'true'){
              const path = this.$store.state.routerpath.path
              this.$router.push( `${path}`);
              this.$store.commit("ISVISIBLE_CART")
            } else{
              this.$router.go(-1)
            }
          }, 1000);
        } else {
          this.alertLogin = false;
          this.messageAlertLogin = this.$store.state.auth.messageErrorLogin;
        }
      }
    },

    //Register methods

    handleName(e) {
      this.register.name = e.target.value;
    },
    onChangeEmailRegister(e) {
      this.register.email = e.target.value;
    },
    onChangePasswordRegister(e) {
      this.register.password = e.target.value;
    },
    onChangeConfirmPassword(e) {
      this.register.confirmPassword = e.target.value;
    },
    async handleSubmitRegister() {
      const data = this.register;
      if (data.name === "") {
        this.alertRegister = false;
        this.messageAlertRegister = "Name must be not empty!";
      } else if (data.email === "") {
        this.alertRegister = false;
        this.messageAlertRegister = "Email must be not empty!";
      } else if (!this.validateEmail(data.email)) {
        this.alertRegister = false;
        this.messageAlertRegister = "Invalid email";
      } else if (!this.validatePassword(data.password)) {
        this.alertRegister = false;
        this.messageAlertRegister = "Password must be at least eight characters, with at least one letter, one number, and one special character !";
      } else if (data.confirmPassword != data.password) {
        this.alertRegister = false;
        this.messageAlertRegister = "Your confirmed password is incorect!";
      } else {
        const infor = {
          email: data.email.trim(),
          name: data.name.trim(),
          password: data.password.trim(),
          confirmPassword: data.confirmPassword.trim(),
        };

        try {
          // const response = await http.post("/api/user/register", infor);
          const response = await LoginService.postRegister(infor);

          if (response.email != "") {
            setTimeout(() => {
              this.handleLogin("login");
            }, 1500);
            this.alertRegister = true;
            this.messageAlertRegister = "Create Account Successfully!";
          }
        } catch (error) {
          if (error?.response?.data?.Errors?.includes("Email đã tồn tại!")) {
            this.alertRegister = false;
            this.messageAlertRegister = error?.response?.data?.Errors || "";
          }
        }
      }
    },
  },
  computed: {
    statusLogin() {
      return (this.statusLogin = this.$store.state.auth.statusLogin);
    },
    showPassword() {
      return this.isPassword;
    },

    alertRegister() {
      return this.alertRegister;
    },
    alertLogin() {
      return this.alertLogin;
    },
  },
};
</script>

<style scoped>

</style>
