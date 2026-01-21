// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '../types/user';
import { useCurrentUser } from '../hooks/useAuth';
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
    const [user, setUser] = useState<User | null>(null);
    const { data, isLoading, isError } = useCurrentUser();

    useEffect(() => {
        if (data) {
            setUser(data);
        } else if (isError) {
            setUser(null);
            localStorage.removeItem('token');
        }
    }, [data, isError]);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login'); 
    };

    const value = {
        user,
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