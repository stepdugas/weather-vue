<script setup>
import { ref } from 'vue';

const darkMode = ref(JSON.parse(localStorage.getItem("darkMode")) || false);

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  localStorage.setItem("darkMode", JSON.stringify(darkMode.value));
  document.body.classList.toggle("dark-mode", darkMode.value);
};
</script>

<template>
  <div class="app-container">
    <!-- Header -->
    <header class="app-header">
      <h1>WeatherVue</h1>
      <p>Get real-time weather updates</p>
      <button @click="toggleDarkMode">
        {{ darkMode ? "☀️ Light Mode" : "🌙 Dark Mode" }}
      </button>
    </header>

    <!-- Main Content -->
    <main>
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2025 WeatherVue | Built by Stephanie Dugas</p>
      <nav>
        <a href="https://www.linkedin.com/in/stephanie-dugas" target="_blank">LinkedIn</a>
        <a href="https://github.com/stepdugas" target="_blank">GitHub</a>
        <a href="mailto:stepdugas@gmail.com">Contact</a>
      </nav>
    </footer>
  </div>
</template>

<style scoped>
/* 🔹 Main App Container */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 🔹 Full-Width Header */
.app-header {
  width: 100vw;
  text-align: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.85);
  color: white;
}

/* 🔹 Main Content */
main {
  flex-grow: 1;
  padding: 40px 20px;
}

/* 🔹 Full-Width Footer */
.footer {
  width: 100vw;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  text-align: center;
  padding: 15px;
  margin-top: auto;
}

.footer nav {
  margin-top: 10px;
}

.footer a {
  color: #f8f8f8;
  text-decoration: none;
  margin: 0 15px;
  transition: color 0.3s;
}

.footer a:hover {
  color: #1db7ff;
}

/* 🔹 Dark Mode */
.dark-mode {
  background: #121212;
  color: white;
}

.dark-mode .app-header {
  background: rgba(255, 255, 255, 0.1);
}

.dark-mode button {
  background: #f8f8f8;
  color: black;
}

.dark-mode button:hover {
  background: #ccc;
}

/* 🔹 Background Image */
body {
  margin: 0;
  padding: 0;
  background-image: url('@/assets/background.png');
  background-size: cover;
  background-position: center;
  font-family: 'Arial', sans-serif;
}
</style>
