/* eslint-disable no-undef */
import Vue from "vue";
import $request from "@/http/axios";
// import Cookies from "js-cookie";
// import config from "@/http/config.js";
// import router from "@/router";

import swal from "sweetalert2";

Vue.use(require("vue-moment"));

import toastify from "toastify-js";

const getDefaultState = () => {
  return {
    cart: [],
    onlineCart: [],
    wishlist: [],
    loading: false,
  };
};

export default {
  namespaced: true,
  state: getDefaultState(),
  getters: {
    getCartItems: (state) => state.cart,
    getOnlineCart: (state) => state.onlineCart,
    getWishlistItems: (state) => state.wishlist,
    isLoading: (state) => state.loading,
  },

  mutations: {
    SET_CART(state, payload) {
      state.cart = payload;
      state.onlineCart = payload
    },

    SET_OFFLINE_CART(state, payload) {
      state.cart.push(payload);
    },

    REMOVE_CART_ITEM(state, index) {
      // Using splice to remove the item from the array
      state.cart.splice(index, 1);
    },

    UPDATE_CART_ITEM(state, payload) {
      Vue.set(state.cart, payload.product_id, {
        ...state.cart[payload.product_id],
        quantity: payload.quantity,
      });
    },

    UPDATE_ITEM(state, { index, payload }) {
      // Using Vue.set to ensure reactivity when updating an object property
      Vue.set(state.cart, index, payload);
      console.log(state.cart, index, payload);
    },

    SET_WISHLIST(state, payload) {
      state.wishlist = payload;
    },

    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    // Get Cart Items
    async getUserCart({ commit }) {
      commit("SET_LOADING", true);
      try {
        let res = await $request.get(`/cart`);
        let responsePayload = res.data;
        commit("SET_CART", responsePayload.cart_list);
        console.log(responsePayload);
        commit("SET_LOADING", false);
        return res;
      } catch (error) {
        commit("SET_LOADING", false);
        return error.data;
      }
    },

    // Add to Cart
    addToCart({ commit,dispatch }, payload) {
      console.log(payload);
      const token = localStorage.getItem("peppi_token");
      if (token) {
        $request
          .post(`cart/add`, payload)
          .then((res) => {
            toastify({
              text: `${payload.product.name} added to cart.`,
              className: "info",
              style: {
                background: "green",
                fontSize: "12px",
                borderRadius: "5px",
              },
            }).showToast();
            commit("SET_CART", payload);
            dispatch("getUserCart");
            return res;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        toastify({
          text: `${payload.product.name} added to cart.`,
          className: "info",
          style: {
            background: "green",
            fontSize: "12px",
            borderRadius: "5px",
          },
        }).showToast();
        commit("SET_OFFLINE_CART", payload);
      }
    },

    // Remove Item from Cart
    removeCartItem({ commit, dispatch }, payload) {
      const token = localStorage.getItem("peppi_token");
      if (token) {
        swal
          .fire({
            title: "Uhhhh! 😔",
            text: `Are you sure you want to remove item from cart?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Remove!",
          })
          .then((result) => {
            console.log(result, "kkk");
            if (result.isConfirmed) {
              $request
                .post(`/cart/delete/${payload.id}`)
                .then((res) => {
                  toastify({
                    text: `Woo Hoo 😫!, item removed from your cart.`,
                    className: "info",
                    style: {
                      background: "green",
                      fontSize: "12px",
                      borderRadius: "5px",
                    },
                  }).showToast();
                  dispatch("getUserCart");
                  return res;
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
      } else {
        swal
          .fire({
            title: "Uhhhh! 😔",
            text: `Are you sure you want to remove ${payload.product.name} from cart?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Remove!",
          })
          .then((result) => {
            console.log(result, "kkk");
            if (result.isConfirmed) {
              toastify({
                text: `Woo Hoo 😫!, ${payload.product.name} removed from your cart.`,
                className: "info",
                style: {
                  background: "green",
                  fontSize: "12px",
                  borderRadius: "5px",
                },
              }).showToast();
              commit("REMOVE_CART_ITEM", payload.product_id);
            }
          });
      }
    },

    // Update Cart Item
    updateCartItem({ dispatch, commit }, { index, payload }) {
      console.log(payload, "ommmooo");
      const token = localStorage.getItem("peppi_token");
      if (token) {
        $request
          .post(`cart/update/${payload.id}`, payload)
          .then((res) => {
            // swal.fire(
            //   "Nice!",
            //   `${payload.product.name} updated in cart.`,
            //   "success"
            // );
            toastify({
              text: `${payload.product.name} updated in cart.`,
              className: "info",
              style: {
                background: "green",
                fontSize: "12px",
                borderRadius: "5px",
              },
            }).showToast();
            dispatch("getUserCart");
            return res;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        toastify({
          text: `${payload.product.name} updated in cart.`,
          className: "info",
          style: {
            background: "green",
            fontSize: "12px",
            borderRadius: "5px",
          },
        }).showToast();
        // swal.fire("Woa!", `${payload.product.name} updated in cart.`, "success");
        commit("UPDATE_ITEM", { index, payload });
      }
    },

    // Get Wishlist Items
    async getUserWishlist({ commit }) {
      commit("SET_LOADING", true);
      try {
        let res = await $request.get(`/wishlist`);
        let responsePayload = res.data;
        commit("SET_WISHLIST", responsePayload.wish_list);
        console.log(responsePayload);
        commit("SET_LOADING", false);
        return res;
      } catch (error) {
        commit("SET_LOADING", false);
        return error.data;
      }
    },
  },
};
