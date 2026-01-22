import apiClient from "../interceptors";
import type { User, UserCredentials } from "../../types/user";

export const userService = {
    signUp: async (credentials : UserCredentials): Promise<User> => {
        const { data } = await apiClient.post<User>(`/auth/register`, credentials);
        return data;
    },

    login: async (credentials: UserCredentials): Promise<User> => {
        const { data } = await apiClient.post<User>(`/auth/login`, credentials);
        return data;
    },

    getCurrentUser: async (): Promise<User> => {
        const { data } = await apiClient.get<User>(`/auth/me`);
        return data;
    }
}