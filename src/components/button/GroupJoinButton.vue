<!-- GroupJoinButton.vue -->
<template>
    <div>
      <button @click="goToGroupJoinPage">그룹 가입</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToGroupJoinPage() {
        this.$router.push('/group/join');
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your styles here if needed */
  </style>
  