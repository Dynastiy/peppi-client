<template>
  <div>
    <div class="tw-relative">
      <img
        class="tw-h-72 lg:tw tw-w-9/12 tw-object-cover tw-mx-auto tw-block"
        :src="item.images[0].url"
        alt=""
      />
      <div
        class="tw-absolute tw-top-0 tw-right-0 tw-flex tw-flex-col tw-space-y-1"
      >
        <span
          class="tw-bg-red-400 tw-px-1 tw-py-1 tw-rounded-sm tw-uppercase tw-tracking-widest tw-text-xs"
          >new</span
        >
        <span
          class="tw-bg-green-400 tw-px-1 tw-py-1 tw-rounded-sm tw-uppercase tw-tracking-widest tw-text-xs"
          >sale</span
        >
      </div>
    </div>
    <div class="tw-flex tw-flex-col tw-space-y-3 tw-items-center tw-mt-3">
      <span
        role="button"
        @click="$router.push(`/product/${item.id}`)"
        class="tw-block tw-uppercase tw-tracking-widest hover:tw-text-primary tw-ease-in-out tw-duration-1000"
        >{{ item.name }}</span
      >
      <span class="tw-block tw-uppercase tw-font-semibold tw-font-medium">{{
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
      };
      this.$request
        .post(`cart/add`, payload)
        .then((res) => {
          this.$swal.fire(
            "Woa!",
            `${this.item.name} added to cart.`,
            "success"
          );
          this.$store.dispatch("cart/getUserCart");
          this.$emit("reloadData");
          return res;
        })
        .catch((err) => {
          if (err.data.message === 'Attempt to read property "id" on null') {
            this.$router.push("/sign-in");
          }
          console.log(err.data.message);
        });
    },

    updateCartItem() {
      console.log(this.cartItem[0], "mmm");
      const id = this.cartItem[0].id;
      let payload = {
        quantity: Number(this.cartItem[0].quantity) + 1,
        product_id: this.item.id,
      };
      this.$request
        .post(`cart/update/${id}`, payload)
        .then((res) => {
          this.$swal.fire(
            "Nice!",
            `${this.item.name} updated in cart.`,
            "success"
          );
          this.$store.dispatch("cart/getUserCart");
          this.$emit("reloadData");
          return res;
        })
        .catch((err) => {
          console.log(err);
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
      const token = localStorage.getItem("token");
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
      const token = localStorage.getItem("token");
      if (token) {
        let cartItems = this.cart;
        let val = cartItems.filter((elem) => value === elem.product_id);
        // console.log(val);
        this.cartItem = val;
        const result = val.length !== 0;
        return result;
      } else {
        return false;
      }
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
