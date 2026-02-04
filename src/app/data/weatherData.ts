export const mockCurrentWeather = {
  coord: {
    lon: -99.17,
    lat: 19.54,
  },
  weather: [
    {
      id: 801,
      main: "Clouds",
      description: "few clouds",
      icon: "02d",
    },
  ],
  base: "stations",
  main: {
    temp: 293.59,
    feels_like: 292.42,
    temp_min: 293.59,
    temp_max: 294.03,
    pressure: 1015,
    humidity: 28,
    sea_level: 1015,
    grnd_level: 773,
  },
  visibility: 9656,
  wind: {
    speed: 0,
    deg: 0,
  },
  clouds: {
    all: 20,
  },
  dt: 1770234077,
  sys: {
    type: 2,
    id: 47729,
    country: "MX",
    sunrise: 1770210632,
    sunset: 1770251440,
  },
  timezone: -21600,
  id: 3517642,
  name: "Santa Cecilia Acatitlán",
  cod: 200,
};

export const mockForecastWeather = {
  cod: "200",
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1770238800,
      main: {
        temp: 293.59,
        feels_like: 292.42,
        temp_min: 293.59,
        temp_max: 295.11,
        pressure: 1013,
        sea_level: 1013,
        grnd_level: 773,
        humidity: 28,
        temp_kf: -1.52,
      },
      weather: [
        {
          id: 801,
          main: "Clouds",
          description: "few clouds",
          icon: "02d",
        },
      ],
      clouds: {
        all: 20,
      },
      wind: {
        speed: 2.96,
        deg: 52,
        gust: 3.37,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d",
      },
      dt_txt: "2026-02-04 21:00:00",
    },
    {
      dt: 1770249600,
      main: {
        temp: 293.42,
        feels_like: 292.29,
        temp_min: 293.07,
        temp_max: 293.42,
        pressure: 1014,
        sea_level: 1014,
        grnd_level: 774,
        humidity: 30,
        temp_kf: 0.35,
      },
      weather: [
        {
          id: 801,
          main: "Clouds",
          description: "few clouds",
          icon: "02d",
        },
      ],
      clouds: {
        all: 23,
      },
      wind: {
        speed: 4.08,
        deg: 313,
        gust: 2.79,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d",
      },
      dt_txt: "2026-02-05 00:00:00",
    },
    {
      dt: 1770260400,
      main: {
        temp: 290.22,
        feels_like: 289.21,
        temp_min: 288.53,
        temp_max: 290.22,
        pressure: 1018,
        sea_level: 1018,
        grnd_level: 776,
        humidity: 47,
        temp_kf: 1.69,
      },
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10n",
        },
      ],
      clouds: {
        all: 69,
      },
      wind: {
        speed: 4.68,
        deg: 2,
        gust: 4.46,
      },
      visibility: 10000,
      pop: 0.52,
      rain: {
        "3h": 0.22,
      },
      sys: {
        pod: "n",
      },
      dt_txt: "2026-02-05 03:00:00",
    },
    {
      dt: 1770271200,
      main: {
        temp: 284.66,
        feels_like: 283.59,
        temp_min: 284.66,
        temp_max: 284.66,
        pressure: 1024,
        sea_level: 1024,
        grnd_level: 777,
        humidity: 66,
        temp_kf: 0,
      },
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10n",
        },
      ],
      clouds: {
        all: 96,
      },
      wind: {
        speed: 4.07,
        deg: 15,
        gust: 4.32,
      },
      visibility: 10000,
      pop: 0.69,
      rain: {
        "3h": 0.45,
      },
      sys: {
        pod: "n",
      },
      dt_txt: "2026-02-05 06:00:00",
    },
    {
      dt: 1770282000,
      main: {
        temp: 282.73,
        feels_like: 280.9,
        temp_min: 282.73,
        temp_max: 282.73,
        pressure: 1023,
        sea_level: 1023,
        grnd_level: 776,
        humidity: 68,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      clouds: {
        all: 99,
      },
      wind: {
        speed: 3.46,
        deg: 13,
        gust: 3.6,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "n",
      },
      dt_txt: "2026-02-05 09:00:00",
    },
    {
      dt: 1770292800,
      main: {
        temp: 282.41,
        feels_like: 280.87,
        temp_min: 282.41,
        temp_max: 282.41,
        pressure: 1023,
        sea_level: 1023,
        grnd_level: 777,
        humidity: 64,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04n",
        },
      ],
      clouds: {
        all: 99,
      },
      wind: {
        speed: 2.84,
        deg: 14,
        gust: 2.67,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "n",
      },
      dt_txt: "2026-02-05 12:00:00",
    },
    {
      dt: 1770303600,
      main: {
        temp: 284.18,
        feels_like: 283.04,
        temp_min: 284.18,
        temp_max: 284.18,
        pressure: 1025,
        sea_level: 1025,
        grnd_level: 778,
        humidity: 65,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      clouds: {
        all: 99,
      },
      wind: {
        speed: 3.02,
        deg: 28,
        gust: 2.85,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d",
      },
      dt_txt: "2026-02-05 15:00:00",
    },
    {
      dt: 1770314400,
      main: {
        temp: 287.07,
        feels_like: 285.82,
        temp_min: 287.07,
        temp_max: 287.07,
        pressure: 1023,
        sea_level: 1023,
        grnd_level: 777,
        humidity: 50,
        temp_kf: 0,
      },
      weather: [
        {
          id: 804,
          main: "Clouds",
          description: "overcast clouds",
          icon: "04d",
        },
      ],
      clouds: {
        all: 98,
      },
      wind: {
        speed: 2.34,
        deg: 18,
        gust: 1.83,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d",
      },
      dt_txt: "2026-02-05 18:00:00",
    },
  ],
  city: {
    id: 3517642,
    name: "Santa Cecilia Acatitlán",
    coord: {
      lat: 19.54,
      lon: -99.17,
    },
    country: "MX",
    population: 0,
    timezone: -21600,
    sunrise: 1770210632,
    sunset: 1770251440,
  },
};
