<template>
  <div>
    <div
      class="tw-flex lg:tw-flex-row md:tw-flex-row tw-flex-col tw-items-start tw-gap-4"
    >
      <div
        class="tw-border tw-border-dashed tw-border-gray400 tw-p-3 lg:tw-w-5/12 md:tw-w-5/12 tw-w-full"
      >
        <div class="tw-w-fit tw-relative tw-mx-auto">
          <img
            :src="profile.profile_photo"
            style= "width:80px; height:80px; object-position: top;"
            class="tw-rounded-full tw-object-cover tw-mx-auto"
            alt=""
          />
          <div
            class="add-file tw-bottom-0 tw-right-0 tw-absolute"
            role="button"
          >
            <input
              @change="handleUpload"
              type="file"
              accept="image/*"
              id="choose-file"
              name="choose-file"
              class="tw-p-0"
            />
            <label class="m-0" for="choose-file" 
              ><label class="m-0" for="choose-file" 
                ><i-icon
                role="button"
                  icon="mdi:edit-circle"
                  class="file--icons tw-text-primary tw-text-2xl tw-bg-white tw-rounded-full"
                />
              </label>
            </label>
          </div>
        </div>
        <div class="tw-flex tw-items-center tw-justify-center tw-gap-1 tw-mt-2">
          <h6 class="tw-mb-0 tw-font-semibold">{{ user.username }}</h6>
          <span class="user-status" :class="user.status"></span>
        </div>
      </div>
      <div
        class="tw-border tw-border-dashed tw-border-gray400 tw-p-3 tw-w-full"
      >
        <form action="" class="" @submit.prevent="update">
          <div class="tw-flex tw-flex-col tw-space-y-5">
            <div
              class="tw-grid lg:tw-grid-cols-2 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-4"
            >
              <div class="tw-w-full">
                <label
                  for=""
                  class="tw-mb-1 tw-block tw-text-dark-100 tw-text-xs"
                  >First Name</label
                >
                <input
                  v-model="dataObj.first_name"
                  type="text"
                  class="tw-bg-gray200 tw-w-full tw-py-3 tw-px-3 tw-outline-none"
                />
                <div>
                  <span
                    class="tw-text-[11px] tw-block tw-text-red-600"
                    v-for="error in errors.first_name"
                    :key="error"
                    >*{{ error }}</span
                  >
                </div>
              </div>

              <div class="tw-w-full">
                <label
                  for=""
                  class="tw-mb-1 tw-block tw-text-dark-100 tw-text-xs"
                  >Last Name</label
                >
                <input
                  v-model="dataObj.last_name"
                  type="text"
                  class="tw-bg-gray200 tw-w-full tw-py-3 tw-px-3 tw-outline-none"
                />
                <div>
                  <span
                    class="tw-text-[11px] tw-block tw-text-red-600"
                    v-for="error in errors.last_name"
                    :key="error"
                    >*{{ error }}</span
                  >
                </div>
              </div>
              <div>
                <label
                  for=""
                  class="tw-mb-1 tw-block tw-text-dark-100 tw-text-xs"
                  >Gender</label
                >
                <select
                  v-model="dataObj.gender"
                  name=""
                  id=""
                  class="tw-bg-gray200 tw-w-full tw-py-3 tw-px-3 tw-outline-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <div>
                  <span
                    class="tw-text-[11px] tw-block tw-text-red-600"
                    v-for="error in errors.gender"
                    :key="error"
                    >*{{ error }}</span
                  >
                </div>
              </div>

              <div>
                <label
                  for=""
                  class="tw-mb-1 tw-block tw-text-dark-100 tw-text-xs"
                  >Date Of Birth</label
                >
                <input
                  v-model="dataObj.dob"
                  type="date"
                  class="tw-bg-gray200 tw-w-full tw-py-3 tw-px-3 tw-outline-none"
                />
                <div>
                  <span
                    class="tw-text-[11px] tw-block tw-text-red-600"
                    v-for="error in errors.dob"
                    :key="error"
                    >*{{ error }}</span
                  >
                </div>
              </div>

              <div class="tw-w-full">
                <label
                  for=""
                  class="tw-mb-1 tw-block tw-text-dark-100 tw-text-xs"
                  >City</label
                >
                <input
                  v-model="dataObj.city"
                  type="text"
                  class="tw-bg-gray200 tw-w-full tw-py-3 tw-px-3 tw-outline-none"
                />
                <div>
                  <span
                    class="tw-text-[11px] tw-block tw-text-red-600"
                    v-for="error in errors.city"
                    :key="error"
                    >*{{ error }}</span
                  >
                </div>
              </div>

              <div class="tw-w-full">
                <label
                  for=""
                  class="tw-mb-1 tw-block tw-text-dark-100 tw-text-xs"
                  >State</label
                >
                <input
                  v-model="dataObj.state"
                  type="text"
                  class="tw-bg-gray200 tw-w-full tw-py-3 tw-px-3 tw-outline-none"
                />
                <div>
                  <span
                    class="tw-text-[11px] tw-block tw-text-red-600"
                    v-for="error in errors.state"
                    :key="error"
                    >*{{ error }}</span
                  >
                </div>
              </div>

              <div class="tw-w-full">
                <label
                  for=""
                  class="tw-mb-1 tw-block tw-text-dark-100 tw-text-xs"
                  >Country</label
                >
                <input
                  v-model="dataObj.country"
                  type="text"
                  class="tw-bg-gray200 tw-w-full tw-py-3 tw-px-3 tw-outline-none"
                />
                <div>
                  <span
                    class="tw-text-[11px] tw-block tw-text-red-600"
                    v-for="error in errors.country"
                    :key="error"
                    >*{{ error }}</span
                  >
                </div>
              </div>

              <div class="tw-w-full">
                <label
                  for=""
                  class="tw-mb-1 tw-block tw-text-dark-100 tw-text-xs"
                  >Address</label
                >
                <input
                  v-model="dataObj.address"
                  type="text"
                  class="tw-bg-gray200 tw-w-full tw-py-3 tw-px-3 tw-outline-none"
                />
                <div>
                  <span
                    class="tw-text-[11px] tw-block tw-text-red-600"
                    v-for="error in errors.address"
                    :key="error"
                    >*{{ error }}</span
                  >
                </div>
              </div>
            </div>

            <button class="peppi-btn peppi-primary tw-w-fit tw-mx-auto">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataObj: {
        first_name: "",
        last_name: "",
        gender: "",
        dob: "",
        address: "",
        city: "",
        state: "",
        country: "",
      },
      errors: {},
      photo: null,
    };
  },
  methods: {
    update() {
      this.$request
        .post(`auth/update-profile`, this.dataObj)
        .then((res) => {
          this.$swal.fire("Nice!", `User profile updated`, "success");
          this.$store.dispatch("auth/getUser");
          return res;
        })
        .catch((err) => {
          console.log(err);
          this.$swal.fire("Owch!", `${err.data.message}`, "warning");
          this.errors = err.data.errors;
        });
    },

    updateProfilePhoto() {
      const formData = new FormData();
      formData.append("profile_photo", this.photo);
      this.$request
        .post(`auth/update-profile-photo`, formData)
        .then((res) => {
          this.$swal.fire("Nice!", `Profile Photo updated`, "success");
          this.$store.dispatch("auth/getUser");
          return res;
        })
        .catch((err) => {
          console.log(err);
          this.$swal.fire("Owch!", `${err.data.message}`, "warning");
          this.errors = err.data.errors;
        });
    },

    handleUpload() {
      const input = event.target;
      this.photo = input.files[0];
      this.updateProfilePhoto();
    },
  },

  watch: {
    profile: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.dataObj = {
            first_name: newVal.first_name,
            last_name: newVal.last_name,
            gender: newVal.gender,
            dob: newVal.dob,
            address: newVal.address,
            city: newVal.city,
            state: newVal.state,
            country: newVal.country,
          };
        }
      },
      immediate: true,
    },
  },

  computed: {
    user() {
      return this.$store.getters["auth/getUser"];
    },
    profile() {
      return this.user.profile;
    },
  },
};
</script>

<style scoped>
input,
select {
  font-size: 13px;
}

/* File INPUT */
.add-file [type="file"] {
  height: 0;
  width: 0;
  overflow: hidden;
}

.add-file [type="file"] + label {
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 0;
}

/* .add-file {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
} */
</style>
