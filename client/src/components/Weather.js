import React from 'react'
import { useState } from 'react'
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Card, CardGroup, Collapse } from 'react-bootstrap';

function Weather() {
    const [cityName, setCityName] = useState("");
    const [data, setData] = useState({
        description: "None",
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        humidity: 0,
        sunrise: 0,
        sunset: 0,
        country: "None",

    })

    function getWeather() {
        //console.log(cityName)
        Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6aec00bb0f6dcb88444fd69d2c397585&units=metric`).then((response) => {
            //console.log(response.data)
            setData({
                description: response.data.weather[0].description,
                temp: response.data.main.temp,
                temp_max: response.data.main.temp_max,
                temp_min: response.data.main.temp_min,
                humidity: response.data.main.humidity,
                sunrise: response.data.sys.sunrise,
                sunset: response.data.sys.sunset,
                country: response.data.sys.country,
            })
        })
        //console.log(cityName)
    }

    return (
        <div>
            <h3>Weather</h3>


            <div className='input-group'>
                <div class="col-xs-3">
                    <input class="form-control col-xs-3   " type="text" placeholder='Enter City Name' onChange={(e) => {
                        setCityName(e.target.value)
                    }}></input>


                </div>

                <Button id="showQueryButton" variant="outline-success" size="sm" onClick={getWeather}> Search</Button>

            </div>

            <div>
                <h5>Country: {data.country} </h5>
                <h5>Weather Type: {data.description}</h5>
                <h5>Humidity: {data.humidity}</h5>
                <h5>Temprature: {data.temp} degree celsius.</h5>
                <h5>Maximun Temprature: {data.temp_max} degree celsius.</h5>
                <h5>Minimum Temprature: {data.temp_min} degree celsius.</h5>

            </div>









        </div>
    )
}

export default Weather