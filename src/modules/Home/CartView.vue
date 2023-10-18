<template>
  <div> 
    <div>
      <table-component :items="cart" :fields="fields" @remove="removeCartItem"/>
    </div>
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
// import CartItem from '@/components/Cards/CartItem.vue'
export default {
  components: {
    TableComponent,
  },
  data() {
    return {
      fields: [
        {
          key: "cartImg",
          label: "",
        },
        {
          key: "product.name",
          label: "Product",
        },
        {
          key: "product.price",
          label: "Price",
          formatter: (val) => {
            return Number(val).toLocaleString("en-US", {
            style: "currency",
            currency: "NGN",
          })
          }
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
    };
  },
  methods:{
    removeCartItem(item) {
      this.$request
        .post(`/cart/delete/${item.id}`)
        .then((res) => {
          this.$store.dispatch("cart/getUserCart");
          this.$swal.fire(
            "Woo Hoo!",
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
  },
};
</script>

<style></style>
