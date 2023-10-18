import IndexViewVue from "@/views/UserView.vue";
import ProfileView from "@/modules/User/ProfileView.vue";
import HistoryView from "@/modules/User/HistoryView.vue";
import NotificationsView from "@/modules/User/NotificationView.vue"
import AccountManagement from "@/modules/User/AccountManagement.vue"
import WishlistView from "@/modules/User/WishlistView.vue";


const router = [
  {
    path: "/account",
    redirect: "/account/index",
    name: "user-home",
    component: IndexViewVue,
    meta: {
      layout: "AppHomeLayout",
      parent: "account",
      name: "user-home",
      header: "my account",
      breadcrumb: [
        {
          text: "home",
          icon: "iconoir:home",
          href: "/",
        },
        {
          text: "my account",
        },
      ],
    },

    children: [
      {
        path: "/account/index",
        name: "user-home-index",
        component: ProfileView,
        meta: {
          layout: "AppHomeLayout",
          parent: "account",
          name: "user-home",
          header: "my account",
          breadcrumb: [
            {
              text: "home",
              icon: "iconoir:home",
              href: "/",
            },
            {
              text: "my account",
            },
          ],
        },
      },
      {
        path: "history",
        name: "user-history",
        component: HistoryView,
        meta: {
          layout: "AppHomeLayout",
          parent: "account",
          name: "user-home",
          header: "my account",
          breadcrumb: [
            {
              text: "home",
              icon: "iconoir:home",
              href: "/",
            },
            {
              text: "history",
            },
          ],
        },
      },

      {
        path: "notifications",
        name: "user-notifications",
        component: NotificationsView,
        meta: {
          layout: "AppHomeLayout",
          parent: "account",
          name: "user-home",
          header: "my account",
          breadcrumb: [
            {
              text: "home",
              icon: "iconoir:home",
              href: "/",
            },
            {
              text: "notifications",
            },
          ],
        },
      },

      {
        path: "account-management",
        name: "account-management",
        component: AccountManagement,
        meta: {
          layout: "AppHomeLayout",
          parent: "account",
          name: "user-home",
          header: "my account",
          breadcrumb: [
            {
              text: "home",
              icon: "iconoir:home",
              href: "/",
            },
            {
              text: "account management",
            },
          ],
        },
      },

      {
        path: "saved-items",
        name: "user-wishlist",
        component: WishlistView,
        meta: {
          layout: "AppHomeLayout",
          parent: "account",
          name: "user-home",
          header: "my account",
          breadcrumb: [
            {
              text: "home",
              icon: "iconoir:home",
              href: "/",
            },
            {
              text: "wishlist",
            },
          ],
        },
      },

    ],
  },
];

export default router;
