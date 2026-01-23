import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '../api/services/auth.service';
import type { UserCredentials, ConfirmRegistration, ResendCode } from '../types/user';
import { useNavigate } from 'react-router';

export const useAuthQuery = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: () => userService.getCurrentUser(),
        enabled: !!localStorage.getItem('token'),
        retry: false,
        staleTime: 5 * 60 * 1000,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    });
};

export const useSignUp = () => {
    return useMutation({
        mutationFn: (credentials: UserCredentials) => userService.initiateSignUp(credentials),
    });
};

export const useConfirmSignUp = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: ConfirmRegistration) => userService.confirmSignUp(data),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            queryClient.setQueryData(['currentUser'], data);
            navigate('/');
        },
    });
};

export const useResendCode = () => {
    return useMutation({
        mutationFn: (data: ResendCode) => userService.resendCode(data),
    });
};

export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (credentials: UserCredentials) => userService.login(credentials),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            queryClient.setQueryData(['currentUser'], data);
            navigate('/');
        },
    });
};

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: () => userService.getCurrentUser(),
        enabled: !!localStorage.getItem('token'),
        retry: false,
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async () => {
            localStorage.removeItem('token');
        },
        onSuccess: () => {
            queryClient.clear();
            navigate('/login');
        }
    });
};

export const useRequestPasswordReset = () => {
    return useMutation({
        mutationFn: (data: { email: string }) => userService.requestPasswordReset(data),
    });
};

export const useConfirmPasswordReset = () => {
    return useMutation({
        mutationFn: (data: { email: string; code: string; newPassword: string }) => 
            userService.confirmPasswordReset(data),
    });
};