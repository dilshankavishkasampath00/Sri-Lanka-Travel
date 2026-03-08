import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <div className="bg-primary p-1.5 rounded-lg">
              <span className="material-symbols-outlined text-background-light text-xl sm:text-2xl">landscape</span>
            </div>
            <Link to="/" className="text-sm sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 truncate">
              Sri Lanka Travel
            </Link>
          </div>

          {/* Nav Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/">Home</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/destinations">Destinations</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/map">Map</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/weather">Weather</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/hotels">Hotels</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/reviews">Reviews</Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" to="/trip-planner">Planner</Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              /* Logged-in user dropdown */
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 border border-primary/20 rounded-full px-2 sm:px-3 py-1.5 hover:bg-primary/5 transition-colors min-h-10 min-w-10"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                      {(user.displayName || user.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs sm:text-sm font-semibold hidden sm:block max-w-[100px] truncate">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                  <span className="material-symbols-outlined text-xs sm:text-sm text-slate-400">expand_more</span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-48 sm:w-56 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden z-50">
                    <div className="p-3 sm:p-4 border-b border-slate-100 dark:border-slate-800">
                      <p className="font-bold text-xs sm:text-sm truncate">{user.displayName || 'Traveler'}</p>
                      <p className="text-[10px] sm:text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm hover:bg-primary/5 transition-colors"
                      >
                        <span className="material-symbols-outlined text-primary text-sm">person</span>
                        My Profile
                      </Link>
                      <Link
                        to="/trip-planner"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm hover:bg-primary/5 transition-colors"
                      >
                        <span className="material-symbols-outlined text-primary text-sm">travel_explore</span>
                        My Trips
                      </Link>
                    </div>
                    <div className="py-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full text-left"
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
                <Link to="/login" className="hidden sm:block text-xs sm:text-sm font-semibold hover:text-primary transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="hidden sm:flex items-center justify-center rounded-lg h-9 sm:h-10 px-3 sm:px-5 bg-primary text-slate-900 text-xs sm:text-sm font-bold transition-transform hover:scale-105 active:scale-95">
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors min-h-10 min-w-10 flex items-center justify-center"
            >
              <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-primary/10 py-4 space-y-3 pb-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/5 text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              Home
            </Link>
            <Link
              to="/destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/5 text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-sm">place</span>
              Destinations
            </Link>
            <Link
              to="/map"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/5 text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-sm">map</span>
              Map
            </Link>
            <Link
              to="/weather"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/5 text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-sm">cloud</span>
              Weather
            </Link>
            <Link
              to="/hotels"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/5 text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-sm">hotel</span>
              Hotels
            </Link>
            <Link
              to="/reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/5 text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-sm">rate_review</span>
              Reviews
            </Link>
            <Link
              to="/trip-planner"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/5 text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-sm">travel_explore</span>
              Trip Planner
            </Link>

            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="pt-4 border-t border-primary/10 flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center rounded-lg py-3 border border-primary/20 text-slate-900 dark:text-slate-100 text-sm font-bold transition-colors hover:bg-primary/5"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center rounded-lg py-3 bg-primary text-slate-900 text-sm font-bold transition-transform hover:scale-105 active:scale-95"
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
