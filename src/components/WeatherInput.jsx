import WeatherDisplay from "./WeatherDisplay.jsx";
import React, { useState } from "react";
import { getWeatherRoute } from "../routes/weather";
import logo from "../assets/images/logo.svg";
import "../assets/css/weather-input.css";
import "../assets/css/respond/weather-input.css";

export default function WeatherInput() {

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const WEATHER_API = import.meta.env.VITE_WEATHER_API;

    const handleKeyDown = ({ key }) => {
        if (key === 'Enter') 
        {
            handleWeather(); 
            if (error) 
            {
                setError(error);  
            } 
            else 
            {
                setCity('')
            }
        }
    };
    
    const handleOnChange = ({ target: { value } }) => {
        setCity(value);
        if (error) setError(null);
    };

    async function handleWeather() {
        if (!city) return setError("Please enter a city name.");

        setLoading(true);
        try 
        {
            const response = await getWeatherRoute(city, WEATHER_API);
            const { code, message, weatherData } = response;

            if (code !== 200) {
                setError(message);
                setLoading(false);
                return;
            }

            setWeather(weatherData);
            setCity("");
        } 
        catch(err) 
        {
            console.error("Failed to fetch weather", err.message);
            setError("An unexpected error occurred. Please try again.");
        } 
        finally 
        {
            setLoading(false);
        }
    }

    return (
        <div className="weather-app-grid" aria-label="Weather Application">
            <div
                id="weather-input-container"
                aria-labelledby="weather-app-heading"
            >
                <img src={logo} alt="Fintek Digital Logo" className="logo" />
                <h1 id="weather-app-heading">
                    Use our weather app to see the weather around the world
                </h1>
                <label htmlFor="city-input">City Name</label>
                <div className="input-container">
                    <input
                        id="city-input"
                        type="text"
                        value={city}
                        onChange={handleOnChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter city name"
                        aria-label="City input field"
                    />
                    <button
                        onClick={handleWeather}
                        aria-label="Check weather button"
                    >
                        {loading ? "Checking..." : "Check"}
                    </button>
                </div>

                {error && (
                    <p style={{ color: "red" }} aria-live="polite" role="alert">
                        {error}
                    </p>
                )}

                {weather && (
                    <div
                        className="location-info text-content"
                        aria-live="polite"
                    >
                        <p aria-label={`Latitude: ${weather.location.lat}`}>
                            latitude: {weather.location.lat}
                        </p>
                        <p aria-label={`Longitude: ${weather.location.lon}`}>
                            longitude: {weather.location.lon}
                        </p>
                        <p
                            aria-label={`Last updated at: ${new Date(
                                weather.current.last_updated
                            ).toLocaleString()}`}
                        >
                            accurate to{" "}
                            {new Date(
                                weather.current.last_updated
                            ).toLocaleString()}
                        </p>
                    </div>
                )}

            </div>

            {weather && (
                <div id="weather-container">
                    <WeatherDisplay weather={weather} aria-live="polite" />
                </div>
            )}
        </div>
    );
}