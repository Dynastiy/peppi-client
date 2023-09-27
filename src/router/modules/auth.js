import ForgotPasswordVue from "@/modules/Auth/ForgotPassword.vue";
import ResetPasswordVue from "@/modules/Auth/ResetPassword.vue";
import SignInVue from "@/modules/Auth/SignIn.vue";
import SignUpVue from "@/modules/Auth/SignUp.vue";

const router = [
  {
    path: "/sign-in",
    name: "sign-in",
    component: SignInVue,
    meta: {
      layout: "AppAuthLayout",
      parent: "login",
      name: "login",
    },
  },

  {
    path: "/sign-up",
    name: "sign-up",
    component: SignUpVue,
    meta: {
      layout: "AppAuthLayout",
      parent: "register",
      name: "register",
    },
  },

  {
    path: "/reset-password",
    name: "reset-password",
    component: ResetPasswordVue,
    meta: {
      layout: "AppAuthLayout",
      parent: "reset-password",
      name: "reset-password",
    },
  },

  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPasswordVue,
    meta: {
      layout: "AppAuthLayout",
      parent: "forgot-password",
      name: "forgot-password",
    },
  },


 

];

export default router;
