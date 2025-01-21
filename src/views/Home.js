import React, { useState, useEffect } from 'react';
import "./Home.css";

function Home() {
    const [weather, setWeather] = useState(null);
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        const API_KEY = process.env.REACT_APP_WEATHERSTACK_API_KEY;
        console.log(API_KEY);
        const BASE_URL = 'http://api.weatherstack.com/current';

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BASE_URL}?access_key=${API_KEY}&query=${location}`);
            if (!response.ok) {
                throw new Error('Cannot fetch weather data');
            }

            const data = await response.json();
            if (data.success === false) {
                throw new Error(data.error.info);
            }

            setWeather(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [location]);

    return (
        <div className='page'>
            <h2>Home Page</h2>
            <p>Wondering what to wear while visiting on your vacation, enter your destination and I'll let you know:</p>
            <form>
                <input type='text' placeholder='Enter Location' value={location} onChange={(e) => setLocation(e.target.value)} />
                <button onClick={fetchWeather}>Get Weather Info</button>
            </form>
            <div className='container'>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {weather && (
                    <div>
                        <h2>Weather in {weather.location.name}</h2>
                        <p>
                            <strong>Temperature:</strong> {weather.current.temperature}°C
                        </p>
                        <p>
                            <strong>Condition:</strong> {weather.current.weather_descriptions[0]}
                        </p>
                        <img
                            src={weather.current.weather_icons[0]}
                            alt={weather.current.weather_descriptions[0]}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}


export default Home;