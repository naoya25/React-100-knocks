import React from "react";
import Forecast from "../types/forecast";

const WeatherCard: React.FC<{ forecast: Forecast }> = ({ forecast }) => {
  return (
    <div
      className="card"
      style={{
        transition: "transform 0.3s ease",
        background: "rgb(240, 240, 240)",
        borderRadius: 10,
        padding: 10,
        margin: 20,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p style={{ fontWeight: "bold", fontSize: 20 }}>{forecast.dateLabel}</p>
      <img src={forecast.image.url} alt={forecast.image.title} />
      <p style={{ fontWeight: "bold" }}>{forecast.telop}</p>
      {forecast.temperature.min.celsius ? (
        <p>
          {forecast.temperature.min.celsius}&deg;C /{" "}
          {forecast.temperature.max.celsius}&deg;C
        </p>
      ) : (
        <p>{forecast.temperature.max.celsius}&deg;C</p>
      )}
    </div>
  );
};

export default WeatherCard;
