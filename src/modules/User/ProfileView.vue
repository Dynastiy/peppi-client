<template>
    <div>
      Profile
      {{ profile }}
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      user(){
        return this.$store.getters["auth/getUser"]
      },
      profile(){
        return this.user.profile
      }
    }
  }
  </script>
  
  <style>
  
  </style>