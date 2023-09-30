import Vue from "vue";
import VueRouter from "vue-router";

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

export default router;
