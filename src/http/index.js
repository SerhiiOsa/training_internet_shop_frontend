import axios from "axios";

axios.defaults.withCredentials = true;

export const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})