import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import useWeather from '../hooks/useWeather';

// --- City Weather Card ---
const CityWeatherCard = ({ name, province, img }) => {
    const { weather, loading } = useWeather({ city: name });

    return (
        <div className="group bg-white dark:bg-slate-800 p-4 rounded-xl border border-primary/10 hover:border-primary/40 transition-all cursor-pointer shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="size-10 rounded-lg overflow-hidden">
                    <img alt={name} className="w-full h-full object-cover" src={img} />
                </div>
                {loading ? (
                    <span className="material-symbols-outlined text-slate-300 animate-pulse">refresh</span>
                ) : (
                    <span className="material-symbols-outlined text-yellow-500">{weather?.symbol || 'wb_sunny'}</span>
                )}
            </div>
            <h4 className="font-bold">{name}</h4>
            <p className="text-slate-400 text-sm mb-2">{province}</p>
            {loading ? (
                <div className="text-sm text-slate-400 animate-pulse">Loading...</div>
            ) : weather ? (
                <div>
                    <div className="text-2xl font-bold">{weather.temp}°C</div>
                    <div className="text-xs text-slate-400 capitalize mt-1">{weather.description}</div>
                    <div className="flex gap-3 mt-2 text-[10px] text-slate-400">
                        <span>💧 {weather.humidity}%</span>
                        <span>💨 {weather.windSpeed} m/s</span>
                    </div>
                </div>
            ) : (
                <div className="text-sm text-slate-400">Unavailable</div>
            )}
        </div>
    );
};

const CITIES = [
    { name: 'Kandy', province: 'Central Province', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNizAMkbQX1x0jbmIt2PGMyv933-q40lnywtNgsYJBKb0ux6gD41iZPIpmceao3EVm3RXFLsjp5M9jCndCpmFzW3Izbe0WMnRFKGD84qN43xpww6YNL8hh-zcmwwf7YupY3S2dGpJ0F1H7ItesVX_GT9BvHmoztaxxp9LOWEssqBzCAp-8CXcudv633iWAHkloOcGFvN2LrVyLbl64gZsBFAeh8p2_1b3eRY0Z5p42Ajy24iqGi_H6n5IQdaK61TtJTSNt_6sLHoE' },
    { name: 'Galle', province: 'Southern Province', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFqvRIP-I6_ypk-BJPvDP5qwNrdlWy8y1HP4VqoD614dZWea-vS3K9TohQyWsStBdqYXZCfjxVEiWcdv-zsUqrwtT-5mCwPWqyQDCTGusha0gJ1t-cRxgXpVEYMY8qCNqF4C0G9GqhBvfryLWghnjlLaOy2toICnLZ0gOdfe0SW29rsPanA8IGtcej2V3XwXZFzqpHEJwi7sRP3imitZwGvHCG3iAtIjGsqMjSIlyznN-XdH2OdhZ2CLargWsQw5-plLQuBhcXHVA' },
    { name: 'Ella', province: 'Uva Province', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3XLiHEPIx9IbtOxnx3a5dGGYAckghCCABNd6Hpd6ZbfcQ_2mk1fZ-dcUCaFUeAHdOZNhI8fA1LpF5uP4v1ARGuXaCmWgUnzLfQCu7ro2mg8qfn7O9jcfdGHqxxSmqUTp-b-oxyyx5FRtZLVuBEj2yVn0T1fNgjL1Qlpwane59IX58efrJIuOO2dDdWL7S2wNAtOu78E' },
    { name: 'Jaffna', province: 'Northern Province', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_oo6Tfks08l6FXnK96XZqhLaa9vwYjA6sCT5ay6A3yv_7q4FAI0MzKrzKbTXtwO_I2kZWVzk6t4zhEJfJ2xVEjUJbbAF7UZeHmF1QHrrGViVOPDWq7qWEQRmwuBbSpVyVZ4vihQ2tI_jF2jIRdMpMjKJuhiYIMSplph3CJwxvfx8Ewx4qB1sRyNXWYKTuFnKQZB7uWuf08dFOwOEOf7hcpd66vh5T4Dy0-OdDefk1mhlyT6ay6SMY7jGo4pEeC7pOhHljBdMsXSU' },
    { name: 'Nuwara Eliya', province: 'Central Province', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW0Mr3yq4ZLNbcX0c9Kn3UIpcxQb8ATHaKTBlsvVuccUsMOiLv_i8eb-iPAuqzRlmSrsxxoz56JSbI9z42WfDNFEF00e2E10x9UQJcLmVXDpYIbzrgrGDJHRl3LrNmR0mNlJxutqpmlG59sjc3y8-isbSBIdgzXG8lnFdQ5s4yLadqE_kv7oqdBuAMWZ-t51nEJG7dGIQDwvCEBFyLrvqWOmmcfRATyZbfmYkHFA-GQSTVsDGT1_Obw8cG-OXJVRvBx6M-PJtNFgE' },
];

// --- Hero Section for searched/default city ---
const HeroWeather = ({ city }) => {
    const { weather, loading } = useWeather({ city });
    const today = new Date().toLocaleDateString('en-LK', { weekday: 'long', day: 'numeric', month: 'long' });

    return (
        <div className="lg:col-span-2 relative overflow-hidden rounded-xl bg-slate-900 aspect-[16/9] md:aspect-auto md:h-[400px] flex flex-col justify-end p-8 shadow-xl group">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.4) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuClLEE1Tkp5Do86r6pYArAcoEv-tp0g1d3QDiUcs7Ry-T4EB8pEx1xzL_uyeGqjvwZxwhBdoVpQ0GpaUfh-u3szd4M0GklUjeuZUKE0qz6a_kbQqCvfhCShgY4VEBMLrww7nbSsWQ1mttlgRWm0CVnBr8XmvqkIEgYBVZvG_xaPaRWy6ejGU1yPa-fH-4xLpvQgd9NvWbto2IQwrWQG2UEH7y5OpAnAoNFTQ45ow4id1HKZi4_NZGnw07VsmPTsQgbULReYmqCqjXc')" }}></div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-md w-fit px-3 py-1 rounded-full border border-primary/30 text-primary">
                        <span className="material-symbols-outlined text-sm">nest_eco_leaf</span>
                        <span className="text-xs font-bold uppercase tracking-wider">Live Updates</span>
                    </div>
                    <h3 className="text-white text-5xl font-bold">{city}</h3>
                    <p className="text-white/80 text-xl font-medium">{today}</p>
                    <div className="flex items-center gap-6 mt-4">
                        {loading ? (
                            <div className="text-white/80 text-lg animate-pulse flex items-center gap-2">
                                <span className="material-symbols-outlined animate-spin">refresh</span>
                                Loading live weather...
                            </div>
                        ) : weather ? (
                            <>
                                <div className="flex flex-col">
                                    <span className="text-white text-7xl font-bold">{weather.temp}°C</span>
                                    <span className="text-white/90 text-lg capitalize">{weather.description}</span>
                                </div>
                                <div className="h-16 w-[1px] bg-white/20"></div>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                    <div className="flex flex-col">
                                        <span className="text-white/60 text-xs uppercase">Humidity</span>
                                        <span className="text-white font-bold">{weather.humidity}%</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white/60 text-xs uppercase">Wind</span>
                                        <span className="text-white font-bold">{weather.windSpeed} m/s</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white/60 text-xs uppercase">Feels Like</span>
                                        <span className="text-white font-bold">{weather.feelsLike}°C</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white/60 text-xs uppercase">Icon</span>
                                        <span className="text-white font-bold text-xl">{weather.emoji}</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <span className="text-white/60">Could not load weather data.</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Metric Cards (sidebar) ---
const MetricCards = ({ city }) => {
    const { weather } = useWeather({ city });

    return (
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-xs uppercase">Humidity</span>
                    <span className="material-symbols-outlined text-blue-500">water_drop</span>
                </div>
                <div className="mt-4">
                    <div className="text-3xl font-bold">{weather ? `${weather.humidity}%` : '—'}</div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 mt-4 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-300 to-blue-600 h-full" style={{ width: `${weather?.humidity || 0}%` }}></div>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-xs uppercase">Wind Speed</span>
                    <span className="material-symbols-outlined text-blue-400">air</span>
                </div>
                <div className="mt-4">
                    <div className="text-3xl font-bold">{weather ? <>{weather.windSpeed} <span className="text-lg font-medium text-slate-400">m/s</span></> : '—'}</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Live reading</p>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 shadow-sm flex flex-col justify-between lg:col-span-1 col-span-2">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-xs uppercase">Feels Like</span>
                    <span className="material-symbols-outlined text-primary">thermostat</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-3xl font-bold">{weather ? `${weather.feelsLike}°C` : '—'}</div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase text-slate-400 font-bold">Condition</p>
                        <p className="font-bold capitalize text-sm">{weather?.description || '...'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const LiveWeather = () => {
    const [searchInput, setSearchInput] = useState('');
    const [activeCity, setActiveCity] = useState('Colombo');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setActiveCity(searchInput.trim());
            setSearchInput('');
        }
    };

    return (
        <>
            <Navbar />
            <main className="flex flex-col flex-1 px-4 md:px-20 lg:px-40 py-8 gap-8">
                {/* Search Section */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold tracking-tight">Weather Dashboard</h1>
                    <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
                        <div className="flex w-full items-stretch rounded-xl h-14 bg-white dark:bg-slate-800 shadow-sm border border-primary/10">
                            <div className="text-primary flex items-center justify-center pl-5">
                                <span className="material-symbols-outlined">location_on</span>
                            </div>
                            <input
                                className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 h-full placeholder:text-slate-400 px-4 pl-2 text-lg font-normal"
                                placeholder="Search weather for any city in Sri Lanka..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <button type="submit" className="bg-primary hover:bg-primary/90 text-slate-900 font-bold px-6 rounded-r-xl transition-colors m-1">
                                Search
                            </button>
                        </div>
                    </form>
                    <p className="text-slate-500 text-sm">
                        Showing live weather for: <span className="font-bold text-primary">{activeCity}</span>
                    </p>
                </div>

                {/* Hero Section: Current Weather */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <HeroWeather city={activeCity} />
                    <MetricCards city={activeCity} />
                </div>

                {/* Major Cities Grid */}
                <section className="pb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Major Cities — Live Weather</h2>
                        <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Real-Time</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {CITIES.map(c => (
                            <div key={c.name} onClick={() => setActiveCity(c.name)} className="cursor-pointer">
                                <CityWeatherCard name={c.name} province={c.province} img={c.img} />
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-400 mt-3">💡 Click a city card to view its weather in the hero section above.</p>
                </section>

                {/* Interactive Map Teaser */}
                <section className="bg-primary/5 rounded-2xl p-8 border border-primary/10 mb-12 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-4">Live Weather Map</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">Track rain clouds, wind patterns, and temperature zones across the island in real-time. Plan your travel route with precision.</p>
                        <Link to="/map" className="w-max bg-slate-900 dark:bg-primary text-white dark:text-slate-900 px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined">map</span>
                            Explore Map
                        </Link>
                    </div>
                    <div className="w-full md:w-1/2 h-64 rounded-xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-800">
                        <img alt="Map" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnNKktm-B2PW_i572WIiU3AtQobgBQ7y4u6qrgqNp66MKE4vmDDIVkc28Ye434Ql5cEIp-wyUPWTF9tqjMmOESgH7X5pIKKH6ZvyJ58kOF2BNakYs8jzQ8Rknt4ZMjz5F91OcUiW-Ml-xQ_nwvRd1wiodka54_WdqJqgCCzSnrUOgOigLjKuK0S9De7fVIUhRT4Hz_uiqRxNb37-4Axc1lH_aXClk9RX-6VgPNGznno27WMuW4v4XvHjEy20pTOwnmgLYIGKMTXEY" />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default LiveWeather;
