require('dotenv').config();
const axios = require('axios');
const aqApiRoute = 'http://api.airvisual.com/v2/nearest_city?';
const owmApiRoute = 'https://api.openweathermap.org/data/2.5/onecall?';
const aqKey = process.env.IQAIR_KEY;
const weatherKey = process.env.OPENWEATHER_KEY;

module.exports = {
    Query: {
        //Query to retreve air quality information from Air Visual API
        getAirQuality: async (_root, { lat, lon }, request) => {
            //Primary auth conditional to check if user is logged in before accesing this query
            if (!request.user) return ("You must be logged in to access the application.");

            return axios.get(`${aqApiRoute}lat=${lat}&lon=${lon}&key=${aqKey}`)
                .then(resp => {
                    return resp.data.data.current.pollution;
                })
                .catch(err => console.error(err));
        },
        //Query to retrieve current weather information from Open Weather Map API
        getCurrentWeather: async (_root, { lat, lon }, request) => {
            //Primary auth conditional to check if user is logged in before accesing this query
            if (!request.user) return ("You must be logged in to access the application.");

            return axios.get(`${owmApiRoute}lat=${lat}&lon=${lon}&exclude=minutely,alerts,hourly,daily&units=metric&appid=${weatherKey}`)
                .then(resp => {
                    return resp.data.current;
                })
                .catch(err => console.error(err));
        },
        //Query to retrieve hourly weather information from Open Weather Map API
        getHourlyWeather: async (_root, { lat, lon }, request) => {
            //Primary auth conditional to check if user is logged in before accesing this query
            if (!request.user) return ("You must be logged in to access the application.");

            return axios.get(`${owmApiRoute}lat=${lat}&lon=${lon}&exclude=minutely,alerts,current,daily&units=metric&appid=${weatherKey}`)
                .then(resp => {
                    return resp.data.hourly;
                })
                .catch(err => console.error(err));
        },
        //Query to retrieve daily weather information from Open Weather Map API
        getDailyWeather: async (_root, { lat, lon }, request) => {
            //Primary auth conditional to check if user is logged in before accesing this query
            if (!request.user) return ("You must be logged in to access the application.");

            return axios.get(`${owmApiRoute}lat=${lat}&lon=${lon}&exclude=minutely,alerts,current,hourly&units=metric&appid=${weatherKey}`)
                .then(resp => {
                    return resp.data.daily;
                })
                .catch(err => console.error(err));
        }
    },
    HourlyRain: {
        oneH: (root) => root["1h"]
    },
    HourlySnow: {
        oneH: (root) => root["1h"]
    }
}