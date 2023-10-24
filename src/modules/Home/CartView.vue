<template>
  <div>
    <div
      class="tw-grid lg:tw-grid-cols-6 md:tw-grid-cols-6 tw-grid-cols-1 lg:tw-gap-5 md:tw-gap-3 tw-gap-3"
    >
      <div class="lg:tw-col-span-4 md:tw-col-span-3">
        <cart-items :items="cart" :fields="fields" :labels="labels" :data="data" @remove="removeCartItem"/>
      </div>
      <div class="lg:tw-col-span-2 md:tw-col-span-2">
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
      this.$request
        .post(`/cart/delete/${item.id}`)
        .then((res) => {
          this.$store.dispatch("cart/getUserCart");
          this.$swal.fire(
            "Woo Hoo 😫!",
            `${item.product.name} removed from your cart.`,
            "success"
          );

          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    cart() {
      return this.$store.getters["cart/getCartItems"];
    },
    loading() {
      return this.$store.getters["cart/isLoading"];
    },
  },
};
</script>

<style></style>
