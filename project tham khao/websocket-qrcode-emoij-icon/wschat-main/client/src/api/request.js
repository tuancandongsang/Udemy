import axios from "axios";
import { API_URL } from "../constants/index";

const request = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default request;
