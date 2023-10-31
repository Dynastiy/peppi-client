<template>
  <div>
    <div class="tw-flex tw-justify-between tw-items-center">
      <UtilsBaseCardTab class="" @tabname="selectTab">
        <h5 class="tw-font-semibold tw-text-[20px] tw-mt-4">{{ headerName }}</h5>
        <UtilsCardTab title="Order History">
          <div class="tw-mt-4">
            <order-history />
          </div>
        </UtilsCardTab>
        <UtilsCardTab title="Payment History">
          <div class="tw-mt-4">
            <payment-history />
          </div>
        </UtilsCardTab>
      </UtilsBaseCardTab>
    </div>
  </div>
</template>

<script>
import UtilsBaseCardTab from "@/components/Utils/BaseCardTab.vue";
import UtilsCardTab from "@/components/Utils/CardTab.vue";
import OrderHistory from '@/components/User/History/OrderHistory.vue';
import PaymentHistory from '@/components/User/History/PaymentHistory.vue';
export default {
  components: {
    UtilsBaseCardTab,
    UtilsCardTab,
    OrderHistory,
    PaymentHistory,
  },

  data(){
    return {
      headerName: ""
    }
  },



  methods:{
    selectTab(value) {
      this.headerName = value
    }
  }
};
</script>

<style></style>
