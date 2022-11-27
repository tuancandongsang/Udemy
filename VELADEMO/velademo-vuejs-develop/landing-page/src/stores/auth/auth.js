import LoginService from "@/api/LoginService";

import { getJwtToken, setJwtToken, getUserName, getCheckoutLogin } from "@/utils/helpers";
import router from '@/router/index'


const auth = {
  state: {
    messageErrorLogin: "",
    isLogin: true,
    statusLogin: "login",
    username:'',
  },
  mutations: {
    STATUS_LOGIN(state, status) {
      state.statusLogin = status;
    },

    INCORECT_LOGIN(state) {
      state.messageErrorLogin = "Incorect Email or Password!";
    },

    SET_LOGIN(state) {
      const token = getJwtToken()
      const checkout = getCheckoutLogin()
      if(token && checkout ){
        router.push('/checkout')
      }
      state.isLogin = false;
    },
    CHECK_NAME(state){
      state.username= getUserName()
    },

    CHECK_IS_LOGIN(state) {
      const jwtToken = getJwtToken();
      if (!jwtToken) {
        state.isLogin = true;
      } else {
        state.token = jwtToken;
        state.isLogin = false;
      }
    },
  },
  actions: {
    async getLogin(context, infor) {
      try {
        // Call login method in API
        // The server handler is responsible for setting user fingerprint cookie during this as well
        await LoginService.postLogin( infor);
        context.commit("SET_LOGIN");
      } catch (err) {
        if (err.response.status === 401 || 404) {
          context.commit("INCORECT_LOGIN");
        }
      }
    },
  },
  getters: {},
};

export default auth;
