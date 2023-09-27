<template>
  <div class="tw-grid lg:tw-grid-cols-2 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-8">
    <div>
      <img
        class="tw-h-72 lg:tw tw-w-full tw-object-cover tw-mx-auto tw-block"
        src="https://cdn20.pamono.com/p/g/3/5/352570_4vsyf8iwab/beige-chair-with-wooden-legs-by-mobles114-2.jpg"
        alt=""
      />
    </div>
    <div class="tw-flex tw-flex-col tw-space-y-4">
      <h3 class="tw-tracking-widest tw-uppercase tw-font-light">
        oak & iron coffee table
      </h3>
      <h3>NGN 345.00</h3>
      <hr />
      <p class="tw-text-gray-500 tw-text-[13px] tw-font-light">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
        sed doloremque reprehenderit, ullam praesentium ab iste numquam sequi
        quas cum suscipit nobis unde architecto distinctio cupiditate culpa
        officia. Laborum, veritatis!
      </p>
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
        <span>
          <span>SKU: </span>
          <span>table, wood, interior design, furniture</span>
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
              <component :is="tabs[index].component" />
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
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
    };
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
