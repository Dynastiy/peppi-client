<template>
  <div class="tw-shadow-lg tw-p-6 tw-rounded-lg">
    <div class="tw-relative">
      <img
        class="tw-h-72 lg:tw tw-w-9/12 tw-object-cover tw-mx-auto tw-block"
        :src="item.images.length > 0 ? item.images[0].url : require('@/assets/img/peppi-icon.png')"
        alt=""
      />
      <div
        class="tw-absolute tw-top-0 tw-right-0 tw-flex tw-flex-col tw-space-y-1"
      >
        <!-- <span
          class="tw-bg-red-400 tw-px-1 tw-py-1 tw-rounded-sm tw-uppercase tw-tracking-widest tw-text-xs"
          >new</span
        > -->
        <span
          class="tw-px-1 tw-py-1 tw-rounded-sm tw-uppercase tw-tracking-widest tw-text-xs"
          :class="[item.availability === 'yes' ? 'tw-bg-green-400' : 'tw-bg-red-400']"
        >
          {{ item.availability === "yes" ? "In stock" : "out of stock" }}
        </span>
      </div>
    </div>
    <div class="tw-flex tw-flex-col tw-space-y-3 tw-items-center tw-mt-3">
      <span
        role="button"
        @click="$router.push(`/product/${item.id}`)"
        class="tw-block tw-uppercase lg:tw-text-left md:tw-text-left tw-text-center tw-tracking-widest hover:tw-text-primary tw-ease-in-out tw-duration-1000"
        >{{ item.name }}</span
      >
      <span class="tw-block tw-uppercase lg:tw-text-left md:tw-text-left tw-text-center tw-font-semibold tw-font-medium">{{
        item.price | formatCurrency
      }}</span>
      <div class="tw-flex tw-gap-4 tw-items-center">
        <button
          @click="checkItemInCart(item.id) ? updateCartItem() : addToCart()"
          class="peppi-btn peppi-primary hover:tw-bg-dark-100 tw-ease-in-out tw-duration-300 tw-px-8 tw-w-full"
        >
          Add to Cart
        </button>
        <span
          role="button"
          @click="
            checkItemInWishlist(item.id)
              ? removeItemFromWishlist()
              : addToWishlist()
          "
        >
          <i-icon
            :icon="
              checkItemInWishlist(item.id)
                ? 'icon-park-solid:like'
                : 'icon-park-outline:like'
            "
            :class="{ 'tw-text-primary': checkItemInWishlist(item.id) }"
            width="30px"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
    },
    item: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      cartItem: [],
      wishlistItem: [],
    };
  },

  methods: {
    addToCart() {
      this.busy = false;
      let payload = {
        quantity: 1,
        product_id: this.item.id,
        product: this.item,
      };
      this.$store.dispatch("cart/addToCart", payload).then(() => {
        this.$emit("reloadData");
      });
    },

    updateCartItem() {
      const index = this.cart.findIndex(item => item.product_id === this.cartItem[0].product_id)
      const quantity = Number(this.cartItem[0].quantity) + 1

      // Create an updatedItem object with the new values
      var payload = { ...this.cartItem[0], quantity: quantity };

      // Dispatch the updateItem action from the cart module
      this.$store.dispatch('cart/updateCartItem', { index, payload }).then(() => {
        this.$emit("reloadData");
      });
    },

    removeItemFromWishlist() {
      const id = this.wishlistItem[0].id;
      this.$request
        .post(`wishlist/delete/${id}`)
        .then((res) => {
          this.$swal.fire(
            "Woo Hoo!",
            `${this.item.name} has been removed from your saved items.`,
            "success"
          );
          this.$emit("reloadData");
          this.$store.dispatch("cart/getUserWishlist");
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addToWishlist() {
      this.busy = false;
      let payload = {
        product_id: this.item.id,
      };
      this.$request
        .post(`wishlist/add`, payload)
        .then((res) => {
          this.$swal.fire(
            "Nice!",
            `${this.item.name} added to wishlist.`,
            "success"
          );
          this.$emit("reloadData");
          this.$store.dispatch("cart/getUserWishlist");
          return res;
        })
        .catch((err) => {
          console.log(err);
          if (err.data.message === 'Attempt to read property "id" on null') {
            this.$router.push("/sign-in");
          }
        });
    },

    checkItemInWishlist(value) {
      const token = localStorage.getItem("peppi_token");
      if (token) {
        let wishlistItems = this.wishlist;
        let val = wishlistItems.filter((elem) => value === elem.product_id);
        this.wishlistItem = val;
        const result = val.length !== 0;
        return result;
      } else {
        return false;
      }
    },

    getCartItem(value) {
      let result = value;
      return result;
    },

    checkItemInCart(value) {
      let cartItems = this.cart;
      let val = cartItems.filter((elem) => value === elem.product_id);
      this.cartItem = val;
      const result = val.length !== 0;
      return result;
    },
  },

  computed: {
    cart() {
      return this.$store.getters["cart/getCartItems"];
    },

    wishlist() {
      return this.$store.getters["cart/getWishlistItems"];
    },
  },
};
</script>

<style></style>
