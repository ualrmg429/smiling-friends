import apiClient from "../interceptors";
import type { User, UserCredentials, ConfirmRegistration, ResendCode, MessageResponse } from "../../types/user";

export const userService = {
    initiateSignUp: async (credentials: UserCredentials): Promise<MessageResponse> => {
        const { data } = await apiClient.post<MessageResponse>(`/auth/register`, credentials);
        return data;
    },

    confirmSignUp: async (confirmData: ConfirmRegistration): Promise<User> => {
        const { data } = await apiClient.post<User>(`/auth/register/confirm`, confirmData);
        return data;
    },

    resendCode: async (resendData: ResendCode): Promise<MessageResponse> => {
        const { data } = await apiClient.post<MessageResponse>(`/auth/register/resend`, resendData);
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