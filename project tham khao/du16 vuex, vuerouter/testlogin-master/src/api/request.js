import axios from 'axios';

// const API_URL = 'http://localhost:3000';
// console.log(process.env.VUE_APP_API_URL)

const request = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default request;
