import React, { useEffect, useState } from "react";

type WeatherData = {
  temperature: number;
  windspeed: number;
};

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=27.7172&longitude=85.3240&current_weather=true"
        );
        const data = await res.json();
        const { temperature, windspeed } = data.current_weather;
        setWeather({ temperature, windspeed });
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="p-4 rounded-2xl shadow-md bg-white  w-full max-w-sm">
      <h2 className="text-xl font-semibold mb-2">Kathmandu Weather</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : weather ? (
        <>
          <p className="text-2xl font-bold text-blue-600">
            {weather.temperature}°C
          </p>
          <p className="text-sm text-gray-600">
            Wind: {weather.windspeed} km/h
          </p>
        </>
      ) : (
        <p className="text-red-500">Could not load weather data</p>
      )}
    </div>
  );
};

export default WeatherWidget;
