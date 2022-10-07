import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const Country = ({ name, capital, area, languages, flag, code }) => {
    const lang = Object.values(languages)
    const [weather, setWeather] = useState(null)
    const apiKey = process.env.REACT_APP_API_KEY

    console.log(apiKey)

    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital},${code}&limit=${1}&appid=${apiKey}`)
            .then(response => {
                console.log('promise fulfilled')
                return [response.data[0].lat, response.data[0].lon]
            })
            .then(latLong => {
                const lat = latLong[0]
                const lon = latLong[1]
                return axios
                    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            })
            .then(response => {
                setWeather(response.data)
                console.log(response.data)
            })
    }, [])


    console.log('weather', weather)

    if(!weather){return(null)}

    return (
        <div>
            <h2>{name}</h2>
            Captial: {capital} <br></br>
            Area: {area} <br></br>
            <p><b>Languages:</b></p>
            <ul>
                {lang.map(e =>
                    <li key={e}>{e}</li>
                )
                }
            </ul>
            <img src={flag} alt='the flag of the country'></img>
            <h2>Weather in {capital}</h2>
            <div>
                    Temperature: {weather.main.temp} C <br></br>
                    Wind: {weather.wind.speed} m/s
                <div>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon'></img>
                </div>
            </div>
        </div>
    )
}

export default Country
//  <Weather temp={weather.main.temp} wind={weather.wind.speed} icon={weather.weather[0].icon}/>