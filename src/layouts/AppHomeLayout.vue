<template>
  <div class="tw-bg-gray-100 lg:tw-px-8 md:tw-px-8 tw-px-0">
    <top-header />
    <div
      class="tw-bg-white lg:tw-shadow-lg md:tw-shadow-lg tw-shadow-sm tw-rounded-md"
    >
      <div class="lg:tw-px-8 md:tw-px-7 tw-px-5">
        <app-header :menu="menu" @toggleDrawer="toggleDrawer"/>
        <page-header v-if="!routeHome"/>
      <slot />
      </div>
      <app-footer />

      <mobile-home-drawer @close="toggleDrawer" :menu="menu"  :drawer="drawer"/>
    </div>
  </div>
</template>

<script>
import TopHeader from "@/components/Navigation/TopHeader.vue";
import AppHeader from "@/components/Navigation/AppHeader.vue";
import AppFooter from '@/components/Navigation/AppFooter.vue';
import MobileHomeDrawer from '@/components/Navigation/MobileHomeDrawer.vue';
import PageHeader from '@/components/Headers/PageHeader.vue';
export default {
  components: { TopHeader, AppHeader, AppFooter, MobileHomeDrawer, PageHeader },
  name: "AppHomeLayout",
  data() {
    return {
      menu: [
        {
          id: 1,
          title: "home",
          url: "/",
          icon: 'solar:home-2-outline',
          hasChildren: false,
          parent: "home",
        },
        {
          id: 2,
          title: "categories",
          url: "/categories",
          icon: "carbon:categories",
          hasChildren: false,
          parent: "categories",
        },
        {
          id: 3,
          title: "contact us",
          url: "/contact-us",
          icon: "streamline:interface-help-customer-support-2-customer-headphones-headset-help-microphone-phone-person-support",
          hasChildren: false,
          parent: "contact-us",
        },
        {
          id: 4,
          title: "account",
          url: "/account",
          icon: "fa:user-o",
          hasChildren: false,
          parent: "account",
        },
      ],
      drawer: false
    };
  },

  methods: {
    toggleDrawer(){
      this.drawer = !this.drawer
    },
  },

  computed: {
    routeHome(){
      return this.$route.name === 'home'
    }
  }
};
</script>
