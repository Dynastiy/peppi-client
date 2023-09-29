<template>
  <div>
    <user-side-drawer />
   <slot />
  </div>
</template>

<script>
import UserSideDrawer from '@/components/Drawers/UserSideDrawer.vue';
export default {
  components: {UserSideDrawer  },
  name: "DashboardLayout",
  computed: {
    
  },
};
</script>

<style>


</style>
