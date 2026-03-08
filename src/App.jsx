import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Destinations from "./pages/Destinations";
import Login from "./pages/Login";
import DestinationDetails from './pages/DestinationDetails';
import InteractiveMap from './pages/InteractiveMap';
import LiveWeather from './pages/LiveWeather';
import NearbyHotels from './pages/NearbyHotels';
import TravelerReviews from './pages/TravelerReviews';
import AiTripPlanner from './pages/AiTripPlanner';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
        <Route path="/map" element={<InteractiveMap />} />
        <Route path="/weather" element={<LiveWeather />} />
        <Route path="/hotels" element={<NearbyHotels />} />
        <Route path="/reviews" element={<TravelerReviews />} />
        <Route path="/trip-planner" element={<AiTripPlanner />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
