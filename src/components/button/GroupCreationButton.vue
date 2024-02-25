<!-- GroupCreationButton.vue -->
<template>
    <div>
      <button @click="goToGroupCreationPage">그룹 생성</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToGroupCreationPage() {
        this.$router.push('/group/create');
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your styles here if needed */
  </style>
  