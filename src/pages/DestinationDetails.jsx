import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DestinationDetails = () => {
    const libraries = ['places'];

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
        libraries: ['places']
    });

    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto pb-20">
                {/* Hero Section */}
                <section className="px-4 md:px-10 lg:px-40 py-6">
                    <div className="relative h-[500px] w-full overflow-hidden rounded-xl shadow-2xl">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWc1gHGAYAuTY9dNfxGlv9KHH7BHEGY3aqEDyh46zX1E660HpZxSWHBdYeVL7YEtEQjrZzIaI9iKgtdtZRlmVggNl6FXG0KOIXJ3eFlwW09pq8SKTO-RSqGEeg8r9oYrGKcucXM7vBNyry34ZWzjrGYbPYQJzV86Ii1ylDRxtIcKPUdV3_vlTfqa1-bI88ubyiV1V_EvRN4WF_1gr7pklghRQQSsIAqK8tLcjduoU-MkOU7eLoqBJQ0t_ZsSdNUALzkwEQaVBBAiM')" }}></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                            <h1 className="text-white text-6xl md:text-8xl font-black tracking-tighter mb-4 drop-shadow-lg">Ella</h1>
                            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl drop-shadow-md">
                                Mist-covered peaks and golden tea estates in the heart of the highlands.
                            </p>
                            <div className="mt-8 flex gap-4">
                                <Link to="/trip-planner" className="bg-primary text-slate-900 px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                                    <span className="material-symbols-outlined">add_circle</span> Add to Trip Planner
                                </Link>
                                <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-lg font-bold hover:bg-white/30 transition-all">
                                    Explore Attractions
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 py-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                        <Link className="hover:text-primary" to="/">Home</Link>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <Link className="hover:text-primary" to="/destinations">Sri Lanka</Link>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-slate-900 dark:text-slate-100">Ella</span>
                    </nav>
                </section>

                {/* Main Content Grid */}
                <section className="px-4 md:px-10 lg:px-40 grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column: Description & Map */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <h2 className="text-3xl font-bold mb-4">The Soul of the Hill Country</h2>
                            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                                Ella is a small town in the Badulla District of Uva Province, Sri Lanka. Famous for its iconic Nine Arch Bridge and breathtaking hiking trails like Little Adam's Peak, it offers a cool climate and some of the most beautiful views on the island.
                            </p>
                            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                                Steely green tea plantations and gushing waterfalls like Ravana Falls make it a hiker's paradise. Whether you're catching the world-famous blue train from Kandy or trekking through the dense forest of Ella Rock, the town captures the spirit of adventure and tranquility in equal measure.
                            </p>
                        </div>

                        {/* Interactive Map */}
                        <div className="rounded-xl overflow-hidden border border-primary/10 shadow-lg">
                            <div className="bg-primary/10 p-4 border-b border-primary/10 flex justify-between items-center">
                                <h3 className="font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">map</span> Landmark Navigator
                                </h3>
                                <span className="text-xs font-semibold text-primary uppercase tracking-widest">2 Active Spots</span>
                            </div>
                            <div className="h-[400px] bg-slate-200 relative">
                                {isLoaded ? (
                                    <GoogleMap
                                        mapContainerStyle={{ width: '100%', height: '100%' }}
                                        center={{ lat: 6.8715, lng: 81.0550 }}
                                        zoom={14}
                                        options={{ disableDefaultUI: true, zoomControl: true }}
                                    >
                                        <Marker
                                            position={{ lat: 6.8767, lng: 81.0608 }}
                                            label="Nine Arch Bridge"
                                        />
                                        <Marker
                                            position={{ lat: 6.8742, lng: 81.0617 }}
                                            label="Little Adam's Peak"
                                        />
                                    </GoogleMap>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold">Loading Map...</div>
                                )}
                            </div>
                        </div>

                        {/* Traveler Reviews */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">reviews</span> Traveler Voices
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-background-dark/40 p-6 rounded-xl border border-primary/5 shadow-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9ms4Phv5AteWDQrSapM6h9aea66T6wyG1Fr6_w87zHPWiI56Gw51l9dfSVcq1XmRKmihrduxkCn-HZVXPxYFOEj64YtdxfhbyKzRjMluH7XihkKXX7TbJQKahVKrgNewh83Aefk9s2DP2Ft5v0DB8eg7-emf-IRi5zFbqxeBH3t3LwUY-KmFPl9h76IY8IQ3duXNKOIu3KIt_ZwyyE-O-mWy3eanfGGclWWnzyWSjbJQpOUXiGuofYNyFPu0PM6E77jDaqToi0eQ')" }}></div>
                                        <div>
                                            <h4 className="font-bold text-sm">Sarah Jenkins</h4>
                                            <div className="flex text-primary">
                                                <span className="material-symbols-outlined text-xs">star</span>
                                                <span className="material-symbols-outlined text-xs">star</span>
                                                <span className="material-symbols-outlined text-xs">star</span>
                                                <span className="material-symbols-outlined text-xs">star</span>
                                                <span className="material-symbols-outlined text-xs">star</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm italic text-slate-600 dark:text-slate-400">"The sunrise at Little Adam's Peak was the highlight of my entire trip. Make sure to arrive early!"</p>
                                </div>
                                <div className="bg-white dark:bg-background-dark/40 p-6 rounded-xl border border-primary/5 shadow-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCJqkEL7ZRa_WB6fyCMaVsBS7C9ul07E79BCDWaCzLpphGDSRqPSU_mrl4hBSkt2lAhotAipdEAWJRSTbc4C8NmtJWtwcYdO7yhKcTh5C8FPB6WlyTlwr1OeRkWl3naBy-oFbwSXO4_o67J3EA6vobtiMpjrOqVT6LtNlV2YXEeALpBRhuvkdSz0vmPUiq6gQybuDURL1rKSzMmKcjhaNP1oxnSALmFpF3oDUaaehTZyDLl30mkJ0qZVHSV84H0pz4p3qqPwEsSt7Q')" }}></div>
                                        <div>
                                            <h4 className="font-bold text-sm">Marco Rossi</h4>
                                            <div className="flex text-primary">
                                                <span className="material-symbols-outlined text-xs">star</span>
                                                <span className="material-symbols-outlined text-xs">star</span>
                                                <span className="material-symbols-outlined text-xs">star</span>
                                                <span className="material-symbols-outlined text-xs">star</span>
                                                <span className="material-symbols-outlined text-xs">star_half</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm italic text-slate-600 dark:text-slate-400">"Ella Rock hike is challenging but worth every drop of sweat. The views from the top are unreal."</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">
                        {/* Quick Facts Card */}
                        <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                            <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">info</span> At a Glance
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 text-sm">
                                        <span className="material-symbols-outlined text-sm">height</span> Elevation
                                    </span>
                                    <span className="font-bold">1,041 m</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 text-sm">
                                        <span className="material-symbols-outlined text-sm">calendar_month</span> Best Time
                                    </span>
                                    <span className="font-bold">Jan - April</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 text-sm">
                                        <span className="material-symbols-outlined text-sm">terrain</span> Hike Difficulty
                                    </span>
                                    <span className="text-primary font-bold">Moderate</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2 text-sm">
                                        <span className="material-symbols-outlined text-sm">train</span> Train Access
                                    </span>
                                    <span className="font-bold">Direct Line</span>
                                </div>
                            </div>
                        </div>

                        {/* Weather Widget */}
                        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 opacity-20">
                                <span className="material-symbols-outlined text-9xl">wb_sunny</span>
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-2">Live Weather</h3>
                                <div className="flex items-end gap-2 mb-6">
                                    <span className="text-5xl font-black">22°C</span>
                                    <span className="text-primary font-bold pb-2">Partly Cloudy</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                    <div className="bg-white/10 rounded-lg py-2">
                                        <p className="text-white/60 mb-1">Mon</p>
                                        <span className="material-symbols-outlined text-primary block mb-1">cloud</span>
                                        <p className="font-bold">21°</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg py-2">
                                        <p className="text-white/60 mb-1">Tue</p>
                                        <span className="material-symbols-outlined text-primary block mb-1">rainy</span>
                                        <p className="font-bold">19°</p>
                                    </div>
                                    <div className="bg-white/10 rounded-lg py-2 border border-primary/30">
                                        <p className="text-white/60 mb-1">Wed</p>
                                        <span className="material-symbols-outlined text-primary block mb-1">wb_sunny</span>
                                        <p className="font-bold">24°</p>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between text-sm opacity-80">
                                    <span>Humidity: 65%</span>
                                    <span>Wind: 12 km/h</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA Sidebar */}
                        <div className="bg-primary p-6 rounded-xl text-slate-900 shadow-lg group">
                            <h3 className="text-xl font-bold mb-2">Ready for Adventure?</h3>
                            <p className="text-sm mb-6 opacity-80">Join 500+ travelers who planned their Ella trip this week.</p>
                            <Link to="/trip-planner" className="w-full bg-slate-900 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 group-hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined">explore</span> Start Planning
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Nearby Hotels Section */}
                <section className="px-4 md:px-10 lg:px-40 py-16">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold">Stays with a View</h3>
                        <Link to="/hotels" className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                            View all 120+ hotels <span className="material-symbols-outlined text-xs">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Hotel Cards... (simplified for brevity but keeping styling structure) */}
                        <div className="group bg-white dark:bg-background-dark/40 rounded-xl overflow-hidden border border-primary/5 shadow-sm hover:shadow-xl transition-all">
                            <div className="h-48 overflow-hidden relative">
                                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="98 Acres Resort" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBywsvkzAVA2KMAlFsR3mPLj37ka9K9nOC8Q-owYoyffdijF1wLzW06IX8lt0NpJTAYl-fryUUg15f4vR5Q28jqxxT1FMZ9tgJGR1mqxVcXAtqTc_9RHfh198wbv3fP0fzUqdPxC2sUazuo_VkhPMapjVTj89rmMMJ2_TUU4OgT-DMYDaz4_FEAWH4lTzy8fgkoj5q75B3d9hCcXuAK_byhfqf1dYOQY-siYTEdTig70DVdqPq_QSCWrvmgkX3z2dY56lox2zDNThU" />
                                <div className="absolute top-3 left-3 bg-primary text-slate-900 px-2 py-1 rounded font-bold text-[10px] uppercase tracking-wider">Premium</div>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">98 Acres Resort</h4>
                                    <div className="flex items-center text-primary gap-0.5">
                                        <span className="material-symbols-outlined text-xs">star</span>
                                        <span className="text-xs font-bold">4.9</span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">location_on</span> Near Little Adam's Peak
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div>
                                        <span className="text-lg font-black">$240</span>
                                        <span className="text-[10px] text-slate-400">/night</span>
                                    </div>
                                    <button className="bg-primary/20 hover:bg-primary text-primary hover:text-slate-900 px-3 py-1.5 rounded text-xs font-bold transition-colors">Book Now</button>
                                </div>
                            </div>
                        </div>

                        <div className="group bg-white dark:bg-background-dark/40 rounded-xl overflow-hidden border border-primary/5 shadow-sm hover:shadow-xl transition-all">
                            <div className="h-48 overflow-hidden relative">
                                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Ella Flower Garden" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUSPlPMj3v0evc5pZCfbiIwcLYs3AoH4yw5KuqljHHu9S4m48HZQ795UVoPjbVl9qWbzZzz2QYtc_7TtRvU45PgrYO9NQxNqmsJNYh1ysroLlllldRjjRJVmtfq5h9t2mppqgps8vCRz3xqsJFmDdjuEezzHHgsF8vUUETvrkNAo04qNcvyaSTZHg3E0CIJ-2rb3alvceDuBd3roPkE92FRhs408ZvsJvqg5jt0l7wo_uACLWHgV7VCsKlF1MqPpcuwNdSalmdB48" />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">Ella Flower Garden</h4>
                                    <div className="flex items-center text-primary gap-0.5">
                                        <span className="material-symbols-outlined text-xs">star</span>
                                        <span className="text-xs font-bold">4.7</span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">location_on</span> Ella City Center
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div>
                                        <span className="text-lg font-black">$85</span>
                                        <span className="text-[10px] text-slate-400">/night</span>
                                    </div>
                                    <button className="bg-primary/20 hover:bg-primary text-primary hover:text-slate-900 px-3 py-1.5 rounded text-xs font-bold transition-colors">Book Now</button>
                                </div>
                            </div>
                        </div>

                        <div className="group bg-white dark:bg-background-dark/40 rounded-xl overflow-hidden border border-primary/5 shadow-sm hover:shadow-xl transition-all">
                            <div className="h-48 overflow-hidden relative">
                                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Oak Ray Ella Gap" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG8UJ0llD7JVewbsLqvVjrqfeAYzhxUzTPgFOX38YHcTw3ZK7sH9-bbMBtXu4pafNE6-kbcaKPvFhCjpdGggaybvudwh7PYtTvU5XsOAkX5VQsyQuJwiW9kAfKL_r8XXqW0AB2O7Rara2XxYwm68Mkj_YUEz35T3F8y0qEQOh1Z7kEcPQoRg1clidJbhTzxNBKmzOh2iB8PZ10WyFeFo_tGNM7xAW7lJs-BfulY019SrOW236y2Gm4Oh5BnK31Kru4zjfwGYZFeEU" />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">Oak Ray Ella Gap</h4>
                                    <div className="flex items-center text-primary gap-0.5">
                                        <span className="material-symbols-outlined text-xs">star</span>
                                        <span className="text-xs font-bold">4.5</span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">location_on</span> Close to Railway Station
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div>
                                        <span className="text-lg font-black">$110</span>
                                        <span className="text-[10px] text-slate-400">/night</span>
                                    </div>
                                    <button className="bg-primary/20 hover:bg-primary text-primary hover:text-slate-900 px-3 py-1.5 rounded text-xs font-bold transition-colors">Book Now</button>
                                </div>
                            </div>
                        </div>

                        <div className="group bg-white dark:bg-background-dark/40 rounded-xl overflow-hidden border border-primary/5 shadow-sm hover:shadow-xl transition-all">
                            <div className="h-48 overflow-hidden relative">
                                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="The Secret Ella" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOOkrLBOxl1qKYSm-8yTkAY2A0mESCMoJBsRhSAYFJEk2daUzyJmLS-wb9WkiIXtSyyqN6rkLN1eVS_4Wx1A3X4EaVc1XX_MXIa3_XOVfbOCuMoUq_yVZ2fhx9KVXL0m5n0txSnIeEriEx2y3G2oeAa30RoR7jeHtRIu9PdykCdm6W-Zz206ax5l5U_Ju-fi2WNheJHD6CSZGOKFqTgUm-rG-KvFQJxWND-VLD-c2Q8KpRqHJzKSJ_oO0qtkym-2EEqKKF8qsspKs" />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-900 dark:text-slate-100">The Secret Ella</h4>
                                    <div className="flex items-center text-primary gap-0.5">
                                        <span className="material-symbols-outlined text-xs">star</span>
                                        <span className="text-xs font-bold">4.8</span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">location_on</span> Private Tea Estate
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div>
                                        <span className="text-lg font-black">$310</span>
                                        <span className="text-[10px] text-slate-400">/night</span>
                                    </div>
                                    <button className="bg-primary/20 hover:bg-primary text-primary hover:text-slate-900 px-3 py-1.5 rounded text-xs font-bold transition-colors">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default DestinationDetails;
