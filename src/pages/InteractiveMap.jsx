import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import useWeather from '../hooks/useWeather';

const mapContainerStyle = {
    width: '100%',
    height: '100%'
};

const defaultCenter = {
    lat: 7.8731,
    lng: 80.7718 // Center of Sri Lanka
};

// Basic Locations for the map
const locations = [
    {
        id: 1,
        lat: 6.9271,
        lng: 79.8612,
        name: "Colombo",
        temp: "28°C",
        weatherIcon: "☀️",
        desc: "The vibrant commercial capital with coastal views.",
        link: "colombo"
    },
    {
        id: 2,
        lat: 7.9570,
        lng: 80.7603,
        name: "Sigiriya",
        temp: "28°C",
        weatherIcon: "☀️",
        desc: "Climb the ancient 'Lion Rock' fortress, a marvel of 5th-century urban planning.",
        link: "sigiriya"
    },
    {
        id: 3,
        lat: 6.8667,
        lng: 81.0466,
        name: "Ella",
        temp: "22°C",
        weatherIcon: "☁️",
        desc: "A mountain village known for its emerald tea plantations and trekking trails.",
        link: "ella"
    },
    {
        id: 4,
        lat: 6.0535,
        lng: 80.2210,
        name: "Galle",
        temp: "29°C",
        weatherIcon: "☀️",
        desc: "Wander through Dutch-colonial streets within the historic Galle Fort.",
        link: "galle"
    },
    {
        id: 5,
        lat: 6.3683,
        lng: 81.5165,
        name: "Yala",
        temp: "31°C",
        weatherIcon: "☀️",
        desc: "Home to the highest density of leopards in the world, elephants, and crocodiles.",
        link: "yala"
    },
    {
        id: 6,
        lat: 6.8436,
        lng: 81.8266,
        name: "Arugam Bay",
        temp: "30°C",
        weatherIcon: "☀️",
        desc: "A laid-back surf town world-renowned for its right-hand point breaks.",
        link: "arugam-bay"
    },
    {
        id: 7,
        lat: 7.2906,
        lng: 80.6337,
        name: "Kandy",
        temp: "24°C",
        weatherIcon: "⛅",
        desc: "The cultural capital nestled amidst the misty hills. Home to the Temple of the Tooth.",
        link: "kandy"
    }
];

// Sub-component: Info Window with live weather
const InfoWindowContent = ({ location }) => {
    const { weather, loading } = useWeather({ lat: location.lat, lng: location.lng });

    return (
        <div style={{ minWidth: 180, fontFamily: 'inherit' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <strong style={{ fontSize: 14 }}>{location.name}</strong>
                {loading ? (
                    <span style={{ fontSize: 11, color: '#64748b' }}>Loading...</span>
                ) : weather ? (
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#f59e0b' }}>
                        {weather.emoji} {weather.temp}°C
                    </span>
                ) : (
                    <span style={{ fontSize: 11, color: '#64748b' }}>{location.temp} {location.weatherIcon}</span>
                )}
            </div>
            {weather && (
                <div style={{ fontSize: 11, color: '#64748b', marginBottom: 6, textTransform: 'capitalize' }}>
                    {weather.description} · 💧 {weather.humidity}% · 💨 {weather.windSpeed} m/s
                </div>
            )}
            <p style={{ fontSize: 11, color: '#64748b', marginBottom: 8, lineHeight: 1.4 }}>
                {location.desc}
            </p>
            <a href={`/destination/${location.link}`} style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', textDecoration: 'none' }}>
                View Details →
            </a>
        </div>
    );
};

// Sub-component: Right sidebar with live weather card
const RightSidebarContent = ({ selectedLocation }) => {
    const cityName = selectedLocation?.name || 'Colombo';
    const { weather, loading } = useWeather({ city: cityName });

    const location = selectedLocation || {
        name: 'Colombo',
        link: 'colombo',
        desc: 'Colombo is a vibrant city with a mix of modern life, colonial architecture and ruins. Explore the bustling Pettah markets, enjoy the sunset at Galle Face Green, or visit the historic Gangaramaya Temple.',
    };

    return (
        <div className="mb-6 flex flex-col flex-1">
            <div className="w-full h-48 rounded-2xl bg-cover bg-center mb-4 shadow" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcedwnTE8x1dMs_VBhtAbN15i6D0oe51i3ACEUlrQnx-aU-XJjmOOu_C2FpqU3HfZANt-E9jyj1stDUZ0Fbt9v143JNshYOTWoPoD8m0wHwl2a3gEdAC5Sqv9MHlMiVYL-sm6zBZa9lTxRtLO1wxQaRnDt8gbyal1pjuHh1eEBzrs10VoIfbrV7J3ES-i4_HCgtdY7GutXB-9r897CYWSMSHxLexeXwX3UGZAQtvCxSYB2DyJBEMuYdkm8pOzWLuOgrBGGo9LWLR8')" }}></div>

            <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{location.name}</h3>
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {selectedLocation ? 'Selected' : 'Recommended'}
                </div>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-4">
                <span className="material-symbols-outlined text-sm">location_on</span>
                <span>{location.name}, Sri Lanka</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">{location.desc}</p>

            {/* Live Weather Panel */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 col-span-2">
                    {loading ? (
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <span className="material-symbols-outlined animate-spin text-primary">refresh</span>
                            Fetching live weather...
                        </div>
                    ) : weather ? (
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-2xl">{weather.symbol}</span>
                                    <div>
                                        <p className="text-xs text-slate-500">Live Weather</p>
                                        <p className="font-black text-2xl text-slate-900 dark:text-slate-100">{weather.temp}°C</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-500">Feels Like</p>
                                    <p className="font-bold text-slate-700 dark:text-slate-300">{weather.feelsLike}°C</p>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 capitalize mb-3 font-medium">{weather.description}</p>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <span className="material-symbols-outlined text-blue-400" style={{ fontSize: 14 }}>water_drop</span>
                                    <span>Humidity: <strong className="text-slate-700">{weather.humidity}%</strong></span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-slate-500">
                                    <span className="material-symbols-outlined text-blue-400" style={{ fontSize: 14 }}>air</span>
                                    <span>Wind: <strong className="text-slate-700">{weather.windSpeed} m/s</strong></span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <span className="material-symbols-outlined text-primary mb-2">wb_sunny</span>
                            <p className="text-xs text-slate-500">Weather</p>
                            <p className="font-bold text-slate-900 dark:text-slate-100">Unavailable</p>
                        </div>
                    )}
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <span className="material-symbols-outlined text-primary mb-2">trending_up</span>
                    <p className="text-xs text-slate-500">Peak Season</p>
                    <p className="font-bold text-slate-900 dark:text-slate-100">Dec - Mar</p>
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <span className="material-symbols-outlined text-primary mb-2">flight</span>
                    <p className="text-xs text-slate-500">Best Access</p>
                    <p className="font-bold text-slate-900 dark:text-slate-100">CMB Airport</p>
                </div>
            </div>
            <Link to={`/destination/${location.link || 'ella'}`} className="w-full flex items-center justify-center py-4 bg-primary text-slate-900 rounded-xl font-bold mt-auto shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02]">
                Plan Trip to {location.name}
            </Link>
        </div>
    );
};

const InteractiveMap = () => {

    // Import Google Maps libraries
    const libraries = ['places'];

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
        libraries: ['places']
    });

    const [map, setMap] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    // Live weather for left sidebar (defaults to Colombo weather)
    const sidebarCity = selectedLocation?.name || 'Colombo';
    const { weather: sidebarWeather, loading: sidebarLoading } = useWeather({ city: sidebarCity });

    const onLoad = useCallback(function callback(map) {
        // map.setZoom(8);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCurrentLocation(pos);
                    map?.panTo(pos);
                    map?.setZoom(12);
                },
                () => {
                    alert("Error: The Geolocation service failed.");
                }
            );
        } else {
            alert("Error: Your browser doesn't support geolocation.");
        }
    };


    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
            <Navbar />
            <main className="flex flex-1 overflow-hidden h-[calc(100vh-73px)] relative z-0">

                {/* Left Sidebar */}
                <aside className="w-80 hidden xl:flex flex-col border-r border-primary/10 bg-white dark:bg-background-dark p-6 overflow-y-auto z-10 shadow-2xl">
                    <div className="mb-8">
                        <h3 className="text-slate-900 dark:text-slate-100 text-2xl font-bold mb-2">Explore the Island</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Discover the pearl of the Indian Ocean.</p>
                    </div>
                    <div className="mb-8">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">Filter by Category</h4>
                        <div className="flex flex-col gap-2">
                            <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-white font-medium">
                                <span className="material-symbols-outlined">beach_access</span>
                                <span>Beaches</span>
                                <span className="ml-auto text-xs opacity-70">12</span>
                            </button>
                            <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors text-slate-700 dark:text-slate-300 font-medium group">
                                <span className="material-symbols-outlined text-primary">landscape</span>
                                <span>Mountains</span>
                                <span className="ml-auto text-xs text-slate-400">8</span>
                            </button>
                            <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors text-slate-700 dark:text-slate-300 font-medium group">
                                <span className="material-symbols-outlined text-primary">castle</span>
                                <span>Heritage</span>
                                <span className="ml-auto text-xs text-slate-400">15</span>
                            </button>
                            <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors text-slate-700 dark:text-slate-300 font-medium group">
                                <span className="material-symbols-outlined text-primary">pets</span>
                                <span>Wildlife</span>
                                <span className="ml-auto text-xs text-slate-400">6</span>
                            </button>
                        </div>
                    </div>
                    <div className="mt-auto">
                        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">
                                        {sidebarLoading ? 'refresh' : (sidebarWeather?.symbol || 'wb_sunny')}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{sidebarCity}</p>
                                    {sidebarLoading ? (
                                        <p className="font-bold text-slate-900 dark:text-slate-100 text-xs">Loading...</p>
                                    ) : sidebarWeather ? (
                                        <p className="font-bold text-slate-900 dark:text-slate-100">
                                            {sidebarWeather.emoji} {sidebarWeather.temp}°C · <span className="capitalize text-xs font-medium">{sidebarWeather.description}</span>
                                        </p>
                                    ) : (
                                        <p className="font-bold text-slate-900 dark:text-slate-100">28°C Sunny</p>
                                    )}
                                </div>
                            </div>
                            {sidebarWeather && (
                                <p className="text-xs text-slate-500 mb-3">
                                    💧 {sidebarWeather.humidity}% humidity · 💨 {sidebarWeather.windSpeed} m/s wind
                                </p>
                            )}
                            {!sidebarWeather && !sidebarLoading && (
                                <p className="text-xs text-slate-500 mb-3">Great day for a coastal walk!</p>
                            )}
                            <Link to="/weather" className="flex items-center justify-center w-full py-2 bg-white dark:bg-slate-800 rounded-lg text-sm font-bold border border-primary/10 text-primary hover:bg-primary/10 text-center transition-colors">View Forecast</Link>
                        </div>
                    </div>
                </aside>

                {/* Main Map Area (react-google-maps/api implementation) */}
                <section className="flex-1 relative bg-slate-200 dark:bg-slate-900 overflow-hidden z-0">
                    {isLoaded ? (
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={defaultCenter}
                            zoom={8}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                            options={{
                                disableDefaultUI: false,
                                zoomControl: true,
                                streetViewControl: false,
                                mapTypeControl: false,
                                fullscreenControl: false,
                            }}
                        >
                            {/* Render Defined Locations */}
                            {locations.map((loc) => (
                                <Marker
                                    key={loc.id}
                                    position={{ lat: loc.lat, lng: loc.lng }}
                                    onClick={() => setSelectedLocation(loc)}
                                />
                            ))}

                            {/* Render User's Live Location (if fetched) */}
                            {currentLocation && (
                                <Marker
                                    position={currentLocation}
                                    icon={{
                                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                                    }}
                                />
                            )}

                            {/* Render Info Window when a location is selected */}
                            {selectedLocation && (
                                <InfoWindow
                                    position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                                    onCloseClick={() => setSelectedLocation(null)}
                                >
                                    <InfoWindowContent location={selectedLocation} />
                                </InfoWindow>
                            )}
                        </GoogleMap>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary">
                            Loading Map...
                        </div>
                    )}

                    {/* Floating Controls Overlay */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-center pointer-events-none z-10">
                        <div className="flex gap-2 pointer-events-auto">
                            <button className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-lg border border-primary/10 text-slate-700 dark:text-slate-200 hover:scale-105 transition-transform" title="Layers">
                                <span className="material-symbols-outlined">layers</span>
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 pointer-events-auto">
                            {/* Custom Live Location Button */}
                            <button
                                onClick={getUserLocation}
                                className="bg-primary size-12 rounded-xl shadow-lg flex items-center justify-center text-white mt-4 hover:scale-105 transition-transform"
                                title="Use Live Location"
                            >
                                <span className="material-symbols-outlined">my_location</span>
                            </button>
                        </div>
                    </div>

                    {/* Floating Mobile Filter Button */}
                    <div className="absolute bottom-6 left-6 pointer-events-auto xl:hidden z-10">
                        <button className="flex items-center gap-2 bg-white dark:bg-slate-800 px-6 py-3 rounded-full shadow-2xl border border-primary/20 text-slate-900 dark:text-slate-100 font-bold hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-primary">filter_list</span>
                            Filters
                        </button>
                    </div>
                </section>

                {/* Right Sidebar */}
                <aside className="w-96 hidden 2xl:flex flex-col border-l border-primary/10 bg-white dark:bg-background-dark p-6 overflow-y-auto z-10 shadow-2xl">
                    <RightSidebarContent selectedLocation={selectedLocation} />
                </aside>
            </main>
        </div>
    );
};

export default InteractiveMap;
