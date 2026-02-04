interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  pop: number;
}

interface ForecastTableProps {
  data: {
    list: ForecastItem[];
  };
}

export default function ForecastTable({ data }: ForecastTableProps) {
  // Convert Kelvin to Celsius
  const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);

  // Format date and time
  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const monthDay = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return { dayName, monthDay, time };
  };

  // Get weather icon
  const getWeatherIcon = (main: string) => {
    switch (main) {
      case "Clouds":
        return "☁️";
      case "Clear":
        return "☀️";
      case "Rain":
        return "🌧️";
      case "Snow":
        return "❄️";
      case "Thunderstorm":
        return "⛈️";
      default:
        return "🌤️";
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Week Forecast</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-gray-400 font-semibold text-sm">
                Date & Time
              </th>
              <th className="text-center py-3 px-4 text-gray-400 font-semibold text-sm">
                Weather
              </th>
              <th className="text-center py-3 px-4 text-gray-400 font-semibold text-sm">
                Temp
              </th>
              <th className="text-center py-3 px-4 text-gray-400 font-semibold text-sm">
                Feels Like
              </th>
              <th className="text-center py-3 px-4 text-gray-400 font-semibold text-sm">
                Humidity
              </th>
              <th className="text-center py-3 px-4 text-gray-400 font-semibold text-sm">
                Wind
              </th>
              <th className="text-center py-3 px-4 text-gray-400 font-semibold text-sm">
                Rain
              </th>
            </tr>
          </thead>
          <tbody>
            {data.list.map((item, index) => {
              const { dayName, monthDay, time } = formatDateTime(item.dt_txt);
              return (
                <tr
                  key={item.dt}
                  className={`border-b border-gray-700/50 hover:bg-gray-800/50 transition-colors ${
                    index % 2 === 0 ? "bg-gray-900/20" : ""
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="text-white font-medium">
                        {dayName}, {monthDay}
                      </span>
                      <span className="text-gray-400 text-sm">{time}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col items-center">
                      <span className="text-3xl mb-1">
                        {getWeatherIcon(item.weather[0].main)}
                      </span>
                      <span className="text-gray-300 text-xs capitalize text-center">
                        {item.weather[0].description}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-white text-lg font-semibold">
                      {kelvinToCelsius(item.main.temp)}°
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-gray-300">
                      {kelvinToCelsius(item.main.feels_like)}°
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-gray-300">{item.main.humidity}%</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-gray-300">
                      {item.wind.speed.toFixed(1)} m/s
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-blue-400">
                      {Math.round(item.pop * 100)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
