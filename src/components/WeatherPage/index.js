import React, { useState, useEffect } from "react";
//library
import axios from "axios";
//components
import TempC from "../TempC";
import TempF from "../TempF";
//style
import "./style.css";

const WeatherPage = () => {
  const [weather, setWeather] = useState();
  const [tempType, setTempType] = useState("typeC");

  const handleTypeC = () => {
    setTempType("typeC");
  };
  const handleTypeF = () => {
    setTempType("typeF");
  };

  const url =
    "https://api.weatherapi.com/v1/forecast.json?key=698dc13c77094cf187695058201212&q=London&days=1";

  useEffect(() => {
    const getData = async () =>
      await axios.get(url).then((response) => {
        setWeather(response.data);
      });
    getData();
    const temp = setInterval(() => getData(), 10000);
    return () => clearInterval(temp);
  }, []);

  const getDate = (timeEpoch) => {
    return new Date(timeEpoch * 1000).toLocaleTimeString("en-GB", {
      hour: "numeric",
      hour12: true,
    });
  };
  return (
    <div className="App">
      <div className="city-case">
        <div className="containers">
          <div className="container-header">
            <div>{weather?.current.condition.text}</div>
            <div className="buttons-temp">
              <button
                className={tempType === "typeC" ? "active" : ""}
                onClick={handleTypeC}
              >
                °C
              </button>
              <button
                className={tempType === "typeF" ? "active" : ""}
                onClick={handleTypeF}
              >
                F
              </button>
            </div>
          </div>
          <div className="texts">
            {weather?.location.name},{weather?.location.country}
          </div>
        </div>
        <div className="weather-content">
          {weather?.forecast.forecastday.map((data) => (
            <div className="flex-container">
              {data.hour.map((item) => (
                <div className="weatherView">
                  <div className="time">{getDate(item.time_epoch)}</div>
                  <div className="">
                    <img className="weatherIcon" src={item.condition.icon} />
                  </div>
                  {tempType === "typeC" ? (
                    <TempC item={item} />
                  ) : (
                    <TempF item={item} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
