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
          v-for="(item, idx) in items"
          :key="idx"
          class="tw-border tw-shadow-md tw-p-3 tw-rounded-lg"
        >
          <!-- <span>Date</span> -->
          <div class="tw-flex tw-justify-between tw-mb-3 tw-items-center">
            <span class="tw-flex tw-items-center tw-gap-2">
              <h6 class="tw-font-medium tw-uppercase tw-text-[14px] tw-mb-0">
                {{ "Order #" + getRef(item.id) }}
              </h6>
              <span :class="item.status">{{ item.status }}</span>
            </span>
            <router-link
              class="tw-font-normal tw-text-xs tw-text-gray-600"
              :to="'/order/' + item.id"
              >Details</router-link
            >
          </div>
          <div class="tw-flex tw-flex-col tw-gap-8">
            <div v-for="(productData, i) in item.products" :key="i">
              <div class="tw-flex tw-gap-3">
                <div class="tw-w-fit">
                  <img
                    class="tw-w-[70px] tw-h-[45px] tw-rounded-lg tw-shadow-lg"
                    :src="productData.images[0].url"
                    alt=""
                  />
                </div>
                <div class="tw-flex tw-h-[45px] tw-flex-col tw-justify-between">
                  <h6 class="tw-font-normal">{{ productData.name }}</h6>
                  <h6
                    class="tw-flex tw-gap-1 tw-text-[12px] tw-text-light tw-font-normal tw-mb-0"
                  >
                    <span>Quantity:</span>
                    <span>{{ productData.pivot.quantity }} </span>
                    <span>|</span>
                    <span>{{
                      (productData.pivot.quantity * productData.price)
                        | formatCurrency
                    }}</span>
                  </h6>
                </div>
              </div>
              <!-- <hr class="tw-my-4 tw-border-gray400" /> -->
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="items.length === 0"
        class="tw-flex tw-flex-col tw-items-center"
      >
        <i-icon icon="system-uicons:box-open" width="200" />
        <h6 class="tw-my-3 tw-text-red-600">You have no orders yet</h6>
        <button class="peppi-btn peppi-primary" @click="$router.push('/')">
          Continue Shopping
        </button>
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
    getUserOrders(page = 2) {
      this.loading = true;
      this.$request
        .get(`/orders/user?page=${page}`)
        .then((res) => {
          console.log(res);
          let resPayload = res.data.orders;
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
