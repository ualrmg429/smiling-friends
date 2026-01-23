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

export interface ConfirmRegistration  {
    email: string;
    code: string;
}

export interface ResendCode  {
    email: string;
}

export interface MessageResponse {
    message: string;
}