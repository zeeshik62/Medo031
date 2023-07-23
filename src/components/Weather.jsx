import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [dayss,setDayss] =useState(null);
  const [icon,setIcon]=useState(null);
  console.log(icon);
  //const API_KEY = "ddb265ef3c264df0bd2203719232207";
  const API_URL = "http://api.weatherapi.com/v1/forecast.json?key=ddb265ef3c264df0bd2203719232207&aqi=no&alerts=no";

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          //vappid: API_KEY,
          units: "metric",
          days: dayss,
        }
      });

      setWeatherData(response.data);
     // console.log(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null); // Clear the weather data in case of an error
      setError("Could not fetch weather data. Please try again later.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="container bg-success text-white mt-5 rounded border border-primary mx-auto w-25" >
      <h1 className="m-3">Weather App <img src= {''}/> </h1>
      <form onSubmit={handleSubmit}>
        <input className="form-control w-75 m-3 "
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
         <input className="form-control w-75 m-3 "
          type="text"
          value={dayss}
          onChange={(e) => setDayss(e.target.value)}
          placeholder="Enter Days to get Forecast"
        />
        <button type="submit" className='btn btn-primary ml-3 mb-2'>Get Weather</button>
      </form>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>Current Weather in {weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Description: {weatherData.current.condition.text}</p>
          

        </div>
      )}
      {weatherData &&
        weatherData.forecast &&
        weatherData.forecast.forecastday.map((day) => (
          <div>
            <h4>{day.date}</h4>
            <p>Temperature:{day.day.avgtemp_c}°C</p>
            <p>Description: {day.day.condition.text}</p>
          </div>
        ))}
    </div>
  );
};

export default Weather;