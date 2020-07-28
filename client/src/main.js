import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import CourseComponent from "./components/CourseComponent";
import Login from "./components/Login";
import Signup from "./components/Signup";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: CourseComponent },
  { path: "/signup", component: Signup },
  { path: "/login", component: Login },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
}).$mount("#app");
