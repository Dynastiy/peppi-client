
import IndexViewVue from "@/modules/Home/IndexView.vue";
import CartView from "@/modules/Home/CartView.vue";
import ProductDetails from "@/modules/Home/_id/_uuid.vue"

const router = [
  {
    path: "/",
    name: "home",
    component: IndexViewVue,
    meta: {
      layout: "AppHomeLayout",
      parent: "home",
      name: "home",
    },
  },

  {
    path: "/product/:id",
    name: "product-details",
    component: ProductDetails,
    meta: {
      layout: "AppHomeLayout",
      parent: "home",
      name: "product-details",
      header: "product details",
      breadcrumb: [
        {
          text: "home",
          icon: "iconoir:home",
          href: "/",
        },
        {
          text: "product",
        },
      ],
    },
  },

  {
    path: "/cart",
    name: "cart",
    component: CartView,
    meta: {
      layout: "AppHomeLayout",
      parent: "home",
      name: "cart",
      header: "Cart",
      breadcrumb: [
        {
          text: "home",
          icon: "iconoir:home",
          href: "/",
        },
        {
          text: "cart",
        },
      ],
    },
  },


];

export default router;
