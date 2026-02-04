import TodayWeather from "./TodayWeather";
import ForecastTable from "./ForecastTable";
import { mockCurrentWeather, mockForecastWeather } from "../data/weatherData";

export default function WeatherDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Today's Weather */}
        <TodayWeather data={mockCurrentWeather} />

        {/* 5-Day Forecast */}
        <ForecastTable data={mockForecastWeather} />
      </div>
    </div>
  );
}
