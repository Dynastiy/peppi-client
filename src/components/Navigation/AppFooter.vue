<template>
  <div>
    <div>
      <footer class="tw-bg-dark-100 tw-px-6 tw-py-12 tw-mt-8">
        <div class="">
          <div class="tw-grid lg:tw-grid-cols-4 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-5">
            <div class="">
              <img src="@/assets/img/peppi-logo.png" width="150" alt="" />
            </div>

            <div class="">
              <h4 class="tw-text-primary tw-text-sm tw-underline">COMPANY</h4>
              <ul class="list-unstlyed">
                <!-- <li><router-link to="/privacy-policy"> About Us</router-link></li> -->
                <li>
                  <router-link to="/privacy-policy">
                    Privacy Policy</router-link
                  >
                </li>
                <li>
                  <router-link to="/terms-and-conditions"
                    >Terms and Conditions</router-link
                  >
                </li>
                <li><router-link to="/careers">Careers</router-link></li>
                <li><router-link to="/contact-us">Contact Us</router-link></li>
              </ul>
            </div>

            <div class="">
              <h4 class="tw-text-primary tw-text-sm tw-underline">MY ACCOUNT</h4>
              <ul class="list-unstlyed">
                <li><router-link to="/cart">View Cart</router-link></li>
                <li><router-link to="/sign-in">Sign In</router-link></li>
                <li>
                  <router-link to="/sign-up">Sign Up</router-link>
                </li>
              </ul>
            </div>

            <div class="">
              <h4 class="tw-text-primary tw-text-sm tw-underline">CUSTOMER SERVICE</h4>

              <p class="tw-text-gray400 tw-mb-0 tw-text-sm">Got Question? Email us</p>
              <h4 class="tw-text-white tw-text-sm ">
                <a href="mail-to:support@e-sharzy.com" class="tw-text-white tw-no-underline"
                  >support@peppystores23.com</a
                >
              </h4>
              <div class="mt-4">
                <h6 class="tw-text-gray400 tw-text-sm">Social Media</h6>
                <div class="d-flex mt-2" style="gap: 10px">
                  <!-- <a target="_blank" href="/">
                    <i
                      class="fa fa-youtube-play text-danger"
                      style="font-size: 18px"
                      aria-hidden="true"
                    ></i>
                  </a> -->
                  <!-- <a target="_blank" href="/">
                    <i
                      class="fa fa-twitter text-info"
                      style="font-size: 18px"
                      aria-hidden="true"
                    ></i>
                  </a> -->
                  <a target="_blank" href="https://www.facebook.com/peppy.stores?mibextid=kFxxJD">
                    <i
                      class="fa fa-facebook text-primary"
                      style="font-size: 18px"
                      aria-hidden="true"
                    ></i>
                  </a>
                  <a target="_blank" href="https://instagram.com/peppystores_1">
                    <i
                      class="fa fa-instagram text-danger"
                      style="font-size: 18px"
                      aria-hidden="true"
                    ></i>
                  </a>
                  <a target="_blank" class="text-white" href="https://www.tiktok.com/@peppystores2022?_t=8hIyfSsYCz0&_r=1">
                    <i-icon icon="ic:baseline-tiktok" width="18px" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="">
            <hr class="tw-w-6/12 tw-mx-auto tw-border-gray400" />
            <p class="text-center tw-text-gray200 small tw-mb-0">
              Copyright {{ thisYear }} © Peppy Stores. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    thisYear() {
      const yearToday = new Date().getFullYear();
      return yearToday;
    },
  },
};
</script>

<style scoped>
ul  {
  padding-left: 0;
}

ul li a {
  color: var(--gray-400);
  font-size: 13px;
  text-decoration: unset;
}

ul li .router-link-exact-active {
  color: var(--primary);
}
</style>
