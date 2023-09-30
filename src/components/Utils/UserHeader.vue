<template>
  <div
    class=" tw-bg-[#fff] tw-pt-4 tw-scroll-smooth tw-border-0 tw-rounded-md tw-mb-5"
    style=""
  >
    <div>
      <div class="tw-px-6 tw-flex tw-items-center tw-justify-between">
        <div class="">
          <div class="tw-text-xl text-capitalize tw-font-semibold tw-text-primary">
            {{ title }}
          </div>
          <span class="tw-text-gray4 tw-font-[400] tw-text-[14px]">{{
            email
          }}</span>
        </div>
        <div class="tw-flex tw-justify-between">
          <slot name="card-icons"></slot>
        </div>
      </div>
      <hr class="tw-ml-[220px] tw-mt-2 tw-mb-0" />
      <div class="card-body tw-flex tw-px-6 align-items-center">
        <slot name="left-body">
          <div class="col-lg-2 tw-relative tw-flex tw-items-center">
            <div
              class="tw-bg-gray6 tw-flex tw-items-center tw-justify-center tw-h-[100px] tw-w-[100px] tw-object-center tw-rounded-full"
            >
              <h1 class="tw-text-primary mb-0 tw-font-bold tw-uppercase">
                {{ getInitals }}
              </h1>
            </div>
            <!-- <img
                  class="tw-h-[100px] tw-w-[100px] tw-object-cover tw-object-center tw-rounded-full tw-bg-gray6"
                  :src="picture"
                />
                <div
                  class="tw-bg-primary tw-cursor-pointer tw-h-4 tw-w-5 tw-flex tw-justify-center tw-items-center tw-rounded-[5px] tw-absolute tw-bottom-2 tw-left-14"
                  @click.prevent="$refs.imageInput.click()"
                >
                  <Icon
                    icon="material-symbols:change-circle-rounded"
                    class="tw-text-sm tw-text-white"
                  />
                </div>
                <input
                  ref="imageInput"
                  type="file"
                  class="d-none"
                  :accept="format.join(',')"
                  @change.prevent="uploadImage()"
                /> -->
          </div>
        </slot>
        <slot name="main-body">
          <div class="tw-pl-6 w-100">
            <div class="row">
              <div
                v-for="(value, name) in filterData"
                :key="value"
                class="col-md-6 col-lg tw-mb-3"
              >
                <span
                  class="tw-text-xs tw-text-light tw-capitalize tw-font-medium"
                  >{{ name.split("_").join(" ") }}:</span
                >
                <div
                  v-if="typeof value !== 'object'"
                  class="tw-font-medium tw-text-sm"
                >
                  <slot :name="name" :value="value">
                    {{ value ? value : "No data available" }}
                    </slot
                  >
                </div>
              </div>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { pick } from "lodash";
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    displayKey: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  data() {
    return {
      format: [".jpg", ".jpeg", ".png"],
      profile_picture: this.data.profile_picture,
      isSticky: false,
      scrollPosition: null,
      months: "",
    };
  },
  computed: {
    getInitals() {
      return this.title.charAt(0);
    },

    filterData() {
      return pick(this.data, this.displayKey);
    },
   
    // picture() {
    //   if (this.profile_picture) {
    //     return this.profile_picture;
    //   } else if (!this.profile_picture && this.data.gender == "Female") {
    //     return require("@/assets/img/female-avatar.svg");
    //   } else if (!this.profile_picture && this.data.gender == "Male") {
    //     return require("@/assets/img/male-avatar.svg");
    //   }
    // },
  },
  methods: {
    
  },
};
</script>

<style scoped>
.transition {
  transition: opacity 2s ease;
  animation: slide-fade 0.3s ease-in-out 0s;
  /* opacity: 0; */
}
</style>
