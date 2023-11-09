<template>
  <div class="tw-border tw-border-gray200 user-drawer">
    <!-- <div class="tw-mb-5">
      <div class="tw-flex tw-justify-center">
        <span
          class="tw-h-20 tw-w-20 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-bg-gray200"
        >
          <i-icon icon="bx:user" width="40px" />
        </span>
      </div>
      <h6 class="tw-text-center tw-mb-0">User Name</h6>
      <p class="tw-text-xs tw-text-center">useremail@gmail.com</p>
    </div> -->
    <div class="tw-p-3 tw-bg-dark-100 tw-mb-3">
      <h5 class="tw-text-center tw-text-white tw-mb-0 tw-uppercase tw-text-sm">
        my account
      </h5>
    </div>
    <ul class="tw-mb-3 tw-pl-0 tw-flex tw-flex-col">
      <li v-for="item in userMenu" :key="item?.id">
        <router-link
        :class="{'router-link-exact-active': item.parent === routeParent}"
          :to="item?.url"
          class="tw-flex tw-space-x-2 tw-items-center tw-no-underline tw-text-dark-100 tw-text-[13px] tw-w-full hover:tw-bg-gray200 tw-py-3 tw-px-5 tw-uppercase tw-tracking-widest"
        >
          <i-icon :icon="item?.icon" />
          <span>{{ item?.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMenu: [
        // {
        //   id: 1,
        //   title: "Profile",
        //   icon: "ri:user-line",
        //   url: "/account/index",
        //   parent: "profile"
        // },

        {
          id: 5,
          title: "Account Management",
          icon: "ri:user-settings-line",
          url: "/account/index",
          parent: "account-management"
        },
        {
          id: 2,
          title: "Saved Items",
          icon: "icon-park-outline:like",
          url: "/account/saved-items",
          parent: "saved-items"
        },

        {
          id: 3,
          title: "History",
          icon: "material-symbols:history",
          url: "/account/history",
          parent: "history"
        },

        // {
        //   id: 4,
        //   title: "Notifications",
        //   icon: "ion:notifications-outline",
        //   url: "/account/notifications",
        //   parent: "notifications"
        // },

        
      ],
    };
  },

  computed:{
    routeParent(){
      return this.$route.meta.subParent
    }
  }
};
</script>

<style>
.user-drawer .router-link-exact-active {
  background: var(--gray-200);
  font-weight: 600;
}
</style>
