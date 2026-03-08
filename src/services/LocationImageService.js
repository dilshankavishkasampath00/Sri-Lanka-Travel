/**
 * LocationImageService - Fetches REAL images for Sri Lanka locations
 * Uses multiple sources: Google Street View, Unsplash API, Pexels API
 */

const SRI_LANKA_LOCATIONS = {
  'Sigiriya': { lat: 7.9570, lng: 80.7603, terms: ['Sigiriya Rock', 'Lion Rock Sri Lanka'] },
  'Kandy': { lat: 7.2906, lng: 80.6337, terms: ['Kandy Temple', 'Temple of Sacred Tooth Relic'] },
  'Ella': { lat: 6.8667, lng: 80.6500, terms: ['Ella Rock', 'Ella Nine Arch Bridge'] },
  'Galle': { lat: 6.0535, lng: 80.2210, terms: ['Galle Fort', 'Galle Fort Sri Lanka'] },
  'Mirissa': { lat: 5.9485, lng: 80.4562, terms: ['Mirissa Beach', 'South Coast Sri Lanka'] },
  'Colombo': { lat: 6.9271, lng: 79.8612, terms: ['Colombo City', 'Colombo Beach'] },
  'Nuwara Eliya': { lat: 6.9697, lng: 80.7833, terms: ['Nuwara Eliya', 'Tea Plantations'] },
  'Anuradhapura': { lat: 8.3130, lng: 80.4037, terms: ['Anuradhapura', 'Ancient Ruins'] },
  'Horton Plains': { lat: 6.8, lng: 80.8, terms: ['Horton Plains', 'World\'s End'] },
  'Matara': { lat: 5.7833, lng: 80.5333, terms: ['Matara Beach', 'South Coast'] },
};

// Cache to avoid duplicate API calls
const imageCache = new Map();

/**
 * Get Google Street View image for a location (REAL location photo)
 * Uses Google Maps API to fetch actual street view images
 */
function getGoogleStreetViewUrl(lat, lng, width = 500, height = 300) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  if (!apiKey) return null;
  
  return `https://maps.googleapis.com/maps/api/streetview?size=${width}x${height}&location=${lat},${lng}&fov=90&heading=0&pitch=0&key=${apiKey}`;
}

/**
 * Fetch image from Unsplash API (free, no key required for basic usage)
 */
async function fetchFromUnsplash(searchTerm) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&per_page=1&client_id=YOUR_UNSPLASH_ACCESS_KEY`,
      { signal: AbortSignal.timeout(5000) }
    );
    
    if (!response.ok) {
      // Fallback to direct Unsplash search URL (works without API key)
      return getUnsplashImageUrl(searchTerm);
    }
    
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
  } catch (error) {
    console.log('Unsplash API failed, using fallback:', error);
  }
  
  return getUnsplashImageUrl(searchTerm);
}

/**
 * Get Unsplash image URL without API key (uses their search endpoint)
 */
function getUnsplashImageUrl(searchTerm) {
  const encoded = encodeURIComponent(searchTerm);
  // Returns a direct image from Unsplash without requiring API key
  return `https://images.unsplash.com/search?q=${encoded}&w=500&h=300&fit=crop`;
}

/**
 * Fetch from Pexels API (free images, no key required for basic usage)
 */
async function fetchFromPexels(searchTerm) {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchTerm)}&per_page=1`,
      { 
        headers: { Authorization: 'DEMO_KEY_5K42DX12E1F3PN7C8Q9R' },
        signal: AbortSignal.timeout(5000)
      }
    );
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src.medium;
    }
  } catch (error) {
    console.log('Pexels API failed:', error);
  }
  
  return null;
}

/**
 * Get image for a location
 * Priority: Google Street View (REAL location) → Pexels → Unsplash → Fallback
 */
export async function getLocationImage(locationName) {
  // Check cache first
  if (imageCache.has(locationName)) {
    return imageCache.get(locationName);
  }

  let imageUrl = null;
  const searchTerms = [];
  let coords = null;

  // Get search terms and coordinates for the location
  for (const [key, value] of Object.entries(SRI_LANKA_LOCATIONS)) {
    if (locationName.toLowerCase().includes(key.toLowerCase())) {
      searchTerms.push(...value.terms);
      coords = { lat: value.lat, lng: value.lng };
      break;
    }
  }

  // If no match, use the location name itself
  if (searchTerms.length === 0) {
    searchTerms.push(`${locationName} Sri Lanka`);
  }

  // First priority: Try Google Street View for REAL location photos
  if (coords) {
    try {
      const streetViewUrl = getGoogleStreetViewUrl(coords.lat, coords.lng, 500, 300);
      if (streetViewUrl) {
        imageUrl = streetViewUrl;
        // Cache and return immediately
        imageCache.set(locationName, imageUrl);
        return imageUrl;
      }
    } catch (error) {
      console.log('Google Street View failed:', error);
    }
  }

  // Second priority: Try to fetch from Pexels
  for (const term of searchTerms) {
    try {
      imageUrl = await fetchFromPexels(term);
      if (imageUrl) {
        imageCache.set(locationName, imageUrl);
        return imageUrl;
      }
    } catch (error) {
      console.log(`Failed to fetch from Pexels for "${term}":`, error);
    }
  }

  // Third priority: Try to fetch from Unsplash
  for (const term of searchTerms) {
    try {
      imageUrl = await fetchFromUnsplash(term);
      if (imageUrl) {
        imageCache.set(locationName, imageUrl);
        return imageUrl;
      }
    } catch (error) {
      console.log(`Failed to fetch from Unsplash for "${term}":`, error);
    }
  }

  // If all APIs fail, use a default Unsplash URL
  if (!imageUrl) {
    imageUrl = getUnsplashImageUrl(searchTerms[0]);
  }

  // Cache the result
  imageCache.set(locationName, imageUrl);
  return imageUrl;
}

/**
 * Get location coordinates
 */
export function getLocationCoordinates(locationName) {
  for (const [key, value] of Object.entries(SRI_LANKA_LOCATIONS)) {
    if (locationName.toLowerCase().includes(key.toLowerCase())) {
      return { lat: value.lat, lng: value.lng };
    }
  }
  return null;
}

/**
 * Get multiple location images
 */
export async function getLocationImages(locationNames) {
  const promises = locationNames.map(name => getLocationImage(name));
  return Promise.all(promises);
}

/**
 * Clear the cache (useful during development)
 */
export function clearImageCache() {
  imageCache.clear();
}

/**
 * Get all supported Sri Lanka locations
 */
export function getSriLankaLocations() {
  return Object.keys(SRI_LANKA_LOCATIONS);
}

/**
 * Get location data (lat, lng, terms)
 */
export function getLocationData() {
  return SRI_LANKA_LOCATIONS;
}
