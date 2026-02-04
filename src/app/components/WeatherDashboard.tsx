import TodayWeather from "./TodayWeather";
import ForecastTable from "./ForecastTable";
import { mockCurrentWeather, mockForecastWeather } from "../data/weatherData";

export default function WeatherDashboard() {
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
              className="w-full bg-gray-800 text-white placeholder-gray-500 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="19.54, -99.17"
            />
          </div>
        </div>

        {/* Today's Weather */}
        <TodayWeather data={mockCurrentWeather} />

        {/* 5-Day Forecast */}
        <ForecastTable data={mockForecastWeather} />
      </div>
    </div>
  );
}
