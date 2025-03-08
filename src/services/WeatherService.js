import axios from 'axios';

const http = axios.create({
  baseURL: 'https://api.openweathermap.org/'
});

const key = import.meta.env.VITE_APP_OPEN_WEATHER_KEY;

export default {
  getFiveDayForecast(lat, lon) {
    return http.get(`data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`);
  },
  
  getLatLon(zipcode) {
    return http.get(`geo/1.0/zip?zip=${zipcode},US&appid=${key}`);
  },
  
  
  getWeather(lat, lon) {
    return http.get(`data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`); // Added units for Fahrenheit
  }
};
