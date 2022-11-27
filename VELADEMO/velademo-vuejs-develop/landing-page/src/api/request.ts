import { getJwtToken, setUserCart,setUserIdCart, setUserName, setJwtToken, setRefreshToken, seturl } from "@/utils/helpers";
import { toastError } from "@/utils/toast";
import axios from "axios";
import { store } from "../stores";
import router from "@/router";
import RefreshTokenServive from './RefreshTokenServive'

const API_URL = "http://localhost:8081";

const request = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (request) => {
    const token = getJwtToken();
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    // Edit request config
    return request;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    console.log(response);
    

    if(response?.data?.user?.email && response?.data?.user?.id && response?.data?.user?.name && response?.data?.access_token){
      setUserCart(response.data.user.email)
      setUserIdCart(response.data.user.id)
      setUserName(response.data.user.name)
      setJwtToken(response.data.access_token)
      setRefreshToken(response.data.refresh_token)
    }

    return response.data;
  },
  async (error) => {
    if (
      error?.response?.data?.error_message?.includes("The Token has expired") ||
      error?.response?.status === 403
    ) {
      try {
        toastError("Session Expired");
        const response = await RefreshTokenServive.getRefreshToken()
        setJwtToken(response.data.access_token)
        setRefreshToken(response.data.refresh_token)
        return await request.get(error?.request?.responseURL)
      } catch (error) { }
      store.commit("CHECK_IS_LOGIN");
    }
    return Promise.reject(error);
  }
);
export default request;
