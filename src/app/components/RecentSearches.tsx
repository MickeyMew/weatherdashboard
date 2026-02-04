"use client";

import { useEffect, useState } from "react";

interface SearchHistory {
  lat: string;
  lon: string;
  locationName: string;
  temperature: number;
  timestamp: number;
}

interface RecentSearchesProps {
  onSelectSearch: (lat: string, lon: string) => void;
}

export default function RecentSearches({ onSelectSearch }: RecentSearchesProps) {
  const [searches, setSearches] = useState<SearchHistory[]>([]);

  useEffect(() => {
    // Load searches from localStorage
    loadSearches();

    // Listen for custom event when new search is added
    const handleUpdate = () => loadSearches();
    window.addEventListener("searchHistoryUpdated", handleUpdate);

    return () => {
      window.removeEventListener("searchHistoryUpdated", handleUpdate);
    };
  }, []);

  const loadSearches = () => {
    try {
      const stored = localStorage.getItem("weatherSearchHistory");
      if (stored) {
        const allSearches: SearchHistory[] = JSON.parse(stored);
        // Filter only today's searches
        const today = new Date().setHours(0, 0, 0, 0);
        const todaySearches = allSearches.filter(
          (search) => new Date(search.timestamp).setHours(0, 0, 0, 0) === today
        );
        // Get last 5 (stack behavior - last in, first to show)
        setSearches(todaySearches.slice(-5).reverse());
      }
    } catch (error) {
      console.error("Error loading search history:", error);
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSearchClick = (search: SearchHistory) => {
    onSelectSearch(search.lat, search.lon);
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem("weatherSearchHistory");
      setSearches([]);
    } catch (error) {
      console.error("Error clearing search history:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl h-fit sticky top-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🕐</span>
          <h2 className="text-xl font-bold text-white">Recent Searches</h2>
        </div>
        {searches.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium cursor-pointer"
            title="Clear all searches"
          >
            Clear All
          </button>
        )}
      </div>

      {searches.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">No searches yet today</p>
          <p className="text-gray-500 text-xs mt-2">
            Your search history will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {searches.map((search, index) => (
            <button
              key={`${search.timestamp}-${index}`}
              onClick={() => handleSearchClick(search)}
              className="w-full bg-gray-800 hover:bg-gray-750 rounded-xl p-4 transition-colors text-left group cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors">
                      {search.locationName}
                    </p>
                    <span className="text-blue-400 font-bold text-lg">
                      {Math.round(search.temperature - 273.15)}°
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">
                    {search.lat}, {search.lon}
                  </p>
                </div>
                <span className="text-gray-500 text-xs ml-2">
                  {formatTime(search.timestamp)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper function to add a search to history (to be called from WeatherDashboard)
export const addSearchToHistory = (
  lat: string,
  lon: string,
  locationName: string,
  temperature: number
) => {
  try {
    const stored = localStorage.getItem("weatherSearchHistory");
    let searches: SearchHistory[] = stored ? JSON.parse(stored) : [];

    // Add new search to the end (stack behavior)
    searches.push({
      lat,
      lon,
      locationName,
      temperature,
      timestamp: Date.now(),
    });

    // Clean up old searches (keep only today's + new one)
    const today = new Date().setHours(0, 0, 0, 0);
    searches = searches.filter(
      (search) => new Date(search.timestamp).setHours(0, 0, 0, 0) === today
    );

    localStorage.setItem("weatherSearchHistory", JSON.stringify(searches));

    // Dispatch custom event to notify RecentSearches component
    window.dispatchEvent(new Event("searchHistoryUpdated"));
  } catch (error) {
    console.error("Error saving search history:", error);
  }
};
