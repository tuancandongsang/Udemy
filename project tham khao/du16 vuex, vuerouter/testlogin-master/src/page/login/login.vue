<template>
  <div class="container">
    <div class="container-login">
      <div class="login-form">
        <h2 class="login-form-title">SAMSUNG SDS FMS</h2>
        <div class="input-form">
          <div class="input-form-user">
            <label for=""><i class="fa-solid fa-user"></i></label>
            <input type="text" placeholder="ID" v-model="user.name" />
          </div>
          <div class="input-form-user">
            <label for="" @click="tongglePassword" v-if="password"><i class="fa-solid fa-eye-slash"></i></label>
            <label for="" @click="tongglePassword" v-else><i class="fa-solid fa-eye"></i></label>
            <input :type="password ? 'password' : 'text'" placeholder="PASSWORD" v-model="user.password" />
          </div>
          <div class="input-form-language">
            <select id="cars" @change="onChangeLanguage" v-model="langValue">
              <option value="en" :selected="langValue == 'en'">English</option>
              <option value="kr" :selected="langValue == 'kr'">한국인</option>
            </select>
          </div>
        </div>
        <div class="login-form-btn">
          <Button content="Log In"  @click="handleSubmit"/>
          <!-- <button @click="handleSubmit">
            {{ $tc('login') }}
          </button> -->
        </div>
        <p class="error login-form-message" v-if="messageError">
          {{ $tc('errorLogin') }}
        </p>
        <p class="success login-form-message" v-if="messageSuccess">
          {{ $tc('successLogin') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../../components/Button/Button.vue'
import { i18n } from '@/config/setup-i18n';
import { DEFAULT_LANG } from '@/constants/index';
import './Login.scss';
import { setJwtToken } from '@/utils/helpers';

export default {
  components:{Button},
  data: () => {
    return {
      langValue: DEFAULT_LANG,
      user: {
        name: '',
        password: '',
      },
      messageError: false,
      messageSuccess: false,
      password: true,
    };
  },
  methods: {
    tongglePassword() {
      this.password = !this.password;
    },
    onChangeLanguage() {
      i18n.global.locale = this.langValue;
    },
    handleSubmit() {
      if (this.user.name == '') {
        return (this.messageError = true);
      } else if (this.user.password == '') {
        return (this.messageError = true);
      } else {
        this.messageError = false;
        this.messageSuccess = true;
        setTimeout(() => {
          setJwtToken('tuancandongsang')
          this.$router.push('/home');
        }, 2000);
      }
    },
  },
};
</script>
