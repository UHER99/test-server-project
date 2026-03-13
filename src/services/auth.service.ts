import api from "@/lib/axios";
import type { User, AuthResponse } from "@/types/auth";

export const authService = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>("/api/auth/login", { email, password });
        return data;
    },

    register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>("/api/auth/register", { name, email, password });
        return data;
    },

    logout: async (): Promise<void> => {
        await api.post("/api/auth/logout");
    },

    getSession: async (): Promise<User> => {
        const { data } = await api.get<User>("/api/auth/session");
        return data;
    },

    getUsers: async (): Promise<User[]> => {
        const { data } = await api.get<User[]>("/api/admin/users");
        return data;
    },
};
