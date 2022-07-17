import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
  const [weatherReport, setWeatherReport] = useState({})
  const openweather_api_key = process.env.REACT_APP_API_KEY
  
  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${openweather_api_key}`)
      .then(response => {
        setWeatherReport(response.data)
      })
  }, [capital])

  if(Object.keys(weatherReport).length !== 0) {
    return (
      <div>
        <h2>{`Weather in ${capital}`}</h2>
        <div>{`temperature ${weatherReport.main.temp} Celsius`}</div>
        <img 
          src={`http://openweathermap.org/img/wn/${weatherReport.weather[0].icon}@2x.png`} 
          alt={`${weatherReport.weather[0].description} icon`}
        />
        <div>{`wind ${weatherReport.wind.speed} m/s`}</div>
      </div>
    )
  }
}

export default Weather