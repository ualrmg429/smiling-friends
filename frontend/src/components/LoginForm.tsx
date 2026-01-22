import { useState } from 'react';
import MainButton from './Buttons/MainButton';
import { validateEmail, validatePassword } from '../utils/validationFunctions';
import { Link, useNavigate } from 'react-router';
import { useLogin } from '../hooks/useAuthQuery';

interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

export default function LoginForm() {
    const login = useLogin();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Validations
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        if (emailError) newErrors.email = emailError;
        if (passwordError) newErrors.password = passwordError;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        login.mutate(
            { 
                email: formData.email, 
                password: formData.password 
            },
            {
                onSuccess: () => {
                    navigate('/');
                },
                onError: (error: any) => {
                    setErrors({ 
                        email: error?.response?.data?.message || 'Login failed. Please try again.' 
                    });
                }
            }
        );
    };

    return (
        <section className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-lg shadow-lg border border-slate-700">
                
                {/* Email Field */}
                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-2 bg-slate-800 border rounded-lg 
                            text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 
                            transition-all 
                        ${
                            errors.email
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-600 focus:ring-blue-500'
                        }`}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-2">{errors.email}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="mb-8">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className={`w-full px-4 py-2 bg-slate-800 border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                            errors.password
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-600 focus:ring-blue-500'
                        }`}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-2">{errors.password}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <MainButton
                        type="submit"
                        label={isLoading ? 'Signing In...' : 'Sign In'}
                        disabled={isLoading}
                        additionalClasses='w-full justify-center'
                    />
                </div>

                {/* Additional Links */}
                <div className="mt-6 text-center text-sm text-gray-400">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-pink-500 hover:text-pink-600 font-semibold">
                            Sign up here               
                        </Link>
                    </p>
                </div>
            </form>
        </section>
    );
}