import axios from "axios";
import {
  getToken,
  setToken,
  setRefreshToken,
  seturl,
  geturl,
} from "../utills/helpers/localstorage";
import AuthService from "./AuthService";
import { BASE_URL } from "./constanst.js";

const requestUnauthorized = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

requestUnauthorized.interceptors.request.use(
  (request) => {
    if (
      request.url === "/login" ||
      request.url === "/register" ||
      request.url === "/refresh-token"
    ) {
      return request;
    }

    if (getToken()) {
      request.headers["Authorization"] = `${getToken()}`;
      seturl(request.url);
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

requestUnauthorized.interceptors.response.use(
  (response) => {
    if (response?.data?.token && response?.data?.refreshToken) {
      const token = response?.data?.token;
      setToken(token);
      const refreshToken = response?.data?.refreshToken;
      setRefreshToken(refreshToken);
    }
    return response.data;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      try {
        const response = await AuthService.refreshToken();

        setToken(response.token);
        setRefreshToken(response.refreshToken);
        return await requestUnauthorized.get(`${geturl()}`);
      } catch (error) {}
    }
    return Promise.reject(error);
  }
);
export default requestUnauthorized;
