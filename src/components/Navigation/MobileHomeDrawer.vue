<template>
  <div>
    <el-drawer :visible.sync="drawerVisible" :with-header="false" size="80%">
      <div class="tw-h-full tw-bg-dark-100">
        <div class="tw-flex tw-p-8 tw-justify-end tw-mb-8 tw-bg-dark-400 tw-shadow">
          <span @click="$emit('close')" role="button">
            <i-icon icon="codicon:close" class="tw-text-primary" width="25px" />
          </span>
        </div>
        <ul class="tw-p-0 tw-flex tw-flex-col tw-space-y-3">
          <li class="" v-for="item in menu" :key="item?.id">
            <router-link
              :class="{
                'router-link-exact-active': routeParent === item?.parent,
              }"
              class="tw-text-gray100 tw-px-8 tw-flex tw-space-x-3 tw-items-center tw-py-4 tw-text-[13px] tw-uppercase tw-block tw-no-underline tw-font-normal tw-tracking-widest"
              :to="item?.url"
            >
              <i-icon :icon="item?.icon" class="tw-text-gray300 tw-text-lg" />
              <span>{{ item?.title }}</span></router-link
            >
          </li>
        </ul>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
    menu: {
      type: Array,
      require: true,
      default: () => [],
    },
  },
  data() {
    return {
      drawerVisible: false,
    };
  },
  methods: {},

  watch: {
    drawer: {
      handler(val) {
        this.drawerVisible = val;
      },
      immediate: true,
    },
  },

  computed: {
    routeParent() {
      return this.$route.meta.parent;
    },
  },
};
</script>

<style scoped>
.router-link-exact-active {
  background: var(--primary);
}
</style>
