import requestUnauthorized from "../../api/AuthService";
import {removetJwtToken,removeRefreshToken,removeUrl} from '@/utils/helpers'

const auth = {
  state: {
    error_message: "",
    isLogin: false,
  },
  mutations: {
    LOGIN_SUCCESS(state) {
      state.isLogin = true;
    },
    LOGIN_ERROR(state, msg) {
      state.error_message = msg;
      state.isLogin = false;
    },
    LOGOUT(state) {
      state.isLogin = false;
      state.error_message = "";
      removetJwtToken()
      removeRefreshToken()
      removeUrl()
    },
  },
  actions: {
    async loginSuccess(context, value) {
      try {
       await requestUnauthorized.postLogin( value);
        context.commit("LOGIN_SUCCESS");
      } catch (error) {
        if (
          error?.response?.status === 404 ||
          error?.response?.data?.Message?.includes(
            "Username password incorrect"
          )
        ) {
          context.commit("LOGIN_ERROR", error?.response?.data?.Message || "");
        }
      }
    },
  },
  getters: {},
};

export default auth;
