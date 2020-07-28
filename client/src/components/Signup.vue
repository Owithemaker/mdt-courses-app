<template>
  <div class="signup-area">
    <h3>Signup to View Our Courses</h3>
    <p v-if="{ error }">{{ error }}</p>
    <input type="text" required placeholder="Name" v-model="name" />
    <input type="text" required placeholder="Email" v-model="email" />
    <input type="password" required placeholder="Password" v-model="password" />
    <button v-on:click="signup">Signup</button>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async signup() {
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      if (
        newUser.name !== "" &&
        newUser.email !== "" &&
        newUser.password !== ""
      ) {
        try {
          const res = await fetch(`http://localhost:5000/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          });
          const data = await res.json();
          if (data.title === "error") {
            this.error = data.error;
          }
          if (res.status === 200) {
            this.$router.push("/login");
          }
        } catch (err) {
          this.error = err.error;
          console.log(err);
        }
      } else {
        this.error = "Missing Fields, Please correct";
      }
    },
  },
};
</script>

<style scoped>
.signup-area {
  max-width: 500px;
  margin: 4rem auto;
}
.signup-area input {
  width: 100%;
  margin-bottom: 1.5rem;
  box-sizing: border-box;
  font-size: 1rem;
  padding: 0.5rem;
}

.signup-area button {
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
