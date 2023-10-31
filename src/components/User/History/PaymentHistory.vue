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
          <div>
            <span :class="item.status">{{ item.status }}</span>
            <h4>
              {{ item.amount | formatCurrency }}
            </h4>
          </div>
          <hr class="tw-my-2 tw-border-gray400" />
          <p class="tw-mb-0 tw-text-xs">{{ item.description }}</p>
        </div>
      </div>

      <!-- Pagination -->
      <app-pagination />
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
