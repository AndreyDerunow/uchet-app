const ACCESS_KEY = "access";
const REFRESH_KEY = "refresh";
const EXPIRES_KEY = "expires-in";
const USER_KEY = "userId";

export function setTokens({ accessToken, refreshToken, expiresIn, userId }) {
    const expiresTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(ACCESS_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresTime);
    localStorage.setItem(USER_KEY, userId);
}
export function setStayIn(stayIn) {
    localStorage.setItem("stayIn", stayIn);
}
export function removeAuth() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(USER_KEY);
}
export function getStayIn() {
    return localStorage.getItem("stayIn");
}
export function getAccessToken() {
    return localStorage.getItem(ACCESS_KEY);
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}
export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
    return localStorage.getItem(USER_KEY);
}
const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeAuth,
    setStayIn,
    getStayIn
};
export default localStorageService;
