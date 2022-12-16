import axios from "axios";
import { setJwtToken, getJwtToken, geturl, seturl, setRefreshToken, setTheme } from '@/utils/helpers'
import RefreshTokenServive from './RefreshTokenServive'

const BASE_URL = "http://localhost:8081"

const requestUnauthorized = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

requestUnauthorized.interceptors.request.use(
  (request) => {
    if (request.url?.indexOf('/api/login') >= 1 || request.url?.indexOf('/api/token/refresh') >= 1 || request.url?.indexOf('/api/user/register') >= 1) {
      return request;
    }
    if (getJwtToken()) {
      request.headers["Authorization"] = `Bearer ${getJwtToken()}`;
      seturl(request?.url)
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

requestUnauthorized.interceptors.response.use(
  (response) => {
    if (response?.data?.refresh_token && response?.data?.access_token) {
      const token = response?.data?.access_token
      setJwtToken(token)
      const refreshToken = response?.data?.refresh_token
      setRefreshToken(refreshToken)
      setTheme('dark')
    }

    if (response?.access_token && response?.refresh_token) {
      const token = response?.access_token
      setJwtToken(token)
      const refreshToken = response?.refresh_token
      setRefreshToken(refreshToken)
    }
    return response.data;
  },
  async (error) => {
    if (error?.response?.status === 403) {
      try {
        const response = await RefreshTokenServive.getRefreshToken()
        setJwtToken(response.data.access_token)
        setRefreshToken(response.data.refresh_token)
        return await requestUnauthorized.get(`${geturl()}`)
      } catch (error) { }
    }
    return Promise.reject(error);
  }
);
export default requestUnauthorized;
