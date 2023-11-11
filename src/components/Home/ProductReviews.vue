<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div>
    <div
      class="tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-3 tw-grid-col-1 tw-gap-12"
    >
      <div class="tw-flex tw-gap-6 tw-w-full">
        <div class="tw-text-center">
          <h1 class="tw-mb-0 tw-text-5xl tw-font-medium">
            {{ avg_rating.toFixed(1) }}
          </h1>
          <div class="tw-flex tw-flex-col tw-mt-1 tw-items-end">
            <star-rating
              :increment="0.1"
              v-model="avg_rating"
              inactive-color="#aaa"
              active-color="#F9A51A"
              v-bind:star-size="13"
              :show-rating="false"
              :rounded-corners="true"
              :read-only="true"
            ></star-rating>
            <span
              class="tw-tracking-wide tw-font-medium tw-text-light tw-text-sm"
              >{{
                ` ${reviewsLength} review${reviewsLength > 1 ? "s" : ""}`
              }}</span
            >
          </div>
        </div>
        <div class="tw-flex tw-flex-col tw-gap-1 tw-w-full">
          <div
            v-for="(value, name) in ratings"
            :key="name"
            class="tw-flex tw-items-center tw-gap-6"
          >
            <span>{{ name }}</span>
            <span
              class="tw-block tw-bg-gray-100 tw-rounded-lg tw-h-3 tw-w-full"
            >
              <span
                class="tw-block tw-bg-primary tw-rounded-lg tw-h-3"
                :style="{
                  width: `${getPercentage(value, item.ratings.length)}` + '%',
                }"
              >
              </span>
            </span>
            <span class="tw-text-sm tw-text-center">
              {{ getPercentage(value, item.ratings.length) + "%" }}
            </span>
          </div>
        </div>
      </div>

      <div class="tw-w-full lg:tw-col-span-2 md:tw-col-span-2">
        <div v-if="!isLoggedIn">
          <h6>Login to rate or review this product</h6>
          <button
            class="peppi-primary peppi-btn tw-py-2 tw-mt-3"
            @click="$router.push('/sign-in?redirectFrom=' + route)"
          >
            Login
          </button>
        </div>
        <div v-else>
          <div v-if="Object.keys(submittedRating).length === 0" class="tw-mb-4">
            <h5 class="tw-mb-0 tw-font-semibold">Rate this product</h5>
            <star-rating
              @rating-selected="setRating"
              :increment="0.1"
              v-model="scale"
              inactive-color="#aaa"
              active-color="#F9A51A"
              v-bind:star-size="15"
              :show-rating="false"
              :rounded-corners="true"
            ></star-rating>
          </div>

          <div v-if="Object.keys(submittedReview).length === 0" class="tw-mb-4">
            <h5 class="tw-mb-0 tw-font-semibold">Review this product</h5>
            <p class="tw-text-sm">Share your thoughts with other customers</p>
            <textarea
              name=""
              v-model="comment"
              class="tw-border tw-border-gray400 tw-outline-none tw-p-4 tw-text-sm tw-w-full"
              id=""
              cols="30"
              rows="5"
            ></textarea>
            <button
              class="peppi-primary peppi-btn tw-py-2 tw-mt-3"
              @click="editMode ? editReview() : submitReview()"
            >
              {{ editMode ? "edit review" : "submit review" }}
            </button>
          </div>

          <!-- Reviews  -->
          <div
            class="tw-grid lg:tw-grid-cols-4 md:tw-grid-cols-3 sm:tw-grid-cols-2 xs:tw-grid-cols-1 tw-gap-4"
          >
            <div
              class="tw-bg-gray200 tw-p-3 tw-flex tw-flex-col tw-justify-between"
              v-for="(item, idx) in merged"
              :key="idx"
            >
              <div>
                <div class="tw-flex tw-justify-between tw-items-center">
                  <star-rating
                    :increment="0.1"
                    v-model="item.scale"
                    inactive-color="#aaa"
                    active-color="#F9A51A"
                    v-bind:star-size="13"
                    :show-rating="false"
                    :rounded-corners="true"
                    :read-only="true"
                  ></star-rating>
                  <span
                    class="tw-flex tw-gap-2"
                    v-if="item.user_id === user.id"
                  >
                    <span role="button" @click="editComment(item)">
                      <i-icon icon="iconamoon:edit" />
                    </span>
                    <span
                      role="button"
                      class="tw-text-red-600"
                      @click="deleteRecord(item)"
                    >
                      <i-icon icon="fluent:delete-32-regular" />
                    </span>
                  </span>
                </div>
                <div
                  class="tw-text-sm tw-capitalize"
                  v-html="item.comment"
                ></div>
              </div>
              <div class="tw-flex tw-gap-2 tw-mt-2 tw-items-center">
                <span
                  class="tw-text-md tw-uppercase tag tw-h-8 tw-flex tw-font-semibold tw-items-center tw-justify-center tw-rounded-full tw-w-8 tw-block"
                  :class="getAvatar(item.user.username)"
                  >{{ getAvatar(item.user.username) }}</span
                >
                <span class="tw-font-semibold tw-capitalize">{{
                  item.user.username
                }}</span>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { pick } from "lodash";
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      displayKey: ["5", "4", "3", "2", "1"],
      comment: "",
      editMode: false,
      review_id: "",
      scale: 0,
    };
  },

  methods: {
    filterData(value) {
      return pick(value, this.displayKey);
    },

    getAvatar(value) {
      return value.charAt(0);
    },

    getPercentage(value1, value2) {
      let perc = (value1 / value2) * 100;
      return perc || 0;
    },

    editComment(value) {
      this.editMode = !this.editMode;
      this.comment = value.comment;
      this.review_id = value.id;
    },

    setRating() {
      this.busy = false;
      let payload = {
        scale: this.scale,
        product_id: this.item.id,
      };
      this.$request
        .post(`ratings/add`, payload)
        .then((res) => {
          this.$swal.fire(
            "Succesful!",
            "You have rated this product.",
            "success"
          );
          this.$emit("reloadData");
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editReview() {
      this.busy = false;
      let payload = {
        comment: this.comment,
      };
      this.$request
        .post(`reviews/update/${this.review_id}`, payload)
        .then((res) => {
          this.$swal.fire(
            "Succesful!",
            "Review edited succesfully.",
            "success"
          );
          this.$emit("reloadData");
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    submitReview() {
      this.busy = false;
      let payload = {
        comment: this.comment,
        product_id: this.item.id,
      };
      this.$request
        .post(`reviews/add`, payload)
        .then((res) => {
          this.$swal.fire("Added!", "Review added succesfully.", "success");
          this.$emit("reloadData");
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteReview(value) {
      console.log(value, "kkk");
      this.$request
        .post(`reviews/delete/${value.id}`)
        .then((res) => {
          this.$swal.fire("Deleted!", "Review deleted succesfully.", "success");
          this.$emit("reloadData");
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteRecord(value) {
      this.$swal
        .fire({
          title: "Continue?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          console.log(result, "kkk");
          if (result.isConfirmed) {
            this.deleteReview(value);
          }
        });
    },
  },

  computed: {
    merged() {
      let res = [];
      res = this.item.reviews.map((obj) => {
        const index = this.item.ratings.findIndex(
          (el) => el["user_id"] == obj["user_id"]
        );
        const { scale } = index !== -1 ? this.item.ratings[index] : {};
        return {
          ...obj,
          scale,
        };
      });
      if (this.item.reviews.length === 0) {
        res = [];
      }
      return res;
    },

    avg_rating() {
      var ratingSum = this.item.ratings.reduce((accumulator, value) => {
        return accumulator + value.scale;
      }, 0);
      let length = this.item.ratings.length;
      let result = ratingSum / length;
      if (this.item.ratings.length === 0) {
        result = 0;
      }
      return result;
    },

    reviewsLength() {
      return this.merged.length;
    },

    ratings() {
      let five = this.item.ratings.filter(
        (item) => Math.round(item.scale) === 5
      );
      let four = this.item.ratings.filter(
        (item) => Math.round(item.scale) === 4
      );
      let three = this.item.ratings.filter(
        (item) => Math.round(item.scale) === 3
      );
      let two = this.item.ratings.filter(
        (item) => Math.round(item.scale) === 2
      );
      let one = this.item.ratings.filter(
        (item) => Math.round(item.scale) === 1
      );
      var res = {
        5: five.length,
        4: four.length,
        3: three.length,
        2: two.length,
        1: one.length,
      };
      return res;
    },

    submittedReview() {
      var myReview = this.merged.find((item) => item.user_id === this.user.id);
      var res = {};
      if (!this.editMode) {
        res = myReview || {};
      } else {
        res = this.editMode;
      }
      return res;
    },

    submittedRating() {
      var myRating = this.item.ratings.find(
        (item) => item.user_id === this.user.id
      );
      var res = {};
      res = myRating || {};
      return res;
    },

    user() {
      return this.$store.getters["auth/getUser"];
    },

    isLoggedIn() {
      const token = localStorage.getItem("peppi_token");
      return token;
    },

    route() {
      return this.$route.fullPath;
    },
  },
};
</script>

<style scoped>
.el-collapse-item__content {
  padding-bottom: 0 15px 0 15px !important;
}
</style>
