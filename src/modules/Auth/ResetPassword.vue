<template>
  <div class="auth-content">
    <div>
      <div class="tw-mb-4">
        <img src="@/assets/img/peppi-icon.svg" class="tw-h-12 tw-w-12" alt="" />
        <h5 class="tw-font-bold tw-text-2xl tw-mb-0">Reset Password?</h5>
        <small class="tw-text-light tw-text-xs"
          >Enter your new password and confirm</small
        >
      </div>

      <div>
        <validation-observer v-slot="{ invalid, handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <div>
             <div class="tw-mb-3">
              <validation-provider
              
                name="password"
                vid="confirmation"
                v-slot="{ dirty, invalid, errors }"
              >
                <label for="password">New Password</label>
                <div
                  class="input-field "
                  :class="{
                    error: dirty && invalid,
                  }"
                >
                  <input
                    type="text"
                    name="text"
                    id="password"
                    v-model="credentials.password"
                    placeholder="new password"
                  />
                  <span class="email-iccon">
                    <i-icon icon="bx:lock" class="form-icon" />
                  </span>
                </div>
                <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                  errors[0]
                }}</span>
              </validation-provider>
             </div>
              <div>
                <validation-provider
                name="confirm password"
                rules="confirmed:confirmation"
                v-slot="{ dirty, invalid, errors }"
              >
                <label for="confirm_password">Confirm Password</label>
                <div
                  class="input-field"
                  :class="{
                    error: dirty && invalid,
                  }"
                >
                  <input
                    type="text"
                    name="confirm_password"
                    id="confirm_password"
                    v-model="credentials.password_confirmation"
                    placeholder="confirm password"
                  />
                  <span class="email-iccon">
                    <i-icon icon="bx:lock" class="form-icon" />
                  </span>
                </div>
                <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                  errors[0]
                }}</span>
              </validation-provider>
              </div>
            </div>

            <div class="tw-mt-4">
              <button
                class="peppi-btn peppi-primary w-100"
                v-bind:disabled="invalid"
                :class="{ 'tw-bg-gray-400': invalid || loading }"
              >
                <span>Complete</span>
              </button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => {
    return {
      credentials: {
        password: "",
        password_confirmation: "",
      },
      typePassword: true,
      loading: false,
      msg: null,
    };
  },
  methods: {
    onSubmit() {
      const email = this.$route.query.email
      const token = this.$route.query.token
      let credentials = {
        password: this.credentials.password,
        password_confirmation: this.credentials.password_confirmation,
        email: email,
        token: token,
      };
      this.loading = true;
      this.$request
        .post(`auth/reset-password`, credentials)
        .then((res) => {
          this.loading = false;
          this.$swal
            .fire({
              title: "Nice",
              text: "Password reset succesful",
              icon: "success",
              confirmButtonText: "Ok!",
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.$router.push('/sign-in');
              }
            });
          return res;
        })
        .catch((err) => {
          console.log(err);
          this.$swal.fire("Owch!", `${err.data.message}`, "warning");
          this.errors = err.data.errors;
          this.loading = false;
        });
      console.log(credentials);
    },
  },

  mounted() {},

  watch: {},

  computed: {},
};
</script>
