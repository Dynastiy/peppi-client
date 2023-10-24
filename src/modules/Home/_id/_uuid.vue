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
            <b-skeleton
              width="100%"
              height="1px"
              style="margin: 10px 0"
            ></b-skeleton>
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
            <b-skeleton
              width="100%"
              height="45px"
              style="margin: 20px 0"
            ></b-skeleton>
            <b-skeleton
              width="100%"
              height="45px"
              style="margin: 20px 0"
            ></b-skeleton>
            <b-skeleton
              width="100%"
              height="45px"
              style="margin: 20px 0"
            ></b-skeleton>
          </div>
        </div>
      </template>

      <template>
        <div
          class="tw-grid lg:tw-grid-cols-2 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-8"
        >
          <div>
            <img
              class="tw-h-80 lg:tw tw-w-full tw-object-cover tw-mx-auto tw-block"
              :src="activeImage.url"
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
                Number(amount).toLocaleString("en-US", {
                  style: "currency",
                  currency: "NGN",
                })
              }}
            </h3>
            <hr />
            <div class="tw-flex tw-gap-4">
              <img
                role="button"
                v-for="(item, idx) in product.images"
                @click="selectImage(item)"
                :key="idx"
                :src="item.url"
                class="tw-w-16 tw-h-16 tw-p-1 tw-border"
                alt=""
                :class="{'tw-border-primary': activeImage === item}"
              />
            </div>
            <div class="tw-flex tw-space-x-4 tw-w-64">
              <input
                type="tel"
                v-model="quantity"
                placeholder="0"
                class="tw-w-4/12 tw-border-0 tw-bg-gray200 tw-px-2 tw-outline-none tw-rounded-none"
              />
              <button
                @click="cartAction"
                class="peppi-btn peppi-primary tw-px-5 tw-w-auto"
              >
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
          </div>
        </div>
        <div class="tw-mt-5" id="reviews">
          <el-tabs v-model="activeTab">
            <el-tab-pane
              v-for="(item, index) in tabs"
              :key="index"
              :name="
                index.name === 'reviews'
                  ? `${index.name}(${product.reviews.length})`
                  : index.name
              "
              :label="item.title"
            >
              <component
                :item="product"
                @reloadData="getProduct"
                :is="tabs[index].component"
              />
            </el-tab-pane>
          </el-tabs>
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
      activeTab: "",
      tabs: [
        {
          id: 1,
          title: "Description",
          name: "description",
          component: ProductDescription,
        },
        {
          id: 2,
          title: "Additional Information",
          name: "additional-information",
          component: AdditionalInformation,
        },
        {
          id: 3,
          title: "Reviews",
          name: "reviews",
          component: ProductReviews,
        },
      ],
      id: this.$route.params.id,
      product: {},
      isLoading: false,
      quantity: "1",
      cartItem: [],
      activeImage: {},
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

    cartAction() {
      Object.keys(this.checkItemInCart).length > 0
        ? this.updateCartItem()
        : this.addToCart();
    },

    addToCart() {
      this.busy = false;
      let payload = {
        quantity: this.quantity,
        product_id: this.id,
      };
      this.$request
        .post(`cart/add`, payload)
        .then((res) => {
          this.$swal.fire(
            "Woa!",
            `${this.product.name} added to cart.`,
            "success"
          );
          this.$store.dispatch("cart/getUserCart");
          return res;
        })
        .catch((err) => {
          if (err.data.message === 'Attempt to read property "id" on null') {
            this.$router.push("/sign-in?redirectFrom=" + this.route);
          }
          console.log(err.data.message);
        });
    },

    updateCartItem() {
      let payload = {
        quantity: this.quantity,
        product_id: this.id,
      };
      this.$request
        .post(`cart/update/${this.checkItemInCart.id}`, payload)
        .then((res) => {
          this.$swal.fire(
            "Nice!",
            `${this.product.name} updated in cart.`,
            "success"
          );
          this.$store.dispatch("cart/getUserCart");
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    selectImage(e) {
      this.activeImage = e;
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
  },

  beforeMount() {
    this.getProduct();
  },

  mounted() {},

  watch: {
    activeName(val) {
      this.activeTab = val;
    },

    checkItemInCart: {
      handler(val) {
        if (Object.keys(val).length > 0) {
          console.log(val);
          this.quantity = val.quantity;
        }
      },
    },

    product: {
      handler(val) {
        if (Object.keys(val).length !== 0) {
          this.activeImage = val.images[0];
          console.log(this.activeImage, "kkkk");
        }
      },
    },
  },

  computed: {
    activeName() {
      return this.tabs[0].name;
    },

    cart() {
      return this.$store.getters["cart/getCartItems"];
    },

    route() {
      return this.$route.fullPath;
    },

    amount() {
      let price = this.product.price;
      return price * this.quantity;
    },

    checkItemInCart() {
      const token = localStorage.getItem("token");
      if (token) {
        let cartItems = this.cart;
        let val = cartItems.find((elem) => this.product.id === elem.product_id);
        // console.log(val);
        // const result = val.length !== 0;
        return val;
      } else {
        return {};
      }
    },
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
