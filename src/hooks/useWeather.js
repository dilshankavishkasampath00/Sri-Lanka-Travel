import { useState, useEffect } from 'react';

const OW_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Map OpenWeatherMap icon codes to Material Symbols names + emoji
const getWeatherIcon = (code) => {
    if (!code) return { symbol: 'wb_sunny', emoji: '☀️' };
    const main = code.substring(0, 2);
    switch (main) {
        case '01': return { symbol: 'wb_sunny', emoji: '☀️' };
        case '02': return { symbol: 'partly_cloudy_day', emoji: '⛅' };
        case '03':
        case '04': return { symbol: 'cloud', emoji: '☁️' };
        case '09':
        case '10': return { symbol: 'rainy', emoji: '🌧️' };
        case '11': return { symbol: 'thunderstorm', emoji: '⛈️' };
        case '13': return { symbol: 'weather_snowy', emoji: '❄️' };
        case '50': return { symbol: 'foggy', emoji: '🌫️' };
        default: return { symbol: 'wb_sunny', emoji: '☀️' };
    }
};

/**
 * Fetch live weather for a city name or lat/lng.
 * @param {{ city?: string, lat?: number, lng?: number }} param
 */
export const useWeather = ({ city, lat, lng }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!OW_API_KEY) return;
        if (!city && (lat === undefined || lng === undefined)) return;

        const query = city
            ? `q=${encodeURIComponent(city)}&country=LK`
            : `lat=${lat}&lon=${lng}`;

        const url = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${OW_API_KEY}&units=metric`;

        setLoading(true);
        setError(null);

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error('Weather fetch failed');
                return res.json();
            })
            .then(data => {
                const iconCode = data.weather?.[0]?.icon || '01d';
                const iconInfo = getWeatherIcon(iconCode);
                setWeather({
                    temp: Math.round(data.main.temp),
                    feelsLike: Math.round(data.main.feels_like),
                    humidity: data.main.humidity,
                    description: data.weather[0].description,
                    windSpeed: data.wind.speed,
                    cityName: data.name,
                    icon: iconCode,
                    symbol: iconInfo.symbol,
                    emoji: iconInfo.emoji,
                });
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [city, lat, lng]);

    return { weather, loading, error };
};

export default useWeather;
