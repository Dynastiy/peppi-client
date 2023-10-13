<template>
  <div>
    <div class="tw-flex tw-justify-between tw-items-center">
      <UtilsBaseCardTab class="" @tabname="selectTab">
        <h5 class="tw-font-semibold tw-text-[20px] tw-mt-4">{{ headerName }}</h5>
        <UtilsCardTab title="Open Orders">
          <div class="tw-mt-4">
            <personal-details />
          </div>
        </UtilsCardTab>
        <UtilsCardTab title="Closed Orders">
          <div class="tw-mt-4">
            <account-security />
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
import AccountSecurity from "@/components/User/AccountManagement/AccountSecurity.vue";
export default {
  components: {
    UtilsBaseCardTab,
    UtilsCardTab,
    PersonalDetails,
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
