import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function Weather() {
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [temp, setTemp] = useState('');
    const [feelsLike, setFeelsLike] = useState('');
    const [weatherDesc, setWeatherDesc] = useState('');
    const [weatherImg, setWeatherImg] = useState('');
    const [err, setErr] = useState(false);
    const today = new Date().toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
    const time = new Date().toLocaleString().split(',')[1];

    /**
     *
     * fetch weather information of the given city
     * Need to find out how to wait for user approval before calling the Weather API.
     */
    useEffect(() => {
        setTemp(null);
        setFeelsLike(null);
        if (navigator.geolocation && localStorage.getItem('lat') === null) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log('test');
                localStorage.setItem('lat', position.coords.latitude);
                localStorage.setItem('lon', position.coords.longitude);
                setLat(position.coords.latitude);
                setLon(position.coords.longitude);
            })
        }
    }, []);

    useEffect(() => {
        const lat_ls = localStorage.getItem('lat');
        const lon_ls = localStorage.getItem('lon');
        setErr(false);
        const options = {
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat_ls + '&lon=' + lon_ls + '&units=imperial&appid=' + process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY,
        };

        axios
            .request(options)
            .then(function (response) {
                const { data } = response;

                const newTemp = Math.ceil(data.main.temp);
                const feelsLike = Math.ceil(data.main.feels_like);
                const weatherDesc = data.weather[0].description;
                const weatherImg = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                setTemp(newTemp);
                setFeelsLike(feelsLike);
                setWeatherDesc(weatherDesc);
                setWeatherImg(weatherImg);
            })
            .catch(function (error) {
                console.error(error);
                setErr(true);
            });
    }, [lat, lon]);


    return (
        <div>
            {temp && (
                <div class="grid place-items-center text-white">
                        <p>{today}</p>
                        <p>{time}</p>
                        <Image
                            src={`${weatherImg}`}
                            height={75}
                            width={75}
                            alt="Weather Image"
                        />
                        <p>{weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)}</p>
                        <p>Temperature: {temp} ° F</p>
                        <p>Feels Like: {feelsLike}° F</p>
                </div>
            )}
            {err && (
                <div className="mt-10 bg-red-200 px-12 py-4 rounded font-raleway text-xl font-semibold text-gray-700 sm:text-base sm:px-8">
                    <p>Couldn't fetch weather results, please make sure to allow access to location.</p>
                </div>
            )}
        </div>
    );
}