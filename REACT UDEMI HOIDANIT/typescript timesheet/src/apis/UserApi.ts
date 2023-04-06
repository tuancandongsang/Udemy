import { request } from "../utils/apiCore";
import { API_BASE_PROJECT } from "../utils/constants/UserConstants";

export const loginUser = async (data: any) => {
  return await request({
    url: `${API_BASE_PROJECT.API_LOGIN}`,
    method: "POST",
    data
  });
};

export const refeshToken = async (token: any) => {
  return await request({
    url: `${API_BASE_PROJECT.API_REFRESH_TOKEN}`,
    method: "POST",
    data: token
  });
};
