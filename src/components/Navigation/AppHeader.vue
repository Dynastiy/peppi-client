<template>
  <div class="tw-py-8 app-header">
    <div
      class="tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-3 tw-grid-cols-2 tw-w-full tw-justify-between tw-items-center"
    >
      <div class="search-area lg:tw-flex md:tw-flex tw-hidden tw-items-center">
        <i-icon icon="iconamoon:search-light" width="20px" />
        <input
          type="search"
          class="tw-p-3 tw-border-none"
          placeholder="search here"
        />
      </div>
      <div
        class="lg:tw-justify-self-center md:tw-justify-self-center tw-justify-self-start"
      >
        <img src="@/assets/img/peppi-logo.png" class="lg:tw-block md:tw-block tw-hidden" role="button" @click="$router.push('/')" width="80" alt="" />
        <img src="@/assets/img/peppi-icon.png" role="button" class="lg:tw-hidden md:tw-hidden tw-block" @click="$router.push('/')" width="40" alt="" />
      </div>

      <div class="tw-justify-self-end">
        <div class="tw-flex tw-items-center tw-space-x-6">
          <span class="tw-relative tw-w-fit tw-block" role="button" @click="$router.push('/account/saved-items').catch(()=>{})">
            <i-icon icon="icon-park-outline:like" width="20px" />
            <span
              class="tw-absolute tw-bg-primary tw-block tw-h-5 tw-w-5 tw-rounded-lg -tw-top-3 -tw-right-3 tw-text-[10px] tw-font-semibold tw-flex tw-items-center tw-justify-center"
              >{{ wishlist.length }}</span
            >
          </span>
          <span class="tw-relative tw-w-fit tw-block" role="button" @click="$router.push('/cart').catch(()=>{})">
            <i-icon icon="heroicons:shopping-bag" width="20px" />
            <span
              class="tw-absolute tw-bg-primary tw-block tw-h-5 tw-w-5 tw-rounded-lg -tw-top-3 -tw-right-3 tw-text-[10px] tw-font-semibold tw-flex tw-items-center tw-justify-center"
              >{{ cart.length }}</span
            >
          </span>
          <span
            role="button"
            @click="$emit('toggleDrawer')"
            class="lg:tw-hidden md:tw-hidden tw-block"
          >
            <i-icon icon="cil:menu" width="25px" />
          </span>
        </div>
      </div>
    </div>

    <div class="tw-mt-8 md:tw-block lg:tw-block tw-hidden">
      <ul class="menu-items tw-flex tw-justify-center">
        <li class="tw-px-4" v-for="item in menu" :key="item?.id">
          <router-link
            :class="{
              'router-link-exact-active': routeParent === item?.parent,
            }"
            class="tw-text-dark-100 tw-px-3 tw-py-1 tw-text-[13px] tw-uppercase tw-no-underline tw-font-normal tw-tracking-widest"
            :to="item?.url"
            >{{ item?.title }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      require: true,
      default: () => [],
    },
  },

  data() {
    return {
      items: [],
    };
  },

  computed: {
    routeParent(){
      return this.$route.meta.parent
    },

    cart(){
      return this.$store.getters['cart/getCartItems']
    },

    wishlist(){
      return this.$store.getters['cart/getWishlistItems']
    }
  }
};
</script>

<style>
.app-header .router-link-exact-active {
  background-color: var(--primary) !important;
}

.search-area input::placeholder {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 400;
  font-size: 13px;
}

.search-area input {
  font-size: 13px;
}

.menu-items li:not(:first-child) {
  border-left: 1px solid var(--gray-400);
}

.menu-items li a {
  position: relative;
  transition: all ease-in-out 40s;
  display: inline-block;
}

.menu-items li a:not(.router-link-exact-active):hover:after {
  content: "";
  width: 100%;
  height: 3px;
  background: var(--primary);
  position: absolute;
  left: 0;
  top: 46%;
}
</style>
