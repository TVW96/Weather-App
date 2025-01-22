import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import "./Home.css";

const fetchWeather = async ({ queryKey }) => {
    const [_, location] = queryKey;
    const { data } = await axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${location}`);
    return data;
};

export default function Home() {
    const [location, setLocation] = useState('Seattle');
    const [submittedLocation, setSubmittedLocation] = useState('Seattle'); // Keeps track of the location to fetch

    const { data, isError, isLoading } = useQuery({
        queryKey: ['weather', submittedLocation], // Refetch data when submittedLocation changes
        queryFn: fetchWeather,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedLocation(location); // Update the location to fetch
    };

    if (isLoading) return <p>Loading weather data...</p>;
    if (isError) return <p>Failed to fetch weather</p>;

    return (
        <div className='page'>
            <h2>Home Page</h2>
            <p>Wondering what to wear while visiting on your vacation? Enter your destination, and I'll let you know:</p>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Enter Location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button type='submit'>Get Weather Info</button>
            </form>
            <div className='container'>
                {data && data.current && data.location && (
                    <ul>
                        <li>Temperature: {data.current.temperature}°C</li>
                        <li>Weather Description: {data.current.weather_descriptions[0]}</li>
                        <li><img src={data.current.weather_icons[0]} alt="Weather Icon" /></li>
                        <li>City: {data.location.name}</li>
                        <li>Country: {data.location.country}</li>
                        <li>Region: {data.location.region}</li>
                        <li>Local Time: {data.location.localtime}</li>
                        <li>Timezone: {data.location.timezone_id}</li>
                    </ul>
                )}
            </div>
        </div>
    );
}
