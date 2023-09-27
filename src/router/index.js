import Vue from "vue";
import VueRouter from "vue-router";

// Routes
import Auth from "./modules/auth";
import Home from "./modules/home";

Vue.use(VueRouter);

const routes = [];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes.concat(Auth, Home),
});

export default router;
