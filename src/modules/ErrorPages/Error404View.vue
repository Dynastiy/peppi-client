<template>
  <div
    class="tw-h-screen tw-flex tw-flex-col tw-justify-center tw-items-center"
  >
    <img src="@/assets/img/error-404.svg" width="200" alt="" />
    <h6 class="tw-mt-4">Page not Found or has been moved</h6>
    <div class="tw-text-center tw-mt-5">
      <button class="peppi-btn peppi-primary" @click="$router.go(-1)">
        Go Back
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
