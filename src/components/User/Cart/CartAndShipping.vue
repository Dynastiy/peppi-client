<template>
  <div>
    <div class="tw-border tw-border-gray300 tw-p-3 tw-pt-8">
      <h5 class="tw-font-light tw-text-[18px] tw-mb-6 tw-uppercase">
        <span class="tw-font-normal">{{`summary`}}</span> <span class="tw-text-sm tw-font-semibold">{{`(${cart.length} items)`}}</span>
      </h5>

      <div class="tw-flex tw-justify-between tw-mb-3">
        <span class="tw-text-sm tw-font-normal">Subtotal:</span>
        <h5 class="tw-font-semibold">
          {{
            Number(totalAmount).toLocaleString("en-US", {
              style: "currency",
              currency: "NGN",
            })
          }}
        </h5>
      </div>

      <div>
        <span class="tw-text-[13px] tw-text-red-500 tw-font-normal"
          >* Delivery fees not included yet.</span
        >
      </div>

      <hr class="tw-border-gray400 tw-my-6" />

      <div>
        <button class="peppi-btn peppi-primary" @click="toCheckoutPage">
          {{
            `Checkout
                (${Number(totalAmount).toLocaleString("en-US", {
                  style: "currency",
                  currency: "NGN",
                })})`
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toCheckoutPage() {
      alert("Hello");
    },
  },

  computed: {
    cart() {
      return this.$store.getters["cart/getCartItems"];
    },

    totalAmount() {
      const cartItem = this.cart;
      const totalPrice = cartItem.reduce((accumulator, item) => {
        return accumulator + item.quantity * item.product.price;
      }, 0);
      return totalPrice;
    },
  },
};
</script>

<style></style>
