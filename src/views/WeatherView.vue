<template>
  <div class="weather-view">
    <h1>Weather</h1>
    <WeatherComponent />
  </div>
</template>

<script>
import WeatherComponent from '@/components/WeatherComponent.vue';

export default {
  name: 'WeatherView',
  components: {
    WeatherComponent,
  },
};
</script>

<style>
.weather-view {
  text-align: center;
  padding: 20px;
}
</style>
