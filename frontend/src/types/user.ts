export interface User {
    id: string;
    email: string;
    role: string;
    token: string;
}

export interface UserCredentials {
    email: string;
    password: string;
}