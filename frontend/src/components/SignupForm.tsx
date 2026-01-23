import { useState } from 'react';
import MainButton from './Buttons/MainButton';
import { validateEmail, validatePassword } from '../utils/validationFunctions';
import { Link, useNavigate } from 'react-router';
import { useSignUp } from '../hooks/useAuthQuery';

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export default function SignupForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const { mutate: signUp, isPending } = useSignUp();

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        if (emailError) newErrors.email = emailError;
        if (passwordError) newErrors.password = passwordError;

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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

        signUp(
            { 
                email: formData.email, 
                password: formData.password 
            },
            {
                onSuccess: () => {
                    navigate('/verify-email', { state: { email: formData.email } });
                },
                onError: (error: any) => {
                    setErrors({ 
                        email: error?.response?.data?.message || 'Signup failed. Please try again.' 
                    });
                }
            }
        );
    };

    return (
        <section className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-lg shadow-lg border border-slate-700">
                
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

                <div className="mb-6">
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

                <div className="mb-8">
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300 mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className={`w-full px-4 py-2 bg-slate-800 border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                            errors.confirmPassword
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-600 focus:ring-blue-500'
                        }`}
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-2">{errors.confirmPassword}</p>
                    )}
                </div>

                <div className="flex justify-center">
                    <MainButton
                        type="submit"
                        label={isPending ? 'Creating Account...' : 'Sign Up'}
                        additionalClasses='w-full justify-center bg-pink-500! hover:bg-pink-600!'
                        disabled={isPending}
                    />
                </div>

                <div className="mt-6 text-center text-sm text-gray-400">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                            Log in here
                        </Link>
                    </p>
                </div>
            </form>
        </section>
    );
}