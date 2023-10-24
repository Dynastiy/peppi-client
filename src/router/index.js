/* eslint-disable no-undef */
import Vue from "vue";
import VueRouter from "vue-router";

// import store from "@/store"

// Routes
import Auth from "./modules/auth";
import Home from "./modules/home";
import User from "./modules/user";

Vue.use(VueRouter);

const routes = [];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes.concat(Auth, Home, User),
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

router.beforeEach((to, from, next) => {
  var isLoggedIn = localStorage.getItem('token');
  NProgress.start();
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    if (!isLoggedIn) {
      // Redirect to the login page
      next({ path: '/sign-in', query: { redirectFrom: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
  NProgress.done();
})

export default router;
