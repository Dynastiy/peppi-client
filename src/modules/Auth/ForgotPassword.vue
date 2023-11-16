<template>
  <div class="auth-content">
    <div>
      <div class="tw-mb-4">
        <img src="@/assets/img/peppi-icon.svg" class="tw-h-12 tw-w-12" alt="" />
        <h5 class="tw-font-bold tw-text-2xl tw-mb-0">Forgot Password?</h5>
        <small class="tw-text-light tw-text-xs"
          >Enter your email for password reset instructions</small
        >
      </div>

      <div v-if="msg !== null">
        <h5 class="tw-font-semibold tw-text-center">
          {{ msg }}
        </h5>
      </div>

      <div v-else>
        <validation-observer v-slot="{ invalid, handleSubmit }">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <div>
              <validation-provider
                name="email"
                rules="required|email"
                v-slot="{ dirty, invalid, errors }"
              >
                <label for="email">Email</label>
                <div
                  class="input-field"
                  :class="{
                    error: dirty && invalid,
                  }"
                >
                  <input
                    type="email"
                    name="email"
                    id="email"
                    v-model="credentials.email"
                    placeholder="email"
                  />
                  <span class="email-iccon">
                    <i-icon icon="heroicons:envelope" class="form-icon" />
                  </span>
                </div>
                <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                  errors[0]
                }}</span>
              </validation-provider>
            </div>

            <div class="tw-mt-4">
              <button
                class="peppi-btn peppi-primary w-100"
                v-bind:disabled="invalid"
                :class="{ 'tw-bg-gray-400': invalid || loading }"
              >
                <span>Send</span>
              </button>
            </div>
          </form>
        </validation-observer>
      </div>

      <div class="tw-text-center tw-mt-1">
        <span
          class="tw-text-xs tw-font-semibold tw-text-primary"
          role="button"
          @click="$router.go(-1)"
        >
          Go Back
        </span>
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
        email: "",
      },
      typePassword: true,
      loading: false,
      msg: null,
    };
  },
  methods: {
    onSubmit() {
      let credentials = {
        email: this.credentials.email,
      };
      this.loading = true;
      this.$request
        .post(`auth/forgot-password`, credentials)
        .then((res) => {
          this.loading = false;
          this.msg = res.data.message;
          console.log(res, "kkk");
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
