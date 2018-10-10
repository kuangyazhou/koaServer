import axios from "axios";
import { setToken, loadToken } from "./token";

const service = axios.create({
  // baseURL: process.env.BASE_API,
  baseURL: "http://10.103.1.1:2333",
  timeout: 10000
});

service.interceptors.request.use(
  config => {
    let token = loadToken();
    // console.log(token);
    config.headers["token"] = token;
    return config;
  },
  err => {
    console.log(err);
    Promise.reject(err);
  }
);

service.interceptors.response.use(response => {
  const old = loadToken();
  if (response.data.token) {
    setToken(response.data.token);
    console.log("旧的:" + old, "新的:" + response.data.token, "更新token");
  }
  if (!response.data.status) {
    // setTimeout(() => {
    //     window.location.replace("/signin");
    // }, 3000);
    // console.log(response.data);
  }
  return response.data;
});

export default service;
