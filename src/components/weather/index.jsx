import React, { useEffect, useState } from 'react'
import Search from '../search'

export default function Weather() {

  const [search, setSearch] = useState('');
  const [weatherdata, setWeatherData ] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchData(param){
    setLoading(true)
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e`
      )
      const result = await response.json()
      console.log(result, 'result');
      
      if(result  ){
        setWeatherData(result)
        setLoading(false)
      }
      
    } catch (error) {
      setLoading(false)
      console.log(error);
      setError(error)
    }

  }

  function getCurrentDate(){
    return new Date().toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',

    })

  }

  function getCurrentTime(){
    return new Date().toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })

    }
  
  function handleSearch() {
  
    fetchData(search)
  }

  useEffect(()=>{
    fetchData('bengaluru');
  }, [])

  if(loading){
    return <h1>Data is Loading Please Wait</h1>
  }

  if(error){
    return <h1>Error in Loading Data</h1>
  }

  return (
    <div>
      <h2>Weather App</h2>
      <Search
      search={search}
      setSearch={setSearch}
      handleSearch={handleSearch}
      />
      {
        <div> 
          <div className="city-name">
            <h2>{weatherdata?.name},</h2>
            <span>{weatherdata?.sys?.country}</span>
          </div>
          <div className='date'>
            <span>{getCurrentDate()}</span>  <br />
            <spn>{getCurrentTime()}</spn>
          </div>
          <div> <span>Temp: </span>{weatherdata?.main?.temp}</div>
          <p className='description'>
            <span>Description: </span>
            {
              weatherdata && weatherdata.weather && weatherdata.weather[0] ? weatherdata.weather[0].description : ''
            }
          </p>
          <div className='weather-info'>
            <div className="column">
              <div>
                <p>
                {weatherdata?.wind?.speed}
                </p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className='humidity'>{weatherdata?.main?.humidity}</p>
                <p>Humidity</p>
              </div>
            </div>

          </div>
        </div>
      }
    </div>
  )
}
