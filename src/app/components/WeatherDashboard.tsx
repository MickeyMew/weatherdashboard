"use client";

import { useState, useEffect, useRef } from "react";
import TodayWeather from "./TodayWeather";
import ForecastTable from "./ForecastTable";
import RecentSearches, { addSearchToHistory } from "./RecentSearches";
import dynamic from "next/dynamic";

// Dynamically import map component to avoid SSR issues
const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-gray-800 rounded-xl flex items-center justify-center">
      <p className="text-gray-400">Loading map...</p>
    </div>
  ),
});

export default function WeatherDashboard() {
  const [coordinates, setCoordinates] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecastWeather, setForecastWeather] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingToSearch, setIsWaitingToSearch] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const recentSearchesRef = useRef<any>(null);

  // Validate coordinate format (lat, lon)
  const validateCoordinates = (value: string) => {
    if (value.trim() === "") {
      setIsValid(false);
      return false;
    }

    // Check for pattern: number, number (with optional spaces)
    const coordPattern = /^-?\d+\.?\d*\s*,\s*-?\d+\.?\d*$/;
    const valid = coordPattern.test(value.trim());
    setIsValid(valid);
    return valid;
  };

  // Fetch weather data from API
  const fetchWeatherData = async (lat: string, lon: string) => {
    setIsLoading(true);
    try {
      // Fetch current weather and forecast in parallel
      const [currentRes, forecastRes] = await Promise.all([
        fetch(`/api/weather/current?lat=${lat}&lon=${lon}`),
        fetch(`/api/weather/forecast?lat=${lat}&lon=${lon}`),
      ]);

      if (currentRes.ok && forecastRes.ok) {
        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();
        setCurrentWeather(currentData);
        setForecastWeather(forecastData);

        // Add to search history
        const locationName = currentData.name || `${lat}, ${lon}`;
        const temperature = currentData.main.temp;
        addSearchToHistory(lat, lon, locationName, temperature);
      } else {
        console.error("Failed to fetch weather data");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoordinateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCoordinates(value);
    if (value.trim() !== "") {
      validateCoordinates(value);
      setIsWaitingToSearch(true);
    } else {
      setIsValid(false);
      setIsWaitingToSearch(false);
    }
  };

  const handleMapLocationSelect = (lat: number, lon: number) => {
    const coords = `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
    setCoordinates(coords);
    setIsValid(true);
    setShowMap(false);
  };

  const handleRecentSearchSelect = (lat: string, lon: string) => {
    setCoordinates(`${lat}, ${lon}`);
    setIsValid(true);
  };

  // Debounce effect - waits 2 seconds after user stops typing
  useEffect(() => {
    if (isValid && coordinates.trim() !== "") {
      setIsWaitingToSearch(true);
      const timeoutId = setTimeout(() => {
        // Parse coordinates
        const [lat, lon] = coordinates.split(",").map((coord) => coord.trim());
        if (lat && lon) {
          setIsWaitingToSearch(false);
          fetchWeatherData(lat, lon);
        }
      }, 2000); // 2 seconds debounce

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setIsWaitingToSearch(false);
    }
  }, [coordinates, isValid]);

  useEffect(() => {
    // Get user's location from browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(2);
          const lon = position.coords.longitude.toFixed(2);
          const coords = `${lat}, ${lon}`;
          setCoordinates(coords);
          setIsValid(true);
        },
        (error) => {
          // User denied permission or error occurred, leave empty
          console.log("Location access denied or unavailable");
          setIsValid(false);
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Search Box */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={coordinates}
              onChange={handleCoordinateChange}
              className={`w-full bg-gray-800 text-white placeholder-gray-500 rounded-xl py-3 pl-12 pr-20 focus:outline-none focus:ring-2 transition-all ${
                !isValid && coordinates.trim() !== ""
                  ? "ring-2 ring-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
              placeholder="19.54, -99.17"
            />
            <button
              onClick={() => setShowMap(!showMap)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Open map"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </button>
          </div>

          {/* Interactive Map */}
          {showMap && (
            <div className="mt-4">
              <LocationMap
                onLocationSelect={handleMapLocationSelect}
                initialLat={
                  coordinates.trim()
                    ? parseFloat(coordinates.split(",")[0])
                    : 19.54
                }
                initialLon={
                  coordinates.trim()
                    ? parseFloat(coordinates.split(",")[1])
                    : -99.17
                }
              />
            </div>
          )}
        </div>

        {/* No Location Message */}
        {!isValid && !isWaitingToSearch && (
          <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border border-yellow-700/50 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="text-4xl">📍</span>
              <div>
                <p className="text-yellow-200 font-semibold text-lg">
                  No location selected
                </p>
                <p className="text-yellow-300/70 text-sm mt-1">
                  {coordinates.trim() === ""
                    ? "Please enter coordinates or allow location access to see weather data"
                    : "Invalid coordinate format. Please use: latitude, longitude (e.g., 19.54, -99.17)"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {(isLoading || isWaitingToSearch) && isValid && (
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700/50 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="text-4xl animate-spin">🌐</span>
              <div>
                <p className="text-blue-200 font-semibold text-lg">
                  Loading...
                </p>
              </div>
            </div>
          </div>
        )}

        {isValid && !isLoading && !isWaitingToSearch && currentWeather && forecastWeather && (
          <>
            {/* Today's Weather */}
            <TodayWeather data={currentWeather} />

            {/* 5-Day Forecast */}
            <ForecastTable data={forecastWeather} />
          </>
        )}
          </div>

          {/* Recent Searches Sidebar */}
          <div className="w-80 flex-shrink-0">
            <RecentSearches onSelectSearch={handleRecentSearchSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}
