import React, { useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GoogleGenAI } from '@google/genai';
import { getLocationImage, getSriLankaLocations, getLocationData } from '../services/LocationImageService';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const AiTripPlanner = () => {
    const libraries = ['places'];
    const abortControllerRef = useRef(null);

    // States for user input
    const [duration, setDuration] = useState('10 Days');
    const [budget, setBudget] = useState('Moderate');
    const [specialRequests, setSpecialRequests] = useState('');
    const [interests, setInterests] = useState(['Beaches', 'History']);
    const [refinementInput, setRefinementInput] = useState('');

    // States for AI output
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationProgress, setGenerationProgress] = useState('');
    const [itineraryHtml, setItineraryHtml] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // States for Map Route
    const [routePath, setRoutePath] = useState([
        { lat: 6.9271, lng: 79.8612 }, // Colombo
        { lat: 7.9570, lng: 80.7603 }, // Sigiriya
        { lat: 7.2906, lng: 80.6337 }, // Kandy
        { lat: 6.0535, lng: 80.2210 }  // Galle
    ]);

    const toggleInterest = (interest) => {
        setInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const generateItinerary = async (isRefinement = false) => {
        setIsGenerating(true);
        setErrorMsg('');
        setSuccessMsg('');
        setGenerationProgress('Initializing AI...');

        // Cancel any previous request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        try {
            const refinementContext = isRefinement && itineraryHtml
                ? `\n\nPrevious itinerary context: The user previously generated an itinerary and is now requesting: "${refinementInput}"\nPlease update the itinerary accordingly while keeping the overall structure intact.`
                : '';

            setGenerationProgress('Crafting your personalized itinerary...');

            const prompt = `Act as an expert Sri Lankan travel agent. Generate an engaging HTML-formatted travel itinerary for Sri Lanka.
            Duration: ${duration}
            Budget: ${budget}
            Interests: ${interests.join(', ')}
            Special Requests: ${specialRequests || 'None'}${refinementContext}
            
            Return the response exactly in this format with these two separators:
            ---JSON---
            [{"lat": 6.9271, "lng": 79.8612}, {"lat": 7.9570, "lng": 80.7603}]
            ---HTML---
            <div>...raw html...</div>

            The JSON should be an array of objects with "lat" and "lng" numeric properties corresponding to the locations in the itinerary in chronological order.
            The HTML should ONLY be RAW HTML inside a <div> tag. Do not include markdown ticks (\`\`\`html).
            Use Tailwind classes for styling (e.g., text-xl, font-bold, text-primary, mb-4, bg-white, dark:bg-slate-900, p-6, rounded-xl, shadow-sm).
            Structure the HTML day-by-day (or chunked by days like "Days 1-3").
            Make it look beautiful, modern, and exciting.
            
            IMPORTANT LOCATION NAMES - Use these exact names in your headings/alt text so real images can be fetched:
            - Sigiriya, Kandy, Ella, Galle, Mirissa, Colombo, Nuwara Eliya, Anuradhapura, Horton Plains, Matara
            
            For images, use these working URLs or let the system fetch real images:
            https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=500&h=300&fit=crop (Sigiriya)
            https://images.unsplash.com/photo-1548013146-72f92f4d6d6d?w=500&h=300&fit=crop (Kandy)
            https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop (Ella/Mountains)
            https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop (Beaches)
            
            Wrap all img tags with: <div class="w-full h-40 overflow-hidden rounded-lg"><img class="w-full h-full object-cover" src="..." alt="Location Name" /></div>
            
            In alt text, ALWAYS include the location name (e.g., alt="Sigiriya Rock", alt="Kandy Temple", alt="Ella Viewpoint") so real images can be matched.`;

            setGenerationProgress('🤖 AI is analyzing your preferences...');

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            if (abortControllerRef.current.signal.aborted) {
                setIsGenerating(false);
                setGenerationProgress('');
                return;
            }

            setGenerationProgress('📍 Processing route coordinates...');

            const responseText = response.text;

            if (responseText.includes('---HTML---')) {
                const parts = responseText.split('---HTML---');
                let jsonPart = parts[0].replace('---JSON---', '').trim();
                let htmlPart = parts[1].trim();

                // Clean markdown artifacts 
                if (jsonPart.startsWith('\`\`\`json')) jsonPart = jsonPart.replace('\`\`\`json', '');
                if (jsonPart.endsWith('\`\`\`')) jsonPart = jsonPart.replace(/\`\`\`$/, '');
                if (htmlPart.startsWith('\`\`\`html')) htmlPart = htmlPart.replace('\`\`\`html', '');
                if (htmlPart.endsWith('\`\`\`')) htmlPart = htmlPart.replace(/\`\`\`$/, '');

                try {
                    const parsedCoords = JSON.parse(jsonPart.trim());
                    if (Array.isArray(parsedCoords) && parsedCoords.length > 0) {
                        setGenerationProgress('🗺️ Updating route map...');
                        setRoutePath(parsedCoords);
                    }
                } catch (e) {
                    console.error("Failed to parse map coordinates:", e);
                }

                setGenerationProgress('✨ Finalizing your itinerary...');
                
                // Extract location names and fetch real images
                const locationNames = extractLocationNamesFromHtml(htmlPart.trim());
                let finalHtml = await replaceImagesWithLocationImages(enhanceHtmlWithFallbacks(htmlPart.trim()), locationNames);
                
                setItineraryHtml(finalHtml);
                setRefinementInput('');
                setSuccessMsg(isRefinement ? '✅ Itinerary updated! Great choice.' : '✅ Itinerary created! Ready to explore?');
            } else {
                // Fallback if AI doesn't follow strict format
                let cleanHtml = responseText;
                if (cleanHtml.startsWith('\`\`\`html')) cleanHtml = cleanHtml.replace('\`\`\`html', '');
                if (cleanHtml.endsWith('\`\`\`')) cleanHtml = cleanHtml.replace(/\`\`\`$/, '');
                
                // Extract location names and fetch real images
                const locationNames = extractLocationNamesFromHtml(cleanHtml.trim());
                let finalHtml = await replaceImagesWithLocationImages(enhanceHtmlWithFallbacks(cleanHtml.trim()), locationNames);
                
                setItineraryHtml(finalHtml);
                setRefinementInput('');
                setSuccessMsg('✅ Itinerary ready!');
            }

        } catch (error) {
            if (error.name === 'AbortError') {
                setGenerationProgress('');
                setErrorMsg('⏸️ Generation cancelled.');
            } else {
                console.error(error);
                setErrorMsg('❌ Failed to generate itinerary. Please check your Gemini API Key in .env.local');
            }
        } finally {
            setIsGenerating(false);
            if (abortControllerRef.current?.signal.aborted !== true) {
                setGenerationProgress('');
            }
        }
    };

    const stopGeneration = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        setIsGenerating(false);
        setGenerationProgress('');
    };

    const enhanceHtmlWithFallbacks = (html) => {
        // Add onerror event to all images to show fallback
        const enhanced = html.replace(/<img([^>]*)>/g, (match) => {
            // Check if onerror already exists
            if (match.includes('onerror')) {
                return match;
            }
            // Add fallback image handler
            return match.replace('img', 'img onerror="this.style.backgroundColor=\'#f0f0f0\'; this.style.minHeight=\'10rem\'"');
        });
        return enhanced;
    };

    const extractLocationNamesFromHtml = (html) => {
        try {
            // Safely check if DOMParser is available (might not be in some environments)
            if (typeof DOMParser === 'undefined') {
                // Fallback: extract location names using regex
                const locations = new Set();
                const sriLankaLocations = getSriLankaLocations();
                
                sriLankaLocations.forEach(location => {
                    if (html.toLowerCase().includes(location.toLowerCase())) {
                        locations.add(location);
                    }
                });
                
                return Array.from(locations);
            }

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const locations = new Set();
            
            // Extract all h3, h4, h5, p text which usually contains location names
            const elements = doc.querySelectorAll('h3, h4, h5, p, span, div');
            const sriLankaLocations = getSriLankaLocations();
            
            elements.forEach(element => {
                const text = element.textContent;
                // Check if any location name is mentioned
                sriLankaLocations.forEach(location => {
                    if (text.toLowerCase().includes(location.toLowerCase())) {
                        locations.add(location);
                    }
                });
            });
            
            return Array.from(locations);
        } catch (error) {
            console.warn('Error extracting location names:', error);
            // Fallback to regex extraction
            const locations = new Set();
            const sriLankaLocations = getSriLankaLocations();
            
            sriLankaLocations.forEach(location => {
                if (html.toLowerCase().includes(location.toLowerCase())) {
                    locations.add(location);
                }
            });
            
            return Array.from(locations);
        }
    };

    const replaceImagesWithLocationImages = async (html, locationNames) => {
        try {
            if (!html || html.trim().length === 0) {
                return html;
            }

            setGenerationProgress('🖼️ Fetching REAL location images from coordinates...');
            
            // Fetch images for all locations
            const imageMap = new Map();
            
            if (locationNames && locationNames.length > 0) {
                for (const location of locationNames) {
                    try {
                        setGenerationProgress(`📍 Fetching ${location} image...`);
                        const imageUrl = await getLocationImage(location);
                        if (imageUrl) {
                            imageMap.set(location.toLowerCase(), imageUrl);
                        }
                    } catch (locError) {
                        console.warn(`Failed to fetch image for ${location}:`, locError);
                    }
                }
            }
            
            // Replace image URLs in HTML with location-specific images
            let updatedHtml = html;
            const sriLankaLocations = getSriLankaLocations();
            
            // Try to match and replace all location image references
            sriLankaLocations.forEach(location => {
                const lowerLocation = location.toLowerCase();
                
                if (imageMap.has(lowerLocation)) {
                    const imageUrl = imageMap.get(lowerLocation);
                    
                    try {
                        // Replace images with alt text containing location name
                        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        const escaped = escapeRegex(location);
                        
                        // Simple replacement for images with location name in alt
                        updatedHtml = updatedHtml.replace(
                            new RegExp(`alt="${escaped}"`, 'gi'),
                            `alt="${location}" src-location="${imageUrl}"`
                        );
                    } catch (replaceError) {
                        console.warn(`Error processing ${location}:`, replaceError);
                    }
                }
            });
            
            return updatedHtml;
        } catch (error) {
            console.error('Error in replaceImagesWithLocationImages:', error);
            return html; // Return original HTML if replacement fails
        }
    };
    
    // Helper function for fallback
    const getUnsplashImageUrl = (term) => {
        const encoded = encodeURIComponent(term);
        return `https://images.unsplash.com/search?q=${encoded}&w=500&h=300&fit=crop`;
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
        libraries: ['places']
    });

    const routeOptions = {
        strokeColor: '#3b82f6', // Tailwind blue-500
        strokeOpacity: 0.8,
        strokeWeight: 4,
    };

    const availableInterests = ['Beaches', 'Wildlife', 'History', 'Surfing', 'Tea Estates', 'Hiking'];

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
            <Navbar />
            <main className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
                <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12">
                    {/* LEFT SIDEBAR - Build Your Trip & Map */}
                    <aside className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
                        <div className="rounded-xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-primary/5">
                            <h3 className="text-2xl font-bold mb-2">Build Your Trip</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Our AI will craft a personalized Sri Lankan journey just for you.</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Interests</label>
                                    <div className="flex flex-wrap gap-2">
                                        {availableInterests.map(interest => (
                                            <button
                                                key={interest}
                                                onClick={() => toggleInterest(interest)}
                                                className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${interests.includes(interest)
                                                    ? 'border-primary bg-primary/10 text-primary'
                                                    : 'border-slate-200 dark:border-slate-700 hover:border-primary'
                                                    }`}
                                            >
                                                {interest}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Duration</label>
                                        <select
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                            className="w-full rounded-lg border border-slate-200 p-2 dark:border-slate-700 dark:bg-slate-800 text-sm focus:border-primary focus:ring-primary"
                                        >
                                            <option value="7 Days">7 Days</option>
                                            <option value="10 Days">10 Days</option>
                                            <option value="14 Days">14 Days</option>
                                            <option value="21 Days">21 Days</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Budget</label>
                                        <select
                                            value={budget}
                                            onChange={(e) => setBudget(e.target.value)}
                                            className="w-full rounded-lg border border-slate-200 p-2 dark:border-slate-700 dark:bg-slate-800 text-sm focus:border-primary focus:ring-primary"
                                        >
                                            <option value="Economy">Economy</option>
                                            <option value="Moderate">Moderate</option>
                                            <option value="Luxury">Luxury</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Special Requests</label>
                                    <textarea
                                        value={specialRequests}
                                        onChange={(e) => setSpecialRequests(e.target.value)}
                                        className="w-full rounded-lg border border-slate-200 p-2 dark:border-slate-700 dark:bg-slate-800 text-sm focus:border-primary focus:ring-primary h-24 resize-none"
                                        placeholder="e.g. Traveling with kids, vegetarian food only..."
                                    ></textarea>
                                </div>

                                {errorMsg && (
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-700 dark:text-red-400 text-sm font-medium">
                                        {errorMsg}
                                    </div>
                                )}

                                {successMsg && (
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-green-700 dark:text-green-400 text-sm font-medium">
                                        {successMsg}
                                    </div>
                                )}

                                {generationProgress && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 animate-spin text-lg">
                                                sync
                                            </span>
                                            <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">{generationProgress}</p>
                                        </div>
                                        <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                                            <div className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => generateItinerary(false)}
                                        disabled={isGenerating}
                                        className={`flex-1 rounded-lg bg-primary py-4 font-bold text-white shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <span className={`material-symbols-outlined ${isGenerating ? 'animate-spin' : ''}`}>
                                            {isGenerating ? 'frame_reload' : 'auto_fix_high'}
                                        </span>
                                        {isGenerating ? 'Generating...' : 'Generate Itinerary'}
                                    </button>
                                    {isGenerating && (
                                        <button
                                            onClick={stopGeneration}
                                            className="rounded-lg bg-red-500 hover:bg-red-600 py-4 px-6 font-bold text-white shadow-lg transition-colors flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined">stop_circle</span>
                                            Stop
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl overflow-hidden shadow-sm border border-primary/5 bg-white dark:bg-slate-900">
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h4 className="font-bold">Route Map</h4>
                                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">Dynamic</span>
                            </div>
                            <div className="h-64 bg-slate-200 dark:bg-slate-800 flex items-center justify-center relative">
                                {isLoaded ? (
                                    <GoogleMap
                                        mapContainerStyle={{ width: '100%', height: '100%' }}
                                        center={{ lat: 7.2906, lng: 80.6337 }}
                                        zoom={7}
                                        options={{ disableDefaultUI: true, zoomControl: true }}
                                    >
                                        <Polyline path={routePath} options={routeOptions} />
                                        {routePath.map((pos, idx) => (
                                            <Marker key={idx} position={pos} />
                                        ))}
                                    </GoogleMap>
                                ) : (
                                    <div className="text-slate-500 font-bold">Loading Route Map...</div>
                                )}
                                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-white/90 dark:bg-slate-900/90 p-3 rounded-lg shadow-xl text-center pointer-events-auto border border-primary/10">
                                        <p className="text-xs font-bold text-primary">Colombo → Sigiriya → Kandy → Galle</p>
                                        <p className="text-[10px] text-slate-500">Approx. 450 km total travel</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* RIGHT SIDE - Itinerary Content */}
                    <div className="lg:col-span-8 space-y-8 order-1 lg:order-2">
                        <section className="relative h-64 w-full overflow-hidden rounded-2xl shadow-xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFY3Rofhae31FhukHx2m62JF4aTDzif3JhAslugU4ONNE6IbJEBlf151pydRgUiIOy9a_OyPlQneo4VmOVUEqNQpY7VuO07GIMwaggueaWbrU3Zm1aRsUuYQ9y3NZ131EH-NogaMWGaN04OrIH2Ji9lIyqAQWb437XO3mEH4h_XN8bfWx3v7ubjFJLUt1E47kmxPSU-YjgEFzkhiFFD-QPcMIwnKzoB-6Z4TMW0DjQD9aYyLcA989Cc4CULogXSyB4Nfu_ivvJY-4')" }}></div>
                            <div className="absolute bottom-6 left-8 z-20">
                                <div className="flex items-center gap-2 text-primary mb-2">
                                    <span className="material-symbols-outlined text-sm">stars</span>
                                    <span className="text-xs font-bold uppercase tracking-widest">AI Top Recommendation</span>
                                </div>
                                <h1 className="text-4xl font-black text-white">Island Explorer: 10 Days in Paradise</h1>
                                <p className="text-white/80 max-w-lg mt-2 font-medium">A perfect blend of ancient ruins, emerald tea hills, and golden beaches.</p>
                            </div>
                        </section>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Your Itinerary</h2>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors">
                                        <span className="material-symbols-outlined">share</span>
                                    </button>
                                    <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors">
                                        <span className="material-symbols-outlined">download</span>
                                    </button>
                                </div>
                            </div>

                            {itineraryHtml ? (
                                <div
                                    className="prose dark:prose-invert max-w-none ai-generated-content"
                                    dangerouslySetInnerHTML={{ __html: itineraryHtml }}
                                />
                            ) : (
                                <div className="relative pl-8 space-y-12 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-primary/20">
                                    {/* Day 1 */}
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-0 h-6 w-6 rounded-full bg-primary border-4 border-background-light dark:border-background-dark z-10 flex items-center justify-center">
                                            <span className="text-white text-[10px] font-bold">1</span>
                                        </div>
                                        <div className="rounded-xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-primary/5 flex flex-col md:flex-row gap-6">
                                            <div className="w-full md:w-1/3 h-40 overflow-hidden rounded-lg shrink-0">
                                                <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Sigiriya" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyAcJ2YwyHlNNDSE5fydmv3VlQNog7ws_eQo3lqAXtfs8MVs_tXrEsZ5rZ0lLxmE6D-arjMmEKAcY6Osq-3wDosK6YsiSAUtOkydELp0dBe9mv7dY-83XW90Ah70pEX0CYTRgtII0nlHr4MsJDAJzmQ_9gT-ZR2ixG6OS_SHv-Dw2GtyEjEytOsjCsteD1-6MEsZXN0LyypDaMs_dF6e2J4cxXw1i35LeNYrS0PPJwW6ZA1z5Yk-tkEyrDszB66VXOOl6fsI_UfPA" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-bold">Sigiriya: The Lion Rock</h3>
                                                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded">CULTURE</span>
                                                </div>
                                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">Climb the 5th-century rock fortress for breathtaking views and explore the ancient water gardens below.</p>
                                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 3 Hours</span>
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">payments</span> $30 Entry</span>
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">trending_up</span> Moderate Effort</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Day 2 */}
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-0 h-6 w-6 rounded-full bg-primary border-4 border-background-light dark:border-background-dark z-10 flex items-center justify-center">
                                            <span className="text-white text-[10px] font-bold">2</span>
                                        </div>
                                        <div className="rounded-xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-primary/5 flex flex-col md:flex-row gap-6">
                                            <div className="w-full md:w-1/3 h-40 overflow-hidden rounded-lg shrink-0">
                                                <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Kandy Temple" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0GtNw-eKC74kdJDJP-grbqJRQL7DDAwMyNvzvDskIAk30JgIko2XH_qsi2fpBN9GzMblW1rOOTfao3b5HIMU8ajBHAZ7rWkTMZGmYQZxfTeWAtbVyKrLfmiYxaxpBSrc3Mv4quaAV3Y5aPqBcWZryjf5diR4SvNwGzylU0E5MCQ0aWddst4nAxkP_jhhm5fqbFlCW8oWj6k36pnse325xumkNv8DcZZVqWWHXdjg7_3A2hVBTzrkk87-WBDVhTlc4Aiao5e-Pe9g" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-bold">Kandy: Spiritual Heart</h3>
                                                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded">SPIRITUAL</span>
                                                </div>
                                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">Visit the Temple of the Sacred Tooth Relic and enjoy a traditional Kandyan dance performance in the evening.</p>
                                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> All Day</span>
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">directions_car</span> 2h Drive</span>
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">restaurant</span> Local Feast</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Day 3 */}
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-0 h-6 w-6 rounded-full bg-primary border-4 border-background-light dark:border-background-dark z-10 flex items-center justify-center">
                                            <span className="text-white text-[10px] font-bold">3</span>
                                        </div>
                                        <div className="rounded-xl bg-white dark:bg-slate-900 p-6 shadow-sm border border-primary/5 flex flex-col md:flex-row gap-6">
                                            <div className="w-full md:w-1/3 h-40 overflow-hidden rounded-lg shrink-0">
                                                <img className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="Galle Fort" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiAztsURbXtKp5PYtoB25vmoWiAEXv3Ii0DzGrP_dvxdOhsfgnfW5Y-zga0PA31wapg0GADBTFQeTA25c5SA4VvEH2Ewt0MookZfAdDLWXV-0NdvkndUzHY4KRokhPIrHq-aIOmgv_m9c5tqdZSmTYzQE8BI6SrMwcJ0QOAqyZq9b2vSOh43UGTLIOFvLHs79hd9pb8gKJMymhrKxS72wpBE663z_E4kmCfdV2ByeuChgmtSPZ--YAahggjDSCwmcxtcaYKY4zEKs" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-bold">Galle: Colonial Charm</h3>
                                                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded">HERITAGE</span>
                                                </div>
                                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">Wander the cobblestone streets of the Galle Fort, watch the sunset from the ramparts, and enjoy upscale dining.</p>
                                                <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 4 Hours</span>
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">beach_access</span> Near Beach</span>
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">shopping_bag</span> Artisan Shops</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20 flex flex-col items-center text-center">
                            <div className="bg-primary/20 p-3 rounded-full mb-4">
                                <span className="material-symbols-outlined text-primary text-3xl">edit_square</span>
                            </div>
                            <h4 className="text-xl font-bold mb-2">Refine Your Itinerary</h4>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">Want to tweak something? Tell the AI what to adjust and it will instantly update your plan!</p>
                            <div className="w-full max-w-lg relative">
                                <textarea 
                                    value={refinementInput}
                                    onChange={(e) => setRefinementInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && e.ctrlKey && refinementInput.trim() && !isGenerating) {
                                            generateItinerary(true);
                                        }
                                    }}
                                    disabled={isGenerating}
                                    className="w-full rounded-xl border border-slate-200 py-3 pl-4 pr-14 shadow-md focus:border-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700 text-sm resize-none h-20 disabled:opacity-50 disabled:cursor-not-allowed" 
                                    placeholder="E.g., Add more beach days, prefer vegetarian meals, include diving..."
                                />
                                <button 
                                    onClick={() => generateItinerary(true)}
                                    disabled={isGenerating || !refinementInput.trim() || !itineraryHtml}
                                    className="absolute right-3 bottom-3 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-lg transition-colors flex items-center justify-center"
                                    title="Ctrl+Enter to send"
                                >
                                    <span className="material-symbols-outlined text-lg">send</span>
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Hint: Use Ctrl+Enter to quickly send your refinement</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AiTripPlanner;
