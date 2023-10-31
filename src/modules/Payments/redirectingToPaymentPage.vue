<template>
  <div>
    <!-- Redirecting to secure payment page -->
    <div class="tw-bg-gray200 tw-p-5 tw-w-fit tw-mx-auto">
      <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <img
          src="@/assets/img/peppi-icon.png"
          role="button"
          class=""
          width="25"
          alt=""
        />
        <span class="tw-text-sm tw-font-medium"
          >Pay instantly and securely</span
        >
      </div>
      <h6 class="tw-mb-1 tw-font-light tw-text-sm tw-text-center">
        Please, do not refresh this page or click the back button.
      </h6>
      <h6 class="tw-mb-0 tw-text-center tw-text-xs">
        We are redirecting you to pay.
      </h6>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    pay() {
      var order_id = this.$route.query.identifier;
      var overallAmount = this.$route.query.amount;

      let payload = {
        name: this.user.username,
        email: this.user.email,
        phone: "",
        amount: overallAmount,
        title: `Payment for ${this.totalQuantity} items`,
        description: `Payment for ${this.totalQuantity} of items worth ${Number(
          overallAmount
        ).toLocaleString("en-US", {
          style: "currency",
          currency: "NGN",
        })}`,
        order_id: order_id,
      };

      this.$request
        .post("/payment/make", payload)
        .then((res) => {
          console.log(res.data, "kkk");
          window.open(
            res.data.payment,
            "_self",
            "toolbar=yes,top=300,left=300,width=1000,height=1000"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created(){
    this.pay()
  },

  computed: {
    cart() {
      return this.$store.getters["cart/getCartItems"];
    },
    
    totalQuantity() {
      const cartItem = this.cart;
      const totalPrice = cartItem.reduce((accumulator, item) => {
        return accumulator + item.quantity;
      }, 0);
      return totalPrice;
    },

    user() {
      return this.$store.getters["auth/getUser"];
    },
  }
};
</script>

<style></style>
