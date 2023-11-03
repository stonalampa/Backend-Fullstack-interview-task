import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "auth_token";

export const saveToken = (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};

export const validateToken = (): boolean => {
    const token = getToken();
    if (!token) {
        return false;
    }

    const decoded = jwtDecode(token);
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
        removeToken();
        return false;
    }

    return true;
};

export const getIdFromToken = (): number | null => {
    const token = getToken();
    if (!token) {
        return null;
    }

    const decoded = jwtDecode(token) as { id: number };
    return decoded.id;
};
