<template>
  <div
    class="tw-grid lg:tw-grid-cols-2 tw-gap-2 lg:tw-grid-cols-2 tw-justify-between tw-items-center"
  >
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-skeleton width="40%"></b-skeleton>
      </template>
      <span v-if="isPaginated"
        class="tw-full tw-text-sm tw-uppercase tw-tracking-widest tw-text-dark-100"
        >showing {{ from }} - {{ to }} of {{ total }} result{{ total > 1 ? "s": "" }}
        <!-- Showing {{ ((currentPage - 1) * perPage) + items.length }} / {{ totalRecords }} -->
      </span>
    </b-skeleton-wrapper>

    <!-- <div class="tw-flex tw-justify-end tw-full">
      <el-dropdown
        trigger="click"
        placement="bottom-end"
        :hide-on-click="false"
      >
        <span
          class="el-dropdown-link tw-text-dark-100 tw-text-sm tw-uppercase tw-tracking-widest tw-flex tw-items-center tw-space-x-1"
        >
          <span>{{ active.title }}</span
          ><i-icon icon="octicon:triangle-down-16" width="24px" />
        </span>
        <el-dropdown-menu slot="dropdown" class="tw-w-64">
          <el-dropdown-item v-for="item in filterParams" :key="item?.id">
            <span
              role="button"
              @click="makeActive(item)"
              class="tw-block tw-uppercase tw-tracking-widest tw-w-full tw-p-3 tw-text-xs"
              :class="{ 'tw-bg-primary': item.active }"
            >
              {{ item?.title }}
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    total: {
      default: "0",
      type: String,
    },
    to: {
      default: "0",
      type: String,
    },
    from: {
      default: "0",
      type: String,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    isPaginated: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      filterParams: [
        { id: 1, title: "default sorting", active: true },
        { id: 2, title: "sort by popularity", active: false },
        { id: 3, title: "sort by average rating", active: false },
        { id: 4, title: "sort by newness", active: false },
        { id: 5, title: "sort by price: high to low", active: false },
        { id: 6, title: "sort by price: low to high", active: false },
      ],
      active: {},
    };
  },

  methods: {
    makeActive(selectedItem) {
      // Mark the clicked item as active
      this.filterParams.forEach((item) => {
        item.active = item === selectedItem;
      });
    },
  },

  watch: {
    selected: {
      handler(newVal) {
        this.active = newVal;
      },
      deep: true,
      immediate: true,
    },
  },

  computed: {
    selected() {
      let activeItem = this.filterParams.find((item) => item.active);
      return activeItem;
    },
  },
};
</script>

<style>
ul {
  padding-left: 0;
}

.el-popper[x-placement^="bottom"] {
  margin-top: 0 !important;
}

.el-dropdown-menu__item,
.el-menu-item {
  padding: 0 !important;
}

.el-dropdown-menu {
  background-color: var(--dark-100) !important;
  border-radius: 0 !important;
  padding: 0 !important;
}

.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: var(--primary) !important;
  color: var(--dark-100) !important;
}

.el-dropdown-menu__item {
  color: var(--white) !important;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.el-popper .popper__arrow,
.el-popper .popper__arrow::after {
  display: none !important;
}
</style>
