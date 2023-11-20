<template>
  <div class="tw-bg-gray200 tw-py-6 tw-mb-6">
    <h4
      class="tw-text-center tw-font-bold tw-mb-0 tw-uppercase tw-tracking-widest"
    >
      {{ headerText }}
    </h4>
    <div class="tw-flex tw-justify-center tw-mt-4 tw-pl-4" v-if="breadCrumbList.length > 0">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(breadcrumb, idx) in breadCrumbList"
          :key="idx"
          :to="breadcrumb.href"
          >{{ breadcrumb.text }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadCrumbList: [],
    };
  },

  methods: {
    updateList(val) {
      var currentBreadCrumb = []
      currentBreadCrumb = this.$route.meta.breadcrumb;
      // var val = this.$route.params;
      // console.log(val);
      // if (Object.keys(val).length > 0) {
      //   console.log(val.id);
      //   let breadcrumb = {
      //     text: val.id,
      //   };
      //   console.log(breadcrumb);
      if(currentBreadCrumb.length > 2) {
        currentBreadCrumb.pop()
      }
      
      currentBreadCrumb.push(val);
      this.breadCrumbList = currentBreadCrumb;
      // } else {
      //   this.breadCrumbList = currentBreadCrumb;
      // }
    },
  },

  beforeMount() {
    // this.updateList();
    console.log(this.$route);
  },

  watch: {
    // "$route.params": {
    //   handler(val) {
    //     if (val.id) {
    //       let breadcrumb = {
    //         text: val.id,
    //       };
    //       this.updateList(breadcrumb);
    //     }
    //   },
    //   immediate: true,
    // },
  },

  computed: {
    headerText() {
      let header = this.$route.meta.header;
      return header;
    },
  },
};
</script>

<style>
.el-breadcrumb__item .is-link:hover {
  color: var(--primary) !important;
}
</style>
