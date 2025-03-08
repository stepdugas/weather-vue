import { createRouter, createWebHistory } from 'vue-router';
import WeatherComponent from '@/components/WeatherComponent.vue';

const routes = [
  { path: '/', component: WeatherComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
