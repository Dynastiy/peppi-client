<template>
  <div>
    <div
      class="tw-grid lg:tw-grid-cols-6 md:tw-grid-cols-6 tw-grid-cols-1 lg:tw-gap-5 md:tw-gap-3 tw-gap-3"
    >
      <div class="lg:tw-col-span-4 md:tw-col-span-3">
        <cart-items :items="cart" :fields="fields" @remove="removeCartItem" />
      </div>
      <div class="lg:tw-col-span-2 md:tw-col-span-2" v-if="cart.length > 0">
        <cart-and-shipping />
      </div>
    </div>
  </div>
</template>

<script>
// import TableComponent from "@/components/TableComponent.vue";
import CartAndShipping from "@/components/User/Cart/CartAndShipping.vue";
import CartItems from "@/components/User/Cart/CartItems.vue";
// import CartItem from '@/components/Cards/CartItem.vue'
export default {
  components: {
    // TableComponent,
    CartAndShipping,
    CartItems,
  },
  data() {
    return {
      labels: [
        { text: "ID", field: "id" },
        { text: "Name", field: "name" },
        { text: "Created", field: "date_created" },
      ],
      data: [
        { id: 1, name: "Foo", date_created: "01.01.2021" },
        { id: 2, name: "Bar", date_created: "01.01.2021" },
      ],
      fields: [
        {
          key: "cartImg",
          label: "",
          // width: "10px"
        },
        {
          key: "product.name",
          label: "Product",
          // width: "100%"
        },
        {
          key: "product.price",
          label: "Price",
          // formatter: (val) => {
          //   return Number(val).toLocaleString("en-US", {
          //     style: "currency",
          //     currency: "NGN",
          //   });
          // },
        },
        {
          key: "quantity",
          label: "Quantity",
        },
        {
          key: "productTotal",
          label: "Total",
        },
        {
          key: "cartAction",
          label: "",
        },
      ],
      busy: false,
    };
  },
  methods: {
    removeCartItem(item) {
      this.$store.dispatch("cart/removeCartItem", item);
    },

    addLocalItemsToCart() {
      const token = localStorage.getItem("peppi_token");
      if (token) {
        for (const item of this.cart) {
          this.checkItemInCart(item);
        }
      }
    },

    checkItemInCart(value) {
      let cartItems = this.userCart;
      console.log(cartItems);
      const val = cartItems.filter(
        (elem) => value.product_id === elem.product_id
      );
      console.log(val);
      const result = val.length !== 0;
      result ? this.updateCartItem(value) : this.addToCart(value);
      localStorage.setItem("hasMountedFunctionRun", "true");
    },

    addToCart(value) {
      this.busy = false;
      let payload = {
        quantity: 1,
        product_id: value.product_id,
        product: value.product,
      };
      this.$store.dispatch("cart/addToCart", payload).then(() => {
        this.$emit("reloadData");
      });
    },

    updateCartItem(value) {
      const index = this.userCart.findIndex(
        (item) => item.product_id === value.product_id
      );
      const quantity = value.quantity;

      // Create an updatedItem object with the new values
      var payload = { ...this.userCart[index], quantity: quantity };

      // Dispatch the updateItem action from the cart module
      this.$store
        .dispatch("cart/updateCartItem", { index, payload })
        .then(() => {
          this.$emit("reloadData");
        });
    },
  },

  mounted() {
    if (!localStorage.getItem("hasMountedFunctionRun")) {
      this.addLocalItemsToCart();
    }
  },

  computed: {
    cart() {
      return this.$store.getters["cart/getCartItems"];
    },
    userCart() {
      return this.$store.getters["auth/getUser"].cart;
    },
    onlineCart() {
      return this.$store.getters["cart/getOnlineCart"];
    },
    loading() {
      return this.$store.getters["cart/isLoading"];
    },
  },
};
</script>

<style></style>
