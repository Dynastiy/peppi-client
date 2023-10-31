<template>
  <div>
    <div class="tw-border tw-border-gray300 tw-p-3 tw-pt-8">
      <h5 class="tw-font-light tw-text-[18px] tw-mb-6 tw-uppercase">
        <span class="tw-font-normal">{{ `summary` }}</span>
        <span class="tw-text-sm tw-font-semibold">{{
          `(${cart.length} items)`
        }}</span>
      </h5>

      <div class="tw-flex tw-justify-between tw-items-center tw-mb-3">
        <span class="tw-text-sm tw-font-normal">Subtotal:</span>
        <h5 class="tw-font-semibold">
          {{cartTotalAmount | formatCurrency}}
        </h5>
      </div>

      <div>
        <span
          class="tw-text-[13px] tw-text-red-500 tw-font-normal"
          v-if="!pickup_station"
          >* Delivery fees not included yet.</span
        >

        <div class="tw-flex tw-justify-between tw-items-center tw-mb-3" v-else>
          <span class="tw-text-sm tw-font-normal">Delivery Fees:</span>
          <h5 class="tw-font-semibold">
            {{totalAmount | formatCurrency}}
          </h5>
        </div>

        <div v-if="pickup_station">
          <hr class="tw-border-gray400 tw-my-2" />
          <div class="tw-flex tw-justify-between tw-items-center">
            <span class="tw-text-sm tw-font-semibold">Total:</span>
            <h5 class="tw-font-semibold">
              {{
                overallAmount | formatCurrency}}
            </h5>
          </div>
        </div>
      </div>

      <hr class="tw-border-gray400 tw-my-6" />

      <div class="tw-text-center">
        <button
          class="peppi-btn peppi-primary"
          @click="pickup_station ? makePayment() : toCheckoutPage()"
        >
          {{
            !pickup_station
              ? `Checkout
                (${cartTotalAmount | formatCurrency })`
              : `Complete Order`
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pickup_station"],

  methods: {
    toCheckoutPage() {
      this.$router.push("/checkout/summary").catch(()=>{});
    },

    makePayment() {
      let payload = {
        total_quantity: this.totalQuantity,
        total_amount: this.overallAmount,
        state_id: this.pickup_station.state.id,
        pickup_location_id: this.pickup_station.pickup_location.id,
      };
      this.$request.post('/orders/make', payload)
      .then((res)=> {
        console.log(res.data.order, "kkk");
        let resPayload = res.data.order
        let inverseId = btoa(resPayload.id)
        console.log(btoa(resPayload.id));
        this.$router.push(`/checkout/${inverseId}?identifier=${resPayload.id}&amount=${this.overallAmount}`)
        // this.pay(resPayload.id)
      })
      .catch((err)=> {
        console.log(err);
      })
      console.log(payload);
    },
  },

  computed: {
    cart() {
      return this.$store.getters["cart/getCartItems"];
    },

    cartTotalAmount() {
      const cartItem = this.cart;
      const totalPrice = cartItem.reduce((accumulator, item) => {
        return accumulator + item.quantity * item.product.price;
      }, 0);
      return totalPrice;
    },

    totalAmount() {
      const shipping_fee = !this.pickup_station
        ? ""
        : this.pickup_station.pickup_location.shipping_fee;
      var totalAmount;
      if (shipping_fee !== "") {
        totalAmount = shipping_fee;
      } else {
        totalAmount = "";
      }
      return totalAmount;
    },

    totalQuantity() {
      const cartItem = this.cart;
      const totalPrice = cartItem.reduce((accumulator, item) => {
        return accumulator + item.quantity;
      }, 0);
      return totalPrice;
    },

    overallAmount() {
      return this.cartTotalAmount + this.totalAmount;
    },

    user() {
      return this.$store.getters["auth/getUser"];
    },
  },
};
</script>

<style></style>
