<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = "AppDefaultLayout";
export default {
  name: "AppLayout",
  mounted(){
    console.log(this.isOnline, "ommo");
  },

  methods: {
    getUserCatalog(){
      this.$store.dispatch('cart/getUserCart')
      this.$store.dispatch('cart/getUserWishlist')
    }
  },

  beforeMount(){
    this.getUserCatalog()
  },

  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },

    isOnline(){
      return window.navigator
    }
  },
};
</script>
