<template>
  <div>
    <span
      role="button"
      @click="$router.go(-1)"
      class="tw-bg-primary tw-p-1 tw-flex tw-justify-center tw-items-center tw-w-fit tw-rounded-md tw-text-white tw-shadow tw-mb-3"
    >
      <i-icon icon="eva:arrow-back-outline" />
    </span>
    <h5 class="tw-font-semibold">Payment Details</h5>
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <div class="tw-flex tw-flex-col tw-gap-1">
          <!-- <b-skeleton-img width="80%" no-aspect height="250px" style="margin: 4px auto;"></b-skeleton-img> -->
          <b-skeleton
            width="100%"
            height="10px"
            style="margin: 4px auto; border-radius: 0"
          ></b-skeleton>
          <!-- <b-skeleton width="40%" style="margin: 4px auto;"></b-skeleton> -->
          <b-skeleton
            width="100%"
            height="80px"
            style="margin: 0 auto; border-radius: 0"
          ></b-skeleton>
          <b-skeleton
            width="100%"
            height="10px"
            style="margin: 4px auto; border-radius: 0"
          ></b-skeleton>
          <b-skeleton
            width="100%"
            height="10px"
            style="margin: 4px auto; border-radius: 0"
          ></b-skeleton>
          <b-skeleton
            width="100%"
            height="10px"
            style="margin: 4px auto; border-radius: 0"
          ></b-skeleton>
        </div>
      </template>
      <span>
        <span class="tw-flex tw-items-center tw-justify-between tw-gap-2">
          <h6
            v-if="Object.keys(item).length > 0"
            class="tw-font-medium tw-uppercase tw-text-[16px] tw-font-semibold tw-mb-0"
          >
            {{ "Payment #" + getRef(item.id) }}
          </h6>
          <span :class="item.status">{{ item.status }}</span>
        </span>
      </span>
      <div>
        <span class="tw-my-3 tw-block">
          <h6 class="tw-font-semibold tw-text-[13px] tw-mb-0">
            Transaction Reference
          </h6>
          <span class="tw-text-sm tw-text-gray-600">{{ item.tx_ref }}</span>
        </span>
        <span class="">
          <h6 class="tw-font-semibold tw-text-[13px] tw-mb-0">
            Email
          </h6>
          <span class="tw-text-sm tw-text-gray-600">{{ item.email }}</span>
        </span>
      </div>
      <hr class="tw-my-4 tw-border-gray400" />

      <div>
        <table-component :busy="loading" :fields="fields" :items="products" />
      </div>

      <div class="tw-flex tw-flex-col tw-gap-6">
        <!-- <div v-for="(productData, i) in item.products" :key="i">
            <div class="tw-flex tw-gap-3">
              <div class="tw-w-fit">
                <img
                  class="tw-w-[70px] tw-h-[45px] tw-rounded-lg tw-shadow-lg"
                  :src="productData.images[0].url"
                  alt=""
                />
              </div>
              <div class="tw-flex tw-h-[45px] tw-flex-col tw-justify-between">
                <h6 class="tw-font-normal">{{ productData.name }}</h6>
                <h6
                  class="tw-flex tw-gap-1 tw-text-[12px] tw-text-light tw-font-normal tw-mb-0"
                >
                  <span>Quantity:</span>
                  <span>{{ productData.pivot.quantity }} </span>
                  <span>|</span>
                  <span>{{
                    (productData.pivot.quantity * productData.price)
                      | formatCurrency
                  }}</span>
                </h6>
              </div>
            </div>
          </div> -->
      </div>
      <hr class="tw-my-4 tw-border-gray400 lg:tw-w-2/5 md:tw-w-2/5 tw-w-full tw-ml-auto" />
      <div class="tw-flex tw-flex-col tw-gap-3">
          <span
            v-for="(name, value) in filterData"
            :key="name"
            class="tw-flex tw-justify-between lg:tw-w-2/5 md:tw-w-2/5 tw-w-full tw-ml-auto"
          >
            <span class="tw-text-sm">{{ value }}</span>
            <span class="tw-text-sm">{{ name }}</span>
          </span>
        </div>
      <hr class="tw-my-4 tw-border-gray400 lg:tw-w-2/5 md:tw-w-2/5 tw-w-full tw-ml-auto" />
      <span class="tw-flex tw-justify-between lg:tw-w-2/5 md:tw-w-2/5 tw-w-full tw-ml-auto">
          <span class="tw-text-sm">Order Total</span>
          <span class="tw-text-sm" v-if="Object.keys(item).length > 0">{{
            (item.order.total_amount) | formatCurrency }}</span>
        </span>
    </b-skeleton-wrapper>
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
  import { pick } from "lodash";
export default {
  components: { TableComponent },
  data() {
    return {
      id: this.$route.params.id,
      item: {},
      displayKey: ["SubTotal", "Shipping"],
      loading: false,
      fields: [
        {
          key: "name",
          label: "Product Name",
        },
        {
          key: "pivot.quantity",
          label: "Qty",
        },
        {
          key: "price",
          label: "Rate",
          formatter: (value) => {
            return Number(value).toLocaleString("en-US", {
              style: "currency",
              currency: "NGN",
            });
          },
        },
        {
          key: "totalAmount",
          label: "Amount",
        },
      ],
    };
  },
  methods: {
    getSinglePayment() {
      this.loading = true;
      this.$request
        .get(`/payments/${this.id}`)
        .then((res) => {
          console.log(res);
          let resPayload = res.data;
          this.item = resPayload.payment;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          return err;
        });
    },

    getRef(value) {
      let result = value.split("-").join("").slice(0, 8);
      return result;
    },
  },

  beforeMount() {
    this.getSinglePayment();
  },

  computed: {
    filterData() {
      let data = {
        SubTotal: Number(this.subAmount).toLocaleString("en-US", {
          style: "currency",
          currency: "NGN",
        }),
        Shipping:
          Object.keys(this.item).length > 0
            ? Number(this.item.order.pickup_location.shipping_fee).toLocaleString(
                "en-US",
                {
                  style: "currency",
                  currency: "NGN",
                }
              )
            : "0",
      };
      return pick(data, this.displayKey);
    },

    subAmount() {
      if (Object.keys(this.item).length > 0) {
        const products = this.item.order.products;
        var totalPrice = products.reduce((accumulator, item) => {
          return accumulator + item.pivot.quantity * item.price;
        }, 0);
      }
      return totalPrice;
    },

    products(){
        if (Object.keys(this.item).length > 0)  {
            var allProducts = this.item.order.products
        }
        return allProducts
    }
  },
};
</script>

<style></style>
