<template>
  <div class="top-header">
    <div class="tw-flex tw-items-center tw-justify-between tw-p-3">
      <div>
        <span class="tw-flex tw-space-x-3">
          <a href="https://www.facebook.com/peppy.stores?mibextid=kFxxJD" target="_blank">
            <i-icon icon="bxl:facebook" class="top-header-icon" />
          </a>
          <a href="https://instagram.com/peppystores_1" target="_blank">
            <i-icon icon="raphael:instagram" class="top-header-icon" />
          </a>
          <a href="https://www.tiktok.com/@peppystores2022?_t=8hIyfSsYCz0&_r=1" target="_blank">
            <i-icon icon="ic:baseline-tiktok" class="top-header-icon" />
          </a>
          
        </span>
      </div>
      <div class="tw-hidden lg:tw-block md:tw-block">
        <span class="tw-tracking-widest">welcome to peppy stores</span>
      </div>
      <div class="tw-flex tw-space-x-2" v-if="!isLoggedIn">
        <router-link class="tw-tracking-wider" to="/sign-in"
          >sign in</router-link
        >
        <span>/</span>
        <router-link class="tw-tracking-wider" to="/sign-up"
          >sign up</router-link
        >
      </div>
      <a v-else class="tw-tracking-wider" role="button" @click="logout"
        >logout</a
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$swal
        .fire({
          title: "Uhhhh! 😔",
          text: "Are you sure you want to log out?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, logout!",
        })
        .then((result) => {
          console.log(result, "kkk");
          if (result.isConfirmed) {
            this.userLogout();
          }
        });
    },

    userLogout() {
      this.$store.dispatch("auth/logout");
      this.$swal
        .fire({
          title: "Woo hoo 😫",
          text: "Logged out succesfully",
          icon: "success",
          confirmButtonText: "Ok!",
        })
        .then((result) => {
          console.log(result, "kkk");
          if (result.isConfirmed) {
            this.$router.go();
          }
        });
    },
  },
  computed: {
    isLoggedIn() {
      const accessToken = localStorage.getItem("peppi_token");
      return accessToken;
    },
  },
};
</script>

<style>
.top-header a,
.top-header span {
  text-transform: uppercase;
  color: var(--dark-20);
  font-size: 13px;
  text-decoration: none;
  font-weight: 400;
}

.top-header-icon {
  font-size: 18px;
}
</style>
