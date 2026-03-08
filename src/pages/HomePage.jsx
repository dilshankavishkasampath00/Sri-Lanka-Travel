import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useGoogleMaps } from '../context/GoogleMapsContext';

const SRI_LANKA_PINS = [
    { lat: 7.9570, lng: 80.7603, name: 'Sigiriya' },
    { lat: 6.8667, lng: 80.6500, name: 'Ella' },
    { lat: 5.9485, lng: 80.4562, name: 'Mirissa' },
    { lat: 7.2906, lng: 80.6337, name: 'Kandy' },
    { lat: 6.9697, lng: 80.7833, name: 'Nuwara Eliya' },
    { lat: 6.9271, lng: 79.8612, name: 'Colombo' },
    { lat: 6.0535, lng: 80.2210, name: 'Galle' },
    { lat: 8.3130, lng: 80.4037, name: 'Anuradhapura' },
];

const HomeMap = () => {
    const { isLoaded } = useGoogleMaps();

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={{ lat: 7.8731, lng: 80.7718 }}
            zoom={7}
            options={{
                disableDefaultUI: true,
                zoomControl: true,
                scrollwheel: false,
                styles: [
                    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#a0c4e8' }] },
                    { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#e8f5e9' }] },
                ],
            }}
        >
            {SRI_LANKA_PINS.map((pin) => (
                <Marker
                    key={pin.name}
                    position={{ lat: pin.lat, lng: pin.lng }}
                    title={pin.name}
                />
            ))}
        </GoogleMap>
    ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
            <span className="material-symbols-outlined text-5xl text-primary animate-pulse">map</span>
        </div>
    );
};

const HomePage = () => {
    return (
        <>
            <Navbar />
            <main>
                {/* Hero Section */}
                <section className="relative w-full h-[600px] flex items-center justify-center px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAMCmUneqBvxKV1oMjF1m4cd67GjUlqVJS0iMow-AhEuGCqT7SGJvRwqETyzHUzaYpp04P5pGpfc8O62Ip3jm5bzS1jEoGKj5Q73A0WEL5dDKRogkN-Kmq-m40IemlPTB73EmOKG0aBXi0vg9xY4yxQLhLxtukKfawRoc9gsFsRoXXfIMd5dhcOL1NOU3b-yryEOzJG5I3dFL5saiPHXLp9FjgCU0QeshqRuZqBxYvVwomrFIYnlbYt9Psr8yLYd-HS0TQJa8Nxc-0')" }}>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
                    </div>
                    <div className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center gap-8">
                        <div className="space-y-4">
                            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight drop-shadow-lg">
                                Explore Sri Lanka: <br />
                                <span className="text-primary">Beaches, Mountains and Culture</span>
                            </h1>
                            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mx-auto drop-shadow-md">
                                Experience the magic of the teardrop island, from golden coasts to misty highlands.
                            </p>
                        </div>
                        {/* Search Bar */}
                        <div className="w-full max-w-2xl bg-white/95 dark:bg-background-dark/95 backdrop-blur rounded-xl p-2 shadow-2xl flex flex-col md:flex-row gap-2">
                            <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
                                <span className="material-symbols-outlined text-slate-400">search</span>
                                <input className="w-full py-3 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-500" placeholder="Where do you want to go?" type="text" />
                            </div>
                            <div className="flex-1 flex items-center px-4 gap-3">
                                <span className="material-symbols-outlined text-slate-400">calendar_month</span>
                                <input className="w-full py-3 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-500" placeholder="When are you visiting?" type="text" />
                            </div>
                            <Link to="/destinations" className="bg-primary hover:bg-primary/90 text-slate-900 font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2">
                                Search
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Popular Places Section */}
                <section className="max-w-7xl mx-auto px-4 py-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div className="space-y-2">
                            <span className="text-primary font-bold tracking-widest uppercase text-sm">Discover</span>
                            <h2 className="text-3xl md:text-4xl font-bold">Popular Destinations</h2>
                        </div>
                        <Link to="/destinations" className="flex items-center gap-2 text-primary font-bold hover:underline">
                            View all destinations
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {/* Sigiriya */}
                        <Link to="/destination/sigiriya" className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-xl aspect-[4/5] mb-4">
                                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Sigiriya" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1WdwsK6e5VW9DA_hRak0miWht8fRwc98YCETuXeub6SFZXIvwvGNXvWWwxmpsQUi3wTZrlh_FCWEEOMXigLEJrcAcZkeJ2_XoW0nOvowj1qh1HFJ2zaFja9wQ36nquol3YzpQRxIxTuuKrgtkjSQHvTCS91ud7VbhzeFb2SNdHruv-jF7QoGaX8UUdRUHjT_ez0l7H7NjamKW_KaBzmg_omxXgcxb92uSmcGM-EMADEX4XTLtx1XYgR71EA5sPsv0gj90gbYBbso" />
                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-background-dark/90 p-2 rounded-full shadow-lg">
                                    <span className="material-symbols-outlined text-primary text-xl">favorite</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Sigiriya</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">location_on</span>
                                Cultural Triangle
                            </p>
                        </Link>

                        {/* Ella */}
                        <Link to="/destination/ella" className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-xl aspect-[4/5] mb-4">
                                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Ella" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgJ7BezHsI1k_o2oLKB9GTj82ENhb7DX1YKaDBvAFU-vW9Rldc6udUpuFSpo4Z5quRHhMuBXBfKdqYpAHXM5DeusQlNkswl4SkLoZKcsEeyu3U0Kp0tZeLw9GCURYdA1xxpkblVh6h1xTHUtINvaSUvWX4I9gshvkBWK46pPgxH902cFgH_1UFLwnI53X5xiyIJzxNUi9FJOHAEBqsbWblpjCLvVu59q6lrYFEwpIOIxScmUI0HCEW8ap--l7VqDybhHvGKhNoklc" />
                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-background-dark/90 p-2 rounded-full shadow-lg">
                                    <span className="material-symbols-outlined text-primary text-xl">favorite</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Ella</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">location_on</span>
                                Hill Country
                            </p>
                        </Link>

                        {/* Mirissa */}
                        <Link to="/destination/mirissa" className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-xl aspect-[4/5] mb-4">
                                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Mirissa" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb2Xw1BT5hHYIjiSmYf03NTCg4XwEhwLBrzSELMbdCMVRmJ8pjAep0r_oK4GAxDZkqsQFp7kcbRMZcb1QuwiKeBRzFteatVtDaMt2DUAin2JmhFI-jJOcdlcRvauUSSe7bwC2r9gLtJWWv0XEU6qVxI7yC3F6RR-ZCWqbeAgV-gmVULlIoX6k4yUVd8K9EIdB1UjVNCfiwJFeoFS1N9vn9k3Uz7UyAjKpdS-uxph0Zo9Duxqm0IPoFRLMzIZ6r6zLZl4Rwz-asPdQ" />
                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-background-dark/90 p-2 rounded-full shadow-lg">
                                    <span className="material-symbols-outlined text-primary text-xl">favorite</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Mirissa</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">location_on</span>
                                Southern Coast
                            </p>
                        </Link>

                        {/* Kandy */}
                        <Link to="/destination/kandy" className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-xl aspect-[4/5] mb-4">
                                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Kandy" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj1UMzPFaJBAeisiHL8leWleICvWzTzUVrApsgSvptZuNb22OTQZXlz1yl3kOjVd4KZ7tq8w7YxV7w--qysPtl0Z-JaTemI344_o0PCressg3sLJIC3God7wY-lzFULRROGV6jsUvErgJ2tFAQoI2fEY6tbArqg7WEgRJ6ezdOBnaaCbf0jsiD6Sskdcdi6JkLjF86xaCuabV2qGccCYhRiOZK1EeLoK4xy5kdlOVGwVnsz5mUUZw66_aoIJcVcC_HiyTCFmUSTpc" />
                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-background-dark/90 p-2 rounded-full shadow-lg">
                                    <span className="material-symbols-outlined text-primary text-xl">favorite</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Kandy</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">location_on</span>
                                Central Province
                            </p>
                        </Link>

                        {/* Nuwara Eliya */}
                        <Link to="/destination/nuwara-eliya" className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-xl aspect-[4/5] mb-4">
                                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Nuwara Eliya" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4gln3vJnFYK_R1KvhlV7ubw19ruzLVvZ2kxmQnfumpxPgcsmDekTB-bPwudOXZA4rJE4CaIDVWMGkl0weqZbwqTRkA2Q2KTpSYX8VTVve-73xDuBkDaFk-pUKWFiY67ES3IgCZlYGef4WJYbtsYd3R4_J9macw7sMXNvWoFrBV6hX8D59a7FmKWqSPt3rAbgwBa-VaVuhRPjWOnAZ0PEsvTxfBQwUYllTYemD4UFjSpwL-kX5030fb3t-2uh28QDMfCdLugGj4yA" />
                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-background-dark/90 p-2 rounded-full shadow-lg">
                                    <span className="material-symbols-outlined text-primary text-xl">favorite</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Nuwara Eliya</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">location_on</span>
                                Highlands
                            </p>
                        </Link>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-primary/5 dark:bg-primary/10 py-20">
                    <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
                        <h2 className="text-3xl md:text-5xl font-black leading-tight">
                            Ready for your adventure?
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300">
                            Plan your perfect getaway to the heart of the Indian Ocean. From bespoke itineraries to local guides, we have you covered.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/trip-planner" className="w-full flex items-center justify-center sm:w-auto min-w-[200px] h-14 rounded-xl bg-primary text-slate-900 font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all">
                                Start Planning
                            </Link>
                            <Link to="/map" className="w-full flex items-center justify-center sm:w-auto min-w-[200px] h-14 rounded-xl border-2 border-primary text-primary font-bold text-lg hover:bg-primary/5 transition-all">
                                View Interactive Map
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Interactive Map Section */}
                <section className="max-w-7xl mx-auto px-4 py-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-sm">Explore</span>
                            <h2 className="text-3xl font-bold">Interactive Map</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Sri Lanka's top destinations — click to explore</p>
                        </div>
                        <Link to="/map" className="flex items-center gap-2 text-primary font-bold hover:underline shrink-0">
                            Open Full Map <span className="material-symbols-outlined">open_in_new</span>
                        </Link>
                    </div>
                    <div className="rounded-2xl overflow-hidden h-[450px] relative border border-slate-200 dark:border-slate-800 shadow-xl">
                        <HomeMap />
                        {/* Overlay badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                            {SRI_LANKA_PINS.slice(0, 4).map(pin => (
                                <div key={pin.name} className="flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-full shadow text-xs font-bold border border-primary/10">
                                    <span className="material-symbols-outlined text-primary" style={{ fontSize: 12 }}>location_on</span>
                                    {pin.name}
                                </div>
                            ))}
                            <div className="flex items-center gap-2 bg-primary/90 text-white backdrop-blur px-3 py-1.5 rounded-full shadow text-xs font-bold">
                                +{SRI_LANKA_PINS.length - 4} more destinations
                            </div>
                        </div>
                        {/* CTA overlay button */}
                        <Link
                            to="/map"
                            className="absolute bottom-4 right-4 flex items-center gap-2 bg-primary text-slate-900 font-bold px-5 py-2.5 rounded-xl shadow-xl hover:scale-105 transition-transform text-sm"
                        >
                            <span className="material-symbols-outlined text-sm">travel_explore</span>
                            Explore Full Map
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default HomePage;
