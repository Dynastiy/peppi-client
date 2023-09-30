<template>
  <div>
    <div class="tw-flex tw-justify-between tw-items-center">
      <UtilsBaseCardTab class="" @tabname="selectTab">
        <h5 class="tw-font-semibold tw-text-[20px] tw-mt-4">{{ headerName }}</h5>
        <UtilsCardTab title="Personal Details">
          <div class="tw-mt-4">
            <personal-details />
          </div>
        </UtilsCardTab>
        <UtilsCardTab title="Security">
          <div class="tw-mt-4">
            <account-security />
          </div>
        </UtilsCardTab>
        <UtilsCardTab title="Permissions & Accessibility">
          <div class="tw-mt-4">
            <permissions-and-accessibility />
          </div>
        </UtilsCardTab>
        <UtilsCardTab title="Preferences">
          <div class="tw-mt-4">
            <user-preferences />
          </div>
        </UtilsCardTab>
      </UtilsBaseCardTab>
    </div>
  </div>
</template>

<script>
import UtilsBaseCardTab from "@/components/Utils/BaseCardTab.vue";
import UtilsCardTab from "@/components/Utils/CardTab.vue";
import PersonalDetails from "@/components/User/AccountManagement/PersonalDetails.vue";
import UserPreferences from "@/components/User/AccountManagement/UserPreferences.vue";
import PermissionsAndAccessibility from "@/components/User/AccountManagement/PermissionsAndAccessibility.vue";
import AccountSecurity from "@/components/User/AccountManagement/AccountSecurity.vue";
export default {
  components: {
    UtilsBaseCardTab,
    UtilsCardTab,
    PersonalDetails,
    UserPreferences,
    PermissionsAndAccessibility,
    AccountSecurity,
  },

  data(){
    return {
      headerName: ""
    }
  },



  methods:{
    selectTab(value) {
      // console.log(value, "mmm");
      this.headerName = value
    }
  }
};
</script>

<style></style>
