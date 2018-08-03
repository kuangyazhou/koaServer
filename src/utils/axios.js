import axios from "axios";
// import loadToken, { setToken } from "./token";

const service = axios.create({
    // baseURL: process.env.BASE_API,
    baseURL: "http://172.22.188.232:2333",
    timeout: 10000
});

service.interceptors.request.use(
    config => {
        // let token = loadToken();
        // config.headers["Authorization"] = token;
        return config;
    },
    err => {
        console.log(err);
        Promise.reject(err);
    }
);

service.interceptors.response.use(response => {
    // const old = loadToken();
    // if (response.headers.authorization) {
    //   setToken(response.headers.authorization);
    //     console.log(
    //         "旧的" + old,
    //         "新的" + response.headers.authorization,
    //         "更新token"
    //     );
    // }
    return response.data;
});

export default service;
