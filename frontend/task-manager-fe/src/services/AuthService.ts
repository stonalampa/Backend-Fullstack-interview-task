// AuthService.ts
import { saveToken, removeToken } from "../helpers/tokenHelper";
import { AxiosResponse } from "axios";
import api from "../helpers/api";
import { setAuthToken } from "../helpers/api";

export const login = async (
    email: string,
    password: string
): Promise<boolean> => {
    const response: AxiosResponse = await api.post("/user/login", {
        email,
        password,
    });

    const token: string = response.data.token;
    if (token) {
        saveToken(token);
        setAuthToken(token);
        return true;
    }

    return false;
};

export const logout = (): void => {
    removeToken();
    setAuthToken(null);
};

export const register = async (
    email: string,
    password: string
): Promise<AxiosResponse> => {
    return api.post("/user", {
        email,
        password,
    });
};
