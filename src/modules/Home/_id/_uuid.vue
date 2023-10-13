<template>
  <div>
    <b-skeleton-wrapper :loading="isLoading">
      <template #loading>
        <div
          class="tw-grid lg:tw-grid-cols-2 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-8"
        >
          <b-skeleton-img
            width="80%"
            no-aspect
            height="250px"
            style="margin: 10px auto"
          ></b-skeleton-img>
          <div>
            <b-skeleton width="40%"></b-skeleton>
            <b-skeleton width="40%" style="margin: 20px 0"></b-skeleton>
            <b-skeleton width="100%" height="1px" style="margin: 10px 0"></b-skeleton>
            <div class="tw-flex tw-gap-4">
              <div v-for="item in 4" :key="item">
                <b-skeleton-img
                  width="60px"
                  no-aspect
                  height="60px"
                ></b-skeleton-img>
              </div>
            </div>
            <div class="tw-flex tw-gap-4 tw-mt-2">
              <div v-for="item in 2" :key="item">
                <b-skeleton-img
                  width="80px"
                  no-aspect
                  height="50px"
                ></b-skeleton-img>
              </div>
            </div>
            <div class="tw-flex tw-gap-4 tw-mt-2">
              <div v-for="item in 5" :key="item">
                <b-skeleton-img
                  width="60px"
                  no-aspect
                  height="22px"
                ></b-skeleton-img>
              </div>
            </div>
            <b-skeleton width="100%" height="45px" style="margin: 20px 0"></b-skeleton>
            <b-skeleton width="100%" height="45px" style="margin: 20px 0"></b-skeleton>
            <b-skeleton width="100%" height="45px" style="margin: 20px 0"></b-skeleton>
          </div>
        </div>
      </template>

      <template>
        <div
          class="tw-grid lg:tw-grid-cols-2 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-8"
        >
          <div>
            <img
              v-if="product.images"
              class="tw-h-80 lg:tw tw-w-full tw-object-cover tw-mx-auto tw-block"
              :src="product.images[0].url"
              alt=""
            />
          </div>
          <div class="tw-flex tw-flex-col tw-space-y-4">
            <h3
              class="tw-tracking-widest tw-uppercase tw-mb-0 tw-text-lg tw-font-light"
            >
              {{ product.name }}
            </h3>
            <h3 class="tw-text-lg tw-font-semibold">
              {{
                Number(product.price).toLocaleString("en-US", {
                  style: "currency",
                  currency: "NGN",
                })
              }}
            </h3>
            <hr />
            <div class="tw-flex tw-gap-4">
              <img
                v-for="(item, idx) in product.images"
                :key="idx"
                :src="item.url"
                class="tw-w-16 tw-h-16 tw-p-1 tw-border tw-border-primary"
                alt=""
              />
            </div>
            <div class="tw-flex tw-space-x-4 tw-w-64">
              <input
                type="tel"
                placeholder="0"
                class="tw-w-4/12 tw-border-0 tw-bg-gray200 tw-px-2 tw-outline-none tw-rounded-none"
              />
              <button class="peppi-btn peppi-primary tw-px-5 tw-w-auto">
                Add to Cart
              </button>
            </div>
            <div>
              <span class="tw-flex tw-gap-3">
                <span class="tw-text-sm tw-font-semibold">Categories: </span>
                <span class="tw-flex tw-flex-wrap tw-gap-2">
                  <span
                    v-for="(item, idx) in product.categories"
                    :key="idx"
                    :class="item.slug.charAt(0)"
                    class="tag tw-text-[12px] tw-px-2 tw-py-1 tw-rounded-[4px] tw-font-medium"
                    >{{ item.category_name }}</span
                  >
                </span>
              </span>
            </div>
            <div>
              <el-collapse accordion>
                <el-collapse-item
                  v-for="(item, index) in tabs"
                  :key="index"
                  :name="index"
                >
                  <template slot="title">
                    <div class="tw-flex tw-space-x-2 tw-items-center">
                      <i-icon icon="tdesign:plus" width="20px" />
                      <span class="tw-tracking-widest">{{ item.title }}</span>
                    </div>
                  </template>
                  <div>
                    <component :item="product" :is="tabs[index].component" />
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </div>
      </template>
    </b-skeleton-wrapper>
  </div>
</template>

<script>
import AdditionalInformation from "@/components/Home/AdditionalInformation.vue";
import ProductReviews from "@/components/Home/ProductReviews.vue";
import ProductDescription from "@/components/Home/ProductDescription.vue";

export default {
  components: { AdditionalInformation, ProductReviews, ProductDescription },
  data() {
    return {
      activeName: "1",
      tabs: [
        {
          id: 1,
          title: "Description",
          component: ProductDescription,
        },
        {
          id: 2,
          title: "Additional Information",
          component: AdditionalInformation,
        },
        {
          id: 3,
          title: "Reviews (2)",
          component: ProductReviews,
        },
      ],
      id: this.$route.params.id,
      product: {},
      isLoading: false,
    };
  },

  methods: {
    getProduct() {
      this.isLoading = true;
      this.$request
        .get(`products/${this.id}`)
        .then((res) => {
          let resPayload = res.data.product;
          this.product = resPayload;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
  },

  beforeMount() {
    this.getProduct();
  },
};
</script>

<style>
.el-collapse-item__header {
  height: max-content !important;
  line-height: unset !important;
  padding: 15px;
  font-weight: 300 !important;
  font-size: 14px !important;
}

.el-collapse-item__content {
  padding: 0 15px 15px 15px;
}
</style>
