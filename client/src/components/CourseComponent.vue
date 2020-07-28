<template>
  <div class="container">
    <h2 class="username">Welcome {{ name }}</h2>
    <h4>Our Latest Courses</h4>
    <p class="error" v-if="error">{{ error }}</p>

    <!-- Search Bar -->
    <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Search title.." />
    </div>

    <div class="courses-container">
      <div
        class="course"
        v-for="(course, index) in filteredList"
        v-bind:item="course"
        v-bind:index="index"
        v-bind:key="course._id"
      >
        {{
          `${course.createdAt.getDate()}/${course.createdAt.getMonth()}/${course.createdAt.getFullYear()}`
        }}
        <p class="course-topic">{{ course.topic }}</p>
        <p class="course-location">{{ course.location }}</p>
        <p class="course-price">{{ course.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import CourseService from "../CourseService";
export default {
  name: "CourseComponent",
  data() {
    return {
      courses: [],
      error: "",
      topic: "",
      location: "",
      price: "",
      name: "",
      email: "",
      search: "",
    };
  },
  computed: {
    filteredList() {
      return this.courses.filter((course) => {
        return course.topic.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  async mounted() {
    const res = await fetch("http://localhost:5000/user", {
      headers: { token: localStorage.getItem("token") },
    });
    const data = await res.json();
    console.log(data);
    this.name = data.user.name;
  },
  async created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }

    try {
      this.courses = await CourseService.getCourses();
    } catch (err) {
      this.error = err.message;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.courses-container {
  display: flex;
  max-width: 1000px;
  margin: auto;
  padding: 2rem;
  flex-wrap: wrap;
}

.course {
  width: 28%;
  padding: 1rem;
  margin-right: 0.8rem;
  box-shadow: -2px 0px 5px #c3c4c4;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  border-top: 4px solid #b22538;
}

.search-wrapper input {
  width: 100%;
  max-width: 400px;
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #b22538;
}
</style>
