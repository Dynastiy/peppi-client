<template>
  <div>
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <div class="tw-flex tw-flex-col tw-gap-4">
          <div class="" v-for="item in 4" :key="item">
            <!-- <b-skeleton-img width="80%" no-aspect height="250px" style="margin: 10px auto;"></b-skeleton-img> -->
            <b-skeleton
              width="100%"
              height="10px"
              style="margin: 10px auto; border-radius: 0"
            ></b-skeleton>
            <!-- <b-skeleton width="40%" style="margin: 10px auto;"></b-skeleton> -->
            <b-skeleton
              width="100%"
              height="40px"
              style="margin: 0 auto; border-radius: 0"
            ></b-skeleton>
          </div>
        </div>
      </template>

      <div class="tw-flex tw-flex-col tw-gap-4">
        <div
          class="tw-border tw-shadow-md tw-p-3 tw-rounded-lg"
          v-for="(item, idx) in items"
          :key="idx"
        >
          <div class="tw-flex tw-items-center tw-justify-between tw-mb-2">
            <span class="tw-flex tw-items-center tw-gap-2">
              <span :class="item.status">{{ item.status }}</span>
              <h5 class="tw-mb-0 tw-font-semibold">
                {{ item.amount | formatCurrency }}
              </h5>
            </span>
            <router-link
              class="tw-font-normal tw-text-xs tw-text-gray-600"
              :to="'/payment/' + item.id"
              >Details</router-link
            >
          </div>
          <div class="tw-flex tw-items-center tw-gap-2 tw-text-xs">
            <span> {{ item.created_at | formatDate }} </span>
            <span>|</span>
            <span>{{ item.tx_ref }}</span>
          </div>
          <hr class="tw-my-2 tw-border-gray400" />
          <p class="tw-mb-0 tw-text-xs">{{ item.description }}</p>
        </div>
      </div>

      <div
        v-if="items.length === 0"
        class="tw-flex tw-flex-col tw-items-center"
      >
        <i-icon icon="system-uicons:box-open" width="200" />
        <h6 class="tw-my-3 tw-text-red-600">You have no payments yet</h6>
        <button class="peppi-btn peppi-primary" @click="$router.push('/')">
          Continue Shopping
        </button>
      </div>

      <!-- Pagination -->
      <app-pagination :items="items" :meta="meta"/>
    </b-skeleton-wrapper>
  </div>
</template>

<script>
import AppPagination from "@/components/Utils/AppPagination.vue";
export default {
  components: { AppPagination },
  data() {
    return {
      items: [],
      loading: false,
      meta: {}
    };
  },

  methods: {
    getUserOrders() {
      this.loading = true;
      this.$request
        .get(`/payments`)
        .then((res) => {
          console.log(res);
          let resPayload = res.data;
          this.items = resPayload.data;
          this.meta = {
            to: resPayload.to,
            from: resPayload.from,
            total: resPayload.total
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          return err;
        });
    },

    getRef(value) {
      let result = value.split("-").join("").slice(0, 8);
      return result;
    },
  },

  beforeMount() {
    this.getUserOrders();
  },

  computed: {},
};
</script>

<style></style>
