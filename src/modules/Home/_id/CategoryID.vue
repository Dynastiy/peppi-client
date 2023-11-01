<template>
  <div>
    <div class="tw-bg-gray200 tw-py-6 tw-mb-6">
      <div class="tw-flex tw-justify-center tw-items-center tw-gap-2">
        <div>
          <img :src="item.icon_image" class="tw-w-6 tw-h-6" alt="" />
        </div>
        <h4 class="tw-font-bold tw-mb-0 tw-uppercase tw-tracking-widest">
          {{ item.category_name }}
        </h4>
      </div>
    </div>
    <div class="products tw-col-span-2">
      <div class="lg:tw-mt-16 md:tw-mt-12 tw-mt-8">
        <products-catalog-header
          :total="meta.total"
          :from="meta.from"
          :to="meta.to"
          :loading="loading"
          :isPaginated="false"
        />
        <hr class="tw-my-8" />
        <b-skeleton-wrapper :loading="loading">
          <template #loading>
            <div
              class="tw-pb-6 tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-8"
            >
              <div
                class="tw-w-full tw-bg-gray6 tw-text-center tw-rounded-lg tw-p-4"
                v-for="item in 6"
                :key="item"
              >
                <b-skeleton-img
                  width="80%"
                  no-aspect
                  height="250px"
                  style="margin: 10px auto"
                ></b-skeleton-img>
                <b-skeleton width="40%" style="margin: 0 auto"></b-skeleton>
                <b-skeleton width="40%" style="margin: 10px auto"></b-skeleton>
                <b-skeleton
                  width="100%"
                  height="40px"
                  style="margin: 0 auto; border-radius: 0"
                ></b-skeleton>
              </div>
            </div>
          </template>

          <div
            class="tw-pb-6 tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-8"
          >
            <product-card
              v-for="(item, idx) in products"
              :key="idx"
              :item="item"
              @reloadData="getCategoryByID"
            />
            <div v-if="products.length === 0">
              <span
                class="tw-text-red-500 tw-flex tw-items-center tw-font-medium"
              >
                <i-icon icon="jam:close" width="30px" />
                <span>No items Found</span>
              </span>
            </div>
          </div>
        </b-skeleton-wrapper>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsCatalogHeader from "@/components/Headers/ProductsCatalogHeader.vue";
import ProductCard from "@/components/Cards/ProductCard.vue";
export default {
  components: { ProductsCatalogHeader, ProductCard },
  data() {
    return {
      items: [],
      loading: false,
      // category_id: "",
      products: [],
      item: {},
      meta: {
        total: "",
        to: "",
        from: "",
      },
      id: this.$route.params.id,
    };
  },

  methods: {
    getCategoryByID() {
      this.loading = true;
      this.$request(`/categories/${this.id}`)
        .then((res) => {
          let resPayload = res.data;
          this.products = resPayload.category.products;
          this.item = resPayload.category;
          console.log(resPayload);
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
  },

  beforeMount() {
    this.getCategoryByID();
  },
};
</script>

<style></style>
