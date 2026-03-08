import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    signInWithPopup,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
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

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex">
            {/* Left: scenic image */}
            <div
                className="hidden lg:flex w-1/2 bg-cover bg-center relative"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuClLEE1Tkp5Do86r6pYArAcoEv-tp0g1d3QDiUcs7Ry-T4EB8pEx1xzL_uyeGqjvwZxwhBdoVpQ0GpaUfh-u3szd4M0GklUjeuZUKE0qz6a_kbQqCvfhCShgY4VEBMLrww7nbSsWQ1mttlgRWm0CVnBr8XmvqkIEgYBVZvG_xaPaRWy6ejGU1yPa-fH-4xLpvQgd9NvWbto2IQwrWQG2UEH7y5OpAnAoNFTQ45ow4id1HKZi4_NZGnw07VsmPTsQgbULReYmqCqjXc')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-12 left-10 right-10 text-white">
                    <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-md w-fit px-3 py-1 rounded-full border border-primary/30 text-primary mb-4">
                        <span className="material-symbols-outlined text-sm">landscape</span>
                        <span className="text-xs font-bold uppercase tracking-wider">Sri Lanka Travel</span>
                    </div>
                    <h2 className="text-4xl font-black mb-3">Explore the Pearl<br />of the Indian Ocean</h2>
                    <p className="text-white/70 text-sm leading-relaxed">Plan your perfect trip, discover hidden gems, and book your adventure across Sri Lanka's most beautiful destinations.</p>
                </div>
            </div>

            {/* Right: login form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background-light dark:bg-background-dark">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 mb-10">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <span className="material-symbols-outlined text-background-light text-xl">landscape</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight">Sri Lanka Travel</span>
                    </Link>

                    <h1 className="text-3xl font-black mb-2">Welcome back</h1>
                    <p className="text-slate-500 dark:text-slate-400 mb-8">Sign in to plan your dream Sri Lanka trip</p>

                    {/* Google Sign-In Button */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 border border-slate-200 dark:border-slate-700 rounded-xl py-3.5 px-4 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mb-6 relative"
                    >
                        {/* Google SVG Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                            <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
                            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
                        </svg>
                        {loading ? 'Signing in...' : 'Continue with Google'}
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                        <span className="text-xs font-medium text-slate-400">or continue with email</span>
                        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
                    </div>

                    {/* Email/Password Form */}
                    <form onSubmit={handleEmailLogin} className="space-y-4">
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
                                placeholder="Enter your password"
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
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-8">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-primary hover:underline">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
