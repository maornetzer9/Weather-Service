import axios from 'axios';

export const getWeatherRoute = async (city, url) => {
    try
    {
        const { data } = await axios.get(`${url}?city=${city}`);
        return data
    }
    catch(err)
    {
        console.error('Request Failed To Get Weather', err.message);
        throw new Error('Failed to retrieve weather data');
    }
};