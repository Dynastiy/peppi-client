
import IndexViewVue from "@/modules/Home/IndexView.vue";
import TermsAndConditions from "@/modules/Home/TermsAndConditions.vue";
import PrivacyPolicy from "@/modules/Home/PrivacyPolicy.vue";
import Careers from "@/modules/Home/CareersPage.vue";
import AboutUs from "@/modules/Home/AboutUs.vue";

import CartView from "@/modules/Home/CartView.vue";
import ProductDetails from "@/modules/Home/_id/_uuid.vue"

import Categories from "@/modules/Home/CategoriesPage.vue"
import CategoryIDVue from "@/modules/Home/_id/CategoryID.vue";

import ContactUs from "@/modules/Home/ContactPage.vue"
import CheckoutViewVue from "@/modules/Home/CheckoutView.vue";
import redirectingToPaymentPageVue from "@/modules/Payments/redirectingToPaymentPage.vue";
import PaymentSuccesfulVue from "@/modules/Payments/PaymentSuccesful.vue";
import PaymentFailed from "@/modules/Payments/PaymentFailed.vue";
import PaymentCancelled from "@/modules/Payments/PaymentCancelled.vue";


const router = [
  {
    path: "/",
    name: "home",
    component: IndexViewVue,
    meta: {
      layout: "AppHomeLayout",
      parent: "home",
      name: "home",
      hasHeader: false
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
      hasHeader: true,
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
    path: "/categories",
    name: "categories",
    component: Categories,
    meta: {
      layout: "AppHomeLayout",
      parent: "categories",
      name: "categories",
      header: "categories",
      hasHeader: true,
    },
  },

  {
    path: "/category/:id",
    name: "category-details",
    component: CategoryIDVue,
    meta: {
      layout: "AppHomeLayout",
      parent: "categories",
      name: "categories",
      header: "category details",
      hasHeader: false,
    },
  },

  {
    path: "/contact-us",
    name: "contact-us",
    component: ContactUs,
    meta: {
      layout: "AppHomeLayout",
      parent: "contact-us",
      name: "contact-us",
      header: "contact us",
      hasHeader: true,
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
      hasHeader: true,
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

  {
    path: "/checkout/summary",
    name: "checkout",
    component: CheckoutViewVue,
    meta: {
      layout: "AppHomeLayout",
      parent: "home",
      name: "checkout",
      header: "checkout",
      requiresAuth: true,
      hasHeader: true,
      breadcrumb: [
        {
          text: "home",
          icon: "iconoir:home",
          href: "/",
        },
        {
          text: "checkout",
        },
      ],
    },
  },

  {
    path: "/checkout/:id",
    name: "redirecting-to-secure-page",
    component: redirectingToPaymentPageVue,
    meta: {
      layout: "AppHomeLayout",
      parent: "home",
      name: "home",
      requiresAuth: true,
      hasHeader: false
    },
  },

  {
    path: "/payment-successful",
    name: "payment-successful",
    component: PaymentSuccesfulVue,
    meta: {
      layout: "AppHomeLayout",
      parent: "home",
      name: "home",
      requiresAuth: false,
      hasHeader: false
    },
  },

  {
    path: "/payment-failed",
    name: "payment-failed",
    component: PaymentFailed,
    meta: {
      layout: "AppHomeLayout",
      parent: "home",
      name: "home",
      requiresAuth: false,
      hasHeader: false
    },
  },

  {
    path: "/payment-cancelled",
    name: "payment-cancelled",
    component: PaymentCancelled,
    meta: {
      layout: "AppHomeLayout",
      parent: "home",
      name: "home",
      requiresAuth: false,
      hasHeader: false
    },
  },

  {
    path: "/terms-and-conditions",
    name: "terms-and-conditions",
    component: TermsAndConditions,
    meta: {
      layout: "AppHomeLayout",
      parent: "terms-and-conditions",
      name: "terms-and-conditions",
      header: "Terms and Conditions",
      hasHeader: true,
      requiresAuth: false,
    },
  },

  {
    path: "/about-us",
    name: "about-us",
    component: AboutUs,
    meta: {
      layout: "AppHomeLayout",
      parent: "about-us",
      name: "about-us",
      header: "About Us",
      hasHeader: true,
      requiresAuth: false,
    },
  },

  {
    path: "/careers",
    name: "careers",
    component: Careers,
    meta: {
      layout: "AppHomeLayout",
      parent: "careers",
      name: "careers",
      header: "Careers",
      hasHeader: true,
      requiresAuth: false,
    },
  },

  {
    path: "/privacy-policy",
    name: "privacy-policy",
    component: PrivacyPolicy,
    meta: {
      layout: "AppHomeLayout",
      parent: "privacy-policy",
      name: "privacy-policy",
      header: "Privacy Policy",
      hasHeader: true,
      requiresAuth: false,
    },
  },
];

export default router;
