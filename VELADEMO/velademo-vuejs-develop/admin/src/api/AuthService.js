
import requestUnauthorized from "./request";

const API_ENDPOINT = {
  POST_REGISTER: "/api/user/register/",
  POST_LOGIN: `/api/login`,
  GET_REFRESH_TOKEN: "/api/token/refresh",
};
class AuthService {
  constructor() {
    if (AuthService._instance) {
      return AuthService._instance;
    }
    AuthService._instance = this;
  }
  postRegister(data) {
    return requestUnauthorized.get(API_ENDPOINT.POST_REGISTER + data);
  }
  postLogin(data) {
    return requestUnauthorized.post(API_ENDPOINT.POST_LOGIN, data);
  }
  
}

const Service = new AuthService();

export default Service;
