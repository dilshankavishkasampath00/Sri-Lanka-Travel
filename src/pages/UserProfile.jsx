import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
                    <div className="bg-primary/10 p-6 rounded-full">
                        <span className="material-symbols-outlined text-primary text-5xl">lock</span>
                    </div>
                    <h2 className="text-2xl font-bold">Sign in to view your profile</h2>
                    <p className="text-slate-500 text-center max-w-sm">Create an account or sign in to access your saved trips, reviews, and profile.</p>
                    <div className="flex gap-4">
                        <Link to="/login" className="px-6 py-3 border border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors">Sign In</Link>
                        <Link to="/register" className="px-6 py-3 bg-primary text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">Create Account</Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const joinDate = user.metadata?.creationTime
        ? new Date(user.metadata.creationTime).toLocaleDateString('en-LK', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'N/A';

    const providerLabel = user.providerData?.[0]?.providerId === 'google.com' ? '🔵 Google Account' : '✉️ Email Account';

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-12">

                {/* Profile Hero */}
                <div className="relative rounded-3xl overflow-hidden mb-8 shadow-xl">
                    <div className="h-48 bg-gradient-to-br from-primary/60 via-green-400/40 to-sky-400/40"></div>
                    <div className="bg-white dark:bg-slate-900 px-8 pb-8">
                        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 mb-6">
                            {user.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt={user.displayName}
                                    className="w-24 h-24 rounded-2xl object-cover border-4 border-white dark:border-slate-900 shadow-lg"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-lg text-3xl font-black text-white">
                                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                                </div>
                            )}
                            <div className="flex-1 pb-1">
                                <h1 className="text-2xl font-black">{user.displayName || 'Traveler'}</h1>
                                <p className="text-slate-500 text-sm">{user.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 border border-red-200 dark:border-red-800 text-red-500 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">logout</span>
                                Sign Out
                            </button>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                            <span className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                                <span className="material-symbols-outlined text-xs">verified</span> Verified Traveler
                            </span>
                            <span className="flex items-center gap-1 bg-sky-100 text-sky-600 text-xs font-bold px-3 py-1.5 rounded-full">
                                <span className="material-symbols-outlined text-xs">travel_explore</span> Explorer
                            </span>
                            {user.providerData?.[0]?.providerId === 'google.com' && (
                                <span className="flex items-center gap-1 bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full">
                                    🔵 Google Account
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-primary/10 shadow-sm">
                        <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">Account Details</h3>
                        <dl className="space-y-4">
                            <div className="flex justify-between items-center">
                                <dt className="text-sm text-slate-500 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-primary">person</span> Display Name
                                </dt>
                                <dd className="font-semibold text-sm">{user.displayName || 'Not set'}</dd>
                            </div>
                            <div className="flex justify-between items-center">
                                <dt className="text-sm text-slate-500 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-primary">mail</span> Email
                                </dt>
                                <dd className="font-semibold text-sm truncate max-w-[180px]">{user.email}</dd>
                            </div>
                            <div className="flex justify-between items-center">
                                <dt className="text-sm text-slate-500 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-primary">verified_user</span> Email Verified
                                </dt>
                                <dd className={`font-bold text-sm ${user.emailVerified ? 'text-green-500' : 'text-orange-500'}`}>
                                    {user.emailVerified ? '✅ Verified' : '⚠️ Not verified'}
                                </dd>
                            </div>
                            <div className="flex justify-between items-center">
                                <dt className="text-sm text-slate-500 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-primary">login</span> Sign-in Method
                                </dt>
                                <dd className="font-semibold text-sm">{providerLabel}</dd>
                            </div>
                            <div className="flex justify-between items-center">
                                <dt className="text-sm text-slate-500 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm text-primary">calendar_today</span> Member Since
                                </dt>
                                <dd className="font-semibold text-sm">{joinDate}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-primary/10 shadow-sm">
                        <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link to="/trip-planner" className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors border border-primary/5">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">auto_fix_high</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">AI Trip Planner</p>
                                    <p className="text-xs text-slate-400">Create your Sri Lanka itinerary</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-300 ml-auto">arrow_forward_ios</span>
                            </Link>
                            <Link to="/destinations" className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors border border-primary/5">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">explore</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Explore Destinations</p>
                                    <p className="text-xs text-slate-400">Discover new places</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-300 ml-auto">arrow_forward_ios</span>
                            </Link>
                            <Link to="/reviews" className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors border border-primary/5">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">rate_review</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Write a Review</p>
                                    <p className="text-xs text-slate-400">Share your experience</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-300 ml-auto">arrow_forward_ios</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* User ID (for debugging) */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 text-xs text-slate-400">
                    <span className="font-bold">User ID:</span> {user.uid}
                </div>

            </main>
            <Footer />
        </div>
    );
};

export default UserProfile;
