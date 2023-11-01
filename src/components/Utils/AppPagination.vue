<template>
  <div v-if="items.length > 0" class="tw-mt-3">
    <div class="tw-flex tw-justify-center tw-items-center tw-gap-3">
      <button class="tw-bg-primary tw-px-3 tw-text-lg tw-text-white  tw-rounded">&laquo;</button>
      <span class="tw-text-sm"
        >Showing {{ meta.from }} - {{ meta.to }} of {{ meta.total }} items</span
      >
      <button class="tw-bg-primary tw-px-3 tw-text-lg tw-text-white  tw-rounded">&raquo;</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      Default: () => {},
    },
    items: {
      type: Array,
      Default: () => [],
    },
    lastPage: {
      type: Number,
      Default: 0,
    },
    currentPage: {
      type: Number,
      Default: 0,
    },
  },
};
</script>

<style></style>
