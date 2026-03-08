import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleSignup = async () => {
        setLoading(true);
        setError('');
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, { displayName: name });
            navigate('/');
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError('This email is already registered. Please login instead.');
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex">
            {/* Left: scenic image */}
            <div
                className="hidden lg:flex w-1/2 bg-cover bg-center relative"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyAcJ2YwyHlNNDSE5fydmv3VlQNog7ws_eQo3lqAXtfs8MVs_tXrEsZ5rZ0lLxmE6D-arjMmEKAcY6Osq-3wDosK6YsiSAUtOkydELp0dBe9mv7dY-83XW90Ah70pEX0CYTRgtII0nlHr4MsJDAJzmQ_9gT-ZR2ixG6OS_SHv-Dw2GtyEjEytOsjCsteD1-6MEsZXN0LyypDaMs_dF6e2J4cxXw1i35LeNYrS0PPJwW6ZA1z5Yk-tkEyrDszB66VXOOl6fsI_UfPA')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-12 left-10 right-10 text-white">
                    <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-md w-fit px-3 py-1 rounded-full border border-primary/30 text-primary mb-4">
                        <span className="material-symbols-outlined text-sm">landscape</span>
                        <span className="text-xs font-bold uppercase tracking-wider">Sri Lanka Travel</span>
                    </div>
                    <h2 className="text-4xl font-black mb-3">Start Your Journey<br />Today</h2>
                    <p className="text-white/70 text-sm leading-relaxed">Join thousands of travelers who use our app to discover, plan, and explore the magical island of Sri Lanka.</p>
                    <div className="flex items-center gap-6 mt-6">
                        <div className="text-center">
                            <p className="text-2xl font-black text-primary">10K+</p>
                            <p className="text-xs text-white/60">Travelers</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-black text-primary">50+</p>
                            <p className="text-xs text-white/60">Destinations</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-black text-primary">4.9★</p>
                            <p className="text-xs text-white/60">Rating</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: register form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background-light dark:bg-background-dark overflow-y-auto">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 mb-8">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <span className="material-symbols-outlined text-background-light text-xl">landscape</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight">Sri Lanka Travel</span>
                    </Link>

                    <h1 className="text-3xl font-black mb-2">Create your account</h1>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Start planning your perfect Sri Lanka adventure</p>

                    {/* Google Sign-Up Button */}
                    <button
                        onClick={handleGoogleSignup}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 border border-slate-200 dark:border-slate-700 rounded-xl py-3.5 px-4 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mb-6"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                            <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                        </svg>
                        {loading ? 'Creating account...' : 'Sign up with Google'}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                        <span className="text-xs font-medium text-slate-400">or create with email</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                    </div>

                    {/* Email Registration Form */}
                    <form onSubmit={handleEmailRegister} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                                placeholder="Your full name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                                placeholder="Minimum 6 characters"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Confirm Password</label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                                placeholder="Repeat your password"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl">
                                <span className="material-symbols-outlined text-sm">error</span>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-slate-900 font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-8">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-primary hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
