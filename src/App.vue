<script setup>
import { onMounted } from 'vue';

// Ensure dark mode is set when the app loads
onMounted(() => {
  document.documentElement.classList.add("dark-mode");
});
</script>

<template>
  <div class="app-container">
    <!-- Animated Background -->
    <div class="animated-background"></div>

    <!-- Header -->
    <header class="app-header">
      <h1>WeatherVue</h1>
      <p>Get real-time weather updates</p>
    </header>

    <!-- Main Content (Expands between header & footer) -->
    <main class="app-content">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="app-footer">
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
/* 🔹 Full Page Layout */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  background: #121212;
  color: white;
  display: flex;
  flex-direction: column;
}

/* 🔹 App Container */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 🔹 Header (Fixed at Top) */
.app-header {
  width: 100%;
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

/* 🔹 Main Content (Takes Up Remaining Space) */
.app-content {
  flex-grow: 1;
  padding: 80px 20px;
  margin-top: 80px;
  margin-bottom: 60px;
  overflow-y: auto;
}

/* 🔹 Footer (Fixed at Bottom) */
.app-footer {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  text-align: center;
  padding: 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
}

/* 🔹 Footer Links */
.app-footer a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  transition: color 0.3s;
}

.app-footer a:hover {
  color: #1db7ff;
}

/* 🔹 Background - Proper Dark Gradient */
.animated-background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;
  background: linear-gradient(120deg, #1e3c72, #2a5298, #1e3c72);
  background-size: 300% 300%;
  animation: gradientAnimation 15s infinite alternate;
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
body {
  background: #121212; /* Ensures dark mode works */
  color: white;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

/* 🔹 Make Sure Content is Visible */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  z-index: 2;
}

</style>
