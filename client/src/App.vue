<template>
  <div id="app">
    <nav class="p-navigation">
      <router-link to="/">View Courses</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Sign Up</router-link>
      <button @click="logout">Logout</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
body {
  background: url("https://ideastream-production.s3.amazonaws.com/uploads/2020/2/19/Book%20Shelves.jpg");
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  max-width: 1000px;
  padding: 2rem;
  border-radius: 4px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  height: 90vh;
}
.p-navigation {
  display: flex;
  justify-content: center;
}

.p-navigation a,
.p-navigation button {
  color: #fff;
  text-decoration: none;
  background: #dd4545;
  display: inline-block;
  margin-right: 1rem;
  border: 1px solid #b22538;
  padding: 0.3rem 1rem;
  font-size: 1rem;
  border-radius: 20px;
}
</style>
