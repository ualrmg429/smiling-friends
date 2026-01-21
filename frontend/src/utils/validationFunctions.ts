
export const validateEmail = (email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return 'Email is required';
    } else if (!emailRegex.test(email)) {
        return 'Please enter a valid email';
    }
}

export const validatePassword = (password: string): string | undefined => {
    if (!password) {
        return 'Password is required';
    } else if (password.length < 8) {
        return 'Password must be at least 8 characters';
    } else if (!/[a-z]/.test(password)) {
        return 'Password must contain at least 1 lowercase letter';
    } else if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least 1 uppercase letter';
    } else if (!/[0-9]/.test(password)) {
        return 'Password must contain at least 1 number';
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return 'Password must contain at least 1 symbol';
    }
}

