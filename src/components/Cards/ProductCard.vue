<template>
  <div>
    <div class="tw-relative">
      <img
        class="tw-h-72 lg:tw tw-w-9/12 tw-object-cover tw-mx-auto tw-block"
        :src="item.images[0].url"
        alt=""
      />
      <div class="tw-absolute tw-top-0 tw-right-0 tw-flex tw-flex-col tw-space-y-1">
        <span class="tw-bg-red-400 tw-px-1 tw-py-1 tw-rounded-sm tw-uppercase tw-tracking-widest tw-text-xs">new</span>
        <span class="tw-bg-green-400 tw-px-1 tw-py-1 tw-rounded-sm tw-uppercase tw-tracking-widest tw-text-xs">sale</span>
      </div>
    </div>
    <div class="tw-flex tw-flex-col tw-space-y-3 tw-items-center tw-mt-3">
      <span
        role="button"
        @click="$router.push(`/product/${item.id}`)"
        class="tw-block tw-uppercase tw-tracking-widest hover:tw-text-primary tw-ease-in-out tw-duration-1000"
        >{{ item.name }}</span
      >
      <span
        class="tw-block tw-uppercase tw-font-medium hover:tw-text-primary tw-ease-in-out tw-duration-1000"
        >{{ Number(item.price).toLocaleString("en-US", {
            style: "currency",
            currency: "NGN",
          }) }}</span
      >
      <button
        class="peppi-btn peppi-primary hover:tw-bg-dark-100 tw-ease-in-out tw-duration-300 tw-w-full"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    id: {
      type: Number
    },
    item: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style></style>
