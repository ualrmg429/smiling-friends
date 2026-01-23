// components/VerifyEmailForm.tsx
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import MainButton from './Buttons/MainButton';
import { useConfirmSignUp, useResendCode } from '../hooks/useAuthQuery';

export default function VerifyEmailForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
    const [error, setError] = useState<string>('');
    const [resendMessage, setResendMessage] = useState<string>('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const { mutate: confirmSignUp, isPending: isConfirming } = useConfirmSignUp();
    const { mutate: resendCode, isPending: isResending } = useResendCode();

    useEffect(() => {
        if (!email) {
            navigate('/signup');
        }
    }, [email, navigate]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);
        setError('');

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        
        if (!/^\d+$/.test(pastedData)) return;

        const newCode = [...code];
        for (let i = 0; i < pastedData.length; i++) {
            newCode[i] = pastedData[i];
        }
        setCode(newCode);

        const focusIndex = Math.min(pastedData.length, 5);
        inputRefs.current[focusIndex]?.focus();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const fullCode = code.join('');
        if (fullCode.length !== 6) {
            setError('Please enter the complete 6-digit code');
            return;
        }

        confirmSignUp(
            { email, code: fullCode },
            {
                onError: (error: any) => {
                    setError(error?.response?.data?.message || 'Invalid code. Please try again.');
                }
            }
        );
    };

    const handleResend = () => {
        setResendMessage('');
        setError('');

        resendCode(
            { email },
            {
                onSuccess: () => {
                    setResendMessage('A new code has been sent to your email');
                    setCode(['', '', '', '', '', '']);
                    inputRefs.current[0]?.focus();
                },
                onError: (error: any) => {
                    setError(error?.response?.data?.message || 'Failed to resend code');
                }
            }
        );
    };

    if (!email) return null;

    return (
        <section className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-lg shadow-lg border border-slate-700">
                <h2 className="text-2xl font-bold text-white text-center mb-2">
                    Verify Your Email
                </h2>
                <p className="text-gray-400 text-center mb-8">
                    We've sent a 6-digit code to <span className="text-yellow-400">{email}</span>
                </p>

                <div className="flex justify-center gap-2 mb-6">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => { inputRefs.current[index] = el }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className={`w-12 h-14 text-center text-2xl font-bold bg-slate-800 border rounded-lg 
                                text-white focus:outline-none focus:ring-2 transition-all
                                ${error 
                                    ? 'border-red-500 focus:ring-red-500' 
                                    : 'border-slate-600 focus:ring-blue-500'
                                }`}
                        />
                    ))}
                </div>

                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                )}

                {resendMessage && (
                    <p className="text-green-500 text-sm text-center mb-4">{resendMessage}</p>
                )}

                <div className="flex justify-center mb-6">
                    <MainButton
                        type="submit"
                        label={isConfirming ? 'Verifying...' : 'Verify Email'}
                        additionalClasses="w-full justify-center bg-pink-500! hover:bg-pink-600!"
                        disabled={isConfirming}
                    />
                </div>

                <div className="text-center">
                    <p className="text-gray-400 text-sm">
                        Didn't receive the code?{' '}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={isResending}
                            className="text-yellow-400 hover:text-yellow-300 font-semibold disabled:opacity-50"
                        >
                            {isResending ? 'Sending...' : 'Resend'}
                        </button>
                    </p>
                </div>
            </form>
        </section>
    );
}