const Footer = () => {
    return (
        <footer className="bg-slate-900 dark:bg-black text-white/60 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/10 pb-8 mb-8">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-1 rounded-lg">
                            <span className="material-symbols-outlined text-slate-900 text-xl">landscape</span>
                        </div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Sri Lanka Travel</h2>
                    </div>
                    <div className="flex gap-6">
                        <a className="hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">social_leaderboard</span></a>
                        <a className="hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">share</span></a>
                        <a className="hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">camera</span></a>
                    </div>
                </div>
                <p className="text-center text-sm">
                    © {new Date().getFullYear()} Sri Lanka Travel Tourism Board. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
