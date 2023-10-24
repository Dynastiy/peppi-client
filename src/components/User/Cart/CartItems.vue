<template>
  <div>
    <!-- <table class="table-responsive table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" v-for="(label, labelIndex) in fields" :key="labelIndex">
            {{ label.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, itemIndex) in items" :key="itemIndex">
          <td scope="row" v-for="(label, labelIndex) in fields" :key="labelIndex">
            {{ item[label.key] }}
          </td>
        </tr>
      </tbody>
    </table> -->

    <!-- <div class="header">
      <span v-for="(label, labelIndex) in fields" :key="labelIndex">
        {{ label.label }}
      </span>
    </div>

    <div class="body tw-w-full tw-overflow-auto">
      <span
        v-for="(item, itemIndex) in items"
        :key="itemIndex"
        class="tw-flex-nowrap tw-flex tw-w-full tw-items-center"
      >
        <span class="tw-flex tw-items-center tw-gap-3 tw-w-full">
          <img
            class="tw-block lg:tw-w-[60px] md:tw-w-[60px] tw-w-[50px] lg:tw-h-[60px] md:tw-h-[60px] tw-h-[50px] tw-border tw-border-gray400 tw-p-[5px] tw-object-cover"
            :src="item.product !== null ? item.product.images[0].url : ''"
            alt=""
          />
          <span class="tw-text-sm tw-w-full">
            {{ item.product.name }}
          </span>
        </span>

        <span class="tw-text-sm tw-w-full">{{
          Number(item.product.price).toLocaleString("en-US", {
            style: "currency",
            currency: "NGN",
          })
        }}</span>
        <span class="tw-text-sm tw-w-full">{{ item.quantity }}</span>
        <span class="tw-text-sm"> {{ productTotal(item) }}</span>
        <span role="button" @click="$emit('remove', data.item)">
          <i-icon
            icon="iconamoon:close-light"
            class="tw-text-red-600"
            width="20px"
          />
        </span>
      </span>
    </div> -->

    <div class="tw-border tw-border-gray300 tw-p-3 tw-pt-8 tw-w-full">
      <h5 class="tw-font-light tw-text-[18px] tw-mb-6 tw-uppercase">
        <span class="tw-font-normal">{{ `cart items` }}</span>
        <span class="tw-text-sm tw-font-semibold">{{
          `(${items.length} items)`
        }}</span>
      </h5>
      <div class="lg:tw-flex md:tw-flex tw-hidden tw-px-2 tw-bg-dark-100 tw-py-3">
        <div class="tw-w-[80px]"></div>
        <div
          class="tw-w-full lg:tw-flex md:tw-flex tw-hidden  tw-text-gray100"
        >
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
        <div class="tw-flex tw-gap-1">
          <div class="lg:tw-w-[80px] md:tw-w-[80px] tw-w-[150px]">
            <img
              class="tw-block lg:tw-w-[60px] md:tw-w-[60px] tw-w-[100px] lg:tw-h-[60px] md:tw-h-[60px] tw-h-[100px] tw-border tw-border-gray400 tw-p-[5px] tw-object-cover"
              :src="item.product !== null ? item.product.images[0].url : ''"
              alt=""
            />
          </div>
          <div class="row tw-w-full tw-items-center lg:tw-gap-0 md:tw-gap-0 tw-gap-2">
            <div class="col-md-3">
              <div>
                <h6 class="tw-font-semibold tw-capitalize lg:tw-text-[14px] md:tw-text-[14px] tw-text-[18px] tw-mb-0">
                  {{ item.product === null ? "No data" : item.product.name }}
                </h6>
              </div>
            </div>
            <div class="col-md-3">
              <h5 class="tw-text-[15px] tw-mb-0">
                {{
                  Number(item.product.price).toLocaleString("en-US", {
                    style: "currency",
                    currency: "NGN",
                  })
                }}
              </h5>
            </div>
            <div class="col-md-2">
              <div class="">
                <div class="toggle--amount">
                  <input
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
                {{
                  Number(item.quantity * item.product.price).toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "NGN",
                    }
                  )
                }}
              </h5>
            </div>
            <div class="col-md-1">
              <span role="button" class="tw-shadow-lg tw-block tw-bg-gray200 tw-w-fit tw-p-2 tw-rounded-md" @click="$emit('remove', item)">
                <i-icon
                  icon="fluent:delete-32-regular"
                  class="tw-text-red-600"
                  width="20px"
                />
              </span>
            </div>
          </div>
        </div>
        <hr class="tw-my-3" />
      </div>
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
    };
  },

  methods: {
    filterData(value) {
      return pick(value, this.displayKey);
    },
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
  computed: {},
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
