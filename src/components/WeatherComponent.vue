<template>
    <div class="weather-container">
      <!-- Weather Search Form -->
      <div class="weather-form">
        <h2>Check the Weather</h2>
        <form v-on:submit.prevent="getWeather">
          <input 
            type="text" 
            id="zipcode" 
            v-model="zipcode" 
            placeholder="Enter Zip Code..."
          />
          <button type="submit">Get Weather</button>
        </form>
      </div>
  
      <!-- Loading Indicator -->
      <p v-if="loading">Fetching weather data...</p>
  
      <!-- Error Message -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  
      <!-- Weather Display -->
      <div class="weather-card" v-if="weatherLoaded">
        <h2>The weather in {{ name }}</h2>
        <p><strong>🌍 Latitude:</strong> {{ lat }}</p>
        <p><strong>🌍 Longitude:</strong> {{ lon }}</p>
        <p><strong>🌡 Temperature:</strong> {{ temp }}°F</p>
        <p><strong>🌡 Feels Like:</strong> {{ feels_like }}°F</p>
        <p><strong>💧 Humidity:</strong> {{ humidity }}%</p>
        <p><strong>🌤 Condition:</strong> {{ description }}</p>
        <img :src="image" alt="Weather Icon" />
      </div>
  
      <!-- 5-Day Forecast -->
      <section class="forecast-container" v-if="forecast.length > 0">
        <h2>5-Day Forecast</h2>
        <div class="forecast-grid">
          <div class="forecast-card" v-for="day in forecast" :key="day.dt">
            <p>{{ formatDate(day.dt) }}</p>
            <img :src="getWeatherIcon(day.icon)" />
            <p><strong>{{ day.temp }}°F</strong></p>
            <p>{{ day.description }}</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import weatherService from '@/services/WeatherService';  
  
  export default {
    data() {
      return {
        zipcode: '',
        lat: null,
        lon: null,
        name: '',
        weather: {},
        temp: null,
        humidity: null,
        feels_like: null,
        description: '',
        icon: '',
        image: '',
        loading: false,
        errorMessage: '',
        weatherLoaded: false,
        forecast: [] // ✅ Added array for storing 5-day forecast
      };
    },
    methods: {
      getWeather() {
        if (!this.zipcode) {
          this.errorMessage = "Please enter a valid ZIP code.";
          return;
        }
  
        this.loading = true;
        this.errorMessage = '';
        this.weatherLoaded = false;
  
        weatherService.getLatLon(this.zipcode)
          .then((response) => {
            if (!response.data || !response.data.lat || !response.data.lon) {
              throw new Error("Invalid ZIP code or location not found.");
            }
  
            this.lat = response.data.lat;
            this.lon = response.data.lon;
            this.name = response.data.name;
  
            return Promise.all([
              weatherService.getWeather(this.lat, this.lon),
              weatherService.getFiveDayForecast(this.lat, this.lon)
            ]);
          })
          .then(([currentWeather, forecastWeather]) => {
            // Set current weather
            this.weather = currentWeather.data;
            this.temp = this.weather.main.temp;
            this.feels_like = this.weather.main.feels_like;
            this.humidity = this.weather.main.humidity;
            this.description = this.weather.weather[0].description;
            this.icon = this.weather.weather[0].icon;
            this.image = `http://openweathermap.org/img/wn/${this.icon}@2x.png`;
  
            this.weatherLoaded = true;
  
            // Process 5-day forecast (Extracting 1 entry per day)
            const dailyForecast = [];
            const seenDates = new Set();
            forecastWeather.data.list.forEach((entry) => {
              const date = entry.dt_txt.split(" ")[0]; // Extract YYYY-MM-DD
              if (!seenDates.has(date)) {
                seenDates.add(date);
                dailyForecast.push({
                  dt: entry.dt,
                  temp: entry.main.temp,
                  description: entry.weather[0].description,
                  icon: entry.weather[0].icon
                });
              }
            });
            this.forecast = dailyForecast;
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
            this.errorMessage = "Could not fetch weather. Please check your ZIP code.";
          })
          .finally(() => {
            this.loading = false;
          });
      },
      formatDate(timestamp) {
        return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'long' });
      },
      getWeatherIcon(icon) {
        return `http://openweathermap.org/img/wn/${icon}@2x.png`;
      }
    }
  };
  </script>
  
  