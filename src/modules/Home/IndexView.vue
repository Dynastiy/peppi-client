<template>
  <div>
    <div>
      <img
        class="lg:tw-h-80 md:tw-h-72 tw-h-48 tw-w-full tw-object-bottom tw-object-cover"
        src="https://www.home-designing.com/wp-content/uploads/2016/04/NaturalLightLoftLivingroom.jpg"
        alt=""
      />
    </div>

    <div class="lg:tw-mt-16 md:tw-mt-12 tw-mt-8">
      <products-catalog-header
        :currentPage="meta.currentPage"
        :lastPage="meta.lastPage"
        :total="meta.total"
        :from="meta.from"
        :to="meta.to"
        :loading="loading"
        @next="nextPage"
        @prev="prevPage"
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
            @reloadData="getProducts"
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
</template>

<script>
import ProductsCatalogHeader from "@/components/Headers/ProductsCatalogHeader.vue";
import ProductCard from "@/components/Cards/ProductCard.vue";
export default {
  components: { ProductsCatalogHeader, ProductCard },
  data() {
    return {
      products: [],
      loading: false,
      meta: {
        total: null,
        to: null,
        from: null,
        currentPage: null,
        lastPage: null
      },
      page: null
    };
  },

  methods: {
    getProducts() {
      this.loading = true;
      this.$request
        .get(`products?page=${this.page}`)
        .then((res) => {
          const resPayload = res.data.products;
          console.log(resPayload);
          this.products = resPayload.data;
          this.loading = false;
          this.meta = {
            to: resPayload.to,
            from: resPayload.from,
            total: resPayload.total,
            currentPage: resPayload.current_page,
            lastPage: resPayload.last_page,
          };
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },

    nextPage(){
      this.page++
      this.getProducts()
    },

    prevPage(){
      this.page--
      this.getProducts()
    }
  },

  watch:{
    "meta.currentPage":{
      handler(val){
        this.page = val
      },
      immediate: true
    }
  },

  beforeMount() {
    this.getProducts();
  },
};
</script>

<style></style>
