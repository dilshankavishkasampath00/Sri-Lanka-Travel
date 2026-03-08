import React, { createContext, useContext } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const LIBRARIES = ['places'];

const GoogleMapsContext = createContext({ isLoaded: false });

export const GoogleMapsProvider = ({ children }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
        libraries: LIBRARIES,
    });

    return (
        <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
            {children}
        </GoogleMapsContext.Provider>
    );
};

// All pages/components use this instead of calling useJsApiLoader themselves
export const useGoogleMaps = () => useContext(GoogleMapsContext);
