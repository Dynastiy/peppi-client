<template>
    <div>
      <button>
        &laquo;
      </button>
      <span>Showing {{  }} of {{  }}</span>
      <button>
        &raquo;
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      lastPage: {
        type: Number,
        Default: 0
      },
      currentPage: {
        type: Number,
        Default: 0
      },
    }
  }
  </script>
  
  <style>
  
  </style>