<template>
  <div>
    <div
      class="tw-grid lg:tw-grid-cols-6 md:tw-grid-cols-6 tw-grid-cols-1 lg:tw-gap-5 md:tw-gap-3 tw-gap-3"
    >
      <div class="lg:tw-col-span-4 md:tw-col-span-3">
        <checkout-options
          :pickup_station="pickup_station"
          @select-pickup-location="selectPickupLocation"
        />
      </div>
      
      <div class="lg:tw-col-span-2 md:tw-col-span-2">
        <cart-and-shipping :pickup_station="pickup_station"/>
      </div>
    </div>

    <!-- Select Pickup Location -->
    <select-pickup-station
      :visible="pickup_location_modal"
      @toggle="selectPickupLocation"
      @selectedPickupLocation="selectedPickupLocation"
      :statesList="states"
      title="Select Pickup Station"
    />
  </div>
</template>

<script>
// import TableComponent from "@/components/TableComponent.vue";
import CartAndShipping from "@/components/User/Cart/CartAndShipping.vue";
import CheckoutOptions from "@/components/User/Cart/CheckoutOptions.vue";
import SelectPickupStation from "@/components/Modals/SelectPickupStation.vue";
// import CartItem from '@/components/Cards/CartItem.vue'
export default {
  components: {
    // TableComponent,
    CartAndShipping,
    CheckoutOptions,
    SelectPickupStation,
  },
  data() {
    return {
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
      pickup_location_modal: false,
      pickup_station: null,
      states: [],
    };
  },
  methods: {
    getStates() {
      this.$request
        .get(`/states`)
        .then((res) => {
          this.states = res.data.states;
          console.log(this.states, "kkk");
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    selectedPickupLocation(value) {
      let selectedData = JSON.parse(value);
      this.pickup_station = selectedData;
    },

    selectPickupLocation() {
      this.pickup_location_modal = !this.pickup_location_modal;
    },
  },

  beforeMount() {
    this.getStates();
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
