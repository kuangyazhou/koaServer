const TOKEN_ID = "user_id_token";

export default function setToken(data) {
    localStorage.setItem(TOKEN_ID, data);
}

export function loadToken() {
    return localStorage.getItem(TOKEN_ID);
}

export function setUserInfo(user) {
    sessionStorage.setItem("user", JSON.stringify(user));
}

export function getUserInfo() {
    return JSON.parse(sessionStorage.getItem("user"));
}
