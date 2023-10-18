import Vue from "vue";
import Vuex from "vuex";

// Modules
import auth from "./modules/auth"
import cart from "./modules/cart"

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    cart
  },
});
