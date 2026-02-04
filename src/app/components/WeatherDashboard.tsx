"use client";

import { useState, useEffect } from "react";
import TodayWeather from "./TodayWeather";
import ForecastTable from "./ForecastTable";

export default function WeatherDashboard() {
  const [coordinates, setCoordinates] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [forecastWeather, setForecastWeather] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    } else {
      setIsValid(false);
    }
  };

  // Debounce effect - waits 2 seconds after user stops typing
  useEffect(() => {
    if (isValid && coordinates.trim() !== "") {
      const timeoutId = setTimeout(() => {
        // Parse coordinates
        const [lat, lon] = coordinates.split(",").map((coord) => coord.trim());
        if (lat && lon) {
          fetchWeatherData(lat, lon);
        }
      }, 2000); // 2 seconds debounce

      return () => clearTimeout(timeoutId);
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
      <div className="max-w-7xl mx-auto space-y-6">
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
              className={`w-full bg-gray-800 text-white placeholder-gray-500 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 transition-all ${
                !isValid && coordinates.trim() !== ""
                  ? "ring-2 ring-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
              placeholder="19.54, -99.17"
            />
          </div>
        </div>

        {/* No Location Message */}
        {!isValid && (
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
        {isLoading && isValid && (
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 border border-blue-700/50 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="text-4xl animate-spin">🌐</span>
              <div>
                <p className="text-blue-200 font-semibold text-lg">
                  Loading weather data...
                </p>
                <p className="text-blue-300/70 text-sm mt-1">
                  Fetching current conditions and forecast
                </p>
              </div>
            </div>
          </div>
        )}

        {isValid && !isLoading && currentWeather && forecastWeather && (
          <>
            {/* Today's Weather */}
            <TodayWeather data={currentWeather} />

            {/* 5-Day Forecast */}
            <ForecastTable data={forecastWeather} />
          </>
        )}

      </div>
    </div>
  );
}
