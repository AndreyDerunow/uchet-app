import axios from "axios";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";
const authEndPoint = "auth/";

const httpAuth = axios.create({ baseURL: configFile.baseURL + authEndPoint });

const authService = {
    signUp: async (payload) => {
        const { data } = await httpAuth.post("signUp", payload);
        return data;
    },
    logIn: async (payload) => {
        const { data } = await httpAuth.post("SignInWithPassword", payload);
        return data;
    },
    refresh: async () => {
        const refresh = localStorageService.getRefreshToken();

        const { data } = await httpAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: refresh
        });
        return data;
    }
};

export default authService;
