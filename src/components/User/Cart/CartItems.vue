<template>
  <div>
    <div class="tw-border tw-border-gray300 tw-p-3 tw-pt-8 tw-w-full">
      <h5 class="tw-font-light tw-text-[18px] tw-mb-6 tw-uppercase">
        <span class="tw-font-normal">{{ `cart items` }}</span>
        <span class="tw-text-sm tw-font-semibold">{{
          `(${items.length} items)`
        }}</span>
      </h5>
      <div
        class="lg:tw-flex md:tw-flex tw-hidden tw-px-2 tw-bg-dark-100 tw-py-3"
      >
        <div class="tw-w-[80px]"></div>
        <div class="tw-w-full lg:tw-flex md:tw-flex tw-hidden tw-text-gray100">
          <div class="col-md-3">
            <h5 class="tw-text-sm tw-mb-0">Product</h5>
          </div>
          <div class="col-md-3">
            <h5 class="tw-text-sm tw-mb-0">Price</h5>
          </div>
          <div class="col-md-2">
            <h5 class="tw-text-sm tw-mb-0">Qty</h5>
          </div>
          <div class="col-md-3">
            <h5 class="tw-text-sm tw-mb-0">Sub Total</h5>
          </div>
          <div class="col-md-1">
            <h5 class="tw-text-sm tw-mb-0"></h5>
          </div>
        </div>
      </div>

      <div class="tw-pt-3">
        <div v-for="(item, idx) in items" :key="idx" class="">
          <div class="tw-flex tw-gap-1" v-if="item.product !== null">
            <div class="lg:tw-w-[80px] md:tw-w-[80px] tw-w-[150px]">
              <img
                class="tw-block lg:tw-w-[60px] md:tw-w-[60px] tw-w-[100px] lg:tw-h-[60px] md:tw-h-[60px] tw-h-[100px] tw-border tw-border-gray400 tw-p-[5px] tw-object-cover"
                :src="item.product !== null ? item.product.images[0].url : ''"
                alt=""
              />
            </div>
            <div
              class="row tw-w-full tw-items-center lg:tw-gap-0 md:tw-gap-0 tw-gap-2"
            >
              <div class="col-md-3">
                <div>
                  <h6
                    class="tw-font-semibold tw-capitalize lg:tw-text-[14px] md:tw-text-[14px] tw-text-[18px] tw-mb-0"
                  >
                    {{ item.product === null ? "No data" : item.product.name }}
                  </h6>
                </div>
              </div>
              <div class="col-md-3">
                <h5 class="tw-text-[15px] tw-mb-0">
                  {{ item.product.price | formatCurrency }}
                </h5>
              </div>
              <div class="col-md-2">
                <div class="">
                  <div class="toggle--amount">
                    <input
                      @input="updateCartItem(item)"
                      type="tel"
                      placeholder="0"
                      v-model="item.quantity"
                      class="tw-w-[60px] tw-border-0 tw-bg-gray200 tw-px-2 tw-py-2 tw-outline-none tw-rounded-none"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <h5 class="tw-text-[15px] tw-mb-0">
                  {{ (item.quantity * item.product.price) | formatCurrency }}
                </h5>
              </div>
              <div class="col-md-1">
                <span
                  role="button"
                  class="tw-shadow-lg tw-block tw-bg-gray200 tw-w-fit tw-p-2 tw-rounded-md"
                  @click="$emit('remove', item)"
                >
                  <i-icon
                    icon="fluent:delete-32-regular"
                    class="tw-text-red-600"
                    width="20px"
                  />
                </span>
              </div>
            </div>
          </div>
          <div v-else>
            <span>Product no longer exists</span>
            <span
              role="button"
              class="tw-shadow-lg tw-block tw-bg-gray200 tw-w-fit tw-p-2 tw-rounded-md"
              @click="$emit('remove', item)"
            >
              <i-icon
                icon="fluent:delete-32-regular"
                class="tw-text-red-600"
                width="20px"
              />
            </span>
          </div>
          <hr class="tw-my-3" />
        </div>
      </div>

      <div
        v-if="items.length === 0"
        class="tw-flex tw-flex-col tw-items-center"
      >
        <i-icon icon="system-uicons:box-open" width="200" />
        <h6 class="tw-my-3 tw-text-red-600">No items in cart</h6>
      </div>

      <div class="tw-text-right">
        <button class="peppi-btn peppi-primary" @click="$router.push('/')">
          continue shopping
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { pick } from "lodash";
export default {
  props: {
    items: {
      type: Array,
    },
    fields: {
      type: Array,
    },
    labels: {
      type: Array,
    },
    data: {
      type: Array,
    },
  },

  data() {
    return {
      displayKey: ["quantity"],
      quantity: null,
    };
  },

  methods: {
    filterData(value) {
      return pick(value, this.displayKey);
    },

    updateCartItem(e) {
      // const id = e.id;
      // let payload = {
      //   quantity: e.quantity,
      //   product_id: e.product.product_id,
      // };
      // this.$request
      //   .post(`cart/update/${id}`, payload)
      //   .then((res) => {
      //     this.$store.dispatch("cart/getUserCart");
      //     return res;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      const index = this.cart.findIndex(
        (item) => item.product_id === e.product_id
      );
      // const quantity = Number(e.quantity);

      // Create an updatedItem object with the new values
      // const cart = this.$store.getters["cart/getCartItems"];
      console.log(this.cart[index], "ommmo");
      var payload = { ...this.cart[index] };

      // Dispatch the updateItem action from the cart module
      this.$store
        .dispatch("cart/updateCartItem", { index, payload })
        .then(() => {
          this.$emit("reloadData");
        });
    },

    // handleChange (item) {
    //   item.quantity++
    //   const formData = new FormData()
    //   formData.append('quantity', item.quantity)
    //   const payload = {
    //     id: item.id,
    //     payload: formData
    //   }
    //   console.log(payload)
    //   this.$store.dispatch('auth/updateCart', payload)
    // },

    productTotal(e) {
      let result =
        e.product !== null
          ? Number(e.quantity * e.product.price).toLocaleString("en-US", {
              style: "currency",
              currency: "NGN",
            })
          : "---";
      return result;
    },
  },
  watch: {
    // cart: {
    //   handler: function(newVal) {
    //     newVal.find(function (item) {
    //       console.log(item, "mmmmm");
    //       this.quantity = item.quantity
    //     });
    //   },
    //   immediate: true,
    //   deep: true
    // }
  },
  computed: {
    cart() {
      return this.$store.getters["cart/getCartItems"];
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100% !important;
}

th {
  background-color: var(--dark-100);
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
