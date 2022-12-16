
import axios from "axios";

const API_URL = "http://localhost:8081";

const requestProductDbJson = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default requestProductDbJson




