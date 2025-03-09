<script setup>
import { ref, onMounted } from 'vue';

// Dark mode state
const darkMode = ref(JSON.parse(localStorage.getItem("darkMode")) || false);

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  localStorage.setItem("darkMode", JSON.stringify(darkMode.value));

  // Apply dark or light mode globally
  document.documentElement.classList.toggle("dark-mode", darkMode.value);
  document.documentElement.classList.toggle("light-mode", !darkMode.value);
};

// Ensure mode persists on reload
onMounted(() => {
  if (darkMode.value) {
    document.documentElement.classList.add("dark-mode");
  } else {
    document.documentElement.classList.add("light-mode");
  }
});
</script>

<template>
  <div class="app-container">
    <!-- Background Animation -->
    <div class="animated-background"></div>

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

<style>
/* 🔹 Animated Background */
.animated-background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;
  background: linear-gradient(45deg, #1e3c72, #2a5298, #1e3c72);
  background-size: 400% 400%;
  animation: gradientAnimation 10s infinite alternate;
}

/* 🔹 Gradient Animation */
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

/* 🔹 Dark Mode */
.dark-mode .animated-background {
  background: linear-gradient(45deg, #0f2027, #203a43, #2c5364);
  animation: gradientAnimation 10s infinite alternate;
}

.dark-mode {
  background: #121212;
  color: white;
}

.dark-mode .app-header,
.dark-mode .footer {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

/* 🔹 Light Mode */
body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  background: white;
  color: #121212;
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
}

.light-mode .app-header,
.light-mode .footer {
  background: rgba(255, 255, 255, 0.85);
  color: #121212;
}

/* 🔹 Header Styling */
.app-header {
  width: 100vw;
  text-align: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.85);
  color: white;
}

/* 🔹 Footer */
.footer {
  width: 100vw;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  text-align: center;
  padding: 15px;
  margin-top: auto;
}

.footer a {
  color: #f8f8f8;
  text-decoration: none;
  margin: 0 15px;
  transition: color 0.3s;
}

.light-mode .footer a {
  color: #121212;
}

.light-mode .footer a:hover {
  color: #1db7ff;
}

/* 🔹 Button Styling */
button {
  background: #121212;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}

button:hover {
  background: #333;
}

/* Light Mode Button */
.light-mode button {
  background: white;
  color: #121212;
  border: 1px solid #121212;
}

.light-mode button:hover {
  background: #f0f0f0;
}
</style>
