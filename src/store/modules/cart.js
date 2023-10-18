/* eslint-disable no-undef */
import Vue from "vue";
import $request from "@/http/axios";
// import Cookies from "js-cookie";
// import config from "@/http/config.js";
// import router from "@/router";

Vue.use(require("vue-moment"));

// import toastify from "toastify-js";

const getDefaultState = () => {
  return {
    cart: [],
    wishlist: []
  };
};

export default {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    getCartItems: (state) => state.cart,
    getWishlistItems: (state) => state.wishlist,
  },

  mutations: {
    SET_CART(state, payload) {
      state.cart = payload;
    },

    SET_WISHLIST(state, payload) {
        state.wishlist = payload;
      },

  },
  actions: {
    // Get Cart Items
    async getUserCart({ commit }) {
      try {
        let res = await $request.get(`/cart`);
        let responsePayload = res.data;
        commit('SET_CART', responsePayload.cart_list)
        console.log(responsePayload);
        return res;
      } catch (error) {
        return error.data;
      }
    },


    // Get Cart Items
    async getUserWishlist({ commit }) {
        try {
          let res = await $request.get(`/wishlist`);
          let responsePayload = res.data;
          commit('SET_WISHLIST', responsePayload.wish_list)
          console.log(responsePayload);
          return res;
        } catch (error) {
          return error.data;
        }
      },
  },
};
