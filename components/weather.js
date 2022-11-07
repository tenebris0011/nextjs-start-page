import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Weather() {
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [temp, setTemp] = useState('');
    const [feelsLike, setFeelsLike] = useState('');
    const [err, setErr] = useState(false);
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
                    setTemp(newTemp);
                    setFeelsLike(feelsLike);
                    localStorage.setItem('temp', newTemp);
                    localStorage.setItem('feelsLike', feelsLike);
                })
                .catch(function (error) {
                    console.error(error);
                    setErr(true);
                });
    }, [lat, lon]);


    return (
        <div>
            {temp && (
                <div>
                    <div>
                        <p className="text-center text-white">Temperature:</p>
                        <p className="text-center text-white">{temp} ° F</p>
                    </div>
                    <div>
                        <p className="text-center text-white">Feels Like:</p>
                        <p className="text-center text-white">{feelsLike}° F</p>
                    </div>
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