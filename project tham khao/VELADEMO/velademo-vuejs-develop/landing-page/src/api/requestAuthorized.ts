import axios from "axios";

const API_URL = "http://localhost:8081";

const requestAuthorized = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

requestAuthorized.interceptors.request.use(
  (request) => {
    // Edit request config
    return request;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

requestAuthorized.interceptors.response.use(
  (response) => {
    // console.log(response);
    // Edit response config

    return response.data;
  },
  (error) => {
    console.log(error?.response);
    return Promise.reject(error);
  }
);
export default requestAuthorized;
