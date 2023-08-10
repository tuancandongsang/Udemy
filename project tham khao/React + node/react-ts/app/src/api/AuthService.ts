import requestUnauthorized from "./request";
import { API_LOGIN } from "./constanst";
import { getRefreshToken } from "../utills/helpers/localstorage";

class AuthService {
  static _instance: any;
  constructor() {
    if (AuthService._instance) {
      return AuthService._instance;
    }
    AuthService._instance = this;
  }
  register(data: string) {
    return requestUnauthorized.post(API_LOGIN.REGISTER, data);
  }
  login(data: any) {
    return requestUnauthorized.post(API_LOGIN.LOGIN, data);
  }
  refreshToken() {
    return requestUnauthorized.post(API_LOGIN.REFRESH_TOKEN, {
      refreshToken: getRefreshToken(),
    });
  }
}

const Service = new AuthService();

export default Service;
