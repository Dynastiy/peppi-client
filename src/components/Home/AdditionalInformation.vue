<template>
  <div>
    <video
      v-if="video !== null"
      :src="item.video.url"
      controls
      style="width: 100%"
    ></video>
    <h6 v-else>No video for this product</h6>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.el-collapse-item__content {
  padding-bottom: 0 15px 0 15px !important;
}
</style>
