<template>
  <div>
    <b-table
      outlined
      :responsive="true"
      :busy="busy"
      :items="items"
      tdClass="tw-w-9/12 whitespace-nowrap"
      :fields="fields"
      show-empty
    >
      <template #empty>
        <div class="p-4">
          <div
            class="d-flex align-items-center flex-column justify-content-center"
          >
            <h5 class="no-data">No data recorded</h5>
            <!-- <img src="@/assets/img/empty.svg" alt="empty-list" class="empty" /> -->
          </div>
        </div>
      </template>

      <template #table-busy>
        <b-skeleton-table
          :rows="4"
          :columns="4"
          :table-props="{ bordered: false, striped: false }"
        ></b-skeleton-table>
      </template>

      <template #cell(productTotal)="data">
        {{
          data.item.product !== null
            ? Number(
                data.item.quantity * data.item.product.price
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "NGN",
              })
            : "---"
        }}
      </template>

      <template #cell(totalAmount)="data">
        {{
          data.item.product !== null
            ? Number(
                data.item.pivot.quantity * data.item.price
              ).toLocaleString("en-US", {
                style: "currency",
                currency: "NGN",
              })
            : "---"
        }}
      </template>

      <template #cell(quantity)="data">
        <input
          type="tel"
          placeholder="0"
          v-model="data.item.quantity"
          class="tw-w-[60px] tw-border-0 tw-bg-gray200 tw-px-2 tw-py-2 tw-outline-none tw-rounded-none"
        />
      </template>

      <template #cell(cartAction)="data">
        <span role="button" @click="$emit('remove', data.item)">
          <i-icon
            icon="iconamoon:close-light"
            class="tw-text-red-600"
            width="20px"
          />
        </span>
      </template>

      <template #cell(cartImg)="data">
        <span>
          <img
            class="tw-block lg:tw-w-[60px] md:tw-w-[60px] tw-w-[50px] lg:tw-h-[60px] md:tw-h-[60px] tw-h-[50px] tw-border tw-border-gray400 tw-p-[5px] tw-object-cover"
            :src="
              data.item.product !== null ? data.item.product.images[0].url : ''
            "
            alt=""
          />
        </span>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Array,
      default: () => [],
    },
    busy: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {};
  },

  methods: {
    updateAmount(value) {
      this.$emit("updateAmount", value);
    },
  },

  watch: {
    items: {
      handler: function (newVal) {
        // Find the item that has changed
        newVal.find(function (item) {
          if (item.product !== null) {
            console.log(item);
          }
        });
      },
      deep: true,
    },
  },
};
</script>

<style></style>
