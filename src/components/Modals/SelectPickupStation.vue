<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="40%"
    >
      <div>
        <v-select v-model="state" :options="statesList" label="name">
          <template slot="no-options"> Nothing here.. </template>
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes"
              ><i-icon
                icon="radix-icons:caret-down"
                color="#4F4F4F"
                width="18px"
            /></span>
          </template>
        </v-select>
        <div class="tw-mt-4">
          <div v-if="pickup_locations.length === 0">
            <div class="tw-flex tw-justify-center tw-mb-3">
              <i-icon
                icon="tdesign:map-location"
                class="tw-font-light"
                width="65px"
              />
            </div>
            <h6 class="tw-font-light tw-text-sm tw-text-center tw-break-normal">
              Select a state to find a pickup station near you.
            </h6>

            <h6
              class="tw-text-red-500 tw-font-light tw-text-sm tw-text-center tw-break-normal"
            >
              No Pickup Location Found
            </h6>
          </div>

          <div>
            <div
              class="tw-grid tw-gap-3 lg:tw-grid-cols-2 md:tw-grid-cols-2 tw-grid-cols-1"
            >
              <div
                class="tw-flex tw-gap-2 tw-items-start"
                v-for="(item, idx) in pickup_locations"
                :key="idx"
              >
                <input
                  type="radio"
                  v-model="pickup_location"
                  class="tw-accent-primary tw-h-5 tw-border-primary tw-w-5"
                  name=""
                  :value="item"
                  :id="item.id"
                />
                <div class="tw-flex tw-flex-col">
                  <h5 class="tw-text-[15px] tw-font-semibold tw-mb-0">
                    {{ item.name }}
                  </h5>
                  <h6
                    class="tw-mb-0 tw-break-normal tw-font-light tw-text-[12px]"
                  >
                    {{ item.address }}
                  </h6>
                </div>
              </div>
            </div>

            <div class="tw-text-center tw-mt-4"  v-if="pickup_locations.length > 0">
              <button class="peppi-btn peppi-primary" @click="selectPickuplocation" :disabled="!pickup_location" :class="{'tw-bg-gray400': !pickup_location }">
                Select pickup Station
              </button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    statesList: {
      type: Array,
    },
    visible: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: "",
    },

    data: {
      type: Object,
      default: () => {},
    },

    editMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dataObj: {
        shipping_fee: "",
        address: "",
      },
      busy: false,
      validationErrors: {},
      dialogVisible: false,
      state: {},
      pickup_location: null,
    };
  },

  methods: {
    onSubmit() {
      this.busy = true;
      console.log(this.dataObj);
      const payload = {
        shipping_fee: this.dataObj.shipping_fee,
        address: this.dataObj.address,
        state_id: this.$route.params.id,
      };
      var url = this.editMode
        ? `/admin/pickup-locations/update/${this.data.id}`
        : "admin/pickup-locations/add";
      this.$request
        .post(`${url}`, payload)
        .then((res) => {
          console.log(res.data);
          this.busy = false;
          this.$toastify({
            text: this.editMode
              ? `Pickup Location Updated`
              : "Pickup Location Created",
            className: "info",
            position: "center",
            style: {
              background: "#1e1e1e",
              fontSize: "12px",
              borderRadius: "5px",
            },
          }).showToast();
          this.dataObj.name = "";
          this.$emit("done");
        })
        .catch((err) => {
          this.busy = false;
          this.validationErrors = err.data.errors;
          console.log(err.data.errors);
          this.dataObj.name = "";
          this.$toastify({
            text: `Error`,
            className: "info",
            position: "center",
            style: {
              background: "red",
              fontSize: "12px",
              borderRadius: "5px",
            },
          }).showToast();
          console.log(err);
        });
    },

    selectPickuplocation(){
      let shipping_data = {
        state: this.state,
        pickup_location: this.pickup_location
      }
      this.$emit('selectedPickupLocation', JSON.stringify(shipping_data))
      this.state = {}
      this.$emit("toggle");
    },

    handleClose() {
      this.state = {};
      this.$emit("toggle");
    },
  },

  watch: {
    visible: {
      handler(val) {
        this.dialogVisible = val;
      },
      immediate: true,
    },
  },

  computed: {
    pickup_locations() {
      let selectedState = this.state;
      if (Object.keys(selectedState).length > 0 && selectedState !== null) {
        var pickup_locations = this.state.pickup_locations;
        return pickup_locations;
      } else {
        return [];
      }
    },
  },
};
</script>

<style>
@media (max-width: 990px) {
  .el-dialog {
    width: 90% !important;
  }
}
</style>
