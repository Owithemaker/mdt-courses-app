<template>
  <div class="container">
    <h2 class="username">Welcome {{ name }}</h2>
    <h4>Our Latest Courses</h4>
    <p class="error" v-if="error">{{ error }}</p>

    <!-- Search Bar -->
    <div class="search-wrapper">
      <input type="text" v-model="search" @keyup="keywordSearch" placeholder="Search title.." />
      <select v-model="filteredChoice" @change="filteredSearch">
        <option value="Maths">Maths</option>
        <option value="English">English</option>
        <option value="Economics">Economics</option>
      </select>

      <button @click="sortSearch">Sort Topics</button>
    </div>

    <div class="courses-container">
      <div
        class="course"
        v-for="(course, index) in filteredcourses"
        v-bind:item="course"
        v-bind:index="index"
        v-bind:key="course._id"
      >
        <p class="course-topic">{{ course.topic }}</p>
        <p class="course-location">{{ course.location }}</p>
        <p class="course-price">{{ course.price }}</p>
        <p class="course-creation-date">
          {{
          `${course.createdAt.getDate()}/${course.createdAt.getMonth()}/${course.createdAt.getFullYear()}`
          }}
        </p>
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
      filteredcourses: [],
      error: "",
      topic: "",
      location: "",
      price: "",
      name: "",
      email: "",
      search: "",
      filteredChoice: "",
    };
  },
  methods: {
    keywordSearch() {
      this.filteredcourses = this.courses.filter((course) => {
        return course.topic.toLowerCase().includes(this.search.toLowerCase());
      });
    },

    filteredSearch() {
      this.filteredcourses = this.filteredcourses.filter((course) => {
        return course.topic
          .toLowerCase()
          .includes(this.filteredChoice.toLowerCase());
      });
    },

    dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    },

    sortSearch() {
      console.log("sorted");
      this.filteredcourses = this.courses.sort(this.dynamicSort("topic"));
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
      this.filteredcourses = this.courses;
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

.search-wrapper {
  display: flex;
}

.search-wrapper input,
.search-wrapper select {
  width: 100%;
  max-width: 400px;
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #b22538;
  margin-right: 1rem;
}

.search-wrapper button {
  color: #fff;
  text-decoration: none;
  background: #dd4545;
  display: inline-block;
  margin-right: 1rem;
  border: 1px solid #b22538;
  padding: 0.3rem 1rem;
  font-size: 1rem;
  margin-left: 1rem;
  border-radius: 20px;
}
</style>
