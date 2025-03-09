<template>
  <div class="weather-container">
    <!-- Weather Search Form -->
    <div class="weather-form">
      <h2>Check the Weather</h2>
      <form v-on:submit.prevent="getWeather">
        <input 
          type="text" 
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
      <p><strong>🌡 Temperature:</strong> {{ temp }}°F</p>
      <p><strong>🌡 Feels Like:</strong> {{ feels_like }}°F</p>
      <p><strong>💧 Humidity:</strong> {{ humidity }}%</p>
      <p><strong>🌤 Condition:</strong> {{ description }}</p>
      <img :src="image" alt="Weather Icon" />

      <!-- Button to Show 5-Day Forecast -->
      <button @click="toggleForecast">{{ showForecast ? "Hide" : "Show" }} 5-Day Forecast</button>
    </div>

    <!-- 5-Day Forecast Section -->
    <section class="forecast-container" v-if="showForecast && forecast.length > 0">
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
      name: '',
      temp: null,
      humidity: null,
      feels_like: null,
      description: '',
      icon: '',
      image: '',
      loading: false,
      errorMessage: '',
      weatherLoaded: false,
      forecast: [], // ✅ Added back 5-day forecast
      showForecast: false, // ✅ Controls forecast visibility
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
          this.name = response.data.name;
          return Promise.all([
            weatherService.getWeather(response.data.lat, response.data.lon),
            weatherService.getFiveDayForecast(response.data.lat, response.data.lon)
          ]);
        })
        .then(([weather, forecast]) => {
          this.temp = weather.data.main.temp;
          this.feels_like = weather.data.main.feels_like;
          this.humidity = weather.data.main.humidity;
          this.description = weather.data.weather[0].description;
          this.icon = weather.data.weather[0].icon;
          this.image = `http://openweathermap.org/img/wn/${this.icon}@2x.png`;
          this.weatherLoaded = true;

          // Process 5-day forecast
          const dailyForecast = [];
          const seenDates = new Set();
          forecast.data.list.forEach((entry) => {
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
        .catch(() => {
          this.errorMessage = "Could not fetch weather. Please check your ZIP code.";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    toggleForecast() {
      this.showForecast = !this.showForecast;
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

<style>
.weather-container {
  text-align: center;
  padding: 20px;
}

.weather-form {
  margin-bottom: 20px;
}

.weather-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  display: inline-block;
}

/* 🔹 Forecast Section */
.forecast-container {
  margin-top: 20px;
}

.forecast-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.forecast-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  text-align: center;
  min-width: 120px;
}

/* 🔹 Button Styles */
button {
  background: white;
  color: #121212;
  border: 1px solid #121212;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s, color 0.3s;
}

button:hover {
  background: #f0f0f0;
}

/* Dark Mode Button */
.dark-mode button {
  background: #121212;
  color: white;
  border: none;
}

.dark-mode button:hover {
  background: #333;
}
</style>
