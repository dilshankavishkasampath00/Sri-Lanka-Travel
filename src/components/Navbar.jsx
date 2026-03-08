import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <span className="material-symbols-outlined text-background-light text-2xl">landscape</span>
            </div>
            <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Sri Lanka Travel
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/">Home</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/destinations">Destinations</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/map">Map</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/weather">Weather</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/hotels">Hotels</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/reviews">Reviews</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/trip-planner">Planner</Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {user ? (
              /* Logged-in user dropdown */
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 border border-primary/20 rounded-full px-3 py-1.5 hover:bg-primary/5 transition-colors"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-semibold hidden sm:block max-w-[100px] truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <span className="material-symbols-outlined text-sm text-slate-400">expand_more</span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden z-50">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                      <p className="font-bold text-sm truncate">{user.displayName || 'Traveler'}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-primary/5 transition-colors"
                      >
                        <span className="material-symbols-outlined text-primary text-sm">person</span>
                        My Profile
                      </Link>
                      <Link
                        to="/trip-planner"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-primary/5 transition-colors"
                      >
                        <span className="material-symbols-outlined text-primary text-sm">travel_explore</span>
                        My Trips
                      </Link>
                    </div>
                    <div className="py-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full text-left"
                      >
                        <span className="material-symbols-outlined text-sm">logout</span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Not logged in */
              <>
                <Link to="/login" className="hidden sm:block text-sm font-semibold hover:text-primary transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="hidden sm:flex items-center justify-center rounded-lg h-10 px-5 bg-primary text-slate-900 text-sm font-bold transition-transform hover:scale-105 active:scale-95">
                  Get Started
                </Link>
              </>
            )}
            <button className="md:hidden p-2 rounded-lg hover:bg-primary/10">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
