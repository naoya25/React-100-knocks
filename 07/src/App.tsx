import React, { useState, useEffect } from "react";
import Forecast from "./types/forecast";
import WeatherCard from "./components/WeatherCard";
import "./style/App.css";

const App: React.FC = () => {
  const [forecast, setForecast] = useState<Forecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          "https://weather.tsukumijima.net/api/forecast?city=420010"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        const forecasts: Forecast[] = data.forecasts.map((forecast: any) => ({
          dateLabel: forecast.dateLabel,
          telop: forecast.telop,
          temperature: forecast.temperature,
          image: forecast.image,
        }));

        setForecast(forecasts);
        setLoading(false);
      } catch (error) {
        setError(`${error}`);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div
      style={{
        width: 400,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: 10,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          borderRadius: 10,
          overflow: "hidden ",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            background: "linear-gradient(45deg, red, purple)",
            padding: 10,
            color: "white",
            fontSize: 25,
            fontWeight: "bold",
          }}
        >
          長崎の天気
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {forecast.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {forecast.map((dailyForecast) => (
              <WeatherCard forecast={dailyForecast} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
