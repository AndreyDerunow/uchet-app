import axios, { AxiosRequestHeaders } from "axios";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";

const http = axios.create({ baseURL: configFile.baseURL });

interface CommonHeaderProperties extends AxiosRequestHeaders {
    Authorization: string;
}

http.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageService.getTokenExpiresDate();
        const refreshToken = localStorageService.getRefreshToken();
        const stayIn = localStorageService.getStayIn() === "true";
        if (expiresDate && +expiresDate < Date.now()) {
            if (stayIn && refreshToken) {
                const data = await authService.refresh();
                localStorageService.setTokens(data);
            } else {
                localStorageService.removeAuth();
            }
        }

        const accessToken = localStorageService.getAccessToken();
        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`
            } as CommonHeaderProperties;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
};

export default httpService;
