import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '../api/services/auth.service';
import type { User, UserCredentials } from '../types/user';

export const useSignUp = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: UserCredentials) => userService.signUp(credentials),
        onSuccess: (data: User) => {
            localStorage.setItem('token', data.token);
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        },
        onError: (error) => {
            console.error('Error en registro:', error);
        }
    });
};

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials: UserCredentials) => userService.login(credentials),
        onSuccess: (data: User) => {
            localStorage.setItem('token', data.token);
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        },
        onError: (error) => {
            console.error('Error en login:', error);
        }
    });
};

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ['currentUser'],
        queryFn: () => userService.getCurrentUser(),
        enabled: !!localStorage.getItem('token'),
        retry: false, // Do not retry on failure
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            localStorage.removeItem('token');
        },
        onSuccess: () => {
            queryClient.clear();
        }
    });
};