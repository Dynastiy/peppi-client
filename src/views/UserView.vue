<template>
  <div>
    <div class="tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-3 tw-lg-cols-1 tw-gap-6 ">
      <div class=" tw-w-full">
        <user-side-drawer />
      </div>
      <div class="tw-bg-white lg:tw-col-span-2 md:tw-col-span-2 tw-p-4 tw-border tw-border-gray200 tw-w-full">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import UserSideDrawer from "@/components/Drawers/UserSideDrawer.vue";
export default {
  components: { UserSideDrawer },
};
</script>

<style></style>
