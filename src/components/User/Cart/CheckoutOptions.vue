<template>
  <div>
    <div class="tw-border tw-border-gray300 tw-p-3 tw-w-full">
      <div>
        <h6 class="tw-uppercase tw-text-white tw-bg-primary tw-p-3">
          delivery details
        </h6>
        <div class="tw-border tw-border-gray300 tw-p-3 tw-rounded-lg tw-w-full">
          <h6 class="">Pickup Station</h6>
          <div class="lg:tw-flex md-tw-flex tw-justify-between">
            <div
              v-if="!pickup_station"
              class="tw-flex tw-gap-3 tw-items-center lg:tw-mb-0 md:tw-mb-0 tw-mb-4"
            >
              <span class="tw-bg-gray200 tw-shadow-lg tw-p-2 tw-rounded-full">
                <i-icon icon="tdesign:map-location" width="20px" />
              </span>
              <div>
                <h6 class="tw-text-sm tw-text-medium tw-mb-0">
                  No Pickup Station Selected
                </h6>
                <h6 class="tw-text-xs tw-mb-0 tw-font-light tw-text-gray-500">
                  To use this option, you will need to add a pickup station near
                  your location.
                </h6>
              </div>
            </div>
            <div class="tw-mb-3" v-else>
              <h6 class="tw-text-[15px] tw-text-medium tw-mb-0">
                {{ pickup_station.pickup_location.name }}
              </h6>
              <h6 class="tw-text-[13px] tw-mb-0 tw-font-light tw-text-gray-500">
                {{ pickup_station.pickup_location.address }}
              </h6>
            </div>
            <span
              class="tw-text-[13px] tw-underline hover:tw-text-primary tw-flex tw-items-center"
              role="button"
              @click="$emit('select-pickup-location')"
            >
              <span>Select Pickup Station</span>
              <span>
                <i-icon icon="heroicons-outline:chevron-right" />
              </span>
            </span>
          </div>
        </div>
      </div>

      <div class="tw-mt-6">
        <h6 class="tw-uppercase tw-text-white tw-bg-primary tw-p-3">
          payment method
        </h6>
        <div class="tw-border tw-border-gray300 tw-p-3 tw-rounded-lg tw-w-full">
          <div class="lg:tw-flex md-tw-flex tw-justify-between">
            <div
              class="tw-flex tw-gap-3 tw-items-center"
            >
              <span class="tw-bg-gray200 tw-shadow-lg tw-p-2 tw-rounded-full">
                <i-icon icon="solar:card-linear" width="20px" />
              </span>
              <div>
                <h6 class="tw-text-sm tw-text-medium tw-mb-0">
                  Pay with Cards, Bank Transfer or USSD
                </h6>
                <h6 class="tw-text-xs tw-mb-0 tw-font-light tw-text-gray-500">
                  You will be redirected to our secure checkout page
                </h6>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pickup_station: {
      type: Object,
    },
  },
  data() {
    return {
      selected_pickup_station: null,
    };
  },
};
</script>

<style></style>
