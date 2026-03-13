import axios from "axios";

const api = axios.create({
    baseURL: "/",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor: attach Bearer token from localStorage
api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("auth_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default api;
