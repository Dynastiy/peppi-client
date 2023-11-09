<template>
  <div>
    <h5 class="tw-text-sm tw-mb-4">Reset Password</h5>
    <form action="" class="" @submit.prevent="updatePassword">
      <div class="tw-flex tw-flex-col tw-space-y-5">
        <div>
          <label for="" class="tw-mb-1 tw-block tw-text-dark-100 tw-text-xs"
            >Old Password</label
          >
          <input
            v-model="payload.current_password"
            type="text"
            class="tw-bg-gray200 tw-w-full tw-py-3 tw-px-3 tw-outline-none"
          />
        </div>

        <div>
          <label for="" class="tw-mb-1 tw-block tw-text-dark-100 tw-text-xs"
            >New Password</label
          >
          <input
          v-model="payload.new_password"
            type="text"
            class="tw-bg-gray200 tw-w-full tw-py-3 tw-px-3 tw-outline-none"
          />
        </div>

        <div>
          <label for="" class="tw-mb-1 tw-block tw-text-dark-100 tw-text-xs"
            >Confirm Password</label
          >
          <input
          v-model="payload.new_password_confirmation"
            type="text"
            class="tw-bg-gray200 tw-w-full tw-py-3 tw-px-3 tw-outline-none"
          />
        </div>

        <button class="peppi-btn peppi-primary tw-w-fit tw-mx-auto">
          reset password
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payload: {
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      },
    };
  },

  methods: {
    updatePassword() {
      this.$request
        .post(`auth/change-password`, this.payload)
        .then((res) => {
          this.$swal.fire("Nice!", `Password Changed`, "success");
          this.$store.dispatch("auth/logout");
          this.$router.go();
          return res;
        })
        .catch((err) => {
          console.log(err);
          // this.errors = err.data.errors;
        });
    },
  },
};
</script>

<style scoped>
input {
  font-size: 13px;
}
</style>
