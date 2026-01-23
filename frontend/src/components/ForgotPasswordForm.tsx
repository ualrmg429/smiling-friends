// components/ForgotPasswordForm.tsx
import { useState } from 'react';
import { Link } from 'react-router';
import MainButton from './Buttons/MainButton';
import { validateEmail, validatePassword } from '../utils/validationFunctions';
import { useConfirmPasswordReset, useRequestPasswordReset } from '../hooks/useAuthQuery';


type Step = 'email' | 'code' | 'newPassword' | 'success';

export default function ForgotPasswordForm() {
    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { mutate: requestReset, isPending: isRequesting } = useRequestPasswordReset();
    const { mutate: confirmReset, isPending: isConfirming } = useConfirmPasswordReset();

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const emailError = validateEmail(email);
        if (emailError) {
            setError(emailError);
            return;
        }

        requestReset(
            { email },
            {
                onSuccess: () => setStep('code'),
                onError: (err: any) => setError(err?.response?.data?.message || 'Failed to send code')
            }
        );
    };

    const handleCodeChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);
        setError('');

        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleCodeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const fullCode = code.join('');
        if (fullCode.length !== 6) {
            setError('Please enter the complete 6-digit code');
            return;
        }

        setStep('newPassword');
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const passwordError = validatePassword(newPassword);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        confirmReset(
            { email, code: code.join(''), newPassword },
            {
                onSuccess: () => setStep('success'),
                onError: (err: any) => setError(err?.response?.data?.message || 'Failed to reset password')
            }
        );
    };

    const handleResendCode = () => {
        setError('');
        requestReset(
            { email },
            {
                onSuccess: () => setError(''),
                onError: (err: any) => setError(err?.response?.data?.message || 'Failed to resend code')
            }
        );
    };

    return (
        <section className="w-full max-w-md mx-auto">
            <div className="bg-slate-900 p-8 rounded-lg shadow-lg border border-slate-700">
                
                {/* Step 1: Email */}
                {step === 'email' && (
                    <form onSubmit={handleEmailSubmit}>
                        <h2 className="text-2xl font-bold text-white text-center mb-2">
                            Reset Password
                        </h2>
                        <p className="text-gray-400 text-center mb-6">
                            Enter your email and we'll send you a code to reset your password.
                        </p>

                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className={`w-full px-4 py-2 bg-slate-800 border rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                                    error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500'
                                }`}
                            />
                            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                        </div>

                        <MainButton
                            type="submit"
                            label={isRequesting ? 'Sending...' : 'Send Code'}
                            disabled={isRequesting}
                            additionalClasses="w-full justify-center"
                        />

                        <div className="mt-6 text-center">
                            <Link to="/login" className="text-sm text-yellow-400 hover:text-yellow-300">
                                Back to Login
                            </Link>
                        </div>
                    </form>
                )}

                {/* Step 2: Code */}
                {step === 'code' && (
                    <form onSubmit={handleCodeSubmit}>
                        <h2 className="text-2xl font-bold text-white text-center mb-2">
                            Enter Code
                        </h2>
                        <p className="text-gray-400 text-center mb-6">
                            We've sent a 6-digit code to <span className="text-yellow-400">{email}</span>
                        </p>

                        <div className="flex justify-center gap-2 mb-6">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`code-${index}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleCodeChange(index, e.target.value)}
                                    onKeyDown={(e) => handleCodeKeyDown(index, e)}
                                    className={`w-12 h-14 text-center text-2xl font-bold bg-slate-800 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all ${
                                        error ? 'border-red-500 focus:ring-red-500' : 'border-slate-600 focus:ring-blue-500'
                                    }`}
                                />
                            ))}
                        </div>

                        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                        <MainButton
                            type="submit"
                            label="Verify Code"
                            additionalClasses="w-full justify-center mb-4"
                        />

                        <div className="text-center">
                            <p className="text-gray-400 text-sm">
                                Didn't receive the code?{' '}
                                <button
                                    type="button"
                                    onClick={handleResendCode}
                                    className="text-yellow-400 hover:text-yellow-300 font-semibold"
                                >
                                    Resend
                                </button>
                            </p>
                        </div>
                    </form>
                )}

                {/* Step 3: New Password */}
                {step === 'newPassword' && (
                    <form onSubmit={handlePasswordSubmit}>
                        <h2 className="text-2xl font-bold text-white text-center mb-2">
                            New Password
                        </h2>
                        <p className="text-gray-400 text-center mb-6">
                            Enter your new password.
                        </p>

                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-300 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                        <MainButton
                            type="submit"
                            label={isConfirming ? 'Resetting...' : 'Reset Password'}
                            disabled={isConfirming}
                            additionalClasses="w-full justify-center"
                        />
                    </form>
                )}

                {/* Step 4: Success */}
                {step === 'success' && (
                    <div className="text-center">
                        <div className="text-green-500 text-5xl mb-4">✓</div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Password Reset!
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Your password has been reset successfully.
                        </p>
                        <Link to="/login">
                            <MainButton
                                label="Go to Login"
                                additionalClasses="w-full justify-center"
                            />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}