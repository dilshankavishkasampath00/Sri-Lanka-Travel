const Footer = () => {
    return (
        <footer className="bg-slate-900 dark:bg-black text-white/60 py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 border-b border-white/10 pb-6 sm:pb-8 mb-6 sm:mb-8">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-1 rounded-lg">
                            <span className="material-symbols-outlined text-slate-900 text-lg sm:text-xl">landscape</span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Sri Lanka Travel</h2>
                    </div>
                    <div className="flex gap-4 sm:gap-6">
                        <a className="hover:text-primary transition-colors min-h-10 min-w-10 flex items-center justify-center" href="#"><span className="material-symbols-outlined text-lg sm:text-xl">social_leaderboard</span></a>
                        <a className="hover:text-primary transition-colors min-h-10 min-w-10 flex items-center justify-center" href="#"><span className="material-symbols-outlined text-lg sm:text-xl">share</span></a>
                        <a className="hover:text-primary transition-colors min-h-10 min-w-10 flex items-center justify-center" href="#"><span className="material-symbols-outlined text-lg sm:text-xl">camera</span></a>
                    </div>
                </div>
                <p className="text-center text-xs sm:text-sm">
                    © {new Date().getFullYear()} Sri Lanka Travel Tourism Board. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
