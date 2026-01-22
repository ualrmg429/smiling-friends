import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '../api/services/auth.service';
import type { User, UserCredentials } from '../types/user';
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
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (credentials: UserCredentials) => userService.signUp(credentials),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            queryClient.setQueryData(['currentUser'], data);
            navigate('/'); 
        },
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