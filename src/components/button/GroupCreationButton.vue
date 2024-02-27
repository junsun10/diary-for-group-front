<!-- GroupCreationButton.vue -->
<template>
    <button @click="goToGroupCreationPage" class="button">그룹 생성</button>
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
.button {
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 14px;
}

.button:hover {
  background-color: #a8aaac;
  color: white;
}
</style>
  