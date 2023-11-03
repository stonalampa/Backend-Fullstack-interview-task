// api.ts
import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
});

api.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response && error.response >= 400 && error.response < 500;

    if (!expectedError) {
        //console.log('Logging the error', error);
        toast.error("An unexpected error occured!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return Promise.reject(error);
});

export const setAuthToken = (token: string | null): void => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};

export default api;
