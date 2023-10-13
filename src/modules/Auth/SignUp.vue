<template>
  <div class="auth-content">
    <div>
      <div class="tw-mb-6">
        <img src="@/assets/img/peppi-icon.svg" class="tw-h-12 tw-w-12" alt="" />
        <h5 class="tw-font-bold tw-text-2xl tw-mb-0">Create Account</h5>
        <small class="tw-text-light tw-text-xs"
          >Create new user account on peppy stores</small
        >
      </div>
      <validation-observer v-slot="{ invalid, handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <span v-if="errorMsg" class="tw-mb-2 tw-text-xs tw-text-red-600">*{{
            errorMsg
          }}</span>

          <div>
            <validation-provider
              name="username"
              rules="required"
              v-slot="{ dirty, valid, invalid, errors }"
            >
              <label for="username">Username</label>
              <div
                class="input-field"
                :class="{
                  error: dirty && invalid,
                  success: dirty && valid,
                }"
              >
                <input
                  type="text"
                  name="text"
                  id="username"
                  v-model="credentials.username"
                  placeholder="username"
                />
                <span class="email-iccon">
                  <i-icon icon="heroicons:user" class="form-icon" />
                </span>
              </div>
              <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
            </validation-provider>
            <span
              class="tw-text-xs tw-text-red-600"
              v-for="item in error.username"
              :key="item"
              >{{ item }}</span
            >
          </div>

          <div class="tw-my-3">
            <validation-provider
              name="email"
              rules="required"
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
                  placeholder="Enter email"
                />
                <span class="email-iccon">
                  <i-icon icon="heroicons:envelope" class="form-icon" />
                </span>
              </div>
              <span class="tw-text-xs tw-text-red-600" v-if="errors">{{
                errors[0]
              }}</span>
            </validation-provider>
            <span
              class="tw-text-xs tw-text-red-600"
              v-for="item in error.email"
              :key="item"
              >{{ item }}</span
            >
          </div>

          <div class="tw-mb-3">
            <validation-provider
              class=""
              name="password"
              rules="required"
              v-slot="{ dirty, valid, invalid, errors }"
            >
              <label for="password">Password</label>
              <div
                class="input-field"
                :class="{
                  error: dirty && invalid,
                  success: dirty && valid,
                }"
              >
                <input
                  :type="typePassword ? 'password' : 'text'"
                  name="password"
                  id="password"
                  v-model="credentials.password"
                  placeholder="Password"
                />
                <span
                  class="password-iccon"
                  role="button"
                  @click="typePassword = !typePassword"
                >
                  <i-icon
                    :icon="
                      typePassword ? 'tabler:eye' : 'gridicons:not-visible'
                    "
                    class="form-icon"
                  />
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
              <span>Sign Up</span>
            </button>
          </div>
        </form>
      </validation-observer>
      <div class="tw-text-center tw-mt-3">
        <span class="tw-text-xs tw-font-semibold"
          >Already have an account?
          <router-link to="/sign-in" class="tw-text-primary"
            >Sign In</router-link
          >
        </span>
      </div>
      <div class="tw-text-center tw-mt-1">
        <span class="tw-text-xs tw-font-semibold">
          <router-link to="/" class="tw-text-primary"
            >Go to Homepage</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
export default {
  components: {},
  data: () => {
    return {
      credentials: {
        email: "",
        password: "",
        username: "",
      },
      typePassword: true,
      loading: false,
      error: {},
      errorMsg: "",
    };
  },
  methods: {
    // ...mapActions("auth", ["loginUser"]),

    onSubmit() {
      let credentials = {
        email: this.credentials.email,
        username: this.credentials.username,
        password: this.credentials.password,
      };
      console.log(credentials);

      this.error = {};
      this.errorMsg = "";
      this.$request
        .post("/auth/signup", credentials)
        .then((res) => {
          console.log(res);
          this.$toastify({
            text: `Welcome back`,
            className: "info",
            position: "center",
            style: {
              background: "#333",
              fontSize: "12px",
              borderRadius: "5px",
            },
          }).showToast();
          this.$router.push('/sign-in')
        })
        .catch((err) => {
          let errPayload = err.data;
          console.log(err.data);
          this.errorMsg = errPayload.message;
          this.error = errPayload.errors;
        });
    },
  },

  mounted() {
    // this.$store.commit("auth/REMOVE_ERROR_SUCCESS");
  },

  watch: {},

  computed: {
    // ...mapState("auth", {
    //   loading: (state) => state.loading,
    //   error: (state) => state.error,
    //   errors: (state) => state.validationErrors,
    //   user: (state) => state.user,
    //   success: (state) => state.success,
    // }),
  },
};
</script>
