<template>
  <div class="tw-flex tw-justify-between tw-border-b  tw-border-b-gray400 p-3">
    <div class="tw-flex tw-w-full">
      <div
        class="product-image align-items-center d-flex flex-column"
        style="gap: 20px"
      >
        <img
          class="tw-h-16 lg:tw tw-w-16 tw-rounded-lg tw-object-cover"
          :src="item.product.images[0].url"
          alt=""
        />
      </div>
      <div>
        <h6 class="product-name mb-2">XXXXXXXXX</h6>
        <h6>N56.00</h6>
        <div class="tw-flex tw-my-2" style="gap: 5px">
          <h6 class="text-muted" style="font-size: 16px">
            <span class="text-muted font-weight-light">Seller:</span> V-max Mall
          </h6>
          <el-divider direction="vertical"></el-divider>
          <h6 class="text-muted" style="font-size: 16px">
            <span class="text-muted font-weight-light">Size:</span> 44
          </h6>
        </div>
        <div class="tw-flex tw-items-center tw-justify-between tw-mt-1">
          <h6 class="text-muted tw-text-sm tw-text-gray400 tw-font-medium">
            Available in Stock
          </h6>
        </div>
      </div>
    </div>
    <div class="tw-text-gray400 tw-flex tw-gap-1" role="button">
          <i-icon icon="ic:baseline-delete-outline" width="22px" />
          <span style="font-size: 14px; font-weight: 500">REMOVE ITEM</span>
        </div>

    <div class="d-flex flex-column justify-content-between">
      <div class="right-side d-flex flex-column" style="gap: 8px">
        <h5>N5600.00</h5>
        <div class="d-flex align-items-center" style="gap: 5px">
          <h6 class="text-muted" style="text-decoration: line-through">
            N1200.00
          </h6>
          <span class="discount">-45%</span>
        </div>
      </div>
      <!-- <el-input-number
          v-model="num"
          @change="handleChange"
          :min="1"
          :max="10"
        ></el-input-number> -->
      <div class="input-qty d-flex align-items-center">
        <span role="button" @click="handleChange('decrease')">
          <i-icon icon="ic:twotone-minus" />
        </span>
        <input
          type="number"
          v-model="num"
          min="1"
          max="10"
          aria-valuemax="10"
          aria-valuemin="1"
          aria-valuenow="1"
        />
        <span role="button" @click="handleChange('increase')">
          <i-icon icon="ic:baseline-plus" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 props: {
    item: {
    type: Object,
    default: () => {},
  },
 },
  data() {
    return {
      customColor: "#F9B00A",
      num: 1,
      max: 10,
    };
  },
  methods: {
    handleChange(value) {
      if (value === "decrease") {
        if (this.num > 1) {
          this.num--;
        } else {
          return this.num;
        }
      } else {
        if (this.num !== this.max) {
          this.num++;
        } else {
          return this.num;
        }
      }
    },
  },
};
</script>
