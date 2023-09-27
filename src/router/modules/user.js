
import IndexViewVue from "@/views/UserView.vue";

const router = [
  {
    path: "/user",
    name: "user-home",
    component: IndexViewVue,
    meta: {
      layout: "AppHomeLayout",
      parent: "user",
      name: "user-home",
    },
  },

];

export default router;
