<template>
  <div>
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <div
          class="tw-grid lg:tw-grid-cols-6 md:tw-grid-cols-4 tw-grid-cols-2 tw-gap-3"
        >
          <div class="" v-for="item in 12" :key="item">
            <b-skeleton
              width="100%"
              height="120px"
              style="margin: 0; border-radius: 0"
            ></b-skeleton>
          </div>
        </div>
      </template>
      <div
        class="tw-grid lg:tw-grid-cols-6 md:tw-grid-cols-4 tw-grid-cols-2 tw-gap-3"
      >
        <div
          v-for="(item, idx) in items"
          :key="idx"
          class="tw-bg-gray200 tw-flex tw-flex-col tw-justify-between tw-shadow"
        >
          <div
            class="tw-flex tw-flex-col tw-items-center tw-p-6"
            @click="getCategoryDetails(item)"
            role="button"
          >
            <div class="tw-w-fit">
              <img :src="item.icon_image" alt="" class="tw-w-20 tw-h-20 tw-rounded-full tw-object-fit tw-object-top" />
            </div>
            <h6 class="tw-mb-0 tw-font-medium tw-mt-3 tw-text-center tw-capitalize tw-text-sm">
              {{ (item.category_name)}}
            </h6>
          </div>
          <div class="tw-bg-dark-100 tw-p-2 tw-text-center tyw-justify-self-end">
            <h6 class="tw-mb-0 tw-text-gray100 tw-text-light tw-text-sm">
              {{ item.products.length }} {{ item.products.length > 0 ? "Products" : "Product" }}
            </h6>
          </div>
        </div>
      </div>
    </b-skeleton-wrapper>
  </div>

  <!-- <div class="products tw-col-span-2">
        <div>
          <img
            class="lg:tw-h-60 md:tw-h-72 tw-h-48 tw-w-full tw-object-bottom tw-object-cover"
            src="https://www.home-designing.com/wp-content/uploads/2016/04/NaturalLightLoftLivingroom.jpg"
            alt=""
          />
        </div>
        <div class="lg:tw-mt-16 md:tw-mt-12 tw-mt-8">
          <products-catalog-header
            :total="meta.total"
            :from="meta.from"
            :to="meta.to"
            :loading="loading"
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
                  <b-skeleton
                    width="40%"
                    style="margin: 10px auto"
                  ></b-skeleton>
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
      </div> -->
</template>

<script>
// import ProductsCatalogHeader from "@/components/Headers/ProductsCatalogHeader.vue";
// import ProductCard from "@/components/Cards/ProductCard.vue";
export default {
  // components: { ProductsCatalogHeader, ProductCard },
  data() {
    return {
      items: [],
      loading: false,
      // category_id: "",
      products: [],
      meta: {
        total: "",
        to: "",
        from: "",
      },
      id: "",
    };
  },

  methods: {
    getCategories() {
      this.loading = true;
      this.$request("/categories")
        .then((res) => {
          let resPayload = res.data;
          this.items = resPayload.categories;
          console.log(res.data.categories);
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },

    getCategoryDetails(e) {
      this.id = e.id;
      this.$router.push(`/category/${e.id}`);
    },
  },

  beforeMount() {
    this.getCategories();
  },
};
</script>

<style></style>
