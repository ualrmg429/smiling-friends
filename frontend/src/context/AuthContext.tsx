// contexts/AuthContext.tsx
import { createContext, useContext, type ReactNode } from 'react';
import type { User } from '../types/user';
import { useAuthQuery, useLogout as useLogoutMutation } from '../hooks/useAuthQuery';
import { useNavigate } from 'react-router';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate();
    const { data: user, isLoading } = useAuthQuery();
    const logoutMutation = useLogoutMutation();

    const logout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                navigate('/login');
            }
        });
    };

    const value = {
        user: user ?? null,
        isAuthenticated: !!user,
        isLoading,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};