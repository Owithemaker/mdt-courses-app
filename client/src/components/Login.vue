<template>
  <div class="login-area">
    <h3>Login to View Our Courses</h3>
    <p v-if="{ error }">{{ error }}</p>
    <input type="text" v-model="email" placeholder="Enter your email address" />
    <input
      type="password"
      v-model="password"
      placeholder="Enter your password"
    />
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      let currentUser = {
        email: this.email,
        password: this.password,
      };
      try {
        const res = await fetch(`http://localhost:5000/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentUser),
        });

        const data = await res.json();
        if (data.title === "error" || res.status === 401) {
          this.error = data.error;
        }
        console.log(data);
        if (res.status === 200) {
          localStorage.setItem("token", data.token);
          this.$router.push("/");
        }
      } catch (err) {
        this.error = err.error;
        console.log(err);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-area {
  max-width: 500px;
  margin: 4rem auto;
}
.login-area input {
  width: 100%;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 0.5rem;
}

.login-area button {
  color: #fff;
  text-decoration: none;
  background: #dd4545;
  display: inline-block;
  margin-right: 1rem;
  border: 1px solid #b22538;
  padding: 0.5rem 2.5rem;
  font-size: 1rem;
}
</style>
