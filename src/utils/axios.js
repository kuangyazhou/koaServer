import axios from "axios";
import loadToken from "../utils/token";

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 10000
});

service.interceptors.request.use(
    config => {
        let token = loadToken();
        config.headers["Authorization"] = token;
        return config;
    },
    err => {
        console.log(err);
        Promise.reject(err);
    }
);

service.interceptors.response.use(response => {
    const old = loadToken();
    if (response.headers.authorization) {
        setToken(response.headers.authorization);
        console.log(
            "旧的" + old,
            "新的" + response.headers.authorization,
            "更新token"
        );
    }
});
