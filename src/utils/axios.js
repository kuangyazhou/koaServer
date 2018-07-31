import axios from "axios";
import loadToken from "./token";

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

service.interceptors.response.use(
    response => {
        const old = loadToken();
        if (response.headers.authorization) {
            setToken(response.headers.authorization);
            console.log(
                "旧的" + old,
                "新的" + response.headers.authorization,
                "更新token"
            );
        }
        // 返回status为-1时,状态为退出,跳转至登录;
        if (response.data.status == -1) {
            console.log("身份已过期");
            store.commit("LOGIN_OUT");
            //console.log(route.history.current.meta.member)
            let a = route.history.current.meta.member || false;

            Message({
                center: true,
                // message: '您的身份信息已过期，需重新登录',
                message: i18n.t("message.durDate"),
                duration: 1800,
                type: "error",
                onClose: () => {
                    if (!a) {
                        window.location.replace("/login");
                    } else {
                        if (route.history.current.name != "Trade") {
                            window.location.replace("/");
                        }
                    }
                }
            });
        }
        return response;
    },
    err => {
        console.log(err);
    }
);

export default service;
s;
