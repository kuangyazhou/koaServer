const TOKEN_ID = "user_id_token";

export const setToken = function(data) {
    localStorage.setItem(TOKEN_ID, data);
};

export const loadToken = function() {
    return localStorage.getItem(TOKEN_ID);
};

export const setUserInfo = function(user) {
    sessionStorage.setItem("user", JSON.stringify(user));
};

export const getUserInfo = function() {
    return JSON.parse(sessionStorage.getItem("user"));
};
