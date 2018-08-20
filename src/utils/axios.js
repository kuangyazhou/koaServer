import axios from "axios";
import setToken, {loadToken } from "./token";

const service = axios.create({
    // baseURL: process.env.BASE_API,
    baseURL: "http://10.103.1.110:2333",
    timeout: 10000
});

service.interceptors.request.use(
    config => {
        let token = loadToken();
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
    if (response.headers.token) {
      setToken(response.headers.token);
        console.log(
            "旧的" + old,
            "新的" + response.headers.token,
            "更新token"
        );
    }
    return response.data;
});

export default service;
