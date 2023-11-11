<template>
  <div>
    <h5 class="tw-font-semibold tw-text-[20px]">
      Saved Items({{ wishlist.length }})
    </h5>

    <div class="tw-flex tw-flex-col tw-gap-4 tw-mt-6">
      <div
        class="tw-p-3 rounded-lg tw-border"
        v-for="(item, idx) in wishlist"
        :key="idx"
      >
        <div
          v-if="item.product !== null"
          class="tw-grid lg:tw-grid-cols-5 lg:tw-grid-cols-4 tw-grid-cols-1 justify-content-between align-items-center"
        >
          <div class="tw-flex tw-gap-2 lg:tw-col-span-4 md:tw-col-span-3">
            <img
              class="tw-h-16 lg:tw tw-w-16 tw-rounded-lg tw-object-cover"
              :src="item.product.images[0].url"
              alt=""
            />
            <div class="tw-flex tw-flex-col tw-gap-1">
              <h5 class="tw-mb-0 tw-font-semibold">{{ item.product.name }}</h5>
              <h6 class="tw-mb-0 tw-text-light">
                {{
                  Number(item.product.price).toLocaleString("en-US", {
                    style: "currency",
                    currency: "NGN",
                  })
                }}
              </h6>
              <!-- <div class="tw-flex tw-items-center tw-gap-2 tw-mt-3">
                <span class="tw-text-sm tw-text-light">Quantity:</span>
                <input
                  type="tel"
                  placeholder="0"
                  v-model="quantity"
                  class="tw-w-[60px] tw-border-0 tw-bg-gray200 tw-px-2 tw-py-2 tw-outline-none tw-rounded-none"
                />
              </div> -->
            </div>
          </div>

          <div
            class="tw-text-right lg:tw-h-full tw-flex lg:tw-flex-col lg:tw-mt-0 md:tw-mt-0 tw-mt-4 tw-justify-between tw-items-end tw-gap-4"
          >
            <button
              class="peppi-btn peppi-primary"
              @click="
                checkItemInCart(item) ? updateCartItem(item) : addToCart(item)
              "
            >
              Add to cart
            </button>
            <div
              class="tw-text-red-600 tw-flex tw-items-center tw-text-sm"
              style="gap: 5px"
              role="button"
            >
              <i-icon icon="ic:baseline-delete-outline" width="20" />
              <span
                class="tw-text-sm"
                style="text-decoration: underline"
                role="button"
                @click="removeItemFromWishlist(item)"
                >Remove Item</span
              >
            </div>
          </div>
        </div>

        <div v-else>Product no longer exists</div>
      </div>
    </div>

    <div
      v-if="wishlist.length === 0"
      class="tw-flex tw-flex-col tw-items-center"
    >
      <i-icon icon="system-uicons:box-open" width="200" />
      <h6 class="tw-my-3 tw-text-red-600">No items saved</h6>
      <button class="peppi-btn peppi-primary" @click="$router.push('/')">
        Continue Shopping
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 1,
      cartItem: {},
    };
  },
  methods: {
    removeItemFromWishlist(item) {
      this.$request
        .post(`/wishlist/delete/${item.id}`)
        .then((res) => {
          this.$store.dispatch("cart/getUserWishlist");
          this.$swal.fire(
            "Woo Hoo!",
            `${item.product.name} removed from your wishlist.`,
            "success"
          );

          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addToCart(item) {
      this.busy = false;
      let payload = {
        quantity: this.quantity,
        product_id: item.product_id,
      };
      this.$request
        .post(`cart/add`, payload)
        .then((res) => {
          this.$swal.fire(
            "Woa!",
            `${item.product.name} added to cart.`,
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

    updateCartItem(e) {
      const id = this.cartItem[0].id;
      let payload = {
        quantity: Number(this.cartItem[0].quantity) + 1,
        product_id: e.product_id,
      };
      this.$request
        .post(`cart/update/${id}`, payload)
        .then((res) => {
          this.$swal.fire(
            "Nice!",
            `${e.product.name} updated in cart.`,
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

    checkItemInCart(value) {
      const token = localStorage.getItem("peppi_token");
      if (token) {
        let cartItems = this.cart;
        let val = cartItems.filter(
          (elem) => value.product_id === elem.product_id
        );
        console.log(val);
        this.cartItem = val;
        const result = val.length !== 0;
        return result;
      } else {
        return false;
      }
    },
  },
  computed: {
    wishlist() {
      return this.$store.getters["cart/getWishlistItems"];
    },

    cart() {
      return this.$store.getters["cart/getCartItems"];
    },
  },
};
</script>

<style>
ul {
  padding-left: 0;
}

.el-popper[x-placement^="bottom"] {
  margin-top: 0 !important;
}

.el-dropdown-menu__item,
.el-menu-item {
  padding: 0 !important;
}

.el-dropdown-menu {
  background-color: var(--dark-100) !important;
  border-radius: 0 !important;
  padding: 0 !important;
}

.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: var(--primary) !important;
  color: var(--dark-100) !important;
}

.el-dropdown-menu__item {
  color: var(--white) !important;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.el-popper .popper__arrow,
.el-popper .popper__arrow::after {
  display: none !important;
}
</style>
