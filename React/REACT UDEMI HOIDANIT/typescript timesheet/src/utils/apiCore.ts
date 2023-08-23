import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { getToken } from "./helpers/localstorage";
type obj = {
  [key: string]: any;
};

const request = axios.create({
  baseURL: import.meta.env.APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});
const token = getToken();

request.interceptors.request.use((config: AxiosRequestConfig) => {
  const customHeaders: obj = {
    Authorization: `Bearer ${token}`
  };
  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        ...customHeaders
      }
    };
  }
  return config;
});

// after send request
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
export { request };
