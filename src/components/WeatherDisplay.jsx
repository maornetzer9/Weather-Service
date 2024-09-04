import React from "react";
import "../assets/css/weather-display.css";
import "../assets/css/respond/weather-display.css";

function WeatherDisplay({ weather }) {
    // Get the current hour
    const currentHour = new Date(weather.location.localtime).getHours();

    // Filter the hourly data to include only the current hour and the next five hours
    const filteredHours = weather.forecast.forecastday[0].hour.filter(
        (hour) => {
            const hourTime = new Date(hour.time).getHours();
            return hourTime >= currentHour && hourTime < currentHour + 5;
        }
    );

    return (
        <div
            className="weather-card"
            aria-label={`Weather details for ${weather.location.name}, ${weather.location.country}`}
        >
            <h2
                className="weather-main-content"
                aria-label={`Location name: ${weather.location.name}`}
            >
                {weather.location.name}
            </h2>
            <h3
                className="weather-text-content"
                aria-label={`Country: ${weather.location.country}`}
            >
                {weather.location.country}
            </h3>
            <p
                style={{ fontSize: "20px" }}
                className="weather-text-content"
                aria-label={`Local time: ${new Date(
                    weather.location.localtime
                ).toLocaleString()}`}
            >
                {new Date(weather.location.localtime).toLocaleString()}
            </p>
            <div
                className="temperature main-content"
                aria-label={`Current temperature: ${weather.current.temp_c.toFixed(
                    0
                )} degrees Celsius, Condition: ${
                    weather.current.condition.text
                }`}
            >
                <span>{weather.current.temp_c.toFixed(0)}°</span>
                <span style={{ fontSize: "30px" }}>
                    {weather.current.condition.text}
                </span>
            </div>
            <div className="weather-details weather-text-content">
                <div>
                    <p>Precipitation</p>
                    <p
                        className="weather-main-content"
                        aria-label={`Precipitation: ${weather.current.precip_mm} millimeters`}
                    >
                        {weather.current.precip_mm} mm
                    </p>
                </div>
                <div>
                    <p>Humidity</p>
                    <p
                        className="weather-main-content"
                        aria-label={`Humidity: ${weather.current.humidity} percent`}
                    >
                        {weather.current.humidity}%
                    </p>
                </div>
                <div>
                    <p>Wind</p>
                    <p
                        className="weather-main-content"
                        aria-label={`Wind speed: ${weather.current.wind_kph} kilometers per hour`}
                    >
                        {weather.current.wind_kph} km/h
                    </p>
                </div>
            </div>

            <div
                className="hourly-forecast"
                aria-label="Hourly forecast for the next 5 hours"
            >
                {filteredHours.map((hour, index) => (
                    <div
                        key={index}
                        className="hourly-detail"
                        aria-label={`Forecast at ${new Date(
                            hour.time
                        ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hourCycle: "h24",
                        })}: ${hour.temp_c.toFixed(0)} degrees Celsius`}
                    >
                        <p
                            className="weather-text-content"
                            style={{ fontSize: 20, fontWeight: 100 }}
                        >
                            {new Date(hour.time).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hourCycle: "h24",
                            })}
                        </p>
                        <p
                            style={{ fontWeight: 600 }}
                            className="weather-main-content"
                        >
                            {hour.temp_c.toFixed(0)}°
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherDisplay;