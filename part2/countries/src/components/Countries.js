import React, {useEffect, useState} from 'react';
import axios from 'axios'

const Weather = ({capital}) => {
    const [weather, setWeather] = useState([])
    const [main, setMain] = useState([])
    const [wind, setWind] = useState([])
    const key = process.env.REACT_APP_API_KEY

    const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${key}`

    useEffect(() => {
    axios
    .get(weather_url)
    .then(res => {
        setWeather(res.data.weather)
        setMain(res.data.main)
        setWind(res.data.wind)
    })
    }, [weather_url])

    return (
        <div>
            {weather.map(w => (<div key={w.id}><p><b>{w.main}</b> ({w.description})</p></div>))}
            <p><b>temperature:</b> {Math.round(main.temp)} C</p>
            <p><b>feels like:</b> {Math.round(main.feels_like)} C</p>
            <p><b>wind: </b> {wind.speed} m/s</p>
        </div>
    )
}

const CountryData = ({country}) => {

    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <ul>{country.languages.map(lang => (<li key={lang.name}>{lang.name}</li>))}</ul>
            <img src={country.flag} alt="" width="140" height="100"></img>
            <h3>Weather in {country.capital}</h3>
            <Weather capital={country.capital}></Weather>
        </div>
    )
}

const Countries = ({country, view}) => {
    if (country.length > 10) {
        return (
            <div>
            <p>Too many matches, specify new filter</p>
            </div>
        )
    }
    if (country.length === 1) {
        return (
            <div>
                {country.map(c => 
                <CountryData key={c.name} country={c}></CountryData>
                )}
            </div>
        )
    } 

    return (
        <div>
            {country.map(c => 
                <div key={c.name}>
                        {c.name}
                        <button onClick={() => view(c.name)}>show</button>
                </div>
            )}
        </div>
    )

}

export default Countries