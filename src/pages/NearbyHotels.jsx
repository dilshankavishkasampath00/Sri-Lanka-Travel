import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NearbyHotels = () => {
    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto w-full px-6 py-8">
                {/* Top Rated Section */}
                <section className="mb-12">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Top Rated Stays</h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Handpicked luxury escapes for your perfect island getaway.</p>
                        </div>
                        <button className="text-primary font-semibold flex items-center gap-1 hover:underline">
                            View All <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                        </button>
                    </div>
                    <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
                        {/* Featured Card 1 */}
                        <div className="min-w-[320px] md:min-w-[400px] group cursor-pointer">
                            <div className="relative h-56 rounded-xl overflow-hidden mb-3">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Anantara Peace Haven Tangalle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-YrBtZqetBKIUXyaPL3YLBaRAQ0PD7awmschgjktD5XZa4VNpMT50ceVF5yENe1DnlKGjMK1tBGNaf8IASboaX6G79GYtMOz-tJNukCny05zEv45dEpu9vo3mcO95JUXOplEeI53SE6MQ-gpBYlGTXiKBWnEdA5p3xCzvdZloj0zTLMnSV5INC9heWRedNu9b6sJd2vcyeBddCoAaw0BZTCBUBW9IrQfILRy2bAezKGIOF8N6sul9lc-_xbkwYwC0DzqdyJgsF8I" />
                                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                                    <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                    <span className="text-xs font-bold">4.9</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold">Anantara Peace Haven Tangalle</h3>
                            <p className="text-slate-500 text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">location_on</span> Tangalle, Sri Lanka
                            </p>
                        </div>
                        {/* Featured Card 2 */}
                        <div className="min-w-[320px] md:min-w-[400px] group cursor-pointer">
                            <div className="relative h-56 rounded-xl overflow-hidden mb-3">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Cinnamon Grand Colombo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAioqheVIEZyqwt14-56Z_IjDnI81bF-v3jFAW8GeUT6PPFQ3MupwqOMjr_eoue8QMgn4qoY2KafbUQi2mieCgi39a5p47G1OX9SX7QyhjRejIi3bHlWynMNl2S1wL51eDUmn8AhtfgvpsEQZtJ3hWY31kxfn7voNEcXvifM1kJy0KvtEVQtN59D1KuJ6ePn3oYoF5gPbDhPuT02ZHGyC7DkRQQwUwZ_yR2g3Q-IfmnEK3zyetEz0KfwoM1liQ4mjpDY06z3Mg70Jk" />
                                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                                    <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                    <span className="text-xs font-bold">4.8</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold">Cinnamon Grand Colombo</h3>
                            <p className="text-slate-500 text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">location_on</span> Colombo, Sri Lanka
                            </p>
                        </div>
                        {/* Featured Card 3 */}
                        <div className="min-w-[320px] md:min-w-[400px] group cursor-pointer">
                            <div className="relative h-56 rounded-xl overflow-hidden mb-3">
                                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Wild Coast Tented Lodge" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOqWu4q93476l65_pyWHz5LBsBI62U8EjFXL_E20HLIVRyrKzpsTomsC9imh5kyJ2UAOql5M3LhIHDJGVa3xnNk-oQbH_6oDhTeJk4V3gm0CepGICsODWO29LtLyNv_yFbBmTt4fEuRnYOhXyQhf4WuzL5QxUPuWL63hyeGANztDYwzczftILVfGDVJ6VEnWdvTWy5BzDpOdQemyWBHK-MrjMcHQZ9aIggpkWGSJRdd_j9IOYriE9al9H-IffpFS9s-lqYZs1l4MU" />
                                <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                                    <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                    <span className="text-xs font-bold">4.7</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold">Wild Coast Tented Lodge</h3>
                            <p className="text-slate-500 text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">location_on</span> Yala, Sri Lanka
                            </p>
                        </div>
                    </div>
                </section>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/10 shadow-sm sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-bold text-lg">Filters</h2>
                                <button className="text-primary text-sm font-medium">Clear all</button>
                            </div>

                            {/* Price Range */}
                            <div className="mb-8">
                                <h3 className="text-sm font-semibold mb-4 text-slate-700 dark:text-slate-300">Price Range (USD)</h3>
                                <div className="space-y-4">
                                    <input className="w-full accent-primary" max="1000" min="0" step="50" type="range" />
                                    <div className="flex justify-between text-xs text-slate-500">
                                        <span>$0</span>
                                        <span>$1,000+</span>
                                    </div>
                                </div>
                            </div>

                            {/* Star Rating */}
                            <div className="mb-8">
                                <h3 className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">Star Rating</h3>
                                <div className="space-y-2">
                                    {[5, 4, 3, 2].map(star => (
                                        <label key={star} className="flex items-center gap-3 cursor-pointer group">
                                            <input className="rounded text-primary focus:ring-primary/20 border-slate-300" type="checkbox" />
                                            <div className="flex gap-0.5 items-center">
                                                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                                <span className="text-sm font-medium">{star === 5 ? '5 Stars' : `${star} Stars & up`}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="mb-8">
                                <h3 className="text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">Amenities</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input className="rounded text-primary focus:ring-primary/20 border-slate-300" type="checkbox" />
                                        <span className="material-symbols-outlined text-slate-500 text-xl">wifi</span>
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Free WiFi</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input className="rounded text-primary focus:ring-primary/20 border-slate-300" type="checkbox" />
                                        <span className="material-symbols-outlined text-slate-500 text-xl">pool</span>
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Swimming Pool</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input className="rounded text-primary focus:ring-primary/20 border-slate-300" type="checkbox" />
                                        <span className="material-symbols-outlined text-slate-500 text-xl">spa</span>
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Spa & Wellness</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input className="rounded text-primary focus:ring-primary/20 border-slate-300" type="checkbox" />
                                        <span className="material-symbols-outlined text-slate-500 text-xl">fitness_center</span>
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Gym</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input className="rounded text-primary focus:ring-primary/20 border-slate-300" type="checkbox" />
                                        <span className="material-symbols-outlined text-slate-500 text-xl">restaurant</span>
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Restaurant</span>
                                    </label>
                                </div>
                            </div>
                            <button className="w-full bg-primary text-slate-900 font-bold py-3 rounded-lg hover:brightness-110 transition-all">Apply Filters</button>
                        </div>
                    </aside>

                    {/* Hotel Grid */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-slate-600 dark:text-slate-400"><span className="font-bold text-slate-900 dark:text-slate-100">42</span> properties found</p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-500">Sort by:</span>
                                <select className="bg-transparent border-none text-sm font-semibold focus:ring-0 cursor-pointer">
                                    <option>Recommended</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Guest Rating</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Hotel Card 1 */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-primary/10 shadow-sm flex flex-col">
                                <div className="relative h-64">
                                    <img className="w-full h-full object-cover" alt="Amangalla" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBf1P32m0DEMNNFTjGDsw76ma01iogQ2W-pfu-gHueg_II2Bng1LBKb8wd_dNUh9MIFkh5L-WuFOBq9USE7IdGAIRWljb6c0JPjmevOk0G32U-b1eCFpkRF6wJ3dbxVl17bQlr9Dzt4UxjGoSlUkJtOT7WMS0tl6aMU0vigZNpHOAqjzDvbxac8xc3l7ZuNriu3T1p0Mcbw9IIfBY_YcaQUDIyBBkwL-8A7o3OdwyIXeNaDC6rG9leAt71YwKCB7OIGb1l26g0jVU" />
                                    <button className="absolute top-4 right-4 bg-white/80 dark:bg-slate-800/80 p-2 rounded-full backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-red-500">favorite</span>
                                    </button>
                                    <div className="absolute bottom-4 left-4 bg-primary text-slate-900 text-xs font-black px-2 py-1 rounded">FEATURED</div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold">Amangalla</h3>
                                            <p className="text-sm text-slate-500 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-xs">location_on</span> Galle Fort, Sri Lanka
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
                                            <span className="material-symbols-outlined text-primary text-sm">star</span>
                                            <span className="text-sm font-bold text-primary">4.9</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 my-4">
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <span className="material-symbols-outlined text-lg">pool</span>
                                            <span className="text-xs">Pool</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <span className="material-symbols-outlined text-lg">spa</span>
                                            <span className="text-xs">Spa</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <span className="material-symbols-outlined text-lg">wifi</span>
                                            <span className="text-xs">WiFi</span>
                                        </div>
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-primary/5 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Price per night</p>
                                            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">$450</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-4 py-2 border border-primary/30 text-primary text-sm font-bold rounded-lg hover:bg-primary/5">Details</button>
                                            <button className="px-4 py-2 bg-primary text-slate-900 text-sm font-bold rounded-lg hover:brightness-110">Book</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hotel Card 2 */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-primary/10 shadow-sm flex flex-col">
                                <div className="relative h-64">
                                    <img className="w-full h-full object-cover" alt="Cape Weligama" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBq_5lo_RdMWF8LrEB9uzCq8mNUIvgTkxGBgkXGbLn8jLsOWZ1GwkVqY_7dPJSqGHX0n4C1rW26O6V66VMUml_-fuzNxXTEIvlBYJkkD7q4Y16lbiZhxn9-yM3gx3g72H4vfHhsXqeFb1vWAocRjbLT2WbD7vDslTqy9kxB9itDSRlWcJ9Hh3YuShdRXrR4h4WkKXclHpCC4oDKT1NGgdMLGWozN2EkGcxbiVW1Lb7YZEPxj7RhKJi7APecRP6AQCWX1PQ-kmFRIgo" />
                                    <button className="absolute top-4 right-4 bg-white/80 dark:bg-slate-800/80 p-2 rounded-full backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-slate-400">favorite</span>
                                    </button>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold">Cape Weligama</h3>
                                            <p className="text-sm text-slate-500 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-xs">location_on</span> Weligama, Sri Lanka
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
                                            <span className="material-symbols-outlined text-primary text-sm">star</span>
                                            <span className="text-sm font-bold text-primary">4.8</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 my-4">
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <span className="material-symbols-outlined text-lg">waves</span>
                                            <span className="text-xs">Ocean</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <span className="material-symbols-outlined text-lg">restaurant</span>
                                            <span className="text-xs">Dining</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <span className="material-symbols-outlined text-lg">local_bar</span>
                                            <span className="text-xs">Bar</span>
                                        </div>
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-primary/5 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Price per night</p>
                                            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">$580</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-4 py-2 border border-primary/30 text-primary text-sm font-bold rounded-lg hover:bg-primary/5">Details</button>
                                            <button className="px-4 py-2 bg-primary text-slate-900 text-sm font-bold rounded-lg hover:brightness-110">Book</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hotel Card 3 */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-primary/10 shadow-sm flex flex-col">
                                <div className="relative h-64">
                                    <img className="w-full h-full object-cover" alt="Ceylon Tea Trails" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVVARuWGTn5fTT9Rfehh20JieIXxGeG3Mkq4nxU21m_y9jrNFKeAJAKNW8OyKMmmAxtMmveQb7hwJvIFtFm4ShCY6WcTRyFQK1_7Ye_w2icaru5s8_wWTbFFOnX43fLIYIfJwsEPIUX95jP01antY2kiRIkPNuG-EDGFPNq7dzf_oZLyuYfkmqvEUL23KKP2E6HW3ZL6oRwGexXzm05hjyDXK8haXkwGU8x7OkJGRGDdqY6jZLRsUfRbCG9FuYG7fG2824VXOi0Zw" />
                                    <button className="absolute top-4 right-4 bg-white/80 dark:bg-slate-800/80 p-2 rounded-full backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-slate-400">favorite</span>
                                    </button>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold">Ceylon Tea Trails</h3>
                                            <p className="text-sm text-slate-500 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-xs">location_on</span> Hatton, Sri Lanka
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
                                            <span className="material-symbols-outlined text-primary text-sm">star</span>
                                            <span className="text-sm font-bold text-primary">4.9</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 my-4">
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <span className="material-symbols-outlined text-lg">forest</span>
                                            <span className="text-xs">Nature</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <span className="material-symbols-outlined text-lg">bathtub</span>
                                            <span className="text-xs">Luxury Bath</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <span className="material-symbols-outlined text-lg">coffee</span>
                                            <span className="text-xs">Tea Tour</span>
                                        </div>
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-primary/5 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Price per night</p>
                                            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">$720</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-4 py-2 border border-primary/30 text-primary text-sm font-bold rounded-lg hover:bg-primary/5">Details</button>
                                            <button className="px-4 py-2 bg-primary text-slate-900 text-sm font-bold rounded-lg hover:brightness-110">Book</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hotel Card 4 */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-primary/10 shadow-sm flex flex-col">
                                <div className="relative h-64">
                                    <img className="w-full h-full object-cover" alt="98 Acres Resort" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeyFU8kxnHqtPfHN0KjfOQvZ8nrnpSvPHmjt0fhb_EVgxQyPN_YZiSxMlHmlPZQhipHkGvhzsFxeTjmfM7_yv2rZwebjkLWjjJV42Fp6EMG3bK_pfKpuIVBK9j0Oax8y44hEDQp6ozJ15tW_IVFQ5nhCuehU86gwPK1B6AOD0dwhenksFaKHBr23ThV49K6uDcY2sDhFLpIw2e8vgAmgh5v3fSlKu8ZPrUVddaBnktUqYOkxWZr-QEC9TgqcwJHsD3lDRaoyZb-jk" />
                                    <button className="absolute top-4 right-4 bg-white/80 dark:bg-slate-800/80 p-2 rounded-full backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-slate-400">favorite</span>
                                    </button>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold">98 Acres Resort</h3>
                                            <p className="text-sm text-slate-500 flex items-center gap-1">
                                                <span className="material-symbols-outlined text-xs">location_on</span> Ella, Sri Lanka
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded">
                                            <span className="material-symbols-outlined text-primary text-sm">star</span>
                                            <span className="text-sm font-bold text-primary">4.7</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 my-4">
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <span className="material-symbols-outlined text-lg">mountain_flag</span>
                                            <span className="text-xs">Mountain</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <span className="material-symbols-outlined text-lg">hiking</span>
                                            <span className="text-xs">Hiking</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <span className="material-symbols-outlined text-lg">pool</span>
                                            <span className="text-xs">Infinity Pool</span>
                                        </div>
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-primary/5 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Price per night</p>
                                            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">$320</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-4 py-2 border border-primary/30 text-primary text-sm font-bold rounded-lg hover:bg-primary/5">Details</button>
                                            <button className="px-4 py-2 bg-primary text-slate-900 text-sm font-bold rounded-lg hover:brightness-110">Book</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-12 gap-2">
                            <button className="size-10 rounded-lg flex items-center justify-center border border-primary/20 text-slate-500 hover:bg-primary/5">
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button className="size-10 rounded-lg flex items-center justify-center bg-primary text-slate-900 font-bold">1</button>
                            <button className="size-10 rounded-lg flex items-center justify-center border border-primary/20 text-slate-500 hover:bg-primary/5">2</button>
                            <button className="size-10 rounded-lg flex items-center justify-center border border-primary/20 text-slate-500 hover:bg-primary/5">3</button>
                            <button className="size-10 rounded-lg flex items-center justify-center border border-primary/20 text-slate-500 hover:bg-primary/5">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default NearbyHotels;
