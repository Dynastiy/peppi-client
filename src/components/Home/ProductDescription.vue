<template>
    <div>
      <div v-html="item.description">

      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => {}
      }
    }
  
  }
  </script>
  
  <style scoped>
  .el-collapse-item__content {
    padding-bottom: 0 15px 0 15px !important;
  }
  </style>