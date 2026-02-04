interface TodayWeatherProps {
  data: {
    name: string;
    sys: {
      country: string;
    };
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  };
}

export default function TodayWeather({ data }: TodayWeatherProps) {
  // Convert Kelvin to Celsius
  const tempCelsius = Math.round(data.main.temp - 273.15);
  const feelsLikeCelsius = Math.round(data.main.feels_like - 273.15);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl">
      {/* Location */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white">
          {data.name}, {data.sys.country}
        </h2>
        <p className="text-gray-400 text-sm mt-1">Today&apos;s Weather</p>
      </div>

      {/* Main Temperature Display */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-start gap-4">
          <div className="text-7xl font-bold text-white">{tempCelsius}°</div>
          <div className="mt-2">
            <p className="text-2xl text-gray-300 capitalize">
              {data.weather[0].description}
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Feels like {feelsLikeCelsius}°
            </p>
          </div>
        </div>
        
        {/* Weather Icon */}
        <div className="text-6xl">
          {data.weather[0].main === "Clouds" && "☁️"}
          {data.weather[0].main === "Clear" && "☀️"}
          {data.weather[0].main === "Rain" && "🌧️"}
          {data.weather[0].main === "Snow" && "❄️"}
          {data.weather[0].main === "Thunderstorm" && "⛈️"}
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-700">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Humidity</p>
          <p className="text-white text-2xl font-semibold">
            {data.main.humidity}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Wind Speed</p>
          <p className="text-white text-2xl font-semibold">
            {data.wind.speed} m/s
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-1">Pressure</p>
          <p className="text-white text-2xl font-semibold">
            {data.main.pressure} hPa
          </p>
        </div>
      </div>
    </div>
  );
}
